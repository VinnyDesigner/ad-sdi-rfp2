import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import L from 'leaflet';
import {
  Plus,
  Minus,
  House,
  Stack,
  GlobeHemisphereWest,
  X,
  ArrowRight,
  DownloadSimple,
  Eye,
  EyeSlash,
  CheckCircle,
  MapPin,
  Lock,
  ShareNetwork,
  CornersOut,
  PencilSimpleLine,
  Polygon,
  Square,
  Trash,
  Check,
  Funnel,
  Cursor,
  CaretLeft,
  CaretRight,
  CaretDown,
  CaretUp,
  Sliders
} from '@phosphor-icons/react';
import { DATASET_GEOMETRIES } from '../../data/datasetGeometries';
import { themeCategories } from '../../data/portalData';
import { DATASETS } from '../../data/datasetsData';

// Real Geographic Tile Providers with authentic spatial attribution
const BASEMAP_TILES = {
  canvas: {
    name: 'Esri Light Gray',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
    options: {
      maxZoom: 16,
      attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom'
    }
  },
  satellite: {
    name: 'Esri World Satellite',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    options: {
      maxZoom: 19,
      attribution: 'Tiles &copy; Esri &mdash; Earthstar Geographics, CNES/Airbus DS'
    }
  },
  streets: {
    name: 'OpenStreetMap Streets',
    url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    options: {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors'
    }
  },
  topo: {
    name: 'Topographic & Relief',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
    options: {
      maxZoom: 18,
      attribution: 'Tiles &copy; Esri &mdash; USGS, NOAA'
    }
  }
};

// 8 Geographic Themes in exact display order from visual reference
const EXPLORE_THEMES = [
  {
    id: 'cadastre',
    name: 'Land & Cadastre',
    count: '320 datasets',
    image: '/assets/theme_cadastre.jpg',
    desc: 'Authoritative land parcels, cadastral deeds, zoning boundaries, and master plots.'
  },
  {
    id: 'environment',
    name: 'Environment',
    count: '310 datasets',
    image: '/assets/theme_environment.jpg',
    desc: 'Mangrove extents, marine protected areas, groundwater zones, and coastal habitats.'
  },
  {
    id: 'buildings',
    name: 'Buildings & 3D',
    count: '290 datasets',
    image: '/assets/theme_buildings.jpg',
    desc: 'LOD2 building massing, structural footprints, architectural heights, and 3D meshes.'
  },
  {
    id: 'transport',
    name: 'Transport',
    count: '420 datasets',
    image: '/assets/theme_transport.jpg',
    desc: 'Highways, arterial corridors, public transit networks, and maritime channels.'
  },
  {
    id: 'population',
    name: 'Population',
    count: '210 datasets',
    image: '/assets/theme_population.jpg',
    desc: '100m statistical population grids, demographic density, and civic facilities.'
  },
  {
    id: 'imagery',
    name: 'Imagery',
    count: '260 datasets',
    image: '/assets/theme_imagery.jpg',
    desc: 'Very-high-resolution satellite orthoimagery, multi-spectral dates, and nadir tiles.'
  },
  {
    id: 'utilities',
    name: 'Utilities',
    count: '180 datasets',
    image: '/assets/theme_utilities.jpg',
    desc: 'Subterranean water conduits, power transmission grids, and telecoms corridors.'
  },
  {
    id: 'boundaries',
    name: 'Boundaries',
    count: '320 datasets',
    image: '/assets/theme_boundaries.jpg',
    desc: 'Emirate administrative borders, municipal zones, and sector boundaries.'
  }
];

const ABU_DHABI_CENTER = [24.4539, 54.3773];
const DEFAULT_ZOOM = 11;

// Geodesic Area in km² using Shoelace on WGS84
function calculatePolygonAreaKm2(coords) {
  if (!coords || coords.length < 3) return 0;
  const R = 6371; // Earth radius in km
  let total = 0;
  const n = coords.length;
  for (let i = 0; i < n; i++) {
    const p1 = coords[i];
    const p2 = coords[(i + 1) % n];
    const lat1 = (p1[0] * Math.PI) / 180;
    const lat2 = (p2[0] * Math.PI) / 180;
    const dLng = ((p2[1] - p1[1]) * Math.PI) / 180;
    total += dLng * (2 + Math.sin(lat1) + Math.sin(lat2));
  }
  const area = Math.abs((total * R * R) / 2);
  return parseFloat(area.toFixed(2));
}

function calculatePerimeterKm(coords) {
  if (!coords || coords.length < 2) return 0;
  let dist = 0;
  for (let i = 0; i < coords.length; i++) {
    const p1 = coords[i];
    const p2 = coords[(i + 1) % coords.length];
    const latDiff = (p2[0] - p1[0]) * 110.7;
    const lngDiff = (p2[1] - p1[1]) * 101.3;
    dist += Math.sqrt(latDiff * latDiff + lngDiff * lngDiff);
  }
  return parseFloat(dist.toFixed(1));
}

// Robust point-in-polygon test (ray casting for [lat, lng])
function isPointInPolygon(point, polygon) {
  if (!point || !polygon || polygon.length < 3) return false;
  const lat = point[0];
  const lng = point[1];
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i][0];
    const yi = polygon[i][1];
    const xj = polygon[j][0];
    const yj = polygon[j][1];
    const intersect =
      yi > lng !== yj > lng &&
      lat < ((xj - xi) * (lng - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

// 2D line segment intersection between (p1, p2) and (p3, p4)
function segmentsIntersect(p1, p2, p3, p4) {
  const ccw = (a, b, c) => (c[0] - a[0]) * (b[1] - a[1]) > (b[0] - a[0]) * (c[1] - a[1]);
  return ccw(p1, p3, p4) !== ccw(p2, p3, p4) && ccw(p1, p2, p3) !== ccw(p1, p2, p4);
}

// Polygon and Polygon 2D intersection check
function polygonIntersectsPolygon(polyA, polyB) {
  if (!polyA || !polyB || polyA.length < 3 || polyB.length < 3) return false;

  // Bounding box pre-check
  const latsA = polyA.map((p) => p[0]);
  const lngsA = polyA.map((p) => p[1]);
  const minLatA = Math.min(...latsA);
  const maxLatA = Math.max(...latsA);
  const minLngA = Math.min(...lngsA);
  const maxLngA = Math.max(...lngsA);

  const latsB = polyB.map((p) => p[0]);
  const lngsB = polyB.map((p) => p[1]);
  const minLatB = Math.min(...latsB);
  const maxLatB = Math.max(...latsB);
  const minLngB = Math.min(...lngsB);
  const maxLngB = Math.max(...lngsB);

  if (maxLatA < minLatB || minLatA > maxLatB || maxLngA < minLngB || minLngA > maxLngB) {
    return false;
  }

  // 1. Any vertex of A inside B
  for (let i = 0; i < polyA.length; i++) {
    if (isPointInPolygon(polyA[i], polyB)) return true;
  }

  // 2. Any vertex of B inside A
  for (let i = 0; i < polyB.length; i++) {
    if (isPointInPolygon(polyB[i], polyA)) return true;
  }

  // 3. Any edge of A intersects any edge of B
  for (let i = 0, j = polyA.length - 1; i < polyA.length; j = i++) {
    for (let k = 0, m = polyB.length - 1; k < polyB.length; m = k++) {
      if (segmentsIntersect(polyA[j], polyA[i], polyB[m], polyB[k])) {
        return true;
      }
    }
  }

  return false;
}

// LineString and Polygon intersection check
function lineStringIntersectsPolygon(lineCoords, poly) {
  if (!lineCoords || !poly || lineCoords.length < 2 || poly.length < 3) return false;

  // 1. Any point of line is inside polygon
  for (let i = 0; i < lineCoords.length; i++) {
    if (isPointInPolygon(lineCoords[i], poly)) return true;
  }

  // 2. Any segment of line intersects any edge of polygon
  for (let i = 0; i < lineCoords.length - 1; i++) {
    for (let j = 0, k = poly.length - 1; j < poly.length; k = j++) {
      if (segmentsIntersect(lineCoords[i], lineCoords[i + 1], poly[k], poly[j])) {
        return true;
      }
    }
  }

  return false;
}

function findIntersectingDatasets(polygonCoords) {
  const matchingIds = new Set();
  if (!polygonCoords || polygonCoords.length < 3) return matchingIds;

  Object.entries(DATASET_GEOMETRIES).forEach(([id, geom]) => {
    // 1. Check center point
    if (geom.center && isPointInPolygon(geom.center, polygonCoords)) {
      matchingIds.add(id);
      return;
    }

    // 2. Check each feature
    let anyOverlap = false;
    geom.features?.forEach((f) => {
      if (anyOverlap || !f.coordinates) return;

      if (f.type === 'Polygon') {
        if (polygonIntersectsPolygon(polygonCoords, f.coordinates)) {
          anyOverlap = true;
        }
      } else if (f.type === 'LineString') {
        if (lineStringIntersectsPolygon(f.coordinates, polygonCoords)) {
          anyOverlap = true;
        }
      }
    });

    if (anyOverlap) {
      matchingIds.add(id);
    }
  });

  return matchingIds;
}

export default function CatalogueMap({
  datasets = DATASETS,
  selectedDataset = null,
  onSelectDataset,
  hoveredDatasetId = null,
  spatialAoiFilter = null,
  onApplySpatialFilter,
  onClearSpatialFilter,
  selectedTheme = 'All',
  onSelectTheme,
  showThemeDock = true,
  showToolbar = true,
  showDrawingTools = true,
  showLayersControl = true,
  showBasemapControl = true,
  showCoordinateBar = true,
  initialBasemap = 'canvas',
  initialCenter = ABU_DHABI_CENTER,
  initialZoom = DEFAULT_ZOOM,
  compact = false,
  onMapReady = null,
  className = ''
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const tileLayerRef = useRef(null);
  const vectorLayersRef = useRef({});
  const drawLayerRef = useRef(null);

  const [activeBasemap, setActiveBasemap] = useState(initialBasemap);

  // Sync activeBasemap if initialBasemap prop changes
  useEffect(() => {
    if (initialBasemap && BASEMAP_TILES[initialBasemap]) {
      setActiveBasemap(initialBasemap);
    }
  }, [initialBasemap]);
  const [showBasemapPicker, setShowBasemapPicker] = useState(false);
  const [showLayerPanel, setShowLayerPanel] = useState(false);
  const [visibleLayerIds, setVisibleLayerIds] = useState(
    () => new Set(Object.keys(DATASET_GEOMETRIES))
  );
  const [cursorCoords, setCursorCoords] = useState({ lat: 24.4539, lng: 54.3773 });
  const [currentZoom, setCurrentZoom] = useState(DEFAULT_ZOOM);
  const [isDetailCardDismissed, setIsDetailCardDismissed] = useState(false);

  // Manual Drawing State
  const [isDrawModeActive, setIsDrawModeActive] = useState(false);
  const [drawShapeType, setDrawShapeType] = useState('polygon'); // 'polygon' | 'rectangle'
  const [drawPoints, setDrawPoints] = useState([]);
  const [completedShape, setCompletedShape] = useState(null);

  // Geographic Theme Dock Scroll & Collapse State
  const dockScrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isDockCollapsed, setIsDockCollapsed] = useState(false);
  const [isLegendCollapsed, setIsLegendCollapsed] = useState(false);

  const checkDockScroll = useCallback(() => {
    if (!dockScrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = dockScrollRef.current;
    setCanScrollLeft(scrollLeft > 6);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 6);
  }, []);

  useEffect(() => {
    const el = dockScrollRef.current;
    if (!el) return;
    checkDockScroll();
    el.addEventListener('scroll', checkDockScroll, { passive: true });
    window.addEventListener('resize', checkDockScroll);
    return () => {
      el.removeEventListener('scroll', checkDockScroll);
      window.removeEventListener('resize', checkDockScroll);
    };
  }, [checkDockScroll]);

  const scrollDock = (direction) => {
    if (!dockScrollRef.current) return;
    const scrollAmount = direction === 'left' ? -220 : 220;
    dockScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    setTimeout(checkDockScroll, 250);
  };

  // Synchronize completedShape with external spatialAoiFilter
  useEffect(() => {
    if (!spatialAoiFilter) {
      setCompletedShape(null);
    } else if (spatialAoiFilter.coordinates && !completedShape) {
      setCompletedShape({
        type: spatialAoiFilter.type || 'Polygon',
        coordinates: spatialAoiFilter.coordinates,
        areaKm2: spatialAoiFilter.areaKm2,
        perimeterKm: spatialAoiFilter.perimeterKm || 0
      });
    }
  }, [spatialAoiFilter]);

  const isFirstMount = useRef(true);

  // Active dataset IDs strictly matching current catalogue filters
  const activeDatasetIds = useMemo(() => new Set(datasets.map((d) => d.id)), [datasets]);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      if (mapContainerRef.current._leaflet_id) {
        delete mapContainerRef.current._leaflet_id;
      }
      mapContainerRef.current.innerHTML = '';

      const map = L.map(mapContainerRef.current, {
        center: ABU_DHABI_CENTER,
        zoom: DEFAULT_ZOOM,
        zoomControl: false,
        attributionControl: false,
        minZoom: 6,
        maxZoom: 18,
        fadeAnimation: false
      });

      // Add Base Tile Layer
      const baseCfg = BASEMAP_TILES[activeBasemap] || BASEMAP_TILES.canvas;
      tileLayerRef.current = L.tileLayer(baseCfg.url, baseCfg.options).addTo(map);

      // Dedicated layer group for user drawing
      drawLayerRef.current = L.layerGroup().addTo(map);

      // Track cursor coordinates
      map.on('mousemove', (e) => {
        if (e && e.latlng) {
          setCursorCoords({
            lat: parseFloat(e.latlng.lat.toFixed(4)),
            lng: parseFloat(e.latlng.lng.toFixed(4))
          });
        }
      });

      // Track zoom level
      map.on('zoomend', () => {
        setCurrentZoom(map.getZoom());
      });

      mapInstanceRef.current = map;

      if (onMapReady) {
        try {
          onMapReady(map);
        } catch (_) {}
      }

      // Invalidate size to ensure tiles fill the viewport
      const timer = setTimeout(() => {
        try {
          map.invalidateSize();
        } catch (_) {}
      }, 100);

      const resizeObserver = new ResizeObserver(() => {
        try {
          if (mapInstanceRef.current) {
            mapInstanceRef.current.invalidateSize();
          }
        } catch (_) {}
      });
      resizeObserver.observe(mapContainerRef.current);

      const handleResize = () => {
        try {
          map.invalidateSize();
        } catch (_) {}
      };
      window.addEventListener('resize', handleResize);

      return () => {
        clearTimeout(timer);
        resizeObserver.disconnect();
        window.removeEventListener('resize', handleResize);
        try {
          map.remove();
        } catch (_) {}
        mapInstanceRef.current = null;
      };
    }
  }, []);

  // Update Basemap Tiles
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    try {
      if (tileLayerRef.current) {
        map.removeLayer(tileLayerRef.current);
      }
      const baseCfg = BASEMAP_TILES[activeBasemap] || BASEMAP_TILES.canvas;
      tileLayerRef.current = L.tileLayer(baseCfg.url, baseCfg.options).addTo(map);
      tileLayerRef.current.bringToBack();
    } catch (err) {
      console.warn('Error updating basemap tiles:', err);
    }
  }, [activeBasemap]);

  // Synchronize Dataset Vector Layers - ONLY display features matching active catalogue filters
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    // Clear previous vector layers
    Object.values(vectorLayersRef.current).forEach((layerGroup) => {
      try {
        map.removeLayer(layerGroup);
      } catch (_) {}
    });
    vectorLayersRef.current = {};

    // Render features ONLY for datasets matching the active filters
    Object.entries(DATASET_GEOMETRIES).forEach(([datasetId, geomDef]) => {
      // Filter out if not in the current active filter set
      if (!activeDatasetIds.has(datasetId)) return;
      // Filter out if user manually toggled layer off
      if (!visibleLayerIds.has(datasetId)) return;

      const isSelected = selectedDataset?.id === datasetId;
      const isHovered = hoveredDatasetId === datasetId;

      const layerGroup = L.layerGroup();

      geomDef.features.forEach((feature) => {
        let leafletLayer = null;

        const strokeColor = isSelected ? '#FFC20E' : isHovered ? '#1F5FAD' : geomDef.color;
        const fillColor = isSelected ? '#FFC20E' : geomDef.fillColor || geomDef.color;
        const strokeWeight = isSelected ? 3.5 : isHovered ? 3 : geomDef.weight || 2;
        const fillOpacity = isSelected ? 0.45 : isHovered ? 0.40 : geomDef.fillOpacity || 0.25;

        try {
          if (feature.type === 'Polygon') {
            leafletLayer = L.polygon(feature.coordinates, {
              color: strokeColor,
              fillColor: fillColor,
              fillOpacity: fillOpacity,
              weight: strokeWeight,
              dashArray: isSelected ? null : geomDef.dashArray
            });
          } else if (feature.type === 'LineString') {
            leafletLayer = L.polyline(feature.coordinates, {
              color: strokeColor,
              weight: strokeWeight + 1,
              dashArray: isSelected ? null : geomDef.dashArray
            });
          }
        } catch (err) {
          console.warn('Error creating layer for', feature.name, err);
        }

        if (leafletLayer) {
          // Subtle visual highlight on hover (per Section 7, no popup tooltip)
          leafletLayer.on('mouseover', () => {
            if (isDrawModeActive) return;
            try {
              leafletLayer.setStyle({
                weight: strokeWeight + 1.5,
                fillOpacity: Math.min(0.45, fillOpacity + 0.15)
              });
            } catch (_) {}
          });
          leafletLayer.on('mouseout', () => {
            if (isDrawModeActive) return;
            try {
              leafletLayer.setStyle({
                weight: strokeWeight,
                fillOpacity: fillOpacity
              });
            } catch (_) {}
          });

          // Explicit click to select dataset and view metadata
          leafletLayer.on('click', (e) => {
            if (isDrawModeActive) return; // Don't interrupt drawing
            L.DomEvent.stopPropagation(e);
            const foundDs = datasets.find((d) => d.id === datasetId);
            if (foundDs && onSelectDataset) {
              onSelectDataset(foundDs);
              setIsDetailCardDismissed(false);
            }
          });

          leafletLayer.addTo(layerGroup);
        }
      });

      layerGroup.addTo(map);
      vectorLayersRef.current[datasetId] = layerGroup;
    });
  }, [datasets, activeDatasetIds, visibleLayerIds, selectedDataset, hoveredDatasetId, onSelectDataset, isDrawModeActive]);

  // When active filter changes, smoothly fit map view to the filtered dataset geometries
  const prevFilterKeyRef = useRef('');
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;
    const filterKey = datasets.map((d) => d.id).sort().join(',');

    // Skip initial mount so we don't override the initial setView
    if (prevFilterKeyRef.current === '') {
      prevFilterKeyRef.current = filterKey;
      return;
    }

    if (prevFilterKeyRef.current !== filterKey) {
      prevFilterKeyRef.current = filterKey;

      if (datasets.length > 0 && datasets.length < Object.keys(DATASET_GEOMETRIES).length) {
        const activeCoords = [];
        datasets.forEach((ds) => {
          const geom = DATASET_GEOMETRIES[ds.id];
          if (geom) {
            if (geom.center) activeCoords.push(geom.center);
            geom.features?.forEach((f) => {
              if (f.coordinates) {
                f.coordinates.forEach((coord) => {
                  if (Array.isArray(coord) && typeof coord[0] === 'number') {
                    activeCoords.push(coord);
                  }
                });
              }
            });
          }
        });

        if (activeCoords.length > 0) {
          try {
            const bounds = L.latLngBounds(activeCoords);
            if (bounds.isValid()) {
              map.flyToBounds(bounds, {
                padding: [70, 70],
                maxZoom: 14,
                duration: 0.8
              });
            }
          } catch (err) {
            console.warn('flyToBounds error on filter change:', err);
          }
        }
      } else if (datasets.length === Object.keys(DATASET_GEOMETRIES).length) {
        try {
          map.flyTo(ABU_DHABI_CENTER, DEFAULT_ZOOM, { duration: 0.8 });
        } catch (_) {}
      }
    }
  }, [datasets]);

  // Pan to selected dataset center when selection changes
  useEffect(() => {
    if (!selectedDataset || !mapInstanceRef.current) return;
    setIsDetailCardDismissed(false);

    const geomDef = DATASET_GEOMETRIES[selectedDataset.id];
    if (
      !geomDef ||
      !Array.isArray(geomDef.center) ||
      !Number.isFinite(geomDef.center[0]) ||
      !Number.isFinite(geomDef.center[1])
    ) {
      return;
    }

    const map = mapInstanceRef.current;

    if (isFirstMount.current) {
      isFirstMount.current = false;
      try {
        map.setView(geomDef.center, geomDef.zoom || DEFAULT_ZOOM);
      } catch (err) {
        console.warn('Initial map setView:', err);
      }
      return;
    }

    try {
      const size = map.getSize();
      if (!size || size.x < 30 || size.y < 30) {
        map.setView(geomDef.center, geomDef.zoom || DEFAULT_ZOOM);
      } else {
        map.flyTo(geomDef.center, geomDef.zoom || DEFAULT_ZOOM, {
          duration: 0.8,
          easeLinearity: 0.25
        });
      }
    } catch (err) {
      console.warn('Map flyTo fallback to setView:', err);
      try {
        map.setView(geomDef.center, geomDef.zoom || DEFAULT_ZOOM);
      } catch (_) {}
    }
  }, [selectedDataset]);

  // Controls Handlers
  const handleZoomIn = () => {
    mapInstanceRef.current?.zoomIn();
  };

  const handleZoomOut = () => {
    mapInstanceRef.current?.zoomOut();
  };

  const handleResetView = () => {
    mapInstanceRef.current?.flyTo(ABU_DHABI_CENTER, DEFAULT_ZOOM, { duration: 1.0 });
  };

  const toggleLayerVisibility = (layerId) => {
    setVisibleLayerIds((prev) => {
      const next = new Set(prev);
      if (next.has(layerId)) {
        next.delete(layerId);
      } else {
        next.add(layerId);
      }
      return next;
    });
  };

  const toggleAllLayers = (enable) => {
    if (enable) {
      setVisibleLayerIds(new Set(Object.keys(DATASET_GEOMETRIES)));
    } else {
      setVisibleLayerIds(new Set());
    }
  };

  // ==========================================
  // MANUAL DRAWING ENGINE (LEAFLET INTERACTION)
  // ==========================================
  const handleMapClickForDrawing = useCallback(
    (e) => {
      if (!e.latlng) return;
      const clickedPoint = [
        parseFloat(e.latlng.lat.toFixed(5)),
        parseFloat(e.latlng.lng.toFixed(5))
      ];

      if (drawShapeType === 'rectangle') {
        if (drawPoints.length === 0) {
          setDrawPoints([clickedPoint]);
        } else if (drawPoints.length === 1) {
          const p1 = drawPoints[0];
          const p2 = clickedPoint;
          const rectCoords = [
            [p1[0], p1[1]],
            [p1[0], p2[1]],
            [p2[0], p2[1]],
            [p2[0], p1[1]]
          ];
          const area = calculatePolygonAreaKm2(rectCoords);
          const perim = calculatePerimeterKm(rectCoords);
          setCompletedShape({
            type: 'Rectangle',
            coordinates: rectCoords,
            areaKm2: area,
            perimeterKm: perim
          });
          setDrawPoints([]);
          setIsDrawModeActive(false);
        }
      } else {
        // Polygon Mode
        if (drawPoints.length >= 3) {
          const first = drawPoints[0];
          const distLat = Math.abs(clickedPoint[0] - first[0]);
          const distLng = Math.abs(clickedPoint[1] - first[1]);
          if (distLat < 0.008 && distLng < 0.008) {
            // Clicked near start: Close polygon
            const area = calculatePolygonAreaKm2(drawPoints);
            const perim = calculatePerimeterKm(drawPoints);
            setCompletedShape({
              type: 'Polygon',
              coordinates: drawPoints,
              areaKm2: area,
              perimeterKm: perim
            });
            setDrawPoints([]);
            setIsDrawModeActive(false);
            return;
          }
        }
        setDrawPoints((prev) => [...prev, clickedPoint]);
      }
    },
    [drawShapeType, drawPoints]
  );

  // Attach / Detach Drawing Listener on Map
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;
    const container = map.getContainer();

    if (isDrawModeActive) {
      container.style.cursor = 'crosshair';
      map.doubleClickZoom.disable();
      map.on('click', handleMapClickForDrawing);
    } else {
      container.style.cursor = '';
      map.doubleClickZoom.enable();
    }

    return () => {
      container.style.cursor = '';
      map.doubleClickZoom.enable();
      map.off('click', handleMapClickForDrawing);
    };
  }, [isDrawModeActive, handleMapClickForDrawing]);

  // Synchronize Drawn Vector Layers on Map Canvas
  useEffect(() => {
    if (!drawLayerRef.current) return;
    const drawGroup = drawLayerRef.current;
    drawGroup.clearLayers();

    // Render in-progress vertices and guide polyline
    if (drawPoints.length > 0) {
      L.polyline(drawPoints, {
        color: '#1F5FAD',
        weight: 2.5,
        dashArray: '5, 5'
      }).addTo(drawGroup);

      drawPoints.forEach((pt, idx) => {
        const isFirst = idx === 0;
        L.circleMarker(pt, {
          radius: isFirst ? 7 : 5,
          color: isFirst ? '#FFC20E' : '#1F5FAD',
          weight: 2.5,
          fillColor: isFirst ? '#0B2545' : '#FFFFFF',
          fillOpacity: 1
        })
          .bindTooltip(
            isFirst
              ? 'Point 1 · Click near here to close polygon'
              : `Point ${idx + 1}`,
            { permanent: false, direction: 'top' }
          )
          .addTo(drawGroup);
      });
    }

    // Render completed polygon/rectangle
    const activeShape = completedShape || (spatialAoiFilter?.coordinates ? {
      coordinates: spatialAoiFilter.coordinates,
      areaKm2: spatialAoiFilter.areaKm2,
      perimeterKm: spatialAoiFilter.perimeterKm,
      type: spatialAoiFilter.type || 'Polygon'
    } : null);

    if (activeShape && activeShape.coordinates) {
      const poly = L.polygon(activeShape.coordinates, {
        color: '#FFC20E',
        weight: 2.5,
        dashArray: '6, 6',
        fillColor: '#1F5FAD',
        fillOpacity: 0.18
      }).addTo(drawGroup);

      poly.bindTooltip(
        `<div class="p-1 text-xs">
          <p class="font-bold text-[#0B2545]">Drawn Area (${activeShape.type})</p>
          <p class="text-[11px] text-[#5B6B7F]">Area: <b>${activeShape.areaKm2} km²</b></p>
          ${activeShape.perimeterKm ? `<p class="text-[11px] text-[#5B6B7F]">Perimeter: <b>${activeShape.perimeterKm} km</b></p>` : ''}
        </div>`,
        { sticky: true, className: 'adsdi-leaflet-tooltip' }
      );
    }
  }, [drawPoints, completedShape, spatialAoiFilter]);

  // Finish polygon button action
  const handleFinishPolygon = () => {
    if (drawPoints.length >= 3) {
      const area = calculatePolygonAreaKm2(drawPoints);
      const perim = calculatePerimeterKm(drawPoints);
      setCompletedShape({
        type: 'Polygon',
        coordinates: drawPoints,
        areaKm2: area,
        perimeterKm: perim
      });
      setDrawPoints([]);
      setIsDrawModeActive(false);
    }
  };

  // Clear manual drawing
  const handleClearDrawing = () => {
    setDrawPoints([]);
    setCompletedShape(null);
    setIsDrawModeActive(false);
    if (onClearSpatialFilter) {
      onClearSpatialFilter();
    }
  };

  // Apply spatial query filter to catalogue
  const handleApplySpatialQuery = () => {
    const coords = completedShape?.coordinates || spatialAoiFilter?.coordinates;
    if (!coords) return;
    const matchingIds = findIntersectingDatasets(coords);
    if (onApplySpatialFilter) {
      onApplySpatialFilter({
        ids: matchingIds,
        areaKm2: completedShape?.areaKm2 || spatialAoiFilter?.areaKm2 || 0,
        perimeterKm: completedShape?.perimeterKm || spatialAoiFilter?.perimeterKm || 0,
        type: completedShape?.type || spatialAoiFilter?.type || 'Polygon',
        coordinates: coords
      });
    }
  };

  return (
    <div className={`relative w-full h-full min-h-[300px] flex-1 bg-[#E5E9F0] overflow-hidden select-none ${className}`}>
      {/* Actual Geographic Map Canvas */}
      <div
        ref={mapContainerRef}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%' }}
        className="z-0 outline-none"
      />

      {/* Top-Right: Map Controls Toolbar */}
      {showToolbar && (
      <div className={`absolute z-20 flex flex-col gap-2 ${compact ? 'top-2 right-2' : 'top-4 right-4'}`}>
        {/* Zoom & Home Group */}
        <div className="flex flex-col bg-white rounded-xl shadow-md border border-[#E3E8EF] overflow-hidden">
          <button
            type="button"
            onClick={handleZoomIn}
            className={`${compact ? 'p-1.5' : 'p-2.5'} text-[#0B2545] hover:bg-[#F5F7FA] border-b border-[#E3E8EF] transition-colors cursor-pointer`}
            title="Zoom In (+)"
            aria-label="Zoom In"
          >
            <Plus size={compact ? 15 : 18} weight="bold" />
          </button>
          <button
            type="button"
            onClick={handleZoomOut}
            className={`${compact ? 'p-1.5' : 'p-2.5'} text-[#0B2545] hover:bg-[#F5F7FA] border-b border-[#E3E8EF] transition-colors cursor-pointer`}
            title="Zoom Out (-)"
            aria-label="Zoom Out"
          >
            <Minus size={compact ? 15 : 18} weight="bold" />
          </button>
          <button
            type="button"
            onClick={handleResetView}
            className={`${compact ? 'p-1.5' : 'p-2.5'} text-[#0B2545] hover:bg-[#F5F7FA] transition-colors cursor-pointer`}
            title="Reset Abu Dhabi Center"
            aria-label="Reset Map View"
          >
            <House size={compact ? 15 : 18} weight="bold" />
          </button>
        </div>

        {/* Layers & Basemap Group */}
        {(showLayersControl || showBasemapControl) && (
        <div className="flex flex-col bg-white rounded-xl shadow-md border border-[#E3E8EF] overflow-hidden">
          {/* Layer Overlay Toggle */}
          {showLayersControl && (
          <button
            type="button"
            onClick={() => {
              setShowLayerPanel((prev) => !prev);
              setShowBasemapPicker(false);
            }}
            className={`${compact ? 'p-1.5' : 'p-2.5'} transition-colors cursor-pointer ${
              showLayerPanel ? 'bg-[#0B2545] text-white' : 'text-[#0B2545] hover:bg-[#F5F7FA]'
            }`}
            title="Thematic Geospatial Layers"
            aria-label="Thematic Layers"
          >
            <Stack size={compact ? 15 : 18} weight="bold" />
          </button>
          )}

          {/* Basemap Switcher Toggle */}
          {showBasemapControl && (
          <button
            type="button"
            onClick={() => {
              setShowBasemapPicker((prev) => !prev);
              setShowLayerPanel(false);
            }}
            className={`${compact ? 'p-1.5' : 'p-2.5'} transition-colors cursor-pointer ${showLayersControl ? 'border-t border-[#E3E8EF]' : ''} ${
              showBasemapPicker ? 'bg-[#0B2545] text-white' : 'text-[#0B2545] hover:bg-[#F5F7FA]'
            }`}
            title="Switch Basemap Style"
            aria-label="Switch Basemap"
          >
            <GlobeHemisphereWest size={compact ? 15 : 18} weight="bold" />
          </button>
          )}
        </div>
        )}

        {/* Dedicated Spatial Analysis / Draw Area Tool Group */}
        {showDrawingTools && (
        <div className="flex flex-col bg-white rounded-xl shadow-md border border-[#E3E8EF] overflow-hidden">
          <button
            type="button"
            onClick={() => {
              setShowBasemapPicker(false);
              setShowLayerPanel(false);
              if (isDrawModeActive) {
                setIsDrawModeActive(false);
                setDrawPoints([]);
              } else {
                setIsDrawModeActive(true);
                setDrawPoints([]);
              }
            }}
            className={`${compact ? 'p-1.5' : 'p-2.5'} transition-colors cursor-pointer ${
              isDrawModeActive
                ? 'bg-[#0B2545] text-[#FFC20E] ring-2 ring-[#FFC20E]/40'
                : (completedShape || spatialAoiFilter)
                ? 'bg-blue-50 text-[#1F5FAD] hover:bg-blue-100'
                : 'text-[#0B2545] hover:bg-[#F5F7FA]'
            }`}
            title="Draw Area"
            aria-label="Draw Area"
          >
            <Polygon size={compact ? 15 : 18} weight="bold" />
          </button>
        </div>
        )}
      </div>
      )}

      {/* Floating Basemap Selector Popover */}
      {showBasemapPicker && (
        <div className="absolute top-4 right-16 z-30 bg-white rounded-2xl shadow-xl border border-[#E3E8EF] p-3 w-56 animate-fade-in">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#E3E8EF]">
            <span className="text-xs font-bold text-[#0B2545] uppercase tracking-wider">
              Basemap Cartography
            </span>
            <button
              onClick={() => setShowBasemapPicker(false)}
              className="text-[#5B6B7F] hover:text-[#0B2545] cursor-pointer"
            >
              <X size={14} />
            </button>
          </div>
          <div className="space-y-1.5">
            {Object.entries(BASEMAP_TILES).map(([key, item]) => (
              <button
                key={key}
                onClick={() => {
                  setActiveBasemap(key);
                  setShowBasemapPicker(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeBasemap === key
                    ? 'bg-[#0B2545] text-white shadow-xs'
                    : 'text-[#14213D] hover:bg-[#F5F7FA]'
                }`}
              >
                <span>{item.name}</span>
                {activeBasemap === key && <CheckCircle size={14} weight="fill" className="text-[#FFC20E]" />}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Floating Layer Control Popover */}
      {showLayerPanel && (
        <div className="absolute top-20 right-16 z-30 bg-white rounded-2xl shadow-xl border border-[#E3E8EF] p-4 w-72 max-h-[460px] flex flex-col animate-fade-in">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#E3E8EF] shrink-0">
            <div className="flex items-center gap-1.5">
              <Stack size={16} className="text-[#1F5FAD]" weight="bold" />
              <span className="text-xs font-bold text-[#0B2545] uppercase tracking-wider">
                Geospatial Layers
              </span>
            </div>
            <button
              onClick={() => setShowLayerPanel(false)}
              className="text-[#5B6B7F] hover:text-[#0B2545] cursor-pointer"
            >
              <X size={14} />
            </button>
          </div>

          <div className="flex items-center justify-between text-[11px] text-[#5B6B7F] pb-2 shrink-0">
            <span>{datasets.length} layers active (filtered)</span>
            <div className="flex gap-2">
              <button
                onClick={() => toggleAllLayers(true)}
                className="text-[#1F5FAD] font-semibold hover:underline cursor-pointer"
              >
                All on
              </button>
              <span>•</span>
              <button
                onClick={() => toggleAllLayers(false)}
                className="text-[#5B6B7F] hover:underline cursor-pointer"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Scrollable Layers List */}
          <div className="overflow-y-auto space-y-1.5 pr-1 flex-1 text-xs">
            {Object.entries(DATASET_GEOMETRIES).map(([layerId, geom]) => {
              const isMatchingFilter = activeDatasetIds.has(layerId);
              const isVisible = visibleLayerIds.has(layerId) && isMatchingFilter;
              const isSelected = selectedDataset?.id === layerId;

              return (
                <div
                  key={layerId}
                  onClick={() => {
                    if (isMatchingFilter) toggleLayerVisibility(layerId);
                  }}
                  className={`flex items-center justify-between p-2 rounded-lg transition-colors ${
                    !isMatchingFilter
                      ? 'opacity-40 bg-slate-50 cursor-not-allowed'
                      : isSelected
                      ? 'bg-amber-50/80 border border-amber-200 cursor-pointer'
                      : isVisible
                      ? 'hover:bg-[#F5F7FA] cursor-pointer'
                      : 'opacity-60 hover:opacity-90 cursor-pointer'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0 pr-2">
                    <span
                      className="w-3 h-3 rounded-full shrink-0 border"
                      style={{ backgroundColor: geom.color, borderColor: geom.color }}
                    />
                    <span className="truncate text-xs font-medium text-[#14213D] leading-tight">
                      {geom.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    {!isMatchingFilter ? (
                      <span className="text-[10px] text-slate-400 font-mono italic">Filtered</span>
                    ) : (
                      <button
                        type="button"
                        className="text-[#5B6B7F]"
                        title={isVisible ? 'Hide layer' : 'Show layer'}
                      >
                        {isVisible ? <Eye size={16} className="text-[#1F5FAD]" /> : <EyeSlash size={16} />}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Active Drawing Mode Helper Banner (Compact at Top-Center) */}
      {isDrawModeActive && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-[#E3E8EF] px-3.5 py-2 flex items-center gap-3 animate-fade-in text-xs max-w-[95%] sm:max-w-none">
          <div className="flex items-center gap-1.5 font-bold text-[#0B2545]">
            <Polygon size={16} weight="bold" className="text-[#1F5FAD]" />
            <span>Draw Area</span>
          </div>

          <div className="flex bg-slate-100 p-0.5 rounded-lg text-[11px]">
            <button
              type="button"
              onClick={() => {
                setDrawShapeType('polygon');
                setDrawPoints([]);
              }}
              className={`px-2 py-0.5 rounded font-semibold cursor-pointer transition-colors ${
                drawShapeType === 'polygon' ? 'bg-white text-[#0B2545] shadow-2xs' : 'text-[#5B6B7F]'
              }`}
            >
              Polygon
            </button>
            <button
              type="button"
              onClick={() => {
                setDrawShapeType('rectangle');
                setDrawPoints([]);
              }}
              className={`px-2 py-0.5 rounded font-semibold cursor-pointer transition-colors ${
                drawShapeType === 'rectangle' ? 'bg-white text-[#0B2545] shadow-2xs' : 'text-[#5B6B7F]'
              }`}
            >
              Box
            </button>
          </div>

          <span className="text-slate-300">|</span>

          <span className="text-[11px] text-[#5B6B7F] truncate">
            {drawShapeType === 'polygon'
              ? drawPoints.length >= 3
                ? `${drawPoints.length} points · Click Point 1 or Finish`
                : `Click map to place points (${drawPoints.length}/3 min)`
              : drawPoints.length === 1
              ? 'Click opposite corner to finish'
              : 'Click 1st corner on map'}
          </span>

          {drawShapeType === 'polygon' && drawPoints.length >= 3 && (
            <button
              type="button"
              onClick={handleFinishPolygon}
              className="px-2.5 py-1 rounded-lg bg-[#0B2545] text-white hover:bg-[#13315C] font-semibold text-[11px] cursor-pointer flex items-center gap-1 shadow-2xs"
            >
              <Check size={12} weight="bold" className="text-[#FFC20E]" />
              <span>Finish</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => {
              setIsDrawModeActive(false);
              setDrawPoints([]);
            }}
            className="p-1 rounded-md text-slate-400 hover:text-[#0B2545] hover:bg-slate-100 transition-colors cursor-pointer"
            title="Cancel Drawing"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Top-Left Workspace Panels: Area Filter Panel & Selected Dataset Preview */}
      <div className="absolute top-4 left-4 z-20 flex flex-col gap-3 max-w-sm w-[calc(100%-2rem)] sm:w-88 pointer-events-none">
        {/* 1. Compact Area Filter Panel (Shown when area is drawn or spatial filter active) */}
        {(completedShape || spatialAoiFilter) && (
          <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-[#E3E8EF] shadow-lg p-3.5 w-full animate-fade-in pointer-events-auto">
            {/* Header */}
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#E3E8EF]">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-blue-50 text-[#1F5FAD] flex items-center justify-center shrink-0">
                  <Polygon size={14} weight="bold" />
                </div>
                <h4 className="text-xs font-bold text-[#0B2545] uppercase tracking-wider">
                  Area Filter
                </h4>
              </div>
              <button
                type="button"
                onClick={handleClearDrawing}
                className="p-1 rounded-md text-slate-400 hover:text-[#0B2545] hover:bg-slate-100 transition-colors cursor-pointer"
                title="Clear Area & Spatial Filter"
                aria-label="Close Area Filter"
              >
                <X size={15} />
              </button>
            </div>

            {/* Area summary: km², perimeter, and concise status */}
            <div className="flex items-center justify-between text-xs mb-2">
              <div className="flex items-center gap-1.5 text-[11px] font-mono">
                <span className="font-bold text-[#0B2545] bg-slate-100 px-2 py-0.5 rounded">
                  {completedShape?.areaKm2 || spatialAoiFilter?.areaKm2 || 0} km²
                </span>
                {(completedShape?.perimeterKm || spatialAoiFilter?.perimeterKm) && (
                  <span className="text-[#5B6B7F] text-[10px]">
                    · {completedShape?.perimeterKm || spatialAoiFilter?.perimeterKm} km perim
                  </span>
                )}
              </div>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                  spatialAoiFilter
                    ? 'bg-emerald-50 text-[#1E9E6A]'
                    : 'bg-amber-50 text-[#D97706]'
                }`}
              >
                {spatialAoiFilter ? 'Filter Active' : 'Area Drawn'}
              </span>
            </div>

            <p className="text-[11px] text-[#5B6B7F] mb-3 leading-tight">
              {spatialAoiFilter
                ? `Actively filtering catalogue to intersecting records (${datasets.length} displayed).`
                : 'Geographic area defined. Query catalogue for intersecting datasets.'}
            </p>

            {/* Actions: Primary "Find Datasets in Area", Secondary "Clear Area" */}
            <div className="flex items-center gap-2 pt-2 border-t border-[#E3E8EF]">
              <button
                type="button"
                onClick={handleApplySpatialQuery}
                className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-[#0B2545] hover:bg-[#13315C] text-white text-xs font-semibold transition-colors cursor-pointer shadow-xs"
                title="Find and filter datasets intersecting this area"
              >
                <Funnel size={13} weight="bold" className="text-[#FFC20E]" />
                <span>Find Datasets in Area</span>
              </button>

              <button
                type="button"
                onClick={handleClearDrawing}
                className="px-3 py-1.5 rounded-lg border border-[#E3E8EF] text-slate-600 hover:bg-slate-100 text-xs font-medium transition-colors cursor-pointer"
                title="Clear drawn boundary and spatial filter"
              >
                Clear Area
              </button>
            </div>
          </div>
        )}

        {/* 2. Compact Selected-Dataset Detail Card */}
        {selectedDataset && !isDetailCardDismissed && (
          <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-[#E3E8EF] shadow-lg p-3.5 w-full animate-fade-in pointer-events-auto">
            {/* Header Row with Close Button */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-bold text-[#1F5FAD] uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded">
                  {selectedDataset.entityShort}
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-xs text-[#5B6B7F] font-medium">{selectedDataset.theme}</span>
              </div>
              <button
                onClick={() => setIsDetailCardDismissed(true)}
                className="p-1 rounded-lg text-slate-400 hover:text-[#0B2545] hover:bg-slate-100 transition-colors cursor-pointer"
                title="Close card"
                aria-label="Close dataset preview"
              >
                <X size={15} />
              </button>
            </div>

            {/* Dataset Title */}
            <h3 className="text-sm font-bold text-[#0B2545] mt-1.5 leading-snug line-clamp-2">
              {selectedDataset.title}
            </h3>

            {/* Description */}
            <p className="text-xs text-[#5B6B7F] mt-1 line-clamp-2 leading-relaxed">
              {selectedDataset.description}
            </p>

            {/* Badges */}
            <div className="flex items-center gap-2 mt-2.5 flex-wrap">
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                  selectedDataset.classification.includes('Open')
                    ? 'bg-emerald-50 text-[#1E9E6A]'
                    : selectedDataset.classification.includes('Restricted')
                    ? 'bg-amber-50 text-[#E8A317]'
                    : 'bg-blue-50 text-[#1F5FAD]'
                }`}
              >
                {selectedDataset.classification}
              </span>

              {selectedDataset.extent && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-[#5B6B7F] font-medium truncate max-w-[170px]">
                  {selectedDataset.extent}
                </span>
              )}
            </div>

            {/* Formats and metadata */}
            <div className="mt-2.5 pt-2 border-t border-[#E3E8EF] flex items-center justify-between text-[11px] text-[#5B6B7F]">
              <span>Updated: {selectedDataset.lastUpdated}</span>
              <div className="flex items-center gap-1">
                {selectedDataset.formats?.slice(0, 2).map((fmt) => (
                  <span key={fmt} className="font-mono text-[9px] px-1.5 py-0.2 bg-slate-100 rounded text-slate-600">
                    {fmt}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions Button Group */}
            <div className="mt-2.5 pt-2 border-t border-[#E3E8EF] flex items-center gap-2">
              <Link
                to={`/catalogue/${selectedDataset.slug}`}
                className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-[#0B2545] text-white hover:bg-[#13315C] text-xs font-semibold transition-colors shadow-xs"
              >
                <span>View Details</span>
                <ArrowRight size={13} weight="bold" />
              </Link>

              <button
                type="button"
                onClick={() => toggleLayerVisibility(selectedDataset.id)}
                className={`px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-colors cursor-pointer flex items-center gap-1 ${
                  visibleLayerIds.has(selectedDataset.id)
                    ? 'bg-blue-50 text-[#1F5FAD] border-blue-200'
                    : 'bg-white text-slate-600 border-[#E3E8EF] hover:bg-slate-50'
                }`}
                title={visibleLayerIds.has(selectedDataset.id) ? 'Hide overlay on map' : 'Show overlay on map'}
              >
                {visibleLayerIds.has(selectedDataset.id) ? (
                  <>
                    <Eye size={13} weight="bold" />
                    <span>On</span>
                  </>
                ) : (
                  <>
                    <EyeSlash size={13} />
                    <span>Off</span>
                  </>
                )}
              </button>

              {selectedDataset.classification.includes('Open') ? (
                <a
                  href="#download"
                  onClick={(e) => {
                    e.preventDefault();
                    alert(`Starting download for ${selectedDataset.title} (GeoJSON package).`);
                  }}
                  className="p-1.5 rounded-lg border border-[#E3E8EF] bg-white text-[#14213D] hover:bg-slate-50 text-xs transition-colors"
                  title="Download GeoJSON (Open Data)"
                >
                  <DownloadSimple size={16} />
                </a>
              ) : (
                <span
                  className="p-1.5 rounded-lg border border-slate-200 bg-slate-100 text-slate-400 text-xs cursor-not-allowed"
                  title="Restricted under Data Sharing Agreement (DSA)"
                >
                  <Lock size={16} />
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ======================================================== */}
      {/* GEOGRAPHIC THEME DOCK (Bottom of Map Workspace)           */}
      {/* Sleek, reduced footprint to maximize map canvas view       */}
      {/* ======================================================== */}
      {/* ======================================================== */}
      {/* 1. GEOGRAPHIC THEME DOCK (Bottom-Left of Map Workspace)  */}
      {/* Sleek, reduced footprint to maximize map canvas view      */}
      {/* ======================================================== */}
      {showThemeDock && (
      <div className="absolute bottom-11 sm:bottom-12 left-3 sm:left-4 z-20 pointer-events-auto bg-white/95 backdrop-blur-md rounded-xl sm:rounded-2xl border border-[#E3E8EF] shadow-lg p-2 sm:p-2.5 transition-all max-w-[calc(100vw-220px)] sm:max-w-[560px] md:max-w-[660px]">
        <div className="flex flex-col gap-1 min-w-0">
          {/* Header Row: "Explore by Theme" (Serif) + Clear Filter + Circular Arrow Controls + Collapse Toggle */}
          <div className="flex items-center justify-between px-1 gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <h2
                className="text-xs sm:text-[13px] font-bold text-[#0B2545] tracking-tight shrink-0"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Explore by Theme
              </h2>
              {selectedTheme && selectedTheme !== 'All' && (
                <button
                  type="button"
                  onClick={() => onSelectTheme && onSelectTheme('All')}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#1F5FAD]/10 text-[#1F5FAD] hover:bg-[#1F5FAD]/20 transition cursor-pointer shrink-0"
                  title="Clear theme filter to show all datasets"
                >
                  <span>All Datasets</span>
                  <X size={10} weight="bold" />
                </button>
              )}
            </div>

            {/* Circular Next/Previous Navigation Buttons & Collapse/Expand */}
            <div className="flex items-center gap-1 shrink-0">
              {!isDockCollapsed && (
                <>
                  <button
                    type="button"
                    onClick={() => scrollDock('left')}
                    className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-[#E3E8EF] bg-white flex items-center justify-center text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition cursor-pointer shadow-2xs"
                    title="Scroll themes left"
                    aria-label="Previous themes"
                  >
                    <CaretLeft size={11} weight="bold" />
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollDock('right')}
                    className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-[#E3E8EF] bg-white flex items-center justify-center text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition cursor-pointer shadow-2xs"
                    title="Scroll themes right"
                    aria-label="Next themes"
                  >
                    <CaretRight size={11} weight="bold" />
                  </button>
                </>
              )}
              <button
                type="button"
                onClick={() => setIsDockCollapsed((prev) => !prev)}
                className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-[#E3E8EF] bg-white flex items-center justify-center text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition cursor-pointer shadow-2xs ml-0.5"
                title={isDockCollapsed ? 'Expand Themes' : 'Collapse Themes'}
                aria-label={isDockCollapsed ? 'Expand Themes' : 'Collapse Themes'}
              >
                {isDockCollapsed ? <CaretUp size={11} weight="bold" /> : <CaretDown size={11} weight="bold" />}
              </button>
            </div>
          </div>

          {/* Horizontally Scrollable Theme Cards Row */}
          {!isDockCollapsed && (
            <div
              ref={dockScrollRef}
              onWheel={(e) => {
                if (e.deltaY !== 0 && dockScrollRef.current) {
                  dockScrollRef.current.scrollLeft += e.deltaY;
                }
              }}
              className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-none py-0.5 px-0.5 scroll-smooth"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {EXPLORE_THEMES.map((thm) => {
                const isSelected = selectedTheme?.toLowerCase() === thm.name.toLowerCase();
                return (
                  <button
                    key={thm.id}
                    type="button"
                    onClick={() => {
                      if (onSelectTheme) {
                        onSelectTheme(isSelected ? 'All' : thm.name);
                      }
                    }}
                    className={`w-[76px] sm:w-[80px] md:w-[84px] shrink-0 rounded-lg sm:rounded-xl overflow-hidden transition-all duration-200 cursor-pointer group text-left relative bg-white flex flex-col justify-between ${
                      isSelected
                        ? 'border-[1.5px] border-[#FFC20E] ring-1.5 ring-[#FFC20E]/25 shadow-xs'
                        : 'border border-[#E3E8EF] hover:border-slate-300 hover:shadow-2xs'
                    }`}
                    title={`${thm.name}: ${thm.count} (${thm.desc})`}
                  >
                    {/* Card Image: Fills the container flush to top/left/right edges */}
                    <div className="w-full h-11 sm:h-12 overflow-hidden bg-slate-100 relative shrink-0">
                      <img
                        src={thm.image}
                        alt={thm.name}
                        className="w-full h-full object-cover block transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>

                    {/* Content Section below image */}
                    <div className="px-1.5 py-1 bg-white flex flex-col justify-between flex-1 min-w-0">
                      <div className="h-6 flex items-center">
                        <div className="text-[9px] sm:text-[9.5px] font-bold text-[#0B2545] leading-tight line-clamp-2">
                          {thm.name}
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-0.5 text-[8.5px] sm:text-[9px] text-[#5B6B7F]">
                        <span className="truncate">{thm.count}</span>
                        <ArrowRight
                          size={9}
                          weight="bold"
                          className="text-[#0B2545] shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 ml-0.5"
                        />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
      )}

      {/* ======================================================== */}
      {/* 2. MAP LEGEND (Independent Container on the Opposite Side) */}
      {/* Positioned bottom-right above cartographic attribution     */}
      {/* ======================================================== */}
      <div className="absolute bottom-11 sm:bottom-12 right-3 sm:right-4 z-20 pointer-events-auto bg-white/95 backdrop-blur-md rounded-xl sm:rounded-2xl border border-[#E3E8EF] shadow-lg p-2.5 transition-all w-48 sm:w-52">
        <div className="flex items-center justify-between pb-1.5 border-b border-[#E3E8EF]/80 px-0.5">
          <div className="flex items-center gap-1.5">
            <Sliders size={13} weight="bold" className="text-[#1F5FAD]" />
            <span className="text-[11px] sm:text-xs font-bold text-[#0B2545] tracking-tight">Map Legend</span>
          </div>
          <button
            type="button"
            onClick={() => setIsLegendCollapsed((prev) => !prev)}
            className="p-1 rounded-md text-slate-400 hover:text-[#0B2545] hover:bg-slate-100 transition cursor-pointer"
            title={isLegendCollapsed ? 'Expand Legend' : 'Collapse Legend'}
            aria-label={isLegendCollapsed ? 'Expand Legend' : 'Collapse Legend'}
          >
            {isLegendCollapsed ? <CaretUp size={11} weight="bold" /> : <CaretDown size={11} weight="bold" />}
          </button>
        </div>

        {!isLegendCollapsed ? (
          <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 pt-2 text-[9.5px] sm:text-[10px] text-[#475569] font-medium leading-tight">
            <button
              type="button"
              onClick={() => onSelectTheme && onSelectTheme('Land & Cadastre')}
              className="flex items-center gap-1.5 p-1 rounded-md hover:bg-slate-100 transition-colors text-left cursor-pointer"
              title="Filter by Land & Cadastre"
            >
              <span className="w-2.5 h-2.5 rounded-xs bg-[#3B82F6]/30 border border-[#3B82F6] shrink-0" />
              <span className="truncate">Cadastre</span>
            </button>
            <button
              type="button"
              onClick={() => onSelectTheme && onSelectTheme('Transport')}
              className="flex items-center gap-1.5 p-1 rounded-md hover:bg-slate-100 transition-colors text-left cursor-pointer"
              title="Filter by Transport"
            >
              <span className="w-3 h-1 rounded-xs bg-[#FFC20E] shrink-0" />
              <span className="truncate">Highways</span>
            </button>
            <button
              type="button"
              onClick={() => onSelectTheme && onSelectTheme('Environment')}
              className="flex items-center gap-1.5 p-1 rounded-md hover:bg-slate-100 transition-colors text-left cursor-pointer"
              title="Filter by Environment"
            >
              <span className="w-2.5 h-2.5 rounded-xs bg-[#10B981]/30 border border-[#10B981] shrink-0" />
              <span className="truncate">Mangroves</span>
            </button>
            <button
              type="button"
              onClick={() => onSelectTheme && onSelectTheme('Utilities')}
              className="flex items-center gap-1.5 p-1 rounded-md hover:bg-slate-100 transition-colors text-left cursor-pointer"
              title="Filter by Utilities"
            >
              <span className="w-3 h-1 rounded-xs bg-[#06B6D4] shrink-0" />
              <span className="truncate">Utilities</span>
            </button>
            <button
              type="button"
              onClick={() => onSelectTheme && onSelectTheme('Buildings & 3D')}
              className="flex items-center gap-1.5 p-1 rounded-md hover:bg-slate-100 transition-colors text-left cursor-pointer"
              title="Filter by Buildings & 3D"
            >
              <span className="w-2.5 h-2.5 rounded-xs bg-[#8B5CF6]/30 border border-[#8B5CF6] shrink-0" />
              <span className="truncate">3D Massing</span>
            </button>
            <button
              type="button"
              onClick={() => onSelectTheme && onSelectTheme('Boundaries')}
              className="flex items-center gap-1.5 p-1 rounded-md hover:bg-slate-100 transition-colors text-left cursor-pointer"
              title="Filter by Boundaries"
            >
              <span className="w-3 h-0.5 border-b border-dashed border-[#1F5FAD] shrink-0" />
              <span className="truncate">Boundaries</span>
            </button>
          </div>
        ) : (
          <div className="text-[10px] text-[#5B6B7F] py-1 px-0.5 italic flex items-center justify-between">
            <span>6 active thematic layers</span>
          </div>
        )}
      </div>

      {/* Bottom Bar: Scale, Coordinates & Cartographic Attribution */}
      {showCoordinateBar && (
      <div className="absolute bottom-3 left-3 z-20 flex items-center gap-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-[#E3E8EF] text-[11px] font-mono text-[#5B6B7F] shadow-xs">
        <div className="flex items-center gap-1.5 text-[#0B2545] font-semibold">
          <MapPin size={12} weight="fill" className="text-[#1F5FAD]" />
          <span>{cursorCoords.lat}° N, {cursorCoords.lng}° E</span>
        </div>
        <span className="text-slate-300">|</span>
        <span className="hidden sm:inline">EPSG:3997 (UAE Grid)</span>
        <span className="text-slate-300 hidden sm:inline">|</span>
        <span>Zoom {currentZoom}</span>
      </div>
      )}

      {/* Bottom-Right: Attribution Tag */}
      {showCoordinateBar && (
      <div className="absolute bottom-3 right-3 z-20 text-[10px] text-slate-500 bg-white/80 backdrop-blur-xs px-2 py-0.5 rounded border border-slate-200/80 shadow-2xs">
        Basemap: <span className="font-semibold text-slate-700">{BASEMAP_TILES[activeBasemap]?.name || 'Esri Canvas'}</span> · Sovereign AD-SDI
      </div>
      )}
    </div>
  );
}

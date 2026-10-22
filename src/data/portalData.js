/**
 * Central authoritative data module for the AD-SDI Portal.
 * Aligned with the DGE Spatial Data Brief and reference information architecture.
 */

export const searchScopes = [
  { id: 'all', label: 'All Categories' },
  { id: 'datasets', label: 'Datasets' },
  { id: 'maps', label: 'Maps' },
  { id: 'services', label: 'Services' },
  { id: 'applications', label: 'Applications' },
  { id: 'models', label: 'AI Models' }
];

export const platformMetrics = [
  {
    value: '2,480',
    label: 'Authoritative Spatial Datasets',
    detail: 'Across 64 government entities',
    status: 'Verified'
  },
  {
    value: '64',
    label: 'Contributing Entities',
    detail: 'Government custodians & authorities',
    status: 'Active'
  },
  {
    value: '1,150',
    label: 'OGC Web Services',
    detail: 'WMS, WFS, WMTS & API Features',
    status: 'Operational'
  },
  {
    value: '99.9%',
    label: 'Platform Availability',
    detail: '24/7 sovereign uptime SLA',
    status: 'Online'
  }
];

export const themeCategories = [
  {
    id: 'boundaries',
    name: 'Boundaries',
    nameAr: 'الحدود الإدارية',
    count: '320 datasets',
    countNum: 320,
    desc: 'Emirate administrative borders, municipal zones, and sector boundaries.',
    image: '/assets/theme_boundaries.jpg',
    color: '#1F5FAD'
  },
  {
    id: 'transport',
    name: 'Transport',
    nameAr: 'النقل والطرق',
    count: '420 datasets',
    countNum: 420,
    desc: 'Highways, arterial corridors, public transit networks, and maritime channels.',
    image: '/assets/theme_transport.jpg',
    color: '#0B2545'
  },
  {
    id: 'cadastre',
    name: 'Land & Cadastre',
    nameAr: 'الأراضي والمخططات',
    count: '380 datasets',
    countNum: 380,
    desc: 'Authoritative land parcels, cadastral deeds, zoning boundaries, and master plots.',
    image: '/assets/theme_cadastre.jpg',
    color: '#1F5FAD'
  },
  {
    id: 'buildings',
    name: 'Buildings & 3D',
    nameAr: 'المباني وثلاثية الأبعاد',
    count: '290 datasets',
    countNum: 290,
    desc: 'LOD2 building massing, structural footprints, architectural heights, and 3D meshes.',
    image: '/assets/theme_buildings.jpg',
    color: '#2BA6DE'
  },
  {
    id: 'environment',
    name: 'Environment',
    nameAr: 'البيئة والمحميات',
    count: '310 datasets',
    countNum: 310,
    desc: 'Mangrove extents, marine protected areas, groundwater zones, and coastal habitats.',
    image: '/assets/theme_environment.jpg',
    color: '#1E9E6A'
  },
  {
    id: 'utilities',
    name: 'Utilities',
    nameAr: 'المرافق والبنية',
    count: '180 datasets',
    countNum: 180,
    desc: 'Subterranean water conduits, power transmission grids, and telecoms corridors.',
    image: '/assets/theme_utilities.jpg',
    color: '#D97706'
  },
  {
    id: 'imagery',
    name: 'Imagery',
    nameAr: 'الصور الفضائية',
    count: '260 datasets',
    countNum: 260,
    desc: 'Very-high-resolution satellite orthoimagery, multi-spectral dates, and nadir tiles.',
    image: '/assets/theme_imagery.jpg',
    color: '#E07B24'
  },
  {
    id: 'population',
    name: 'Population',
    nameAr: 'السكان والإحصاء',
    count: '210 datasets',
    countNum: 210,
    desc: '100m statistical population grids, demographic density, and civic facilities.',
    image: '/assets/theme_population.jpg',
    color: '#7B4FD6'
  }
];

export const latestUpdates = [
  {
    id: 'upd-01',
    category: 'DATASET',
    categoryColor: '#1F5FAD',
    date: '12 Oct 2026',
    title: 'New Coastal Habitat & Mangrove Layer 2026',
    entity: 'Environment Agency – Abu Dhabi (EAD)',
    desc: 'High-resolution coastal mangrove boundary survey featuring calibrated multi-temporal drone and satellite baseline metrics.',
    image: '/assets/theme_environment.jpg',
    link: '/catalogue?theme=Environment'
  },
  {
    id: 'upd-02',
    category: 'ANNOUNCEMENT',
    categoryColor: '#7B4FD6',
    date: '08 Oct 2026',
    title: 'GeoAI Studio v3.2 Deployment',
    entity: 'AD-SDI Innovation Lab',
    desc: 'Upgraded automated change detection models MR-B-007 with 93% precision for unpermitted construction and shoreline variations.',
    image: '/assets/geoai_after.jpg',
    link: '/capabilities/geoai'
  },
  {
    id: 'upd-03',
    category: 'EVENT',
    categoryColor: '#D97706',
    date: '05 Oct 2026',
    title: 'AD-SDI Geospatial Developer Forum 2026',
    entity: 'Department of Government Enablement (DGE)',
    desc: 'Annual technical symposium for government engineers and partner integrators on OGC API Features, Webhooks, and UAE cloud SDKs.',
    image: '/assets/capacity_building_gis.jpg',
    link: '/developers'
  }
];

export const sampleDatasets = [
  {
    id: 'ds-01',
    title: 'Abu Dhabi Official Cadastral Parcels 2026',
    entity: 'Department of Municipalities and Transport (DMT)',
    theme: 'Land & Cadastre',
    classification: 'Shared · Government',
    classBadge: 'badge-blue',
    format: 'OGC API · GeoJSON · WFS',
    crs: 'WGS 84 / UTM 40N (EPSG:32640) & UAE National Grid (EPSG:3997)',
    records: '412,380 parcels',
    updated: '1 Oct 2026',
    quality: '99.8% Passed Gateway',
    description: 'Authoritative parcel boundaries, plot zoning classifications, and deed references across Abu Dhabi island, Al Ain, and Al Dhafra.',
    featured: true
  },
  {
    id: 'ds-02',
    title: 'Eastern Mangroves Habitat Extent & Canopy Health',
    entity: 'Environment Agency – Abu Dhabi (EAD)',
    theme: 'Environment',
    classification: 'Open Data',
    classBadge: 'badge-success',
    format: 'GeoJSON · Shapefile · WMS',
    crs: 'EPSG:3997',
    records: '18,420 polygons',
    updated: '28 Sep 2026',
    quality: '100% Passed Gateway',
    description: 'Protected mangrove forest perimeters, tidal channels, and vegetation canopy index monitored via Sentinel-2 and airborne LiDAR.',
    featured: true
  },
  {
    id: 'ds-03',
    title: 'Abu Dhabi 3D Building Footprints & Massing LOD2',
    entity: 'Department of Municipalities and Transport (DMT)',
    theme: 'Buildings & 3D',
    classification: 'Marketplace · Tier 1',
    classBadge: 'badge-purple',
    format: '3D Tiles · CityGML · OGC API',
    crs: 'EPSG:3997 (Z: Ellipsoidal)',
    records: '168,540 structures',
    updated: '15 Sep 2026',
    quality: '99.4% Passed Gateway',
    description: 'Extruded three-dimensional building geometries with architectural roof types, structural heights, and municipal permit identifiers.',
    featured: true
  },
  {
    id: 'ds-04',
    title: 'Strategic Highway & Arterial Network',
    entity: 'Integrated Transport Centre (ITC)',
    theme: 'Transport',
    classification: 'Open Data',
    classBadge: 'badge-success',
    format: 'GeoJSON · WFS · Vector Tiles',
    crs: 'EPSG:3997',
    records: '54,200 segments',
    updated: '22 Sep 2026',
    quality: '99.9% Passed Gateway',
    description: 'Classified road centerlines, bridge deck elevations, speed limits, and lanes across the capital and inter-emirate corridors.',
    featured: true
  },
  {
    id: 'ds-05',
    title: 'High-Resolution Satellite Orthoimagery 0.3m (2026)',
    entity: 'Department of Government Enablement (DGE)',
    theme: 'Imagery',
    classification: 'Shared · Government',
    classBadge: 'badge-blue',
    format: 'WMTS · Cloud Optimized GeoTIFF',
    crs: 'EPSG:3997',
    records: '4,850 km² coverage',
    updated: '05 Oct 2026',
    quality: '100% Passed Gateway',
    description: 'Seamless true-orthorectified satellite imagery tiles at 30cm ground resolution covering all urbanized zones of Abu Dhabi Emirate.',
    featured: true
  },
  {
    id: 'ds-06',
    title: 'Subterranean Potable Water Distribution Mains',
    entity: 'Abu Dhabi Distribution Company (ADDC)',
    theme: 'Utilities',
    classification: 'Restricted · Government Only',
    classBadge: 'badge-warning',
    format: 'OGC API · Secure WFS',
    crs: 'EPSG:3997',
    records: '82,140 segments',
    updated: '12 Sep 2026',
    quality: '98.9% Passed Gateway',
    description: 'Underground potable water utility pipeline network, pumping nodes, valves, and flow meters with strict role-based access control.',
    featured: false
  },
  {
    id: 'ds-07',
    title: '100-Meter Statistical Demographic Population Grid',
    entity: 'Statistics Centre – Abu Dhabi (SCAD)',
    theme: 'Population',
    classification: 'Open Data',
    classBadge: 'badge-success',
    format: 'GeoJSON · CSV · WMS',
    crs: 'EPSG:3997',
    records: '24,600 grid cells',
    updated: '18 Aug 2026',
    quality: '100% Passed Gateway',
    description: 'Aggregated resident population distribution modeled on a uniform 100m x 100m grid for urban service planning and demand analysis.',
    featured: false
  },
  {
    id: 'ds-08',
    title: 'Emirate Administrative & Municipal Sector Boundaries',
    entity: 'Department of Municipalities and Transport (DMT)',
    theme: 'Boundaries',
    classification: 'Open Data',
    classBadge: 'badge-success',
    format: 'GeoJSON · Shapefile · KML',
    crs: 'EPSG:3997',
    records: '380 sectors',
    updated: '01 Jul 2026',
    quality: '100% Passed Gateway',
    description: 'Official borders of Abu Dhabi Emirate, Al Ain Region, Al Dhafra Region, municipal districts, community zones, and electoral sectors.',
    featured: false
  }
];

export const marketplaceProducts = [
  {
    id: 'mp-01',
    title: 'Building Footprints 3D (LOD2)',
    provider: 'Department of Municipalities and Transport (DMT)',
    type: '3D Spatial Dataset',
    access: 'Government Included',
    rating: 'Tier 1 SLA',
    subscribers: 142,
    formats: '3D Tiles · OGC API',
    desc: 'High-precision 3D structural massing across Abu Dhabi metropolitan core and commercial districts.'
  },
  {
    id: 'mp-02',
    title: 'Land Parcels Real-Time Validation API',
    provider: 'Department of Municipalities and Transport (DMT)',
    type: 'Web Service API',
    access: 'Authorized Entity',
    rating: 'Tier 1 SLA (p95 < 250ms)',
    subscribers: 88,
    formats: 'OGC API Features · REST',
    desc: 'High-throughput cadastral query endpoint validating land parcel rights, coordinates, and zoning restrictions.'
  },
  {
    id: 'mp-03',
    title: '100m Population & Employment Demographic Grid',
    provider: 'Statistics Centre – Abu Dhabi (SCAD)',
    type: 'Statistical Grid',
    access: 'Open Government',
    rating: 'Tier 2 SLA',
    subscribers: 215,
    formats: 'GeoJSON · NetCDF · Parquet',
    desc: 'Uniform census demographic layers combined with commercial employment density for urban planning.'
  },
  {
    id: 'mp-04',
    title: 'Coastal Mangrove Extent Time-Series (2015–2026)',
    provider: 'Environment Agency – Abu Dhabi (EAD)',
    type: 'Multi-Temporal Dataset',
    access: 'Open Data',
    rating: 'Tier 2 SLA',
    subscribers: 174,
    formats: 'WMS · GeoTIFF · GeoJSON',
    desc: 'Decadal environmental monitoring data tracking blue carbon biomass and shoreline accretion.'
  },
  {
    id: 'mp-05',
    title: 'Automated Construction Change Detection Feed',
    provider: 'AD-SDI GeoAI Innovation Lab',
    type: 'AI Model Output',
    access: 'Municipal Subscription',
    rating: 'Tier 1 SLA',
    subscribers: 36,
    formats: 'GeoJSON Stream · Webhooks',
    desc: 'Automated bi-weekly anomaly flags detecting new earthworks, unpermitted structures, and building footprint changes.'
  },
  {
    id: 'mp-06',
    title: 'Rooftop Solar Photovoltaic Potential Map',
    provider: 'Abu Dhabi Energy Partner Consortium',
    type: 'Analytical Dataset',
    access: 'Authorized Partner',
    rating: 'Tier 2 SLA',
    subscribers: 59,
    formats: '3D Tiles · REST API',
    desc: 'Solar irradiance calculations and usable rooftop area estimates modeled across 95,000 villa and commercial roofs.'
  }
];

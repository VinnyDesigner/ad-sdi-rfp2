import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MapTrifold,
  Stack,
  MagnifyingGlass,
  Plus,
  Minus,
  ArrowsCounterClockwise,
  Eye,
  EyeSlash,
  Info,
  Sliders,
  CheckCircle,
  Database,
  ArrowRight,
  Crosshair,
  Compass,
  BookmarkSimple,
  ShareNetwork,
  X
} from '@phosphor-icons/react';
import { useApp } from '../context/AppContext';
import { DATASETS } from '../data/datasetsData';

export default function MapViewer() {
  const { addToast } = useApp();

  const [basemap, setBasemap] = useState('satellite'); // 'satellite', 'vector', 'dark', 'cadastral'
  const [zoomLevel, setZoomLevel] = useState(12);
  const [activeLayers, setActiveLayers] = useState({
    parcels: true,
    mangroves: true,
    buildings: false,
    roads: true,
    utilities: false
  });
  const [selectedFeature, setSelectedFeature] = useState({
    id: 'FEAT-AD-0042',
    name: 'Al Maryah Financial District Plot B4',
    type: 'Cadastral Parcel',
    entity: 'Department of Municipalities and Transport (DMT)',
    zoning: 'Commercial Mixed-Use High Rise',
    area: '14,280 m²',
    crs: 'UAE National Grid (EPSG:3997)',
    coordinates: '24° 30′ 12″ N, 54° 23′ 45″ E',
    datasetSlug: 'land-parcels-cadastre'
  });
  const [searchLocation, setSearchLocation] = useState('');
  const [activePanel, setActivePanel] = useState('layers'); // 'layers', 'legend', 'info'
  const [coords, setCoords] = useState({ lat: '24.4539° N', lng: '54.3773° E' });

  const toggleLayer = (layerKey) => {
    setActiveLayers((prev) => {
      const next = !prev[layerKey];
      addToast(`Layer ${layerKey} toggled ${next ? 'ON' : 'OFF'}`, 'info');
      return { ...prev, [layerKey]: next };
    });
  };

  const resetView = () => {
    setZoomLevel(12);
    setCoords({ lat: '24.4539° N', lng: '54.3773° E' });
    addToast('Map view reset to Abu Dhabi Metropolitan Core', 'info');
  };

  const handleFeatureClick = (feature) => {
    setSelectedFeature(feature);
    setActivePanel('info');
    addToast(`Selected feature: ${feature.name}`, 'info');
  };

  const sampleFeatures = [
    {
      id: 'FEAT-AD-0042',
      name: 'Al Maryah Financial District Plot B4',
      type: 'Cadastral Parcel',
      entity: 'Department of Municipalities and Transport (DMT)',
      zoning: 'Commercial Mixed-Use High Rise',
      area: '14,280 m²',
      crs: 'UAE National Grid (EPSG:3997)',
      coordinates: '24° 30′ 12″ N, 54° 23′ 45″ E',
      datasetSlug: 'land-parcels-cadastre',
      cx: '48%',
      cy: '38%'
    },
    {
      id: 'FEAT-EAD-0112',
      name: 'Eastern Mangroves Reserve Sector 3',
      type: 'Protected Habitat Polygon',
      entity: 'Environment Agency – Abu Dhabi (EAD)',
      zoning: 'Sovereign Marine Protected Area',
      area: '840,000 m²',
      crs: 'UAE National Grid (EPSG:3997)',
      coordinates: '24° 26′ 40″ N, 54° 25′ 15″ E',
      datasetSlug: 'mangrove-habitat-extent-2027',
      cx: '62%',
      cy: '52%'
    },
    {
      id: 'FEAT-DMT-0891',
      name: 'Yas South Waterfront Tower 12',
      type: 'Building Footprint LOD2',
      entity: 'Department of Municipalities and Transport (DMT)',
      zoning: 'Residential Waterfront',
      area: '3,850 m²',
      crs: 'UAE National Grid (EPSG:3997)',
      coordinates: '24° 28′ 50″ N, 54° 36′ 10″ E',
      datasetSlug: 'building-footprints-3d',
      cx: '76%',
      cy: '32%'
    },
    {
      id: 'FEAT-ITC-0055',
      name: 'Sheikh Zayed Bridge Arterial Deck',
      type: 'Transportation Corridor Segment',
      entity: 'Integrated Transport Centre (ITC)',
      zoning: 'Strategic Highway Infrastructure',
      area: '8 Lanes · 842 m span',
      crs: 'UAE National Grid (EPSG:3997)',
      coordinates: '24° 25′ 10″ N, 54° 29′ 20″ E',
      datasetSlug: 'strategic-highway-network',
      cx: '54%',
      cy: '62%'
    }
  ];

  return (
    <div className="h-[calc(100vh-130px)] min-h-[600px] flex flex-col bg-[#0B2545] rounded-2xl border border-[#13315C] overflow-hidden shadow-xl relative">
      {/* Top Map Action Bar */}
      <div className="h-14 bg-[#0B2545]/95 backdrop-blur-md border-b border-[#13315C] px-4 flex items-center justify-between gap-4 z-20 shrink-0 text-white">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <MapTrifold size={20} className="text-[#FFC20E]" weight="bold" />
            <h1 className="text-sm font-bold text-white tracking-wide">
              AD-SDI Sovereign Map Viewer
            </h1>
          </div>
          <span className="hidden sm:inline text-[10px] font-mono bg-[#13315C] text-[#2BA6DE] px-2 py-0.5 rounded border border-[#2BA6DE]/30">
            EPSG:3997
          </span>
        </div>

        {/* Search location */}
        <div className="flex-1 max-w-md relative hidden md:block">
          <MagnifyingGlass size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
            placeholder="Search Abu Dhabi Island, Saadiyat, Yas, Al Ain, Al Dhafra..."
            className="w-full h-8 pl-8 pr-3 rounded-lg bg-[#13315C]/80 border border-[#1E4976] text-xs text-white placeholder:text-slate-400 outline-none focus:border-[#2BA6DE]"
          />
        </div>

        {/* Basemap Switcher + Panel toggles */}
        <div className="flex items-center gap-2">
          {/* Basemaps */}
          <div className="flex items-center bg-[#13315C] p-0.5 rounded-lg border border-[#1E4976] text-xs">
            {[
              { id: 'satellite', label: 'Satellite' },
              { id: 'vector', label: 'Vector' },
              { id: 'dark', label: 'Dark' },
              { id: 'cadastral', label: 'Cadastral' }
            ].map((bm) => (
              <button
                key={bm.id}
                onClick={() => {
                  setBasemap(bm.id);
                  addToast(`Basemap switched to ${bm.label}`, 'info');
                }}
                className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                  basemap === bm.id ? 'bg-[#1F5FAD] text-white font-bold' : 'text-slate-300 hover:text-white'
                }`}
              >
                {bm.label}
              </button>
            ))}
          </div>

          {/* Quick panel toggles */}
          <button
            onClick={() => setActivePanel(activePanel === 'layers' ? null : 'layers')}
            className={`p-1.5 rounded-lg border text-xs flex items-center gap-1 transition-colors ${
              activePanel === 'layers'
                ? 'bg-[#1F5FAD] border-blue-400 text-white'
                : 'bg-[#13315C] border-[#1E4976] text-slate-300 hover:text-white'
            }`}
            title="Layers Panel"
          >
            <Stack size={16} />
            <span className="hidden lg:inline text-[11px]">Layers</span>
          </button>

          <button
            onClick={() => setActivePanel(activePanel === 'legend' ? null : 'legend')}
            className={`p-1.5 rounded-lg border text-xs flex items-center gap-1 transition-colors ${
              activePanel === 'legend'
                ? 'bg-[#1F5FAD] border-blue-400 text-white'
                : 'bg-[#13315C] border-[#1E4976] text-slate-300 hover:text-white'
            }`}
            title="Legend"
          >
            <Sliders size={16} />
            <span className="hidden lg:inline text-[11px]">Legend</span>
          </button>
        </div>
      </div>

      {/* Map Canvas Workspace */}
      <div className="flex-1 relative overflow-hidden select-none">
        {/* Dynamic Background simulating selected basemap */}
        <div
          className={`absolute inset-0 transition-all duration-500 ${
            basemap === 'satellite'
              ? 'bg-[#061426] bg-[radial-gradient(#143152_1px,transparent_1px)] [background-size:24px_24px]'
              : basemap === 'vector'
              ? 'bg-[#EBF2F7] bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:24px_24px]'
              : basemap === 'dark'
              ? 'bg-[#050D1A] bg-[radial-gradient(#112238_1px,transparent_1px)] [background-size:20px_20px]'
              : 'bg-[#FAFBFD] bg-[linear-gradient(to_right,#F0F4F8_1px,transparent_1px),linear-gradient(to_bottom,#F0F4F8_1px,transparent_1px)] bg-[size:32px_32px]'
          }`}
        >
          {/* Stylized Abu Dhabi Coastline Vector SVG */}
          <svg className="w-full h-full opacity-60 pointer-events-none" viewBox="0 0 1000 600">
            {/* Arabian Gulf Water / Coastline contour */}
            <path
              d="M0,0 L1000,0 L1000,200 C850,220 750,180 650,230 C550,280 480,240 380,310 C280,380 180,360 0,420 Z"
              fill={basemap === 'satellite' || basemap === 'dark' ? '#081D33' : '#D0E3F5'}
              stroke="#2BA6DE"
              strokeWidth="1.5"
              strokeDasharray="4 2"
            />
            {/* Islands: Abu Dhabi Island, Saadiyat, Yas, Al Maryah */}
            <ellipse cx="480" cy="240" rx="70" ry="40" fill={basemap === 'vector' ? '#DEE7EE' : '#0E2847'} stroke="#1F5FAD" strokeWidth="1.5" />
            <ellipse cx="620" cy="180" rx="55" ry="30" fill={basemap === 'vector' ? '#DEE7EE' : '#0E2847'} stroke="#1F5FAD" strokeWidth="1.5" />
            <ellipse cx="760" cy="160" rx="60" ry="35" fill={basemap === 'vector' ? '#DEE7EE' : '#0E2847'} stroke="#1F5FAD" strokeWidth="1.5" />
            <ellipse cx="510" cy="210" rx="22" ry="14" fill={basemap === 'vector' ? '#DEE7EE' : '#0E2847'} stroke="#FFC20E" strokeWidth="1.5" />

            {/* Road network */}
            {activeLayers.roads && (
              <g stroke="#FFC20E" strokeWidth="1.2" opacity="0.75" fill="none">
                <path d="M100,450 Q380,330 480,240 T760,160 T950,180" />
                <path d="M480,240 L620,180" />
                <path d="M480,240 L510,210" />
                <path d="M510,210 L620,180" />
                <path d="M380,330 L380,550" />
              </g>
            )}

            {/* Mangrove habitats */}
            {activeLayers.mangroves && (
              <g fill="#1E9E6A" opacity="0.5" stroke="#10B981" strokeWidth="1">
                <circle cx="580" cy="280" r="35" />
                <circle cx="630" cy="260" r="28" />
                <circle cx="680" cy="230" r="30" />
              </g>
            )}

            {/* Cadastral parcels */}
            {activeLayers.parcels && (
              <g stroke="#3B82F6" strokeWidth="0.8" fill="#3B82F6" opacity="0.3">
                <rect x="440" y="225" width="25" height="18" />
                <rect x="470" y="225" width="22" height="18" />
                <rect x="440" y="247" width="25" height="20" />
                <rect x="470" y="247" width="22" height="20" />
              </g>
            )}
          </svg>

          {/* Geographic Text Labels */}
          <div className="absolute top-[32%] left-[45%] text-[11px] font-bold text-slate-300 drop-shadow pointer-events-none">
            Abu Dhabi Island
          </div>
          <div className="absolute top-[24%] left-[60%] text-[11px] font-bold text-[#FFC20E] drop-shadow pointer-events-none">
            Saadiyat Cultural District
          </div>
          <div className="absolute top-[21%] left-[75%] text-[11px] font-bold text-[#2BA6DE] drop-shadow pointer-events-none">
            Yas Island
          </div>
          <div className="absolute top-[29%] left-[49%] text-[9px] font-mono font-bold text-white bg-[#0B2545]/80 px-1 rounded pointer-events-none">
            Al Maryah
          </div>

          {/* Interactive Feature Markers */}
          {sampleFeatures.map((feat) => (
            <button
              key={feat.id}
              onClick={() => handleFeatureClick(feat)}
              className="absolute -translate-x-1/2 -translate-y-1/2 group z-10 focus:outline-none"
              style={{ left: feat.cx, top: feat.cy }}
            >
              <div
                className={`w-4 h-4 rounded-full flex items-center justify-center transition-transform group-hover:scale-125 shadow-lg ${
                  selectedFeature?.id === feat.id
                    ? 'bg-[#FFC20E] ring-4 ring-[#FFC20E]/40 text-[#0B2545]'
                    : 'bg-[#1F5FAD] ring-2 ring-white/60 text-white'
                }`}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-current" />
              </div>
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#0B2545] text-white text-[10px] px-2 py-0.5 rounded shadow whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-[#1E4976]">
                {feat.name}
              </div>
            </button>
          ))}
        </div>

        {/* Floating Left Panel: Layers / Legend */}
        {activePanel === 'layers' && (
          <div className="absolute top-4 left-4 w-72 bg-[#0B2545]/90 backdrop-blur-md rounded-xl border border-[#1E4976] p-4 text-white shadow-2xl z-20 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#1E4976]">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#FFC20E]">
                <Stack size={15} /> Layer Visibility
              </div>
              <button
                onClick={() => setActivePanel(null)}
                className="text-slate-400 hover:text-white text-xs"
              >
                <X size={14} />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <label className="flex items-center justify-between p-2 rounded bg-[#13315C]/60 hover:bg-[#13315C] cursor-pointer transition-colors">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded bg-blue-500" />
                  Cadastral Parcels (DMT)
                </span>
                <input
                  type="checkbox"
                  checked={activeLayers.parcels}
                  onChange={() => toggleLayer('parcels')}
                  className="rounded text-[#1F5FAD] focus:ring-0"
                />
              </label>

              <label className="flex items-center justify-between p-2 rounded bg-[#13315C]/60 hover:bg-[#13315C] cursor-pointer transition-colors">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded bg-emerald-500" />
                  Mangrove Habitats (EAD)
                </span>
                <input
                  type="checkbox"
                  checked={activeLayers.mangroves}
                  onChange={() => toggleLayer('mangroves')}
                  className="rounded text-[#1F5FAD] focus:ring-0"
                />
              </label>

              <label className="flex items-center justify-between p-2 rounded bg-[#13315C]/60 hover:bg-[#13315C] cursor-pointer transition-colors">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded bg-purple-500" />
                  3D Building Massing (LOD2)
                </span>
                <input
                  type="checkbox"
                  checked={activeLayers.buildings}
                  onChange={() => toggleLayer('buildings')}
                  className="rounded text-[#1F5FAD] focus:ring-0"
                />
              </label>

              <label className="flex items-center justify-between p-2 rounded bg-[#13315C]/60 hover:bg-[#13315C] cursor-pointer transition-colors">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded bg-amber-400" />
                  Strategic Highway Arterials
                </span>
                <input
                  type="checkbox"
                  checked={activeLayers.roads}
                  onChange={() => toggleLayer('roads')}
                  className="rounded text-[#1F5FAD] focus:ring-0"
                />
              </label>

              <label className="flex items-center justify-between p-2 rounded bg-[#13315C]/60 hover:bg-[#13315C] cursor-pointer transition-colors">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded bg-cyan-400" />
                  Subterranean Utilities (ADDC)
                </span>
                <input
                  type="checkbox"
                  checked={activeLayers.utilities}
                  onChange={() => toggleLayer('utilities')}
                  className="rounded text-[#1F5FAD] focus:ring-0"
                />
              </label>
            </div>
          </div>
        )}

        {/* Legend panel */}
        {activePanel === 'legend' && (
          <div className="absolute top-4 left-4 w-64 bg-[#0B2545]/90 backdrop-blur-md rounded-xl border border-[#1E4976] p-4 text-white shadow-2xl z-20 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#1E4976]">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#FFC20E]">
                <Sliders size={15} /> Map Symbology
              </div>
              <button
                onClick={() => setActivePanel(null)}
                className="text-slate-400 hover:text-white text-xs"
              >
                <X size={14} />
              </button>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 bg-blue-500/40 border border-blue-400 rounded-sm" />
                <span>Cadastral Deed Boundaries</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 bg-emerald-500/40 border border-emerald-400 rounded-sm" />
                <span>Protected Mangrove Canopies</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-1 bg-[#FFC20E] rounded" />
                <span>Primary Arterial Highway</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 rounded-full bg-[#FFC20E] border border-white" />
                <span>Selected Feature Node</span>
              </div>
            </div>
          </div>
        )}

        {/* Floating Right Detail Panel: Selected Feature Information */}
        {selectedFeature && (
          <div className="absolute top-4 right-4 w-80 bg-white rounded-xl border border-[#E3E8EF] p-4 text-[#14213D] shadow-2xl z-20 space-y-3 animate-fade-in">
            <div className="flex items-start justify-between pb-2 border-b border-[#E3E8EF]">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#1F5FAD] uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded">
                  {selectedFeature.type}
                </span>
                <h3 className="text-sm font-bold text-[#0B2545] mt-1">
                  {selectedFeature.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedFeature(null)}
                className="text-slate-400 hover:text-slate-600 text-xs p-1"
              >
                <X size={14} />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-[#5B6B7F]">Custodian:</span>
                <span className="font-semibold text-[#0B2545]">{selectedFeature.entity}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-[#5B6B7F]">Zoning / Status:</span>
                <span className="font-semibold text-[#0B2545]">{selectedFeature.zoning}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-[#5B6B7F]">Extent / Area:</span>
                <span className="font-mono font-bold text-[#0B2545]">{selectedFeature.area}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-[#5B6B7F]">CRS:</span>
                <span className="font-mono text-[11px] text-[#1F5FAD]">{selectedFeature.crs}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#5B6B7F]">Coordinates:</span>
                <span className="font-mono text-[11px] text-[#0B2545]">{selectedFeature.coordinates}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-[#E3E8EF] flex items-center justify-between gap-2">
              <Link
                to={`/catalogue/${selectedFeature.datasetSlug}`}
                className="flex-1 py-1.5 rounded-lg bg-[#0B2545] hover:bg-[#13315C] text-white text-xs font-semibold text-center transition-colors"
              >
                Open Full Dataset
              </Link>
              <button
                onClick={() => addToast('Feature attributes copied as GeoJSON', 'info')}
                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-[#0B2545] text-xs font-medium transition-colors"
              >
                Copy GeoJSON
              </button>
            </div>
          </div>
        )}

        {/* Map Control Buttons: Zoom, Reset, Location */}
        <div className="absolute bottom-6 right-4 flex flex-col gap-1.5 z-20">
          <button
            onClick={() => setZoomLevel((z) => Math.min(z + 1, 18))}
            className="w-8 h-8 rounded-lg bg-[#0B2545]/90 hover:bg-[#0B2545] text-white border border-[#1E4976] flex items-center justify-center shadow transition-colors"
            title="Zoom In"
          >
            <Plus size={16} />
          </button>
          <button
            onClick={() => setZoomLevel((z) => Math.max(z - 1, 6))}
            className="w-8 h-8 rounded-lg bg-[#0B2545]/90 hover:bg-[#0B2545] text-white border border-[#1E4976] flex items-center justify-center shadow transition-colors"
            title="Zoom Out"
          >
            <Minus size={16} />
          </button>
          <button
            onClick={resetView}
            className="w-8 h-8 rounded-lg bg-[#0B2545]/90 hover:bg-[#0B2545] text-[#FFC20E] border border-[#1E4976] flex items-center justify-center shadow transition-colors"
            title="Reset Extent"
          >
            <ArrowsCounterClockwise size={16} />
          </button>
        </div>

        {/* Map Scale Bar + Coordinate Display (Bottom Left) */}
        <div className="absolute bottom-4 left-4 bg-[#0B2545]/80 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-[#1E4976] text-white text-[11px] font-mono flex items-center gap-4 z-20">
          <div className="flex items-center gap-1.5">
            <Crosshair size={14} className="text-[#2BA6DE]" />
            <span>{coords.lat}, {coords.lng}</span>
          </div>
          <div className="h-3 w-[1px] bg-slate-600" />
          <div className="flex items-center gap-2">
            <span>Scale 1 : 25,000</span>
            <div className="w-16 h-1 bg-white border border-slate-900 flex">
              <div className="w-1/2 bg-black" />
            </div>
            <span>500 m</span>
          </div>
          <div className="h-3 w-[1px] bg-slate-600 hidden sm:block" />
          <span className="text-[10px] text-slate-300 hidden sm:inline">
            Zoom {zoomLevel}x
          </span>
        </div>
      </div>
    </div>
  );
}

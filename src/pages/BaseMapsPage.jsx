import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MapTrifold,
  Copy,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  FileCode,
  MagnifyingGlass,
  ArrowUpRight
} from '@phosphor-icons/react';
import { useApp } from '../context/AppContext';

export default function BaseMapsPage() {
  const { addToast } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const baseMaps = [
    {
      id: 'bm-01',
      title: 'High-Resolution Satellite True-Ortho 0.3m (2026–2027)',
      type: 'Raster Tile Service (WMTS)',
      format: 'JPEG / WebP Tiles',
      crs: 'EPSG:3997 & EPSG:3857',
      maxZoom: 'Level 20 (0.15m/px)',
      endpoint: 'https://tiles.adsdi.gov.ae/wmts/1.0.0/ortho_2026_03m/{TileMatrix}/{TileRow}/{TileCol}.jpg',
      desc: 'Seamless true-orthorectified aerial and satellite mosaic covering Abu Dhabi Island, Al Ain, and Al Dhafra with radiometric normalization.',
      status: 'Active · Operational'
    },
    {
      id: 'bm-02',
      title: 'Abu Dhabi Sovereign Topographic Vector Basemap',
      type: 'Vector Tiles (MVT)',
      format: 'Protocol Buffers (PBF)',
      crs: 'EPSG:3857 & EPSG:3997',
      maxZoom: 'Level 18',
      endpoint: 'https://tiles.adsdi.gov.ae/v1/vector/topographic/{z}/{x}/{y}.pbf',
      desc: 'Authoritative topographic features including street network, buildings, terrain contours, place names in dual Arabic/English.',
      status: 'Active · Operational'
    },
    {
      id: 'bm-03',
      title: 'Dark Sovereign Analytical Basemap',
      type: 'Vector & Raster Hybrid',
      format: 'MVT / PNG',
      crs: 'EPSG:3857',
      maxZoom: 'Level 19',
      endpoint: 'https://tiles.adsdi.gov.ae/v1/styles/dark_sovereign/style.json',
      desc: 'Optimized high-contrast dark canvas engineered for geospatial dashboards, 3D digital twins, and sensor overlays.',
      status: 'Active · Operational'
    },
    {
      id: 'bm-04',
      title: 'Authoritative Cadastral Parcel Basemap',
      type: 'Cached WMTS',
      format: 'PNG with Transparency',
      crs: 'EPSG:3997 (UAE National Grid)',
      maxZoom: 'Level 21',
      endpoint: 'https://tiles.adsdi.gov.ae/wmts/1.0.0/cadastre_base/{TileMatrix}/{TileRow}/{TileCol}.png',
      desc: 'Official DMT plot boundaries, sector codes, and street rights-of-way updated dynamically from the cadastre database.',
      status: 'Active · Operational'
    },
    {
      id: 'bm-05',
      title: 'Light Minimalist Cartographic Base',
      type: 'Vector Tiles (MVT)',
      format: 'Mapbox Vector Tiles',
      crs: 'EPSG:3857',
      maxZoom: 'Level 18',
      endpoint: 'https://tiles.adsdi.gov.ae/v1/styles/light_neutral/style.json',
      desc: 'Muted grey and off-white cartographic style designed for clear thematic overlay visualization and print cartography.',
      status: 'Active · Operational'
    },
    {
      id: 'bm-06',
      title: 'Arabian Gulf Marine & Bathymetric Chart Base',
      type: 'Raster WMTS',
      format: 'PNG Tiles',
      crs: 'EPSG:3997',
      maxZoom: 'Level 16',
      endpoint: 'https://tiles.adsdi.gov.ae/wmts/1.0.0/bathymetry_gulf/{TileMatrix}/{TileRow}/{TileCol}.png',
      desc: 'Marine navigation depths, fairway channels, coastal bathymetric contours, and island maritime boundaries.',
      status: 'Active · Operational'
    }
  ];

  const copyUrl = (url) => {
    navigator.clipboard?.writeText(url);
    addToast('Basemap WMTS URL copied to clipboard', 'info');
  };

  const filtered = baseMaps.filter(
    (b) =>
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-[#E3E8EF] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1F5FAD]" />
            <span className="text-xs font-bold text-[#1F5FAD] uppercase tracking-wider">
              Maps & Services · Sovereign Foundation
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B2545] tracking-tight">
            Abu Dhabi Base Maps Directory
          </h1>
          <p className="text-xs sm:text-sm text-[#5B6B7F] mt-1">
            Standardized sovereign basemap services supporting OGC WMTS, Mapbox Vector Tiles (MVT), and XYZ endpoints.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-64">
            <MagnifyingGlass size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search base maps..."
              className="w-full h-9 pl-9 pr-3 rounded-xl border border-[#E3E8EF] text-xs text-[#14213D] outline-none focus:border-[#1F5FAD]"
            />
          </div>
          <Link
            to="/map-viewer"
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#0B2545] hover:bg-[#13315C] text-white transition-colors flex items-center gap-1.5 shrink-0"
          >
            <MapTrifold size={16} /> Open Map Viewer
          </Link>
        </div>
      </div>

      {/* Grid of Basemaps */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((bm) => (
          <div
            key={bm.id}
            className="bg-white rounded-2xl p-5 border border-[#E3E8EF] shadow-xs hover:border-[#1F5FAD]/40 transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-[#1F5FAD] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {bm.type}
                </span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {bm.status}
                </span>
              </div>

              <h3 className="text-base font-bold text-[#0B2545] leading-snug">
                {bm.title}
              </h3>

              <p className="text-xs text-[#5B6B7F] leading-relaxed">
                {bm.desc}
              </p>

              <div className="space-y-1.5 pt-2 text-[11px] text-[#5B6B7F] border-t border-slate-100">
                <div className="flex justify-between">
                  <span>Format:</span>
                  <strong className="text-[#0B2545]">{bm.format}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Projections:</span>
                  <span className="font-mono text-[#0B2545]">{bm.crs}</span>
                </div>
                <div className="flex justify-between">
                  <span>Zoom Extent:</span>
                  <span className="font-mono text-[#0B2545]">{bm.maxZoom}</span>
                </div>
              </div>
            </div>

            {/* Endpoint box & Actions */}
            <div className="space-y-2 pt-2 border-t border-[#E3E8EF]">
              <div className="bg-slate-50 p-2 rounded-lg font-mono text-[10px] text-[#0B2545] truncate flex items-center justify-between">
                <span className="truncate pr-2">{bm.endpoint}</span>
                <button
                  onClick={() => copyUrl(bm.endpoint)}
                  className="text-[#1F5FAD] hover:text-[#0B2545] shrink-0"
                  title="Copy Endpoint"
                >
                  <Copy size={14} />
                </button>
              </div>

              <div className="flex items-center justify-between gap-2 pt-1">
                <Link
                  to="/map-viewer"
                  className="flex-1 py-1.5 rounded-lg bg-[#0B2545] hover:bg-[#13315C] text-white text-xs font-semibold text-center transition-colors"
                >
                  Preview in Viewer
                </Link>
                <button
                  onClick={() => addToast(`Fetched Capabilities XML for ${bm.title}`, 'info')}
                  className="px-3 py-1.5 rounded-lg border border-[#E3E8EF] hover:bg-slate-50 text-xs font-medium text-[#5B6B7F] transition-colors"
                >
                  GetCapabilities
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

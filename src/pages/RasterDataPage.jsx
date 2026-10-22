import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkle,
  Copy,
  DownloadSimple,
  MapTrifold,
  MagnifyingGlass,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  FileCode,
  Tag
} from '@phosphor-icons/react';
import { useApp } from '../context/AppContext';

export default function RasterDataPage() {
  const { addToast } = useApp();
  const [filterType, setFilterType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const rasterDatasets = [
    {
      id: 'rst-01',
      title: 'High-Resolution True-Ortho Satellite Imagery 0.3m (2026)',
      type: 'Optical Satellite',
      format: 'Cloud Optimized GeoTIFF (COG) · STAC API',
      resolution: '0.30 m Ground Sampling Distance',
      coverage: '4,850 km² Urban & Coastal Corridor',
      stacItem: 'https://stac.adsdi.gov.ae/v1/collections/ortho_03m_2026/items/auh_core_2026',
      cogUrl: 'https://storage.adsdi.gov.ae/cog/ortho_2026_03m_mosaic.tif',
      sensor: 'WorldView-3 / GeoEye-1 Hybrid',
      year: '2026'
    },
    {
      id: 'rst-02',
      title: 'Airborne LiDAR Digital Elevation Model (DEM 1m)',
      type: 'Elevation & Terrain',
      format: 'COG · Cloud Optimized Point Cloud (COPC)',
      resolution: '1.0 m Bare-Earth Grid',
      coverage: 'Abu Dhabi Island & Mainland Community Sectors',
      stacItem: 'https://stac.adsdi.gov.ae/v1/collections/dem_lidar_1m/items/auh_dem_2025',
      cogUrl: 'https://storage.adsdi.gov.ae/cog/dem_lidar_1m_auh.tif',
      sensor: 'Airborne Topographic LiDAR Scanner',
      year: '2025'
    },
    {
      id: 'rst-03',
      title: 'Sentinel-2 Multi-Spectral Surface Reflectance (10m)',
      type: 'Multi-Spectral Time-Series',
      format: 'COG · OGC WCS · STAC',
      resolution: '10.0 m (Bands 2, 3, 4, 8)',
      coverage: 'Full Emirate (Abu Dhabi, Al Ain, Al Dhafra)',
      stacItem: 'https://stac.adsdi.gov.ae/v1/collections/sentinel2_sr_10m/items',
      cogUrl: 'https://storage.adsdi.gov.ae/cog/sentinel2_quarterly_composite.tif',
      sensor: 'ESA Sentinel-2A / 2B',
      year: '2020–2027'
    },
    {
      id: 'rst-04',
      title: 'Digital Surface Model LOD2 Canopy & Roofs (DSM 0.5m)',
      type: 'Elevation & Terrain',
      format: 'COG · 3D Mesh',
      resolution: '0.50 m Structural Elevation',
      coverage: 'Metropolitan Core & Industrial Sectors',
      stacItem: 'https://stac.adsdi.gov.ae/v1/collections/dsm_05m/items/auh_dsm_lod2',
      cogUrl: 'https://storage.adsdi.gov.ae/cog/dsm_05m_urban_core.tif',
      sensor: 'Stereo Photogrammetry & LiDAR',
      year: '2026'
    },
    {
      id: 'rst-05',
      title: 'Landsat-9 Thermal Infrared Land Surface Temperature',
      type: 'Thermal & Climatology',
      format: 'COG · GeoTIFF',
      resolution: '30.0 m Thermal Resampled',
      coverage: 'Full Emirate Land Mass',
      stacItem: 'https://stac.adsdi.gov.ae/v1/collections/lst_thermal/items/lst_summer_2026',
      cogUrl: 'https://storage.adsdi.gov.ae/cog/lst_landsat9_summer2026.tif',
      sensor: 'TIRS-2 / OLI-2',
      year: '2026'
    },
    {
      id: 'rst-06',
      title: 'Arabian Gulf High-Resolution Bathymetric DEM (5m)',
      type: 'Hydrographic & Marine',
      format: 'COG · NetCDF',
      resolution: '5.0 m Depth Grid',
      coverage: 'Abu Dhabi Coastal Waters & Barrier Islands',
      stacItem: 'https://stac.adsdi.gov.ae/v1/collections/bathymetry_5m/items',
      cogUrl: 'https://storage.adsdi.gov.ae/cog/gulf_bathymetry_5m.tif',
      sensor: 'Multi-Beam Sonar & Satellite Derived Bathymetry',
      year: '2025'
    }
  ];

  const copyUrl = (url) => {
    navigator.clipboard?.writeText(url);
    addToast('COG / STAC URL copied to clipboard', 'info');
  };

  const filtered = rasterDatasets.filter((r) => {
    if (filterType !== 'All' && r.type !== filterType) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        r.title.toLowerCase().includes(q) ||
        r.sensor.toLowerCase().includes(q) ||
        r.resolution.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-[#E3E8EF] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#7B4FD6]" />
            <span className="text-xs font-bold text-[#7B4FD6] uppercase tracking-wider">
              Earth Observation & Elevation · Sovereign Cloud
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B2545] tracking-tight">
            Raster & Satellite Imagery Catalogue
          </h1>
          <p className="text-xs sm:text-sm text-[#5B6B7F] mt-1">
            High-resolution satellite orthoimagery, LiDAR DEM/DSM models, and multi-spectral STAC collections.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-64">
            <MagnifyingGlass size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by sensor or resolution..."
              className="w-full h-9 pl-9 pr-3 rounded-xl border border-[#E3E8EF] text-xs text-[#14213D] outline-none focus:border-[#7B4FD6]"
            />
          </div>
          <Link
            to="/map-viewer"
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#0B2545] hover:bg-[#13315C] text-white transition-colors flex items-center gap-1.5 shrink-0"
          >
            <MapTrifold size={16} /> Open in Viewer
          </Link>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {['All', 'Optical Satellite', 'Elevation & Terrain', 'Multi-Spectral Time-Series', 'Thermal & Climatology', 'Hydrographic & Marine'].map((t) => (
          <button
            key={t}
            onClick={() => setFilterType(t)}
            className={`px-3.5 py-1.5 rounded-xl font-semibold transition-colors shrink-0 ${
              filterType === t
                ? 'bg-[#7B4FD6] text-white'
                : 'bg-white hover:bg-slate-100 text-[#5B6B7F] border border-[#E3E8EF]'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Raster Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl p-5 border border-[#E3E8EF] shadow-xs hover:border-[#7B4FD6]/40 transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-[#7B4FD6] bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200">
                  {item.type}
                </span>
                <span className="text-[11px] font-mono font-bold text-[#0B2545] bg-slate-100 px-2 py-0.5 rounded">
                  {item.year}
                </span>
              </div>

              <h3 className="text-base font-bold text-[#0B2545] leading-snug">
                {item.title}
              </h3>

              <div className="space-y-1.5 text-xs text-[#5B6B7F] bg-slate-50 p-3 rounded-xl border border-slate-100">
                <div className="flex justify-between">
                  <span>Resolution:</span>
                  <strong className="text-[#0B2545] font-mono">{item.resolution}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Sensor Platform:</span>
                  <strong className="text-[#0B2545]">{item.sensor}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Format:</span>
                  <span className="text-[#0B2545] truncate max-w-[180px]">{item.format}</span>
                </div>
                <div className="flex justify-between">
                  <span>Coverage:</span>
                  <span className="text-[#0B2545] truncate max-w-[180px]">{item.coverage}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-2 border-t border-[#E3E8EF]">
              <div className="bg-slate-50 p-2 rounded-lg font-mono text-[10px] text-[#0B2545] truncate flex items-center justify-between">
                <span className="truncate pr-2">{item.cogUrl}</span>
                <button
                  onClick={() => copyUrl(item.cogUrl)}
                  className="text-[#7B4FD6] hover:text-[#0B2545] shrink-0"
                  title="Copy COG URL"
                >
                  <Copy size={14} />
                </button>
              </div>

              <div className="flex items-center justify-between gap-2 pt-1">
                <Link
                  to="/map-viewer"
                  className="flex-1 py-1.5 rounded-lg bg-[#0B2545] hover:bg-[#13315C] text-white text-xs font-semibold text-center transition-colors"
                >
                  Preview on Map
                </Link>
                <button
                  onClick={() => addToast(`Opened STAC Item JSON for ${item.title}`, 'info')}
                  className="px-3 py-1.5 rounded-lg border border-[#E3E8EF] hover:bg-slate-50 text-xs font-medium text-[#5B6B7F] transition-colors"
                >
                  STAC Item
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

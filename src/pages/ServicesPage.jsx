import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  PlugsConnected,
  Copy,
  MagnifyingGlass,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  FileCode,
  Globe,
  Sliders,
  Sparkle
} from '@phosphor-icons/react';
import { useApp } from '../context/AppContext';

export const OGC_SERVICES = [
  {
    id: 'srv-01',
    slug: 'ogc-api-cadastre-features',
    name: 'Cadastral Parcels OGC API Features',
    protocol: 'OGC API – Features (Part 1 & 2)',
    category: 'Vector Feature API',
    relatedDataset: 'Land Parcels (Cadastre)',
    datasetSlug: 'land-parcels-cadastre',
    custodian: 'Department of Municipalities and Transport (DMT)',
    endpoint: 'https://api.adsdi.gov.ae/ogc/features/v1/collections/cadastre',
    formats: ['GeoJSON', 'JSON-FG', 'GML 3.2'],
    status: 'Operational',
    uptime: '99.98%',
    latencyP95: '184 ms',
    desc: 'RESTful geospatial feature access for parcel deed numbers, zoning classifications, and boundaries with spatial filtering.'
  },
  {
    id: 'srv-02',
    slug: 'wms-mangrove-canopy',
    name: 'Mangrove Reserve Multi-Spectral WMS',
    protocol: 'OGC WMS 1.3.0',
    category: 'Web Map Service',
    relatedDataset: 'Mangrove Habitat Extent 2027',
    datasetSlug: 'mangrove-habitat-extent-2027',
    custodian: 'Environment Agency – Abu Dhabi (EAD)',
    endpoint: 'https://services.adsdi.gov.ae/geoserver/wms?service=WMS&version=1.3.0&request=GetCapabilities',
    formats: ['image/png', 'image/jpeg', 'image/webp'],
    status: 'Operational',
    uptime: '100%',
    latencyP95: '120 ms',
    desc: 'Dynamic server-rendered thematic cartographic map layers depicting mangrove canopy density and tidal channels.'
  },
  {
    id: 'srv-03',
    slug: 'wmts-satellite-ortho',
    name: 'Abu Dhabi True-Ortho 30cm Cached WMTS',
    protocol: 'OGC WMTS 1.0.0',
    category: 'Tile Cache Service',
    relatedDataset: 'High-Resolution Satellite Orthoimagery 0.3m',
    datasetSlug: 'satellite-ortho-03m',
    custodian: 'Department of Government Enablement (DGE)',
    endpoint: 'https://tiles.adsdi.gov.ae/wmts/1.0.0/ortho_2026_03m/WMTSCapabilities.xml',
    formats: ['image/jpeg', 'image/png'],
    status: 'Operational',
    uptime: '99.99%',
    latencyP95: '65 ms',
    desc: 'Pre-rendered pyramid tiles optimized for sub-100ms web map and mobile GIS rendering in EPSG:3997 and EPSG:3857.'
  },
  {
    id: 'srv-04',
    slug: 'wfs-highways-network',
    name: 'Strategic Highway Arterials WFS',
    protocol: 'OGC WFS 2.0.0',
    category: 'Web Feature Service',
    relatedDataset: 'Strategic Highway Network',
    datasetSlug: 'strategic-highway-network',
    custodian: 'Integrated Transport Centre (ITC)',
    endpoint: 'https://services.adsdi.gov.ae/geoserver/itc/wfs?request=GetFeature&typeName=itc:roads_arterials',
    formats: ['application/gml+xml; version=3.2', 'application/json'],
    status: 'Operational',
    uptime: '99.95%',
    latencyP95: '210 ms',
    desc: 'Transactional and queryable road network vector geometry segments, speed classifications, and bridge structures.'
  },
  {
    id: 'srv-05',
    slug: '3d-tiles-building-massing',
    name: 'Metropolitan Core 3D Tiles LOD2',
    protocol: 'OGC 3D Tiles 1.1',
    category: '3D Mesh Streaming',
    relatedDataset: 'Building Footprints 3D',
    datasetSlug: 'building-footprints-3d',
    custodian: 'Department of Municipalities and Transport (DMT)',
    endpoint: 'https://3d.adsdi.gov.ae/tilesets/buildings_lod2/tileset.json',
    formats: ['b3dm', 'glTF 2.0'],
    status: 'Operational',
    uptime: '99.92%',
    latencyP95: '160 ms',
    desc: 'Hierarchical 3D spatial data structure for streaming LOD2 building masses, roof geometries, and architectural envelopes into Cesium and Three.js.'
  },
  {
    id: 'srv-06',
    slug: 'stac-satellite-archive',
    name: 'Sovereign Earth Observation STAC API',
    protocol: 'SpatioTemporal Asset Catalog (STAC v1.0.0)',
    category: 'SpatioTemporal Metadata API',
    relatedDataset: 'Multi-Sensor Satellite Archive',
    datasetSlug: 'raster-data',
    custodian: 'Department of Government Enablement (DGE)',
    endpoint: 'https://stac.adsdi.gov.ae/v1/search',
    formats: ['GeoJSON', 'JSON'],
    status: 'Operational',
    uptime: '99.96%',
    latencyP95: '145 ms',
    desc: 'Standardized query specification allowing developers to crawl, search, and download multi-sensor imagery and LiDAR granules.'
  }
];

export default function ServicesPage() {
  const { addToast } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProtocol, setSelectedProtocol] = useState('All');

  const copyUrl = (url) => {
    navigator.clipboard?.writeText(url);
    addToast('Service endpoint URL copied to clipboard', 'info');
  };

  const protocols = ['All', 'OGC API', 'WMS', 'WMTS', 'WFS', '3D Tiles', 'STAC'];

  const filtered = OGC_SERVICES.filter((s) => {
    if (selectedProtocol !== 'All' && !s.protocol.includes(selectedProtocol)) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        s.name.toLowerCase().includes(q) ||
        s.custodian.toLowerCase().includes(q) ||
        s.desc.toLowerCase().includes(q)
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
            <span className="w-2.5 h-2.5 rounded-full bg-[#1F5FAD]" />
            <span className="text-xs font-bold text-[#1F5FAD] uppercase tracking-wider">
              Interoperability Engine · 1,150 OGC Endpoints
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B2545] tracking-tight">
            Geospatial Web Services & APIs
          </h1>
          <p className="text-xs sm:text-sm text-[#5B6B7F] mt-1">
            Authoritative OGC API Features, WMS, WMTS, WFS, and 3D Tiles web services deployed across the federated government clearinghouse.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-64">
            <MagnifyingGlass size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search service name, entity..."
              className="w-full h-9 pl-9 pr-3 rounded-xl border border-[#E3E8EF] text-xs text-[#14213D] outline-none focus:border-[#1F5FAD]"
            />
          </div>
          <Link
            to="/developers/apis"
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#0B2545] hover:bg-[#13315C] text-white transition-colors flex items-center gap-1.5 shrink-0"
          >
            Developer Portal <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* Protocol Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {protocols.map((p) => (
          <button
            key={p}
            onClick={() => setSelectedProtocol(p)}
            className={`px-3.5 py-1.5 rounded-xl font-semibold transition-colors shrink-0 ${
              selectedProtocol === p
                ? 'bg-[#1F5FAD] text-white'
                : 'bg-white hover:bg-slate-100 text-[#5B6B7F] border border-[#E3E8EF]'
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Services Table */}
      <div className="bg-white rounded-2xl border border-[#E3E8EF] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFC] border-b border-[#E3E8EF] text-[#5B6B7F] font-bold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-5">Service Name & Protocol</th>
                <th className="py-3 px-4">Contributing Custodian</th>
                <th className="py-3 px-4">Formats</th>
                <th className="py-3 px-4">Status & SLA</th>
                <th className="py-3 px-4">Endpoint</th>
                <th className="py-3 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E3E8EF]">
              {filtered.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-4 px-5">
                    <Link
                      to={`/services/${s.slug}`}
                      className="font-bold text-[#0B2545] hover:text-[#1F5FAD] transition-colors"
                    >
                      {s.name}
                    </Link>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] font-mono font-bold text-[#1F5FAD] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                        {s.protocol}
                      </span>
                      <span className="text-[11px] text-[#5B6B7F]">{s.category}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-[#0B2545]">
                    <strong>{s.custodian}</strong>
                    <div className="text-[11px] text-[#5B6B7F]">
                      Dataset: {s.relatedDataset}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex flex-wrap gap-1">
                      {s.formats.map((fmt, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-mono bg-slate-100 text-[#0B2545] px-1.5 py-0.5 rounded"
                        >
                          {fmt}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span className="font-bold text-emerald-700">{s.status}</span>
                    </div>
                    <span className="text-[10px] text-[#5B6B7F] block mt-0.5">
                      Uptime {s.uptime} · p95: {s.latencyP95}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1 bg-slate-50 p-1.5 rounded font-mono text-[10px] text-[#0B2545] max-w-[200px]">
                      <span className="truncate">{s.endpoint}</span>
                      <button
                        onClick={() => copyUrl(s.endpoint)}
                        className="text-[#1F5FAD] hover:text-[#0B2545] shrink-0"
                        title="Copy endpoint"
                      >
                        <Copy size={13} />
                      </button>
                    </div>
                  </td>
                  <td className="py-4 px-5 text-right">
                    <Link
                      to={`/services/${s.slug}`}
                      className="px-3 py-1.5 rounded-lg bg-[#0B2545] hover:bg-[#13315C] text-white text-xs font-semibold inline-flex items-center gap-1 transition-colors"
                    >
                      Inspect <ArrowRight size={13} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

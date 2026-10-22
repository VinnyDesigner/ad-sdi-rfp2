import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Code,
  MagnifyingGlass,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  FileCode,
  Globe,
  Tag,
  DownloadSimple
} from '@phosphor-icons/react';
import { useApp } from '../context/AppContext';
import { OGC_SERVICES } from './ServicesPage';

export default function ApiCataloguePage() {
  const { addToast } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const apis = [
    {
      slug: 'cadastre-api',
      title: 'Cadastral Parcels & Zoning API',
      version: 'v1.4.2',
      protocol: 'OGC API Features',
      auth: 'Bearer Token (OAuth2)',
      rateLimit: '100 req/s',
      status: 'Active · Production',
      desc: 'Spatial query interface for cadastral parcel deed attributes, planning zones, and land use rights in Abu Dhabi Emirate.'
    },
    {
      slug: 'geocoding-api',
      title: 'Abu Dhabi Sovereign Geocoding & Address API',
      version: 'v2.1.0',
      protocol: 'RESTful Onwani Address',
      auth: 'API Key (X-ADSDI-API-KEY)',
      rateLimit: '150 req/s',
      status: 'Active · Production',
      desc: 'Forward and reverse geocoding against authoritative Onwani unified street names, building numbers, and postal sectors.'
    },
    {
      slug: 'vector-tiles-api',
      title: 'Topographic Vector Tiles Stream (MVT)',
      version: 'v1.0.0',
      protocol: 'Mapbox Vector Tiles',
      auth: 'Public / Sovereign Dual',
      rateLimit: '500 req/s',
      status: 'Active · Production',
      desc: 'High-speed cached vector tile pipeline providing street centerlines, community boundaries, and water bodies.'
    },
    {
      slug: '3d-mesh-tileset',
      title: '3D Building Massing & Mesh Tileset',
      version: 'v1.1.0',
      protocol: 'OGC 3D Tiles / glTF',
      auth: 'Bearer Token (DSA Required)',
      rateLimit: '50 req/s',
      status: 'Active · Production',
      desc: 'Extruded LOD2 structural massing and architectural 3D tilesets for digital twin integration.'
    },
    {
      slug: 'stac-imagery-api',
      title: 'SpatioTemporal Asset Catalog (STAC API)',
      version: 'v1.0.0',
      protocol: 'STAC / OGC WCS',
      auth: 'API Key',
      rateLimit: '60 req/s',
      status: 'Active · Production',
      desc: 'Search, filter, and stream multi-spectral satellite imagery granules and airborne LiDAR point clouds.'
    }
  ];

  const filtered = apis.filter(
    (a) =>
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.protocol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-[#E3E8EF] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1F5FAD]" />
            <span className="text-xs font-bold text-[#1F5FAD] uppercase tracking-wider">
              API Reference · REST & OGC Specification
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B2545] tracking-tight">
            Developer API Catalogue
          </h1>
          <p className="text-xs sm:text-sm text-[#5B6B7F] mt-1">
            Browse complete OpenAPI definitions, sample requests, and interactive testing consoles.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-64">
            <MagnifyingGlass size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search API endpoints..."
              className="w-full h-9 pl-9 pr-3 rounded-xl border border-[#E3E8EF] text-xs text-[#14213D] outline-none focus:border-[#1F5FAD]"
            />
          </div>
          <button
            onClick={() => addToast('Downloaded complete OpenAPI 3.0 YAML bundle', 'success')}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#0B2545] hover:bg-[#13315C] text-white transition-colors flex items-center gap-1.5 shrink-0"
          >
            <DownloadSimple size={14} /> Download OpenAPI YAML
          </button>
        </div>
      </div>

      {/* Grid of APIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((api) => (
          <div
            key={api.slug}
            className="bg-white rounded-2xl p-6 border border-[#E3E8EF] shadow-xs hover:border-[#1F5FAD]/40 transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold text-[#1F5FAD] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    {api.protocol}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    {api.version}
                  </span>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {api.status}
                </span>
              </div>

              <h3 className="text-lg font-bold text-[#0B2545]">
                {api.title}
              </h3>

              <p className="text-xs text-[#5B6B7F] leading-relaxed">
                {api.desc}
              </p>

              <div className="space-y-1.5 pt-2 text-xs text-[#5B6B7F] border-t border-slate-100">
                <div className="flex justify-between">
                  <span>Authentication:</span>
                  <strong className="text-[#0B2545]">{api.auth}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Rate Limit:</span>
                  <span className="font-mono text-[#0B2545]">{api.rateLimit}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-[#E3E8EF] flex items-center justify-between gap-3">
              <Link
                to={`/developers/apis/${api.slug}`}
                className="flex-1 py-2 rounded-xl bg-[#0B2545] hover:bg-[#13315C] text-white text-xs font-semibold text-center transition-colors flex items-center justify-center gap-1.5"
              >
                Interactive Documentation <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

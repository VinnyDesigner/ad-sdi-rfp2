import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MapTrifold,
  PlugsConnected,
  Copy,
  Check,
  Compass,
  Sparkle,
  CheckCircle,
  Eye,
  ArrowsOut,
  Stack,
  ArrowRight,
  Database,
  Crosshair
} from '@phosphor-icons/react';
import { useApp } from '../context/AppContext';
import { OGC_SERVICES } from './ServicesPage';

export default function MapsServices() {
  const { addToast } = useApp();
  const [activeLayer, setActiveLayer] = useState('satellite');

  const copyUrl = (text) => {
    navigator.clipboard?.writeText(text);
    addToast('Service endpoint copied to clipboard', 'info');
  };

  const serviceCategories = [
    {
      to: '/map-viewer',
      icon: MapTrifold,
      title: 'Map Viewer',
      badge: 'Interactive GIS',
      color: '#1F5FAD',
      bgLight: 'bg-blue-50 text-[#1F5FAD]',
      desc: 'Multi-layer spatial exploration across Abu Dhabi, Saadiyat, Yas, and Al Ain with coordinate readouts and feature inspection.',
      actionText: 'Launch Viewer'
    },
    {
      to: '/base-maps',
      icon: Stack,
      title: 'Base Maps',
      badge: 'WMTS / MVT',
      color: '#FFC20E',
      bgLight: 'bg-amber-50 text-amber-700',
      desc: 'Sovereign 30cm satellite ortho, vector topographic, dark analytical canvas, and municipal cadastral basemaps.',
      actionText: 'Browse Basemaps'
    },
    {
      to: '/raster-data',
      icon: Sparkle,
      title: 'Raster Data & EO',
      badge: 'STAC / COG',
      color: '#7B4FD6',
      bgLight: 'bg-purple-50 text-[#7B4FD6]',
      desc: 'Cloud Optimized GeoTIFFs, airborne LiDAR elevation models (DEM/DSM), and Sentinel-2 multi-spectral time-series.',
      actionText: 'Explore Rasters'
    },
    {
      to: '/services',
      icon: PlugsConnected,
      title: 'Services & APIs',
      badge: '1,150 Endpoints',
      color: '#0E9F8E',
      bgLight: 'bg-emerald-50 text-emerald-700',
      desc: 'Certified OGC API Features, WMS 1.3, WMTS, WFS 2.0, and 3D Tiles web endpoints with verified 99.9% uptime SLA.',
      actionText: 'View Directory'
    }
  ];

  return (
    <div className="space-y-8">
      {/* 1. Page Title & Concise Description */}
      <div className="bg-white rounded-2xl p-6 lg:p-7 border border-[#E3E8EF] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="max-w-3xl space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1F5FAD]" />
            <span className="text-xs font-bold text-[#1F5FAD] uppercase tracking-wider">
              Geospatial Services & Cartography
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B2545] tracking-tight">
            Maps & Services
          </h1>
          <p className="text-xs sm:text-sm text-[#5B6B7F] leading-relaxed">
            Discover sovereign base maps, inspect raster Earth observation collections, and connect directly to federated OGC web services.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            to="/map-viewer"
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#0B2545] hover:bg-[#13315C] text-white transition-colors flex items-center gap-2 shadow-xs"
          >
            <MapTrifold size={16} weight="bold" />
            <span>Launch Map Viewer</span>
          </Link>
        </div>
      </div>

      {/* 2. Four Service-Category Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {serviceCategories.map((cat) => {
          const Icon = cat.icon;
          return (
            <Link
              key={cat.title}
              to={cat.to}
              className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E3E8EF] shadow-xs hover:border-[#1F5FAD] hover:shadow-md transition-all duration-200 group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className={`w-11 h-11 rounded-xl ${cat.bgLight} flex items-center justify-center font-bold transition-transform group-hover:scale-105`}>
                    <Icon size={22} weight="bold" />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                    {cat.badge}
                  </span>
                </div>

                <h2 className="text-base font-bold text-[#0B2545] group-hover:text-[#1F5FAD] transition-colors">
                  {cat.title}
                </h2>

                <p className="text-xs text-[#5B6B7F] leading-relaxed">
                  {cat.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between text-xs font-bold text-[#1F5FAD]">
                <span>{cat.actionText}</span>
                <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* 3. Interactive Geographic Preview (Constrained, balanced proportions) */}
      <div className="bg-[#0B2545] rounded-2xl border border-[#13315C] overflow-hidden shadow-md text-white">
        <div className="p-3.5 sm:p-4 border-b border-[#1E4976] flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#0B2545]/95">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Interactive Geographic Sandbox · Abu Dhabi Core
            </span>
            <span className="hidden md:inline font-mono text-[10px] text-[#2BA6DE] bg-[#13315C] px-2 py-0.5 rounded border border-[#1E4976]">
              EPSG:3997
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center bg-[#13315C] p-0.5 rounded-lg border border-[#1E4976] text-xs">
              {[
                { id: 'satellite', label: 'Satellite' },
                { id: 'cadastre', label: 'Cadastral' },
                { id: 'mangroves', label: 'Mangroves' }
              ].map((l) => (
                <button
                  key={l.id}
                  onClick={() => setActiveLayer(l.id)}
                  className={`px-3 py-1 rounded text-[11px] font-semibold transition-colors ${
                    activeLayer === l.id
                      ? 'bg-[#1F5FAD] text-white shadow-xs font-bold'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>

            <Link
              to="/map-viewer"
              className="p-1.5 rounded-lg bg-[#13315C] hover:bg-[#1E4976] text-white border border-[#1E4976] transition-colors"
              title="Expand Full Screen Map Viewer"
            >
              <ArrowsOut size={15} />
            </Link>
          </div>
        </div>

        {/* Viewport with balanced height ~ 280px-320px */}
        <div className="h-64 sm:h-72 lg:h-80 relative overflow-hidden bg-slate-950">
          <img
            src={
              activeLayer === 'satellite'
                ? '/assets/hero_abudhabi_aerial.jpg'
                : activeLayer === 'cadastre'
                ? '/assets/theme_cadastre.jpg'
                : '/assets/theme_environment.jpg'
            }
            alt="Abu Dhabi Geographic Sandbox"
            className="w-full h-full object-cover opacity-85 transition-opacity duration-300"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#0B2545]/90 via-transparent to-transparent pointer-events-none" />

          {/* Coordinate Readout */}
          <div className="absolute bottom-3 left-4 bg-[#0B2545]/85 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-[#1E4976] text-[11px] font-mono flex items-center gap-3">
            <Crosshair size={13} className="text-[#2BA6DE]" />
            <span>24.4539° N, 54.3773° E</span>
            <span>•</span>
            <span className="text-[#FFC20E]">Scale 1 : 25,000</span>
          </div>

          <div className="absolute bottom-3 right-4">
            <Link
              to="/map-viewer"
              className="px-4 py-1.5 rounded-xl bg-white text-[#0B2545] hover:bg-slate-100 text-xs font-bold shadow-md transition-colors inline-flex items-center gap-1.5"
            >
              <span>Explore in Viewer</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </div>

      {/* 4. Featured OGC Service Endpoints */}
      <div className="bg-white rounded-2xl p-6 lg:p-7 border border-[#E3E8EF] shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-[#0B2545] uppercase tracking-wider">
              Featured OGC Web Endpoints
            </h2>
            <p className="text-xs text-[#5B6B7F] mt-0.5">
              Production web services certified for ArcGIS, QGIS, MapLibre, Cesium, and mobile SDK integration.
            </p>
          </div>
          <Link
            to="/services"
            className="text-xs font-bold text-[#1F5FAD] hover:underline flex items-center gap-1 shrink-0"
          >
            <span>View all 1,150 services</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          {OGC_SERVICES.slice(0, 4).map((s) => (
            <div
              key={s.id}
              className="p-4 rounded-xl border border-[#E3E8EF] bg-slate-50/60 hover:border-[#1F5FAD]/40 transition-all space-y-3"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-mono font-bold text-[#1F5FAD] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {s.protocol}
                </span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {s.status} ({s.uptime})
                </span>
              </div>

              <div>
                <Link
                  to={`/services/${s.slug}`}
                  className="text-sm font-bold text-[#0B2545] hover:text-[#1F5FAD] transition-colors leading-snug block"
                >
                  {s.name}
                </Link>
                <div className="text-xs text-[#5B6B7F] mt-0.5">
                  Custodian: <strong>{s.custodian}</strong>
                </div>
              </div>

              {/* Endpoint box with safe truncation and copy button */}
              <div className="bg-white p-2 rounded-lg font-mono text-[11px] text-[#0B2545] flex items-center justify-between border border-slate-200 gap-2 min-w-0">
                <span className="truncate">{s.endpoint}</span>
                <button
                  onClick={() => copyUrl(s.endpoint)}
                  className="p-1 rounded text-[#1F5FAD] hover:text-[#0B2545] hover:bg-slate-100 shrink-0 transition-colors"
                  title="Copy service endpoint"
                >
                  <Copy size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

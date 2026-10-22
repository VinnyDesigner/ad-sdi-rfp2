import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MagnifyingGlass,
  X,
  Database,
  MapTrifold,
  PlugsConnected,
  Sparkle,
  Cube,
  Storefront,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  FileCode,
  Tag
} from '@phosphor-icons/react';
import { useApp } from '../context/AppContext';
import { DATASETS } from '../data/datasetsData';
import { marketplaceProducts } from '../data/portalData';
import { OGC_SERVICES } from '../pages/ServicesPage';

export default function GlobalSearchModal() {
  const { isSearchModalOpen, setIsSearchModalOpen, lang } = useApp();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  // Listen to keyboard shortcut Command+K or Ctrl+K and Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchModalOpen((prev) => !prev);
      }
      if (e.key === 'Escape' && isSearchModalOpen) {
        setIsSearchModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchModalOpen, setIsSearchModalOpen]);

  if (!isSearchModalOpen) return null;

  const quickNav = [
    { label: 'Geospatial Catalogue', path: '/catalogue', icon: Database, category: 'Discover', desc: 'Browse authoritative vector and raster datasets across Abu Dhabi' },
    { label: 'Interactive Map Viewer', path: '/map-viewer', icon: MapTrifold, category: 'Discover', desc: 'Multi-layer GIS workspace with basemaps and coordinate inspection' },
    { label: 'Maps & Services Directory', path: '/maps-services', icon: PlugsConnected, category: 'Discover', desc: 'Explore basemaps, raster EO collections, and OGC web services' },
    { label: 'Geospatial Marketplace', path: '/marketplace', icon: Storefront, category: 'Marketplace', desc: 'Commercial and governmental data sharing agreements' },
    { label: 'Open Data Portal', path: '/open-data', icon: Database, category: 'Open Data', desc: 'Freely accessible public datasets and APIs' },
    { label: 'Developers & API Docs', path: '/developers', icon: FileCode, category: 'Build', desc: 'Interactive OpenAPI documentation, endpoints, and code snippets' },
    { label: 'GeoAI Studio: Change Detection', path: '/geoai-studio', icon: Sparkle, category: 'Build', desc: 'Satellite AI inference for building and land-use alterations' },
    { label: 'Digital Twin 3D Massing', path: '/digital-twin', icon: Cube, category: 'Build', desc: 'LOD2 extruded building structures and urban simulation' },
    { label: 'Command Centre & Workspace', path: '/command-centre', icon: ShieldCheck, category: 'Workspace', desc: 'Government SDI operations, security, and approval workflows' }
  ];

  const q = query.trim().toLowerCase();

  // 1. Matching Datasets
  const matchedDatasets = q
    ? DATASETS.filter(
        (d) =>
          d.title.toLowerCase().includes(q) ||
          d.theme.toLowerCase().includes(q) ||
          d.entity.toLowerCase().includes(q) ||
          d.entityShort.toLowerCase().includes(q) ||
          d.description.toLowerCase().includes(q) ||
          d.formats?.some((f) => f.toLowerCase().includes(q))
      ).slice(0, 5)
    : DATASETS.slice(0, 3);

  // 2. Matching Services & APIs
  const matchedServices = q
    ? (OGC_SERVICES || []).filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q) ||
          s.protocol.toLowerCase().includes(q) ||
          s.custodian.toLowerCase().includes(q) ||
          s.desc.toLowerCase().includes(q)
      ).slice(0, 4)
    : [];

  // 3. Matching Marketplace Products
  const matchedMarketplace = q
    ? (marketplaceProducts || []).filter(
        (m) =>
          m.title.toLowerCase().includes(q) ||
          m.provider.toLowerCase().includes(q) ||
          m.type.toLowerCase().includes(q) ||
          m.desc.toLowerCase().includes(q)
      ).slice(0, 3)
    : [];

  // 4. Matching Platform Tools & Apps
  const matchedTools = q
    ? quickNav.filter(
        (item) =>
          item.label.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.desc.toLowerCase().includes(q)
      ).slice(0, 4)
    : [];

  const totalMatches =
    matchedDatasets.length +
    matchedServices.length +
    matchedMarketplace.length +
    matchedTools.length;

  const handleSelectRoute = (path) => {
    setIsSearchModalOpen(false);
    navigate(path);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setIsSearchModalOpen(false);
      navigate(`/catalogue?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="fixed inset-0 z-[9500] flex items-start justify-center pt-16 sm:pt-20 px-3 sm:px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0B2545]/60 backdrop-blur-sm transition-opacity cursor-pointer"
        onClick={() => setIsSearchModalOpen(false)}
        aria-hidden="true"
      />

      {/* Dialog box */}
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#E3E8EF] z-10 animate-fade-in flex flex-col max-h-[85vh]">
        {/* Search Input bar */}
        <form
          onSubmit={handleSearchSubmit}
          className="flex items-center px-4 py-3.5 border-b border-[#E3E8EF] bg-white gap-3 shrink-0"
        >
          <MagnifyingGlass size={22} className="text-[#1F5FAD] shrink-0" weight="bold" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search datasets, maps, OGC services, marketplace items, or tools..."
            className="flex-1 bg-transparent border-0 outline-none text-[#14213D] text-sm sm:text-base placeholder-[#5B6B7F]"
            autoFocus
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="text-xs text-[#5B6B7F] hover:text-[#14213D] px-2 py-0.5 rounded bg-slate-100 cursor-pointer"
            >
              Clear
            </button>
          )}
          <span className="text-[11px] font-mono font-medium px-2 py-1 bg-slate-100 text-[#5B6B7F] rounded border border-slate-200 shrink-0">
            ESC
          </span>
          <button
            type="button"
            onClick={() => setIsSearchModalOpen(false)}
            className="text-[#5B6B7F] hover:text-[#14213D] p-1 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            title="Close Search Modal"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </form>

        {/* Results Area */}
        <div className="overflow-y-auto p-4 space-y-4 flex-1">
          {/* Default state when query is empty: Quick Navigation & Featured Datasets */}
          {!q && (
            <>
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#5B6B7F] mb-2 px-2">
                  Portal Destinations
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
                  {quickNav.slice(0, 6).map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.path}
                        onClick={() => handleSelectRoute(item.path)}
                        className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#F5F7FA] text-left transition-colors group w-full cursor-pointer border border-transparent hover:border-[#E3E8EF]"
                      >
                        <div className="w-8 h-8 rounded-lg bg-blue-50 group-hover:bg-[#1F5FAD] text-[#1F5FAD] group-hover:text-white flex items-center justify-center transition-colors shrink-0">
                          <Icon size={17} weight="bold" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-semibold text-[#14213D] truncate group-hover:text-[#1F5FAD]">
                            {item.label}
                          </div>
                          <div className="text-[10px] text-[#5B6B7F] truncate">{item.category}</div>
                        </div>
                        <ArrowRight size={13} className="text-slate-300 group-hover:text-[#1F5FAD] group-hover:translate-x-0.5 transition-all shrink-0" />
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2 px-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#5B6B7F]">
                    Featured Datasets
                  </span>
                  <button
                    onClick={() => handleSelectRoute('/catalogue')}
                    className="text-xs text-[#1F5FAD] hover:underline font-medium cursor-pointer"
                  >
                    View all in Catalogue →
                  </button>
                </div>

                <div className="space-y-1.5">
                  {DATASETS.slice(0, 3).map((ds) => (
                    <button
                      key={ds.id}
                      onClick={() => handleSelectRoute(`/catalogue/${ds.slug}`)}
                      className="flex items-center justify-between p-3 rounded-xl hover:bg-[#F5F7FA] text-left transition-colors w-full group border border-transparent hover:border-[#E3E8EF] cursor-pointer"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#1F5FAD] flex items-center justify-center shrink-0">
                          <Database size={16} weight="fill" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-semibold text-[#14213D] truncate group-hover:text-[#1F5FAD]">
                            {ds.title}
                          </div>
                          <div className="text-[11px] text-[#5B6B7F] flex items-center gap-2">
                            <span>{ds.entityShort}</span>
                            <span>•</span>
                            <span className="text-[#1F5FAD] font-medium">{ds.theme}</span>
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-[#14213D] font-mono shrink-0 ml-2">
                        EPSG:3997
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Active query search results grouped by category */}
          {q && totalMatches > 0 && (
            <div className="space-y-4">
              {/* Group 1: Datasets */}
              {matchedDatasets.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-2 px-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#5B6B7F] flex items-center gap-1.5">
                      <Database size={13} weight="bold" className="text-[#1F5FAD]" />
                      <span>Datasets ({matchedDatasets.length})</span>
                    </span>
                    <button
                      onClick={handleSearchSubmit}
                      className="text-xs text-[#1F5FAD] hover:underline font-medium cursor-pointer"
                    >
                      Search all in Catalogue →
                    </button>
                  </div>
                  <div className="space-y-1.5">
                    {matchedDatasets.map((ds) => (
                      <button
                        key={ds.id}
                        onClick={() => handleSelectRoute(`/catalogue/${ds.slug}`)}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#F5F7FA] text-left transition-colors w-full group border border-transparent hover:border-[#E3E8EF] cursor-pointer"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#1F5FAD] flex items-center justify-center shrink-0">
                            <Database size={15} weight="fill" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs font-semibold text-[#14213D] truncate group-hover:text-[#1F5FAD]">
                              {ds.title}
                            </div>
                            <div className="text-[10.5px] text-[#5B6B7F] flex items-center gap-1.5 truncate">
                              <span>{ds.entityShort}</span>
                              <span>•</span>
                              <span className="text-[#1F5FAD] font-medium">{ds.theme}</span>
                              <span>•</span>
                              <span className="font-mono text-[9.5px]">{ds.formats?.[0] || 'OGC API'}</span>
                            </div>
                          </div>
                        </div>
                        <ArrowRight size={13} className="text-slate-300 group-hover:text-[#1F5FAD] group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Group 2: Maps & Web Services */}
              {matchedServices.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-2 px-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#5B6B7F] flex items-center gap-1.5">
                      <PlugsConnected size={13} weight="bold" className="text-[#0E9F8E]" />
                      <span>Maps & Web Services ({matchedServices.length})</span>
                    </span>
                    <button
                      onClick={() => handleSelectRoute('/services')}
                      className="text-xs text-[#1F5FAD] hover:underline font-medium cursor-pointer"
                    >
                      View all services →
                    </button>
                  </div>
                  <div className="space-y-1.5">
                    {matchedServices.map((srv) => (
                      <button
                        key={srv.id}
                        onClick={() => handleSelectRoute(`/services/${srv.slug}`)}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#F5F7FA] text-left transition-colors w-full group border border-transparent hover:border-[#E3E8EF] cursor-pointer"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                            <PlugsConnected size={15} weight="bold" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs font-semibold text-[#14213D] truncate group-hover:text-[#1F5FAD]">
                              {srv.name}
                            </div>
                            <div className="text-[10.5px] text-[#5B6B7F] flex items-center gap-1.5 truncate">
                              <span className="font-semibold text-slate-700">{srv.protocol}</span>
                              <span>•</span>
                              <span>{srv.custodian}</span>
                            </div>
                          </div>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold shrink-0 ml-2">
                          Operational
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Group 3: Marketplace Products */}
              {matchedMarketplace.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-2 px-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#5B6B7F] flex items-center gap-1.5">
                      <Storefront size={13} weight="bold" className="text-purple-600" />
                      <span>Marketplace ({matchedMarketplace.length})</span>
                    </span>
                    <button
                      onClick={() => handleSelectRoute('/marketplace')}
                      className="text-xs text-[#1F5FAD] hover:underline font-medium cursor-pointer"
                    >
                      View marketplace →
                    </button>
                  </div>
                  <div className="space-y-1.5">
                    {matchedMarketplace.map((mp) => (
                      <button
                        key={mp.id}
                        onClick={() => handleSelectRoute('/marketplace')}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#F5F7FA] text-left transition-colors w-full group border border-transparent hover:border-[#E3E8EF] cursor-pointer"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
                            <Storefront size={15} weight="bold" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs font-semibold text-[#14213D] truncate group-hover:text-[#1F5FAD]">
                              {mp.title}
                            </div>
                            <div className="text-[10.5px] text-[#5B6B7F] flex items-center gap-1.5 truncate">
                              <span>{mp.provider}</span>
                              <span>•</span>
                              <span className="text-purple-700 font-medium">{mp.type}</span>
                            </div>
                          </div>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 font-semibold shrink-0 ml-2">
                          {mp.access}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Group 4: Applications & Tools */}
              {matchedTools.length > 0 && (
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#5B6B7F] mb-2 px-2 flex items-center gap-1.5">
                    <Sparkle size={13} weight="bold" className="text-amber-600" />
                    <span>Applications & Tools ({matchedTools.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {matchedTools.map((tool) => {
                      const Icon = tool.icon;
                      return (
                        <button
                          key={tool.path}
                          onClick={() => handleSelectRoute(tool.path)}
                          className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#F5F7FA] text-left transition-colors w-full group border border-transparent hover:border-[#E3E8EF] cursor-pointer"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                              <Icon size={15} weight="bold" />
                            </div>
                            <div className="min-w-0">
                              <div className="text-xs font-semibold text-[#14213D] truncate group-hover:text-[#1F5FAD]">
                                {tool.label}
                              </div>
                              <div className="text-[10.5px] text-[#5B6B7F] truncate">{tool.desc}</div>
                            </div>
                          </div>
                          <ArrowRight size={13} className="text-slate-300 group-hover:text-[#1F5FAD] group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* No results state */}
          {q && totalMatches === 0 && (
            <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-[#E3E8EF]">
              <div className="w-10 h-10 rounded-full bg-slate-200/80 text-slate-500 mx-auto flex items-center justify-center mb-2.5">
                <MagnifyingGlass size={20} weight="bold" />
              </div>
              <p className="text-sm font-bold text-[#0B2545]">
                No portal content found matching "{query}"
              </p>
              <p className="text-xs text-[#5B6B7F] mt-1.5 max-w-md mx-auto leading-relaxed">
                Try searching for general keywords like "cadastre", "satellite", "mangroves", "3D buildings", or "OGC API".
              </p>
              <div className="flex items-center justify-center gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="px-3.5 py-1.5 rounded-lg border border-[#E3E8EF] text-xs font-medium text-slate-700 hover:bg-white transition cursor-pointer"
                >
                  Clear search
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectRoute('/catalogue')}
                  className="px-3.5 py-1.5 rounded-lg bg-[#0B2545] text-xs font-semibold text-white hover:bg-[#13315C] transition cursor-pointer"
                >
                  Open Catalogue
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal footer shortcut hints */}
        <div className="px-4 py-2.5 bg-[#F5F7FA] border-t border-[#E3E8EF] flex items-center justify-between text-[11px] text-[#5B6B7F] shrink-0">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200">↵</kbd> to view
            </span>
            <span>
              <kbd className="font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200">ESC</kbd> to close
            </span>
          </div>
          <span className="font-medium text-slate-600">Sovereign Spatial Data Infrastructure</span>
        </div>
      </div>
    </div>
  );
}

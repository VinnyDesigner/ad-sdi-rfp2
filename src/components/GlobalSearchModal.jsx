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
  ShieldCheck
} from '@phosphor-icons/react';
import { useApp } from '../context/AppContext';
import { sampleDatasets, marketplaceProducts } from '../data/portalData';

export default function GlobalSearchModal() {
  const { isSearchModalOpen, setIsSearchModalOpen } = useApp();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  // Listen to keyboard shortcut Command+K or Ctrl+K
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
    { label: 'Geospatial Catalogue', path: '/catalogue', icon: Database, category: 'Discover' },
    { label: 'Interactive Map Viewer', path: '/map-viewer', icon: MapTrifold, category: 'Discover' },
    { label: 'GeoAI Studio: Change Detection', path: '/geoai-studio', icon: Sparkle, category: 'Build' },
    { label: 'Digital Twin 3D Massing', path: '/digital-twin', icon: Cube, category: 'Build' },
    { label: 'Publishing & Approvals Pipeline', path: '/publishing', icon: ShieldCheck, category: 'Govern' },
    { label: 'Geospatial Marketplace', path: '/marketplace', icon: Storefront, category: 'Marketplace' },
    { label: 'OGC Web Services & APIs', path: '/services', icon: PlugsConnected, category: 'Build' }
  ];

  const filteredDatasets = query.trim()
    ? sampleDatasets.filter(
        (d) =>
          d.title.toLowerCase().includes(query.toLowerCase()) ||
          d.theme.toLowerCase().includes(query.toLowerCase()) ||
          d.entity.toLowerCase().includes(query.toLowerCase())
      )
    : sampleDatasets.slice(0, 4);

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
    <div className="fixed inset-0 z-[9500] flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0B2545]/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsSearchModalOpen(false)}
        aria-hidden="true"
      />

      {/* Dialog box */}
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#E3E8EF] z-10 animate-fade-in">
        {/* Search Input bar */}
        <form onSubmit={handleSearchSubmit} className="flex items-center px-4 py-3.5 border-b border-[#E3E8EF] bg-white gap-3">
          <MagnifyingGlass size={22} className="text-[#1F5FAD] shrink-0" weight="bold" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search datasets, services, maps, AI models, or workspace tools..."
            className="flex-1 bg-transparent border-0 outline-none text-[#14213D] text-base placeholder-[#5B6B7F]"
            autoFocus
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="text-xs text-[#5B6B7F] hover:text-[#14213D] px-1.5 py-0.5 rounded bg-slate-100"
            >
              Clear
            </button>
          )}
          <span className="text-[11px] font-mono font-medium px-2 py-1 bg-slate-100 text-[#5B6B7F] rounded border border-slate-200">
            ESC
          </span>
          <button
            type="button"
            onClick={() => setIsSearchModalOpen(false)}
            className="text-[#5B6B7F] hover:text-[#14213D] p-1"
          >
            <X size={18} />
          </button>
        </form>

        {/* Results Area */}
        <div className="max-h-[440px] overflow-y-auto p-4 space-y-4">
          {/* Quick workspace navigation */}
          {!query && (
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#5B6B7F] mb-2 px-2">
                Workspace Destinations
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
                {quickNav.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.path}
                      onClick={() => handleSelectRoute(item.path)}
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#F5F7FA] text-left transition-colors group w-full"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#F5F7FA] group-hover:bg-[#1F5FAD] text-[#1F5FAD] group-hover:text-white flex items-center justify-center transition-colors">
                        <Icon size={18} weight="fill" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold text-[#14213D] truncate">{item.label}</div>
                        <div className="text-[11px] text-[#5B6B7F]">{item.category}</div>
                      </div>
                      <ArrowRight size={14} className="text-slate-300 group-hover:text-[#1F5FAD] group-hover:translate-x-0.5 transition-all" />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Matching Datasets */}
          <div>
            <div className="flex items-center justify-between mb-2 px-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#5B6B7F]">
                {query ? 'Matching Authoritative Datasets' : 'Featured Spatial Datasets'}
              </span>
              {query && (
                <button
                  onClick={handleSearchSubmit}
                  className="text-xs text-[#1F5FAD] hover:underline font-medium"
                >
                  View all in Catalogue →
                </button>
              )}
            </div>

            <div className="space-y-1.5">
              {filteredDatasets.length > 0 ? (
                filteredDatasets.map((ds) => (
                  <button
                    key={ds.id}
                    onClick={() => handleSelectRoute(`/catalogue/${ds.id}`)}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-[#F5F7FA] text-left transition-colors w-full group border border-transparent hover:border-[#E3E8EF]"
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
                          <span>{ds.entity}</span>
                          <span>•</span>
                          <span className="text-[#1F5FAD] font-medium">{ds.theme}</span>
                        </div>
                      </div>
                    </div>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 text-[#14213D] font-mono shrink-0 ml-2">
                      EPSG:3997
                    </span>
                  </button>
                ))
              ) : (
                <div className="p-6 text-center text-sm text-[#5B6B7F]">
                  No matching spatial assets found for "{query}".
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal footer shortcut hints */}
        <div className="px-4 py-2.5 bg-[#F5F7FA] border-t border-[#E3E8EF] flex items-center justify-between text-[11px] text-[#5B6B7F]">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200">↵</kbd> to select
            </span>
            <span>
              <kbd className="font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200">↑↓</kbd> to navigate
            </span>
          </div>
          <span>UAE Sovereign Geospatial Index</span>
        </div>
      </div>
    </div>
  );
}

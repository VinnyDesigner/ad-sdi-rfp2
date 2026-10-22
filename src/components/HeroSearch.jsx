import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  MagnifyingGlass,
  CaretDown,
  Compass,
  ArrowRight
} from '@phosphor-icons/react';
import Container from './Container';
import { searchScopes } from '../data/portalData';

const popularSearches = [
  { label: 'Mangrove', query: 'mangrove', theme: 'Environment' },
  { label: 'Coastal Areas', query: 'coastal', theme: 'Environment' },
  { label: 'Abu Dhabi Island', query: 'Abu Dhabi', theme: 'Boundaries' },
  { label: 'Land Parcels', query: 'cadastre', theme: 'Land & Cadastre' },
  { label: 'Basemaps', query: 'satellite', theme: 'Imagery' }
];

export default function HeroSearch() {
  const [query, setQuery] = useState('');
  const [scope, setScope] = useState('all');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set('q', query.trim());
    if (scope && scope !== 'all') params.set('scope', scope);
    navigate(`/catalogue?${params.toString()}`);
  };

  const handleShortcutClick = (shortcut) => {
    const params = new URLSearchParams();
    params.set('q', shortcut.query);
    params.set('theme', shortcut.theme);
    navigate(`/catalogue?${params.toString()}`);
  };

  const selectedScopeLabel = searchScopes.find((s) => s.id === scope)?.label || 'All Categories';

  return (
    <section className="relative bg-[#0B2545] text-white pt-10 pb-20 sm:pt-14 sm:pb-24 lg:pt-16 lg:pb-28 overflow-hidden">
      {/* Background Satellite Aerial with Rich Navy Gradient Overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <img
          src="/assets/hero_abudhabi_aerial.jpg"
          alt="Abu Dhabi coastal geographic aerial"
          className="w-full h-full object-cover object-center-right opacity-85 scale-105"
        />
        {/* Navy gradient overlay: solid/dark on left for readability, translucent on right */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B2545] via-[#0B2545]/90 sm:via-[#0B2545]/80 to-[#0B2545]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B2545] via-transparent to-[#0B2545]/50" />
      </div>

      <Container wide className="relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          {/* Left: Headlines & Search Form */}
          <div className="max-w-2xl lg:max-w-3xl space-y-5">
            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Authoritative Geospatial Data <br className="hidden sm:inline" />
              <span className="text-[#FFC20E]">for a Smarter Abu Dhabi</span>
            </h1>

            {/* Supporting Text */}
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl font-normal">
              Discover, access and share trusted geospatial data, services and applications across government, partners and the community.
            </p>

            {/* Primary Discovery Search Bar */}
            <div className="pt-2 max-w-2xl">
              <form
                onSubmit={handleSearchSubmit}
                className="bg-white rounded-2xl p-1.5 sm:p-2 shadow-2xl border border-white/20 flex flex-col sm:flex-row items-stretch sm:items-center gap-2"
                role="search"
              >
                {/* Search Text Input */}
                <div className="flex-1 flex items-center gap-2.5 px-3 py-1.5 min-w-0">
                  <MagnifyingGlass size={20} className="text-[#1F5FAD] shrink-0" weight="bold" />
                  <input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search datasets, maps, services, or keywords..."
                    aria-label="Search datasets, maps, services, or keywords"
                    className="w-full bg-transparent border-none text-xs sm:text-sm text-[#0B2545] placeholder:text-slate-400 focus:outline-none"
                  />
                </div>

                <div className="hidden sm:block h-7 w-[1px] bg-slate-200" />

                {/* Scope Category Dropdown */}
                <div className="relative shrink-0">
                  <button
                    type="button"
                    className="w-full sm:w-auto flex items-center justify-between gap-2 px-3 py-2 text-xs font-semibold text-[#0B2545] hover:text-[#1F5FAD] hover:bg-slate-50 rounded-xl transition-colors"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    aria-haspopup="listbox"
                    aria-expanded={dropdownOpen}
                  >
                    <span>{selectedScopeLabel}</span>
                    <CaretDown size={14} weight="bold" className={`transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {dropdownOpen && (
                    <div className="absolute top-full left-0 sm:right-0 sm:left-auto mt-2 bg-white rounded-xl shadow-xl border border-slate-200 p-1.5 min-w-[180px] z-50 space-y-0.5">
                      {searchScopes.map((s) => (
                        <button
                          key={s.id}
                          type="button"
                          className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                            scope === s.id
                              ? 'bg-blue-50 text-[#1F5FAD] font-bold'
                              : 'text-[#0B2545] hover:bg-slate-100'
                          }`}
                          onClick={() => {
                            setScope(s.id);
                            setDropdownOpen(false);
                          }}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Submit Search Button */}
                <button
                  type="submit"
                  className="bg-[#0B2545] hover:bg-[#13315C] text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-md shrink-0 cursor-pointer"
                >
                  <span>Search</span>
                  <ArrowRight size={15} weight="bold" />
                </button>
              </form>

              {/* Popular Searches Shortcuts Row */}
              <div className="flex items-center gap-2 sm:gap-3 mt-4 flex-wrap text-xs">
                <span className="text-slate-300 font-medium text-[11px] sm:text-xs">Popular searches:</span>
                <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                  {popularSearches.map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => handleShortcutClick(item)}
                      className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-slate-100 hover:text-white text-[11px] font-medium transition-all cursor-pointer backdrop-blur-xs"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Bottom Floating Badge: Explore Abu Dhabi Interactive Map */}
          <div className="shrink-0 self-end lg:mb-2">
            <Link
              to="/map-viewer"
              className="flex items-center gap-3 bg-[#0B2545]/85 hover:bg-[#0B2545] backdrop-blur-md border border-white/20 px-4 py-2.5 rounded-2xl shadow-xl transition-all group hover:scale-[1.02]"
              title="Launch interactive Abu Dhabi Map Viewer"
            >
              <div className="w-9 h-9 rounded-full bg-[#1F5FAD] flex items-center justify-center text-white shrink-0 shadow-sm">
                <Compass size={20} weight="bold" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-white tracking-tight">Explore Abu Dhabi</div>
                <div className="text-[10px] text-slate-300 font-medium">Interactive Map</div>
              </div>
              <div className="w-6 h-6 rounded-full bg-[#FFC20E] text-[#0B2545] flex items-center justify-center font-bold text-xs shrink-0 group-hover:translate-x-0.5 transition-transform ml-1">
                <ArrowRight size={13} weight="bold" />
              </div>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

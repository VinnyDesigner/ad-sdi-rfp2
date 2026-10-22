import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  MapPin,
  CaretDown,
  Crosshair,
  MapTrifold,
  Car,
  Compass,
  Buildings,
  Leaf,
  Lightning,
  Camera,
  UsersThree,
  Check
} from '@phosphor-icons/react';
import Container from './Container';

const themes = [
  {
    id: 'boundaries',
    name: 'Boundaries',
    count: '320 datasets',
    image: '/assets/theme_boundaries.jpg',
    icon: MapTrifold,
    color: '#1F5FAD',
    bg: 'bg-blue-50 text-[#1F5FAD]'
  },
  {
    id: 'transport',
    name: 'Transport',
    count: '420 datasets',
    image: '/assets/theme_transport.jpg',
    icon: Car,
    color: '#0B2545',
    bg: 'bg-slate-100 text-[#0B2545]'
  },
  {
    id: 'cadastre',
    name: 'Land & Cadastre',
    count: '380 datasets',
    image: '/assets/theme_cadastre.jpg',
    icon: Compass,
    color: '#D97706',
    bg: 'bg-amber-50 text-amber-700'
  },
  {
    id: 'buildings',
    name: 'Buildings & 3D',
    count: '290 datasets',
    image: '/assets/theme_buildings.jpg',
    icon: Buildings,
    color: '#2BA6DE',
    bg: 'bg-sky-50 text-[#2BA6DE]'
  },
  {
    id: 'environment',
    name: 'Environment',
    count: '310 datasets',
    image: '/assets/theme_environment.jpg',
    icon: Leaf,
    color: '#1E9E6A',
    bg: 'bg-emerald-50 text-[#1E9E6A]'
  },
  {
    id: 'utilities',
    name: 'Utilities',
    count: '180 datasets',
    image: '/assets/theme_utilities.jpg',
    icon: Lightning,
    color: '#E07B24',
    bg: 'bg-orange-50 text-orange-600'
  },
  {
    id: 'imagery',
    name: 'Imagery',
    count: '260 datasets',
    image: '/assets/theme_imagery.jpg',
    icon: Camera,
    color: '#1F5FAD',
    bg: 'bg-blue-50 text-[#1F5FAD]'
  },
  {
    id: 'population',
    name: 'Population',
    count: '210 datasets',
    image: '/assets/theme_population.jpg',
    icon: UsersThree,
    color: '#7B4FD6',
    bg: 'bg-purple-50 text-[#7B4FD6]'
  }
];

export default function ExploreThemes() {
  const navigate = useNavigate();

  // Interactive map layer checklist state
  const [activeLayers, setActiveLayers] = useState({
    abuDhabi: true,
    yasIsland: true,
    alMaryah: true,
    alDhafra: true
  });

  const toggleLayer = (layerKey) => {
    setActiveLayers((prev) => ({
      ...prev,
      [layerKey]: !prev[layerKey]
    }));
  };

  return (
    <section className="py-10 sm:py-14 lg:py-16 bg-[#F5F7FA]" aria-label="Explore by Theme">
      <Container wide>
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-7 sm:mb-9">
          <div className="max-w-2xl space-y-1.5 text-left">
            <div className="flex items-center gap-2">
              <span className="w-5 h-0.5 bg-[#FFC20E] rounded-full inline-block" />
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#D97706]">
                Explore by Theme
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B2545] tracking-tight">
              Find Data by Geographic Theme
            </h2>
            <p className="text-xs sm:text-sm text-[#5B6B7F] font-normal leading-relaxed">
              Browse our curated themes to discover relevant datasets, maps and services across Abu Dhabi and beyond.
            </p>
          </div>

          <Link
            to="/catalogue"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#1F5FAD] hover:text-[#0B2545] transition-colors shrink-0 group self-start sm:self-auto"
          >
            <span>View all themes</span>
            <ArrowRight size={15} weight="bold" className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Split Geographic Explorer Layout (Left: Map Preview 50%, Right: 8 Cards 50%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Column: Large Abu Dhabi Geographic Map Preview (~50% width) */}
          <div className="lg:col-span-6 relative rounded-2xl overflow-hidden border border-[#E3E8EF] shadow-md bg-[#0A1628] min-h-[380px] sm:min-h-[440px] lg:min-h-[480px] flex flex-col justify-between group">
            {/* Background Satellite Map Visual */}
            <div className="absolute inset-0 pointer-events-none">
              <img
                src="/assets/hero_abudhabi_aerial.jpg"
                alt="Abu Dhabi coastal geographic satellite view"
                className="w-full h-full object-cover object-center scale-105 opacity-90 transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B2545]/90 via-transparent to-[#0B2545]/40" />
            </div>

            {/* Vector Polygons SVG Overlay */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-10"
              viewBox="0 0 600 500"
              preserveAspectRatio="none"
            >
              {/* Abu Dhabi Island Boundary (Cyan) */}
              {activeLayers.abuDhabi && (
                <polygon
                  points="210,180 340,160 410,270 300,340 180,260"
                  fill="rgba(43, 166, 222, 0.22)"
                  stroke="#2BA6DE"
                  strokeWidth="2.5"
                  className="transition-all duration-300 drop-shadow-[0_0_8px_rgba(43,166,222,0.8)]"
                />
              )}

              {/* Yas Island Boundary (Purple/Magenta) */}
              {activeLayers.yasIsland && (
                <polygon
                  points="350,110 460,95 480,180 380,200 340,150"
                  fill="rgba(192, 38, 211, 0.25)"
                  stroke="#C026D3"
                  strokeWidth="2.5"
                  className="transition-all duration-300 drop-shadow-[0_0_8px_rgba(192,38,211,0.8)]"
                />
              )}

              {/* Al Maryah Island (Gold) */}
              {activeLayers.alMaryah && (
                <polygon
                  points="270,170 325,160 335,210 280,220"
                  fill="rgba(255, 194, 14, 0.35)"
                  stroke="#FFC20E"
                  strokeWidth="2.5"
                  className="transition-all duration-300 drop-shadow-[0_0_8px_rgba(255,194,14,0.9)]"
                />
              )}

              {/* Al Dhafra Coastal Protected Zone (Emerald Green) */}
              {activeLayers.alDhafra && (
                <polygon
                  points="110,260 210,240 250,370 140,410 90,320"
                  fill="rgba(30, 158, 106, 0.28)"
                  stroke="#1E9E6A"
                  strokeWidth="2.5"
                  className="transition-all duration-300 drop-shadow-[0_0_8px_rgba(30,158,106,0.8)]"
                />
              )}
            </svg>

            {/* Top-Right Floating Layer Checklist Card (as shown in reference image) */}
            <div className="relative z-20 self-end m-4 p-3 bg-[#0B2545]/85 backdrop-blur-md border border-white/15 rounded-xl shadow-xl text-white text-xs w-44 sm:w-48 space-y-2">
              <div className="text-[10px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                Active Layers
              </div>

              <div className="space-y-1.5">
                {/* Layer 1: Abu Dhabi Island */}
                <label className="flex items-center gap-2 cursor-pointer hover:text-white text-slate-200 text-[11px] select-none">
                  <input
                    type="checkbox"
                    checked={activeLayers.abuDhabi}
                    onChange={() => toggleLayer('abuDhabi')}
                    className="rounded border-white/20 text-[#2BA6DE] focus:ring-0 w-3.5 h-3.5 bg-black/40"
                  />
                  <span className="w-2 h-2 rounded-full bg-[#2BA6DE] shrink-0 shadow-[0_0_6px_#2BA6DE]" />
                  <span>Abu Dhabi Island</span>
                </label>

                {/* Layer 2: Yas Island */}
                <label className="flex items-center gap-2 cursor-pointer hover:text-white text-slate-200 text-[11px] select-none">
                  <input
                    type="checkbox"
                    checked={activeLayers.yasIsland}
                    onChange={() => toggleLayer('yasIsland')}
                    className="rounded border-white/20 text-[#C026D3] focus:ring-0 w-3.5 h-3.5 bg-black/40"
                  />
                  <span className="w-2 h-2 rounded-full bg-[#C026D3] shrink-0 shadow-[0_0_6px_#C026D3]" />
                  <span>Yas Island</span>
                </label>

                {/* Layer 3: Al Maryah Island */}
                <label className="flex items-center gap-2 cursor-pointer hover:text-white text-slate-200 text-[11px] select-none">
                  <input
                    type="checkbox"
                    checked={activeLayers.alMaryah}
                    onChange={() => toggleLayer('alMaryah')}
                    className="rounded border-white/20 text-[#FFC20E] focus:ring-0 w-3.5 h-3.5 bg-black/40"
                  />
                  <span className="w-2 h-2 rounded-full bg-[#FFC20E] shrink-0 shadow-[0_0_6px_#FFC20E]" />
                  <span>Al Maryah Island</span>
                </label>

                {/* Layer 4: Al Dhafra */}
                <label className="flex items-center gap-2 cursor-pointer hover:text-white text-slate-200 text-[11px] select-none">
                  <input
                    type="checkbox"
                    checked={activeLayers.alDhafra}
                    onChange={() => toggleLayer('alDhafra')}
                    className="rounded border-white/20 text-[#1E9E6A] focus:ring-0 w-3.5 h-3.5 bg-black/40"
                  />
                  <span className="w-2 h-2 rounded-full bg-[#1E9E6A] shrink-0 shadow-[0_0_6px_#1E9E6A]" />
                  <span>Al Dhafra</span>
                </label>
              </div>

              <div className="pt-1.5 border-t border-white/10">
                <Link
                  to="/map-viewer"
                  className="text-[10px] text-[#FFC20E] hover:underline font-semibold block"
                >
                  + 3 more layers
                </Link>
              </div>
            </div>

            {/* Bottom Controls Row: Location selector (bottom-left) & Reticle/Center button (bottom-right) */}
            <div className="relative z-20 m-4 flex items-center justify-between gap-3">
              {/* Location Selector Pill */}
              <div className="flex items-center gap-1.5 bg-[#0B2545]/90 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-xl text-white text-xs font-semibold shadow-md">
                <MapPin size={14} weight="fill" className="text-[#FFC20E]" />
                <span>Abu Dhabi</span>
                <CaretDown size={12} weight="bold" className="text-slate-300 ml-1" />
              </div>

              {/* Action Controls */}
              <div className="flex items-center gap-2">
                <Link
                  to="/map-viewer"
                  className="p-2 bg-[#0B2545]/90 hover:bg-[#13315C] backdrop-blur-md border border-white/15 rounded-xl text-white hover:text-[#FFC20E] shadow-md transition-colors"
                  title="Center and inspect in Map Viewer"
                >
                  <Crosshair size={16} weight="bold" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: 8 Themes in 4x2 Compact Cards Grid (~50% width) */}
          <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-4 gap-3.5 items-stretch">
            {themes.map((theme) => {
              const IconComp = theme.icon;
              return (
                <Link
                  key={theme.id}
                  to={`/catalogue?theme=${encodeURIComponent(theme.name)}`}
                  className="bg-white rounded-xl border border-[#E3E8EF] hover:border-[#1F5FAD] shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group cursor-pointer overflow-hidden"
                >
                  {/* Top Image: Full-width, flush to card top and sides with outer corner clipping */}
                  <div className="w-full aspect-[4/3] bg-slate-100 overflow-hidden relative shrink-0">
                    <img
                      src={theme.image}
                      alt={theme.name}
                      className="w-full h-full object-cover block transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  {/* Clean Text & Content Area with Consistent Padding */}
                  <div className="p-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-1.5">
                      <div className={`w-6 h-6 rounded-md ${theme.bg} flex items-center justify-center shrink-0`}>
                        <IconComp size={14} weight="bold" />
                      </div>

                      <h3 className="text-xs sm:text-sm font-bold text-[#0B2545] group-hover:text-[#1F5FAD] transition-colors leading-tight line-clamp-1">
                        {theme.name}
                      </h3>
                    </div>

                    {/* Footer: Dataset Count & Arrow Indicator */}
                    <div className="pt-2 mt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-[#5B6B7F]">
                      <span className="font-medium text-[10px] sm:text-[11px]">{theme.count}</span>
                      <ArrowRight
                        size={12}
                        weight="bold"
                        className="text-slate-400 group-hover:text-[#1F5FAD] group-hover:translate-x-0.5 transition-all shrink-0"
                      />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

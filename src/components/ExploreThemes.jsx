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
import CatalogueMap from './catalogue/CatalogueMap';

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
          {/* Left Column: Real Interactive Abu Dhabi Geographic Map Preview (~50% width) */}
          <div className="lg:col-span-6 relative rounded-2xl overflow-hidden border border-[#E3E8EF] shadow-md bg-[#0A1628] min-h-[380px] sm:min-h-[440px] lg:min-h-[480px] flex flex-col justify-between group">
            <CatalogueMap
              showThemeDock={false}
              compact={true}
              initialBasemap="satellite"
              initialZoom={11}
              showCoordinateBar={true}
            />
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

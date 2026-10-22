import React from 'react';
import { Link } from 'react-router-dom';
import {
  Stack,
  Sparkle,
  Storefront,
  GraduationCap,
  Cube,
  Leaf,
  ArrowRight
} from '@phosphor-icons/react';
import Container from './Container';

const capabilities = [
  {
    id: 'clearinghouse',
    title: 'Clearinghouse & Portal',
    desc: 'Discover authoritative spatial data with rich metadata and trusted sources.',
    icon: Stack,
    image: '/assets/card_clearinghouse_aerial.jpg',
    link: '/capabilities/clearinghouse'
  },
  {
    id: 'geoai',
    title: 'GeoAI & Spatial Intelligence',
    desc: 'Turn location data into insight with AI-powered analytics.',
    icon: Sparkle,
    image: '/assets/geoai_after.jpg',
    link: '/capabilities/geoai'
  },
  {
    id: 'marketplace',
    title: 'Marketplace & Data Sharing',
    desc: 'Access and share curated datasets, services and applications.',
    icon: Storefront,
    image: '/assets/clearinghouse_cartography.jpg',
    link: '/capabilities/marketplace'
  },
  {
    id: 'capacity-building',
    title: 'Capacity Building & GeoMaturity',
    desc: 'Develop skills and grow geospatial capability across teams.',
    icon: GraduationCap,
    image: '/assets/capacity_building_gis.jpg',
    link: '/capabilities/capacity-building'
  },
  {
    id: 'digital-twin',
    title: 'Digital Twin & 3D Visualisation',
    desc: 'Interact with 3D models and real-world scenarios.',
    icon: Cube,
    image: '/assets/digital_twin_waterfront.jpg',
    link: '/capabilities/digital-twin'
  },
  {
    id: 'open-data',
    title: 'Open Data & Public Engagement',
    desc: 'Make trusted data easier to access and reuse.',
    icon: Leaf,
    image: '/assets/card_mangroves_aerial.jpg',
    link: '/capabilities/open-data'
  }
];

export default function CoreCapabilityModules() {
  return (
    <section className="py-12 sm:py-16 bg-white border-t border-[#E3E8EF]" aria-label="Core Capability Modules">
      <Container wide>
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div className="max-w-2xl space-y-1.5 text-left">
            <div className="flex items-center gap-2">
              <span className="w-5 h-0.5 bg-[#FFC20E] rounded-full inline-block" />
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#D97706]">
                Our Capabilities
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B2545] tracking-tight">
              Six Core Capability Modules
            </h2>
            <p className="text-xs sm:text-sm text-[#5B6B7F] font-normal leading-relaxed">
              Integrated capabilities to help you discover, analyse, govern and share Abu Dhabi's geospatial data and services.
            </p>
          </div>

          <Link
            to="/capabilities"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#1F5FAD] hover:text-[#0B2545] transition-colors shrink-0 group self-start sm:self-auto"
          >
            <span>Explore all capabilities</span>
            <ArrowRight size={15} weight="bold" className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 3 Columns x 2 Rows Compact Horizontal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
          {capabilities.map((mod) => {
            const IconComp = mod.icon;
            return (
              <Link
                key={mod.id}
                to={mod.link}
                className="bg-white rounded-xl border border-[#E3E8EF] hover:border-[#1F5FAD] shadow-xs hover:shadow-md transition-all duration-200 grid grid-cols-[38%_minmax(0,1fr)] overflow-hidden group cursor-pointer"
              >
                {/* Left Column: Full-bleed image occupying 38% width and 100% height */}
                <div className="w-full h-full min-h-[145px] bg-slate-100 relative overflow-hidden">
                  <img
                    src={mod.image}
                    alt={mod.title}
                    className="w-full h-full min-h-full object-cover block transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                {/* Right Column: Content details with clean padding */}
                <div className="p-3.5 sm:p-4 min-w-0 flex flex-col justify-between">
                  <div className="space-y-1">
                    <div className="w-6 h-6 rounded-md bg-blue-50 text-[#1F5FAD] flex items-center justify-center mb-1 shrink-0">
                      <IconComp size={15} weight="bold" />
                    </div>

                    <h3 className="text-xs sm:text-sm font-bold text-[#0B2545] group-hover:text-[#1F5FAD] transition-colors leading-snug line-clamp-1">
                      {mod.title}
                    </h3>

                    <p className="text-[11px] sm:text-xs text-[#5B6B7F] line-clamp-2 leading-relaxed font-normal">
                      {mod.desc}
                    </p>
                  </div>

                  <div className="inline-flex items-center gap-1 text-[11px] font-bold text-[#1F5FAD] group-hover:text-[#0B2545] pt-1.5">
                    <span>Explore capability</span>
                    <ArrowRight size={12} weight="bold" className="group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

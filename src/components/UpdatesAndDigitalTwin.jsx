import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Cube } from '@phosphor-icons/react';
import Container from './Container';

const updates = [
  {
    id: 'upd-01',
    badge: 'DATASET',
    badgeBg: 'bg-blue-50 text-[#1F5FAD] border border-blue-200',
    date: '12 Oct 2024',
    title: 'New Coastal Habitat & Mangrove Layer 2026',
    desc: 'High-resolution coastal imagery and mangrove extent derived from Sentinel-2 and LIDAR surveys across Abu Dhabi EAD.',
    image: '/assets/theme_environment.jpg',
    link: '/catalogue?theme=Environment'
  },
  {
    id: 'upd-02',
    badge: 'ANNOUNCEMENT',
    badgeBg: 'bg-purple-50 text-[#7B4FD6] border border-purple-200',
    date: '08 Oct 2024',
    title: 'GeoAI Studio v3.2 Deployment',
    desc: 'Upgraded automated change detection models with higher accuracy for construction and environmental monitoring.',
    image: '/assets/geoai_after.jpg',
    link: '/geoai-studio'
  },
  {
    id: 'upd-03',
    badge: 'EVENT',
    badgeBg: 'bg-amber-50 text-amber-700 border border-amber-200',
    date: '05 Oct 2024',
    title: 'AD-SDI Geospatial Developer Forum 2026',
    desc: 'Annual technical symposium for government engineers and partner integrators on OGC APIs, Webhooks and 3D Tiles.',
    image: '/assets/card_clearinghouse_aerial.jpg',
    link: '/developers'
  }
];

export default function UpdatesAndDigitalTwin() {
  return (
    <section className="py-12 sm:py-16 bg-[#F5F7FA] border-t border-[#E3E8EF]" aria-label="Latest Updates and Digital Twin">
      <Container wide>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Latest Updates (~50% width) */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between gap-3 pb-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FFC20E]" />
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#0B2545] tracking-tight">
                  Latest Updates
                </h2>
              </div>
              <Link
                to="/updates"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1F5FAD] hover:text-[#0B2545] transition-colors group"
              >
                <span>View all updates</span>
                <ArrowRight size={13} weight="bold" className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            {/* 3 Horizontal Update Rows */}
            <div className="space-y-3.5">
              {updates.map((item) => (
                <Link
                  key={item.id}
                  to={item.link}
                  className="bg-white rounded-xl p-3 sm:p-3.5 border border-[#E3E8EF] hover:border-[#1F5FAD] shadow-xs hover:shadow-md transition-all flex items-center gap-4 group cursor-pointer"
                >
                  {/* Thumbnail: slightly larger, clean 5px border radius */}
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-[6px] overflow-hidden bg-slate-100 shrink-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover block rounded-[5px] transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  {/* Content details */}
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${item.badgeBg}`}>
                        {item.badge}
                      </span>
                      <span className="text-[11px] text-slate-400 font-medium">
                        {item.date}
                      </span>
                    </div>

                    <h3 className="text-xs sm:text-sm font-bold text-[#0B2545] group-hover:text-[#1F5FAD] transition-colors leading-snug line-clamp-1">
                      {item.title}
                    </h3>

                    <p className="text-[11px] text-[#5B6B7F] line-clamp-2 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  {/* Arrow Indicator */}
                  <div className="p-2 text-slate-300 group-hover:text-[#1F5FAD] group-hover:translate-x-1 transition-all shrink-0">
                    <ArrowRight size={16} weight="bold" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Right Column: Digital Twin Feature Card (~50% width) */}
          <div className="lg:col-span-6 relative rounded-2xl overflow-hidden border border-[#13315C] shadow-lg bg-[#0B2545] min-h-[360px] flex flex-col justify-between p-6 sm:p-8 text-white group">
            {/* Background 3D City Visual */}
            <div className="absolute inset-0 pointer-events-none">
              <img
                src="/assets/digital_twin_waterfront.jpg"
                alt="Abu Dhabi 3D digital twin skyline waterfront"
                className="w-full h-full object-cover scale-105 opacity-80 transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0B2545]/95 via-[#0B2545]/80 to-[#0B2545]/40" />
            </div>

            {/* Top Badge */}
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-[#13315C]/80 border border-white/15 px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-xs shadow-xs mb-4">
                <Cube size={15} weight="fill" className="text-[#2BA6DE]" />
                <span className="text-slate-200 uppercase tracking-wider text-[10px] font-bold">
                  Digital Twin
                </span>
              </div>

              {/* Title & Copy */}
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug mb-3">
                Explore Abu Dhabi in 3D
              </h3>

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-md font-normal">
                Experience the Emirate with high-fidelity digital twins — 3D building models, underground utilities, environmental monitoring and real-time IoT data.
              </p>
            </div>

            {/* Bottom: Action CTA and Pagination Dots */}
            <div className="relative z-10 pt-6 flex items-center justify-between gap-4">
              <Link
                to="/digital-twin"
                className="inline-flex items-center gap-2 bg-[#FFC20E] hover:bg-[#FFCD2E] text-[#0B2545] px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-md transition-all hover:scale-[1.02] cursor-pointer"
              >
                <span>Open Digital Twin</span>
                <ArrowRight size={14} weight="bold" />
              </Link>

              {/* Indicator dots */}
              <div className="flex items-center gap-1.5 text-white/50 text-xs">
                <span className="w-2 h-2 rounded-full bg-white shadow-xs" />
                <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

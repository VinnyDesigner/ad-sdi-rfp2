import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Bell,
  Calendar,
  ArrowRight,
  Sparkle,
  Database,
  ArrowUpRight,
  Newspaper,
  Tag
} from '@phosphor-icons/react';
import { latestUpdates } from '../data/portalData';

export default function UpdatesPage() {
  const [filter, setFilter] = useState('ALL');

  const filtered =
    filter === 'ALL'
      ? latestUpdates
      : latestUpdates.filter((u) => u.category.toUpperCase() === filter);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-[#E3E8EF] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1F5FAD]" />
            <span className="text-xs font-bold text-[#1F5FAD] uppercase tracking-wider">
              News & Releases · AD-SDI Dispatch
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B2545] tracking-tight">
            Platform Updates, Releases & Events
          </h1>
          <p className="text-xs sm:text-sm text-[#5B6B7F] mt-1">
            Stay informed with the latest spatial dataset releases, GeoAI studio model deployments, and municipal developer workshops.
          </p>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto text-xs">
          {['ALL', 'DATASET', 'ANNOUNCEMENT', 'EVENT'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3.5 py-1.5 rounded-xl font-semibold transition-colors shrink-0 ${
                filter === cat
                  ? 'bg-[#0B2545] text-white'
                  : 'bg-white hover:bg-slate-100 text-[#5B6B7F] border border-[#E3E8EF]'
              }`}
            >
              {cat === 'ALL' ? 'All Updates' : cat.charAt(0) + cat.slice(1).toLowerCase() + 's'}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Updates */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-[#E3E8EF] shadow-xs hover:border-[#1F5FAD]/40 overflow-hidden transition-all flex flex-col justify-between"
          >
            <div>
              <div className="h-44 overflow-hidden relative bg-slate-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <span
                  className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full text-white shadow-xs"
                  style={{ backgroundColor: item.categoryColor || '#1F5FAD' }}
                >
                  {item.category}
                </span>
              </div>

              <div className="p-5 space-y-2.5">
                <div className="flex items-center gap-2 text-[11px] text-[#5B6B7F]">
                  <Calendar size={13} />
                  <span>{item.date}</span>
                  <span>•</span>
                  <span className="truncate">{item.entity}</span>
                </div>

                <h3 className="text-base font-bold text-[#0B2545] leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs text-[#5B6B7F] leading-relaxed line-clamp-3">
                  {item.desc}
                </p>
              </div>
            </div>

            <div className="p-5 pt-0">
              <Link
                to={`/updates/${item.id}`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1F5FAD] hover:underline"
              >
                Read Announcement <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

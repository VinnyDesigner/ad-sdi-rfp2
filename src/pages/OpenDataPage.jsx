import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  DownloadSimple,
  Globe,
  CheckCircle,
  FileCode,
  MagnifyingGlass,
  ArrowRight,
  ShieldCheck,
  Sparkle,
  ShareNetwork,
  Tag
} from '@phosphor-icons/react';
import { useApp } from '../context/AppContext';
import { DATASETS } from '../data/datasetsData';

export default function OpenDataPage() {
  const { addToast } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('All');

  const openDatasets = DATASETS.filter(
    (d) =>
      d.classification.toLowerCase().includes('open') ||
      d.audience.includes('Open')
  );

  const triggerDownload = (title, format) => {
    addToast(`Initiated download: ${title} (${format})`, 'success');
  };

  const themes = ['All', 'Environment', 'Boundaries', 'Population', 'Transport', 'Land & Cadastre'];

  const filtered = openDatasets.filter((d) => {
    if (selectedTheme !== 'All' && d.theme !== selectedTheme) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        d.title.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q) ||
        d.entity.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-[#E3E8EF] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#5DAA3A]" />
            <span className="text-xs font-bold text-[#5DAA3A] uppercase tracking-wider">
              Module F · Open Geospatial Data Portal (S13)
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B2545] tracking-tight">
            Abu Dhabi Open Geospatial Data Portal
          </h1>
          <p className="text-xs sm:text-sm text-[#5B6B7F] mt-1">
            Free, unencumbered public access to authoritative government geospatial assets for researchers, civic tech developers, and citizens.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-64">
            <MagnifyingGlass size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search public datasets..."
              className="w-full h-9 pl-9 pr-3 rounded-xl border border-[#E3E8EF] text-xs text-[#14213D] outline-none focus:border-[#5DAA3A]"
            />
          </div>
        </div>
      </div>

      {/* Sovereign Open Data License Banner */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
            <Globe size={22} weight="fill" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-emerald-900">
              Abu Dhabi Open Government Geospatial License
            </h3>
            <p className="text-xs text-emerald-800 leading-relaxed max-w-3xl">
              All datasets marked as Open Data are released under the sovereign Abu Dhabi Open Government License. You are free to copy, modify, integrate into commercial software, and redistribute with standard attribution.
            </p>
          </div>
        </div>
        <span className="font-mono text-xs font-bold text-emerald-800 bg-white px-3 py-1 rounded-full border border-emerald-200 shrink-0 self-start sm:self-auto">
          CC-BY-4.0 Compatible
        </span>
      </div>

      {/* Theme Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {themes.map((t) => (
          <button
            key={t}
            onClick={() => setSelectedTheme(t)}
            className={`px-3.5 py-1.5 rounded-xl font-semibold transition-colors shrink-0 ${
              selectedTheme === t
                ? 'bg-[#5DAA3A] text-white'
                : 'bg-white hover:bg-slate-100 text-[#5B6B7F] border border-[#E3E8EF]'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Datasets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((ds) => (
          <div
            key={ds.id}
            className="bg-white rounded-2xl p-5 border border-[#E3E8EF] shadow-xs hover:border-[#5DAA3A]/50 transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-[#5DAA3A] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {ds.theme}
                </span>
                <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  Open Licence
                </span>
              </div>

              <Link
                to={`/open-data/${ds.slug}`}
                className="text-base font-bold text-[#0B2545] hover:text-[#1F5FAD] transition-colors line-clamp-2"
              >
                {ds.title}
              </Link>

              <div className="text-xs text-[#5B6B7F]">
                Custodian: <strong className="text-[#0B2545]">{ds.entityShort || ds.entity}</strong>
              </div>

              <p className="text-xs text-[#5B6B7F] line-clamp-3 leading-relaxed">
                {ds.description}
              </p>
            </div>

            {/* Direct Download strip */}
            <div className="pt-3 border-t border-slate-100 space-y-2">
              <div className="flex items-center justify-between text-[11px] text-[#5B6B7F]">
                <span>Instant Download:</span>
                <Link
                  to={`/open-data/${ds.slug}`}
                  className="text-xs font-semibold text-[#1F5FAD] hover:underline flex items-center gap-0.5"
                >
                  Detail View <ArrowRight size={11} />
                </Link>
              </div>

              <div className="flex items-center gap-1.5 flex-wrap">
                {['GeoJSON', 'Shapefile', 'KML', 'CSV'].map((fmt) => (
                  <button
                    key={fmt}
                    onClick={() => triggerDownload(ds.title, fmt)}
                    className="flex-1 min-w-[60px] py-1.5 rounded-lg bg-slate-50 hover:bg-[#5DAA3A] hover:text-white border border-slate-200 text-[#0B2545] text-[11px] font-semibold flex items-center justify-center gap-1 transition-colors"
                  >
                    <DownloadSimple size={12} />
                    {fmt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Innovation GeoHack banner */}
      <div className="bg-[#0B2545] text-white rounded-2xl p-6 lg:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-md">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <Sparkle size={18} className="text-[#FFC20E]" weight="fill" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#FFC20E]">
              Civic Technology & Innovation
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            Abu Dhabi Sovereign GeoHack 2027
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Build urban mobility, climate resilience, and public safety applications utilizing verified open data APIs. Grants up to AED 250,000 for top civic prototypes.
          </p>
        </div>

        <button
          onClick={() => addToast('GeoHack 2027 developer package downloaded', 'success')}
          className="px-5 py-3 rounded-xl bg-[#5DAA3A] hover:bg-[#4d8f30] text-white text-xs font-bold transition-colors shrink-0 shadow flex items-center gap-2"
        >
          Download Hacker Kit <DownloadSimple size={14} weight="bold" />
        </button>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import {
  GraduationCap,
  TrendUp,
  Certificate,
  UsersThree,
  CheckCircle,
  CaretRight,
  BookBookmark,
  ChartPolar,
  Briefcase
} from '@phosphor-icons/react';
import { useApp } from '../context/AppContext';

export default function GeoMaturityPage() {
  const { addToast } = useApp();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedEntity, setSelectedEntity] = useState('All');

  const kpis = [
    { label: 'Entities Assessed', value: '64 / 64', sub: '100% baseline participation' },
    { label: 'Average GeoMaturity', value: '2.9 / 5', sub: 'Baseline 2026: 2.3 (+0.6 gain)', highlight: true },
    { label: 'Learners Trained', value: '1,842', sub: 'Across 64 government custodians' },
    { label: 'Pathway Completions', value: '412', sub: 'Certified spatial professionals' },
    { label: 'Internal Certified Trainers', value: '38', sub: 'Accredited DGE multipliers' }
  ];

  const pathways = [
    { name: 'Executives & Decision-Makers', enrolments: 142, completion: 88, icon: Briefcase },
    { name: 'Data Stewards & Custodians', enrolments: 284, completion: 74, icon: BookBookmark },
    { name: 'GIS Specialists & Analysts', enrolments: 512, completion: 82, icon: ChartPolar },
    { name: 'Platform Administrators', enrolments: 96, completion: 90, icon: Certificate },
    { name: 'Developers & API Integrators', enrolments: 320, completion: 68, icon: GraduationCap },
    { name: 'GeoAI & Data Science Cohort', enrolments: 210, completion: 65, icon: TrendUp },
    { name: 'Twin, Marketplace & Open Data', enrolments: 194, completion: 72, icon: UsersThree },
    { name: 'Train-the-Trainer Multiplier', enrolments: 84, completion: 94, isGold: true, icon: Certificate }
  ];

  const sectors = [
    { sector: 'Infrastructure & Municipal', current: 3.4, baseline: 2.6 },
    { sector: 'Environment & Climate', current: 3.2, baseline: 2.4 },
    { sector: 'Safety & Security', current: 3.0, baseline: 2.3 },
    { sector: 'Health & Human Services', current: 2.8, baseline: 2.2 },
    { sector: 'Education & Knowledge', current: 2.7, baseline: 2.1 },
    { sector: 'Economic Development', current: 2.6, baseline: 2.0 }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header (Brief S12) */}
      <div className="bg-white rounded-2xl p-6 border border-[#E3E8EF] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E07B24]" />
            <span className="text-xs font-bold text-[#E07B24] uppercase tracking-wider">
              Module D · Capacity Building & GeoMaturity
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B2545] tracking-tight">
            GeoMaturity & Training
          </h1>
          <p className="text-xs sm:text-sm text-[#5B6B7F] mt-1">
            Capability uplift across government, measured against the 2026 baseline across Governance, Data, Technology, People and Use.
          </p>
        </div>

        {/* Filter */}
        <select
          value={selectedEntity}
          onChange={(e) => setSelectedEntity(e.target.value)}
          className="h-10 px-3.5 rounded-xl border border-[#E3E8EF] bg-white text-xs font-semibold text-[#14213D] outline-none shadow-xs"
        >
          <option value="All">All 64 Entities</option>
          <option value="Municipal">Municipalities & Transport (DMT)</option>
          <option value="Environment">Environment Agency (EAD)</option>
        </select>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-[#E3E8EF] px-2 text-xs sm:text-sm font-semibold">
        <button
          onClick={() => setActiveTab('overview')}
          className={`py-3 relative ${activeTab === 'overview' ? 'text-[#0B2545]' : 'text-[#5B6B7F] hover:text-[#0B2545]'}`}
        >
          <span>Overview</span>
          {activeTab === 'overview' && (
            <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#E07B24] rounded-full" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('pathways')}
          className={`py-3 relative ${activeTab === 'pathways' ? 'text-[#0B2545]' : 'text-[#5B6B7F] hover:text-[#0B2545]'}`}
        >
          <span>Pathways (8 Tracks)</span>
        </button>
        <button
          onClick={() => setActiveTab('sessions')}
          className={`py-3 relative ${activeTab === 'sessions' ? 'text-[#0B2545]' : 'text-[#5B6B7F] hover:text-[#0B2545]'}`}
        >
          <span>Workshops & Sessions</span>
        </button>
        <button
          onClick={() => setActiveTab('certifications')}
          className={`py-3 relative ${activeTab === 'certifications' ? 'text-[#0B2545]' : 'text-[#5B6B7F] hover:text-[#0B2545]'}`}
        >
          <span>Certifications</span>
        </button>
      </div>

      {/* KPI Row (5 cards per brief S12) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {kpis.map((k) => (
          <div key={k.label} className="bg-white rounded-2xl p-5 border border-[#E3E8EF] shadow-xs flex flex-col justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#5B6B7F]">
              {k.label}
            </span>
            <div className={`text-2xl lg:text-3xl font-extrabold font-mono tracking-tight my-2 ${
              k.highlight ? 'text-[#E07B24]' : 'text-[#0B2545]'
            }`}>
              {k.value}
            </div>
            <div className="text-[11px] text-[#5B6B7F] border-t border-slate-100 pt-2 truncate">
              {k.sub}
            </div>
          </div>
        ))}
      </div>

      {/* Row 2 (280px): Radar 5-axes (5 cols) + Score by Sector (7 cols) per brief S12 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Radar Chart 5 Axes */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-[#E3E8EF] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-[#0B2545]">
                5-Axis GeoMaturity Radar
              </h2>
              <p className="text-xs text-[#5B6B7F]">Capability uplift from 2026 to 2027</p>
            </div>
            <div className="text-[11px] flex items-center gap-3">
              <span className="flex items-center gap-1 text-slate-400">
                <span className="w-2.5 h-0.5 border-t border-dashed border-slate-400" /> 2026 Baseline
              </span>
              <span className="flex items-center gap-1 text-[#E07B24] font-bold">
                <span className="w-2.5 h-2 rounded bg-[#E07B24]/40 border border-[#E07B24]" /> 2027 Current
              </span>
            </div>
          </div>

          {/* SVG Radar Visualization */}
          <div className="h-56 relative flex items-center justify-center">
            <svg className="w-64 h-56" viewBox="0 0 300 260">
              {/* Concentric pentagons */}
              {[40, 80, 110].map((r, i) => (
                <polygon
                  key={i}
                  points="150,20 255,95 215,220 85,220 45,95"
                  fill="none"
                  stroke="#E3E8EF"
                  strokeWidth="1"
                  transform={`scale(${r/110}) translate(${150*(110/r - 1)}, ${130*(110/r - 1)})`}
                />
              ))}

              {/* 2026 Baseline (Dashed grey) */}
              <polygon
                points="150,75 210,115 190,185 110,185 90,115"
                fill="none"
                stroke="#94A3B8"
                strokeWidth="1.5"
                strokeDasharray="4,4"
              />

              {/* 2027 Current (Filled #E07B24 at 20%) */}
              <polygon
                points="150,35 240,105 205,210 95,210 60,105"
                fill="rgba(224, 123, 36, 0.22)"
                stroke="#E07B24"
                strokeWidth="2.5"
              />

              {/* Axis Labels */}
              <text x="150" y="14" textAnchor="middle" className="text-[10px] font-bold fill-[#0B2545]">Governance (3.2)</text>
              <text x="260" y="98" textAnchor="start" className="text-[10px] font-bold fill-[#0B2545]">Data (2.8)</text>
              <text x="220" y="238" textAnchor="middle" className="text-[10px] font-bold fill-[#0B2545]">Technology (3.4)</text>
              <text x="80" y="238" textAnchor="middle" className="text-[10px] font-bold fill-[#0B2545]">People (2.6)</text>
              <text x="40" y="98" textAnchor="end" className="text-[10px] font-bold fill-[#0B2545]">Use (2.5)</text>
            </svg>

            {/* Radar Tooltip per brief S12: Data · 2.1 → 2.8 */}
            <div className="absolute top-16 right-4 bg-[#0B2545] text-white p-2 rounded-lg text-[10px] shadow-lg pointer-events-none">
              <span className="font-bold text-[#FFC20E]">Data Dimension:</span> 2.1 → 2.8 (+33% gain)
            </div>
          </div>
        </div>

        {/* Right: Horizontal Bar Chart Score by Sector */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-[#E3E8EF] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-[#0B2545]">
                GeoMaturity Score by Sector (Scale 1–5)
              </h2>
              <p className="text-xs text-[#5B6B7F]">Comparison against 2026 baseline benchmarks</p>
            </div>
            <span className="text-xs font-mono text-[#E07B24] font-bold">Max Target: 4.0</span>
          </div>

          <div className="space-y-3 pt-2">
            {sectors.map((s) => (
              <div key={s.sector} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-[#14213D]">{s.sector}</span>
                  <div className="flex items-center gap-2 font-mono">
                    <span className="text-slate-400 text-[11px]">(Base: {s.baseline})</span>
                    <span className="font-bold text-[#0B2545] text-xs">{s.current} / 5.0</span>
                  </div>
                </div>
                <div className="h-3 rounded-full bg-slate-100 relative overflow-hidden">
                  {/* Baseline tick */}
                  <div
                    className="absolute top-0 bottom-0 w-[2px] bg-slate-400 z-10"
                    style={{ left: `${(s.baseline / 5) * 100}%` }}
                    title={`Baseline ${s.baseline}`}
                  />
                  {/* Current progress */}
                  <div
                    className="h-full rounded-full bg-[#E07B24] transition-all"
                    style={{ width: `${(s.current / 5) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 3 (176px): Learning Pathways (8 cols) + Training Effectiveness (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: 8 Learning Pathways 4x2 grid */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-6 border border-[#E3E8EF] shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#0B2545]">
              8 Accredited Spatial Learning Pathways
            </h2>
            <span className="text-xs text-[#5B6B7F]">1,842 Government Professionals Enrolled</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
            {pathways.map((pw) => {
              const Icon = pw.icon;
              return (
                <div
                  key={pw.name}
                  onClick={() => addToast('Pathway Selected', `Viewing syllabus and modules for ${pw.name}.`, 'info')}
                  className={`p-3 rounded-xl border text-xs cursor-pointer hover:shadow-xs transition-all flex flex-col justify-between ${
                    pw.isGold
                      ? 'border-[#FFC20E] bg-amber-50/40 ring-1 ring-[#FFC20E]'
                      : 'border-[#E3E8EF] bg-[#F9FBFD] hover:bg-white'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 rounded-lg bg-orange-100 text-[#E07B24] flex items-center justify-center shrink-0">
                      <Icon size={16} weight="bold" />
                    </div>
                    <span className="font-bold text-[#14213D] leading-tight line-clamp-2">{pw.name}</span>
                  </div>
                  <div>
                    <div className="flex justify-between text-[10px] text-[#5B6B7F] mb-1">
                      <span>{pw.enrolments} learners</span>
                      <span className="font-bold text-[#E07B24]">{pw.completion}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-slate-200 overflow-hidden">
                      <div className="h-full bg-[#E07B24]" style={{ width: `${pw.completion}%` }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Training Effectiveness 2x2 Stat Tiles */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-[#E3E8EF] shadow-xs space-y-3 flex flex-col justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#0B2545]">
            Training Effectiveness Metrics
          </h2>

          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="p-3 rounded-xl bg-orange-50 border border-orange-100">
              <span className="block text-2xl font-extrabold text-[#E07B24] font-mono">4.6 / 5</span>
              <span className="text-[11px] text-[#5B6B7F] font-semibold">Satisfaction</span>
            </div>
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100">
              <span className="block text-2xl font-extrabold text-emerald-600 font-mono">+28%</span>
              <span className="text-[11px] text-[#5B6B7F] font-semibold">Competence Gain</span>
            </div>
            <div className="p-3 rounded-xl bg-blue-50 border border-blue-100">
              <span className="block text-2xl font-extrabold text-[#1F5FAD] font-mono">71%</span>
              <span className="text-[11px] text-[#5B6B7F] font-semibold">Applied on the Job</span>
            </div>
            <div className="p-3 rounded-xl bg-purple-50 border border-purple-100">
              <span className="block text-2xl font-extrabold text-[#7B4FD6] font-mono">+0.6</span>
              <span className="text-[11px] text-[#5B6B7F] font-semibold">GeoMaturity Uplift</span>
            </div>
          </div>
          <div className="text-[11px] text-[#5B6B7F] text-center pt-2 border-t border-slate-100">
            Assessed post-programme by DGE Spatial Governance Board
          </div>
        </div>
      </div>
    </div>
  );
}

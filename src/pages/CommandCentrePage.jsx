import React, { useState } from 'react';
import {
  Gauge,
  CheckCircle,
  Warning,
  FileArrowDown,
  Clock,
  ShieldCheck,
  TrendUp,
  DiamondsFour,
  CalendarCheck,
  Kanban
} from '@phosphor-icons/react';
import { useApp } from '../context/AppContext';

export default function CommandCentrePage() {
  const { addToast } = useApp();
  const [selectedMilestone, setSelectedMilestone] = useState('M2');

  const kpis = [
    { label: 'Milestone Delivery', value: '92%', sub: '23 / 25 milestones met on time', trend: '+4%' },
    { label: 'Gates Formally Accepted', value: '1 / 4', sub: 'M1 Baseline mobilization signed', trend: 'M1 Passed' },
    { label: 'Deliverables on Track', value: '26 / 28', sub: '2 in remediation (Fix window 10d)', trend: 'Healthy' },
    { label: 'Open Risks Monitored', value: '10', sub: '3 High · 5 Medium · 2 Low', trend: '-2 risks' },
    { label: 'Next Executive Gate', value: 'M2', sub: 'Dec 2027 · Core Deployment', trend: '90 Days' }
  ];

  const roadmapLanes = [
    { id: 'A', name: 'A · Clearinghouse & Portal', color: '#1F5FAD', items: [{ code: 'A01', title: 'Data Dictionary', done: true, w: '24%' }, { code: 'A02', title: '6-Point Quality Gateway', active: true, w: '26%' }, { code: 'A03', title: 'OGC API Cluster', w: '25%' }] },
    { id: 'B', name: 'B · GeoAI Studio', color: '#7B4FD6', items: [{ code: 'B01', title: 'Change Model MR-01', done: true, w: '28%' }, { code: 'B02', title: 'Common Vision Models', active: true, w: '24%' }, { code: 'B03', title: 'Assistant Knowledge Graph', w: '22%' }] },
    { id: 'C', name: 'C · Data Marketplace', color: '#0E9F8E', items: [{ code: 'C01', title: 'Standard DSA Framework', done: true, w: '30%' }, { code: 'C02', title: 'Entitlements Gateway', active: true, w: '25%' }, { code: 'C03', title: 'Catalog Federation', w: '20%' }] },
    { id: 'D', name: 'D · Capacity Building', color: '#E07B24', items: [{ code: 'D01', title: 'GeoMaturity Baseline', done: true, w: '26%' }, { code: 'D02', title: 'Specialist Cohort 1', active: true, w: '28%' }, { code: 'D03', title: 'Train-the-Trainer', w: '22%' }] },
    { id: 'E', name: 'E · Digital Twin 3D', color: '#2BA6DE', items: [{ code: 'E01', title: 'LOD2 Mesh Pilot', done: true, w: '25%' }, { code: 'E02', title: 'Underground Utilities cut', active: true, w: '25%' }, { code: 'E03', title: 'IoT Sensor Mesh', w: '25%' }] },
    { id: 'F', name: 'F · Open Data Portal', color: '#5DAA3A', items: [{ code: 'F01', title: 'Civic Catalog Ingestion', done: true, w: '32%' }, { code: 'F02', title: 'GeoHack 2028 Launch', w: '28%' }] },
    { id: 'P', name: 'Programme PMO & Governance', color: '#7A9CC6', items: [{ code: 'P01', title: 'Steering Committee Mobilisation', done: true, w: '30%' }, { code: 'P02', title: 'Mid-Term Gate M2 Review', active: true, w: '25%' }] }
  ];

  const risks = [
    { id: 'R02', risk: 'Contract start later than baseline schedule', l: 'Low', i: 'Med', owner: 'DGE PMO', status: 'Monitored', color: 'text-slate-300' },
    { id: 'R03', risk: 'Entity data delays or schema quality gaps', l: 'Med', i: 'High', owner: 'DMT / EAD', status: 'Active Mitigation', color: 'text-amber-400' },
    { id: 'R05', risk: 'Marketplace bilateral legal approvals delayed', l: 'Low', i: 'Med', owner: 'DGE Legal', status: 'Resolved', color: 'text-emerald-400' },
    { id: 'R06', risk: 'Security review lead times for sovereign DC', l: 'Med', i: 'High', owner: 'Cyber Security Unit', status: 'Monitored', color: 'text-slate-300' },
    { id: 'R08', risk: 'Twin LOD3 source data photogrammetry gaps', l: 'Med', i: 'Med', owner: 'DMT 3D Division', status: 'Active Mitigation', color: 'text-amber-400' }
  ];

  return (
    <div className="space-y-6 text-white font-sans">
      {/* Page Header (Dark per brief S11) */}
      <div className="bg-[#13233D] rounded-2xl p-6 border border-white/10 shadow-xl space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                <CheckCircle size={14} weight="fill" />
                <span>On Track · Schedule Performance Index (SPI: 1.04)</span>
              </span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white/10 text-slate-300">
                Baseline Schedule v2.1
              </span>
              <span className="text-[11px] text-slate-400 font-mono">
                Updated 14 Sep 2027, 09:30 GST
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              AD-SDI Implementation Programme 2026–2029
            </h1>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => addToast('Gate Pack Downloaded', 'M2 Executive Gate Review dossier exported.', 'success')}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/15 text-white border border-white/10 transition-colors flex items-center gap-2"
            >
              <FileArrowDown size={16} />
              <span>Gate Review Pack</span>
            </button>
            <button
              onClick={() => addToast('Report Generated', 'September 2027 Monthly Progress Dashboard ready.', 'info')}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#FFC20E] text-[#0B2545] hover:bg-[#e5a118] transition-colors font-bold shadow-md"
            >
              Monthly Report
            </button>
          </div>
        </div>

        {/* Chip Row per brief S11 */}
        <div className="flex items-center gap-3 overflow-x-auto text-[11px] text-slate-300 pt-2 border-t border-white/10">
          <span className="text-slate-400 font-semibold uppercase tracking-wider">Governance Rhythm:</span>
          <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10">Steering Committee · Monthly</span>
          <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10">PMO Operations · Weekly</span>
          <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10">Entity Working Groups · Bi-weekly</span>
          <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10">Design Authority · Fortnightly</span>
        </div>
      </div>

      {/* KPI Row (5 cards per brief S11) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {kpis.map((k) => (
          <div key={k.label} className="bg-[#13233D] rounded-2xl p-5 border border-white/10 shadow-lg flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                {k.label}
              </span>
              <div className="text-2xl lg:text-3xl font-extrabold text-white font-mono tracking-tight mt-1">
                {k.value}
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px]">
              <span className="text-slate-400 truncate">{k.sub}</span>
              <span className="text-[#FFC20E] font-bold font-mono shrink-0">{k.trend}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Roadmap Card (Full width 260px per brief S11) */}
      <div className="bg-[#13233D] rounded-2xl p-6 border border-white/10 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">
              7-Lane Master Programme Roadmap (2026–2029)
            </h2>
            <p className="text-xs text-slate-400">Integrated schedule across all six capability modules & PMO governance</p>
          </div>

          {/* Time axis legend */}
          <div className="flex items-center gap-4 text-xs font-mono text-slate-300">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-emerald-400 rounded-sm" /> M1 Completed
            </span>
            <span className="flex items-center gap-1.5 text-[#FFC20E] font-bold">
              <span className="w-2.5 h-2.5 border border-[#FFC20E] rotate-45" /> M2 Core Deployed (Dec 2027)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#FFC20E]" /> Today (Sep 2027)
            </span>
          </div>
        </div>

        {/* Phase Bands & Timeline Canvas */}
        <div className="relative bg-[#0A1628] rounded-xl p-4 border border-white/5 space-y-3 overflow-x-auto">
          {/* Phase Headers */}
          <div className="grid grid-cols-4 text-center text-[11px] font-bold text-slate-400 pb-2 border-b border-white/10 min-w-[700px]">
            <div>Phase 1: Mobilisation & Architecture</div>
            <div className="text-emerald-400">Phase 2: Core Platform Deployment</div>
            <div className="text-[#FFC20E]">Phase 3: Multi-Entity Rollout</div>
            <div>Phase 4: Full Maturity & Optimization</div>
          </div>

          {/* Vertical 'Today' Line at Sep 2027 per brief S11 */}
          <div className="absolute top-10 bottom-4 left-[38%] w-[2px] bg-[#FFC20E] z-20 pointer-events-none shadow-lg">
            <div className="absolute -top-4 -left-7 text-[9px] font-bold bg-[#FFC20E] text-[#0B2545] px-1.5 py-0.5 rounded shadow">
              Today · Sep 2027
            </div>
          </div>

          {/* 7 Lanes per brief S11 */}
          <div className="space-y-2 min-w-[700px]">
            {roadmapLanes.map((lane) => (
              <div key={lane.id} className="flex items-center gap-3">
                <span className="w-36 text-xs font-semibold text-slate-300 truncate text-right shrink-0">
                  {lane.name}
                </span>
                <div className="flex-1 h-8 bg-white/5 rounded-lg flex items-center gap-1.5 px-2 relative overflow-hidden">
                  {lane.items.map((it) => (
                    <div
                      key={it.code}
                      style={{ width: it.w }}
                      className={`h-6 rounded-md px-2 flex items-center justify-between text-[11px] font-semibold truncate ${
                        it.done
                          ? 'bg-emerald-600/80 text-white'
                          : it.active
                          ? 'bg-[#1F5FAD] text-white ring-1 ring-[#FFC20E]'
                          : 'bg-white/10 text-slate-400'
                      }`}
                    >
                      <span className="font-mono text-[10px] opacity-80">{it.code}</span>
                      <span className="truncate ml-1">{it.title}</span>
                      {it.done && <span className="ml-1 text-[10px]">✓</span>}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Milestone diamonds row */}
          <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs font-mono text-slate-400 min-w-[700px]">
            <div className="flex items-center gap-1 text-emerald-400 font-bold">
              <span className="w-3 h-3 bg-emerald-500 rotate-45 inline-block mr-1" />
              M1: Architecture Baseline (Passed)
            </div>
            <div className="flex items-center gap-1 text-[#FFC20E] font-bold">
              <span className="w-3 h-3 border-2 border-[#FFC20E] rotate-45 inline-block mr-1" />
              M2: Core Engines Deployed (Dec 2027)
            </div>
            <div className="flex items-center gap-1 text-slate-500">
              <span className="w-3 h-3 border border-slate-500 rotate-45 inline-block mr-1" />
              M3: 64 Entities Active (Oct 2028)
            </div>
            <div className="flex items-center gap-1 text-slate-500">
              <span className="w-3 h-3 border border-slate-500 rotate-45 inline-block mr-1" />
              M4: Final Program Sign-off (Jun 2029)
            </div>
          </div>
        </div>
      </div>

      {/* Row 3: Module Health (4 cols), Top Risks Table (5 cols), Deliverable Acceptance (3 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Module Health (4 cols) */}
        <div className="lg:col-span-4 bg-[#13233D] rounded-2xl p-5 border border-white/10 shadow-lg space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <h2 className="text-xs font-bold uppercase tracking-wider text-white">Module RAG Health</h2>
            <span className="text-[11px] text-emerald-400 font-bold">5 Green · 1 Amber</span>
          </div>

          <div className="space-y-2 text-xs">
            {[
              { code: 'A', name: 'Clearinghouse & Portal', status: 'Green', rag: 'bg-emerald-400', deliverable: 'A02 6-Point Quality Gateway', due: 'Oct 2027' },
              { code: 'B', name: 'GeoAI & Spatial Intelligence', status: 'Green', rag: 'bg-emerald-400', deliverable: 'B02 Common Vision Models', due: 'Dec 2027' },
              { code: 'C', name: 'Marketplace & Data Sharing', status: 'Green', rag: 'bg-emerald-400', deliverable: 'C02 Entitlements Portal', due: 'Nov 2027' },
              { code: 'D', name: 'Capacity Building & Maturity', status: 'Amber', rag: 'bg-amber-400', deliverable: 'D02 Cohort 2 Enrolments', due: 'Nov 2027' },
              { code: 'E', name: 'Digital Twin & 3D Massing', status: 'Green', rag: 'bg-emerald-400', deliverable: 'E02 Subsurface Conduits', due: 'Dec 2027' },
              { code: 'F', name: 'Open Data & Public Hub', status: 'Green', rag: 'bg-emerald-400', deliverable: 'F01 Civic Ingestion Hub', due: 'Oct 2027' }
            ].map((mod) => (
              <div key={mod.code} className="p-2.5 rounded-xl bg-white/5 border border-white/5 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white truncate">{mod.name}</span>
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-300">
                    <span className={`w-2 h-2 rounded-full ${mod.rag}`} /> {mod.status}
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 flex items-center justify-between">
                  <span>Current: {mod.deliverable}</span>
                  <span className="font-mono text-[#FFC20E]">{mod.due}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Risks Table (5 cols per brief S11) */}
        <div className="lg:col-span-5 bg-[#13233D] rounded-2xl p-5 border border-white/10 shadow-lg space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <h2 className="text-xs font-bold uppercase tracking-wider text-white">Top Programme Risks</h2>
            <span className="text-xs font-mono text-slate-400">Risk Matrix: L × I</span>
          </div>

          <div className="space-y-2 text-xs">
            {risks.map((r) => (
              <div key={r.id} className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-[#FFC20E]">{r.id}</span>
                    <span className="text-[10px] text-slate-400">{r.owner}</span>
                  </div>
                  <div className="text-xs text-slate-200 mt-0.5 line-clamp-1">{r.risk}</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-[10px] font-mono text-slate-400">L:{r.l} · I:{r.i}</div>
                  <span className={`text-[10px] font-bold ${r.color}`}>{r.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Deliverable Acceptance & Design Conformance (3 cols per brief S11) */}
        <div className="lg:col-span-3 space-y-4">
          {/* Deliverable Acceptance Card */}
          <div className="bg-[#13233D] rounded-2xl p-5 border border-white/10 shadow-lg space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-white">
              Deliverable Acceptance
            </h2>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Accepted Formally</span>
                <span className="font-mono font-bold text-emerald-400">38</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>In Review Gate</span>
                <span className="font-mono font-bold text-[#FFC20E]">9</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Conditional Sign-off</span>
                <span className="font-mono font-bold text-blue-400">4</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Remediation Required</span>
                <span className="font-mono font-bold text-rose-400">1</span>
              </div>
            </div>
            {/* Stacked bar */}
            <div className="h-2 rounded-full overflow-hidden flex bg-white/10">
              <div className="bg-emerald-500 w-[73%]" />
              <div className="bg-[#FFC20E] w-[17%]" />
              <div className="bg-blue-400 w-[8%]" />
              <div className="bg-rose-500 w-[2%]" />
            </div>
            <div className="text-[10px] text-slate-400 italic">
              Fix window: 10 business days per SLA contract.
            </div>
          </div>

          {/* Design Conformance Card */}
          <div className="bg-[#13233D] rounded-2xl p-5 border border-white/10 shadow-lg space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-white">
              Design Conformance
            </h2>
            <div className="text-xs text-slate-300">
              <span className="text-lg font-extrabold text-white font-mono">148 / 148</span>
              <span className="text-[11px] text-slate-400 ml-1.5">RFP requirements traced</span>
            </div>
            <div className="text-[11px] text-slate-400">
              61 verified in Phase 1 & 2 · 3 minor deviations documented and approved by DGE.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

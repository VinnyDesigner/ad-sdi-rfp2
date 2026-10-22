import React, { useState } from 'react';
import {
  Pulse,
  CheckCircle,
  Warning,
  FileArrowDown,
  TrendUp,
  ShieldCheck,
  Clock,
  ChartLine,
  ChartPieSlice
} from '@phosphor-icons/react';
import { useApp } from '../context/AppContext';

export default function QualitySlaPage() {
  const { addToast } = useApp();
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedEntityFilter, setSelectedEntityFilter] = useState('all');

  const kpis = [
    { label: 'Platform Availability', value: '99.95%', unit: 'uptime SLA', sub: 'Agreed target: 99.9%', trend: '+0.05%' },
    { label: 'Data Currency', value: '94%', unit: 'on schedule', sub: 'Fundamental datasets updated', trend: '+2.1%' },
    { label: 'Data Quality', value: '96%', unit: 'gateway pass', sub: 'Passed 6-point QA automated tests', trend: '+1.4%' },
    { label: 'Support Responsiveness', value: '97%', unit: 'within SLA', sub: 'Incidents resolved < 4h target', trend: '+0.8%' },
    { label: 'Entity Adoption', value: '41 / 64', unit: 'entities', sub: 'Actively publishing or consuming', trend: '+3 entities' }
  ];

  const entityCompliance = [
    { name: 'DMT (Municipalities & Transport)', datasets: 412, currency: 96, quality: 98, openTickets: 2, status: 'On track', statusColor: 'bg-emerald-50 text-emerald-700' },
    { name: 'EAD (Environment Agency)', datasets: 184, currency: 95, quality: 100, openTickets: 0, status: 'On track', statusColor: 'bg-emerald-50 text-emerald-700' },
    { name: 'SCAD (Statistics Centre)', datasets: 86, currency: 92, quality: 96, openTickets: 1, status: 'On track', statusColor: 'bg-emerald-50 text-emerald-700' },
    { name: 'DoH (Department of Health)', datasets: 64, currency: 94, quality: 95, openTickets: 0, status: 'On track', statusColor: 'bg-emerald-50 text-emerald-700' },
    { name: 'ADEK (Education & Knowledge)', datasets: 52, currency: 88, quality: 91, openTickets: 3, status: 'At risk', statusColor: 'bg-amber-50 text-amber-700' },
    { name: 'ADPHC (Public Health Centre)', datasets: 38, currency: 97, quality: 99, openTickets: 0, status: 'On track', statusColor: 'bg-emerald-50 text-emerald-700' }
  ];

  const themes = ['Boundaries', 'Transport', 'Cadastre', 'Buildings 3D', 'Environment', 'Utilities', 'Imagery', 'Population'];
  const checks = ['Schema', 'Geometry', 'Topology', 'Attributes', 'CRS', 'Metadata'];

  const handleExport = () => {
    addToast('Report Exported', 'Quality & SLA Compliance Report generated as official PDF package.', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Page Header (Brief S05) */}
      <div className="bg-white rounded-2xl p-6 border border-[#E3E8EF] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B2545] tracking-tight">
            Quality & SLA Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-[#5B6B7F] mt-1">
            Continuous automated telemetry monitoring availability, data currency, 6-point gateway audits and entity conformance.
          </p>
        </div>

        {/* Header selectors & export button */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="h-9 px-3 rounded-lg border border-[#E3E8EF] bg-white text-xs font-semibold text-[#14213D] outline-none"
          >
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Year to date 2027</option>
          </select>

          <select
            value={selectedEntityFilter}
            onChange={(e) => setSelectedEntityFilter(e.target.value)}
            className="h-9 px-3 rounded-lg border border-[#E3E8EF] bg-white text-xs font-semibold text-[#14213D] outline-none"
          >
            <option value="all">All 64 Entities</option>
            <option value="dmt">DMT Only</option>
            <option value="ead">EAD Only</option>
          </select>

          <button
            onClick={handleExport}
            className="h-9 px-3.5 rounded-lg border border-[#E3E8EF] bg-white hover:bg-slate-50 text-xs font-semibold text-[#0B2545] flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <FileArrowDown size={16} />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* KPI Row (5 cards, equal width per brief S05) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {kpis.map((k) => (
          <div key={k.label} className="bg-white rounded-2xl p-5 border border-[#E3E8EF] shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#5B6B7F]">{k.label}</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
              </div>
              <div className="text-2xl lg:text-3xl font-extrabold text-[#0B2545] font-mono tracking-tight mt-1">
                {k.value}
              </div>
              <div className="text-xs font-semibold text-[#1F5FAD] mt-0.5">{k.unit}</div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-[#5B6B7F]">
              <span className="truncate">{k.sub}</span>
              <span className="text-emerald-600 font-bold shrink-0">{k.trend}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Row 2: Availability Line Chart (8 cols) + Quality Gateway Donut (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Availability Last 90 Days */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-6 border border-[#E3E8EF] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-[#0B2545]">
                Platform Availability (Last 90 Days)
              </h2>
              <p className="text-xs text-[#5B6B7F]">24/7 Sovereign Web Services & GeoAI Cluster Uptime</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-slate-600">
                <span className="w-3 h-0.5 bg-[#1F5FAD]" /> Actual Uptime
              </span>
              <span className="flex items-center gap-1.5 text-slate-400">
                <span className="w-3 h-0.5 border-t border-dashed border-[#FFC20E]" /> Agreed Target (99.9%)
              </span>
            </div>
          </div>

          {/* SVG Line Chart */}
          <div className="h-64 relative bg-[#F9FBFD] rounded-xl p-4 flex items-end justify-between border border-slate-100">
            {/* Dashed Target line */}
            <div className="absolute top-12 left-4 right-4 border-b-2 border-dashed border-[#FFC20E] z-10">
              <span className="absolute -top-3.5 right-0 text-[10px] font-bold text-[#D97706] bg-amber-50 px-1 rounded">
                Target 99.9%
              </span>
            </div>

            {/* Simulated bars/line chart */}
            <svg className="w-full h-full" viewBox="0 0 700 220" preserveAspectRatio="none">
              <defs>
                <linearGradient id="availGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1F5FAD" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#1F5FAD" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <polygon
                points="0,60 70,55 140,58 210,50 280,62 350,110 420,52 490,48 560,50 630,46 700,45 700,220 0,220"
                fill="url(#availGrad)"
              />
              <polyline
                points="0,60 70,55 140,58 210,50 280,62 350,110 420,52 490,48 560,50 630,46 700,45"
                fill="none"
                stroke="#1F5FAD"
                strokeWidth="2.5"
              />
              {/* Annotation Flag: Planned Maintenance 21 Aug per brief S05 */}
              <circle cx="350" cy="110" r="5" fill="#FFC20E" stroke="#0B2545" strokeWidth="2" />
            </svg>

            {/* Annotation tooltip flag */}
            <div className="absolute top-28 left-[45%] bg-[#0B2545] text-white text-[11px] p-2 rounded-lg shadow-lg z-20 pointer-events-none">
              <div className="font-bold text-[#FFC20E]">Planned Maintenance · 21 Aug</div>
              <div className="text-[10px] text-slate-300">Scheduled kernel failover: 99.82%</div>
            </div>
          </div>
          <div className="flex items-center justify-between text-[11px] text-[#5B6B7F] px-2 font-mono">
            <span>01 Jul 2027</span>
            <span>01 Aug 2027</span>
            <span>01 Sep 2027 (Today)</span>
          </div>
        </div>

        {/* Right: Quality Gateway Donut Last 24h */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-[#E3E8EF] shadow-xs flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#0B2545]">
              Quality Gateway (Last 24h)
            </h2>
            <p className="text-xs text-[#5B6B7F]">Automated syntactic, topological & CRS checks</p>

            {/* Donut representation */}
            <div className="my-6 flex items-center justify-center relative">
              <div className="w-36 h-36 rounded-full border-[14px] border-[#1E9E6A] border-t-amber-500 flex flex-col items-center justify-center">
                <span className="text-2xl font-extrabold text-[#0B2545] font-mono">186</span>
                <span className="text-[10px] text-[#5B6B7F] font-bold uppercase">Tests Run</span>
              </div>
            </div>

            <div className="flex items-center justify-around text-xs mb-4">
              <div className="text-center">
                <span className="block font-bold text-emerald-600 text-lg font-mono">171</span>
                <span className="text-[#5B6B7F]">Passed (92%)</span>
              </div>
              <div className="h-6 w-[1px] bg-slate-200" />
              <div className="text-center">
                <span className="block font-bold text-amber-500 text-lg font-mono">15</span>
                <span className="text-[#5B6B7F]">Returned (8%)</span>
              </div>
            </div>
          </div>

          {/* Top 3 reasons with counts per brief S05 */}
          <div className="pt-4 border-t border-slate-100 text-xs space-y-2">
            <span className="text-[11px] font-bold text-[#5B6B7F] uppercase tracking-wider block">
              Top Gateway Exception Reasons
            </span>
            <div className="flex items-center justify-between text-[#14213D]">
              <span>1. Spatial reference mismatch</span>
              <span className="font-bold font-mono text-amber-600">6</span>
            </div>
            <div className="flex items-center justify-between text-[#14213D]">
              <span>2. Metadata incomplete (ISO 19115)</span>
              <span className="font-bold font-mono text-amber-600">5</span>
            </div>
            <div className="flex items-center justify-between text-[#14213D]">
              <span>3. Topology collinear errors</span>
              <span className="font-bold font-mono text-amber-600">4</span>
            </div>
          </div>
        </div>
      </div>

      {/* Row 3: Entity Compliance (7 cols) + Themes × Quality Checks Heatmap (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Entity Compliance Table */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-[#E3E8EF] shadow-xs overflow-hidden">
          <div className="p-4 border-b border-[#E3E8EF] flex items-center justify-between bg-[#F5F7FA]">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#0B2545]">
              Entity Governance Compliance Matrix
            </h2>
            <span className="text-xs text-[#5B6B7F]">Ranked by Data Currency</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#F5F7FA] text-[#5B6B7F] uppercase tracking-wider font-semibold border-b border-[#E3E8EF]">
                <tr>
                  <th className="p-3">Entity</th>
                  <th className="p-3">Datasets</th>
                  <th className="p-3">Currency</th>
                  <th className="p-3">Quality</th>
                  <th className="p-3">Open Tickets</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {entityCompliance.map((ent) => (
                  <tr key={ent.name} className="hover:bg-[#F9FBFD]">
                    <td className="p-3 font-semibold text-[#14213D] max-w-[200px] truncate">{ent.name}</td>
                    <td className="p-3 font-mono">{ent.datasets}</td>
                    <td className="p-3 font-mono font-bold text-emerald-600">{ent.currency}%</td>
                    <td className="p-3 font-mono font-bold text-[#1F5FAD]">{ent.quality}%</td>
                    <td className="p-3 font-mono">{ent.openTickets}</td>
                    <td className="p-3">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${ent.statusColor}`}>
                        {ent.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Heat-map Themes × Quality Checks per brief S05 */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-5 border border-[#E3E8EF] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#0B2545]">
              Themes × Quality Gateways Heatmap
            </h2>
            <span className="text-[10px] text-slate-400 font-mono">100% Passed: Dark Blue</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-[11px] text-center">
              <thead>
                <tr>
                  <th className="text-left py-1 text-slate-400 font-normal">Theme</th>
                  {checks.map((c) => (
                    <th key={c} className="py-1 px-1 text-slate-500 font-medium truncate max-w-[40px]">
                      {c.substring(0, 4)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {themes.map((theme, rowIdx) => (
                  <tr key={theme} className="border-t border-slate-100">
                    <td className="text-left py-1.5 font-medium text-[#14213D] text-[11px] truncate max-w-[90px]">
                      {theme}
                    </td>
                    {checks.map((chk, colIdx) => {
                      // Blue intensity based on simulated high quality
                      const opacity = (rowIdx + colIdx) % 7 === 0 ? 0.45 : (rowIdx + colIdx) % 5 === 0 ? 0.75 : 0.95;
                      return (
                        <td key={chk} className="p-1">
                          <div
                            className="w-full h-5 rounded flex items-center justify-center text-[10px] text-white font-mono font-semibold"
                            style={{ backgroundColor: `rgba(31, 95, 173, ${opacity})` }}
                            title={`${theme} - ${chk}: ${(opacity * 100).toFixed(0)}%`}
                          >
                            {(opacity * 100).toFixed(0)}%
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between text-[10px] text-[#5B6B7F] pt-2 border-t border-slate-100">
            <span>Low compliance (&lt;70%)</span>
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 rounded bg-[#1F5FAD]/40" />
              <span className="w-3 h-3 rounded bg-[#1F5FAD]/70" />
              <span className="w-3 h-3 rounded bg-[#1F5FAD]" />
            </div>
            <span>High conformance (100%)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

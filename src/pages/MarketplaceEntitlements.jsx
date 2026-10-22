import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Key,
  Copy,
  CheckCircle,
  Eye,
  EyeSlash,
  ArrowUpRight,
  ShieldCheck,
  FileText,
  Clock,
  ArrowsClockwise,
  ChartBar,
  DownloadSimple
} from '@phosphor-icons/react';
import { useApp } from '../context/AppContext';

export default function MarketplaceEntitlements() {
  const { addToast } = useApp();

  const [revealedKeys, setRevealedKeys] = useState({});
  const [entitlements, setEntitlements] = useState([
    {
      id: 'ent-01',
      productTitle: 'Land Parcels Real-Time Validation API',
      productSlug: 'land-parcels-api',
      dsaNumber: 'DSA-2027-014',
      provider: 'Department of Municipalities and Transport (DMT)',
      status: 'Active · SLA Tier 1',
      statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      apiKey: 'adsdi_live_948f72a91b4c8e103f9a',
      monthlyQuota: 250000,
      usedQuota: 178420,
      rateLimit: '100 req/sec',
      validUntil: '31 Dec 2027',
      latencyP95: '184 ms'
    },
    {
      id: 'ent-02',
      productTitle: '100m Population & Employment Demographic Grid',
      productSlug: 'population-grid-100m',
      dsaNumber: 'DSA-2026-088',
      provider: 'Statistics Centre – Abu Dhabi (SCAD)',
      status: 'Active · SLA Tier 2',
      statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      apiKey: 'adsdi_live_b7130a08e45d1297e28c',
      monthlyQuota: 100000,
      usedQuota: 42150,
      rateLimit: '50 req/sec',
      validUntil: '30 Nov 2027',
      latencyP95: '210 ms'
    },
    {
      id: 'ent-03',
      productTitle: 'Building Footprints 3D (LOD2)',
      productSlug: 'building-footprints-3d',
      dsaNumber: 'DSA-2027-031',
      provider: 'Department of Municipalities and Transport (DMT)',
      status: 'Renewal Pending (30d)',
      statusColor: 'bg-amber-50 text-amber-700 border-amber-200',
      apiKey: 'adsdi_live_e336f019b882da174c5d',
      monthlyQuota: 50000,
      usedQuota: 48900,
      rateLimit: '25 req/sec',
      validUntil: '20 Nov 2027',
      latencyP95: '290 ms'
    }
  ]);

  const toggleKey = (id) => {
    setRevealedKeys((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const copyKey = (key) => {
    navigator.clipboard?.writeText(key);
    addToast('API Key copied to clipboard', 'info');
  };

  const regenerateKey = (id) => {
    const newKey = `adsdi_live_${Math.random().toString(36).substring(2, 10)}${Math.random().toString(36).substring(2, 10)}`;
    setEntitlements((prev) =>
      prev.map((e) => (e.id === id ? { ...e, apiKey: newKey } : e))
    );
    addToast('Demonstration API Key regenerated successfully', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-[#E3E8EF] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0E9F8E]" />
            <span className="text-xs font-bold text-[#0E9F8E] uppercase tracking-wider">
              Marketplace Entitlements · DSA Credential Store
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B2545] tracking-tight">
            My Entitlements & API Access
          </h1>
          <p className="text-xs sm:text-sm text-[#5B6B7F] mt-1">
            Active Data Sharing Agreements (DSA), production API credentials, and live quota consumption.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/marketplace"
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-white hover:bg-slate-50 text-[#0B2545] border border-[#E3E8EF] transition-colors"
          >
            Browse Marketplace
          </Link>
          <button
            onClick={() => addToast('DSA Entitlements audit report exported as PDF', 'success')}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#0B2545] hover:bg-[#13315C] text-white transition-colors flex items-center gap-1.5"
          >
            <DownloadSimple size={14} />
            Export Audit Report
          </button>
        </div>
      </div>

      {/* KPI Ribbon */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#E3E8EF] shadow-xs">
          <div className="text-[11px] font-semibold text-[#5B6B7F] uppercase tracking-wider">
            Active Entitlements
          </div>
          <div className="text-2xl font-extrabold text-[#0B2545] mt-1.5">3 Products</div>
          <div className="text-[11px] text-emerald-600 font-medium mt-1 flex items-center gap-1">
            <CheckCircle size={12} weight="fill" /> All SLA agreements compliant
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E3E8EF] shadow-xs">
          <div className="text-[11px] font-semibold text-[#5B6B7F] uppercase tracking-wider">
            Aggregate Quota (30d)
          </div>
          <div className="text-2xl font-extrabold text-[#0B2545] mt-1.5">67.3%</div>
          <div className="text-[11px] text-[#5B6B7F] mt-1">269,470 / 400,000 calls</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E3E8EF] shadow-xs">
          <div className="text-[11px] font-semibold text-[#5B6B7F] uppercase tracking-wider">
            Average Latency (p95)
          </div>
          <div className="text-2xl font-extrabold text-[#1F5FAD] mt-1.5">196 ms</div>
          <div className="text-[11px] text-emerald-600 font-medium mt-1">Well within 250ms target</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E3E8EF] shadow-xs">
          <div className="text-[11px] font-semibold text-[#5B6B7F] uppercase tracking-wider">
            Expiring Within 30d
          </div>
          <div className="text-2xl font-extrabold text-amber-600 mt-1.5">1 Contract</div>
          <div className="text-[11px] text-amber-600 font-medium mt-1">Automated renewal queued</div>
        </div>
      </div>

      {/* Active Entitlements Cards */}
      <div className="space-y-4">
        {entitlements.map((item) => {
          const isRevealed = revealedKeys[item.id];
          const pct = Math.round((item.usedQuota / item.monthlyQuota) * 100);

          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-6 border border-[#E3E8EF] shadow-xs hover:border-[#1F5FAD]/40 transition-all space-y-5"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#F0F4F8]">
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h3 className="text-base font-bold text-[#0B2545]">
                      {item.productTitle}
                    </h3>
                    <span
                      className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${item.statusColor}`}
                    >
                      {item.status}
                    </span>
                    <span className="text-[11px] font-mono text-[#5B6B7F] bg-slate-100 px-2 py-0.5 rounded">
                      {item.dsaNumber}
                    </span>
                  </div>
                  <p className="text-xs text-[#5B6B7F]">
                    Custodian: <strong>{item.provider}</strong> · Valid until: {item.validUntil}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    to={`/marketplace/${item.productSlug}`}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-[#1F5FAD] hover:bg-blue-50 border border-blue-200 transition-colors flex items-center gap-1"
                  >
                    View Product Specs <ArrowUpRight size={13} />
                  </Link>
                  <button
                    onClick={() => addToast(`Downloaded agreement copy for ${item.dsaNumber}`, 'info')}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium text-[#5B6B7F] hover:bg-slate-100 border border-[#E3E8EF] transition-colors flex items-center gap-1"
                  >
                    <FileText size={13} /> DSA Copy
                  </button>
                </div>
              </div>

              {/* API Key Box & Quota Bars */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
                {/* API Key credential */}
                <div className="lg:col-span-7 bg-[#0B2545]/5 rounded-xl p-3.5 border border-[#0B2545]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#0B2545] text-white flex items-center justify-center shrink-0">
                      <Key size={16} />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-[#5B6B7F] uppercase tracking-wider">
                        Sovereign Access Token (Header: X-ADSDI-API-KEY)
                      </div>
                      <div className="font-mono text-xs font-bold text-[#0B2545] mt-0.5 tracking-wider">
                        {isRevealed
                          ? item.apiKey
                          : `${item.apiKey.substring(0, 11)}••••••••••••••••${item.apiKey.slice(-4)}`}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => toggleKey(item.id)}
                      className="p-1.5 rounded-lg text-slate-600 hover:text-[#0B2545] hover:bg-white transition-colors"
                      title={isRevealed ? 'Mask key' : 'Reveal key'}
                    >
                      {isRevealed ? <EyeSlash size={16} /> : <Eye size={16} />}
                    </button>
                    <button
                      onClick={() => copyKey(item.apiKey)}
                      className="p-1.5 rounded-lg text-slate-600 hover:text-[#0B2545] hover:bg-white transition-colors"
                      title="Copy Key"
                    >
                      <Copy size={16} />
                    </button>
                    <button
                      onClick={() => regenerateKey(item.id)}
                      className="p-1.5 rounded-lg text-slate-600 hover:text-[#0B2545] hover:bg-white transition-colors"
                      title="Regenerate Key (Demo)"
                    >
                      <ArrowsClockwise size={16} />
                    </button>
                  </div>
                </div>

                {/* Quota Progress */}
                <div className="lg:col-span-5 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#5B6B7F] font-medium">Monthly Quota</span>
                    <span className="font-mono font-bold text-[#0B2545]">
                      {item.usedQuota.toLocaleString()} / {item.monthlyQuota.toLocaleString()} ({pct}%)
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        pct > 90 ? 'bg-rose-500' : pct > 70 ? 'bg-amber-500' : 'bg-[#1F5FAD]'
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-[#5B6B7F]">
                    <span>Rate limit: {item.rateLimit}</span>
                    <span>p95 Latency: {item.latencyP95}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Historical Consumption Mini-Dashboard */}
      <div className="bg-white rounded-2xl p-6 border border-[#E3E8EF] shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#0B2545] uppercase tracking-wider flex items-center gap-2">
              <ChartBar size={16} className="text-[#1F5FAD]" /> 30-Day API Call Volume Distribution
            </h3>
            <p className="text-xs text-[#5B6B7F] mt-0.5">
              Daily requests across registered OGC Features, WMTS tiles, and REST query endpoints.
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            99.98% Success (200 OK)
          </span>
        </div>

        {/* CSS Mock Bar Chart */}
        <div className="pt-4 pb-2">
          <div className="flex items-end gap-2 h-32 w-full">
            {[45, 52, 60, 58, 70, 85, 92, 78, 64, 55, 68, 80, 88, 95, 100, 82, 75, 60, 72, 85, 90, 94, 88, 76, 68, 82, 91, 98, 92, 89].map((val, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1 group relative">
                <div
                  className="w-full bg-[#1F5FAD]/80 hover:bg-[#1F5FAD] rounded-t transition-all cursor-pointer"
                  style={{ height: `${val}%` }}
                />
                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 bg-[#0B2545] text-white text-[10px] px-2 py-0.5 rounded shadow pointer-events-none whitespace-nowrap z-10">
                  Day {idx + 1}: {(val * 120).toLocaleString()} calls
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-[10px] text-[#5B6B7F] mt-2 border-t border-[#E3E8EF] pt-1">
            <span>22 Sep 2027</span>
            <span>01 Oct 2027</span>
            <span>14 Oct 2027 (Today)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

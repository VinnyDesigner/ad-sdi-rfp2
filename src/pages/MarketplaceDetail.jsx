import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Storefront,
  ShieldCheck,
  CheckCircle,
  FileCode,
  ArrowLeft,
  ArrowRight,
  Database,
  Building,
  Key,
  UsersThree,
  Cpu,
  Clock,
  Sparkle,
  Copy,
  MapTrifold
} from '@phosphor-icons/react';
import { marketplaceProducts } from '../data/portalData';
import { useApp } from '../context/AppContext';

export default function MarketplaceDetail() {
  const { productSlug } = useParams();
  const navigate = useNavigate();
  const { addToast } = useApp();

  const [activeTab, setActiveTab] = useState('overview');

  // Match by id or title slug
  const product =
    marketplaceProducts.find(
      (p) =>
        p.id === productSlug ||
        p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').includes(productSlug || '')
    ) || marketplaceProducts[0];

  const copySampleCode = () => {
    const code = `curl -X GET "https://api.adsdi.gov.ae/v1/marketplace/collections/${product.id}/items?limit=10" \\
  -H "X-ADSDI-API-KEY: adsdi_live_your_credential_here" \\
  -H "Accept: application/geo+json"`;
    navigator.clipboard?.writeText(code);
    addToast('Example API call copied to clipboard', 'info');
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb + Back */}
      <div className="flex items-center justify-between">
        <Link
          to="/marketplace"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1F5FAD] hover:underline"
        >
          <ArrowLeft size={14} /> Back to Marketplace Catalogue
        </Link>
        <span className="text-[11px] font-mono text-[#5B6B7F] bg-slate-100 px-2.5 py-0.5 rounded-full">
          Product ID: {product.id}
        </span>
      </div>

      {/* Hero Card */}
      <div className="bg-white rounded-2xl p-6 lg:p-8 border border-[#E3E8EF] shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-[#0E9F8E] uppercase tracking-wider bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                {product.type}
              </span>
              <span className="text-xs font-bold text-[#0B2545] bg-slate-100 px-2.5 py-0.5 rounded-md">
                {product.rating}
              </span>
              <span className="text-xs font-medium text-emerald-700 bg-emerald-50/80 px-2 py-0.5 rounded-md flex items-center gap-1">
                <ShieldCheck size={14} weight="fill" /> Zero-Commercial Sovereign Exchange
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-[#0B2545] tracking-tight">
              {product.title}
            </h1>

            <p className="text-sm sm:text-base text-[#5B6B7F] leading-relaxed">
              {product.desc}
            </p>

            <div className="flex items-center gap-6 pt-2 text-xs text-[#5B6B7F] flex-wrap">
              <div>
                Custodian:{' '}
                <strong className="text-[#0B2545]">{product.provider}</strong>
              </div>
              <div>
                Subscribers:{' '}
                <strong className="text-[#0B2545]">{product.subscribers} Entities</strong>
              </div>
              <div>
                Access Model:{' '}
                <strong className="text-[#0B2545]">{product.access}</strong>
              </div>
            </div>
          </div>

          {/* CTA Box */}
          <div className="bg-[#0B2545] text-white p-6 rounded-2xl flex flex-col justify-between shrink-0 lg:w-80 shadow-md">
            <div>
              <div className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider">
                Availability Tier
              </div>
              <div className="text-xl font-extrabold text-[#FFC20E] mt-1">
                Sovereign Government Licence
              </div>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Standardized Data Sharing Agreement (DSA) required for high-volume automated access.
              </p>
            </div>

            <div className="mt-6 space-y-2.5">
              <Link
                to={`/marketplace/request/${product.id}`}
                className="w-full py-3 rounded-xl bg-[#0E9F8E] hover:bg-[#0b8073] text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow"
              >
                Request Access Agreement <ArrowRight size={14} />
              </Link>
              <Link
                to="/map-viewer"
                className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <MapTrifold size={14} /> Preview on Map Viewer
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#E3E8EF] gap-4 text-xs font-bold">
        {[
          { id: 'overview', label: 'Specification & Metrics' },
          { id: 'api', label: 'OGC API & Schema Preview' },
          { id: 'sla', label: 'Service Level Agreement (SLA)' },
          { id: 'licence', label: 'Data Sharing Terms (DSA)' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-3 px-2 transition-all relative ${
              activeTab === tab.id
                ? 'text-[#0B2545] border-b-2 border-[#0B2545]'
                : 'text-[#5B6B7F] hover:text-[#0B2545]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Contents */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-[#E3E8EF] shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-[#0B2545] uppercase tracking-wider">
              Technical Specifications
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[#5B6B7F] block mb-1 font-medium">Coordinate System (CRS)</span>
                <strong className="text-[#0B2545] font-mono text-xs">
                  UAE National Grid (EPSG:3997)
                </strong>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[#5B6B7F] block mb-1 font-medium">Distribution Formats</span>
                <strong className="text-[#0B2545]">{product.formats}</strong>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[#5B6B7F] block mb-1 font-medium">Update Frequency</span>
                <strong className="text-[#0B2545]">Monthly / Bi-Weekly Automated Sync</strong>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[#5B6B7F] block mb-1 font-medium">Data Quality Verification</span>
                <strong className="text-emerald-600 font-bold">100% Quality Gateway Passed</strong>
              </div>
            </div>

            <div className="pt-2">
              <h4 className="text-xs font-bold text-[#0B2545] uppercase tracking-wider mb-2">
                Geographic Coverage
              </h4>
              <p className="text-xs text-[#5B6B7F] leading-relaxed">
                Full Abu Dhabi Emirate scope covering urban core (Abu Dhabi Island, Saadiyat, Yas, Al Maryah, Reem, Khalifa City), Al Ain municipal region, and Al Dhafra industrial and residential clusters.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#E3E8EF] shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-[#0B2545] uppercase tracking-wider">
              Operational Attributes
            </h3>
            <ul className="space-y-3 text-xs">
              <li className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-[#5B6B7F]">Security Level</span>
                <span className="font-bold text-[#0B2545]">Shared · Government</span>
              </li>
              <li className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-[#5B6B7F]">Audit Logging</span>
                <span className="font-bold text-emerald-600">Tamper-Proof SIEM</span>
              </li>
              <li className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-[#5B6B7F]">Rate Limit</span>
                <span className="font-bold text-[#0B2545]">100 requests/sec</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-[#5B6B7F]">Default Quota</span>
                <span className="font-bold text-[#0B2545]">250,000 reqs/mo</span>
              </li>
            </ul>
          </div>
        </div>
      )}

      {activeTab === 'api' && (
        <div className="bg-white rounded-2xl p-6 border border-[#E3E8EF] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#0B2545] uppercase tracking-wider flex items-center gap-2">
              <FileCode size={16} className="text-[#1F5FAD]" /> OGC API Features Example Query
            </h3>
            <button
              onClick={copySampleCode}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-[#1F5FAD] hover:bg-blue-50 border border-blue-200 transition-colors flex items-center gap-1.5"
            >
              <Copy size={13} /> Copy cURL
            </button>
          </div>

          <pre className="bg-[#0B2545] text-slate-100 p-4 rounded-xl text-xs font-mono overflow-x-auto">
{`# 1. Fetch collection metadata
curl -X GET "https://api.adsdi.gov.ae/ogc/features/v1/collections/${product.id}" \\
  -H "X-ADSDI-API-KEY: adsdi_live_your_credential_here"

# 2. Query features within bounding box (Abu Dhabi Island)
curl -X GET "https://api.adsdi.gov.ae/ogc/features/v1/collections/${product.id}/items?bbox=54.30,24.40,54.45,24.52&limit=25" \\
  -H "X-ADSDI-API-KEY: adsdi_live_your_credential_here" \\
  -H "Accept: application/geo+json"`}
          </pre>
        </div>
      )}

      {activeTab === 'sla' && (
        <div className="bg-white rounded-2xl p-6 border border-[#E3E8EF] shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-[#0B2545] uppercase tracking-wider">
            Sovereign Service Level Agreement
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-[#5B6B7F]">Monthly Uptime Target</div>
              <div className="text-xl font-bold text-[#0B2545] mt-1">99.95%</div>
              <p className="text-[11px] text-[#5B6B7F] mt-1">Guaranteed by DGE Infrastructure SLA</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-[#5B6B7F]">p95 Response Latency</div>
              <div className="text-xl font-bold text-[#1F5FAD] mt-1">&lt; 250 ms</div>
              <p className="text-[11px] text-[#5B6B7F] mt-1">Measured across regional edge nodes</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-[#5B6B7F]">Incident Response Time</div>
              <div className="text-xl font-bold text-emerald-600 mt-1">&lt; 15 mins</div>
              <p className="text-[11px] text-[#5B6B7F] mt-1">24/7 DGE SOC on-call operations</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'licence' && (
        <div className="bg-white rounded-2xl p-6 border border-[#E3E8EF] shadow-xs space-y-4 text-xs text-[#14213D] leading-relaxed">
          <h3 className="text-sm font-bold text-[#0B2545] uppercase tracking-wider">
            Abu Dhabi Sovereign Data Sharing Agreement (DSA)
          </h3>
          <p>
            All data access granted through the AD-SDI Marketplace is subject to Executive Council Resolution No. 42 on Abu Dhabi Spatial Data Governance.
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-[#5B6B7F]">
            <li>Permitted exclusively for government planning, public utility services, and authorized digital transformation projects.</li>
            <li>Direct commercial resale or secondary distribution without written authorization is prohibited.</li>
            <li>All derivative analytical outputs must cite the original contributing custodian entity.</li>
          </ul>
        </div>
      )}
    </div>
  );
}

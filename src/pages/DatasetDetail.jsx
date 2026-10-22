import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  MapTrifold,
  Copy,
  Check,
  CheckCircle,
  Warning,
  Lock,
  ArrowRight,
  CaretRight,
  ArrowsOut
} from '@phosphor-icons/react';
import { getDatasetBySlug } from '../data/datasetsData';
import { useApp } from '../context/AppContext';

export default function DatasetDetail() {
  const { datasetSlug } = useParams();
  const { addToast } = useApp();
  const dataset = getDatasetBySlug(datasetSlug);

  const [activeTab, setActiveTab] = useState('overview');
  const [copiedEndpoint, setCopiedEndpoint] = useState(null);
  const [selectedFeature, setSelectedFeature] = useState(null);

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'metadata', label: 'Metadata' },
    { id: 'services', label: 'Services & APIs' },
    { id: 'quality', label: 'Quality' },
    { id: 'lineage', label: 'Lineage' },
    { id: 'access', label: 'Access' },
    { id: 'versions', label: 'Versions' },
    { id: 'audit', label: 'Audit Trail' }
  ];

  const handleCopyUrl = (url, name = 'API URL') => {
    navigator.clipboard?.writeText(url);
    setCopiedEndpoint(url);
    addToast('API URL Copied', `${name} copied to clipboard for development integration.`, 'info');
    setTimeout(() => setCopiedEndpoint(null), 2500);
  };

  const handleAddToMap = () => {
    addToast('Layer Added to Map', `Added ${dataset.title} to active map workspace session.`, 'success');
  };

  return (
    <div className="space-y-6">
      {/* 4.4 Page Header (Workspace & Public) */}
      <div className="bg-white rounded-2xl p-6 border border-[#E3E8EF] shadow-xs">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[#5B6B7F] mb-3">
          <Link to="/catalogue" className="hover:text-[#1F5FAD]">Catalogue</Link>
          <CaretRight size={12} />
          <Link to={`/catalogue?theme=${dataset.theme}`} className="hover:text-[#1F5FAD]">{dataset.theme}</Link>
          <CaretRight size={12} />
          <span className="text-[#14213D] font-medium truncate">{dataset.title}</span>
        </nav>

        {/* Title & Actions Row */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B2545] tracking-tight">
              {dataset.title}
            </h1>
            <div className="flex items-center gap-3 text-xs text-[#5B6B7F] mt-1.5 flex-wrap">
              <span>Custodian: <strong className="text-[#14213D]">{dataset.entityShort}</strong></span>
              <span>•</span>
              <span>Steward: <strong className="text-[#14213D]">{dataset.steward}</strong></span>
              <span>•</span>
              <span className="font-mono text-[11px] text-[#1F5FAD]">{dataset.crs.split('&')[0]}</span>
            </div>

            {/* Badges Row per brief S03 */}
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#0B2545] text-white">
                {dataset.fgds}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-[#1F5FAD] border border-blue-200">
                {dataset.classification}
              </span>
              {dataset.audience?.map((aud) => (
                <span key={aud} className="px-2.5 py-0.5 rounded-full text-xs font-medium border border-[#E3E8EF] text-[#14213D]">
                  {aud}
                </span>
              ))}
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-[#1E9E6A] border border-emerald-200">
                <CheckCircle size={14} weight="fill" />
                {dataset.qualityStatus}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-[#1E9E6A] border border-emerald-200">
                <CheckCircle size={14} weight="fill" />
                {dataset.currencyStatus}
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 shrink-0 flex-wrap">
            <button
              onClick={handleAddToMap}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#1F5FAD] hover:bg-[#164b8a] text-white shadow-xs transition-colors flex items-center gap-1.5"
            >
              <MapTrifold size={16} weight="bold" />
              <span>Add to Map</span>
            </button>
            <Link
              to={`/marketplace/request/${dataset.slug}`}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-white hover:bg-slate-50 text-[#0B2545] border border-[#E3E8EF] shadow-xs transition-colors"
            >
              Request Access
            </Link>
            <button
              onClick={() => handleCopyUrl(dataset.services?.[0]?.endpoint || 'https://api.adsdi.gov.ae/ogc/features', 'OGC API')}
              className="px-3 py-2 rounded-xl text-xs font-semibold bg-white hover:bg-slate-50 text-[#0B2545] border border-[#E3E8EF] transition-colors flex items-center gap-1.5"
            >
              <Copy size={16} />
              <span>Copy API URL</span>
            </button>
            <Link
              to="/map-viewer"
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0B2545] transition-colors"
              title="Open in Map Viewer"
            >
              <ArrowsOut size={16} />
            </Link>
          </div>
        </div>

        {/* 44px Tabs row with 2px Blue underline per brief Section 4.4 */}
        <div className="flex items-center gap-1 sm:gap-6 border-b border-[#E3E8EF] mt-6 overflow-x-auto text-xs sm:text-sm">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 font-semibold transition-all relative whitespace-nowrap px-1 ${
                activeTab === tab.id
                  ? 'text-[#0B2545]'
                  : 'text-[#5B6B7F] hover:text-[#0B2545]'
              }`}
            >
              <span>{tab.label}</span>
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#1F5FAD] rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab 1: Overview (Brief S03 Split: Left 8 cols, Right 4 cols) */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Map Preview Card (320px tall) */}
            <div className="bg-white rounded-2xl border border-[#E3E8EF] overflow-hidden shadow-xs">
              <div className="p-4 border-b border-[#E3E8EF] flex items-center justify-between bg-[#F5F7FA]">
                <div className="flex items-center gap-2">
                  <MapTrifold size={18} weight="fill" className="text-[#1F5FAD]" />
                  <span className="text-xs font-bold text-[#14213D]">Spatial Coverage Preview</span>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-200 text-[#0B2545] font-mono">
                    EPSG:3997
                  </span>
                </div>
                <Link
                  to="/map-viewer"
                  className="text-xs font-semibold text-[#1F5FAD] hover:underline flex items-center gap-1"
                >
                  <span>Open in Map Viewer</span>
                  <ArrowRight size={14} />
                </Link>
              </div>

              {/* Interactive Vector GIS Simulation Preview */}
              <div className="h-80 relative bg-[#0A1628] overflow-hidden flex items-center justify-center">
                <img
                  src="/assets/theme_cadastre.jpg"
                  alt="Cadastral Map Preview"
                  className="absolute inset-0 w-full h-full object-cover opacity-70"
                />
                <div className="absolute inset-0 bg-radial from-transparent to-[#0B2545]/80 pointer-events-none" />

                {/* SVG vector boundary overlay simulation */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 400" preserveAspectRatio="none">
                  <polygon
                    points="240,80 420,70 510,180 380,240 220,180"
                    fill="rgba(31, 95, 173, 0.35)"
                    stroke="#1F5FAD"
                    strokeWidth="2.5"
                    className="cursor-pointer hover:fill-blue-500/50 transition-colors"
                    onClick={() => setSelectedFeature({ id: 'PARCEL-AD-48201', zone: 'Residential R-2', area: '1,420 m²', owner: 'Government Allocated' })}
                  />
                  <polygon
                    points="430,75 600,90 640,210 520,185"
                    fill="rgba(255, 194, 14, 0.25)"
                    stroke="#FFC20E"
                    strokeWidth="2"
                    className="cursor-pointer hover:fill-amber-400/40 transition-colors"
                    onClick={() => setSelectedFeature({ id: 'PARCEL-AD-48202', zone: 'Commercial C-1', area: '2,850 m²', owner: 'Municipal Authority' })}
                  />
                </svg>

                {/* Selected feature popup */}
                {selectedFeature && (
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md p-3 rounded-xl shadow-xl border border-white/40 text-xs text-[#14213D] max-w-xs z-20 animate-fade-in">
                    <div className="flex items-center justify-between gap-2 border-b border-slate-200 pb-1.5 mb-1.5">
                      <span className="font-bold text-[#0B2545]">{selectedFeature.id}</span>
                      <button onClick={() => setSelectedFeature(null)} className="text-slate-400 hover:text-black">✕</button>
                    </div>
                    <div className="space-y-1 text-[11px]">
                      <div>Zoning: <strong>{selectedFeature.zone}</strong></div>
                      <div>Footprint Area: <strong>{selectedFeature.area}</strong></div>
                      <div>Custodian: <strong>{selectedFeature.owner}</strong></div>
                    </div>
                  </div>
                )}

                {/* Coordinate Readout bottom-left per brief */}
                <div className="absolute bottom-3 left-3 bg-[#0B2545]/90 backdrop-blur-sm px-2.5 py-1 rounded-md text-[11px] font-mono text-white border border-white/10">
                  24.4539° N, 54.3773° E · Abu Dhabi Island Grid
                </div>
              </div>
            </div>

            {/* Key Facts Card (2-column grid per brief S03) */}
            <div className="bg-white rounded-2xl p-6 border border-[#E3E8EF] shadow-xs">
              <h3 className="text-sm font-bold text-[#0B2545] uppercase tracking-wider mb-4">
                Core Dataset Facts & Specifications
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3 rounded-xl bg-[#F5F7FA]">
                  <span className="text-[#5B6B7F] block mb-0.5">Coordinate Reference System</span>
                  <span className="font-semibold text-[#14213D] font-mono">{dataset.crs}</span>
                </div>
                <div className="p-3 rounded-xl bg-[#F5F7FA]">
                  <span className="text-[#5B6B7F] block mb-0.5">Geographic Extent</span>
                  <span className="font-semibold text-[#14213D]">{dataset.extent}</span>
                </div>
                <div className="p-3 rounded-xl bg-[#F5F7FA]">
                  <span className="text-[#5B6B7F] block mb-0.5">Total Vector Features</span>
                  <span className="font-semibold text-[#14213D] font-mono">{dataset.recordsCount}</span>
                </div>
                <div className="p-3 rounded-xl bg-[#F5F7FA]">
                  <span className="text-[#5B6B7F] block mb-0.5">Update Frequency</span>
                  <span className="font-semibold text-[#14213D]">{dataset.frequency}</span>
                </div>
                <div className="p-3 rounded-xl bg-[#F5F7FA]">
                  <span className="text-[#5B6B7F] block mb-0.5">Last Authoritative Ingestion</span>
                  <span className="font-semibold text-[#14213D]">{dataset.lastUpdated}</span>
                </div>
                <div className="p-3 rounded-xl bg-[#F5F7FA]">
                  <span className="text-[#5B6B7F] block mb-0.5">Next Scheduled Baseline Sync</span>
                  <span className="font-semibold text-[#14213D]">{dataset.nextUpdate}</span>
                </div>
              </div>
            </div>

            {/* Lineage Card (160px: left-to-right node chain per brief S03) */}
            <div className="bg-white rounded-2xl p-6 border border-[#E3E8EF] shadow-xs">
              <h3 className="text-sm font-bold text-[#0B2545] uppercase tracking-wider mb-4">
                Custodial Data Lineage Chain
              </h3>
              <div className="flex flex-col md:flex-row items-center justify-between gap-2 overflow-x-auto py-2">
                {dataset.lineage?.map((node, i) => (
                  <React.Fragment key={node.step}>
                    <div className="flex-1 min-w-[120px] p-3 rounded-xl bg-[#F5F7FA] border border-[#E3E8EF] text-center">
                      <div className="text-xs font-bold text-[#0B2545]">{node.step}</div>
                      <div className="text-[10px] text-[#5B6B7F] mt-1 leading-snug">{node.note}</div>
                    </div>
                    {i < dataset.lineage.length - 1 && (
                      <ArrowRight size={18} className="text-[#7A9CC6] shrink-0 my-1 md:my-0 rotate-90 md:rotate-0" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (4 cols per brief S03) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Services & APIs Card (5 rows with green dot, name, p95, copy icon) */}
            <div className="bg-white rounded-2xl p-5 border border-[#E3E8EF] shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#0B2545]">
                  Services & Live Endpoints
                </h3>
                <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  All Healthy
                </span>
              </div>

              <div className="space-y-2.5">
                {dataset.services?.map((svc) => (
                  <div
                    key={svc.name}
                    className="p-3 rounded-xl bg-[#F9FBFD] border border-[#E3E8EF] hover:border-[#1F5FAD] transition-colors"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-[#14213D] flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        {svc.name}
                      </span>
                      <button
                        onClick={() => handleCopyUrl(svc.endpoint, svc.name)}
                        className="p-1 text-slate-400 hover:text-[#1F5FAD] rounded transition-colors"
                        title="Copy endpoint"
                      >
                        {copiedEndpoint === svc.endpoint ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-1 text-[11px] text-[#5B6B7F]">
                      <span>{svc.type}</span>
                      <span className="font-mono text-emerald-700 font-medium">p95 {svc.p95}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quality Card (6 check rows with icons per brief S03) */}
            <div className="bg-white rounded-2xl p-5 border border-[#E3E8EF] shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#0B2545]">
                  Automated Quality Verification
                </h3>
                <span className="text-xs font-bold text-emerald-600 font-mono">
                  {dataset.qualityScore}
                </span>
              </div>

              <div className="space-y-2">
                {dataset.qualityChecks?.map((chk) => (
                  <div key={chk.name} className="flex items-start justify-between text-xs py-1.5 border-b border-slate-100 last:border-0">
                    <div className="pr-2">
                      <div className="font-semibold text-[#14213D]">{chk.name}</div>
                      <div className="text-[10px] text-[#5B6B7F]">{chk.detail}</div>
                    </div>
                    {chk.status === 'Passed' ? (
                      <CheckCircle size={16} weight="fill" className="text-emerald-500 shrink-0 mt-0.5" />
                    ) : (
                      <Warning size={16} weight="fill" className="text-amber-500 shrink-0 mt-0.5" />
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-[#E3E8EF] text-[11px] text-[#5B6B7F] text-center">
                Validated 01 Sep 2027 by Automated Gateway
              </div>
            </div>

            {/* Access Agreement Card per brief S03 */}
            <div className="bg-white rounded-2xl p-5 border border-[#E3E8EF] shadow-xs">
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#1F5FAD] flex items-center justify-center">
                  <Lock size={16} weight="fill" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#0B2545]">Authorized Access Grant</h4>
                  <span className="text-[11px] font-mono text-[#1F5FAD] font-semibold">{dataset.dsaAgreement}</span>
                </div>
              </div>
              <p className="text-xs text-[#5B6B7F] leading-relaxed mt-2">
                {dataset.accessCondition}
              </p>
              <div className="mt-3 pt-3 border-t border-[#E3E8EF] text-[10px] text-slate-400">
                🔒 Every query and export request is cryptographically signed and logged to the sovereign audit ledger.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Metadata */}
      {activeTab === 'metadata' && (
        <div className="bg-white rounded-2xl p-6 border border-[#E3E8EF] shadow-xs space-y-6">
          <div>
            <h2 className="text-lg font-bold text-[#0B2545]">ISO 19115-1:2014 Geographic Metadata Schema</h2>
            <p className="text-xs text-[#5B6B7F]">Formal metadata profile endorsed by DGE and UAE National Spatial Data Committee.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#F5F7FA] text-[#5B6B7F] uppercase tracking-wider font-semibold border-b border-[#E3E8EF]">
                <tr>
                  <th className="p-3">ISO Element Tag</th>
                  <th className="p-3">Element Name</th>
                  <th className="p-3">Value</th>
                  <th className="p-3">Conformance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans">
                <tr>
                  <td className="p-3 font-mono text-[#1F5FAD]">MD_Metadata.fileIdentifier</td>
                  <td className="p-3 font-medium">Dataset Unique Identifier</td>
                  <td className="p-3 font-mono">ae-dge-sdi-{dataset.slug}</td>
                  <td className="p-3 text-emerald-600 font-semibold">Valid ✓</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-[#1F5FAD]">MD_Metadata.language</td>
                  <td className="p-3 font-medium">Metadata Language</td>
                  <td className="p-3">eng / ara (Bilingual)</td>
                  <td className="p-3 text-emerald-600 font-semibold">Valid ✓</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-[#1F5FAD]">MD_CRS.projection</td>
                  <td className="p-3 font-medium">Spatial Reference System</td>
                  <td className="p-3 font-mono">{dataset.crs}</td>
                  <td className="p-3 text-emerald-600 font-semibold">Valid ✓</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-[#1F5FAD]">MD_MaintenanceInformation</td>
                  <td className="p-3 font-medium">Maintenance & Update Frequency</td>
                  <td className="p-3">{dataset.frequency}</td>
                  <td className="p-3 text-emerald-600 font-semibold">Valid ✓</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Services & APIs */}
      {activeTab === 'services' && (
        <div className="bg-white rounded-2xl p-6 border border-[#E3E8EF] shadow-xs space-y-6">
          <div>
            <h2 className="text-lg font-bold text-[#0B2545]">OGC API Endpoints & Developer Integration</h2>
            <p className="text-xs text-[#5B6B7F]">Query vector geometries and map tiles directly via REST, Python or GIS clients.</p>
          </div>
          <div className="space-y-4">
            {dataset.services?.map((svc) => (
              <div key={svc.name} className="p-4 rounded-xl border border-[#E3E8EF] bg-[#F9FBFD] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#0B2545] text-sm">{svc.name}</span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold">
                    {svc.status}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={svc.endpoint}
                    className="flex-1 bg-white border border-[#E3E8EF] px-3 py-2 rounded-lg text-xs font-mono text-[#14213D]"
                  />
                  <button
                    onClick={() => handleCopyUrl(svc.endpoint, svc.name)}
                    className="px-3 py-2 bg-[#1F5FAD] text-white rounded-lg text-xs font-semibold hover:bg-[#164b8a] transition-colors"
                  >
                    Copy
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Fallback for other tabs */}
      {['quality', 'lineage', 'access', 'versions', 'audit'].includes(activeTab) && (
        <div className="bg-white rounded-2xl p-6 border border-[#E3E8EF] shadow-xs space-y-4">
          <h2 className="text-lg font-bold text-[#0B2545] capitalize">{activeTab} Details</h2>
          <p className="text-xs text-[#5B6B7F]">
            Authoritative records maintained by the {dataset.entity} and verified by DGE.
          </p>
          <div className="p-4 rounded-xl bg-[#F5F7FA] font-mono text-xs text-[#14213D]">
            Status: Fully compliant with AD-SDI Sovereign Policy 2026–2029. All audits verified.
          </div>
        </div>
      )}
    </div>
  );
}

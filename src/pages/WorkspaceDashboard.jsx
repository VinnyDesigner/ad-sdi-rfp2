import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  BookmarkSimple,
  MagnifyingGlass,
  Clock,
  Key,
  ShieldCheck,
  CheckCircle,
  DownloadSimple,
  MapTrifold,
  ArrowRight,
  Database,
  Trash,
  Play,
  FileCode,
  UserSwitch,
  FolderOpen
} from '@phosphor-icons/react';
import { useApp } from '../context/AppContext';
import { DATASETS } from '../data/datasetsData';

const INITIAL_SAVED_SEARCHES = [
  {
    id: 's-1',
    title: 'Abu Dhabi Island Cadastre & Master Plots',
    query: 'parcels',
    theme: 'Land & Cadastre',
    publisher: 'DMT',
    format: 'OGC API',
    dateSaved: '14 Oct 2027',
    resultsCount: 18
  },
  {
    id: 's-2',
    title: 'Mangrove Marine Protected Extents & Monitoring',
    query: 'mangrove',
    theme: 'Environment',
    publisher: 'EAD',
    format: 'GeoJSON',
    dateSaved: '18 Oct 2027',
    resultsCount: 8
  },
  {
    id: 's-3',
    title: 'High-Resolution 30cm Satellite Orthomosaic 2026',
    query: 'imagery',
    theme: 'Imagery',
    publisher: 'DGE',
    format: 'WMTS',
    dateSaved: '20 Oct 2027',
    resultsCount: 12
  },
  {
    id: 's-4',
    title: 'LOD2 Urban Massing & Building Heights',
    query: 'building',
    theme: 'Buildings & 3D',
    publisher: 'DMT',
    format: '3D Tiles',
    dateSaved: '21 Oct 2027',
    resultsCount: 15
  }
];

const INITIAL_ACTIVITIES = [
  {
    id: 'act-1',
    title: 'Exported GeoJSON for Abu Dhabi Cadastral Parcels',
    category: 'Download',
    timestamp: '25 mins ago',
    detail: '4,210 parcel features downloaded in EPSG:3997'
  },
  {
    id: 'act-2',
    title: 'Queried Environmental Mangrove Layer in Spatial Viewer',
    category: 'GIS Query',
    timestamp: '2 hours ago',
    detail: 'Spatial bounding box query executed over Saadiyat Marine Reserve'
  },
  {
    id: 'act-3',
    title: 'Approved Data Sharing Agreement for 3D Building Massing',
    category: 'Governance',
    timestamp: 'Yesterday at 15:40',
    detail: 'Bilateral DSA signed between DGE and DMT Planning Division'
  },
  {
    id: 'act-4',
    title: 'Generated Production API Key for OGC Features API',
    category: 'Security',
    timestamp: '2 days ago',
    detail: 'Key adsdi_live_••••••3f9a with rate limit 100 req/s'
  },
  {
    id: 'act-5',
    title: 'Validated Quality Gate for Municipal Road Centerlines',
    category: 'QA Gateway',
    timestamp: '4 days ago',
    detail: 'Topology verification passed with 0 self-intersections'
  }
];

export default function WorkspaceDashboard() {
  const {
    user,
    bookmarkedDatasetIds,
    toggleBookmark,
    addToast,
    setIsPersonaModalOpen
  } = useApp();

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('saved'); // 'saved' | 'searches' | 'activity' | 'entitlements'
  const [savedSearches, setSavedSearches] = useState(INITIAL_SAVED_SEARCHES);

  // Filter bookmarked datasets from master list
  const savedDatasets = DATASETS.filter((d) => bookmarkedDatasetIds.includes(d.id));

  const handleRemoveBookmark = (id, title) => {
    toggleBookmark(id);
    addToast(`Removed "${title}" from saved bookmarks`, 'info');
  };

  const handleRemoveSearch = (id, title) => {
    setSavedSearches((prev) => prev.filter((s) => s.id !== id));
    addToast(`Removed saved search "${title}"`, 'info');
  };

  const handleRunSearch = (searchItem) => {
    navigate(`/catalogue?theme=${encodeURIComponent(searchItem.theme)}`);
  };

  const triggerDownload = (dataset) => {
    const geojson = {
      type: 'FeatureCollection',
      name: dataset.title,
      crs: { type: 'name', properties: { name: 'urn:ogc:def:crs:EPSG::3997' } },
      features: dataset.features || []
    };
    const blob = new Blob([JSON.stringify(geojson, null, 2)], {
      type: 'application/geo+json'
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${dataset.slug || 'dataset'}-epsg3997.geojson`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    addToast(`Downloaded ${dataset.title} (GeoJSON)`, 'success');
  };

  return (
    <div className="space-y-6">
      {/* 1. User Profile & Sovereign Workspace Banner */}
      <div className="bg-white rounded-2xl p-6 lg:p-7 border border-[#E3E8EF] shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-2xl text-white text-lg font-bold flex items-center justify-center shrink-0 shadow-md ring-4 ring-[#1F5FAD]/10"
              style={{ backgroundColor: user.avatarColor }}
            >
              {user.initials}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-extrabold text-[#0B2545] tracking-tight">
                  {user.name}
                </h1>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#EEF3FA] text-[#1F5FAD] border border-[#1F5FAD]/20">
                  {user.badge}
                </span>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                  <ShieldCheck size={13} weight="fill" /> Sovereign Single Sign-On
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#5B6B7F]">
                {user.role} · <strong className="text-[#0B2545]">{user.entity}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 flex-wrap">
            <button
              type="button"
              onClick={() => setIsPersonaModalOpen(true)}
              className="px-4 py-2.5 rounded-xl border border-[#E3E8EF] bg-slate-50 hover:bg-slate-100 text-[#0B2545] text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
            >
              <UserSwitch size={16} />
              <span>Switch Stakeholder Persona</span>
            </button>
            <Link
              to="/catalogue"
              className="px-4 py-2.5 rounded-xl bg-[#0B2545] hover:bg-[#13315C] text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <Database size={15} />
              <span>Browse Full Catalogue</span>
            </Link>
          </div>
        </div>

        {/* Quick KPI Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 mt-6 border-t border-[#E3E8EF]">
          <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#E3E8EF]">
            <span className="text-[11px] font-semibold text-[#5B6B7F] block">Saved Datasets</span>
            <span className="text-xl font-extrabold text-[#0B2545] font-mono">{savedDatasets.length}</span>
          </div>
          <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#E3E8EF]">
            <span className="text-[11px] font-semibold text-[#5B6B7F] block">Saved Searches</span>
            <span className="text-xl font-extrabold text-[#0B2545] font-mono">{savedSearches.length}</span>
          </div>
          <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#E3E8EF]">
            <span className="text-[11px] font-semibold text-[#5B6B7F] block">Active DSAs</span>
            <span className="text-xl font-extrabold text-[#1F5FAD] font-mono">4</span>
          </div>
          <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#E3E8EF]">
            <span className="text-[11px] font-semibold text-[#5B6B7F] block">Recent Events</span>
            <span className="text-xl font-extrabold text-emerald-600 font-mono">18</span>
          </div>
        </div>
      </div>

      {/* 2. Workspace Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E3E8EF] pb-px overflow-x-auto text-xs font-semibold">
        <button
          type="button"
          onClick={() => setActiveTab('saved')}
          className={`px-4 py-3 border-b-2 transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
            activeTab === 'saved'
              ? 'border-[#1F5FAD] text-[#1F5FAD] font-bold'
              : 'border-transparent text-[#5B6B7F] hover:text-[#0B2545]'
          }`}
        >
          <BookmarkSimple size={16} weight={activeTab === 'saved' ? 'fill' : 'regular'} />
          <span>Saved Datasets & Bookmarks ({savedDatasets.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('searches')}
          className={`px-4 py-3 border-b-2 transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
            activeTab === 'searches'
              ? 'border-[#1F5FAD] text-[#1F5FAD] font-bold'
              : 'border-transparent text-[#5B6B7F] hover:text-[#0B2545]'
          }`}
        >
          <MagnifyingGlass size={16} />
          <span>Saved Queries & Searches ({savedSearches.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('activity')}
          className={`px-4 py-3 border-b-2 transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
            activeTab === 'activity'
              ? 'border-[#1F5FAD] text-[#1F5FAD] font-bold'
              : 'border-transparent text-[#5B6B7F] hover:text-[#0B2545]'
          }`}
        >
          <Clock size={16} />
          <span>Audit Log & Recent Activity</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('entitlements')}
          className={`px-4 py-3 border-b-2 transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
            activeTab === 'entitlements'
              ? 'border-[#1F5FAD] text-[#1F5FAD] font-bold'
              : 'border-transparent text-[#5B6B7F] hover:text-[#0B2545]'
          }`}
        >
          <Key size={16} />
          <span>Entitlements & Bilateral DSAs</span>
        </button>
      </div>

      {/* 3. Tab Contents */}

      {/* Tab 1: Saved Datasets */}
      {activeTab === 'saved' && (
        <div className="space-y-4">
          {savedDatasets.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-[#E3E8EF] shadow-xs space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 text-[#FFC20E] flex items-center justify-center mx-auto shadow-2xs">
                <BookmarkSimple size={28} weight="fill" />
              </div>
              <h2 className="text-base font-bold text-[#0B2545]">No saved datasets yet</h2>
              <p className="text-xs text-[#5B6B7F] max-w-md mx-auto leading-relaxed">
                Click the bookmark icon on any dataset in the catalogue or detail page to pin it to your sovereign workspace for instant access.
              </p>
              <Link
                to="/catalogue"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0B2545] hover:bg-[#13315C] text-white text-xs font-bold transition-colors shadow-xs mt-2"
              >
                <span>Explore Authoritative Catalogue</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {savedDatasets.map((ds) => (
                <div
                  key={ds.id}
                  className="bg-white rounded-2xl p-5 border border-[#E3E8EF] shadow-xs hover:border-[#1F5FAD]/40 transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-[#1F5FAD]">
                        {ds.entityShort} · {ds.theme}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveBookmark(ds.id, ds.title)}
                        className="text-slate-300 hover:text-red-500 p-1 cursor-pointer transition-colors"
                        title="Remove from saved bookmarks"
                      >
                        <Trash size={16} />
                      </button>
                    </div>

                    <Link
                      to={`/catalogue/${ds.slug}`}
                      className="text-base font-bold text-[#0B2545] hover:text-[#1F5FAD] transition-colors line-clamp-2"
                    >
                      {ds.title}
                    </Link>

                    <p className="text-xs text-[#5B6B7F] line-clamp-2 leading-relaxed">
                      {ds.description}
                    </p>

                    <div className="pt-2 flex items-center justify-between text-[11px] text-[#5B6B7F] border-t border-slate-100">
                      <span>Format: <strong className="text-[#0B2545]">{ds.format}</strong></span>
                      <span className="font-mono">{ds.crs}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                    <Link
                      to={`/catalogue/${ds.slug}`}
                      className="flex-1 py-2 text-center rounded-xl bg-slate-50 hover:bg-slate-100 text-[#0B2545] text-xs font-semibold transition-colors"
                    >
                      Details
                    </Link>
                    <button
                      type="button"
                      onClick={() => triggerDownload(ds)}
                      className="p-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#1F5FAD] transition-colors cursor-pointer"
                      title="Download GeoJSON"
                    >
                      <DownloadSimple size={16} />
                    </button>
                    <Link
                      to={`/map-viewer`}
                      className="p-2 rounded-xl bg-[#0B2545] hover:bg-[#13315C] text-white transition-colors flex items-center justify-center"
                      title="Preview on Map Viewer"
                    >
                      <MapTrifold size={16} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Saved Searches */}
      {activeTab === 'searches' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-6 border border-[#E3E8EF] shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-[#0B2545]">Saved Geospatial Queries</h2>
                <p className="text-xs text-[#5B6B7F]">Quickly rerun complex spatial filters, custodians, and keyword queries.</p>
              </div>
              <span className="text-xs font-mono text-[#5B6B7F]">{savedSearches.length} queries configured</span>
            </div>

            <div className="divide-y divide-slate-100">
              {savedSearches.map((item) => (
                <div key={item.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-sm font-bold text-[#0B2545]">{item.title}</h4>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-[#1F5FAD]">
                        {item.theme}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-[#5B6B7F]">
                        {item.publisher}
                      </span>
                    </div>
                    <p className="text-xs text-[#5B6B7F]">
                      Saved on {item.dateSaved} · Expected matches: <strong className="text-[#0B2545]">{item.resultsCount} datasets</strong>
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleRunSearch(item)}
                      className="px-3.5 py-1.5 rounded-xl bg-[#0B2545] hover:bg-[#13315C] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Play size={13} weight="fill" />
                      <span>Run Search</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveSearch(item.id, item.title)}
                      className="p-2 text-slate-400 hover:text-red-500 rounded-lg transition-colors cursor-pointer"
                      title="Remove saved search"
                    >
                      <Trash size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Recent Activity Log */}
      {activeTab === 'activity' && (
        <div className="bg-white rounded-2xl p-6 border border-[#E3E8EF] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-[#0B2545]">Audit Trail & Recent Activity</h2>
              <p className="text-xs text-[#5B6B7F]">Immutable sovereign log of data exports, queries, and permissions.</p>
            </div>
            <button
              onClick={() => addToast('Audit log export initiated', 'info')}
              className="text-xs font-semibold text-[#1F5FAD] hover:underline"
            >
              Export CSV
            </button>
          </div>

          <div className="space-y-3">
            {INITIAL_ACTIVITIES.map((act) => (
              <div
                key={act.id}
                className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E3E8EF] flex items-start justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#0B2545]">{act.title}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white text-[#5B6B7F] border border-slate-200">
                      {act.category}
                    </span>
                  </div>
                  <p className="text-xs text-[#5B6B7F]">{act.detail}</p>
                </div>
                <span className="text-[11px] font-mono text-[#5B6B7F] shrink-0">{act.timestamp}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Entitlements & Bilateral DSAs */}
      {activeTab === 'entitlements' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-6 border border-[#E3E8EF] shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-[#0B2545]">Active Data Sharing Agreements (DSAs)</h2>
                <p className="text-xs text-[#5B6B7F]">Bilateral authorizations granted to {user.entity}.</p>
              </div>
              <Link
                to="/marketplace/entitlements"
                className="text-xs font-bold text-[#1F5FAD] hover:underline flex items-center gap-1"
              >
                <span>Full Entitlements Console</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-800">DSA-2027-DMT-001</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    Active
                  </span>
                </div>
                <h4 className="text-sm font-bold text-[#0B2545]">Cadastre & Master Parcels Full Access</h4>
                <p className="text-xs text-[#5B6B7F]">Grantor: Department of Municipalities and Transport (DMT)</p>
                <div className="pt-2 text-[11px] text-[#5B6B7F] flex justify-between">
                  <span>Valid until: 31 Dec 2028</span>
                  <span className="font-bold text-[#1F5FAD]">Unlimited API calls</span>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/40 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#1F5FAD]">DSA-2027-EAD-014</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-[#1F5FAD]">
                    Active
                  </span>
                </div>
                <h4 className="text-sm font-bold text-[#0B2545]">Marine Protected Habitats & Mangroves</h4>
                <p className="text-xs text-[#5B6B7F]">Grantor: Environment Agency – Abu Dhabi (EAD)</p>
                <div className="pt-2 text-[11px] text-[#5B6B7F] flex justify-between">
                  <span>Valid until: 15 Sep 2028</span>
                  <span className="font-bold text-[#1F5FAD]">WFS Vector Sync</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

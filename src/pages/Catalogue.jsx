import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  MagnifyingGlass,
  BookmarkSimple,
  Bell,
  MapPin,
  ListDashes,
  SquaresFour,
  ArrowsInLineHorizontal,
  Plus,
  Minus,
  House,
  CheckCircle,
  ArrowRight,
  PencilSimple
} from '@phosphor-icons/react';
import { themeCategories } from '../data/portalData';
import { DATASETS } from '../data/datasetsData';
import { useApp } from '../context/AppContext';

export default function Catalogue() {
  const [searchParams] = useSearchParams();
  const { addToast } = useApp();

  const initialQuery = searchParams.get('q') || '';
  const initialTheme = searchParams.get('theme') || 'All';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedTheme, setSelectedTheme] = useState(initialTheme);
  const [selectedPublisher, setSelectedPublisher] = useState('All');
  const [selectedClassification, setSelectedClassification] = useState('All');
  const [selectedFormat, setSelectedFormat] = useState('All');
  const [viewMode, setViewMode] = useState('split'); // 'split', 'list', 'grid'
  const [drawAreaActive, setDrawAreaActive] = useState(false);
  const [hoveredDatasetId, setHoveredDatasetId] = useState(null);
  const [bookmarkedIds, setBookmarkedIds] = useState(['land-parcels-cadastre']);

  // Filter datasets
  const filteredDatasets = useMemo(() => {
    return DATASETS.filter((ds) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = ds.title.toLowerCase().includes(q);
        const matchDesc = ds.description.toLowerCase().includes(q);
        const matchTheme = ds.theme.toLowerCase().includes(q);
        const matchEntity = ds.entity.toLowerCase().includes(q);
        if (!matchTitle && !matchDesc && !matchTheme && !matchEntity) return false;
      }
      if (selectedTheme !== 'All') {
        if (ds.theme.toLowerCase() !== selectedTheme.toLowerCase()) return false;
      }
      if (selectedPublisher !== 'All') {
        if (!ds.entityShort.toLowerCase().includes(selectedPublisher.toLowerCase())) return false;
      }
      if (selectedClassification !== 'All') {
        if (!ds.classification.toLowerCase().includes(selectedClassification.toLowerCase())) return false;
      }
      if (selectedFormat !== 'All') {
        if (!ds.formats.some((f) => f.toLowerCase().includes(selectedFormat.toLowerCase()))) return false;
      }
      return true;
    });
  }, [searchQuery, selectedTheme, selectedPublisher, selectedClassification, selectedFormat]);

  const toggleBookmark = (id, e) => {
    e.stopPropagation();
    e.preventDefault();
    setBookmarkedIds((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        addToast('Removed from Saved Datasets', 'Dataset unbookmarked.', 'info');
        return prev.filter((item) => item !== id);
      } else {
        addToast('Saved to My Datasets', 'Dataset added to your quick access bookmarks.', 'success');
        return [...prev, id];
      }
    });
  };

  const handleSaveSearch = () => {
    addToast('Search Query Saved', `Saved search filter "${searchQuery || selectedTheme}" to your workspace.`, 'success');
  };

  const handleCreateAlert = () => {
    addToast('Alert Created', 'You will receive notifications whenever matching spatial assets are updated.', 'info');
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedTheme('All');
    setSelectedPublisher('All');
    setSelectedClassification('All');
    setSelectedFormat('All');
    setDrawAreaActive(false);
  };

  return (
    <div className="space-y-4">
      {/* S02 Search Row */}
      <div className="bg-white rounded-2xl p-4 lg:p-5 border border-[#E3E8EF] shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* 640px Search field */}
        <div className="relative w-full max-w-[640px]">
          <MagnifyingGlass
            size={20}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1F5FAD]"
            weight="bold"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search datasets by title, keyword, entity or spatial coverage..."
            className="w-full h-11 pl-10 pr-20 rounded-xl border border-[#E3E8EF] focus:border-[#1F5FAD] focus:ring-2 focus:ring-[#1F5FAD]/20 outline-none text-sm text-[#14213D] bg-white transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#5B6B7F] hover:text-[#14213D]"
            >
              Clear
            </button>
          )}
        </div>

        {/* Result count & view actions */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
          <div className="text-sm font-bold text-[#0B2545]">
            <span className="text-lg font-extrabold text-[#1F5FAD]">{filteredDatasets.length}</span>{' '}
            <span className="text-[#5B6B7F] font-medium">datasets available</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSaveSearch}
              className="p-2 rounded-lg text-xs font-semibold text-[#5B6B7F] hover:text-[#0B2545] hover:bg-slate-100 border border-slate-200 transition-colors flex items-center gap-1.5"
              title="Save Search"
            >
              <BookmarkSimple size={16} />
              <span className="hidden xl:inline">Save</span>
            </button>
            <button
              onClick={handleCreateAlert}
              className="p-2 rounded-lg text-xs font-semibold text-[#5B6B7F] hover:text-[#0B2545] hover:bg-slate-100 border border-slate-200 transition-colors flex items-center gap-1.5"
              title="Create Alert"
            >
              <Bell size={16} />
              <span className="hidden xl:inline">Alert</span>
            </button>
          </div>
        </div>
      </div>

      {/* S02 Filter Row */}
      <div className="bg-white rounded-2xl p-4 border border-[#E3E8EF] shadow-xs flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          {/* Theme Dropdown */}
          <select
            value={selectedTheme}
            onChange={(e) => setSelectedTheme(e.target.value)}
            className="h-9 px-3 rounded-lg border border-[#E3E8EF] bg-white text-xs font-medium text-[#14213D] focus:border-[#1F5FAD] outline-none"
          >
            <option value="All">All Themes (8)</option>
            {themeCategories.map((t) => (
              <option key={t.id} value={t.name}>{t.name}</option>
            ))}
          </select>

          {/* Publisher */}
          <select
            value={selectedPublisher}
            onChange={(e) => setSelectedPublisher(e.target.value)}
            className="h-9 px-3 rounded-lg border border-[#E3E8EF] bg-white text-xs font-medium text-[#14213D] focus:border-[#1F5FAD] outline-none"
          >
            <option value="All">All Publishers (64)</option>
            <option value="DMT">DMT (Municipalities & Transport)</option>
            <option value="EAD">EAD (Environment Agency)</option>
            <option value="ITC">ITC (Integrated Transport)</option>
            <option value="DGE">DGE (Government Enablement)</option>
            <option value="ADDC">ADDC (Distribution Company)</option>
            <option value="SCAD">SCAD (Statistics Centre)</option>
          </select>

          {/* Classification */}
          <select
            value={selectedClassification}
            onChange={(e) => setSelectedClassification(e.target.value)}
            className="h-9 px-3 rounded-lg border border-[#E3E8EF] bg-white text-xs font-medium text-[#14213D] focus:border-[#1F5FAD] outline-none"
          >
            <option value="All">All Classifications</option>
            <option value="Open Data">Open Data</option>
            <option value="Shared">Shared · Government</option>
            <option value="Marketplace">Marketplace · Tier 1</option>
            <option value="Restricted">Restricted · Government Only</option>
          </select>

          {/* Format */}
          <select
            value={selectedFormat}
            onChange={(e) => setSelectedFormat(e.target.value)}
            className="h-9 px-3 rounded-lg border border-[#E3E8EF] bg-white text-xs font-medium text-[#14213D] focus:border-[#1F5FAD] outline-none"
          >
            <option value="All">All Formats</option>
            <option value="OGC API">OGC API Features</option>
            <option value="GeoJSON">GeoJSON</option>
            <option value="WFS">WFS / WMS</option>
            <option value="3D Tiles">3D Tiles</option>
            <option value="Shapefile">Shapefile</option>
          </select>

          {/* Draw Area tool button */}
          <button
            onClick={() => {
              setDrawAreaActive((prev) => !prev);
              if (!drawAreaActive) {
                addToast('Draw Filter Area Active', 'Polygon boundary applied across Abu Dhabi Island & Eastern Coast.', 'info');
              }
            }}
            className={`h-9 px-3 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-all ${
              drawAreaActive
                ? 'bg-[#FFC20E] text-[#0B2545] border-[#FFC20E] shadow-xs'
                : 'bg-white text-[#5B6B7F] border-[#E3E8EF] hover:border-[#1F5FAD]'
            }`}
          >
            <PencilSimple size={14} weight="bold" />
            <span>Draw Area</span>
          </button>

          {(selectedTheme !== 'All' || selectedPublisher !== 'All' || selectedClassification !== 'All' || searchQuery || drawAreaActive) && (
            <button
              onClick={clearAllFilters}
              className="text-xs font-semibold text-[#1F5FAD] hover:underline px-2 py-1"
            >
              Clear all
            </button>
          )}
        </div>

        {/* View mode toggle */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
            <button
              onClick={() => setViewMode('split')}
              className={`p-1.5 rounded text-xs font-medium ${
                viewMode === 'split' ? 'bg-white text-[#0B2545] shadow-xs' : 'text-[#5B6B7F] hover:text-[#0B2545]'
              }`}
              title="Split View (List + Map)"
            >
              <ArrowsInLineHorizontal size={16} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded text-xs font-medium ${
                viewMode === 'list' ? 'bg-white text-[#0B2545] shadow-xs' : 'text-[#5B6B7F] hover:text-[#0B2545]'
              }`}
              title="Full List View"
            >
              <ListDashes size={16} />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded text-xs font-medium ${
                viewMode === 'grid' ? 'bg-white text-[#0B2545] shadow-xs' : 'text-[#5B6B7F] hover:text-[#0B2545]'
              }`}
              title="Grid View"
            >
              <SquaresFour size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* S02 Main Body: Split View (List 520px left, Map right) */}
      <div className={`grid gap-6 ${viewMode === 'split' ? 'grid-cols-1 lg:grid-cols-12' : viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
        {/* Results List Column */}
        <div className={`${viewMode === 'split' ? 'lg:col-span-6 xl:col-span-6' : ''} space-y-3`}>
          {filteredDatasets.map((ds) => {
            const isHovered = hoveredDatasetId === ds.id;
            const isBookmarked = bookmarkedIds.includes(ds.id);

            return (
              <div
                key={ds.id}
                onMouseEnter={() => setHoveredDatasetId(ds.id)}
                onMouseLeave={() => setHoveredDatasetId(null)}
                className={`bg-white rounded-2xl p-5 border transition-all duration-200 shadow-xs relative group ${
                  isHovered ? 'border-[#1F5FAD] ring-2 ring-[#1F5FAD]/15 shadow-md' : 'border-[#E3E8EF] hover:border-[#7A9CC6]'
                }`}
              >
                {/* Header row */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="text-[11px] font-bold text-[#1F5FAD] uppercase tracking-wider">
                        {ds.entityShort}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="text-xs text-[#5B6B7F]">{ds.theme}</span>
                    </div>

                    <Link
                      to={`/catalogue/${ds.slug}`}
                      className="text-base font-bold text-[#0B2545] hover:text-[#1F5FAD] transition-colors leading-snug block"
                    >
                      {ds.title}
                    </Link>
                  </div>

                  <button
                    onClick={(e) => toggleBookmark(ds.id, e)}
                    className="p-1.5 text-slate-300 hover:text-[#FFC20E] transition-colors shrink-0"
                    title={isBookmarked ? 'Remove bookmark' : 'Bookmark dataset'}
                  >
                    <BookmarkSimple size={18} weight={isBookmarked ? 'fill' : 'regular'} className={isBookmarked ? 'text-[#FFC20E]' : ''} />
                  </button>
                </div>

                {/* Description */}
                <p className="text-xs text-[#5B6B7F] line-clamp-2 mt-2 leading-relaxed">
                  {ds.description}
                </p>

                {/* Badges row per brief S02 */}
                <div className="flex items-center gap-2 mt-3.5 flex-wrap">
                  <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-semibold ${
                    ds.classification.includes('Open')
                      ? 'bg-emerald-50 text-[#1E9E6A]'
                      : ds.classification.includes('Restricted')
                      ? 'bg-amber-50 text-[#E8A317]'
                      : 'bg-blue-50 text-[#1F5FAD]'
                  }`}>
                    {ds.classification}
                  </span>

                  {ds.audience?.[0] && (
                    <span className="text-[11px] px-2 py-0.5 rounded-full border border-[#E3E8EF] text-[#14213D] font-medium">
                      {ds.audience[0]}
                    </span>
                  )}

                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-50 text-[#1E9E6A] font-semibold flex items-center gap-1">
                    <CheckCircle size={12} weight="fill" />
                    Quality passed
                  </span>

                  <span className="text-[11px] text-[#5B6B7F] ml-auto">
                    Updated {ds.lastUpdated}
                  </span>
                </div>

                {/* Formats & Actions row */}
                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {ds.formats?.map((fmt) => (
                      <span key={fmt} className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-[#5B6B7F] font-mono">
                        {fmt}
                      </span>
                    ))}
                  </div>

                  <Link
                    to={`/catalogue/${ds.slug}`}
                    className="text-xs font-semibold text-[#1F5FAD] hover:underline flex items-center gap-1 shrink-0"
                  >
                    <span>Details</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Map Column (S02 Map viewport with Abu Dhabi Coastline & Mangroves) */}
        {viewMode === 'split' && (
          <div className="lg:col-span-6 xl:col-span-6 sticky top-20 h-[680px] bg-[#0A1628] rounded-2xl overflow-hidden border border-[#E3E8EF] shadow-md flex flex-col">
            {/* Map Header Overlay */}
            <div className="p-3 bg-[#0B2545]/90 backdrop-blur-sm border-b border-white/10 flex items-center justify-between text-xs text-white z-10">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-semibold">AD-SDI Geospatial Footprints</span>
                <span className="text-[11px] font-mono text-slate-400">EPSG:3997</span>
              </div>
              <div className="text-[11px] text-[#FFC20E] font-medium">
                {drawAreaActive ? 'Drawing Filter Polygon Active' : 'Hover dataset to highlight footprint'}
              </div>
            </div>

            {/* Interactive Graphic Canvas */}
            <div className="relative flex-1 bg-[#0A1628] overflow-hidden">
              <img
                src="/assets/theme_environment.jpg"
                alt="Abu Dhabi Geographic Map"
                className="w-full h-full object-cover opacity-60 mix-blend-luminosity scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B2545] via-transparent to-[#0B2545]/40" />

              {/* Vector Polygons SVG Overlay */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 600" preserveAspectRatio="none">
                {/* Coastal protected zone */}
                <polygon
                  points="180,120 320,110 400,240 280,320 150,220"
                  fill={hoveredDatasetId === 'mangrove-habitat-extent-2027' ? 'rgba(30, 158, 106, 0.55)' : 'rgba(30, 158, 106, 0.25)'}
                  stroke="#1E9E6A"
                  strokeWidth={hoveredDatasetId === 'mangrove-habitat-extent-2027' ? '3' : '1.5'}
                  className="transition-all duration-300"
                />

                {/* Cadastral urban parcel footprint */}
                <polygon
                  points="260,200 440,190 480,360 320,400 230,290"
                  fill={hoveredDatasetId === 'land-parcels-cadastre' ? 'rgba(31, 95, 173, 0.6)' : 'rgba(31, 95, 173, 0.25)'}
                  stroke="#1F5FAD"
                  strokeWidth={hoveredDatasetId === 'land-parcels-cadastre' ? '3' : '1.5'}
                  className="transition-all duration-300"
                />

                {/* 3D Massing polygon */}
                <polygon
                  points="290,240 410,230 430,340 310,350"
                  fill={hoveredDatasetId === 'building-footprints-3d' ? 'rgba(43, 166, 222, 0.65)' : 'rgba(43, 166, 222, 0.25)'}
                  stroke="#2BA6DE"
                  strokeWidth="2"
                  className="transition-all duration-300"
                />

                {/* Dashed Gold Polygon for Draw Area per brief S02 */}
                {drawAreaActive && (
                  <polygon
                    points="140,80 480,60 520,440 200,460"
                    fill="rgba(255, 194, 14, 0.12)"
                    stroke="#FFC20E"
                    strokeWidth="2.5"
                    strokeDasharray="6,4"
                  />
                )}
              </svg>

              {/* Tooltip on hovered polygon per brief S02 */}
              {hoveredDatasetId && (
                <div className="absolute top-12 left-1/2 -translate-x-1/2 bg-white text-[#0B2545] px-3 py-1.5 rounded-lg shadow-xl text-xs font-bold border border-[#1F5FAD] z-20 flex items-center gap-1.5 animate-fade-in">
                  <MapPin size={14} weight="fill" className="text-[#1F5FAD]" />
                  <span>{DATASETS.find((d) => d.id === hoveredDatasetId)?.title}</span>
                </div>
              )}

              {/* Map controls top-right per brief S02 */}
              <div className="absolute top-4 right-4 flex flex-col bg-white rounded-lg shadow-md border border-[#E3E8EF] overflow-hidden text-[#0B2545] z-10">
                <button
                  onClick={() => addToast('Zoom In', 'Map view zoom increased.', 'info')}
                  className="p-2 hover:bg-slate-100 border-b border-slate-100"
                  title="Zoom in"
                >
                  <Plus size={16} weight="bold" />
                </button>
                <button
                  onClick={() => addToast('Zoom Out', 'Map view zoom decreased.', 'info')}
                  className="p-2 hover:bg-slate-100 border-b border-slate-100"
                  title="Zoom out"
                >
                  <Minus size={16} weight="bold" />
                </button>
                <button
                  onClick={() => addToast('View Reset', 'Map centered to Abu Dhabi Island.', 'info')}
                  className="p-2 hover:bg-slate-100"
                  title="Reset view"
                >
                  <House size={16} />
                </button>
              </div>

              {/* Legend bottom-left per brief S02 */}
              <div className="absolute bottom-10 left-4 bg-[#0B2545]/90 backdrop-blur-md p-3 rounded-xl border border-white/10 text-xs text-white z-10 space-y-1.5">
                <div className="text-[10px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Active Layers
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-[#1F5FAD]/80 border border-[#1F5FAD]" />
                  <span>Cadastral Parcels</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-[#1E9E6A]/80 border border-[#1E9E6A]" />
                  <span>Mangrove Sanctuaries</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-[#2BA6DE]/80 border border-[#2BA6DE]" />
                  <span>3D Building Footprints</span>
                </div>
              </div>

              {/* Scale bar & coordinates bottom-right per brief */}
              <div className="absolute bottom-3 right-4 flex items-center gap-3 text-[11px] font-mono text-slate-300 bg-[#0B2545]/80 px-2.5 py-1 rounded-md border border-white/10 z-10">
                <span>Scale: 1 : 25,000</span>
                <span>•</span>
                <span>24.4539° N, 54.3773° E</span>
                <span>•</span>
                <span className="text-[10px] text-slate-400">Basemap: AD-SDI</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

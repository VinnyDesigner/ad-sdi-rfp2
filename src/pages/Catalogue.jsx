import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  MagnifyingGlass,
  BookmarkSimple,
  SlidersHorizontal,
  X,
  Funnel,
  CheckCircle,
  ArrowRight,
  MapPin,
  Buildings,
  Tree,
  RoadHorizon,
  Drop,
  Users,
  Compass,
  FileText,
  ListDashes,
  MapTrifold,
  PencilSimpleLine
} from '@phosphor-icons/react';
import { DATASETS } from '../data/datasetsData';
import { themeCategories } from '../data/portalData';
import { useApp } from '../context/AppContext';
import CatalogueMap from '../components/catalogue/CatalogueMap';

class MapErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.warn('CatalogueMap error caught by boundary:', error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 p-8 text-center">
          <p className="text-base font-bold text-[#0B2545]">GIS Map Canvas</p>
          <p className="text-xs text-[#5B6B7F] mt-1 max-w-md">
            Click below to initialize the geographic map.
          </p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className="mt-4 px-4 py-2 rounded-xl bg-[#0B2545] text-white text-xs font-semibold hover:bg-[#13315C] cursor-pointer"
          >
            Reload Map Canvas
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function Catalogue() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { addToast, toggleBookmark: toggleGlobalBookmark, isBookmarked, t, lang } = useApp();

  const initialQuery = searchParams.get('q') || '';
  const initialTheme = searchParams.get('theme') || 'All';

  // Filters & Search State
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedTheme, setSelectedTheme] = useState(initialTheme);
  const [selectedPublisher, setSelectedPublisher] = useState('All');
  const [selectedClassification, setSelectedClassification] = useState('All');
  const [selectedFormat, setSelectedFormat] = useState('All');
  const [sortBy, setSortBy] = useState('relevance'); // 'relevance', 'recent', 'name'
  const [spatialAoiFilter, setSpatialAoiFilter] = useState(null); // { ids: Set, areaKm2: number, type: string }

  // Selection & Interaction State
  const [selectedDataset, setSelectedDataset] = useState(DATASETS[0]); // Land Parcels default
  const [hoveredDatasetId, setHoveredDatasetId] = useState(null);

  // Mobile View Toggle: 'list' or 'map'
  const [mobileTab, setMobileTab] = useState('list'); // 'list' | 'map'

  // Update theme filter if URL param changes
  useEffect(() => {
    const q = searchParams.get('q');
    const theme = searchParams.get('theme');
    if (q !== null) setSearchQuery(q);
    if (theme !== null) setSelectedTheme(theme);
  }, [searchParams]);

  // Filter datasets
  const filteredDatasets = useMemo(() => {
    let result = DATASETS.filter((ds) => {
      // Text search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = ds.title.toLowerCase().includes(q);
        const matchDesc = ds.description.toLowerCase().includes(q);
        const matchTheme = ds.theme.toLowerCase().includes(q);
        const matchEntity = ds.entity.toLowerCase().includes(q) || ds.entityShort.toLowerCase().includes(q);
        const matchExtent = ds.extent?.toLowerCase().includes(q);
        const matchFormats = ds.formats?.some((f) => f.toLowerCase().includes(q));
        if (!matchTitle && !matchDesc && !matchTheme && !matchEntity && !matchExtent && !matchFormats) {
          return false;
        }
      }

      // Theme filter
      if (selectedTheme !== 'All') {
        if (ds.theme.toLowerCase() !== selectedTheme.toLowerCase()) return false;
      }

      // Publisher filter
      if (selectedPublisher !== 'All') {
        if (ds.entityShort.toLowerCase() !== selectedPublisher.toLowerCase()) return false;
      }

      // Classification filter
      if (selectedClassification !== 'All') {
        if (!ds.classification.toLowerCase().includes(selectedClassification.toLowerCase())) return false;
      }

      // Format filter
      if (selectedFormat !== 'All') {
        if (!ds.formats?.some((f) => f.toLowerCase().includes(selectedFormat.toLowerCase()))) return false;
      }

      // Spatial AOI filter (from manual map drawing)
      if (spatialAoiFilter && spatialAoiFilter.ids) {
        if (!spatialAoiFilter.ids.has(ds.id)) return false;
      }

      return true;
    });

    // Sorting
    if (sortBy === 'name') {
      result = [...result].sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'recent') {
      result = [...result].sort((a, b) => (b.lastUpdated || '').localeCompare(a.lastUpdated || ''));
    }

    return result;
  }, [searchQuery, selectedTheme, selectedPublisher, selectedClassification, selectedFormat, sortBy, spatialAoiFilter]);

  // Active filter count
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (selectedTheme !== 'All') count++;
    if (selectedPublisher !== 'All') count++;
    if (selectedClassification !== 'All') count++;
    if (selectedFormat !== 'All') count++;
    if (searchQuery.trim()) count++;
    if (spatialAoiFilter) count++;
    return count;
  }, [selectedTheme, selectedPublisher, selectedClassification, selectedFormat, searchQuery, spatialAoiFilter]);

  // Bookmark Toggle
  const handleToggleBookmark = (id, e) => {
    e.stopPropagation();
    e.preventDefault();
    toggleGlobalBookmark(id);
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedTheme('All');
    setSelectedPublisher('All');
    setSelectedClassification('All');
    setSelectedFormat('All');
    setSpatialAoiFilter(null);
    setSearchParams({});
    addToast('Filters Cleared', 'All catalogue search filters and spatial queries have been reset.', 'info');
  };

  // Automatically synchronize selected dataset when filtered results change
  useEffect(() => {
    if (filteredDatasets.length > 0) {
      if (!selectedDataset || !filteredDatasets.some((d) => d.id === selectedDataset.id)) {
        setSelectedDataset(filteredDatasets[0]);
      }
    } else {
      setSelectedDataset(null);
    }
  }, [filteredDatasets]);

  // Select dataset handler
  const handleSelectDataset = (dataset) => {
    setSelectedDataset(dataset);
  };

  return (
    <div className="w-full h-full flex flex-col lg:flex-row overflow-hidden bg-[#F5F7FA]">
      {/* Mobile Top Segmented Tab Switcher (< lg) */}
      <div className="lg:hidden flex items-center justify-between px-4 py-2.5 bg-white border-b border-[#E3E8EF] shrink-0">
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl w-full max-w-xs mx-auto">
          <button
            type="button"
            onClick={() => setMobileTab('list')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              mobileTab === 'list'
                ? 'bg-white text-[#0B2545] shadow-xs'
                : 'text-[#5B6B7F]'
            }`}
          >
            <ListDashes size={15} weight="bold" />
            <span>Catalogue ({filteredDatasets.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setMobileTab('map')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              mobileTab === 'map'
                ? 'bg-white text-[#0B2545] shadow-xs'
                : 'text-[#5B6B7F]'
            }`}
          >
            <MapTrifold size={15} weight="bold" />
            <span>Map Workspace</span>
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* LEFT CATALOGUE PANEL (32–36% Desktop Width, Independent Scroll) */}
      {/* ======================================================== */}
      <aside
        className={`w-full lg:w-[35%] xl:w-[34%] 2xl:w-[32%] h-full min-h-0 flex flex-col bg-white border-r border-[#E3E8EF] shadow-xs z-10 shrink-0 overflow-hidden ${
          mobileTab === 'list' ? 'flex' : 'hidden lg:flex'
        }`}
      >
        {/* Panel Header */}
        <div className="p-4 sm:p-5 border-b border-[#E3E8EF] shrink-0 space-y-3 bg-white">
          <div>
            <h1 className="text-xl font-bold text-[#0B2545] tracking-tight">
              Data & Catalogue
            </h1>
            <p className="text-xs text-[#5B6B7F] mt-0.5 leading-relaxed">
              Discover, inspect and access authoritative geospatial datasets across Abu Dhabi.
            </p>
          </div>

          {/* Search Field */}
          <div className="relative">
            <MagnifyingGlass
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1F5FAD]"
              weight="bold"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search datasets by title, keyword, entity or spatial coverage..."
              className="w-full h-10 pl-10 pr-9 rounded-xl border border-[#E3E8EF] focus:border-[#1F5FAD] focus:ring-2 focus:ring-[#1F5FAD]/15 outline-none text-xs text-[#14213D] bg-white transition-all placeholder:text-slate-400"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer p-0.5"
                title="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Active Drawn Spatial AOI Filter Indicator */}
          {spatialAoiFilter && (
            <div className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-[#0B2545] animate-fade-in shadow-2xs">
              <div className="flex items-center gap-1.5 min-w-0">
                <PencilSimpleLine size={14} className="text-[#FFC20E] shrink-0" weight="bold" />
                <span className="font-bold shrink-0">Drawn Area:</span>
                <span className="text-[#5B6B7F] truncate">
                  {spatialAoiFilter.areaKm2} km² · {filteredDatasets.length} {filteredDatasets.length === 1 ? 'dataset' : 'datasets'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSpatialAoiFilter(null)}
                className="text-slate-400 hover:text-[#0B2545] cursor-pointer p-0.5 rounded transition-colors"
                title="Clear Drawn AOI Filter"
              >
                <X size={13} weight="bold" />
              </button>
            </div>
          )}

          {/* Active Theme Filter Badge */}
          {selectedTheme !== 'All' && (
            <div className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-xs text-[#0B2545] animate-fade-in shadow-2xs">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="w-2 h-2 rounded-full bg-[#1F5FAD] shrink-0" />
                <span className="font-bold text-[#1F5FAD] shrink-0">Theme:</span>
                <span className="text-[#14213D] font-medium truncate">{selectedTheme}</span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedTheme('All')}
                className="text-slate-400 hover:text-[#0B2545] cursor-pointer p-0.5 rounded transition-colors"
                title="Reset to All Themes"
              >
                <X size={13} weight="bold" />
              </button>
            </div>
          )}

          {/* Filter Toolbar: Publisher, Classification, Format in a single row on desktop */}
          <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
            {/* Publisher Dropdown */}
            <select
              value={selectedPublisher}
              onChange={(e) => setSelectedPublisher(e.target.value)}
              className="w-full h-8 px-1.5 sm:px-2 rounded-lg border border-[#E3E8EF] bg-[#F8FAFC] text-[11px] sm:text-xs font-medium text-[#14213D] focus:border-[#1F5FAD] outline-none cursor-pointer truncate"
              title="Filter by Publisher"
            >
              <option value="All">All Publishers</option>
              <option value="DMT">DMT</option>
              <option value="EAD">EAD</option>
              <option value="ITC">ITC</option>
              <option value="DGE">DGE</option>
              <option value="ADDC">ADDC</option>
              <option value="SCAD">SCAD</option>
            </select>

            {/* Classification Dropdown */}
            <select
              value={selectedClassification}
              onChange={(e) => setSelectedClassification(e.target.value)}
              className="w-full h-8 px-1.5 sm:px-2 rounded-lg border border-[#E3E8EF] bg-[#F8FAFC] text-[11px] sm:text-xs font-medium text-[#14213D] focus:border-[#1F5FAD] outline-none cursor-pointer truncate"
              title="Filter by Classification"
            >
              <option value="All">All Classifications</option>
              <option value="Open Data">Open Data</option>
              <option value="Shared">Shared</option>
              <option value="Marketplace">Marketplace</option>
              <option value="Restricted">Restricted</option>
            </select>

            {/* Format Dropdown */}
            <select
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value)}
              className="w-full h-8 px-1.5 sm:px-2 rounded-lg border border-[#E3E8EF] bg-[#F8FAFC] text-[11px] sm:text-xs font-medium text-[#14213D] focus:border-[#1F5FAD] outline-none cursor-pointer truncate"
              title="Filter by Format"
            >
              <option value="All">All Formats</option>
              <option value="OGC API">OGC API</option>
              <option value="GeoJSON">GeoJSON</option>
              <option value="WFS">WFS / WMS</option>
              <option value="3D Tiles">3D Tiles</option>
              <option value="Shapefile">Shapefile</option>
              <option value="WMTS">WMTS</option>
            </select>
          </div>

          {/* Results Summary & Clear Action */}
          <div className="flex items-center justify-between text-xs pt-1">
            <div className="font-semibold text-[#0B2545] flex items-center gap-1.5">
              <span className="text-sm font-extrabold text-[#1F5FAD]">
                {filteredDatasets.length}
              </span>
              <span className="text-[#5B6B7F]">
                {filteredDatasets.length === 1 ? 'dataset found' : 'datasets available'}
              </span>
            </div>

            {activeFiltersCount > 0 && (
              <button
                type="button"
                onClick={clearAllFilters}
                className="text-xs font-semibold text-[#1F5FAD] hover:underline cursor-pointer flex items-center gap-1"
              >
                <span>Clear all filters</span>
                <span className="w-4 h-4 rounded-full bg-blue-100 text-[#1F5FAD] text-[10px] font-bold flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Scrollable Dataset Cards List */}
        <div className="flex-1 min-h-0 overflow-y-auto p-3 sm:p-4 space-y-2.5 focus:outline-none">
          {filteredDatasets.length === 0 ? (
            <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-[#E3E8EF] mt-4">
              <p className="text-sm font-bold text-[#0B2545]">
                {spatialAoiFilter
                  ? 'No datasets found in this area.'
                  : 'No datasets match your filters'}
              </p>
              <p className="text-xs text-[#5B6B7F] mt-1.5 leading-relaxed">
                {spatialAoiFilter
                  ? 'Try expanding the drawn area or clearing some filters.'
                  : 'Try searching for "mangrove", "parcels", or clearing active filters.'}
              </p>
              <button
                type="button"
                onClick={spatialAoiFilter ? () => setSpatialAoiFilter(null) : clearAllFilters}
                className="mt-4 px-4 py-2 rounded-xl bg-[#0B2545] text-white text-xs font-semibold hover:bg-[#13315C] transition-colors cursor-pointer shadow-xs"
              >
                {spatialAoiFilter ? 'Clear Spatial Filter' : 'Reset All Filters'}
              </button>
            </div>
          ) : (
            filteredDatasets.map((ds) => {
              const isSelected = selectedDataset?.id === ds.id;
              const isHovered = hoveredDatasetId === ds.id;
              const isSaved = isBookmarked(ds.id);

              return (
                <div
                  key={ds.id}
                  onClick={() => handleSelectDataset(ds)}
                  onMouseEnter={() => setHoveredDatasetId(ds.id)}
                  onMouseLeave={() => setHoveredDatasetId(null)}
                  className={`rounded-2xl p-4 border transition-all duration-200 cursor-pointer relative ${
                    isSelected
                      ? 'bg-amber-50/40 border-[#FFC20E] ring-2 ring-[#FFC20E]/30 shadow-md'
                      : isHovered
                      ? 'bg-white border-[#1F5FAD] shadow-sm'
                      : 'bg-white border-[#E3E8EF] hover:border-slate-300 shadow-2xs'
                  }`}
                >
                  {/* Top Row: Entity, Theme, Bookmark */}
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-1.5 flex-wrap min-w-0">
                      <span className="text-[10px] font-bold text-[#1F5FAD] uppercase tracking-wider bg-blue-50/80 px-2 py-0.5 rounded">
                        {ds.entityShort}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="text-xs text-[#5B6B7F] font-medium truncate">
                        {ds.theme}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => handleToggleBookmark(ds.id, e)}
                      className="p-1 text-slate-300 hover:text-[#FFC20E] transition-colors shrink-0 cursor-pointer"
                      title={isSaved ? 'Remove bookmark' : 'Bookmark dataset'}
                    >
                      <BookmarkSimple
                        size={17}
                        weight={isSaved ? 'fill' : 'regular'}
                        className={isSaved ? 'text-[#FFC20E]' : ''}
                      />
                    </button>
                  </div>

                  {/* Dataset Title */}
                  <h2 className="text-sm font-bold text-[#0B2545] leading-snug group-hover:text-[#1F5FAD] transition-colors">
                    {ds.title}
                  </h2>

                  {/* Concise Description */}
                  <p className="text-xs text-[#5B6B7F] line-clamp-2 mt-1.5 leading-relaxed">
                    {ds.description}
                  </p>

                  {/* Badges Row */}
                  <div className="flex items-center gap-1.5 mt-3 flex-wrap text-[10px]">
                    <span
                      className={`px-2 py-0.5 rounded-full font-semibold ${
                        ds.classification.includes('Open')
                          ? 'bg-emerald-50 text-[#1E9E6A]'
                          : ds.classification.includes('Restricted')
                          ? 'bg-amber-50 text-[#E8A317]'
                          : 'bg-blue-50 text-[#1F5FAD]'
                      }`}
                    >
                      {ds.classification}
                    </span>

                    {ds.audience?.[0] && (
                      <span className="px-2 py-0.5 rounded-full border border-[#E3E8EF] text-[#5B6B7F] font-medium">
                        {ds.audience[0]}
                      </span>
                    )}

                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-[#1E9E6A] font-semibold flex items-center gap-1 ml-auto">
                      <CheckCircle size={11} weight="fill" />
                      <span>Quality passed</span>
                    </span>
                  </div>

                  {/* Footer Row: Formats, Date & Selection Action */}
                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-1 overflow-hidden">
                      {ds.formats?.slice(0, 3).map((fmt) => (
                        <span
                          key={fmt}
                          className="font-mono text-[9px] px-1.5 py-0.2 bg-slate-100 rounded text-slate-600 shrink-0"
                        >
                          {fmt}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] text-slate-400 hidden sm:inline">
                        {ds.lastUpdated}
                      </span>
                      <Link
                        to={`/catalogue/${ds.slug}`}
                        onClick={(e) => e.stopPropagation()}
                        className="text-xs font-semibold text-[#1F5FAD] hover:text-[#0B2545] flex items-center gap-1"
                        title="View Full Metadata Record"
                      >
                        <span>Details</span>
                        <ArrowRight size={12} weight="bold" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Panel Footer */}
        <div className="p-3 border-t border-[#E3E8EF] bg-slate-50 text-[11px] text-[#5B6B7F] flex items-center justify-between shrink-0">
          <span>Illustrative demonstration data</span>
          <span className="font-semibold text-slate-700">UAE Sovereign Grid</span>
        </div>
      </aside>

      {/* ======================================================== */}
      {/* MAIN MAP WORKSPACE (Remaining Width, Full Available Height) */}
      {/* ======================================================== */}
      <section
        className={`flex-1 h-full min-h-0 relative overflow-hidden bg-[#E5E9F0] ${
          mobileTab === 'map' ? 'flex' : 'hidden lg:flex'
        }`}
        aria-label="Geographic Map Workspace"
      >
        <MapErrorBoundary>
          <CatalogueMap
            datasets={filteredDatasets}
            selectedDataset={selectedDataset}
            onSelectDataset={handleSelectDataset}
            hoveredDatasetId={hoveredDatasetId}
            spatialAoiFilter={spatialAoiFilter}
            onApplySpatialFilter={(filter) => {
              setSpatialAoiFilter(filter);
              if (filter.ids.size === 0) {
                addToast(
                  'Spatial Query Completed',
                  `No datasets found intersecting your drawn ${filter.areaKm2} km² area.`,
                  'info'
                );
              } else {
                addToast(
                  'Spatial Filter Applied',
                  `Filtered catalogue to ${filter.ids.size} ${filter.ids.size === 1 ? 'dataset' : 'datasets'} intersecting your drawn ${filter.areaKm2} km² area.`,
                  'success'
                );
              }
            }}
            onClearSpatialFilter={() => {
              setSpatialAoiFilter(null);
              addToast('Spatial Filter Cleared', 'Drawn AOI spatial filter removed.', 'info');
            }}
            selectedTheme={selectedTheme}
            onSelectTheme={(theme) => {
              setSelectedTheme(theme);
              if (theme !== 'All') {
                setSearchParams((prev) => {
                  const p = new URLSearchParams(prev);
                  p.set('theme', theme);
                  return p;
                });
              } else {
                setSearchParams((prev) => {
                  const p = new URLSearchParams(prev);
                  p.delete('theme');
                  return p;
                });
              }
            }}
          />
        </MapErrorBoundary>
      </section>
    </div>
  );
}

import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  MapTrifold,
  Stack,
  MagnifyingGlass
} from '@phosphor-icons/react';
import { useApp } from '../context/AppContext';
import { DATASETS } from '../data/datasetsData';
import CatalogueMap from '../components/catalogue/CatalogueMap';

const NAMED_LOCATIONS = {
  'abu dhabi': [24.4539, 54.3773],
  'abu dhabi island': [24.4667, 54.3667],
  'saadiyat': [24.5385, 54.4344],
  'saadiyat island': [24.5385, 54.4344],
  'yas': [24.4988, 54.6062],
  'yas island': [24.4988, 54.6062],
  'al maryah': [24.4980, 54.3880],
  'al maryah island': [24.4980, 54.3880],
  'al ain': [24.2075, 55.7447],
  'al dhafra': [23.6542, 53.7052],
  'eastern mangroves': [24.4445, 54.4285],
  'mangroves': [24.4445, 54.4285]
};

export default function MapViewer() {
  const { addToast } = useApp();
  const mapInstanceRef = useRef(null);

  const [basemap, setBasemap] = useState('satellite'); // 'satellite', 'vector', 'dark', 'cadastral'
  const [selectedDataset, setSelectedDataset] = useState(null);
  const [searchLocation, setSearchLocation] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('All');

  // Handle location search and fly to coordinates
  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    const query = searchLocation.trim().toLowerCase();
    if (!query) return;

    // Check named locations
    const foundLoc = Object.entries(NAMED_LOCATIONS).find(([key]) =>
      query.includes(key) || key.includes(query)
    );

    if (foundLoc && mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(foundLoc[1], 13, { duration: 1.2 });
      addToast(`Centered map on ${searchLocation}`, 'info');
      return;
    }

    // Check datasets
    const foundDs = DATASETS.find(
      (d) =>
        d.title.toLowerCase().includes(query) ||
        d.theme.toLowerCase().includes(query) ||
        d.entityShort.toLowerCase().includes(query)
    );

    if (foundDs) {
      setSelectedDataset(foundDs);
      if (foundDs.mapCenter && mapInstanceRef.current) {
        mapInstanceRef.current.flyTo(foundDs.mapCenter, 13, { duration: 1.2 });
      }
      addToast(`Found dataset: ${foundDs.title}`, 'success');
    } else {
      addToast(`No location or dataset matching "${searchLocation}"`, 'info');
    }
  };

  // Convert top bar basemap ID to CatalogueMap basemap ID
  const catalogueBasemapId =
    basemap === 'vector'
      ? 'canvas'
      : basemap === 'cadastral'
      ? 'topographic'
      : basemap;

  return (
    <div className="h-[calc(100vh-130px)] min-h-[640px] flex flex-col bg-[#0B2545] rounded-2xl border border-[#13315C] overflow-hidden shadow-xl relative">
      {/* Top Map Action Bar */}
      <div className="h-14 bg-[#0B2545]/95 backdrop-blur-md border-b border-[#13315C] px-4 flex items-center justify-between gap-4 z-20 shrink-0 text-white">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <MapTrifold size={20} className="text-[#FFC20E]" weight="bold" />
            <h1 className="text-sm font-bold text-white tracking-wide">
              AD-SDI Sovereign Map Viewer
            </h1>
          </div>
          <span className="hidden sm:inline text-[10px] font-mono bg-[#13315C] text-[#2BA6DE] px-2 py-0.5 rounded border border-[#2BA6DE]/30">
            EPSG:3997
          </span>
        </div>

        {/* Search location */}
        <form onSubmit={handleSearchSubmit} className="flex-1 max-w-md relative hidden md:block">
          <MagnifyingGlass size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
            placeholder="Search Abu Dhabi Island, Saadiyat, Yas, Al Ain, Al Dhafra..."
            className="w-full h-8 pl-8 pr-3 rounded-lg bg-[#13315C]/80 border border-[#1E4976] text-xs text-white placeholder:text-slate-400 outline-none focus:border-[#2BA6DE]"
          />
        </form>

        {/* Basemap Switcher + Panel toggles */}
        <div className="flex items-center gap-2">
          {/* Basemaps */}
          <div className="flex items-center bg-[#13315C] p-0.5 rounded-lg border border-[#1E4976] text-xs">
            {[
              { id: 'satellite', label: 'Satellite' },
              { id: 'vector', label: 'Vector' },
              { id: 'dark', label: 'Dark' },
              { id: 'cadastral', label: 'Cadastral' }
            ].map((bm) => (
              <button
                key={bm.id}
                type="button"
                onClick={() => {
                  setBasemap(bm.id);
                  addToast(`Basemap switched to ${bm.label}`, 'info');
                }}
                className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                  basemap === bm.id ? 'bg-[#1F5FAD] text-white font-bold shadow-xs' : 'text-slate-300 hover:text-white'
                }`}
              >
                {bm.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Real Geographic Map Workspace */}
      <div className="flex-1 relative overflow-hidden select-none">
        <CatalogueMap
          datasets={DATASETS}
          selectedDataset={selectedDataset}
          onSelectDataset={(ds) => setSelectedDataset(ds)}
          selectedTheme={selectedTheme}
          onSelectTheme={(theme) => setSelectedTheme(theme)}
          initialBasemap={catalogueBasemapId}
          showThemeDock={true}
          showToolbar={true}
          showDrawingTools={true}
          showLayersControl={true}
          showBasemapControl={true}
          showCoordinateBar={true}
          onMapReady={(map) => {
            mapInstanceRef.current = map;
          }}
          className="h-full"
        />
      </div>
    </div>
  );
}

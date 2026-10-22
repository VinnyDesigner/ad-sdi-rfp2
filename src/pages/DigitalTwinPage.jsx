import React, { useState } from 'react';
import {
  Cube,
  Sliders,
  Play,
  Pause,
  Compass,
  Plus,
  Minus,
  House,
  Broadcast,
  Lightning,
  Drop,
  Buildings,
  ArrowsClockwise,
  CheckCircle,
  Eye,
  EyeSlash
} from '@phosphor-icons/react';
import { useApp } from '../context/AppContext';

export default function DigitalTwinPage() {
  const { addToast } = useApp();

  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedTimelineYear, setSelectedTimelineYear] = useState(2027);
  const [activeUseCase, setActiveUseCase] = useState('Urban planning');
  const [scenarioCompare, setScenarioCompare] = useState('A'); // 'A' or 'B'
  const [layers, setLayers] = useState({
    terrain: true,
    buildings3D: true,
    bim: true,
    utilities: true,
    sensors: true,
    traffic: true,
    zoning: false
  });
  const [activeSensorTooltip, setActiveSensorTooltip] = useState(null);

  const toggleLayer = (key) => {
    setLayers((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const useCases = [
    'Urban planning',
    'Assets & facilities',
    'Mobility & environment',
    'Site context',
    'Resilience'
  ];

  return (
    <div className="relative w-full h-[calc(100vh-140px)] min-h-[720px] rounded-2xl overflow-hidden border border-white/10 bg-[#0A1628] text-white flex flex-col justify-between select-none">
      {/* 3D Scene Background Canvas */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/assets/digital_twin_waterfront.jpg"
          alt="Abu Dhabi 3D Digital Twin Simulation"
          className="w-full h-full object-cover opacity-75 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-transparent to-[#0A1628]/60" />

        {/* 3D Mesh Wireframe Overlays */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1200 800" preserveAspectRatio="none">
          {/* Highlighted Tower AD-BLD-000482 in #2BA6DE */}
          <polygon
            points="580,280 640,240 680,260 620,310"
            fill="rgba(43, 166, 222, 0.45)"
            stroke="#2BA6DE"
            strokeWidth="2.5"
            className="animate-pulse"
          />
          <line x1="580" y1="280" x2="580" y2="440" stroke="#2BA6DE" strokeWidth="2.5" />
          <line x1="640" y1="240" x2="640" y2="390" stroke="#2BA6DE" strokeWidth="2.5" />
          <line x1="680" y1="260" x2="680" y2="410" stroke="#2BA6DE" strokeWidth="2.5" />
          <line x1="620" y1="310" x2="620" y2="460" stroke="#2BA6DE" strokeWidth="2.5" />

          {/* Traffic flow gradients (green to amber) */}
          <path d="M200,600 C500,560 700,520 1100,530" fill="none" stroke="rgba(30, 158, 106, 0.7)" strokeWidth="6" />
          <path d="M400,650 C600,620 850,560 1150,550" fill="none" stroke="rgba(232, 163, 23, 0.7)" strokeWidth="6" />

          {/* Sensor Pins */}
          {layers.sensors && (
            <>
              <circle cx="560" cy="380" r="10" fill="#2BA6DE" stroke="#FFFFFF" strokeWidth="2" className="cursor-pointer" />
              <circle cx="560" cy="380" r="18" fill="none" stroke="#2BA6DE" strokeWidth="1.5" className="animate-ping" />

              <circle cx="720" cy="350" r="10" fill="#1E9E6A" stroke="#FFFFFF" strokeWidth="2" className="cursor-pointer" />
              <circle cx="820" cy="460" r="10" fill="#E8A317" stroke="#FFFFFF" strokeWidth="2" className="cursor-pointer" />
              <circle cx="480" cy="520" r="10" fill="#2BA6DE" stroke="#FFFFFF" strokeWidth="2" className="cursor-pointer" />
            </>
          )}
        </svg>

        {/* Active Sensor Tooltip per brief S10 */}
        <div
          onMouseEnter={() => setActiveSensorTooltip(true)}
          className="absolute top-[44%] left-[45%] bg-[#13233D]/95 backdrop-blur-md p-3 rounded-xl border border-white/20 text-xs text-white shadow-2xl z-30 pointer-events-auto"
        >
          <div className="flex items-center gap-2 font-bold text-[#FFC20E] mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>AQ-0117 · Air Quality Sensor</span>
          </div>
          <div className="space-y-0.5 text-[11px] text-slate-200">
            <div>PM2.5: <strong className="text-white">18 µg/m³ · Good</strong></div>
            <div>Custodian: <strong>EAD Environment Agency</strong></div>
            <div className="text-[10px] text-slate-400">Stream synced 12 s ago</div>
          </div>
        </div>
      </div>

      {/* Top Floating Controls */}
      <div className="relative z-20 p-4 lg:p-6 flex items-start justify-between gap-4 pointer-events-none">
        {/* Top-left: Pilot area pill */}
        <div className="pointer-events-auto bg-[#13233D]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 text-xs font-semibold flex items-center gap-2 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-[#2BA6DE] animate-pulse" />
          <span>Pilot Area · Abu Dhabi Waterfront District LOD2</span>
        </div>

        {/* Top-centre: Segmented Use-Case Selector per brief S10 */}
        <div className="pointer-events-auto hidden md:flex flex-col items-center gap-2">
          <div className="bg-[#13233D]/95 backdrop-blur-md p-1 rounded-xl border border-white/15 shadow-xl flex items-center gap-1">
            {useCases.map((uc) => (
              <button
                key={uc}
                onClick={() => setActiveUseCase(uc)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeUseCase === uc
                    ? 'bg-[#2BA6DE] text-white shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {uc}
              </button>
            ))}
          </div>

          {/* Scenario Comparison Pills per brief S10 */}
          <div className="bg-[#13233D]/80 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10 flex items-center gap-3 text-xs">
            <span className="text-slate-400">Scenario:</span>
            <button
              onClick={() => setScenarioCompare('A')}
              className={`font-semibold px-2 py-0.5 rounded ${scenarioCompare === 'A' ? 'bg-[#FFC20E] text-[#0B2545]' : 'text-slate-300'}`}
            >
              A: Approved Plan
            </button>
            <span className="text-slate-500">|</span>
            <button
              onClick={() => setScenarioCompare('B')}
              className={`font-semibold px-2 py-0.5 rounded ${scenarioCompare === 'B' ? 'bg-[#FFC20E] text-[#0B2545]' : 'text-slate-300'}`}
            >
              B: Proposed Amendment
            </button>
          </div>
        </div>

        {/* Top-right: Performance indicator */}
        <div className="pointer-events-auto bg-[#13233D]/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-xs font-mono flex items-center gap-2">
          <span className="text-emerald-400 font-bold">60 FPS</span>
          <span className="text-slate-400">•</span>
          <span className="text-slate-200">168,540 LOD2 Meshes</span>
        </div>
      </div>

      {/* Middle Floating Panels (Left Layers 264px, Right Asset 320px) */}
      <div className="relative z-20 px-4 lg:px-6 flex items-start justify-between gap-6 pointer-events-none flex-1 my-auto">
        {/* Left: Layers Panel (264px per brief S10) */}
        <div className="pointer-events-auto w-64 bg-[#13233D]/92 backdrop-blur-xl p-4 rounded-2xl border border-white/10 shadow-2xl text-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <span className="font-bold uppercase tracking-wider text-slate-300">Twin Layers</span>
            <span className="text-[10px] text-slate-400 font-mono">OGC 3D Tiles</span>
          </div>

          <div className="space-y-2">
            {[
              { id: 'terrain', label: 'Terrain & Elevation' },
              { id: 'buildings3D', label: '3D Building Massing' },
              { id: 'bim', label: 'BIM Detailed Models' },
              { id: 'utilities', label: 'Underground Utilities' },
              { id: 'sensors', label: 'Live IoT Sensor Mesh' },
              { id: 'traffic', label: 'Real-Time Traffic Flow' },
              { id: 'zoning', label: 'Municipal Planning Zones' }
            ].map((layer) => (
              <label
                key={layer.id}
                className="flex items-center justify-between p-1.5 rounded-lg hover:bg-white/5 cursor-pointer text-slate-200"
              >
                <span>{layer.label}</span>
                <input
                  type="checkbox"
                  checked={layers[layer.id]}
                  onChange={() => toggleLayer(layer.id)}
                  className="rounded text-[#2BA6DE] focus:ring-[#2BA6DE]"
                />
              </label>
            ))}
          </div>

          {/* Opacity Sliders */}
          <div className="pt-2 border-t border-white/10 space-y-2">
            <div>
              <div className="flex justify-between text-[11px] text-slate-400 mb-0.5">
                <span>Building Opacity</span>
                <span className="font-mono">85%</span>
              </div>
              <input type="range" min="20" max="100" defaultValue="85" className="w-full accent-[#2BA6DE] h-1" />
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400 mb-0.5">
                <span>Subsurface Cut Depth</span>
                <span className="font-mono">-12 m</span>
              </div>
              <input type="range" min="0" max="30" defaultValue="12" className="w-full accent-[#FFC20E] h-1" />
            </div>
          </div>
        </div>

        {/* Right: Selected Asset Panel (320px per brief S10) */}
        <div className="pointer-events-auto w-80 bg-[#13233D]/92 backdrop-blur-xl p-5 rounded-2xl border border-white/10 shadow-2xl text-xs space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-[#2BA6DE] font-bold">
                IFC BIM LINKED
              </span>
              <span className="flex items-center gap-1 text-emerald-400 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Live Telemetry
              </span>
            </div>
            <h3 className="text-base font-extrabold text-white mt-2">Tower AD-BLD-000482</h3>
            <p className="text-[11px] text-slate-300">Al Maryah Waterfront Commercial Core</p>
          </div>

          {/* Asset Stats */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
              <span className="text-[10px] text-slate-400 block">Height Above Ground</span>
              <span className="text-sm font-bold text-white font-mono">142 m</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
              <span className="text-[10px] text-slate-400 block">Zoning / Use</span>
              <span className="text-sm font-bold text-white">Mixed Commercial</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
              <span className="text-[10px] text-slate-400 block">Current Energy Load</span>
              <span className="text-sm font-bold text-emerald-400 font-mono">1,240 kW</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
              <span className="text-[10px] text-slate-400 block">Occupancy Rate</span>
              <span className="text-sm font-bold text-[#FFC20E] font-mono">68%</span>
            </div>
          </div>

          {/* Mini line chart PM2.5 last 24h per brief S10 */}
          <div className="p-3 rounded-xl bg-white/5 border border-white/5">
            <div className="flex items-center justify-between text-[11px] mb-1.5">
              <span className="text-slate-300">PM2.5 Ambient Level (24h)</span>
              <span className="font-mono text-emerald-400 font-bold">18 µg/m³</span>
            </div>
            <div className="h-10 flex items-end gap-1">
              {[12, 14, 18, 22, 20, 16, 15, 18, 19, 17, 18].map((val, i) => (
                <div
                  key={i}
                  className="flex-1 bg-[#2BA6DE]/80 rounded-t"
                  style={{ height: `${(val / 25) * 100}%` }}
                />
              ))}
            </div>
          </div>

          {/* Buttons: Shadow analysis, Compare scenarios, Open BIM per brief */}
          <div className="space-y-2 pt-2 border-t border-white/10">
            <button
              onClick={() => addToast('Shadow Simulation Run', 'Calculating equinox sun trajectory solar vectors.', 'info')}
              className="w-full py-2 rounded-xl bg-[#2BA6DE] hover:bg-[#2092c7] text-white font-bold text-xs shadow-md transition-colors"
            >
              Run Shadow & Solar Analysis
            </button>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => addToast('Scenarios Compared', 'Highlighting volumetric height differences.', 'info')}
                className="py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-slate-200 text-xs font-semibold"
              >
                Compare Scenarios
              </button>
              <button
                onClick={() => addToast('BIM Model Loaded', 'Streaming IFC geometry into WebGL canvas.', 'info')}
                className="py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-slate-200 text-xs font-semibold"
              >
                Open BIM IFC
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom 4D Timeline Slider (Full width 64px per brief S10) */}
      <div className="relative z-20 bg-[#13233D]/95 backdrop-blur-xl border-t border-white/10 px-6 py-3 flex items-center justify-between gap-6 pointer-events-auto">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPlaying((prev) => !prev)}
            className="w-9 h-9 rounded-full bg-[#FFC20E] text-[#0B2545] flex items-center justify-center font-bold shadow-md hover:scale-105 transition-all"
            title={isPlaying ? 'Pause' : 'Play 4D simulation'}
          >
            {isPlaying ? <Pause size={16} weight="fill" /> : <Play size={16} weight="fill" />}
          </button>
          <div className="text-xs">
            <span className="font-bold text-white block">4D Temporal Evolution</span>
            <span className="text-[10px] text-slate-400">Masterplan phasing 2020 → 2035</span>
          </div>
        </div>

        {/* Timeline Slider with Sep 2027 Gold Marker */}
        <div className="flex-1 max-w-2xl mx-4">
          <div className="relative flex items-center">
            <input
              type="range"
              min="2020"
              max="2035"
              step="1"
              value={selectedTimelineYear}
              onChange={(e) => setSelectedTimelineYear(parseInt(e.target.value))}
              className="w-full accent-[#FFC20E] h-2 bg-slate-700 rounded-lg cursor-pointer"
            />
            {/* Today marker at 2027 */}
            <div
              className="absolute -top-6 text-[10px] font-bold text-[#0B2545] bg-[#FFC20E] px-1.5 py-0.5 rounded shadow-sm -translate-x-1/2 pointer-events-none"
              style={{ left: `${((selectedTimelineYear - 2020) / (2035 - 2020)) * 100}%` }}
            >
              {selectedTimelineYear === 2027 ? 'Now · Sep 2027' : `${selectedTimelineYear}`}
            </div>
          </div>
          <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
            <span>2020</span>
            <span>2024</span>
            <span className="text-[#FFC20E] font-bold">2027 (Baseline)</span>
            <span>2030 (Planned)</span>
            <span>2035</span>
          </div>
        </div>

        {/* Bottom Status Chip & Controls per brief */}
        <div className="flex items-center gap-4 text-xs shrink-0">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>46 / 48 live sensors online</span>
          </div>

          <div className="flex items-center gap-1 bg-white/10 rounded-lg p-1">
            <button onClick={() => addToast('Zoom In', '', 'info')} className="p-1 hover:bg-white/10 rounded"><Plus size={14} /></button>
            <button onClick={() => addToast('Zoom Out', '', 'info')} className="p-1 hover:bg-white/10 rounded"><Minus size={14} /></button>
            <button onClick={() => addToast('Reset View', '', 'info')} className="p-1 hover:bg-white/10 rounded"><House size={14} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}

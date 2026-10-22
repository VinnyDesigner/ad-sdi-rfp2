import React, { useState } from 'react';
import {
  Sparkle,
  SlidersHorizontal,
  CheckCircle,
  Warning,
  ArrowsLeftRight,
  CaretRight,
  ShieldCheck,
  FileArrowDown,
  PaperPlaneRight,
  Info,
  Clock,
  Cpu
} from '@phosphor-icons/react';
import { useApp } from '../context/AppContext';

export default function GeoAiStudio() {
  const { addToast } = useApp();

  const [activeTab, setActiveTab] = useState('change-detection');
  const [swipePosition, setSwipePosition] = useState(50); // percentage 0 to 100
  const [confidenceThreshold, setConfidenceThreshold] = useState(0.80);
  const [minArea, setMinArea] = useState(25);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedChangeId, setSelectedChangeId] = useState('chg-01');

  const detectedChanges = [
    { id: 'chg-01', type: 'New Building', confidence: 0.96, area: '1,240 m²', status: 'Pending Review', color: '#7B4FD6', date: 'Aug 2027' },
    { id: 'chg-02', type: 'New Building', confidence: 0.94, area: '850 m²', status: 'Pending Review', color: '#7B4FD6', date: 'Aug 2027' },
    { id: 'chg-03', type: 'Extension', confidence: 0.89, area: '310 m²', status: 'Pending Review', color: '#0E9F8E', date: 'Aug 2027' },
    { id: 'chg-04', type: 'Demolition', confidence: 0.92, area: '620 m²', status: 'Verified', color: '#E07B24', date: 'Aug 2027' },
    { id: 'chg-05', type: 'New Building', confidence: 0.88, area: '1,120 m²', status: 'Pending Review', color: '#7B4FD6', date: 'Aug 2027' }
  ];

  const handleRunAnalysis = () => {
    setIsAnalyzing(true);
    addToast('Inferencing Initialized', 'Running multi-temporal Siamese ResNet-50 change detection inference...', 'info');
    setTimeout(() => {
      setIsAnalyzing(false);
      addToast('Analysis Complete', 'Detected 214 building alterations with 0.91 F1 score.', 'success');
    }, 1200);
  };

  const handleSendToReview = () => {
    addToast('Submitted to Review Queue', '214 detections routed to DMT Municipal Inspector queue.', 'success');
  };

  const handlePublish = () => {
    addToast('Published to Geospatial Feed', 'Change detection vector stream published to Abu Dhabi Open & Municipal API.', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Page Header (Brief S06) */}
      <div className="bg-white rounded-2xl p-6 border border-[#E3E8EF] shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#7B4FD6]" />
              <span className="text-xs font-bold text-[#7B4FD6] uppercase tracking-wider">Module B · GeoAI & Spatial Intelligence</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B2545] tracking-tight">
              GeoAI Studio: Change Detection
            </h1>
            <p className="text-xs sm:text-sm text-[#5B6B7F] mt-1">
              Automated computer vision inferencing on dual-epoch high-resolution satellite imagery across the Emirate.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-purple-50 text-[#7B4FD6] border border-purple-200 flex items-center gap-1.5">
              <Cpu size={16} weight="bold" />
              <span>Sovereign GPU Cluster Online</span>
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-6 border-b border-[#E3E8EF] mt-6 text-xs sm:text-sm font-semibold">
          <button
            onClick={() => setActiveTab('change-detection')}
            className={`py-3 relative ${activeTab === 'change-detection' ? 'text-[#0B2545]' : 'text-[#5B6B7F] hover:text-[#0B2545]'}`}
          >
            <span>Change Detection</span>
            {activeTab === 'change-detection' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#7B4FD6] rounded-full" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('feature-extraction')}
            className={`py-3 relative ${activeTab === 'feature-extraction' ? 'text-[#0B2545]' : 'text-[#5B6B7F] hover:text-[#0B2545]'}`}
          >
            <span>Feature Extraction</span>
          </button>
          <button
            onClick={() => setActiveTab('models')}
            className={`py-3 relative ${activeTab === 'models' ? 'text-[#0B2545]' : 'text-[#5B6B7F] hover:text-[#0B2545]'}`}
          >
            <span>Model Registry</span>
          </button>
        </div>
      </div>

      {/* Use-case strip (56px per brief S06) */}
      <div className="bg-white rounded-2xl p-4 border border-[#E3E8EF] shadow-xs flex items-center justify-between gap-3 overflow-x-auto">
        <div className="text-xs font-bold text-[#0B2545] uppercase tracking-wider shrink-0 mr-2">
          Model Pipeline:
        </div>
        <div className="flex items-center gap-2 min-w-[680px] flex-1">
          <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-slate-100 text-[#5B6B7F]">
            Candidate 12
          </span>
          <CaretRight size={14} className="text-slate-300" />
          <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-slate-100 text-[#5B6B7F]">
            Scored 8
          </span>
          <CaretRight size={14} className="text-slate-300" />
          <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-slate-100 text-[#5B6B7F]">
            Approved 5
          </span>
          <CaretRight size={14} className="text-slate-300" />
          <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-purple-50 text-[#7B4FD6] border border-purple-200">
            In development 3
          </span>
          <CaretRight size={14} className="text-slate-300" />
          <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#1E9E6A] text-white flex items-center gap-1 shadow-xs">
            <CheckCircle size={14} weight="fill" /> Production 2
          </span>
        </div>
      </div>

      {/* Three-Zone Body (Config panel 300px, Map flex, Results panel 340px per brief S06) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Config Panel (300px ~ 3 cols) */}
        <div className="lg:col-span-3 bg-white rounded-2xl p-5 border border-[#E3E8EF] shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E3E8EF]">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#0B2545]">Analysis Config</h2>
            <SlidersHorizontal size={16} className="text-[#7B4FD6]" />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#14213D] mb-1">Model Name</label>
            <div className="flex items-center justify-between p-2 rounded-lg bg-[#F5F7FA] text-xs font-medium">
              <span className="truncate">Building Change v3.2</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold shrink-0">
                Production
              </span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#14213D] mb-1">Use Case Domain</label>
            <div className="p-2 rounded-lg bg-[#F5F7FA] text-xs font-medium text-[#14213D]">
              New construction monitoring
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#14213D] mb-1">Target Geographic Area</label>
            <div className="p-2 rounded-lg bg-[#F5F7FA] text-xs font-medium text-[#14213D]">
              Khalifa City – South-West Sector
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-[10px] text-[#5B6B7F] block">Image Epoch T1</span>
              <span className="font-bold text-[#0B2545]">Jan 2027 (0.5m)</span>
            </div>
            <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-[10px] text-[#5B6B7F] block">Image Epoch T2</span>
              <span className="font-bold text-[#0B2545]">Aug 2027 (0.5m)</span>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-semibold text-[#14213D]">Confidence Threshold</span>
              <span className="font-mono font-bold text-[#7B4FD6]">{confidenceThreshold.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="0.95"
              step="0.05"
              value={confidenceThreshold}
              onChange={(e) => setConfidenceThreshold(parseFloat(e.target.value))}
              className="w-full accent-[#7B4FD6]"
            />
          </div>

          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-semibold text-[#14213D]">Minimum Alteration Area</span>
              <span className="font-mono font-bold text-[#7B4FD6]">{minArea} m²</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              step="5"
              value={minArea}
              onChange={(e) => setMinArea(parseInt(e.target.value))}
              className="w-full accent-[#7B4FD6]"
            />
          </div>

          <button
            onClick={handleRunAnalysis}
            disabled={isAnalyzing}
            className="w-full py-2.5 rounded-xl text-xs font-bold bg-[#7B4FD6] hover:bg-[#683cc5] text-white transition-colors shadow-xs flex items-center justify-center gap-2"
          >
            <Sparkle size={16} weight="fill" />
            <span>{isAnalyzing ? 'Running Inference...' : 'Run Analysis'}</span>
          </button>

          <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1.5 justify-center pt-1">
            <CheckCircle size={14} weight="fill" />
            <span>✓ Completed in 4 min 12 s</span>
          </div>
        </div>

        {/* Map Zone with Swipe Handle (flex ~ 5 cols) */}
        <div className="lg:col-span-5 bg-[#0A1628] rounded-2xl border border-[#E3E8EF] shadow-md overflow-hidden relative h-[560px] flex flex-col">
          {/* Top Bar */}
          <div className="p-3 bg-[#0B2545]/90 backdrop-blur-sm border-b border-white/10 flex items-center justify-between text-xs text-white z-20">
            <span className="font-semibold">Before (Jan 2027) vs After (Aug 2027)</span>
            <span className="text-[11px] font-mono text-[#FFC20E]">Swipe to Compare</span>
          </div>

          {/* Swipe Container */}
          <div className="relative flex-1 overflow-hidden select-none">
            {/* Right / After Image (Full width background) */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('/assets/geoai_after.jpg')` }}
            />

            {/* Left / Before Image (Clipped by swipe percentage) */}
            <div
              className="absolute inset-0 bg-cover bg-center border-r-2 border-white shadow-2xl"
              style={{
                backgroundImage: `url('/assets/geoai_before.jpg')`,
                width: `${swipePosition}%`
              }}
            />

            {/* Polygons overlay on top */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 500 500" preserveAspectRatio="none">
              {/* New building #7B4FD6 */}
              <polygon
                points="210,140 290,130 310,210 230,220"
                fill="rgba(123, 79, 214, 0.45)"
                stroke="#7B4FD6"
                strokeWidth="2.5"
              />
              {/* Demolition #E07B24 */}
              <polygon
                points="120,280 180,270 190,340 130,350"
                fill="rgba(224, 123, 36, 0.45)"
                stroke="#E07B24"
                strokeWidth="2"
              />
              {/* Extension #0E9F8E */}
              <polygon
                points="340,300 420,290 440,360 360,370"
                fill="rgba(14, 159, 142, 0.45)"
                stroke="#0E9F8E"
                strokeWidth="2"
              />
            </svg>

            {/* Selected Polygon Popup per brief S06 */}
            <div className="absolute top-20 right-6 bg-[#0B2545]/95 backdrop-blur-md p-3.5 rounded-xl border border-white/20 text-xs text-white shadow-2xl z-20 max-w-[220px]">
              <div className="flex items-center gap-1.5 font-bold text-[#FFC20E] mb-1">
                <span className="w-2 h-2 rounded-full bg-[#7B4FD6]" />
                <span>New Building Detection</span>
              </div>
              <div className="space-y-0.5 text-[11px] text-slate-200">
                <div>Confidence: <strong className="text-white font-mono">0.96</strong></div>
                <div>Area: <strong className="text-white font-mono">1,240 m²</strong></div>
                <div>Status: <span className="text-amber-400 font-semibold">Pending Review</span></div>
              </div>
            </div>

            {/* Interactive Swipe Handle */}
            <div
              className="absolute top-0 bottom-0 z-30 cursor-ew-resize flex items-center justify-center -ml-3"
              style={{ left: `${swipePosition}%` }}
              onMouseDown={(e) => {
                const rect = e.currentTarget.parentElement.getBoundingClientRect();
                const onMouseMove = (moveEvent) => {
                  const x = moveEvent.clientX - rect.left;
                  const newPercent = Math.max(5, Math.min(95, (x / rect.width) * 100));
                  setSwipePosition(newPercent);
                };
                const onMouseUp = () => {
                  window.removeEventListener('mousemove', onMouseMove);
                  window.removeEventListener('mouseup', onMouseUp);
                };
                window.addEventListener('mousemove', onMouseMove);
                window.addEventListener('mouseup', onMouseUp);
              }}
            >
              <div className="w-6 h-6 rounded-full bg-white text-[#0B2545] shadow-xl border border-slate-300 flex items-center justify-center">
                <ArrowsLeftRight size={14} weight="bold" />
              </div>
            </div>

            {/* Legend bottom-left per brief S06 */}
            <div className="absolute bottom-3 left-3 bg-[#0B2545]/90 backdrop-blur-md p-2.5 rounded-lg border border-white/10 text-[11px] text-white z-20 space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded bg-[#7B4FD6]" />
                <span>New construction (168)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded bg-[#E07B24]" />
                <span>Demolition (21)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded bg-[#0E9F8E]" />
                <span>Extension (25)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Results Panel (340px ~ 4 cols per brief S06) */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-5 border border-[#E3E8EF] shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E3E8EF]">
            <h2 className="text-base font-extrabold text-[#0B2545]">214 Changes Detected</h2>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">
              Threshold Met
            </span>
          </div>

          {/* 3 Count Tiles per brief */}
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2.5 rounded-xl bg-purple-50 border border-purple-100">
              <span className="block text-lg font-extrabold text-[#7B4FD6] font-mono">168</span>
              <span className="text-[10px] text-[#5B6B7F] font-semibold">New</span>
            </div>
            <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-100">
              <span className="block text-lg font-extrabold text-[#E07B24] font-mono">21</span>
              <span className="text-[10px] text-[#5B6B7F] font-semibold">Demolished</span>
            </div>
            <div className="p-2.5 rounded-xl bg-teal-50 border border-teal-100">
              <span className="block text-lg font-extrabold text-[#0E9F8E] font-mono">25</span>
              <span className="text-[10px] text-[#5B6B7F] font-semibold">Extensions</span>
            </div>
          </div>

          {/* Metrics row: Precision 0.93, Recall 0.89, F1 0.91 */}
          <div className="p-3 rounded-xl bg-[#F5F7FA] text-xs flex items-center justify-between font-mono">
            <div>Precision: <strong className="text-[#0B2545]">0.93</strong></div>
            <div>Recall: <strong className="text-[#0B2545]">0.89</strong></div>
            <div>F1: <strong className="text-purple-700 font-bold">0.91</strong></div>
          </div>

          {/* List of 5 detections */}
          <div className="space-y-2">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#5B6B7F]">
              Top Confidence Detections
            </div>
            {detectedChanges.map((chg) => (
              <div
                key={chg.id}
                onClick={() => setSelectedChangeId(chg.id)}
                className={`p-2.5 rounded-xl border text-xs flex items-center justify-between cursor-pointer transition-all ${
                  selectedChangeId === chg.id
                    ? 'border-[#7B4FD6] bg-purple-50/50'
                    : 'border-[#E3E8EF] hover:bg-[#F9FBFD]'
                }`}
              >
                <div>
                  <div className="font-bold text-[#14213D] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: chg.color }} />
                    {chg.type}
                  </div>
                  <div className="text-[10px] text-[#5B6B7F] font-mono mt-0.5">{chg.area} · {chg.date}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold font-mono text-[#0B2545]">{(chg.confidence * 100).toFixed(0)}%</div>
                  <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-slate-100 text-[#5B6B7F]">
                    {chg.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Action buttons per brief S06 */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <button
              onClick={handleSendToReview}
              className="w-full py-2.5 rounded-xl text-xs font-bold bg-[#1F5FAD] hover:bg-[#164b8a] text-white transition-colors shadow-xs flex items-center justify-center gap-2"
            >
              <PaperPlaneRight size={14} weight="bold" />
              <span>Send to Review Queue</span>
            </button>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handlePublish}
                className="py-2 rounded-xl text-xs font-semibold bg-white hover:bg-slate-50 text-[#0B2545] border border-[#E3E8EF]"
              >
                Publish Layer
              </button>
              <button
                onClick={() => addToast('Export Complete', 'Detections exported as GeoJSON FeatureCollection.', 'info')}
                className="py-2 rounded-xl text-xs font-semibold text-[#5B6B7F] hover:bg-slate-100"
              >
                Export GeoJSON
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Model Card Strip (88px along bottom per brief S06) */}
      <div className="bg-[#0B2545] text-white rounded-2xl p-4 lg:p-5 border border-[#13315C] shadow-sm flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="font-mono text-[#FFC20E] font-bold">
            Registry ID: MR-B-007
          </div>
          <span className="text-slate-400">•</span>
          <span>Owner: <strong>AD-SDI GeoAI Team</strong></span>
          <span className="text-slate-400">•</span>
          <span>Trained on <strong>14,200</strong> labeled aerial pairs</span>
          <span className="text-slate-400">•</span>
          <span>Evaluated <strong>30 Aug 2027</strong></span>
          <span className="text-slate-400">•</span>
          <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
            <CheckCircle size={14} weight="fill" /> Drift: Stable
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            Deployment Approved
          </span>
          <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
            Human Review Required
          </span>
        </div>
      </div>
    </div>
  );
}

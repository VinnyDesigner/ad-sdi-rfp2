import React, { useState } from 'react';
import {
  ChatCircleDots,
  Sparkle,
  PaperPlaneRight,
  Microphone,
  ThumbsUp,
  ThumbsDown,
  DownloadSimple,
  BookmarkSimple,
  Info,
  MapPin,
  CaretDown,
  CaretUp,
  CheckCircle,
  Database
} from '@phosphor-icons/react';
import { useApp } from '../context/AppContext';

export default function GeoAiAssistant() {
  const { addToast, lang, toggleLang } = useApp();

  const [inputMessage, setInputMessage] = useState('');
  const [howIGotThisOpen, setHowIGotThisOpen] = useState(true);
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [messages, setMessages] = useState([
    {
      id: 'msg-1',
      sender: 'user',
      text: 'Show schools within 500 m of high-traffic roads in Al Ain and count them by district.'
    },
    {
      id: 'msg-2',
      sender: 'assistant',
      headline: '47 schools in 9 districts are within 500 m of high-traffic roads.',
      steps: [
        'Parsed natural language spatial query and extracted spatial predicates (within 500m) and aggregation targets (district).',
        'Selected verified custodial layers from AD-SDI Clearinghouse: ADEK Schools, DMT Classified Traffic Artery Network, and DMT Municipal Sectors.',
        'Applied Euclidean geodesic 500-meter buffer polygon around classified dual-carriageway arterial centerlines in EPSG:3997.',
        'Executed spatial intersection between school centroid point geometries and active buffer envelope.',
        'Grouped intersecting school records by statutory municipal district administrative boundary code.'
      ],
      sources: [
        { name: 'Schools', entity: 'ADEK', updated: 'Aug 2027', classification: 'Shared' },
        { name: 'Road Traffic', entity: 'DMT', updated: 'Sep 2027', classification: 'Shared' },
        { name: 'Districts', entity: 'DMT', updated: 'Jul 2027', classification: 'Open' }
      ],
      districtData: [
        { district: 'Al Jimi', count: 8 },
        { district: 'Al Muwaiji', count: 7 },
        { district: 'Al Maqam', count: 6 },
        { district: 'Zakher', count: 5 },
        { district: 'Falaj Hazza', count: 5 }
      ]
    }
  ]);

  const suggestedPrompts = [
    'Nearest health centres to Khalifa City',
    'Which datasets show mangroves?',
    'Solar irradiance rooftop potential in Al Dhafra'
  ];

  const handleSendMessage = (textToSend) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    const userMsg = { id: `msg-${Date.now()}`, sender: 'user', text };
    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');

    addToast('Assistant Processing', 'Executing spatial query across Abu Dhabi knowledge graph...', 'info');

    setTimeout(() => {
      const botMsg = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        headline: `Analysis query resolved for: "${text}"`,
        steps: [
          'Identified relevant spatial entities in AD-SDI semantic catalog.',
          'Applied sovereign access controls and filtered permitted datasets.',
          'Synthesized spatial coordinates with EPSG:3997 national projection.'
        ],
        sources: [
          { name: 'Municipal Facilities', entity: 'DMT', updated: 'Aug 2027', classification: 'Open' },
          { name: 'Health Facilities', entity: 'DoH', updated: 'Sep 2027', classification: 'Shared' }
        ],
        districtData: [
          { district: 'Sector 1', count: 4 },
          { district: 'Sector 2', count: 3 },
          { district: 'Sector 3', count: 2 }
        ]
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 900);
  };

  return (
    <div className="h-[calc(100vh-140px)] min-h-[640px] flex flex-col lg:flex-row gap-6">
      {/* Left Chat Panel (480px per brief S07) */}
      <div className="w-full lg:w-[480px] bg-white rounded-2xl border border-[#E3E8EF] shadow-xs flex flex-col overflow-hidden shrink-0">
        {/* Chat Panel Header */}
        <div className="p-4 border-b border-[#E3E8EF] flex items-center justify-between bg-[#F5F7FA]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-[#7B4FD6] flex items-center justify-center">
              <Sparkle size={18} weight="fill" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#0B2545] flex items-center gap-2">
                GeoAI Assistant
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
                  Approved Model
                </span>
              </h2>
              <p className="text-[11px] text-[#5B6B7F]">Natural language spatial reasoning engine</p>
            </div>
          </div>

          <button
            onClick={toggleLang}
            className="text-xs font-semibold px-2 py-1 rounded bg-white text-[#0B2545] border border-[#E3E8EF]"
          >
            {lang === 'en' ? 'ع' : 'EN'}
          </button>
        </div>

        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => {
            if (msg.sender === 'user') {
              return (
                <div key={msg.id} className="flex justify-end">
                  <div className="bg-[#0B2545] text-white p-3.5 rounded-2xl rounded-tr-xs text-xs max-w-[85%] shadow-sm leading-relaxed">
                    {msg.text}
                  </div>
                </div>
              );
            }

            return (
              <div key={msg.id} className="bg-[#F9FBFD] p-4 rounded-2xl border border-[#E3E8EF] shadow-xs space-y-3.5 text-xs">
                {/* Bold Answer Line per brief S07 */}
                <div className="font-extrabold text-sm text-[#0B2545] leading-snug">
                  {msg.headline}
                </div>

                {/* Collapsible 'How I got this' per brief */}
                <div className="border border-[#E3E8EF] rounded-xl overflow-hidden bg-white">
                  <button
                    onClick={() => setHowIGotThisOpen((prev) => !prev)}
                    className="w-full px-3 py-2 flex items-center justify-between text-xs font-bold text-[#14213D] bg-slate-50 hover:bg-slate-100"
                  >
                    <span className="flex items-center gap-1.5 text-[#1F5FAD]">
                      <Sparkle size={14} weight="fill" />
                      <span>How I got this (5 steps)</span>
                    </span>
                    {howIGotThisOpen ? <CaretUp size={14} /> : <CaretDown size={14} />}
                  </button>

                  {howIGotThisOpen && (
                    <div className="p-3 space-y-2 text-[11px] text-[#5B6B7F] border-t border-[#E3E8EF]">
                      {msg.steps.map((st, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <span className="w-4 h-4 rounded-full bg-blue-100 text-[#1F5FAD] font-mono font-bold flex items-center justify-center shrink-0 text-[10px]">
                            {idx + 1}
                          </span>
                          <span className="leading-tight text-[#14213D]">{st}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Source chips with hover tooltip per brief S07 */}
                <div>
                  <div className="text-[10px] font-bold text-[#5B6B7F] uppercase tracking-wider mb-1.5">
                    Authoritative Source Datasets
                  </div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {msg.sources.map((src) => (
                      <div
                        key={src.name}
                        onMouseEnter={() => setActiveTooltip(src.name)}
                        onMouseLeave={() => setActiveTooltip(null)}
                        className="relative"
                      >
                        <span className="px-2.5 py-1 rounded-full bg-white border border-[#E3E8EF] text-[11px] font-semibold text-[#0B2545] flex items-center gap-1.5 shadow-2xs hover:border-[#1F5FAD] cursor-pointer">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#1E9E6A]" />
                          <span>{src.name} ({src.entity})</span>
                        </span>
                        {activeTooltip === src.name && (
                          <div className="absolute bottom-full mb-1 left-0 bg-[#0B2545] text-white p-2 rounded-lg text-[10px] whitespace-nowrap z-30 shadow-xl">
                            {src.name} · Custodian: {src.entity} · Updated {src.updated}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mini Table 5 rows per brief S07 */}
                <div className="border border-[#E3E8EF] rounded-xl overflow-hidden bg-white">
                  <table className="w-full text-[11px] text-left">
                    <thead className="bg-[#F5F7FA] font-bold text-[#5B6B7F] border-b border-[#E3E8EF]">
                      <tr>
                        <th className="p-2">Municipal District</th>
                        <th className="p-2 text-right">Schools within 500m</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {msg.districtData.map((d) => (
                        <tr key={d.district}>
                          <td className="p-2 font-medium text-[#14213D]">{d.district}</td>
                          <td className="p-2 text-right font-mono font-bold text-[#7B4FD6]">{d.count}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Info Note per brief */}
                <div className="p-2.5 rounded-xl bg-blue-50/80 border border-blue-100 text-[11px] text-[#1F5FAD] flex items-center gap-2">
                  <Info size={16} weight="fill" className="shrink-0" />
                  <span>1 restricted security dataset was excluded based on your current access grant.</span>
                </div>

                {/* Action Row */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => addToast('Saved as Map', 'Al Ain school traffic buffer layer saved to your map.', 'success')}
                      className="px-2.5 py-1 rounded bg-white hover:bg-slate-50 border border-[#E3E8EF] text-[11px] font-semibold text-[#0B2545] flex items-center gap-1"
                    >
                      <BookmarkSimple size={13} /> Save Map
                    </button>
                    <button
                      onClick={() => addToast('Exported', 'Data exported as GeoJSON.', 'info')}
                      className="px-2.5 py-1 rounded bg-white hover:bg-slate-50 border border-[#E3E8EF] text-[11px] font-semibold text-[#0B2545] flex items-center gap-1"
                    >
                      <DownloadSimple size={13} /> Export
                    </button>
                  </div>
                  <div className="flex items-center gap-1 text-slate-400">
                    <button onClick={() => addToast('Feedback Saved', 'Thank you for your rating!', 'info')} className="p-1 hover:text-emerald-600"><ThumbsUp size={14} /></button>
                    <button onClick={() => addToast('Feedback Saved', 'Thank you for your rating!', 'info')} className="p-1 hover:text-rose-600"><ThumbsDown size={14} /></button>
                  </div>
                </div>

                <div className="text-[10px] text-slate-400 italic">
                  AI-generated. Verify before official use.
                </div>
              </div>
            );
          })}
        </div>

        {/* Suggested Prompts & Input Bar */}
        <div className="p-3 border-t border-[#E3E8EF] bg-white space-y-2">
          {/* Suggested Prompts chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px]">
            {suggestedPrompts.map((p) => (
              <button
                key={p}
                onClick={() => handleSendMessage(p)}
                className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-purple-50 hover:text-[#7B4FD6] text-[#5B6B7F] whitespace-nowrap transition-colors border border-slate-200"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input field (56px per brief) */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2 bg-[#F5F7FA] rounded-xl p-1.5 border border-[#E3E8EF]"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask about places, spatial data, proximity, or urban trends..."
              className="flex-1 bg-transparent px-2.5 py-1.5 text-xs text-[#14213D] outline-none"
            />
            <button
              type="button"
              onClick={() => alert('Microphone speech-to-text activated (Arabic & English).')}
              className="p-1.5 text-slate-400 hover:text-[#0B2545] rounded-lg"
              title="Voice Input"
            >
              <Microphone size={16} />
            </button>
            <button
              type="submit"
              className="w-8 h-8 rounded-lg bg-[#0B2545] hover:bg-[#13315C] text-white flex items-center justify-center transition-colors"
            >
              <PaperPlaneRight size={14} weight="fill" />
            </button>
          </form>
        </div>
      </div>

      {/* Right Map Panel (Al Ain with roads in amber, 500m buffers translucent amber, schools purple per brief S07) */}
      <div className="flex-1 bg-[#0A1628] rounded-2xl border border-[#E3E8EF] shadow-md overflow-hidden relative flex flex-col min-h-[400px]">
        {/* Map Header */}
        <div className="p-3 bg-[#0B2545]/90 backdrop-blur-sm border-b border-white/10 flex items-center justify-between text-xs text-white z-10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
            <span className="font-semibold">Al Ain City Spatial Buffer Engine</span>
            <span className="text-[11px] font-mono text-slate-400">EPSG:3997</span>
          </div>
          <span className="text-[11px] text-[#FFC20E]">Active Query: 500m Road Buffer</span>
        </div>

        {/* Map Visuals */}
        <div className="relative flex-1 bg-[#0A1628] overflow-hidden">
          <img
            src="/assets/theme_boundaries.jpg"
            alt="Al Ain Map View"
            className="w-full h-full object-cover opacity-50 mix-blend-luminosity scale-105"
          />

          {/* SVG Vector Overlays */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 600" preserveAspectRatio="none">
            {/* District Boundaries */}
            <path d="M100,100 L400,80 L450,300 L120,320 Z" fill="none" stroke="#7A9CC6" strokeWidth="1.5" strokeDasharray="4,4" />
            <path d="M400,80 L720,120 L680,360 L450,300 Z" fill="none" stroke="#7A9CC6" strokeWidth="1.5" strokeDasharray="4,4" />

            {/* Amber Roads & Translucent 500m Buffers */}
            <path d="M50,220 C200,200 400,260 750,230" fill="none" stroke="rgba(232, 163, 23, 0.3)" strokeWidth="32" />
            <path d="M50,220 C200,200 400,260 750,230" fill="none" stroke="#E8A317" strokeWidth="3" />

            <path d="M420,50 C440,250 430,450 480,580" fill="none" stroke="rgba(232, 163, 23, 0.3)" strokeWidth="32" />
            <path d="M420,50 C440,250 430,450 480,580" fill="none" stroke="#E8A317" strokeWidth="3" />

            {/* Schools Points (Purple #7B4FD6 circles) */}
            <circle cx="280" cy="210" r="7" fill="#7B4FD6" stroke="#FFFFFF" strokeWidth="2" />
            <circle cx="340" cy="235" r="7" fill="#7B4FD6" stroke="#FFFFFF" strokeWidth="2" />
            <circle cx="430" cy="180" r="7" fill="#7B4FD6" stroke="#FFFFFF" strokeWidth="2" />
            <circle cx="445" cy="270" r="7" fill="#7B4FD6" stroke="#FFFFFF" strokeWidth="2" />
            <circle cx="520" cy="240" r="7" fill="#7B4FD6" stroke="#FFFFFF" strokeWidth="2" />
            <circle cx="600" cy="225" r="7" fill="#7B4FD6" stroke="#FFFFFF" strokeWidth="2" />
          </svg>

          {/* Selected pin popup */}
          <div className="absolute top-[32%] left-[45%] bg-white p-2.5 rounded-xl shadow-xl border border-[#7B4FD6] text-xs text-[#0B2545] z-20">
            <div className="font-bold flex items-center gap-1 text-[#7B4FD6]">
              <MapPin size={14} weight="fill" />
              <span>Al Jimi Primary School</span>
            </div>
            <div className="text-[10px] text-[#5B6B7F]">Distance to Artery: 140 m</div>
          </div>

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-[#0B2545]/90 backdrop-blur-md p-3 rounded-xl border border-white/10 text-xs text-white z-20 space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-3 h-1 bg-[#E8A317]" />
              <span>High-Traffic Arterial Roads</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-2 rounded bg-[#E8A317]/40" />
              <span>500m Buffer Zone</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#7B4FD6] border border-white" />
              <span>School Centroids (47 Total)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

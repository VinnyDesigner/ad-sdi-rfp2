import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  PlugsConnected,
  Copy,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  FileCode,
  Globe,
  Database,
  Play,
  MapTrifold
} from '@phosphor-icons/react';
import { useApp } from '../context/AppContext';
import { OGC_SERVICES } from './ServicesPage';

export default function ServiceDetail() {
  const { serviceSlug } = useParams();
  const { addToast } = useApp();

  const service =
    OGC_SERVICES.find((s) => s.slug === serviceSlug || s.id === serviceSlug) ||
    OGC_SERVICES[0];

  const [activeTab, setActiveTab] = useState('endpoints');
  const [testBbox, setTestBbox] = useState('54.30,24.40,54.45,24.52');
  const [testResponse, setTestResponse] = useState(null);
  const [isLoadingTest, setIsLoadingTest] = useState(false);

  const copyText = (txt) => {
    navigator.clipboard?.writeText(txt);
    addToast('Copied to clipboard', 'info');
  };

  const runTestQuery = () => {
    setIsLoadingTest(true);
    setTimeout(() => {
      setIsLoadingTest(false);
      setTestResponse({
        type: 'FeatureCollection',
        numberMatched: 1420,
        numberReturned: 2,
        crs: 'urn:ogc:def:crs:EPSG::3997',
        features: [
          {
            type: 'Feature',
            id: 'cadastre.48201',
            geometry: {
              type: 'Polygon',
              coordinates: [
                [
                  [54.382, 24.451],
                  [54.385, 24.451],
                  [54.385, 24.455],
                  [54.382, 24.455],
                  [54.382, 24.451]
                ]
              ]
            },
            properties: {
              parcel_id: 'AD-PL-9481',
              sector: 'Al Danah Sector E12',
              zoning_code: 'COM-02',
              land_use: 'Commercial Office Tower',
              area_sqm: 4210.5,
              deed_status: 'Active Registered'
            }
          }
        ]
      });
      addToast('Simulated OGC API response returned (200 OK)', 'success');
    }, 400);
  };

  return (
    <div className="space-y-6">
      {/* Top breadcrumb */}
      <div className="flex items-center justify-between">
        <Link
          to="/services"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1F5FAD] hover:underline"
        >
          <ArrowLeft size={14} /> Back to Services & APIs
        </Link>
        <span className="text-[11px] font-mono text-[#5B6B7F] bg-slate-100 px-2.5 py-0.5 rounded-full">
          Protocol: {service.protocol}
        </span>
      </div>

      {/* Main Service Card */}
      <div className="bg-white rounded-2xl p-6 lg:p-8 border border-[#E3E8EF] shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-[#1F5FAD] uppercase tracking-wider bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200">
                {service.category}
              </span>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200 flex items-center gap-1">
                <CheckCircle size={13} weight="fill" /> {service.status} ({service.uptime})
              </span>
              <span className="text-xs text-[#5B6B7F]">p95 Latency: {service.latencyP95}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B2545] tracking-tight">
              {service.name}
            </h1>

            <p className="text-sm text-[#5B6B7F] leading-relaxed">
              {service.desc}
            </p>

            <div className="flex items-center gap-6 pt-2 text-xs text-[#5B6B7F] flex-wrap">
              <div>
                Custodian: <strong className="text-[#0B2545]">{service.custodian}</strong>
              </div>
              <div>
                Related Dataset:{' '}
                <Link
                  to={`/catalogue/${service.datasetSlug}`}
                  className="font-bold text-[#1F5FAD] hover:underline"
                >
                  {service.relatedDataset}
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 shrink-0 lg:w-80 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#0B2545]">
              Production Endpoint
            </div>
            <div className="bg-white p-2.5 rounded-xl border border-slate-200 font-mono text-[11px] text-[#0B2545] break-all">
              {service.endpoint}
            </div>
            <button
              onClick={() => copyText(service.endpoint)}
              className="w-full py-2 rounded-xl bg-[#0B2545] hover:bg-[#13315C] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Copy size={14} /> Copy Full Service URL
            </button>
            <Link
              to="/map-viewer"
              className="w-full py-2 rounded-xl bg-white hover:bg-slate-100 text-[#0B2545] border border-[#E3E8EF] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <MapTrifold size={14} /> Add Layer to Map Viewer
            </Link>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#E3E8EF] gap-4 text-xs font-bold">
        {[
          { id: 'endpoints', label: 'API Specifications & Routes' },
          { id: 'tester', label: 'Interactive Query Console' },
          { id: 'sla', label: 'Uptime & SLA Telemetry' }
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

      {/* Tab: Endpoints */}
      {activeTab === 'endpoints' && (
        <div className="bg-white rounded-2xl p-6 border border-[#E3E8EF] shadow-xs space-y-5">
          <h3 className="text-sm font-bold text-[#0B2545] uppercase tracking-wider">
            Supported OGC Routes & Methods
          </h3>

          <div className="space-y-3">
            {[
              {
                method: 'GET',
                route: '/collections',
                desc: 'Retrieve metadata description of all spatial feature collections in this service.'
              },
              {
                method: 'GET',
                route: '/collections/{collectionId}/items',
                desc: 'Fetch geographic features. Supports spatial filtering (bbox), attribute filtering, and pagination limit/offset.'
              },
              {
                method: 'GET',
                route: '/collections/{collectionId}/items/{featureId}',
                desc: 'Fetch a single spatial feature by its authoritative government identifier.'
              },
              {
                method: 'GET',
                route: '/conformance',
                desc: 'Returns the list of OGC API standards and extension conformance classes satisfied.'
              }
            ].map((r, i) => (
              <div
                key={i}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <span className="font-mono font-bold bg-blue-600 text-white px-2.5 py-0.5 rounded text-[11px]">
                    {r.method}
                  </span>
                  <span className="font-mono font-bold text-[#0B2545] text-xs">
                    {r.route}
                  </span>
                </div>
                <div className="text-[#5B6B7F] max-w-md text-right sm:text-left">
                  {r.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Query Console */}
      {activeTab === 'tester' && (
        <div className="bg-white rounded-2xl p-6 border border-[#E3E8EF] shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-[#0B2545] uppercase tracking-wider">
            Interactive Test Query
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-[#0B2545] mb-1">
                Bounding Box (minLon, minLat, maxLon, maxLat)
              </label>
              <input
                type="text"
                value={testBbox}
                onChange={(e) => setTestBbox(e.target.value)}
                className="w-full h-9 px-3 rounded-lg border border-[#E3E8EF] font-mono"
              />
            </div>
            <div>
              <label className="block font-semibold text-[#0B2545] mb-1">Limit</label>
              <input
                type="number"
                defaultValue={10}
                className="w-full h-9 px-3 rounded-lg border border-[#E3E8EF] font-mono"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={runTestQuery}
                disabled={isLoadingTest}
                className="w-full h-9 rounded-lg bg-[#1F5FAD] hover:bg-[#184e91] text-white font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Play size={14} weight="fill" />
                {isLoadingTest ? 'Executing Query...' : 'Execute Demonstration Request'}
              </button>
            </div>
          </div>

          {testResponse && (
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-emerald-600 font-bold">200 OK · Content-Type: application/geo+json</span>
                <button
                  onClick={() => copyText(JSON.stringify(testResponse, null, 2))}
                  className="text-xs text-[#1F5FAD] hover:underline"
                >
                  Copy Response JSON
                </button>
              </div>
              <pre className="bg-[#0B2545] text-emerald-400 p-4 rounded-xl text-xs font-mono overflow-x-auto max-h-96">
                {JSON.stringify(testResponse, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}

      {/* Tab: SLA */}
      {activeTab === 'sla' && (
        <div className="bg-white rounded-2xl p-6 border border-[#E3E8EF] shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-[#0B2545] uppercase tracking-wider">
            Operational Service Level Telemetry
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[#5B6B7F]">90-Day Uptime</span>
              <div className="text-2xl font-bold text-emerald-600 mt-1">{service.uptime}</div>
              <p className="text-[11px] text-[#5B6B7F] mt-1">Zero unplanned outages recorded</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[#5B6B7F]">Average Latency (p95)</span>
              <div className="text-2xl font-bold text-[#1F5FAD] mt-1">{service.latencyP95}</div>
              <p className="text-[11px] text-[#5B6B7F] mt-1">Monitored from Abu Dhabi Govt Core</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[#5B6B7F]">Health Status</span>
              <div className="text-2xl font-bold text-[#0B2545] mt-1">Healthy</div>
              <p className="text-[11px] text-emerald-600 mt-1">All gateway probes green</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

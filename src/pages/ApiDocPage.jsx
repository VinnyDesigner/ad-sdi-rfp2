import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Code,
  Copy,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Play,
  Terminal,
  FileCode,
  Key
} from '@phosphor-icons/react';
import { useApp } from '../context/AppContext';

export default function ApiDocPage() {
  const { apiSlug } = useParams();
  const { addToast } = useApp();

  const [activeTab, setActiveTab] = useState('endpoints');
  const [selectedRoute, setSelectedRoute] = useState('get-items');
  const [testResponse, setTestResponse] = useState(null);
  const [isTesting, setIsTesting] = useState(false);

  const copyCode = (code) => {
    navigator.clipboard?.writeText(code);
    addToast('Snippet copied to clipboard', 'info');
  };

  const runLiveTest = () => {
    setIsTesting(true);
    setTimeout(() => {
      setIsTesting(false);
      setTestResponse({
        type: 'FeatureCollection',
        totalFeatures: 412380,
        numberReturned: 2,
        crs: {
          type: 'name',
          properties: { name: 'urn:ogc:def:crs:EPSG::3997' }
        },
        features: [
          {
            type: 'Feature',
            id: 'cadastre.48201',
            geometry: {
              type: 'Polygon',
              coordinates: [
                [
                  [54.3821, 24.4512],
                  [54.3854, 24.4512],
                  [54.3854, 24.4548],
                  [54.3821, 24.4548],
                  [54.3821, 24.4512]
                ]
              ]
            },
            properties: {
              parcel_id: 'AD-PL-9481',
              sector: 'Al Danah Sector E12',
              zoning_code: 'COM-02',
              land_use: 'Commercial Office Tower',
              area_sqm: 4210.5,
              deed_status: 'Active Registered',
              last_sync: '2027-09-01T08:00:00Z'
            }
          }
        ]
      });
      addToast('Simulated 200 OK Response returned', 'success');
    }, 350);
  };

  return (
    <div className="space-y-6">
      {/* Top breadcrumb */}
      <div className="flex items-center justify-between">
        <Link
          to="/developers/apis"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1F5FAD] hover:underline"
        >
          <ArrowLeft size={14} /> Back to API Catalogue
        </Link>
        <span className="text-[11px] font-mono text-[#5B6B7F] bg-slate-100 px-2.5 py-0.5 rounded-full">
          OpenAPI 3.0.3 · JSON-FG
        </span>
      </div>

      {/* Header Card */}
      <div className="bg-white rounded-2xl p-6 lg:p-8 border border-[#E3E8EF] shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-[#1F5FAD] uppercase tracking-wider bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200">
                OGC API Features v1.0
              </span>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                Production (99.98% SLA)
              </span>
              <span className="text-xs font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                v1.4.2
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B2545] tracking-tight">
              Cadastral Parcels & Zoning API Documentation
            </h1>

            <p className="text-sm text-[#5B6B7F] leading-relaxed">
              Standardized OGC API Features interface providing spatial queries, bounding-box filters, and attribute searches across all 412,000+ registered parcels in Abu Dhabi Emirate.
            </p>

            <div className="flex items-center gap-6 pt-2 text-xs text-[#5B6B7F] flex-wrap">
              <div>
                Base URL:{' '}
                <strong className="text-[#0B2545] font-mono">https://api.adsdi.gov.ae/ogc/features/v1</strong>
              </div>
              <div>
                Rate Limit: <strong className="text-[#0B2545]">100 req/sec</strong>
              </div>
              <div>
                Default Output: <strong className="text-[#0B2545]">application/geo+json</strong>
              </div>
            </div>
          </div>

          <div className="bg-[#0B2545] text-white p-5 rounded-2xl shrink-0 lg:w-72 space-y-3 shadow-md">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FFC20E]">
              <Key size={16} /> Authentication
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Pass your sovereign token in the request header:
            </p>
            <div className="bg-slate-900 p-2.5 rounded-lg font-mono text-[11px] text-[#FFC20E] break-all border border-slate-700">
              X-ADSDI-API-KEY: adsdi_live_••••••3f9a
            </div>
            <Link
              to="/marketplace/entitlements"
              className="w-full py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold text-center block transition-colors"
            >
              Manage My API Keys
            </Link>
          </div>
        </div>
      </div>

      {/* Interactive Endpoint Explorer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left endpoint list */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-4 border border-[#E3E8EF] shadow-xs space-y-2">
          <div className="text-xs font-bold text-[#0B2545] uppercase tracking-wider px-2 py-1">
            Collections & Routes
          </div>

          {[
            { id: 'get-landing', method: 'GET', path: '/', label: 'Landing Page' },
            { id: 'get-conformance', method: 'GET', path: '/conformance', label: 'Conformance Classes' },
            { id: 'get-collections', method: 'GET', path: '/collections', label: 'Collections Metadata' },
            { id: 'get-items', method: 'GET', path: '/collections/cadastre/items', label: 'Query Parcels (Bbox)' },
            { id: 'get-item-id', method: 'GET', path: '/collections/cadastre/items/{id}', label: 'Get Parcel by ID' }
          ].map((r) => (
            <button
              key={r.id}
              onClick={() => setSelectedRoute(r.id)}
              className={`w-full p-2.5 rounded-xl text-left transition-all text-xs flex items-center justify-between ${
                selectedRoute === r.id
                  ? 'bg-[#1F5FAD] text-white shadow-xs font-bold'
                  : 'hover:bg-slate-50 text-[#0B2545]'
              }`}
            >
              <div className="space-y-0.5 truncate">
                <div className="font-semibold truncate">{r.label}</div>
                <div
                  className={`font-mono text-[10px] truncate ${
                    selectedRoute === r.id ? 'text-blue-100' : 'text-slate-400'
                  }`}
                >
                  {r.path}
                </div>
              </div>
              <span
                className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold ${
                  selectedRoute === r.id ? 'bg-white text-[#1F5FAD]' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {r.method}
              </span>
            </button>
          ))}
        </div>

        {/* Right route tester & schema */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-6 border border-[#E3E8EF] shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#E3E8EF]">
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-blue-600 text-white font-mono font-bold text-xs px-2 py-0.5 rounded">
                  GET
                </span>
                <span className="font-mono text-sm font-bold text-[#0B2545]">
                  /collections/cadastre/items
                </span>
              </div>
              <p className="text-xs text-[#5B6B7F] mt-1">
                Retrieve a GeoJSON FeatureCollection of cadastral plots with optional spatial and attribute filters.
              </p>
            </div>

            <button
              onClick={runLiveTest}
              disabled={isTesting}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Play size={14} weight="fill" />
              {isTesting ? 'Sending Request...' : 'Try It Out'}
            </button>
          </div>

          {/* Parameters Table */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0B2545]">
              Request Parameters
            </h4>
            <div className="border border-[#E3E8EF] rounded-xl overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-[#E3E8EF] text-[#5B6B7F] font-bold">
                  <tr>
                    <th className="py-2.5 px-3">Parameter</th>
                    <th className="py-2.5 px-3">Type</th>
                    <th className="py-2.5 px-3">Example Value</th>
                    <th className="py-2.5 px-3">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E3E8EF]">
                  <tr>
                    <td className="py-2.5 px-3 font-mono font-bold text-[#0B2545]">bbox</td>
                    <td className="py-2.5 px-3 font-mono text-slate-500">string (comma-sep)</td>
                    <td className="py-2.5 px-3 font-mono text-blue-600">54.30,24.40,54.45,24.52</td>
                    <td className="py-2.5 px-3 text-[#5B6B7F]">Bounding box in EPSG:3997 or WGS84 coords</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-mono font-bold text-[#0B2545]">limit</td>
                    <td className="py-2.5 px-3 font-mono text-slate-500">integer</td>
                    <td className="py-2.5 px-3 font-mono text-blue-600">50</td>
                    <td className="py-2.5 px-3 text-[#5B6B7F]">Number of features to return (max 1000)</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-mono font-bold text-[#0B2545]">zoning</td>
                    <td className="py-2.5 px-3 font-mono text-slate-500">string</td>
                    <td className="py-2.5 px-3 font-mono text-blue-600">COM-02</td>
                    <td className="py-2.5 px-3 text-[#5B6B7F]">Filter by Abu Dhabi Municipal zoning code</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Response Console */}
          {testResponse && (
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-emerald-600 font-bold">
                  Response: 200 OK (application/geo+json)
                </span>
                <button
                  onClick={() => copyCode(JSON.stringify(testResponse, null, 2))}
                  className="text-xs text-[#1F5FAD] hover:underline"
                >
                  Copy JSON
                </button>
              </div>
              <pre className="bg-[#0B2545] text-emerald-400 p-4 rounded-xl text-xs font-mono overflow-x-auto max-h-80">
                {JSON.stringify(testResponse, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

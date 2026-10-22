import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Code,
  Terminal,
  Copy,
  Check,
  Key,
  ShieldCheck,
  BookOpen,
  ArrowRight,
  DownloadSimple,
  PlugsConnected,
  Sparkle,
  FileCode,
  Info,
  Question,
  GraduationCap
} from '@phosphor-icons/react';
import { useApp } from '../context/AppContext';

export default function DevelopersPage() {
  const { addToast } = useApp();
  const [activeTab, setActiveTab] = useState('python');

  const codeSnippets = {
    python: `# Python 3.10+ with GeoPandas and Requests
import requests
import geopandas as gpd

# 1. Authoritative Cadastre OGC API Features endpoint
url = "https://api.adsdi.gov.ae/ogc/features/v1/collections/cadastre/items"
headers = {
    "X-ADSDI-API-KEY": "YOUR_ADSDI_API_KEY",
    "Accept": "application/geo+json"
}
params = {
    "limit": 25,
    "bbox": "54.30,24.40,54.45,24.52"  # Abu Dhabi Metropolitan Core
}

response = requests.get(url, headers=headers, params=params)
if response.status_code == 200:
    gdf = gpd.GeoDataFrame.from_features(response.json()["features"])
    print(f"Retrieved {len(gdf)} parcels. CRS: {gdf.crs}")
else:
    print(f"Error {response.status_code}: {response.text}")`,

    javascript: `// Modern ES2024 JavaScript (Node.js or Browser)
async function fetchSpatialParcels() {
  const url = new URL("https://api.adsdi.gov.ae/ogc/features/v1/collections/cadastre/items");
  url.searchParams.append("limit", "25");
  url.searchParams.append("bbox", "54.30,24.40,54.45,24.52");

  const response = await fetch(url, {
    headers: {
      "X-ADSDI-API-KEY": "YOUR_ADSDI_API_KEY",
      "Accept": "application/geo+json"
    }
  });

  if (!response.ok) throw new Error(\`HTTP \${response.status}\`);
  const geojson = await response.json();
  console.log("Features loaded:", geojson.features.length);
  return geojson;
}`,

    curl: `# cURL command to query Abu Dhabi Cadastral parcels
curl -X GET "https://api.adsdi.gov.ae/ogc/features/v1/collections/cadastre/items?limit=25&bbox=54.30,24.40,54.45,24.52" \\
  -H "X-ADSDI-API-KEY: YOUR_ADSDI_API_KEY" \\
  -H "Accept: application/geo+json"`,

    go: `package main

import (
	"fmt"
	"io"
	"net/http"
)

func main() {
	url := "https://api.adsdi.gov.ae/ogc/features/v1/collections/cadastre/items?limit=10"
	req, _ := http.NewRequest("GET", url, nil)
	req.Header.Add("X-ADSDI-API-KEY", "YOUR_ADSDI_API_KEY")
	req.Header.Add("Accept", "application/geo+json")

	res, err := http.DefaultClient.Do(req)
	if err != nil {
		panic(err)
	}
	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)
	fmt.Printf("Response size: %d bytes\\n", len(body))
}`
  };

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(codeSnippets[activeTab]);
    addToast('Developer code snippet copied to clipboard', 'info');
  };

  return (
    <div className="space-y-8">
      {/* 1. Heading & Concise Description with Primary Actions */}
      <div className="bg-white rounded-2xl p-6 lg:p-7 border border-[#E3E8EF] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="max-w-3xl space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1F5FAD]" />
            <span className="text-xs font-bold text-[#1F5FAD] uppercase tracking-wider">
              Developer Ecosystem · Sovereign GIS APIs
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B2545] tracking-tight">
            Geospatial Developer Hub
          </h1>
          <p className="text-xs sm:text-sm text-[#5B6B7F] leading-relaxed">
            Integrate Abu Dhabi's spatial data layer into your applications using modern OGC API standards, RESTful microservices, and WebGL 3D streaming.
          </p>
        </div>

        {/* 2. Primary Actions */}
        <div className="flex items-center gap-3 shrink-0 flex-wrap">
          <Link
            to="/developers/apis"
            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-[#0B2545] hover:bg-[#13315C] text-white transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <span>Explore API Catalogue</span>
            <ArrowRight size={14} />
          </Link>
          <button
            onClick={() => addToast('Downloaded AD-SDI Postman Collection v2.1', 'success')}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-white hover:bg-slate-50 text-[#0B2545] border border-[#E3E8EF] transition-colors flex items-center gap-1.5"
          >
            <DownloadSimple size={14} />
            <span>Postman Collection</span>
          </button>
        </div>
      </div>

      {/* 3. Three Introduction Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white p-6 rounded-2xl border border-[#E3E8EF] shadow-xs hover:border-[#1F5FAD]/40 transition-all flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="w-11 h-11 rounded-xl bg-blue-50 text-[#1F5FAD] flex items-center justify-center font-bold">
              <Terminal size={22} weight="bold" />
            </div>
            <h2 className="text-base font-bold text-[#0B2545]">OGC API Standards</h2>
            <p className="text-xs text-[#5B6B7F] leading-relaxed">
              RESTful OGC API Features, Tiles, and Processes endpoints returning standard GeoJSON, JSON-FG, and MVT payloads in EPSG:3997.
            </p>
          </div>
          <Link
            to="/developers/apis"
            className="inline-flex items-center gap-1 text-xs font-bold text-[#1F5FAD] hover:underline pt-2 border-t border-slate-100"
          >
            <span>View Spec Standards</span>
            <ArrowRight size={12} />
          </Link>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#E3E8EF] shadow-xs hover:border-[#1F5FAD]/40 transition-all flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="w-11 h-11 rounded-xl bg-amber-50 text-[#FFC20E] flex items-center justify-center font-bold">
              <Key size={22} weight="bold" />
            </div>
            <h2 className="text-base font-bold text-[#0B2545]">Sovereign API Tokens</h2>
            <p className="text-xs text-[#5B6B7F] leading-relaxed">
              Role-based API tokens authenticated via Abu Dhabi Government Enablement Single Sign-On (SSO) and audited against cyber standards.
            </p>
          </div>
          <Link
            to="/marketplace/entitlements"
            className="inline-flex items-center gap-1 text-xs font-bold text-[#1F5FAD] hover:underline pt-2 border-t border-slate-100"
          >
            <span>Manage API Credentials</span>
            <ArrowRight size={12} />
          </Link>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#E3E8EF] shadow-xs hover:border-[#1F5FAD]/40 transition-all flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <BookOpen size={22} weight="bold" />
            </div>
            <h2 className="text-base font-bold text-[#0B2545]">OpenAPI 3.0 Interactive Docs</h2>
            <p className="text-xs text-[#5B6B7F] leading-relaxed">
              Full Swagger specification with live request testing, automatic schema validations, and client SDK code generation.
            </p>
          </div>
          <Link
            to="/developers/apis/cadastre-api"
            className="inline-flex items-center gap-1 text-xs font-bold text-[#1F5FAD] hover:underline pt-2 border-t border-slate-100"
          >
            <span>Open Swagger Sandbox</span>
            <ArrowRight size={12} />
          </Link>
        </div>
      </div>

      {/* 4. Code Example Area (Contained proportions, sensible height) */}
      <div className="bg-[#0B2545] rounded-2xl p-5 sm:p-6 text-white border border-[#13315C] shadow-md space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1E4976] pb-3">
          <div className="flex items-center gap-2">
            <FileCode size={18} className="text-[#FFC20E]" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Sample Code Quickstart
            </h3>
            <span className="text-[10px] font-mono text-slate-300 bg-white/10 px-2 py-0.5 rounded">
              Illustrative Demo Credentials
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center bg-[#13315C] p-0.5 rounded-lg border border-[#1E4976] text-xs">
              {[
                { id: 'python', label: 'Python' },
                { id: 'javascript', label: 'JavaScript' },
                { id: 'curl', label: 'cURL' },
                { id: 'go', label: 'Go' }
              ].map((lang) => (
                <button
                  key={lang.id}
                  onClick={() => setActiveTab(lang.id)}
                  className={`px-3 py-1 rounded text-[11px] font-semibold transition-colors ${
                    activeTab === lang.id
                      ? 'bg-[#1F5FAD] text-white shadow-xs font-bold'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>

            <button
              onClick={handleCopyCode}
              className="p-1.5 rounded-lg bg-[#13315C] hover:bg-[#1E4976] text-white border border-[#1E4976] transition-colors"
              title="Copy Code"
            >
              <Copy size={15} />
            </button>
          </div>
        </div>

        {/* Constrained code container with max-height and clean scrollbar */}
        <pre className="font-mono text-xs text-slate-100 overflow-x-auto p-2 leading-relaxed max-h-64 sm:max-h-72">
          {codeSnippets[activeTab]}
        </pre>
      </div>

      {/* 5. Supporting Documentation & Useful Next Steps (Fills previous empty space) */}
      <div className="bg-white rounded-2xl p-6 lg:p-7 border border-[#E3E8EF] shadow-xs space-y-4">
        <div>
          <h2 className="text-base font-bold text-[#0B2545] uppercase tracking-wider">
            Developer Resources & Next Steps
          </h2>
          <p className="text-xs text-[#5B6B7F] mt-0.5">
            Essential documentation, client libraries, and sovereign compliance standards for government integrations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
          <div className="p-4 rounded-xl border border-[#E3E8EF] bg-slate-50/50 space-y-1.5">
            <div className="text-xs font-bold text-[#0B2545] flex items-center gap-1.5">
              <ShieldCheck size={16} className="text-emerald-600" />
              <span>Authentication Guide</span>
            </div>
            <p className="text-[11px] text-[#5B6B7F] leading-relaxed">
              Step-by-step instructions on generating OAuth2 tokens, HMAC signatures, and rotating DSA keys.
            </p>
            <Link to="/marketplace/entitlements" className="text-[11px] font-bold text-[#1F5FAD] hover:underline block pt-1">
              Read Security Guide &rarr;
            </Link>
          </div>

          <div className="p-4 rounded-xl border border-[#E3E8EF] bg-slate-50/50 space-y-1.5">
            <div className="text-xs font-bold text-[#0B2545] flex items-center gap-1.5">
              <Code size={16} className="text-[#1F5FAD]" />
              <span>Client SDKs & Libraries</span>
            </div>
            <p className="text-[11px] text-[#5B6B7F] leading-relaxed">
              Official SDKs for Python (`pip install adsdi`), Node.js, and Leaflet/MapLibre map plugins.
            </p>
            <Link to="/developers/apis" className="text-[11px] font-bold text-[#1F5FAD] hover:underline block pt-1">
              Browse SDK Packages &rarr;
            </Link>
          </div>

          <div className="p-4 rounded-xl border border-[#E3E8EF] bg-slate-50/50 space-y-1.5">
            <div className="text-xs font-bold text-[#0B2545] flex items-center gap-1.5">
              <GraduationCap size={16} className="text-amber-600" />
              <span>Developer Workshops</span>
            </div>
            <p className="text-[11px] text-[#5B6B7F] leading-relaxed">
              Upcoming hands-on technical sessions covering OGC API Features and GeoAI studio integrations.
            </p>
            <Link to="/geomaturity" className="text-[11px] font-bold text-[#1F5FAD] hover:underline block pt-1">
              View Training Schedule &rarr;
            </Link>
          </div>

          <div className="p-4 rounded-xl border border-[#E3E8EF] bg-slate-50/50 space-y-1.5">
            <div className="text-xs font-bold text-[#0B2545] flex items-center gap-1.5">
              <Question size={16} className="text-purple-600" />
              <span>Technical Helpdesk</span>
            </div>
            <p className="text-[11px] text-[#5B6B7F] leading-relaxed">
              24/7 technical support for government clearinghouse nodes and sovereign SLA incidents.
            </p>
            <Link to="/contact" className="text-[11px] font-bold text-[#1F5FAD] hover:underline block pt-1">
              Contact API Support &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

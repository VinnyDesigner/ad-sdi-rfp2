import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  DownloadSimple,
  Globe,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  FileCode,
  MapTrifold,
  Copy,
  Tag
} from '@phosphor-icons/react';
import { useApp } from '../context/AppContext';
import { DATASETS, getDatasetBySlug } from '../data/datasetsData';

export default function OpenDatasetDetail() {
  const { datasetSlug } = useParams();
  const { addToast } = useApp();

  const dataset = getDatasetBySlug(datasetSlug) || DATASETS[1];

  const triggerDownload = (format) => {
    addToast(`Downloaded ${dataset.title} in ${format} format`, 'success');
  };

  const copyApiUrl = () => {
    navigator.clipboard?.writeText(
      `https://api.adsdi.gov.ae/open/v1/collections/${dataset.slug}/items`
    );
    addToast('Open Data API endpoint copied to clipboard', 'info');
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center justify-between">
        <Link
          to="/open-data"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1F5FAD] hover:underline"
        >
          <ArrowLeft size={14} /> Back to Open Data Portal
        </Link>
        <span className="text-[11px] font-mono text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
          Open Government License
        </span>
      </div>

      {/* Dataset Header Card */}
      <div className="bg-white rounded-2xl p-6 lg:p-8 border border-[#E3E8EF] shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-[#5DAA3A] uppercase tracking-wider bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                {dataset.theme}
              </span>
              <span className="text-xs font-mono text-[#0B2545] bg-slate-100 px-2.5 py-0.5 rounded-md">
                {dataset.recordsCount || 'Authoritative Public Layer'}
              </span>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                100% Quality Gateway Passed
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B2545] tracking-tight">
              {dataset.title}
            </h1>

            <p className="text-sm text-[#5B6B7F] leading-relaxed">
              {dataset.description}
            </p>

            <div className="flex items-center gap-6 pt-2 text-xs text-[#5B6B7F] flex-wrap">
              <div>
                Contributing Custodian:{' '}
                <strong className="text-[#0B2545]">{dataset.entity}</strong>
              </div>
              <div>
                Update Frequency: <strong className="text-[#0B2545]">{dataset.frequency}</strong>
              </div>
              <div>
                Coordinate System:{' '}
                <strong className="text-[#0B2545] font-mono">{dataset.crs}</strong>
              </div>
            </div>
          </div>

          {/* Download Box */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shrink-0 lg:w-80 space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-[#0B2545]">
              Public Direct Downloads
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              {['GeoJSON', 'Shapefile', 'KML', 'CSV'].map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => triggerDownload(fmt)}
                  className="py-2.5 px-3 rounded-xl bg-white hover:bg-[#5DAA3A] hover:text-white text-[#0B2545] border border-[#E3E8EF] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                >
                  <DownloadSimple size={14} /> {fmt}
                </button>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-200 space-y-2">
              <button
                onClick={copyApiUrl}
                className="w-full py-2.5 rounded-xl bg-[#0B2545] hover:bg-[#13315C] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Copy size={14} /> Copy Open API URL
              </button>
              <Link
                to="/map-viewer"
                className="w-full py-2.5 rounded-xl bg-white hover:bg-slate-100 text-[#0B2545] border border-[#E3E8EF] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <MapTrifold size={14} /> Preview on Map Viewer
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* License and Attribution Details */}
      <div className="bg-white rounded-2xl p-6 border border-[#E3E8EF] shadow-xs space-y-4 text-xs text-[#14213D]">
        <h3 className="text-sm font-bold text-[#0B2545] uppercase tracking-wider">
          Attribution & Data Use Terms
        </h3>
        <p className="leading-relaxed text-[#5B6B7F]">
          When publishing maps, web applications, or research papers incorporating this dataset, please include the following citation:
        </p>
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 font-mono text-[11px] text-[#0B2545] flex items-center justify-between">
          <span>Source: {dataset.entity} & Abu Dhabi Spatial Data Infrastructure (AD-SDI), 2027.</span>
          <button
            onClick={() => {
              navigator.clipboard?.writeText(`Source: ${dataset.entity} & Abu Dhabi Spatial Data Infrastructure (AD-SDI), 2027.`);
              addToast('Attribution snippet copied', 'info');
            }}
            className="text-[#1F5FAD] hover:underline shrink-0 pl-2"
          >
            Copy Citation
          </button>
        </div>
      </div>
    </div>
  );
}

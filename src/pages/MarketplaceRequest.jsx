import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ShieldCheck,
  CheckCircle,
  FileText,
  CaretRight,
  ArrowRight,
  ArrowLeft,
  Lock,
  Building,
  Key
} from '@phosphor-icons/react';
import { marketplaceProducts } from '../data/portalData';
import { useApp } from '../context/AppContext';

export default function MarketplaceRequest() {
  const { productSlug } = useParams();
  const navigate = useNavigate();
  const { submitMarketplaceRequest, user, addToast } = useApp();

  const product = marketplaceProducts.find((p) => p.id === productSlug || p.title.toLowerCase().includes((productSlug || '').toLowerCase())) || marketplaceProducts[0];

  const [step, setStep] = useState(2); // 1: Plan, 2: Purpose & Licence, 3: Review & Submit
  const [intendedUse, setIntendedUse] = useState('Urban planning and infrastructure simulation');
  const [projectDescription, setProjectDescription] = useState('Municipal micro-climate assessment and autonomous transit corridor modeling across Abu Dhabi Island.');
  const [expectedVolume, setExpectedVolume] = useState('50,000 API calls / month');
  const [acceptTerms, setAcceptTerms] = useState(true);
  const [acceptDsa, setAcceptDsa] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!acceptTerms || !acceptDsa) {
      addToast('Agreement Required', 'Please accept the licence terms and Data Sharing Agreement.', 'warning');
      return;
    }

    submitMarketplaceRequest({
      productTitle: product.title,
      productSlug: product.id,
      provider: product.provider,
      plan: 'Commercial Partner — Subscription DSA',
      expectedVolume: 50000,
      tier: product.rating
    });

    navigate('/marketplace/entitlements');
  };

  return (
    <div className="max-w-4xl mx-auto py-6 space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-[#5B6B7F]">
        <Link to="/marketplace" className="hover:text-[#1F5FAD]">Marketplace</Link>
        <CaretRight size={12} />
        <span>Request Access</span>
        <CaretRight size={12} />
        <span className="text-[#14213D] font-bold">{product.title}</span>
      </div>

      {/* S09a Modal / Stepper Header */}
      <div className="bg-white rounded-2xl p-6 border border-[#E3E8EF] shadow-xs">
        <div className="flex items-center justify-between pb-6 border-b border-[#E3E8EF] mb-6">
          <div>
            <h1 className="text-2xl font-extrabold text-[#0B2545]">
              Data Sharing Agreement (DSA) Request
            </h1>
            <p className="text-xs text-[#5B6B7F] mt-1">
              Complete bilateral authorization for authoritative government data products
            </p>
          </div>
          <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            Zero-Commercial Exchange
          </span>
        </div>

        {/* 4-Step Stepper per brief S09a */}
        <div className="flex items-center justify-between gap-2 overflow-x-auto text-xs pb-4">
          <div className="flex items-center gap-2 text-emerald-600 font-bold shrink-0">
            <span className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs">✓</span>
            <span>1 Choose Plan</span>
          </div>
          <div className="h-[2px] flex-1 bg-emerald-500 max-w-[60px]" />

          <div className="flex items-center gap-2 text-[#0B2545] font-bold shrink-0">
            <span className="w-6 h-6 rounded-full bg-[#FFC20E] text-[#0B2545] flex items-center justify-center text-xs">2</span>
            <span>2 Purpose & Licence (Current)</span>
          </div>
          <div className="h-[2px] flex-1 bg-slate-200 max-w-[60px]" />

          <div className="flex items-center gap-2 text-slate-400 font-semibold shrink-0">
            <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-xs">3</span>
            <span>3 Sovereign Terms</span>
          </div>
          <div className="h-[2px] flex-1 bg-slate-200 max-w-[60px]" />

          <div className="flex items-center gap-2 text-slate-400 font-semibold shrink-0">
            <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-xs">4</span>
            <span>4 Approval</span>
          </div>
        </div>

        {/* Form Grid */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-4">
          {/* Left Column Form Fields (7 cols per brief S09a) */}
          <div className="md:col-span-7 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#14213D] mb-1">
                Requesting Entity / Organisation
              </label>
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#F5F7FA] border border-[#E3E8EF] text-xs">
                <div className="flex items-center gap-2">
                  <Building size={16} className="text-[#1F5FAD]" />
                  <span className="font-bold text-[#0B2545]">{user.entity}</span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  Verified Custodian
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#14213D] mb-1">
                Stated Intended Use
              </label>
              <select
                value={intendedUse}
                onChange={(e) => setIntendedUse(e.target.value)}
                className="w-full h-10 px-3 rounded-xl border border-[#E3E8EF] text-xs font-medium text-[#14213D] bg-white outline-none focus:border-[#1F5FAD]"
              >
                <option value="Urban planning and infrastructure simulation">Urban planning and infrastructure simulation</option>
                <option value="Scientific research & environmental assessment">Scientific research & environmental assessment</option>
                <option value="Municipal service delivery & transportation">Municipal service delivery & transportation</option>
                <option value="Smart city IoT analytics">Smart city IoT analytics</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#14213D] mb-1">
                Project Scope & Justification
              </label>
              <textarea
                rows={3}
                required
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                className="w-full p-3 rounded-xl border border-[#E3E8EF] text-xs text-[#14213D] outline-none focus:border-[#1F5FAD]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#14213D] mb-1">
                Expected Monthly API Consumption Volume
              </label>
              <input
                type="text"
                value={expectedVolume}
                onChange={(e) => setExpectedVolume(e.target.value)}
                className="w-full h-10 px-3 rounded-xl border border-[#E3E8EF] text-xs font-mono text-[#14213D] outline-none"
              />
            </div>

            {/* Checkboxes per brief S09a */}
            <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-[#14213D]">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="rounded text-[#1F5FAD] mt-0.5"
                />
                <span>
                  I accept the <strong className="text-[#1F5FAD] underline">Abu Dhabi Spatial Data Infrastructure License Terms</strong>.
                </span>
              </label>
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={acceptDsa}
                  onChange={(e) => setAcceptDsa(e.target.checked)}
                  className="rounded text-[#1F5FAD] mt-0.5"
                />
                <span>
                  I accept the bilateral <strong className="text-[#1F5FAD] underline">Data Sharing Agreement (DSA) provisions</strong> and sovereign data residency mandate.
                </span>
              </label>
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-[#E3E8EF]">
              <Link
                to="/marketplace"
                className="px-4 py-2 rounded-xl text-xs font-semibold text-[#5B6B7F] hover:text-[#0B2545]"
              >
                Back to Catalogue
              </Link>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#1F5FAD] hover:bg-[#164b8a] text-white shadow-xs transition-colors flex items-center gap-2"
              >
                <span>Submit Access Request</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* Right Column Summary Card (5 cols per brief S09a) */}
          <div className="md:col-span-5 bg-[#F9FBFD] p-5 rounded-2xl border border-[#E3E8EF] space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B2545] block">
              Requested Product Summary
            </span>

            <div className="p-3.5 rounded-xl bg-white border border-[#E3E8EF] space-y-2 text-xs">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-[#1F5FAD]">
                {product.type}
              </span>
              <h3 className="font-extrabold text-[#0B2545] text-sm">{product.title}</h3>
              <div className="text-[11px] text-[#5B6B7F]">{product.provider}</div>
            </div>

            <div className="text-xs space-y-2 text-[#5B6B7F]">
              <div className="flex justify-between">
                <span>Selected Plan:</span>
                <strong className="text-[#0B2545]">Subscription DSA</strong>
              </div>
              <div className="flex justify-between">
                <span>SLA Tier:</span>
                <strong className="text-emerald-600">{product.rating}</strong>
              </div>
              <div className="flex justify-between">
                <span>Delivery:</span>
                <strong className="font-mono text-[#0B2545]">{product.formats}</strong>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-100 text-[11px] text-[#1F5FAD] flex items-start gap-2">
              <ShieldCheck size={16} weight="fill" className="shrink-0 mt-0.5" />
              <span>Requests are reviewed and authorized by the contributing custodian within 24 business hours.</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

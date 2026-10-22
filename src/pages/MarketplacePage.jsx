import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Storefront,
  MagnifyingGlass,
  CheckCircle,
  ShieldCheck,
  X,
  FileCode,
  ArrowRight,
  Database,
  Building,
  Key,
  UsersThree,
  Cpu,
  Funnel,
  MapTrifold
} from '@phosphor-icons/react';
import { marketplaceProducts } from '../data/portalData';
import { useApp } from '../context/AppContext';

export default function MarketplacePage() {
  const { addToast } = useApp();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProductType, setSelectedProductType] = useState('All');
  const [selectedProviderType, setSelectedProviderType] = useState('All');
  const [selectedProductId, setSelectedProductId] = useState('mp-01');
  const [selectedPlan, setSelectedPlan] = useState('government');
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const selectedProduct =
    marketplaceProducts.find((p) => p.id === selectedProductId) || marketplaceProducts[0];

  const filteredProducts = marketplaceProducts.filter((p) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      if (
        !p.title.toLowerCase().includes(q) &&
        !p.desc.toLowerCase().includes(q) &&
        !p.provider.toLowerCase().includes(q)
      ) {
        return false;
      }
    }
    if (selectedProductType !== 'All' && !p.type.toLowerCase().includes(selectedProductType.toLowerCase())) {
      return false;
    }
    if (
      selectedProviderType === 'Government' &&
      !p.provider.includes('Department') &&
      !p.provider.includes('Agency') &&
      !p.provider.includes('Centre')
    ) {
      return false;
    }
    if (selectedProviderType === 'Partner' && !p.provider.includes('Partner')) {
      return false;
    }
    return true;
  });

  const handleSelectProduct = (id) => {
    setSelectedProductId(id);
    // If on tablet or mobile, open the slide drawer
    if (window.innerWidth < 1280) {
      setMobileDrawerOpen(true);
    }
  };

  // Reusable Product Detail Content Component
  const ProductDetailContent = () => (
    <div className="space-y-4 text-xs">
      <div>
        <div className="flex items-center justify-between mb-2 gap-2 flex-wrap">
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-[#1F5FAD] uppercase">
            {selectedProduct.type}
          </span>
          <span className="text-[11px] font-mono text-emerald-600 font-bold">
            {selectedProduct.rating}
          </span>
        </div>
        <h2 className="text-lg font-bold text-[#0B2545] leading-snug">
          {selectedProduct.title}
        </h2>
        <div className="text-[11px] text-[#5B6B7F] mt-1 font-medium">
          Custodian: {selectedProduct.provider}
        </div>
      </div>

      {/* Quality check */}
      <div className="p-2.5 rounded-xl bg-emerald-50/80 border border-emerald-100 flex items-center gap-2 text-[11px] text-emerald-900">
        <CheckCircle size={16} weight="fill" className="text-emerald-600 shrink-0" />
        <span>Authoritative dataset verified via 6-point Clearinghouse gateway.</span>
      </div>

      {/* Overview facts */}
      <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-[11px]">
        <div className="flex justify-between">
          <span className="text-[#5B6B7F]">Territorial Scope:</span>
          <strong className="text-[#0B2545]">Abu Dhabi Emirate Wide</strong>
        </div>
        <div className="flex justify-between">
          <span className="text-[#5B6B7F]">Delivery Formats:</span>
          <strong className="text-[#0B2545] font-mono">{selectedProduct.formats}</strong>
        </div>
        <div className="flex justify-between">
          <span className="text-[#5B6B7F]">Update Frequency:</span>
          <strong className="text-[#0B2545]">Continuous Telemetry Sync</strong>
        </div>
        <div className="flex justify-between">
          <span className="text-[#5B6B7F]">Coordinate Reference:</span>
          <strong className="text-[#1F5FAD] font-mono">EPSG:3997</strong>
        </div>
      </div>

      {/* Entitlement plan options */}
      <div className="space-y-2">
        <span className="text-[11px] font-bold text-[#0B2545] uppercase tracking-wider block">
          Select Entitlement Model
        </span>

        <label
          onClick={() => setSelectedPlan('government')}
          className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
            selectedPlan === 'government'
              ? 'border-[#1F5FAD] bg-blue-50/50 ring-1 ring-[#1F5FAD]'
              : 'border-[#E3E8EF] hover:bg-slate-50'
          }`}
        >
          <div>
            <span className="font-bold text-[#0B2545] block text-xs">Government Custodian</span>
            <span className="text-[10px] text-[#5B6B7F]">Included under sovereign inter-agency DSA</span>
          </div>
          <input
            type="radio"
            name="planSelect"
            checked={selectedPlan === 'government'}
            onChange={() => setSelectedPlan('government')}
            className="text-[#1F5FAD]"
          />
        </label>

        <label
          onClick={() => setSelectedPlan('commercial')}
          className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
            selectedPlan === 'commercial'
              ? 'border-[#1F5FAD] bg-blue-50/50 ring-1 ring-[#1F5FAD]'
              : 'border-[#E3E8EF] hover:bg-slate-50'
          }`}
        >
          <div>
            <span className="font-bold text-[#0B2545] block text-xs">Licensed Partner DSA</span>
            <span className="text-[10px] text-[#5B6B7F]">Zero-cost agreement for verified contractors</span>
          </div>
          <input
            type="radio"
            name="planSelect"
            checked={selectedPlan === 'commercial'}
            onChange={() => setSelectedPlan('commercial')}
            className="text-[#1F5FAD]"
          />
        </label>
      </div>

      {/* Legal terms bullets */}
      <div className="text-[10px] text-[#5B6B7F] space-y-1 pt-2 border-t border-slate-100">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#1F5FAD] shrink-0" />
          <span>Standard Abu Dhabi Data Sharing Agreement (DSA-2027) applies.</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#1F5FAD] shrink-0" />
          <span>Attribution required: "Data courtesy of Abu Dhabi SDI".</span>
        </div>
      </div>

      {/* Action buttons */}
      <div className="space-y-2 pt-2 border-t border-slate-100">
        <Link
          to={`/marketplace/request/${selectedProduct.id}`}
          className="w-full py-2.5 rounded-xl text-xs font-bold bg-[#0B2545] hover:bg-[#13315C] text-white transition-colors flex items-center justify-center gap-2 shadow-xs"
        >
          <span>Request Access Agreement</span>
          <ArrowRight size={13} />
        </Link>
        <Link
          to={`/marketplace/${selectedProduct.id}`}
          className="w-full py-2 rounded-xl text-xs font-semibold bg-white hover:bg-slate-50 text-[#0B2545] border border-[#E3E8EF] transition-colors flex items-center justify-center gap-1.5"
        >
          <span>Full Product Specification</span>
        </Link>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-2xl p-6 lg:p-7 border border-[#E3E8EF] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="max-w-2xl space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0E9F8E]" />
            <span className="text-xs font-bold text-[#0E9F8E] uppercase tracking-wider">
              Module C · Geospatial Marketplace
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B2545] tracking-tight">
            Geospatial Marketplace
          </h1>
          <p className="text-xs sm:text-sm text-[#5B6B7F] leading-relaxed">
            Trusted data products, high-throughput APIs, and GeoAI outputs from government custodians and approved partners.
          </p>
        </div>

        {/* Right side: Search field + quick links */}
        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
          <div className="relative w-full sm:w-64">
            <MagnifyingGlass size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products, providers..."
              className="w-full h-9 pl-8 pr-3 rounded-xl border border-[#E3E8EF] text-xs text-[#14213D] outline-none focus:border-[#0E9F8E] bg-white"
            />
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Link
              to="/marketplace/entitlements"
              className="px-3 py-2 rounded-xl text-xs font-semibold bg-white hover:bg-slate-50 text-[#0B2545] border border-[#E3E8EF] transition-colors"
            >
              My Entitlements
            </Link>
            <Link
              to="/marketplace/provider"
              className="px-3 py-2 rounded-xl text-xs font-semibold bg-[#0B2545] text-white hover:bg-[#13315C] transition-colors"
            >
              Provider Studio
            </Link>
          </div>
        </div>
      </div>

      {/* Sovereign Zero-Commercial Data Exchange Banner */}
      <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-2xl p-4 flex items-center justify-between text-xs text-[#0B2545] gap-3">
        <div className="flex items-center gap-3">
          <ShieldCheck size={20} weight="fill" className="text-emerald-600 shrink-0" />
          <span className="leading-relaxed">
            <strong>Zero-Commercial Data Exchange Policy:</strong> All products are shared under standardized Abu Dhabi Data Sharing Agreements (DSA). No fees or commercial transactions apply between government entities.
          </span>
        </div>
        <span className="hidden sm:inline font-mono text-[10px] font-bold text-emerald-800 bg-white px-2.5 py-0.5 rounded-full border border-emerald-200 shrink-0">
          Sovereign Framework
        </span>
      </div>

      {/* Mobile Filter Toggle Button */}
      <div className="xl:hidden flex items-center justify-between">
        <button
          onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
          className="px-3.5 py-1.5 rounded-xl border border-[#E3E8EF] bg-white text-xs font-semibold text-[#0B2545] flex items-center gap-2 shadow-xs"
        >
          <Funnel size={14} />
          <span>Filters ({selectedProductType} · {selectedProviderType})</span>
        </button>
        <span className="text-xs text-[#5B6B7F]">
          Showing <strong>{filteredProducts.length}</strong> products
        </span>
      </div>

      {/* Responsive CSS Grid Container per Section 7:
          grid-template-columns: minmax(220px, 260px) minmax(0, 1fr) minmax(300px, 360px) */}
      <div className="grid grid-cols-1 xl:[grid-template-columns:minmax(220px,260px)_minmax(0,1fr)_minmax(300px,360px)] gap-6 items-start">
        {/* Column 1: Compact Filter Sidebar */}
        <aside
          className={`bg-white rounded-2xl p-5 border border-[#E3E8EF] shadow-xs space-y-5 min-w-0 ${
            mobileFilterOpen ? 'block' : 'hidden xl:block'
          }`}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#0B2545]">
              Product Category
            </h2>
            <button
              onClick={() => {
                setSelectedProductType('All');
                setSelectedProviderType('All');
              }}
              className="text-[11px] text-[#1F5FAD] hover:underline"
            >
              Reset
            </button>
          </div>

          <div className="space-y-1.5 text-xs text-[#14213D]">
            {['All', 'Datasets', 'Web Service API', 'AI Model Output', 'Statistical Grid'].map((t) => (
              <label key={t} className="flex items-center gap-2 cursor-pointer hover:text-[#1F5FAD]">
                <input
                  type="radio"
                  name="productType"
                  checked={selectedProductType === t}
                  onChange={() => setSelectedProductType(t)}
                  className="text-[#1F5FAD] focus:ring-[#1F5FAD]"
                />
                <span>{t}</span>
              </label>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#0B2545] mb-2.5">
              Provider Authority
            </h2>
            <div className="space-y-1.5 text-xs text-[#14213D]">
              {['All', 'Government', 'Partner'].map((p) => (
                <label key={p} className="flex items-center gap-2 cursor-pointer hover:text-[#1F5FAD]">
                  <input
                    type="radio"
                    name="providerType"
                    checked={selectedProviderType === p}
                    onChange={() => setSelectedProviderType(p)}
                    className="text-[#1F5FAD] focus:ring-[#1F5FAD]"
                  />
                  <span>
                    {p === 'Government' ? 'Government Custodians' : p === 'Partner' ? 'Approved Industry Partners' : 'All Providers'}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#0B2545] mb-2">
              SLA Guarantee Tier
            </h2>
            <div className="space-y-1.5 text-xs text-[#5B6B7F]">
              <div className="flex items-center justify-between">
                <span>Tier 1 SLA (&lt; 250ms)</span>
                <span className="font-mono text-emerald-600 font-bold">4</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Tier 2 SLA (&lt; 500ms)</span>
                <span className="font-mono text-[#1F5FAD] font-bold">2</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Column 2: Flexible Product Listing Area */}
        <main className="space-y-4 min-w-0 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredProducts.map((prod) => {
              const isSelected = prod.id === selectedProductId;
              return (
                <div
                  key={prod.id}
                  onClick={() => handleSelectProduct(prod.id)}
                  className={`bg-white rounded-2xl p-5 border transition-all cursor-pointer shadow-xs flex flex-col justify-between min-w-0 ${
                    isSelected
                      ? 'border-[#1F5FAD] ring-2 ring-[#1F5FAD]/20 bg-[#FAFBFD]'
                      : 'border-[#E3E8EF] hover:border-[#7A9CC6] hover:bg-slate-50/50'
                  }`}
                >
                  <div className="space-y-2.5">
                    {/* Header badges */}
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          prod.provider.includes('Partner')
                            ? 'bg-teal-50 text-[#0E9F8E] border border-teal-200'
                            : 'bg-[#0B2545] text-white'
                        }`}
                      >
                        {prod.provider.includes('Partner') ? 'Partner' : 'Government'}
                      </span>
                      <span className="text-[10px] font-mono text-emerald-600 font-bold">
                        {prod.rating.split('(')[0]}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-[#0B2545] leading-snug line-clamp-2">
                      {prod.title}
                    </h3>
                    <div className="text-[11px] text-[#5B6B7F] line-clamp-1">
                      {prod.provider}
                    </div>
                    <p className="text-xs text-[#5B6B7F] line-clamp-2 leading-relaxed">
                      {prod.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <span className="text-[#5B6B7F]">{prod.subscribers} subscribers</span>
                    <button
                      type="button"
                      className="font-bold text-[#1F5FAD] hover:underline flex items-center gap-0.5"
                    >
                      <span>Inspect</span>
                      <ArrowRight size={11} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </main>

        {/* Column 3: Permanent Product Detail Panel on desktop (300px-360px) */}
        <aside className="hidden xl:block bg-white rounded-2xl p-5 border border-[#E3E8EF] shadow-xs min-w-0 sticky top-24">
          <ProductDetailContent />
        </aside>
      </div>

      {/* Slide-over Drawer for Mobile & Tablet (< xl) */}
      {mobileDrawerOpen && (
        <div className="xl:hidden fixed inset-0 z-50 bg-[#0B2545]/60 backdrop-blur-xs flex justify-end">
          <div className="bg-white w-full max-w-md h-full overflow-y-auto p-6 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#E3E8EF] mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0B2545]">
                  Product Detail Inspector
                </span>
                <button
                  onClick={() => setMobileDrawerOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-[#0B2545] hover:bg-slate-100"
                >
                  <X size={18} />
                </button>
              </div>
              <ProductDetailContent />
            </div>

            <div className="pt-4 border-t border-[#E3E8EF] mt-6">
              <button
                onClick={() => setMobileDrawerOpen(false)}
                className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-[#0B2545]"
              >
                Close Drawer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

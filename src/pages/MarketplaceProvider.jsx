import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Storefront,
  Plus,
  UsersThree,
  Eye,
  CheckCircle,
  Clock,
  ArrowRight,
  ShieldCheck,
  Pulse,
  Tag,
  ToggleLeft,
  ToggleRight,
  PencilSimple,
  ChartLineUp
} from '@phosphor-icons/react';
import { useApp } from '../context/AppContext';

export default function MarketplaceProvider() {
  const { addToast } = useApp();

  const [products, setProducts] = useState([
    {
      id: 'mp-dmt-01',
      title: 'Building Footprints 3D (LOD2)',
      slug: 'building-footprints-3d',
      category: '3D Spatial Dataset',
      status: 'Published',
      subscribers: 142,
      activeRequests: 4,
      slaCompliance: '99.94%',
      avgLatency: '145 ms',
      lastUpdated: '15 Sep 2027',
      isPublic: true
    },
    {
      id: 'mp-dmt-02',
      title: 'Land Parcels Real-Time Validation API',
      slug: 'land-parcels-api',
      category: 'Web Service API',
      status: 'Published',
      subscribers: 88,
      activeRequests: 2,
      slaCompliance: '99.98%',
      avgLatency: '184 ms',
      lastUpdated: '01 Sep 2027',
      isPublic: true
    },
    {
      id: 'mp-dmt-03',
      title: 'Subterranean Utility Corridor Rights-of-Way',
      slug: 'utility-corridors-row',
      category: 'Vector Features',
      status: 'Under Review',
      subscribers: 0,
      activeRequests: 0,
      slaCompliance: 'Pending QA',
      avgLatency: 'N/A',
      lastUpdated: '10 Oct 2027',
      isPublic: false
    }
  ]);

  const [isNewProductModalOpen, setIsNewProductModalOpen] = useState(false);
  const [newProductForm, setNewProductForm] = useState({
    title: '',
    category: '3D Spatial Dataset',
    description: '',
    slaTier: 'Tier 1 SLA'
  });

  const togglePublishStatus = (id) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const next = !p.isPublic;
          addToast(
            `${p.title} is now ${next ? 'Published on Marketplace' : 'Unpublished (Draft)'}`,
            next ? 'success' : 'info'
          );
          return {
            ...p,
            isPublic: next,
            status: next ? 'Published' : 'Unpublished'
          };
        }
        return p;
      })
    );
  };

  const handleCreateProduct = (e) => {
    e.preventDefault();
    if (!newProductForm.title.trim()) {
      addToast('Please enter a product title', 'error');
      return;
    }
    const newEntry = {
      id: `mp-dmt-0${products.length + 1}`,
      title: newProductForm.title,
      slug: newProductForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category: newProductForm.category,
      status: 'Submitted for Clearinghouse QA',
      subscribers: 0,
      activeRequests: 0,
      slaCompliance: 'In Gateway',
      avgLatency: 'N/A',
      lastUpdated: 'Just now',
      isPublic: false
    };
    setProducts([newEntry, ...products]);
    setIsNewProductModalOpen(false);
    setNewProductForm({ title: '', category: '3D Spatial Dataset', description: '', slaTier: 'Tier 1 SLA' });
    addToast('New product drafted and submitted to Clearinghouse QA Gateway', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-[#E3E8EF] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0E9F8E]" />
            <span className="text-xs font-bold text-[#0E9F8E] uppercase tracking-wider">
              Custodian Provider Studio · DMT Publisher
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B2545] tracking-tight">
            Marketplace Provider Workspace
          </h1>
          <p className="text-xs sm:text-sm text-[#5B6B7F] mt-1">
            Publish spatial data products, manage subscriber access requests, and monitor API SLA compliance.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/marketplace"
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-white hover:bg-slate-50 text-[#0B2545] border border-[#E3E8EF] transition-colors"
          >
            Public View
          </Link>
          <button
            onClick={() => setIsNewProductModalOpen(true)}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#0E9F8E] hover:bg-[#0b8073] text-white transition-colors flex items-center gap-1.5"
          >
            <Plus size={16} weight="bold" />
            Publish New Product
          </button>
        </div>
      </div>

      {/* Provider KPI overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#E3E8EF] shadow-xs">
          <div className="text-[11px] font-semibold text-[#5B6B7F] uppercase tracking-wider">
            Total Offerings
          </div>
          <div className="text-2xl font-extrabold text-[#0B2545] mt-1.5">{products.length} Products</div>
          <div className="text-[11px] text-emerald-600 font-medium mt-1">2 Active on Marketplace</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E3E8EF] shadow-xs">
          <div className="text-[11px] font-semibold text-[#5B6B7F] uppercase tracking-wider">
            Active Subscribers
          </div>
          <div className="text-2xl font-extrabold text-[#0B2545] mt-1.5">230 Entities</div>
          <div className="text-[11px] text-emerald-600 font-medium mt-1">+14 this month</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E3E8EF] shadow-xs">
          <div className="text-[11px] font-semibold text-[#5B6B7F] uppercase tracking-wider">
            Pending DSA Inquiries
          </div>
          <div className="text-2xl font-extrabold text-[#1F5FAD] mt-1.5">6 Requests</div>
          <div className="text-[11px] text-[#5B6B7F] mt-1">Requires Custodian review</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E3E8EF] shadow-xs">
          <div className="text-[11px] font-semibold text-[#5B6B7F] uppercase tracking-wider">
            Aggregate Provider SLA
          </div>
          <div className="text-2xl font-extrabold text-emerald-600 mt-1.5">99.96%</div>
          <div className="text-[11px] text-emerald-600 font-medium mt-1">Tier 1 Target: 99.90%</div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-[#E3E8EF] shadow-xs overflow-hidden">
        <div className="p-5 border-b border-[#E3E8EF] flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#0B2545] uppercase tracking-wider">
              Published Offerings & Catalog Status
            </h3>
            <p className="text-xs text-[#5B6B7F] mt-0.5">
              Live status across Abu Dhabi Government and Authorized Partner marketplace consumers.
            </p>
          </div>
          <span className="text-xs font-semibold text-[#5B6B7F]">
            Custodian: Department of Municipalities and Transport
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFC] border-b border-[#E3E8EF] text-[#5B6B7F] font-bold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-5">Product Title & Category</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Subscribers</th>
                <th className="py-3 px-4">Pending Requests</th>
                <th className="py-3 px-4">SLA Compliance</th>
                <th className="py-3 px-4">Last Sync</th>
                <th className="py-3 px-4 text-center">Marketplace Visibility</th>
                <th className="py-3 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E3E8EF]">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-4 px-5">
                    <div className="font-bold text-[#0B2545]">{p.title}</div>
                    <div className="text-[11px] text-[#5B6B7F] mt-0.5">{p.category}</div>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                        p.status === 'Published'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : p.status === 'Under Review'
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : 'bg-blue-50 text-blue-700 border-blue-200'
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 font-mono font-bold text-[#0B2545]">
                    {p.subscribers} entities
                  </td>
                  <td className="py-4 px-4">
                    {p.activeRequests > 0 ? (
                      <Link
                        to="/publishing"
                        className="text-xs font-bold text-[#1F5FAD] hover:underline"
                      >
                        {p.activeRequests} pending
                      </Link>
                    ) : (
                      <span className="text-[#5B6B7F]">0 pending</span>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-bold text-emerald-600">{p.slaCompliance}</span>
                    {p.avgLatency !== 'N/A' && (
                      <span className="text-[10px] text-[#5B6B7F] block">p95: {p.avgLatency}</span>
                    )}
                  </td>
                  <td className="py-4 px-4 text-[#5B6B7F]">{p.lastUpdated}</td>
                  <td className="py-4 px-4 text-center">
                    <button
                      onClick={() => togglePublishStatus(p.id)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg border transition-all"
                      title="Toggle marketplace visibility"
                    >
                      {p.isPublic ? (
                        <>
                          <ToggleRight size={20} weight="fill" className="text-[#0E9F8E]" />
                          <span className="text-[#0E9F8E]">Active</span>
                        </>
                      ) : (
                        <>
                          <ToggleLeft size={20} className="text-slate-400" />
                          <span className="text-slate-500">Draft</span>
                        </>
                      )}
                    </button>
                  </td>
                  <td className="py-4 px-5 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Link
                        to={`/marketplace/${p.slug}`}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-[#0B2545] hover:bg-slate-100 transition-colors"
                        title="View Public Card"
                      >
                        <Eye size={16} />
                      </Link>
                      <button
                        onClick={() => addToast(`Opened editor for ${p.title}`, 'info')}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-[#0B2545] hover:bg-slate-100 transition-colors"
                        title="Edit Product"
                      >
                        <PencilSimple size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Product Modal */}
      {isNewProductModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#0B2545]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-[#E3E8EF] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E3E8EF]">
              <h3 className="text-base font-bold text-[#0B2545]">Publish New Data Product</h3>
              <button
                onClick={() => setIsNewProductModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-[#0B2545] mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Master Plan Zoning Geometries LOD1"
                  value={newProductForm.title}
                  onChange={(e) => setNewProductForm({ ...newProductForm, title: e.target.value })}
                  className="w-full h-10 px-3 rounded-xl border border-[#E3E8EF] outline-none focus:border-[#0E9F8E]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#0B2545] mb-1">Product Category</label>
                <select
                  value={newProductForm.category}
                  onChange={(e) => setNewProductForm({ ...newProductForm, category: e.target.value })}
                  className="w-full h-10 px-3 rounded-xl border border-[#E3E8EF] outline-none focus:border-[#0E9F8E] bg-white"
                >
                  <option value="3D Spatial Dataset">3D Spatial Dataset</option>
                  <option value="Web Service API">Web Service API (OGC API Features / REST)</option>
                  <option value="Statistical Grid">Statistical Grid (GeoJSON / NetCDF)</option>
                  <option value="Multi-Temporal Dataset">Multi-Temporal Satellite Dataset</option>
                  <option value="AI Model Output">GeoAI Anomaly / Change Detection Feed</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-[#0B2545] mb-1">Target SLA Level</label>
                <select
                  value={newProductForm.slaTier}
                  onChange={(e) => setNewProductForm({ ...newProductForm, slaTier: e.target.value })}
                  className="w-full h-10 px-3 rounded-xl border border-[#E3E8EF] outline-none focus:border-[#0E9F8E] bg-white"
                >
                  <option value="Tier 1 SLA">Tier 1 SLA (99.95% uptime, p95 &lt; 250ms)</option>
                  <option value="Tier 2 SLA">Tier 2 SLA (99.50% uptime, p95 &lt; 500ms)</option>
                  <option value="Standard Tier">Standard Tier (Best Effort)</option>
                </select>
              </div>

              <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-800 text-[11px] leading-relaxed">
                <strong>Clearinghouse QA Check:</strong> New products undergo automated 6-point syntactic verification and custodial classification before appearing publicly on the Marketplace.
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E3E8EF]">
                <button
                  type="button"
                  onClick={() => setIsNewProductModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#0E9F8E] hover:bg-[#0b8073] text-white font-bold transition-colors"
                >
                  Submit for QA Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

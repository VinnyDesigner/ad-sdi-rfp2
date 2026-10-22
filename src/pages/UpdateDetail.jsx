import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Calendar,
  ArrowLeft,
  ArrowRight,
  ShareNetwork,
  Tag,
  Building,
  CheckCircle
} from '@phosphor-icons/react';
import { latestUpdates } from '../data/portalData';
import { useApp } from '../context/AppContext';

export default function UpdateDetail() {
  const { slug } = useParams();
  const { addToast } = useApp();

  const item =
    latestUpdates.find((u) => u.id === slug || u.title.toLowerCase().includes(slug || '')) ||
    latestUpdates[0];

  const shareUpdate = () => {
    navigator.clipboard?.writeText(window.location.href);
    addToast('Article link copied to clipboard', 'info');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center justify-between">
        <Link
          to="/updates"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1F5FAD] hover:underline"
        >
          <ArrowLeft size={14} /> Back to Updates
        </Link>
        <button
          onClick={shareUpdate}
          className="inline-flex items-center gap-1 text-xs text-[#5B6B7F] hover:text-[#0B2545]"
        >
          <ShareNetwork size={14} /> Share
        </button>
      </div>

      {/* Main Article Container */}
      <article className="bg-white rounded-2xl border border-[#E3E8EF] shadow-xs overflow-hidden">
        <div className="h-64 sm:h-80 w-full overflow-hidden bg-slate-100">
          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
        </div>

        <div className="p-6 sm:p-10 space-y-5">
          <div className="flex items-center gap-3 text-xs text-[#5B6B7F]">
            <span
              className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full text-white"
              style={{ backgroundColor: item.categoryColor || '#1F5FAD' }}
            >
              {item.category}
            </span>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Calendar size={13} />
              <span>{item.date}</span>
            </div>
            <span>•</span>
            <span>{item.entity}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#0B2545] tracking-tight">
            {item.title}
          </h1>

          <div className="text-base text-[#14213D] leading-relaxed space-y-4 pt-2 border-t border-slate-100">
            <p className="font-semibold text-lg text-[#0B2545]">{item.desc}</p>
            <p className="text-sm text-[#5B6B7F] leading-relaxed">
              The Abu Dhabi Spatial Data Infrastructure (AD-SDI) has successfully deployed this milestone under the direction of the Department of Government Enablement (DGE). Government entities and licensed enterprise partners can immediately leverage these capabilities via the Clearinghouse Catalogue, OGC API endpoints, and the GeoAI Studio.
            </p>
            <p className="text-sm text-[#5B6B7F] leading-relaxed">
              Key operational parameters have been validated across the Abu Dhabi sovereign cloud, ensuring 99.9% uptime compliance and automated lineage tracking conforming to ISO 19115 standards.
            </p>
          </div>

          <div className="pt-6 border-t border-[#E3E8EF] flex items-center justify-between">
            <Link
              to="/catalogue"
              className="px-4 py-2 rounded-xl bg-[#0B2545] hover:bg-[#13315C] text-white text-xs font-semibold inline-flex items-center gap-2 transition-colors"
            >
              Browse Related Datasets <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}

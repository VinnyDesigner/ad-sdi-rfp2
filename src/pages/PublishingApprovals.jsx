import React, { useState } from 'react';
import {
  CheckSquare,
  CheckCircle,
  Warning,
  XCircle,
  Clock,
  ArrowRight,
  ShieldCheck,
  FileText,
  User,
  CaretRight,
  Tag,
  ArrowsClockwise
} from '@phosphor-icons/react';
import { useApp } from '../context/AppContext';

export default function PublishingApprovals() {
  const { submissions, approveSubmission, returnSubmission, rejectSubmission, user } = useApp();
  const [selectedSubId, setSelectedSubId] = useState('sub-01');
  const [activeTab, setActiveTab] = useState('my-queue');
  const [reviewComment, setReviewComment] = useState('');

  const selectedItem = submissions.find((s) => s.id === selectedSubId) || submissions[0];

  const stages = [
    { name: 'Provider onboarding', count: '12' },
    { name: 'Submitted', count: '24' },
    { name: 'Quality gateway', count: '6' },
    { name: 'Classification & audience', count: '4' },
    { name: 'Custodian approval', count: '5', active: true },
    { name: 'Published (30d)', count: '132' }
  ];

  const handleApprove = () => {
    approveSubmission(selectedItem.id, reviewComment || 'Approved for official sovereign release by custodian.');
    setReviewComment('');
  };

  const handleReturn = () => {
    returnSubmission(selectedItem.id, reviewComment || 'Returned with topology warning clarifications requested.');
    setReviewComment('');
  };

  const handleReject = () => {
    rejectSubmission(selectedItem.id, reviewComment || 'Rejected due to non-conformance with municipal standards.');
    setReviewComment('');
  };

  return (
    <div className="space-y-6">
      {/* Page Header (Brief S04) */}
      <div className="bg-white rounded-2xl p-6 border border-[#E3E8EF] shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B2545] tracking-tight">
              Publishing & Approvals
            </h1>
            <p className="text-xs sm:text-sm text-[#5B6B7F] mt-1">
              Every dataset, service and product passes automated quality, classification, and custodian sign-off before release.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-50 text-[#1E9E6A] border border-emerald-200">
              ● Governance Gate Healthy
            </span>
          </div>
        </div>

        {/* Queue Tabs */}
        <div className="flex items-center gap-6 border-b border-[#E3E8EF] mt-6 text-xs sm:text-sm font-semibold">
          <button
            onClick={() => setActiveTab('my-queue')}
            className={`py-3 relative ${activeTab === 'my-queue' ? 'text-[#0B2545]' : 'text-[#5B6B7F] hover:text-[#0B2545]'}`}
          >
            <span>My Queue ({submissions.length})</span>
            {activeTab === 'my-queue' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#1F5FAD] rounded-full" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('dmt')}
            className={`py-3 relative ${activeTab === 'dmt' ? 'text-[#0B2545]' : 'text-[#5B6B7F] hover:text-[#0B2545]'}`}
          >
            <span>Submitted by DMT (18)</span>
            {activeTab === 'dmt' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#1F5FAD] rounded-full" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('published')}
            className={`py-3 relative ${activeTab === 'published' ? 'text-[#0B2545]' : 'text-[#5B6B7F] hover:text-[#0B2545]'}`}
          >
            <span>Published (132)</span>
            {activeTab === 'published' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#1F5FAD] rounded-full" />
            )}
          </button>
        </div>
      </div>

      {/* Flow Tracker Card (Full width 104px per brief S04) */}
      <div className="bg-white rounded-2xl p-5 border border-[#E3E8EF] shadow-xs overflow-x-auto">
        <div className="text-[11px] font-bold uppercase tracking-wider text-[#5B6B7F] mb-3">
          Authoritative Release Pipeline Stages
        </div>
        <div className="flex items-center justify-between gap-3 min-w-[760px]">
          {stages.map((stage, idx) => (
            <React.Fragment key={stage.name}>
              <div className="flex-1 text-center">
                <div
                  className={`w-9 h-9 mx-auto rounded-full flex items-center justify-center font-bold text-xs mb-1.5 transition-all ${
                    stage.active
                      ? 'bg-[#FFC20E] text-[#0B2545] ring-4 ring-[#FFC20E]/20'
                      : idx < 4
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-100 text-[#5B6B7F] border border-slate-200'
                  }`}
                >
                  {idx < 4 ? '✓' : idx + 1}
                </div>
                <div className="text-xs font-bold text-[#14213D] leading-tight">{stage.name}</div>
                <div className="text-[11px] text-[#5B6B7F] font-mono mt-0.5">{stage.count} items</div>
              </div>
              {idx < stages.length - 1 && (
                <div className="h-[2px] flex-1 bg-[#E3E8EF] max-w-[60px]" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Main Grid: Queue Table (8 cols) + Detail Review Panel (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Queue Table (8 cols) */}
        <div className="lg:col-span-7 xl:col-span-8 bg-white rounded-2xl border border-[#E3E8EF] shadow-xs overflow-hidden">
          <div className="p-4 border-b border-[#E3E8EF] flex items-center justify-between bg-[#F5F7FA]">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#0B2545]">
              Submissions Requiring Custodian Action
            </h2>
            <span className="text-xs text-[#5B6B7F]">{submissions.length} active records</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#F5F7FA] text-[#5B6B7F] uppercase tracking-wider font-semibold border-b border-[#E3E8EF]">
                <tr>
                  <th className="p-3">Item & Version</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Entity</th>
                  <th className="p-3">Audience</th>
                  <th className="p-3">Stage</th>
                  <th className="p-3">Quality</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {submissions.map((item) => {
                  const isSelected = item.id === selectedSubId;
                  return (
                    <tr
                      key={item.id}
                      onClick={() => setSelectedSubId(item.id)}
                      className={`cursor-pointer transition-colors ${
                        isSelected ? 'bg-[#EEF3FA] font-medium' : 'hover:bg-[#F9FBFD]'
                      }`}
                    >
                      <td className="p-3">
                        <div className="font-bold text-[#14213D]">{item.title}</div>
                        <div className="text-[10px] text-[#5B6B7F] font-mono">{item.version}</div>
                      </td>
                      <td className="p-3">
                        <span className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-[#5B6B7F]">
                          {item.type}
                        </span>
                      </td>
                      <td className="p-3 font-semibold text-[#0B2545]">{item.entityShort}</td>
                      <td className="p-3">
                        <span className="text-[10px] px-2 py-0.5 rounded-full border border-slate-200">
                          {item.targetAudience}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className={`text-[11px] px-2 py-0.5 rounded-full font-semibold ${
                          item.stage === 'Published'
                            ? 'bg-emerald-50 text-[#1E9E6A]'
                            : item.stage.includes('approval')
                            ? 'bg-amber-50 text-[#E8A317]'
                            : 'bg-blue-50 text-[#1F5FAD]'
                        }`}>
                          {item.stage}
                        </span>
                      </td>
                      <td className="p-3">
                        {item.qualityResult === 'passed' ? (
                          <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold">
                            <CheckCircle size={14} weight="fill" /> Passed
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-amber-600 font-semibold">
                            <Warning size={14} weight="fill" /> 2 Warn
                          </span>
                        )}
                      </td>
                      <td className="p-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedSubId(item.id);
                          }}
                          className="text-xs font-bold text-[#1F5FAD] hover:underline"
                        >
                          Review →
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Item Review Panel (4 cols per brief S04) */}
        <div className="lg:col-span-5 xl:col-span-4 bg-white rounded-2xl border border-[#E3E8EF] shadow-xs p-6 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-blue-50 text-[#1F5FAD]">
                {selectedItem.module}
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                {selectedItem.version}
              </span>
            </div>
            <h2 className="text-xl font-extrabold text-[#0B2545]">{selectedItem.title}</h2>
            <div className="text-xs text-[#5B6B7F] mt-1">Submitted by {selectedItem.entity}</div>
          </div>

          {/* Quality checks */}
          <div>
            <div className="text-xs font-bold text-[#0B2545] uppercase tracking-wider mb-2.5">
              6-Point Quality Checks
            </div>
            <div className="space-y-1.5">
              {selectedItem.checks?.map((chk) => (
                <div key={chk.name} className="flex items-center justify-between p-2 rounded-lg bg-[#F5F7FA] text-xs">
                  <div>
                    <span className="font-semibold text-[#14213D] block">{chk.name}</span>
                    <span className="text-[10px] text-[#5B6B7F]">{chk.detail}</span>
                  </div>
                  {chk.passed ? (
                    <CheckCircle size={16} weight="fill" className="text-emerald-500 shrink-0" />
                  ) : (
                    <Warning size={16} weight="fill" className="text-amber-500 shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Classification & audience */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[#5B6B7F]">Security Classification:</span>
              <span className="font-bold text-[#1F5FAD]">{selectedItem.classification}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#5B6B7F]">Audience Scope:</span>
              <span className="font-bold text-[#14213D]">{selectedItem.targetAudience}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#5B6B7F]">Legal Conformance:</span>
              <span className="font-semibold text-emerald-600">Verified ✓</span>
            </div>
          </div>

          {/* Review comment input */}
          <div>
            <label className="block text-xs font-semibold text-[#14213D] mb-1">
              Custodian Review Comments / Instructions
            </label>
            <textarea
              rows={2}
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
              placeholder="Add verification notes or instructions for the data steward..."
              className="w-full p-2.5 rounded-lg border border-[#E3E8EF] text-xs outline-none focus:border-[#1F5FAD]"
            />
          </div>

          {/* Approval Actions Buttons */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <button
              onClick={handleApprove}
              className="w-full py-2.5 rounded-xl text-xs font-bold bg-[#1F5FAD] hover:bg-[#164b8a] text-white shadow-xs transition-colors flex items-center justify-center gap-2"
            >
              <CheckCircle size={16} weight="bold" />
              <span>Approve for Publication</span>
            </button>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleReturn}
                className="py-2 rounded-xl text-xs font-semibold bg-white hover:bg-slate-50 text-[#0B2545] border border-[#E3E8EF] transition-colors"
              >
                Return with Comments
              </button>
              <button
                onClick={handleReject}
                className="py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 border border-rose-200 transition-colors"
              >
                Reject
              </button>
            </div>
          </div>

          {/* Audit History */}
          <div>
            <div className="text-[11px] font-bold text-[#5B6B7F] uppercase tracking-wider mb-2">
              Stage Audit History
            </div>
            <div className="space-y-2 text-[11px]">
              {selectedItem.auditTrail?.map((audit, i) => (
                <div key={i} className="flex items-start gap-2 text-[#5B6B7F]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1F5FAD] shrink-0 mt-1.5" />
                  <div>
                    <span className="font-semibold text-[#14213D]">{audit.action}</span>
                    <div className="text-[10px] text-slate-400">{audit.user} · {audit.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

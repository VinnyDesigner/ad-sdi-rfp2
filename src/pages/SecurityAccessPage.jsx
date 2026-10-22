import React, { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  CheckCircle,
  XCircle,
  Warning,
  Eye,
  Key,
  UserCheck,
  ArrowsClockwise,
  Fingerprint,
  FileText,
  Clock
} from '@phosphor-icons/react';
import { useApp } from '../context/AppContext';

export default function SecurityAccessPage() {
  const { accessRequests, approveAccessRequest, rejectAccessRequest, auditLog, addToast } = useApp();
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedRequestId, setExpandedRequestId] = useState('req-01');

  const complianceBadges = [
    'UAE Data Residency',
    'Approved Sovereign Cloud',
    'Encrypted in Transit & at Rest',
    '24/7 SIEM Connected',
    'Security Approval per Release',
    'Penetration Test Passed (Jul 2027)'
  ];

  const kpis = [
    { label: 'Active Sovereign Users', value: '4,820', sub: 'Across government & partners' },
    { label: 'Datasets Classified', value: '100%', sub: 'Mandatory ISO tagging complete', highlight: true },
    { label: 'Access Requests Pending', value: `${accessRequests.filter((r) => r.status === 'Pending').length}`, sub: 'Awaiting custodian action' },
    { label: 'Blocked Breaches (30d)', value: '23', sub: 'Prevented by automated firewall' },
    { label: 'Privileged MFA Coverage', value: '100%', sub: 'Hardware token & SSO enforced' }
  ];

  const roles = [
    { role: 'Public User', discover: true, viewOpen: true, reqMarket: false, publish: false, admin: false },
    { role: 'Approved Partner', discover: true, viewOpen: true, reqMarket: true, publish: false, admin: false },
    { role: 'Gov Data Steward', discover: true, viewOpen: true, reqMarket: true, publish: true, admin: false },
    { role: 'Entity Custodian', discover: true, viewOpen: true, reqMarket: true, publish: true, admin: false },
    { role: 'Platform Admin', discover: true, viewOpen: true, reqMarket: true, publish: true, admin: true }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header (Brief S14) */}
      <div className="bg-white rounded-2xl p-6 border border-[#E3E8EF] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1F5FAD]" />
            <span className="text-xs font-bold text-[#1F5FAD] uppercase tracking-wider">
              Sovereign Cybersecurity & Governance
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B2545] tracking-tight">
            Security & Access Console
          </h1>
          <p className="text-xs sm:text-sm text-[#5B6B7F] mt-1">
            Role-based classification, Data Sharing Agreement approvals, cryptographic token controls, and real-time audit logging.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-50 text-[#1E9E6A] border border-emerald-200 flex items-center gap-1.5">
            <ShieldCheck size={16} weight="fill" />
            <span>Sovereign Perimeter Active</span>
          </span>
        </div>
      </div>

      {/* Compliance Strip (48px per brief S14) */}
      <div className="bg-white rounded-2xl p-3.5 border border-[#E3E8EF] shadow-xs flex items-center justify-between gap-2 overflow-x-auto">
        {complianceBadges.map((badge) => (
          <div
            key={badge}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#F5F7FA] border border-[#E3E8EF] text-xs font-semibold text-[#0B2545] shrink-0"
          >
            <CheckCircle size={14} weight="fill" className="text-emerald-500" />
            <span>{badge}</span>
          </div>
        ))}
      </div>

      {/* KPI Row (5 cards per brief S14) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {kpis.map((k) => (
          <div key={k.label} className="bg-white rounded-2xl p-5 border border-[#E3E8EF] shadow-xs flex flex-col justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#5B6B7F]">
              {k.label}
            </span>
            <div className={`text-2xl lg:text-3xl font-extrabold font-mono tracking-tight my-2 ${
              k.highlight ? 'text-[#1F5FAD]' : 'text-[#0B2545]'
            }`}>
              {k.value}
            </div>
            <div className="text-[11px] text-[#5B6B7F] border-t border-slate-100 pt-2 truncate">
              {k.sub}
            </div>
          </div>
        ))}
      </div>

      {/* Row 2: Classification Donut + Release Gate (4 cols) & Access Requests Table (8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Classification Donut & Mini Release Gate */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-5 border border-[#E3E8EF] shadow-xs space-y-5">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#0B2545]">
                Classification Distribution
              </h2>
              <span className="text-[10px] text-slate-400 font-mono">2,480 Datasets</span>
            </div>

            {/* Donut representation */}
            <div className="p-3 bg-[#F9FBFD] rounded-xl border border-slate-100 flex items-center justify-around text-xs">
              <div className="space-y-1 text-[11px]">
                <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-emerald-500" /> Open: <strong>26%</strong></div>
                <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-[#1F5FAD]" /> Shared: <strong>54%</strong></div>
                <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-amber-500" /> Restricted: <strong>17%</strong></div>
                <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-rose-500" /> Confidential: <strong>3%</strong></div>
              </div>
              <div className="w-20 h-20 rounded-full border-8 border-[#1F5FAD] border-l-emerald-500 border-r-amber-500 border-b-rose-500 flex items-center justify-center font-bold text-xs">
                100%
              </div>
            </div>
          </div>

          {/* Mini stage tracker for Release R-2027.09 per brief S14 */}
          <div className="pt-4 border-t border-slate-100 space-y-2">
            <span className="text-xs font-bold text-[#0B2545] uppercase tracking-wider block">
              Release R-2027.09 Security Gate
            </span>
            <div className="grid grid-cols-4 gap-1 text-center text-[10px] font-semibold">
              <div className="p-2 rounded bg-emerald-50 text-emerald-700">Assessment ✓</div>
              <div className="p-2 rounded bg-emerald-50 text-emerald-700">Pen Test ✓</div>
              <div className="p-2 rounded bg-amber-50 text-amber-700">Whitelisting ⧗</div>
              <div className="p-2 rounded bg-slate-100 text-slate-400">Approval ○</div>
            </div>
          </div>
        </div>

        {/* Right: Table Access Requests (8 cols per brief S14) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-[#E3E8EF] shadow-xs overflow-hidden">
          <div className="p-4 border-b border-[#E3E8EF] flex items-center justify-between bg-[#F5F7FA]">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#0B2545]">
              Active Access Authorization Requests
            </h2>
            <span className="text-xs text-[#5B6B7F]">Click row to view DSA agreement details</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#F5F7FA] text-[#5B6B7F] uppercase tracking-wider font-semibold border-b border-[#E3E8EF]">
                <tr>
                  <th className="p-3">Requester</th>
                  <th className="p-3">Entity</th>
                  <th className="p-3">Dataset</th>
                  <th className="p-3">Classification</th>
                  <th className="p-3">Waiting</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {accessRequests.map((req) => {
                  const isExpanded = expandedRequestId === req.id;
                  return (
                    <React.Fragment key={req.id}>
                      <tr
                        onClick={() => setExpandedRequestId(isExpanded ? null : req.id)}
                        className={`cursor-pointer transition-colors ${
                          isExpanded ? 'bg-[#EEF3FA]' : 'hover:bg-[#F9FBFD]'
                        }`}
                      >
                        <td className="p-3 font-bold text-[#14213D]">{req.requester}</td>
                        <td className="p-3 text-[#5B6B7F]">{req.entity}</td>
                        <td className="p-3 font-semibold text-[#0B2545] max-w-[180px] truncate">{req.dataset}</td>
                        <td className="p-3">
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-[#0B2545] font-semibold">
                            {req.classification}
                          </span>
                        </td>
                        <td className="p-3 text-[#5B6B7F] font-mono">{req.waiting}</td>
                        <td className="p-3">
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                            req.status === 'Approved'
                              ? 'bg-emerald-50 text-emerald-700'
                              : req.status === 'Rejected'
                              ? 'bg-rose-50 text-rose-700'
                              : 'bg-amber-50 text-amber-700'
                          }`}>
                            {req.status}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          {req.status === 'Pending' ? (
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  approveAccessRequest(req.id);
                                }}
                                className="p-1 rounded bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                                title="Approve Request"
                              >
                                <CheckCircle size={16} weight="bold" />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  rejectAccessRequest(req.id);
                                }}
                                className="p-1 rounded bg-rose-50 text-rose-700 hover:bg-rose-100"
                                title="Reject Request"
                              >
                                <XCircle size={16} weight="bold" />
                              </button>
                            </div>
                          ) : (
                            <span className="text-[11px] text-slate-400 font-medium">Logged</span>
                          )}
                        </td>
                      </tr>

                      {/* Expanded Details Row per brief S14 */}
                      {isExpanded && (
                        <tr className="bg-blue-50/40 border-b border-blue-100">
                          <td colSpan={7} className="p-4 text-xs text-[#14213D] space-y-2">
                            <div className="flex items-center justify-between text-[11px]">
                              <span>Formal Agreement: <strong className="font-mono text-[#1F5FAD]">{req.dsa}</strong></span>
                              <span>Approver Custodian: <strong>{req.approver}</strong></span>
                            </div>
                            <div className="p-2.5 rounded-lg bg-white border border-[#E3E8EF] text-[#5B6B7F]">
                              <span className="font-semibold text-[#14213D] block mb-0.5">Stated Intended Purpose:</span>
                              {req.purpose}
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Row 3: Role Matrix (5 cols) + Audit Log Stream (7 cols) per brief S14 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Role Permission Matrix */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-5 border border-[#E3E8EF] shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#0B2545]">
              Sovereign RBAC Permissions Matrix
            </h2>
            <span className="text-[10px] text-slate-400 font-mono">5 Persona Roles</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-center">
              <thead className="text-[10px] text-slate-400 uppercase border-b border-slate-100">
                <tr>
                  <th className="text-left py-1.5">Role</th>
                  <th className="py-1.5">Discover</th>
                  <th className="py-1.5">Open</th>
                  <th className="py-1.5">DSA Req</th>
                  <th className="py-1.5">Publish</th>
                  <th className="py-1.5">Admin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-[11px]">
                {roles.map((r) => (
                  <tr key={r.role}>
                    <td className="text-left py-2 font-semibold text-[#14213D]">{r.role}</td>
                    <td className="py-2 text-emerald-600 font-bold">{r.discover ? '✓' : '—'}</td>
                    <td className="py-2 text-emerald-600 font-bold">{r.viewOpen ? '✓' : '—'}</td>
                    <td className="py-2 text-[#1F5FAD] font-bold">{r.reqMarket ? '✓' : '—'}</td>
                    <td className="py-2 font-bold">{r.publish ? '✓' : '—'}</td>
                    <td className="py-2 text-rose-600 font-bold">{r.admin ? '✓' : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-[10px] text-[#5B6B7F] pt-2 border-t border-slate-100">
            + Fine-grained rules applied by classification · entity custodial rights · purpose validation
          </div>
        </div>

        {/* Right: Live Audit Log Stream per brief S14 */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-5 border border-[#E3E8EF] shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#E3E8EF]">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#0B2545]">
              Real-Time Security Audit Stream
            </h2>
            <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Live SIEM Ledger
            </span>
          </div>

          <div className="space-y-2 max-h-56 overflow-y-auto text-xs">
            {auditLog.map((log) => (
              <div
                key={log.id}
                className="p-2.5 rounded-xl bg-[#F9FBFD] border border-slate-100 flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-[10px] font-mono text-[#5B6B7F] shrink-0">{log.time}</span>
                  <div className="min-w-0">
                    <span className="font-semibold text-[#14213D] block truncate">{log.action}: {log.resource}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{log.user}</span>
                  </div>
                </div>

                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold shrink-0 ${
                  log.result === 'Allowed' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                }`}>
                  {log.result}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

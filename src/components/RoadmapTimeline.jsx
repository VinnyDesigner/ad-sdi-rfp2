import React from 'react';
import { CheckCircle, Flag, ShieldCheck, Clock, ArrowsClockwise } from '@phosphor-icons/react';
import { roadmapPhases, programmeMeta, workstreamLanes } from '../data/roadmap';

export default function RoadmapTimeline() {
  return (
    <div className="roadmap-container">
      {/* Programme Meta Header */}
      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        padding: '24px 28px',
        marginBottom: '36px',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <span className="badge badge-gold">Baseline Schedule: {programmeMeta.timeframe}</span>
              <span className="badge badge-success">● Status: {programmeMeta.status}</span>
            </div>
            <h3 style={{ margin: 0, fontSize: '1.4rem', color: 'var(--navy-900)' }}>
              {programmeMeta.title}
            </h3>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              {programmeMeta.baselineDate} · Sponsor: {programmeMeta.sponsor}
            </span>
          </div>

          <div style={{ background: 'rgba(255, 194, 14, 0.1)', border: '1px solid var(--gold-500)', borderRadius: 'var(--radius-md)', padding: '10px 16px', maxWidth: '420px' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', color: '#8C6200', letterSpacing: '0.05em' }}>
              Critical Path Sequence
            </span>
            <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--navy-900)', marginTop: '2px' }}>
              {programmeMeta.criticalPath}
            </div>
          </div>
        </div>

        {/* Governance Cadence Bar */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', paddingTop: '16px', borderTop: '1px solid var(--border-light)' }}>
          {programmeMeta.governanceRhythm.map((gov, idx) => (
            <div key={idx} style={{ background: 'var(--canvas)', borderRadius: 'var(--radius-sm)', padding: '10px 14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <strong style={{ fontSize: '0.84rem', color: 'var(--navy-900)' }}>{gov.body}</strong>
                <span style={{ fontSize: '0.72rem', background: 'var(--navy-100)', color: 'var(--navy-900)', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>
                  {gov.cadence}
                </span>
              </div>
              <span style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', display: 'block' }}>
                {gov.focus}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 4-Phase Delivery Timeline */}
      <div className="roadmap-timeline">
        {roadmapPhases.map((phase, idx) => (
          <div key={phase.code} className="roadmap-phase-card">
            <div className="phase-node" style={{ backgroundColor: phase.leadColor }}>
              <span>{phase.code}</span>
            </div>

            <div className="phase-content">
              <div className="phase-meta-header">
                <div className="phase-title-wrap">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: phase.leadColor, letterSpacing: '0.05em' }}>
                      {phase.phase} · {phase.period}
                    </span>
                    <span className={`badge ${phase.gateStatus.includes('Completed') ? 'badge-success' : phase.gateStatus.includes('Current') ? 'badge-gold' : 'badge-navy'}`}>
                      {phase.gate}: {phase.gateStatus}
                    </span>
                  </div>
                  <h3 style={{ marginTop: '2px' }}>{phase.title}</h3>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span className="phase-duration">{phase.gateTitle}</span>
                </div>
              </div>

              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', marginBottom: '14px', lineHeight: 1.6 }}>
                {phase.objective}
              </p>

              {/* Target Deliverables Grid */}
              <div style={{ background: 'var(--canvas)', padding: '16px 20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', marginBottom: '14px' }}>
                <span style={{ fontSize: '0.74rem', fontWeight: 800, color: 'var(--navy-900)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '10px' }}>
                  Target Phase Deliverables:
                </span>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '10px' }}>
                  {phase.deliverables.map((del) => (
                    <div
                      key={del.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '8px 12px',
                        background: 'var(--surface)',
                        border: '1px solid var(--border)',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.84rem'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontWeight: 800, color: 'var(--navy-900)', fontSize: '0.78rem' }}>
                          {del.id}
                        </span>
                        <span style={{ color: 'var(--text-primary)' }}>{del.name}</span>
                      </div>
                      <span style={{
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        padding: '2px 6px',
                        borderRadius: '4px',
                        background: del.status === 'Done' ? 'var(--success-bg)' : del.status === 'In Progress' ? 'var(--info-bg)' : del.status === 'In Review' ? 'var(--warning-bg)' : 'var(--navy-50)',
                        color: del.status === 'Done' ? 'var(--success)' : del.status === 'In Progress' ? 'var(--info)' : del.status === 'In Review' ? '#A36800' : 'var(--text-secondary)'
                      }}>
                        {del.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Decision Gate */}
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
                fontSize: '0.84rem',
                color: 'var(--navy-900)',
                padding: '10px 14px',
                background: 'rgba(255, 194, 14, 0.12)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid rgba(255, 194, 14, 0.4)'
              }}>
                <ShieldCheck size={18} color="#8C6200" weight="bold" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong>{phase.gate} Governance Gate Decision Criteria:</strong>{' '}
                  <span style={{ color: 'var(--text-secondary)' }}>{phase.decisionCriteria}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

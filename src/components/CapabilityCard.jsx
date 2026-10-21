import React from 'react';
import { Link } from 'react-router-dom';
import {
  SquaresFour,
  Brain,
  Storefront,
  GraduationCap,
  Cube,
  GlobeHemisphereEast,
  ArrowRight,
  CheckCircle
} from '@phosphor-icons/react';

const iconMap = {
  SquaresFour: SquaresFour,
  Brain: Brain,
  Storefront: Storefront,
  GraduationCap: GraduationCap,
  Cube: Cube,
  GlobeHemisphereEast: GlobeHemisphereEast
};

export default function CapabilityCard({ capability }) {
  const IconComponent = iconMap[capability.icon] || SquaresFour;

  return (
    <div
      className="capability-card"
      style={{ '--card-accent': capability.color }}
    >
      <div className="capability-card-top">
        <div className="capability-icon-wrap">
          <IconComponent size={24} weight="bold" />
        </div>
        <span className="capability-module-code">{capability.code}</span>
      </div>

      <h3>{capability.title}</h3>
      <p>{capability.shortDesc}</p>

      {/* Target Metric Strip */}
      {capability.metrics && (
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'var(--canvas)',
          padding: '10px 14px',
          borderRadius: 'var(--radius-sm)',
          margin: '12px 0 16px 0',
          border: '1px solid var(--border-light)'
        }}>
          <div>
            <span style={{ fontSize: '1.15rem', fontWeight: 800, color: capability.color, display: 'block', lineHeight: 1.1 }}>
              {capability.metrics.primary}
            </span>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
              {capability.metrics.primaryLabel}
            </span>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--navy-900)', display: 'block', lineHeight: 1.1 }}>
              {capability.metrics.secondary}
            </span>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
              {capability.metrics.secondaryLabel}
            </span>
          </div>
        </div>
      )}

      <div className="capability-highlights">
        {capability.highlights.map((h, i) => (
          <div key={i} className="highlight-item">
            <CheckCircle size={16} weight="fill" />
            <span>{h}</span>
          </div>
        ))}
      </div>

      <div className="capability-card-footer">
        <Link to={capability.route} className="card-link">
          Explore Capability Proposal <ArrowRight size={14} weight="bold" />
        </Link>
      </div>
    </div>
  );
}

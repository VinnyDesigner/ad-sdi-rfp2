import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  MagnifyingGlass,
  ShieldCheck,
  LockKey,
  Brain,
  Cube,
  GraduationCap,
  ChartLineUp,
  Info,
  CheckCircle,
  Gauge
} from '@phosphor-icons/react';
import Container from '../components/Container';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import CallToAction from '../components/CallToAction';
import { valueThemes } from '../data/valueData';
import { platformSlaMetrics } from '../data/governanceData';

const iconMap = {
  MagnifyingGlass: MagnifyingGlass,
  ShieldCheck: ShieldCheck,
  LockKey: LockKey,
  Brain: Brain,
  Cube: Cube,
  GraduationCap: GraduationCap
};

export default function ExpectedValue() {
  return (
    <>
      <PageHero
        badge="Strategic Value Proposition & Return on Enablement"
        title="Expected Business & Operational Value"
        lead="Targeted organizational, operational, and public outcomes anticipated through the phased deployment of Abu Dhabi’s sovereign Spatial Data Infrastructure."
        breadcrumbItems={[{ label: 'Expected Value' }]}
      />

      {/* 1. Value Validation & Responsible Proposal Notice */}
      <section className="section-sm section-alt">
        <Container>
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)',
            padding: '20px 24px',
            display: 'flex',
            gap: '14px',
            alignItems: 'flex-start',
            boxShadow: 'var(--shadow-subtle)'
          }}>
            <Info size={24} color="var(--blue-600)" weight="fill" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong style={{ fontSize: '0.94rem', color: 'var(--navy-900)' }}>
                Responsible Measurement & Validation Principle:
              </strong>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: '4px 0 0 0', lineHeight: 1.6 }}>
                The strategic benefits and operational improvements presented in this proposal reflect targeted outcomes to be validated through systematic baseline tracking during programme execution. In accordance with DGE governance standards, financial efficiencies and productivity gains are subject to empirical evaluation against historical entity metrics.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Target Performance & Quality SLAs (Design Brief S05) */}
      <section className="section">
        <Container>
          <SectionHeading
            badge="Target Service Levels"
            badgeVariant="blue"
            title="Whole-of-Government Performance Commitments"
            subtitle="Authoritative platform availability, data currency, and quality thresholds agreed under the AD-SDI framework."
            align="center"
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '40px' }}>
            {platformSlaMetrics.map((sla, idx) => (
              <div
                key={idx}
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '24px',
                  textAlign: 'center',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <span style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--blue-600)', display: 'block', lineHeight: 1.1 }}>
                  {sla.metric}
                </span>
                <strong style={{ fontSize: '0.95rem', color: 'var(--navy-900)', display: 'block', margin: '8px 0 4px 0' }}>
                  {sla.label}
                </strong>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: 0 }}>
                  {sla.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 3. Six Strategic Value Pillars */}
      <section className="section section-alt">
        <Container>
          <SectionHeading
            badge="Impact Dimensions"
            badgeVariant="gold"
            title="Six Pillars of Targeted Government Value"
            subtitle="How each capability transforms operational workflows and strengthens public sector decision-making."
            align="center"
          />

          <div className="value-theme-grid">
            {valueThemes.map((theme) => {
              const IconComponent = iconMap[theme.icon] || ChartLineUp;
              return (
                <div key={theme.id} className="value-theme-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div className="theme-icon">
                        <IconComponent size={22} weight="bold" />
                      </div>
                      <h3 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--navy-900)' }}>{theme.title}</h3>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--blue-600)', display: 'block', lineHeight: 1.1 }}>
                        {theme.metricValue}
                      </span>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                        {theme.metricUnit}
                      </span>
                    </div>
                  </div>

                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: 1.6 }}>
                    {theme.intendedImprovement}
                  </p>

                  {/* Contributing Capabilities */}
                  <div style={{ marginBottom: '14px' }}>
                    <span style={{ fontSize: '0.74rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
                      Contributing Modules:
                    </span>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '4px' }}>
                      {theme.contributingCapabilities.map((cap, cIdx) => (
                        <span key={cIdx} style={{ fontSize: '0.74rem', background: 'var(--canvas)', border: '1px solid var(--border)', borderRadius: '4px', padding: '2px 8px', color: 'var(--navy-900)' }}>
                          {cap}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Stakeholder Example */}
                  <div className="value-section-box">
                    <div className="value-box-label">Stakeholder Scenario:</div>
                    <p style={{ fontSize: '0.84rem', margin: 0, lineHeight: 1.5 }}>
                      {theme.stakeholderExample}
                    </p>
                  </div>

                  {/* Key Tangible Outcomes */}
                  <div style={{ marginTop: '14px' }}>
                    <span style={{ fontSize: '0.74rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em', display: 'block', marginBottom: '6px' }}>
                      Anticipated Outcomes:
                    </span>
                    <ul style={{ margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {theme.keyOutcomes.map((out, oIdx) => (
                        <li key={oIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.82rem', color: 'var(--text-primary)' }}>
                          <CheckCircle size={14} color="var(--success)" weight="bold" style={{ flexShrink: 0, marginTop: '3px' }} />
                          <span>{out}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <CallToAction
        title="Tailor a Business Value Assessment for Your Department"
        lead="Our solution directors can facilitate an agency-level cost/benefit review and identify specific spatial duplicate processes that AD-SDI will eliminate."
        primaryBtnText="Initiate Value Assessment"
        primaryBtnLink="/contact"
      />
    </>
  );
}

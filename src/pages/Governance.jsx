import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ShieldCheck,
  LockKey,
  Database,
  CheckCircle,
  FileText,
  UserSwitch,
  Buildings,
  Eye,
  Key,
  Shield,
  Gauge
} from '@phosphor-icons/react';
import Container from '../components/Container';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import CallToAction from '../components/CallToAction';
import {
  classificationTiers,
  audienceDefinitions,
  qualityGatewayCheckpoints,
  securityAndResidency,
  platformSlaMetrics
} from '../data/governanceData';

export default function Governance() {
  const securityKPIs = [
    { metric: '4,820', label: 'Active Government Users', sub: 'Across 64 entities' },
    { metric: '100%', label: 'Datasets Classified', sub: 'Zero unclassified assets' },
    { metric: '100%', label: 'MFA Enforced', sub: 'Privileged & partner accounts' },
    { metric: '23', label: 'Blocked Infiltrations (30d)', sub: 'Zero security breaches' }
  ];

  return (
    <>
      <PageHero
        badge="Governance, Security & Sovereignty Blueprint"
        title="Governance, Security & Data Sovereignty"
        lead="Establishing uncompromising institutional trust through an automated 6-point Quality Gateway, 4-tier security classification, UAE sovereign cloud hosting, and bilateral data sharing agreements."
        breadcrumbItems={[{ label: 'Governance & Security' }]}
      />

      {/* 1. Security & Compliance KPIs Banner (Design Brief S14) */}
      <section className="section-sm section-alt">
        <Container>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            {securityKPIs.map((kpi, idx) => (
              <div key={idx} style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '20px', textAlign: 'center' }}>
                <span style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--blue-600)', display: 'block' }}>
                  {kpi.metric}
                </span>
                <strong style={{ fontSize: '0.9rem', color: 'var(--navy-900)' }}>{kpi.label}</strong>
                <span style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', display: 'block', marginTop: '2px' }}>
                  {kpi.sub}
                </span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 2. Separation of Classification vs Audience */}
      <section className="section">
        <Container>
          <div className="feature-split">
            <div>
              <SectionHeading
                badge="Governance Architecture"
                badgeVariant="navy"
                title="Separating Data Sensitivity from Access Rights"
                align="split"
              />
              <p>
                A frequent failure mode in government data sharing is conflating <strong>Sensitivity Classification</strong> with <strong>Target Audience</strong>. The AD-SDI framework strictly decouples these two dimensions:
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '20px' }}>
                <div style={{ padding: '16px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
                  <strong style={{ fontSize: '0.95rem', color: 'var(--navy-900)', display: 'block', marginBottom: '4px' }}>
                    1. Data Classification (Inherent Sensitivity)
                  </strong>
                  <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                    Measures the intrinsic confidentiality and regulatory risk of the spatial layer—categorized into Open, Shared, Restricted, or Confidential.
                  </p>
                </div>

                <div style={{ padding: '16px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
                  <strong style={{ fontSize: '0.95rem', color: 'var(--navy-900)', display: 'block', marginBottom: '4px' }}>
                    2. Audience Definition (Authorized Personas)
                  </strong>
                  <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                    Specifies who is legally permitted to discover and consume datasets—categorized into Internal Government, Marketplace Partners, or Public Civic.
                  </p>
                </div>
              </div>
            </div>

            {/* Classification Tiers Breakdown */}
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '28px', boxShadow: 'var(--shadow-sm)' }}>
              <h4 style={{ fontSize: '1.15rem', color: 'var(--navy-900)', marginBottom: '16px' }}>
                Four Security Classification Tiers
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {classificationTiers.map((tier) => (
                  <div
                    key={tier.tier}
                    style={{
                      padding: '14px 16px',
                      background: 'var(--canvas)',
                      borderRadius: 'var(--radius-sm)',
                      borderLeft: `4px solid ${tier.color}`
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <strong style={{ fontSize: '0.92rem', color: 'var(--navy-900)' }}>{tier.tier}</strong>
                        <span style={{ fontSize: '0.72rem', background: '#fff', border: '1px solid var(--border)', padding: '1px 6px', borderRadius: '4px' }}>
                          {tier.badge}
                        </span>
                      </div>
                      <span style={{ fontSize: '1.1rem', fontWeight: 800, color: tier.color }}>
                        {tier.percentage}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: '4px 0 0 0', lineHeight: 1.5 }}>
                      {tier.definition}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sovereign Governance Architecture Visual */}
          <div style={{ marginTop: '48px', background: '#0B2545', border: '1px solid rgba(255, 194, 14, 0.3)', borderRadius: 'var(--radius-xl)', overflow: 'hidden', boxShadow: 'var(--shadow-xl)' }}>
            <div style={{ padding: '24px 28px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <span className="badge badge-gold">Sovereign Architecture</span>
                <h3 style={{ fontSize: '1.35rem', color: '#FFFFFF', margin: '6px 0 2px 0' }}>
                  Concentric Geospatial Security & Trust Rings
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--steel-200)', margin: 0 }}>
                  Cryptographic access control, role-based boundary defense, and continuous ISO/IEC 27001 compliance under UAE sovereign jurisdiction.
                </p>
              </div>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--gold-400)', background: 'rgba(255, 194, 14, 0.12)', border: '1px solid rgba(255, 194, 14, 0.3)', padding: '6px 12px', borderRadius: '4px' }}>
                UAE Data Protection Law Compliant
              </span>
            </div>
            <div style={{ position: 'relative', width: '100%', maxHeight: '560px', overflow: 'hidden' }}>
              <img
                src="/assets/governance_framework.jpg"
                alt="Sovereign geospatial governance framework diagram showing classification tiers and security controls"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
          </div>
        </Container>
      </section>

      {/* 3. The 6-Point Automated Quality Gateway */}
      <section className="section section-alt">
        <Container>
          <SectionHeading
            badge="Data Certification"
            badgeVariant="blue"
            title="The 6-Point Automated Quality Gateway"
            subtitle="Automated ISO 19157 validation checks executed automatically before any layer is indexed into the Clearinghouse."
            align="center"
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
            {qualityGatewayCheckpoints.map((qg) => (
              <div
                key={qg.code}
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '24px',
                  boxShadow: 'var(--shadow-subtle)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--blue-600)' }}>
                    {qg.code}
                  </span>
                  <span className="badge badge-success" style={{ fontSize: '0.7rem' }}>
                    Zero Defect Gate
                  </span>
                </div>
                <h3 style={{ fontSize: '1.1rem', color: 'var(--navy-900)', margin: '4px 0 6px 0' }}>
                  {qg.checkpoint}
                </h3>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6 }}>
                  {qg.description}
                </p>
                <div style={{ marginTop: '14px', paddingTop: '10px', borderTop: '1px solid var(--border-light)', fontSize: '0.78rem', color: 'var(--navy-900)' }}>
                  <strong>Standard:</strong> {qg.standard}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 4. Sovereign UAE Cloud & Security Architecture */}
      <section className="section">
        <Container>
          <SectionHeading
            badge="National Sovereignty"
            badgeVariant="gold"
            title="Sovereign Infrastructure & Cyber Assurance"
            subtitle="Adhering to UAE federal and Abu Dhabi local cybersecurity directives to protect national spatial intelligence."
            align="center"
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
            {securityAndResidency.map((sec, idx) => (
              <div
                key={idx}
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: 'var(--shadow-subtle)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <ShieldCheck size={24} color="var(--success)" weight="bold" />
                  <span className="badge badge-success" style={{ fontSize: '0.7rem' }}>
                    {sec.status}
                  </span>
                </div>
                <h3 style={{ fontSize: '1.1rem', color: 'var(--navy-900)', marginBottom: '8px' }}>
                  {sec.title}
                </h3>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6 }}>
                  {sec.detail}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CallToAction
        title="Consult on Governance & Compliance Alignment"
        lead="Our security and data governance advisors can conduct a compliance mapping session against your entity’s existing data sharing agreements."
        primaryBtnText="Schedule Governance Consultation"
        primaryBtnLink="/contact"
      />
    </>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  SquaresFour,
  Brain,
  Storefront,
  GraduationCap,
  Cube,
  GlobeHemisphereEast,
  CheckCircle,
  ShieldCheck,
  Lightning,
  Sparkle
} from '@phosphor-icons/react';
import Container from '../components/Container';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import CapabilityCard from '../components/CapabilityCard';
import CallToAction from '../components/CallToAction';
import { capabilities } from '../data/capabilities';

export default function Capabilities() {
  return (
    <>
      <PageHero
        badge="Platform Capabilities Portfolio"
        title="Six Connected Platform Capabilities"
        lead="An integrated suite of six geospatial modules designed to transition Abu Dhabi government from basic map discovery to proactive, AI-powered spatial intelligence."
        breadcrumbItems={[{ label: 'Capabilities' }]}
      />

      {/* 1. Capabilities Portfolio Grid */}
      <section className="section section-alt">
        <Container>
          <SectionHeading
            badge="Modular Architecture"
            badgeVariant="navy"
            title="The Six Platform Modules (Modules A – F)"
            subtitle="Each module provides specialized capability while natively interconnecting through shared metadata, automated quality gateways, and unified security classification."
            align="center"
          />

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '24px',
            marginBottom: '48px'
          }}>
            {capabilities.map((cap) => (
              <CapabilityCard key={cap.id} capability={cap} />
            ))}
          </div>
        </Container>
      </section>

      {/* 2. Comprehensive Comparative Capabilities Matrix */}
      <section className="section">
        <Container>
          <SectionHeading
            badge="Comparative Matrix"
            badgeVariant="blue"
            title="Whole-of-Government Capabilities Matrix"
            subtitle="A detailed side-by-side comparison of scope, canonical scale metrics, technical standards, and primary custodians across all six modules."
            align="center"
          />

          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            overflowX: 'auto',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px' }}>
              <thead>
                <tr style={{ background: 'var(--canvas)', borderBottom: '2px solid var(--border)' }}>
                  <th style={{ padding: '16px 20px', fontSize: '0.82rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--navy-900)' }}>
                    Module
                  </th>
                  <th style={{ padding: '16px 20px', fontSize: '0.82rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--navy-900)' }}>
                    Primary Function
                  </th>
                  <th style={{ padding: '16px 20px', fontSize: '0.82rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--navy-900)' }}>
                    Target Scale (Brief)
                  </th>
                  <th style={{ padding: '16px 20px', fontSize: '0.82rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--navy-900)' }}>
                    Key Standards
                  </th>
                  <th style={{ padding: '16px 20px', fontSize: '0.82rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--navy-900)' }}>
                    Detailed Proposal
                  </th>
                </tr>
              </thead>
              <tbody>
                {capabilities.map((cap) => (
                  <tr key={cap.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ padding: '16px 20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: cap.color, flexShrink: 0 }} />
                        <div>
                          <strong style={{ fontSize: '0.9rem', color: 'var(--navy-900)', display: 'block' }}>
                            {cap.title}
                          </strong>
                          <span style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
                            {cap.code}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td style={{ padding: '16px 20px', fontSize: '0.86rem', color: 'var(--text-secondary)', maxWidth: '280px' }}>
                      {cap.shortDesc}
                    </td>

                    <td style={{ padding: '16px 20px' }}>
                      <strong style={{ fontSize: '0.96rem', color: cap.color, display: 'block' }}>
                        {cap.metrics.primary} {cap.metrics.primaryLabel}
                      </strong>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                        {cap.metrics.secondary} {cap.metrics.secondaryLabel}
                      </span>
                    </td>

                    <td style={{ padding: '16px 20px', fontSize: '0.8rem', color: 'var(--navy-900)' }}>
                      {cap.technicalSpecs ? cap.technicalSpecs[0].value : 'OGC & ISO Standards'}
                    </td>

                    <td style={{ padding: '16px 20px' }}>
                      <Link
                        to={cap.route}
                        className="btn btn-secondary"
                        style={{ padding: '6px 12px', fontSize: '0.78rem', whiteSpace: 'nowrap' }}
                      >
                        Deep Dive <ArrowRight size={12} weight="bold" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      {/* 3. Capability Interdependence Flow */}
      <section className="section section-alt">
        <Container>
          <div className="feature-split">
            <div>
              <SectionHeading
                badge="Synergy & Interdependence"
                badgeVariant="navy"
                title="The Multiplier Effect of Connected Capabilities"
                align="split"
              />
              <p>
                No single module operates in isolation. When <strong>Module A (Clearinghouse)</strong> cleanses and certifies cadastral layers, it immediately provides the ground truth required for <strong>Module B (GeoAI)</strong> to detect building expansions without false positives.
              </p>
              <p>
                Similarly, sanitized derivatives flow into <strong>Module E (Digital Twin)</strong> for 3D simulation, while <strong>Module C (Marketplace)</strong> enforces bilateral agreements for sensitive utility layers, and <strong>Module D (Capacity Building)</strong> trains the personnel to operate each component.
              </p>
              <div style={{ marginTop: '24px' }}>
                <Link to="/workflows" className="btn btn-secondary">
                  See Interconnected Workflows <ArrowRight size={16} weight="bold" />
                </Link>
              </div>
            </div>

            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '28px', boxShadow: 'var(--shadow-sm)' }}>
              <h4 style={{ fontSize: '1.1rem', color: 'var(--navy-900)', marginBottom: '16px' }}>
                Cross-Module Data Flow Pathways
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ padding: '12px 14px', background: 'var(--canvas)', borderRadius: 'var(--radius-sm)', borderLeft: '4px solid #1F5FAD' }}>
                  <strong style={{ fontSize: '0.86rem', color: 'var(--navy-900)' }}>Module A → Module B (GeoAI)</strong>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'block', marginTop: '2px' }}>
                    Authoritative land parcel boundaries provide the masking polygon grid for satellite change detection.
                  </span>
                </div>

                <div style={{ padding: '12px 14px', background: 'var(--canvas)', borderRadius: 'var(--radius-sm)', borderLeft: '4px solid #7B4FD6' }}>
                  <strong style={{ fontSize: '0.86rem', color: 'var(--navy-900)' }}>Module B → Module E (Digital Twin)</strong>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'block', marginTop: '2px' }}>
                    Verified building footprints and height extractions dynamically update LOD2/LOD3 semantic 3D meshes.
                  </span>
                </div>

                <div style={{ padding: '12px 14px', background: 'var(--canvas)', borderRadius: 'var(--radius-sm)', borderLeft: '4px solid #0E9F8E' }}>
                  <strong style={{ fontSize: '0.86rem', color: 'var(--navy-900)' }}>Module C → Module E & F</strong>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'block', marginTop: '2px' }}>
                    Marketplace governs restricted subterranean utilities, while sanitised public extracts feed Open Data.
                  </span>
                </div>

                <div style={{ padding: '12px 14px', background: 'var(--canvas)', borderRadius: 'var(--radius-sm)', borderLeft: '4px solid #E07B24' }}>
                  <strong style={{ fontSize: '0.86rem', color: 'var(--navy-900)' }}>Module D → All Modules</strong>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'block', marginTop: '2px' }}>
                    GeoMaturity curriculum trains 1,842 personnel across 64 entities in stewardship, QA, and GeoAI inspection.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <CallToAction
        title="Explore Detailed Capability Deep-Dives"
        lead="Select any of the six capability modules to review in-depth architecture specifications, use cases, and governance controls."
        primaryBtnText="Discover Module A: Clearinghouse"
        primaryBtnLink="/capabilities/clearinghouse"
      />
    </>
  );
}

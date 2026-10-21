import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle,
  ShieldCheck,
  FileText
} from '@phosphor-icons/react';
import Container from '../../components/Container';
import PageHero from '../../components/PageHero';
import SectionHeading from '../../components/SectionHeading';
import CallToAction from '../../components/CallToAction';
import { capabilities } from '../../data/capabilities';
import { qualityGatewayCheckpoints } from '../../data/governanceData';

export default function Clearinghouse() {
  const capData = capabilities.find((c) => c.id === 'clearinghouse');

  const metadataPillars = [
    {
      title: 'Custodial Provenance & Stewardship',
      desc: 'Explicit attribution of generating government entity (e.g. DMT, EAD), certifying division, and named data steward contact.'
    },
    {
      title: 'Temporal Validity & Refresh Cadence',
      desc: 'Explicit capture epoch, publication timestamp, and committed update SLA (daily, weekly, monthly, or on-event).'
    },
    {
      title: 'Spatial Coverage & Dual CRS',
      desc: 'Strict projection natively to UAE National Grid (EPSG:3997) with WGS 84 / UTM 40N fallback and quantified bounding box.'
    },
    {
      title: 'Automated 6-Point Quality Certification',
      desc: 'Transparent ISO 19157 validation report detailing topological consistency, zero duplicate nodes, and attribute completeness.'
    },
    {
      title: 'Classification & Permitted Audience',
      desc: 'Explicit security sensitivity badge (Open, Shared, Restricted, Confidential) and permitted audience profile (Internal, Marketplace, Open).'
    }
  ];

  return (
    <>
      <PageHero
        badge="Module A · #1F5FAD"
        title="Clearinghouse & Portal"
        lead="The central geospatial registry of Abu Dhabi — empowering 64 government entities to discover, evaluate, and stream 2,480 certified spatial datasets through unified OGC standards."
        breadcrumbItems={[
          { label: 'Capabilities', to: '/capabilities' },
          { label: 'Clearinghouse & Portal' }
        ]}
      />

      {/* 1. Scale & Performance Metrics Banner */}
      <section className="section-sm section-alt">
        <Container>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '20px', textAlign: 'center' }}>
              <span style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--blue-600)', display: 'block' }}>2,480</span>
              <strong style={{ fontSize: '0.9rem', color: 'var(--navy-900)' }}>Authoritative Datasets</strong>
              <span style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', display: 'block', marginTop: '2px' }}>Federated spatial layers</span>
            </div>
            <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '20px', textAlign: 'center' }}>
              <span style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--navy-900)', display: 'block' }}>64</span>
              <strong style={{ fontSize: '0.9rem', color: 'var(--navy-900)' }}>Government Entities</strong>
              <span style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', display: 'block', marginTop: '2px' }}>Contributing custodians</span>
            </div>
            <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '20px', textAlign: 'center' }}>
              <span style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--blue-600)', display: 'block' }}>1,150</span>
              <strong style={{ fontSize: '0.9rem', color: 'var(--navy-900)' }}>OGC Web Services</strong>
              <span style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', display: 'block', marginTop: '2px' }}>WMS, WFS, OGC API Features</span>
            </div>
            <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '20px', textAlign: 'center' }}>
              <span style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--success)', display: 'block' }}>&lt; 320ms</span>
              <strong style={{ fontSize: '0.9rem', color: 'var(--navy-900)' }}>p95 Service Latency</strong>
              <span style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', display: 'block', marginTop: '2px' }}>Cached vector tile delivery</span>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Core Functional Pillars */}
      <section className="section">
        <Container>
          <div className="feature-split">
            <div>
              <SectionHeading
                badge="Central Spatial Clearinghouse"
                badgeVariant="navy"
                title="Eliminating Spatial Data Fragmentation"
                align="split"
              />
              <p>
                The <strong>AD-SDI Clearinghouse & Portal</strong> serves as the central geographic registry for Abu Dhabi. Rather than requiring analysts to navigate disconnected departmental servers or file manual memorandums, the Clearinghouse provides a single, high-performance federated search engine.
              </p>
              <p>
                Every published layer is backed by comprehensive <strong>ISO 19115 / 19139 metadata</strong>, automated spatial quality audits, and clear access classifications. This gives planners total certainty in the lineage, accuracy, and freshness of the data they consume.
              </p>
              <div style={{ marginTop: '20px' }}>
                <Link to="/workflows" className="btn btn-secondary">
                  Review Discovery & Ingestion Workflows <ArrowRight size={16} weight="bold" />
                </Link>
              </div>
            </div>

            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '28px', boxShadow: 'var(--shadow-sm)' }}>
              <h4 style={{ fontSize: '1.15rem', color: 'var(--navy-900)', marginBottom: '16px' }}>
                Clearinghouse Core Features
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {capData.capabilitiesList.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <CheckCircle size={20} color="var(--blue-600)" weight="fill" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <div>
                      <strong style={{ fontSize: '0.92rem', color: 'var(--navy-900)' }}>{item.title}</strong>
                      <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', margin: '2px 0 0 0', lineHeight: 1.5 }}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Editorial Cartographic Showcase: Layered Spatial Cross-Section */}
          <div style={{ marginTop: '48px', background: '#FFFFFF', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}>
            <div style={{ padding: '24px 28px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <span className="badge badge-blue">Multi-Layer Cartography</span>
                <h3 style={{ fontSize: '1.35rem', color: 'var(--navy-900)', margin: '6px 0 2px 0' }}>
                  Abu Dhabi Federated Spatial Data Layers
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
                  High-resolution cross-section harmonising cadastral parcels, topographic elevation, infrastructure vectors, bathymetry, and satellite orthophoto.
                </p>
              </div>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--navy-700)', background: 'var(--canvas)', padding: '6px 12px', borderRadius: '4px' }}>
                EPSG:3997 · 0.3m Resolution
              </span>
            </div>
            <div style={{ position: 'relative', width: '100%', maxHeight: '520px', overflow: 'hidden', background: '#0B2545' }}>
              <img
                src="/assets/clearinghouse_cartography.jpg"
                alt="Layered cartographic data cross-section showing cadastre, elevation, vectors, bathymetry, and orthophoto"
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
            badge="Data Assurance"
            badgeVariant="blue"
            title="The 6-Point Automated Quality Gateway"
            subtitle="Before any spatial dataset is certified for cross-government or public distribution, it must pass automated checks against rigorous geometric, topological, and attribute criteria."
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
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: 'var(--shadow-subtle)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--blue-600)' }}>
                    {qg.code}
                  </span>
                  <span className="badge badge-success" style={{ fontSize: '0.7rem' }}>
                    Automated Gate
                  </span>
                </div>
                <h3 style={{ fontSize: '1.05rem', margin: '4px 0 8px 0', color: 'var(--navy-900)' }}>
                  {qg.checkpoint}
                </h3>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6, flexGrow: 1 }}>
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

      {/* 4. Provenance & Lineage Architecture */}
      <section className="section">
        <Container>
          <div className="feature-split reverse">
            <div>
              <SectionHeading
                badge="Trust & Lineage"
                badgeVariant="gold"
                title="End-to-End Dataset Provenance"
                align="split"
              />
              <p>
                Knowing who produced a dataset, when it was last validated, and what processing transformations were applied is essential for strategic master planning and legal compliance.
              </p>
              <p>
                The Clearinghouse records immutable lineage metadata conforming to <strong>ISO 19115-1:2014</strong>, tracing each layer from the source transactional database of contributing entities directly into downstream services.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ShieldCheck size={18} color="var(--success)" weight="bold" />
                  <span style={{ fontSize: '0.88rem' }}>Explicit Data Steward and Custodial Mandate Tracking</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ShieldCheck size={18} color="var(--success)" weight="bold" />
                  <span style={{ fontSize: '0.88rem' }}>FGDS (Fundamental Geospatial Datasets) Priority Tagging</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ShieldCheck size={18} color="var(--success)" weight="bold" />
                  <span style={{ fontSize: '0.88rem' }}>Automated Staleness Alerts When Refresh SLAs Are Approached</span>
                </div>
              </div>
            </div>

            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '28px', boxShadow: 'var(--shadow-sm)' }}>
              <h4 style={{ fontSize: '1.1rem', color: 'var(--navy-900)', marginBottom: '16px' }}>
                Lineage Node Chain (Design Brief S03)
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ padding: '12px', background: 'var(--canvas)', borderRadius: 'var(--radius-sm)', borderLeft: '4px solid #1F5FAD' }}>
                  <strong style={{ fontSize: '0.86rem', color: 'var(--navy-900)' }}>1. Custodial Source System</strong>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'block' }}>DMT Cadastral Database / Oracle Spatial Enterprise</span>
                </div>

                <div style={{ textAlign: 'center', color: 'var(--steel-400)', fontSize: '0.9rem' }}>↓</div>

                <div style={{ padding: '12px', background: 'var(--canvas)', borderRadius: 'var(--radius-sm)', borderLeft: '4px solid var(--success)' }}>
                  <strong style={{ fontSize: '0.86rem', color: 'var(--navy-900)' }}>2. Automated Quality Gateway</strong>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'block' }}>Validated against 6 criteria · 0 topology errors</span>
                </div>

                <div style={{ textAlign: 'center', color: 'var(--steel-400)', fontSize: '0.9rem' }}>↓</div>

                <div style={{ padding: '12px', background: 'var(--canvas)', borderRadius: 'var(--radius-sm)', borderLeft: '4px solid var(--warning)' }}>
                  <strong style={{ fontSize: '0.86rem', color: 'var(--navy-900)' }}>3. Classification & Stewardship Approval</strong>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'block' }}>Classified "Shared — Government" · Approved by Khalid M.</span>
                </div>

                <div style={{ textAlign: 'center', color: 'var(--steel-400)', fontSize: '0.9rem' }}>↓</div>

                <div style={{ padding: '12px', background: 'var(--canvas)', borderRadius: 'var(--radius-sm)', borderLeft: '4px solid var(--blue-600)' }}>
                  <strong style={{ fontSize: '0.86rem', color: 'var(--navy-900)' }}>4. Clearinghouse Catalogue & Services</strong>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'block' }}>Indexed in search · Live OGC API Features + WMS endpoints</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 5. Key Anchor Use Cases */}
      <section className="section section-alt">
        <Container>
          <SectionHeading
            badge="Anchor Custodians"
            badgeVariant="navy"
            title="Entity Use Cases in Practice"
            subtitle="Demonstrating cross-departmental spatial sharing between primary Abu Dhabi government entities."
            align="center"
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
            {capData.useCases.map((uc, idx) => (
              <div
                key={idx}
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '24px',
                  boxShadow: 'var(--shadow-subtle)'
                }}
              >
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--blue-600)', textTransform: 'uppercase', marginBottom: '6px' }}>
                  {uc.entity}
                </div>
                <h3 style={{ fontSize: '1.1rem', color: 'var(--navy-900)', marginBottom: '8px' }}>
                  {uc.scenario}
                </h3>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6 }}>
                  {uc.benefit}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CallToAction
        title="Schedule a Clearinghouse Technical Review"
        lead="Our data architects can evaluate your entity's current spatial data schemas, cataloguing requirements, and OGC web service endpoints."
        primaryBtnText="Request Technical Consultation"
        primaryBtnLink="/contact"
      />
    </>
  );
}

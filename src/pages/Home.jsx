import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ShieldCheck,
  Compass,
  Cube,
  Brain,
  ArrowsClockwise,
  GraduationCap,
  GlobeHemisphereEast,
  Database,
  CheckCircle,
  FileText,
  Sliders,
  Sparkle
} from '@phosphor-icons/react';
import Container from '../components/Container';
import SectionHeading from '../components/SectionHeading';
import EcosystemDiagram from '../components/EcosystemDiagram';
import ImageComparison from '../components/ImageComparison';
import WorkflowSequence from '../components/WorkflowSequence';
import CoreCapabilityModules from '../components/CoreCapabilityModules';

export default function Home() {
  const capabilitiesList = [
    {
      id: 'clearinghouse',
      code: 'Module A',
      title: 'Clearinghouse & Portal',
      color: '#1F5FAD',
      image: '/assets/clearinghouse_cartography.jpg',
      role: 'Discovery & Quality Gateway',
      intro: 'A sovereign metadata registry and spatial discovery engine consolidating 2,480 datasets across 64 entities with strict OGC and ISO standards.',
      usecase: 'Centralises spatial discovery for DMT land parcels, EAD reserves, and DoE utility networks under one authoritative catalogue.',
      metric: '2,480 Datasets · 1,150 OGC Services',
      link: '/capabilities/clearinghouse'
    },
    {
      id: 'geoai',
      code: 'Module B',
      title: 'GeoAI & Spatial Intelligence',
      color: '#7B4FD6',
      image: '/assets/geoai_after.jpg',
      role: 'Automated Change Detection',
      intro: 'Automated remote sensing pipelines converting multi-temporal high-resolution imagery into building footprint extraction and environmental monitoring.',
      usecase: 'Detects unauthorised coastal earthworks and newly graded roadways with 0.91 F1-score before municipal enforcement.',
      metric: 'F1 0.91 · 14,200 Ground-Truth Samples',
      link: '/capabilities/geoai'
    },
    {
      id: 'marketplace',
      code: 'Module C',
      title: 'Marketplace & Data Sharing',
      color: '#0E9F8E',
      image: '/assets/marketplace_geospatial.jpg',
      role: 'Non-Commercial Exchange',
      intro: 'A non-commercial spatial data exchange enabling inter-agency discovery, sample reviews, and bilateral electronic Data Sharing Agreements (DSAs).',
      usecase: 'Streamlines cross-entity data requests from 6 months of bureaucratic paper to 48-hour audited digital approval.',
      metric: '0 AED Cost · Role-Based Bilateral DSAs',
      link: '/capabilities/marketplace'
    },
    {
      id: 'capacity-building',
      code: 'Module D',
      title: 'Capacity Building & Excellence',
      color: '#E07B24',
      image: '/assets/capacity_building_gis.jpg',
      role: 'Institutional GeoMaturity',
      intro: 'A structured workforce development programme upgrading geospatial competencies across 64 Abu Dhabi government entities.',
      usecase: 'Progression from Level 2.3 to 3.8 across 8 specialized curriculum tracks covering GIS analysis, photogrammetry, and spatial law.',
      metric: '2.9 / 5 GeoMaturity · 1,842 Learners',
      link: '/capabilities/capacity-building'
    },
    {
      id: 'digital-twin',
      code: 'Module E',
      title: 'Digital Twin & 3D Simulation',
      color: '#2BA6DE',
      image: '/assets/digital_twin_waterfront.jpg',
      role: '3D Envelopes & Scenario Modeling',
      intro: 'Multidimensional city model unifying semantic 3D building envelopes (LOD1–3), subsurface utilities, and 4D temporal simulation.',
      usecase: 'Simulates rising sea-level inundation and multi-year construction growth across Al Maryah and Reem Island waterfronts.',
      metric: 'LOD1–3 Envelopes · 2020–2035 Scenarios',
      link: '/capabilities/digital-twin'
    },
    {
      id: 'open-data',
      code: 'Module F',
      title: 'Open Data & Civic Innovation',
      color: '#5DAA3A',
      image: '/assets/opendata_civic.jpg',
      role: 'Public Dissemination & Developer APIs',
      intro: 'A public gateway providing open access to 640 vetted geographic layers, REST endpoints, and civic innovation challenges.',
      usecase: 'Powers academic research, commercial logistics routing, and annual civic hackathons with machine-readable spatial data.',
      metric: '640 Open Datasets · 48,000 Mo. Downloads',
      link: '/capabilities/open-data'
    }
  ];

  const challengePillars = [
    {
      num: '01',
      title: 'Discoverability Across Government',
      desc: 'Critical spatial datasets remain locked in departmental silos without a unified catalogue, leading to costly duplication of surveys and imagery acquisitions.'
    },
    {
      num: '02',
      title: 'Data Quality, Currency & Lineage',
      desc: 'Inconsistent coordinate systems, outdated boundary revisions, and absent metadata undermine confidence in spatial analyses used for planning approvals.'
    },
    {
      num: '03',
      title: 'Sovereign Governance & Entitlements',
      desc: 'Sharing sensitive infrastructure information requires rigorous classification, auditability, and legally binding Data Sharing Agreements (DSAs).'
    },
    {
      num: '04',
      title: 'Advanced Spatial Analysis at Scale',
      desc: 'Government agencies require automated intelligence—such as AI change detection and 3D simulation—to process petabytes of remote sensing data.'
    },
    {
      num: '05',
      title: 'Frictionless Multi-Agency Reuse',
      desc: 'Enabling seamless data handoffs between municipal planners, environmental stewards, and utility operators to accelerate capital project delivery.'
    }
  ];

  const roadmapPhasesPreview = [
    {
      phase: 'Phase 1',
      gate: 'Gate M1',
      title: 'Foundation & Core Clearinghouse',
      period: 'Q1 2026 – Q4 2026',
      focus: 'Deploy sovereign data residency infrastructure, automated Quality Gateway, and initial 64-entity metadata onboarding.',
      milestone: '2,480 Datasets Catalogued'
    },
    {
      phase: 'Phase 2',
      gate: 'Gate M2',
      title: 'Integration & Bilateral Exchange',
      period: 'Q1 2027 – Q4 2027',
      focus: 'Launch 0 AED Marketplace, bilateral electronic DSA signing workflows, and initial 3D waterfront digital twin meshes.',
      milestone: 'Marketplace Federation Live'
    },
    {
      phase: 'Phase 3',
      gate: 'Gate M3',
      title: 'Advanced Analytics & GeoAI',
      period: 'Q1 2028 – Q4 2028',
      focus: 'Operationalise automated change detection models (MR-B-007), conversational spatial assistant, and 4D flood simulation.',
      milestone: 'GeoAI Change Detection Active'
    },
    {
      phase: 'Phase 4',
      gate: 'Gate M4',
      title: 'Autonomous Sovereign Ecosystem',
      period: 'Q1 2029 – Q4 2029',
      focus: 'Full inter-agency federation, national digital twin synchronization, and public open data developer challenge (GeoHack 2028).',
      milestone: 'Emirate-Wide Geospatial Autonomy'
    }
  ];

  return (
    <>
      {/* =================================================================
          SECTION 1 — IMMERSIVE HERO
          ================================================================= */}
      <section className="home-editorial-hero">
        <img
          src="/assets/hero_abudhabi_aerial.jpg"
          alt="Aerial photography of Abu Dhabi coastline, islands, and modern urban geography"
          className="hero-photo-layer"
        />
        <div className="hero-editorial-gradient" aria-hidden="true"></div>

        <Container>
          <div className="hero-editorial-content">
            <div className="hero-coord-ribbon">
              <Compass size={16} weight="bold" color="var(--gold-400)" />
              <span>EPSG:3997 · 24° 28' 00" N, 54° 22' 00" E · Abu Dhabi Sovereign SDI</span>
            </div>

            <h1 className="hero-editorial-h1">
              Abu Dhabi’s Spatial Data.{' '}
              <span className="gold-accent">Trusted. Connected.</span>
            </h1>

            <p className="hero-editorial-lead">
              A unified geospatial ecosystem to discover authoritative data, enable advanced spatial intelligence, strengthen governance and support better-informed government decisions.
            </p>

            <div className="hero-editorial-actions">
              <Link to="/platform" className="btn-hero-primary">
                Explore the Platform
                <ArrowRight size={18} weight="bold" />
              </Link>
              <Link to="/capabilities" className="btn-hero-secondary">
                Discover Our Capabilities
              </Link>
            </div>

            {/* Authoritative Scale Strip */}
            <div className="hero-scale-strip">
              <div className="scale-metric-item">
                <span className="scale-metric-num">2,480</span>
                <span className="scale-metric-label">Authoritative Spatial Datasets</span>
              </div>
              <div className="scale-metric-item">
                <span className="scale-metric-num">64</span>
                <span className="scale-metric-label">Government Entities</span>
              </div>
              <div className="scale-metric-item">
                <span className="scale-metric-num">1,150</span>
                <span className="scale-metric-label">OGC Standard Web Services</span>
              </div>
              <div className="scale-metric-item">
                <span className="scale-metric-num">100%</span>
                <span className="scale-metric-label">UAE Sovereign Data Residency</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =================================================================
          SECTION 2 — THE CHALLENGE (EDITORIAL SPLIT WITH PHOTOGRAPHY)
          ================================================================= */}
      <section className="section bg-white">
        <Container>
          <div className="challenge-editorial-section">
            <div className="challenge-image-container">
              <img
                src="/assets/challenge_geography.jpg"
                alt="Abu Dhabi desert dunes meeting coastal mangroves and capital city skyline"
              />
              <div className="challenge-photo-caption">
                <strong>Abu Dhabi Geographic Diversity:</strong> Coordinating coastal mangroves, desert corridors, and dense urban infrastructure requires authoritative, real-time spatial governance.
              </div>
            </div>

            <div className="challenge-narrative-flow">
              <SectionHeading
                badge="The Strategic Imperative"
                badgeVariant="gold"
                title="Why Coordinated Spatial Information Matters"
                subtitle="High-growth urban development and environmental stewardship demand an integrated spatial data fabric."
                align="left"
              />

              <div className="challenge-pillars-list">
                {challengePillars.map((p) => (
                  <div key={p.num} className="challenge-point-row">
                    <span className="challenge-point-num">{p.num}</span>
                    <div className="challenge-point-text">
                      <h4>{p.title}</h4>
                      <p>{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =================================================================
          SECTION 3 — THE AD-SDI SOLUTION (CUSTOM ECOSYSTEM DIAGRAM)
          ================================================================= */}
      <section className="section bg-canvas">
        <Container>
          <SectionHeading
            badge="Sovereign Architecture"
            badgeVariant="blue"
            title="The Connected AD-SDI Solution"
            subtitle="A central spatial data core interconnecting six specialized capabilities to serve government custodians, municipal analysts, and civic innovators."
            align="center"
          />

          <EcosystemDiagram />
        </Container>
      </section>

      {/* =================================================================
          SECTION 4 — SIX CONNECTED CAPABILITIES
          ================================================================= */}
      <section className="section bg-white">
        <Container>
          <CoreCapabilityModules />
        </Container>
      </section>

      {/* =================================================================
          SECTION 5 — FEATURED VISUAL STORY: GEOAI CHANGE DETECTION
          ================================================================= */}
      <section className="section bg-canvas">
        <Container>
          <SectionHeading
            badge="Featured Visual Story · Module B"
            badgeVariant="purple"
            title="Automated GeoAI Change Detection"
            subtitle="Comparing high-resolution satellite baseline imagery against multi-temporal captures to accelerate infrastructure compliance and environmental monitoring."
            align="left"
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginTop: '24px' }}>
            <div style={{ background: '#FFF', padding: '16px', borderRadius: '8px', border: '1px solid var(--border)' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--mod-b)' }}>STEP 01</span>
              <h4 style={{ fontSize: '0.95rem', margin: '4px 0 6px 0', color: 'var(--navy-900)' }}>Select Geographic Sector</h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: 0 }}>
                Specify AOI coordinates and retrieve historical satellite orthoimagery from the Clearinghouse.
              </p>
            </div>
            <div style={{ background: '#FFF', padding: '16px', borderRadius: '8px', border: '1px solid var(--border)' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--mod-b)' }}>STEP 02</span>
              <h4 style={{ fontSize: '0.95rem', margin: '4px 0 6px 0', color: 'var(--navy-900)' }}>Compare Temporal Dates</h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: 0 }}>
                Align baseline survey with latest nadir capture using automated ortho-rectification.
              </p>
            </div>
            <div style={{ background: '#FFF', padding: '16px', borderRadius: '8px', border: '1px solid var(--border)' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--mod-b)' }}>STEP 03</span>
              <h4 style={{ fontSize: '0.95rem', margin: '4px 0 6px 0', color: 'var(--navy-900)' }}>Identify Potential Changes</h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: 0 }}>
                Model MR-B-007 flags building footprints, newly graded roads, and coastline variations.
              </p>
            </div>
            <div style={{ background: '#FFF', padding: '16px', borderRadius: '8px', border: '1px solid var(--border)' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--mod-b)' }}>STEP 04</span>
              <h4 style={{ fontSize: '0.95rem', margin: '4px 0 6px 0', color: 'var(--navy-900)' }}>Human Review & Approval</h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: 0 }}>
                Certified municipal analysts verify confidence scores before issuing municipal work orders.
              </p>
            </div>
          </div>

          {/* Interactive Before & After Image Comparison */}
          <ImageComparison
            beforeImage="/assets/geoai_before.jpg"
            afterImage="/assets/geoai_after.jpg"
            beforeLabel="March 2024 · Pre-Construction Satellite Baseline"
            afterLabel="November 2026 · AI Detected Footprints & Roads"
            locationLabel="Abu Dhabi Coastal Development Sector · 24° 28' N, 54° 23' E"
          />
        </Container>
      </section>

      {/* =================================================================
          SECTION 6 — HOW THE CAPABILITIES WORK TOGETHER
          ================================================================= */}
      <section className="section bg-white">
        <Container>
          <SectionHeading
            badge="Cross-Module Integration"
            badgeVariant="blue"
            title="How the Platform Capabilities Work Together"
            subtitle="From initial discovery to supervised verification and multi-agency reuse: an integrated spatial lifecycle."
            align="left"
          />

          <WorkflowSequence />
        </Container>
      </section>

      {/* =================================================================
          SECTION 7 — GOVERNANCE AND TRUST (EDITORIAL SPLIT)
          ================================================================= */}
      <section className="section bg-canvas">
        <Container>
          <div className="governance-editorial-split">
            <div>
              <SectionHeading
                badge="Trust & Sovereignty"
                badgeVariant="gold"
                title="Authoritative Governance, Security & UAE Sovereignty"
                subtitle="Engineered to meet the UAE Data Protection Law and DGE sovereign spatial standards."
                align="left"
              />

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', margin: '24px 0' }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <ShieldCheck size={24} weight="bold" color="var(--blue-600)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <h4 style={{ fontSize: '1rem', color: 'var(--navy-900)', marginBottom: '2px' }}>Four Data Classification Tiers</h4>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: 0 }}>
                      Open (26%), Shared (54%), Restricted (17%), and Confidential (3%) tiers enforce precise, role-based boundary separation.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <CheckCircle size={24} weight="bold" color="var(--blue-600)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <h4 style={{ fontSize: '1rem', color: 'var(--navy-900)', marginBottom: '2px' }}>6-Point Automated Quality Gateway</h4>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: 0 }}>
                      Automated validation of ISO 19115 metadata, EPSG:3997 coordinate references, topological closure, and attribute completeness.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <FileText size={24} weight="bold" color="var(--blue-600)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <h4 style={{ fontSize: '1rem', color: 'var(--navy-900)', marginBottom: '2px' }}>Bilateral Data Sharing Agreements (DSAs)</h4>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: 0 }}>
                      Non-commercial data exchanges are legally bound by electronic DSAs with immutable cryptographic audit logging.
                    </p>
                  </div>
                </div>
              </div>

              <Link to="/governance" className="btn btn-secondary">
                Explore Complete Governance Framework
                <ArrowRight size={16} weight="bold" />
              </Link>
            </div>

            <div className="governance-visual-pane">
              <img
                src="/assets/governance_framework.jpg"
                alt="Sovereign geospatial governance framework diagram showing classification tiers and security controls"
              />
              <div className="governance-caption">
                <strong>Sovereign Security Framework:</strong> Concentric classification tiers safeguarding critical infrastructure under UAE jurisdiction.
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =================================================================
          SECTION 8 — DIGITAL TWIN SHOWCASE
          ================================================================= */}
      <section className="section bg-white">
        <Container>
          <SectionHeading
            badge="Visual Showcase · Module E"
            badgeVariant="blue"
            title="Abu Dhabi 3D Digital Twin & Waterfront Simulation"
            subtitle="Unifying high-precision 3D building envelopes, subsurface utilities, and 4D temporal scenario modeling."
            align="left"
          />

          <div className="digital-twin-showcase-section">
            <div className="showcase-media-frame">
              <img
                src="/assets/digital_twin_waterfront.jpg"
                alt="3D digital twin visualization of Abu Dhabi waterfront district showing building envelopes and geospatial grid"
              />
              <div className="showcase-floating-card">
                <span className="badge">Al Maryah & Reem Island Waterfronts</span>
                <h3>High-Fidelity 3D Urban Simulation</h3>
                <p>
                  Integrates semantic LOD1–3 architectural building models, subsurface utility corridors, and environmental telemetry to simulate coastal flood resilience and 10-year development scenarios.
                </p>
                <Link to="/capabilities/digital-twin" className="btn btn-primary" style={{ padding: '8px 18px', fontSize: '0.85rem' }}>
                  Explore Digital Twin Capability
                  <ArrowRight size={14} weight="bold" />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =================================================================
          SECTION 9 — PROPOSED IMPLEMENTATION ROADMAP
          ================================================================= */}
      <section className="section bg-canvas">
        <Container>
          <SectionHeading
            badge="Proposed Delivery Schedule"
            badgeVariant="gold"
            title="Four-Phase Delivery Roadmap (2026–2029)"
            subtitle="A phased, risk-managed progression from foundational data onboarding to emirate-wide spatial autonomy."
            align="left"
            action={
              <Link to="/roadmap" className="btn btn-secondary">
                Review Detailed Roadmap & Gates
                <ArrowRight size={16} weight="bold" />
              </Link>
            }
          />

          <div className="roadmap-editorial-sequence">
            {roadmapPhasesPreview.map((phase) => (
              <div key={phase.phase} className="roadmap-phase-editorial-card">
                <div className="phase-editorial-tag">
                  <span className="phase-num-chip">{phase.phase}</span>
                  <span className="phase-gate-badge">{phase.gate}</span>
                </div>
                <h4 className="phase-editorial-title">{phase.title}</h4>
                <span className="phase-editorial-period">{phase.period}</span>
                <p className="phase-editorial-focus">{phase.focus}</p>
                <div className="phase-editorial-milestone">
                  {phase.milestone}
                </div>
              </div>
            ))}
          </div>

          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '16px', textAlign: 'center' }}>
            * Note: Implementation schedule represents a proposed technical delivery methodology subject to final DGE program governance.
          </p>
        </Container>
      </section>

      {/* =================================================================
          SECTION 10 — CLOSING EDITORIAL CTA
          ================================================================= */}
      <section className="section bg-white" style={{ paddingTop: 0 }}>
        <Container>
          <div className="closing-editorial-cta">
            <div className="closing-cta-glow" aria-hidden="true"></div>
            <div className="closing-cta-inner">
              <span className="badge badge-gold" style={{ marginBottom: '16px' }}>
                Next Steps · Strategic Partnership
              </span>
              <h2 className="closing-cta-title">
                Ready to Explore Abu Dhabi’s Unified Spatial Ecosystem?
              </h2>
              <p className="closing-cta-desc">
                Review the comprehensive platform architecture, examine operational multi-agency workflows, or schedule a strategic consultation with our spatial infrastructure architects.
              </p>
              <div className="closing-cta-buttons">
                <Link to="/platform" className="btn-hero-primary">
                  Explore the Platform
                  <ArrowRight size={18} weight="bold" />
                </Link>
                <Link to="/contact" className="btn-hero-secondary">
                  Contact / Next Steps
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

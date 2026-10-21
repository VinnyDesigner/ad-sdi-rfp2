import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  GraduationCap,
  CheckCircle
} from '@phosphor-icons/react';
import Container from '../../components/Container';
import PageHero from '../../components/PageHero';
import SectionHeading from '../../components/SectionHeading';
import CallToAction from '../../components/CallToAction';

export default function CapacityBuilding() {
  const geoMaturityPillars = [
    {
      pillar: 'Strategy & Governance',
      baseline: '2.4',
      current: '3.1',
      desc: 'Formulation of custodial mandates, compliance with Abu Dhabi spatial data policies, and formal data steward appointments.'
    },
    {
      pillar: 'Data Assets & Quality',
      baseline: '2.1',
      current: '2.8',
      desc: 'ISO 19115 metadata capture, automated Quality Gateway pass rates, and adherence to update frequency SLAs.'
    },
    {
      pillar: 'Technology & Integration',
      baseline: '2.5',
      current: '3.2',
      desc: 'Deployment of OGC-compliant web services, RESTful API consumption, and automated database synchronization pipelines.'
    },
    {
      pillar: 'People & Spatial Competency',
      baseline: '2.2',
      current: '2.7',
      desc: 'Workforce literacy in GIS software, computer vision inference, spatial database administration, and 3D modeling.'
    },
    {
      pillar: 'Use & Value Delivery',
      baseline: '2.3',
      current: '2.9',
      desc: 'Utilization of spatial intelligence in executive decision-making, municipal enforcement, and cross-agency policy modeling.'
    }
  ];

  const learningPathways = [
    {
      id: 'lp-1',
      title: 'Executives & Decision-Makers',
      audience: 'Director Generals, Undersecretaries & Executive Directors',
      enrolments: '210 Enrolled',
      focus: 'Evidence-based spatial decision making, digital twin scenario planning, and whole-of-government ROI.'
    },
    {
      id: 'lp-2',
      title: 'Certified Data Stewards',
      audience: 'Departmental Data Owners & Quality Leads',
      enrolments: '340 Enrolled',
      focus: 'Metadata profiling (ISO 19115), Quality Gateway error remediation, and classification governance.'
    },
    {
      id: 'lp-3',
      title: 'GIS Specialists & Spatial Analysts',
      audience: 'Spatial Technicians & Cartographers',
      enrolments: '480 Enrolled',
      focus: 'Advanced vector analysis, OGC web service publication, spatial topology cleaning, and Python automation.'
    },
    {
      id: 'lp-4',
      title: 'Platform Administrators',
      audience: 'Enterprise IT & Infrastructure Engineers',
      enrolments: '120 Enrolled',
      focus: 'Sovereign cloud cluster management, tile cache acceleration, RBAC security, and API gateway rate limiting.'
    },
    {
      id: 'lp-5',
      title: 'Developers & Integrators',
      audience: 'Software Engineers & Web Developers',
      enrolments: '260 Enrolled',
      focus: 'OGC API Features integration, GeoJSON streaming, RESTful web services, and client SDKs.'
    },
    {
      id: 'lp-6',
      title: 'GeoAI & Data Science',
      audience: 'Data Scientists & Machine Learning Engineers',
      enrolments: '180 Enrolled',
      focus: 'Computer vision training, multi-epoch change detection tuning, model cards, and responsible AI guardrails.'
    },
    {
      id: 'lp-7',
      title: 'Twin, Marketplace & Open Data',
      audience: 'Smart Cities Planners & Innovation Leads',
      enrolments: '190 Enrolled',
      focus: '3D mesh handling, IoT sensor telemetry ingestion, bilateral DSA workflows, and civic open data curation.'
    },
    {
      id: 'lp-8',
      title: 'Train-the-Trainer (Certified Instructor)',
      audience: 'Senior Government Spatial Champions',
      enrolments: '62 Enrolled',
      focus: 'Pedagogical delivery, hands-on lab facilitation, competency assessment, and peer mentoring.',
      highlight: true
    }
  ];

  const sectorScores = [
    { sector: 'Infrastructure & Municipal', baseline: '2.6', current: '3.4', delta: '+0.8' },
    { sector: 'Environment & Agriculture', baseline: '2.4', current: '3.2', delta: '+0.8' },
    { sector: 'Safety & Emergency Services', baseline: '2.5', current: '3.0', delta: '+0.5' },
    { sector: 'Health & Public Protection', baseline: '2.1', current: '2.7', delta: '+0.6' },
    { sector: 'Education & Knowledge', baseline: '2.0', current: '2.6', delta: '+0.6' },
    { sector: 'Economic & Commercial Planning', baseline: '2.2', current: '2.7', delta: '+0.5' }
  ];

  return (
    <>
      <PageHero
        badge="Module D · #E07B24"
        title="Capacity Building & GeoMaturity"
        lead="Cultivating sovereign human talent and institutional capability across 64 Abu Dhabi government entities through the 5-pillar GeoMaturity framework and 8 role-based learning tracks."
        breadcrumbItems={[
          { label: 'Capabilities', to: '/capabilities' },
          { label: 'Capacity Building & GeoMaturity' }
        ]}
      />

      {/* 1. Measurable Institutional Progress Metrics */}
      <section className="section-sm section-alt">
        <Container>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '20px', textAlign: 'center' }}>
              <span style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--mod-d)', display: 'block' }}>2.9 / 5</span>
              <strong style={{ fontSize: '0.9rem', color: 'var(--navy-900)' }}>Average GeoMaturity</strong>
              <span style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', display: 'block', marginTop: '2px' }}>Uplift from 2.3 baseline (+0.6)</span>
            </div>
            <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '20px', textAlign: 'center' }}>
              <span style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--navy-900)', display: 'block' }}>64 / 64</span>
              <strong style={{ fontSize: '0.9rem', color: 'var(--navy-900)' }}>Entities Assessed</strong>
              <span style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', display: 'block', marginTop: '2px' }}>100% government coverage</span>
            </div>
            <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '20px', textAlign: 'center' }}>
              <span style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--mod-d)', display: 'block' }}>1,842</span>
              <strong style={{ fontSize: '0.9rem', color: 'var(--navy-900)' }}>Learners Trained</strong>
              <span style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', display: 'block', marginTop: '2px' }}>412 pathway completions</span>
            </div>
            <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '20px', textAlign: 'center' }}>
              <span style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--success)', display: 'block' }}>4.6 / 5</span>
              <strong style={{ fontSize: '0.9rem', color: 'var(--navy-900)' }}>Training Satisfaction</strong>
              <span style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', display: 'block', marginTop: '2px' }}>+28% measurable competence gain</span>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. The 5-Axis GeoMaturity Assessment Model */}
      <section className="section">
        <Container>
          <div className="feature-split">
            <div>
              <SectionHeading
                badge="Diagnostic Framework"
                badgeVariant="navy"
                title="The 5-Axis GeoMaturity Diagnostic"
                align="split"
              />
              <p>
                Spatial infrastructure cannot thrive on hardware and software alone; sustainable success depends on institutional readiness and skilled personnel.
              </p>
              <p>
                The <strong>GeoMaturity Assessment Model</strong> evaluates each government entity across five core dimensions: Strategy & Governance, Data Assets, Technology, People, and Use. By comparing current performance against baseline 2026 benchmarks, DGE identifies specific operational gaps and guides targeted investments.
              </p>
              <div style={{ marginTop: '20px' }}>
                <Link to="/value" className="btn btn-secondary">
                  Explore Value Realization Metrics <ArrowRight size={16} weight="bold" />
                </Link>
              </div>
            </div>

            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '28px', boxShadow: 'var(--shadow-sm)' }}>
              <h4 style={{ fontSize: '1.15rem', color: 'var(--navy-900)', marginBottom: '16px' }}>
                5-Pillar Score Progression (Design Brief S12)
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {geoMaturityPillars.map((p, idx) => (
                  <div key={idx} style={{ padding: '12px', background: 'var(--canvas)', borderRadius: 'var(--radius-sm)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <strong style={{ fontSize: '0.9rem', color: 'var(--navy-900)' }}>{p.pillar}</strong>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Baseline: {p.baseline}</span>
                        <span style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--mod-d)' }}>Current: {p.current}</span>
                      </div>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                      {p.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Executive Spatial Analytics Learning Center Visual */}
          <div style={{ marginTop: '48px', background: '#FFFFFF', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}>
            <div style={{ padding: '24px 28px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <span className="badge badge-gold" style={{ color: '#E07B24', background: 'rgba(224, 123, 36, 0.1)' }}>
                  Executive Training Environment
                </span>
                <h3 style={{ fontSize: '1.35rem', color: 'var(--navy-900)', margin: '6px 0 2px 0' }}>
                  Abu Dhabi Spatial Analytics & GIS Executive Center
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
                  Collaborative multi-screen analytics laboratory empowering government teams with interactive spatial exploration, 3D twin interaction, and satellite change analysis.
                </p>
              </div>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--mod-d)', background: 'var(--canvas)', padding: '6px 12px', borderRadius: '4px' }}>
                1,842 Government Learners Enrolled
              </span>
            </div>
            <div style={{ position: 'relative', width: '100%', maxHeight: '520px', overflow: 'hidden', background: '#0B2545' }}>
              <img
                src="/assets/capacity_building_gis.jpg"
                alt="Abu Dhabi spatial analytics executive training center with analysts working around digital map table"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
          </div>
        </Container>
      </section>

      {/* 3. Eight Tailored Learning Pathways */}
      <section className="section section-alt">
        <Container>
          <SectionHeading
            badge="Curriculum Architecture"
            badgeVariant="gold"
            title="Eight Professional Learning Pathways"
            subtitle="Targeted modular courses designed to uplift every layer of government—from director-level policy makers to advanced GeoAI machine learning engineers."
            align="center"
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {learningPathways.map((lp) => (
              <div
                key={lp.id}
                style={{
                  background: 'var(--surface)',
                  border: lp.highlight ? '2px solid var(--gold-500)' : '1px solid var(--border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: 'var(--shadow-subtle)',
                  position: 'relative'
                }}
              >
                {lp.highlight && (
                  <span style={{
                    position: 'absolute',
                    top: '-10px',
                    right: '16px',
                    background: 'var(--gold-500)',
                    color: 'var(--navy-900)',
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    padding: '2px 8px',
                    borderRadius: '4px',
                    textTransform: 'uppercase'
                  }}>
                    Featured Track
                  </span>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--mod-d)' }}>
                    {lp.enrolments}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.15rem', color: 'var(--navy-900)', margin: '4px 0 6px 0' }}>
                  {lp.title}
                </h3>
                <span style={{ fontSize: '0.78rem', color: 'var(--blue-600)', fontWeight: 600, marginBottom: '10px', display: 'block' }}>
                  Target: {lp.audience}
                </span>

                <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6, flexGrow: 1 }}>
                  {lp.focus}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 4. Sector-by-Sector Capability Uplift */}
      <section className="section">
        <Container>
          <div className="feature-split reverse">
            <div>
              <SectionHeading
                badge="Sectoral Progress"
                badgeVariant="gold"
                title="Measuring Emirate-Wide Transformation"
                align="split"
              />
              <p>
                Every sector of the Abu Dhabi Government experiences measurable improvement through the Capacity Building programme. Infrastructure and Environmental agencies have led the way with significant gains (+0.8), while Healthcare and Education entities are rapidly closing baseline gaps.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle size={18} color="var(--success)" weight="bold" />
                  <span style={{ fontSize: '0.88rem' }}>38 certified internal trainers building self-sufficiency</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle size={18} color="var(--success)" weight="bold" />
                  <span style={{ fontSize: '0.88rem' }}>71% of trained personnel actively applying new spatial skills</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle size={18} color="var(--success)" weight="bold" />
                  <span style={{ fontSize: '0.88rem' }}>Abu Dhabi Center of Excellence housing standard operating procedures</span>
                </div>
              </div>
            </div>

            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '24px', boxShadow: 'var(--shadow-sm)' }}>
              <h4 style={{ fontSize: '1.1rem', color: 'var(--navy-900)', marginBottom: '14px' }}>
                Sector GeoMaturity Uplift (Design Brief S12)
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {sectorScores.map((sec, idx) => (
                  <div key={idx} style={{ padding: '10px 14px', background: 'var(--canvas)', borderRadius: 'var(--radius-sm)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <strong style={{ fontSize: '0.86rem', color: 'var(--navy-900)' }}>{sec.sector}</strong>
                      <span style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', display: 'block' }}>
                        Baseline: {sec.baseline} → Current: {sec.current}
                      </span>
                    </div>
                    <span style={{ fontSize: '0.94rem', fontWeight: 800, color: 'var(--mod-d)' }}>
                      {sec.delta}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <CallToAction
        title="Schedule a Baseline GeoMaturity Diagnostic"
        lead="Our enablement consultants can conduct an initial 5-axis assessment of your department’s spatial readiness and propose tailored training roadmaps."
        primaryBtnText="Initiate Entity Assessment"
        primaryBtnLink="/contact"
      />
    </>
  );
}

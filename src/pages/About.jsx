import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Buildings,
  Tree,
  ChartBar,
  FirstAid,
  GraduationCap,
  ShieldCheck,
  CheckCircle,
  Info
} from '@phosphor-icons/react';
import Container from '../components/Container';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import CallToAction from '../components/CallToAction';

export default function About() {
  const stakeholders = [
    {
      name: 'Department of Government Enablement (DGE)',
      role: 'Programme Sponsor, Whole-of-Government Strategy & Governance Authority',
      icon: ShieldCheck,
      color: '#0B2545',
      contribution: 'Establishes spatial data mandates, oversees multi-agency sharing policies, and monitors Emirate-wide GeoMaturity progression.'
    },
    {
      name: 'Department of Municipalities and Transport (DMT)',
      role: 'Master Planning, Urban Cadastre & Transport Arteries',
      icon: Buildings,
      color: '#1F5FAD',
      contribution: 'Maintains 412,380 cadastral land parcels, municipal zoning regulations, address points, and road corridor centerlines.'
    },
    {
      name: 'Environment Agency – Abu Dhabi (EAD)',
      role: 'Biodiversity, Protected Habitats & Marine Sanctuaries',
      icon: Tree,
      color: '#5DAA3A',
      contribution: 'Publishes multi-epoch mangrove extents, coastal water quality readings, and protected terrestrial/marine reserve boundaries.'
    },
    {
      name: 'Statistics Centre – Abu Dhabi (SCAD)',
      role: 'Socio-Economic Indicators & Spatial Demographics',
      icon: ChartBar,
      color: '#7B4FD6',
      contribution: 'Supplies 100m population density grids, census enumeration units, and demographic projection layers.'
    },
    {
      name: 'Department of Health (DoH) & ADPHC',
      role: 'Public Health Surveillance & Healthcare Facilities',
      icon: FirstAid,
      color: '#D64545',
      contribution: 'Maps primary care clinic catchments, emergency hospital access routes, and epidemiological surveillance zones.'
    },
    {
      name: 'Abu Dhabi Department of Education and Knowledge (ADEK)',
      role: 'Educational Facilities & School District Planning',
      icon: GraduationCap,
      color: '#E07B24',
      contribution: 'Coordinates school geographic distribution, student catchment polygons, and educational capacity forecasting.'
    }
  ];

  return (
    <>
      <PageHero
        badge="Strategic Alignment & Context"
        title="About the AD-SDI Programme Proposal"
        lead="A comprehensive Business Development proposal prepared for the Department of Government Enablement (DGE) to establish Abu Dhabi’s sovereign spatial data infrastructure."
        breadcrumbItems={[{ label: 'About AD-SDI' }]}
      />

      {/* 1. Context Notice */}
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
                Proposal Context & DGE Spatial Data Strategy:
              </strong>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: '4px 0 0 0', lineHeight: 1.6 }}>
                This proposal has been developed in direct response to the spatial data strategy requirements of the <strong>Department of Government Enablement (DGE)</strong>. It provides an end-to-end architectural, governance, and operational blueprint to modernize the Abu Dhabi Spatial Data Infrastructure into a high-performance, AI-empowered, and sovereign geospatial clearinghouse.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Defining SDI in the Abu Dhabi Context */}
      <section className="section">
        <Container>
          <div className="feature-split">
            <div>
              <SectionHeading
                badge="Definition & Scope"
                badgeVariant="navy"
                title="What is a Spatial Data Infrastructure?"
                align="left"
              />
              <p>
                A <strong>Spatial Data Infrastructure (SDI)</strong> is far more than a software portal or collection of GIS maps. It is the coordinated framework of <strong>governance policies, metadata standards, automated quality controls, cloud technologies, institutional agreements, and human competencies</strong> necessary to acquire, manage, and distribute authoritative geospatial assets.
              </p>
              <p>
                In Abu Dhabi, the AD-SDI initiative connects <strong>64 contributing government entities</strong> into a single spatial fabric. By breaking down departmental data silos, it enables land planning, environmental protection, transport optimization, and civil defense to operate from a single, verified geographic truth.
              </p>
              <div style={{ marginTop: '24px' }}>
                <Link to="/platform" className="btn btn-secondary">
                  Explore Technical Architecture <ArrowRight size={16} weight="bold" />
                </Link>
              </div>
            </div>

            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '32px', boxShadow: 'var(--shadow-sm)' }}>
              <h4 style={{ fontSize: '1.15rem', marginBottom: '16px', color: 'var(--navy-900)' }}>
                The Five Pillars of Sovereign SDI
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--blue-50)', color: 'var(--blue-600)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.85rem', flexShrink: 0 }}>
                    1
                  </div>
                  <div>
                    <strong style={{ fontSize: '0.92rem', color: 'var(--navy-900)' }}>Governance & Policy</strong>
                    <span style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', display: 'block', marginTop: '2px' }}>
                      Clear custodial mandates, four data classification tiers, and electronic bilateral Data Sharing Agreements (DSAs).
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--blue-50)', color: 'var(--blue-600)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.85rem', flexShrink: 0 }}>
                    2
                  </div>
                  <div>
                    <strong style={{ fontSize: '0.92rem', color: 'var(--navy-900)' }}>Authoritative Data Assets</strong>
                    <span style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', display: 'block', marginTop: '2px' }}>
                      2,480 certified datasets adhering to the Abu Dhabi Spatial Data Dictionary and UAE National Grid (EPSG:3997).
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--blue-50)', color: 'var(--blue-600)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.85rem', flexShrink: 0 }}>
                    3
                  </div>
                  <div>
                    <strong style={{ fontSize: '0.92rem', color: 'var(--navy-900)' }}>Technical Architecture & OGC Services</strong>
                    <span style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', display: 'block', marginTop: '2px' }}>
                      1,150 OGC web services (WMS, WFS, OGC API Features) hosted in sovereign Tier III+ UAE cloud infrastructure.
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--blue-50)', color: 'var(--blue-600)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.85rem', flexShrink: 0 }}>
                    4
                  </div>
                  <div>
                    <strong style={{ fontSize: '0.92rem', color: 'var(--navy-900)' }}>Institutional Capacity & GeoMaturity</strong>
                    <span style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', display: 'block', marginTop: '2px' }}>
                      The 5-axis GeoMaturity diagnostic and 8 professional learning pathways uplifting all 64 participating entities.
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--blue-50)', color: 'var(--blue-600)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.85rem', flexShrink: 0 }}>
                    5
                  </div>
                  <div>
                    <strong style={{ fontSize: '0.92rem', color: 'var(--navy-900)' }}>Public Value & Economic Realization</strong>
                    <span style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', display: 'block', marginTop: '2px' }}>
                      Civic open data, GeoHack competitions, and evidence-based policy formulation supporting Abu Dhabi’s strategic vision.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sovereign Territorial Landscape Visual */}
          <div style={{ marginTop: '48px', background: '#FFFFFF', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}>
            <div style={{ padding: '24px 28px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <span className="badge badge-gold">Territorial Context</span>
                <h3 style={{ fontSize: '1.35rem', color: 'var(--navy-900)', margin: '6px 0 2px 0' }}>
                  The Sovereign Geography of Abu Dhabi
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
                  Connecting expansive desert regions, protected mangrove waterways, and high-density urban islands into a unified spatial fabric.
                </p>
              </div>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--navy-700)', background: 'var(--canvas)', padding: '6px 12px', borderRadius: '4px' }}>
                64 Government Custodians
              </span>
            </div>
            <div style={{ position: 'relative', width: '100%', maxHeight: '480px', overflow: 'hidden', background: '#0B2545' }}>
              <img
                src="/assets/challenge_geography.jpg"
                alt="Abu Dhabi desert landscape meeting coastal mangroves and capital city skyline"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
          </div>
        </Container>
      </section>

      {/* 3. Key Anchor Stakeholders */}
      <section className="section section-alt">
        <Container>
          <SectionHeading
            badge="Ecosystem Stakeholders"
            badgeVariant="blue"
            title="Whole-of-Government Collaboration"
            subtitle="The AD-SDI ecosystem unites major custodial departments under DGE leadership to maintain authoritative spatial truth across the Emirate."
            align="center"
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            {stakeholders.map((s, idx) => {
              const IconComp = s.icon;
              return (
                <div
                  key={idx}
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '24px',
                    borderTop: `4px solid ${s.color}`,
                    boxShadow: 'var(--shadow-subtle)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--canvas)',
                      color: s.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <IconComp size={22} weight="bold" />
                    </div>
                    <div>
                      <h4 style={{ margin: 0, fontSize: '1rem', color: 'var(--navy-900)' }}>{s.name}</h4>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{s.role}</span>
                    </div>
                  </div>
                  <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6 }}>
                    {s.contribution}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* 4. Strategic Alignment with Abu Dhabi Vision */}
      <section className="section">
        <Container>
          <div className="feature-split">
            <div>
              <span className="badge badge-gold" style={{ marginBottom: '12px' }}>
                Strategic Outcomes
              </span>
              <h2 style={{ fontSize: '2.2rem', marginBottom: '16px' }}>
                Delivering High-Impact Government Value
              </h2>
              <p>
                By providing immediate access to certified, high-resolution spatial datasets, AD-SDI eliminates redundant government procurement, reduces permitting wait times, and provides the geospatial underpinning for advanced Digital Twins and GeoAI.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle size={18} color="var(--success)" weight="bold" />
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                    <strong>Accelerated Permitting:</strong> Cross-agency spatial verification in seconds.
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle size={18} color="var(--success)" weight="bold" />
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                    <strong>Environmental Protection:</strong> Automated coastal mangrove and reserve tracking.
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle size={18} color="var(--success)" weight="bold" />
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                    <strong>Civic Innovation:</strong> 640 open datasets powering GovTech entrepreneurship.
                  </span>
                </div>
              </div>

              <div style={{ marginTop: '24px' }}>
                <Link to="/value" className="btn btn-secondary">
                  Explore Quantified Value Framework <ArrowRight size={16} weight="bold" />
                </Link>
              </div>
            </div>

            <div style={{ background: 'var(--canvas)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '28px' }}>
              <h4 style={{ fontSize: '1.1rem', color: 'var(--navy-900)', marginBottom: '14px' }}>
                Target Performance Benchmarks (Design Brief)
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
                <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '16px' }}>
                  <span style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--blue-600)', display: 'block' }}>99.95%</span>
                  <strong style={{ fontSize: '0.85rem', color: 'var(--navy-900)' }}>Availability SLA</strong>
                  <span style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', display: 'block', marginTop: '2px' }}>Core OGC Web Services</span>
                </div>
                <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '16px' }}>
                  <span style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--success)', display: 'block' }}>96%</span>
                  <strong style={{ fontSize: '0.85rem', color: 'var(--navy-900)' }}>Quality Gate Pass</strong>
                  <span style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', display: 'block', marginTop: '2px' }}>Zero-defect submissions</span>
                </div>
                <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '16px' }}>
                  <span style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--mod-d)', display: 'block' }}>2.9 / 5</span>
                  <strong style={{ fontSize: '0.85rem', color: 'var(--navy-900)' }}>Average GeoMaturity</strong>
                  <span style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', display: 'block', marginTop: '2px' }}>Progressed from 2.3 baseline</span>
                </div>
                <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '16px' }}>
                  <span style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--navy-900)', display: 'block' }}>100%</span>
                  <strong style={{ fontSize: '0.85rem', color: 'var(--navy-900)' }}>UAE Sovereign Hosting</strong>
                  <span style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', display: 'block', marginTop: '2px' }}>Tier III+ sovereign cloud</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <CallToAction
        title="Schedule an Executive Strategic Briefing"
        lead="Our solution directors are available to brief DGE leadership on how the proposed AD-SDI framework can be tailored to the Emirate’s strategic master plans."
        primaryBtnText="Request Strategic Consultation"
        primaryBtnLink="/contact"
      />
    </>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Database,
  Cpu,
  Storefront,
  GraduationCap,
  Cube,
  GlobeHemisphereEast,
  ShieldCheck,
  CheckCircle,
  ArrowsClockwise,
  Code,
  LockKey,
  Stack,
  Sparkle
} from '@phosphor-icons/react';
import Container from '../components/Container';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import EcosystemDiagram from '../components/EcosystemDiagram';
import CallToAction from '../components/CallToAction';
import { capabilities } from '../data/capabilities';

export default function PlatformOverview() {
  const lifecycleStages = [
    {
      num: '01',
      title: 'Custodial Ingestion & Staging',
      lead: 'Contributing Entity (e.g. DMT, EAD, SCAD)',
      desc: 'Authoritative vector, raster, point cloud, and tabular datasets are staged via automated ETL pipelines and mapped to the standardized Abu Dhabi Spatial Data Dictionary.',
      badge: 'Ingestion'
    },
    {
      num: '02',
      title: 'Automated 6-Point Quality Gateway',
      lead: 'Quality Gateway Engine',
      desc: 'Datasets undergo automated syntactic, geometric, topological, attribute domain, CRS (EPSG:3997), and ISO 19115 metadata audits with instant pass/fail diagnostics.',
      badge: 'Automated QA'
    },
    {
      num: '03',
      title: 'Security Classification & Stewardship',
      lead: 'Entity Data Steward & DGE Governance',
      desc: 'Sensitivity is tagged into Open (26%), Shared (54%), Restricted (17%), or Confidential (3%), with audience permissions and custodial sign-off.',
      badge: 'Governance'
    },
    {
      num: '04',
      title: 'Clearinghouse Indexing & OGC Publishing',
      lead: 'Core Clearinghouse Engine',
      desc: 'Certified metadata is indexed for sub-second federated search, while spatial features are published as cached OGC API Features, WMS, WFS, and WMTS endpoints.',
      badge: 'Publishing'
    },
    {
      num: '05',
      title: 'AI & 3D Simulation Enrichment',
      lead: 'GeoAI Studio & Digital Twin Engine',
      desc: 'Satellite imagery feeds multi-epoch change detection pipelines, while vector footprints synthesize LOD2/LOD3 semantic 3D meshes with live IoT telemetry.',
      badge: 'Intelligence'
    },
    {
      num: '06',
      title: 'Multi-Agency Consumption & Civic Hub',
      lead: 'Government Planners, Partners & Public',
      desc: 'Government planners stream secure layers directly into GIS/CAD environments, while non-sensitive open data flows into public developer sandboxes.',
      badge: 'Consumption'
    }
  ];

  const standards = [
    { name: 'ISO 19115-1:2014', label: 'Geographic Information — Metadata', use: 'Authoritative metadata profiling' },
    { name: 'ISO 19157:2013', label: 'Geographic Information — Data Quality', use: 'Automated quality gateway scoring' },
    { name: 'OGC API Features', label: 'Next-Gen Vector Query Protocol', use: 'Sub-second RESTful feature retrieval' },
    { name: 'OGC WMS / WFS / WMTS', label: 'Standard Web Map & Feature Services', use: 'GIS desktop and dashboard streaming' },
    { name: 'EPSG:3997', label: 'UAE National Grid Projection', use: 'Unified Emirate-wide coordinate reference' },
    { name: 'OGC 3D Tiles / CityGML', label: 'Massive 3D Spatial Geometry', use: 'High-performance Digital Twin rendering' }
  ];

  return (
    <>
      <PageHero
        badge="Platform Architecture & Technical Blueprint"
        title="Unified Platform Architecture"
        lead="A cohesive, sovereign spatial fabric connecting data discovery, automated quality assurance, advanced AI intelligence, and whole-of-government reuse."
        breadcrumbItems={[{ label: 'Platform Architecture' }]}
      />

      {/* 1. Core Platform Thesis */}
      <section className="section section-alt">
        <Container>
          <div className="feature-split">
            <div>
              <SectionHeading
                badge="Architectural Thesis"
                badgeVariant="navy"
                title="A Connected Spatial Fabric, Not Disjointed Software"
                align="left"
              />
              <p>
                Traditional municipal deployments often fail because metadata catalogues, computer vision engines, 3D digital twins, and open data portals are procured as isolated point solutions. This creates data duplication, disparate security perimeters, and severe administrative overhead.
              </p>
              <p>
                The <strong>AD-SDI Architecture</strong> is deliberately designed as a unified spatial fabric. Datasets ingested and validated within the <strong>Clearinghouse</strong> immediately inform <strong>GeoAI</strong> change detection models, fuel the <strong>Digital Twin</strong> 3D canvas, and populate the <strong>Open Data Hub</strong>—all protected by a singular governance model.
              </p>
              <div style={{ marginTop: '24px' }}>
                <Link to="/workflows" className="btn btn-secondary">
                  Explore Operational Workflows <ArrowRight size={16} weight="bold" />
                </Link>
              </div>
            </div>

            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '28px', boxShadow: 'var(--shadow-sm)' }}>
              <h4 style={{ fontSize: '1.15rem', color: 'var(--navy-900)', marginBottom: '16px' }}>
                Six Interlocking Modules
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                {capabilities.map((cap) => (
                  <Link
                    key={cap.id}
                    to={cap.route}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '12px 14px',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--canvas)',
                      border: '1px solid var(--border)',
                      textDecoration: 'none',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: cap.color, flexShrink: 0 }} />
                    <div>
                      <strong style={{ fontSize: '0.85rem', color: 'var(--navy-900)', display: 'block' }}>
                        {cap.code}
                      </strong>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                        {cap.title}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Interactive Ecosystem Architecture Stack */}
      <section className="section">
        <Container>
          <SectionHeading
            badge="System Blueprint"
            badgeVariant="blue"
            title="Multi-Tier Enterprise Architecture"
            subtitle="Explore how authoritative custodial assets are transformed into secure spatial services, AI models, and multi-agency applications."
            align="center"
          />
          <EcosystemDiagram />
        </Container>
      </section>

      {/* 3. The 6-Stage Spatial Lifecycle */}
      <section className="section section-alt">
        <Container>
          <SectionHeading
            badge="Data Lifecycle"
            badgeVariant="gold"
            title="The Six-Stage Data Governance Pipeline"
            subtitle="From custodial ingestion to whole-of-government reuse, every spatial layer follows an automated, transparent quality and classification path."
            align="center"
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
            {lifecycleStages.map((stage) => (
              <div
                key={stage.num}
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
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--blue-600)' }}>
                    {stage.num}
                  </span>
                  <span className="badge badge-navy" style={{ fontSize: '0.72rem' }}>
                    {stage.badge}
                  </span>
                </div>
                <h3 style={{ fontSize: '1.05rem', margin: '4px 0 6px 0', color: 'var(--navy-900)' }}>
                  {stage.title}
                </h3>
                <span style={{ fontSize: '0.78rem', color: 'var(--blue-600)', fontWeight: 600, marginBottom: '10px', display: 'block' }}>
                  Lead Actor: {stage.lead}
                </span>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6, flexGrow: 1 }}>
                  {stage.desc}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 4. Open Standards & Interoperability Compliance */}
      <section className="section">
        <Container>
          <SectionHeading
            badge="Open Standards"
            badgeVariant="blue"
            title="International Standards & Sovereign Compatibility"
            subtitle="Full compliance with global geospatial specifications ensures long-term vendor neutrality, high reliability, and zero proprietary lock-in."
            align="center"
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
            {standards.map((std, idx) => (
              <div
                key={idx}
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '20px',
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'flex-start'
                }}
              >
                <Code size={22} color="var(--blue-600)" weight="bold" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ fontSize: '0.94rem', color: 'var(--navy-900)', display: 'block' }}>
                    {std.name}
                  </strong>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-primary)', display: 'block', margin: '2px 0' }}>
                    {std.label}
                  </span>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                    Application: {std.use}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CallToAction
        title="Schedule a Technical Architecture Walkthrough"
        lead="Our enterprise architects can walk DGE technical teams through API specs, sovereign cloud deployments, and automated ETL ingestion pipelines."
        primaryBtnText="Schedule Technical Workshop"
        primaryBtnLink="/contact"
      />
    </>
  );
}

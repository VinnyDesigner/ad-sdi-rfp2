import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Storefront,
  CheckCircle,
  ShieldCheck,
  LockKey,
  Key,
  FileText,
  Sliders,
  UsersThree,
  Handshake,
  Clock,
  Gauge
} from '@phosphor-icons/react';
import Container from '../../components/Container';
import PageHero from '../../components/PageHero';
import SectionHeading from '../../components/SectionHeading';
import CallToAction from '../../components/CallToAction';
import { capabilities } from '../../data/capabilities';

export default function Marketplace() {
  const capData = capabilities.find((c) => c.id === 'marketplace');

  const sampleProducts = [
    {
      title: 'Building Footprints 3D',
      provider: 'Department of Municipalities and Transport (DMT)',
      type: '3D Tiles · OGC API',
      classification: 'Restricted',
      sla: 'SLA Tier 1',
      subscribers: '128 subscribers',
      desc: 'High-density 3D building envelopes with semantic municipal building IDs, height data, and LOD2 geometries for waterfront and commercial districts.'
    },
    {
      title: 'Land Parcels API (Cadastre)',
      provider: 'Department of Municipalities and Transport (DMT)',
      type: 'OGC API Features',
      classification: 'Shared – Government',
      sla: 'SLA Tier 1',
      subscribers: '214 subscribers',
      desc: '412,380 cadastral boundary polygons with zoning codes, deed identifiers, and monthly refresh validation.'
    },
    {
      title: 'Population Grid 100m',
      provider: 'Statistics Centre – Abu Dhabi (SCAD)',
      type: 'GeoTIFF / GeoJSON',
      classification: 'Shared – Government',
      sla: 'SLA Tier 2',
      subscribers: '94 subscribers',
      desc: 'High-resolution demographic distribution grids mapped to 100m cells for health, transport, and commercial planning.'
    },
    {
      title: 'Mangrove Extent Time Series',
      provider: 'Environment Agency – Abu Dhabi (EAD)',
      type: 'Vector Time Series',
      classification: 'Open',
      sla: 'SLA Tier 2',
      subscribers: '186 subscribers',
      desc: 'Multi-year environmental boundary extents covering protected coastal mangrove forests and intertidal marine reserves.'
    },
    {
      title: 'Building Change Detection Results',
      provider: 'AD-SDI GeoAI Unit',
      type: 'GeoJSON / REST',
      classification: 'Restricted',
      sla: 'SLA Tier 1',
      subscribers: '48 subscribers',
      desc: 'Verified municipal structural additions, demolitions, and ground alterations extracted from satellite captures.'
    },
    {
      title: 'Rooftop Solar Potential Index',
      provider: 'Accredited Energy Partner',
      type: 'Vector / 3D Mesh',
      classification: 'Restricted',
      sla: 'SLA Tier 2',
      subscribers: '36 subscribers',
      desc: 'Solar insolation modeling and usable rooftop area calculations for urban commercial and residential zones.'
    }
  ];

  const accessModels = [
    {
      title: 'Government Entity — Included',
      badge: 'Zero-Fee Inter-Agency',
      desc: 'Pre-authorized for accredited Abu Dhabi government departments under the whole-of-government spatial enablement charter.'
    },
    {
      title: 'Commercial — Project Subscription',
      badge: 'Entitlement Quota',
      desc: 'Provisioned for certified contractors and engineering consultancies under active government project contracts with SLA covenants.'
    },
    {
      title: 'Pay-Per-Use / Project Quota',
      badge: 'Volume Metering',
      desc: 'Strictly volume-governed API access for academic researchers and partner institutions tied to discrete project deliverables.'
    }
  ];

  return (
    <>
      <PageHero
        badge="Module C · #0E9F8E"
        title="Geospatial Marketplace"
        lead="A structured, strictly non-commercial data exchange allowing government entities and accredited partners to discover, request, and govern specialized spatial assets under verified SLAs."
        breadcrumbItems={[
          { label: 'Capabilities', to: '/capabilities' },
          { label: 'Marketplace' }
        ]}
      />

      {/* 1. Non-Commercial Exchange Notice */}
      <section className="section-sm section-alt">
        <Container>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '20px', textAlign: 'center' }}>
              <span style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--mod-c)', display: 'block' }}>0 AED</span>
              <strong style={{ fontSize: '0.9rem', color: 'var(--navy-900)' }}>Zero Commercial Fees</strong>
              <span style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', display: 'block', marginTop: '2px' }}>Entitlement & SLA governance only</span>
            </div>
            <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '20px', textAlign: 'center' }}>
              <span style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--navy-900)', display: 'block' }}>Tier 1</span>
              <strong style={{ fontSize: '0.9rem', color: 'var(--navy-900)' }}>Guaranteed Service SLAs</strong>
              <span style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', display: 'block', marginTop: '2px' }}>p95 &lt; 250ms latency standards</span>
            </div>
            <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '20px', textAlign: 'center' }}>
              <span style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--mod-c)', display: 'block' }}>100%</span>
              <strong style={{ fontSize: '0.9rem', color: 'var(--navy-900)' }}>DSA Governed</strong>
              <span style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', display: 'block', marginTop: '2px' }}>Electronic bilateral agreements</span>
            </div>
            <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '20px', textAlign: 'center' }}>
              <span style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--success)', display: 'block' }}>128</span>
              <strong style={{ fontSize: '0.9rem', color: 'var(--navy-900)' }}>Active Subscribers</strong>
              <span style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', display: 'block', marginTop: '2px' }}>Cross-entity data consumers</span>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Structured Non-Commercial Product Exchange */}
      <section className="section">
        <Container>
          <div className="feature-split">
            <div>
              <SectionHeading
                badge="Entitlement Management"
                badgeVariant="navy"
                title="Governed Sharing for High-Value Spatial Assets"
                align="split"
              />
              <p>
                Certain geospatial assets—such as 3D building meshes, LiDAR point clouds, high-frequency IoT feeds, and subterranean utility grids—cannot be placed on an open public portal due to sensitivity, safety, and infrastructure protection.
              </p>
              <p>
                The <strong>AD-SDI Marketplace</strong> establishes a structured, legally robust environment where accredited entities request and share specialized products. In accordance with DGE principles, the Marketplace operates <strong>strictly on an entitlement, SLA, and cooperation basis with zero monetary pricing or AED transactions</strong>.
              </p>
              <div style={{ marginTop: '20px' }}>
                <Link to="/workflows" className="btn btn-secondary">
                  Explore Marketplace Request Flow <ArrowRight size={16} weight="bold" />
                </Link>
              </div>
            </div>

            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '28px', boxShadow: 'var(--shadow-sm)' }}>
              <h4 style={{ fontSize: '1.15rem', color: 'var(--navy-900)', marginBottom: '16px' }}>
                Three Standardized Access Models
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {accessModels.map((model, idx) => (
                  <div key={idx} style={{ padding: '14px', background: 'var(--canvas)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <strong style={{ fontSize: '0.92rem', color: 'var(--navy-900)' }}>{model.title}</strong>
                      <span className="badge badge-navy" style={{ fontSize: '0.7rem' }}>{model.badge}</span>
                    </div>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                      {model.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Curated Products Visual Presentation */}
          <div style={{ marginTop: '48px', background: '#FFFFFF', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}>
            <div style={{ padding: '24px 28px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <span className="badge badge-emerald" style={{ color: '#0E9F8E', background: 'rgba(14, 159, 142, 0.1)' }}>
                  Curated Catalog Presentation
                </span>
                <h3 style={{ fontSize: '1.35rem', color: 'var(--navy-900)', margin: '6px 0 2px 0' }}>
                  Authoritative Sovereign Geospatial Assets
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
                  Curated showcase of satellite orthoimagery, 3D point clouds, DEM elevation models, vector base maps, and ISO metadata cards.
                </p>
              </div>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--mod-c)', background: 'var(--canvas)', padding: '6px 12px', borderRadius: '4px' }}>
                Strictly Non-Commercial · 0 AED
              </span>
            </div>
            <div style={{ position: 'relative', width: '100%', maxHeight: '500px', overflow: 'hidden', background: '#0B2545' }}>
              <img
                src="/assets/marketplace_geospatial.jpg"
                alt="Curated editorial showcase of geospatial data products, elevation models, satellite orthoimagery, and metadata cards"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
          </div>
        </Container>
      </section>

      {/* 3. Sample Products from Design Brief S08 */}
      <section className="section section-alt">
        <Container>
          <SectionHeading
            badge="Product Portfolio"
            badgeVariant="emerald"
            title="Curated Specialized Spatial Products"
            subtitle="Explore high-value datasets and analytical services shared across Abu Dhabi government departments and approved partners."
            align="center"
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
            {sampleProducts.map((prod, idx) => (
              <div
                key={idx}
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: 'var(--shadow-subtle)',
                  borderTop: '4px solid var(--mod-c)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <span className="badge badge-navy" style={{ fontSize: '0.72rem' }}>
                    {prod.classification}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                    {prod.sla}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.15rem', color: 'var(--navy-900)', margin: '4px 0 6px 0' }}>
                  {prod.title}
                </h3>
                <span style={{ fontSize: '0.78rem', color: 'var(--blue-600)', fontWeight: 600, marginBottom: '10px', display: 'block' }}>
                  Provider: {prod.provider}
                </span>

                <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6, flexGrow: 1 }}>
                  {prod.desc}
                </p>

                <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
                  <span>Format: <strong>{prod.type}</strong></span>
                  <span style={{ color: 'var(--mod-c)', fontWeight: 700 }}>{prod.subscribers}</span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 4. Bilateral Data Sharing Agreements (DSAs) */}
      <section className="section">
        <Container>
          <div className="feature-split reverse">
            <div>
              <SectionHeading
                badge="Legal & Governance Framework"
                badgeVariant="gold"
                title="Bilateral Data Sharing Agreements (DSAs)"
                align="split"
              />
              <p>
                Data stewards need assurance that sensitive layers are not re-distributed beyond approved scopes. Every Marketplace request is formalized through an electronic Data Sharing Agreement (e.g., <strong>DSA-2027-014</strong>).
              </p>
              <p>
                The DSA documents the intended project justification, consumption quotas, expiry dates, and permitted derivative works. Once approved electronically by the custodial steward, masked API keys (<code>adsdi_••••••3f9a</code>) are automatically generated with rate-limiting telemetry.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ShieldCheck size={18} color="var(--success)" weight="bold" />
                  <span style={{ fontSize: '0.88rem' }}>Electronic dual-party governance sign-off</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ShieldCheck size={18} color="var(--success)" weight="bold" />
                  <span style={{ fontSize: '0.88rem' }}>Automated quota metering (e.g. 50,000 calls / month)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ShieldCheck size={18} color="var(--success)" weight="bold" />
                  <span style={{ fontSize: '0.88rem' }}>Rotatable security credentials with instant revocation</span>
                </div>
              </div>
            </div>

            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '24px', boxShadow: 'var(--shadow-sm)' }}>
              <h4 style={{ fontSize: '1.1rem', color: 'var(--navy-900)', marginBottom: '14px' }}>
                Electronic DSA Lifecycle
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ padding: '12px', background: 'var(--canvas)', borderRadius: 'var(--radius-sm)' }}>
                  <strong style={{ fontSize: '0.86rem', color: 'var(--navy-900)', display: 'block' }}>1. Request Submission</strong>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Consumer specifies intended scope, project duration, and monthly API volume.</span>
                </div>

                <div style={{ padding: '12px', background: 'var(--canvas)', borderRadius: 'var(--radius-sm)' }}>
                  <strong style={{ fontSize: '0.86rem', color: 'var(--navy-900)', display: 'block' }}>2. Custodian Stewardship Review</strong>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Data steward at publishing entity evaluates justification against security rules.</span>
                </div>

                <div style={{ padding: '12px', background: 'var(--canvas)', borderRadius: 'var(--radius-sm)' }}>
                  <strong style={{ fontSize: '0.86rem', color: 'var(--navy-900)', display: 'block' }}>3. Electronic DSA Binding</strong>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Formal digital signature bound to organization ID with non-commercial covenants.</span>
                </div>

                <div style={{ padding: '12px', background: 'var(--canvas)', borderRadius: 'var(--radius-sm)' }}>
                  <strong style={{ fontSize: '0.86rem', color: 'var(--navy-900)', display: 'block' }}>4. Credential Provisioning & Telemetry</strong>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Live API endpoints provisioned with continuous SLA telemetry and usage tracking.</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <CallToAction
        title="Explore Marketplace Integration for Your Entity"
        lead="Our commercial and legal working group can assist your entity in cataloguing high-value spatial assets or drafting standardized DSA templates."
        primaryBtnText="Consult on Data Sharing Agreements"
        primaryBtnLink="/contact"
      />
    </>
  );
}

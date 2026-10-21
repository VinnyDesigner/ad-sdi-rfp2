import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Cube,
  CheckCircle,
  Sliders,
  Clock,
  Waves,
  Lightning,
  ShieldCheck,
  Buildings,
  Eye,
  Pulse,
  Tree
} from '@phosphor-icons/react';
import Container from '../../components/Container';
import PageHero from '../../components/PageHero';
import SectionHeading from '../../components/SectionHeading';
import CallToAction from '../../components/CallToAction';
import { capabilities } from '../../data/capabilities';

export default function DigitalTwin() {
  const capData = capabilities.find((c) => c.id === 'digital-twin');

  const twinCapabilities = [
    {
      title: 'LOD1 to LOD3 Semantic Building Envelopes',
      desc: 'Photorealistic and schematic 3D building models mapped to municipal deed IDs, height data (e.g. Tower AD-BLD-000482, 142m), and linked BIM (IFC) architectural models.'
    },
    {
      title: 'Subsurface Utility & Infrastructure Corridor Cut',
      desc: 'Interactive ground-plane transparency revealing water mains, high-voltage power conduits, gas lines, and district cooling channels in spatial relation to surface assets.'
    },
    {
      title: 'Real-Time IoT Environmental Telemetry',
      desc: 'Streaming sensors across the pilot district: PM2.5 air quality stations (EAD), live traffic flow congestion vectors, and real-time building power draw (kW).'
    },
    {
      title: '4D Temporal Simulation & Scenario Testing',
      desc: 'Continuous timeline slider spanning 2020 historical captures through 2035 predictive horizon, enabling side-by-side scenario comparisons ("A: Approved Plan" vs "B: Proposed Amendment").'
    }
  ];

  return (
    <>
      <PageHero
        badge="Module E · #2BA6DE"
        title="Digital Twin & 3D Visualisation"
        lead="Immersive 3D urban representation combining semantic building geometry, terrain, subsurface utilities, and live IoT feeds with 4D predictive scenario planning."
        breadcrumbItems={[
          { label: 'Capabilities', to: '/capabilities' },
          { label: 'Digital Twin & 3D' }
        ]}
      />

      {/* 1. Scale & Telemetry Metrics Banner */}
      <section className="section-sm section-alt">
        <Container>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '20px', textAlign: 'center' }}>
              <span style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--mod-e)', display: 'block' }}>4D</span>
              <strong style={{ fontSize: '0.9rem', color: 'var(--navy-900)' }}>Temporal Simulation</strong>
              <span style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', display: 'block', marginTop: '2px' }}>2020 historical to 2035 horizon</span>
            </div>
            <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '20px', textAlign: 'center' }}>
              <span style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--navy-900)', display: 'block' }}>48</span>
              <strong style={{ fontSize: '0.9rem', color: 'var(--navy-900)' }}>Live IoT Sensor Feeds</strong>
              <span style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', display: 'block', marginTop: '2px' }}>46 / 48 online in pilot district</span>
            </div>
            <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '20px', textAlign: 'center' }}>
              <span style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--mod-e)', display: 'block' }}>LOD1–3</span>
              <strong style={{ fontSize: '0.9rem', color: 'var(--navy-900)' }}>Building Semantic Detail</strong>
              <span style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', display: 'block', marginTop: '2px' }}>BIM IFC models integrated</span>
            </div>
            <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '20px', textAlign: 'center' }}>
              <span style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--success)', display: 'block' }}>OGC</span>
              <strong style={{ fontSize: '0.9rem', color: 'var(--navy-900)' }}>3D Tiles & CityGML</strong>
              <span style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', display: 'block', marginTop: '2px' }}>Standard streaming protocols</span>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Visualising Above and Below Ground */}
      <section className="section">
        <Container>
          <div className="feature-split">
            <div>
              <SectionHeading
                badge="Spatial Virtualization"
                badgeVariant="navy"
                title="Unifying Physical Reality and Real-Time Telemetry"
                align="split"
              />
              <p>
                Urban planners, utility operators, and civil defense commanders frequently lack a unified operational picture that integrates above-ground buildings, subsurface utility networks, and real-time environmental sensors.
              </p>
              <p>
                The <strong>AD-SDI Digital Twin</strong> establishes a high-fidelity 3D virtual environment for Abu Dhabi. Beginning with the Waterfront and Al Maryah pilot districts, the Twin combines terrain elevation, semantic architectural models, subsurface infrastructure meshes, and streaming IoT feeds into an interactive decision sandbox.
              </p>
              <div style={{ marginTop: '20px' }}>
                <Link to="/workflows" className="btn btn-secondary">
                  Review Multi-Agency Simulation Workflows <ArrowRight size={16} weight="bold" />
                </Link>
              </div>
            </div>

            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '28px', boxShadow: 'var(--shadow-sm)' }}>
              <h4 style={{ fontSize: '1.15rem', color: 'var(--navy-900)', marginBottom: '16px' }}>
                Digital Twin Core Modules
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {twinCapabilities.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <CheckCircle size={20} color="var(--mod-e)" weight="fill" style={{ flexShrink: 0, marginTop: '2px' }} />
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

          {/* 3D Waterfront District Showcase Visual */}
          <div style={{ marginTop: '48px', background: '#0B2545', border: '1px solid rgba(43, 166, 222, 0.3)', borderRadius: 'var(--radius-xl)', overflow: 'hidden', boxShadow: 'var(--shadow-xl)' }}>
            <div style={{ padding: '24px 28px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <span className="badge badge-blue" style={{ color: '#2BA6DE', background: 'rgba(43, 166, 222, 0.15)' }}>
                  3D Geospatial Virtualization
                </span>
                <h3 style={{ fontSize: '1.35rem', color: '#FFFFFF', margin: '6px 0 2px 0' }}>
                  Al Maryah & Reem Island 3D Waterfront Twin
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--steel-200)', margin: 0 }}>
                  High-fidelity 3D semantic building meshes, bridge crossings, bathymetric waterways, and geographic coordinate wireframes.
                </p>
              </div>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#2BA6DE', background: 'rgba(43, 166, 222, 0.1)', border: '1px solid rgba(43, 166, 222, 0.3)', padding: '6px 12px', borderRadius: '4px' }}>
                LOD1–3 Meshes · CityGML
              </span>
            </div>
            <div style={{ position: 'relative', width: '100%', maxHeight: '560px', overflow: 'hidden' }}>
              <img
                src="/assets/digital_twin_waterfront.jpg"
                alt="3D digital twin visualization of Abu Dhabi waterfront district showing building envelopes and geospatial grid"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
          </div>
        </Container>
      </section>

      {/* 3. 4D Temporal Simulation & Scenario Testing */}
      <section className="section section-alt">
        <Container>
          <SectionHeading
            badge="Predictive Sandbox"
            badgeVariant="blue"
            title="4D Scenario Planning & Environmental Impact"
            subtitle="Testing prospective master plans, shadow dispersion, and storm surge inundation before committing infrastructure capital."
            align="center"
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '24px' }}>
              <Clock size={26} color="var(--mod-e)" weight="bold" style={{ marginBottom: '12px' }} />
              <h3 style={{ fontSize: '1.1rem', color: 'var(--navy-900)', marginBottom: '8px' }}>4D Temporal Slider (2020–2035)</h3>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6 }}>
                Simulate historical urban growth from 2020 and evaluate phased master developments up to 2035, with current baseline anchored at September 2027.
              </p>
            </div>

            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '24px' }}>
              <Eye size={26} color="var(--mod-e)" weight="bold" style={{ marginBottom: '12px' }} />
              <h3 style={{ fontSize: '1.1rem', color: 'var(--navy-900)', marginBottom: '8px' }}>A/B Scenario Comparison</h3>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6 }}>
                Compare "Scenario A: Approved Baseline" against "Scenario B: Proposed Amendment" with automated visual difference highlighting.
              </p>
            </div>

            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '24px' }}>
              <Waves size={26} color="var(--mod-e)" weight="bold" style={{ marginBottom: '12px' }} />
              <h3 style={{ fontSize: '1.1rem', color: 'var(--navy-900)', marginBottom: '8px' }}>Coastal Surge & Shadow Analysis</h3>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6 }}>
                Model solar shadow footprints across pedestrian promenades and simulate extreme weather coastal inundation using high-precision bathymetry.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* 4. Live Pilot Telemetry & Asset Card */}
      <section className="section">
        <Container>
          <div className="feature-split reverse">
            <div>
              <SectionHeading
                badge="Live Pilot Telemetry"
                badgeVariant="gold"
                title="Waterfront District Pilot Area"
                align="split"
              />
              <p>
                In the showcase pilot district (Design Brief Screen S10), 48 connected sensors continuously stream live environmental and operational indicators.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Pulse size={18} color="var(--success)" weight="bold" />
                  <span style={{ fontSize: '0.88rem' }}>Live air quality monitoring: PM2.5 18 µg/m³ (Good, Owner: EAD)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Pulse size={18} color="var(--success)" weight="bold" />
                  <span style={{ fontSize: '0.88rem' }}>Building energy consumption: 1,240 kW with 68% occupancy tracking</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Pulse size={18} color="var(--success)" weight="bold" />
                  <span style={{ fontSize: '0.88rem' }}>Dynamic traffic vector gradients: Green → Amber congestion indicators</span>
                </div>
              </div>
            </div>

            {/* Asset Inspector Mockup */}
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '24px', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', borderBottom: '1px solid var(--border-light)', paddingBottom: '10px' }}>
                <div>
                  <strong style={{ fontSize: '1rem', color: 'var(--navy-900)' }}>Tower AD-BLD-000482</strong>
                  <span style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', display: 'block' }}>Mixed Commercial · Al Maryah Waterfront</span>
                </div>
                <span className="badge badge-success">Live IoT Linked</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', fontSize: '0.82rem' }}>
                <div style={{ padding: '8px 12px', background: 'var(--canvas)', borderRadius: 'var(--radius-sm)' }}>
                  <span style={{ color: 'var(--text-secondary)', display: 'block' }}>Height</span>
                  <strong style={{ color: 'var(--navy-900)' }}>142 m</strong>
                </div>
                <div style={{ padding: '8px 12px', background: 'var(--canvas)', borderRadius: 'var(--radius-sm)' }}>
                  <span style={{ color: 'var(--text-secondary)', display: 'block' }}>BIM Model</span>
                  <strong style={{ color: 'var(--navy-900)' }}>Linked (IFC 4.0)</strong>
                </div>
                <div style={{ padding: '8px 12px', background: 'var(--canvas)', borderRadius: 'var(--radius-sm)' }}>
                  <span style={{ color: 'var(--text-secondary)', display: 'block' }}>Energy Draw</span>
                  <strong style={{ color: 'var(--success)' }}>1,240 kW (Active)</strong>
                </div>
                <div style={{ padding: '8px 12px', background: 'var(--canvas)', borderRadius: 'var(--radius-sm)' }}>
                  <span style={{ color: 'var(--text-secondary)', display: 'block' }}>Occupancy</span>
                  <strong style={{ color: 'var(--navy-900)' }}>68% Normal</strong>
                </div>
              </div>

              <div style={{ marginTop: '12px', padding: '10px', background: 'rgba(43, 166, 222, 0.1)', borderRadius: 'var(--radius-sm)', fontSize: '0.78rem', color: 'var(--navy-900)' }}>
                <strong>Linked Sensor AQ-0117:</strong> PM2.5 18 µg/m³ · Status: Good · Verified 12s ago
              </div>
            </div>
          </div>
        </Container>
      </section>

      <CallToAction
        title="Schedule a Digital Twin 3D Demonstration"
        lead="Experience how 3D urban geometries, subterranean utility cuts, and predictive 4D timelines integrate into an executive simulation cockpit."
        primaryBtnText="Request 3D Twin Walkthrough"
        primaryBtnLink="/contact"
      />
    </>
  );
}

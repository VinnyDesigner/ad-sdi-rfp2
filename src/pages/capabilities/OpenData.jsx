import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  GlobeHemisphereEast,
  CheckCircle,
  DownloadSimple,
  Code,
  Sparkle,
  ShieldCheck,
  Tree,
  Bus,
  Compass,
  FileText
} from '@phosphor-icons/react';
import Container from '../../components/Container';
import PageHero from '../../components/PageHero';
import SectionHeading from '../../components/SectionHeading';
import CallToAction from '../../components/CallToAction';
import { capabilities } from '../../data/capabilities';

export default function OpenData() {
  const capData = capabilities.find((c) => c.id === 'open-data');

  const popularDatasets = [
    {
      title: 'Public Parks & Recreational Spaces',
      publisher: 'Department of Municipalities and Transport (DMT)',
      formats: ['GeoJSON', 'Shapefile', 'CSV', 'KML'],
      desc: 'Authoritative municipal boundaries, playground facilities, shaded structures, and public amenities.',
      refresh: 'Refreshed monthly'
    },
    {
      title: 'Bus Stops & Transit Routes',
      publisher: 'Integrated Transport Centre (ITC / DMT)',
      formats: ['OGC API', 'GeoJSON', 'GTFS'],
      desc: 'Emirate-wide public transit corridors, bus shelter locations, and transit connection nodes.',
      refresh: 'Refreshed quarterly'
    },
    {
      title: 'Beaches & Public Coastal Access Points',
      publisher: 'Environment Agency – Abu Dhabi (EAD)',
      formats: ['GeoJSON', 'KML', 'CSV'],
      desc: 'Certified swimming zones, coastal promenades, water safety stations, and public access points.',
      refresh: 'Refreshed quarterly'
    },
    {
      title: 'Dedicated Cycling & Running Tracks',
      publisher: 'Department of Municipalities and Transport (DMT)',
      formats: ['Shapefile', 'GeoJSON', 'KML'],
      desc: 'Designated cycling paths, pedestrian trails, and community fitness loops across Abu Dhabi Island and Yas.',
      refresh: 'Refreshed semi-annually'
    }
  ];

  return (
    <>
      <PageHero
        badge="Module F · #5DAA3A"
        title="Open Data & Public Hub"
        lead="Democratizing approved non-sensitive spatial data for citizens, researchers, startups, and private enterprise—driving civic innovation and GovTech entrepreneurship."
        breadcrumbItems={[
          { label: 'Capabilities', to: '/capabilities' },
          { label: 'Open Data & Public Hub' }
        ]}
      />

      {/* 1. Scale & Civic Impact Metrics Banner */}
      <section className="section-sm section-alt">
        <Container>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '20px', textAlign: 'center' }}>
              <span style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--mod-f)', display: 'block' }}>640</span>
              <strong style={{ fontSize: '0.9rem', color: 'var(--navy-900)' }}>Open Spatial Datasets</strong>
              <span style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', display: 'block', marginTop: '2px' }}>Approved for unrestricted public use</span>
            </div>
            <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '20px', textAlign: 'center' }}>
              <span style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--navy-900)', display: 'block' }}>48k</span>
              <strong style={{ fontSize: '0.9rem', color: 'var(--navy-900)' }}>Monthly Downloads</strong>
              <span style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', display: 'block', marginTop: '2px' }}>Direct self-service export</span>
            </div>
            <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '20px', textAlign: 'center' }}>
              <span style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--mod-f)', display: 'block' }}>1.2M</span>
              <strong style={{ fontSize: '0.9rem', color: 'var(--navy-900)' }}>Monthly API Calls</strong>
              <span style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', display: 'block', marginTop: '2px' }}>Powering developer applications</span>
            </div>
            <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '20px', textAlign: 'center' }}>
              <span style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--success)', display: 'block' }}>52</span>
              <strong style={{ fontSize: '0.9rem', color: 'var(--navy-900)' }}>Registered Apps</strong>
              <span style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', display: 'block', marginTop: '2px' }}>Civic & commercial products</span>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Civic Transparency & Economic Vision */}
      <section className="section">
        <Container>
          <div className="feature-split">
            <div>
              <SectionHeading
                badge="Civic Democratisation"
                badgeVariant="navy"
                title="Unlocking Public-Tier Spatial Assets"
                align="split"
              />
              <p>
                Open geospatial data is a cornerstone of a modern, knowledge-based economy. By lowering the barrier to authoritative geographic data, Abu Dhabi empowers university students, GovTech startups, and global researchers to develop location-aware solutions.
              </p>
              <p>
                Every dataset published to the <strong>AD-SDI Open Data Hub</strong> passes through our automated Quality Gateway and formal security classification before public release, guaranteeing that citizens and commercial builders build on reliable, up-to-date foundations.
              </p>
              <div style={{ marginTop: '20px' }}>
                <Link to="/workflows" className="btn btn-secondary">
                  Explore Open Data Publishing Workflow <ArrowRight size={16} weight="bold" />
                </Link>
              </div>
            </div>

            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '28px', boxShadow: 'var(--shadow-sm)' }}>
              <h4 style={{ fontSize: '1.15rem', color: 'var(--navy-900)', marginBottom: '16px' }}>
                Open Data Hub Core Principles
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {capData.capabilitiesList.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <CheckCircle size={20} color="var(--mod-f)" weight="fill" style={{ flexShrink: 0, marginTop: '2px' }} />
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

          {/* Civic Open Data and Urban Accessibility Showcase */}
          <div style={{ marginTop: '48px', background: '#FFFFFF', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}>
            <div style={{ padding: '24px 28px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <span className="badge badge-emerald" style={{ color: '#5DAA3A', background: 'rgba(93, 170, 58, 0.1)' }}>
                  Civic Innovation & Accessibility
                </span>
                <h3 style={{ fontSize: '1.35rem', color: 'var(--navy-900)', margin: '6px 0 2px 0' }}>
                  Smart Mobility, Urban Greenery & Public Waypoints
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
                  Open spatial data powering pedestrian accessibility vectors, public park canopy indexes, and cultural landmark waypoints in Abu Dhabi.
                </p>
              </div>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--mod-f)', background: 'var(--canvas)', padding: '6px 12px', borderRadius: '4px' }}>
                640 Open Datasets · OGC API Features
              </span>
            </div>
            <div style={{ position: 'relative', width: '100%', maxHeight: '520px', overflow: 'hidden', background: '#0B2545' }}>
              <img
                src="/assets/opendata_civic.jpg"
                alt="Civic open spatial data visualization of Abu Dhabi urban park, pedestrian accessibility vectors, and canopy index"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
          </div>
        </Container>
      </section>

      {/* 3. Popular Open Datasets (Design Brief S13) */}
      <section className="section section-alt">
        <Container>
          <SectionHeading
            badge="Public Portfolio"
            badgeVariant="green"
            title="Featured Open Spatial Datasets"
            subtitle="Certified public-tier assets available for immediate self-service download and API integration."
            align="center"
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {popularDatasets.map((ds, idx) => (
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
                  borderTop: '4px solid var(--mod-f)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span className="badge badge-success" style={{ fontSize: '0.7rem' }}>
                    Open Tier
                  </span>
                  <span style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
                    {ds.refresh}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.1rem', color: 'var(--navy-900)', margin: '4px 0 6px 0' }}>
                  {ds.title}
                </h3>
                <span style={{ fontSize: '0.78rem', color: 'var(--blue-600)', fontWeight: 600, marginBottom: '10px', display: 'block' }}>
                  {ds.publisher}
                </span>

                <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6, flexGrow: 1 }}>
                  {ds.desc}
                </p>

                <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid var(--border-light)', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {ds.formats.map((fmt, fIdx) => (
                    <span key={fIdx} style={{ fontSize: '0.72rem', background: 'var(--canvas)', border: '1px solid var(--border)', padding: '2px 6px', borderRadius: '4px', fontWeight: 600, color: 'var(--navy-900)' }}>
                      {fmt}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 4. Civic Innovation & GeoHack 2028 */}
      <section className="section">
        <Container>
          <div className="feature-split reverse">
            <div>
              <SectionHeading
                badge="Civic Innovation"
                badgeVariant="gold"
                title="Fostering GovTech Entrepreneurship & GeoHack 2028"
                align="split"
              />
              <p>
                Open data reaches its potential only when coupled with active community engagement. The Open Data Hub hosts developer documentation, client SDKs, and supports the flagship <strong>GeoHack 2028</strong> innovation challenge.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle size={18} color="var(--success)" weight="bold" />
                  <span style={{ fontSize: '0.88rem' }}>Interactive developer sandbox with live Swagger/OpenAPI documentation</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle size={18} color="var(--success)" weight="bold" />
                  <span style={{ fontSize: '0.88rem' }}>Permissive Abu Dhabi Open Data Licence protecting source integrity</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle size={18} color="var(--success)" weight="bold" />
                  <span style={{ fontSize: '0.88rem' }}>Public dataset request pipeline and issue reporting channels</span>
                </div>
              </div>
            </div>

            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '24px', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ padding: '20px', background: 'rgba(255, 194, 14, 0.1)', border: '1px solid var(--gold-500)', borderRadius: 'var(--radius-md)', marginBottom: '16px' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', color: '#8C6200', letterSpacing: '0.05em' }}>
                  Flagship Civic Initiative
                </span>
                <h4 style={{ fontSize: '1.2rem', color: 'var(--navy-900)', margin: '4px 0 6px 0' }}>
                  GeoHack 2028 Innovation Challenge
                </h4>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', margin: 0 }}>
                  Annual GovTech hackathon inviting universities, startups, and civic developers to build spatial solutions addressing climate resilience and mobility.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ padding: '12px', background: 'var(--canvas)', borderRadius: 'var(--radius-sm)' }}>
                  <strong style={{ fontSize: '0.86rem', color: 'var(--navy-900)', display: 'block' }}>Developer APIs & Documentation</strong>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Instant access to REST and OGC API endpoints with code snippets in Python and JavaScript.</span>
                </div>
                <div style={{ padding: '12px', background: 'var(--canvas)', borderRadius: 'var(--radius-sm)' }}>
                  <strong style={{ fontSize: '0.86rem', color: 'var(--navy-900)', display: 'block' }}>Academic Research Partnerships</strong>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Collaborative pipelines with Abu Dhabi universities for urban heat and ecological studies.</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <CallToAction
        title="Explore Open Data Publishing for Your Entity"
        lead="Our civic enablement team can assist your department in identifying non-sensitive spatial layers for public open release."
        primaryBtnText="Consult on Open Data Strategy"
        primaryBtnLink="/contact"
      />
    </>
  );
}

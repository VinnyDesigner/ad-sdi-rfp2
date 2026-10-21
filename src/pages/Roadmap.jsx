import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CalendarCheck,
  ShieldCheck,
  CheckCircle,
  Flag,
  Info,
  Warning,
  ChartLineUp,
  ArrowsClockwise
} from '@phosphor-icons/react';
import Container from '../components/Container';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import RoadmapTimeline from '../components/RoadmapTimeline';
import CallToAction from '../components/CallToAction';
import { roadmapAssumptions, workstreamLanes, topRisks, programmeMeta } from '../data/roadmap';

export default function Roadmap() {
  return (
    <>
      <PageHero
        badge="Strategic Delivery Programme (2026 – 2029)"
        title="Implementation Roadmap & Governance Gates"
        lead="A phased four-stage delivery roadmap structured across seven workstream lanes and four formal milestone decision gates to de-risk whole-of-government spatial enablement."
        breadcrumbItems={[{ label: 'Implementation Roadmap' }]}
      />

      {/* 1. Executive Timeline Notice */}
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
                Proposed Implementation Framework Notice:
              </strong>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: '4px 0 0 0', lineHeight: 1.6 }}>
                The schedule, workstreams, and milestone gates outlined below (August 2026 through June 2029) represent a strategic delivery framework designed for consultative evaluation with the Department of Government Enablement (DGE). These stages reflect a structured implementation sequence and do not constitute binding contractual commitments.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Full Phased Roadmap Timeline Component */}
      <section className="section">
        <Container>
          <SectionHeading
            badge="Delivery Workstreams"
            badgeVariant="blue"
            title="Four-Phase Delivery Programme (M1 – M4)"
            subtitle="Review the progression of deliverables, milestone decision gates, and critical path linkages across all six platform capabilities."
            align="center"
          />
          <RoadmapTimeline />
        </Container>
      </section>

      {/* 3. Seven Parallel Workstream Lanes */}
      <section className="section section-alt">
        <Container>
          <SectionHeading
            badge="Workstream Lanes"
            badgeVariant="navy"
            title="Seven Integrated Programme Lanes"
            subtitle="Dedicated workstream tracks operating in parallel to ensure simultaneous progress across discovery, intelligence, governance, and institutional enablement."
            align="center"
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px', marginBottom: '32px' }}>
            {workstreamLanes.map((lane) => (
              <div
                key={lane.id}
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '18px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  borderLeft: `4px solid ${lane.color}`
                }}
              >
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: lane.color,
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  flexShrink: 0
                }}>
                  {lane.id}
                </div>
                <div>
                  <strong style={{ fontSize: '0.9rem', color: 'var(--navy-900)', display: 'block' }}>
                    {lane.name}
                  </strong>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                    Lead: {lane.lead}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 4. Programme Risk Register & Mitigation Blueprint */}
      <section className="section">
        <Container>
          <SectionHeading
            badge="Risk Governance"
            badgeVariant="gold"
            title="Programme Risk Register & Mitigations (Design Brief S11)"
            subtitle="Proactive identification and mitigation strategies for major inter-agency, technical, and scheduling risks."
            align="center"
          />

          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            overflowX: 'auto',
            boxShadow: 'var(--shadow-sm)',
            marginBottom: '40px'
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '760px' }}>
              <thead>
                <tr style={{ background: 'var(--canvas)', borderBottom: '2px solid var(--border)' }}>
                  <th style={{ padding: '14px 18px', fontSize: '0.8rem', fontWeight: 800, color: 'var(--navy-900)' }}>ID</th>
                  <th style={{ padding: '14px 18px', fontSize: '0.8rem', fontWeight: 800, color: 'var(--navy-900)' }}>Risk Description</th>
                  <th style={{ padding: '14px 18px', fontSize: '0.8rem', fontWeight: 800, color: 'var(--navy-900)' }}>Severity</th>
                  <th style={{ padding: '14px 18px', fontSize: '0.8rem', fontWeight: 800, color: 'var(--navy-900)' }}>Owner</th>
                  <th style={{ padding: '14px 18px', fontSize: '0.8rem', fontWeight: 800, color: 'var(--navy-900)' }}>Mitigation Strategy</th>
                </tr>
              </thead>
              <tbody>
                {topRisks.map((r) => (
                  <tr key={r.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ padding: '14px 18px', fontWeight: 800, color: 'var(--navy-900)', fontSize: '0.85rem' }}>
                      {r.id}
                    </td>
                    <td style={{ padding: '14px 18px', fontSize: '0.86rem', color: 'var(--navy-900)', fontWeight: 600 }}>
                      {r.risk}
                    </td>
                    <td style={{ padding: '14px 18px' }}>
                      <span className="badge badge-warning" style={{ fontSize: '0.72rem' }}>
                        L: {r.likelihood} · I: {r.impact}
                      </span>
                    </td>
                    <td style={{ padding: '14px 18px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                      {r.owner}
                    </td>
                    <td style={{ padding: '14px 18px', fontSize: '0.82rem', color: 'var(--text-secondary)', maxWidth: '320px', lineHeight: 1.5 }}>
                      {r.mitigation}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      {/* 5. Key Assumptions & Prerequisites */}
      <section className="section section-alt">
        <Container>
          <SectionHeading
            badge="Delivery Prerequisites"
            badgeVariant="blue"
            title="Strategic Delivery Assumptions"
            subtitle="Core organizational assumptions underpinning seamless multi-agency rollout."
            align="center"
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {roadmapAssumptions.map((assump, idx) => (
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <ShieldCheck size={20} color="var(--blue-600)" weight="bold" />
                  <h4 style={{ fontSize: '1.05rem', color: 'var(--navy-900)', margin: 0 }}>
                    {assump.title}
                  </h4>
                </div>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6 }}>
                  {assump.detail}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CallToAction
        title="Schedule a Phased Scoping Workshop"
        lead="Our programme directors can collaborate with your entity’s leadership to align your existing datasets with Phase 1 and Phase 2 delivery milestones."
        primaryBtnText="Initiate Scoping Discussion"
        primaryBtnLink="/contact"
      />
    </>
  );
}

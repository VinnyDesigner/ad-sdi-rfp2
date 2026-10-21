import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Handshake,
  CheckCircle,
  CalendarDots,
  UsersThree,
  MagnifyingGlass,
  ShieldCheck,
  EnvelopeSimple,
  Phone,
  MapPin
} from '@phosphor-icons/react';
import Container from '../components/Container';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import ContactForm from '../components/ContactForm';

export default function Contact() {
  const nextSteps = [
    {
      step: '01',
      title: 'Requirements Validation Workshop',
      desc: 'Collaborative working session with department stakeholders to review spatial data dictionary mapping and custodial mandates.'
    },
    {
      step: '02',
      title: 'Technical Architecture Walkthrough',
      desc: 'Deep-dive session covering OGC web service endpoints, automated Quality Gateway integration, and sovereign UAE cloud hosting.'
    },
    {
      step: '03',
      title: 'Baseline 5-Axis GeoMaturity Assessment',
      desc: 'Execution of the 5-pillar organizational maturity diagnostic to establish current baseline competencies and training priorities.'
    },
    {
      step: '04',
      title: 'Feasibility Pilot & Data Ingestion',
      desc: 'Targeted proof-of-concept deploying Clearinghouse search and GeoAI change detection on a selected suburban or coastal sector.'
    }
  ];

  return (
    <>
      <PageHero
        badge="Stakeholder Engagement & Next Steps"
        title="Consultation & Engagement Pathways"
        lead="Take the next step toward transforming Abu Dhabi’s geospatial ecosystem. Engage with our solution architects to schedule technical workshops or validate agency-specific requirements."
        breadcrumbItems={[{ label: 'Stakeholder Consultation' }]}
      />

      <section className="section section-alt">
        <Container>
          <div className="feature-split">
            {/* Left Column: Proposed Next Steps */}
            <div>
              <SectionHeading
                badge="Engagement Roadmap"
                badgeVariant="navy"
                title="Moving from Proposal to Collaborative Action"
                align="split"
              />
              <p>
                Implementing a whole-of-government Spatial Data Infrastructure is an iterative, consultative journey. We invite leadership and technical teams across the Department of Government Enablement (DGE) and participating entities to initiate initial technical reviews.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '24px' }}>
                {nextSteps.map((ns) => (
                  <div
                    key={ns.step}
                    style={{
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-md)',
                      padding: '16px 20px',
                      display: 'flex',
                      gap: '14px',
                      alignItems: 'flex-start',
                      boxShadow: 'var(--shadow-subtle)'
                    }}
                  >
                    <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--blue-600)', width: '28px', flexShrink: 0 }}>
                      {ns.step}
                    </span>
                    <div>
                      <h4 style={{ fontSize: '1rem', color: 'var(--navy-900)', marginBottom: '4px' }}>
                        {ns.title}
                      </h4>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                        {ns.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Consultation Channels */}
              <div style={{ marginTop: '28px', padding: '20px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
                <strong style={{ fontSize: '0.9rem', color: 'var(--navy-900)', display: 'block', marginBottom: '10px' }}>
                  Proposal Working Group Channels:
                </strong>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <EnvelopeSimple size={16} color="var(--blue-600)" />
                    <span>ad-sdi-proposal@dge.gov.ae (Department of Government Enablement)</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <MapPin size={16} color="var(--blue-600)" />
                    <span>Abu Dhabi, United Arab Emirates · Sovereign Data Centre Hosting</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Consultation Request Form */}
            <div>
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

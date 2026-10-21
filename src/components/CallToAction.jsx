import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, EnvelopeSimple } from '@phosphor-icons/react';
import Container from './Container';

export default function CallToAction({
  title = "Ready to Explore Abu Dhabi's Unified Spatial Ecosystem?",
  lead = 'Engage with our geospatial solutions team to schedule a technical walkthrough or validate agency-specific requirements.',
  primaryBtnText = 'Schedule Consultation',
  primaryBtnLink = '/contact',
  secondaryBtnText = 'View Platform Architecture',
  secondaryBtnLink = '/platform'
}) {
  return (
    <section className="section-sm">
      <Container>
        <div className="cta-banner">
          <div className="cta-banner-content">
            <h2>{title}</h2>
            <p>{lead}</p>
          </div>
          <div className="cta-banner-actions">
            <Link to={primaryBtnLink} className="btn btn-primary">
              <EnvelopeSimple size={18} weight="bold" />
              {primaryBtnText}
            </Link>
            {secondaryBtnLink && (
              <Link to={secondaryBtnLink} className="btn btn-outline-white">
                {secondaryBtnText}
                <ArrowRight size={16} weight="bold" />
              </Link>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

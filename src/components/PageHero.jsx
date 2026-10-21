import React from 'react';
import Container from './Container';
import Breadcrumb from './Breadcrumb';

export default function PageHero({
  badge,
  title,
  lead,
  breadcrumbItems = [],
  children
}) {
  return (
    <section className="page-hero">
      <div className="page-hero-grid-pattern" aria-hidden="true" />
      <Container>
        <div className="page-hero-content">
          {breadcrumbItems.length > 0 && <Breadcrumb items={breadcrumbItems} />}
          {badge && (
            <div className="page-hero-badge">
              <span className="badge badge-gold">{badge}</span>
            </div>
          )}
          <h1>{title}</h1>
          {lead && <p className="page-hero-lead">{lead}</p>}
          {children}
        </div>
      </Container>
    </section>
  );
}

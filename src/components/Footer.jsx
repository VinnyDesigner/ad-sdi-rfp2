import React from 'react';
import { Link } from 'react-router-dom';
import { CaretUp, ShieldCheck, Globe } from '@phosphor-icons/react';
import Container from './Container';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer">
      <Container wide>
        <div className="footer-top">
          {/* Brand Column */}
          <div className="footer-brand">
            <Link to="/" className="brand-link" style={{ marginBottom: '14px' }}>
              <div className="brand-emblem" style={{ background: '#13315C' }}>
                <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
                  <circle cx="16" cy="16" r="11" stroke="currentColor" strokeWidth="2.5" strokeDasharray="3 3" />
                  <circle cx="16" cy="16" r="4.5" fill="currentColor" />
                  <path d="M16 4v4M16 24v4M4 16h4M24 16h4" stroke="var(--gold-500)" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>
              <div className="brand-text">
                <span className="brand-title">AD-SDI</span>
                <span className="brand-subtitle">Abu Dhabi Spatial Data Infrastructure</span>
              </div>
            </Link>
            <p>
              A strategic Business Development proposal prepared for the <strong>Department of Government Enablement (DGE)</strong>, Abu Dhabi. Unifying discovery, spatial intelligence, governance, and institutional capacity across the Emirate.
            </p>
          </div>

          {/* Six Capabilities */}
          <div className="footer-col">
            <h4>Platform Capabilities</h4>
            <div className="footer-links">
              <Link to="/capabilities/clearinghouse">Clearinghouse & Portal</Link>
              <Link to="/capabilities/geoai">GeoAI & Intelligence</Link>
              <Link to="/capabilities/marketplace">Marketplace</Link>
              <Link to="/capabilities/capacity-building">Capacity Building</Link>
              <Link to="/capabilities/digital-twin">Digital Twin & 3D</Link>
              <Link to="/capabilities/open-data">Open Data Hub</Link>
              <Link to="/capabilities" style={{ color: 'var(--gold-400)', fontWeight: 600, marginTop: '4px' }}>
                All Capabilities Overview &rarr;
              </Link>
            </div>
          </div>

          {/* Solutions & Governance */}
          <div className="footer-col">
            <h4>Enterprise Solutions</h4>
            <div className="footer-links">
              <Link to="/platform">Platform Architecture</Link>
              <Link to="/workflows">End-to-End Workflows</Link>
              <Link to="/governance">Governance & Security</Link>
              <Link to="/roadmap">Implementation Roadmap</Link>
              <Link to="/value">Expected Business Value</Link>
              <Link to="/about">About AD-SDI Programme</Link>
              <Link to="/contact">Stakeholder Consultation</Link>
            </div>
          </div>

          {/* Standards & Technical Baselines */}
          <div className="footer-col">
            <h4>Technical Foundations</h4>
            <div className="footer-links">
              <span style={{ fontSize: '0.88rem', color: 'var(--steel-300)' }}>ISO 19115 / 19139 Metadata</span>
              <span style={{ fontSize: '0.88rem', color: 'var(--steel-300)' }}>ISO 19157 Spatial Quality</span>
              <span style={{ fontSize: '0.88rem', color: 'var(--steel-300)' }}>OGC WMS / WFS / API Features</span>
              <span style={{ fontSize: '0.88rem', color: 'var(--steel-300)' }}>UAE National Grid (EPSG:3997)</span>
              <span style={{ fontSize: '0.88rem', color: 'var(--steel-300)' }}>Sovereign UAE Cloud Hosting</span>
              <span style={{ fontSize: '0.88rem', color: 'var(--steel-300)' }}>Zero-Commercial Data Exchange</span>
            </div>
          </div>
        </div>

        {/* Conceptual Proposal Disclaimer */}
        <div className="footer-disclaimer">
          <strong>Strategic Proposal Notice:</strong> This website is an informational Business Development (BD) proposal designed to present and explain the proposed Abu Dhabi Spatial Data Infrastructure (AD-SDI) architecture, capabilities, and phased implementation approach for the Department of Government Enablement (DGE). All sample metrics, prospective timelines (2026–2029), and illustrative workflows represent proposed concepts subject to formal validation and do not constitute contractual commitments or verified operational deployments.
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div>
            &copy; {new Date().getFullYear()} Abu Dhabi Spatial Data Infrastructure (AD-SDI) Proposal. Prepared for the Department of Government Enablement (DGE).
          </div>
          <button
            type="button"
            onClick={scrollToTop}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--steel-300)', fontSize: '0.85rem' }}
          >
            <span>Back to top</span>
            <CaretUp size={16} weight="bold" />
          </button>
        </div>
      </Container>
    </footer>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  CaretDown,
  List,
  X,
  SquaresFour,
  Brain,
  Storefront,
  GraduationCap,
  Cube,
  GlobeHemisphereEast,
  ArrowRight
} from '@phosphor-icons/react';
import Container from './Container';

const capabilityItems = [
  {
    title: 'Clearinghouse & Portal',
    code: 'Module A',
    desc: 'Centralized spatial catalogue & OGC services',
    to: '/capabilities/clearinghouse',
    color: '#1F5FAD',
    icon: SquaresFour
  },
  {
    title: 'GeoAI & Intelligence',
    code: 'Module B',
    desc: 'Automated change detection & feature extraction',
    to: '/capabilities/geoai',
    color: '#7B4FD6',
    icon: Brain
  },
  {
    title: 'Marketplace',
    code: 'Module C',
    desc: 'Structured product discovery & entitlements',
    to: '/capabilities/marketplace',
    color: '#0E9F8E',
    icon: Storefront
  },
  {
    title: 'Capacity Building',
    code: 'Module D',
    desc: 'GeoMaturity assessment & learning journeys',
    to: '/capabilities/capacity-building',
    color: '#E07B24',
    icon: GraduationCap
  },
  {
    title: 'Digital Twin',
    code: 'Module E',
    desc: '3D urban modeling & scenario simulation',
    to: '/capabilities/digital-twin',
    color: '#2BA6DE',
    icon: Cube
  },
  {
    title: 'Open Data',
    code: 'Module F',
    desc: 'Civic transparency & developer APIs',
    to: '/capabilities/open-data',
    color: '#5DAA3A',
    icon: GlobeHemisphereEast
  }
];

export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  // Close menus on route change
  useEffect(() => {
    setDropdownOpen(false);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isCapabilitiesActive = location.pathname.startsWith('/capabilities');

  return (
    <header className="site-header">
      <Container wide>
        <div className="header-container">
          {/* Brand Logo & Title */}
          <Link to="/" className="brand-link" aria-label="AD-SDI Home">
            <div className="brand-emblem" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
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

          {/* Navigation Links */}
          <nav className={`nav-menu ${mobileMenuOpen ? 'open' : ''}`} aria-label="Main Navigation">
            <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} end>
              Home
            </NavLink>

            <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              About AD-SDI
            </NavLink>

            <NavLink to="/platform" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Platform Overview
            </NavLink>

            {/* Capabilities Dropdown */}
            <div className="nav-dropdown" ref={dropdownRef}>
              <button
                type="button"
                className={`dropdown-trigger ${isCapabilitiesActive ? 'active' : ''}`}
                onClick={() => setDropdownOpen(!dropdownOpen)}
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
              >
                <span>Capabilities</span>
                <CaretDown size={14} weight="bold" />
              </button>

              {dropdownOpen && (
                <div className="dropdown-menu" role="menu">
                  <div style={{ padding: '6px 12px 10px 12px', borderBottom: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
                      Six Platform Modules
                    </span>
                    <Link
                      to="/capabilities"
                      style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--blue-600)' }}
                      onClick={() => setDropdownOpen(false)}
                    >
                      Overview Grid
                    </Link>
                  </div>

                  {capabilityItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.to;
                    return (
                      <Link
                        key={item.to}
                        to={item.to}
                        className={`dropdown-item ${isActive ? 'active' : ''}`}
                        role="menuitem"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <div
                          className="dropdown-icon"
                          style={{ backgroundColor: item.color }}
                        >
                          <Icon size={16} weight="bold" />
                        </div>
                        <div className="dropdown-text">
                          <span className="dropdown-title">{item.title}</span>
                          <span className="dropdown-desc">{item.desc}</span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            <NavLink to="/workflows" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Workflows
            </NavLink>

            <NavLink to="/governance" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Governance
            </NavLink>

            <NavLink to="/roadmap" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Roadmap
            </NavLink>

            <NavLink to="/value" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Expected Value
            </NavLink>
          </nav>

          {/* Right Header Actions */}
          <div className="header-actions">
            <Link to="/contact" className="btn btn-primary" style={{ padding: '8px 18px', fontSize: '0.88rem' }}>
              Stakeholder Consultation
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={24} /> : <List size={24} />}
            </button>
          </div>
        </div>
      </Container>
    </header>
  );
}

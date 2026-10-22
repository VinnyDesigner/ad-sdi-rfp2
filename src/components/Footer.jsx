import React from 'react';
import { Link } from 'react-router-dom';
import {
  LinkedinLogo,
  TwitterLogo,
  InstagramLogo,
  Globe
} from '@phosphor-icons/react';
import Container from './Container';

export default function Footer() {
  return (
    <footer className="bg-[#0B2545] text-white border-t border-[#13315C] pt-12 pb-8 text-xs font-sans">
      <Container wide>
        {/* Main Footer Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 pb-10 border-b border-[#1E4976]">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1 space-y-3">
            <Link to="/" className="flex items-center gap-2.5">
              <img
                src="/assets/dge_logo_white.png"
                alt="Abu Dhabi Government Enablement"
                className="h-9 w-auto object-contain"
              />
            </Link>
            <div className="space-y-0.5">
              <div className="text-sm font-bold text-white tracking-tight">AD-SDI Portal</div>
              <div className="text-[11px] text-slate-300 font-medium leading-tight">
                Abu Dhabi Geospatial Infrastructure
              </div>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed pt-1">
              Authoritative spatial data, services, and sovereign intelligence for the Emirate of Abu Dhabi.
            </p>
          </div>

          {/* Column 1: Discover & Access */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Discover & Access
            </h4>
            <ul className="space-y-2 text-slate-300">
              <li>
                <Link to="/catalogue" className="hover:text-white transition-colors">
                  Data & Catalogue
                </Link>
              </li>
              <li>
                <Link to="/maps-services" className="hover:text-white transition-colors">
                  Maps & Services
                </Link>
              </li>
              <li>
                <Link to="/marketplace" className="hover:text-white transition-colors">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link to="/open-data" className="hover:text-white transition-colors">
                  Open Data
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Platform Capabilities */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Platform Capabilities
            </h4>
            <ul className="space-y-2 text-slate-300">
              <li>
                <Link to="/capabilities/clearinghouse" className="hover:text-white transition-colors">
                  Clearinghouse & Portal
                </Link>
              </li>
              <li>
                <Link to="/capabilities/geoai" className="hover:text-white transition-colors">
                  GeoAI & Intelligence
                </Link>
              </li>
              <li>
                <Link to="/capabilities/digital-twin" className="hover:text-white transition-colors">
                  Digital Twin & 3D
                </Link>
              </li>
              <li>
                <Link to="/capabilities/open-data" className="hover:text-white transition-colors">
                  Open Data & Engagement
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Developers */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Developers
            </h4>
            <ul className="space-y-2 text-slate-300">
              <li>
                <Link to="/developers/apis" className="hover:text-white transition-colors">
                  API Catalogue
                </Link>
              </li>
              <li>
                <Link to="/developers" className="hover:text-white transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="/developers" className="hover:text-white transition-colors">
                  SDKs & Tools
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: About */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              About
            </h4>
            <ul className="space-y-2 text-slate-300">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About AD-SDI
                </Link>
              </li>
              <li>
                <Link to="/governance" className="hover:text-white transition-colors">
                  Governance
                </Link>
              </li>
              <li>
                <Link to="/governance" className="hover:text-white transition-colors">
                  Standards & Policies
                </Link>
              </li>
              <li>
                <Link to="/updates" className="hover:text-white transition-colors">
                  News & Events
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Follow Us & Language */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Follow us
            </h4>
            <div className="flex items-center gap-2.5 text-slate-300">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 rounded-lg bg-[#13315C] hover:bg-[#1F5FAD] hover:text-white flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinLogo size={16} weight="fill" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 rounded-lg bg-[#13315C] hover:bg-[#1F5FAD] hover:text-white flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <TwitterLogo size={16} weight="fill" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 rounded-lg bg-[#13315C] hover:bg-[#1F5FAD] hover:text-white flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <InstagramLogo size={16} weight="fill" />
              </a>
            </div>

            <div className="pt-2 text-[11px] text-slate-400">
              <span className="hover:text-white cursor-pointer transition-colors">العربية</span>
              <span className="mx-1.5">•</span>
              <span className="text-white font-bold">English</span>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Compliance Strip */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            &copy; 2026 Department of Government Enablement (DGE) | 100% UAE Sovereign Infrastructure & ISO 19115 Aligned
          </div>

          <div className="flex items-center gap-4 text-slate-400 flex-wrap">
            <Link to="/about" className="hover:text-slate-200 transition-colors">
              Accessibility
            </Link>
            <Link to="/about" className="hover:text-slate-200 transition-colors">
              Privacy
            </Link>
            <Link to="/about" className="hover:text-slate-200 transition-colors">
              Terms
            </Link>
            <Link to="/about" className="hover:text-slate-200 transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}

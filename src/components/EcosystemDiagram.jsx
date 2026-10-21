import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Database,
  Brain,
  ArrowsClockwise,
  GraduationCap,
  Cube,
  GlobeHemisphereEast,
  ShieldCheck,
  CheckCircle,
  ArrowRight
} from '@phosphor-icons/react';

export default function EcosystemDiagram() {
  const [activeModule, setActiveModule] = useState(null);

  const modules = [
    {
      id: 'clearinghouse',
      code: 'Module A',
      title: 'Clearinghouse & Portal',
      color: '#1F5FAD',
      icon: Database,
      link: '/capabilities/clearinghouse',
      role: 'Discovery & Quality Gateway',
      detail: 'Catalogues 2,480 authoritative datasets through a 6-point automated Quality Gateway.',
      metric: '2,480 Datasets'
    },
    {
      id: 'geoai',
      code: 'Module B',
      title: 'GeoAI & Intelligence',
      color: '#7B4FD6',
      icon: Brain,
      link: '/capabilities/geoai',
      role: 'Automated Change Detection',
      detail: 'Transforms orthoimagery into automated boundary shifts and feature extraction (0.91 F1 score).',
      metric: 'F1 0.91 Accuracy'
    },
    {
      id: 'marketplace',
      code: 'Module C',
      title: 'Marketplace & Sharing',
      color: '#0E9F8E',
      icon: ArrowsClockwise,
      link: '/capabilities/marketplace',
      role: 'Non-Commercial Exchange',
      detail: 'Enables bilateral electronic Data Sharing Agreements (DSAs) with 0 AED sovereign cost.',
      metric: '0 AED Exchange'
    },
    {
      id: 'capacity-building',
      code: 'Module D',
      title: 'Capacity Building',
      color: '#E07B24',
      icon: GraduationCap,
      link: '/capabilities/capacity-building',
      role: 'Workforce GeoMaturity',
      detail: 'Elevates cross-agency spatial competencies across 8 structured training tracks.',
      metric: '2.9 / 5 GeoMaturity'
    },
    {
      id: 'digital-twin',
      code: 'Module E',
      title: 'Digital Twin & 3D',
      color: '#2BA6DE',
      icon: Cube,
      link: '/capabilities/digital-twin',
      role: 'Multidimensional Simulation',
      detail: 'Harmonises 3D building envelopes, subsurface utilities, and 4D urban growth scenarios.',
      metric: 'LOD1–3 Envelopes'
    },
    {
      id: 'open-data',
      code: 'Module F',
      title: 'Open Data & Innovation',
      color: '#5DAA3A',
      icon: GlobeHemisphereEast,
      link: '/capabilities/open-data',
      role: 'Civic Accessibility & APIs',
      detail: 'Powers public innovation with 640 vetted open datasets and modern OGC API standards.',
      metric: '640 Open Datasets'
    }
  ];

  return (
    <div className="ecosystem-editorial-container">
      {/* Outer Government Entity Ribbon */}
      <div className="ecosystem-header-strip">
        <span className="strip-title">Sovereign Data Custodians & Consumers</span>
        <div className="strip-entities">
          <span>DGE (Lead)</span>
          <span>•</span>
          <span>DMT (Cadastre & Infrastructure)</span>
          <span>•</span>
          <span>EAD (Environment)</span>
          <span>•</span>
          <span>SCAD (Demographics)</span>
          <span>•</span>
          <span>DoH / ADEK (Social)</span>
          <span>•</span>
          <span>DoE (Utilities)</span>
        </div>
      </div>

      {/* SVG Canvas for Desktop Connectors */}
      <div className="ecosystem-visual-stage">
        {/* Central Sovereign Core Hub */}
        <div className="ecosystem-central-core">
          <div className="core-inner-glow"></div>
          <div className="core-symbol-wrap">
            <ShieldCheck size={36} weight="fill" color="#FFC20E" />
          </div>
          <h3 className="core-title">Sovereign Spatial Data Core</h3>
          <span className="core-sub">Abu Dhabi Government Fabric</span>
          <div className="core-specs">
            <span>OGC / ISO 19115</span>
            <span>•</span>
            <span>UAE Data Residency</span>
          </div>
        </div>

        {/* 6 Peripheral Capability Nodes */}
        <div className="ecosystem-nodes-grid">
          {modules.map((mod) => {
            const Icon = mod.icon;
            const isHovered = activeModule === mod.id;
            return (
              <div
                key={mod.id}
                className={`ecosystem-node-card ${isHovered ? 'is-active' : ''}`}
                style={{ '--node-accent': mod.color }}
                onMouseEnter={() => setActiveModule(mod.id)}
                onMouseLeave={() => setActiveModule(null)}
              >
                <div className="node-top-bar">
                  <div className="node-icon-bubble" style={{ backgroundColor: mod.color }}>
                    <Icon size={20} weight="bold" color="#FFFFFF" />
                  </div>
                  <span className="node-code-badge">{mod.code}</span>
                </div>

                <div className="node-body">
                  <h4 className="node-title">{mod.title}</h4>
                  <span className="node-role-tag">{mod.role}</span>
                  <p className="node-desc">{mod.detail}</p>
                </div>

                <div className="node-footer">
                  <span className="node-metric">{mod.metric}</span>
                  <Link to={mod.link} className="node-link" aria-label={`Learn more about ${mod.title}`}>
                    <span>Explore</span>
                    <ArrowRight size={14} weight="bold" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Status Bar */}
      <div className="ecosystem-statusbar">
        <div className="status-indicator">
          <span className="status-pulse-dot"></span>
          <span>Unified Cross-Module Interoperability · REST / WFS / WMS / OGC API Features</span>
        </div>
        <div className="status-governance">
          <CheckCircle size={14} weight="fill" color="var(--success)" />
          <span>Role-Based Custodianship & Traceability</span>
        </div>
      </div>
    </div>
  );
}

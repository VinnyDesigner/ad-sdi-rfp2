import React from 'react';
import { Link } from 'react-router-dom';
import {
  Stack,
  Graph,
  Storefront,
  GraduationCap,
  Cube,
  Leaf,
  ArrowRight,
  ArrowsLeftRight
} from '@phosphor-icons/react';

const capabilityModules = [
  {
    id: 'clearinghouse',
    title: 'Clearinghouse & Portal',
    desc: 'Discover authoritative spatial data with rich metadata and trusted sources.',
    icon: Stack,
    image: '/assets/card_clearinghouse_aerial.jpg',
    alt: 'Aerial view of Abu Dhabi city skyline around waterfront bay',
    link: '/capabilities/clearinghouse'
  },
  {
    id: 'geoai',
    title: 'GeoAI & Spatial Intelligence',
    desc: 'Turn location data into insight with AI-powered analysis.',
    icon: Graph,
    isSplitComparison: true,
    imageBefore: '/assets/geoai_before.jpg',
    imageAfter: '/assets/geoai_after.jpg',
    alt: 'GeoAI satellite change detection before and after comparison',
    link: '/capabilities/geoai'
  },
  {
    id: 'marketplace',
    title: 'Marketplace & Data Sharing',
    desc: 'Access and share curated datasets, services and applications.',
    icon: Storefront,
    image: '/assets/clearinghouse_cartography.jpg',
    alt: '3D stacked cartographic spatial data layers',
    link: '/capabilities/marketplace'
  },
  {
    id: 'capacity-building',
    title: 'Capacity Building & GeoMaturity',
    desc: 'Develop skills and grow geospatial capability across teams.',
    icon: GraduationCap,
    image: '/assets/capacity_building_gis.jpg',
    alt: 'Abu Dhabi spatial analytics executive center',
    link: '/capabilities/capacity-building'
  },
  {
    id: 'digital-twin',
    title: 'Digital Twin & 3D Visualisation',
    desc: 'Understand places, assets and infrastructure in 3D.',
    icon: Cube,
    image: '/assets/digital_twin_waterfront.jpg',
    alt: '3D digital twin waterfront models and bridge',
    link: '/capabilities/digital-twin'
  },
  {
    id: 'open-data',
    title: 'Open Data & Public Engagement',
    desc: 'Make trusted spatial data easier to access and reuse.',
    icon: Leaf,
    image: '/assets/card_mangroves_aerial.jpg',
    alt: 'Aerial view of Abu Dhabi Eastern Mangroves and waterways',
    link: '/capabilities/open-data'
  }
];

export default function CoreCapabilityModules() {
  return (
    <div className="core-capabilities-section">
      {/* Section Header */}
      <div className="capabilities-header-row">
        <div className="capabilities-header-info">
          <div className="capabilities-eyebrow-group">
            <span className="capabilities-eyebrow-text">EXPLORE THE PLATFORM</span>
            <span className="capabilities-eyebrow-line" aria-hidden="true" />
          </div>
          <h2 className="capabilities-section-heading">Six Core Capability Modules</h2>
          <p className="capabilities-section-subhead">
            A connected set of capabilities to discover, analyse, govern and share Abu Dhabi's spatial data.
          </p>
        </div>

        <div className="capabilities-header-cta-wrap">
          <Link to="/capabilities" className="capabilities-explore-all-link">
            <span>Explore all capabilities</span>
            <span className="circle-arrow-button" aria-hidden="true">
              <ArrowRight size={18} weight="bold" />
            </span>
          </Link>
        </div>
      </div>

      {/* 2x3 Cards Grid */}
      <div className="capabilities-cards-grid">
        {capabilityModules.map((mod) => {
          const IconComp = mod.icon;
          return (
            <Link
              key={mod.id}
              to={mod.link}
              className="capability-tile-card"
              aria-label={`Explore ${mod.title}`}
            >
              {/* Left Column: Image or Split Comparison */}
              <div className="tile-image-container">
                {mod.isSplitComparison ? (
                  <div className="tile-split-wrapper">
                    <div className="split-half-img split-left">
                      <img src={mod.imageBefore} alt="" aria-hidden="true" />
                    </div>
                    <div className="split-half-img split-right">
                      <img src={mod.imageAfter} alt="" aria-hidden="true" />
                    </div>
                    <div className="split-center-pill" aria-hidden="true">
                      <ArrowsLeftRight size={12} weight="bold" />
                    </div>
                  </div>
                ) : (
                  <img
                    src={mod.image}
                    alt={mod.alt}
                    className="tile-static-img"
                    loading="lazy"
                  />
                )}
              </div>

              {/* Right Column: Icon, Title, Description, Link */}
              <div className="tile-content-container">
                <div>
                  <div className="tile-icon-square">
                    <IconComp size={18} weight="fill" />
                  </div>
                  <h3 className="tile-title">{mod.title}</h3>
                  <p className="tile-desc">{mod.desc}</p>
                </div>

                <div className="tile-action-row">
                  <span className="tile-action-label">Explore capability</span>
                  <ArrowRight size={14} weight="bold" className="tile-arrow-icon" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

// Expected Business Value & Strategic Impact Themes
// Sourced from Department of Government Enablement (DGE) Design Brief

export const valueThemes = [
  {
    id: 'theme-1',
    title: 'Easier Discovery & Cross-Government Reuse',
    icon: 'MagnifyingGlass',
    metricValue: '2,480',
    metricUnit: 'Datasets',
    metricSubtitle: 'Federated across 64 entities',
    intendedImprovement: 'Eliminate isolated departmental silos by establishing an Emirate-wide single source of truth for all foundational and thematic geospatial assets.',
    contributingCapabilities: ['Clearinghouse & Portal (Module A)', 'Open Data Hub (Module F)'],
    stakeholderExample: 'An infrastructure planner at DMT can discover and connect to EAD mangrove conservation boundaries in minutes rather than initiating multi-week official memorandum exchanges.',
    measurementMetric: 'Reduction in average data acquisition cycle time from weeks to minutes, accompanied by a quantifiable increase in cross-departmental API service calls.',
    keyOutcomes: [
      'Elimination of duplicate surveying and aerial capture contracts across municipal entities',
      'Instant verification of dataset custodian, coordinate systems, and update cadence',
      'Accelerated project kick-offs for inter-agency master planning initiatives'
    ]
  },
  {
    id: 'theme-2',
    title: 'Transparent Visibility into Quality & Currency',
    icon: 'ShieldCheck',
    metricValue: '96%',
    metricUnit: 'Gateway Pass Rate',
    metricSubtitle: 'Automated 6-point audit',
    intendedImprovement: 'Provide unambiguous, automated validation metrics regarding the spatial accuracy, topological correctness, and freshness of published datasets.',
    contributingCapabilities: ['Automated Quality Gateway', 'Clearinghouse Metadata Profiles'],
    stakeholderExample: 'A municipal engineer planning an emergency evacuation corridor can immediately verify that road network geometry was validated with zero topological slivers and is on schedule.',
    measurementMetric: 'Percentage of published layers meeting ISO 19157 data quality benchmarks (96% current) and compliance with defined update SLAs (94% currency).',
    keyOutcomes: [
      'High confidence in spatial decisions without manual attribute verification',
      'Automated flagging of stale or unverified spatial layers',
      'Standardized topological rules enforced across all 64 contributing entities'
    ]
  },
  {
    id: 'theme-3',
    title: 'Consistent Governance & Secure Publishing',
    icon: 'LockKey',
    metricValue: '100%',
    metricUnit: 'Classified & Sovereign',
    metricSubtitle: 'UAE Cloud data residency',
    intendedImprovement: 'Establish a unified data classification framework that guarantees appropriate data protection while maximizing legitimate inter-agency sharing.',
    contributingCapabilities: ['Governance Framework', 'Marketplace Entitlements (Module C)'],
    stakeholderExample: 'A sensitive subterranean utility dataset is shared with civil defense teams via formal DSA-2027-014 under strict role-based restrictions, while sanitized surface outlines are made available for broader municipal planning.',
    measurementMetric: 'Auditability of all dataset access approvals, 100% MFA compliance on privileged accounts, and strict adherence to UAE data classification and sovereignty guidelines.',
    keyOutcomes: [
      'Clear separation between sensitivity classification (Open/Shared/Restricted/Confidential) and authorized audience groups',
      'Formal electronic custodian sign-off before any layer enters general circulation',
      'Complete audit trail of dataset requests, approvals, and API consumption'
    ]
  },
  {
    id: 'theme-4',
    title: 'Democratized Spatial Intelligence & GeoAI',
    icon: 'Brain',
    metricValue: '0.91',
    metricUnit: 'Model F1-Score',
    metricSubtitle: 'Multi-epoch change detection',
    intendedImprovement: 'Transform raw imagery and spatial layers into proactive operational alerts through computer vision and automated change detection.',
    contributingCapabilities: ['GeoAI & Spatial Intelligence (Module B)'],
    stakeholderExample: 'Municipal enforcement officers receive automated notifications of unauthorized structural expansions detected across suburban sectors between quarterly satellite flyovers in 4 minutes.',
    measurementMetric: 'Detection cycle reduction for physical changes and percentage of AI-generated alerts verified by human reviewers.',
    keyOutcomes: [
      'Proactive monitoring of urban growth, construction sites, and environmental reserves',
      'Natural-language querying capabilities enabling non-technical executives to explore spatial patterns with transparent reasoning',
      'Responsible AI architecture ensuring mandatory human verification before enforcement actions'
    ]
  },
  {
    id: 'theme-5',
    title: 'Predictive 3D Simulation & Scenario Planning',
    icon: 'Cube',
    metricValue: '4D',
    metricUnit: '2020–2035 Horizon',
    metricSubtitle: 'Live IoT sensor telemetry',
    intendedImprovement: 'Provide an integrated 3D virtual environment combining building forms, terrain, subsurface utilities, and live IoT sensor feeds.',
    contributingCapabilities: ['Digital Twin & 3D Visualisation (Module E)'],
    stakeholderExample: 'Urban planners simulate shadow corridors, microclimate wind dispersion, and storm surge inundation for proposed waterfront developments before ground is broken.',
    measurementMetric: 'Number of major infrastructure proposals evaluated through 3D scenario modeling prior to capital expenditure authorization.',
    keyOutcomes: [
      'Multi-dimensional context linking surface architecture with subterranean infrastructure',
      'Real-time situational awareness during weather events and municipal operations',
      'Evidence-based evaluation of master plans against sustainability and climate targets'
    ]
  },
  {
    id: 'theme-6',
    title: 'Elevated Institutional GeoMaturity',
    icon: 'GraduationCap',
    metricValue: '+0.6',
    metricUnit: 'Maturity Gain (2.3 → 2.9)',
    metricSubtitle: '1,842 learners across 64 entities',
    intendedImprovement: 'Build sustainable internal geospatial capability across all government entities through structured assessments and role-based learning academies.',
    contributingCapabilities: ['Capacity Building & GeoMaturity (Module D)'],
    stakeholderExample: 'A department transitions from producing static paper PDF maps to managing automated spatial API feeds after its staff complete the certified Spatial Data Stewardship pathway.',
    measurementMetric: 'Aggregate progression in GeoMaturity scores across participating entities over annual assessment cycles (from 2.3 baseline to 2.9 current).',
    keyOutcomes: [
      'Standardized geospatial competencies across analysts, stewards, and leadership',
      'Reduced reliance on external consultants for routine spatial data integration',
      'Establishment of an enduring community of practice across Abu Dhabi government'
    ]
  }
];

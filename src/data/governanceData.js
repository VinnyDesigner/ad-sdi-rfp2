// Governance, Security & Quality Framework for AD-SDI
// Sourced from Department of Government Enablement (DGE) Design Brief

export const classificationTiers = [
  {
    tier: 'Open',
    color: '#5DAA3A',
    percentage: '26%',
    badge: 'Public Domain',
    definition: 'Non-sensitive geospatial information approved for unrestricted public distribution, research, and civic innovation.',
    examples: ['Administrative boundaries', 'Public parks & beaches', 'Bus stops & cycling routes', 'Tourism attractions'],
    accessMechanism: 'Direct self-service download via Open Data Portal (no login required) and open OGC web endpoints.',
    requiresApproval: false
  },
  {
    tier: 'Shared – Government',
    color: '#1F5FAD',
    percentage: '54%',
    badge: 'Government Entities',
    definition: 'Operational and planning spatial data designated for shared use across accredited Abu Dhabi government entities.',
    examples: ['Cadastral land parcels', 'Zoning plans', 'Environmental monitoring zones', 'Demographic census units'],
    accessMechanism: 'Federated government single sign-on (SSO / Active Directory) with verified role-based access.',
    requiresApproval: true
  },
  {
    tier: 'Restricted',
    color: '#E07B24',
    percentage: '17%',
    badge: 'Approved Needs Only',
    definition: 'Geospatial datasets with specific operational, commercial, or infrastructural sensitivities requiring verified need-to-know.',
    examples: ['Detailed subterranean utilities', 'Critical transport corridors', 'LOD3 building meshes', 'High-density LiDAR'],
    accessMechanism: 'Formal electronic custodian approval via Marketplace with bilateral Data Sharing Agreement (DSA) and purpose logging.',
    requiresApproval: true
  },
  {
    tier: 'Confidential',
    color: '#D64545',
    percentage: '3%',
    badge: 'Strictly Controlled',
    definition: 'Highly sensitive strategic, security, or emergency management spatial layers with stringent access restrictions.',
    examples: ['Critical infrastructure perimeters', 'Emergency response command locations', 'Secure tactical corridors'],
    accessMechanism: 'Multi-party executive sign-off, encrypted storage, hardware security tokens, and comprehensive immutable audit logging.',
    requiresApproval: true
  }
];

export const audienceDefinitions = [
  {
    audience: 'Internal',
    color: '#0B2545',
    scope: 'Authorised Abu Dhabi government entities, departments, and public authorities.',
    description: 'Internal government operations, policy formulation, inter-agency planning, and administrative analytics.',
    rights: 'Discover, stream, query, and overlay authoritative spatial layers across agency systems.'
  },
  {
    audience: 'Marketplace',
    color: '#0E9F8E',
    scope: 'Accredited contractors, engineering consultants, academic partners, and commercial entities under contract.',
    description: 'Project-specific delivery under formal bilateral Data Sharing Agreements (DSAs) and explicit SLA covenants.',
    rights: 'Restricted access governed by agreed project duration, consumption quotas, and nondisclosure terms (strictly non-commercial).'
  },
  {
    audience: 'Open',
    color: '#5DAA3A',
    scope: 'Civic developers, university researchers, citizens, startups, and international public.',
    description: 'Public domain transparency, civic tech innovation, consumer application development, and scholarly research.',
    rights: 'Unrestricted viewing, self-service download in multiple open formats, and open API access.'
  }
];

export const qualityGatewayCheckpoints = [
  {
    code: 'QG-01',
    checkpoint: 'Schema & File Syntax',
    description: 'Validates file encodings, attribute dictionary compliance, and structural integrity against standard GML/GeoJSON schemas.',
    standard: 'Abu Dhabi Spatial Data Dictionary'
  },
  {
    code: 'QG-02',
    checkpoint: 'Geometry Validity',
    description: 'Detects and flags self-intersecting lines, non-closed polygon rings, unclosed boundaries, and degenerate zero-area features.',
    standard: 'OGC Simple Feature Specification'
  },
  {
    code: 'QG-03',
    checkpoint: 'Topological Consistency',
    description: 'Audits multi-feature relationships: enforces zero unapproved overlaps, sliver polygons, or unconnected road dangles.',
    standard: 'ISO 19157 Topological Completeness'
  },
  {
    code: 'QG-04',
    checkpoint: 'Attribute Domains & Rules',
    description: 'Audits presence of all mandatory fields, permissible domain enumerations, valid coordinate bounds, and flags illegal nulls.',
    standard: 'Emirate Spatial Attribute Profiles'
  },
  {
    code: 'QG-05',
    checkpoint: 'Spatial Reference (CRS)',
    description: 'Verifies native projection to UAE National Grid (EPSG:3997) or WGS 84 / UTM 40N with quantified geographic extents.',
    standard: 'National Geodetic Datum (EPSG:3997)'
  },
  {
    code: 'QG-06',
    checkpoint: 'Metadata Completeness',
    description: 'Verifies 100% completion of mandatory ISO 19115 metadata: custodial entity, data steward, lineage, epoch, and update frequency.',
    standard: 'ISO 19115-1:2014 / ISO 19139'
  }
];

export const securityAndResidency = [
  {
    title: 'UAE Sovereign Cloud Hosting',
    detail: 'All platform infrastructure, database clusters, spatial tile caches, and AI model weights reside exclusively in Tier III+ sovereign UAE data centers.',
    status: 'Verified UAE Hosting'
  },
  {
    title: 'Zero Third-Party Model Leakage',
    detail: 'GeoAI processing and conversational spatial assistants operate strictly against self-contained models without transmitting spatial coordinates to external public APIs.',
    status: 'Air-Gapped Inference'
  },
  {
    title: 'Immutable Audit Logging',
    detail: 'Every layer query, download, schema change, and approval action produces a tamper-proof timestamped audit entry for regulatory compliance.',
    status: '100% Audited Actions'
  },
  {
    title: 'Multi-Factor Authentication (MFA)',
    detail: '100% enforcement of MFA across all privileged administrative accounts, data stewards, and accredited partner profiles.',
    status: '100% MFA Enforced'
  },
  {
    title: 'Bilateral Data Sharing Agreements (DSAs)',
    detail: 'Legal-grade electronic DSA management (e.g. DSA-2027-014) binding consumers to explicit usage scopes, quotas, and expiry terms.',
    status: 'Formal DSA Governance'
  },
  {
    title: 'Independent Penetration Testing',
    detail: 'Continuous vulnerability scanning with formal third-party penetration testing completed and passed in accordance with national cyber standards.',
    status: 'Pen-Test Passed (Jul 2027)'
  }
];

export const platformSlaMetrics = [
  { metric: '99.95%', label: 'Platform Availability SLA', description: 'Continuous uptime across core clearinghouse and OGC web services' },
  { metric: '94%', label: 'Data Currency On Schedule', description: 'Percentage of fundamental datasets updated within committed refresh windows' },
  { metric: '96%', label: 'Quality Gateway Pass Rate', description: 'Datasets meeting zero-defect criteria upon initial staging submission' },
  { metric: '97%', label: 'Incident SLA Compliance', description: 'Technical support and data curation tickets resolved within agreed service tiers' }
];

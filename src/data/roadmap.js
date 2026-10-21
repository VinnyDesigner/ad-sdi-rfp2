// Proposed Implementation Roadmap for AD-SDI Programme (2026 – 2029)
// Sourced from Department of Government Enablement (DGE) Design Brief (S11 Command Centre)

export const programmeMeta = {
  title: 'AD-SDI Implementation Programme 2026–2029',
  sponsor: 'Department of Government Enablement (DGE)',
  timeframe: 'August 2026 – June 2029',
  baselineDate: 'Updated 14 September 2027, 09:30 GST',
  status: 'On Track',
  todayMarker: 'Sep 2027',
  criticalPath: 'A02 (Clearinghouse Core) → C02 (Marketplace Entitlements) → Phase 3 Multi-Agency Rollout → M4',
  governanceRhythm: [
    { body: 'Steering Committee', cadence: 'Monthly', focus: 'Strategic milestone approvals & policy direction' },
    { body: 'Programme Management Office (PMO)', cadence: 'Weekly', focus: 'Schedule tracking, sprint velocity & risk mitigation' },
    { body: 'Entity Working Groups', cadence: 'Bi-weekly', focus: 'Data dictionary harmonization & steward alignment' },
    { body: 'Design Authority', cadence: 'Fortnightly', focus: 'Architecture conformance & security reviews' }
  ]
};

export const roadmapPhases = [
  {
    phase: 'Phase 1',
    code: 'P1',
    title: 'Foundation, Governance & Core Discovery',
    period: 'Aug 2026 – Mar 2027',
    gate: 'Gate M1',
    gateTitle: 'Discovery Baseline Accepted',
    gateStatus: 'Completed',
    leadColor: '#1F5FAD',
    objective: 'Establish the core data architecture, data governance framework, and launch the central Clearinghouse catalogue.',
    deliverables: [
      { id: 'A01', name: 'ISO 19115 Metadata Schema Standardization', lane: 'Clearinghouse', status: 'Done' },
      { id: 'G01', name: 'Abu Dhabi Spatial Data Dictionary v1.0', lane: 'Programme', status: 'Done' },
      { id: 'A02', name: 'Automated 6-Point Quality Gateway Deployment', lane: 'Clearinghouse', status: 'Done' },
      { id: 'D01', name: 'Initial GeoMaturity Diagnostic across 64 Entities', lane: 'Capacity Building', status: 'Done' }
    ],
    decisionCriteria: 'Verification of baseline metadata compliance across founding entities (DMT, EAD, SCAD) prior to multi-agency onboarding.'
  },
  {
    phase: 'Phase 2',
    code: 'P2',
    title: 'Core Platforms & Spatial Intelligence Pilot',
    period: 'Apr 2027 – Dec 2027',
    gate: 'Gate M2',
    gateTitle: 'Core Platforms Deployed & Evaluated',
    gateStatus: 'Current Gate (Dec 2027)',
    leadColor: '#7B4FD6',
    objective: 'Deploy machine learning compute clusters, operationalize GeoAI change detection, and launch the non-commercial Marketplace pilot.',
    deliverables: [
      { id: 'B01', name: 'Multi-Epoch Satellite Imagery Pipeline', lane: 'GeoAI', status: 'Done' },
      { id: 'B02', name: 'Building Change Detection Model (MR-B-007)', lane: 'GeoAI', status: 'In Review' },
      { id: 'C01', name: 'Marketplace Non-Commercial Exchange Pilot', lane: 'Marketplace', status: 'In Progress' },
      { id: 'S01', name: 'Security Penetration Testing & MFA Enforcement', lane: 'Programme', status: 'Done' }
    ],
    decisionCriteria: 'Independent computer vision benchmark (>88% precision) and formal security clearance prior to live enforcement work orders.'
  },
  {
    phase: 'Phase 3',
    code: 'P3',
    title: 'Marketplace & Multi-Agency Rollout',
    period: 'Jan 2028 – Sep 2028',
    gate: 'Gate M3',
    gateTitle: 'Multi-Agency Exchange Operational',
    gateStatus: 'Upcoming',
    leadColor: '#0E9F8E',
    objective: 'Expand cross-government product sharing, operationalize bilateral Data Sharing Agreements (DSAs), and launch the public Open Data Hub.',
    deliverables: [
      { id: 'C02', name: 'Automated Bilateral DSA Approval Workflows', lane: 'Marketplace', status: 'Planned' },
      { id: 'F01', name: 'Public Open Data Portal & Self-Service Downloads', lane: 'Open Data', status: 'Planned' },
      { id: 'F02', name: 'Developer APIs & GeoHack 2028 Civic Challenge', lane: 'Open Data', status: 'Planned' },
      { id: 'D02', name: 'Role-Based Learning Pathways Rollout (8 Tracks)', lane: 'Capacity Building', status: 'Planned' }
    ],
    decisionCriteria: 'Adoption of sharing agreements by at least 30 core government entities and zero PII leakage verification in public tier.'
  },
  {
    phase: 'Phase 4',
    code: 'P4',
    title: 'Digital Twin, Civic Hub & Emirate-Wide Optimization',
    period: 'Oct 2028 – Jun 2029',
    gate: 'Gate M4',
    gateTitle: 'Full Operational Handover & Sustained Operations',
    gateStatus: 'Upcoming',
    leadColor: '#2BA6DE',
    objective: 'Deliver the 3D/4D Digital Twin sandbox with live IoT feeds, complete second-wave GeoMaturity uplift, and transition to sustained operations.',
    deliverables: [
      { id: 'E01', name: '3D Semantic Building Models (LOD2/LOD3)', lane: 'Digital Twin', status: 'Planned' },
      { id: 'E02', name: 'Live IoT Sensor Streaming & Subsurface Visualization', lane: 'Digital Twin', status: 'Planned' },
      { id: 'E03', name: '4D Temporal Simulation Sandbox (2020–2035)', lane: 'Digital Twin', status: 'Planned' },
      { id: 'D03', name: 'Second-Wave GeoMaturity Re-Assessment (Target > 3.5/5)', lane: 'Capacity Building', status: 'Planned' }
    ],
    decisionCriteria: 'Formal acceptance across all 148 functional requirements, institutional competency targets met, and full DGE governance transition.'
  }
];

export const workstreamLanes = [
  { id: 'A', name: 'Module A · Clearinghouse & Portal', color: '#1F5FAD', lead: 'DGE Data Management' },
  { id: 'B', name: 'Module B · GeoAI & Intelligence', color: '#7B4FD6', lead: 'AD-SDI GeoAI Unit' },
  { id: 'C', name: 'Module C · Geospatial Marketplace', color: '#0E9F8E', lead: 'Commercial & Legal Working Group' },
  { id: 'D', name: 'Module D · Capacity Building', color: '#E07B24', lead: 'Geospatial Center of Excellence' },
  { id: 'E', name: 'Module E · Digital Twin 3D/4D', color: '#2BA6DE', lead: 'Smart Cities & Simulation Team' },
  { id: 'F', name: 'Module F · Open Data & Public Hub', color: '#5DAA3A', lead: 'Public Engagement & GovTech' },
  { id: 'P', name: 'Programme · PMO, Security & Architecture', color: '#7A9CC6', lead: 'DGE Programme Leadership' }
];

export const topRisks = [
  {
    id: 'R02',
    risk: 'Contract start later than baseline target',
    likelihood: 'Medium',
    impact: 'High',
    owner: 'PMO',
    mitigation: 'Pre-provision cloud foundation in sovereign UAE tenancy; utilize modular staging pipelines to compress sprint setup.'
  },
  {
    id: 'R03',
    risk: 'Entity data delays or schema quality gaps',
    likelihood: 'High',
    impact: 'Medium',
    owner: 'Data Stewards',
    mitigation: 'Automated Quality Gateway scoring gives entities instant error diagnostics; embed technical stewards at anchor entities.'
  },
  {
    id: 'R05',
    risk: 'Marketplace bilateral agreement approval bottlenecks',
    likelihood: 'Medium',
    impact: 'Medium',
    owner: 'Governance',
    mitigation: 'Standardize electronic Data Sharing Agreement (DSA) templates approved by DGE legal beforehand.'
  },
  {
    id: 'R06',
    risk: 'Security review and compliance lead times',
    likelihood: 'Low',
    impact: 'High',
    owner: 'Security Team',
    mitigation: 'Implement continuous security gates per release; maintain active penetration testing cadence (Jul 2027 passed).'
  },
  {
    id: 'R08',
    risk: 'Digital Twin source geometry and sensor data gaps',
    likelihood: 'Medium',
    impact: 'Medium',
    owner: 'Digital Twin Lead',
    mitigation: 'Focus Phase 2 on waterfront pilot district before expanding emirate-wide; harmonize LOD levels progressively.'
  }
];

export const roadmapAssumptions = [
  {
    title: 'Consultative Proposal Framework',
    detail: 'Timeline phases (2026–2029) represent a strategic implementation framework designed for stakeholder evaluation with DGE and do not constitute binding contractual commitments.'
  },
  {
    title: 'Anchor Custodian Pre-Seeding',
    detail: 'Core capabilities are deployed first with primary anchor custodians (DMT, EAD, SCAD) to validate quality gateways before onboarding the remaining government entities.'
  },
  {
    title: '100% UAE Data Residency',
    detail: 'All infrastructure hosting, spatial tile caches, database clusters, compute nodes, and AI model weights reside within authorized sovereign UAE cloud facilities.'
  },
  {
    title: 'Strictly Non-Commercial Data Exchange',
    detail: 'Marketplace capabilities operate on an entitlement, SLA, and inter-agency cooperation model with zero commercial pricing or currency transactions.'
  }
];

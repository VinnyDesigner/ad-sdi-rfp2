// End-to-end Geospatial Workflows for AD-SDI
export const workflows = [
  {
    id: 'workflow-a',
    code: 'Workflow A',
    title: 'Discover and Reuse Spatial Data',
    subtitle: 'From cross-government search to direct application consumption',
    primaryCapability: 'Clearinghouse & Portal',
    capabilityColor: '#1F5FAD',
    userNeed: 'An urban planning analyst at a government entity needs authoritative mangrove conservation boundaries and coastal bathymetry to evaluate a new transportation corridor.',
    outcome: 'The analyst locates the certified dataset, reviews its ISO 19115 quality report, confirms usage rights, and connects the OGC WFS endpoint directly into their GIS desktop software within minutes.',
    stages: [
      {
        step: 1,
        title: 'Search & Geographic Filter',
        description: 'The user enters keywords or draws a spatial bounding box over the Abu Dhabi coastal zone to filter available layers.',
        module: 'Clearinghouse',
        badge: 'Discovery'
      },
      {
        step: 2,
        title: 'Inspect Metadata & Provenance',
        description: 'Examines custodian entity (EAD), publication date, coordinate reference system, and lineage documentation.',
        module: 'Clearinghouse',
        badge: 'ISO 19115'
      },
      {
        step: 3,
        title: 'Assess Quality & Currency',
        description: 'Inspects the automated Quality Gateway audit score (98.4% geometry validity, zero overlapping polygons).',
        module: 'Quality Gateway',
        badge: 'Assurance'
      },
      {
        step: 4,
        title: 'Verify Access Classification',
        description: 'Confirms that the dataset is classified as "Shared — Government Entities" and that the user’s department is pre-authorized.',
        module: 'Governance',
        badge: 'Entitlement'
      },
      {
        step: 5,
        title: 'Direct API Integration',
        description: 'Copies the secure OGC WFS URL and token to stream live, authoritative vector features into municipal planning software.',
        module: 'APIs & Services',
        badge: 'Integration'
      }
    ]
  },
  {
    id: 'workflow-b',
    code: 'Workflow B',
    title: 'Publish and Govern Spatial Data',
    subtitle: 'Ensuring rigorous quality control before Emirate-wide dissemination',
    primaryCapability: 'Clearinghouse & Governance',
    capabilityColor: '#0B2545',
    userNeed: 'A data custodian at the Department of Municipalities and Transport (DMT) needs to publish an updated district zoning layer to all government stakeholders.',
    outcome: 'The dataset undergoes automated topological validation, receives appropriate data classification, gains electronic custodian sign-off, and becomes discoverable on the central clearinghouse.',
    stages: [
      {
        step: 1,
        title: 'Dataset Submission & Schema Mapping',
        description: 'Custodian uploads vector layer package and maps attributes against Abu Dhabi standard spatial data dictionary.',
        module: 'Publishing Engine',
        badge: 'Ingestion'
      },
      {
        step: 2,
        title: 'Automated Quality Gateway Audit',
        description: 'The engine tests for topological integrity, sliver polygons, coordinate accuracy, and completeness of mandatory fields.',
        module: 'Quality Gateway',
        badge: 'Automated QA'
      },
      {
        step: 3,
        title: 'Classification & Audience Tagging',
        description: 'Assigns sensitivity tier (Open, Shared, Restricted, Confidential) and defines authorized user roles.',
        module: 'Governance',
        badge: 'Security'
      },
      {
        step: 4,
        title: 'Custodian Governance Review',
        description: 'Entity Data Steward receives validation score summary, reviews metadata completeness, and provides formal electronic approval.',
        module: 'Stewardship',
        badge: 'Approval'
      },
      {
        step: 5,
        title: 'Catalogue Indexing & Service Publication',
        description: 'Automated publication creates cached tile layers, vector feature services, and updates the spatial search index.',
        module: 'Clearinghouse',
        badge: 'Live Publication'
      }
    ]
  },
  {
    id: 'workflow-c',
    code: 'Workflow C',
    title: 'Perform GeoAI Spatial Analysis',
    subtitle: 'Responsible AI-assisted change detection with mandatory human review',
    primaryCapability: 'GeoAI & Spatial Intelligence',
    capabilityColor: '#7B4FD6',
    userNeed: 'Municipal inspectors require rapid detection of unapproved structural additions or new construction sites across suburban sectors between satellite flyovers.',
    outcome: 'The GeoAI engine highlights 14 potential change candidates with confidence ratings; an analyst confirms 11 valid alerts, creating verified field inspection work orders.',
    stages: [
      {
        step: 1,
        title: 'Select Imagery & Temporal Baseline',
        description: 'User defines the geographic sector and selects two optical imagery baselines (e.g., Q1 2026 vs Q3 2026).',
        module: 'GeoAI Studio',
        badge: 'Input Selection'
      },
      {
        step: 2,
        title: 'Configure Detection Model',
        description: 'Selects the building footprint change detection model tuned for desert and urban residential environments.',
        module: 'Model Pipeline',
        badge: 'Configuration'
      },
      {
        step: 3,
        title: 'Automated Inference Execution',
        description: 'Neural network processes orthophoto tiles, generating bounding boxes and polygon deltas with confidence percentages.',
        module: 'Compute Engine',
        badge: 'Inference'
      },
      {
        step: 4,
        title: 'Confidence Evaluation & Triage',
        description: 'System filters out candidates below 80% confidence and highlights high-probability changes for review.',
        module: 'Scoring Engine',
        badge: 'Triaging'
      },
      {
        step: 5,
        title: 'Human-in-the-Loop Verification',
        description: 'Spatial analyst compares side-by-side imagery, approves verified changes, discards false positives, and routes to enforcement teams.',
        module: 'Verification Queue',
        badge: 'Human Review'
      }
    ]
  },
  {
    id: 'workflow-d',
    code: 'Workflow D',
    title: 'Discover and Access Specialized Products',
    subtitle: 'Transparent entitlement management without commercial pricing',
    primaryCapability: 'Marketplace',
    capabilityColor: '#0E9F8E',
    userNeed: 'A civil defense emergency planning team needs high-resolution 3D LiDAR point clouds and subterranean utility models from infrastructure providers.',
    outcome: 'The team explores verified products, reviews terms of service and SLAs, submits an entitlement request with justification, and receives secure API access tokens upon steward approval.',
    stages: [
      {
        step: 1,
        title: 'Browse Curated Product Portfolio',
        description: 'Team navigates non-commercial marketplace catalogue to review specialized terrain, bathymetric, and LiDAR packages.',
        module: 'Marketplace',
        badge: 'Exploration'
      },
      {
        step: 2,
        title: 'Review Terms of Use & SLA Metrics',
        description: 'Inspects update frequency (monthly refreshes), coordinate tolerances, and permissible derivative use conditions.',
        module: 'Governance',
        badge: 'SLA Review'
      },
      {
        step: 3,
        title: 'Submit Entitlement Request',
        description: 'Specifies intended project scope, emergency justification, anticipated consumption rate, and technical contact details.',
        module: 'Access Console',
        badge: 'Request Filing'
      },
      {
        step: 4,
        title: 'Multi-Party Governance Review',
        description: 'Data provider steward reviews justification against security protocols and issues electronic clearance.',
        module: 'Entitlements',
        badge: 'Authorization'
      },
      {
        step: 5,
        title: 'Secure Credential Provisioning',
        description: 'Access tokens and SDK connection snippets are provisioned with usage telemetry tracking to ensure compliance.',
        module: 'API Gateway',
        badge: 'Provisioning'
      }
    ]
  }
];

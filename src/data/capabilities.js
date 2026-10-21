// Six Connected Platform Capabilities of AD-SDI (Modules A – F)
// Sourced from Department of Government Enablement (DGE) Design Brief

export const capabilities = [
  {
    id: 'clearinghouse',
    code: 'Module A',
    title: 'Clearinghouse & Portal',
    color: '#1F5FAD',
    lightColor: 'rgba(31, 95, 173, 0.1)',
    icon: 'SquaresFour',
    route: '/capabilities/clearinghouse',
    shortDesc: 'A centralised discovery engine and authoritative metadata catalogue connecting Abu Dhabi government entities to trusted geospatial assets.',
    metrics: {
      primary: '2,480',
      primaryLabel: 'Authoritative Datasets',
      secondary: '1,150',
      secondaryLabel: 'OGC Web Services',
      speed: 'p95 < 320ms',
      speedLabel: 'Service Latency'
    },
    highlights: [
      'ISO 19115 / 19139 compliant metadata profiling with clear custodian and steward attribution',
      'Automated 6-point Quality Gateway (Schema, Geometry, Topology, Attributes, CRS, Metadata)',
      'High-performance OGC endpoints (OGC API Features, WMS, WFS, WMTS) and RESTful APIs'
    ],
    fullDesc: 'The Clearinghouse & Portal serves as the sovereign spatial clearinghouse for Abu Dhabi. It federates authoritative layers across entities including DMT, EAD, SCAD, DoH, and ADEK into a single searchable index. Every dataset features custodial lineage, automated quality certification, and unambiguous classification tagging.',
    capabilitiesList: [
      {
        title: 'Centralised Geospatial Index',
        desc: 'Federates spatial layers across all 64 government entities into an ultra-fast searchable index with geographic bounding filters.'
      },
      {
        title: 'Rigorous Metadata Profiling',
        desc: 'Enforces complete ISO 19115 metadata capture including custodial entity, lineage history, temporal validity, coordinate reference system (UAE National Grid EPSG:3997 / WGS84 UTM 40N), and maintenance frequency.'
      },
      {
        title: 'Automated 6-Point Quality Gateway',
        desc: 'Validates file syntax, geometry closure, topological consistency (no slivers/dangles), attribute domain adherence, CRS projection, and metadata completeness before publication.'
      },
      {
        title: 'Enterprise OGC & REST Services',
        desc: 'Publishes secure, cache-accelerated WMS, WFS, WMTS, and OGC API Features endpoints for seamless integration into GIS desktops, CAD tools, and web dashboards.'
      }
    ],
    technicalSpecs: [
      { label: 'Metadata Standard', value: 'ISO 19115-1:2014 / ISO 19139' },
      { label: 'Quality Assessment', value: 'ISO 19157 Spatial Quality Benchmarks' },
      { label: 'Supported CRS', value: 'UAE National Grid (EPSG:3997) & WGS 84 / UTM 40N' },
      { label: 'Service Formats', value: 'OGC API Features, WMS 1.3.0, WFS 2.0.0, WMTS 1.0.0, GeoJSON' },
      { label: 'Latency Benchmark', value: 'p95 response < 320 ms on cached vector tiles' }
    ],
    useCases: [
      {
        entity: 'Department of Municipalities and Transport (DMT)',
        scenario: 'Cadastral & Land Parcel Harmonisation',
        benefit: 'Enables rapid cross-checking of 412,380 land parcels with municipal zoning boundaries and protected rights-of-way.'
      },
      {
        entity: 'Environment Agency – Abu Dhabi (EAD)',
        scenario: 'Protected Mangrove & Marine Reserves',
        benefit: 'Publishes multi-epoch coastal mangrove extents and marine protected areas for instantaneous validation by master planners.'
      },
      {
        entity: 'Statistics Centre – Abu Dhabi (SCAD)',
        scenario: 'Demographic Census Block Integration',
        benefit: 'Harmonises population grids and socio-economic census units with authoritative municipal district polygons.'
      }
    ]
  },
  {
    id: 'geoai',
    code: 'Module B',
    title: 'GeoAI & Spatial Intelligence',
    color: '#7B4FD6',
    lightColor: 'rgba(123, 79, 214, 0.1)',
    icon: 'Brain',
    route: '/capabilities/geoai',
    shortDesc: 'Automated satellite and aerial imagery change detection, building footprint extraction, and conversational spatial AI with human-in-the-loop governance.',
    metrics: {
      primary: '0.91',
      primaryLabel: 'Model F1-Score',
      secondary: '14,200',
      secondaryLabel: 'Labelled Training Samples',
      speed: '4 min 12 s',
      speedLabel: 'Multi-Epoch Inference'
    },
    highlights: [
      'Multi-epoch change detection identifying new construction, demolition, and structural extensions',
      'Governed Model Registry with transparent Model Cards (MR-B-007) and drift monitoring',
      'Natural-language GeoAI Assistant with step-by-step reasoning transparency and access filters'
    ],
    fullDesc: 'GeoAI transforms high-resolution multi-temporal satellite and aerial imagery into actionable intelligence. By executing trained computer vision models against optical orthophotos, it highlights unapproved construction and environmental transitions, routing high-probability candidates to human inspectors with complete lineage.',
    capabilitiesList: [
      {
        title: 'Multi-Epoch Change Detection',
        desc: 'Compares imagery captures over multiple time horizons (e.g. Q1 vs Q3) to identify physical construction, demolition, and land-use alterations with quantified confidence.'
      },
      {
        title: 'Building & Feature Extraction',
        desc: 'Extracts roof footprints, road centrelines, solar arrays, and vegetation canopy using deep neural networks tuned to UAE arid and coastal topography.'
      },
      {
        title: 'Responsible AI & Model Cards',
        desc: 'Every production model is catalogued in a formal registry with training sample history (14,200 samples), precision/recall metrics (0.93 / 0.89), and drift indicators.'
      },
      {
        title: 'Conversational GeoAI Assistant',
        desc: 'Enables decision-makers to submit natural-language spatial queries (e.g. "Count schools within 500m of high-traffic roads in Al Ain") with explicit reasoning steps.'
      }
    ],
    technicalSpecs: [
      { label: 'Model Registry ID', value: 'MR-B-007 (Building Change Detection v3.2)' },
      { label: 'Evaluation Metrics', value: 'Precision: 0.93 | Recall: 0.89 | F1: 0.91' },
      { label: 'Image Resolutions', value: '0.3m – 0.5m aerial orthophoto & optical satellite' },
      { label: 'Guardrail Model', value: 'Mandatory human-in-the-loop review before master record sync' },
      { label: 'Query Interface', value: 'Natural Language Spatial Pipeline with classification tags' }
    ],
    useCases: [
      {
        entity: 'Municipal Inspection & Enforcement',
        scenario: 'Unpermitted Building Addition Alerting',
        benefit: 'Detects unauthorized earthworks and structural expansions between quarterly flyovers, generating GPS-tagged inspection work orders.'
      },
      {
        entity: 'Environmental Stewardship (EAD)',
        scenario: 'Mangrove Canopy & Coastal Change Tracking',
        benefit: 'Measures changes in mangrove biomass density and vegetative health across protected coastal islands.'
      },
      {
        entity: 'Infrastructure Development',
        scenario: 'Autonomous Highway Corridor Tracing',
        benefit: 'Automatically drafts new highway segments and service roads from newly captured aerial orthophotos for municipal surveyor review.'
      }
    ]
  },
  {
    id: 'marketplace',
    code: 'Module C',
    title: 'Marketplace',
    color: '#0E9F8E',
    lightColor: 'rgba(14, 159, 142, 0.1)',
    icon: 'Storefront',
    route: '/capabilities/marketplace',
    shortDesc: 'A structured, non-commercial exchange for government entities and approved partners to request, share, and govern high-value geospatial data products under clear SLAs.',
    metrics: {
      primary: '0 AED',
      primaryLabel: 'Strictly Non-Commercial',
      secondary: '128',
      secondaryLabel: 'Active Subscribers',
      speed: 'Tier 1',
      speedLabel: 'Agreed SLA Guarantee'
    },
    highlights: [
      'Strictly non-commercial data exchange with zero pricing, AED fees, or currency transactions',
      'Standardized access models: Government Included, Commercial Subscription, Project Quota',
      'Electronic Data Sharing Agreements (DSAs), quota management, and SLA telemetry'
    ],
    fullDesc: 'The Marketplace establishes a structured framework for sharing specialized, high-value geospatial products—including 3D building meshes, LiDAR point clouds, and high-frequency sensor feeds. It manages bilateral Data Sharing Agreements (DSAs), usage quotas, and custodial approvals without commercial transactions.',
    capabilitiesList: [
      {
        title: 'Curated Product Portfolio',
        desc: 'Showcases verified data packages from government entities and approved partners with complete documentation, sample extracts, update frequencies, and steward contacts.'
      },
      {
        title: 'Bilateral Data Sharing Agreements (DSAs)',
        desc: 'Automates request filing with explicit project justifications, compliance checkboxes, and electronic multi-party sign-offs.'
      },
      {
        title: 'Entitlement & Quota Management',
        desc: 'Provisions masked API credentials (e.g. adsdi_••••••3f9a) with rate limits, monthly usage quotas, and automated telemetry tracking.'
      },
      {
        title: 'Provider & Consumer Workspaces',
        desc: 'Provides data custodians with dedicated dashboards to review pending requests, monitor subscriber volume, and audit downstream usage.'
      }
    ],
    technicalSpecs: [
      { label: 'Exchange Model', value: 'Zero-fee, entitlement & SLA-based government exchange' },
      { label: 'Access Models', value: 'Government Included | Commercial Subscription | Project Quota' },
      { label: 'Governance Binding', value: 'Electronic Data Sharing Agreement (DSA-2027-xxx)' },
      { label: 'Credentialing', value: 'Rotatable API keys with rate-limiting & quota telemetry' },
      { label: 'SLA Tiers', value: 'Tier 1 (99.9% uptime, p95 < 250ms) to Tier 3 standard' }
    ],
    useCases: [
      {
        entity: 'Civil Defense & Emergency Planning',
        scenario: 'High-Density 3D Mesh & Elevation Access',
        benefit: 'Grants emergency response coordinators guaranteed low-latency streaming of 3D terrain and building models for flood modeling.'
      },
      {
        entity: 'Transportation Infrastructure',
        scenario: 'Subterranean Utility Corridor Coordination',
        benefit: 'Enables transit engineers to review underground pipeline and power meshes under strict safety and clearance covenants.'
      },
      {
        entity: 'Urban Innovation Partners',
        scenario: 'Rooftop Solar Potential Indexing',
        benefit: 'Shares curated building envelopes with certified solar engineering partners under time-bound project licenses.'
      }
    ]
  },
  {
    id: 'capacity-building',
    code: 'Module D',
    title: 'Capacity Building & GeoMaturity',
    color: '#E07B24',
    lightColor: 'rgba(224, 123, 36, 0.1)',
    icon: 'GraduationCap',
    route: '/capabilities/capacity-building',
    shortDesc: 'An institutional enablement framework featuring the 5-pillar GeoMaturity assessment model, 8 role-based curriculum pathways, and continuous competency tracking.',
    metrics: {
      primary: '2.9 / 5',
      primaryLabel: 'Average GeoMaturity (Baseline 2.3)',
      secondary: '1,842',
      secondaryLabel: 'Government Learners Trained',
      speed: '8',
      speedLabel: 'Tailored Learning Pathways'
    },
    highlights: [
      '5-Axis GeoMaturity model: Governance, Data, Technology, People, and Use',
      '8 Specialized learning pathways from executive leadership to GeoAI engineering',
      'Objective benchmarking across all 64 Abu Dhabi government entities'
    ],
    fullDesc: 'Infrastructure succeeds only when human capability keeps pace. The Capacity Building module operationalizes the GeoMaturity Assessment Model across all Abu Dhabi entities, diagnosing baseline competencies and delivering role-based training academies to cultivate self-sustaining spatial intelligence across government.',
    capabilitiesList: [
      {
        title: '5-Axis GeoMaturity Assessment',
        desc: 'Diagnoses entity readiness across Governance, Data, Technology, People, and Use, charting measurable progress from initial ad-hoc use to optimized maturity.'
      },
      {
        title: '8 Role-Based Learning Pathways',
        desc: 'Tailored curricula for Executives, Data Stewards, GIS Specialists, Platform Admins, Developers, GeoAI Scientists, Twin/Marketplace Users, and Train-the-Trainer.'
      },
      {
        title: 'Abu Dhabi Center of Excellence',
        desc: 'Central knowledge repository with standard operating procedures, ISO templates, cartographic style guides, and recorded technical masterclasses.'
      },
      {
        title: 'Sectoral Capability Benchmarking',
        desc: 'Monitors competency progress across municipal, environmental, healthcare, education, security, and economic clusters over annual cycles.'
      }
    ],
    technicalSpecs: [
      { label: 'Assessment Framework', value: '5 Dimensions (Governance, Data, Technology, People, Use)' },
      { label: 'Rating Scale', value: 'Level 1 (Ad-hoc) to Level 5 (Optimized / Predictive)' },
      { label: 'Target Scope', value: 'All 64 contributing Abu Dhabi entities assessed' },
      { label: 'Curriculum Depth', value: '8 Professional tracks, 40+ modular courses' },
      { label: 'Certification', value: 'Formal DGE Geospatial Competency Credentials' }
    ],
    useCases: [
      {
        entity: 'Entity Data Stewards',
        scenario: 'Spatial Data Stewardship Certification',
        benefit: 'Trains departmental custodians in metadata profiling, Quality Gateway remediation, and data classification procedures.'
      },
      {
        entity: 'Executive Leadership',
        scenario: 'Spatial Decision Enablement for Directors',
        benefit: 'Educates directors on using real-time spatial dashboards and twin simulations for evidence-based policy formulation.'
      },
      {
        entity: 'GIS Specialists & Analysts',
        scenario: 'GeoAI & Machine Learning Upskilling',
        benefit: 'Upskills traditional mapmakers into spatial data analysts capable of interpreting computer vision inference results.'
      }
    ]
  },
  {
    id: 'digital-twin',
    code: 'Module E',
    title: 'Digital Twin & 3D Visualisation',
    color: '#2BA6DE',
    lightColor: 'rgba(43, 166, 222, 0.1)',
    icon: 'Cube',
    route: '/capabilities/digital-twin',
    shortDesc: 'High-fidelity 3D urban representations integrating semantic building models, terrain, subsurface utilities, and live IoT sensor feeds with 4D temporal simulation.',
    metrics: {
      primary: '4D',
      primaryLabel: 'Temporal Simulation (2020–2035)',
      secondary: '48',
      secondaryLabel: 'Connected IoT Telemetry Feeds',
      speed: 'LOD1–LOD3',
      speedLabel: 'Semantic 3D Envelopes'
    },
    highlights: [
      'LOD1 to LOD3 semantic building geometry harmonized with terrain and underground utility corridors',
      'Live IoT telemetry streaming (air quality PM2.5, traffic flow vectors, district energy kW)',
      '4D simulation sandbox for solar shadow analysis, flood inundation, and scenario comparisons'
    ],
    fullDesc: 'The Digital Twin capability establishes an interactive 3D virtual replica of Abu Dhabi’s physical landscape. Unifying above-ground architecture with subterranean infrastructure, real-time IoT environmental sensors, and a 4D temporal slider, it enables planners to stress-test future urban policies before ground is broken.',
    capabilitiesList: [
      {
        title: 'Semantic 3D Urban Envelopes',
        desc: 'Renders photorealistic and schematic 3D building models (LOD1 to LOD3) linked to municipal building IDs, height data, and BIM IFC models.'
      },
      {
        title: 'Subsurface Utility Visualisation',
        desc: 'Visualizes water, power, telecommunications, and drainage corridors through an interactive semi-transparent ground cut.'
      },
      {
        title: 'Real-Time IoT & Environmental Streaming',
        desc: 'Streams live data from municipal sensor networks—including air quality (PM2.5), traffic congestion gradients, and building energy consumption.'
      },
      {
        title: '4D Scenario Comparison Sandbox',
        desc: 'Interactive timeline slider spanning 2020 to 2035 with side-by-side comparison ("A: Approved Plan" vs "B: Proposed Amendment") for shadow and climate impact.'
      }
    ],
    technicalSpecs: [
      { label: '3D Standards', value: 'OGC 3D Tiles, CityGML 3.0, I3S, IFC (BIM)' },
      { label: 'Temporal Range', value: '2020 historical to 2035 predictive horizon (Now: Sep 2027)' },
      { label: 'Sensor Protocols', value: 'MQTT, WebSocket, Sensor Observation Service (SOS)' },
      { label: 'Simulation Capabilities', value: 'Shadow impact, wind corridors, coastal surge, evacuation' },
      { label: 'Target District', value: 'Abu Dhabi Island Waterfront Pilot & Al Maryah Financial Hub' }
    ],
    useCases: [
      {
        entity: 'Urban Planning Authorities',
        scenario: 'High-Rise Solar Shadow & Microclimate Simulation',
        benefit: 'Evaluates the shadow impact of proposed waterfront developments on surrounding pedestrian promenades throughout seasonal cycles.'
      },
      {
        entity: 'Civil Defense & Crisis Operations',
        scenario: 'Emergency 3D Ingress & Multi-Story Evacuation',
        benefit: 'Provides commanders with detailed 3D building floorplates and subterranean ingress paths during emergency events.'
      },
      {
        entity: 'Sustainability & Smart Cities',
        scenario: 'District Cooling & Energy Optimization',
        benefit: 'Analyzes live power draw against building envelope solar radiation to optimize cooling distribution in master planned communities.'
      }
    ]
  },
  {
    id: 'open-data',
    code: 'Module F',
    title: 'Open Data & Public Hub',
    color: '#5DAA3A',
    lightColor: 'rgba(93, 170, 58, 0.1)',
    icon: 'GlobeHemisphereEast',
    route: '/capabilities/open-data',
    shortDesc: 'A transparent, public-facing portal democratizing approved non-sensitive spatial datasets for civic research, innovation, and GovTech entrepreneurship.',
    metrics: {
      primary: '640',
      primaryLabel: 'Open Public Datasets',
      secondary: '48k',
      secondaryLabel: 'Monthly Downloads',
      speed: '1.2M',
      speedLabel: 'Monthly API Requests'
    },
    highlights: [
      'Instant self-service downloads in open formats (GeoJSON, CSV, Shapefile, KML) with zero login friction',
      'Open Government Data Licensing protecting public reuse while maintaining authoritative source integrity',
      'Developer APIs, documentation, and civic innovation challenges like GeoHack 2028'
    ],
    fullDesc: 'The Open Data capability unlocks public-tier spatial data assets for citizens, academic researchers, startups, and private enterprise. By lowering the barrier to geospatial discovery, it fosters civic innovation, powers consumer navigation tools, and supports Abu Dhabi’s knowledge-based economic vision.',
    capabilitiesList: [
      {
        title: 'Zero-Friction Public Discovery',
        desc: 'Keyword, thematic, and boundary-based search across 640 certified public domain datasets without mandatory authentication.'
      },
      {
        title: 'Multi-Format Open Downloads',
        desc: 'Instant export into open, vendor-neutral formats including GeoJSON, CSV with coordinates, Shapefile, and KML.'
      },
      {
        title: 'Open Developer APIs & Documentation',
        desc: 'Interactive API sandbox, client libraries, and live query builders enabling software developers to embed Abu Dhabi spatial layers directly into mobile apps.'
      },
      {
        title: 'Civic Innovation & GeoHack Hub',
        desc: 'Community engagement platform supporting annual hackathons (GeoHack 2028), university research partnerships, and public data request pipelines.'
      }
    ],
    technicalSpecs: [
      { label: 'Licence Model', value: 'Abu Dhabi Open Data Licence (Permissive reuse)' },
      { label: 'Download Formats', value: 'GeoJSON, CSV, ESRI Shapefile, KML, GeoPackage' },
      { label: 'API Protocols', value: 'REST, OGC API Features, GeoJSON over HTTPS' },
      { label: 'Developer Sandbox', value: 'Interactive Swagger / OpenAPI documentation' },
      { label: 'Data Refresh', value: 'Automated synchronisation with verified Clearinghouse releases' }
    ],
    useCases: [
      {
        entity: 'GovTech Startups & App Developers',
        scenario: 'Consumer Mobility & Navigation Solutions',
        benefit: 'Leverages open bus routes, cycling paths, and public park footprints to build consumer navigation and fitness applications.'
      },
      {
        entity: 'Academic & University Researchers',
        scenario: 'Urban Heat Island & Microclimate Research',
        benefit: 'Downloads historical vegetation cover and municipal district boundaries to publish climate resilience papers.'
      },
      {
        entity: 'Citizens & Community Residents',
        scenario: 'Civic Amenities & Community Service Discovery',
        benefit: 'Allows residents to locate community clinics, recycling drop-offs, and recreational facilities across their local sector.'
      }
    ]
  }
];

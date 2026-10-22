import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext(null);

export const PERSONAS = {
  fatima: {
    id: 'fatima',
    name: 'Fatima A.',
    initials: 'FA',
    entity: 'Department of Municipalities and Transport (DMT)',
    entityShort: 'DMT',
    role: 'Data Steward',
    type: 'Government SSO',
    email: 'fatima.a@dmt.gov.ae',
    avatarColor: '#1F5FAD',
    badge: 'Gov Steward'
  },
  khalid: {
    id: 'khalid',
    name: 'Khalid M.',
    initials: 'KM',
    entity: 'Department of Municipalities and Transport (DMT)',
    entityShort: 'DMT',
    role: 'Entity Custodian & Approver',
    type: 'Government SSO',
    email: 'khalid.m@dmt.gov.ae',
    avatarColor: '#0E9F8E',
    badge: 'Custodian'
  },
  omar: {
    id: 'omar',
    name: 'Omar R.',
    initials: 'OR',
    entity: 'Masdar Urban Spatial Tech',
    entityShort: 'Partner',
    role: 'Approved Commercial Partner',
    type: 'Partner Account',
    email: 'omar.r@masdar.ae',
    avatarColor: '#7B4FD6',
    badge: 'Partner'
  }
};

const INITIAL_SUBMISSIONS = [
  {
    id: 'sub-01',
    title: 'Bus Stops & Routes',
    version: 'v2027.09',
    type: 'Open release',
    module: 'F · Open Data',
    entity: 'Integrated Transport Centre (ITC)',
    entityShort: 'ITC',
    targetAudience: 'Open',
    stage: 'Custodian approval',
    stageIndex: 4,
    qualityResult: 'passed_warnings',
    warningsCount: 2,
    waiting: '2 days',
    legalEligibility: true,
    classification: 'Open Data',
    checks: [
      { name: 'Schema Compliance', passed: true, detail: 'ISO 19115-1:2014 valid' },
      { name: 'Geometry Integrity', passed: true, detail: 'Valid EPSG:3997 coordinates' },
      { name: 'Topology Inspection', passed: false, warning: true, detail: '2 collinear vertex overlaps flagged' },
      { name: 'Attribute Domains', passed: true, detail: '100% enum conformity' },
      { name: 'Spatial Reference', passed: true, detail: 'UAE National Grid verified' },
      { name: 'Metadata Completeness', passed: true, detail: 'Lineage & license tagged' }
    ],
    auditTrail: [
      { time: '14 Sep 2027 09:12', user: 'ITC Lead', action: 'Submitted new version v2027.09' },
      { time: '14 Sep 2027 09:15', user: 'Automated Gateway', action: 'Quality gateway passed with 2 warnings' },
      { time: '14 Sep 2027 10:30', user: 'Legal Authority', action: 'Classified Open with Open Gov License' },
      { time: '14 Sep 2027 11:00', user: 'System', action: 'Assigned to Khalid M. for final approval' }
    ]
  },
  {
    id: 'sub-02',
    title: 'Land Parcels (Cadastre)',
    version: 'v2027.09',
    type: 'Dataset',
    module: 'A · Clearinghouse',
    entity: 'Department of Municipalities and Transport (DMT)',
    entityShort: 'DMT',
    targetAudience: 'Internal + Marketplace',
    stage: 'Published',
    stageIndex: 5,
    qualityResult: 'passed',
    warningsCount: 0,
    waiting: 'Completed',
    legalEligibility: true,
    classification: 'Shared · Government',
    checks: [
      { name: 'Schema Compliance', passed: true, detail: 'ISO 19115 compliant' },
      { name: 'Geometry Integrity', passed: true, detail: '412,380 parcels verified' },
      { name: 'Topology Inspection', passed: true, detail: 'Zero gap/overlap tolerance met' },
      { name: 'Attribute Domains', passed: true, detail: 'Deed IDs cross-verified' },
      { name: 'Spatial Reference', passed: true, detail: 'EPSG:3997 aligned' },
      { name: 'Metadata Completeness', passed: true, detail: 'Complete' }
    ],
    auditTrail: [
      { time: '01 Sep 2027 08:00', user: 'DMT Cadastre Team', action: 'Submitted monthly sync' },
      { time: '01 Sep 2027 08:15', user: 'Quality Gateway', action: 'Automated 6-point check passed' },
      { time: '01 Sep 2027 10:00', user: 'Khalid M.', action: 'Approved for publication' },
      { time: '01 Sep 2027 10:05', user: 'Clearinghouse', action: 'Published live to catalog & OGC services' }
    ]
  },
  {
    id: 'sub-03',
    title: 'Mangrove Habitat Extent 2027',
    version: 'v2027.08',
    type: 'Dataset',
    module: 'F · Open Data',
    entity: 'Environment Agency – Abu Dhabi (EAD)',
    entityShort: 'EAD',
    targetAudience: 'Open',
    stage: 'Quality gateway',
    stageIndex: 2,
    qualityResult: 'passed',
    warningsCount: 0,
    waiting: '3 hours',
    legalEligibility: true,
    classification: 'Open Data',
    checks: [
      { name: 'Schema Compliance', passed: true, detail: 'Verified' },
      { name: 'Geometry Integrity', passed: true, detail: '18,420 polygons' },
      { name: 'Topology Inspection', passed: true, detail: 'Coastline conformity valid' },
      { name: 'Attribute Domains', passed: true, detail: 'Biomass index confirmed' },
      { name: 'Spatial Reference', passed: true, detail: 'EPSG:3997' },
      { name: 'Metadata Completeness', passed: true, detail: 'Lineage complete' }
    ],
    auditTrail: [
      { time: '14 Sep 2027 06:30', user: 'EAD GIS Team', action: 'Uploaded drone survey shapefiles' },
      { time: '14 Sep 2027 06:45', user: 'Gateway Bot', action: 'Initial boundary integrity check passed' }
    ]
  },
  {
    id: 'sub-04',
    title: '3D Building Footprints LOD2',
    version: 'v2027.03',
    type: 'Product',
    module: 'C · Marketplace',
    entity: 'Department of Municipalities and Transport (DMT)',
    entityShort: 'DMT',
    targetAudience: 'Marketplace',
    stage: 'Custodian approval',
    stageIndex: 4,
    qualityResult: 'passed',
    warningsCount: 0,
    waiting: '1 day',
    legalEligibility: true,
    classification: 'Marketplace · Tier 1',
    checks: [
      { name: 'Schema Compliance', passed: true, detail: 'CityGML 3.0 / 3D Tiles' },
      { name: 'Geometry Integrity', passed: true, detail: 'Watertight solid meshes' },
      { name: 'Topology Inspection', passed: true, detail: 'Zero non-manifold faces' },
      { name: 'Attribute Domains', passed: true, detail: 'Heights & use types verified' },
      { name: 'Spatial Reference', passed: true, detail: 'EPSG:3997 (Z: Ellipsoidal)' },
      { name: 'Metadata Completeness', passed: true, detail: 'SLA Tier 1 contract attached' }
    ],
    auditTrail: [
      { time: '12 Sep 2027 14:00', user: 'DMT 3D Division', action: 'Submitted quarterly mesh bundle' },
      { time: '13 Sep 2027 09:00', user: 'Quality Engine', action: '3D mesh validation passed' }
    ]
  },
  {
    id: 'sub-05',
    title: 'Subterranean Potable Water Distribution Mains',
    version: 'v2027.07',
    type: 'Service',
    module: 'A · Clearinghouse',
    entity: 'Abu Dhabi Distribution Company (ADDC)',
    entityShort: 'ADDC',
    targetAudience: 'Internal Only',
    stage: 'Classification & audience',
    stageIndex: 3,
    qualityResult: 'passed',
    warningsCount: 0,
    waiting: '4 days',
    legalEligibility: true,
    classification: 'Restricted · Government Only',
    checks: [
      { name: 'Schema Compliance', passed: true, detail: 'Utility Data Model v2' },
      { name: 'Geometry Integrity', passed: true, detail: '82,140 segments' },
      { name: 'Topology Inspection', passed: true, detail: 'Pressure network graph connected' },
      { name: 'Attribute Domains', passed: true, detail: 'Pipe material code validated' },
      { name: 'Spatial Reference', passed: true, detail: 'EPSG:3997' },
      { name: 'Metadata Completeness', passed: true, detail: 'Security level tagged Restricted' }
    ],
    auditTrail: [
      { time: '10 Sep 2027 11:20', user: 'ADDC Security Officer', action: 'Submitted utility telemetry feed' }
    ]
  }
];

const INITIAL_ENTITLEMENTS = [
  {
    id: 'ent-01',
    product: 'Building Footprints 3D (LOD2)',
    productSlug: 'building-footprints-3d',
    provider: 'Department of Municipalities and Transport (DMT)',
    plan: 'Government Included',
    status: 'Active',
    apiKey: 'adsdi_live_••••••3f9a',
    quotaUsed: 38200,
    quotaTotal: 50000,
    unit: 'API calls',
    renews: '01 Oct 2027',
    dsaNumber: 'DSA-2027-014',
    tier: 'Tier 1 SLA (p95 < 200ms)'
  },
  {
    id: 'ent-02',
    product: 'Land Parcels Real-Time Validation API',
    productSlug: 'land-parcels-api',
    provider: 'Department of Municipalities and Transport (DMT)',
    plan: 'Government Included',
    status: 'Active',
    apiKey: 'adsdi_live_••••••7c21',
    quotaUsed: 145000,
    quotaTotal: 250000,
    unit: 'queries',
    renews: '15 Oct 2027',
    dsaNumber: 'DSA-2027-021',
    tier: 'Tier 1 SLA (p95 < 250ms)'
  },
  {
    id: 'ent-03',
    product: 'Automated Construction Change Detection Feed',
    productSlug: 'change-detection-results',
    provider: 'AD-SDI GeoAI Innovation Lab',
    plan: 'Municipal Subscription',
    status: 'Pending Provider Approval',
    apiKey: 'adsdi_pending_••••••••',
    quotaUsed: 0,
    quotaTotal: 10000,
    unit: 'events',
    renews: 'Pending',
    dsaNumber: 'DSA-2027-038',
    tier: 'Tier 1 SLA'
  }
];

const INITIAL_ACCESS_REQUESTS = [
  {
    id: 'req-01',
    requester: 'Dr. Salem H.',
    entity: 'Environment Agency – Abu Dhabi (EAD)',
    dataset: 'Subterranean Potable Water Distribution Mains',
    classification: 'Restricted',
    purpose: 'Hydrological groundwater recharge interaction analysis with saline aquifers.',
    dsa: 'DSA-2027-042',
    approver: 'ADDC Custodian',
    waiting: '1 day',
    status: 'Pending'
  },
  {
    id: 'req-02',
    requester: 'Sara Al Zaabi',
    entity: 'Statistics Centre – Abu Dhabi (SCAD)',
    dataset: 'Abu Dhabi Official Cadastral Parcels 2026',
    classification: 'Shared · Government',
    purpose: 'Census enumeration zone boundary mapping and population density modeling.',
    dsa: 'DSA-2027-045',
    approver: 'Khalid M. (DMT)',
    waiting: '4 hours',
    status: 'Pending'
  },
  {
    id: 'req-03',
    requester: 'Masdar Urban Spatial Tech',
    entity: 'Approved Partner',
    dataset: 'Building Footprints 3D (LOD2)',
    classification: 'Marketplace · Tier 1',
    purpose: 'Commercial micro-climate and rooftop solar potential modeling.',
    dsa: 'DSA-2027-039',
    approver: 'Khalid M. (DMT)',
    waiting: '2 days',
    status: 'Pending'
  },
  {
    id: 'req-04',
    requester: 'Eng. Ahmed Mansoor',
    entity: 'Abu Dhabi Civil Defence Authority (ADCD)',
    dataset: 'High-Resolution Satellite Orthoimagery 0.3m',
    classification: 'Shared · Government',
    purpose: 'Emergency route navigation and helicopter landing zone pre-clearance.',
    dsa: 'DSA-2027-040',
    approver: 'DGE Authority',
    waiting: '3 days',
    status: 'Approved'
  },
  {
    id: 'req-05',
    requester: 'University Researcher Al Ain',
    entity: 'UAE University (UAEU)',
    dataset: 'Coastal Land Use & Development Limits',
    classification: 'Restricted',
    purpose: 'Doctoral thesis research on mangrove habitat preservation.',
    dsa: 'DSA-2027-041',
    approver: 'EAD Custodian',
    waiting: '5 days',
    status: 'Rejected'
  }
];

const INITIAL_AUDIT_LOG = [
  { id: 'aud-01', time: '14 Sep 2027 10:45:12', user: 'fatima.a@dmt.gov.ae', action: 'API Token Generated', resource: 'OGC API Features: Cadastre', result: 'Allowed' },
  { id: 'aud-02', time: '14 Sep 2027 10:30:05', user: 'guest.partner@tech.ae', action: 'Service Request', resource: 'WFS: Subterranean Water Mains', result: 'Denied' },
  { id: 'aud-03', time: '14 Sep 2027 09:58:22', user: 'khalid.m@dmt.gov.ae', action: 'Approved Publication', resource: 'Dataset: Land Parcels v2027.09', result: 'Allowed' },
  { id: 'aud-04', time: '14 Sep 2027 09:15:40', user: 'gateway.bot@adsdi.ae', action: 'Automated QA Gate Passed', resource: 'Layer: Bus Stops & Routes', result: 'Allowed' },
  { id: 'aud-05', time: '14 Sep 2027 08:30:19', user: 'ead.analyst@ead.gov.ae', action: 'Bulk GeoJSON Export', resource: 'Eastern Mangroves Extent', result: 'Allowed' },
  { id: 'aud-06', time: '14 Sep 2027 07:12:00', user: 'unknown.ip_192.168.1.1', action: 'Unauthorized Token Auth', resource: 'Sovereign Core Endpoint', result: 'Denied' }
];

const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif-01',
    title: 'Quality Gateway Passed',
    message: 'Mangrove Habitat Extent 2027 automated 6-point QA checks passed successfully with 100% score.',
    time: '12 min ago',
    type: 'success',
    read: false,
    link: '/publishing'
  },
  {
    id: 'notif-02',
    title: 'Access Request Pending Review',
    message: 'Sara Al Zaabi (SCAD) requested Government Shared access to Abu Dhabi Official Cadastral Parcels 2026.',
    time: '45 min ago',
    type: 'warning',
    read: false,
    link: '/security-access'
  },
  {
    id: 'notif-03',
    title: 'GeoAI Studio Model Run Complete',
    message: 'Change detection run MR-B-007 finished for Khalifa City (214 changes detected, 0.91 F1 score).',
    time: '2 hours ago',
    type: 'info',
    read: false,
    link: '/geoai-studio'
  },
  {
    id: 'notif-04',
    title: 'Sovereign Hosting Assurance',
    message: 'All 1,150 OGC web services and GeoAI inference nodes verified healthy inside local Abu Dhabi DC.',
    time: 'Yesterday',
    type: 'info',
    read: true,
    link: '/quality-sla'
  }
];

export function AppProvider({ children }) {
  const [currentPersonaKey, setCurrentPersonaKey] = useState('fatima');
  const [submissions, setSubmissions] = useState(INITIAL_SUBMISSIONS);
  const [entitlements, setEntitlements] = useState(INITIAL_ENTITLEMENTS);
  const [accessRequests, setAccessRequests] = useState(INITIAL_ACCESS_REQUESTS);
  const [auditLog, setAuditLog] = useState(INITIAL_AUDIT_LOG);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [toasts, setToasts] = useState([]);
  const [lang, setLang] = useState('en');
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState(false);
  const [isPersonaModalOpen, setIsPersonaModalOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const user = PERSONAS[currentPersonaKey] || PERSONAS.fatima;

  // Language direction update
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  // Toast helper
  const addToast = (title, message = '', type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Switch persona
  const switchPersona = (key) => {
    if (PERSONAS[key]) {
      setCurrentPersonaKey(key);
      addToast(
        'Persona Switched',
        `Active account is now ${PERSONAS[key].name} (${PERSONAS[key].role})`,
        'success'
      );
    }
  };

  // Publishing actions
  const approveSubmission = (id, note = 'Approved for publication by custodian') => {
    setSubmissions((prev) =>
      prev.map((sub) => {
        if (sub.id === id) {
          const newTrail = [
            ...sub.auditTrail,
            { time: 'Just now', user: user.name, action: note }
          ];
          return {
            ...sub,
            stage: 'Published',
            stageIndex: 5,
            auditTrail: newTrail
          };
        }
        return sub;
      })
    );
    addToast('Submission Approved', 'The dataset has been authorized and published to AD-SDI Clearinghouse.', 'success');
  };

  const returnSubmission = (id, comments = 'Returned with comments for custodian clarification') => {
    setSubmissions((prev) =>
      prev.map((sub) => {
        if (sub.id === id) {
          const newTrail = [
            ...sub.auditTrail,
            { time: 'Just now', user: user.name, action: comments }
          ];
          return {
            ...sub,
            stage: 'Quality gateway',
            stageIndex: 2,
            auditTrail: newTrail
          };
        }
        return sub;
      })
    );
    addToast('Submission Returned', 'Returned to provider with revision requirements.', 'warning');
  };

  const rejectSubmission = (id, reason = 'Rejected due to governance criteria non-conformance') => {
    setSubmissions((prev) =>
      prev.map((sub) => {
        if (sub.id === id) {
          const newTrail = [
            ...sub.auditTrail,
            { time: 'Just now', user: user.name, action: reason }
          ];
          return {
            ...sub,
            stage: 'Rejected',
            stageIndex: 0,
            auditTrail: newTrail
          };
        }
        return sub;
      })
    );
    addToast('Submission Rejected', 'Submission has been declined and flagged in the audit register.', 'error');
  };

  // Security Access Request Actions
  const approveAccessRequest = (id) => {
    setAccessRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: 'Approved' } : req))
    );
    const approvedReq = accessRequests.find((r) => r.id === id);
    if (approvedReq) {
      setAuditLog((prev) => [
        {
          id: `aud-${Date.now()}`,
          time: 'Just now',
          user: user.email,
          action: `Approved Access: ${approvedReq.dsa}`,
          resource: approvedReq.dataset,
          result: 'Allowed'
        },
        ...prev
      ]);
    }
    addToast('Access Request Approved', 'Authorization grant generated under sovereign governance protocol.', 'success');
  };

  const rejectAccessRequest = (id) => {
    setAccessRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: 'Rejected' } : req))
    );
    const reqItem = accessRequests.find((r) => r.id === id);
    if (reqItem) {
      setAuditLog((prev) => [
        {
          id: `aud-${Date.now()}`,
          time: 'Just now',
          user: user.email,
          action: `Rejected Access: ${reqItem.dsa}`,
          resource: reqItem.dataset,
          result: 'Denied'
        },
        ...prev
      ]);
    }
    addToast('Access Request Rejected', 'The request has been formally declined.', 'warning');
  };

  // Marketplace access submission
  const submitMarketplaceRequest = (requestData) => {
    const newEntitlement = {
      id: `ent-${Date.now()}`,
      product: requestData.productTitle || 'Data Product',
      productSlug: requestData.productSlug || 'product',
      provider: requestData.provider || 'AD-SDI Custodian',
      plan: requestData.plan || 'Government Included',
      status: 'Pending Provider Approval',
      apiKey: `adsdi_req_${Math.random().toString(36).substring(2, 8)}`,
      quotaUsed: 0,
      quotaTotal: parseInt(requestData.expectedVolume) || 50000,
      unit: 'API calls',
      renews: 'Pending Approval',
      dsaNumber: `DSA-2027-${Math.floor(100 + Math.random() * 900)}`,
      tier: requestData.tier || 'Tier 1 SLA'
    };

    setEntitlements((prev) => [newEntitlement, ...prev]);

    // Also add to audit log
    setAuditLog((prev) => [
      {
        id: `aud-${Date.now()}`,
        time: 'Just now',
        user: user.email,
        action: `Submitted DSA Request: ${newEntitlement.dsaNumber}`,
        resource: newEntitlement.product,
        result: 'Allowed'
      },
      ...prev
    ]);

    addToast(
      'Request Submitted',
      `Your Data Sharing Agreement request ${newEntitlement.dsaNumber} was submitted for custodian approval.`,
      'success'
    );
  };

  // Notification helpers
  const markNotificationRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    addToast('Notifications Cleared', 'All alerts marked as read.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        user,
        currentPersonaKey,
        switchPersona,
        PERSONAS,
        submissions,
        approveSubmission,
        returnSubmission,
        rejectSubmission,
        entitlements,
        submitMarketplaceRequest,
        accessRequests,
        approveAccessRequest,
        rejectAccessRequest,
        auditLog,
        notifications,
        markNotificationRead,
        markAllNotificationsRead,
        toasts,
        addToast,
        removeToast,
        lang,
        setLang,
        toggleLang: () => setLang((prev) => (prev === 'en' ? 'ar' : 'en')),
        isSearchModalOpen,
        setIsSearchModalOpen,
        isNotificationDrawerOpen,
        setIsNotificationDrawerOpen,
        isPersonaModalOpen,
        setIsPersonaModalOpen,
        sidebarCollapsed,
        setSidebarCollapsed,
        toggleSidebar: () => setSidebarCollapsed((prev) => !prev)
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

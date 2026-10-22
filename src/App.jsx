import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';

// Layout Shells
import PublicShell from './layouts/PublicShell';
import WorkspaceShell from './layouts/WorkspaceShell';

// Auth
import Login from './pages/Login';

// Public & Discovery Pages
import Home from './pages/Home';
import Catalogue from './pages/Catalogue';
import DatasetDetail from './pages/DatasetDetail';
import MapsServices from './pages/MapsServices';
import BaseMapsPage from './pages/BaseMapsPage';
import RasterDataPage from './pages/RasterDataPage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetail from './pages/ServiceDetail';
import MarketplacePage from './pages/MarketplacePage';
import MarketplaceDetail from './pages/MarketplaceDetail';
import OpenDataPage from './pages/OpenDataPage';
import OpenDatasetDetail from './pages/OpenDatasetDetail';
import DevelopersPage from './pages/DevelopersPage';
import ApiCataloguePage from './pages/ApiCataloguePage';
import ApiDocPage from './pages/ApiDocPage';
import UpdatesPage from './pages/UpdatesPage';
import UpdateDetail from './pages/UpdateDetail';

// Operational Workspace Pages
import MapViewer from './pages/MapViewer';
import PublishingApprovals from './pages/PublishingApprovals';
import QualitySlaPage from './pages/QualitySlaPage';
import GeoAiStudio from './pages/GeoAiStudio';
import GeoAiAssistant from './pages/GeoAiAssistant';
import MarketplaceRequest from './pages/MarketplaceRequest';
import MarketplaceEntitlements from './pages/MarketplaceEntitlements';
import MarketplaceProvider from './pages/MarketplaceProvider';
import DigitalTwinPage from './pages/DigitalTwinPage';
import CommandCentrePage from './pages/CommandCentrePage';
import GeoMaturityPage from './pages/GeoMaturityPage';
import SecurityAccessPage from './pages/SecurityAccessPage';

// Additional Proposal & Context Pages
import About from './pages/About';
import PlatformOverview from './pages/PlatformOverview';
import Capabilities from './pages/Capabilities';
import Workflows from './pages/Workflows';
import Governance from './pages/Governance';
import Roadmap from './pages/Roadmap';
import ExpectedValue from './pages/ExpectedValue';
import Contact from './pages/Contact';

// Capability Detail Pages
import Clearinghouse from './pages/capabilities/Clearinghouse';
import GeoAI from './pages/capabilities/GeoAI';
import Marketplace from './pages/capabilities/Marketplace';
import CapacityBuilding from './pages/capabilities/CapacityBuilding';
import DigitalTwin from './pages/capabilities/DigitalTwin';
import OpenData from './pages/capabilities/OpenData';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Standalone Authentication Route */}
          <Route path="/login" element={<Login />} />

          {/* 1. Public Discovery Shell */}
          <Route element={<PublicShell />}>
            <Route path="/" element={<Home />} />
            <Route path="/catalogue" element={<Catalogue />} />
            <Route path="/catalogue/:datasetSlug" element={<DatasetDetail />} />
            <Route path="/catalogue/themes/:theme" element={<Catalogue />} />

            <Route path="/maps-services" element={<MapsServices />} />
            <Route path="/base-maps" element={<BaseMapsPage />} />
            <Route path="/raster-data" element={<RasterDataPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:serviceSlug" element={<ServiceDetail />} />

            <Route path="/marketplace" element={<MarketplacePage />} />
            <Route path="/marketplace/:productSlug" element={<MarketplaceDetail />} />

            <Route path="/open-data" element={<OpenDataPage />} />
            <Route path="/open-data/:datasetSlug" element={<OpenDatasetDetail />} />

            <Route path="/developers" element={<DevelopersPage />} />
            <Route path="/developers/apis" element={<ApiCataloguePage />} />
            <Route path="/developers/apis/:apiSlug" element={<ApiDocPage />} />

            <Route path="/updates" element={<UpdatesPage />} />
            <Route path="/updates/:slug" element={<UpdateDetail />} />

            {/* Proposal & Strategic Context */}
            <Route path="/capabilities" element={<Capabilities />} />
            <Route path="/capabilities/clearinghouse" element={<Clearinghouse />} />
            <Route path="/capabilities/geoai" element={<GeoAI />} />
            <Route path="/capabilities/marketplace" element={<Marketplace />} />
            <Route path="/capabilities/capacity-building" element={<CapacityBuilding />} />
            <Route path="/capabilities/digital-twin" element={<DigitalTwin />} />
            <Route path="/capabilities/open-data" element={<OpenData />} />

            <Route path="/about" element={<About />} />
            <Route path="/platform" element={<PlatformOverview />} />
            <Route path="/workflows" element={<Workflows />} />
            <Route path="/governance" element={<Governance />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/value" element={<ExpectedValue />} />
            <Route path="/contact" element={<Contact />} />
          </Route>

          {/* 2. Workspace Application Shell */}
          <Route element={<WorkspaceShell />}>
            <Route path="/workspace" element={<Navigate to="/command-centre" replace />} />
            
            {/* Workspace-scoped Discovery */}
            <Route path="/workspace/catalogue" element={<Catalogue />} />
            <Route path="/workspace/catalogue/:datasetSlug" element={<DatasetDetail />} />
            <Route path="/workspace/marketplace" element={<MarketplacePage />} />
            <Route path="/workspace/marketplace/:productSlug" element={<MarketplaceDetail />} />
            <Route path="/workspace/services" element={<ServicesPage />} />
            <Route path="/workspace/services/:serviceSlug" element={<ServiceDetail />} />
            <Route path="/workspace/governance" element={<Governance />} />

            {/* Operational Workspace Tools & Dashboards */}
            <Route path="/map-viewer" element={<MapViewer />} />
            <Route path="/publishing" element={<PublishingApprovals />} />
            <Route path="/quality-sla" element={<QualitySlaPage />} />
            <Route path="/geoai-studio" element={<GeoAiStudio />} />
            <Route path="/geoai-assistant" element={<GeoAiAssistant />} />

            <Route path="/marketplace/request/:productSlug" element={<MarketplaceRequest />} />
            <Route path="/marketplace/entitlements" element={<MarketplaceEntitlements />} />
            <Route path="/marketplace/provider" element={<MarketplaceProvider />} />

            <Route path="/digital-twin" element={<DigitalTwinPage />} />
            <Route path="/command-centre" element={<CommandCentrePage />} />
            <Route path="/geomaturity" element={<GeoMaturityPage />} />
            <Route path="/security-access" element={<SecurityAccessPage />} />
          </Route>

          {/* Fallback to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

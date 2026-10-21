import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import WebsiteLayout from './layouts/WebsiteLayout';

// Core Proposal Pages
import Home from './pages/Home';
import About from './pages/About';
import PlatformOverview from './pages/PlatformOverview';
import Capabilities from './pages/Capabilities';
import Workflows from './pages/Workflows';
import Governance from './pages/Governance';
import Roadmap from './pages/Roadmap';
import ExpectedValue from './pages/ExpectedValue';
import Contact from './pages/Contact';

// Six Capability Detail Pages
import Clearinghouse from './pages/capabilities/Clearinghouse';
import GeoAI from './pages/capabilities/GeoAI';
import Marketplace from './pages/capabilities/Marketplace';
import CapacityBuilding from './pages/capabilities/CapacityBuilding';
import DigitalTwin from './pages/capabilities/DigitalTwin';
import OpenData from './pages/capabilities/OpenData';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WebsiteLayout />}>
          {/* Main Proposal Pages */}
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="platform" element={<PlatformOverview />} />
          <Route path="capabilities" element={<Capabilities />} />

          {/* Six Platform Capability Routes */}
          <Route path="capabilities/clearinghouse" element={<Clearinghouse />} />
          <Route path="capabilities/geoai" element={<GeoAI />} />
          <Route path="capabilities/marketplace" element={<Marketplace />} />
          <Route path="capabilities/capacity-building" element={<CapacityBuilding />} />
          <Route path="capabilities/digital-twin" element={<DigitalTwin />} />
          <Route path="capabilities/open-data" element={<OpenData />} />

          {/* Strategic Solutions & Roadmap */}
          <Route path="workflows" element={<Workflows />} />
          <Route path="governance" element={<Governance />} />
          <Route path="roadmap" element={<Roadmap />} />
          <Route path="value" element={<ExpectedValue />} />
          <Route path="expected-value" element={<ExpectedValue />} />
          <Route path="contact" element={<Contact />} />

          {/* Fallback to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

import React from 'react';
import HeroSearch from '../components/HeroSearch';
import StatisticsStrip from '../components/StatisticsStrip';
import ExploreThemes from '../components/ExploreThemes';
import CoreCapabilityModules from '../components/CoreCapabilityModules';
import UpdatesAndDigitalTwin from '../components/UpdatesAndDigitalTwin';

export default function Home() {
  return (
    <div className="ad-sdi-homepage bg-[#F5F7FA]">
      {/* 1. HERO AND PRIMARY SEARCH */}
      <HeroSearch />

      {/* 2. PLATFORM STATISTICS STRIP */}
      <StatisticsStrip />

      {/* 3. EXPLORE BY THEME (SPLIT GEOGRAPHIC EXPLORER) */}
      <ExploreThemes />

      {/* 4. SIX CORE CAPABILITY MODULES */}
      <CoreCapabilityModules />

      {/* 5. LATEST UPDATES AND DIGITAL TWIN FEATURE */}
      <UpdatesAndDigitalTwin />
    </div>
  );
}

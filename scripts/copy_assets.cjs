const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\PujithaChitturi\\.gemini\\antigravity-ide\\brain\\a453a3dd-dcc8-46e1-a567-56e468f23dc1';
const destDir = path.resolve('public/assets');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const files = fs.readdirSync(srcDir);
const mappings = [
  { pattern: /^abudhabi_aerial_hero.*\.jpg$/, name: 'hero_abudhabi_aerial.jpg' },
  { pattern: /^digital_twin_waterfront.*\.jpg$/, name: 'digital_twin_waterfront.jpg' },
  { pattern: /^geoai_satellite_before.*\.jpg$/, name: 'geoai_before.jpg' },
  { pattern: /^geoai_satellite_after.*\.jpg$/, name: 'geoai_after.jpg' },
  { pattern: /^clearinghouse_cartography.*\.jpg$/, name: 'clearinghouse_cartography.jpg' },
  { pattern: /^marketplace_geospatial.*\.jpg$/, name: 'marketplace_geospatial.jpg' },
  { pattern: /^capacity_building_gis.*\.jpg$/, name: 'capacity_building_gis.jpg' },
  { pattern: /^opendata_civic.*\.jpg$/, name: 'opendata_civic.jpg' },
  { pattern: /^challenge_geography.*\.jpg$/, name: 'challenge_geography.jpg' },
  { pattern: /^governance_framework.*\.jpg$/, name: 'governance_framework.jpg' }
];

mappings.forEach(m => {
  const match = files.find(f => m.pattern.test(f));
  if (match) {
    fs.copyFileSync(path.join(srcDir, match), path.join(destDir, m.name));
    console.log(`Copied ${match} -> ${m.name}`);
  } else {
    console.warn(`Missing match for ${m.name}`);
  }
});

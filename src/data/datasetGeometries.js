/**
 * Authoritative & Demonstration Geographic Coordinates for AD-SDI Datasets
 * Georeferenced around Abu Dhabi Island, Eastern Mangroves, Khalifa City,
 * Saadiyat, Yas Island, Al Ain, and Al Dhafra.
 * Conforms to EPSG:4326 (WGS 84) for Leaflet rendering.
 */

export const DATASET_GEOMETRIES = {
  // 1. Land Parcels (Cadastre) - DMT
  'land-parcels-cadastre': {
    id: 'land-parcels-cadastre',
    name: 'Land Parcels (Cadastre)',
    type: 'Polygon',
    center: [24.498, 54.390],
    zoom: 13,
    color: '#1F5FAD', // Blue 600
    fillColor: '#1F5FAD',
    fillOpacity: 0.25,
    weight: 2,
    dashArray: null,
    // Real cadastral parcels in Al Maryah Financial District and Khalifa City
    features: [
      {
        name: 'Al Maryah Financial District Commercial Plot B4',
        type: 'Polygon',
        coordinates: [
          [24.4985, 54.3852],
          [24.5042, 54.3888],
          [24.5015, 54.3955],
          [24.4958, 54.3912]
        ]
      },
      {
        name: 'Al Maryah Commercial Plot B5 (Sovereign Trust)',
        type: 'Polygon',
        coordinates: [
          [24.4932, 54.3881],
          [24.4975, 54.3915],
          [24.4950, 54.3978],
          [24.4902, 54.3938]
        ]
      },
      {
        name: 'Khalifa City Sector 14 Cadastral Cluster',
        type: 'Polygon',
        coordinates: [
          [24.4205, 54.5802],
          [24.4285, 54.5825],
          [24.4260, 54.5948],
          [24.4182, 54.5920]
        ]
      },
      {
        name: 'Khalifa City Municipal Community Plot C2',
        type: 'Polygon',
        coordinates: [
          [24.4150, 54.5750],
          [24.4202, 54.5772],
          [24.4178, 54.5875],
          [24.4122, 54.5848]
        ]
      }
    ]
  },

  // 2. Mangrove Habitat Extent 2027 - EAD
  'mangrove-habitat-extent-2027': {
    id: 'mangrove-habitat-extent-2027',
    name: 'Mangrove Habitat Extent 2027',
    type: 'Polygon',
    center: [24.445, 54.440],
    zoom: 12,
    color: '#1E9E6A', // Emerald green
    fillColor: '#1E9E6A',
    fillOpacity: 0.32,
    weight: 2,
    dashArray: null,
    // Real coordinates along Eastern Mangroves National Park & Jubail Mangrove Park
    features: [
      {
        name: 'Eastern Mangroves National Park Core Reserve',
        type: 'Polygon',
        coordinates: [
          [24.4320, 54.4180],
          [24.4485, 54.4305],
          [24.4600, 54.4520],
          [24.4552, 54.4705],
          [24.4400, 54.4550],
          [24.4280, 54.4320]
        ]
      },
      {
        name: 'Jubail Mangrove Forest & Tidal Creeks',
        type: 'Polygon',
        coordinates: [
          [24.5350, 54.4750],
          [24.5502, 54.4905],
          [24.5600, 54.5152],
          [24.5450, 54.5305],
          [24.5302, 54.5050]
        ]
      }
    ]
  },

  // 3. Coastal Protected Areas & Marine Reserves - EAD
  'coastal-protected-areas': {
    id: 'coastal-protected-areas',
    name: 'Coastal Protected Areas & Marine Reserves',
    type: 'Polygon',
    center: [24.555, 54.450],
    zoom: 11,
    color: '#0E9F8E', // Teal
    fillColor: '#0E9F8E',
    fillOpacity: 0.22,
    weight: 2,
    dashArray: null,
    features: [
      {
        name: 'Saadiyat Marine National Park Sanctuary',
        type: 'Polygon',
        coordinates: [
          [24.5400, 54.4100],
          [24.5850, 54.4300],
          [24.5750, 54.5000],
          [24.5300, 54.4700]
        ]
      },
      {
        name: 'Marawah Marine Biosphere Reserve (Eastern Perimeter)',
        type: 'Polygon',
        coordinates: [
          [24.3200, 53.6500],
          [24.4800, 53.7000],
          [24.4200, 53.9500],
          [24.2800, 53.8500]
        ]
      }
    ]
  },

  // 4. Mangrove Planting Sites & Rehabilitation Zones - EAD
  'mangrove-planting-sites': {
    id: 'mangrove-planting-sites',
    name: 'Mangrove Planting Sites & Rehabilitation Zones',
    type: 'Polygon',
    center: [24.545, 54.475],
    zoom: 12,
    color: '#5DAA3A', // Light Green
    fillColor: '#5DAA3A',
    fillOpacity: 0.35,
    weight: 2,
    dashArray: '5, 5',
    features: [
      {
        name: 'Saadiyat North Coastal Planting Grid A1',
        type: 'Polygon',
        coordinates: [
          [24.5450, 54.4350],
          [24.5550, 54.4420],
          [24.5520, 54.4550],
          [24.5400, 54.4480]
        ]
      },
      {
        name: 'Jubail Drone Seeded Restoration Plot D4',
        type: 'Polygon',
        coordinates: [
          [24.5380, 54.4950],
          [24.5480, 54.5050],
          [24.5420, 54.5180],
          [24.5320, 54.5100]
        ]
      }
    ]
  },

  // 5. Shoreline Change & Coastal Erosion (2015–2027) - DMT
  'shoreline-change-2015-2027': {
    id: 'shoreline-change-2015-2027',
    name: 'Shoreline Change & Coastal Erosion (2015–2027)',
    type: 'LineString',
    center: [24.495, 54.365],
    zoom: 12,
    color: '#E07B24', // Amber/Orange
    weight: 3.5,
    features: [
      {
        name: 'Abu Dhabi Corniche & Breakwater Baseline (2015-2027)',
        type: 'LineString',
        coordinates: [
          [24.4700, 54.3180],
          [24.4850, 54.3320],
          [24.4980, 54.3500],
          [24.5050, 54.3720],
          [24.5080, 54.3950],
          [24.5020, 54.4200]
        ]
      },
      {
        name: 'Saadiyat Beach Erosion Monitoring Transect',
        type: 'LineString',
        coordinates: [
          [24.5250, 54.4100],
          [24.5420, 54.4320],
          [24.5550, 54.4600],
          [24.5520, 54.4950]
        ]
      }
    ]
  },

  // 6. Coastal Land Use & Development Setbacks - DMT
  'coastal-land-use': {
    id: 'coastal-land-use',
    name: 'Coastal Land Use & Development Setbacks',
    type: 'Polygon',
    center: [24.445, 54.585],
    zoom: 13,
    color: '#7B4FD6', // Purple
    fillColor: '#7B4FD6',
    fillOpacity: 0.25,
    weight: 2,
    dashArray: null,
    features: [
      {
        name: 'Al Raha Beach 100m Coastal Setback Buffer',
        type: 'Polygon',
        coordinates: [
          [24.4350, 54.5600],
          [24.4450, 54.5750],
          [24.4520, 54.6000],
          [24.4420, 54.6050],
          [24.4320, 54.5800]
        ]
      },
      {
        name: 'Yas South Waterfront Masterplan Constraint Zone',
        type: 'Polygon',
        coordinates: [
          [24.4600, 54.5900],
          [24.4750, 54.6050],
          [24.4700, 54.6200],
          [24.4550, 54.6100]
        ]
      }
    ]
  },

  // 7. Abu Dhabi 3D Building Footprints & Massing LOD2 - DMT
  'building-footprints-3d': {
    id: 'building-footprints-3d',
    name: 'Abu Dhabi 3D Building Footprints & Massing LOD2',
    type: 'Polygon',
    center: [24.496, 54.400],
    zoom: 14,
    color: '#2BA6DE', // Digital Twin Cyan
    fillColor: '#2BA6DE',
    fillOpacity: 0.40,
    weight: 1.5,
    dashArray: null,
    features: [
      {
        name: 'Al Reem Island Tower Cluster (LOD2 Massing)',
        type: 'Polygon',
        coordinates: [
          [24.4920, 54.3980],
          [24.4960, 54.4010],
          [24.4940, 54.4070],
          [24.4900, 54.4040]
        ]
      },
      {
        name: 'Al Reem Commercial Podium B',
        type: 'Polygon',
        coordinates: [
          [24.4970, 54.4020],
          [24.5010, 54.4050],
          [24.4990, 54.4120],
          [24.4950, 54.4090]
        ]
      },
      {
        name: 'Al Maryah Square Sovereign Towers',
        type: 'Polygon',
        coordinates: [
          [24.5000, 54.3860],
          [24.5030, 54.3880],
          [24.5010, 54.3930],
          [24.4980, 54.3910]
        ]
      },
      {
        name: 'Abu Dhabi Global Market (ADGM) Building LOD2',
        type: 'Polygon',
        coordinates: [
          [24.5040, 54.3890],
          [24.5070, 54.3910],
          [24.5050, 54.3960],
          [24.5020, 54.3940]
        ]
      }
    ]
  },

  // 8. Strategic Highway & Arterial Network - ITC
  'strategic-highway-network': {
    id: 'strategic-highway-network',
    name: 'Strategic Highway & Arterial Network',
    type: 'LineString',
    center: [24.470, 54.490],
    zoom: 11,
    color: '#1F5FAD', // Blue 600
    weight: 3.5,
    features: [
      {
        name: 'Sheikh Zayed bin Sultan St (E10 Expressway Corridor)',
        type: 'LineString',
        coordinates: [
          [24.4250, 54.4200],
          [24.4400, 54.4350],
          [24.4550, 54.4600],
          [24.4680, 54.5000],
          [24.4750, 54.5500],
          [24.4820, 54.6000]
        ]
      },
      {
        name: 'Sheikh Khalifa bin Zayed Highway (E12 Saadiyat-Yas Link)',
        type: 'LineString',
        coordinates: [
          [24.5080, 54.3850],
          [24.5150, 54.4050],
          [24.5300, 54.4400],
          [24.5320, 54.4900],
          [24.5250, 54.5500],
          [24.5100, 54.6000]
        ]
      },
      {
        name: 'Abu Dhabi - Al Ain Road (E22 Strategic Arterial)',
        type: 'LineString',
        coordinates: [
          [24.4100, 54.4700],
          [24.3800, 54.5300],
          [24.3500, 54.6000],
          [24.3000, 54.7500]
        ]
      }
    ]
  },

  // 9. High-Resolution Satellite Orthoimagery 0.3m (2026) - DGE
  'satellite-ortho-03m': {
    id: 'satellite-ortho-03m',
    name: 'High-Resolution Satellite Orthoimagery 0.3m (2026)',
    type: 'Polygon',
    center: [24.475, 54.475],
    zoom: 10,
    color: '#7A9CC6', // Steel 400
    fillColor: '#7A9CC6',
    fillOpacity: 0.15,
    weight: 2,
    dashArray: '6, 4',
    features: [
      {
        name: 'Abu Dhabi Metropolitan 0.3m Orthomosaic Footprint (4,850 km²)',
        type: 'Polygon',
        coordinates: [
          [24.3500, 54.2500],
          [24.6000, 54.2500],
          [24.6000, 54.7000],
          [24.3500, 54.7000]
        ]
      }
    ]
  },

  // 10. Subterranean Potable Water Distribution Mains - ADDC
  'water-distribution-mains': {
    id: 'water-distribution-mains',
    name: 'Subterranean Potable Water Distribution Mains',
    type: 'LineString',
    center: [24.450, 54.450],
    zoom: 12,
    color: '#2F80ED', // Info Blue
    weight: 3,
    dashArray: '4, 4',
    features: [
      {
        name: 'Metropolitan Primary Potable Trunk Feed (Taweelah-Downtown)',
        type: 'LineString',
        coordinates: [
          [24.4350, 54.4950],
          [24.4450, 54.4700],
          [24.4600, 54.4400],
          [24.4750, 54.4100],
          [24.4850, 54.3800],
          [24.4880, 54.3550]
        ]
      },
      {
        name: 'Khalifa City Potable Sub-Transmission Trunk',
        type: 'LineString',
        coordinates: [
          [24.4350, 54.4950],
          [24.4200, 54.5300],
          [24.4150, 54.5700],
          [24.4200, 54.6100]
        ]
      }
    ]
  },

  // 11. 100-Meter Statistical Demographic Population Grid - SCAD
  'population-grid-100m': {
    id: 'population-grid-100m',
    name: '100-Meter Statistical Demographic Population Grid',
    type: 'Polygon',
    center: [24.478, 54.355],
    zoom: 13,
    color: '#E8A317', // Warning / Gold
    fillColor: '#E8A317',
    fillOpacity: 0.35,
    weight: 1,
    features: [
      {
        name: 'Al Danah High-Density Resident Sector (Grid Cell 1042)',
        type: 'Polygon',
        coordinates: [
          [24.4750, 54.3500],
          [24.4800, 54.3500],
          [24.4800, 54.3550],
          [24.4750, 54.3550]
        ]
      },
      {
        name: 'Downtown Commercial Employment Sector (Grid Cell 1043)',
        type: 'Polygon',
        coordinates: [
          [24.4800, 54.3500],
          [24.4850, 54.3500],
          [24.4850, 54.3550],
          [24.4800, 54.3550]
        ]
      },
      {
        name: 'Tourist Club District High-Density Grid (Grid Cell 1044)',
        type: 'Polygon',
        coordinates: [
          [24.4750, 54.3550],
          [24.4800, 54.3550],
          [24.4800, 54.3600],
          [24.4750, 54.3600]
        ]
      },
      {
        name: 'Al Zahiyah Mixed-Use Grid (Grid Cell 1045)',
        type: 'Polygon',
        coordinates: [
          [24.4800, 54.3550],
          [24.4850, 54.3550],
          [24.4850, 54.3600],
          [24.4800, 54.3600]
        ]
      }
    ]
  },

  // 12. Emirate Administrative & Municipal Sector Boundaries - DMT
  'municipal-boundaries': {
    id: 'municipal-boundaries',
    name: 'Emirate Administrative & Municipal Sector Boundaries',
    type: 'Polygon',
    center: [24.4539, 54.3773],
    zoom: 9,
    color: '#0B2545', // Navy 900
    fillColor: '#0B2545',
    fillOpacity: 0.10,
    weight: 2.5,
    dashArray: '8, 4',
    features: [
      {
        name: 'Abu Dhabi City Municipality Sector Perimeter',
        type: 'Polygon',
        coordinates: [
          [24.1500, 54.1000],
          [24.6500, 54.1500],
          [24.7000, 54.9000],
          [24.3000, 55.0500],
          [24.1000, 54.6000]
        ]
      },
      {
        name: 'Al Ain Municipality Sovereign Regional Boundary',
        type: 'Polygon',
        coordinates: [
          [23.8000, 55.1000],
          [24.4500, 55.1000],
          [24.5000, 55.9000],
          [24.0000, 55.9500],
          [23.7500, 55.5000]
        ]
      }
    ]
  }
};

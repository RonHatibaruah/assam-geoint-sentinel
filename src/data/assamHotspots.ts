export interface Hotspot {
  id: string;
  name: string;
  district: string;
  circle: string;
  coordinates: [number, number]; // [lat, lng]
  zoomLevel: number;
  threatType: 'Hill Slicing' | 'Wetland Shrinkage' | 'River Erosion' | 'Deforestation' | 'Urban Sprawl';
  severity: 'Critical' | 'High' | 'Moderate';
  description: string;
  baselineYear: string;
  currentYear: string;
  areaDeltaHectares: number;
  dominantTransition: string;
  ndviDelta: number; // e.g. -0.45
  ndbiDelta: number; // e.g. +0.38
  sarBackscatterChangeDB: number; // e.g. +3.2 dB
  confidenceScore: number; // 0-100%
  baselineStats: { [className: string]: number }; // percentage
  currentStats: { [className: string]: number }; // percentage
  cadastralSurveyPlots: string[];
}

export const ASSAM_HOTSPOTS: Hotspot[] = [
  {
    id: 'guwahati-hills',
    name: 'Guwahati Peri-Urban Hills (Khanapara & Narakasur)',
    district: 'Kamrup Metropolitan',
    circle: 'Dispur Revenue Circle',
    coordinates: [26.1158, 91.8025],
    zoomLevel: 14,
    threatType: 'Hill Slicing',
    severity: 'Critical',
    description: 'Rapid mechanical hill cutting and unauthorized red-soil excavation observed on steep slopes bordering Meghalaya boundary, leading to urban flash-flooding risks in down-gradient Guwahati valleys.',
    baselineYear: '2020',
    currentYear: '2026',
    areaDeltaHectares: 34.6,
    dominantTransition: 'Dense Forest → Degraded Bare Soil / Construction Site',
    ndviDelta: -0.52,
    ndbiDelta: +0.48,
    sarBackscatterChangeDB: +4.8,
    confidenceScore: 94.2,
    baselineStats: {
      'Dense Forest': 68,
      'Open Forest': 18,
      'Built-up': 8,
      'Degraded Land': 6,
    },
    currentStats: {
      'Dense Forest': 32,
      'Open Forest': 14,
      'Built-up': 26,
      'Degraded Land': 28,
    },
    cadastralSurveyPlots: ['Dag No. 412/10', 'Dag No. 415/B', 'Patta No. 89 (Govt Khas Land)'],
  },
  {
    id: 'deepor-beel',
    name: 'Deepor Beel Ramsar Wetland Sanctuary',
    district: 'Kamrup Metropolitan',
    circle: 'Azara Revenue Circle',
    coordinates: [26.1265, 91.6565],
    zoomLevel: 14,
    threatType: 'Wetland Shrinkage',
    severity: 'Critical',
    description: 'Encroachment along south-eastern periphery of Ramsar site. Illegal earth filling, municipal waste dumping proximity, and conversion of littoral wetland margins into commercial warehouse plots.',
    baselineYear: '2020',
    currentYear: '2026',
    areaDeltaHectares: 22.8,
    dominantTransition: 'Wetland / Water Body → Built-up / Reclaimed Silt',
    ndviDelta: -0.28,
    ndbiDelta: +0.41,
    sarBackscatterChangeDB: +5.1,
    confidenceScore: 96.8,
    baselineStats: {
      'Permanent Water': 45,
      'Wetlands': 38,
      'Built-up': 5,
      'Agricultural': 12,
    },
    currentStats: {
      'Permanent Water': 34,
      'Wetlands': 27,
      'Built-up': 24,
      'Agricultural': 15,
    },
    cadastralSurveyPlots: ['Dag No. 882/A', 'Dag No. 884', 'Ramsar Buffer Zone Parcel 14'],
  },
  {
    id: 'majuli-island',
    name: 'Majuli Island - Salmora Fluvial Erosion Corridor',
    district: 'Majuli',
    circle: 'Majuli Revenue Circle',
    coordinates: [26.8520, 94.2180],
    zoomLevel: 13,
    threatType: 'River Erosion',
    severity: 'High',
    description: 'Severe post-monsoon bank slicing along the south-eastern embankment of Majuli river island by the braided Brahmaputra channel. Loss of agricultural silt flats and migration of sandbar (char) deposits.',
    baselineYear: '2020',
    currentYear: '2026',
    areaDeltaHectares: 58.4,
    dominantTransition: 'Agricultural Cropland / Riverbank → Main River Channel / Sandbar',
    ndviDelta: -0.40,
    ndbiDelta: -0.15,
    sarBackscatterChangeDB: -3.8,
    confidenceScore: 91.5,
    baselineStats: {
      'Agricultural': 52,
      'Sandbars (Chars)': 18,
      'Water Bodies': 22,
      'Settlement': 8,
    },
    currentStats: {
      'Agricultural': 28,
      'Sandbars (Chars)': 34,
      'Water Bodies': 34,
      'Settlement': 4,
    },
    cadastralSurveyPlots: ['Salmora Village Block III', 'Riverbank Cadastral Sector 9'],
  },
  {
    id: 'kaziranga-buffer',
    name: 'Kaziranga Southern Animal Corridor (Panbari - Karbi Anglong)',
    district: 'Golaghat & Nagaon',
    circle: 'Bokakhat Revenue Circle',
    coordinates: [26.5815, 93.3860],
    zoomLevel: 13,
    threatType: 'Deforestation',
    severity: 'High',
    description: 'Canopy thinning and unauthorized tea plantation expansion along the southern foothills of Karbi Anglong adjoining National Highway 715 animal migration corridors.',
    baselineYear: '2020',
    currentYear: '2026',
    areaDeltaHectares: 19.3,
    dominantTransition: 'Dense Forest Corridor → Open Tea Plantation / Commercial Dhabas',
    ndviDelta: -0.32,
    ndbiDelta: +0.22,
    sarBackscatterChangeDB: +2.1,
    confidenceScore: 89.4,
    baselineStats: {
      'Dense Forest': 74,
      'Open Forest / Tea': 16,
      'Built-up': 4,
      'Agricultural': 6,
    },
    currentStats: {
      'Dense Forest': 48,
      'Open Forest / Tea': 34,
      'Built-up': 11,
      'Agricultural': 7,
    },
    cadastralSurveyPlots: ['Eco-Sensitive Zone Panbari Sector 4', 'Forest Reserve Compartment 12'],
  },
  {
    id: 'dibrugarh-bypass',
    name: 'Dibrugarh Western Urban Sprawl & Industrial Bypass',
    district: 'Dibrugarh',
    circle: 'Dibrugarh East Revenue Circle',
    coordinates: [27.4728, 94.9120],
    zoomLevel: 14,
    threatType: 'Urban Sprawl',
    severity: 'Moderate',
    description: 'Conversion of prime multi-crop Sali paddy agricultural parcels into concrete logistics centers and commercial transit hubs along the Bogibeel connecting corridor.',
    baselineYear: '2020',
    currentYear: '2026',
    areaDeltaHectares: 41.2,
    dominantTransition: 'Agricultural Cropland → Built-up Concrete / Warehouses',
    ndviDelta: -0.44,
    ndbiDelta: +0.55,
    sarBackscatterChangeDB: +4.2,
    confidenceScore: 95.1,
    baselineStats: {
      'Agricultural': 66,
      'Built-up': 14,
      'Water Bodies': 10,
      'Open Forest': 10,
    },
    currentStats: {
      'Agricultural': 30,
      'Built-up': 48,
      'Water Bodies': 8,
      'Open Forest': 14,
    },
    cadastralSurveyPlots: ['Dag No. 1290 to 1305', 'Bogibeel Link Road Km 4.2'],
  },
];

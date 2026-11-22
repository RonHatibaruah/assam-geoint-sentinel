export interface LULCClass {
  id: number;
  code: string;
  name: string;
  nameAssamese: string;
  color: string;
  description: string;
  typicalNDVI: string;
  typicalNDWI: string;
  typicalNDBI: string;
}

export const LULC_CLASSES: LULCClass[] = [
  {
    id: 1,
    code: 'DF',
    name: 'Dense Forest / Canopy',
    nameAssamese: 'ঘন অৰণ্য / গছৰ চালি',
    color: '#15803d', // emerald-700
    description: 'Closed tree canopy (>40% density), primary forest reserves, wildlife corridors',
    typicalNDVI: '0.70 to 0.88',
    typicalNDWI: '-0.30 to -0.10',
    typicalNDBI: '-0.45 to -0.25',
  },
  {
    id: 2,
    code: 'OF_TEA',
    name: 'Open Forest / Tea Garden',
    nameAssamese: 'মুকলি বন / চাহ বাগান',
    color: '#84cc16', // lime-500
    description: 'Organized plantation agro-forestry, tea estates (Upper Assam/Barak Valley), secondary scrub',
    typicalNDVI: '0.50 to 0.69',
    typicalNDWI: '-0.25 to -0.05',
    typicalNDBI: '-0.30 to -0.15',
  },
  {
    id: 3,
    code: 'BUILT_UP',
    name: 'Built-up / Settlement',
    nameAssamese: 'বসতি / নিৰ্মিত অঞ্চল',
    color: '#ef4444', // red-500
    description: 'Impervious concrete, commercial structures, asphalt highways, peri-urban housing',
    typicalNDVI: '0.05 to 0.25',
    typicalNDWI: '-0.40 to -0.20',
    typicalNDBI: '+0.25 to +0.65',
  },
  {
    id: 4,
    code: 'CROP',
    name: 'Agricultural Cropland',
    nameAssamese: 'কৃষি ভূমি (ধাননি)',
    color: '#eab308', // yellow-500
    description: 'Sali/Ahu paddy parcels, alluvial flood-plain seasonal cultivation, mustard fields',
    typicalNDVI: '0.35 to 0.65 (Seasonal)',
    typicalNDWI: '-0.15 to +0.15',
    typicalNDBI: '-0.20 to +0.10',
  },
  {
    id: 5,
    code: 'WATER',
    name: 'Permanent Water Bodies',
    nameAssamese: 'স্থায়ী জলভাগ (ব্ৰহ্মপুত্ৰ/উপনৈ)',
    color: '#0284c7', // sky-600
    description: 'Mainstream Brahmaputra, Barak river channel, perennial river tributaries, deep beels',
    typicalNDVI: '-0.45 to -0.10',
    typicalNDWI: '+0.40 to +0.85',
    typicalNDBI: '-0.60 to -0.35',
  },
  {
    id: 6,
    code: 'CHAR',
    name: 'Riverbed Sandbars (Chars)',
    nameAssamese: 'নদীৰ চৰ / চাপৰি',
    color: '#d1d5db', // gray-300
    description: 'Fluvial sand deposits, braided channel bars, highly dynamic post-flood deposition',
    typicalNDVI: '0.00 to 0.15',
    typicalNDWI: '-0.10 to +0.20',
    typicalNDBI: '+0.10 to +0.35',
  },
  {
    id: 7,
    code: 'DEGRADED',
    name: 'Degraded / Excavated Land',
    nameAssamese: 'ক্ষয়প্ৰাপ্ত / পাহাৰ কটা ভূমি',
    color: '#f97316', // orange-500
    description: 'Unauthorized hill cutting, quarrying, earth filling, bare soil topsoil stripping',
    typicalNDVI: '0.05 to 0.20',
    typicalNDWI: '-0.30 to -0.10',
    typicalNDBI: '+0.40 to +0.70',
  },
  {
    id: 8,
    code: 'WETLAND',
    name: 'Wetlands / Beels',
    nameAssamese: 'জলাশয় / বিল',
    color: '#06b6d4', // cyan-500
    description: 'Deepor Beel Ramsar site, oxbow lakes, seasonal waterlogged swamps, aquatic vegetation',
    typicalNDVI: '0.20 to 0.50',
    typicalNDWI: '+0.15 to +0.60',
    typicalNDBI: '-0.35 to -0.10',
  },
];

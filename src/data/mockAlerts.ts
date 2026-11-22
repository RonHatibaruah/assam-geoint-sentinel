export interface AnomalyAlert {
  id: string;
  title: string;
  titleAssamese: string;
  category: 'Hill Cutting' | 'Wetland Encroachment' | 'Illegal Slicing' | 'Forest Degradation' | 'Fluvial Erosion';
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  district: string;
  circle: string;
  coordinates: [number, number];
  affectedAreaHectares: number;
  detectedDate: string;
  confidence: number;
  status: 'Pending Verification' | 'Investigation Dispatched' | 'Notice Issued' | 'Action Enforced';
  satelliteSensor: string;
  cadastralPlot: string;
  assignedOfficer: string;
  description: string;
  ndviBefore: number;
  ndviAfter: number;
  ndbiBefore: number;
  ndbiAfter: number;
}

export const MOCK_ALERTS: AnomalyAlert[] = [
  {
    id: 'ALT-ASM-2026-089',
    title: 'Unauthorized Mechanical Hill Slicing & Quarrying',
    titleAssamese: 'অবৈধ পাহাৰ কটা আৰু মাটি খনন',
    category: 'Hill Cutting',
    severity: 'Critical',
    district: 'Kamrup Metropolitan',
    circle: 'Dispur Revenue Circle',
    coordinates: [26.1158, 91.8025],
    affectedAreaHectares: 4.8,
    detectedDate: '2026-11-18',
    confidence: 96.4,
    status: 'Pending Verification',
    satelliteSensor: 'Sentinel-2 (10m) + Sentinel-1 SAR',
    cadastralPlot: 'Dag No. 415/B (Govt Wasteland / Khas)',
    assignedOfficer: 'Sri R. K. Barman, ACS (Circle Officer, Dispur)',
    description: 'Abrupt drop in vegetation canopy index (NDVI dropped from 0.76 to 0.14) coupled with high SAR backscatter (+5.2 dB). Indicates heavy earthmover activity and slope destabilization on vulnerable hill slope.',
    ndviBefore: 0.76,
    ndviAfter: 0.14,
    ndbiBefore: -0.32,
    ndbiAfter: +0.58,
  },
  {
    id: 'ALT-ASM-2026-092',
    title: 'Earth-Filling Encroachment along Deepor Beel Eco-Buffer',
    titleAssamese: 'দীপৰ বিলৰ সংৰক্ষিত এলেকাত মাটি ভৰোৱা',
    category: 'Wetland Encroachment',
    severity: 'Critical',
    district: 'Kamrup Metropolitan',
    circle: 'Azara Revenue Circle',
    coordinates: [26.1265, 91.6565],
    affectedAreaHectares: 2.3,
    detectedDate: '2026-11-15',
    confidence: 98.1,
    status: 'Investigation Dispatched',
    satelliteSensor: 'Sentinel-2 Multispectral',
    cadastralPlot: 'Dag No. 882/A (Ramsar Peripheral Survey)',
    assignedOfficer: 'Smti P. Gogoi, ACS (Circle Officer, Azara)',
    description: 'Loss of open water reflection and littoral vegetation within designated eco-sensitive boundary of Ramsar wetland. Replaced by compacted red-soil fill for unauthorized truck yard construction.',
    ndviBefore: 0.38,
    ndviAfter: 0.08,
    ndbiBefore: -0.45,
    ndbiAfter: +0.44,
  },
  {
    id: 'ALT-ASM-2026-094',
    title: 'Rapid South-Bank Cut & Silt Migration into Paddy Land',
    titleAssamese: 'ব্ৰহ্মপুত্ৰৰ দক্ষিণ পাৰৰ গৰাখহনীয়া',
    category: 'Fluvial Erosion',
    severity: 'High',
    district: 'Majuli',
    circle: 'Majuli Revenue Circle',
    coordinates: [26.8520, 94.2180],
    affectedAreaHectares: 8.7,
    detectedDate: '2026-11-12',
    confidence: 93.5,
    status: 'Notice Issued',
    satelliteSensor: 'Sentinel-1 SAR C-Band (All-Weather)',
    cadastralPlot: 'Salmora Village Block III, Embankment Km 14',
    assignedOfficer: 'Executive Engineer, Water Resources Dept, Majuli',
    description: 'Brahmaputra high-velocity braiding has sheared 140 meters of active agricultural bank line over the preceding 30 days, depositing coarse sterile sandbar over 8.7 ha of prime Sali paddy parcels.',
    ndviBefore: 0.58,
    ndviAfter: 0.04,
    ndbiBefore: -0.15,
    ndbiAfter: +0.22,
  },
  {
    id: 'ALT-ASM-2026-097',
    title: 'Forest Canopy Slicing in Kaziranga Eco-Sensitive Zone',
    titleAssamese: 'কাজিৰঙা সংৰক্ষিত এলেকাত গছ কটা',
    category: 'Forest Degradation',
    severity: 'High',
    district: 'Golaghat',
    circle: 'Bokakhat Revenue Circle',
    coordinates: [26.5815, 93.3860],
    affectedAreaHectares: 3.1,
    detectedDate: '2026-11-09',
    confidence: 89.7,
    status: 'Action Enforced',
    satelliteSensor: 'Sentinel-2 (10m VNIR)',
    cadastralPlot: 'Panbari Wildlife Sanctuary Buffer Parcel 9',
    assignedOfficer: 'Divisional Forest Officer (Eastern Assam Wildlife Division)',
    description: 'Selective canopy felling detected along the foothills connecting Panbari corridor to Karbi Anglong. Field team confiscated illicit timber and served immediate stop-work injunction.',
    ndviBefore: 0.82,
    ndviAfter: 0.42,
    ndbiBefore: -0.38,
    ndbiAfter: +0.18,
  },
  {
    id: 'ALT-ASM-2026-103',
    title: 'Industrial Warehouse Expansion on Prime Multi-Crop Farmland',
    titleAssamese: 'কৃষিভূমিত উদ্যোগিক নিৰ্মাণ',
    category: 'Illegal Slicing',
    severity: 'Medium',
    district: 'Dibrugarh',
    circle: 'Dibrugarh East Revenue Circle',
    coordinates: [27.4728, 94.9120],
    affectedAreaHectares: 6.4,
    detectedDate: '2026-11-04',
    confidence: 94.0,
    status: 'Pending Verification',
    satelliteSensor: 'Sentinel-2 (10m) + Cartosat Verification',
    cadastralPlot: 'Dag No. 1294, 1295 (Agricultural Patta)',
    assignedOfficer: 'Additional Deputy Commissioner (Revenue), Dibrugarh',
    description: 'Conversion of agricultural land without statutory non-agricultural permission (Section 64 Assam Land and Revenue Regulation). Concrete foundation footprint expansion identified.',
    ndviBefore: 0.62,
    ndviAfter: 0.12,
    ndbiBefore: -0.22,
    ndbiAfter: +0.61,
  },
];

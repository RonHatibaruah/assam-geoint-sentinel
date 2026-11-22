import React, { useState } from 'react';
import { 
  Image, 
  Download, 
  ExternalLink, 
  Maximize2, 
  CheckCircle2, 
  Layers, 
  Sparkles,
  Info
} from 'lucide-react';

interface InfographicItem {
  id: number;
  filename: string;
  title: string;
  figureLabel: string;
  targetSection: string;
  description: string;
}

const INFOGRAPHICS: InfographicItem[] = [
  {
    id: 1,
    filename: 'fig1_system_architecture.jpg',
    title: 'Bhu-Drishti Assam End-to-End Geospatial AI Architecture & Pipeline',
    figureLabel: 'Figure 1',
    targetSection: 'Section 4: Technology & Solution Architecture',
    description: 'Shows satellite ingestion, Sen2Cor calibration, dual-branch Siamese ChangeFormer, PostGIS spatial join, and Field Enforcement loop.'
  },
  {
    id: 2,
    filename: 'fig2_guwahati_hill_cutting_case_study.jpg',
    title: 'Automated Bi-Temporal Detection of Illegal Hill Slicing in Kamrup Metro',
    figureLabel: 'Figure 2',
    targetSection: 'Section 3: Proof of Work / Prototype Evidence',
    description: 'Tri-panel forensic comparison showing dense 2020 forest canopy vs 2026 red-soil excavation scars with Dag No. 415/B cadastral boundaries.'
  },
  {
    id: 3,
    filename: 'fig3_deepor_beel_wetland_encroachment.jpg',
    title: 'Deepor Beel Ramsar Site: Shoreline Shrinkage & Earth-Filling Sentinel',
    figureLabel: 'Figure 3',
    targetSection: 'Section 3: Prototype Evidence & Ecological Hotspots',
    description: 'Analytical split-view map highlighting compacted silt fill encroaching across the protected wetland sanctuary buffer zone.'
  },
  {
    id: 4,
    filename: 'fig4_majuli_fluvial_erosion_dynamics.jpg',
    title: 'Majuli Island Fluvial Slicing & Sandbar (Char) Migration Intelligence',
    figureLabel: 'Figure 4',
    targetSection: 'Section 2: Proposed Solution & Features',
    description: 'All-weather SAR radar mapping 140m Brahmaputra bankline shear across active paddy parcels with dynamic sandbar silt migration.'
  },
  {
    id: 5,
    filename: 'fig5_optical_vs_sar_monsoon_penetration.jpg',
    title: 'Monsoon All-Weather Breakthrough: Sentinel-1 SAR Piercing Heavy Clouds',
    figureLabel: 'Figure 5',
    targetSection: 'Section 11: Innovation & Differentiation',
    description: 'Direct comparison demonstrating radar microwaves piercing 100% opaque monsoon cloud cover where optical sensors are completely blinded.'
  },
  {
    id: 6,
    filename: 'fig6_phenology_crop_vs_encroachment.jpg',
    title: 'Multi-Temporal Phenology Curve: Crop Harvesting vs Permanent Encroachment',
    figureLabel: 'Figure 6',
    targetSection: 'Section 9: Testing, Validation & Performance',
    description: 'Time-series Cartesian graph showing how seasonal paddy harvesting NDVI rebounds, while illegal clearing creates a permanent flatline.'
  },
  {
    id: 7,
    filename: 'fig7_cadastral_revenue_overlay.jpg',
    title: 'High-Precision Cadastral Survey (Bhu-Naksha) Vector Overlay',
    figureLabel: 'Figure 7',
    targetSection: 'Section 2: Solution & Cadastral Integration',
    description: 'Precision spatial join of satellite change detection with official village revenue parcel boundaries (Dag Nos. 412, 415/B).'
  },
  {
    id: 8,
    filename: 'fig8_field_inspection_enforcement_dossier.jpg',
    title: 'Official Tamper-Evident Field Inspection Dossier & Statutory Notice',
    figureLabel: 'Figure 8',
    targetSection: 'Section 3: User Journey & Supporting Evidence',
    description: 'Official Government of Assam statutory notice layout with centroid GPS coordinates, spectral shift table, and QR geo-verification.'
  },
  {
    id: 9,
    filename: 'fig9_mobile_ground_truth_workflow.jpg',
    title: 'Last-Mile Field Ground-Truthing Mobile Workflow for Circle Officers',
    figureLabel: 'Figure 9',
    targetSection: 'Section 1: Problem Understanding & User Workflow',
    description: 'Smartphone interface showing GPS guidance, on-site photo geotagging, and immediate digital verification loop closure.'
  },
  {
    id: 10,
    filename: 'fig10_assam_pilot_validation_matrix.jpg',
    title: 'Assam Statewide Pilot Validation Framework Across Three Physiographic Zones',
    figureLabel: 'Figure 10',
    targetSection: 'Section 12: Resources, Risks & Pilot Validation',
    description: 'Strategic deployment map highlighting Kamrup Metro (Urban/Hills), Kaziranga (Forest buffer), and Majuli (Riverine char dynamics).'
  },
  {
    id: 11,
    filename: 'fig11_current_vs_ai_workflow_comparison.jpg',
    title: 'Bhu-Drishti AI vs Manual Enforcement Process Swimlane Comparison',
    figureLabel: 'Figure 11',
    targetSection: 'Section 1: Problem Understanding & User Workflow',
    description: 'Side-by-side comparative swimlane diagram showing 90-180 days manual lag versus <48 hours automated satellite detection and legal notice dispatch.'
  },
  {
    id: 12,
    filename: 'fig12_multitier_rolebased_ui_architecture.jpg',
    title: 'Multi-Tier Role-Based Portal & Field Command UI Architecture',
    figureLabel: 'Figure 12',
    targetSection: 'Section 3: User Journey & Wireframes',
    description: 'Hierarchical dashboard interface layout covering State Command Center (Macro KPIs), District/Circle Portal (Dag Encroachment Queue), and Field Mobile App.'
  },
  {
    id: 13,
    filename: 'fig13_12month_engineering_roadmap_gantt.jpg',
    title: '12-Month Stage-Gate Engineering Roadmap & Gantt Milestone Schedule',
    figureLabel: 'Figure 13',
    targetSection: 'Section 6: Development Timeline & Milestones',
    description: 'Horizontal engineering Gantt timeline spanning Q1 to Q4 with 6 core milestone gates from satellite ingestion to state-wide ASDC deployment.'
  },
  {
    id: 14,
    filename: 'fig14_team_expertise_raci_matrix.jpg',
    title: 'Multidisciplinary Team Structure & Specialist RACI Governance Matrix',
    figureLabel: 'Figure 14',
    targetSection: 'Section 8: Team, Manpower & Expertise',
    description: 'Organizational hierarchy and RACI governance matrix mapping core specialists across AI models, remote sensing, cadastral land laws, and cloud architecture.'
  },
  {
    id: 15,
    filename: 'fig15_multisensor_data_ingestion_pipeline.jpg',
    title: 'Multi-Sensor Data Ingestion, Harmonization & Lineage Topology',
    figureLabel: 'Figure 15',
    targetSection: 'Section 7: Data & Information Requirements',
    description: 'Multi-tier data flow uniting Sentinel-1 SAR, Sentinel-2 Optical, Cartosat, PlanetScope, and Dharitree Cadastral Shapefiles into PostGIS and STAC.'
  },
  {
    id: 16,
    filename: 'fig16_zerotrust_cloud_cybersecurity_architecture.jpg',
    title: 'Zero-Trust Cloud & Cyber-Governance Security Architecture',
    figureLabel: 'Figure 16',
    targetSection: 'Section 10: Security, Privacy, Safety & Compliance',
    description: 'Four-layer defense-in-depth security model: ASDC perimeter, Jan Parichay SSO RBAC, AES-256 data protection, and Section 65B-compliant audit trails.'
  },
  {
    id: 17,
    filename: 'fig17_assam_5district_pilot_rollout_map.jpg',
    title: 'Assam 5-District Phased Pilot Rollout & Geographic Validation Zones',
    figureLabel: 'Figure 17',
    targetSection: 'Section 12: Resources, Risks & Pilot Validation',
    description: 'Geographic deployment map highlighting Kamrup Metro, Majuli, Sonitpur/Kaziranga buffer, Darrang, and Cachar with terrain-specific challenge matrices.'
  },
  {
    id: 18,
    filename: 'fig18_risk_severity_matrix_mitigation_framework.jpg',
    title: 'Enterprise Risk Severity Heatmap & Operational Mitigation Matrix',
    figureLabel: 'Figure 18',
    targetSection: 'Section 12: Resources, Risks & Pilot Validation',
    description: '5x5 risk severity heatmap charting persistent monsoon clouds, cadastral misalignment, and network dropouts paired with engineered fail-safes.'
  }
];

export const GalleryView: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<InfographicItem | null>(null);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/30 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>High-Impact 16:9 Widescreen Framework Infographics</span>
          </div>
          <h2 className="text-xl md:text-2xl font-black text-white">
            Proposal Supporting Evidence & Infographics Gallery
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
            All 18 technological framework infographics generated using your Google Pro account (`kalyanjit@gmail.com`) in 16:9 widescreen blueprint aesthetic for direct inclusion in the NESFIC-D-21 Proposal Evidence PDF.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <span className="px-3 py-1.5 rounded-lg bg-emerald-950 border border-emerald-800 text-emerald-300 font-mono font-bold">
            18 / 18 Frameworks Ready
          </span>
        </div>
      </div>

      {/* Grid of Infographics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {INFOGRAPHICS.map((item) => (
          <div
            key={item.id}
            className="group bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl hover:border-emerald-500/50 transition-all flex flex-col justify-between"
          >
            <div>
              {/* Image Container with Fallback */}
              <div 
                className="relative aspect-video bg-slate-950 overflow-hidden cursor-pointer"
                onClick={() => setSelectedImage(item)}
              >
                <img
                  src={`/assets/images/${item.filename}`}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    // Fallback visual if still rendering
                    const target = e.target as HTMLElement;
                    target.style.display = 'none';
                    if (target.nextElementSibling) {
                      (target.nextElementSibling as HTMLElement).style.display = 'flex';
                    }
                  }}
                />
                <div 
                  className="w-full h-full items-center justify-center bg-slate-950 border border-slate-800 text-slate-500 p-6 text-center text-xs space-y-2 hidden"
                >
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto animate-pulse">
                    <Layers className="w-5 h-5" />
                  </div>
                  <p className="font-semibold text-slate-300">{item.figureLabel}: {item.title}</p>
                  <p className="text-[11px] text-slate-500">Autonomous generation pipeline active...</p>
                </div>

                <div className="absolute top-3 left-3 bg-slate-950/90 border border-slate-800 px-2.5 py-1 rounded-md text-[11px] font-mono text-emerald-400 font-bold backdrop-blur-sm">
                  {item.figureLabel}
                </div>

                <button 
                  onClick={() => setSelectedImage(item)}
                  className="absolute bottom-3 right-3 p-2 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>

              {/* Card Meta Content */}
              <div className="p-5 space-y-2.5">
                <div className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                  {item.targetSection}
                </div>
                <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>

            {/* Card Footer Actions */}
            <div className="p-4 pt-0 border-t border-slate-800/80 flex items-center justify-between text-xs mt-2">
              <span className="font-mono text-[11px] text-slate-500">
                {item.filename}
              </span>
              <a
                href={`/assets/images/${item.filename}`}
                download={item.filename}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-emerald-600 text-slate-300 hover:text-white font-medium flex items-center space-x-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save Image</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
          <div className="relative max-w-5xl w-full bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl">
            <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-emerald-400 font-bold mr-2">
                  {selectedImage.figureLabel}
                </span>
                <span className="text-xs text-slate-300 font-bold">
                  {selectedImage.title}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <a
                  href={`/assets/images/${selectedImage.filename}`}
                  download={selectedImage.filename}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center space-x-1"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download High-Res</span>
                </a>
                <button
                  onClick={() => setSelectedImage(null)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs"
                >
                  Close
                </button>
              </div>
            </div>

            <div className="p-4 bg-slate-950 flex items-center justify-center max-h-[75vh] overflow-hidden">
              <img
                src={`/assets/images/${selectedImage.filename}`}
                alt={selectedImage.title}
                className="max-h-[70vh] w-auto object-contain rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

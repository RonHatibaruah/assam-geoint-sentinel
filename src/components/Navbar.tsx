import React from 'react';
import { 
  Satellite, 
  Map, 
  AlertTriangle, 
  Cpu, 
  FileText, 
  Layers, 
  Activity, 
  ShieldCheck,
  ImageIcon
} from 'lucide-react';
import { ROUTE_CONFIG } from '../utils/seoRouter';

export type TabType = 'dashboard' | 'map-studio' | 'alerts' | 'playground' | 'gallery' | 'proposal';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  alertCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, alertCount }) => {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, tab: TabType) => {
    // If not middle click or modifier key (Ctrl / Cmd / Shift)
    if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
      e.preventDefault();
      setActiveTab(tab);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-gray-100/95 backdrop-blur-md border-b border-gray-300 text-gray-800 shadow-sm">
      {/* Top Govt Bar */}
      <div className="bg-gray-200/90 px-4 py-1.5 border-b border-gray-300 flex items-center justify-between text-xs">
        <div className="flex items-center space-x-3 text-gray-700">
          <span className="flex items-center space-x-1 font-semibold text-emerald-700">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Govt. of Assam</span>
          </span>
          <span className="text-gray-400">|</span>
          <span className="text-gray-700">Dept. of Science & Technology</span>
          <span className="text-gray-400">|</span>
          <span className="text-amber-800 font-semibold">ASSAC (Assam State Space Application Centre)</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="bg-gray-100 border border-emerald-400 text-emerald-800 text-[11px] font-mono px-2 py-0.5 rounded flex items-center space-x-1.5 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
            <span>Sentinel-1/2 Live Feed: ONLINE</span>
          </span>
          <span className="bg-gray-300 text-gray-800 text-[11px] font-semibold px-2 py-0.5 rounded border border-gray-400">
            NESFIC-D-21 • Flugelsoft Labs
          </span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Brand Logo & Name as SEO Anchor */}
        <a 
          href="/dashboard"
          onClick={(e) => handleLinkClick(e, 'dashboard')}
          title="Bhu-Drishti Assam - Executive Geospatial Intelligence Dashboard"
          className="flex items-center space-x-3 group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-gray-700 to-gray-500 p-0.5 shadow-sm flex items-center justify-center group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-gray-100 rounded-[10px] flex items-center justify-center">
              <Satellite className="w-5 h-5 text-gray-800" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-base tracking-tight text-gray-900 flex items-center">
                Bhu-Drishti Assam
                <span className="ml-2 text-xs font-semibold px-1.5 py-0.5 rounded bg-gray-200 text-gray-800 border border-gray-300">
                  ভূ-দৃষ্টি অসম
                </span>
              </span>
            </div>
            <p className="text-[11px] text-gray-600 tracking-wide font-medium">
              AI-Based Automated LULC Change Detection & Monitoring System
            </p>
          </div>
        </a>

        {/* Tab Navigation Semantic Anchor Links */}
        <nav className="flex items-center space-x-1" aria-label="Main Application Navigation">
          <a
            href={ROUTE_CONFIG.dashboard.path}
            onClick={(e) => handleLinkClick(e, 'dashboard')}
            title="Executive Dashboard: Macro Metrics and Sensor Feeds"
            aria-current={activeTab === 'dashboard' ? 'page' : undefined}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'dashboard'
                ? 'bg-gray-800 text-white shadow-sm font-semibold'
                : 'text-gray-700 hover:text-gray-950 hover:bg-gray-200'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Dashboard</span>
          </a>

          <a
            href={ROUTE_CONFIG['map-studio'].path}
            onClick={(e) => handleLinkClick(e, 'map-studio')}
            title="Map Studio: Interactive Bi-Temporal Satellite Curtain Comparison"
            aria-current={activeTab === 'map-studio' ? 'page' : undefined}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'map-studio'
                ? 'bg-gray-800 text-white shadow-sm font-semibold'
                : 'text-gray-700 hover:text-gray-950 hover:bg-gray-200'
            }`}
          >
            <Map className="w-4 h-4" />
            <span>Map Studio</span>
          </a>

          <a
            href={ROUTE_CONFIG.alerts.path}
            onClick={(e) => handleLinkClick(e, 'alerts')}
            title="Encroachment Alerts Queue: Cadastral Land Violations & Field Dossiers"
            aria-current={activeTab === 'alerts' ? 'page' : undefined}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-medium transition-all relative ${
              activeTab === 'alerts'
                ? 'bg-rose-700 text-white shadow-sm font-semibold'
                : 'text-gray-700 hover:text-gray-950 hover:bg-gray-200'
            }`}
          >
            <AlertTriangle className="w-4 h-4" />
            <span>Alerts</span>
            {alertCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 bg-rose-600 text-white font-bold text-[10px] rounded-full">
                {alertCount}
              </span>
            )}
          </a>

          <a
            href={ROUTE_CONFIG.playground.path}
            onClick={(e) => handleLinkClick(e, 'playground')}
            title="AI Model Playground: ChangeFormer Deep Learning Inference Testbed"
            aria-current={activeTab === 'playground' ? 'page' : undefined}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'playground'
                ? 'bg-gray-800 text-white shadow-sm font-semibold'
                : 'text-gray-700 hover:text-gray-950 hover:bg-gray-200'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>AI Playground</span>
          </a>

          <a
            href={ROUTE_CONFIG.gallery.path}
            onClick={(e) => handleLinkClick(e, 'gallery')}
            title="Infographics Gallery: 18 Architecture Blueprints & Supporting Evidence"
            aria-current={activeTab === 'gallery' ? 'page' : undefined}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'gallery'
                ? 'bg-gray-800 text-white shadow-sm font-semibold'
                : 'text-gray-700 hover:text-gray-950 hover:bg-gray-200'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Infographics & Evidence</span>
          </a>

          <a
            href={ROUTE_CONFIG.proposal.path}
            onClick={(e) => handleLinkClick(e, 'proposal')}
            title="NESFIC-D-21 Proposal Dossier: All 12 Mandatory Sections"
            aria-current={activeTab === 'proposal' ? 'page' : undefined}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-medium transition-all border ${
              activeTab === 'proposal'
                ? 'bg-gray-800 text-amber-300 font-bold border-gray-700 shadow-sm'
                : 'border-amber-400 text-amber-900 bg-amber-50 hover:bg-amber-100'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Proposal</span>
          </a>
        </nav>
      </div>
    </header>
  );
};

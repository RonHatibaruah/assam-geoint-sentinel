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

export type TabType = 'dashboard' | 'map-studio' | 'alerts' | 'playground' | 'gallery' | 'proposal';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  alertCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, alertCount }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 text-slate-800 shadow-sm">
      {/* Top Govt Bar */}
      <div className="bg-slate-50 px-4 py-1.5 border-b border-slate-200 flex items-center justify-between text-xs">
        <div className="flex items-center space-x-3 text-slate-600">
          <span className="flex items-center space-x-1 font-semibold text-emerald-700">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Govt. of Assam</span>
          </span>
          <span className="text-slate-300">|</span>
          <span className="text-slate-600">Dept. of Science & Technology</span>
          <span className="text-slate-300">|</span>
          <span className="text-amber-800 font-semibold">ASSAC (Assam State Space Application Centre)</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="bg-emerald-50 border border-emerald-300 text-emerald-800 text-[11px] font-mono px-2 py-0.5 rounded flex items-center space-x-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
            <span>Sentinel-1/2 Live Feed: ONLINE</span>
          </span>
          <span className="bg-slate-100 text-slate-700 text-[11px] font-semibold px-2 py-0.5 rounded border border-slate-300">
            NESFIC-D-21
          </span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Brand Logo & Name */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 p-0.5 shadow-md shadow-emerald-500/20 flex items-center justify-center">
            <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
              <Satellite className="w-5 h-5 text-emerald-600" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="font-extrabold text-base tracking-tight text-slate-900 flex items-center">
                Bhu-Drishti Assam
                <span className="ml-2 text-xs font-semibold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-300">
                  ভূ-দৃষ্টি অসম
                </span>
              </h1>
            </div>
            <p className="text-[11px] text-slate-500 tracking-wide font-medium">
              AI-Based Automated LULC Change Detection & Monitoring System
            </p>
          </div>
        </div>

        {/* Tab Navigation Buttons */}
        <nav className="flex items-center space-x-1">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'dashboard'
                ? 'bg-emerald-600 text-white shadow-sm font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab('map-studio')}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'map-studio'
                ? 'bg-emerald-600 text-white shadow-sm font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Map className="w-4 h-4" />
            <span>Map Studio</span>
          </button>

          <button
            onClick={() => setActiveTab('alerts')}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-medium transition-all relative ${
              activeTab === 'alerts'
                ? 'bg-rose-600 text-white shadow-sm font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <AlertTriangle className="w-4 h-4" />
            <span>Alerts</span>
            {alertCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 bg-rose-600 text-white font-bold text-[10px] rounded-full">
                {alertCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('playground')}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'playground'
                ? 'bg-emerald-600 text-white shadow-sm font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>AI Playground</span>
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'gallery'
                ? 'bg-teal-600 text-white shadow-sm font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Infographics & Evidence</span>
          </button>

          <button
            onClick={() => setActiveTab('proposal')}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-medium transition-all border ${
              activeTab === 'proposal'
                ? 'bg-amber-600 text-white font-bold border-amber-600 shadow-sm'
                : 'border-amber-300 text-amber-800 bg-amber-50 hover:bg-amber-100'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Proposal</span>
          </button>
        </nav>
      </div>
    </header>
  );
};

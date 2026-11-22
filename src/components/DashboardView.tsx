import React from 'react';
import { 
  Trees, 
  Droplets, 
  Building2, 
  AlertOctagon, 
  Satellite, 
  ArrowUpRight, 
  ArrowDownRight, 
  Clock, 
  CheckCircle2, 
  ChevronRight,
  TrendingDown,
  Layers,
  MapPin
} from 'lucide-react';
import { ASSAM_HOTSPOTS, Hotspot } from '../data/assamHotspots';
import { MOCK_ALERTS, AnomalyAlert } from '../data/mockAlerts';
import { TabType } from './Navbar';

interface DashboardViewProps {
  onSelectHotspot: (hotspot: Hotspot) => void;
  setActiveTab: (tab: TabType) => void;
  onOpenAlertDossier: (alert: AnomalyAlert) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ 
  onSelectHotspot, 
  setActiveTab, 
  onOpenAlertDossier 
}) => {
  return (
    <div className="space-y-6">
      {/* Top Banner / Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950/80 border border-slate-700/80 p-6 shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>NESFIC-D-21 Solution Prototype • ASSAC / DST Assam</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Statewide Automated LULC Intelligence & Change Sentinel
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Real-time multi-sensor (Sentinel-2 optical & Sentinel-1 SAR) earth observation pipeline for 
              automated change detection across Assam's 78,438 sq. km, monitoring eco-sensitive wetlands, 
              Brahmaputra char migrations, and unauthorized hill slicing.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setActiveTab('map-studio')}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-all shadow-lg shadow-emerald-600/30 flex items-center justify-center space-x-2"
            >
              <Layers className="w-4 h-4" />
              <span>Launch Bi-Temporal Studio</span>
            </button>
            <button
              onClick={() => setActiveTab('proposal')}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 font-semibold text-xs transition-all flex items-center justify-center space-x-2"
            >
              <span>View NESFIC Proposal</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Decorative Grid Lines */}
        <div className="absolute inset-0 bg-[radial-gradient(#059669_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none"></div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-lg flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400">Total Territory Monitored</p>
            <h3 className="text-2xl font-black text-white mt-1">78,438 <span className="text-xs text-slate-400 font-normal">sq. km</span></h3>
            <p className="text-[11px] text-emerald-400 flex items-center mt-1">
              <CheckCircle2 className="w-3 h-3 mr-1" />
              <span>35 Districts Covered (100%)</span>
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Satellite className="w-6 h-6" />
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-lg flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400">Net Forest Canopy Shift</p>
            <h3 className="text-2xl font-black text-rose-400 mt-1">-142.6 <span className="text-xs text-slate-400 font-normal">sq. km</span></h3>
            <p className="text-[11px] text-rose-300 flex items-center mt-1">
              <ArrowDownRight className="w-3 h-3 mr-1 text-rose-400" />
              <span>Peri-urban hill slicing & thinning</span>
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
            <Trees className="w-6 h-6" />
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-lg flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400">Wetlands & Beels Integrity</p>
            <h3 className="text-2xl font-black text-amber-400 mt-1">87.4% <span className="text-xs text-slate-400 font-normal">preserved</span></h3>
            <p className="text-[11px] text-amber-300 flex items-center mt-1">
              <TrendingDown className="w-3 h-3 mr-1" />
              <span>12.6% encroached / silted</span>
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Droplets className="w-6 h-6" />
          </div>
        </div>

        {/* KPI 4 */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-lg flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400">Active High-Priority Alerts</p>
            <h3 className="text-2xl font-black text-rose-400 mt-1">{MOCK_ALERTS.length} <span className="text-xs text-slate-400 font-normal">active</span></h3>
            <p className="text-[11px] text-slate-400 flex items-center mt-1">
              <Clock className="w-3 h-3 mr-1 text-slate-400" />
              <span>2 pending field verification</span>
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
            <AlertOctagon className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main Content Split: Hotspot Catalog & Live Alert Ticker */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Priority Hotspots Catalog (2 Cols) */}
        <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>Assam High-Priority Vulnerability Hotspots</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Pre-calibrated testbed sectors featuring bi-temporal optical & SAR change feeds
              </p>
            </div>
            <span className="text-xs text-emerald-400 font-mono bg-emerald-950/60 border border-emerald-700/40 px-2 py-0.5 rounded">
              5 Testbeds Calibrated
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ASSAM_HOTSPOTS.map((hotspot) => (
              <div
                key={hotspot.id}
                onClick={() => {
                  onSelectHotspot(hotspot);
                  setActiveTab('map-studio');
                }}
                className="group p-4 rounded-xl bg-slate-950/80 hover:bg-slate-800/80 border border-slate-800 hover:border-emerald-500/50 transition-all cursor-pointer shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                        hotspot.severity === 'Critical' 
                          ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                          : hotspot.severity === 'High'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      }`}>
                        {hotspot.threatType} • {hotspot.severity}
                      </span>
                      <h4 className="text-sm font-bold text-white mt-2 group-hover:text-emerald-300 transition-colors">
                        {hotspot.name}
                      </h4>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>

                  <p className="text-xs text-slate-400 mt-1.5 line-clamp-2">
                    {hotspot.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <div className="text-slate-400">
                    <span className="text-slate-500">District:</span> <strong className="text-slate-300">{hotspot.district}</strong>
                  </div>
                  <div className="text-rose-400 font-semibold font-mono">
                    Δ {hotspot.areaDeltaHectares} ha
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Encroachment Alerts Feed (1 Col) */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <AlertOctagon className="w-4 h-4 text-rose-400" />
                <span>Recent Anomaly Queue</span>
              </h3>
              <button
                onClick={() => setActiveTab('alerts')}
                className="text-xs text-rose-400 hover:text-rose-300 font-medium flex items-center"
              >
                <span>View All</span>
                <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
              </button>
            </div>

            <div className="space-y-3">
              {MOCK_ALERTS.slice(0, 3).map((alert) => (
                <div 
                  key={alert.id}
                  onClick={() => onOpenAlertDossier(alert)}
                  className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 hover:bg-slate-800/40 transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-mono text-slate-400">{alert.id}</span>
                    <span className={`px-1.5 py-0.5 rounded font-semibold text-[10px] ${
                      alert.severity === 'Critical' ? 'bg-rose-950 text-rose-300 border border-rose-800' : 'bg-amber-950 text-amber-300 border border-amber-800'
                    }`}>
                      {alert.severity}
                    </span>
                  </div>
                  <h5 className="text-xs font-bold text-slate-200 mt-1 hover:text-white transition-colors">
                    {alert.title}
                  </h5>
                  <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
                    <span>{alert.district}</span>
                    <span className="text-emerald-400 font-semibold font-mono">
                      Conf: {alert.confidence}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-800">
            <button
              onClick={() => setActiveTab('alerts')}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-colors flex items-center justify-center space-x-1.5"
            >
              <span>Manage All Enforcement Actions</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

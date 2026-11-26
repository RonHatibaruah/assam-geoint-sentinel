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
      <div className="relative overflow-hidden rounded-2xl bg-gray-200/85 border border-gray-300 p-6 shadow-sm">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gray-100 border border-gray-300 text-gray-800 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping"></span>
              <span>NESFIC-D-21 • Lead Applicant: Kalyanjit Hatibaruah (Flugelsoft Labs) • ASSAC / DST Assam</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
              Statewide Automated LULC Intelligence & Change Sentinel
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              Real-time multi-sensor (Sentinel-2 optical & Sentinel-1 SAR) earth observation pipeline for 
              automated change detection across Assam's 78,438 sq. km, monitoring eco-sensitive wetlands, 
              Brahmaputra char migrations, and unauthorized hill slicing.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="/map-studio"
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
                  e.preventDefault();
                  setActiveTab('map-studio');
                }
              }}
              title="Launch Bi-Temporal Map Studio"
              className="px-4 py-2.5 rounded-xl bg-gray-800 hover:bg-gray-900 text-white font-semibold text-xs transition-all shadow-sm flex items-center justify-center space-x-2"
            >
              <Layers className="w-4 h-4" />
              <span>Launch Bi-Temporal Studio</span>
            </a>
            <a
              href="/proposal"
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
                  e.preventDefault();
                  setActiveTab('proposal');
                }
              }}
              title="View NESFIC-D-21 Proposal Submission Dossier"
              className="px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-300 text-gray-900 border border-gray-300 font-semibold text-xs transition-all flex items-center justify-center space-x-2 shadow-xs"
            >
              <span>View NESFIC Proposal</span>
              <ArrowUpRight className="w-4 h-4 text-gray-700" />
            </a>
          </div>
        </div>

        {/* Decorative Grid Lines */}
        <div className="absolute inset-0 bg-[radial-gradient(#374151_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none"></div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="bg-gray-50 border border-gray-300 rounded-xl p-4 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-600">Total Territory Monitored</p>
            <h3 className="text-2xl font-black text-gray-900 mt-1">78,438 <span className="text-xs text-gray-500 font-normal">sq. km</span></h3>
            <p className="text-[11px] text-emerald-800 flex items-center mt-1 font-medium">
              <CheckCircle2 className="w-3 h-3 mr-1" />
              <span>35 Districts Covered (100%)</span>
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-gray-200 border border-gray-300 flex items-center justify-center text-gray-700">
            <Satellite className="w-6 h-6" />
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-gray-50 border border-gray-300 rounded-xl p-4 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-600">Net Forest Canopy Shift</p>
            <h3 className="text-2xl font-black text-rose-700 mt-1">-142.6 <span className="text-xs text-gray-500 font-normal">sq. km</span></h3>
            <p className="text-[11px] text-rose-800 flex items-center mt-1 font-medium">
              <ArrowDownRight className="w-3 h-3 mr-1 text-rose-700" />
              <span>Peri-urban hill slicing & thinning</span>
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-gray-200 border border-gray-300 flex items-center justify-center text-rose-700">
            <Trees className="w-6 h-6" />
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-gray-50 border border-gray-300 rounded-xl p-4 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-600">Wetlands & Beels Integrity</p>
            <h3 className="text-2xl font-black text-amber-800 mt-1">87.4% <span className="text-xs text-gray-500 font-normal">preserved</span></h3>
            <p className="text-[11px] text-amber-900 flex items-center mt-1 font-medium">
              <TrendingDown className="w-3 h-3 mr-1" />
              <span>12.6% encroached / silted</span>
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-gray-200 border border-gray-300 flex items-center justify-center text-amber-800">
            <Droplets className="w-6 h-6" />
          </div>
        </div>

        {/* KPI 4 */}
        <div className="bg-gray-50 border border-gray-300 rounded-xl p-4 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-600">Active High-Priority Alerts</p>
            <h3 className="text-2xl font-black text-rose-700 mt-1">{MOCK_ALERTS.length} <span className="text-xs text-gray-500 font-normal">active</span></h3>
            <p className="text-[11px] text-gray-700 flex items-center mt-1 font-medium">
              <Clock className="w-3 h-3 mr-1 text-gray-600" />
              <span>2 pending field verification</span>
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-gray-200 border border-gray-300 flex items-center justify-center text-rose-700">
            <AlertOctagon className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main Content Split: Hotspot Catalog & Live Alert Ticker */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Priority Hotspots Catalog (2 Cols) */}
        <div className="lg:col-span-2 bg-gray-50 border border-gray-300 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-gray-900 flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-gray-800" />
                <span>Assam High-Priority Vulnerability Hotspots</span>
              </h3>
              <p className="text-xs text-gray-600 mt-0.5">
                Pre-calibrated testbed sectors featuring bi-temporal optical & SAR change feeds
              </p>
            </div>
            <span className="text-xs text-gray-800 font-mono bg-gray-200 border border-gray-300 px-2.5 py-0.5 rounded font-semibold">
              5 Testbeds Calibrated
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ASSAM_HOTSPOTS.map((hotspot) => (
              <a
                key={hotspot.id}
                href={`/map-studio?hotspot=${encodeURIComponent(hotspot.id)}`}
                onClick={(e) => {
                  if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
                    e.preventDefault();
                    onSelectHotspot(hotspot);
                    setActiveTab('map-studio');
                  }
                }}
                title={`Inspect ${hotspot.name} in Map Studio`}
                className="group p-4 rounded-xl bg-gray-100/90 hover:bg-gray-200/80 border border-gray-300 hover:border-gray-400 transition-all cursor-pointer shadow-xs flex flex-col justify-between block"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                        hotspot.severity === 'Critical' 
                          ? 'bg-rose-100 text-rose-800 border border-rose-300'
                          : hotspot.severity === 'High'
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : 'bg-gray-200 text-gray-800 border border-gray-300'
                      }`}>
                        {hotspot.threatType} • {hotspot.severity}
                      </span>
                      <h4 className="text-sm font-bold text-gray-900 mt-2 group-hover:text-black transition-colors">
                        {hotspot.name}
                      </h4>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-gray-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>

                  <p className="text-xs text-gray-600 mt-1.5 line-clamp-2">
                    {hotspot.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-200 flex items-center justify-between text-xs">
                  <div className="text-gray-600">
                    <span className="text-gray-500">District:</span> <strong className="text-gray-800">{hotspot.district}</strong>
                  </div>
                  <div className="text-rose-700 font-bold font-mono">
                    Δ {hotspot.areaDeltaHectares} ha
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Active Encroachment Alerts Feed (1 Col) */}
        <div className="bg-gray-50 border border-gray-300 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-gray-900 flex items-center space-x-2">
                <AlertOctagon className="w-4 h-4 text-rose-700" />
                <span>Recent Anomaly Queue</span>
              </h3>
              <a
                href="/alerts"
                onClick={(e) => {
                  if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
                    e.preventDefault();
                    setActiveTab('alerts');
                  }
                }}
                title="View All Land-Use Anomaly Alerts"
                className="text-xs text-rose-700 hover:text-rose-900 font-semibold flex items-center"
              >
                <span>View All</span>
                <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
              </a>
            </div>

            <div className="space-y-3">
              {MOCK_ALERTS.slice(0, 3).map((alert) => (
                <a 
                  key={alert.id}
                  href={`/alerts?alert=${encodeURIComponent(alert.id)}`}
                  onClick={(e) => {
                    if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
                      e.preventDefault();
                      onOpenAlertDossier(alert);
                    }
                  }}
                  title={`View Field Inspection Dossier for ${alert.title}`}
                  className="p-3.5 rounded-xl bg-gray-100 border border-gray-300 hover:border-gray-400 hover:bg-gray-200/70 transition-all cursor-pointer shadow-xs block"
                >
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-mono text-gray-600 font-semibold">{alert.id}</span>
                    <span className={`px-1.5 py-0.5 rounded font-semibold text-[10px] ${
                      alert.severity === 'Critical' ? 'bg-rose-100 text-rose-800 border border-rose-300' : 'bg-amber-100 text-amber-900 border border-amber-300'
                    }`}>
                      {alert.severity}
                    </span>
                  </div>
                  <h5 className="text-xs font-bold text-gray-900 mt-1 hover:text-black transition-colors">
                    {alert.title}
                  </h5>
                  <div className="mt-2 flex items-center justify-between text-[11px] text-gray-600">
                    <span>{alert.district}</span>
                    <span className="text-emerald-800 font-semibold font-mono">
                      Conf: {alert.confidence}%
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200">
            <a
              href="/alerts"
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
                  e.preventDefault();
                  setActiveTab('alerts');
                }
              }}
              title="Manage All Assam Enforcement Actions"
              className="w-full py-2.5 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-900 border border-gray-300 font-semibold text-xs transition-colors flex items-center justify-center space-x-1.5 shadow-2xs"
            >
              <span>Manage All Enforcement Actions</span>
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

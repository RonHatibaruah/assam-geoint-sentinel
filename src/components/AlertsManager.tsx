import React, { useState } from 'react';
import { 
  AlertOctagon, 
  Search, 
  Filter, 
  MapPin, 
  Calendar, 
  UserCheck, 
  FileCheck2, 
  Eye, 
  CheckCircle2, 
  Clock, 
  AlertTriangle,
  ArrowUpRight,
  ShieldAlert
} from 'lucide-react';
import { MOCK_ALERTS, AnomalyAlert } from '../data/mockAlerts';

interface AlertsManagerProps {
  onOpenDossier: (alert: AnomalyAlert) => void;
}

export const AlertsManager: React.FC<AlertsManagerProps> = ({ onOpenDossier }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [severityFilter, setSeverityFilter] = useState<string>('All');
  const [districtFilter, setDistrictFilter] = useState<string>('All');

  const filteredAlerts = MOCK_ALERTS.filter((alert) => {
    const matchesSearch = 
      alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.cadastralPlot.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSeverity = severityFilter === 'All' || alert.severity === severityFilter;
    const matchesDistrict = districtFilter === 'All' || alert.district === districtFilter;

    return matchesSearch && matchesSeverity && matchesDistrict;
  });

  return (
    <div className="space-y-6">
      {/* Header and Summary Cards */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white flex items-center space-x-2">
            <ShieldAlert className="w-6 h-6 text-rose-500" />
            <span>Assam Land-Use Anomaly & Encroachment Alert Queue</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            AI-flagged unauthorized land-cover conversions with cadastral survey plot correlation and field verification tracking
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-400">Total Flagged:</span>
          <span className="px-2.5 py-1 rounded-lg bg-rose-950 border border-rose-800 text-rose-300 font-mono font-bold text-xs">
            {MOCK_ALERTS.length} Active Hotspots
          </span>
        </div>
      </div>

      {/* Stats Summary Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5">
          <span className="text-[11px] text-slate-400 font-medium">Critical Violations</span>
          <p className="text-xl font-black text-rose-400 mt-0.5">
            {MOCK_ALERTS.filter(a => a.severity === 'Critical').length} Cases
          </p>
          <span className="text-[10px] text-rose-300">Hill cutting & Ramsar encroachment</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5">
          <span className="text-[11px] text-slate-400 font-medium">Pending Ground Truth</span>
          <p className="text-xl font-black text-amber-400 mt-0.5">
            {MOCK_ALERTS.filter(a => a.status === 'Pending Verification').length} Cases
          </p>
          <span className="text-[10px] text-amber-300">Awaiting Circle Officer survey</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5">
          <span className="text-[11px] text-slate-400 font-medium">Notices Issued</span>
          <p className="text-xl font-black text-sky-400 mt-0.5">
            {MOCK_ALERTS.filter(a => a.status === 'Notice Issued').length} Cases
          </p>
          <span className="text-[10px] text-sky-300">Legal injunction active</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5">
          <span className="text-[11px] text-slate-400 font-medium">Avg AI Confidence</span>
          <p className="text-xl font-black text-emerald-400 mt-0.5">94.3%</p>
          <span className="text-[10px] text-emerald-300">ChangeFormer Bi-Temporal</span>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by Alert ID, District, Dag No, or Keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center space-x-3 w-full md:w-auto">
          <div className="flex items-center space-x-1.5">
            <span className="text-slate-400">Severity:</span>
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-emerald-500"
            >
              <option value="All">All Severities</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
            </select>
          </div>

          <div className="flex items-center space-x-1.5">
            <span className="text-slate-400">District:</span>
            <select
              value={districtFilter}
              onChange={(e) => setDistrictFilter(e.target.value)}
              className="bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-emerald-500"
            >
              <option value="All">All Districts</option>
              <option value="Kamrup Metropolitan">Kamrup Metropolitan</option>
              <option value="Majuli">Majuli</option>
              <option value="Golaghat">Golaghat</option>
              <option value="Dibrugarh">Dibrugarh</option>
            </select>
          </div>
        </div>
      </div>

      {/* Alert Cards Grid */}
      <div className="space-y-4">
        {filteredAlerts.map((alert) => (
          <div
            key={alert.id}
            className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl hover:border-slate-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-5"
          >
            <div className="space-y-2 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="font-mono text-slate-400 font-bold bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                  {alert.id}
                </span>
                <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                  alert.severity === 'Critical'
                    ? 'bg-rose-950 text-rose-300 border border-rose-800'
                    : alert.severity === 'High'
                    ? 'bg-amber-950 text-amber-300 border border-amber-800'
                    : 'bg-blue-950 text-blue-300 border border-blue-800'
                }`}>
                  {alert.severity} SEVERITY
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-medium text-[11px]">
                  {alert.category}
                </span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-400 flex items-center text-[11px]">
                  <Calendar className="w-3 h-3 mr-1" />
                  Detected: {alert.detectedDate}
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-white">
                  {alert.title}
                </h3>
                <p className="text-xs text-emerald-400 font-medium">
                  {alert.titleAssamese}
                </p>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {alert.description}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 text-[11px] text-slate-400">
                <div>
                  <span className="text-slate-500">Jurisdiction:</span>{' '}
                  <strong className="text-slate-200">{alert.circle}, {alert.district}</strong>
                </div>
                <div>
                  <span className="text-slate-500">Cadastral Plot:</span>{' '}
                  <strong className="text-amber-300 font-mono">{alert.cadastralPlot}</strong>
                </div>
                <div>
                  <span className="text-slate-500">Area Affected:</span>{' '}
                  <strong className="text-rose-400 font-mono">Δ {alert.affectedAreaHectares} ha</strong>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 md:items-end flex-shrink-0">
              <div className="text-right hidden md:block">
                <span className="text-[10px] text-slate-500 block">AI Confidence Score</span>
                <span className="text-sm font-black font-mono text-emerald-400">
                  {alert.confidence}%
                </span>
              </div>

              <button
                onClick={() => onOpenDossier(alert)}
                className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-all shadow-lg shadow-rose-600/20 flex items-center justify-center space-x-1.5"
              >
                <FileCheck2 className="w-4 h-4" />
                <span>Generate Official Dossier</span>
              </button>
            </div>
          </div>
        ))}

        {filteredAlerts.length === 0 && (
          <div className="p-12 text-center bg-slate-900 border border-slate-800 rounded-2xl text-slate-400 text-xs">
            No anomaly alerts match your search or filter criteria.
          </div>
        )}
      </div>
    </div>
  );
};

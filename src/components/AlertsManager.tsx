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
          <h2 className="text-xl font-black text-gray-900 flex items-center space-x-2">
            <ShieldAlert className="w-6 h-6 text-rose-600" />
            <span>Assam Land-Use Anomaly & Encroachment Alert Queue</span>
          </h2>
          <p className="text-xs text-gray-600 mt-0.5">
            AI-flagged unauthorized land-cover conversions with cadastral survey plot correlation and field verification tracking
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-600 font-medium">Total Flagged:</span>
          <span className="px-2.5 py-1 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 font-mono font-bold text-xs">
            {MOCK_ALERTS.length} Active Hotspots
          </span>
        </div>
      </div>

      {/* Stats Summary Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-50 border border-gray-300 rounded-xl p-3.5 shadow-xs">
          <span className="text-[11px] text-gray-600 font-medium">Critical Violations</span>
          <p className="text-xl font-black text-rose-600 mt-0.5">
            {MOCK_ALERTS.filter(a => a.severity === 'Critical').length} Cases
          </p>
          <span className="text-[10px] text-rose-700 font-medium">Hill cutting & Ramsar encroachment</span>
        </div>

        <div className="bg-gray-50 border border-gray-300 rounded-xl p-3.5 shadow-xs">
          <span className="text-[11px] text-gray-600 font-medium">Pending Ground Truth</span>
          <p className="text-xl font-black text-amber-600 mt-0.5">
            {MOCK_ALERTS.filter(a => a.status === 'Pending Verification').length} Cases
          </p>
          <span className="text-[10px] text-amber-700 font-medium">Awaiting Circle Officer survey</span>
        </div>

        <div className="bg-gray-50 border border-gray-300 rounded-xl p-3.5 shadow-xs">
          <span className="text-[11px] text-gray-600 font-medium">Notices Issued</span>
          <p className="text-xl font-black text-sky-700 mt-0.5">
            {MOCK_ALERTS.filter(a => a.status === 'Notice Issued').length} Cases
          </p>
          <span className="text-[10px] text-sky-700 font-medium">Legal injunction active</span>
        </div>

        <div className="bg-gray-50 border border-gray-300 rounded-xl p-3.5 shadow-xs">
          <span className="text-[11px] text-gray-600 font-medium">Avg AI Confidence</span>
          <p className="text-xl font-black text-emerald-700 mt-0.5">94.3%</p>
          <span className="text-[10px] text-emerald-700 font-medium">ChangeFormer Bi-Temporal</span>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-gray-50 border border-gray-300 rounded-xl p-3 flex flex-col md:flex-row items-center justify-between gap-3 text-xs shadow-xs">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by Alert ID, District, Dag No, or Keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-100 border border-gray-300 rounded-lg pl-9 pr-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-500 shadow-xs"
          />
        </div>

        <div className="flex items-center space-x-3 w-full md:w-auto">
          <div className="flex items-center space-x-1.5">
            <span className="text-gray-700 font-medium">Severity:</span>
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="bg-gray-100 border border-gray-300 rounded-lg px-2.5 py-1.5 text-gray-900 focus:outline-none focus:border-gray-500 shadow-xs"
            >
              <option value="All">All Severities</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
            </select>
          </div>

          <div className="flex items-center space-x-1.5">
            <span className="text-gray-700 font-medium">District:</span>
            <select
              value={districtFilter}
              onChange={(e) => setDistrictFilter(e.target.value)}
              className="bg-gray-100 border border-gray-300 rounded-lg px-2.5 py-1.5 text-gray-900 focus:outline-none focus:border-gray-500 shadow-xs"
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
            className="bg-gray-50 border border-gray-300 rounded-2xl p-5 shadow-xs hover:border-gray-400 transition-all flex flex-col md:flex-row md:items-center justify-between gap-5"
          >
            <div className="space-y-2 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="font-mono text-gray-700 font-bold bg-gray-200 px-2 py-0.5 rounded border border-gray-300">
                  {alert.id}
                </span>
                <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                  alert.severity === 'Critical'
                    ? 'bg-rose-100 text-rose-700 border border-rose-200'
                    : alert.severity === 'High'
                    ? 'bg-amber-100 text-amber-800 border border-amber-200'
                    : 'bg-sky-100 text-sky-800 border border-sky-200'
                }`}>
                  {alert.severity} SEVERITY
                </span>
                <span className="px-2 py-0.5 rounded bg-gray-200 text-gray-700 font-medium text-[11px] border border-gray-300">
                  {alert.category}
                </span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-600 flex items-center text-[11px]">
                  <Calendar className="w-3 h-3 mr-1" />
                  Detected: {alert.detectedDate}
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-gray-900">
                  {alert.title}
                </h3>
                <p className="text-xs text-emerald-700 font-semibold">
                  {alert.titleAssamese}
                </p>
              </div>

              <p className="text-xs text-gray-700 leading-relaxed">
                {alert.description}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 text-[11px] text-gray-700">
                <div>
                  <span className="text-gray-500">Jurisdiction:</span>{' '}
                  <strong className="text-gray-900">{alert.circle}, {alert.district}</strong>
                </div>
                <div>
                  <span className="text-gray-500">Cadastral Plot:</span>{' '}
                  <strong className="text-amber-800 font-mono font-semibold">{alert.cadastralPlot}</strong>
                </div>
                <div>
                  <span className="text-gray-500">Area Affected:</span>{' '}
                  <strong className="text-rose-600 font-mono font-bold">Δ {alert.affectedAreaHectares} ha</strong>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 md:items-end flex-shrink-0">
              <div className="text-right hidden md:block">
                <span className="text-[10px] text-gray-500 block font-medium">AI Confidence Score</span>
                <span className="text-sm font-black font-mono text-emerald-700">
                  {alert.confidence}%
                </span>
              </div>

              <button
                onClick={() => onOpenDossier(alert)}
                className="px-4 py-2.5 rounded-xl bg-gray-800 hover:bg-gray-900 text-white font-bold text-xs transition-all shadow-xs flex items-center justify-center space-x-1.5"
              >
                <FileCheck2 className="w-4 h-4" />
                <span>Generate Official Dossier</span>
              </button>
            </div>
          </div>
        ))}

        {filteredAlerts.length === 0 && (
          <div className="p-12 text-center bg-gray-50 border border-gray-300 rounded-2xl text-gray-500 text-xs shadow-xs">
            No anomaly alerts match your search or filter criteria.
          </div>
        )}
      </div>
    </div>
  );
};

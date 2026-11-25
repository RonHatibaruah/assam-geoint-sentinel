import React, { useState } from 'react';
import { 
  X, 
  Printer, 
  Download, 
  ShieldCheck, 
  AlertTriangle, 
  MapPin, 
  Calendar, 
  FileCheck2, 
  QrCode,
  CheckCircle2
} from 'lucide-react';
import { AnomalyAlert } from '../data/mockAlerts';
import confetti from 'canvas-confetti';

interface InspectionDossierModalProps {
  alert: AnomalyAlert | null;
  onClose: () => void;
}

export const InspectionDossierModal: React.FC<InspectionDossierModalProps> = ({ alert, onClose }) => {
  const [issued, setIssued] = useState<boolean>(false);

  if (!alert) return null;

  const handleIssueNotice = () => {
    setIssued(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Action Header */}
        <div className="bg-slate-50 px-6 py-3.5 border-b border-slate-200 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2 text-slate-700">
            <span className="font-mono text-emerald-700 font-bold">
              {alert.id}
            </span>
            <span className="text-slate-300">|</span>
            <span className="font-medium">Geospatial Inspection Dossier (Statutory Notice Format)</span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 font-medium flex items-center space-x-1.5 transition-colors shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Dossier</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-500 hover:text-slate-800 border border-slate-200 transition-colors shadow-sm"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Official Printable Document Content */}
        <div className="p-8 space-y-6 text-slate-800 print:text-black print:bg-white text-xs">
          {/* Document Letterhead */}
          <div className="text-center border-b border-slate-200 pb-5 space-y-1">
            <div className="flex justify-center mb-1">
              <span className="px-3 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold text-[10px] uppercase tracking-wider">
                Government of Assam • Statutory Land Administration Notice
              </span>
            </div>
            <h1 className="text-lg font-black text-slate-900 tracking-wide">
              ASSAM STATE SPACE APPLICATION CENTRE (ASSAC)
            </h1>
            <p className="text-[11px] text-slate-500">
              Department of Science & Technology, Government of Assam • Bigyan Bhawan, GS Road, Guwahati
            </p>
            <p className="text-[10px] font-mono text-amber-800 font-semibold">
              Ref: ASSAC/GEO-AI/NESFIC-D21/ENCR-{alert.id.split('-').pop()} • Date: {alert.detectedDate}
            </p>
          </div>

          {/* Recipient Circle Officer */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">To The Designated Enforcement Authority:</span>
                <p className="font-bold text-slate-900 text-sm mt-0.5">{alert.assignedOfficer}</p>
                <p className="text-slate-600">{alert.circle}, District: {alert.district}, Assam</p>
              </div>
              <div className="text-right">
                <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                  alert.severity === 'Critical' ? 'bg-rose-100 text-rose-700 border border-rose-200' : 'bg-amber-100 text-amber-800 border border-amber-200'
                }`}>
                  {alert.severity} Priority
                </span>
              </div>
            </div>
          </div>

          {/* Subject Line */}
          <div>
            <p className="font-bold text-slate-900 text-sm">
              <span className="underline">Subject:</span> Immediate Field Verification Injunction against Unauthorized Land-Cover Conversion ({alert.title})
            </p>
            <p className="text-slate-500 italic text-[11px] mt-0.5">
              বিষয়: উপগ্ৰহ সংকেতৰ ভিত্তিত চিনাক্ত কৰা ভূ-ৰূপান্তৰ / পাহাৰ কটাৰ তদন্ত আৰু ব্যৱস্থা গ্ৰহণ জাননী
            </p>
          </div>

          {/* Technical Findings Grid */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 font-bold text-slate-900 text-xs flex justify-between items-center">
              <span>Section 1: Automated Earth Observation Sensor Diagnostics</span>
              <span className="text-emerald-700 font-mono text-[11px]">AI Confidence: {alert.confidence}%</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y divide-slate-200 text-xs">
              <div className="p-3">
                <span className="text-slate-500 block text-[10px]">Cadastral Parcel:</span>
                <span className="font-mono text-amber-800 font-bold">{alert.cadastralPlot}</span>
              </div>
              <div className="p-3">
                <span className="text-slate-500 block text-[10px]">Centroid Coordinates:</span>
                <span className="font-mono text-slate-800 font-bold">{alert.coordinates[0].toFixed(4)}°N, {alert.coordinates[1].toFixed(4)}°E</span>
              </div>
              <div className="p-3">
                <span className="text-slate-500 block text-[10px]">Area Altered:</span>
                <span className="font-mono text-rose-600 font-bold">
                  {alert.affectedAreaHectares} ha ({(alert.affectedAreaHectares * 7.47).toFixed(1)} Bighas)
                </span>
              </div>
              <div className="p-3">
                <span className="text-slate-500 block text-[10px]">Satellites Used:</span>
                <span className="font-mono text-slate-800">{alert.satelliteSensor}</span>
              </div>
            </div>
          </div>

          {/* Spectral Index Transition Comparison Table */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 font-bold text-slate-900 text-xs">
              Section 2: Biophysical Index Radiometric Shift
            </div>
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                <tr>
                  <th className="p-2.5">Biophysical Index</th>
                  <th className="p-2.5">Pre-Change Baseline</th>
                  <th className="p-2.5">Post-Change Observation</th>
                  <th className="p-2.5">Variance (Delta)</th>
                  <th className="p-2.5">Inference Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr>
                  <td className="p-2.5 font-semibold text-slate-900">NDVI (Vegetation Index)</td>
                  <td className="p-2.5 font-mono text-emerald-700 font-medium">+{alert.ndviBefore.toFixed(2)}</td>
                  <td className="p-2.5 font-mono text-rose-600 font-medium">+{alert.ndviAfter.toFixed(2)}</td>
                  <td className="p-2.5 font-mono text-rose-600 font-bold">{(alert.ndviAfter - alert.ndviBefore).toFixed(2)}</td>
                  <td className="p-2.5 text-rose-600 font-semibold">Critical Canopy Removal</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-semibold text-slate-900">NDBI (Built-up / Bare Soil)</td>
                  <td className="p-2.5 font-mono text-slate-600">{alert.ndbiBefore.toFixed(2)}</td>
                  <td className="p-2.5 font-mono text-amber-700 font-medium">+{alert.ndbiAfter.toFixed(2)}</td>
                  <td className="p-2.5 font-mono text-amber-700 font-bold">+{(alert.ndbiAfter - alert.ndbiBefore).toFixed(2)}</td>
                  <td className="p-2.5 text-amber-700 font-semibold">High Impervious Exposure</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Statutory Directive & Action Mandate */}
          <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 space-y-2 text-slate-700">
            <p className="font-bold text-amber-900 flex items-center space-x-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
              <span>Mandatory Administrative Action Directive:</span>
            </p>
            <p className="leading-relaxed text-[11px]">
              You are hereby directed under provisions of the <strong>Assam Land and Revenue Regulation 1886</strong> and the <strong>Assam Hill Land and Ecological Sites Protection Directives</strong> to conduct a joint on-site inspection of the georeferenced coordinates above within 48 hours. If unauthorized earth excavation, wetland filling, or forest clearing is verified, immediate cease-and-desist orders must be served, and seizure of earth-moving equipment initiated.
            </p>
          </div>

          {/* Signatures & QR Geo-Verification */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-white border border-slate-200 text-slate-700 shadow-sm">
                <QrCode className="w-10 h-10 text-emerald-700" />
              </div>
              <div className="text-[10px] text-slate-500">
                <span className="font-mono text-slate-800 block font-bold">ASSAC-GEO-HASH: 91E-26N-415B</span>
                Scan to verify ground coordinates on official Revenue Field App
              </div>
            </div>

            <div className="text-right">
              <p className="font-bold text-slate-900 text-xs">For Director, ASSAC</p>
              <p className="text-[10px] text-slate-500">Remote Sensing & GIS Analytics Division</p>
              <p className="text-[10px] text-emerald-700 font-mono mt-0.5 font-semibold">Digitally Authenticated (NESFIC-D-21)</p>
            </div>
          </div>
        </div>

        {/* Modal Bottom Controls */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
          <div className="text-xs text-slate-600">
            Current Status: <strong className={issued ? 'text-emerald-700' : 'text-amber-800'}>{issued ? 'NOTICE DISPATCHED' : alert.status}</strong>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 font-semibold text-xs transition-colors shadow-sm"
            >
              Close
            </button>
            <button
              onClick={handleIssueNotice}
              disabled={issued}
              className={`px-5 py-2 rounded-xl font-bold text-xs transition-all flex items-center space-x-2 ${
                issued 
                  ? 'bg-emerald-600 text-white cursor-default' 
                  : 'bg-rose-600 hover:bg-rose-700 text-white shadow-sm'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{issued ? 'Official Notice Dispatched!' : 'Dispatch Formal Notice to DC / DFO'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

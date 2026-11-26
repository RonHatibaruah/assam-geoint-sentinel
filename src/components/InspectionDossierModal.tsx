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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/70 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-gray-50 border border-gray-300 rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Action Header */}
        <div className="bg-gray-200 px-6 py-3.5 border-b border-gray-300 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2 text-gray-700">
            <span className="font-mono text-emerald-800 font-bold">
              {alert.id}
            </span>
            <span className="text-gray-400">|</span>
            <span className="font-medium text-gray-900">Geospatial Inspection Dossier (Statutory Notice Format)</span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-white text-gray-700 border border-gray-300 font-medium flex items-center space-x-1.5 transition-colors shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Dossier</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-gray-100 hover:bg-white text-gray-500 hover:text-gray-800 border border-gray-300 transition-colors shadow-xs"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Official Printable Document Content */}
        <div className="p-8 space-y-6 text-gray-800 print:text-black print:bg-white text-xs">
          {/* Document Letterhead */}
          <div className="text-center border-b border-gray-300 pb-5 space-y-1">
            <div className="flex justify-center mb-1">
              <span className="px-3 py-0.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 font-bold text-[10px] uppercase tracking-wider">
                Government of Assam • Statutory Land Administration Notice
              </span>
            </div>
            <h1 className="text-lg font-black text-gray-900 tracking-wide">
              ASSAM STATE SPACE APPLICATION CENTRE (ASSAC)
            </h1>
            <p className="text-[11px] text-gray-600">
              Department of Science & Technology, Government of Assam • Bigyan Bhawan, GS Road, Guwahati
            </p>
            <p className="text-[10px] font-mono text-amber-800 font-semibold">
              Ref: ASSAC/GEO-AI/NESFIC-D21/ENCR-{alert.id.split('-').pop()} • Date: {alert.detectedDate}
            </p>
          </div>

          {/* Recipient Circle Officer */}
          <div className="bg-gray-100 p-4 rounded-xl border border-gray-300 space-y-1">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">To The Designated Enforcement Authority:</span>
                <p className="font-bold text-gray-900 text-sm mt-0.5">{alert.assignedOfficer}</p>
                <p className="text-gray-600">{alert.circle}, District: {alert.district}, Assam</p>
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
            <p className="font-bold text-gray-900 text-sm">
              <span className="underline">Subject:</span> Immediate Field Verification Injunction against Unauthorized Land-Cover Conversion ({alert.title})
            </p>
            <p className="text-gray-500 italic text-[11px] mt-0.5">
              বিষয়: উপগ্ৰহ সংকেতৰ ভিত্তিত চিনাক্ত কৰা ভূ-ৰূপান্তৰ / পাহাৰ কটাৰ তদন্ত আৰু ব্যৱস্থা গ্ৰহণ জাননী
            </p>
          </div>

          {/* Technical Findings Grid */}
          <div className="border border-gray-300 rounded-xl overflow-hidden">
            <div className="bg-gray-200 px-4 py-2 border-b border-gray-300 font-bold text-gray-900 text-xs flex justify-between items-center">
              <span>Section 1: Automated Earth Observation Sensor Diagnostics</span>
              <span className="text-emerald-800 font-mono text-[11px]">AI Confidence: {alert.confidence}%</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y divide-gray-300 text-xs">
              <div className="p-3">
                <span className="text-gray-500 block text-[10px]">Cadastral Parcel:</span>
                <span className="font-mono text-amber-800 font-bold">{alert.cadastralPlot}</span>
              </div>
              <div className="p-3">
                <span className="text-gray-500 block text-[10px]">Centroid Coordinates:</span>
                <span className="font-mono text-gray-800 font-bold">{alert.coordinates[0].toFixed(4)}°N, {alert.coordinates[1].toFixed(4)}°E</span>
              </div>
              <div className="p-3">
                <span className="text-gray-500 block text-[10px]">Area Altered:</span>
                <span className="font-mono text-rose-600 font-bold">
                  {alert.affectedAreaHectares} ha ({(alert.affectedAreaHectares * 7.47).toFixed(1)} Bighas)
                </span>
              </div>
              <div className="p-3">
                <span className="text-gray-500 block text-[10px]">Satellites Used:</span>
                <span className="font-mono text-gray-800">{alert.satelliteSensor}</span>
              </div>
            </div>
          </div>

          {/* Spectral Index Transition Comparison Table */}
          <div className="border border-gray-300 rounded-xl overflow-hidden">
            <div className="bg-gray-200 px-4 py-2 border-b border-gray-300 font-bold text-gray-900 text-xs">
              Section 2: Biophysical Index Radiometric Shift
            </div>
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-100 text-gray-600 border-b border-gray-300">
                <tr>
                  <th className="p-2.5">Biophysical Index</th>
                  <th className="p-2.5">Pre-Change Baseline</th>
                  <th className="p-2.5">Post-Change Observation</th>
                  <th className="p-2.5">Variance (Delta)</th>
                  <th className="p-2.5">Inference Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-gray-700">
                <tr>
                  <td className="p-2.5 font-semibold text-gray-900">NDVI (Vegetation Index)</td>
                  <td className="p-2.5 font-mono text-emerald-800 font-medium">+{alert.ndviBefore.toFixed(2)}</td>
                  <td className="p-2.5 font-mono text-rose-600 font-medium">+{alert.ndviAfter.toFixed(2)}</td>
                  <td className="p-2.5 font-mono text-rose-600 font-bold">{(alert.ndviAfter - alert.ndviBefore).toFixed(2)}</td>
                  <td className="p-2.5 text-rose-600 font-semibold">Critical Canopy Removal</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-semibold text-gray-900">NDBI (Built-up / Bare Soil)</td>
                  <td className="p-2.5 font-mono text-gray-600">{alert.ndbiBefore.toFixed(2)}</td>
                  <td className="p-2.5 font-mono text-amber-800 font-medium">+{alert.ndbiAfter.toFixed(2)}</td>
                  <td className="p-2.5 font-mono text-amber-800 font-bold">+{(alert.ndbiAfter - alert.ndbiBefore).toFixed(2)}</td>
                  <td className="p-2.5 text-amber-800 font-semibold">High Impervious Exposure</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Statutory Directive & Action Mandate */}
          <div className="p-3.5 rounded-xl bg-gray-100 border border-gray-300 space-y-2 text-gray-700">
            <p className="font-bold text-amber-900 flex items-center space-x-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
              <span>Mandatory Administrative Action Directive:</span>
            </p>
            <p className="leading-relaxed text-[11px]">
              You are hereby directed under provisions of the <strong>Assam Land and Revenue Regulation 1886</strong> and the <strong>Assam Hill Land and Ecological Sites Protection Directives</strong> to conduct a joint on-site inspection of the georeferenced coordinates above within 48 hours. If unauthorized earth excavation, wetland filling, or forest clearing is verified, immediate cease-and-desist orders must be served, and seizure of earth-moving equipment initiated.
            </p>
          </div>

          {/* Signatures & QR Geo-Verification */}
          <div className="pt-4 border-t border-gray-300 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-gray-100 border border-gray-300 text-gray-700 shadow-xs">
                <QrCode className="w-10 h-10 text-emerald-800" />
              </div>
              <div className="text-[10px] text-gray-500">
                <span className="font-mono text-gray-800 block font-bold">ASSAC-GEO-HASH: 91E-26N-415B</span>
                Scan to verify ground coordinates on official Revenue Field App
              </div>
            </div>

            <div className="text-right">
              <p className="font-bold text-gray-900 text-xs">For Director, ASSAC</p>
              <p className="text-[10px] text-gray-500">Remote Sensing & GIS Analytics Division</p>
              <p className="text-[10px] text-emerald-800 font-mono mt-0.5 font-semibold">Digitally Authenticated (NESFIC-D-21)</p>
            </div>
          </div>
        </div>

        {/* Modal Bottom Controls */}
        <div className="bg-gray-200 px-6 py-4 border-t border-gray-300 flex items-center justify-between">
          <div className="text-xs text-gray-600">
            Current Status: <strong className={issued ? 'text-emerald-800' : 'text-amber-800'}>{issued ? 'NOTICE DISPATCHED' : alert.status}</strong>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-white text-gray-700 border border-gray-300 font-semibold text-xs transition-colors shadow-xs"
            >
              Close
            </button>
            <button
              onClick={handleIssueNotice}
              disabled={issued}
              className={`px-5 py-2 rounded-xl font-bold text-xs transition-all flex items-center space-x-2 ${
                issued 
                  ? 'bg-emerald-700 text-white cursor-default' 
                  : 'bg-rose-600 hover:bg-rose-700 text-white shadow-xs'
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

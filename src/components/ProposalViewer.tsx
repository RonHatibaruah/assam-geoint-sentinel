import React, { useState } from 'react';
import { 
  FileText, 
  Copy, 
  Check, 
  Download, 
  ExternalLink, 
  CheckCircle2, 
  BookOpen, 
  Award,
  Hash,
  ChevronRight
} from 'lucide-react';
import { PROPOSAL_SECTIONS, ProposalSection } from '../data/proposalData';
import confetti from 'canvas-confetti';

export const ProposalViewer: React.FC = () => {
  const [selectedSectionId, setSelectedSectionId] = useState<number>(1);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const activeSection = PROPOSAL_SECTIONS.find(s => s.id === selectedSectionId) || PROPOSAL_SECTIONS[0];

  const handleCopy = (section: ProposalSection) => {
    navigator.clipboard.writeText(section.content);
    setCopiedId(section.id);
    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.8 },
    });
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const handleCopyAll = () => {
    const fullText = PROPOSAL_SECTIONS.map(s => `=== ${s.title} ===\n${s.content}\n\n`).join('\n');
    navigator.clipboard.writeText(fullText);
    alert('All 12 proposal sections copied to clipboard!');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-amber-700 text-xs font-bold uppercase tracking-wider mb-1">
            <Award className="w-4 h-4" />
            <span>Official Grant Proposal Dossier • Lead Applicant: Kalyanjit Hatibaruah • Legal Entity: Flugelsoft Labs • NESFIC 2026</span>
          </div>
          <h2 className="text-xl md:text-2xl font-black text-slate-900">
            NESFIC-D-21 Proposal Submission Contents
          </h2>
          <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
            All 12 mandatory government proposal sections engineered to 
            meet the strict Smaller than or equal to 500 words per section requirement. Formatted for direct copy-paste into the Assam Startup NESFIC 2026 submission portal.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleCopyAll}
            className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition-all shadow-sm flex items-center space-x-2"
          >
            <Copy className="w-4 h-4" />
            <span>Copy All 12 Sections</span>
          </button>
        </div>
      </div>

      {/* Main 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Navigation Index (1 col) */}
        <div className="space-y-2">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider px-2">
            Proposal Sections (12)
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-2 space-y-1 shadow-sm">
            {PROPOSAL_SECTIONS.map((section) => (
              <button
                key={section.id}
                onClick={() => setSelectedSectionId(section.id)}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-medium transition-all flex items-center justify-between ${
                  selectedSectionId === section.id
                    ? 'bg-amber-600 text-white font-bold shadow-sm'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <div className="truncate mr-2">
                  <span className="font-mono mr-1.5 opacity-80">{section.id}.</span>
                  <span>{section.title.split('. ')[1]}</span>
                </div>
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                  selectedSectionId === section.id ? 'bg-amber-700 text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  {section.actualWords}w
                </span>
              </button>
            ))}
          </div>

          {/* Supporting Material Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 text-xs space-y-2.5 shadow-sm">
            <h4 className="font-bold text-slate-900 flex items-center space-x-1.5">
              <BookOpen className="w-4 h-4 text-emerald-600" />
              <span>Supporting Evidence Field</span>
            </h4>
            <p className="text-[11px] text-slate-600">
              Proof of Work PDF (Max 10 MB) summary and live demonstration URLs for the portal upload.
            </p>
            <div className="pt-2 border-t border-slate-100 text-[11px] space-y-1 font-mono text-slate-700">
              <div>• Proof of Work PDF: Ready</div>
              <div>• Video URL: Available</div>
              <div>• Live Demo: Running Locally</div>
            </div>
          </div>
        </div>

        {/* Section Detail & Copy View (3 cols) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-4">
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 uppercase tracking-wider">
                  Section {activeSection.id} of 12
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-1.5">
                  {activeSection.title}
                </h3>
              </div>

              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <span className="text-[10px] text-slate-500 block uppercase">Word Count</span>
                  <span className="font-mono text-emerald-700 font-bold text-xs">
                    {activeSection.actualWords} / 500 words
                  </span>
                </div>
                <button
                  onClick={() => handleCopy(activeSection)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                    copiedId === activeSection.id
                      ? 'bg-emerald-600 text-white'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
                  }`}
                >
                  {copiedId === activeSection.id ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy Section</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Official Prompt Question */}
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 italic">
              <strong>Official Portal Prompt:</strong> "{activeSection.promptQuestion}"
            </div>

            {/* Content Display */}
            <div className="space-y-4 text-xs text-slate-800 leading-relaxed font-sans whitespace-pre-line bg-slate-50 p-6 rounded-xl border border-slate-200">
              {activeSection.content}
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs text-slate-500">
              <span className="flex items-center text-emerald-700 font-medium">
                <CheckCircle2 className="w-4 h-4 mr-1.5" />
                <span>Verified Compliance with NESFIC 2026 Guidelines</span>
              </span>

              <div className="flex items-center space-x-2">
                {activeSection.id > 1 && (
                  <button
                    onClick={() => setSelectedSectionId(activeSection.id - 1)}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 font-medium"
                  >
                    Previous Section
                  </button>
                )}
                {activeSection.id < 12 && (
                  <button
                    onClick={() => setSelectedSectionId(activeSection.id + 1)}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 font-medium"
                  >
                    Next Section
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

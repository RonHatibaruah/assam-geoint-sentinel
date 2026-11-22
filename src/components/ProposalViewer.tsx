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
      <div className="bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900 border border-amber-500/30 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Award className="w-4 h-4" />
            <span>Official Grant Proposal Dossier • NESFIC 2026</span>
          </div>
          <h2 className="text-xl md:text-2xl font-black text-white">
            NESFIC-D-21 Proposal Submission Contents
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
            All 12 mandatory government proposal sections engineered to 
            meet the strict &le; 500 words per section requirement. Formatted for direct copy-paste into the Assam Startup NESFIC 2026 submission portal.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleCopyAll}
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition-all shadow-lg shadow-amber-500/20 flex items-center space-x-2"
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
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2">
            Proposal Sections (12)
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-2 space-y-1 shadow-lg">
            {PROPOSAL_SECTIONS.map((section) => (
              <button
                key={section.id}
                onClick={() => setSelectedSectionId(section.id)}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-medium transition-all flex items-center justify-between ${
                  selectedSectionId === section.id
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <div className="truncate mr-2">
                  <span className="font-mono mr-1.5 opacity-80">{section.id}.</span>
                  <span>{section.title.split('. ')[1]}</span>
                </div>
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                  selectedSectionId === section.id ? 'bg-slate-950 text-amber-300' : 'bg-slate-800 text-slate-400'
                }`}>
                  {section.actualWords}w
                </span>
              </button>
            ))}
          </div>

          {/* Supporting Material Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-xs space-y-2.5 shadow-lg">
            <h4 className="font-bold text-white flex items-center space-x-1.5">
              <BookOpen className="w-4 h-4 text-emerald-400" />
              <span>Supporting Evidence Field</span>
            </h4>
            <p className="text-[11px] text-slate-400">
              Proof of Work PDF (Max 10 MB) summary and live demonstration URLs for the portal upload.
            </p>
            <div className="pt-2 border-t border-slate-800 text-[11px] space-y-1 font-mono text-slate-300">
              <div>• Proof of Work PDF: Ready</div>
              <div>• Video URL: Available</div>
              <div>• Live Demo: Running Locally</div>
            </div>
          </div>
        </div>

        {/* Section Detail & Copy View (3 cols) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-4">
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase tracking-wider">
                  Section {activeSection.id} of 12
                </span>
                <h3 className="text-lg font-black text-white mt-1.5">
                  {activeSection.title}
                </h3>
              </div>

              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <span className="text-[10px] text-slate-500 block uppercase">Word Count</span>
                  <span className="font-mono text-emerald-400 font-bold text-xs">
                    {activeSection.actualWords} / 500 words
                  </span>
                </div>
                <button
                  onClick={() => handleCopy(activeSection)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                    copiedId === activeSection.id
                      ? 'bg-emerald-600 text-white'
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30'
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
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-amber-300/90 italic">
              <strong>Official Portal Prompt:</strong> "{activeSection.promptQuestion}"
            </div>

            {/* Content Display */}
            <div className="space-y-4 text-xs text-slate-200 leading-relaxed font-sans whitespace-pre-line bg-slate-950/70 p-6 rounded-xl border border-slate-800">
              {activeSection.content}
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-xs text-slate-400">
              <span className="flex items-center text-emerald-400 font-medium">
                <CheckCircle2 className="w-4 h-4 mr-1.5" />
                <span>Verified Compliance with NESFIC 2026 Guidelines</span>
              </span>

              <div className="flex items-center space-x-2">
                {activeSection.id > 1 && (
                  <button
                    onClick={() => setSelectedSectionId(activeSection.id - 1)}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                  >
                    Previous Section
                  </button>
                )}
                {activeSection.id < 12 && (
                  <button
                    onClick={() => setSelectedSectionId(activeSection.id + 1)}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
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

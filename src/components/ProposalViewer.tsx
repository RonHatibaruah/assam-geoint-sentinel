import React, { useState, useEffect } from 'react';
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
  ChevronRight,
  Link2
} from 'lucide-react';
import { PROPOSAL_SECTIONS, ProposalSection } from '../data/proposalData';
import { getRouteFromLocation, updateDocumentSEO, BASE_URL } from '../utils/seoRouter';
import confetti from 'canvas-confetti';

export const ProposalViewer: React.FC = () => {
  const [selectedSectionId, setSelectedSectionId] = useState<number>(() => {
    const { sectionId } = getRouteFromLocation();
    if (sectionId && sectionId >= 1 && sectionId <= 12) {
      return sectionId;
    }
    return 1;
  });
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const activeSection = PROPOSAL_SECTIONS.find(s => s.id === selectedSectionId) || PROPOSAL_SECTIONS[0];

  const handleSelectSection = (id: number) => {
    setSelectedSectionId(id);
    const sec = PROPOSAL_SECTIONS.find(s => s.id === id);
    window.history.pushState(null, '', `/proposal?section=${id}`);
    if (sec) {
      updateDocumentSEO('proposal', { sectionTitle: sec.title });
    }
  };

  const handleCopySectionLink = () => {
    const linkUrl = `${BASE_URL}/proposal?section=${activeSection.id}`;
    navigator.clipboard.writeText(linkUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

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
      <div className="bg-gray-50 border border-gray-300 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-amber-800 text-xs font-bold uppercase tracking-wider mb-1">
            <Award className="w-4 h-4" />
            <span>Official Grant Proposal Dossier • Lead Applicant: Kalyanjit Hatibaruah • Legal Entity: Flugelsoft Labs • NESFIC 2026</span>
          </div>
          <h2 className="text-xl md:text-2xl font-black text-gray-900">
            NESFIC-D-21 Proposal Submission Contents
          </h2>
          <p className="text-xs text-gray-600 mt-1 max-w-2xl leading-relaxed">
            All 12 mandatory government proposal sections engineered to 
            meet the strict Smaller than or equal to 500 words per section requirement. Formatted for direct copy-paste into the Assam Startup NESFIC 2026 submission portal.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleCopyAll}
            className="px-4 py-2.5 rounded-xl bg-gray-800 hover:bg-gray-900 text-white font-bold text-xs transition-all shadow-xs flex items-center space-x-2"
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
          <div className="text-xs font-bold text-gray-500 uppercase tracking-wider px-2">
            Proposal Sections (12)
          </div>
          <div className="bg-gray-50 border border-gray-300 rounded-2xl p-2 space-y-1 shadow-xs">
            {PROPOSAL_SECTIONS.map((section) => (
              <a
                key={section.id}
                href={`/proposal?section=${section.id}`}
                onClick={(e) => {
                  if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
                    e.preventDefault();
                    handleSelectSection(section.id);
                  }
                }}
                title={section.title}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-medium transition-all flex items-center justify-between block ${
                  selectedSectionId === section.id
                    ? 'bg-gray-800 text-white font-bold shadow-xs'
                    : 'text-gray-700 hover:text-gray-950 hover:bg-gray-200/80'
                }`}
              >
                <div className="truncate mr-2">
                  <span className="font-mono mr-1.5 opacity-80">{section.id}.</span>
                  <span>{section.title.split('. ')[1]}</span>
                </div>
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                  selectedSectionId === section.id ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-700'
                }`}>
                  {section.actualWords}w
                </span>
              </a>
            ))}
          </div>

          {/* Supporting Material Card */}
          <div className="bg-gray-50 border border-gray-300 rounded-2xl p-4 text-xs space-y-2.5 shadow-xs">
            <h4 className="font-bold text-gray-900 flex items-center space-x-1.5">
              <BookOpen className="w-4 h-4 text-emerald-600" />
              <span>Supporting Evidence Field</span>
            </h4>
            <p className="text-[11px] text-gray-600">
              Proof of Work PDF (Max 10 MB) summary and live demonstration URLs for the portal upload.
            </p>
            <div className="pt-2 border-t border-gray-200 text-[11px] space-y-1 font-mono text-gray-700">
              <div>• Proof of Work PDF: Ready</div>
              <div>• Video URL: Available</div>
              <div>• Live Demo: Running Locally</div>
            </div>
          </div>
        </div>

        {/* Section Detail & Copy View (3 cols) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-gray-50 border border-gray-300 rounded-2xl p-6 shadow-xs space-y-5">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-200 gap-4">
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-gray-200 text-gray-800 border border-gray-300 uppercase tracking-wider">
                  Section {activeSection.id} of 12
                </span>
                <h3 className="text-lg font-black text-gray-900 mt-1.5">
                  {activeSection.title}
                </h3>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handleCopySectionLink}
                  title="Copy permanent shareable link to this section"
                  className="px-3 py-2 rounded-xl text-xs font-semibold bg-gray-200 hover:bg-gray-300 text-gray-800 border border-gray-300 transition-all flex items-center space-x-1 shadow-2xs"
                >
                  <Link2 className="w-3.5 h-3.5 text-gray-600" />
                  <span>{copiedLink ? 'Link Copied!' : 'Share Link'}</span>
                </button>

                <div className="text-right px-2">
                  <span className="text-[10px] text-gray-500 block uppercase">Word Count</span>
                  <span className="font-mono text-emerald-700 font-bold text-xs">
                    {activeSection.actualWords} / 500 words
                  </span>
                </div>

                <button
                  onClick={() => handleCopy(activeSection)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                    copiedId === activeSection.id
                      ? 'bg-emerald-700 text-white'
                      : 'bg-gray-800 hover:bg-gray-900 text-white shadow-xs'
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
            <div className="p-3.5 rounded-xl bg-gray-100 border border-gray-300 text-xs text-gray-800 italic">
              <strong>Official Portal Prompt:</strong> "{activeSection.promptQuestion}"
            </div>

            {/* Content Display */}
            <div className="space-y-4 text-xs text-gray-900 leading-relaxed font-sans whitespace-pre-line bg-gray-100 p-6 rounded-xl border border-gray-300">
              {activeSection.content}
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200 text-xs text-gray-500">
              <span className="flex items-center text-emerald-700 font-medium">
                <CheckCircle2 className="w-4 h-4 mr-1.5" />
                <span>Verified Compliance with NESFIC 2026 Guidelines</span>
              </span>

              <div className="flex items-center space-x-2">
                {activeSection.id > 1 && (
                  <a
                    href={`/proposal?section=${activeSection.id - 1}`}
                    onClick={(e) => {
                      if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
                        e.preventDefault();
                        handleSelectSection(activeSection.id - 1);
                      }
                    }}
                    className="px-3 py-1.5 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 border border-gray-300 font-medium text-xs"
                  >
                    Previous Section
                  </a>
                )}
                {activeSection.id < 12 && (
                  <a
                    href={`/proposal?section=${activeSection.id + 1}`}
                    onClick={(e) => {
                      if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
                        e.preventDefault();
                        handleSelectSection(activeSection.id + 1);
                      }
                    }}
                    className="px-3 py-1.5 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 border border-gray-300 font-medium text-xs"
                  >
                    Next Section
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

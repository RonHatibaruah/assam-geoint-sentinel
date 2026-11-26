import React, { useState, useEffect, useCallback } from 'react';
import { Navbar, TabType } from './components/Navbar';
import { DashboardView } from './components/DashboardView';
import { MapStudioView } from './components/MapStudioView';
import { AlertsManager } from './components/AlertsManager';
import { ModelPlayground } from './components/ModelPlayground';
import { GalleryView } from './components/GalleryView';
import { ProposalViewer } from './components/ProposalViewer';
import { InspectionDossierModal } from './components/InspectionDossierModal';
import { ASSAM_HOTSPOTS, Hotspot } from './data/assamHotspots';
import { MOCK_ALERTS, AnomalyAlert } from './data/mockAlerts';
import { 
  getRouteFromLocation, 
  updateDocumentSEO, 
  ROUTE_CONFIG 
} from './utils/seoRouter';

export function App() {
  const [activeTab, setActiveTabState] = useState<TabType>('dashboard');
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot>(ASSAM_HOTSPOTS[0]);
  const [activeDossierAlert, setActiveDossierAlert] = useState<AnomalyAlert | null>(null);

  // Sync state from location (popstate or initial load)
  const syncFromLocation = useCallback(() => {
    const { tab, hotspotId, alertId } = getRouteFromLocation();
    setActiveTabState(tab);

    let currentHotspot = ASSAM_HOTSPOTS[0];
    if (hotspotId) {
      const found = ASSAM_HOTSPOTS.find(h => h.id === hotspotId);
      if (found) {
        currentHotspot = found;
        setSelectedHotspot(found);
      }
    }

    let currentAlert: AnomalyAlert | null = null;
    if (alertId) {
      const found = MOCK_ALERTS.find(a => a.id.toLowerCase() === alertId.toLowerCase());
      if (found) {
        currentAlert = found;
        setActiveDossierAlert(found);
      }
    } else {
      setActiveDossierAlert(null);
    }

    // Update SEO
    updateDocumentSEO(tab, {
      hotspotName: tab === 'map-studio' && hotspotId ? currentHotspot.name : undefined,
      alertTitle: currentAlert ? currentAlert.title : undefined,
    });
  }, []);

  // Listen to browser Back/Forward (popstate)
  useEffect(() => {
    syncFromLocation();

    const handlePopState = () => {
      syncFromLocation();
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [syncFromLocation]);

  // Navigate to tab with SEO URL pushState
  const navigateToTab = (tab: TabType, extraQuery?: string) => {
    setActiveTabState(tab);
    const basePath = ROUTE_CONFIG[tab]?.path || '/dashboard';
    const newUrl = extraQuery ? `${basePath}?${extraQuery}` : basePath;

    if (window.location.pathname !== basePath || window.location.search !== (extraQuery ? `?${extraQuery}` : '')) {
      window.history.pushState(null, '', newUrl);
    }

    updateDocumentSEO(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAlertDossier = (alert: AnomalyAlert) => {
    setActiveDossierAlert(alert);
    const basePath = ROUTE_CONFIG[activeTab]?.path || '/alerts';
    window.history.pushState(null, '', `${basePath}?alert=${encodeURIComponent(alert.id)}`);
    updateDocumentSEO(activeTab, { alertTitle: alert.title });
  };

  const handleCloseAlertDossier = () => {
    setActiveDossierAlert(null);
    const basePath = ROUTE_CONFIG[activeTab]?.path || '/alerts';
    window.history.pushState(null, '', basePath);
    updateDocumentSEO(activeTab);
  };

  const handleSelectHotspot = (hotspot: Hotspot) => {
    setSelectedHotspot(hotspot);
    if (activeTab === 'map-studio') {
      window.history.pushState(null, '', `/map-studio?hotspot=${encodeURIComponent(hotspot.id)}`);
      updateDocumentSEO('map-studio', { hotspotName: hotspot.name });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col font-sans">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => navigateToTab(tab)}
        alertCount={MOCK_ALERTS.length}
      />

      {/* Main Viewport Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'dashboard' && (
          <DashboardView
            onSelectHotspot={(hotspot) => {
              setSelectedHotspot(hotspot);
              navigateToTab('map-studio', `hotspot=${encodeURIComponent(hotspot.id)}`);
            }}
            setActiveTab={(tab) => navigateToTab(tab)}
            onOpenAlertDossier={handleOpenAlertDossier}
          />
        )}

        {activeTab === 'map-studio' && (
          <MapStudioView
            selectedHotspot={selectedHotspot}
            onSelectHotspot={handleSelectHotspot}
            onOpenDossier={handleOpenAlertDossier}
          />
        )}

        {activeTab === 'alerts' && (
          <AlertsManager
            onOpenDossier={handleOpenAlertDossier}
          />
        )}

        {activeTab === 'playground' && (
          <ModelPlayground />
        )}

        {activeTab === 'gallery' && (
          <GalleryView />
        )}

        {activeTab === 'proposal' && (
          <ProposalViewer />
        )}
      </main>

      {/* Field Inspection Dossier Modal */}
      <InspectionDossierModal
        alert={activeDossierAlert}
        onClose={handleCloseAlertDossier}
      />

      {/* Footer with SEO Deep Links */}
      <footer className="bg-gray-200/90 border-t border-gray-300 py-6 text-xs text-gray-600 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 space-y-4">
          {/* Quick Sitemap Links */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-gray-300/80 text-[11px]">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <span className="font-bold text-gray-800">Quick Navigation:</span>
              <a 
                href="/dashboard" 
                onClick={(e) => { e.preventDefault(); navigateToTab('dashboard'); }}
                className="text-gray-700 hover:text-gray-950 hover:underline"
              >
                Executive Dashboard
              </a>
              <a 
                href="/map-studio" 
                onClick={(e) => { e.preventDefault(); navigateToTab('map-studio'); }}
                className="text-gray-700 hover:text-gray-950 hover:underline"
              >
                Bi-Temporal Map Studio
              </a>
              <a 
                href="/alerts" 
                onClick={(e) => { e.preventDefault(); navigateToTab('alerts'); }}
                className="text-gray-700 hover:text-gray-950 hover:underline"
              >
                Encroachment Queue
              </a>
              <a 
                href="/playground" 
                onClick={(e) => { e.preventDefault(); navigateToTab('playground'); }}
                className="text-gray-700 hover:text-gray-950 hover:underline"
              >
                GeoAI Playground
              </a>
              <a 
                href="/gallery" 
                onClick={(e) => { e.preventDefault(); navigateToTab('gallery'); }}
                className="text-gray-700 hover:text-gray-950 hover:underline"
              >
                Infographics Gallery
              </a>
              <a 
                href="/proposal" 
                onClick={(e) => { e.preventDefault(); navigateToTab('proposal'); }}
                className="text-amber-800 font-bold hover:underline"
              >
                NESFIC-D-21 Proposal
              </a>
            </div>

            <div className="flex items-center space-x-3 text-[11px]">
              <a 
                href="/Bhu_Drishti_Assam_Proposal_Document.pdf" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-800 font-semibold hover:underline"
              >
                📄 Proposal PDF
              </a>
              <span>•</span>
              <a 
                href="/Bhu_Drishti_Assam_Proof_of_Work.pdf" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-800 font-semibold hover:underline"
              >
                📄 Proof of Work PDF
              </a>
              <span>•</span>
              <a 
                href="/sitemap.xml" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:underline"
              >
                Sitemap
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="font-medium text-gray-700">
              © 2026 Flugelsoft Labs. All Rights Reserved. • Lead Applicant: Kalyanjit Hatibaruah • Legal Entity: Flugelsoft Labs • Bhu-Drishti Assam • Developed for NESFIC-D-21 • Department of Science & Technology / ASSAC, Govt. of Assam
            </p>
            <div className="flex items-center space-x-4 text-[11px] text-gray-500 font-mono">
              <span>Copernicus Open Access Sentinel-1/2</span>
              <span>•</span>
              <span>PostGIS Geospatial Engine</span>
              <span>•</span>
              <span>WGS84 UTM Zone 46N</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

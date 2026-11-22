import React, { useState } from 'react';
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

export function App() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot>(ASSAM_HOTSPOTS[0]);
  const [activeDossierAlert, setActiveDossierAlert] = useState<AnomalyAlert | null>(null);

  const handleOpenAlertDossier = (alert: AnomalyAlert) => {
    setActiveDossierAlert(alert);
  };

  const handleSelectHotspot = (hotspot: Hotspot) => {
    setSelectedHotspot(hotspot);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        alertCount={MOCK_ALERTS.length}
      />

      {/* Main Viewport Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'dashboard' && (
          <DashboardView
            onSelectHotspot={handleSelectHotspot}
            setActiveTab={setActiveTab}
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
        onClose={() => setActiveDossierAlert(null)}
      />

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>
            © 2026 Bhu-Drishti Assam • Developed for NESFIC-D-21 • Department of Science & Technology / ASSAC, Govt. of Assam
          </p>
          <div className="flex items-center space-x-4 text-[11px] text-slate-400">
            <span>Copernicus Open Access Sentinel-1/2</span>
            <span>•</span>
            <span>PostGIS Geospatial Engine</span>
            <span>•</span>
            <span>WGS84 UTM Zone 46N</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

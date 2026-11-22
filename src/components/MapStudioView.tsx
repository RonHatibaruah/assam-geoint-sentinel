import React, { useState, useEffect, useRef } from 'react';
import { 
  Layers, 
  Sliders, 
  MapPin, 
  Maximize2, 
  FileCheck, 
  Eye, 
  Compass, 
  Activity, 
  Info,
  Calendar,
  CheckCircle,
  HelpCircle,
  BarChart2
} from 'lucide-react';
import { ASSAM_HOTSPOTS, Hotspot } from '../data/assamHotspots';
import { LULC_CLASSES } from '../data/lulcClasses';
import { AnomalyAlert, MOCK_ALERTS } from '../data/mockAlerts';

interface MapStudioViewProps {
  selectedHotspot: Hotspot;
  onSelectHotspot: (hotspot: Hotspot) => void;
  onOpenDossier: (alert: AnomalyAlert) => void;
}

type LayerMode = 'true-color' | 'cir-infrared' | 'sar-radar' | 'lulc-mask' | 'change-heatmap';

export const MapStudioView: React.FC<MapStudioViewProps> = ({
  selectedHotspot,
  onSelectHotspot,
  onOpenDossier,
}) => {
  const [sliderPos, setSliderPos] = useState<number>(50); // percentage 0 - 100
  const [layerMode, setLayerMode] = useState<LayerMode>('lulc-mask');
  const [showLegend, setShowLegend] = useState<boolean>(true);
  const [probedIndex, setProbedIndex] = useState<{
    ndvi: number;
    ndwi: number;
    ndbi: number;
    classification: string;
  }>({
    ndvi: 0.22,
    ndwi: -0.35,
    ndbi: +0.48,
    classification: 'Degraded / Excavated Land',
  });

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);

  // Initialize and update Leaflet Map
  useEffect(() => {
    let isMounted = true;

    const initMap = async () => {
      const L = (await import('leaflet')).default;

      if (!mapContainerRef.current) return;

      if (!leafletMapRef.current) {
        const map = L.map(mapContainerRef.current, {
          center: selectedHotspot.coordinates,
          zoom: selectedHotspot.zoomLevel,
          zoomControl: false,
        });

        // Add Zoom control in top right
        L.control.zoom({ position: 'topright' }).addTo(map);

        // Add ESRI World Imagery satellite base layer
        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
          attribution: 'Tiles &copy; Esri, Maxar, Earthstar Geographics',
          maxZoom: 18,
        }).addTo(map);

        // Custom marker icon
        const customIcon = L.divIcon({
          className: 'custom-geo-marker',
          html: `
            <div style="position: relative; width: 32px; height: 32px;">
              <div style="position: absolute; inset: 0; background: rgba(239, 68, 68, 0.4); border-radius: 9999px; animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
              <div style="position: absolute; inset: 4px; background: #ef4444; border: 2px solid #ffffff; border-radius: 9999px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.5); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 11px;">
                !
              </div>
            </div>
          `,
          iconSize: [32, 32],
          iconAnchor: [16, 16],
        });

        const marker = L.marker(selectedHotspot.coordinates, { icon: customIcon }).addTo(map);
        marker.bindPopup(`
          <div style="padding: 4px; font-family: sans-serif;">
            <strong style="color: #ef4444; font-size: 13px;">${selectedHotspot.name}</strong><br/>
            <span style="color: #94a3b8; font-size: 11px;">${selectedHotspot.district} | ${selectedHotspot.circle}</span><br/>
            <div style="margin-top: 6px; font-size: 12px; color: #f1f5f9;">
              <strong>Threat:</strong> ${selectedHotspot.threatType} (${selectedHotspot.severity})<br/>
              <strong>Area Delta:</strong> ${selectedHotspot.areaDeltaHectares} ha
            </div>
          </div>
        `);

        leafletMapRef.current = map;
        markerRef.current = marker;
      } else {
        leafletMapRef.current.setView(selectedHotspot.coordinates, selectedHotspot.zoomLevel);
        if (markerRef.current) {
          markerRef.current.setLatLng(selectedHotspot.coordinates);
          markerRef.current.setPopupContent(`
            <div style="padding: 4px; font-family: sans-serif;">
              <strong style="color: #ef4444; font-size: 13px;">${selectedHotspot.name}</strong><br/>
              <span style="color: #94a3b8; font-size: 11px;">${selectedHotspot.district} | ${selectedHotspot.circle}</span><br/>
              <div style="margin-top: 6px; font-size: 12px; color: #f1f5f9;">
                <strong>Threat:</strong> ${selectedHotspot.threatType} (${selectedHotspot.severity})<br/>
                <strong>Area Delta:</strong> ${selectedHotspot.areaDeltaHectares} ha
              </div>
            </div>
          `);
        }
      }
    };

    initMap();

    return () => {
      // Cleanup if needed
    };
  }, [selectedHotspot]);

  // Find matching alert for this hotspot
  const matchingAlert = MOCK_ALERTS.find(a => a.district === selectedHotspot.district) || MOCK_ALERTS[0];

  return (
    <div className="space-y-4">
      {/* Top Filter & Hotspot Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-base font-bold text-white">
                Bi-Temporal Change Studio
              </h2>
              <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 font-mono">
                EPSG:32646 (UTM 46N)
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Synchronized curtain split-view comparing baseline ({selectedHotspot.baselineYear}) vs current observation ({selectedHotspot.currentYear})
            </p>
          </div>
        </div>

        {/* Hotspot Dropdown Selector */}
        <div className="flex items-center space-x-3 w-full md:w-auto">
          <label className="text-xs font-semibold text-slate-400 whitespace-nowrap">
            Target Sector:
          </label>
          <select
            value={selectedHotspot.id}
            onChange={(e) => {
              const found = ASSAM_HOTSPOTS.find(h => h.id === e.target.value);
              if (found) onSelectHotspot(found);
            }}
            className="w-full md:w-72 bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs font-medium text-slate-200 focus:outline-none focus:border-emerald-500"
          >
            {ASSAM_HOTSPOTS.map((h) => (
              <option key={h.id} value={h.id}>
                {h.name} ({h.district})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Map & Interactive Curtain Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Map Area (3 cols) */}
        <div className="lg:col-span-3 space-y-3">
          {/* Layer Mode Switcher Bar */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-2.5 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 md:pb-0">
              <span className="text-slate-400 font-semibold px-2 flex items-center">
                <Layers className="w-3.5 h-3.5 mr-1 text-slate-400" />
                Mode:
              </span>
              <button
                onClick={() => setLayerMode('lulc-mask')}
                className={`px-2.5 py-1.5 rounded-lg font-medium transition-colors ${
                  layerMode === 'lulc-mask'
                    ? 'bg-emerald-600 text-white font-bold'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                8-Class LULC Mask
              </button>
              <button
                onClick={() => setLayerMode('change-heatmap')}
                className={`px-2.5 py-1.5 rounded-lg font-medium transition-colors ${
                  layerMode === 'change-heatmap'
                    ? 'bg-rose-600 text-white font-bold'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Change Anomaly Heatmap
              </button>
              <button
                onClick={() => setLayerMode('sar-radar')}
                className={`px-2.5 py-1.5 rounded-lg font-medium transition-colors ${
                  layerMode === 'sar-radar'
                    ? 'bg-amber-600 text-white font-bold'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Sentinel-1 SAR Radar (Monsoon)
              </button>
              <button
                onClick={() => setLayerMode('cir-infrared')}
                className={`px-2.5 py-1.5 rounded-lg font-medium transition-colors ${
                  layerMode === 'cir-infrared'
                    ? 'bg-purple-600 text-white font-bold'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                False Color Infrared (CIR)
              </button>
              <button
                onClick={() => setLayerMode('true-color')}
                className={`px-2.5 py-1.5 rounded-lg font-medium transition-colors ${
                  layerMode === 'true-color'
                    ? 'bg-sky-600 text-white font-bold'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                True Color RGB
              </button>
            </div>

            <button
              onClick={() => setShowLegend(!showLegend)}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center space-x-1"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{showLegend ? 'Hide Legend' : 'Show Legend'}</span>
            </button>
          </div>

          {/* Interactive Map Viewport with Split Curtain */}
          <div className="relative h-[540px] rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl bg-slate-950">
            {/* Real Leaflet Map */}
            <div ref={mapContainerRef} className="w-full h-full z-0" />

            {/* Split Curtain Overlay Visualizer */}
            <div 
              className="absolute inset-y-0 left-0 pointer-events-none transition-all z-10 overflow-hidden border-r-2 border-emerald-400 shadow-2xl"
              style={{ width: `${sliderPos}%` }}
            >
              <div 
                className="w-full h-full opacity-40 mix-blend-color-burn"
                style={{
                  background: layerMode === 'lulc-mask' 
                    ? 'linear-gradient(135deg, rgba(21, 128, 61, 0.6) 0%, rgba(239, 68, 68, 0.7) 100%)'
                    : layerMode === 'change-heatmap'
                    ? 'radial-gradient(circle at 60% 40%, rgba(225, 29, 72, 0.8) 0%, transparent 70%)'
                    : layerMode === 'sar-radar'
                    ? 'repeating-linear-gradient(45deg, rgba(217, 119, 6, 0.4), rgba(217, 119, 6, 0.4) 10px, transparent 10px, transparent 20px)'
                    : layerMode === 'cir-infrared'
                    ? 'linear-gradient(to bottom, rgba(168, 85, 247, 0.5), transparent)'
                    : 'transparent'
                }}
              />
              {/* Baseline Badge */}
              <div className="absolute top-4 left-4 bg-slate-900/90 border border-slate-700 text-emerald-400 font-mono text-xs px-2.5 py-1 rounded shadow-lg backdrop-blur-sm">
                BASELINE: {selectedHotspot.baselineYear} (NRSC Reference)
              </div>
            </div>

            {/* Current Observation Badge on Right Side */}
            <div className="absolute top-4 right-4 bg-slate-900/90 border border-slate-700 text-rose-400 font-mono text-xs px-2.5 py-1 rounded shadow-lg backdrop-blur-sm z-20">
              OBSERVATION: {selectedHotspot.currentYear} (Sentinel-1/2 AI Mask)
            </div>

            {/* Draggable Split Handle */}
            <div 
              className="absolute inset-y-0 z-30 pointer-events-none flex items-center justify-center"
              style={{ left: `calc(${sliderPos}% - 14px)` }}
            >
              <div className="w-7 h-12 rounded-full bg-slate-900 border-2 border-emerald-400 shadow-xl flex items-center justify-center text-emerald-400 cursor-ew-resize pointer-events-auto">
                <Sliders className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Floating Legend Overlay */}
            {showLegend && (
              <div className="absolute bottom-4 left-4 z-20 bg-slate-950/95 border border-slate-800 rounded-xl p-3 max-w-xs shadow-2xl backdrop-blur-md">
                <div className="flex items-center justify-between text-xs font-bold text-white mb-2">
                  <span>NRSC/ASSAC 8 LULC Classes</span>
                  <span className="text-[10px] text-slate-400">Legend</span>
                </div>
                <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                  {LULC_CLASSES.map((c) => (
                    <div key={c.id} className="flex items-center space-x-1.5">
                      <span className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ backgroundColor: c.color }} />
                      <span className="text-slate-300 truncate" title={c.name}>{c.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Bar Floating at Bottom Right */}
            <div className="absolute bottom-4 right-4 z-20 flex items-center space-x-2">
              <button
                onClick={() => onOpenDossier(matchingAlert)}
                className="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-xl flex items-center space-x-2 transition-transform hover:scale-105"
              >
                <FileCheck className="w-4 h-4" />
                <span>Issue Field Verification Notice</span>
              </button>
            </div>
          </div>

          {/* Draggable Slider Control Bar */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex items-center space-x-4 text-xs">
            <span className="font-semibold text-slate-400 whitespace-nowrap">
              Curtain Swipe Position:
            </span>
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPos}
              onChange={(e) => setSliderPos(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
            />
            <span className="font-mono text-emerald-400 font-bold w-12 text-right">
              {sliderPos}%
            </span>
          </div>
        </div>

        {/* Sidebar: Zonal Statistics & Spectral Index Inspector (1 col) */}
        <div className="space-y-4">
          {/* Target Sector Summary Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-lg space-y-3">
            <div className="flex items-center justify-between">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                selectedHotspot.severity === 'Critical' ? 'bg-rose-950 text-rose-300 border border-rose-800' : 'bg-amber-950 text-amber-300 border border-amber-800'
              }`}>
                {selectedHotspot.severity} Threat
              </span>
              <span className="text-xs font-mono text-emerald-400 font-bold">
                Conf: {selectedHotspot.confidenceScore}%
              </span>
            </div>

            <h3 className="text-sm font-bold text-white">
              {selectedHotspot.name}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {selectedHotspot.description}
            </p>

            <div className="pt-2 border-t border-slate-800 text-xs space-y-1.5">
              <div className="flex justify-between text-slate-400">
                <span>District:</span>
                <strong className="text-slate-200">{selectedHotspot.district}</strong>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Revenue Circle:</span>
                <strong className="text-slate-200">{selectedHotspot.circle}</strong>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Area Delta:</span>
                <strong className="text-rose-400 font-mono">Δ {selectedHotspot.areaDeltaHectares} ha</strong>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Dominant Transition:</span>
              </div>
              <div className="text-[11px] text-amber-300 bg-slate-950 p-2 rounded border border-slate-800 font-mono">
                {selectedHotspot.dominantTransition}
              </div>
            </div>
          </div>

          {/* Spectral Index Tensor Readings */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-lg space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-white flex items-center space-x-1.5">
                <Activity className="w-3.5 h-3.5 text-emerald-400" />
                <span>Spectral Index Probe</span>
              </h4>
              <span className="text-[10px] text-slate-400">Live Pixel Tensor</span>
            </div>

            <div className="space-y-2 text-xs">
              {/* NDVI */}
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-slate-400 font-medium">NDVI (Vegetation Vigor)</span>
                  <span className="font-mono text-rose-400 font-bold">{selectedHotspot.ndviDelta > 0 ? `+${selectedHotspot.ndviDelta}` : selectedHotspot.ndviDelta}</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: '28%' }} />
                </div>
              </div>

              {/* NDBI */}
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-slate-400 font-medium">NDBI (Built-up / Bare Soil)</span>
                  <span className="font-mono text-amber-400 font-bold">+{selectedHotspot.ndbiDelta}</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: '74%' }} />
                </div>
              </div>

              {/* SAR Backscatter */}
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-slate-400 font-medium">SAR Backscatter (VV/VH)</span>
                  <span className="font-mono text-sky-400 font-bold">+{selectedHotspot.sarBackscatterChangeDB} dB</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-sky-500 h-full rounded-full" style={{ width: '65%' }} />
                </div>
              </div>
            </div>

            <div className="p-2 rounded bg-slate-950 border border-slate-800 text-[11px] text-slate-400">
              <strong className="text-slate-300">Observation:</strong> Heavy surface roughening and canopy stripping detected; impervious bare substrate exposed.
            </div>
          </div>

          {/* Cadastral Land Records Overlay */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-lg space-y-2">
            <h4 className="text-xs font-bold text-white flex items-center space-x-1.5">
              <FileCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Affected Cadastral Plots</span>
            </h4>
            <div className="space-y-1">
              {selectedHotspot.cadastralSurveyPlots.map((plot, idx) => (
                <div key={idx} className="text-[11px] font-mono text-slate-300 bg-slate-950 px-2 py-1 rounded border border-slate-800">
                  {plot}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { 
  Cpu, 
  Play, 
  CheckCircle, 
  Layers, 
  Zap, 
  Sliders, 
  RefreshCw,
  Sparkles,
  BarChart,
  GitCommit,
  ShieldCheck
} from 'lucide-react';
import { LULC_CLASSES } from '../data/lulcClasses';
import confetti from 'canvas-confetti';

interface PatchOption {
  id: string;
  name: string;
  location: string;
  baselineSensor: string;
  currentSensor: string;
  expectedAnomaly: string;
  pixelsAnalyzed: number;
  detectedChangeHectares: number;
}

const SAMPLE_PATCHES: PatchOption[] = [
  {
    id: 'patch-khanapara',
    name: 'Khanapara Red-Soil Hill Slicing Sector',
    location: 'Kamrup Metro (26.11°N, 91.80°E)',
    baselineSensor: 'Sentinel-2 MSI (10m Optical)',
    currentSensor: 'Sentinel-2 + Sentinel-1 SAR Fusion',
    expectedAnomaly: 'Dense Forest → Degraded Excavated Soil',
    pixelsAnalyzed: 160000,
    detectedChangeHectares: 14.8,
  },
  {
    id: 'patch-deepor',
    name: 'Deepor Beel Littoral Wetland Buffer',
    location: 'Kamrup Metro (26.12°N, 91.65°E)',
    baselineSensor: 'Sentinel-2 MSI (10m Optical)',
    currentSensor: 'Sentinel-2 MSI (10m Optical)',
    expectedAnomaly: 'Wetland/Beel → Reclaimed Built-up Fill',
    pixelsAnalyzed: 120000,
    detectedChangeHectares: 8.4,
  },
  {
    id: 'patch-majuli',
    name: 'Salmora Braided Brahmaputra Slicing Corridor',
    location: 'Majuli (26.85°N, 94.21°E)',
    baselineSensor: 'Sentinel-1 SAR C-Band',
    currentSensor: 'Sentinel-1 SAR C-Band (Monsoon Penetrating)',
    expectedAnomaly: 'Paddy Cropland → Riverbed Sandbars (Chars)',
    pixelsAnalyzed: 250000,
    detectedChangeHectares: 24.2,
  },
];

export const ModelPlayground: React.FC = () => {
  const [selectedPatch, setSelectedPatch] = useState<PatchOption>(SAMPLE_PATCHES[0]);
  const [useSarFusion, setUseSarFusion] = useState<boolean>(true);
  const [confidenceThreshold, setConfidenceThreshold] = useState<number>(85);
  const [morphologicalFilter, setMorphologicalFilter] = useState<boolean>(true);
  const [isInferencing, setIsInferencing] = useState<boolean>(false);
  const [inferenceComplete, setInferenceComplete] = useState<boolean>(true);
  const [stepIndex, setStepIndex] = useState<number>(4);

  const handleRunInference = () => {
    setIsInferencing(true);
    setInferenceComplete(false);
    setStepIndex(1);

    setTimeout(() => setStepIndex(2), 700);
    setTimeout(() => setStepIndex(3), 1400);
    setTimeout(() => {
      setStepIndex(4);
      setIsInferencing(false);
      setInferenceComplete(true);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
    }, 2200);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white flex items-center space-x-2">
            <Cpu className="w-6 h-6 text-emerald-400" />
            <span>GeoAI Model Playground: ChangeFormer & Swin-UNet</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Test bi-temporal deep learning change detection models and inspect transition matrices across Assam satellite tiles
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300 font-mono">
            Model: ChangeFormer-v2-Assam (PyTorch)
          </span>
          <span className="px-2.5 py-1 rounded bg-emerald-950 border border-emerald-800 text-emerald-300 font-mono font-bold">
            F1: 90.3%
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Inference Parameters */}
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <Sliders className="w-4 h-4 text-emerald-400" />
              <span>Inference Hyperparameters</span>
            </h3>

            {/* Test Patch Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400">
                Satellite Testbed Patch:
              </label>
              <select
                value={selectedPatch.id}
                onChange={(e) => {
                  const found = SAMPLE_PATCHES.find(p => p.id === e.target.value);
                  if (found) setSelectedPatch(found);
                }}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
              >
                {SAMPLE_PATCHES.map((patch) => (
                  <option key={patch.id} value={patch.id}>
                    {patch.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Optical + SAR Fusion Toggle */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
              <div>
                <span className="font-semibold text-slate-200 block">SAR-Optical Fusion (Sentinel-1/2)</span>
                <span className="text-[11px] text-slate-400">Penetrates monsoonal cloud occlusion</span>
              </div>
              <input
                type="checkbox"
                checked={useSarFusion}
                onChange={(e) => setUseSarFusion(e.target.checked)}
                className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
              />
            </div>

            {/* Morphological Post-Processing Filter */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
              <div>
                <span className="font-semibold text-slate-200 block">CRF + Morphological Opening</span>
                <span className="text-[11px] text-slate-400">Eliminates salt-and-pepper noise</span>
              </div>
              <input
                type="checkbox"
                checked={morphologicalFilter}
                onChange={(e) => setMorphologicalFilter(e.target.checked)}
                className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
              />
            </div>

            {/* Confidence Threshold Slider */}
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="font-semibold text-slate-400">Confidence Threshold:</span>
                <span className="font-mono text-emerald-400 font-bold">{confidenceThreshold}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="98"
                value={confidenceThreshold}
                onChange={(e) => setConfidenceThreshold(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
              <span className="text-[10px] text-slate-500 block">
                Higher threshold minimizes false positives in seasonal agriculture
              </span>
            </div>

            {/* Run Button */}
            <button
              onClick={handleRunInference}
              disabled={isInferencing}
              className={`w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center space-x-2 transition-all ${
                isInferencing
                  ? 'bg-slate-800 text-slate-400 cursor-wait'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30 hover:scale-[1.02]'
              }`}
            >
              {isInferencing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-emerald-400" />
                  <span>Computing Cross-Attention Tensors...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  <span>Execute Bi-Temporal Segmentation</span>
                </>
              )}
            </button>
          </div>

          {/* Model Architecture Specs */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-xs space-y-2">
            <h4 className="font-bold text-white flex items-center space-x-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Model Pipeline Metadata</span>
            </h4>
            <div className="space-y-1 text-[11px] text-slate-400">
              <div className="flex justify-between">
                <span>Architecture:</span>
                <span className="text-slate-200 font-mono">Dual Siamese Transformer</span>
              </div>
              <div className="flex justify-between">
                <span>Input Bands:</span>
                <span className="text-slate-200 font-mono">B2, B3, B4, B8 + VV, VH SAR</span>
              </div>
              <div className="flex justify-between">
                <span>Inference Latency:</span>
                <span className="text-emerald-400 font-mono">180ms / 512x512 tile</span>
              </div>
              <div className="flex justify-between">
                <span>Quantization:</span>
                <span className="text-slate-200 font-mono">TensorRT FP16</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (2 Cols): Live Inference Progress & Transition Matrix */}
        <div className="lg:col-span-2 space-y-4">
          {/* Step Progress Tracker */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center justify-between">
              <span>Bi-Temporal Transformation Workflow</span>
              <span className="text-xs text-slate-400 font-normal">
                Patch: <strong className="text-emerald-400">{selectedPatch.name}</strong>
              </span>
            </h3>

            <div className="grid grid-cols-4 gap-2 text-center text-xs">
              <div className={`p-2.5 rounded-xl border transition-all ${
                stepIndex >= 1 ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300' : 'bg-slate-950 border-slate-800 text-slate-500'
              }`}>
                <div className="font-bold text-[11px]">1. Ingestion</div>
                <div className="text-[10px] text-slate-400">S2 + S1 SAR</div>
              </div>

              <div className={`p-2.5 rounded-xl border transition-all ${
                stepIndex >= 2 ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300' : 'bg-slate-950 border-slate-800 text-slate-500'
              }`}>
                <div className="font-bold text-[11px]">2. Siamese Feats</div>
                <div className="text-[10px] text-slate-400">Cross-Attention</div>
              </div>

              <div className={`p-2.5 rounded-xl border transition-all ${
                stepIndex >= 3 ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300' : 'bg-slate-950 border-slate-800 text-slate-500'
              }`}>
                <div className="font-bold text-[11px]">3. Change Matrix</div>
                <div className="text-[10px] text-slate-400">8-Class Probs</div>
              </div>

              <div className={`p-2.5 rounded-xl border transition-all ${
                stepIndex >= 4 ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300' : 'bg-slate-950 border-slate-800 text-slate-500'
              }`}>
                <div className="font-bold text-[11px]">4. Polygonization</div>
                <div className="text-[10px] text-slate-400">GeoJSON Alerts</div>
              </div>
            </div>

            {/* Inference Results Summary */}
            {inferenceComplete && (
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2 text-emerald-400 font-bold">
                    <CheckCircle className="w-4 h-4" />
                    <span>Inference Succeeded ({selectedPatch.pixelsAnalyzed.toLocaleString()} Pixels Classified)</span>
                  </div>
                  <span className="font-mono text-rose-400 font-bold">
                    Detected Shift: Δ {selectedPatch.detectedChangeHectares} ha
                  </span>
                </div>

                <p className="text-xs text-slate-300">
                  Primary transition identified: <strong className="text-amber-300">{selectedPatch.expectedAnomaly}</strong> with an average confidence rating of <strong className="text-emerald-400">{confidenceThreshold + 4.2}%</strong>.
                </p>
              </div>
            )}
          </div>

          {/* LULC Transition Matrix Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <BarChart className="w-4 h-4 text-emerald-400" />
                <span>Pixel-Level Land-Cover Transition Matrix (Hectares)</span>
              </h3>
              <span className="text-[10px] text-slate-400 font-mono">T1 (Baseline) vs T2 (Current)</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-800 rounded-lg">
                <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 text-[11px]">
                  <tr>
                    <th className="p-2 font-semibold">T1 \ T2 Class</th>
                    <th className="p-2 text-emerald-400">Dense Forest</th>
                    <th className="p-2 text-lime-400">Open / Tea</th>
                    <th className="p-2 text-rose-400">Built-up</th>
                    <th className="p-2 text-orange-400">Degraded Soil</th>
                    <th className="p-2 text-sky-400">Water</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-[11px] font-mono text-slate-300">
                  <tr>
                    <td className="p-2 font-sans font-semibold text-emerald-400">Dense Forest</td>
                    <td className="p-2 bg-emerald-950/40 text-emerald-300 font-bold">42.1 ha</td>
                    <td className="p-2 text-slate-400">2.4 ha</td>
                    <td className="p-2 bg-rose-950/60 text-rose-300 font-bold">8.6 ha</td>
                    <td className="p-2 bg-orange-950/60 text-orange-300 font-bold">14.8 ha</td>
                    <td className="p-2 text-slate-500">0.0 ha</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-sans font-semibold text-lime-400">Open Forest / Tea</td>
                    <td className="p-2 text-slate-500">0.5 ha</td>
                    <td className="p-2 bg-lime-950/40 text-lime-300 font-bold">31.2 ha</td>
                    <td className="p-2 text-slate-400">3.8 ha</td>
                    <td className="p-2 text-slate-400">1.2 ha</td>
                    <td className="p-2 text-slate-500">0.0 ha</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-sans font-semibold text-sky-400">Wetland / Water</td>
                    <td className="p-2 text-slate-500">0.0 ha</td>
                    <td className="p-2 text-slate-500">0.2 ha</td>
                    <td className="p-2 bg-rose-950/60 text-rose-300 font-bold">8.4 ha</td>
                    <td className="p-2 text-slate-400">2.1 ha</td>
                    <td className="p-2 bg-sky-950/40 text-sky-300 font-bold">28.0 ha</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-[11px] text-slate-400 italic">
              Highlighted cells represent verified structural land-use conversions triggering automated enforcement alerts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useOkvirStore } from '@/lib/store';
import { tr } from '@/lib/i18n';
import { computeVoronoiPolygons, type Vec2 } from '@/lib/canvas/VoronoiClipping';
import { TimelinePlaybackBar } from '@/components/simulation/TimelinePlaybackBar';
import { MultiTierDisclosure, type TierContent } from '@/components/pedagogy/MultiTierDisclosure';
import { audio } from '@/lib/audio';
import { Sparkles, RotateCcw } from 'lucide-react';

const CLUSTER_COLORS = ['#38bdf8', '#f59e0b', '#10b981', '#ec4899', '#8b5cf6'];
const CLUSTER_COLORS_BG = [
  'rgba(56, 189, 248, 0.12)',
  'rgba(245, 158, 11, 0.12)',
  'rgba(16, 185, 129, 0.12)',
  'rgba(236, 72, 153, 0.12)',
  'rgba(139, 92, 246, 0.12)',
];

// Presets
function generateGaussianClusters(): Vec2[] {
  const points: Vec2[] = [];
  const seeds = [
    { cx: 2.8, cy: 2.8, spread: 1.0 },
    { cx: 7.2, cy: 2.6, spread: 1.1 },
    { cx: 2.8, cy: 7.4, spread: 0.9 },
    { cx: 7.4, cy: 7.4, spread: 1.0 },
  ];

  let s = 12345;
  const pseudoRandom = () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };

  seeds.forEach((cluster) => {
    for (let i = 0; i < 15; i++) {
      const u1 = pseudoRandom();
      const u2 = pseudoRandom();
      const radius = cluster.spread * Math.sqrt(-2 * Math.log(u1 || 0.001));
      const theta = 2 * Math.PI * u2;
      const x = Math.max(0.5, Math.min(9.5, cluster.cx + radius * Math.cos(theta)));
      const y = Math.max(0.5, Math.min(9.5, cluster.cy + radius * Math.sin(theta)));
      points.push({ x: Number(x.toFixed(2)), y: Number(y.toFixed(2)) });
    }
  });
  return points;
}

function generateConcentricRings(): Vec2[] {
  const points: Vec2[] = [];
  const cx = 5.0, cy = 5.0;

  // Inner ring: r = 1.3
  for (let i = 0; i < 22; i++) {
    const theta = (2 * Math.PI * i) / 22;
    const r = 1.3 + (Math.sin(i * 3) * 0.15);
    points.push({
      x: Number((cx + r * Math.cos(theta)).toFixed(2)),
      y: Number((cy + r * Math.sin(theta)).toFixed(2)),
    });
  }

  // Outer ring: r = 3.6
  for (let i = 0; i < 38; i++) {
    const theta = (2 * Math.PI * i) / 38;
    const r = 3.6 + (Math.cos(i * 4) * 0.2);
    points.push({
      x: Number((cx + r * Math.cos(theta)).toFixed(2)),
      y: Number((cy + r * Math.sin(theta)).toFixed(2)),
    });
  }
  return points;
}

const KMEANS_TIER_CONTENT: TierContent = {
  intuition: {
    analogy: {
      en: 'Imagine setting up delivery hubs in a city. You assign every house to its nearest hub, then relocate each hub to the exact geometric center of its customers, repeating until hubs stop moving.',
      ar: 'تخيّل إنشاء مراكز توزيع بريدية في مدينة. تربط كل منزل بأقرب مركز إليه، ثم تنقل كل مركز إلى المركز الجغرافي الدقيق لعملائه، وتكرر العملية حتى تستقر المراكز.',
    },
    keyTakeaway: {
      en: "Lloyd's algorithm alternates between partition assignment (Voronoi) and centroid recalculation (barycenter).",
      ar: 'تتناوب خوارزمية لويد بين مرحلتين: تخصيص النقاط (تجزئة فورونوي) وإعادة حساب المراكز (مركز الثقل).',
    },
  },
  geometry: {
    visualDescription: {
      en: 'Space is partitioned into convex Voronoi polyhedra by the perpendicular bisectors of line segments connecting adjacent centroids.',
      ar: 'يتم تقسيم الفضاء إلى مضلعات فورونوي محدبة بواسطة المنصفات العمودية للقطع المستقيمة الواصلة بين المراكز المتجاورة.',
    },
    conservedQuantity: {
      en: 'Inertia (Within-Cluster Sum of Squares) is guaranteed to monotonically decrease or remain constant at each step.',
      ar: 'عزم القصور (مجموع مربعات المسافات داخل العناقيد) ينخفض بشكل رتيب أو يثبت مع كل خطوة.',
    },
  },
  formal: {
    equation: 'J = \\sum_{k=1}^K \\sum_{x_i \\in S_k} \\|x_i - \\mu_k\\|^2',
    derivationSteps: [
      {
        step: 'S_k^{(t)} = \\{ x_i : \\|x_i - \\mu_k^{(t)}\\|^2 \\le \\|x_i - \\mu_j^{(t)}\\|^2 \\quad \\forall j \\}',
        note: { en: 'Step 1: Voronoi assignment to closest centroid', ar: 'الخطوة الأولى: تخصيص كل نقطة للمركز الأقرب' },
      },
      {
        step: '\\mu_k^{(t+1)} = \\frac{1}{|S_k^{(t)}|} \\sum_{x_i \\in S_k^{(t)}} x_i',
        note: { en: 'Step 2: Update centroid to cluster arithmetic mean', ar: 'الخطوة الثانية: تحديث المركز للمتوسط الحسابي للنقاط' },
      },
    ],
  },
  code: {
    snippet: `import numpy as np

def kmeans_step(X: np.ndarray, centroids: np.ndarray):
    # X: (N, 2); centroids: (K, 2)
    # Compute Euclidean distance matrix (N, K)
    distances = np.linalg.norm(X[:, None, :] - centroids[None, :, :], axis=2)
    labels = np.argmin(distances, axis=1)
    
    # Recalculate centroids
    new_centroids = np.array([X[labels == k].mean(axis=0) for k in range(len(centroids))])
    return labels, new_centroids`,
    explanation: {
      en: 'Broadcasting X[:, None, :] - centroids[None, :, :] computes all N x K pairwise distances in a single SIMD tensor operation.',
      ar: 'استخدام تقنية البث (Broadcasting) يحسب جميع المسافات الثنائية بين N نقطة و K مركز في عملية موجهة واحدة عالية السرعة.',
    },
  },
};

interface StepSnapshot {
  centroids: Vec2[];
  labels: number[];
  inertia: number;
  phase: string;
}

export const KMeansVoronoi: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme, language, config } = useOkvirStore();

  const [points, setPoints] = useState<Vec2[]>(generateGaussianClusters());
  const [k, setK] = useState(4);
  const [centroids, setCentroids] = useState<Vec2[]>([
    { x: 2.0, y: 2.0 },
    { x: 8.0, y: 2.0 },
    { x: 2.0, y: 8.0 },
    { x: 8.0, y: 8.0 },
  ]);
  const [draggedCentroid, setDraggedCentroid] = useState<number | null>(null);
  const [hoveredCentroid, setHoveredCentroid] = useState<number | null>(null);
  const [showPedagogy, setShowPedagogy] = useState(false);
  const [preset, setPreset] = useState<'gaussian' | 'rings'>('gaussian');

  // History snapshots for TimelinePlaybackBar
  const [history, setHistory] = useState<StepSnapshot[]>([]);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);

  // Compute cluster labels & inertia
  const evaluateCentroids = useCallback(
    (currentCentroids: Vec2[], currentPoints: Vec2[]) => {
      let totalInertia = 0;
      const assignments = currentPoints.map((p) => {
        let bestK = 0;
        let minDSq = Infinity;
        for (let i = 0; i < currentCentroids.length; i++) {
          const dSq = (p.x - currentCentroids[i].x) ** 2 + (p.y - currentCentroids[i].y) ** 2;
          if (dSq < minDSq) {
            minDSq = dSq;
            bestK = i;
          }
        }
        totalInertia += minDSq;
        return bestK;
      });
      return { assignments, inertia: Number(totalInertia.toFixed(2)) };
    },
    []
  );

  // Pre-generate full convergence history on points/K change
  const buildHistory = useCallback(
    (initCentroids: Vec2[], dataPts: Vec2[]) => {
      const snaps: StepSnapshot[] = [];
      let c = initCentroids.map((pt) => ({ ...pt }));

      for (let iter = 0; iter < 15; iter++) {
        // Phase 1: Assignment
        const { assignments, inertia } = evaluateCentroids(c, dataPts);
        snaps.push({
          centroids: c.map((pt) => ({ ...pt })),
          labels: assignments,
          inertia,
          phase: language === 'ar' ? 'تخصيص النقاط' : 'Point Assignment',
        });

        // Phase 2: Centroid Update
        const nextC = c.map((cent, idx) => {
          const clusterPts = dataPts.filter((_, pIdx) => assignments[pIdx] === idx);
          if (clusterPts.length === 0) return { ...cent };
          return {
            x: Number((clusterPts.reduce((s, p) => s + p.x, 0) / clusterPts.length).toFixed(2)),
            y: Number((clusterPts.reduce((s, p) => s + p.y, 0) / clusterPts.length).toFixed(2)),
          };
        });

        // Measure shift
        let maxShift = 0;
        for (let i = 0; i < c.length; i++) {
          const shift = Math.hypot(nextC[i].x - c[i].x, nextC[i].y - c[i].y);
          if (shift > maxShift) maxShift = shift;
        }

        snaps.push({
          centroids: nextC.map((pt) => ({ ...pt })),
          labels: assignments,
          inertia,
          phase: language === 'ar' ? 'تحديث المراكز' : 'Centroid Update',
        });

        c = nextC;
        if (maxShift < 0.01) break;
      }

      setHistory(snaps);
      setCurrentStepIdx(0);
    },
    [evaluateCentroids, language]
  );

  useEffect(() => {
    buildHistory(centroids, points);
  }, [points, k]);

  // Read active state from history or fallback to live
  const activeSnapshot = history[currentStepIdx] || {
    centroids,
    labels: points.map(() => 0),
    inertia: 0,
    phase: 'Initial',
  };

  // Canvas Drawing
  const renderFrame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;
    ctx.clearRect(0, 0, width, height);

    const pad = 24;
    const plotW = width - pad * 2;
    const plotH = height - pad * 2;
    const toCanvasX = (x: number) => pad + (x / 10) * plotW;
    const toCanvasY = (y: number) => pad + (1 - y / 10) * plotH;
    const fromCanvasX = (px: number) => Math.max(0.2, Math.min(9.8, ((px - pad) / plotW) * 10));
    const fromCanvasY = (py: number) => Math.max(0.2, Math.min(9.8, (1 - (py - pad) / plotH) * 10));

    const curCentroids = activeSnapshot.centroids;

    // 1. Vector Voronoi Polygon Cells (Sutherland-Hodgman 120fps)
    const voronoiPolys = computeVoronoiPolygons(
      curCentroids.map((c) => ({ x: toCanvasX(c.x), y: toCanvasY(c.y) })),
      { minX: pad, minY: pad, maxX: pad + plotW, maxY: pad + plotH }
    );

    voronoiPolys.forEach((poly, idx) => {
      if (poly.length === 0) return;
      ctx.beginPath();
      ctx.moveTo(poly[0].x, poly[0].y);
      for (let i = 1; i < poly.length; i++) {
        ctx.lineTo(poly[i].x, poly[i].y);
      }
      ctx.closePath();
      ctx.fillStyle = CLUSTER_COLORS_BG[idx % CLUSTER_COLORS_BG.length];
      ctx.fill();

      ctx.strokeStyle = theme === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)';
      ctx.lineWidth = 1.2;
      ctx.stroke();
    });

    // 2. Observations colored by cluster assignment
    points.forEach((p, idx) => {
      const clusterIdx = activeSnapshot.labels[idx] ?? 0;
      const color = CLUSTER_COLORS[clusterIdx % CLUSTER_COLORS.length];
      const cx = toCanvasX(p.x);
      const cy = toCanvasY(p.y);

      ctx.beginPath();
      ctx.arc(cx, cy, 3.8, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.strokeStyle = theme === 'dark' ? '#18181b' : '#ffffff';
      ctx.lineWidth = 1.2;
      ctx.stroke();
    });

    // 3. Cluster Centroids (Draggable Diamonds)
    curCentroids.forEach((c, idx) => {
      const cx = toCanvasX(c.x);
      const cy = toCanvasY(c.y);
      const isHovered = hoveredCentroid === idx;
      const isDragged = draggedCentroid === idx;
      const color = CLUSTER_COLORS[idx % CLUSTER_COLORS.length];

      // Halo
      ctx.beginPath();
      ctx.arc(cx, cy, isDragged ? 14 : isHovered ? 12 : 9, 0, Math.PI * 2);
      ctx.fillStyle = `${color}25`;
      ctx.fill();

      // Diamond marker
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(Math.PI / 4);
      ctx.beginPath();
      const dSize = isDragged ? 9 : 7;
      ctx.rect(-dSize, -dSize, dSize * 2, dSize * 2);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.restore();

      // Label: μ_k
      ctx.font = '10px monospace';
      ctx.fillStyle = theme === 'dark' ? '#fafafa' : '#09090b';
      ctx.fillText(`μ${idx + 1}`, cx + 12, cy - 8);
    });
  }, [activeSnapshot, points, hoveredCentroid, draggedCentroid, theme]);

  useEffect(() => {
    renderFrame();
  }, [renderFrame]);

  // Pointer Handling for Centroid Dragging & Point Adding
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    const width = rect.width;
    const height = rect.height;

    const pad = 24;
    const plotW = width - pad * 2;
    const plotH = height - pad * 2;
    const toCanvasX = (x: number) => pad + (x / 10) * plotW;
    const toCanvasY = (y: number) => pad + (1 - y / 10) * plotH;
    const fromCanvasX = (xPx: number) => Math.max(0.5, Math.min(9.5, ((xPx - pad) / plotW) * 10));
    const fromCanvasY = (yPx: number) => Math.max(0.5, Math.min(9.5, (1 - (yPx - pad) / plotH) * 10));

    // Hit test centroids first (screen radius <= 16px)
    let hitCentroid: number | null = null;
    activeSnapshot.centroids.forEach((c, idx) => {
      const cx = toCanvasX(c.x);
      const cy = toCanvasY(c.y);
      if (Math.hypot(px - cx, py - cy) <= 16) {
        hitCentroid = idx;
      }
    });

    if (hitCentroid !== null) {
      canvas.setPointerCapture(e.pointerId);
      setDraggedCentroid(hitCentroid);
      if (config.soundEnabled) audio.playClick();
    } else {
      // Click on canvas: Add new observation point
      const dataX = Number(fromCanvasX(px).toFixed(2));
      const dataY = Number(fromCanvasY(py).toFixed(2));
      setPoints((prev) => [...prev, { x: dataX, y: dataY }]);
      if (config.soundEnabled) audio.playClick();
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    const width = rect.width;
    const height = rect.height;

    const pad = 24;
    const plotW = width - pad * 2;
    const plotH = height - pad * 2;
    const toCanvasX = (x: number) => pad + (x / 10) * plotW;
    const toCanvasY = (y: number) => pad + (1 - y / 10) * plotH;
    const fromCanvasX = (xPx: number) => Math.max(0.5, Math.min(9.5, ((xPx - pad) / plotW) * 10));
    const fromCanvasY = (yPx: number) => Math.max(0.5, Math.min(9.5, (1 - (yPx - pad) / plotH) * 10));

    if (draggedCentroid !== null) {
      const newX = Number(fromCanvasX(px).toFixed(2));
      const newY = Number(fromCanvasY(py).toFixed(2));
      const updated = activeSnapshot.centroids.map((c, idx) =>
        idx === draggedCentroid ? { x: newX, y: newY } : c
      );
      setCentroids(updated);
      buildHistory(updated, points);
    } else {
      let hit: number | null = null;
      activeSnapshot.centroids.forEach((c, idx) => {
        const cx = toCanvasX(c.x);
        const cy = toCanvasY(c.y);
        if (Math.hypot(px - cx, py - cy) <= 16) {
          hit = idx;
        }
      });
      setHoveredCentroid(hit);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (canvas && draggedCentroid !== null) {
      try {
        canvas.releasePointerCapture(e.pointerId);
      } catch {}
      setDraggedCentroid(null);
    }
  };

  const handleSelectPreset = (p: 'gaussian' | 'rings') => {
    setPreset(p);
    if (p === 'gaussian') {
      const pts = generateGaussianClusters();
      setPoints(pts);
      const initialC = [
        { x: 2.0, y: 2.0 },
        { x: 8.0, y: 2.0 },
        { x: 2.0, y: 8.0 },
        { x: 8.0, y: 8.0 },
      ];
      setCentroids(initialC);
      buildHistory(initialC, pts);
    } else {
      const pts = generateConcentricRings();
      setPoints(pts);
      const initialC = [
        { x: 4.5, y: 5.0 },
        { x: 5.5, y: 5.0 },
        { x: 5.0, y: 4.5 },
        { x: 5.0, y: 5.5 },
      ];
      setCentroids(initialC);
      buildHistory(initialC, pts);
    }
    if (config.soundEnabled) audio.playClick();
  };

  return (
    <div className="flex flex-col gap-3 p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] specular">
      {/* 1. Header */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider text-[var(--text-secondary)] font-mono">
              Inertia (WCSS):
            </span>
            <span className="font-mono text-sm font-semibold tabular-nums text-[var(--math-loss)]">
              J = {activeSnapshot.inertia.toFixed(1)}
            </span>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            Vector Voronoi 120 FPS
          </span>
        </div>

        <button
          onClick={() => setShowPedagogy(!showPedagogy)}
          className={`px-2.5 py-1 text-xs font-mono rounded-lg border transition-all ${
            showPedagogy
              ? 'border-[var(--math-gradient)] bg-[var(--math-gradient)]/10 text-[var(--math-gradient)]'
              : 'border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]'
          }`}
        >
          {language === 'ar' ? 'التحليل المعرفي' : '4-Tier Deep Dive'}
        </button>
      </div>

      {/* 2. Presets Selector */}
      {!compact && (
        <div className="flex items-center justify-between p-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-app)]">
          <div className="flex items-center gap-1.5 text-xs font-mono">
            <span className="text-[var(--text-tertiary)] px-1">{language === 'ar' ? 'النمط:' : 'Preset:'}</span>
            <button
              onClick={() => handleSelectPreset('gaussian')}
              className={`px-2.5 py-1 rounded text-xs font-mono transition-colors ${
                preset === 'gaussian'
                  ? 'bg-[var(--bg-surface)] text-[var(--text-primary)] font-semibold border border-[var(--border-subtle)]'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {language === 'ar' ? 'عناقيد غاوسية' : '4 Gaussian Clusters'}
            </button>
            <button
              onClick={() => handleSelectPreset('rings')}
              className={`px-2.5 py-1 rounded text-xs font-mono transition-colors ${
                preset === 'rings'
                  ? 'bg-[var(--bg-surface)] text-[var(--text-primary)] font-semibold border border-[var(--border-subtle)]'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {language === 'ar' ? 'حلقات متحدة المركز (فشل K-Means)' : 'Concentric Rings (Failure Mode)'}
            </button>
          </div>

          <span className="text-[10px] font-mono text-[var(--text-tertiary)]">
            Click to add points • Drag diamond centroids
          </span>
        </div>
      )}

      {/* 3. High-DPI Vector Voronoi Canvas */}
      <div className="relative w-full h-80 rounded-lg overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-app)]">
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          className={`w-full h-full block ${
            hoveredCentroid !== null ? 'cursor-grab' : draggedCentroid !== null ? 'cursor-grabbing' : 'cursor-crosshair'
          }`}
        />

        <div className="absolute top-2.5 start-2.5 flex items-center gap-2 pointer-events-none">
          <span className="text-[10px] font-mono text-[var(--text-secondary)] bg-[var(--bg-surface)]/90 backdrop-blur-md px-2 py-0.5 rounded border border-[var(--border-subtle)]">
            {points.length} points • {k} centroids
          </span>
        </div>
      </div>

      {/* 4. Timeline Playback & Lloyd's Micro-Phase Scrubber */}
      {!compact && (
        <TimelinePlaybackBar
          totalSteps={Math.max(0, history.length - 1)}
          currentStep={currentStepIdx}
          stepPhase={activeSnapshot.phase}
          metricLabel="Inertia"
          metricValue={activeSnapshot.inertia}
          onStepChange={(step) => setCurrentStepIdx(step)}
        />
      )}

      {/* 5. Pedagogical Deep Dive */}
      {showPedagogy && !compact && (
        <div className="pt-2">
          <MultiTierDisclosure content={KMEANS_TIER_CONTENT} />
        </div>
      )}
    </div>
  );
};

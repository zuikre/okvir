import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { useOkvirStore } from '@/lib/store';
import { computeVoronoiPolygons, type Vec2 } from '@/lib/canvas/VoronoiClipping';
import { TimelinePlaybackBar } from '@/components/simulation/TimelinePlaybackBar';
import { PreCanvasBriefing, PostCanvasConsolidation, type TierContent } from '@/components/pedagogy/MultiTierDisclosure';
import { audio } from '@/lib/audio';

const CLUSTER_COLORS = ['#38bdf8', '#f59e0b', '#10b981', '#ec4899', '#8b5cf6'];
const CLUSTER_COLORS_BG = [
  'rgba(56, 189, 248, 0.12)',
  'rgba(245, 158, 11, 0.12)',
  'rgba(16, 185, 129, 0.12)',
  'rgba(236, 72, 153, 0.12)',
  'rgba(139, 92, 246, 0.12)',
];

function generateGaussianClusters(): Vec2[] {
  const points: Vec2[] = [];
  const seeds = [
    { cx: 2.8, cy: 2.8, spread: 0.9 },
    { cx: 7.2, cy: 2.6, spread: 1.0 },
    { cx: 2.8, cy: 7.4, spread: 0.9 },
    { cx: 7.4, cy: 7.4, spread: 1.0 },
  ];

  let s = 12345;
  const pseudoRandom = () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };

  seeds.forEach((cluster) => {
    for (let i = 0; i < 14; i++) {
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

  for (let i = 0; i < 20; i++) {
    const theta = (2 * Math.PI * i) / 20;
    const r = 1.3 + Math.sin(i * 3) * 0.15;
    points.push({
      x: Number((cx + r * Math.cos(theta)).toFixed(2)),
      y: Number((cy + r * Math.sin(theta)).toFixed(2)),
    });
  }

  for (let i = 0; i < 34; i++) {
    const theta = (2 * Math.PI * i) / 34;
    const r = 3.6 + Math.cos(i * 4) * 0.2;
    points.push({
      x: Number((cx + r * Math.cos(theta)).toFixed(2)),
      y: Number((cy + r * Math.sin(theta)).toFixed(2)),
    });
  }
  return points;
}

function generateAnisotropicStreaks(): Vec2[] {
  const points: Vec2[] = [];
  for (let i = 0; i < 25; i++) {
    const t = (i / 25) * 4.0 - 2.0;
    points.push({
      x: Number((3.0 + t + (Math.random() - 0.5) * 0.4).toFixed(2)),
      y: Number((3.0 + t * 1.5 + (Math.random() - 0.5) * 0.4).toFixed(2)),
    });
  }
  for (let i = 0; i < 25; i++) {
    const t = (i / 25) * 4.0 - 2.0;
    points.push({
      x: Number((7.0 + t + (Math.random() - 0.5) * 0.4).toFixed(2)),
      y: Number((7.0 + t * 1.5 + (Math.random() - 0.5) * 0.4).toFixed(2)),
    });
  }
  return points;
}

const DEFAULT_CENTROIDS_BY_K: Record<number, Vec2[]> = {
  2: [
    { x: 3.0, y: 5.0 },
    { x: 7.0, y: 5.0 },
  ],
  3: [
    { x: 3.0, y: 3.0 },
    { x: 7.0, y: 3.0 },
    { x: 5.0, y: 7.5 },
  ],
  4: [
    { x: 2.5, y: 2.5 },
    { x: 7.5, y: 2.5 },
    { x: 2.5, y: 7.5 },
    { x: 7.5, y: 7.5 },
  ],
  5: [
    { x: 2.0, y: 2.0 },
    { x: 8.0, y: 2.0 },
    { x: 5.0, y: 5.0 },
    { x: 2.0, y: 8.0 },
    { x: 8.0, y: 8.0 },
  ],
};

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

export const KMeansVoronoi: React.FC<{ compact?: boolean }> = ({ compact = true }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme, language, config } = useOkvirStore();

  const [points, setPoints] = useState<Vec2[]>(generateGaussianClusters());
  const [k, setK] = useState<number>(4);
  const [centroids, setCentroids] = useState<Vec2[]>(DEFAULT_CENTROIDS_BY_K[4]);
  const [draggedCentroid, setDraggedCentroid] = useState<number | null>(null);
  const [hoveredCentroid, setHoveredCentroid] = useState<number | null>(null);
  const [preset, setPreset] = useState<'gaussian' | 'rings' | 'anisotropic'>('gaussian');

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

  // Pre-generate full convergence history
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
  }, [points, centroids, buildHistory]);

  const activeSnapshot: StepSnapshot = useMemo(() => {
    return history[currentStepIdx] || {
      centroids,
      labels: points.map(() => 0),
      inertia: 0,
      phase: 'Initial',
    };
  }, [history, currentStepIdx, centroids, points]);

  // Change K dynamically
  const handleChangeK = (newK: number) => {
    setK(newK);
    const newCentroids = DEFAULT_CENTROIDS_BY_K[newK] || DEFAULT_CENTROIDS_BY_K[4];
    setCentroids(newCentroids);
    buildHistory(newCentroids, points);
    if (config.soundEnabled) audio.playClick();
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

    // 1. Grid Lines
    ctx.strokeStyle = theme === 'dark' ? '#27272a' : '#e4e4e7';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= 10; i += 2) {
      const cx = toCanvasX(i);
      const cy = toCanvasY(i);
      ctx.beginPath();
      ctx.moveTo(cx, pad);
      ctx.lineTo(cx, pad + plotH);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(pad, cy);
      ctx.lineTo(pad + plotW, cy);
      ctx.stroke();
    }

    // 2. Vector Voronoi Tessellation
    const voronoiPolys = computeVoronoiPolygons(
      activeSnapshot.centroids,
      { minX: 0, maxX: 10, minY: 0, maxY: 10 }
    );

    voronoiPolys.forEach((poly, idx) => {
      if (poly.length < 3) return;
      ctx.beginPath();
      ctx.moveTo(toCanvasX(poly[0].x), toCanvasY(poly[0].y));
      for (let p = 1; p < poly.length; p++) {
        ctx.lineTo(toCanvasX(poly[p].x), toCanvasY(poly[p].y));
      }
      ctx.closePath();
      ctx.fillStyle = CLUSTER_COLORS_BG[idx % CLUSTER_COLORS_BG.length];
      ctx.fill();

      ctx.strokeStyle = CLUSTER_COLORS[idx % CLUSTER_COLORS.length];
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });

    // 3. Connect observations to assigned centroid
    ctx.setLineDash([2, 3]);
    points.forEach((p, idx) => {
      const label = activeSnapshot.labels[idx] ?? 0;
      const cent = activeSnapshot.centroids[label];
      if (!cent) return;

      ctx.beginPath();
      ctx.moveTo(toCanvasX(p.x), toCanvasY(p.y));
      ctx.lineTo(toCanvasX(cent.x), toCanvasY(cent.y));
      ctx.strokeStyle = CLUSTER_COLORS[label % CLUSTER_COLORS.length];
      ctx.lineWidth = 0.7;
      ctx.stroke();
    });
    ctx.setLineDash([]);

    // 4. Data Observation Points
    points.forEach((p, idx) => {
      const label = activeSnapshot.labels[idx] ?? 0;
      const color = CLUSTER_COLORS[label % CLUSTER_COLORS.length];
      const px = toCanvasX(p.x);
      const py = toCanvasY(p.y);

      ctx.beginPath();
      ctx.arc(px, py, 4, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    // 5. Cluster Centroids (Draggable Diamonds)
    activeSnapshot.centroids.forEach((c, idx) => {
      const cx = toCanvasX(c.x);
      const cy = toCanvasY(c.y);
      const color = CLUSTER_COLORS[idx % CLUSTER_COLORS.length];
      const isHovered = hoveredCentroid === idx;
      const isDragged = draggedCentroid === idx;

      // Glow Halo
      ctx.beginPath();
      ctx.arc(cx, cy, isDragged ? 16 : isHovered ? 14 : 10, 0, Math.PI * 2);
      ctx.fillStyle = isDragged ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.15)';
      ctx.fill();

      // Diamond Marker
      const r = isDragged ? 9 : 7;
      ctx.beginPath();
      ctx.moveTo(cx, cy - r);
      ctx.lineTo(cx + r, cy);
      ctx.lineTo(cx, cy + r);
      ctx.lineTo(cx - r, cy);
      ctx.closePath();

      ctx.fillStyle = color;
      ctx.fill();
      ctx.strokeStyle = '#fafafa';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Label
      ctx.font = 'bold 11px monospace';
      ctx.fillStyle = color;
      ctx.fillText(`μ${idx + 1}`, cx + 12, cy - 8);
    });
  }, [
    activeSnapshot,
    points,
    hoveredCentroid,
    draggedCentroid,
    theme,
  ]);

  useEffect(() => {
    renderFrame();
  }, [renderFrame]);

  // Pointer interactions
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;

    const pad = 24;
    const plotW = rect.width - pad * 2;
    const plotH = rect.height - pad * 2;
    const toCanvasX = (x: number) => pad + (x / 10) * plotW;
    const toCanvasY = (y: number) => pad + (1 - y / 10) * plotH;

    let hitCentroid: number | null = null;
    activeSnapshot.centroids.forEach((c, idx) => {
      const cx = toCanvasX(c.x);
      const cy = toCanvasY(c.y);
      if (Math.hypot(px - cx, py - cy) <= 18) {
        hitCentroid = idx;
      }
    });

    if (hitCentroid !== null) {
      setDraggedCentroid(hitCentroid);
      try {
        canvas.setPointerCapture(e.pointerId);
      } catch (_err) {
        // Pointer capture not supported or already lost
      }
      if (config.soundEnabled) audio.playClick();
    } else {
      // Add data point
      const newX = Number(Math.max(0.5, Math.min(9.5, ((px - pad) / plotW) * 10)).toFixed(2));
      const newY = Number(Math.max(0.5, Math.min(9.5, (1 - (py - pad) / plotH) * 10)).toFixed(2));
      setPoints((prev) => [...prev, { x: newX, y: newY }]);
      if (config.soundEnabled) audio.playClick();
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;

    const pad = 24;
    const plotW = rect.width - pad * 2;
    const plotH = rect.height - pad * 2;
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
      } catch (_err) {
        // Pointer capture already released or not supported
      }
      setDraggedCentroid(null);
      if (config.soundEnabled) audio.playClick();
    }
  };

  // Right-click point deletion
  const handleContextMenu = (e: React.MouseEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;

    const pad = 24;
    const plotW = rect.width - pad * 2;
    const plotH = rect.height - pad * 2;
    const toCanvasX = (x: number) => pad + (x / 10) * plotW;
    const toCanvasY = (y: number) => pad + (1 - y / 10) * plotH;

    let targetIdx: number | null = null;
    points.forEach((p, idx) => {
      const cx = toCanvasX(p.x);
      const cy = toCanvasY(p.y);
      if (Math.hypot(px - cx, py - cy) <= 14) {
        targetIdx = idx;
      }
    });

    if (targetIdx !== null && points.length > 5) {
      setPoints((prev) => prev.filter((_, idx) => idx !== targetIdx));
      if (config.soundEnabled) audio.playWarning();
    }
  };

  const handleSelectPreset = (p: 'gaussian' | 'rings' | 'anisotropic') => {
    setPreset(p);
    if (p === 'gaussian') {
      const pts = generateGaussianClusters();
      setPoints(pts);
      setCentroids(DEFAULT_CENTROIDS_BY_K[k]);
    } else if (p === 'rings') {
      const pts = generateConcentricRings();
      setPoints(pts);
      setCentroids([
        { x: 4.5, y: 5.0 },
        { x: 5.5, y: 5.0 },
        { x: 5.0, y: 4.5 },
        { x: 5.0, y: 5.5 },
      ].slice(0, k));
    } else {
      const pts = generateAnisotropicStreaks();
      setPoints(pts);
      setCentroids(DEFAULT_CENTROIDS_BY_K[k]);
    }
    if (config.soundEnabled) audio.playSuccess();
  };

  return (
    <div className="flex flex-col gap-4 select-none">
      {/* Pre-Canvas Intuitive Briefing & Mental Model */}
      {!compact && <PreCanvasBriefing content={KMEANS_TIER_CONTENT} />}

      {/* Top Toolbar: Cluster Count K & Presets */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] specular">
        {/* Preset Selector */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-mono text-[var(--text-tertiary)] uppercase tracking-wider me-1">
            {language === 'ar' ? 'البيئة:' : 'Dataset:'}
          </span>
          <button
            onClick={() => handleSelectPreset('gaussian')}
            className={`px-2.5 py-1 text-xs font-mono rounded-lg border transition-all ${
              preset === 'gaussian'
                ? 'border-[var(--math-vector)] bg-[var(--math-vector)]/15 text-[var(--math-vector)] font-bold shadow-sm'
                : 'border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]'
            }`}
          >
            {language === 'ar' ? 'عناقيد غاوسية' : 'Gaussian Blobs'}
          </button>
          <button
            onClick={() => handleSelectPreset('rings')}
            className={`px-2.5 py-1 text-xs font-mono rounded-lg border transition-all ${
              preset === 'rings'
                ? 'border-rose-400 bg-rose-500/15 text-rose-300 font-bold shadow-sm'
                : 'border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]'
            }`}
          >
            {language === 'ar' ? 'حلقات متحدة المركز (فشل K-Means)' : 'Concentric Rings'}
          </button>
          <button
            onClick={() => handleSelectPreset('anisotropic')}
            className={`px-2.5 py-1 text-xs font-mono rounded-lg border transition-all ${
              preset === 'anisotropic'
                ? 'border-purple-400 bg-purple-500/15 text-purple-300 font-bold shadow-sm'
                : 'border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]'
            }`}
          >
            {language === 'ar' ? 'عناقيد بيضاوية مائلة' : 'Anisotropic Streaks'}
          </button>
        </div>

        {/* Cluster Count K Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-[var(--text-tertiary)] uppercase tracking-wider">
            K Clusters:
          </span>
          <div className="flex gap-1">
            {[2, 3, 4, 5].map((kVal) => (
              <button
                key={kVal}
                onClick={() => handleChangeK(kVal)}
                className={`w-7 h-7 text-xs font-mono font-bold rounded-lg border transition-all ${
                  k === kVal
                    ? 'border-emerald-400 bg-emerald-500/20 text-emerald-300 shadow-sm'
                    : 'border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]'
                }`}
              >
                {kVal}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Interactive Vector Voronoi Canvas */}
      <div className="relative rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-app)] overflow-hidden shadow-inner p-2">
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onContextMenu={handleContextMenu}
          className={`w-full h-80 rounded-xl touch-none ${
            hoveredCentroid !== null
              ? 'cursor-grab'
              : draggedCentroid !== null
              ? 'cursor-grabbing'
              : 'cursor-crosshair'
          }`}
        />

        <div className="absolute top-4 start-4 px-2.5 py-1 rounded-md bg-[var(--bg-surface)]/80 backdrop-blur-md border border-[var(--border-subtle)] text-[11px] font-mono text-[var(--text-tertiary)]">
          {language === 'ar'
            ? 'اسحب معينات المراكز μ • انقر لإضافة نقاط • انقر يمين لحذف نقطة'
            : 'Drag diamond centroids μ • Click to add points • Right-click to remove'}
        </div>

        {/* Floating WCSS Telemetry */}
        <div className="absolute top-4 end-4 flex items-center gap-3 px-3 py-1.5 rounded-lg bg-[var(--bg-surface)]/90 backdrop-blur-md border border-[var(--border-subtle)] text-xs font-mono shadow-sm">
          <div>
            <span className="text-[var(--text-tertiary)]">Inertia (WCSS): </span>
            <span className="text-rose-400 font-bold tabular-nums">
              J = {activeSnapshot.inertia.toFixed(1)}
            </span>
          </div>
          <div className="w-px h-3 bg-[var(--border-subtle)]" />
          <div className="text-emerald-400">
            {points.length} pts • {k} centroids
          </div>
        </div>
      </div>

      {/* Timeline Playback Bar */}
      <TimelinePlaybackBar
        totalSteps={Math.max(1, history.length - 1)}
        currentStep={currentStepIdx}
        stepPhase={activeSnapshot.phase}
        metricLabel="Inertia"
        metricValue={activeSnapshot.inertia}
        onStepChange={(step) => setCurrentStepIdx(step)}
      />

      {/* Post-Canvas Mathematical & Code Consolidation */}
      {!compact && <PostCanvasConsolidation content={KMEANS_TIER_CONTENT} />}
    </div>
  );
};

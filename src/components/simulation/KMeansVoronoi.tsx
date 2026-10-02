import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { useOkvirStore } from '@/lib/store';
import { computeVoronoiPolygons, type Vec2 } from '@/lib/canvas/VoronoiClipping';
import { TimelinePlaybackBar } from '@/components/simulation/TimelinePlaybackBar';
import { PreCanvasBriefing, PostCanvasConsolidation, type TierContent } from '@/components/pedagogy/MultiTierDisclosure';
import { audio } from '@/lib/audio';
import {
  Layers,
  Activity,
  TrendingDown,
  BarChart2,
  RefreshCw,
  Sparkles,
  Eye,
  Sliders,
  CheckCircle2,
} from 'lucide-react';

export const CLUSTER_COLORS = [
  '#38bdf8', // 0: Sky Blue
  '#f59e0b', // 1: Amber Gold
  '#10b981', // 2: Emerald Green
  '#ec4899', // 3: Fuchsia Pink
  '#8b5cf6', // 4: Violet Purple
  '#06b6d4', // 5: Cyan
  '#f97316', // 6: Coral Orange
  '#84cc16', // 7: Lime Green
];

export const CLUSTER_COLORS_BG = [
  'rgba(56, 189, 248, 0.14)',
  'rgba(245, 158, 11, 0.14)',
  'rgba(16, 185, 129, 0.14)',
  'rgba(236, 72, 153, 0.14)',
  'rgba(139, 92, 246, 0.14)',
  'rgba(6, 182, 212, 0.14)',
  'rgba(249, 115, 22, 0.14)',
  'rgba(132, 204, 22, 0.14)',
];

export type DatasetPreset = 'gaussian' | 'rings' | 'anisotropic' | 'moons' | 'variances' | 'uniform';
export type InitStrategy = 'kmeans++' | 'forgy' | 'random' | 'grid';
export type GraphTab = 'convergence' | 'elbow' | 'distribution';

// --- Synthetic Point Generators with Variable Density N ---

function generateGaussianClusters(n: number, seedVal = 12345): Vec2[] {
  const points: Vec2[] = [];
  const clusters = [
    { cx: 2.6, cy: 2.6, spread: 0.75 },
    { cx: 7.4, cy: 2.5, spread: 0.85 },
    { cx: 2.5, cy: 7.4, spread: 0.75 },
    { cx: 7.5, cy: 7.5, spread: 0.85 },
    { cx: 5.0, cy: 5.0, spread: 0.65 },
  ];
  let s = seedVal;
  const rnd = () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
  const ptsPerCluster = Math.floor(n / clusters.length);
  clusters.forEach((c, cIdx) => {
    const count = cIdx === clusters.length - 1 ? n - ptsPerCluster * (clusters.length - 1) : ptsPerCluster;
    for (let i = 0; i < count; i++) {
      const u1 = Math.max(1e-6, rnd());
      const u2 = rnd();
      const r = c.spread * Math.sqrt(-2 * Math.log(u1));
      const theta = 2 * Math.PI * u2;
      const x = Math.max(0.6, Math.min(9.4, c.cx + r * Math.cos(theta)));
      const y = Math.max(0.6, Math.min(9.4, c.cy + r * Math.sin(theta)));
      points.push({ x: Number(x.toFixed(2)), y: Number(y.toFixed(2)) });
    }
  });
  return points;
}

function generateConcentricRings(n: number, seedVal = 12345): Vec2[] {
  const points: Vec2[] = [];
  const cx = 5.0,
    cy = 5.0;
  let s = seedVal;
  const rnd = () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
  const nInner = Math.floor(n * 0.25);
  const nMid = Math.floor(n * 0.35);
  const nOuter = n - nInner - nMid;

  // Inner ring
  for (let i = 0; i < nInner; i++) {
    const theta = rnd() * 2 * Math.PI;
    const r = 1.2 + (rnd() - 0.5) * 0.35;
    points.push({
      x: Number(Math.max(0.6, Math.min(9.4, cx + r * Math.cos(theta))).toFixed(2)),
      y: Number(Math.max(0.6, Math.min(9.4, cy + r * Math.sin(theta))).toFixed(2)),
    });
  }
  // Mid ring
  for (let i = 0; i < nMid; i++) {
    const theta = rnd() * 2 * Math.PI;
    const r = 2.6 + (rnd() - 0.5) * 0.45;
    points.push({
      x: Number(Math.max(0.6, Math.min(9.4, cx + r * Math.cos(theta))).toFixed(2)),
      y: Number(Math.max(0.6, Math.min(9.4, cy + r * Math.sin(theta))).toFixed(2)),
    });
  }
  // Outer ring
  for (let i = 0; i < nOuter; i++) {
    const theta = rnd() * 2 * Math.PI;
    const r = 3.9 + (rnd() - 0.5) * 0.5;
    points.push({
      x: Number(Math.max(0.6, Math.min(9.4, cx + r * Math.cos(theta))).toFixed(2)),
      y: Number(Math.max(0.6, Math.min(9.4, cy + r * Math.sin(theta))).toFixed(2)),
    });
  }
  return points;
}

function generateAnisotropicStreaks(n: number, seedVal = 12345): Vec2[] {
  const points: Vec2[] = [];
  let s = seedVal;
  const rnd = () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
  const centers = [
    { cx: 2.8, cy: 2.8 },
    { cx: 7.2, cy: 4.5 },
    { cx: 4.8, cy: 7.2 },
  ];
  const ptsPerCluster = Math.floor(n / centers.length);
  const cosA = Math.cos(Math.PI / 4);
  const sinA = Math.sin(Math.PI / 4);

  centers.forEach((c, cIdx) => {
    const count = cIdx === centers.length - 1 ? n - ptsPerCluster * (centers.length - 1) : ptsPerCluster;
    for (let i = 0; i < count; i++) {
      const u1 = Math.max(1e-6, rnd());
      const u2 = rnd();
      const std1 = 1.4 * Math.sqrt(-2 * Math.log(u1));
      const theta = 2 * Math.PI * u2;
      const xLocal = std1 * Math.cos(theta);
      const yLocal = 0.28 * std1 * Math.sin(theta);

      const xRot = c.cx + xLocal * cosA - yLocal * sinA;
      const yRot = c.cy + xLocal * sinA + yLocal * cosA;

      points.push({
        x: Number(Math.max(0.6, Math.min(9.4, xRot)).toFixed(2)),
        y: Number(Math.max(0.6, Math.min(9.4, yRot)).toFixed(2)),
      });
    }
  });
  return points;
}

function generateTwoMoons(n: number, seedVal = 12345): Vec2[] {
  const points: Vec2[] = [];
  let s = seedVal;
  const rnd = () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
  const n1 = Math.floor(n / 2);
  const n2 = n - n1;
  // Top moon
  for (let i = 0; i < n1; i++) {
    const theta = rnd() * Math.PI;
    const r = 2.4 + (rnd() - 0.5) * 0.45;
    const x = 3.6 + r * Math.cos(theta);
    const y = 4.8 + r * Math.sin(theta);
    points.push({
      x: Number(Math.max(0.6, Math.min(9.4, x)).toFixed(2)),
      y: Number(Math.max(0.6, Math.min(9.4, y)).toFixed(2)),
    });
  }
  // Bottom moon
  for (let i = 0; i < n2; i++) {
    const theta = Math.PI + rnd() * Math.PI;
    const r = 2.4 + (rnd() - 0.5) * 0.45;
    const x = 6.4 + r * Math.cos(theta);
    const y = 5.2 + r * Math.sin(theta);
    points.push({
      x: Number(Math.max(0.6, Math.min(9.4, x)).toFixed(2)),
      y: Number(Math.max(0.6, Math.min(9.4, y)).toFixed(2)),
    });
  }
  return points;
}

function generateUnequalVariances(n: number, seedVal = 12345): Vec2[] {
  const points: Vec2[] = [];
  let s = seedVal;
  const rnd = () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
  const nTight = Math.floor(n * 0.5);
  const nWide1 = Math.floor(n * 0.25);
  const nWide2 = n - nTight - nWide1;

  // Tight cluster
  for (let i = 0; i < nTight; i++) {
    const u1 = Math.max(1e-6, rnd());
    const u2 = rnd();
    const r = 0.35 * Math.sqrt(-2 * Math.log(u1));
    const theta = 2 * Math.PI * u2;
    points.push({
      x: Number(Math.max(0.6, Math.min(9.4, 3.0 + r * Math.cos(theta))).toFixed(2)),
      y: Number(Math.max(0.6, Math.min(9.4, 3.2 + r * Math.sin(theta))).toFixed(2)),
    });
  }
  // Wide cluster 1
  for (let i = 0; i < nWide1; i++) {
    const u1 = Math.max(1e-6, rnd());
    const u2 = rnd();
    const r = 1.25 * Math.sqrt(-2 * Math.log(u1));
    const theta = 2 * Math.PI * u2;
    points.push({
      x: Number(Math.max(0.6, Math.min(9.4, 7.0 + r * Math.cos(theta))).toFixed(2)),
      y: Number(Math.max(0.6, Math.min(9.4, 6.8 + r * Math.sin(theta))).toFixed(2)),
    });
  }
  // Wide cluster 2
  for (let i = 0; i < nWide2; i++) {
    const u1 = Math.max(1e-6, rnd());
    const u2 = rnd();
    const r = 0.95 * Math.sqrt(-2 * Math.log(u1));
    const theta = 2 * Math.PI * u2;
    points.push({
      x: Number(Math.max(0.6, Math.min(9.4, 3.2 + r * Math.cos(theta))).toFixed(2)),
      y: Number(Math.max(0.6, Math.min(9.4, 7.4 + r * Math.sin(theta))).toFixed(2)),
    });
  }
  return points;
}

function generateUniformCloud(n: number, seedVal = 12345): Vec2[] {
  const points: Vec2[] = [];
  let s = seedVal;
  const rnd = () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
  for (let i = 0; i < n; i++) {
    points.push({
      x: Number((0.8 + rnd() * 8.4).toFixed(2)),
      y: Number((0.8 + rnd() * 8.4).toFixed(2)),
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
  6: [
    { x: 2.5, y: 3.0 },
    { x: 5.0, y: 3.0 },
    { x: 7.5, y: 3.0 },
    { x: 2.5, y: 7.0 },
    { x: 5.0, y: 7.0 },
    { x: 7.5, y: 7.0 },
  ],
  7: [
    { x: 5.0, y: 5.0 },
    { x: 2.5, y: 2.5 },
    { x: 7.5, y: 2.5 },
    { x: 2.5, y: 7.5 },
    { x: 7.5, y: 7.5 },
    { x: 2.0, y: 5.0 },
    { x: 8.0, y: 5.0 },
  ],
  8: [
    { x: 2.5, y: 2.5 },
    { x: 5.0, y: 2.0 },
    { x: 7.5, y: 2.5 },
    { x: 2.0, y: 5.0 },
    { x: 8.0, y: 5.0 },
    { x: 2.5, y: 7.5 },
    { x: 5.0, y: 8.0 },
    { x: 7.5, y: 7.5 },
  ],
};

// K-Means++ Initialization
function initializeCentroids(points: Vec2[], k: number, strategy: InitStrategy): Vec2[] {
  if (points.length === 0) return DEFAULT_CENTROIDS_BY_K[k] || [];

  if (strategy === 'grid') {
    return (DEFAULT_CENTROIDS_BY_K[k] || DEFAULT_CENTROIDS_BY_K[4]).map((p) => ({ ...p }));
  }

  if (strategy === 'random') {
    const cents: Vec2[] = [];
    for (let i = 0; i < k; i++) {
      cents.push({
        x: Number((1.5 + Math.random() * 7.0).toFixed(2)),
        y: Number((1.5 + Math.random() * 7.0).toFixed(2)),
      });
    }
    return cents;
  }

  if (strategy === 'forgy') {
    const cents: Vec2[] = [];
    const used = new Set<number>();
    while (cents.length < k && used.size < points.length) {
      const idx = Math.floor(Math.random() * points.length);
      if (!used.has(idx)) {
        used.add(idx);
        cents.push({ ...points[idx] });
      }
    }
    while (cents.length < k) {
      cents.push({ x: 5.0, y: 5.0 });
    }
    return cents;
  }

  // strategy === 'kmeans++'
  const centroids: Vec2[] = [];
  const firstIdx = Math.floor(Math.random() * points.length);
  centroids.push({ ...points[firstIdx] });

  while (centroids.length < k) {
    const distSq = points.map((p) => {
      let minD = Infinity;
      for (const c of centroids) {
        const d = (p.x - c.x) ** 2 + (p.y - c.y) ** 2;
        if (d < minD) minD = d;
      }
      return minD;
    });

    const sumDist = distSq.reduce((a, b) => a + b, 0);
    if (sumDist <= 1e-9) {
      const randIdx = Math.floor(Math.random() * points.length);
      centroids.push({ ...points[randIdx] });
      continue;
    }

    let r = Math.random() * sumDist;
    let chosenIdx = 0;
    for (let i = 0; i < points.length; i++) {
      r -= distSq[i];
      if (r <= 0) {
        chosenIdx = i;
        break;
      }
    }
    centroids.push({ ...points[chosenIdx] });
  }

  return centroids;
}

// Fast solver for the Elbow Method graph
function runFastKMeans(points: Vec2[], k: number, maxIter = 12): number {
  if (points.length === 0) return 0;
  if (k === 1) {
    const meanX = points.reduce((s, p) => s + p.x, 0) / points.length;
    const meanY = points.reduce((s, p) => s + p.y, 0) / points.length;
    return points.reduce((s, p) => s + (p.x - meanX) ** 2 + (p.y - meanY) ** 2, 0);
  }

  let centroids = initializeCentroids(points, k, 'kmeans++');
  for (let iter = 0; iter < maxIter; iter++) {
    const counts = new Array(k).fill(0);
    const sumX = new Array(k).fill(0);
    const sumY = new Array(k).fill(0);

    for (let i = 0; i < points.length; i++) {
      const p = points[i];
      let bestK = 0;
      let minD = Infinity;
      for (let j = 0; j < k; j++) {
        const d = (p.x - centroids[j].x) ** 2 + (p.y - centroids[j].y) ** 2;
        if (d < minD) {
          minD = d;
          bestK = j;
        }
      }
      counts[bestK]++;
      sumX[bestK] += p.x;
      sumY[bestK] += p.y;
    }

    let maxShift = 0;
    for (let j = 0; j < k; j++) {
      if (counts[j] > 0) {
        const nx = sumX[j] / counts[j];
        const ny = sumY[j] / counts[j];
        const shift = Math.hypot(nx - centroids[j].x, ny - centroids[j].y);
        if (shift > maxShift) maxShift = shift;
        centroids[j] = { x: nx, y: ny };
      }
    }
    if (maxShift < 0.01) break;
  }

  let totalInertia = 0;
  for (let i = 0; i < points.length; i++) {
    const p = points[i];
    let minD = Infinity;
    for (let j = 0; j < k; j++) {
      const d = (p.x - centroids[j].x) ** 2 + (p.y - centroids[j].y) ** 2;
      if (d < minD) minD = d;
    }
    totalInertia += minD;
  }
  return totalInertia;
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

export interface StepSnapshot {
  centroids: Vec2[];
  labels: number[];
  inertia: number;
  phase: string;
  reassignedCount: number;
  maxCentroidShift: number;
}

export const KMeansVoronoi: React.FC<{ compact?: boolean }> = ({ compact = true }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme, language, config } = useOkvirStore();

  // Dataset & Clustering Configuration
  const [pointCount, setPointCount] = useState<number>(180);
  const [randomSeed, setRandomSeed] = useState<number>(42);
  const [preset, setPreset] = useState<DatasetPreset>('gaussian');
  const [initStrategy, setInitStrategy] = useState<InitStrategy>('kmeans++');
  const [k, setK] = useState<number>(4);

  // Visual Toggles
  const [showVoronoi, setShowVoronoi] = useState<boolean>(true);
  const [showTrails, setShowTrails] = useState<boolean>(true);
  const [showSpiders, setShowSpiders] = useState<boolean>(true);
  const [showRadii, setShowRadii] = useState<boolean>(false);
  const [activeGraphTab, setActiveGraphTab] = useState<GraphTab>('convergence');

  // Interactive Data Points & Centroids
  const [points, setPoints] = useState<Vec2[]>(() => generateGaussianClusters(180, 42));
  const [centroids, setCentroids] = useState<Vec2[]>(() => initializeCentroids(generateGaussianClusters(180, 42), 4, 'kmeans++'));

  // Pointer Dragging & Hovering
  const [draggedCentroid, setDraggedCentroid] = useState<number | null>(null);
  const [hoveredCentroid, setHoveredCentroid] = useState<number | null>(null);

  // History Snapshots for Timeline Stepper
  const [history, setHistory] = useState<StepSnapshot[]>([]);
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);

  // Regenerate Points on preset or density change
  const regenerateDataset = useCallback((p: DatasetPreset, count: number, seed: number) => {
    let newPts: Vec2[];
    switch (p) {
      case 'gaussian':
        newPts = generateGaussianClusters(count, seed);
        break;
      case 'rings':
        newPts = generateConcentricRings(count, seed);
        break;
      case 'anisotropic':
        newPts = generateAnisotropicStreaks(count, seed);
        break;
      case 'moons':
        newPts = generateTwoMoons(count, seed);
        break;
      case 'variances':
        newPts = generateUnequalVariances(count, seed);
        break;
      case 'uniform':
        newPts = generateUniformCloud(count, seed);
        break;
    }
    setPoints(newPts);
    return newPts;
  }, []);

  // Compute cluster labels & inertia with empty cluster safeguard
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

  // Pre-generate full Lloyd convergence history
  const buildHistory = useCallback(
    (initCentroids: Vec2[], dataPts: Vec2[]) => {
      const snaps: StepSnapshot[] = [];
      let c = initCentroids.map((pt) => ({ ...pt }));
      let prevLabels: number[] = [];

      for (let iter = 0; iter < 20; iter++) {
        // Phase 1: Voronoi Point Assignment
        const { assignments, inertia } = evaluateCentroids(c, dataPts);
        let reassigned = 0;
        if (prevLabels.length === assignments.length) {
          for (let i = 0; i < assignments.length; i++) {
            if (assignments[i] !== prevLabels[i]) reassigned++;
          }
        }
        prevLabels = assignments;

        snaps.push({
          centroids: c.map((pt) => ({ ...pt })),
          labels: assignments,
          inertia,
          phase: language === 'ar' ? 'تخصيص النقاط (فورونوي)' : 'Point Assignment (Voronoi)',
          reassignedCount: reassigned,
          maxCentroidShift: 0,
        });

        // Phase 2: Centroid Update (Barycenters)
        const nextC = c.map((cent, idx) => {
          const clusterPts = dataPts.filter((_, pIdx) => assignments[pIdx] === idx);
          if (clusterPts.length === 0) {
            // Safeguard for empty cluster: re-assign center to point with highest error
            let maxErr = -1;
            let worstPt = cent;
            dataPts.forEach((p) => {
              let minD = Infinity;
              c.forEach((otherC) => {
                const d = (p.x - otherC.x) ** 2 + (p.y - otherC.y) ** 2;
                if (d < minD) minD = d;
              });
              if (minD > maxErr) {
                maxErr = minD;
                worstPt = p;
              }
            });
            return { x: worstPt.x, y: worstPt.y };
          }
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
          phase: language === 'ar' ? 'تحديث المراكز (مركز الثقل)' : 'Centroid Update (Barycenter)',
          reassignedCount: 0,
          maxCentroidShift: Number(maxShift.toFixed(3)),
        });

        c = nextC;
        if (maxShift < 0.005) break;
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
    return (
      history[currentStepIdx] || {
        centroids,
        labels: points.map(() => 0),
        inertia: 0,
        phase: 'Initial',
        reassignedCount: 0,
        maxCentroidShift: 0,
      }
    );
  }, [history, currentStepIdx, centroids, points]);

  // Compute Fast Elbow Values for K = 1..8
  const elbowValues = useMemo(() => {
    const vals: { kVal: number; inertia: number }[] = [];
    for (let kv = 1; kv <= 8; kv++) {
      vals.push({ kVal: kv, inertia: runFastKMeans(points, kv) });
    }
    return vals;
  }, [points]);

  // Cluster distribution & empirical spread metrics
  const clusterMetrics = useMemo(() => {
    const counts = new Array(k).fill(0);
    const sumDist = new Array(k).fill(0);
    const sumSqDist = new Array(k).fill(0);

    points.forEach((p, idx) => {
      const label = activeSnapshot.labels[idx] ?? 0;
      if (label < k) {
        counts[label]++;
        const cent = activeSnapshot.centroids[label];
        if (cent) {
          const dist = Math.hypot(p.x - cent.x, p.y - cent.y);
          sumDist[label] += dist;
          sumSqDist[label] += dist * dist;
        }
      }
    });

    return counts.map((cnt, idx) => {
      const meanDist = cnt > 0 ? sumDist[idx] / cnt : 0;
      const stdRadius = cnt > 0 ? Math.sqrt(sumSqDist[idx] / cnt) : 0;
      return {
        idx,
        count: cnt,
        percentage: points.length > 0 ? (cnt / points.length) * 100 : 0,
        meanDist: Number(meanDist.toFixed(2)),
        stdRadius: Number(stdRadius.toFixed(2)),
      };
    });
  }, [points, activeSnapshot, k]);

  // Handle Preset change
  const handleSelectPreset = (p: DatasetPreset) => {
    setPreset(p);
    const newPts = regenerateDataset(p, pointCount, randomSeed);
    const newCents = initializeCentroids(newPts, k, initStrategy);
    setCentroids(newCents);
    if (config.soundEnabled) audio.playSuccess();
  };

  // Handle Density Change
  const handleChangeDensity = (newCount: number) => {
    setPointCount(newCount);
    const newPts = regenerateDataset(preset, newCount, randomSeed);
    const newCents = initializeCentroids(newPts, k, initStrategy);
    setCentroids(newCents);
    if (config.soundEnabled) audio.playClick();
  };

  // Handle Randomize / Reseed
  const handleReseed = () => {
    const nextSeed = Math.floor(Math.random() * 999999);
    setRandomSeed(nextSeed);
    const newPts = regenerateDataset(preset, pointCount, nextSeed);
    const newCents = initializeCentroids(newPts, k, initStrategy);
    setCentroids(newCents);
    if (config.soundEnabled) audio.playClick();
  };

  // Handle Change K
  const handleChangeK = (newK: number) => {
    setK(newK);
    const newCentroids = initializeCentroids(points, newK, initStrategy);
    setCentroids(newCentroids);
    if (config.soundEnabled) audio.playClick();
  };

  // Handle Init Strategy Change
  const handleChangeInitStrategy = (strat: InitStrategy) => {
    setInitStrategy(strat);
    const newCentroids = initializeCentroids(points, k, strat);
    setCentroids(newCentroids);
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

    const pad = 26;
    const plotW = width - pad * 2;
    const plotH = height - pad * 2;
    const toCanvasX = (x: number) => pad + (x / 10) * plotW;
    const toCanvasY = (y: number) => pad + (1 - y / 10) * plotH;

    // 1. Sleek Background Grid & Axis Markings
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

      // Axis labels
      ctx.font = '9px monospace';
      ctx.fillStyle = theme === 'dark' ? '#71717a' : '#a1a1aa';
      ctx.fillText(i.toString(), cx - 3, pad + plotH + 14);
      if (i > 0) {
        ctx.fillText(i.toString(), pad - 16, cy + 3);
      }
    }

    // 2. Vector Voronoi Tessellation Polygons
    if (showVoronoi) {
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
    }

    // 3. Cluster 1-Sigma Dispersion Radii (Empirical Covariance Circle)
    if (showRadii) {
      clusterMetrics.forEach((cm) => {
        const cent = activeSnapshot.centroids[cm.idx];
        if (!cent || cm.stdRadius <= 0) return;
        const cx = toCanvasX(cent.x);
        const cy = toCanvasY(cent.y);
        const rPx = (cm.stdRadius / 10) * plotW;

        ctx.beginPath();
        ctx.arc(cx, cy, rPx, 0, Math.PI * 2);
        ctx.strokeStyle = CLUSTER_COLORS[cm.idx % CLUSTER_COLORS.length];
        ctx.lineWidth = 1.2;
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.setLineDash([]);
      });
    }

    // 4. Centroid Historical Trajectories (Breadcrumb Trails)
    if (showTrails && history.length > 0) {
      activeSnapshot.centroids.forEach((_, cIdx) => {
        const trail = history
          .slice(0, currentStepIdx + 1)
          .map((h) => h.centroids[cIdx])
          .filter(Boolean);

        if (trail.length > 1) {
          ctx.beginPath();
          ctx.moveTo(toCanvasX(trail[0].x), toCanvasY(trail[0].y));
          for (let s = 1; s < trail.length; s++) {
            ctx.lineTo(toCanvasX(trail[s].x), toCanvasY(trail[s].y));
          }
          ctx.strokeStyle = CLUSTER_COLORS[cIdx % CLUSTER_COLORS.length];
          ctx.lineWidth = 2.0;
          ctx.setLineDash([3, 3]);
          ctx.stroke();
          ctx.setLineDash([]);

          // Trajectory checkpoint dots
          trail.forEach((pt) => {
            ctx.beginPath();
            ctx.arc(toCanvasX(pt.x), toCanvasY(pt.y), 2.5, 0, Math.PI * 2);
            ctx.fillStyle = CLUSTER_COLORS[cIdx % CLUSTER_COLORS.length];
            ctx.fill();
          });
        }
      });
    }

    // 5. Spider Lines connecting points to assigned centroid
    if (showSpiders) {
      ctx.setLineDash([2, 4]);
      points.forEach((p, idx) => {
        const label = activeSnapshot.labels[idx] ?? 0;
        const cent = activeSnapshot.centroids[label];
        if (!cent) return;

        ctx.beginPath();
        ctx.moveTo(toCanvasX(p.x), toCanvasY(p.y));
        ctx.lineTo(toCanvasX(cent.x), toCanvasY(cent.y));
        ctx.strokeStyle = CLUSTER_COLORS[label % CLUSTER_COLORS.length];
        ctx.lineWidth = 0.5;
        ctx.stroke();
      });
      ctx.setLineDash([]);
    }

    // 6. Data Observation Points
    const prevSnap = currentStepIdx > 0 ? history[currentStepIdx - 1] : null;
    const ptRadius = points.length > 280 ? 3.0 : points.length > 120 ? 3.8 : 4.5;

    points.forEach((p, idx) => {
      const label = activeSnapshot.labels[idx] ?? 0;
      const color = CLUSTER_COLORS[label % CLUSTER_COLORS.length];
      const px = toCanvasX(p.x);
      const py = toCanvasY(p.y);

      // Highlight points that switched clusters during this step
      const changed = prevSnap && prevSnap.labels[idx] !== label;
      if (changed) {
        ctx.beginPath();
        ctx.arc(px, py, ptRadius + 4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(245, 158, 11, 0.4)';
        ctx.fill();
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.arc(px, py, ptRadius, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 0.8;
      ctx.stroke();
    });

    // 7. Cluster Centroids (Draggable Diamonds with Golden Aura)
    activeSnapshot.centroids.forEach((c, idx) => {
      const cx = toCanvasX(c.x);
      const cy = toCanvasY(c.y);
      const color = CLUSTER_COLORS[idx % CLUSTER_COLORS.length];
      const isHovered = hoveredCentroid === idx;
      const isDragged = draggedCentroid === idx;

      // Glow Halo
      ctx.beginPath();
      ctx.arc(cx, cy, isDragged ? 18 : isHovered ? 15 : 11, 0, Math.PI * 2);
      ctx.fillStyle = isDragged ? 'rgba(255, 255, 255, 0.35)' : 'rgba(255, 255, 255, 0.18)';
      ctx.fill();

      // Diamond Marker
      const r = isDragged ? 9.5 : 7.5;
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

      // Centroid label μ_k
      ctx.font = 'bold 11px monospace';
      ctx.fillStyle = color;
      ctx.fillText(`μ${idx + 1}`, cx + 12, cy - 8);
    });
  }, [
    activeSnapshot,
    points,
    history,
    currentStepIdx,
    showVoronoi,
    showTrails,
    showSpiders,
    showRadii,
    clusterMetrics,
    hoveredCentroid,
    draggedCentroid,
    theme,
  ]);

  useEffect(() => {
    renderFrame();
  }, [renderFrame]);

  // Pointer interactions for dragging centroids and adding points
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;

    const pad = 26;
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
        // Fallback if pointer capture unavailable
      }
      if (config.soundEnabled) audio.playClick();
    } else {
      // Add data observation point
      const newX = Number(Math.max(0.6, Math.min(9.4, ((px - pad) / plotW) * 10)).toFixed(2));
      const newY = Number(Math.max(0.6, Math.min(9.4, (1 - (py - pad) / plotH) * 10)).toFixed(2));
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

    const pad = 26;
    const plotW = rect.width - pad * 2;
    const plotH = rect.height - pad * 2;
    const toCanvasX = (x: number) => pad + (x / 10) * plotW;
    const toCanvasY = (y: number) => pad + (1 - y / 10) * plotH;
    const fromCanvasX = (xPx: number) => Math.max(0.6, Math.min(9.4, ((xPx - pad) / plotW) * 10));
    const fromCanvasY = (yPx: number) => Math.max(0.6, Math.min(9.4, (1 - (yPx - pad) / plotH) * 10));

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
        // Ignored
      }
      setDraggedCentroid(null);
      if (config.soundEnabled) audio.playClick();
    }
  };

  // Right-click point removal
  const handleContextMenu = (e: React.MouseEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;

    const pad = 26;
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

  const initialInertia = history[0]?.inertia || activeSnapshot.inertia;
  const currentInertia = activeSnapshot.inertia;
  const totalDropPct = initialInertia > 0 ? ((initialInertia - currentInertia) / initialInertia) * 100 : 0;

  return (
    <div className="flex flex-col gap-4 select-none">
      {/* Pre-Canvas Intuitive Briefing & Mental Model */}
      {!compact && <PreCanvasBriefing content={KMEANS_TIER_CONTENT} />}

      {/* Top Parameter Toolbar: Presets, Density, K Selector, and Reseed */}
      <div className="flex flex-col gap-3 p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] specular shadow-xs">
        {/* Row 1: Dataset Presets */}
        <div className="flex flex-wrap items-center justify-between gap-2.5">
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
                  ? 'border-[var(--math-loss)] bg-[var(--math-loss)]/15 text-[var(--math-loss)] font-bold shadow-sm'
                  : 'border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]'
              }`}
            >
              {language === 'ar' ? 'حلقات متحدة المركز' : 'Concentric Rings'}
            </button>
            <button
              onClick={() => handleSelectPreset('anisotropic')}
              className={`px-2.5 py-1 text-xs font-mono rounded-lg border transition-all ${
                preset === 'anisotropic'
                  ? 'border-[var(--math-prediction)] bg-[var(--math-prediction)]/15 text-[var(--math-prediction)] font-bold shadow-sm'
                  : 'border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]'
              }`}
            >
              {language === 'ar' ? 'عناقيد مائلة' : 'Anisotropic Streaks'}
            </button>
            <button
              onClick={() => handleSelectPreset('moons')}
              className={`px-2.5 py-1 text-xs font-mono rounded-lg border transition-all ${
                preset === 'moons'
                  ? 'border-indigo-500 bg-indigo-500/15 text-indigo-400 font-bold shadow-sm'
                  : 'border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]'
              }`}
            >
              {language === 'ar' ? 'أهلة متداخلة' : 'Two Moons'}
            </button>
            <button
              onClick={() => handleSelectPreset('variances')}
              className={`px-2.5 py-1 text-xs font-mono rounded-lg border transition-all ${
                preset === 'variances'
                  ? 'border-emerald-500 bg-emerald-500/15 text-emerald-400 font-bold shadow-sm'
                  : 'border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]'
              }`}
            >
              {language === 'ar' ? 'تباين متفاوت' : 'Unequal Variances'}
            </button>
            <button
              onClick={() => handleSelectPreset('uniform')}
              className={`px-2.5 py-1 text-xs font-mono rounded-lg border transition-all ${
                preset === 'uniform'
                  ? 'border-amber-500 bg-amber-500/15 text-amber-400 font-bold shadow-sm'
                  : 'border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]'
              }`}
            >
              {language === 'ar' ? 'سحابة منتظمة' : 'Uniform Cloud'}
            </button>
          </div>

          {/* Re-seed Button */}
          <button
            onClick={handleReseed}
            title={language === 'ar' ? 'إعادة توليد عشوائي' : 'Re-roll random seed'}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono rounded-lg border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:bg-[var(--bg-surface-hover)] transition-all active:scale-95"
          >
            <RefreshCw size={12} className="text-[var(--math-vector)]" />
            <span>{language === 'ar' ? 'توليد جديد' : 'Re-Seed'}</span>
          </button>
        </div>

        {/* Row 2: Density (Points Count) + K Clusters + Initialization Strategy */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[var(--border-subtle)]">
          {/* Point Count Selector */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-mono text-[var(--text-tertiary)] uppercase tracking-wider me-1">
              {language === 'ar' ? 'النقاط N:' : 'Points N:'}
            </span>
            {[80, 180, 320, 500].map((count) => (
              <button
                key={count}
                onClick={() => handleChangeDensity(count)}
                className={`px-2 py-0.5 text-xs font-mono rounded-md border transition-all ${
                  pointCount === count
                    ? 'border-[var(--math-gradient)] bg-[var(--math-gradient)]/15 text-[var(--math-gradient)] font-bold'
                    : 'border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]'
                }`}
              >
                {count}
              </button>
            ))}
          </div>

          {/* K Clusters Selector (K = 2..8) */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-mono text-[var(--text-tertiary)] uppercase tracking-wider me-1">
              K Clusters:
            </span>
            <div className="flex gap-1">
              {[2, 3, 4, 5, 6, 7, 8].map((kVal) => (
                <button
                  key={kVal}
                  onClick={() => handleChangeK(kVal)}
                  className={`w-7 h-7 text-xs font-mono font-bold rounded-lg border transition-all ${
                    k === kVal
                      ? 'border-[var(--math-vector)] bg-[var(--math-vector)]/20 text-[var(--math-vector)] shadow-xs scale-105'
                      : 'border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]'
                  }`}
                >
                  {kVal}
                </button>
              ))}
            </div>
          </div>

          {/* Initialization Method Selector */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-mono text-[var(--text-tertiary)] uppercase tracking-wider me-1">
              Init:
            </span>
            <select
              value={initStrategy}
              onChange={(e) => handleChangeInitStrategy(e.target.value as InitStrategy)}
              className="bg-[var(--bg-app)] border border-[var(--border-subtle)] text-[var(--text-primary)] text-xs font-mono rounded-lg px-2 py-1 outline-none cursor-pointer focus:border-[var(--math-vector)]"
            >
              <option value="kmeans++">K-Means++ (Smart D²)</option>
              <option value="forgy">Forgy (Random Pts)</option>
              <option value="random">Uniform Box</option>
              <option value="grid">Symmetric Grid</option>
            </select>
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
          className={`w-full h-84 md:h-96 rounded-xl touch-none ${
            hoveredCentroid !== null
              ? 'cursor-grab'
              : draggedCentroid !== null
              ? 'cursor-grabbing'
              : 'cursor-crosshair'
          }`}
        />

        {/* Top-Left Intuitive Instructions */}
        <div className="absolute top-4 start-4 px-2.5 py-1.5 rounded-lg bg-[var(--bg-surface)]/85 backdrop-blur-md border border-[var(--border-subtle)] text-[11px] font-mono text-[var(--text-tertiary)] flex items-center gap-1.5 shadow-xs">
          <Sparkles size={12} className="text-[var(--math-vector)]" />
          <span>
            {language === 'ar'
              ? 'اسحب معينات المراكز μ • انقر لإضافة نقاط • انقر يمين لحذف نقطة'
              : 'Drag diamond centroids μ • Click to add • Right-click to delete'}
          </span>
        </div>

        {/* Top-Right Floating Telemetry Badge */}
        <div className="absolute top-4 end-4 flex items-center gap-3 px-3 py-1.5 rounded-lg bg-[var(--bg-surface)]/90 backdrop-blur-md border border-[var(--border-subtle)] text-xs font-mono shadow-sm">
          <div>
            <span className="text-[var(--text-tertiary)]">Inertia (WCSS): </span>
            <span className="text-rose-400 font-bold tabular-nums">
              J = {activeSnapshot.inertia.toFixed(1)}
            </span>
          </div>
          <div className="w-px h-3 bg-[var(--border-subtle)]" />
          <div className="text-emerald-400 font-medium">
            {points.length} pts • {k} centroids
          </div>
          {activeSnapshot.reassignedCount > 0 && (
            <>
              <div className="w-px h-3 bg-[var(--border-subtle)]" />
              <div className="text-amber-400 font-medium">
                Δ {activeSnapshot.reassignedCount} re-assigned
              </div>
            </>
          )}
        </div>

        {/* Bottom-Left Visual Layers Bar */}
        <div className="absolute bottom-4 start-4 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[var(--bg-surface)]/85 backdrop-blur-md border border-[var(--border-subtle)] text-[11px] font-mono text-[var(--text-secondary)] shadow-xs">
          <Layers size={12} className="text-[var(--text-tertiary)] me-1" />
          <button
            onClick={() => setShowVoronoi(!showVoronoi)}
            className={`px-2 py-0.5 rounded text-[10px] font-medium border transition-colors ${
              showVoronoi
                ? 'bg-[var(--math-vector)]/20 border-[var(--math-vector)]/40 text-[var(--math-vector)]'
                : 'bg-transparent border-transparent text-[var(--text-tertiary)] hover:text-[var(--text-primary)]'
            }`}
          >
            Voronoi
          </button>
          <button
            onClick={() => setShowTrails(!showTrails)}
            className={`px-2 py-0.5 rounded text-[10px] font-medium border transition-colors ${
              showTrails
                ? 'bg-amber-500/20 border-amber-500/40 text-amber-400'
                : 'bg-transparent border-transparent text-[var(--text-tertiary)] hover:text-[var(--text-primary)]'
            }`}
          >
            Trails
          </button>
          <button
            onClick={() => setShowSpiders(!showSpiders)}
            className={`px-2 py-0.5 rounded text-[10px] font-medium border transition-colors ${
              showSpiders
                ? 'bg-indigo-500/20 border-indigo-500/40 text-indigo-400'
                : 'bg-transparent border-transparent text-[var(--text-tertiary)] hover:text-[var(--text-primary)]'
            }`}
          >
            Spiders
          </button>
          <button
            onClick={() => setShowRadii(!showRadii)}
            className={`px-2 py-0.5 rounded text-[10px] font-medium border transition-colors ${
              showRadii
                ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                : 'bg-transparent border-transparent text-[var(--text-tertiary)] hover:text-[var(--text-primary)]'
            }`}
          >
            1σ Radii
          </button>
        </div>
      </div>

      {/* Timeline Playback Bar (Strictly Controlled Component) */}
      <TimelinePlaybackBar
        totalSteps={Math.max(1, history.length - 1)}
        currentStep={currentStepIdx}
        stepPhase={activeSnapshot.phase}
        metricLabel="Inertia"
        metricValue={activeSnapshot.inertia}
        onStepChange={setCurrentStepIdx}
      />

      {/* Expanded Interactive Graphs & Analytics Panel */}
      <div className="flex flex-col gap-3 p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] specular shadow-xs">
        {/* Tab Headers */}
        <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2.5">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveGraphTab('convergence')}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-mono rounded-lg transition-all ${
                activeGraphTab === 'convergence'
                  ? 'bg-[var(--math-gradient)] text-black font-bold shadow-xs'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-hover)]'
              }`}
            >
              <TrendingDown size={13} />
              <span>{language === 'ar' ? 'منحنى تقارب القصور (WCSS)' : 'WCSS Convergence'}</span>
            </button>
            <button
              onClick={() => setActiveGraphTab('elbow')}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-mono rounded-lg transition-all ${
                activeGraphTab === 'elbow'
                  ? 'bg-[var(--math-gradient)] text-black font-bold shadow-xs'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-hover)]'
              }`}
            >
              <Activity size={13} />
              <span>{language === 'ar' ? 'طريقة الكوع (Elbow Curve)' : 'Elbow Method (K=1..8)'}</span>
            </button>
            <button
              onClick={() => setActiveGraphTab('distribution')}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-mono rounded-lg transition-all ${
                activeGraphTab === 'distribution'
                  ? 'bg-[var(--math-gradient)] text-black font-bold shadow-xs'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-hover)]'
              }`}
            >
              <BarChart2 size={13} />
              <span>{language === 'ar' ? 'توزيع وتوازن العناقيد' : 'Cluster Balance'}</span>
            </button>
          </div>

          <div className="text-[11px] font-mono text-[var(--text-tertiary)] hidden sm:block">
            {language === 'ar' ? 'تحليل رياضي تفاعلي' : 'Real-time Lloyd Optimization Profile'}
          </div>
        </div>

        {/* Tab 1: WCSS Convergence Step Curve */}
        {activeGraphTab === 'convergence' && (
          <div className="flex flex-col gap-3 pt-1">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="p-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-app)]">
                <div className="text-[10px] font-mono text-[var(--text-tertiary)] uppercase">Initial WCSS (J₀)</div>
                <div className="text-sm font-mono font-bold text-[var(--text-primary)] tabular-nums">
                  {initialInertia.toFixed(1)}
                </div>
              </div>
              <div className="p-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-app)]">
                <div className="text-[10px] font-mono text-[var(--text-tertiary)] uppercase">Current WCSS (Jₜ)</div>
                <div className="text-sm font-mono font-bold text-rose-400 tabular-nums">
                  {currentInertia.toFixed(1)}
                </div>
              </div>
              <div className="p-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-app)]">
                <div className="text-[10px] font-mono text-[var(--text-tertiary)] uppercase">Total Drop %</div>
                <div className="text-sm font-mono font-bold text-emerald-400 tabular-nums">
                  -{totalDropPct.toFixed(1)}%
                </div>
              </div>
              <div className="p-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-app)]">
                <div className="text-[10px] font-mono text-[var(--text-tertiary)] uppercase">Current Shift (Δμ)</div>
                <div className="text-sm font-mono font-bold text-amber-400 tabular-nums">
                  {activeSnapshot.maxCentroidShift > 0 ? activeSnapshot.maxCentroidShift.toFixed(3) : '0.000'}
                </div>
              </div>
            </div>

            {/* SVG Convergence Curve */}
            <div className="h-36 w-full relative pt-2">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 500 100" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="wcssGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Gridlines */}
                {[0, 25, 50, 75, 100].map((gy) => (
                  <line key={gy} x1="0" y1={gy} x2="500" y2={gy} stroke={theme === 'dark' ? '#27272a' : '#f4f4f5'} strokeWidth="1" />
                ))}

                {history.length > 1 && (() => {
                  const maxJ = Math.max(...history.map((h) => h.inertia), 1);
                  const minJ = Math.min(...history.map((h) => h.inertia), 0);
                  const rangeJ = Math.max(1, maxJ - minJ);

                  const pts = history.map((h, i) => {
                    const x = (i / (history.length - 1)) * 480 + 10;
                    const y = 90 - ((h.inertia - minJ) / rangeJ) * 80;
                    return { x, y, inertia: h.inertia };
                  });

                  const pathD = pts.reduce((acc, pt, i) => (i === 0 ? `M ${pt.x},${pt.y}` : `${acc} L ${pt.x},${pt.y}`), '');
                  const areaD = `${pathD} L ${pts[pts.length - 1].x},95 L ${pts[0].x},95 Z`;

                  const curPt = pts[Math.min(currentStepIdx, pts.length - 1)];

                  return (
                    <>
                      <path d={areaD} fill="url(#wcssGradient)" />
                      <path d={pathD} fill="none" stroke="#f43f5e" strokeWidth="2.5" />
                      {pts.map((pt, i) => (
                        <circle
                          key={i}
                          cx={pt.x}
                          cy={pt.y}
                          r={i === currentStepIdx ? 5 : 2.5}
                          fill={i === currentStepIdx ? '#38bdf8' : '#f43f5e'}
                          stroke="#ffffff"
                          strokeWidth={i === currentStepIdx ? 2 : 1}
                        />
                      ))}
                      {curPt && (
                        <circle cx={curPt.x} cy={curPt.y} r="8" fill="none" stroke="#38bdf8" strokeWidth="1.5" className="animate-ping" />
                      )}
                    </>
                  );
                })()}
              </svg>
            </div>
          </div>
        )}

        {/* Tab 2: The Elbow Method (K = 1..8) */}
        {activeGraphTab === 'elbow' && (
          <div className="flex flex-col gap-3 pt-1">
            <div className="text-xs font-mono text-[var(--text-secondary)] leading-relaxed">
              {language === 'ar'
                ? 'طريقة الكوع (The Elbow Method): انقر على أي نقطة لتغيير K فوراً. تمثل نقطة الانثناء (الكوع) التوازن المثالي بين تقليل القصور وتجنب فرط التخصيص.'
                : 'The Elbow Method: Click any point on the curve to switch K. The bend ("elbow") represents optimal cost-efficiency before diminishing returns.'}
            </div>

            {/* SVG Elbow Curve */}
            <div className="h-40 w-full relative pt-2">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 500 110" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="elbowGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {[0, 25, 50, 75, 100].map((gy) => (
                  <line key={gy} x1="20" y1={gy} x2="480" y2={gy} stroke={theme === 'dark' ? '#27272a' : '#f4f4f5'} strokeWidth="1" />
                ))}

                {(() => {
                  const maxInertia = Math.max(...elbowValues.map((v) => v.inertia), 1);
                  const minInertia = Math.min(...elbowValues.map((v) => v.inertia), 0);
                  const range = Math.max(1, maxInertia - minInertia);

                  const pts = elbowValues.map((ev, i) => {
                    const x = 30 + (i / 7) * 440;
                    const y = 95 - ((ev.inertia - minInertia) / range) * 85;
                    return { ...ev, x, y };
                  });

                  const pathD = pts.reduce((acc, pt, i) => (i === 0 ? `M ${pt.x},${pt.y}` : `${acc} L ${pt.x},${pt.y}`), '');
                  const areaD = `${pathD} L ${pts[pts.length - 1].x},100 L ${pts[0].x},100 Z`;

                  return (
                    <>
                      <path d={areaD} fill="url(#elbowGradient)" />
                      <path d={pathD} fill="none" stroke="#38bdf8" strokeWidth="2.5" />

                      {/* Active K Guideline */}
                      {pts.map((pt) => {
                        const isCurrentK = pt.kVal === k;
                        return (
                          <g key={pt.kVal} onClick={() => handleChangeK(pt.kVal)} className="cursor-pointer group">
                            {isCurrentK && (
                              <line x1={pt.x} y1="10" x2={pt.x} y2="100" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3" />
                            )}
                            <circle
                              cx={pt.x}
                              cy={pt.y}
                              r={isCurrentK ? 6 : 4}
                              fill={isCurrentK ? '#f59e0b' : '#38bdf8'}
                              stroke="#ffffff"
                              strokeWidth={isCurrentK ? 2 : 1}
                              className="transition-transform group-hover:scale-125"
                            />
                            <text
                              x={pt.x}
                              y={108}
                              textAnchor="middle"
                              fill={isCurrentK ? '#f59e0b' : '#71717a'}
                              fontSize="10"
                              fontFamily="monospace"
                              fontWeight={isCurrentK ? 'bold' : 'normal'}
                            >
                              K={pt.kVal}
                            </text>
                          </g>
                        );
                      })}
                    </>
                  );
                })()}
              </svg>
            </div>
          </div>
        )}

        {/* Tab 3: Cluster Distribution & Balance */}
        {activeGraphTab === 'distribution' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-1">
            {clusterMetrics.map((cm) => {
              const color = CLUSTER_COLORS[cm.idx % CLUSTER_COLORS.length];
              const cent = activeSnapshot.centroids[cm.idx];
              return (
                <div
                  key={cm.idx}
                  className="flex flex-col gap-2 p-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-app)]"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
                      <span className="text-xs font-mono font-bold text-[var(--text-primary)]">Cluster {cm.idx + 1}</span>
                    </div>
                    <span className="text-[10px] font-mono text-[var(--text-tertiary)]">
                      μ({cent ? `${cent.x.toFixed(1)}, ${cent.y.toFixed(1)}` : '?'})
                    </span>
                  </div>

                  {/* Relative size progress bar */}
                  <div className="w-full bg-[var(--border-subtle)] h-2 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${cm.percentage}%`,
                        backgroundColor: color,
                      }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-secondary)]">
                    <span>
                      {cm.count} pts ({cm.percentage.toFixed(0)}%)
                    </span>
                    <span>1σ: {cm.stdRadius}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Post-Canvas Mathematical & Code Consolidation */}
      {!compact && <PostCanvasConsolidation content={KMEANS_TIER_CONTENT} />}
    </div>
  );
};

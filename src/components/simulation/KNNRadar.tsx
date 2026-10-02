import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useOkvirStore } from '@/lib/store';
import { PreCanvasBriefing, PostCanvasConsolidation, type TierContent } from '@/components/pedagogy/MultiTierDisclosure';
import { audio } from '@/lib/audio';
import { Layers, Grid } from 'lucide-react';

interface Point {
  x: number;
  y: number;
  cls: 0 | 1;
}

type DistanceMetric = 'L2' | 'L1' | 'Linf';
type KNNPreset = 'two_moons' | 'concentric' | 'xor' | 'two_blobs';

const PRESETS: Record<KNNPreset, { name: { en: string; ar: string }; points: Point[] }> = {
  two_moons: {
    name: { en: 'Two Moons (Non-linear)', ar: 'الهلالان المتداخلان (غير خطي)' },
    points: [
      // Upper Crescent (Class 0 - Sky Blue)
      { x: 1.4, y: 5.6, cls: 0 }, { x: 1.9, y: 6.7, cls: 0 }, { x: 2.7, y: 7.5, cls: 0 },
      { x: 3.7, y: 8.0, cls: 0 }, { x: 4.8, y: 8.0, cls: 0 }, { x: 5.8, y: 7.4, cls: 0 },
      { x: 6.6, y: 6.4, cls: 0 }, { x: 7.1, y: 5.2, cls: 0 },
      { x: 2.4, y: 5.9, cls: 0 }, { x: 3.4, y: 6.9, cls: 0 }, { x: 4.5, y: 7.1, cls: 0 },
      { x: 5.5, y: 6.5, cls: 0 }, { x: 6.2, y: 5.5, cls: 0 },
      // Lower Interlocking Crescent (Class 1 - Amber)
      { x: 3.5, y: 4.6, cls: 1 }, { x: 4.2, y: 3.5, cls: 1 }, { x: 5.1, y: 2.7, cls: 1 },
      { x: 6.2, y: 2.3, cls: 1 }, { x: 7.3, y: 2.4, cls: 1 }, { x: 8.3, y: 3.0, cls: 1 },
      { x: 9.0, y: 4.0, cls: 1 }, { x: 9.3, y: 5.2, cls: 1 },
      { x: 4.6, y: 4.2, cls: 1 }, { x: 5.6, y: 3.4, cls: 1 }, { x: 6.7, y: 3.2, cls: 1 },
      { x: 7.8, y: 3.7, cls: 1 }, { x: 8.5, y: 4.6, cls: 1 },
    ],
  },
  concentric: {
    name: { en: 'Concentric Rings', ar: 'حلقات متحدة المركز' },
    points: [
      // Inner Circle (Class 0)
      { x: 5.0, y: 5.0, cls: 0 }, { x: 4.2, y: 5.0, cls: 0 }, { x: 5.8, y: 5.0, cls: 0 },
      { x: 5.0, y: 4.2, cls: 0 }, { x: 5.0, y: 5.8, cls: 0 }, { x: 4.5, y: 4.5, cls: 0 },
      { x: 5.5, y: 5.5, cls: 0 }, { x: 4.5, y: 5.5, cls: 0 }, { x: 5.5, y: 4.5, cls: 0 },
      // Outer Ring (Class 1)
      { x: 2.0, y: 5.0, cls: 1 }, { x: 8.0, y: 5.0, cls: 1 }, { x: 5.0, y: 2.0, cls: 1 },
      { x: 5.0, y: 8.0, cls: 1 }, { x: 2.8, y: 2.8, cls: 1 }, { x: 7.2, y: 7.2, cls: 1 },
      { x: 2.8, y: 7.2, cls: 1 }, { x: 7.2, y: 2.8, cls: 1 }, { x: 2.2, y: 4.0, cls: 1 },
      { x: 7.8, y: 6.0, cls: 1 }, { x: 4.0, y: 7.8, cls: 1 }, { x: 6.0, y: 2.2, cls: 1 },
    ],
  },
  xor: {
    name: { en: 'XOR Topology', ar: 'بنية XOR المنطقية' },
    points: [
      // Top-Left Class 0
      { x: 2.5, y: 7.5, cls: 0 }, { x: 3.0, y: 8.0, cls: 0 }, { x: 2.0, y: 7.0, cls: 0 }, { x: 3.2, y: 6.8, cls: 0 },
      // Bottom-Right Class 0
      { x: 7.5, y: 2.5, cls: 0 }, { x: 8.0, y: 3.0, cls: 0 }, { x: 7.0, y: 2.0, cls: 0 }, { x: 6.8, y: 3.2, cls: 0 },
      // Bottom-Left Class 1
      { x: 2.5, y: 2.5, cls: 1 }, { x: 3.0, y: 2.0, cls: 1 }, { x: 2.0, y: 3.0, cls: 1 }, { x: 3.2, y: 3.2, cls: 1 },
      // Top-Right Class 1
      { x: 7.5, y: 7.5, cls: 1 }, { x: 8.0, y: 8.0, cls: 1 }, { x: 7.0, y: 7.0, cls: 1 }, { x: 6.8, y: 7.8, cls: 1 },
    ],
  },
  two_blobs: {
    name: { en: 'Curved Clusters', ar: 'عناقيد منحنية' },
    points: [
      // Class 0: Crescent-curving cluster
      { x: 1.8, y: 2.5, cls: 0 }, { x: 2.2, y: 3.6, cls: 0 }, { x: 2.8, y: 4.8, cls: 0 },
      { x: 3.8, y: 5.6, cls: 0 }, { x: 4.9, y: 6.2, cls: 0 }, { x: 1.5, y: 3.8, cls: 0 },
      { x: 2.5, y: 2.0, cls: 0 }, { x: 3.2, y: 3.8, cls: 0 }, { x: 4.2, y: 4.8, cls: 0 },
      { x: 2.9, y: 5.8, cls: 0 },
      // Class 1: Interlocking opposite cluster
      { x: 5.2, y: 3.8, cls: 1 }, { x: 6.1, y: 4.5, cls: 1 }, { x: 7.0, y: 5.5, cls: 1 },
      { x: 7.8, y: 6.8, cls: 1 }, { x: 8.4, y: 8.0, cls: 1 }, { x: 6.5, y: 3.2, cls: 1 },
      { x: 7.4, y: 4.2, cls: 1 }, { x: 8.2, y: 5.6, cls: 1 }, { x: 6.8, y: 7.2, cls: 1 },
      { x: 8.6, y: 7.0, cls: 1 },
    ],
  },
};

const KNN_TIER_CONTENT: TierContent = {
  intuition: {
    analogy: {
      en: 'Imagine asking your K closest neighbors for advice. If 4 say "Yes" and 1 says "No", you take the majority recommendation. The definition of "closest" changes depending on whether you walk city blocks (Manhattan) or fly straight lines (Euclidean).',
      ar: 'تخيّل أنك تسأل أقرب K من جيرانك للحصول على مشورة. إذا قال ٤ منهم "نعم" و١ قال "لا"، فإنك تتبع الأغلبية. يختلف تعريف "الأقرب" بحسب ما إذا كنت تمشي في شوارع متعامدة (مانهاتن) أو تطير بخط مستقيم (إقليدي).',
    },
    keyTakeaway: {
      en: 'Non-parametric local consensus: KNN memorizes training data without explicit parameter learning, classifying query points by local metric neighborhoods.',
      ar: 'إجماع موضعي لا معلمي: خوارزمية الجيران الأقرب تستذكر البيانات دون معاملات صريحة، وتصنف النقاط عبر كرات الفضاء المتري المحلي.',
    },
  },
  geometry: {
    visualDescription: {
      en: 'The decision boundary is formed by the intersection of Voronoi partitions. As K increases, small noisy islands disappear and the decision boundary becomes smooth and generalized.',
      ar: 'تتكون حدود القرار من تقاطع مضلعات فورونوي. مع زيادة قيمة K، تختفي الجزر المتناثرة الشاذة وتصبح حدود القرار ناعمة وأكثر تعميماً.',
    },
    conservedQuantity: {
      en: 'The number of neighbors K is strictly conserved across query evaluations.',
      ar: 'عدد الجيران K ثابت ومحفوظ في كل عمليات الاستعلام.',
    },
  },
  formal: {
    equation: '\\hat{y}_q = \\arg\\max_{c \\in \\mathcal{C}} \\sum_{i=1}^K w_i \\mathbb{I}(y_{(i)} = c), \\quad w_i = \\frac{1}{d(x_q, x_{(i)})^p}',
    derivationSteps: [
      {
        step: 'd_p(\\mathbf{u}, \\mathbf{v}) = \\left(\\sum_{j=1}^D |u_j - v_j|^p\\right)^{1/p}',
        note: { en: 'Minkowski metric space distance definition (p=1: L1, p=2: L2, p=∞: Linf)', ar: 'تعريف المسافة في فضاء مينكوفسكي المتري' },
      },
      {
        step: 'P(Y=1 \\mid X=x) \\approx \\frac{1}{K} \\sum_{i \\in N_K(x)} y_i',
        note: { en: 'Local empirical probability density estimate', ar: 'تقدير كثافة الاحتمال التجريبية الموضعية' },
      },
    ],
  },
  code: {
    snippet: `import numpy as np

def knn_predict_weighted(X_train: np.ndarray, y_train: np.ndarray, x_query: np.ndarray, k: int = 5, weighted: bool = False):
    dists = np.linalg.norm(X_train - x_query, axis=1)
    top_k = np.argpartition(dists, k)[:k]
    
    if not weighted:
        # Uniform majority
        return int(np.bincount(y_train[top_k]).argmax())
    else:
        # Distance-weighted voting
        weights = 1.0 / (dists[top_k] + 1e-6)
        classes = np.unique(y_train)
        class_scores = [np.sum(weights[y_train[top_k] == c]) for c in classes]
        return int(classes[np.argmax(class_scores)])`,
    explanation: {
      en: 'Distance weighting gives exponentially higher voting power to immediate neighbors while maintaining O(N) partitioning.',
      ar: 'الوزن بالمسافة يمنح الجيران الأقرب تأثيراً تصويتياً أعلى مع الحفاظ على سرعة فرز خطية.',
    },
  },
};

export const KNNRadar: React.FC<{ compact?: boolean }> = ({ compact = true }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { knnK, setKnnK, theme, language, config } = useOkvirStore();

  const [points, setPoints] = useState<Point[]>(PRESETS.two_moons.points);
  const [selectedPreset, setSelectedPreset] = useState<KNNPreset>('two_moons');
  const [query, setQuery] = useState({ x: 5.2, y: 5.2 });
  const [metric, setMetric] = useState<DistanceMetric>('L2');
  const [addModeClass, setAddModeClass] = useState<0 | 1>(0);
  const [isWeighted, setIsWeighted] = useState(false);
  const [showBoundaryField, setShowBoundaryField] = useState(true);
  const [prediction, setPrediction] = useState<0 | 1>(0);
  const [votes, setVotes] = useState({ blue: 0, amber: 0 });
  const dragging = useRef(false);

  // Distance computation function
  const computeDistance = useCallback(
    (x1: number, y1: number, x2: number, y2: number, m: DistanceMetric) => {
      const dx = Math.abs(x1 - x2);
      const dy = Math.abs(y1 - y2);
      switch (m) {
        case 'L1':
          return dx + dy;
        case 'Linf':
          return Math.max(dx, dy);
        case 'L2':
        default:
          return Math.hypot(dx, dy);
      }
    },
    []
  );

  // Classify any arbitrary (qx, qy)
  const classifyPoint = useCallback(
    (qx: number, qy: number, kVal: number, m: DistanceMetric, weighted: boolean) => {
      const sorted = points
        .map((p) => ({
          ...p,
          d: computeDistance(qx, qy, p.x, p.y, m),
        }))
        .sort((a, b) => a.d - b.d);

      const kNearest = sorted.slice(0, Math.min(kVal, sorted.length));
      let score0 = 0;
      let score1 = 0;

      kNearest.forEach((p) => {
        const weight = weighted ? 1 / Math.max(0.05, p.d) : 1;
        if (p.cls === 0) score0 += weight;
        else score1 += weight;
      });

      return {
        cls: (score0 >= score1 ? 0 : 1) as 0 | 1,
        radius: kNearest.length > 0 ? kNearest[kNearest.length - 1].d : 1,
        score0,
        score1,
      };
    },
    [points, computeDistance]
  );

  // Update live query prediction
  useEffect(() => {
    const res = classifyPoint(query.x, query.y, knnK, metric, isWeighted);
    setPrediction(res.cls);
    setVotes({ blue: res.score0, amber: res.score1 });
  }, [query, points, knnK, metric, isWeighted, classifyPoint]);

  // Main Render Loop
  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const width = canvas.width / dpr;
    const height = canvas.height / dpr;

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, width, height);

    const toPx = (x: number, y: number) => ({
      px: (x / 10) * width,
      py: (1 - y / 10) * height,
    });

    // 1. High-Density Organic Decision Boundary & Confidence Probability Field
    if (showBoundaryField && points.length >= 3) {
      const gridCols = 80;
      const gridRows = 60;
      const cellW = width / gridCols;
      const cellH = height / gridRows;

      const classGrid: number[][] = [];

      for (let r = 0; r < gridRows; r++) {
        classGrid[r] = [];
        for (let c = 0; c < gridCols; c++) {
          const gx = ((c + 0.5) / gridCols) * 10;
          const gy = (1 - (r + 0.5) / gridRows) * 10;
          const res = classifyPoint(gx, gy, knnK, metric, isWeighted);
          classGrid[r][c] = res.cls;

          const totalScore = res.score0 + res.score1;
          const p0 = totalScore > 0 ? res.score0 / totalScore : 0.5;

          // Non-linear organic probability shading:
          // Deep in class cluster: richly saturated. Near boundary: soft fade.
          if (res.cls === 0) {
            const conf = Math.max(0, Math.min(1, (p0 - 0.5) * 2));
            ctx.fillStyle = `rgba(56, 189, 248, ${0.035 + conf * 0.12})`;
          } else {
            const conf = Math.max(0, Math.min(1, (0.5 - p0) * 2));
            ctx.fillStyle = `rgba(245, 158, 11, ${0.035 + conf * 0.12})`;
          }
          ctx.fillRect(c * cellW, r * cellH, cellW + 0.5, cellH + 0.5);
        }
      }

      // Crisp Continuous Decision Boundary Contour Lines (P=0.5 Threshold)
      // 1a. Outer Soft Glow
      ctx.beginPath();
      ctx.lineWidth = 3.5;
      ctx.strokeStyle = theme === 'dark' ? 'rgba(168, 85, 247, 0.4)' : 'rgba(147, 51, 234, 0.3)';
      for (let r = 0; r < gridRows; r++) {
        for (let c = 0; c < gridCols; c++) {
          const currentCls = classGrid[r][c];
          if (c < gridCols - 1 && currentCls !== classGrid[r][c + 1]) {
            const edgeX = (c + 1) * cellW;
            ctx.moveTo(edgeX, r * cellH);
            ctx.lineTo(edgeX, (r + 1) * cellH);
          }
          if (r < gridRows - 1 && currentCls !== classGrid[r + 1][c]) {
            const edgeY = (r + 1) * cellH;
            ctx.moveTo(c * cellW, edgeY);
            ctx.lineTo((c + 1) * cellW, edgeY);
          }
        }
      }
      ctx.stroke();

      // 1b. Sharp Core Luminous Contour
      ctx.beginPath();
      ctx.lineWidth = 1.8;
      ctx.strokeStyle = theme === 'dark' ? 'rgba(232, 200, 255, 0.9)' : 'rgba(126, 34, 206, 0.85)';
      for (let r = 0; r < gridRows; r++) {
        for (let c = 0; c < gridCols; c++) {
          const currentCls = classGrid[r][c];
          if (c < gridCols - 1 && currentCls !== classGrid[r][c + 1]) {
            const edgeX = (c + 1) * cellW;
            ctx.moveTo(edgeX, r * cellH);
            ctx.lineTo(edgeX, (r + 1) * cellH);
          }
          if (r < gridRows - 1 && currentCls !== classGrid[r + 1][c]) {
            const edgeY = (r + 1) * cellH;
            ctx.moveTo(c * cellW, edgeY);
            ctx.lineTo((c + 1) * cellW, edgeY);
          }
        }
      }
      ctx.stroke();
    }

    // 2. Coordinate Grid
    ctx.strokeStyle = theme === 'dark' ? '#27272a' : '#e4e4e7';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= 10; i += 2) {
      const pX = (i / 10) * width;
      const pY = (1 - i / 10) * height;
      ctx.beginPath();
      ctx.moveTo(pX, 0);
      ctx.lineTo(pX, height);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, pY);
      ctx.lineTo(width, pY);
      ctx.stroke();
    }

    // 3. Neighbors Evaluation & Radar Iso-ball
    const sorted = points
      .map((p) => ({
        ...p,
        d: computeDistance(query.x, query.y, p.x, p.y, metric),
      }))
      .sort((a, b) => a.d - b.d);

    const kNearest = sorted.slice(0, Math.min(knnK, sorted.length));
    const kRadius = kNearest.length > 0 ? kNearest[kNearest.length - 1].d : 0;
    const qPx = toPx(query.x, query.y);

    // Draw Metric Radar Envelope
    ctx.strokeStyle = prediction === 0 ? 'rgba(56, 189, 248, 0.8)' : 'rgba(245, 158, 11, 0.8)';
    ctx.fillStyle = prediction === 0 ? 'rgba(56, 189, 248, 0.06)' : 'rgba(245, 158, 11, 0.06)';
    ctx.lineWidth = 2;

    const rPx = (kRadius / 10) * width;
    ctx.beginPath();
    if (metric === 'L2') {
      ctx.arc(qPx.px, qPx.py, rPx, 0, Math.PI * 2);
    } else if (metric === 'L1') {
      ctx.moveTo(qPx.px, qPx.py - rPx);
      ctx.lineTo(qPx.px + rPx, qPx.py);
      ctx.lineTo(qPx.px, qPx.py + rPx);
      ctx.lineTo(qPx.px - rPx, qPx.py);
      ctx.closePath();
    } else if (metric === 'Linf') {
      ctx.rect(qPx.px - rPx, qPx.py - rPx, rPx * 2, rPx * 2);
    }
    ctx.fill();
    ctx.stroke();

    // 4. Connect Radar Rays from Query to K Neighbors
    kNearest.forEach((p) => {
      const ptPx = toPx(p.x, p.y);
      ctx.beginPath();
      ctx.setLineDash([3, 3]);
      ctx.moveTo(qPx.px, qPx.py);
      ctx.lineTo(ptPx.px, ptPx.py);
      ctx.strokeStyle = p.cls === 0 ? 'rgba(56, 189, 248, 0.6)' : 'rgba(245, 158, 11, 0.6)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.setLineDash([]);
    });

    // 5. Render Data Points
    points.forEach((p) => {
      const ptPx = toPx(p.x, p.y);
      const isNeighbor = kNearest.some((kn) => kn.x === p.x && kn.y === p.y);

      // Neighbor highlight halo
      if (isNeighbor) {
        ctx.beginPath();
        ctx.arc(ptPx.px, ptPx.py, 10, 0, Math.PI * 2);
        ctx.fillStyle = p.cls === 0 ? 'rgba(56, 189, 248, 0.3)' : 'rgba(245, 158, 11, 0.3)';
        ctx.fill();
      }

      ctx.beginPath();
      ctx.arc(ptPx.px, ptPx.py, 5, 0, Math.PI * 2);
      ctx.fillStyle = p.cls === 0 ? '#38bdf8' : '#f59e0b';
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });

    // 6. Render Query Point (Draggable Star / Core)
    ctx.beginPath();
    ctx.arc(qPx.px, qPx.py, 8, 0, Math.PI * 2);
    ctx.fillStyle = prediction === 0 ? '#38bdf8' : '#f59e0b';
    ctx.fill();
    ctx.strokeStyle = '#fafafa';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    ctx.font = 'bold 11px monospace';
    ctx.fillStyle = prediction === 0 ? '#38bdf8' : '#f59e0b';
    ctx.fillText(`Query (${query.x.toFixed(1)}, ${query.y.toFixed(1)})`, qPx.px + 12, qPx.py - 10);

    ctx.restore();
  }, [
    points,
    query,
    knnK,
    metric,
    prediction,
    isWeighted,
    showBoundaryField,
    theme,
    computeDistance,
    classifyPoint,
  ]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    render();
  }, [render]);

  // Pointer interactions
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;

    const qPx = {
      px: (query.x / 10) * rect.width,
      py: (1 - query.y / 10) * rect.height,
    };

    if (Math.hypot(px - qPx.px, py - qPx.py) < 22) {
      dragging.current = true;
      e.currentTarget.setPointerCapture(e.pointerId);
      if (config.soundEnabled) audio.playClick();
    } else {
      // Add data point
      const newX = Number(((px / rect.width) * 10).toFixed(2));
      const newY = Number(((1 - py / rect.height) * 10).toFixed(2));
      setPoints((prev) => [...prev, { x: newX, y: newY, cls: addModeClass }]);
      if (config.soundEnabled) audio.playClick();
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!dragging.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const px = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
    const py = Math.max(0, Math.min(rect.height, e.clientY - rect.top));

    setQuery({
      x: Number(((px / rect.width) * 10).toFixed(2)),
      y: Number(((1 - py / rect.height) * 10).toFixed(2)),
    });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (dragging.current) {
      dragging.current = false;
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
      if (config.soundEnabled) audio.playClick();
    }
  };

  // Right-click to remove point
  const handleContextMenu = (e: React.MouseEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;

    let targetIdx: number | null = null;
    points.forEach((p, idx) => {
      const ptPx = {
        px: (p.x / 10) * rect.width,
        py: (1 - p.y / 10) * rect.height,
      };
      if (Math.hypot(px - ptPx.px, py - ptPx.py) < 16) {
        targetIdx = idx;
      }
    });

    if (targetIdx !== null && points.length > 2) {
      setPoints((prev) => prev.filter((_, idx) => idx !== targetIdx));
      if (config.soundEnabled) audio.playWarning();
    }
  };

  const applyPreset = (key: KNNPreset) => {
    setSelectedPreset(key);
    setPoints(PRESETS[key].points);
    if (config.soundEnabled) audio.playSuccess();
  };

  return (
    <div className="flex flex-col gap-4 select-none">
      {/* Pre-Canvas Intuitive Briefing & Mental Model */}
      {!compact && <PreCanvasBriefing content={KNN_TIER_CONTENT} />}

      {/* Scenario Presets Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] specular">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-mono text-[var(--text-tertiary)] uppercase tracking-wider me-1">
            {language === 'ar' ? 'البيئات المترية:' : 'Datasets:'}
          </span>
          {(Object.keys(PRESETS) as KNNPreset[]).map((key) => (
            <button
              key={key}
              onClick={() => applyPreset(key)}
              className={`px-2.5 py-1 text-xs font-mono rounded-lg border transition-all ${
                selectedPreset === key
                  ? 'border-[var(--math-prediction)] bg-[var(--math-prediction)]/15 text-[var(--math-prediction)] font-semibold shadow-sm'
                  : 'border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]'
              }`}
            >
              {PRESETS[key].name[language]}
            </button>
          ))}
        </div>

        {/* Action Toggles */}
        <div className="flex items-center gap-2">
          {/* Toggle Decision Boundary Field */}
          <button
            onClick={() => setShowBoundaryField(!showBoundaryField)}
            className={`flex items-center gap-1 px-2.5 py-1 text-xs font-mono rounded-lg border transition-all ${
              showBoundaryField
                ? 'border-[var(--math-prediction)] bg-[var(--math-prediction)]/15 text-[var(--math-prediction)] font-bold'
                : 'border-[var(--border-subtle)] text-[var(--text-secondary)]'
            }`}
            title="Toggle Decision Boundary Background Field"
          >
            <Grid size={12} />
            <span>{language === 'ar' ? 'حد القرار' : 'Boundary Field'}</span>
          </button>

          {/* Toggle Weighted Voting */}
          <button
            onClick={() => setIsWeighted(!isWeighted)}
            className={`flex items-center gap-1 px-2.5 py-1 text-xs font-mono rounded-lg border transition-all ${
              isWeighted
                ? 'border-[var(--math-vector)] bg-[var(--math-vector)]/15 text-[var(--math-vector)] font-bold'
                : 'border-[var(--border-subtle)] text-[var(--text-secondary)]'
            }`}
            title="Weight votes by inverse distance 1/d"
          >
            <Layers size={12} />
            <span>{language === 'ar' ? 'موزون بالمسافة' : '1/d Weighted'}</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Radar Canvas */}
      <div className="relative rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-app)] overflow-hidden shadow-inner p-2">
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onContextMenu={handleContextMenu}
          className="w-full h-80 rounded-xl cursor-crosshair touch-none"
        />

        {/* Instructions Badge (Repositioned to bottom-start to avoid collision with top-end result card) */}
        <div className="absolute bottom-3 start-3 px-2.5 py-1 rounded-md bg-[var(--bg-surface)]/85 backdrop-blur-md border border-[var(--border-subtle)] text-[10px] sm:text-[11px] font-mono text-[var(--text-tertiary)] shadow-xs pointer-events-none">
          {language === 'ar'
            ? 'اسحب نقطة الاستعلام • انقر لإضافة بيانات • انقر بالزر الأيمن للحذف'
            : 'Drag query point • Click to add data • Right-click to remove'}
        </div>

        {/* Classification Result Floating Card */}
        <div className="absolute top-3 end-3 flex items-center gap-3 px-3 py-1.5 rounded-lg bg-[var(--bg-surface)]/90 backdrop-blur-md border border-[var(--border-subtle)] text-xs font-mono shadow-sm">
          <div>
            <span className="text-[var(--text-tertiary)]">Class: </span>
            <span
              className={`font-bold uppercase ${
                prediction === 0 ? 'text-sky-400' : 'text-amber-400'
              }`}
            >
              {prediction === 0 ? (language === 'ar' ? 'فئة أ (أزرق)' : 'Class A (Blue)') : (language === 'ar' ? 'فئة ب (كهرماني)' : 'Class B (Amber)')}
            </span>
          </div>
          <div className="w-px h-3 bg-[var(--border-subtle)]" />
          <div className="text-[11px] text-[var(--text-secondary)] tabular-nums">
            Score: <strong className="text-sky-400">{votes.blue.toFixed(1)}</strong> vs{' '}
            <strong className="text-amber-400">{votes.amber.toFixed(1)}</strong>
          </div>
        </div>
      </div>

      {/* Interactive Parameter Controls (Spacious Multi-Tier Responsive Footer) */}
      <div className="p-3.5 sm:p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] space-y-3.5 shadow-xs">
        {/* Tier 1: K Slider with Full-Width Breathability */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            <span className="text-xs font-mono text-[var(--text-secondary)]">
              {language === 'ar' ? 'عدد الجيران (K):' : 'Neighbors (K):'}{' '}
              <strong className="text-purple-400 font-bold tabular-nums text-sm">{knnK}</strong>
            </span>
          </div>

          <div className="flex items-center gap-3 flex-1">
            <input
              type="range"
              min="1"
              max="15"
              step="2" // Odd numbers to prevent ties
              value={knnK}
              onChange={(e) => {
                setKnnK(parseInt(e.target.value, 10));
                if (config.soundEnabled) audio.playClick();
              }}
              className="flex-1 accent-purple-500 cursor-pointer min-w-28"
            />
            <span className="text-[11px] font-mono font-bold shrink-0 px-2.5 py-0.5 rounded-md bg-[var(--bg-app)] border border-[var(--border-subtle)] text-purple-300 shadow-xs">
              {knnK === 1
                ? (language === 'ar' ? 'K=1 (جزر فورونوي حادة)' : 'K=1 (Voronoi Islands)')
                : knnK <= 5
                ? (language === 'ar' ? 'K منخفض (تفاصيل موضعية)' : 'Low K (Local Detail)')
                : (language === 'ar' ? 'K مرتفع (حدود ناعمة)' : 'High K (Smooth Boundary)')}
            </span>
          </div>
        </div>

        {/* Tier 2: Metric Space & Data Injection Controls */}
        <div className="pt-3 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Distance Metric Selector */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-mono text-[var(--text-tertiary)] shrink-0">
              {language === 'ar' ? 'المعيار المتري:' : 'Distance Metric:'}
            </span>
            <div className="flex items-center gap-1 bg-[var(--bg-app)] p-0.5 rounded-lg border border-[var(--border-subtle)]">
              {(['L2', 'L1', 'Linf'] as DistanceMetric[]).map((m) => (
                <button
                  key={m}
                  onClick={() => {
                    setMetric(m);
                    if (config.soundEnabled) audio.playClick();
                  }}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-all cursor-pointer ${
                    metric === m
                      ? 'bg-[var(--bg-surface)] text-[var(--math-data)] font-bold shadow-xs border border-[var(--border-subtle)]'
                      : 'text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]'
                  }`}
                >
                  {m === 'L2' && (language === 'ar' ? 'L₂ إقليدي' : 'L₂ Euclidean')}
                  {m === 'L1' && (language === 'ar' ? 'L₁ مانهاتن' : 'L₁ Manhattan')}
                  {m === 'Linf' && (language === 'ar' ? 'L∞ تشيبيشيف' : 'L∞ Chebyshev')}
                </button>
              ))}
            </div>
          </div>

          {/* Add Class Toggle */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-[var(--text-tertiary)] shrink-0">
              {language === 'ar' ? 'إضافة نقطة:' : 'Click to Add:'}
            </span>
            <div className="flex items-center gap-1 bg-[var(--bg-app)] p-0.5 rounded-lg border border-[var(--border-subtle)]">
              <button
                onClick={() => setAddModeClass(0)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono transition-all cursor-pointer ${
                  addModeClass === 0
                    ? 'bg-sky-500/15 text-sky-400 font-bold shadow-xs border border-sky-500/30'
                    : 'text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-sky-400" />
                <span>{language === 'ar' ? 'فئة أ (أزرق)' : 'Class A (Blue)'}</span>
              </button>
              <button
                onClick={() => setAddModeClass(1)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono transition-all cursor-pointer ${
                  addModeClass === 1
                    ? 'bg-amber-500/15 text-amber-400 font-bold shadow-xs border border-amber-500/30'
                    : 'text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>{language === 'ar' ? 'فئة ب (كهرماني)' : 'Class B (Amber)'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Post-Canvas Mathematical & Code Consolidation */}
      {!compact && <PostCanvasConsolidation content={KNN_TIER_CONTENT} />}
    </div>
  );
};

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useOkvirStore } from '@/lib/store';
import { PreCanvasBriefing, PostCanvasConsolidation, type TierContent } from '@/components/pedagogy/MultiTierDisclosure';
import { audio } from '@/lib/audio';
import { RotateCcw, Sparkles, Split } from 'lucide-react';

interface Point {
  x: number;
  y: number;
  cls: 0 | 1;
}

const INITIAL_TREE_POINTS: Point[] = [
  { x: 1.5, y: 1.5, cls: 0 }, { x: 2.0, y: 1.0, cls: 0 }, { x: 1.0, y: 2.0, cls: 0 },
  { x: 1.5, y: 3.0, cls: 0 }, { x: 2.5, y: 2.0, cls: 0 }, { x: 3.0, y: 1.5, cls: 0 },
  { x: 2.0, y: 3.5, cls: 0 }, { x: 1.0, y: 1.0, cls: 0 }, { x: 3.0, y: 3.0, cls: 0 },
  { x: 2.5, y: 0.8, cls: 0 }, { x: 0.8, y: 2.5, cls: 0 }, { x: 3.5, y: 2.5, cls: 0 },
  { x: 6.0, y: 6.0, cls: 1 }, { x: 6.5, y: 5.5, cls: 1 }, { x: 7.0, y: 6.0, cls: 1 },
  { x: 6.0, y: 7.0, cls: 1 }, { x: 7.5, y: 6.5, cls: 1 }, { x: 5.5, y: 7.0, cls: 1 },
  { x: 7.0, y: 7.5, cls: 1 }, { x: 6.5, y: 8.0, cls: 1 }, { x: 8.0, y: 7.0, cls: 1 },
  { x: 5.5, y: 6.0, cls: 1 }, { x: 8.0, y: 5.5, cls: 1 }, { x: 7.0, y: 8.5, cls: 1 },
];

const TREE_TIER_CONTENT: TierContent = {
  intuition: {
    analogy: {
      en: 'Imagine playing 20 Questions to isolate a secret object. At each turn, you ask a simple yes/no question that cuts the remaining possibilities in half, minimizing confusion as rapidly as possible.',
      ar: 'تخيّل أنك تلعب لعبة "عشرون سؤالاً". في كل خطوة، تطرح سؤالاً بسيطاً بنعم/لا يقسم الاحتمالات المتبقية إلى نصفين متجانسين، مما يقلل الحيرة والغموض بأسرع وتيرة ممكنة.',
    },
    keyTakeaway: {
      en: 'Decision Trees recursively partition feature space into axis-aligned hyper-rectangles using greedy Information Gain maximization.',
      ar: 'تقوم أشجار القرار بتقسيم فضاء الخصائص تكرارياً إلى مستطيلات متعامدة باستخدام التعظيم الجشع لكسب المعلومات.',
    },
  },
  geometry: {
    visualDescription: {
      en: 'Space is partitioned by orthogonal laser slices. Each internal node represents an axis-aligned hyperplane split: X_j ≤ θ. Each leaf node represents an isolated hyper-rectangle.',
      ar: 'يتم تقطيع الفضاء بواسطة خطوط ليزرية متعامدة على المحاور. كل عقدة تمثل مستوى فائقاً متعامداً: X_j ≤ θ، وكل ورقة تمثل صندوقاً فضائياً مستقلاً.',
    },
    conservedQuantity: {
      en: 'Gini impurity and Shannon entropy are guaranteed to decrease or remain constant across greedy splits by Jensen’s inequality.',
      ar: 'مؤشر جيني والإنتروبيا ينخفضان بالضرورة أو يثبتان بعد كل انقسام استناداً إلى متباينة جينسن للدوال المقعرة.',
    },
  },
  formal: {
    equation: '\\Delta I = I(S) - \\left(\\frac{|S_L|}{|S|} I(S_L) + \\frac{|S_R|}{|S|} I(S_R)\\right)',
    derivationSteps: [
      {
        step: 'Gini(p) = 1 - \\sum_{c=1}^C p_c^2',
        note: { en: 'Gini impurity measure for multinomial probabilities', ar: 'مقياس شوائب جيني للاحتمالات متعددة الحدود' },
      },
      {
        step: 'H(p) = -\\sum_{c=1}^C p_c \\log_2 p_c',
        note: { en: 'Shannon information entropy', ar: 'إنتروبيا شانون للمعلومات واللايقين' },
      },
      {
        step: '\\Delta I \\ge 0 \\quad \\text{via Jensen’s inequality for concave functions}',
        note: { en: 'Proof that optimal greedy splits always reduce impurity', ar: 'برهان أن الانقسام الأمثل يقلل دائماً من الشوائب' },
      },
    ],
  },
  code: {
    snippet: `import numpy as np

def best_split(x: np.ndarray, y: np.ndarray):
    # Sort feature values: O(N log N)
    idx = np.argsort(x)
    x_s, y_s = x[idx], y[idx]
    
    n = len(y)
    best_gain, best_thresh = -1.0, None
    for i in range(1, n):
        if x_s[i] == x_s[i-1]: continue
        thresh = (x_s[i] + x_s[i-1]) / 2.0
        y_l, y_r = y_s[:i], y_s[i:]
        gain = gini(y) - (len(y_l)/n * gini(y_l) + len(y_r)/n * gini(y_r))
        if gain > best_gain:
            best_gain, best_thresh = gain, thresh
    return best_thresh, best_gain`,
    explanation: {
      en: 'Evaluating candidate thresholds along sorted unique feature values scans all O(N) splits efficiently.',
      ar: 'مسح العتبات المرشحة على طول القيم المرتبة يفحص جميع الانقسامات الممكنة بكفاءة O(N).',
    },
  },
};

export const DecisionTreeLaser: React.FC<{ compact?: boolean }> = ({ compact = true }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme, language, config } = useOkvirStore();

  const [points, setPoints] = useState<Point[]>(INITIAL_TREE_POINTS);
  const [thresholdX, setThresholdX] = useState<number>(4.5);
  const [thresholdY, setThresholdY] = useState<number>(4.2);
  const [secondSplitActive, setSecondSplitActive] = useState<boolean>(true);
  const [addModeClass, setAddModeClass] = useState<0 | 1>(0);
  const [draggedLaser, setDraggedLaser] = useState<'x' | 'y' | null>(null);

  // Compute Gini Impurity
  const computeGini = (pts: Point[]) => {
    if (pts.length === 0) return 0;
    const p0 = pts.filter((p) => p.cls === 0).length / pts.length;
    const p1 = 1 - p0;
    return 1 - (p0 * p0 + p1 * p1);
  };

  const leftPts = points.filter((p) => p.x <= thresholdX);
  const rightPts = points.filter((p) => p.x > thresholdX);

  const giniLeft = computeGini(leftPts);
  const giniRight = computeGini(rightPts);

  const totalGini =
    points.length > 0
      ? (leftPts.length / points.length) * giniLeft +
        (rightPts.length / points.length) * giniRight
      : 0;

  const initialGini = computeGini(points);
  const infoGain = Math.max(0, initialGini - totalGini);

  // Find greedy best split on X
  const handleFindBestSplit = () => {
    let bestGain = -1;
    let bestT = thresholdX;

    for (let t = 1.0; t <= 9.0; t += 0.1) {
      const l = points.filter((p) => p.x <= t);
      const r = points.filter((p) => p.x > t);
      if (l.length === 0 || r.length === 0) continue;
      const curGini = (l.length / points.length) * computeGini(l) + (r.length / points.length) * computeGini(r);
      const curGain = initialGini - curGini;
      if (curGain > bestGain) {
        bestGain = curGain;
        bestT = t;
      }
    }

    setThresholdX(Number(bestT.toFixed(2)));
    if (config.soundEnabled) audio.playSuccess();
  };

  // Render Canvas
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
    const toCanvasY = (y: number) => pad + plotH - (y / 10) * plotH;

    const cutXPx = toCanvasX(thresholdX);
    const cutYPx = toCanvasY(thresholdY);

    // 1. Shaded Region Partitions
    // Left region
    ctx.fillStyle = theme === 'dark' ? 'rgba(56, 189, 248, 0.08)' : 'rgba(2, 132, 199, 0.06)';
    ctx.fillRect(pad, pad, cutXPx - pad, plotH);

    // Right region
    ctx.fillStyle = theme === 'dark' ? 'rgba(245, 158, 11, 0.08)' : 'rgba(217, 119, 6, 0.06)';
    ctx.fillRect(cutXPx, pad, pad + plotW - cutXPx, plotH);

    // 2. Grid lines
    ctx.strokeStyle = theme === 'dark' ? '#27272a' : '#e4e4e7';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= 10; i += 2) {
      ctx.beginPath();
      ctx.moveTo(toCanvasX(i), pad);
      ctx.lineTo(toCanvasX(i), pad + plotH);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(pad, toCanvasY(i));
      ctx.lineTo(pad + plotW, toCanvasY(i));
      ctx.stroke();
    }

    // 3. Glowing Laser Knife Cut Lines
    // Primary Cut: Vertical X threshold
    ctx.beginPath();
    ctx.moveTo(cutXPx, pad);
    ctx.lineTo(cutXPx, pad + plotH);
    ctx.strokeStyle = '#f43f5e';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Laser glow
    ctx.beginPath();
    ctx.moveTo(cutXPx, pad);
    ctx.lineTo(cutXPx, pad + plotH);
    ctx.strokeStyle = 'rgba(244, 63, 94, 0.35)';
    ctx.lineWidth = 9;
    ctx.stroke();

    // Grab handle for X laser
    ctx.beginPath();
    ctx.arc(cutXPx, pad + 15, 6, 0, Math.PI * 2);
    ctx.fillStyle = '#f43f5e';
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Secondary Cut: Horizontal Y threshold if active
    if (secondSplitActive) {
      ctx.beginPath();
      ctx.moveTo(pad, cutYPx);
      ctx.lineTo(cutXPx, cutYPx);
      ctx.strokeStyle = '#a855f7';
      ctx.lineWidth = 2.0;
      ctx.setLineDash([4, 4]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Grab handle for Y laser
      ctx.beginPath();
      ctx.arc(pad + 15, cutYPx, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#a855f7';
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    // 4. Observation Points
    points.forEach((p) => {
      const cx = toCanvasX(p.x);
      const cy = toCanvasY(p.y);
      ctx.beginPath();
      ctx.arc(cx, cy, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = p.cls === 0 ? '#38bdf8' : '#f59e0b';
      ctx.fill();
      ctx.strokeStyle = theme === 'dark' ? '#fafafa' : '#09090b';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });

    // 5. Labels on split thresholds
    ctx.font = '10px monospace';
    ctx.fillStyle = '#f43f5e';
    ctx.fillText(`X₁ ≤ ${thresholdX.toFixed(2)}`, cutXPx + 8, pad + 14);

    if (secondSplitActive) {
      ctx.fillStyle = '#a855f7';
      ctx.fillText(`X₂ ≤ ${thresholdY.toFixed(2)}`, pad + 25, cutYPx - 6);
    }
  }, [thresholdX, thresholdY, secondSplitActive, points, theme]);

  useEffect(() => {
    renderFrame();
  }, [renderFrame]);

  // Direct pointer drag for laser lines + click to add
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
    const toCanvasY = (y: number) => pad + plotH - (y / 10) * plotH;

    const cutXPx = toCanvasX(thresholdX);
    const cutYPx = toCanvasY(thresholdY);

    if (Math.abs(px - cutXPx) <= 16) {
      setDraggedLaser('x');
      e.currentTarget.setPointerCapture(e.pointerId);
      if (config.soundEnabled) audio.playClick();
    } else if (secondSplitActive && Math.abs(py - cutYPx) <= 16 && px <= cutXPx) {
      setDraggedLaser('y');
      e.currentTarget.setPointerCapture(e.pointerId);
      if (config.soundEnabled) audio.playClick();
    } else {
      // Add data point
      const newX = Number(Math.max(0.5, Math.min(9.5, ((px - pad) / plotW) * 10)).toFixed(2));
      const newY = Number(Math.max(0.5, Math.min(9.5, (1 - (py - pad) / plotH) * 10)).toFixed(2));
      setPoints((prev) => [...prev, { x: newX, y: newY, cls: addModeClass }]);
      if (config.soundEnabled) audio.playClick();
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!draggedLaser) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    const pad = 24;
    const plotW = rect.width - pad * 2;
    const plotH = rect.height - pad * 2;

    if (draggedLaser === 'x') {
      const newX = Math.max(1.0, Math.min(9.0, ((px - pad) / plotW) * 10));
      setThresholdX(Number(newX.toFixed(2)));
    } else if (draggedLaser === 'y') {
      const newY = Math.max(1.0, Math.min(9.0, (1 - (py - pad) / plotH) * 10));
      setThresholdY(Number(newY.toFixed(2)));
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (draggedLaser) {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
      setDraggedLaser(null);
      if (config.soundEnabled) audio.playClick();
    }
  };

  // Right click point deletion
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
    const toCanvasY = (y: number) => pad + plotH - (y / 10) * plotH;

    let targetIdx: number | null = null;
    points.forEach((p, idx) => {
      const cx = toCanvasX(p.x);
      const cy = toCanvasY(p.y);
      if (Math.hypot(px - cx, py - cy) <= 14) {
        targetIdx = idx;
      }
    });

    if (targetIdx !== null && points.length > 4) {
      setPoints((prev) => prev.filter((_, idx) => idx !== targetIdx));
      if (config.soundEnabled) audio.playWarning();
    }
  };

  return (
    <div className="flex flex-col gap-4 select-none">
      {/* Pre-Canvas Intuitive Briefing & Mental Model */}
      {!compact && <PreCanvasBriefing content={TREE_TIER_CONTENT} />}

      {/* Top Action Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] specular">
        {/* Class Selector for adding points */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-[var(--text-tertiary)] uppercase tracking-wider">
            {language === 'ar' ? 'فئة النقطة:' : 'Add Point:'}
          </span>
          <button
            onClick={() => setAddModeClass(0)}
            className={`px-2.5 py-1 text-xs font-mono rounded-lg border transition-all ${
              addModeClass === 0
                ? 'border-[var(--math-data)] bg-[var(--math-data)]/15 text-[var(--math-data)] font-bold'
                : 'border-[var(--border-subtle)] text-[var(--text-secondary)]'
            }`}
          >
            Class 0 (Blue)
          </button>
          <button
            onClick={() => setAddModeClass(1)}
            className={`px-2.5 py-1 text-xs font-mono rounded-lg border transition-all ${
              addModeClass === 1
                ? 'border-[var(--math-gradient)] bg-[var(--math-gradient)]/15 text-[var(--math-gradient)] font-bold'
                : 'border-[var(--border-subtle)] text-[var(--text-secondary)]'
            }`}
          >
            Class 1 (Amber)
          </button>
        </div>

        {/* Buttons: Secondary Split & Greedy Best Split */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSecondSplitActive(!secondSplitActive)}
            className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono rounded-lg border transition-all ${
              secondSplitActive
                ? 'border-[var(--math-prediction)] bg-[var(--math-prediction)]/15 text-[var(--math-prediction)] font-bold'
                : 'border-[var(--border-subtle)] text-[var(--text-secondary)]'
            }`}
            title="Toggle second-level split"
          >
            <Split size={12} />
            <span>{language === 'ar' ? 'انقسام فرعي ثنائي' : '2nd Split (Y)'}</span>
          </button>

          <button
            onClick={handleFindBestSplit}
            className="flex items-center gap-1.5 px-3 py-1 text-xs font-mono font-bold rounded-lg border border-[var(--math-vector)]/40 bg-[var(--math-vector)]/10 text-[var(--math-vector)] hover:bg-[var(--math-vector)]/20 transition-all shadow-sm"
            title="Greedily find threshold maximizing Information Gain"
          >
            <Sparkles size={13} className="text-[var(--math-vector)]" />
            <span>{language === 'ar' ? 'الانقسام الأمثل' : 'Find Best Split'}</span>
          </button>

          <button
            onClick={() => {
              setPoints(INITIAL_TREE_POINTS);
              setThresholdX(4.5);
              setThresholdY(4.2);
              if (config.soundEnabled) audio.playClick();
            }}
            className="p-1.5 rounded-lg border border-[var(--border-subtle)] hover:border-[var(--border-strong)] text-[var(--text-secondary)]"
            title="Reset"
          >
            <RotateCcw size={13} />
          </button>
        </div>
      </div>

      {/* Main Interactive Laser Canvas */}
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

        <div className="absolute top-4 start-4 px-2.5 py-1 rounded-md bg-[var(--bg-surface)]/80 backdrop-blur-md border border-[var(--border-subtle)] text-[11px] font-mono text-[var(--text-tertiary)]">
          {language === 'ar'
            ? 'اسحب خطوط الليزر مباشرة • انقر لإضافة نقاط • انقر يمين لحذف نقطة'
            : 'Drag laser lines directly • Click to add data • Right-click to remove'}
        </div>

        {/* Floating Telemetry: Gini & Information Gain */}
        <div className="absolute top-4 end-4 flex items-center gap-3 px-3 py-1.5 rounded-lg bg-[var(--bg-surface)]/90 backdrop-blur-md border border-[var(--border-subtle)] text-xs font-mono shadow-sm">
          <div>
            <span className="text-[var(--text-tertiary)]">Gini Split: </span>
            <span className="text-rose-400 font-bold tabular-nums">
              {totalGini.toFixed(3)}
            </span>
          </div>
          <div className="w-px h-3 bg-[var(--border-subtle)]" />
          <div>
            <span className="text-[var(--text-tertiary)]">Info Gain (ΔI): </span>
            <span className="text-emerald-400 font-bold tabular-nums">
              +{infoGain.toFixed(3)}
            </span>
          </div>
        </div>
      </div>

      {/* Reactive Gini Breakdown Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] flex flex-col gap-0.5">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-tertiary)]">
            Root Impurity I(S)
          </span>
          <span className="text-base font-mono font-bold tabular-nums text-[var(--text-primary)]">
            {initialGini.toFixed(3)}
          </span>
          <span className="text-[10px] font-mono text-[var(--text-tertiary)]">
            Total Samples: {points.length}
          </span>
        </div>

        <div className="p-3 rounded-xl border border-sky-500/30 bg-sky-500/5 flex flex-col gap-0.5">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--math-data)] font-semibold">
            Left Child (X₁ ≤ {thresholdX.toFixed(1)})
          </span>
          <span className="text-base font-mono font-bold tabular-nums text-[var(--math-data)]">
            {giniLeft.toFixed(3)}
          </span>
          <span className="text-[10px] font-mono text-[var(--text-tertiary)]">
            {leftPts.length} points
          </span>
        </div>

        <div className="p-3 rounded-xl border border-amber-500/30 bg-amber-500/5 flex flex-col gap-0.5">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--math-gradient)] font-semibold">
            Right Child (X₁ &gt; {thresholdX.toFixed(1)})
          </span>
          <span className="text-base font-mono font-bold tabular-nums text-[var(--math-gradient)]">
            {giniRight.toFixed(3)}
          </span>
          <span className="text-[10px] font-mono text-[var(--text-tertiary)]">
            {rightPts.length} points
          </span>
        </div>

        <div className="p-3 rounded-xl border border-emerald-500/30 bg-emerald-500/5 flex flex-col gap-0.5">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--math-vector)] font-semibold">
            Information Gain ΔI
          </span>
          <span className="text-base font-mono font-bold tabular-nums text-[var(--math-vector)]">
            +{infoGain.toFixed(3)}
          </span>
          <span className="text-[10px] font-mono text-[var(--text-tertiary)]">
            {infoGain > 0.15 ? '✓ Strong Split' : 'Weak Split'}
          </span>
        </div>
      </div>

      {/* Post-Canvas Mathematical & Code Consolidation */}
      {!compact && <PostCanvasConsolidation content={TREE_TIER_CONTENT} />}
    </div>
  );
};

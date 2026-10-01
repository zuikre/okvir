import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useOkvirStore } from '@/lib/store';
import { CanvasCoordinateTransformer, computeFullOLS, type DataPoint } from '@/lib/canvas/CanvasMath';
import { audio } from '@/lib/audio';
import { RotateCcw, AlertTriangle, Layers } from 'lucide-react';

interface AnscombeDataset {
  id: number;
  name: { en: string; ar: string };
  description: { en: string; ar: string };
  points: DataPoint[];
}

const CANONICAL_DATASETS: AnscombeDataset[] = [
  {
    id: 1,
    name: { en: 'Dataset I: Linear Standard', ar: 'المجموعة الأولى: علاقة خطية قياسية' },
    description: {
      en: 'Classic linear relationship with normally distributed errors around the regression line.',
      ar: 'علاقة خطية كلاسيكية مع توزيع طبيعي للأخطاء حول خط الانحدار.',
    },
    points: [
      { x: 10.0, y: 8.04 },
      { x: 8.0, y: 6.95 },
      { x: 13.0, y: 7.58 },
      { x: 9.0, y: 8.81 },
      { x: 11.0, y: 8.33 },
      { x: 14.0, y: 9.96 },
      { x: 6.0, y: 7.24 },
      { x: 4.0, y: 4.26 },
      { x: 12.0, y: 10.84 },
      { x: 7.0, y: 4.82 },
      { x: 5.0, y: 5.68 },
    ],
  },
  {
    id: 2,
    name: { en: 'Dataset II: Quadratic Curve', ar: 'المجموعة الثانية: منحنى تربيعي غير خطي' },
    description: {
      en: 'Clear non-linear parabolic curve. OLS line reports R²=0.67 yet misses the real deterministic relationship.',
      ar: 'منحنى مكافئ غير خطي تماماً. انحدار OLS يعطي R²=0.67 ولكنه يفشل في التقاط البنية الحقيقية.',
    },
    points: [
      { x: 10.0, y: 9.14 },
      { x: 8.0, y: 8.14 },
      { x: 13.0, y: 8.74 },
      { x: 9.0, y: 8.77 },
      { x: 11.0, y: 9.26 },
      { x: 14.0, y: 8.10 },
      { x: 6.0, y: 6.13 },
      { x: 4.0, y: 3.10 },
      { x: 12.0, y: 9.13 },
      { x: 7.0, y: 7.26 },
      { x: 5.0, y: 4.74 },
    ],
  },
  {
    id: 3,
    name: { en: 'Dataset III: Linear with Outlier', ar: 'المجموعة الثالثة: خطية مع قيمة شاذة' },
    description: {
      en: 'Near-perfect linear correlation ruined by a single extreme vertical outlier at x=13.',
      ar: 'علاقة خطية شبه مثالية يفسد ميلها رصد شاذ عمودي واحد متطرف عند x=13.',
    },
    points: [
      { x: 10.0, y: 7.46 },
      { x: 8.0, y: 6.77 },
      { x: 13.0, y: 12.74 },
      { x: 9.0, y: 7.11 },
      { x: 11.0, y: 7.81 },
      { x: 14.0, y: 8.84 },
      { x: 6.0, y: 6.08 },
      { x: 4.0, y: 5.39 },
      { x: 12.0, y: 8.15 },
      { x: 7.0, y: 6.42 },
      { x: 5.0, y: 5.73 },
    ],
  },
  {
    id: 4,
    name: { en: 'Dataset IV: High-Leverage Outlier', ar: 'المجموعة الرابعة: نقطة رافعة عالية التأثير' },
    description: {
      en: 'Zero variance in X for 10 points (vertical line at x=8); a single leverage point at x=19 dictates the entire slope.',
      ar: 'تباين صفري للمتغير X لـ 10 نقاط عند x=8؛ نقطة رافعة واحدة عند x=19 هي التي تصنع الميل بالكامل.',
    },
    points: [
      { x: 8.0, y: 6.58 },
      { x: 8.0, y: 5.76 },
      { x: 8.0, y: 7.71 },
      { x: 8.0, y: 8.84 },
      { x: 8.0, y: 8.47 },
      { x: 8.0, y: 7.04 },
      { x: 8.0, y: 5.25 },
      { x: 8.0, y: 5.56 },
      { x: 8.0, y: 7.91 },
      { x: 8.0, y: 6.89 },
      { x: 19.0, y: 12.50 },
    ],
  },
];

export const AnscombesQuartetLab: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme, language, config } = useOkvirStore();

  const [activeDatasetIndex, setActiveDatasetIndex] = useState(0);
  const [datasets, setDatasets] = useState<AnscombeDataset[]>(() =>
    CANONICAL_DATASETS.map((d) => ({
      ...d,
      points: d.points.map((p) => ({ ...p })),
    }))
  );
  const [draggedPointIndex, setDraggedPointIndex] = useState<number | null>(null);

  const activeDataset = datasets[activeDatasetIndex];
  const activePoints = activeDataset.points;

  const transformerRef = useRef(
    new CanvasCoordinateTransformer(
      { xMin: 2, xMax: 20, yMin: 2, yMax: 14 },
      { top: 28, right: 28, bottom: 28, left: 28 }
    )
  );

  const ols = computeFullOLS(activePoints);

  const meanX = activePoints.reduce((acc, p) => acc + p.x, 0) / activePoints.length;
  const meanY = activePoints.reduce((acc, p) => acc + p.y, 0) / activePoints.length;

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

    const tf = transformerRef.current;
    const toCanvas = (x: number, y: number) => {
      const s = tf.dataToScreen(x, y, width, height);
      return { cx: s.px, cy: s.py };
    };

    const isDark = theme === 'dark';
    const gridColor = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)';
    const axisColor = isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)';
    const textColor = isDark ? '#a1a1aa' : '#71717a';

    // 1. Draw Grid Lines
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let x = 2; x <= 20; x += 2) {
      const p1 = toCanvas(x, 2);
      const p2 = toCanvas(x, 14);
      ctx.moveTo(p1.cx, p1.cy);
      ctx.lineTo(p2.cx, p2.cy);
    }
    for (let y = 2; y <= 14; y += 2) {
      const p1 = toCanvas(2, y);
      const p2 = toCanvas(20, y);
      ctx.moveTo(p1.cx, p1.cy);
      ctx.lineTo(p2.cx, p2.cy);
    }
    ctx.stroke();

    // 2. Draw Coordinate Axis
    ctx.strokeStyle = axisColor;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    const origin = toCanvas(2, 2);
    const xEnd = toCanvas(20, 2);
    const yEnd = toCanvas(2, 14);
    ctx.moveTo(origin.cx, origin.cy);
    ctx.lineTo(xEnd.cx, xEnd.cy);
    ctx.moveTo(origin.cx, origin.cy);
    ctx.lineTo(yEnd.cx, yEnd.cy);
    ctx.stroke();

    // Tick labels
    ctx.fillStyle = textColor;
    ctx.font = '10px JetBrains Mono, monospace';
    ctx.textAlign = 'center';
    for (let x = 4; x <= 20; x += 4) {
      const pos = toCanvas(x, 2);
      ctx.fillText(`${x}`, pos.cx, pos.cy + 14);
    }
    ctx.textAlign = 'right';
    for (let y = 4; y <= 14; y += 2) {
      const pos = toCanvas(2, y);
      ctx.fillText(`${y}`, pos.cx - 6, pos.cy + 3);
    }

    const slope = ols?.slope ?? 0.5;
    const intercept = ols?.intercept ?? 3.0;

    // 3. Draw Residual Lines
    ctx.strokeStyle = isDark ? 'rgba(244, 63, 94, 0.35)' : 'rgba(225, 29, 72, 0.35)';
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    activePoints.forEach((p) => {
      const predictedY = slope * p.x + intercept;
      const ptCanvas = toCanvas(p.x, p.y);
      const lineCanvas = toCanvas(p.x, predictedY);
      ctx.moveTo(ptCanvas.cx, ptCanvas.cy);
      ctx.lineTo(lineCanvas.cx, lineCanvas.cy);
    });
    ctx.stroke();
    ctx.setLineDash([]);

    // 4. Draw OLS Best-Fit Regression Line
    const pStart = toCanvas(2, slope * 2 + intercept);
    const pEnd = toCanvas(20, slope * 20 + intercept);

    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(pStart.cx, pStart.cy);
    ctx.lineTo(pEnd.cx, pEnd.cy);
    ctx.stroke();

    // 5. Draw Scatter Points
    activePoints.forEach((p, idx) => {
      const c = toCanvas(p.x, p.y);
      const isDragged = draggedPointIndex === idx;

      ctx.fillStyle = isDragged ? '#f59e0b' : '#10b981';
      ctx.strokeStyle = isDark ? '#09090b' : '#ffffff';
      ctx.lineWidth = 2;

      ctx.beginPath();
      ctx.arc(c.cx, c.cy, isDragged ? 7 : 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      if (isDragged) {
        ctx.fillStyle = isDark ? '#f59e0b' : '#d97706';
        ctx.font = '11px JetBrains Mono, monospace';
        ctx.textAlign = 'left';
        ctx.fillText(`(${p.x.toFixed(1)}, ${p.y.toFixed(2)})`, c.cx + 10, c.cy - 6);
      }
    });
  }, [activePoints, ols, theme, draggedPointIndex]);

  useEffect(() => {
    renderFrame();
  }, [renderFrame]);

  useEffect(() => {
    const handleResize = () => renderFrame();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [renderFrame]);

  // Pointer interaction for dragging data points
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;
    const tf = transformerRef.current;
    const width = rect.width;
    const height = rect.height;

    // Find nearest point within 16px radius
    let nearestIdx = -1;
    let minDist = 18;

    activePoints.forEach((p, idx) => {
      const s = tf.dataToScreen(p.x, p.y, width, height);
      const dist = Math.hypot(s.px - cx, s.py - cy);
      if (dist < minDist) {
        minDist = dist;
        nearestIdx = idx;
      }
    });

    if (nearestIdx !== -1) {
      setDraggedPointIndex(nearestIdx);
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      if (config.soundEnabled) audio.playClick();
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (draggedPointIndex === null) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;
    const tf = transformerRef.current;
    const dataCoords = tf.screenToData(cx, cy, rect.width, rect.height);

    const clampedX = Math.max(2, Math.min(20, Math.round(dataCoords.x * 10) / 10));
    const clampedY = Math.max(2, Math.min(14, Math.round(dataCoords.y * 10) / 10));

    setDatasets((prev) => {
      const next = [...prev];
      const nextActive = { ...next[activeDatasetIndex] };
      const nextPts = [...nextActive.points];
      nextPts[draggedPointIndex] = { x: clampedX, y: clampedY };
      nextActive.points = nextPts;
      next[activeDatasetIndex] = nextActive;
      return next;
    });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (draggedPointIndex !== null) {
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {
        // Ignore capture release
      }
      setDraggedPointIndex(null);
    }
  };

  const resetActiveDataset = () => {
    setDatasets((prev) => {
      const next = [...prev];
      next[activeDatasetIndex] = {
        ...CANONICAL_DATASETS[activeDatasetIndex],
        points: CANONICAL_DATASETS[activeDatasetIndex].points.map((p) => ({ ...p })),
      };
      return next;
    });
    if (config.soundEnabled) audio.playClick();
  };

  return (
    <div className={`p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] specular space-y-4 ${compact ? '' : 'p-6'}`}>
      {/* Header & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-subtle)] pb-3">
        <div className="flex items-center gap-2">
          <Layers size={18} className="text-[var(--math-vector)]" />
          <h3 className="text-sm font-semibold text-[var(--text-primary)]">
            {language === 'ar' ? "مختبر رباعية أنسكوم التفاعلي (Anscombe's Quartet)" : "Anscombe's Quartet Interactive Lab"}
          </h3>
        </div>

        <button
          onClick={resetActiveDataset}
          className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono rounded-lg border border-[var(--border-subtle)] hover:bg-[var(--bg-surface-hover)] text-[var(--text-secondary)]"
          title="Reset to canonical Anscombe coordinates"
        >
          <RotateCcw size={12} />
          <span>{language === 'ar' ? 'إعادة ضبط الإحداثيات' : 'Reset Coordinates'}</span>
        </button>
      </div>

      {/* Dataset Selector Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {datasets.map((d, idx) => (
          <button
            key={d.id}
            onClick={() => {
              setActiveDatasetIndex(idx);
              if (config.soundEnabled) audio.playClick();
            }}
            className={`p-2.5 rounded-lg border text-start transition-all ${
              activeDatasetIndex === idx
                ? 'border-[var(--math-data)] bg-[var(--math-data)]/10 text-[var(--math-data)] ring-1 ring-[var(--math-data)]/30'
                : 'border-[var(--border-subtle)] text-[var(--text-secondary)] hover:bg-[var(--bg-app)]'
            }`}
          >
            <div className="text-xs font-mono font-semibold">
              {language === 'ar' ? `المجموعة ${d.id}` : `Dataset ${d.id}`}
            </div>
            <div className="text-[10px] text-[var(--text-tertiary)] truncate mt-0.5">
              {language === 'ar' ? d.name.ar.split(':')[1] : d.name.en.split(':')[1]}
            </div>
          </button>
        ))}
      </div>

      {/* Narrative Alert */}
      <div className="p-3 rounded-lg border border-amber-500/20 bg-amber-500/5 text-xs text-[var(--text-secondary)] leading-relaxed flex items-start gap-2">
        <AlertTriangle size={15} className="text-[var(--math-gradient)] shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-[var(--math-gradient)]">
            {language === 'ar' ? 'ملاحظة تشخيصية:' : 'Diagnostic Invariant:'}{' '}
          </span>
          {activeDataset.description[language]}
        </div>
      </div>

      {/* Interactive 60fps Canvas */}
      <div className="relative w-full h-72 md:h-80 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-app)] overflow-hidden cursor-crosshair">
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          className="w-full h-full block touch-none"
        />

        {/* Floating Instruction Badge */}
        <div className="absolute top-2 start-2 pointer-events-none px-2 py-1 rounded bg-[var(--bg-surface)]/80 backdrop-blur border border-[var(--border-subtle)] text-[10px] font-mono text-[var(--text-tertiary)]">
          {language === 'ar' ? 'اسحب أي نقطة لتحديث خط الانحدار لحظياً' : 'Drag any point to update regression in real time'}
        </div>
      </div>

      {/* Live HUD Statistics Display */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2.5 pt-1">
        <div className="p-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-app)]">
          <div className="text-[10px] font-mono uppercase text-[var(--text-tertiary)]">Mean(X)</div>
          <div className="text-xs font-mono font-semibold tabular-nums text-[var(--text-primary)]">
            x̄ = {meanX.toFixed(2)}
          </div>
        </div>

        <div className="p-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-app)]">
          <div className="text-[10px] font-mono uppercase text-[var(--text-tertiary)]">Mean(Y)</div>
          <div className="text-xs font-mono font-semibold tabular-nums text-[var(--text-primary)]">
            ȳ = {meanY.toFixed(2)}
          </div>
        </div>

        <div className="p-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-app)]">
          <div className="text-[10px] font-mono uppercase text-[var(--text-tertiary)]">OLS Slope (m)</div>
          <div className="text-xs font-mono font-semibold tabular-nums text-[var(--math-gradient)]">
            m = {ols ? ols.slope.toFixed(3) : '0.500'}
          </div>
        </div>

        <div className="p-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-app)]">
          <div className="text-[10px] font-mono uppercase text-[var(--text-tertiary)]">Intercept (b)</div>
          <div className="text-xs font-mono font-semibold tabular-nums text-[var(--math-data)]">
            b = {ols ? ols.intercept.toFixed(2) : '3.00'}
          </div>
        </div>

        <div className="p-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-app)]">
          <div className="text-[10px] font-mono uppercase text-[var(--text-tertiary)]">R² (Variance Expl.)</div>
          <div className="text-xs font-mono font-semibold tabular-nums text-emerald-400">
            R² = {ols ? ols.r2.toFixed(3) : '0.667'}
          </div>
        </div>
      </div>
    </div>
  );
};

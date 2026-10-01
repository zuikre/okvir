import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useOkvirStore } from '@/lib/store';
import { KaTeXMath } from '@/components/common/KaTeXMath';
import { CanvasCoordinateTransformer, computeFullOLS, type DataPoint } from '@/lib/canvas/CanvasMath';
import { audio } from '@/lib/audio';
import { AlertCircle, Eye } from 'lucide-react';

interface SubgroupCluster {
  id: number;
  name: { en: string; ar: string };
  color: string;
  cx: number;
  cy: number;
  points: DataPoint[];
}

export const SimpsonsParadoxLab: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme, language, config } = useOkvirStore();

  const [stratified, setStratified] = useState(false);
  const [draggedGroup, setDraggedGroup] = useState<number | null>(null);

  // 3 cohorts: Exercise hours (X) vs Cardiovascular Risk (Y)
  // Inside each age cohort: More exercise = Lower risk (slope = -0.85)
  // Across cohorts: Older people exercise more but have higher baseline risk!
  const [clusters, setClusters] = useState<SubgroupCluster[]>([
    {
      id: 0,
      name: { en: 'Cohort 1: Under 30', ar: 'الفئة ١: أقل من ٣٠ سنة' },
      color: '#38bdf8',
      cx: 3.5,
      cy: 4.5,
      points: [
        { x: 2.0, y: 5.8 },
        { x: 2.8, y: 5.1 },
        { x: 3.5, y: 4.4 },
        { x: 4.2, y: 3.9 },
        { x: 5.0, y: 3.2 },
      ],
    },
    {
      id: 1,
      name: { en: 'Cohort 2: 30 to 55', ar: 'الفئة ٢: من ٣٠ إلى ٥٥ سنة' },
      color: '#10b981',
      cx: 8.5,
      cy: 8.0,
      points: [
        { x: 7.0, y: 9.3 },
        { x: 7.8, y: 8.6 },
        { x: 8.5, y: 7.9 },
        { x: 9.2, y: 7.3 },
        { x: 10.0, y: 6.6 },
      ],
    },
    {
      id: 2,
      name: { en: 'Cohort 3: Over 55', ar: 'الفئة ٣: أكثر من ٥٥ سنة' },
      color: '#f59e0b',
      cx: 13.5,
      cy: 11.5,
      points: [
        { x: 12.0, y: 12.8 },
        { x: 12.8, y: 12.1 },
        { x: 13.5, y: 11.4 },
        { x: 14.2, y: 10.8 },
        { x: 15.0, y: 10.1 },
      ],
    },
  ]);

  const transformerRef = useRef(
    new CanvasCoordinateTransformer(
      { xMin: 0, xMax: 18, yMin: 0, yMax: 16 },
      { top: 24, right: 24, bottom: 24, left: 24 }
    )
  );

  // Flatten all points for pooled aggregate regression
  const allPoints = clusters.flatMap((c) => c.points);
  const pooledOLS = computeFullOLS(allPoints);

  // Compute individual subgroup slopes
  const subgroupOLS = clusters.map((c) => computeFullOLS(c.points));

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

    const transformer = transformerRef.current;
    const { plotW, plotH } = transformer.getPlotDimensions(width, height);

    // 1. Grid
    ctx.strokeStyle = theme === 'dark' ? '#27272a' : '#e4e4e7';
    ctx.lineWidth = 0.5;
    for (let x = 0; x <= 18; x += 2) {
      const { px } = transformer.dataToScreen(x, 0, width, height);
      ctx.beginPath();
      ctx.moveTo(px, 24);
      ctx.lineTo(px, 24 + plotH);
      ctx.stroke();
    }
    for (let y = 0; y <= 16; y += 2) {
      const { py } = transformer.dataToScreen(0, y, width, height);
      ctx.beginPath();
      ctx.moveTo(24, py);
      ctx.lineTo(24 + plotW, py);
      ctx.stroke();
    }

    // 2. Subgroup Slopes (Negative!) when Stratified
    if (stratified) {
      clusters.forEach((cluster, idx) => {
        const ols = subgroupOLS[idx];
        if (!ols) return;

        const xMin = Math.min(...cluster.points.map((p) => p.x)) - 1.0;
        const xMax = Math.max(...cluster.points.map((p) => p.x)) + 1.0;

        const p1 = transformer.dataToScreen(xMin, ols.slope * xMin + ols.intercept, width, height);
        const p2 = transformer.dataToScreen(xMax, ols.slope * xMax + ols.intercept, width, height);

        ctx.beginPath();
        ctx.moveTo(p1.px, p1.py);
        ctx.lineTo(p2.px, p2.py);
        ctx.strokeStyle = cluster.color;
        ctx.lineWidth = 2.2;
        ctx.stroke();

        // Subgroup centroid diamond
        const cPos = transformer.dataToScreen(cluster.cx, cluster.cy, width, height);
        ctx.beginPath();
        ctx.arc(cPos.px, cPos.py, 8, 0, Math.PI * 2);
        ctx.fillStyle = `${cluster.color}33`;
        ctx.fill();
        ctx.strokeStyle = cluster.color;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });
    }

    // 3. Pooled Aggregate Slope (Paradoxically Positive!)
    if (pooledOLS) {
      const p1 = transformer.dataToScreen(1, pooledOLS.slope * 1 + pooledOLS.intercept, width, height);
      const p2 = transformer.dataToScreen(17, pooledOLS.slope * 17 + pooledOLS.intercept, width, height);

      ctx.beginPath();
      ctx.setLineDash(stratified ? [5, 4] : []);
      ctx.moveTo(p1.px, p1.py);
      ctx.lineTo(p2.px, p2.py);
      ctx.strokeStyle = stratified ? '#f43f5e' : '#f43f5e';
      ctx.lineWidth = stratified ? 2.5 : 3.0;
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // 4. Data Points
    clusters.forEach((cluster) => {
      cluster.points.forEach((p) => {
        const { px, py } = transformer.dataToScreen(p.x, p.y, width, height);
        ctx.beginPath();
        ctx.arc(px, py, 4.5, 0, Math.PI * 2);
        ctx.fillStyle = stratified ? cluster.color : theme === 'dark' ? '#fafafa' : '#09090b';
        ctx.fill();
        ctx.strokeStyle = stratified ? '#ffffff' : '#38bdf8';
        ctx.lineWidth = 1.6;
        ctx.stroke();
      });
    });
  }, [clusters, stratified, pooledOLS, subgroupOLS, theme]);

  useEffect(() => {
    renderFrame();
  }, [renderFrame]);

  // Pointer Handling for Dragging Subgroup Centroids
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!stratified) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    const width = rect.width;
    const height = rect.height;
    const transformer = transformerRef.current;

    let hitGroup: number | null = null;
    clusters.forEach((cluster, idx) => {
      const pos = transformer.dataToScreen(cluster.cx, cluster.cy, width, height);
      if (Math.hypot(px - pos.px, py - pos.py) <= 18) {
        hitGroup = idx;
      }
    });

    if (hitGroup !== null) {
      canvas.setPointerCapture(e.pointerId);
      setDraggedGroup(hitGroup);
      if (config.soundEnabled) audio.playClick();
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (draggedGroup === null) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    const width = rect.width;
    const height = rect.height;
    const transformer = transformerRef.current;

    const targetPos = transformer.screenToData(px, py, width, height);

    setClusters((prev) => {
      const next = [...prev];
      const grp = next[draggedGroup];
      const dx = targetPos.x - grp.cx;
      const dy = targetPos.y - grp.cy;

      next[draggedGroup] = {
        ...grp,
        cx: targetPos.x,
        cy: targetPos.y,
        points: grp.points.map((p) => ({
          x: Number((p.x + dx).toFixed(2)),
          y: Number((p.y + dy).toFixed(2)),
        })),
      };
      return next;
    });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (canvas && draggedGroup !== null) {
      try {
        canvas.releasePointerCapture(e.pointerId);
      } catch (_err) {
        // Pointer capture already released or not supported
      }
      setDraggedGroup(null);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] specular">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-subtle)] pb-3">
        <div>
          <div className="flex items-center gap-2">
            <AlertCircle size={18} className="text-rose-400" />
            <h2 className="text-base font-bold text-[var(--text-primary)]">
              {language === 'ar' ? 'مختبر مفارقة سيمبسون والاستدلال السببي' : "Simpson's Paradox & Confounder Laboratory"}
            </h2>
          </div>
          <p className="text-xs text-[var(--text-secondary)] font-mono mt-0.5">
            {language === 'ar'
              ? 'كيف ينقلب الاتجاه الإحصائي العام بنسبة ١٨٠ درجة عند تفكيك المتغيرات المربكة'
              : 'Witness statistical trend reversal: how omitted variables completely invert causal signs.'}
          </p>
        </div>

        {/* Stratify Toggle */}
        <button
          onClick={() => {
            setStratified(!stratified);
            if (config.soundEnabled) audio.playClick();
          }}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all shadow-sm ${
            stratified
              ? 'bg-emerald-500 text-black shadow-emerald-500/20'
              : 'bg-[var(--bg-app)] text-[var(--text-primary)] border border-[var(--border-strong)] hover:bg-[var(--bg-surface-hover)]'
          }`}
        >
          <Eye size={14} />
          <span>{stratified ? (language === 'ar' ? 'إلغاء التفكيك (المجموع الإجمالي)' : 'Show Pooled Aggregate') : (language === 'ar' ? 'تفكيك الفئات العمرية (Stratify)' : 'Stratify by Age Cohort')}</span>
        </button>
      </div>

      {/* Canvas */}
      <div className="relative w-full h-80 rounded-lg overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-app)]">
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          className={`w-full h-full block ${stratified ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'}`}
        />

        <div className="absolute top-2.5 start-2.5 pointer-events-none">
          <span className="text-[10px] font-mono text-[var(--text-secondary)] bg-[var(--bg-surface)]/90 backdrop-blur-md px-2 py-0.5 rounded border border-[var(--border-subtle)]">
            {stratified
              ? 'Drag cohort diamond centers to test paradox sensitivity'
              : 'Pooled Dataset: Exercise (X) vs Cardiovascular Risk (Y)'}
          </span>
        </div>
      </div>

      {/* Metrics HUD & Slopes Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Pooled Model */}
        <div className="p-3 rounded-lg border border-rose-500/20 bg-rose-500/5 space-y-1">
          <div className="text-[11px] font-mono uppercase tracking-wider text-[var(--math-loss)] font-semibold flex items-center justify-between">
            <span>{language === 'ar' ? 'الانحدار المجمّع (المضلل)' : 'Naive Pooled OLS (Misleading)'}</span>
            <span className="text-[10px] text-[var(--math-loss)] font-bold">β &gt; 0</span>
          </div>
          <div className="text-xs font-mono text-[var(--text-primary)]">
            Slope = <span className="font-bold text-[var(--math-loss)] tabular-nums">+{pooledOLS?.slope.toFixed(2)}</span>
            <span className="text-[11px] text-[var(--text-tertiary)] ms-2">
              ({language === 'ar' ? 'يوحي بأن الرياضة تزيد الخطر!' : 'Suggests exercise increases risk!'})
            </span>
          </div>
        </div>

        {/* Stratified Model */}
        <div className="p-3 rounded-lg border border-emerald-500/20 bg-emerald-500/5 space-y-1">
          <div className="text-[11px] font-mono uppercase tracking-wider text-[var(--math-vector)] font-semibold flex items-center justify-between">
            <span>{language === 'ar' ? 'الانحدار الطبقي السببي' : 'Stratified Causal Slopes'}</span>
            <span className="text-[10px] text-[var(--math-vector)] font-bold">β &lt; 0 in all groups</span>
          </div>
          <div className="text-xs font-mono text-[var(--text-primary)]">
            Slopes = <span className="font-bold text-[var(--math-vector)] tabular-nums">{subgroupOLS.map((s) => s?.slope.toFixed(2)).join(', ')}</span>
            <span className="text-[11px] text-[var(--text-tertiary)] ms-2">
              ({language === 'ar' ? 'الرياضة تقلل الخطر لكل فئة!' : 'Exercise reduces risk within every age group!'})
            </span>
          </div>
        </div>
      </div>

      {/* Mathematical & Causal Formalism */}
      <div className="p-3.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-app)] space-y-2">
        <div className="text-[11px] font-mono uppercase tracking-wider text-sky-400 font-semibold">
          {language === 'ar' ? 'الاستدلال السببي ومبرهنة بيرل (Pearl Causal DAG)' : "Pearl's Causal Conditioning & Omitted Variable Bias"}
        </div>
        <div dir="ltr" className="text-xs font-mono py-0.5">
          <KaTeXMath math="\mathbb{E}[Y \mid X] \neq \mathbb{E}[Y \mid do(X)] \quad \iff \quad \text{Cov}(X, \epsilon) \neq 0" block />
        </div>
        <p className="text-[11px] text-[var(--text-secondary)] font-mono leading-relaxed">
          {language === 'ar'
            ? 'العمر (Age) هو متغير مربك (Confounder) يؤثر على ساعات التمرين والخطر الأولي معاً. إغفاله يخرق فرضية غاوس-ماركوف الخارجية ويسبب تحيزاً حاداً في معامل الانحدار.'
            : 'Age is a backdoor confounding variable affecting both exercise habits and baseline cardiovascular risk. Omitting it violates the Gauss-Markov exogeneity assumption, producing severe Omitted Variable Bias (OVB).'}
        </p>
      </div>
    </div>
  );
};

import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { useOkvirStore } from '@/lib/store';
import { audio } from '@/lib/audio';
import { PreCanvasBriefing, PostCanvasConsolidation, TierContent } from '@/components/pedagogy/MultiTierDisclosure';
import { Layers, Shapes } from 'lucide-react';

interface VectorPoint {
  x: number;
  y: number;
}

type VectorPreset = 'orthogonal' | 'collinear' | 'antiparallel' | 'acute';

const PRESETS: Record<VectorPreset, { name: { en: string; ar: string }; u: VectorPoint; v: VectorPoint }> = {
  orthogonal: {
    name: { en: 'Orthogonal (u ⊥ v)', ar: 'متعامدان (u ⊥ v)' },
    u: { x: 0, y: 3 },
    v: { x: 4, y: 0 },
  },
  acute: {
    name: { en: 'Acute Angle (Projection)', ar: 'زاوية حادة (إسقاط)' },
    u: { x: 2, y: 3 },
    v: { x: 4, y: 1 },
  },
  collinear: {
    name: { en: 'Collinear (Parallel)', ar: 'متوازيان (تطابق اتجاهي)' },
    u: { x: 2, y: 2 },
    v: { x: 4, y: 4 },
  },
  antiparallel: {
    name: { en: 'Anti-parallel (180°)', ar: 'متعاكسان (١٨٠ درجة)' },
    u: { x: 3, y: 2 },
    v: { x: -3, y: -2 },
  },
};

const VECTOR_PEDAGOGY: TierContent = {
  intuition: {
    analogy: {
      en: 'Think of the dot product as shining a flashlight perpendicular to vector v: the scalar projection is the exact length of the shadow cast by vector u onto vector v. The determinant measures the 2D area spanned between them.',
      ar: 'تخيل حاصل الضرب النقطي كإسقاط ظل لمصباح كهربائي عمودي على المتجه v: الإسقاط القياسي هو الطول الدقيق للظل الذي يسقطه المتجه u على المتجه v، بينما يقيس المحدد المساحة ثنائية الأبعاد لمتوازي الأضلاع المحصور بينهما.',
    },
    keyTakeaway: {
      en: 'When vectors are perpendicular (90°), the shadow has zero length: u · v = 0. When they are parallel, the determinant area collapses to zero, signaling linear dependence.',
      ar: 'عندما يكون المتجهان متعامدين (٩٠ درجة)، يكون طول الظل صفراً: u · v = 0. وعندما يتوازيان، تنهار مساحة متوازي الأضلاع إلى الصفر، دلالة على الارتباط الخطي.',
    },
  },
  geometry: {
    visualDescription: {
      en: 'Gram-Schmidt decomposition divides vector v into parallel projection and perpendicular component: v = v_parallel + v_perp, where v_perp is strictly orthogonal to u.',
      ar: 'يقسم تحليل غرام-شميت المتجه v إلى مركبة موازية ومركبة عمودية: v = v_parallel + v_perp، حيث تكون v_perp عمودية تماماً على u.',
    },
    conservedQuantity: {
      en: 'Pythagorean invariant: ||u||² = ||u_parallel||² + ||u_perp||² holds identically for any two vectors.',
      ar: 'ثابت فيثاغورس: ||u||² = ||u_parallel||² + ||u_perp||² يتحقق دائماً لأي متجهين في الفضاء الإقليدي.',
    },
  },
  formal: {
    equation: '\\mathbf{u} \\cdot \\mathbf{v} = \\|\\mathbf{u}\\| \\|\\mathbf{v}\\| \\cos\\theta, \\quad \\det([\\mathbf{u}, \\mathbf{v}]) = u_1 v_2 - u_2 v_1',
    derivationSteps: [
      {
        step: '\\text{proj}_{\\mathbf{v}}(\\mathbf{u}) = \\frac{\\mathbf{u} \\cdot \\mathbf{v}}{\\|\\mathbf{v}\\|^2} \\mathbf{v}',
        note: {
          en: 'Vector projection operator onto the 1D subspace spanned by v',
          ar: 'مؤثر الإسقاط المتجهي على الفضاء الجزئي أحادي البعد الممتد عبر v',
        },
      },
      {
        step: '\\mathbf{v}_\\perp = \\mathbf{v} - \\frac{\\mathbf{u} \\cdot \\mathbf{v}}{\\|\\mathbf{u}\\|^2} \\mathbf{u}',
        note: {
          en: 'Gram-Schmidt orthogonalization producing a perpendicular basis vector',
          ar: 'تعامد غرام-شميت لتوليد متجه أساس عمودي',
        },
      },
      {
        step: '\\text{Area}(\\mathcal{P}) = |u_1 v_2 - u_2 v_1| = \\|\\mathbf{u}\\| \\|\\mathbf{v}\\| |\\sin\\theta|',
        note: {
          en: 'Parallelogram area equals absolute 2x2 determinant',
          ar: 'مساحة متوازي الأضلاع تساوي القيمة المطلقة لمحدد المصفوفة الثنائية',
        },
      },
    ],
  },
  code: {
    snippet: `import numpy as np

def vector_geometry(u: np.ndarray, v: np.ndarray):
    dot = np.dot(u, v)
    norm_u = np.linalg.norm(u)
    norm_v = np.linalg.norm(v)
    
    # Gram-Schmidt perpendicular component
    proj_v = (dot / (norm_v**2 + 1e-12)) * v
    perp_v = u - proj_v
    
    # Parallelogram area (2D determinant)
    det_area = np.abs(u[0] * v[1] - u[1] * v[0])
    
    return {
        "dot": float(dot),
        "det_area": float(det_area),
        "is_orthogonal": bool(np.isclose(dot, 0.0, atol=1e-6)),
        "is_collinear": bool(np.isclose(det_area, 0.0, atol=1e-6))
    }`,
    explanation: {
      en: 'Vectorized NumPy implementation using SIMD BLAS routines with determinant area calculation for collinearity checking.',
      ar: 'تطبيق مصفوفي عبر مكتبة NumPy يحسب التعامد ومساحة المحدد لكشف الارتباط الخطي.',
    },
  },
};

export const VectorGeometryCanvas: React.FC<{ compact?: boolean }> = ({ compact = true }) => {
  const { language, config } = useOkvirStore();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [u, setU] = useState<VectorPoint>({ x: 3, y: 2 });
  const [v, setV] = useState<VectorPoint>({ x: 4, y: -1 });
  const [showParallelogram, setShowParallelogram] = useState(true);
  const [showGramSchmidt, setShowGramSchmidt] = useState(false);
  const [dragging, setDragging] = useState<'u' | 'v' | null>(null);
  const [activePreset, setActivePreset] = useState<VectorPreset | 'custom'>('custom');

  // Mathematical derivations
  const magU = Math.hypot(u.x, u.y);
  const magV = Math.hypot(v.x, v.y);
  const dotProduct = u.x * v.x + u.y * v.y;
  const detArea = Math.abs(u.x * v.y - u.y * v.x);
  const cosTheta = magU > 0 && magV > 0 ? Math.max(-1, Math.min(1, dotProduct / (magU * magV))) : 0;
  const thetaRad = Math.acos(cosTheta);
  const thetaDeg = (thetaRad * 180) / Math.PI;

  // Scalar projection of u onto v: (u . v) / |v|
  const projScalar = magV > 0 ? dotProduct / magV : 0;
  // Vector projection: projScalar * (v / |v|)
  const { projVector, perpVector } = useMemo(() => {
    const proj: VectorPoint = magV > 0 ? {
      x: (projScalar * v.x) / magV,
      y: (projScalar * v.y) / magV,
    } : { x: 0, y: 0 };

    const perp: VectorPoint = {
      x: u.x - proj.x,
      y: u.y - proj.y,
    };

    return { projVector: proj, perpVector: perp };
  }, [magV, projScalar, v.x, v.y, u.x, u.y]);

  const isOrthogonal = Math.abs(dotProduct) < 0.08;
  const isCollinear = detArea < 0.15;

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const cssWidth = canvas.clientWidth || 640;
    const cssHeight = canvas.clientHeight || 400;

    if (canvas.width !== cssWidth * dpr || canvas.height !== cssHeight * dpr) {
      canvas.width = cssWidth * dpr;
      canvas.height = cssHeight * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    const width = cssWidth;
    const height = cssHeight;
    const originX = width / 2;
    const originY = height / 2;
    const scale = Math.min(width, height) / 14;

    ctx.clearRect(0, 0, width, height);

    // 1. Coordinate Grid Lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let x = -7; x <= 7; x++) {
      const px = originX + x * scale;
      ctx.beginPath();
      ctx.moveTo(px, 0);
      ctx.lineTo(px, height);
      ctx.stroke();
    }
    for (let y = -7; y <= 7; y++) {
      const py = originY - y * scale;
      ctx.beginPath();
      ctx.moveTo(0, py);
      ctx.lineTo(width, py);
      ctx.stroke();
    }

    // 2. Axes
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, originY);
    ctx.lineTo(width, originY);
    ctx.moveTo(originX, 0);
    ctx.lineTo(originX, height);
    ctx.stroke();

    const uPx = originX + u.x * scale;
    const uPy = originY - u.y * scale;
    const vPx = originX + v.x * scale;
    const vPy = originY - v.y * scale;
    const uvPx = originX + (u.x + v.x) * scale;
    const uvPy = originY - (u.y + v.y) * scale;

    // 3. Shaded Parallelogram (Determinant Area)
    if (showParallelogram && !isCollinear) {
      ctx.beginPath();
      ctx.moveTo(originX, originY);
      ctx.lineTo(uPx, uPy);
      ctx.lineTo(uvPx, uvPy);
      ctx.lineTo(vPx, vPy);
      ctx.closePath();
      ctx.fillStyle = 'rgba(168, 85, 247, 0.12)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.35)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    // 4. Projection shadow on vector V
    const projPx = originX + projVector.x * scale;
    const projPy = originY - projVector.y * scale;

    ctx.strokeStyle = 'rgba(245, 158, 11, 0.5)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(uPx, uPy);
    ctx.lineTo(projPx, projPy);
    ctx.stroke();
    ctx.setLineDash([]);

    // Highlighted Projection Segment along V
    ctx.strokeStyle = 'rgba(245, 158, 11, 0.9)';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(originX, originY);
    ctx.lineTo(projPx, projPy);
    ctx.stroke();

    // 5. Gram-Schmidt Orthogonal Vector
    if (showGramSchmidt) {
      const perpPx = originX + perpVector.x * scale;
      const perpPy = originY - perpVector.y * scale;
      ctx.strokeStyle = '#ec4899';
      ctx.lineWidth = 2.5;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(originX, originY);
      ctx.lineTo(perpPx, perpPy);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.font = 'bold 11px monospace';
      ctx.fillStyle = '#ec4899';
      ctx.fillText('u_⊥ (Orthogonal)', perpPx + 8, perpPy - 6);
    }

    // 6. Draw Angle Arc between U and V
    const angleU = Math.atan2(u.y, u.x);
    const angleV = Math.atan2(v.y, v.x);
    ctx.strokeStyle = isOrthogonal ? 'rgba(245, 158, 11, 0.9)' : 'rgba(168, 85, 247, 0.6)';
    ctx.lineWidth = isOrthogonal ? 2.5 : 1.5;
    ctx.beginPath();
    ctx.arc(originX, originY, scale * 1.3, -angleU, -angleV, angleU > angleV);
    ctx.stroke();

    // Helper: draw arrow vector
    const drawArrow = (fromX: number, fromY: number, toX: number, toY: number, color: string, label: string) => {
      const headlen = 12;
      const dx = toX - fromX;
      const dy = toY - fromY;
      const angle = Math.atan2(dy, dx);

      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.lineWidth = 3;

      // Line
      ctx.beginPath();
      ctx.moveTo(fromX, fromY);
      ctx.lineTo(toX, toY);
      ctx.stroke();

      // Arrowhead
      ctx.beginPath();
      ctx.moveTo(toX, toY);
      ctx.lineTo(toX - headlen * Math.cos(angle - Math.PI / 6), toY - headlen * Math.sin(angle - Math.PI / 6));
      ctx.lineTo(toX - headlen * Math.cos(angle + Math.PI / 6), toY - headlen * Math.sin(angle + Math.PI / 6));
      ctx.closePath();
      ctx.fill();

      // Handle circle
      ctx.beginPath();
      ctx.arc(toX, toY, 8, 0, Math.PI * 2);
      ctx.fillStyle = '#09090b';
      ctx.fill();
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Label
      ctx.font = 'bold 12px "JetBrains Mono", monospace';
      ctx.fillStyle = color;
      ctx.fillText(label, toX + 12, toY - 8);
    };

    // Draw Vector U (Emerald)
    drawArrow(originX, originY, uPx, uPy, '#10b981', `u (${u.x.toFixed(1)}, ${u.y.toFixed(1)})`);

    // Draw Vector V (Sky Blue)
    drawArrow(originX, originY, vPx, vPy, '#38bdf8', `v (${v.x.toFixed(1)}, ${v.y.toFixed(1)})`);

    // Projection Point dot
    ctx.beginPath();
    ctx.arc(projPx, projPy, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#f59e0b';
    ctx.fill();

    ctx.restore();
  }, [u, v, projVector, perpVector, showParallelogram, showGramSchmidt, isOrthogonal, isCollinear]);

  useEffect(() => {
    draw();
  }, [draw]);

  // Coordinate transformation from mouse to unit coordinates
  const getUnitCoords = (e: React.PointerEvent<HTMLCanvasElement>): VectorPoint => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    const originX = rect.width / 2;
    const originY = rect.height / 2;
    const scale = Math.min(rect.width, rect.height) / 14;

    const x = Math.round(((px - originX) / scale) * 10) / 10;
    const y = Math.round(((originY - py) / scale) * 10) / 10;
    return {
      x: Math.max(-6, Math.min(6, x)),
      y: Math.max(-6, Math.min(6, y)),
    };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const coords = getUnitCoords(e);
    const distU = Math.hypot(coords.x - u.x, coords.y - u.y);
    const distV = Math.hypot(coords.x - v.x, coords.y - v.y);

    if (distU < 1.2) {
      setDragging('u');
      e.currentTarget.setPointerCapture(e.pointerId);
      setActivePreset('custom');
      if (config.soundEnabled) audio.playClick();
    } else if (distV < 1.2) {
      setDragging('v');
      e.currentTarget.setPointerCapture(e.pointerId);
      setActivePreset('custom');
      if (config.soundEnabled) audio.playClick();
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!dragging) return;
    const coords = getUnitCoords(e);
    if (dragging === 'u') {
      setU(coords);
    } else if (dragging === 'v') {
      setV(coords);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (dragging) {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
      setDragging(null);
      if (isOrthogonal && config.soundEnabled) {
        audio.playSuccess();
      }
    }
  };

  const applyPreset = (key: VectorPreset) => {
    const preset = PRESETS[key];
    setU(preset.u);
    setV(preset.v);
    setActivePreset(key);
    if (config.soundEnabled) {
      if (key === 'orthogonal') audio.playSuccess();
      else audio.playClick();
    }
  };

  return (
    <div className="flex flex-col gap-5 select-none">
      {/* Pre-Canvas Intuitive Briefing & Mental Model */}
      {!compact && <PreCanvasBriefing content={VECTOR_PEDAGOGY} />}

      {/* Top Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] specular">
        {/* Preset Scenarios Strip */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-mono text-[var(--text-tertiary)] uppercase tracking-wider me-1">
            {language === 'ar' ? 'الأوضاع:' : 'Scenarios:'}
          </span>
          {(Object.keys(PRESETS) as VectorPreset[]).map((key) => (
            <button
              key={key}
              onClick={() => applyPreset(key)}
              className={`px-2.5 py-1 text-xs font-mono rounded-lg border transition-all ${
                activePreset === key
                  ? 'border-[var(--math-vector)] bg-[var(--math-vector)]/15 text-[var(--math-vector)] font-bold shadow-sm'
                  : 'border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]'
              }`}
            >
              {PRESETS[key].name[language]}
            </button>
          ))}
        </div>

        {/* Action Toggles */}
        <div className="flex items-center gap-2">
          {/* Toggle Parallelogram */}
          <button
            onClick={() => setShowParallelogram(!showParallelogram)}
            className={`flex items-center gap-1 px-2.5 py-1 text-xs font-mono rounded-lg border transition-all ${
              showParallelogram
                ? 'border-[var(--math-prediction)] bg-[var(--math-prediction)]/15 text-[var(--math-prediction)] font-bold'
                : 'border-[var(--border-subtle)] text-[var(--text-secondary)]'
            }`}
            title="Toggle Determinant Parallelogram Area"
          >
            <Shapes size={12} />
            <span>{language === 'ar' ? 'متوازي الأضلاع' : 'Determinant Area'}</span>
          </button>

          {/* Toggle Gram-Schmidt */}
          <button
            onClick={() => setShowGramSchmidt(!showGramSchmidt)}
            className={`flex items-center gap-1 px-2.5 py-1 text-xs font-mono rounded-lg border transition-all ${
              showGramSchmidt
                ? 'border-[var(--math-cluster)] bg-[var(--math-cluster)]/15 text-[var(--math-cluster)] font-bold'
                : 'border-[var(--border-subtle)] text-[var(--text-secondary)]'
            }`}
            title="Toggle Gram-Schmidt Orthogonal Component"
          >
            <Layers size={12} />
            <span>Gram-Schmidt</span>
          </button>
        </div>
      </div>

      {/* 2D Canvas */}
      <div className="relative rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-app)] overflow-hidden shadow-inner flex items-center justify-center p-2">
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="w-full max-w-2xl h-auto aspect-[16/10] cursor-crosshair touch-none"
        />

        <div className="absolute top-3 start-3 px-2.5 py-1 rounded-md bg-[var(--bg-surface)]/80 backdrop-blur-md border border-[var(--border-subtle)] text-[11px] font-mono text-[var(--text-tertiary)]">
          {language === 'ar' ? 'اسحب رؤوس الأسهم u و v لضبط الإحداثيات' : 'Drag arrow endpoints (u, v) to transform space'}
        </div>

        {/* Determinant Area Badge */}
        {showParallelogram && (
          <div className="absolute top-3 end-3 px-2.5 py-1 rounded-md bg-[var(--bg-surface)]/85 backdrop-blur-md border border-[var(--border-subtle)] text-xs font-mono">
            <span className="text-[var(--text-tertiary)]">Area |det|: </span>
            <span className="text-purple-400 font-bold tabular-nums">
              {detArea.toFixed(2)}
            </span>
            {isCollinear && (
              <span className="ms-1.5 text-rose-400 font-semibold">
                (Collinear / Dependent!)
              </span>
            )}
          </div>
        )}
      </div>

      {/* Reactive Geometric Telemetry HUD */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {/* Dot Product */}
        <div className={`p-3.5 rounded-xl border transition-all flex flex-col gap-1 ${
          isOrthogonal ? 'border-amber-400 bg-amber-500/10' : 'border-[var(--border-subtle)] bg-[var(--bg-surface)]'
        }`}>
          <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-tertiary)]">
            Dot Product (u · v)
          </span>
          <span className={`text-base font-mono font-bold tabular-nums ${isOrthogonal ? 'text-amber-400' : 'text-[var(--text-primary)]'}`}>
            {dotProduct.toFixed(2)}
          </span>
          <span className="text-[10px] font-mono text-[var(--text-tertiary)]">
            {isOrthogonal
              ? (language === 'ar' ? '⚡ متعامدان (Orthogonal)' : '⚡ Orthogonal (Perpendicular)')
              : dotProduct > 0
              ? (language === 'ar' ? 'زاوية حادة (Acute)' : 'Acute Angle')
              : (language === 'ar' ? 'زاوية منفرجة (Obtuse)' : 'Obtuse Angle')}
          </span>
        </div>

        {/* Angle Theta */}
        <div className="p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] flex flex-col gap-1">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-tertiary)]">
            Angle (θ)
          </span>
          <span className="text-base font-mono font-bold tabular-nums text-purple-400">
            {thetaDeg.toFixed(1)}°
          </span>
          <span className="text-[10px] font-mono text-[var(--text-tertiary)]">
            {(thetaRad / Math.PI).toFixed(2)}π rad
          </span>
        </div>

        {/* Magnitude ||u|| */}
        <div className="p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] flex flex-col gap-1">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-tertiary)]">
            Magnitude ‖u‖
          </span>
          <span className="text-base font-mono font-bold tabular-nums text-emerald-400">
            {magU.toFixed(2)}
          </span>
          <span className="text-[10px] font-mono text-[var(--text-tertiary)]">
            √(u₁² + u₂²)
          </span>
        </div>

        {/* Scalar Projection */}
        <div className="p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] flex flex-col gap-1">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-tertiary)]">
            Projection (u onto v)
          </span>
          <span className="text-base font-mono font-bold tabular-nums text-amber-400">
            {projScalar.toFixed(2)}
          </span>
          <span className="text-[10px] font-mono text-[var(--text-tertiary)]">
            ‖u‖ cos(θ)
          </span>
        </div>
      </div>

      {/* Post-Canvas Mathematical & Code Consolidation */}
      {!compact && <PostCanvasConsolidation content={VECTOR_PEDAGOGY} />}
    </div>
  );
};

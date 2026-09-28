import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { useOkvirStore } from '@/lib/store';
import { audio } from '@/lib/audio';
import { PreCanvasBriefing, PostCanvasConsolidation, TierContent } from '@/components/pedagogy/MultiTierDisclosure';

type RegType = 'lasso' | 'ridge';
type RegPreset = 'horizontal_sparse' | 'vertical_sparse' | 'correlated' | 'heavy_penalty';

const PRESETS: Record<RegPreset, {
  name: { en: string; ar: string };
  olsW: { x: number; y: number };
  lambda: number;
  mode: RegType;
  description: { en: string; ar: string };
}> = {
  horizontal_sparse: {
    name: { en: 'Sparsity (w₂ = 0)', ar: 'تناثر أفقي (w₂ = ٠)' },
    olsW: { x: 2.4, y: 1.1 },
    lambda: 1.3,
    mode: 'lasso',
    description: {
      en: 'Contour strikes the horizontal diamond corner, zeroing out feature 2 completely.',
      ar: 'يصطدم خط الكنتور برأس المعين الأفقي، مصفراً الميزة الثانية بالكامل.',
    },
  },
  vertical_sparse: {
    name: { en: 'Sparsity (w₁ = 0)', ar: 'تناثر عمودي (w₁ = ٠)' },
    olsW: { x: 0.9, y: 2.6 },
    lambda: 1.4,
    mode: 'lasso',
    description: {
      en: 'Contour strikes the vertical diamond corner, driving feature 1 to zero.',
      ar: 'يصطدم خط الكنتور برأس المعين العمودي، مصفراً الميزة الأولى.',
    },
  },
  correlated: {
    name: { en: 'Collinear Features', ar: 'ميزات عالية الارتباط' },
    olsW: { x: 2.2, y: 2.0 },
    lambda: 1.0,
    mode: 'ridge',
    description: {
      en: 'Ridge smoothly shrinks collinear weights together, preventing variance explosion.',
      ar: 'يقوم تنظيم ريدج بتقليص الأوزان المرتبطة معاً بنعومة لمنع تشتت التباين.',
    },
  },
  heavy_penalty: {
    name: { en: 'Heavy Penalty (Origin)', ar: 'جزاء قوي (انكماش للمركز)' },
    olsW: { x: 2.0, y: 1.5 },
    lambda: 2.8,
    mode: 'lasso',
    description: {
      en: 'Severe regularization budget collapses both weights into the origin.',
      ar: 'ميزانية تنظيمية مقيدة جداً تؤدي لانكماش الأوزان نحو الصفر.',
    },
  },
};

const REG_PEDAGOGY: TierContent = {
  intuition: {
    analogy: {
      en: 'Think of regularization as a budget constraint. In Lasso (L1), the budget region is a diamond with sharp pointy corners sticking out along the coordinate axes. As the elliptical contours of the unconstrained OLS solution expand, they almost always touch one of these sharp corners first!',
      ar: 'تخيل التنظيم كميزانية مقيدة. في لاسو (L1)، تكون منطقة الميزانية معينية الشكل ذات زوايا حادة تبرز عند محاور الإحداثيات. ومع توسع خطوط كنتور OLS البيضاوية، فإنها تصطدم حتماً بإحدى هذه الزوايا الحادة أولاً!',
    },
    keyTakeaway: {
      en: 'Lasso performs automatic feature selection because corners sit strictly on the axes (where at least one parameter is exactly zero). Ridge only shrinks weights smoothly without zeroing them.',
      ar: 'يقوم لاسو باختيار الميزات تلقائياً لأن زوايا المعين تقع تماماً على المحاور (حيث يكون وزن واحد على الأقل صفراً مطلقاً)، بينما يكتفي ريدج بتقليص الأوزان دون تصفيرها.',
    },
  },
  geometry: {
    visualDescription: {
      en: 'The optimal solution w* is the tangency point between the level sets of the quadratic loss function (w - ŵ)^T (X^T X) (w - ŵ) = c and the L1 norm ball ||w||₁ ≤ C or L2 norm ball ||w||₂² ≤ C.',
      ar: 'الحل الأمثل *w هو نقطة التماس بين مجموعات المستوى لدالة الخسارة التربيعية لـ OLS وكرة المعيار ||w||₁ ≤ C أو كرة المعيار ||w||₂² ≤ C.',
    },
    conservedQuantity: {
      en: 'At tangency, the negative gradient of the loss -∇L(w*) lies in the normal cone (or subgradient) of the constraint ball.',
      ar: 'عند نقطة التماس، يقع معكوس تدرج الخسارة داخل المخروط العمودي (أو شبه التدرج) لمنطقة القيد.',
    },
  },
  formal: {
    equation: '\\min_{\\mathbf{w}} \\frac{1}{2n}\\|\\mathbf{y} - \\mathbf{X}\\mathbf{w}\\|^2 + \\lambda \\|\\mathbf{w}\\|_p',
    derivationSteps: [
      {
        step: '\\text{Ridge (L2): } \\mathbf{w}^* = (\\mathbf{X}^T \\mathbf{X} + \\lambda \\mathbf{I})^{-1} \\mathbf{X}^T \\mathbf{y}',
        note: {
          en: 'Closed-form analytical solution: adds lambda to eigenvalues of X^T X, preventing matrix inversion singularity',
          ar: 'حل تحليلي مغلق: يضيف معامل الجزاء للقيم الذاتية للمصفوفة لمنع انفجار الانعكاس عند الارتباط الخطي',
        },
      },
      {
        step: '\\partial |w_j| = \\begin{cases} \\{1\\} & w_j > 0 \\\\ [-1, 1] & w_j = 0 \\\\ \\{-1\\} & w_j < 0 \\end{cases}',
        note: {
          en: 'Subgradient of the absolute value function at the non-differentiable kink w = 0',
          ar: 'شبه تدرج دالة القيمة المطلقة عند النقطة الحادة غير القابلة للاشتقاق عند الصفر',
        },
      },
      {
        step: 'w_j^* = \\mathcal{S}_{\\lambda}(z_j) = \\text{sign}(z_j) \\max(|z_j| - \\lambda, 0)',
        note: {
          en: 'Soft-Thresholding Operator: drives parameters with magnitude less than lambda strictly to zero',
          ar: 'مؤثر العتبة الناعمة: يصفر الأوزان التي يقل مقدارها عن عتبة الجزاء بالكامل',
        },
      },
    ],
  },
  code: {
    snippet: `import numpy as np

def soft_threshold(rho: float, lam: float) -> float:
    """Soft-thresholding operator for Lasso coordinate descent."""
    if rho < -lam:
        return rho + lam
    elif rho > lam:
        return rho - lam
    else:
        return 0.0  # Exact sparsity!

def lasso_coordinate_descent(X: np.ndarray, y: np.ndarray, lam: float, max_iter: int = 100):
    """
    Vectorized cyclic coordinate descent for L1 regularized regression.
    Complexity: O(max_iter * N * D).
    """
    n_samples, n_features = X.shape
    w = np.zeros(n_features)
    
    # Precompute column norms: ||x_j||^2
    col_norms = np.sum(X ** 2, axis=0)
    
    for _ in range(max_iter):
        for j in range(n_features):
            # Compute partial residual without feature j
            r_j = y - (X @ w - X[:, j] * w[j])
            rho = np.dot(X[:, j], r_j)
            w[j] = soft_threshold(rho, lam * n_samples) / col_norms[j]
            
    return w`,
    explanation: {
      en: 'Cyclic Coordinate Descent iteratively updates one weight at a time using closed-form soft thresholding, guaranteeing convergence for convex Lasso objectives.',
      ar: 'طريقة الهبوط الإحداثي الدائري تحدث كل وزن منفرداً عبر عتبة ناعمة مغلقة، مما يضمن التقارب نحو الحل الأمثل للاسو.',
    },
  },
};

export const RegularizationGeometryCanvas: React.FC<{ compact?: boolean }> = ({ compact = true }) => {
  const { language, config } = useOkvirStore();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [mode, setMode] = useState<RegType>('lasso');
  const [lambda, setLambda] = useState<number>(1.2);
  const [olsW, setOlsW] = useState<{ x: number; y: number }>({ x: 2.2, y: 1.4 });
  const [draggingOls, setDraggingOls] = useState(false);
  const [activePreset, setActivePreset] = useState<RegPreset | 'custom'>('horizontal_sparse');

  // Calculate constraint boundary size C
  const C = Math.max(0.4, 3.8 / (1 + 0.9 * lambda));
  const olsNorm = Math.hypot(olsW.x, olsW.y);

  // Optimal tangency solution w*
  const { solW, isExactZero } = useMemo(() => {
    let sol = { x: 0, y: 0 };
    let exactZero = false;

    if (mode === 'lasso') {
      // Check if unconstrained point projects into corner cone
      const absX = Math.abs(olsW.x);
      const absY = Math.abs(olsW.y);
      const signX = Math.sign(olsW.x) || 1;
      const signY = Math.sign(olsW.y) || 1;

      if (absX >= absY * 1.5) {
        // Hits horizontal corner (w2 = 0)
        sol = { x: signX * Math.min(absX, C), y: 0 };
        exactZero = true;
      } else if (absY >= absX * 1.5) {
        // Hits vertical corner (w1 = 0)
        sol = { x: 0, y: signY * Math.min(absY, C) };
        exactZero = true;
      } else {
        // Along facet
        const factor = Math.min(1, C / (absX + absY));
        sol = { x: olsW.x * factor, y: olsW.y * factor };
        exactZero = false;
      }
    } else {
      // Ridge: smooth radial shrinkage
      const scale = Math.min(1, C / Math.max(0.01, olsNorm));
      sol = { x: olsW.x * scale, y: olsW.y * scale };
      exactZero = false;
    }

    return { solW: sol, isExactZero: exactZero };
  }, [mode, olsW, C, olsNorm]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const cssWidth = canvas.clientWidth || 540;
    const cssHeight = canvas.clientHeight || 360;

    if (canvas.width !== cssWidth * dpr || canvas.height !== cssHeight * dpr) {
      canvas.width = cssWidth * dpr;
      canvas.height = cssHeight * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    const width = cssWidth;
    const height = cssHeight;
    const originX = width * 0.38;
    const originY = height * 0.65;
    const scale = Math.min(width, height) / 5.2;

    ctx.clearRect(0, 0, width, height);

    // 1. Grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let x = -3; x <= 4; x++) {
      const px = originX + x * scale;
      ctx.beginPath();
      ctx.moveTo(px, 0);
      ctx.lineTo(px, height);
      ctx.stroke();
    }
    for (let y = -3; y <= 4; y++) {
      const py = originY - y * scale;
      ctx.beginPath();
      ctx.moveTo(0, py);
      ctx.lineTo(width, py);
      ctx.stroke();
    }

    // 2. Axes w1 and w2
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.lineWidth = 1.5;
    // Axis w1
    ctx.beginPath();
    ctx.moveTo(0, originY);
    ctx.lineTo(width, originY);
    ctx.stroke();
    // Axis w2
    ctx.beginPath();
    ctx.moveTo(originX, 0);
    ctx.lineTo(originX, height);
    ctx.stroke();

    // Axis Labels
    ctx.fillStyle = '#a1a1aa';
    ctx.font = '11px monospace';
    ctx.fillText('w₁', width - 20, originY - 8);
    ctx.fillText('w₂', originX + 8, 20);

    // 3. OLS Loss Contours (Ellipses centered at olsW)
    const olsPx = originX + olsW.x * scale;
    const olsPy = originY - olsW.y * scale;

    const solPx = originX + solW.x * scale;
    const solPy = originY - solW.y * scale;
    const contourR = Math.hypot(olsPx - solPx, olsPy - solPy);

    const ellipseCount = 4;
    for (let i = 1; i <= ellipseCount; i++) {
      const r = (contourR / 1.5) * (i * 0.5);
      ctx.save();
      ctx.translate(olsPx, olsPy);
      ctx.rotate(-Math.PI / 6); // Tilted covariance matrix
      ctx.scale(1.35, 0.75);

      ctx.beginPath();
      ctx.arc(0, 0, Math.max(2, r), 0, Math.PI * 2);
      ctx.strokeStyle = i === 2 ? 'rgba(244, 63, 94, 0.7)' : 'rgba(244, 63, 94, 0.16)';
      ctx.lineWidth = i === 2 ? 2 : 1;
      if (i === 2) ctx.setLineDash([4, 3]);
      ctx.stroke();
      ctx.restore();
    }

    // 4. Constraint Region (L1 Diamond or L2 Circle)
    if (mode === 'lasso') {
      ctx.fillStyle = 'rgba(16, 185, 129, 0.12)';
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.85)';
      ctx.lineWidth = 2;
      ctx.setLineDash([]);

      ctx.beginPath();
      ctx.moveTo(originX + C * scale, originY);
      ctx.lineTo(originX, originY - C * scale);
      ctx.lineTo(originX - C * scale, originY);
      ctx.lineTo(originX, originY + C * scale);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    } else {
      ctx.fillStyle = 'rgba(56, 189, 248, 0.12)';
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.85)';
      ctx.lineWidth = 2;
      ctx.setLineDash([]);

      ctx.beginPath();
      ctx.arc(originX, originY, C * scale, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }

    // 5. Unconstrained OLS Point (Draggable)
    ctx.fillStyle = '#f43f5e';
    ctx.beginPath();
    ctx.arc(olsPx, olsPy, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.font = 'bold 11px monospace';
    ctx.fillStyle = '#f43f5e';
    ctx.fillText(`ŵ OLS (${olsW.x.toFixed(1)}, ${olsW.y.toFixed(1)})`, olsPx + 10, olsPy - 6);

    // 6. Constrained Optimum Point w*
    ctx.fillStyle = mode === 'lasso' ? '#10b981' : '#38bdf8';
    ctx.beginPath();
    ctx.arc(solPx, solPy, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#fafafa';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.font = 'bold 11px monospace';
    ctx.fillStyle = mode === 'lasso' ? '#10b981' : '#38bdf8';
    ctx.fillText(`w* (${solW.x.toFixed(2)}, ${solW.y.toFixed(2)})`, solPx + 10, solPy + (isExactZero ? 18 : -8));

    // Highlight axis zero hit (Sparsity Halo)
    if (mode === 'lasso' && isExactZero) {
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(solPx, solPy, 14, 0, Math.PI * 2);
      ctx.stroke();
    }

    ctx.restore();
  }, [mode, C, solW, isExactZero, olsW]);

  useEffect(() => {
    draw();
  }, [draw]);

  // Pointer interactions for dragging OLS point
  const getUnitCoords = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    const originX = rect.width * 0.38;
    const originY = rect.height * 0.65;
    const scale = Math.min(rect.width, rect.height) / 5.2;

    const x = Math.round(((px - originX) / scale) * 10) / 10;
    const y = Math.round(((originY - py) / scale) * 10) / 10;
    return {
      x: Math.max(-2.5, Math.min(3.5, x)),
      y: Math.max(-2.0, Math.min(3.5, y)),
    };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const coords = getUnitCoords(e);
    const dist = Math.hypot(coords.x - olsW.x, coords.y - olsW.y);
    if (dist < 0.8) {
      setDraggingOls(true);
      e.currentTarget.setPointerCapture(e.pointerId);
      setActivePreset('custom');
      if (config.soundEnabled) audio.playClick();
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!draggingOls) return;
    const coords = getUnitCoords(e);
    setOlsW(coords);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (draggingOls) {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
      setDraggingOls(false);
      if (isExactZero && config.soundEnabled) {
        audio.playSuccess();
      }
    }
  };

  const applyPreset = (key: RegPreset) => {
    const p = PRESETS[key];
    setOlsW(p.olsW);
    setLambda(p.lambda);
    setMode(p.mode);
    setActivePreset(key);
    if (config.soundEnabled) {
      if (p.mode === 'lasso') audio.playSuccess();
      else audio.playClick();
    }
  };

  return (
    <div className="flex flex-col gap-5 p-5 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] specular">
      {/* Pre-Canvas Intuitive Briefing & Mental Model */}
      {!compact && <PreCanvasBriefing content={REG_PEDAGOGY} />}

      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[var(--border-subtle)] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-mono tracking-wider text-[var(--math-vector)] font-bold">
              {language === 'ar' ? 'هندسة تنظيم لاسو وريدج (L1 vs L2)' : 'L1 vs L2 Regularization Ball Geometry'}
            </span>
          </div>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            {language === 'ar'
              ? 'اسحب نقطة OLS الحمراء لمشاهدة اصطدام خطوط الكنتور بزاوية المعين وتصفير المتغيرات.'
              : 'Drag the unconstrained red OLS point to watch contours strike diamond corners and zero out coefficients.'}
          </p>
        </div>

        {/* Regularizer Selector Pills */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setMode('lasso');
              setActivePreset('custom');
              if (config.soundEnabled) audio.playClick();
            }}
            className={`px-3 py-1.5 text-xs font-mono rounded-lg border transition-all ${
              mode === 'lasso'
                ? 'border-emerald-500 bg-emerald-500/15 text-emerald-300 font-bold shadow-sm'
                : 'border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]'
            }`}
          >
            {language === 'ar' ? 'Lasso (L1 المعين)' : 'Lasso (L1 Diamond)'}
          </button>
          <button
            onClick={() => {
              setMode('ridge');
              setActivePreset('custom');
              if (config.soundEnabled) audio.playClick();
            }}
            className={`px-3 py-1.5 text-xs font-mono rounded-lg border transition-all ${
              mode === 'ridge'
                ? 'border-sky-500 bg-sky-500/15 text-sky-300 font-bold shadow-sm'
                : 'border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]'
            }`}
          >
            {language === 'ar' ? 'Ridge (L2 الدائرة)' : 'Ridge (L2 Circle)'}
          </button>
        </div>
      </div>

      {/* Preset Scenarios Strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-app)]">
        <span className="text-[11px] font-mono text-[var(--text-tertiary)] uppercase tracking-wider">
          {language === 'ar' ? 'سيناريوهات التنظيم:' : 'Regularization Scenarios:'}
        </span>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(PRESETS) as RegPreset[]).map((key) => (
            <button
              key={key}
              onClick={() => applyPreset(key)}
              className={`px-2.5 py-1 text-xs font-mono rounded-lg border transition-all ${
                activePreset === key
                  ? 'border-amber-400 bg-amber-500/15 text-amber-300 font-bold shadow-sm'
                  : 'border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]'
              }`}
            >
              {PRESETS[key].name[language]}
            </button>
          ))}
        </div>
      </div>

      {/* Canvas and Readouts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
        <div className="lg:col-span-8 relative flex justify-center bg-[var(--bg-app)] p-3 rounded-xl border border-[var(--border-subtle)]">
          <canvas
            ref={canvasRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className="w-full max-w-[540px] h-[360px] rounded-lg cursor-grab active:cursor-grabbing select-none touch-none"
          />
          <div className="absolute top-4 start-4 px-2.5 py-1 rounded bg-[var(--bg-surface)]/80 backdrop-blur-md border border-[var(--border-subtle)] text-[10px] font-mono text-[var(--text-tertiary)] select-none">
            {language === 'ar' ? 'اسحب النقطة الحمراء ŵ (OLS)' : 'Drag the red ŵ (OLS) point'}
          </div>
        </div>

        {/* Inspector Panel */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {/* Penalty Slider */}
          <div className="space-y-2 p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-app)]">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-[var(--text-secondary)]">
                {language === 'ar' ? 'معامل الجزاء λ (Penalty):' : 'Regularization Penalty λ:'}
              </span>
              <span className="text-amber-400 font-bold tabular-nums">{lambda.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="3.0"
              step="0.05"
              value={lambda}
              onChange={(e) => {
                setLambda(parseFloat(e.target.value));
                setActivePreset('custom');
                if (config.soundEnabled) audio.playClick();
              }}
              className="w-full accent-[var(--math-gradient)] cursor-pointer"
            />
            <div className="text-[10px] text-[var(--text-tertiary)] font-mono flex justify-between">
              <span>{language === 'ar' ? 'جزاء خفيف (λ↓)' : 'Light (λ↓)'}</span>
              <span>{language === 'ar' ? 'جزاء ثقيل (λ↑)' : 'Strong (λ↑)'}</span>
            </div>
          </div>

          {/* Sparsity Indicator Card */}
          <div
            className={`p-4 rounded-xl border text-xs leading-relaxed space-y-2 ${
              mode === 'lasso' && isExactZero
                ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
                : 'border-[var(--border-subtle)] bg-[var(--bg-app)] text-[var(--text-secondary)]'
            }`}
          >
            <div className="flex items-center justify-between font-mono">
              <span className="font-bold">
                {mode === 'lasso' ? 'L1 Sparsity Status' : 'L2 Shrinkage Status'}
              </span>
              <span className="text-[10px] uppercase tracking-wider font-semibold">
                {mode === 'lasso' && isExactZero ? (
                  <span className="text-emerald-400">✓ EXACT ZERO (SPARSE)</span>
                ) : (
                  <span className="text-sky-400">Dense w ≠ 0</span>
                )}
              </span>
            </div>

            <p className="text-[11px]">
              {mode === 'lasso' ? (
                isExactZero ? (
                  language === 'ar' ? (
                    'الزاوية الحادة للمعين L1 تتقاطع مع كنتور الخطأ تماماً عند المحور، مما يؤدي إلى تصفير الميزة بالكامل واختيار الميزة الأخرى.'
                  ) : (
                    'The sharp corner of the L1 diamond touches the contour directly on the axis, driving one feature strictly to zero (feature selection).'
                  )
                ) : (
                  language === 'ar' ? (
                    'مع زيادة λ، سينكمش المعين حتى تصطدم زاوية المعين بكنتور الخطأ على أحد المحاور.'
                  ) : (
                    'Increasing λ contracts the diamond until a sharp corner touches the contour on a coordinate axis.'
                  )
                )
              ) : (
                language === 'ar' ? (
                  'كرة L2 دائرية وسلسة في كل مكان، لذا تتقلص الأوزان بنعومة نحو المركز دون أن تصبح صفراً تماماً أبداً.'
                ) : (
                  'The L2 sphere is smooth and differentiable everywhere. Weights shrink continuously toward origin without ever hitting exact zero.'
                )
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Post-Canvas Mathematical & Code Consolidation */}
      {!compact && <PostCanvasConsolidation content={REG_PEDAGOGY} />}
    </div>
  );
};

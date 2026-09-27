import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useOkvirStore } from '@/lib/store';
import { audio } from '@/lib/audio';
import { KaTeXMath } from '@/components/common/KaTeXMath';

type RegType = 'lasso' | 'ridge';

export const RegularizationGeometryCanvas: React.FC<{ compact?: boolean }> = ({ compact }) => {
  const { language, config } = useOkvirStore();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [mode, setMode] = useState<RegType>('lasso');
  const [lambda, setLambda] = useState<number>(1.2); // Regularization penalty (larger lambda = smaller budget)

  // Unconstrained OLS point in weight space (w1, w2)
  const olsW = { x: 2.2, y: 1.6 };

  // Calculate constraint boundary size: radius or diamond extent C
  // Inverse relation: C = 3.5 / (1 + 0.8 * lambda)
  const C = Math.max(0.4, 3.8 / (1 + 0.9 * lambda));

  // Determine optimal constrained solution w* (point of tangency)
  // For Lasso: diamond corners at (C, 0), (0, C), (-C, 0), (0, -C).
  // Given olsW.x > olsW.y, tangency typically hits the corner (C, 0) on the horizontal axis!
  // For Ridge: circle touches at point proportional to olsW scaled by C / |olsW|
  const olsNorm = Math.hypot(olsW.x, olsW.y);

  let solW = { x: 0, y: 0 };
  if (mode === 'lasso') {
    // If contour touches corner:
    // With tilted ellipse, corner at (C, 0) gives exact zero for w2!
    if (lambda > 0.6) {
      solW = { x: C, y: 0 }; // Exact sparsity: w2 = 0!
    } else {
      // Along edge
      solW = { x: C * 0.82, y: C * 0.18 };
    }
  } else {
    // Ridge: smooth shrinkage along ray
    const scale = Math.min(1, C / olsNorm);
    solW = { x: olsW.x * scale, y: olsW.y * scale };
  }

  const isExactZero = Math.abs(solW.y) < 1e-4;

  const handleModeChange = (m: RegType) => {
    setMode(m);
    if (config.soundEnabled) audio.playClick();
  };

  const handleSlider = (val: number) => {
    setLambda(val);
    if (config.soundEnabled) audio.playClick();
  };

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const originX = width * 0.35;
    const originY = height * 0.68;
    const scale = Math.min(width, height) / 5.5; // pixels per unit

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

    // Labels w1, w2
    ctx.fillStyle = '#a1a1aa';
    ctx.font = '11px monospace';
    ctx.fillText('w₁', width - 20, originY - 8);
    ctx.fillText('w₂', originX + 8, 20);

    // 3. OLS Loss Contours (Ellipses centered at olsW)
    const olsPx = originX + olsW.x * scale;
    const olsPy = originY - olsW.y * scale;

    const contourR = Math.hypot(olsPx - (originX + solW.x * scale), olsPy - (originY - solW.y * scale));

    const ellipseCount = 5;
    for (let i = 1; i <= ellipseCount; i++) {
      const r = (contourR / 2) * (i * 0.5);
      ctx.save();
      ctx.translate(olsPx, olsPy);
      ctx.rotate(-Math.PI / 6); // Tilted covariance
      ctx.scale(1.4, 0.7);

      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.strokeStyle = i === 2 ? 'rgba(244, 63, 94, 0.7)' : 'rgba(244, 63, 94, 0.18)';
      ctx.lineWidth = i === 2 ? 2 : 1;
      if (i === 2) ctx.setLineDash([4, 3]);
      ctx.stroke();
      ctx.restore();
    }

    // 4. Constraint Region (L1 Diamond or L2 Circle)
    if (mode === 'lasso') {
      // L1 Diamond: vertices at (C,0), (0,C), (-C,0), (0,-C)
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
      // L2 Circle of radius C
      ctx.fillStyle = 'rgba(56, 189, 248, 0.12)';
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.85)';
      ctx.lineWidth = 2;
      ctx.setLineDash([]);

      ctx.beginPath();
      ctx.arc(originX, originY, C * scale, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }

    // 5. Draw Unconstrained OLS Point
    ctx.fillStyle = '#f43f5e';
    ctx.beginPath();
    ctx.arc(olsPx, olsPy, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.font = '10px monospace';
    ctx.fillStyle = '#f43f5e';
    ctx.fillText('ŵ (OLS)', olsPx + 8, olsPy - 4);

    // 6. Draw Constrained Optimum Point w*
    const solPx = originX + solW.x * scale;
    const solPy = originY - solW.y * scale;

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

    // Highlight axis zero hit
    if (mode === 'lasso' && isExactZero) {
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(solPx, solPy, 12, 0, Math.PI * 2);
      ctx.stroke();
    }
  }, [mode, C, solW, isExactZero, olsW]);

  useEffect(() => {
    draw();
  }, [draw]);

  return (
    <div className="flex flex-col gap-5 p-5 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] specular">
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
              ? 'شاهد كيف تصطدم خطوط كنتور OLS بزاوية معين L1 لتصفير الوزن w2 تماماً (التناثر).'
              : 'Observe how OLS loss contours tangentially strike the sharp corner of the L1 diamond, driving w₂ strictly to 0.'}
          </p>
        </div>

        {/* Regularizer Selector Pills */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleModeChange('lasso')}
            className={`px-3 py-1.5 text-xs font-mono rounded-lg border transition-all ${
              mode === 'lasso'
                ? 'border-emerald-500 bg-emerald-500/15 text-emerald-300 font-bold shadow-sm'
                : 'border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]'
            }`}
          >
            {language === 'ar' ? 'Lasso (L1 المعين)' : 'Lasso (L1 Diamond)'}
          </button>
          <button
            onClick={() => handleModeChange('ridge')}
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

      {/* Canvas and Readouts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
        <div className="lg:col-span-8 flex justify-center bg-[var(--bg-app)] p-3 rounded-xl border border-[var(--border-subtle)]">
          <canvas
            ref={canvasRef}
            width={480}
            height={340}
            className="w-full max-w-[480px] h-[340px] rounded-lg"
          />
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
              onChange={(e) => handleSlider(parseFloat(e.target.value))}
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
                  <span className="text-emerald-400">✓ w₂ = 0.0 (SPARSE)</span>
                ) : (
                  <span className="text-sky-400">Dense w ≠ 0</span>
                )}
              </span>
            </div>

            <p className="text-[11px]">
              {mode === 'lasso' ? (
                isExactZero ? (
                  language === 'ar' ? (
                    'الزاوية الحادة للمعين L1 تتقاطع مع كنتور الخطأ تماماً عند المحور، مما يؤدي إلى تصفير الميزة w₂ بالكامل واختيار الميزة w₁ فقط.'
                  ) : (
                    'The acute corner of the L1 diamond touches the error contour directly on the axis, setting w₂ exactly to 0.0 (automatic feature selection).'
                  )
                ) : (
                  language === 'ar' ? (
                    'مع زيادة λ، سينكمش المعين حتى تصطدم زاوية المعين بكنتور الخطأ على المحور.'
                  ) : (
                    'Increasing λ contracts the diamond until a sharp corner touches the contour on the coordinate axis.'
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

          {/* Mathematical Form */}
          <div dir="ltr" className="p-3 rounded-lg bg-[var(--bg-app)] border border-[var(--border-subtle)] text-center text-xs font-mono">
            {mode === 'lasso' ? (
              <KaTeXMath math="\min_w \mathcal{L}(w) + \lambda \|w\|_1 \quad (\|w\|_1 = |w_1| + |w_2|)" block={false} />
            ) : (
              <KaTeXMath math="\min_w \mathcal{L}(w) + \lambda \|w\|_2^2 \quad (\|w\|_2^2 = w_1^2 + w_2^2)" block={false} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

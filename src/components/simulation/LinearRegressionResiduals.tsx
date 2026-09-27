import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useOkvirStore } from '@/lib/store';
import { tr } from '@/lib/i18n';
import {
  CanvasCoordinateTransformer,
  computeFullOLS,
  computeLeaveOneOutOLS,
  OLS_PRESETS,
  type DataPoint,
  type OLSSummary,
} from '@/lib/canvas/CanvasMath';
import { MultiTierDisclosure, type TierContent } from '@/components/pedagogy/MultiTierDisclosure';
import { KaTeXMath } from '@/components/common/KaTeXMath';
import { audio } from '@/lib/audio';
import { Sparkles, Trash2, RotateCcw } from 'lucide-react';

const OLS_TIER_CONTENT: TierContent = {
  intuition: {
    analogy: {
      en: 'Imagine every data point attached to a stiff metal rod with rubber bands. The rod tilts and shifts until the tension forces from all rubber bands cancel out completely.',
      ar: 'تخيّل أن كل نقطة بيانات متصلة بقضيب معدني صلب عبر أربطة مطاطية مشدودة. يميل القضيب ويتحرك حتى تتوازن قوى الشد الناتجة عن جميع الأربطة تماماً.',
    },
    keyTakeaway: {
      en: 'Ordinary Least Squares minimizes the total area of all residual squares, balancing positive and negative errors.',
      ar: 'طريقة المربعات الصغرى تقلل المساحة الإجمالية لمربعات البواقي، مما يوازن الأخطاء الموجبة والسالبة بدقة.',
    },
  },
  geometry: {
    visualDescription: {
      en: 'The target vector y is orthogonally projected onto the column space Col(X). The residual vector e is perpendicular to the hyperplane spanned by the predictors: X^T (y - Xβ) = 0.',
      ar: 'يتم إسقاط متجه الهدف y إسقاطاً عمودياً على فضاء الأعمدة Col(X). يكون متجه البواقي e عمودياً تماماً على المستوى الفائق: X^T (y - Xβ) = 0.',
    },
    conservedQuantity: {
      en: 'Total Sum of Squares (TSS) = Explained Sum of Squares (ESS) + Residual Sum of Squares (RSS)',
      ar: 'المجموع الكلي للمربعات (TSS) = المجموع المفسر (ESS) + مجموع البواقي (RSS)',
    },
  },
  formal: {
    equation: '\\hat{\\beta} = (X^T X)^{-1} X^T y',
    derivationSteps: [
      {
        step: 'S(\\beta) = (y - X\\beta)^T (y - X\\beta)',
        note: { en: 'Objective: Sum of squared residuals', ar: 'دالة الهدف: مجموع مربعات البواقي' },
      },
      {
        step: '\\frac{\\partial S}{\\partial \\beta} = -2X^T (y - X\\beta) = 0',
        note: { en: 'First-order condition for minimum', ar: 'شرط الرتبة الأولى للوصول إلى أدنى خطأ' },
      },
      {
        step: 'X^T X \\hat{\\beta} = X^T y \\implies \\hat{\\beta} = (X^T X)^{-1} X^T y',
        note: { en: 'Normal equations solved analytically', ar: 'المعادلات الطبيعية محلولة بشكل تحليلي' },
      },
    ],
  },
  code: {
    snippet: `import numpy as np

# X: (N, 2) with bias column of ones; y: (N, 1)
def analytical_ols(X: np.ndarray, y: np.ndarray) -> np.ndarray:
    # Closed-form OLS via pseudo-inverse: beta = (X^T @ X)^(-1) @ X^T @ y
    beta = np.linalg.pinv(X.T @ X) @ X.T @ y
    return beta`,
    explanation: {
      en: 'Using Moore-Penrose pseudo-inverse (np.linalg.pinv) avoids numerical instability from singular matrices.',
      ar: 'استخدام شبه المعكوس لمور-بنروز يتجنب المشاكل العددية في حال كانت المصفوفة غير قابلة للعكس.',
    },
  },
};

export const LinearRegressionResiduals: React.FC<{
  compact?: boolean;
  highlightedElement?: 'slope' | 'intercept' | 'residuals' | null;
}> = ({ compact = false, highlightedElement = null }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { slope, intercept, setSlope, setIntercept, theme, language, config } = useOkvirStore();

  const [points, setPoints] = useState<DataPoint[]>(OLS_PRESETS.standard);
  const [selectedPreset, setSelectedPreset] = useState<keyof typeof OLS_PRESETS>('standard');
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [showGhostLine, setShowGhostLine] = useState(true);
  const [showPedagogy, setShowPedagogy] = useState(false);
  const [activeMathToken, setActiveMathToken] = useState<'slope' | 'intercept' | 'residual' | null>(null);

  const transformerRef = useRef(
    new CanvasCoordinateTransformer(
      { xMin: 0, xMax: 20, yMin: 0, yMax: 16 },
      { top: 24, right: 24, bottom: 24, left: 24 }
    )
  );

  // Compute full analytical OLS for current dataset
  const olsSummary: OLSSummary | null = computeFullOLS(points);

  // Counterfactual Leave-One-Out ghost line parameters
  const ghostOLS =
    draggedIdx !== null && showGhostLine
      ? computeLeaveOneOutOLS(points, draggedIdx)
      : null;

  // Sync analytical optimal values to store if user chooses
  const handleSnapToOptimal = () => {
    if (olsSummary) {
      setSlope(Number(olsSummary.slope.toFixed(3)));
      setIntercept(Number(olsSummary.intercept.toFixed(3)));
      if (config.soundEnabled) audio.playSuccessChime();
    }
  };

  const handleSelectPreset = (key: keyof typeof OLS_PRESETS) => {
    setSelectedPreset(key);
    setPoints(OLS_PRESETS[key]);
    const computed = computeFullOLS(OLS_PRESETS[key]);
    if (computed) {
      setSlope(Number(computed.slope.toFixed(3)));
      setIntercept(Number(computed.intercept.toFixed(3)));
    }
    if (config.soundEnabled) audio.playClick();
  };

  const handleClearPoints = () => {
    setPoints([
      { x: 3, y: 4 },
      { x: 10, y: 8 },
      { x: 16, y: 12 },
    ]);
    if (config.soundEnabled) audio.playClick();
  };

  // Render Canvas Loop
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

    // 1. Grid Lines
    ctx.strokeStyle = theme === 'dark' ? '#27272a' : '#e4e4e7';
    ctx.lineWidth = 0.5;
    for (let x = 0; x <= 20; x += 2) {
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

    // 2. Residual Squares (Minimization objective)
    ctx.beginPath();
    points.forEach((p) => {
      const yHat = slope * p.x + intercept;
      const { px, py } = transformer.dataToScreen(p.x, p.y, width, height);
      const { py: pyHat } = transformer.dataToScreen(p.x, yHat, width, height);
      const sidePx = Math.abs(pyHat - py);
      const sqY = Math.min(py, pyHat);
      ctx.rect(px - sidePx / 2, sqY, sidePx, sidePx);
    });

    const isResActive = highlightedElement === 'residuals' || activeMathToken === 'residual';
    ctx.fillStyle =
      theme === 'dark'
        ? isResActive
          ? 'rgba(244, 63, 94, 0.35)'
          : 'rgba(244, 63, 94, 0.16)'
        : isResActive
        ? 'rgba(225, 29, 72, 0.28)'
        : 'rgba(225, 29, 72, 0.12)';
    ctx.fill();

    ctx.strokeStyle =
      theme === 'dark'
        ? isResActive
          ? 'rgba(244, 63, 94, 0.9)'
          : 'rgba(244, 63, 94, 0.45)'
        : isResActive
        ? 'rgba(225, 29, 72, 0.85)'
        : 'rgba(225, 29, 72, 0.38)';
    ctx.lineWidth = isResActive ? 1.5 : 1;
    ctx.stroke();

    // 3. Vertical Residual Lines (e_i = y_i - yHat_i)
    ctx.beginPath();
    ctx.setLineDash([3, 3]);
    points.forEach((p) => {
      const yHat = slope * p.x + intercept;
      const { px, py } = transformer.dataToScreen(p.x, p.y, width, height);
      const { py: pyHat } = transformer.dataToScreen(p.x, yHat, width, height);
      ctx.moveTo(px, py);
      ctx.lineTo(px, pyHat);
    });
    ctx.strokeStyle = theme === 'dark' ? '#f43f5e' : '#e11d48';
    ctx.lineWidth = 1.2;
    ctx.stroke();
    ctx.setLineDash([]);

    // 4. Counterfactual Leave-One-Out Ghost Line (When Dragging)
    if (ghostOLS) {
      const p1 = transformer.dataToScreen(0, ghostOLS.intercept, width, height);
      const p2 = transformer.dataToScreen(20, ghostOLS.slope * 20 + ghostOLS.intercept, width, height);

      ctx.beginPath();
      ctx.setLineDash([6, 4]);
      ctx.moveTo(p1.px, p1.py);
      ctx.lineTo(p2.px, p2.py);
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.75)';
      ctx.lineWidth = 1.8;
      ctx.stroke();
      ctx.setLineDash([]);

      // Ghost label
      ctx.fillStyle = '#f59e0b';
      ctx.font = '10px monospace';
      ctx.fillText('Without Point: LOO Ghost Line', p2.px - 160, p2.py - 8);
    }

    // 5. Active User Regression Line: y_hat = mx + b
    const isSlopeActive = highlightedElement === 'slope' || activeMathToken === 'slope';
    const isIntActive = highlightedElement === 'intercept' || activeMathToken === 'intercept';

    const lineP1 = transformer.dataToScreen(0, intercept, width, height);
    const lineP2 = transformer.dataToScreen(20, slope * 20 + intercept, width, height);

    ctx.beginPath();
    ctx.moveTo(lineP1.px, lineP1.py);
    ctx.lineTo(lineP2.px, lineP2.py);
    ctx.strokeStyle = isSlopeActive || isIntActive
      ? '#38bdf8'
      : theme === 'dark'
      ? '#38bdf8'
      : '#0284c7';
    ctx.lineWidth = isSlopeActive ? 3.5 : 2.5;
    ctx.stroke();

    // 6. Intercept Marker
    ctx.beginPath();
    ctx.arc(lineP1.px, lineP1.py, isIntActive ? 6 : 4, 0, Math.PI * 2);
    ctx.fillStyle = '#38bdf8';
    ctx.fill();

    // 7. Scatter Observation Points with Leverage & Cook's Distance Halos
    points.forEach((p, idx) => {
      const { px, py } = transformer.dataToScreen(p.x, p.y, width, height);
      const diag = olsSummary?.diagnostics[idx];
      const isDragged = idx === draggedIdx;
      const isHovered = idx === hoveredIdx;

      // Influential outlier warning halo
      if (diag?.isInfluential || diag?.isHighLeverage) {
        ctx.beginPath();
        const haloRadius = 7 + Math.min(12, (diag.cooksDistance || 0) * 10);
        ctx.arc(px, py, haloRadius, 0, Math.PI * 2);
        ctx.fillStyle = diag.isInfluential ? 'rgba(239, 68, 68, 0.22)' : 'rgba(245, 158, 11, 0.22)';
        ctx.fill();
        ctx.strokeStyle = diag.isInfluential ? 'rgba(239, 68, 68, 0.7)' : 'rgba(245, 158, 11, 0.7)';
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      // Point core
      ctx.beginPath();
      ctx.arc(px, py, isDragged ? 6.5 : isHovered ? 5.5 : 4.5, 0, Math.PI * 2);
      ctx.fillStyle = isDragged
        ? '#f59e0b'
        : p.cluster !== undefined
        ? ['#38bdf8', '#10b981', '#f59e0b'][p.cluster % 3]
        : theme === 'dark'
        ? '#fafafa'
        : '#09090b';
      ctx.fill();

      ctx.strokeStyle = isDragged
        ? '#ffffff'
        : theme === 'dark'
        ? '#38bdf8'
        : '#0284c7';
      ctx.lineWidth = isDragged ? 2.5 : 1.8;
      ctx.stroke();
    });
  }, [
    slope,
    intercept,
    points,
    draggedIdx,
    hoveredIdx,
    ghostOLS,
    olsSummary,
    theme,
    highlightedElement,
    activeMathToken,
  ]);

  useEffect(() => {
    renderFrame();
  }, [renderFrame]);

  // Pointer Interaction Handlers (Screen-space hit testing + Pointer capture)
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    const width = rect.width;
    const height = rect.height;

    const transformer = transformerRef.current;

    // Hit-testing in CSS screen pixels (radius <= 14px)
    let hitIdx: number | null = null;
    for (let i = 0; i < points.length; i++) {
      const s = transformer.dataToScreen(points[i].x, points[i].y, width, height);
      const dist = Math.hypot(px - s.px, py - s.py);
      if (dist <= 14) {
        hitIdx = i;
        break;
      }
    }

    // Alt + Click to delete point
    if (e.altKey && hitIdx !== null && points.length > 3) {
      setPoints((prev) => prev.filter((_, idx) => idx !== hitIdx));
      if (config.soundEnabled) audio.playClick();
      return;
    }

    if (hitIdx !== null) {
      canvas.setPointerCapture(e.pointerId);
      setDraggedIdx(hitIdx);
      if (config.soundEnabled) audio.playClick();
    } else {
      // Click in empty space: Add new point
      const dataPos = transformer.screenToData(px, py, width, height);
      setPoints((prev) => [...prev, dataPos]);
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
    const transformer = transformerRef.current;

    if (draggedIdx !== null) {
      const dataPos = transformer.screenToData(px, py, width, height);
      setPoints((prev) => {
        const next = [...prev];
        next[draggedIdx] = { ...next[draggedIdx], x: dataPos.x, y: dataPos.y };
        return next;
      });
    } else {
      // Hover detection
      let hit: number | null = null;
      for (let i = 0; i < points.length; i++) {
        const s = transformer.dataToScreen(points[i].x, points[i].y, width, height);
        if (Math.hypot(px - s.px, py - s.py) <= 14) {
          hit = i;
          break;
        }
      }
      setHoveredIdx(hit);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (canvas && draggedIdx !== null) {
      try {
        canvas.releasePointerCapture(e.pointerId);
      } catch {}
      setDraggedIdx(null);
    }
  };

  return (
    <div className="flex flex-col gap-3 p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] specular">
      {/* 1. HUD Header */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider text-[var(--text-secondary)] font-mono">
              {tr('lossHud', language)}:
            </span>
            <span
              className="font-mono text-sm font-semibold tabular-nums cursor-pointer"
              style={{ color: 'var(--math-loss)' }}
              onMouseEnter={() => setActiveMathToken('residual')}
              onMouseLeave={() => setActiveMathToken(null)}
              title="Sum of Squared Errors"
            >
              RSS = {(olsSummary?.rss || 0).toFixed(2)}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-[var(--text-secondary)]">
            <span>R²:</span>
            <span className="font-semibold text-emerald-400 tabular-nums">
              {(olsSummary?.r2 || 0).toFixed(3)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!compact && olsSummary && (
            <button
              onClick={handleSnapToOptimal}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[var(--math-gradient)] text-black font-mono transition-transform active:scale-95 hover:brightness-110 shadow-sm"
              title="Snap parameters to exact OLS solution"
            >
              <Sparkles size={13} />
              <span>{tr('autoOptimize', language)}</span>
            </button>
          )}

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
      </div>

      {/* 2. Interactive Preset Scenarios Bar */}
      {!compact && (
        <div className="flex flex-wrap items-center justify-between gap-2 p-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-app)]">
          <div className="flex items-center gap-1 text-[11px] font-mono text-[var(--text-tertiary)]">
            <span className="px-1">{language === 'ar' ? 'السيناريوهات:' : 'Scenarios:'}</span>
            {(['standard', 'highLeverage', 'simpsonsParadox', 'heteroscedastic'] as const).map((key) => (
              <button
                key={key}
                onClick={() => handleSelectPreset(key)}
                className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${
                  selectedPreset === key
                    ? 'bg-[var(--bg-surface)] text-[var(--text-primary)] font-semibold border border-[var(--border-subtle)] shadow-xs'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {key === 'standard' && (language === 'ar' ? 'قياسي' : 'Standard')}
                {key === 'highLeverage' && (language === 'ar' ? 'نقطة تأثير حاد' : 'High Leverage')}
                {key === 'simpsonsParadox' && (language === 'ar' ? 'مفارقة سيمبسون' : "Simpson's Paradox")}
                {key === 'heteroscedastic' && (language === 'ar' ? 'تشتت متباين' : 'Heteroscedastic')}
              </button>
            ))}
          </div>

          <button
            onClick={handleClearPoints}
            className="flex items-center gap-1 text-[10px] font-mono text-[var(--text-tertiary)] hover:text-rose-400 px-2 py-0.5 rounded transition-colors"
            title="Reset to 3 points"
          >
            <RotateCcw size={11} />
            <span>{language === 'ar' ? 'إعادة تعيين' : 'Clear Points'}</span>
          </button>
        </div>
      )}

      {/* 3. Direct Manipulation HTML5 Canvas */}
      <div className="relative w-full h-80 rounded-lg overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-app)]">
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          className={`w-full h-full block ${
            hoveredIdx !== null ? 'cursor-grab' : draggedIdx !== null ? 'cursor-grabbing' : 'cursor-crosshair'
          }`}
        />

        {/* Live Canvas Badges */}
        <div className="absolute top-2.5 start-2.5 flex items-center gap-2 pointer-events-none">
          <span className="text-[10px] font-mono text-[var(--text-secondary)] bg-[var(--bg-surface)]/90 backdrop-blur-md px-2 py-0.5 rounded border border-[var(--border-subtle)]">
            Click to add • Drag point to pivot line • Alt+Click to delete
          </span>
        </div>

        <div className="absolute top-2.5 end-2.5 flex items-center gap-2 pointer-events-none">
          <span className="text-[10px] font-mono text-[var(--text-tertiary)] bg-[var(--bg-surface)]/90 backdrop-blur-md px-2 py-0.5 rounded border border-[var(--border-subtle)]">
            {points.length} points
          </span>
        </div>
      </div>

      {/* 4. Live Reactive Formula Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-app)]">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-[var(--text-tertiary)]">
            {language === 'ar' ? 'معادلة الانحدار:' : 'Model Equation:'}
          </span>
          <div dir="ltr" className="text-xs font-mono font-bold text-[var(--text-primary)]">
            <KaTeXMath math={`\\hat{y} = ${slope.toFixed(2)}x + ${intercept.toFixed(2)}`} />
          </div>
        </div>

        {olsSummary && (
          <div className="flex items-center gap-4 text-xs font-mono text-[var(--text-secondary)]">
            <span
              onMouseEnter={() => setActiveMathToken('slope')}
              onMouseLeave={() => setActiveMathToken(null)}
              className="cursor-pointer hover:text-sky-400"
            >
              m = {olsSummary.slope.toFixed(2)}
            </span>
            <span
              onMouseEnter={() => setActiveMathToken('intercept')}
              onMouseLeave={() => setActiveMathToken(null)}
              className="cursor-pointer hover:text-sky-400"
            >
              b = {olsSummary.intercept.toFixed(2)}
            </span>
            <span>MSE = {olsSummary.mse.toFixed(2)}</span>
          </div>
        )}
      </div>

      {/* 5. Precision Hardware Sliders */}
      {!compact && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between text-xs font-mono text-[var(--text-secondary)]">
              <span className={activeMathToken === 'slope' ? 'text-[var(--math-gradient)] font-bold' : ''}>
                {tr('slope', language)} (m):
              </span>
              <span className="tabular-nums font-semibold text-[var(--math-gradient)]">
                {slope.toFixed(2)}
              </span>
            </div>
            <input
              type="range"
              min="-1.5"
              max="2.5"
              step="0.01"
              value={slope}
              onChange={(e) => setSlope(parseFloat(e.target.value))}
              className="w-full accent-[var(--math-gradient)] cursor-pointer"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between text-xs font-mono text-[var(--text-secondary)]">
              <span className={activeMathToken === 'intercept' ? 'text-[var(--math-gradient)] font-bold' : ''}>
                {tr('intercept', language)} (b):
              </span>
              <span className="tabular-nums font-semibold text-[var(--math-gradient)]">
                {intercept.toFixed(2)}
              </span>
            </div>
            <input
              type="range"
              min="-2.0"
              max="12.0"
              step="0.1"
              value={intercept}
              onChange={(e) => setIntercept(parseFloat(e.target.value))}
              className="w-full accent-[var(--math-gradient)] cursor-pointer"
            />
          </div>
        </div>
      )}

      {/* 6. Multi-Tier Pedagogical Deep Dive Drawer */}
      {showPedagogy && !compact && (
        <div className="pt-2">
          <MultiTierDisclosure content={OLS_TIER_CONTENT} />
        </div>
      )}
    </div>
  );
};

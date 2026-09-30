import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { useOkvirStore } from '@/lib/store';
import {
  CanvasCoordinateTransformer,
  computeFullOLS,
  computeLeaveOneOutOLS,
  OLS_PRESETS,
  type DataPoint,
  type OLSSummary,
} from '@/lib/canvas/CanvasMath';
import { PreCanvasBriefing, PostCanvasConsolidation, type TierContent } from '@/components/pedagogy/MultiTierDisclosure';
import { audio } from '@/lib/audio';
import { Sparkles, RotateCcw, Plus, Square, Shield } from 'lucide-react';

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
      en: 'Centroid invariant: the OLS regression line always passes through (x̄, ȳ) because the residuals sum strictly to zero: ∑ e_i = 0.',
      ar: 'ثابت مركز الثقل: يمر خط انحدار OLS حتماً بالنقطة المتوسطة (x̄, ȳ) لأن مجموع البواقي يساوي صفراً تماماً: ∑ e_i = 0.',
    },
  },
  formal: {
    equation: '\\hat{\\beta} = (X^T X)^{-1} X^T y, \\quad \\sum_{i=1}^n e_i = 0',
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
        step: '\\text{Var}(\\hat{y}(x)) = s^2 \\left(\\frac{1}{n} + \\frac{(x - \\bar{x})^2}{\\sum (x_i - \\bar{x})^2}\\right)',
        note: { en: 'Hyperbolic variance of predictions flaring outward at high leverage', ar: 'التباين الزائدي للتنبؤات الذي يتسع عند الأطراف ذات التأثير العالي' },
      },
    ],
  },
  code: {
    snippet: `import numpy as np

def analytical_ols_with_bands(X: np.ndarray, y: np.ndarray):
    """
    Computes beta, residuals, leverage, and 95% confidence bands.
    """
    n, p = X.shape
    beta = np.linalg.pinv(X.T @ X) @ X.T @ y
    y_hat = X @ beta
    residuals = y - y_hat
    
    # Degrees of freedom and residual variance
    dof = n - p
    s2 = np.sum(residuals ** 2) / dof
    
    # Hat matrix diagonal (Leverage h_ii)
    H = X @ np.linalg.pinv(X.T @ X) @ X.T
    leverage = np.diag(H)
    
    # Standard error of predictions
    se_pred = np.sqrt(s2 * leverage)
    return beta, y_hat, leverage, se_pred`,
    explanation: {
      en: 'Using Moore-Penrose pseudo-inverse (np.linalg.pinv) avoids numerical instability from singular matrices.',
      ar: 'استخدام شبه المعكوس لمور-بنروز يتجنب المشاكل العددية في حال كانت المصفوفة غير قابلة للعكس.',
    },
  },
};

const CANONICAL_OUTLIERS: DataPoint[] = [
  { x: 18.5, y: 1.8, id: 'outlier-high-leverage' }, // Severe negative leverage (far right, bottom)
  { x: 9.5, y: 15.2, id: 'outlier-vertical-residual' }, // Extreme vertical residual error (center, top)
  { x: 1.8, y: 14.5, id: 'outlier-steep-slope' }, // Severe positive leverage (far left, top)
];

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
  const [showGhostLine] = useState(true);
  const [showResidualSquares, setShowResidualSquares] = useState(true);
  const [showConfidenceBands, setShowConfidenceBands] = useState(true);
  const [activeMathToken, setActiveMathToken] = useState<'slope' | 'intercept' | 'residual' | null>(null);

  const transformerRef = useRef(
    new CanvasCoordinateTransformer(
      { xMin: 0, xMax: 20, yMin: 0, yMax: 16 },
      { top: 24, right: 24, bottom: 24, left: 24 }
    )
  );

  const [isOptimizing, setIsOptimizing] = useState(false);

  // Compute full analytical OLS for current dataset
  const olsSummary: OLSSummary | null = computeFullOLS(points);

  // Dynamic Live Loss (SSR) for the user's current line
  const currentLoss = points.reduce((acc, p) => {
    const yHat = slope * p.x + intercept;
    const res = p.y - yHat;
    return acc + res * res;
  }, 0);

  // Dynamic Live R²: 1 - (SS_res / SS_tot)
  const yMean = points.length > 0 ? points.reduce((acc, p) => acc + p.y, 0) / points.length : 0;
  const tss = points.reduce((acc, p) => acc + Math.pow(p.y - yMean, 2), 0);
  const currentR2 = tss > 1e-9 ? Math.max(-9.99, 1 - currentLoss / tss) : 0;

  // Active injected outliers count
  const activeOutlierCount = points.filter((p) => p.id?.startsWith('outlier')).length;

  // Baseline clean OLS (calculated on points without any injected outliers)
  const cleanPoints = points.filter((p) => !p.id?.startsWith('outlier'));
  const baselineOLS =
    activeOutlierCount > 0 && cleanPoints.length >= 3
      ? computeFullOLS(cleanPoints)
      : null;

  // Counterfactual Leave-One-Out or Baseline Ghost Line
  const ghostOLS = useMemo(() => {
    return draggedIdx !== null && showGhostLine
      ? computeLeaveOneOutOLS(points, draggedIdx)
      : baselineOLS && showGhostLine
      ? { slope: baselineOLS.slope, intercept: baselineOLS.intercept }
      : null;
  }, [draggedIdx, showGhostLine, points, baselineOLS]);

  const animFrameIdRef = useRef<number | null>(null);

  // Clean up animation on unmount
  useEffect(() => {
    return () => {
      if (animFrameIdRef.current !== null) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, []);

  // Spring animation helper
  const animateTo = useCallback((targetSlope: number, targetIntercept: number) => {
    if (animFrameIdRef.current !== null) {
      cancelAnimationFrame(animFrameIdRef.current);
    }

    let step = 0;
    const totalSteps = 35;
    const startSlope = slope;
    const startIntercept = intercept;

    const animate = () => {
      step++;
      const progress = step / totalSteps;
      const ease = 1 - Math.pow(1 - progress, 3); // Cubic ease out
      setSlope(Number((startSlope + (targetSlope - startSlope) * ease).toFixed(3)));
      setIntercept(Number((startIntercept + (targetIntercept - startIntercept) * ease).toFixed(3)));

      if (step < totalSteps) {
        animFrameIdRef.current = requestAnimationFrame(animate);
      } else {
        animFrameIdRef.current = null;
      }
    };
    animFrameIdRef.current = requestAnimationFrame(animate);
  }, [slope, intercept, setSlope, setIntercept]);

  // Spring optimization snap animation at 60 FPS
  const handleSnapToOptimal = () => {
    if (!olsSummary || isOptimizing) return;
    setIsOptimizing(true);
    if (config.soundEnabled) audio.playSuccess();
    animateTo(Number(olsSummary.slope.toFixed(3)), Number(olsSummary.intercept.toFixed(3)));
    setTimeout(() => setIsOptimizing(false), 600);
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

  const handleToggleOutlier = () => {
    if (activeOutlierCount >= 3) {
      // If 3 outliers already injected, reset all injected outliers
      const nextPoints = points.filter((p) => !p.id?.startsWith('outlier'));
      setPoints(nextPoints);
      const cleanOLS = computeFullOLS(nextPoints);
      if (cleanOLS) {
        animateTo(Number(cleanOLS.slope.toFixed(3)), Number(cleanOLS.intercept.toFixed(3)));
      }
      if (config.soundEnabled) audio.playSuccess();
      return;
    }

    // Add next canonical outlier
    const nextOutlier = CANONICAL_OUTLIERS[activeOutlierCount];
    const nextPoints = [...points, nextOutlier];
    setPoints(nextPoints);

    // Smoothly animate the regression line to demonstrate the pull of the outlier!
    const updatedOLS = computeFullOLS(nextPoints);
    if (updatedOLS) {
      animateTo(Number(updatedOLS.slope.toFixed(3)), Number(updatedOLS.intercept.toFixed(3)));
    }
    if (config.soundEnabled) audio.playWarning();
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

    // 2. 95% Confidence Band (Hyperbolic Envelope)
    if (showConfidenceBands && olsSummary && points.length >= 4) {
      const n = points.length;
      const xMean = olsSummary.xMean;
      let sxx = 0;
      points.forEach((p) => {
        sxx += Math.pow(p.x - xMean, 2);
      });
      sxx = Math.max(0.1, sxx);

      const s2 = olsSummary.rss / Math.max(1, n - 2);
      const s = Math.sqrt(s2);

      // Upper and lower boundary points
      const upperPts: { px: number; py: number }[] = [];
      const lowerPts: { px: number; py: number }[] = [];

      for (let x = 0; x <= 20; x += 0.5) {
        const yHat = slope * x + intercept;
        const se = s * Math.sqrt(1 / n + Math.pow(x - xMean, 2) / sxx);
        const margin = 2.0 * se; // ~95% t-bound
        const uPt = transformer.dataToScreen(x, yHat + margin, width, height);
        const lPt = transformer.dataToScreen(x, yHat - margin, width, height);
        upperPts.push(uPt);
        lowerPts.push(lPt);
      }

      ctx.beginPath();
      ctx.moveTo(upperPts[0].px, upperPts[0].py);
      upperPts.forEach((pt) => ctx.lineTo(pt.px, pt.py));
      for (let i = lowerPts.length - 1; i >= 0; i--) {
        ctx.lineTo(lowerPts[i].px, lowerPts[i].py);
      }
      ctx.closePath();
      ctx.fillStyle = theme === 'dark' ? 'rgba(56, 189, 248, 0.08)' : 'rgba(2, 132, 199, 0.06)';
      ctx.fill();

      // Border lines
      ctx.strokeStyle = theme === 'dark' ? 'rgba(56, 189, 248, 0.25)' : 'rgba(2, 132, 199, 0.2)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // 3. Residual Squares (Minimization objective)
    if (showResidualSquares) {
      ctx.beginPath();
      points.forEach((p) => {
        const yHat = slope * p.x + intercept;
        const { px, py } = transformer.dataToScreen(p.x, p.y, width, height);
        const { py: pyHat } = transformer.dataToScreen(p.x, yHat, width, height);
        const sidePx = Math.abs(pyHat - py);
        const sqY = Math.min(py, pyHat);
        ctx.rect(px, sqY, sidePx, sidePx);
      });

      const isResActive = highlightedElement === 'residuals' || activeMathToken === 'residual';
      ctx.fillStyle =
        theme === 'dark'
          ? isResActive
            ? 'rgba(244, 63, 94, 0.35)'
            : 'rgba(244, 63, 94, 0.18)'
          : isResActive
          ? 'rgba(225, 29, 72, 0.28)'
          : 'rgba(225, 29, 72, 0.14)';
      ctx.fill();

      ctx.strokeStyle =
        theme === 'dark'
          ? isResActive
            ? 'rgba(244, 63, 94, 0.9)'
            : 'rgba(244, 63, 94, 0.6)'
          : isResActive
          ? 'rgba(225, 29, 72, 0.85)'
          : 'rgba(225, 29, 72, 0.5)';
      ctx.lineWidth = isResActive ? 1.5 : 1;
      ctx.stroke();
    }

    // 4. Vertical Residual Lines (e_i = y_i - yHat_i)
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

    // 5. Counterfactual Ghost Line (When Dragging OR when Outliers are Injected)
    if (ghostOLS) {
      const p1 = transformer.dataToScreen(0, ghostOLS.intercept, width, height);
      const p2 = transformer.dataToScreen(20, ghostOLS.slope * 20 + ghostOLS.intercept, width, height);

      ctx.beginPath();
      ctx.setLineDash([6, 4]);
      ctx.moveTo(p1.px, p1.py);
      ctx.lineTo(p2.px, p2.py);
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.85)';
      ctx.lineWidth = 2.0;
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = '#f59e0b';
      ctx.font = 'bold 10px monospace';
      const ghostLabel = draggedIdx !== null
        ? 'Without Point: LOO Ghost Line'
        : 'Baseline OLS (without outlier)';
      ctx.fillText(ghostLabel, Math.max(10, p2.px - 180), Math.max(20, p2.py - 8));
    }

    // 6. Active Regression Line: y_hat = mx + b
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

    // 7. Intercept Marker
    ctx.beginPath();
    ctx.arc(lineP1.px, lineP1.py, isIntActive ? 6 : 4, 0, Math.PI * 2);
    ctx.fillStyle = '#38bdf8';
    ctx.fill();

    // 8. Centroid Mean Crosshair (x̄, ȳ)
    if (olsSummary) {
      const cPt = transformer.dataToScreen(olsSummary.xMean, olsSummary.yMean, width, height);
      // Gold Diamond Marker
      ctx.beginPath();
      const r = 5.5;
      ctx.moveTo(cPt.px, cPt.py - r);
      ctx.lineTo(cPt.px + r, cPt.py);
      ctx.lineTo(cPt.px, cPt.py + r);
      ctx.lineTo(cPt.px - r, cPt.py);
      ctx.closePath();
      ctx.fillStyle = '#f59e0b';
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.font = '10px monospace';
      ctx.fillStyle = '#f59e0b';
      ctx.fillText(`(x̄=${olsSummary.xMean.toFixed(1)}, ȳ=${olsSummary.yMean.toFixed(1)})`, cPt.px + 10, cPt.py - 6);
    }

    // 9. Scatter Observation Points with Leverage & Cook's Distance Halos
    points.forEach((p, idx) => {
      const { px, py } = transformer.dataToScreen(p.x, p.y, width, height);
      const diag = olsSummary?.diagnostics[idx];
      const isDragged = idx === draggedIdx;
      const isHovered = idx === hoveredIdx;
      const isExplicitOutlier = Boolean(p.id?.startsWith('outlier') || p.id === 'outlier');

      // Influential outlier warning halo
      if (isExplicitOutlier || diag?.isInfluential || diag?.isHighLeverage) {
        ctx.beginPath();
        const haloRadius = isExplicitOutlier ? 12 : 7 + Math.min(12, (diag?.cooksDistance || 0) * 10);
        ctx.arc(px, py, haloRadius, 0, Math.PI * 2);
        ctx.fillStyle = isExplicitOutlier || diag?.isInfluential ? 'rgba(239, 68, 68, 0.35)' : 'rgba(245, 158, 11, 0.25)';
        ctx.fill();
        ctx.strokeStyle = isExplicitOutlier || diag?.isInfluential ? 'rgba(239, 68, 68, 0.9)' : 'rgba(245, 158, 11, 0.8)';
        ctx.lineWidth = 1.6;
        ctx.stroke();

        // Draw prominent outlier tag on canvas
        if (isExplicitOutlier || (diag && diag.isInfluential)) {
          ctx.font = 'bold 9px monospace';
          const tag = `⚠ Outlier (h=${diag?.leverage.toFixed(2) || '?'}, D=${diag?.cooksDistance.toFixed(2) || '?'})`;
          const tagWidth = ctx.measureText(tag).width;
          const tagX = Math.max(10, Math.min(width - tagWidth - 10, px - tagWidth / 2));
          const tagY = py < 45 ? py + 22 : py - 12;

          ctx.fillStyle = 'rgba(239, 68, 68, 0.9)';
          ctx.fillRect(tagX - 4, tagY - 9, tagWidth + 8, 13);
          ctx.fillStyle = '#ffffff';
          ctx.fillText(tag, tagX, tagY + 1);
        }
      }

      // Point core
      ctx.beginPath();
      ctx.arc(px, py, isExplicitOutlier ? 7 : isDragged ? 6.5 : isHovered ? 5.5 : 4.5, 0, Math.PI * 2);
      ctx.fillStyle = isExplicitOutlier
        ? '#ef4444'
        : isDragged
        ? '#f59e0b'
        : p.cluster !== undefined
        ? ['#38bdf8', '#10b981', '#f59e0b'][p.cluster % 3]
        : theme === 'dark'
        ? '#fafafa'
        : '#09090b';
      ctx.fill();

      ctx.strokeStyle = isExplicitOutlier
        ? '#ffffff'
        : isDragged
        ? '#ffffff'
        : theme === 'dark'
        ? '#38bdf8'
        : '#0284c7';
      ctx.lineWidth = isExplicitOutlier ? 2.5 : isDragged ? 2.5 : 1.8;
      ctx.stroke();
    });
  }, [
    slope,
    intercept,
    points,
    draggedIdx,
    hoveredIdx,
    olsSummary,
    ghostOLS,
    theme,
    highlightedElement,
    activeMathToken,
    showResidualSquares,
    showConfidenceBands,
  ]);

  useEffect(() => {
    renderFrame();
  }, [renderFrame]);

  // Pointer event handlers with pointer capture
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;

    const transformer = transformerRef.current;

    // Hit test existing points
    let foundIdx: number | null = null;
    let minD = 18; // 18px hit radius

    points.forEach((p, idx) => {
      const scr = transformer.dataToScreen(p.x, p.y, rect.width, rect.height);
      const dist = Math.hypot(scr.px - px, scr.py - py);
      if (dist < minD) {
        minD = dist;
        foundIdx = idx;
      }
    });

    if (foundIdx !== null) {
      setDraggedIdx(foundIdx);
      e.currentTarget.setPointerCapture(e.pointerId);
      if (config.soundEnabled) audio.playClick();
    } else {
      // Add point if clicked empty space
      const dataPos = transformer.screenToData(px, py, rect.width, rect.height);
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

    const transformer = transformerRef.current;

    if (draggedIdx !== null) {
      const dataPos = transformer.screenToData(px, py, rect.width, rect.height);
      setPoints((prev) => {
        const next = [...prev];
        next[draggedIdx] = { ...next[draggedIdx], ...dataPos };
        return next;
      });
    } else {
      let found: number | null = null;
      points.forEach((p, idx) => {
        const scr = transformer.dataToScreen(p.x, p.y, rect.width, rect.height);
        if (Math.hypot(scr.px - px, scr.py - py) < 14) {
          found = idx;
        }
      });
      setHoveredIdx(found);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (draggedIdx !== null) {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
      setDraggedIdx(null);
      if (config.soundEnabled) audio.playClick();
    }
  };

  // Right-click or double-click to delete point
  const handleContextMenu = (e: React.MouseEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    const transformer = transformerRef.current;

    let targetIdx: number | null = null;
    points.forEach((p, idx) => {
      const scr = transformer.dataToScreen(p.x, p.y, rect.width, rect.height);
      if (Math.hypot(scr.px - px, scr.py - py) < 16) {
        targetIdx = idx;
      }
    });

    if (targetIdx !== null && points.length > 3) {
      setPoints((prev) => prev.filter((_, idx) => idx !== targetIdx));
      if (config.soundEnabled) audio.playWarning();
    }
  };

  return (
    <div className="flex flex-col gap-4 select-none">
      {/* Pre-Canvas Intuitive Briefing & Mental Model */}
      {!compact && <PreCanvasBriefing content={OLS_TIER_CONTENT} />}

      {/* Scenario Presets & Action Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] specular">
        {/* Presets */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-mono text-[var(--text-tertiary)] uppercase tracking-wider me-1">
            {language === 'ar' ? 'السيناريوهات:' : 'Scenarios:'}
          </span>
          {(Object.keys(OLS_PRESETS) as Array<keyof typeof OLS_PRESETS>).map((key) => (
            <button
              key={key}
              onClick={() => handleSelectPreset(key)}
              className={`px-2.5 py-1 text-xs font-mono rounded-lg border transition-all ${
                selectedPreset === key
                  ? 'border-[var(--math-vector)] bg-[var(--math-vector)]/15 text-[var(--math-vector)] font-semibold shadow-sm'
                  : 'border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]'
              }`}
            >
              {key === 'standard' && (language === 'ar' ? 'قياسي' : 'Standard')}
              {key === 'highLeverage' && (language === 'ar' ? 'تأثير رافعة عالي' : 'High Leverage Outlier')}
              {key === 'simpsonsParadox' && (language === 'ar' ? 'مفارقة سيمبسون' : "Simpson's Paradox")}
              {key === 'heteroscedastic' && (language === 'ar' ? 'تباين غير متجانس' : 'Heteroscedastic Fan')}
            </button>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2">
          {/* Toggle Residual Squares */}
          <button
            onClick={() => setShowResidualSquares(!showResidualSquares)}
            className={`flex items-center gap-1 px-2.5 py-1 text-xs font-mono rounded-lg border transition-all ${
              showResidualSquares
                ? 'border-rose-500 bg-rose-500/15 text-rose-300 font-bold'
                : 'border-[var(--border-subtle)] text-[var(--text-secondary)]'
            }`}
            title="Toggle error squares (SSE area)"
          >
            <Square size={12} />
            <span>{language === 'ar' ? 'مربعات الأخطاء' : 'Error Squares'}</span>
          </button>

          {/* Toggle Confidence Bands */}
          <button
            onClick={() => setShowConfidenceBands(!showConfidenceBands)}
            className={`flex items-center gap-1 px-2.5 py-1 text-xs font-mono rounded-lg border transition-all ${
              showConfidenceBands
                ? 'border-sky-500 bg-sky-500/15 text-sky-300 font-bold'
                : 'border-[var(--border-subtle)] text-[var(--text-secondary)]'
            }`}
            title="Toggle 95% Confidence Band"
          >
            <Shield size={12} />
            <span>95% CI</span>
          </button>

          {/* Add / Cycle Outlier */}
          <button
            onClick={handleToggleOutlier}
            className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono rounded-lg border transition-all ${
              activeOutlierCount > 0
                ? 'border-rose-500 bg-rose-500/15 text-rose-300 font-bold shadow-sm'
                : 'border-[var(--border-subtle)] hover:border-amber-400 text-[var(--text-secondary)]'
            }`}
            title="Inject influential outliers to observe leverage, residuals, and Cook's distance"
          >
            <Plus size={12} className={activeOutlierCount > 0 ? 'text-rose-400' : 'text-amber-400'} />
            <span>
              {language === 'ar'
                ? activeOutlierCount === 0
                  ? '+ نقطة شاذة'
                  : activeOutlierCount < 3
                  ? `شاذة (${activeOutlierCount}/3)`
                  : 'إعادة ضبط الشواذ'
                : activeOutlierCount === 0
                ? '+ Outlier'
                : activeOutlierCount < 3
                ? `Outlier (${activeOutlierCount}/3)`
                : 'Reset Outliers'}
            </span>
          </button>

          {/* Reset */}
          <button
            onClick={handleClearPoints}
            className="p-1.5 rounded-lg border border-[var(--border-subtle)] hover:border-[var(--border-strong)] text-[var(--text-secondary)]"
            title={language === 'ar' ? 'إعادة تعيين النقاط' : 'Reset points'}
          >
            <RotateCcw size={14} />
          </button>

          {/* Auto-Optimize with OLS */}
          <button
            onClick={handleSnapToOptimal}
            disabled={isOptimizing}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg border border-emerald-500/40 bg-emerald-500/10 text-emerald-300 text-xs font-mono font-semibold hover:bg-emerald-500/20 transition-all shadow-sm active:scale-95 disabled:opacity-50"
          >
            <Sparkles size={13} className={isOptimizing ? 'text-emerald-400 animate-spin' : 'text-emerald-400'} />
            <span>{language === 'ar' ? 'تحسين آلي (OLS)' : 'Auto-Optimize (OLS)'}</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Canvas Area */}
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

        {/* Floating Canvas Badges */}
        <div className="absolute top-4 start-4 flex items-center gap-2">
          <div className="px-2.5 py-1 rounded-md bg-[var(--bg-surface)]/80 backdrop-blur-md border border-[var(--border-subtle)] text-[11px] font-mono text-[var(--text-tertiary)]">
            {language === 'ar'
              ? 'انقر لإضافة نقاط • اسحب للتحريك • انقر يمين لحذف نقطة'
              : 'Click to add • Drag to move • Right-click to remove'}
          </div>
        </div>

        {/* Live Diagnostics Telemetry Pill */}
        <div className="absolute top-4 end-4 flex items-center gap-3 px-3 py-1.5 rounded-lg bg-[var(--bg-surface)]/85 backdrop-blur-md border border-[var(--border-subtle)] text-xs font-mono shadow-sm">
          <div>
            <span className="text-[var(--text-tertiary)]">Σ(y - ŷ)² = </span>
            <span className="text-rose-400 font-bold tabular-nums">
              {currentLoss.toFixed(2)}
            </span>
          </div>
          <div className="w-px h-3 bg-[var(--border-subtle)]" />
          <div>
            <span className="text-[var(--text-tertiary)]">R² = </span>
            <span className={`${currentR2 >= 0 ? 'text-emerald-400' : 'text-amber-400'} font-bold tabular-nums`}>
              {currentR2.toFixed(3)}
            </span>
          </div>
          <div className="w-px h-3 bg-[var(--border-subtle)]" />
          <div>
            <span className="text-[var(--text-tertiary)]">MSE = </span>
            <span className="text-[var(--text-primary)] font-bold tabular-nums">
              {(currentLoss / Math.max(1, points.length)).toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Reactive Mathematical Equation Display */}
      <div
        dir="ltr"
        className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-xs font-mono"
      >
        <div className="flex items-center gap-2">
          <span className="text-[var(--text-tertiary)] uppercase tracking-wider text-[10px]">
            Model Equation:
          </span>
          <div className="flex items-center gap-1.5 text-sm">
            <span>ŷ =</span>
            <button
              onMouseEnter={() => setActiveMathToken('slope')}
              onMouseLeave={() => setActiveMathToken(null)}
              className={`px-1.5 py-0.5 rounded transition-all font-bold tabular-nums ${
                activeMathToken === 'slope'
                  ? 'bg-sky-500/20 text-sky-300 ring-1 ring-sky-400'
                  : 'text-sky-400'
              }`}
            >
              {slope.toFixed(2)}x
            </button>
            <span>+</span>
            <button
              onMouseEnter={() => setActiveMathToken('intercept')}
              onMouseLeave={() => setActiveMathToken(null)}
              className={`px-1.5 py-0.5 rounded transition-all font-bold tabular-nums ${
                activeMathToken === 'intercept'
                  ? 'bg-sky-500/20 text-sky-300 ring-1 ring-sky-400'
                  : 'text-sky-400'
              }`}
            >
              {intercept.toFixed(2)}
            </button>
          </div>
        </div>

        {/* Hover Residual Badge */}
        <div className="flex items-center gap-2">
          <button
            onMouseEnter={() => setActiveMathToken('residual')}
            onMouseLeave={() => setActiveMathToken(null)}
            className={`px-2 py-0.5 rounded transition-all text-xs font-mono ${
              activeMathToken === 'residual'
                ? 'bg-rose-500/20 text-rose-300 ring-1 ring-rose-400'
                : 'text-rose-400'
            }`}
          >
            Σ(y - ŷ)² = {currentLoss.toFixed(2)} (R² = {currentR2.toFixed(3)})
          </button>
        </div>
      </div>

      {/* Precision Hardware-Style Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] specular">
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between text-xs font-mono text-[var(--text-secondary)]">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[var(--math-gradient)]" />
              <span>{language === 'ar' ? 'الميل (m):' : 'Slope (m):'}</span>
            </span>
            <span className="tabular-nums text-[var(--math-gradient)] font-semibold font-mono">{slope.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min="-1.0"
            max="1.5"
            step="0.01"
            value={slope}
            onChange={(e) => setSlope(parseFloat(e.target.value))}
            className="w-full accent-[var(--math-gradient)] cursor-pointer"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between text-xs font-mono text-[var(--text-secondary)]">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[var(--math-gradient)]" />
              <span>{language === 'ar' ? 'نقطة التقاطع (b):' : 'Intercept (b):'}</span>
            </span>
            <span className="tabular-nums text-[var(--math-gradient)] font-semibold font-mono">{intercept.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min="0.0"
            max="8.0"
            step="0.1"
            value={intercept}
            onChange={(e) => setIntercept(parseFloat(e.target.value))}
            className="w-full accent-[var(--math-gradient)] cursor-pointer"
          />
        </div>
      </div>

      {/* Post-Canvas Mathematical & Code Consolidation */}
      {!compact && <PostCanvasConsolidation content={OLS_TIER_CONTENT} />}
    </div>
  );
};

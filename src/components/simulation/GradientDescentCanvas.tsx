import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { useOkvirStore } from '@/lib/store';
import { TimelinePlaybackBar } from '@/components/simulation/TimelinePlaybackBar';
import { PreCanvasBriefing, PostCanvasConsolidation, type TierContent } from '@/components/pedagogy/MultiTierDisclosure';
import { audio } from '@/lib/audio';
import { sonifier } from '@/lib/audio/WebAudioSonifier';
import { GitCompare, CheckCircle2, AlertTriangle, Target, Compass, Sparkles } from 'lucide-react';

type OptimizerType = 'sgd' | 'momentum' | 'rmsprop' | 'adam';
type SurfaceType = 'bowl' | 'rosenbrock' | 'saddle';
type StopTolerance = 0.005 | 0.02 | 0.08;

interface LossSurfaceDef {
  name: { en: string; ar: string };
  f: (x: number, y: number) => number;
  grad: (x: number, y: number) => [number, number];
  bounds: { minX: number; maxX: number; minY: number; maxY: number };
  defaultStart: { x: number; y: number };
  optimum: { x: number; y: number };
  zRange: { min: number; max: number };
}

const SURFACES: Record<SurfaceType, LossSurfaceDef> = {
  bowl: {
    name: { en: 'Rippled Quadratic Bowl', ar: 'حوض تربيعي متموج' },
    f: (x, y) => 0.5 * (x * x + y * y) + 0.18 * Math.sin(x * y),
    grad: (x, y) => [
      x + 0.18 * y * Math.cos(x * y),
      y + 0.18 * x * Math.cos(x * y),
    ],
    bounds: { minX: -5, maxX: 5, minY: -5, maxY: 5 },
    defaultStart: { x: 3.5, y: 3.5 },
    optimum: { x: 0, y: 0 },
    zRange: { min: 0, max: 15 },
  },
  rosenbrock: {
    name: { en: 'Rosenbrock Banana Valley', ar: 'وادي روزنبروك المنحني' },
    f: (x, y) => Math.pow(1 - x, 2) + 10 * Math.pow(y - x * x, 2),
    grad: (x, y) => [
      -2 * (1 - x) - 40 * x * (y - x * x),
      20 * (y - x * x),
    ],
    bounds: { minX: -2.5, maxX: 2.5, minY: -1.5, maxY: 3.5 },
    defaultStart: { x: -1.8, y: 2.2 },
    optimum: { x: 1, y: 1 },
    zRange: { min: 0, max: 120 },
  },
  saddle: {
    name: { en: 'Saddle Point (Minimax)', ar: 'نقطة السرج' },
    f: (x, y) => 0.5 * (x * x - y * y),
    grad: (x, y) => [x, -y],
    bounds: { minX: -4, maxX: 4, minY: -4, maxY: 4 },
    defaultStart: { x: 0.1, y: 2.5 },
    optimum: { x: 0, y: 0 },
    zRange: { min: -8, max: 8 },
  },
};

const GD_TIER_CONTENT: TierContent = {
  intuition: {
    analogy: {
      en: 'Imagine rolling a heavy steel marble down a foggy mountain valley. Pure SGD is like a lightweight ping-pong ball that bounces helplessly between valley walls; Momentum is like a heavy cannonball whose inertia carries it straight through narrow ravines.',
      ar: 'تخيّل دحرجة كرة فولاذية ثقيلة أسفل وادٍ جبلي يلفه الضباب. الانحدار البسيط SGD يشبه كرة تنس خفيفة تتخبط عشوائياً بين الجدران، بينما يشبه الزخم كرة مدفع ثقيلة يحملها عزم القصور الذاتي مباشرة نحو المصب.',
    },
    keyTakeaway: {
      en: 'First-order optimization methods navigate parameter space using gradient vectors; momentum and adaptive preconditioners (Adam) accelerate convergence in ill-conditioned ravines.',
      ar: 'طرق التحسين من الدرجة الأولى توجه المعاملات عكس متجه التدرج؛ ويعمل الزخم وتكييف الخطوة (Adam) على تسريع التقارب في المنحدرات غير المتوازنة.',
    },
  },
  geometry: {
    visualDescription: {
      en: 'The gradient vector ∇f(θ) is always strictly perpendicular to the level curves. In narrow ravines with high condition number κ = λ_max / λ_min, SGD oscillates violently perpendicular to the valley instead of progressing along it.',
      ar: 'يكون متجه التدرج ∇f(θ) عمودياً دائماً على خطوط الكنتور. في الأخاديد الضيقة ذات رقم التكيف العالي κ، يتذبذب SGD بعنف عمودياً على الوادي بدلاً من التقدم على طوله.',
    },
    conservedQuantity: {
      en: 'Monotonic Lyapunov function in damped momentum systems: E(t) = f(θ_t) + 0.5 ||v_t||^2 decays monotonically.',
      ar: 'دالة لياكونوف التناقصية في أنظمة الزخم المخمد: تنخفض الطاقة الكلية بشكل رتيب مع الوقت.',
    },
  },
  formal: {
    equation: '\\mathbf{m}_t = \\beta_1 \\mathbf{m}_{t-1} + (1-\\beta_1)\\mathbf{g}_t, \\quad \\mathbf{v}_t = \\beta_2 \\mathbf{v}_{t-1} + (1-\\beta_2)\\mathbf{g}_t^2, \\quad \\theta_{t+1} = \\theta_t - \\frac{\\eta}{\\sqrt{\\hat{\\mathbf{v}}_t} + \\epsilon} \\hat{\\mathbf{m}}_t',
    derivationSteps: [
      {
        step: '\\hat{\\mathbf{m}}_t = \\frac{\\mathbf{m}_t}{1 - \\beta_1^t}, \\quad \\hat{\\mathbf{v}}_t = \\frac{\\mathbf{v}_t}{1 - \\beta_2^t}',
        note: { en: 'Bias correction compensating for zero initialization at early steps', ar: 'تصحيح الانحياز لتعويض التهيئة الصفرية في الخطوات الأولى' },
      },
      {
        step: '\\kappa = \\frac{\\lambda_{\\max}(\\mathbf{H})}{\\lambda_{\\min}(\\mathbf{H})} \\implies \\text{Convergence rate: } \\mathcal{O}\\left(\\frac{\\kappa - 1}{\\kappa + 1}\\right)',
        note: { en: 'Hessian condition number dictates convergence speed of first-order algorithms', ar: 'رقم تكيف مصفوفة هيسيان يحدد سرعة التقارب لخوارزميات التدرج' },
      },
    ],
  },
  code: {
    snippet: `import numpy as np

def adam_optimizer(grad_fn, theta0: np.ndarray, lr=0.05, beta1=0.9, beta2=0.999, eps=1e-8, steps=100):
    theta = theta0.copy()
    m = np.zeros_like(theta)
    v = np.zeros_like(theta)
    trajectory = [theta.copy()]
    
    for t in range(1, steps + 1):
        g = grad_fn(theta[0], theta[1])
        m = beta1 * m + (1.0 - beta1) * g
        v = beta2 * v + (1.0 - beta2) * (g ** 2)
        
        # Bias-corrected moments
        m_hat = m / (1.0 - beta1 ** t)
        v_hat = v / (1.0 - beta2 ** t)
        
        theta -= lr * m_hat / (np.sqrt(v_hat) + eps)
        trajectory.append(theta.copy())
    return np.array(trajectory)`,
    explanation: {
      en: 'Adam combines Polyak momentum with AdaGrad elementwise root-mean-square scaling, automatically tuning step sizes per coordinate.',
      ar: 'تدمج خوارزمية آدم بين الزخم والتحجيم التكيفي لكل إحداثي منفرداً لمقاومة تشتت التدرج.',
    },
  },
};

interface TrajectorySnapshot {
  step: number;
  x: number;
  y: number;
  loss: number;
  gradNorm: number;
  vx?: number;
  vy?: number;
}

export const GradientDescentCanvas: React.FC<{ compact?: boolean }> = ({ compact = true }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { learningRate, momentum, setLearningRate, setMomentum, theme, language, config } = useOkvirStore();

  const [surfaceType, setSurfaceType] = useState<SurfaceType>('bowl');
  const [optimizer, setOptimizer] = useState<OptimizerType>('momentum');
  const [startPos, setStartPos] = useState({ x: 3.5, y: 3.5 });
  const [trajectory, setTrajectory] = useState<TrajectorySnapshot[]>([]);
  const [ghostSgdTrajectory, setGhostSgdTrajectory] = useState<TrajectorySnapshot[]>([]);
  const [showComparison, setShowComparison] = useState<boolean>(true);
  const [showVectorField, setShowVectorField] = useState<boolean>(true);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const dragging = useRef(false);

  // Stopping Criteria States
  const [stopTol, setStopTol] = useState<StopTolerance>(0.02);
  const [maxStepBudget, setMaxStepBudget] = useState<number>(80);
  const [autoStopOnConvergence, setAutoStopOnConvergence] = useState<boolean>(true);
  const [convergenceInfo, setConvergenceInfo] = useState<{
    status: 'converged' | 'diverged' | 'iterating';
    step: number;
    gradNorm: number;
    loss: number;
    reason: string;
  }>({
    status: 'iterating',
    step: 0,
    gradNorm: 0,
    loss: 0,
    reason: '',
  });

  const surface = SURFACES[surfaceType];

  // Compute trajectories with active Stopping Criteria
  const computeTrajectories = useCallback(() => {
    const curSurface = SURFACES[surfaceType];

    const runOpt = (opt: OptimizerType) => {
      const snaps: TrajectorySnapshot[] = [];
      const p = { ...startPos };
      const v = { x: 0, y: 0 };
      const s = { x: 0, y: 0 };
      const eps = 1e-6;

      let status: 'converged' | 'diverged' | 'iterating' = 'iterating';
      let convergedStep = maxStepBudget;
      let reason = '';

      for (let t = 0; t <= maxStepBudget; t++) {
        const loss = curSurface.f(p.x, p.y);
        const [gx, gy] = curSurface.grad(p.x, p.y);
        const gradNorm = Math.hypot(gx, gy);

        snaps.push({ step: t, x: p.x, y: p.y, loss, gradNorm, vx: v.x, vy: v.y });

        // Criteria 1: Check Divergence / Numerical Explosion
        if (isNaN(loss) || !isFinite(loss) || Math.abs(loss) > 1e5 || gradNorm > 1e4) {
          status = 'diverged';
          convergedStep = t;
          reason = language === 'ar' ? 'انفجار رقمي: معدل التعلم مرتفع جداً' : 'Numerical explosion: learning rate too high';
          break;
        }

        // Criteria 2: Check Gradient Convergence Threshold (||∇f|| <= epsilon)
        if (autoStopOnConvergence && t > 0 && gradNorm <= stopTol) {
          status = 'converged';
          convergedStep = t;
          reason = language === 'ar'
            ? `تحقق شرط التوقف: ||∇f|| = ${gradNorm.toFixed(4)} ≤ ${stopTol}`
            : `Convergence threshold met: ||∇f|| = ${gradNorm.toFixed(4)} ≤ ${stopTol}`;
          break;
        }

        // Criteria 3: Parameter Displacement Stagnation (Zero Progress)
        if (autoStopOnConvergence && t > 1) {
          const prev1 = snaps[t - 1];
          const prev2 = snaps[t - 2];
          const disp1 = Math.hypot(p.x - prev1.x, p.y - prev1.y);
          const disp2 = Math.hypot(prev1.x - prev2.x, prev1.y - prev2.y);
          if (disp1 < 1e-5 && disp2 < 1e-5 && gradNorm < 0.1) {
            status = 'converged';
            convergedStep = t;
            reason = language === 'ar' ? 'سكون الإحداثيات: ثبات كامل في المعاملات' : 'Parameter stagnation: zero displacement';
            break;
          }
        }

        if (t === maxStepBudget) {
          status = 'iterating';
          convergedStep = maxStepBudget;
          reason = language === 'ar' ? 'انتهاء ميزانية الخطوات المحددة' : 'Maximum step budget reached';
          break;
        }

        // Advance optimizer state
        if (opt === 'sgd') {
          v.x = -learningRate * gx;
          v.y = -learningRate * gy;
          p.x += v.x;
          p.y += v.y;
        } else if (opt === 'momentum') {
          v.x = momentum * v.x - learningRate * gx;
          v.y = momentum * v.y - learningRate * gy;
          p.x += v.x;
          p.y += v.y;
        } else if (opt === 'rmsprop') {
          s.x = 0.9 * s.x + 0.1 * gx * gx;
          s.y = 0.9 * s.y + 0.1 * gy * gy;
          v.x = -(learningRate / Math.sqrt(s.x + eps)) * gx;
          v.y = -(learningRate / Math.sqrt(s.y + eps)) * gy;
          p.x += v.x;
          p.y += v.y;
        } else if (opt === 'adam') {
          const stepNum = t + 1;
          v.x = 0.9 * v.x + 0.1 * gx;
          v.y = 0.9 * v.y + 0.1 * gy;
          s.x = 0.999 * s.x + 0.001 * gx * gx;
          s.y = 0.999 * s.y + 0.001 * gy * gy;

          const mHatX = v.x / (1 - Math.pow(0.9, stepNum));
          const mHatY = v.y / (1 - Math.pow(0.9, stepNum));
          const sHatX = s.x / (1 - Math.pow(0.999, stepNum));
          const sHatY = s.y / (1 - Math.pow(0.999, stepNum));

          const stepX = -(learningRate / (Math.sqrt(sHatX) + eps)) * mHatX;
          const stepY = -(learningRate / (Math.sqrt(sHatY) + eps)) * mHatY;
          p.x += stepX;
          p.y += stepY;
        }

        // Clamp to bounding box plus small margin to avoid runaway rendering
        p.x = Math.max(curSurface.bounds.minX - 3, Math.min(curSurface.bounds.maxX + 3, p.x));
        p.y = Math.max(curSurface.bounds.minY - 3, Math.min(curSurface.bounds.maxY + 3, p.y));
      }

      return { snaps, status, convergedStep, reason };
    };

    const mainResult = runOpt(optimizer);
    const sgdResult = runOpt('sgd');

    setTrajectory(mainResult.snaps);
    setGhostSgdTrajectory(sgdResult.snaps);

    const lastSnap = mainResult.snaps[mainResult.snaps.length - 1];
    setConvergenceInfo({
      status: mainResult.status,
      step: mainResult.convergedStep,
      gradNorm: lastSnap?.gradNorm || 0,
      loss: lastSnap?.loss || 0,
      reason: mainResult.reason,
    });

    // Clamp currentStepIdx to newly generated trajectory length
    setCurrentStepIdx((prev) => Math.min(prev, Math.max(0, mainResult.snaps.length - 1)));
  }, [surfaceType, optimizer, startPos, learningRate, momentum, stopTol, maxStepBudget, autoStopOnConvergence, language]);

  useEffect(() => {
    computeTrajectories();
  }, [computeTrajectories]);

  // Sonification on step change
  useEffect(() => {
    if (!config.soundEnabled || trajectory.length === 0) return;
    const snap = trajectory[Math.min(currentStepIdx, trajectory.length - 1)];
    if (!snap) return;

    if (currentStepIdx === trajectory.length - 1 && convergenceInfo.status === 'converged') {
      sonifier.playConvergenceChime();
    } else if (convergenceInfo.status === 'diverged') {
      sonifier.playDivergenceAlarm();
    } else {
      sonifier.updateLoss(snap.loss);
    }
  }, [currentStepIdx, trajectory, convergenceInfo.status, config.soundEnabled]);

  // Main Render Loop (Realistic Mathematical Landscape & Contours)
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

    const b = surface.bounds;
    const toPx = (x: number, y: number) => ({
      px: ((x - b.minX) / (b.maxX - b.minX)) * width,
      py: (1 - (y - b.minY) / (b.maxY - b.minY)) * height,
    });

    const isDark = theme === 'dark';

    // ── 1. MATHEMATICAL LOSS SURFACE HEATMAP (DENSE 80x60 GRID) ──
    const gridCols = 80;
    const gridRows = 60;
    const cellW = width / gridCols;
    const cellH = height / gridRows;

    const zMatrix: number[][] = [];
    for (let r = 0; r < gridRows; r++) {
      zMatrix[r] = [];
      const dataY = b.maxY - ((r + 0.5) / gridRows) * (b.maxY - b.minY);
      for (let c = 0; c < gridCols; c++) {
        const dataX = b.minX + ((c + 0.5) / gridCols) * (b.maxX - b.minX);
        const z = surface.f(dataX, dataY);
        zMatrix[r][c] = z;

        // Topographic color normalization
        let norm = 0;
        if (surfaceType === 'rosenbrock') {
          norm = Math.log(1 + Math.max(0, z)) / Math.log(1 + surface.zRange.max);
        } else if (surfaceType === 'bowl') {
          norm = Math.sqrt(Math.max(0, z) / surface.zRange.max);
        } else {
          norm = (z - surface.zRange.min) / (surface.zRange.max - surface.zRange.min);
        }
        norm = Math.max(0, Math.min(1, norm));

        // Scientific terrain palette: Deep Valley (Navy/Cyan) -> Mid Slopes (Emerald/Amber) -> Peak (Rose)
        if (norm < 0.3) {
          const t = norm / 0.3;
          ctx.fillStyle = isDark
            ? `rgba(${Math.round(15 + t * 20)}, ${Math.round(30 + t * 90)}, ${Math.round(80 + t * 110)}, 0.45)`
            : `rgba(${Math.round(224 - t * 40)}, ${Math.round(242 - t * 30)}, ${Math.round(254 - t * 20)}, 0.55)`;
        } else if (norm < 0.65) {
          const t = (norm - 0.3) / 0.35;
          ctx.fillStyle = isDark
            ? `rgba(${Math.round(16 + t * 120)}, ${Math.round(120 + t * 30)}, ${Math.round(120 - t * 70)}, 0.35)`
            : `rgba(${Math.round(209 + t * 45)}, ${Math.round(250 - t * 30)}, ${Math.round(229 - t * 70)}, 0.45)`;
        } else {
          const t = (norm - 0.65) / 0.35;
          ctx.fillStyle = isDark
            ? `rgba(${Math.round(160 + t * 80)}, ${Math.round(80 - t * 30)}, ${Math.round(40 + t * 20)}, 0.45)`
            : `rgba(${Math.round(254 - t * 15)}, ${Math.round(215 - t * 60)}, ${Math.round(170 - t * 70)}, 0.55)`;
        }
        ctx.fillRect(c * cellW, r * cellH, cellW + 0.5, cellH + 0.5);
      }
    }

    // ── 2. TRUE TOPOGRAPHIC LEVEL CONTOUR CURVES ──
    const numLevels = 14;
    ctx.lineWidth = 1.0;

    for (let l = 1; l <= numLevels; l++) {
      const frac = l / (numLevels + 1);
      let levelZ = 0;
      if (surfaceType === 'rosenbrock') {
        levelZ = Math.exp(frac * Math.log(1 + surface.zRange.max)) - 1;
      } else if (surfaceType === 'bowl') {
        levelZ = Math.pow(frac, 2) * surface.zRange.max;
      } else {
        levelZ = surface.zRange.min + frac * (surface.zRange.max - surface.zRange.min);
      }

      ctx.beginPath();
      ctx.strokeStyle = isDark
        ? `rgba(168, 85, 247, ${0.12 + (l / numLevels) * 0.28})`
        : `rgba(147, 51, 234, ${0.15 + (l / numLevels) * 0.25})`;

      for (let r = 0; r < gridRows; r++) {
        for (let c = 0; c < gridCols; c++) {
          const z0 = zMatrix[r][c];
          // Check horizontal level crossing
          if (c < gridCols - 1) {
            const z1 = zMatrix[r][c + 1];
            if ((z0 - levelZ) * (z1 - levelZ) <= 0 && z0 !== z1) {
              const edgeX = (c + 1) * cellW;
              ctx.moveTo(edgeX, r * cellH);
              ctx.lineTo(edgeX, (r + 1) * cellH);
            }
          }
          // Check vertical level crossing
          if (r < gridRows - 1) {
            const z2 = zMatrix[r + 1][c];
            if ((z0 - levelZ) * (z2 - levelZ) <= 0 && z0 !== z2) {
              const edgeY = (r + 1) * cellH;
              ctx.moveTo(c * cellW, edgeY);
              ctx.lineTo((c + 1) * cellW, edgeY);
            }
          }
        }
      }
      ctx.stroke();
    }

    // ── 3. STEEPEST DESCENT VECTOR FIELD ARROWS (-∇f) ──
    if (showVectorField) {
      const fieldCols = 14;
      const fieldRows = 10;
      ctx.fillStyle = isDark ? 'rgba(148, 163, 184, 0.35)' : 'rgba(100, 116, 139, 0.4)';
      ctx.strokeStyle = isDark ? 'rgba(148, 163, 184, 0.35)' : 'rgba(100, 116, 139, 0.4)';
      ctx.lineWidth = 1;

      for (let fr = 0; fr < fieldRows; fr++) {
        for (let fc = 0; fc < fieldCols; fc++) {
          const dx = b.minX + ((fc + 0.5) / fieldCols) * (b.maxX - b.minX);
          const dy = b.minY + ((fr + 0.5) / fieldRows) * (b.maxY - b.minY);
          const [gx, gy] = surface.grad(dx, dy);
          const gNorm = Math.hypot(gx, gy);

          if (gNorm > 0.05) {
            const centerPx = toPx(dx, dy);
            // Vector points downhill (-gx, -gy)
            const arrowLen = Math.min(13, 4 + Math.log(1 + gNorm) * 2.2);
            const uX = -gx / gNorm;
            const uY = gy / gNorm; // Flip y for screen coords

            const tipX = centerPx.px + uX * arrowLen;
            const tipY = centerPx.py + uY * arrowLen;

            ctx.beginPath();
            ctx.moveTo(centerPx.px, centerPx.py);
            ctx.lineTo(tipX, tipY);
            ctx.stroke();

            // Arrowhead
            const angle = Math.atan2(uY, uX);
            ctx.beginPath();
            ctx.moveTo(tipX, tipY);
            ctx.lineTo(tipX - 4 * Math.cos(angle - Math.PI / 6), tipY - 4 * Math.sin(angle - Math.PI / 6));
            ctx.lineTo(tipX - 4 * Math.cos(angle + Math.PI / 6), tipY - 4 * Math.sin(angle + Math.PI / 6));
            ctx.closePath();
            ctx.fill();
          }
        }
      }
    }

    // ── 4. GLOBAL OPTIMUM TARGET MARKER (θ*) ──
    const optPx = toPx(surface.optimum.x, surface.optimum.y);
    ctx.beginPath();
    ctx.arc(optPx.px, optPx.py, 8, 0, Math.PI * 2);
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(optPx.px, optPx.py, 2.5, 0, Math.PI * 2);
    ctx.fillStyle = '#f59e0b';
    ctx.fill();

    ctx.font = 'bold 10px monospace';
    ctx.fillStyle = '#f59e0b';
    ctx.fillText('θ* Optimum', optPx.px + 10, optPx.py + 3);

    // ── 5. GHOST SGD TRAJECTORY (COMPARISON PATH) ──
    if (showComparison && optimizer !== 'sgd' && ghostSgdTrajectory.length > 0) {
      ctx.beginPath();
      ctx.setLineDash([3, 4]);
      ghostSgdTrajectory.forEach((snap, idx) => {
        const pt = toPx(snap.x, snap.y);
        if (idx === 0) ctx.moveTo(pt.px, pt.py);
        else ctx.lineTo(pt.px, pt.py);
      });
      ctx.strokeStyle = 'rgba(244, 63, 94, 0.6)';
      ctx.lineWidth = 1.8;
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // ── 6. ACTIVE OPTIMIZER TRAJECTORY PATH & STEP MARKERS ──
    if (trajectory.length > 0) {
      const activeSnaps = trajectory.slice(0, currentStepIdx + 1);

      ctx.beginPath();
      activeSnaps.forEach((snap, idx) => {
        const pt = toPx(snap.x, snap.y);
        if (idx === 0) ctx.moveTo(pt.px, pt.py);
        else ctx.lineTo(pt.px, pt.py);
      });
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2.8;
      ctx.stroke();

      // Step dots along trajectory
      activeSnaps.forEach((snap) => {
        const pt = toPx(snap.x, snap.y);
        ctx.beginPath();
        ctx.arc(pt.px, pt.py, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = '#10b981';
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 0.5;
        ctx.stroke();
      });

      // ── 7. CURRENT PHYSICAL MARBLE BEAD & VELOCITY HEADING ──
      const cur = activeSnaps[activeSnaps.length - 1];
      if (cur) {
        const curPx = toPx(cur.x, cur.y);

        // Velocity vector arrow (Momentum step heading)
        if (currentStepIdx < trajectory.length - 1) {
          const nextSnap = trajectory[currentStepIdx + 1];
          const nextPx = toPx(nextSnap.x, nextSnap.y);
          const vdx = nextPx.px - curPx.px;
          const vdy = nextPx.py - curPx.py;
          const vlen = Math.hypot(vdx, vdy);

          if (vlen > 2) {
            ctx.beginPath();
            ctx.moveTo(curPx.px, curPx.py);
            ctx.lineTo(curPx.px + vdx, curPx.py + vdy);
            ctx.strokeStyle = '#38bdf8';
            ctx.lineWidth = 2.5;
            ctx.stroke();

            const angle = Math.atan2(vdy, vdx);
            ctx.beginPath();
            ctx.moveTo(curPx.px + vdx, curPx.py + vdy);
            ctx.lineTo(curPx.px + vdx - 5 * Math.cos(angle - Math.PI / 6), curPx.py + vdy - 5 * Math.sin(angle - Math.PI / 6));
            ctx.lineTo(curPx.px + vdx - 5 * Math.cos(angle + Math.PI / 6), curPx.py + vdy - 5 * Math.sin(angle + Math.PI / 6));
            ctx.fillStyle = '#38bdf8';
            ctx.fill();
          }
        }

        // Marble Contact Drop Shadow
        ctx.fillStyle = isDark ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.2)';
        ctx.beginPath();
        ctx.arc(curPx.px + 1.2, curPx.py + 2, 7.5, 0, Math.PI * 2);
        ctx.fill();

        // Outer Glow
        ctx.beginPath();
        ctx.arc(curPx.px, curPx.py, 12, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(16, 185, 129, 0.25)';
        ctx.fill();

        // 3D Spherical Marble Body
        const marbleGrad = ctx.createRadialGradient(
          curPx.px - 2.5, curPx.py - 2.5, 0.5,
          curPx.px, curPx.py, 7.5
        );
        marbleGrad.addColorStop(0, '#ffffff');
        marbleGrad.addColorStop(0.3, '#34d399');
        marbleGrad.addColorStop(0.85, '#059669');
        marbleGrad.addColorStop(1, '#064e3b');

        ctx.fillStyle = marbleGrad;
        ctx.beginPath();
        ctx.arc(curPx.px, curPx.py, 7.5, 0, Math.PI * 2);
        ctx.fill();

        // Specular glint
        ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
        ctx.beginPath();
        ctx.arc(curPx.px - 2.2, curPx.py - 2.2, 2.2, 0, Math.PI * 2);
        ctx.fill();

        // Floating Coordinates Tag
        ctx.font = 'bold 11px monospace';
        ctx.fillStyle = '#10b981';
        ctx.fillText(
          `θ(${cur.x.toFixed(2)}, ${cur.y.toFixed(2)})`,
          curPx.px + 12,
          curPx.py - 6
        );
      }
    }

    // ── 8. START POSITION MARKER θ₀ (DRAGGABLE) ──
    const startPx = toPx(startPos.x, startPos.y);
    ctx.beginPath();
    ctx.arc(startPx.px, startPx.py, 7, 0, Math.PI * 2);
    ctx.fillStyle = '#f59e0b';
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.font = 'bold 10px monospace';
    ctx.fillStyle = '#f59e0b';
    ctx.fillText('Start θ₀', startPx.px + 9, startPx.py + 13);

    ctx.restore();
  }, [
    surface,
    surfaceType,
    optimizer,
    startPos,
    trajectory,
    ghostSgdTrajectory,
    showComparison,
    showVectorField,
    currentStepIdx,
    theme,
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

  // Pointer interactions to drag startPos
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    const b = surface.bounds;

    const dataX = b.minX + (px / rect.width) * (b.maxX - b.minX);
    const dataY = b.minY + (1 - py / rect.height) * (b.maxY - b.minY);

    setStartPos({
      x: Number(dataX.toFixed(2)),
      y: Number(dataY.toFixed(2)),
    });
    setCurrentStepIdx(0);
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    if (config.soundEnabled) audio.playClick();
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!dragging.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const px = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
    const py = Math.max(0, Math.min(rect.height, e.clientY - rect.top));
    const b = surface.bounds;

    const dataX = b.minX + (px / rect.width) * (b.maxX - b.minX);
    const dataY = b.minY + (1 - py / rect.height) * (b.maxY - b.minY);

    setStartPos({
      x: Number(dataX.toFixed(2)),
      y: Number(dataY.toFixed(2)),
    });
    setCurrentStepIdx(0);
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

  const handleSelectSurface = (s: SurfaceType) => {
    setSurfaceType(s);
    setStartPos(SURFACES[s].defaultStart);
    setCurrentStepIdx(0);
    if (config.soundEnabled) audio.playClick();
  };

  const activeSnap = trajectory[Math.min(currentStepIdx, trajectory.length - 1)];

  return (
    <div className="flex flex-col gap-4 select-none">
      {/* Pre-Canvas Intuitive Briefing & Mental Model */}
      {!compact && <PreCanvasBriefing content={GD_TIER_CONTENT} />}

      {/* Top Toolbar: Surfaces & Optimizers */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] specular">
        {/* Surface selector */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-mono text-[var(--text-tertiary)] uppercase tracking-wider me-1">
            {language === 'ar' ? 'السطح:' : 'Loss Surface:'}
          </span>
          {(Object.keys(SURFACES) as SurfaceType[]).map((st) => (
            <button
              key={st}
              onClick={() => handleSelectSurface(st)}
              className={`px-2.5 py-1 text-xs font-mono rounded-lg border transition-all cursor-pointer ${
                surfaceType === st
                  ? 'border-[var(--math-gradient)] bg-[var(--math-gradient)]/15 text-[var(--math-gradient)] font-bold shadow-sm'
                  : 'border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]'
              }`}
            >
              {SURFACES[st].name[language]}
            </button>
          ))}
        </div>

        {/* Optimizer selector pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-mono text-[var(--text-tertiary)] uppercase tracking-wider me-1">
            Optimizer:
          </span>
          {(['sgd', 'momentum', 'rmsprop', 'adam'] as OptimizerType[]).map((opt) => (
            <button
              key={opt}
              onClick={() => {
                setOptimizer(opt);
                setCurrentStepIdx(0);
                if (config.soundEnabled) audio.playClick();
              }}
              className={`px-2.5 py-1 text-xs font-mono rounded-lg border uppercase transition-all cursor-pointer ${
                optimizer === opt
                  ? 'border-[var(--math-vector)] bg-[var(--math-vector)]/15 text-[var(--math-vector)] font-bold shadow-sm'
                  : 'border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]'
              }`}
            >
              {opt}
            </button>
          ))}

          {/* Toggle Vector Field Arrows */}
          <button
            onClick={() => setShowVectorField(!showVectorField)}
            className={`flex items-center gap-1 px-2.5 py-1 text-xs font-mono rounded-lg border transition-all cursor-pointer ${
              showVectorField
                ? 'border-sky-500/40 bg-sky-500/15 text-sky-400 font-bold'
                : 'border-[var(--border-subtle)] text-[var(--text-secondary)]'
            }`}
            title="Toggle Steepest Descent Gradient Vector Field (-∇f)"
          >
            <Compass size={12} />
            <span>-∇f</span>
          </button>

          {/* Toggle SGD Ghost Comparison */}
          {optimizer !== 'sgd' && (
            <button
              onClick={() => setShowComparison(!showComparison)}
              className={`flex items-center gap-1 px-2.5 py-1 text-xs font-mono rounded-lg border transition-all cursor-pointer ${
                showComparison
                  ? 'border-[var(--math-loss)] bg-[var(--math-loss)]/15 text-[var(--math-loss)] font-bold'
                  : 'border-[var(--border-subtle)] text-[var(--text-secondary)]'
              }`}
              title="Compare against Vanilla SGD path"
            >
              <GitCompare size={12} />
              <span>vs SGD</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Interactive Loss Surface Canvas */}
      <div className="relative rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-app)] overflow-hidden shadow-inner p-2">
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="w-full h-80 rounded-xl cursor-crosshair touch-none block"
        />

        <div className="absolute bottom-3 start-3 px-2.5 py-1 rounded-md bg-[var(--bg-surface)]/85 backdrop-blur-md border border-[var(--border-subtle)] text-[10px] sm:text-[11px] font-mono text-[var(--text-tertiary)] shadow-xs pointer-events-none">
          {language === 'ar' ? 'انقر أو اسحب لنقل نقطة البداية θ₀' : 'Click or drag anywhere to reposition θ₀'}
        </div>

        {/* Live Diagnostics Card */}
        {activeSnap && (
          <div className="absolute top-3 end-3 flex items-center gap-3 px-3 py-1.5 rounded-lg bg-[var(--bg-surface)]/90 backdrop-blur-md border border-[var(--border-subtle)] text-xs font-mono shadow-sm">
            <div>
              <span className="text-[var(--text-tertiary)]">Loss: </span>
              <span className="text-emerald-400 font-bold tabular-nums">
                {activeSnap.loss.toFixed(4)}
              </span>
            </div>
            <div className="w-px h-3 bg-[var(--border-subtle)]" />
            <div>
              <span className="text-[var(--text-tertiary)]">||∇L||: </span>
              <span className="text-amber-400 font-bold tabular-nums">
                {activeSnap.gradNorm.toFixed(4)}
              </span>
            </div>
            <div className="w-px h-3 bg-[var(--border-subtle)]" />
            <div>
              <span className="text-[var(--text-tertiary)]">Step: </span>
              <span className="text-purple-400 font-bold tabular-nums">
                {currentStepIdx} / {Math.max(1, trajectory.length - 1)}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Convergence Milestone / Status Banner */}
      {convergenceInfo.status === 'converged' && (
        <div className="p-3 px-4 rounded-xl border border-emerald-500/40 bg-emerald-500/10 flex items-center justify-between gap-3 text-xs font-mono slide-up">
          <div className="flex items-center gap-2 text-emerald-400">
            <CheckCircle2 size={16} className="shrink-0" />
            <span>
              <strong>{language === 'ar' ? 'تم الوصول لنقطة الاستقرار (تقارب ناجح):' : 'Convergence Milestone Achieved:'}</strong>{' '}
              {language === 'ar'
                ? `توقف عند الخطوة ${convergenceInfo.step} لأن ||∇L|| = ${convergenceInfo.gradNorm.toFixed(4)} ≤ ${stopTol}`
                : `Halted at Step ${convergenceInfo.step} with ||∇L|| = ${convergenceInfo.gradNorm.toFixed(4)} ≤ ε (${stopTol})`}
            </span>
          </div>
          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold text-[10px] shrink-0">
            {language === 'ar' ? 'مستقر ✓' : 'Stationary ✓'}
          </span>
        </div>
      )}

      {convergenceInfo.status === 'diverged' && (
        <div className="p-3 px-4 rounded-xl border border-rose-500/40 bg-rose-500/10 flex items-center justify-between gap-3 text-xs font-mono slide-up">
          <div className="flex items-center gap-2 text-rose-400">
            <AlertTriangle size={16} className="shrink-0" />
            <span>
              <strong>{language === 'ar' ? 'تشتت وانفجار حسابي (Divergence):' : 'Optimization Diverged:'}</strong>{' '}
              {language === 'ar'
                ? `تجاوزت الخوارزمية الحدود عند الخطوة ${convergenceInfo.step}. خفّض معدل التعلم η.`
                : `Loss exploded at Step ${convergenceInfo.step}. Reduce Learning Rate η.`}
            </span>
          </div>
          <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold text-[10px] shrink-0">
            {language === 'ar' ? 'تشتت ⚠' : 'Diverged ⚠'}
          </span>
        </div>
      )}

      {/* Stopping Criteria & Iteration Budget Toolbar */}
      <div className="p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] space-y-3 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          {/* Tolerance Criteria Epsilon */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] text-[var(--text-secondary)] font-semibold flex items-center gap-1 shrink-0">
              <Target size={13} className="text-emerald-400" />
              <span>{language === 'ar' ? 'معيار التوقف (عتبة التدرج ε):' : 'Stopping Criteria (||∇L|| ≤ ε):'}</span>
            </span>
            <div className="flex items-center gap-1 bg-[var(--bg-app)] p-0.5 rounded-lg border border-[var(--border-subtle)]">
              {([0.005, 0.02, 0.08] as StopTolerance[]).map((tol) => (
                <button
                  key={tol}
                  onClick={() => {
                    setStopTol(tol);
                    if (config.soundEnabled) audio.playClick();
                  }}
                  className={`px-2.5 py-1 rounded text-[11px] font-mono transition-all cursor-pointer ${
                    stopTol === tol
                      ? 'bg-[var(--bg-surface)] text-emerald-400 font-bold shadow-xs border border-[var(--border-subtle)]'
                      : 'text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]'
                  }`}
                >
                  {tol === 0.005
                    ? (language === 'ar' ? '0.005 (دقيق)' : '0.005 (Strict)')
                    : tol === 0.02
                    ? (language === 'ar' ? '0.02 (قياسي)' : '0.02 (Standard)')
                    : (language === 'ar' ? '0.08 (سريع)' : '0.08 (Relaxed)')}
                </button>
              ))}
            </div>
          </div>

          {/* Max Step Budget */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-[var(--text-tertiary)] shrink-0">
              {language === 'ar' ? 'أقصى خطوات:' : 'Step Budget:'}
            </span>
            <div className="flex items-center gap-1 bg-[var(--bg-app)] p-0.5 rounded-lg border border-[var(--border-subtle)]">
              {[25, 50, 80, 150].map((steps) => (
                <button
                  key={steps}
                  onClick={() => {
                    setMaxStepBudget(steps);
                    if (config.soundEnabled) audio.playClick();
                  }}
                  className={`px-2 py-0.5 rounded text-[10px] font-mono transition-all cursor-pointer ${
                    maxStepBudget === steps
                      ? 'bg-[var(--bg-surface)] text-[var(--text-primary)] font-bold shadow-xs border border-[var(--border-subtle)]'
                      : 'text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]'
                  }`}
                >
                  {steps}
                </button>
              ))}
            </div>

            {/* Auto-Stop Toggle */}
            <button
              onClick={() => setAutoStopOnConvergence(!autoStopOnConvergence)}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-mono border transition-all cursor-pointer ${
                autoStopOnConvergence
                  ? 'border-emerald-500/40 bg-emerald-500/15 text-emerald-400 font-bold'
                  : 'border-[var(--border-subtle)] text-[var(--text-tertiary)]'
              }`}
            >
              {autoStopOnConvergence
                ? (language === 'ar' ? '✓ إيقاف تلقائي' : '✓ Auto-Stop')
                : (language === 'ar' ? 'متابعة كاملة' : 'Full Run')}
            </button>
          </div>
        </div>
      </div>

      {/* Bidirectional Playback Timeline Bar */}
      <TimelinePlaybackBar
        currentStep={currentStepIdx}
        totalSteps={Math.max(1, trajectory.length - 1)}
        stepPhase={optimizer.toUpperCase()}
        metricLabel="Loss"
        metricValue={activeSnap?.loss || 0}
        onStepChange={(step) => setCurrentStepIdx(step)}
      />

      {/* Hardware-Style Precision Parameter Sliders (Spacious 2-Tier Responsive Layout) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] specular shadow-xs">
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between text-xs font-mono text-[var(--text-secondary)]">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[var(--math-gradient)]" />
              <span>{language === 'ar' ? 'معدل التعلم (η):' : 'Learning Rate (η):'}</span>
            </span>
            <span className="tabular-nums text-[var(--math-gradient)] font-semibold font-mono">{learningRate.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min="0.01"
            max="1.20"
            step="0.01"
            value={learningRate}
            onChange={(e) => setLearningRate(parseFloat(e.target.value))}
            className="w-full accent-[var(--math-gradient)] cursor-pointer"
          />
          <div className="text-[10px] text-[var(--text-tertiary)] font-mono flex justify-between">
            <span>η=0.01 (Slow)</span>
            <span>η=0.35 (Smooth)</span>
            <span>η=1.20 (Overshoot)</span>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between text-xs font-mono text-[var(--text-secondary)]">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[var(--math-vector)]" />
              <span>{language === 'ar' ? 'معامل الزخم (β):' : 'Momentum (β):'}</span>
            </span>
            <span className="tabular-nums text-[var(--math-vector)] font-semibold font-mono">{momentum.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min="0.00"
            max="0.99"
            step="0.01"
            value={momentum}
            onChange={(e) => setMomentum(parseFloat(e.target.value))}
            className="w-full accent-[var(--math-vector)] cursor-pointer"
          />
          <div className="text-[10px] text-[var(--text-tertiary)] font-mono flex justify-between">
            <span>β=0.00 (Pure SGD)</span>
            <span>β=0.80 (Heavy Ball)</span>
            <span>β=0.99 (High Inertia)</span>
          </div>
        </div>
      </div>

      {/* Post-Canvas Mathematical & Code Consolidation */}
      {!compact && <PostCanvasConsolidation content={GD_TIER_CONTENT} />}
    </div>
  );
};

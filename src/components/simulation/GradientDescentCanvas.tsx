import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useOkvirStore } from '@/lib/store';
import { TimelinePlaybackBar } from '@/components/simulation/TimelinePlaybackBar';
import { PreCanvasBriefing, PostCanvasConsolidation, type TierContent } from '@/components/pedagogy/MultiTierDisclosure';
import { audio } from '@/lib/audio';
import { sonifier } from '@/lib/audio/WebAudioSonifier';
import { GitCompare } from 'lucide-react';

type OptimizerType = 'sgd' | 'momentum' | 'rmsprop' | 'adam';
type SurfaceType = 'bowl' | 'rosenbrock' | 'saddle';

interface LossSurfaceDef {
  name: { en: string; ar: string };
  f: (x: number, y: number) => number;
  grad: (x: number, y: number) => [number, number];
  bounds: { minX: number; maxX: number; minY: number; maxY: number };
  defaultStart: { x: number; y: number };
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
  },
  saddle: {
    name: { en: 'Saddle Point (Minimax)', ar: 'نقطة السرج' },
    f: (x, y) => 0.5 * (x * x - y * y),
    grad: (x, y) => [x, -y],
    bounds: { minX: -4, maxX: 4, minY: -4, maxY: 4 },
    defaultStart: { x: 0.1, y: 2.5 },
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
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const dragging = useRef(false);

  const surface = SURFACES[surfaceType];

  // Compute trajectories for active optimizer & reference SGD
  const computeTrajectories = useCallback(() => {
    const curSurface = SURFACES[surfaceType];
    const maxSteps = 80;

    const runOpt = (opt: OptimizerType): TrajectorySnapshot[] => {
      const snaps: TrajectorySnapshot[] = [];
      const p = { ...startPos };
      const v = { x: 0, y: 0 };
      const s = { x: 0, y: 0 };
      const eps = 1e-6;

      for (let t = 0; t <= maxSteps; t++) {
        const loss = curSurface.f(p.x, p.y);
        const [gx, gy] = curSurface.grad(p.x, p.y);
        const gradNorm = Math.hypot(gx, gy);

        snaps.push({ step: t, x: p.x, y: p.y, loss, gradNorm });

        if (opt === 'sgd') {
          p.x -= learningRate * gx;
          p.y -= learningRate * gy;
        } else if (opt === 'momentum') {
          v.x = momentum * v.x - learningRate * gx;
          v.y = momentum * v.y - learningRate * gy;
          p.x += v.x;
          p.y += v.y;
        } else if (opt === 'rmsprop') {
          s.x = 0.9 * s.x + 0.1 * gx * gx;
          s.y = 0.9 * s.y + 0.1 * gy * gy;
          p.x -= (learningRate / Math.sqrt(s.x + eps)) * gx;
          p.y -= (learningRate / Math.sqrt(s.y + eps)) * gy;
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

          p.x -= (learningRate / (Math.sqrt(sHatX) + eps)) * mHatX;
          p.y -= (learningRate / (Math.sqrt(sHatY) + eps)) * mHatY;
        }

        // Clamp to prevent infinite explosion
        p.x = Math.max(-10, Math.min(10, p.x));
        p.y = Math.max(-10, Math.min(10, p.y));
      }
      return snaps;
    };

    const mainTraj = runOpt(optimizer);
    const sgdTraj = runOpt('sgd');
    setTrajectory(mainTraj);
    setGhostSgdTrajectory(sgdTraj);
  }, [surfaceType, optimizer, startPos, learningRate, momentum]);

  useEffect(() => {
    computeTrajectories();
  }, [computeTrajectories]);

  // Sonification on step change
  useEffect(() => {
    if (!config.soundEnabled || trajectory.length === 0) return;
    const snap = trajectory[Math.min(currentStepIdx, trajectory.length - 1)];
    if (!snap) return;

    if (currentStepIdx === trajectory.length - 1 && snap.loss < 0.1) {
      sonifier.playConvergenceChime();
    } else {
      sonifier.updateLoss(snap.loss);
    }
  }, [currentStepIdx, trajectory, config.soundEnabled]);

  // Render Frame
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

    // 1. Loss Contours
    const numLevels = 10;
    for (let l = 1; l <= numLevels; l++) {
      ctx.beginPath();
      ctx.strokeStyle =
        theme === 'dark'
          ? `rgba(168, 85, 247, ${0.05 + (l / numLevels) * 0.18})`
          : `rgba(147, 51, 234, ${0.05 + (l / numLevels) * 0.16})`;
      ctx.lineWidth = 1;

      // Draw approximate contour circles/ellipses
      const r = (l / numLevels) * (surfaceType === 'rosenbrock' ? 1.8 : 4.0);
      const center = toPx(surfaceType === 'rosenbrock' ? 1.0 : 0, surfaceType === 'rosenbrock' ? 1.0 : 0);
      const rx = (r / (b.maxX - b.minX)) * width;
      const ry = (r / (b.maxY - b.minY)) * height;
      ctx.ellipse(center.px, center.py, rx, ry, 0, 0, Math.PI * 2);
      ctx.stroke();
    }

    // 2. Ghost SGD Trajectory (Comparison Mode)
    if (showComparison && optimizer !== 'sgd' && ghostSgdTrajectory.length > 0) {
      ctx.beginPath();
      ctx.setLineDash([4, 4]);
      ghostSgdTrajectory.forEach((snap, idx) => {
        const pt = toPx(snap.x, snap.y);
        if (idx === 0) ctx.moveTo(pt.px, pt.py);
        else ctx.lineTo(pt.px, pt.py);
      });
      ctx.strokeStyle = 'rgba(244, 63, 94, 0.45)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // 3. Active Optimizer Trajectory Path
    if (trajectory.length > 0) {
      const activeSnaps = trajectory.slice(0, currentStepIdx + 1);
      ctx.beginPath();
      activeSnaps.forEach((snap, idx) => {
        const pt = toPx(snap.x, snap.y);
        if (idx === 0) ctx.moveTo(pt.px, pt.py);
        else ctx.lineTo(pt.px, pt.py);
      });
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Path dots
      activeSnaps.forEach((snap, idx) => {
        if (idx % 2 === 0) {
          const pt = toPx(snap.x, snap.y);
          ctx.beginPath();
          ctx.arc(pt.px, pt.py, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = '#10b981';
          ctx.fill();
        }
      });

      // 4. Current Marble Bead
      const cur = activeSnaps[activeSnaps.length - 1];
      if (cur) {
        const curPx = toPx(cur.x, cur.y);
        // Halo
        ctx.beginPath();
        ctx.arc(curPx.px, curPx.py, 12, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(16, 185, 129, 0.25)';
        ctx.fill();
        // Core
        ctx.beginPath();
        ctx.arc(curPx.px, curPx.py, 7, 0, Math.PI * 2);
        ctx.fillStyle = '#10b981';
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.font = 'bold 11px monospace';
        ctx.fillStyle = '#10b981';
        ctx.fillText(`L = ${cur.loss.toFixed(3)}`, curPx.px + 12, curPx.py - 6);
      }
    }

    // 5. Start Position Marker (Draggable)
    const startPx = toPx(startPos.x, startPos.y);
    ctx.beginPath();
    ctx.arc(startPx.px, startPx.py, 6, 0, Math.PI * 2);
    ctx.fillStyle = '#f59e0b';
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.font = '10px monospace';
    ctx.fillStyle = '#f59e0b';
    ctx.fillText('Start θ₀', startPx.px + 8, startPx.py + 12);

    ctx.restore();
  }, [
    surface,
    surfaceType,
    optimizer,
    startPos,
    trajectory,
    ghostSgdTrajectory,
    showComparison,
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
              className={`px-2.5 py-1 text-xs font-mono rounded-lg border transition-all ${
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
                if (config.soundEnabled) audio.playClick();
              }}
              className={`px-2.5 py-1 text-xs font-mono rounded-lg border uppercase transition-all ${
                optimizer === opt
                  ? 'border-emerald-400 bg-emerald-500/15 text-emerald-300 font-bold shadow-sm'
                  : 'border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]'
              }`}
            >
              {opt}
            </button>
          ))}

          {/* Toggle SGD Ghost Comparison */}
          {optimizer !== 'sgd' && (
            <button
              onClick={() => setShowComparison(!showComparison)}
              className={`flex items-center gap-1 px-2.5 py-1 text-xs font-mono rounded-lg border transition-all ${
                showComparison
                  ? 'border-rose-400 bg-rose-500/15 text-rose-300 font-bold'
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
          className="w-full h-80 rounded-xl cursor-crosshair touch-none"
        />

        <div className="absolute top-4 start-4 px-2.5 py-1 rounded-md bg-[var(--bg-surface)]/80 backdrop-blur-md border border-[var(--border-subtle)] text-[11px] font-mono text-[var(--text-tertiary)]">
          {language === 'ar' ? 'انقر في أي مكان لوضع كرة البداية θ₀' : 'Click anywhere on contour surface to drop marble θ₀'}
        </div>

        {/* Live Step Badge */}
        {trajectory.length > 0 && (
          <div className="absolute top-4 end-4 flex items-center gap-3 px-3 py-1.5 rounded-lg bg-[var(--bg-surface)]/90 backdrop-blur-md border border-[var(--border-subtle)] text-xs font-mono shadow-sm">
            <div>
              <span className="text-[var(--text-tertiary)]">Loss: </span>
              <span className="text-emerald-400 font-bold tabular-nums">
                {trajectory[Math.min(currentStepIdx, trajectory.length - 1)]?.loss.toFixed(3)}
              </span>
            </div>
            <div className="w-px h-3 bg-[var(--border-subtle)]" />
            <div>
              <span className="text-[var(--text-tertiary)]">Step: </span>
              <span className="text-purple-400 font-bold tabular-nums">
                {currentStepIdx} / {trajectory.length - 1}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Bidirectional Playback Timeline Bar */}
      <TimelinePlaybackBar
        currentStep={currentStepIdx}
        totalSteps={Math.max(1, trajectory.length - 1)}
        stepPhase={optimizer.toUpperCase()}
        metricLabel="Loss"
        metricValue={trajectory[Math.min(currentStepIdx, trajectory.length - 1)]?.loss || 0}
        onStepChange={(step) => setCurrentStepIdx(step)}
      />

      {/* Hardware-Style Precision Parameter Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] specular">
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

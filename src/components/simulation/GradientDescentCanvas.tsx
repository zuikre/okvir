import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useOkvirStore } from '@/lib/store';
import { tr } from '@/lib/i18n';
import { TimelinePlaybackBar } from '@/components/simulation/TimelinePlaybackBar';
import { MultiTierDisclosure, type TierContent } from '@/components/pedagogy/MultiTierDisclosure';
import { audio } from '@/lib/audio';

// Non-convex loss surface with ripples and bowl
const f = (x: number, y: number) => 0.5 * (x * x + y * y) + 0.18 * Math.sin(x * y);
const dfdx = (x: number, y: number) => x + 0.18 * y * Math.cos(x * y);
const dfdy = (x: number, y: number) => y + 0.18 * x * Math.cos(x * y);

const GD_TIER_CONTENT: TierContent = {
  intuition: {
    analogy: {
      en: 'Imagine being blindfolded on a rugged mountain in heavy fog. You feel the ground with your boots for the steepest downward slope and take a careful step in that direction.',
      ar: 'تخيّل أنك معصوب العينين على منحدر جبل وعر يغطيه ضباب كثيف. تتحسس الأرض بحذائك لتعرف الاتجاه الأكثر انحداراً نحو الأسفل، ثم تخطو خطوة حذرة في ذلك الاتجاه.',
    },
    keyTakeaway: {
      en: 'Gradient Descent moves iteratively in the opposite direction of the gradient vector to find a local or global minimum.',
      ar: 'يتحرك الانحدار التدرجي تكرارياً في الاتجاه المعاكس لمتجه التدرج للوصول إلى القاع أو النهاية الصغرى.',
    },
  },
  geometry: {
    visualDescription: {
      en: 'The gradient vector ∇f(θ) points in the direction of greatest rate of increase and is always strictly orthogonal to the level curve contours.',
      ar: 'يشير متجه التدرج ∇f(θ) إلى اتجاه أقصى زيادة في الدالة، ويكون دائماً عمودياً تماماً على خطوط الكنتور.',
    },
    conservedQuantity: {
      en: 'Monotonic loss decay in convex regimes: f(θ_{t+1}) ≤ f(θ_t) when learning rate satisfies the Lipschitz smoothness condition η ≤ 1/L.',
      ar: 'تناقص رتيب لدالة الخسارة عند تحقق شرط ليبشيتز لنعومة السطح: η ≤ 1/L.',
    },
  },
  formal: {
    equation: '\\theta_{t+1} = \\theta_t - \\eta \\nabla L(\\theta_t) + \\beta v_t',
    derivationSteps: [
      {
        step: 'v_t = \\beta v_{t-1} + (1 - \\beta) \\nabla L(\\theta_t)',
        note: { en: 'Polyak heavy-ball momentum accumulator', ar: 'مراكم الزخم لكرات بلياك الثقيلة لتسريع الوديان' },
      },
      {
        step: '\\theta_{t+1} = \\theta_t - \\eta v_t',
        note: { en: 'Parameter translation along momentum vector', ar: 'تحديث المعاملات باتجاه متجه الزخم' },
      },
    ],
  },
  code: {
    snippet: `import numpy as np

def gradient_descent(x0: float, y0: float, lr=0.08, beta=0.85, steps=100):
    pos = np.array([x0, y0], dtype=float)
    vel = np.zeros(2)
    trajectory = [pos.copy()]
    
    for _ in range(steps):
        grad = np.array([dfdx(pos[0], pos[1]), dfdy(pos[0], pos[1])])
        vel = beta * vel - lr * grad
        pos += vel
        trajectory.append(pos.copy())
    return np.array(trajectory)`,
    explanation: {
      en: 'Momentum dampens high-frequency transverse oscillations in narrow ravines while accelerating along the longitudinal gradient valley.',
      ar: 'يخمد الزخم التذبذبات العرضية المشتتة في الأخاديد الضيقة بينما يسرع الحركة على طول مسار القاع.',
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

export const GradientDescentCanvas: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { learningRate, momentum, setLearningRate, setMomentum, theme, language, config } = useOkvirStore();

  const [startPos, setStartPos] = useState({ x: 3.5, y: 3.5 });
  const [trajectory, setTrajectory] = useState<TrajectorySnapshot[]>([]);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [showPedagogy, setShowPedagogy] = useState(false);

  // Pre-generate trajectory snapshots whenever startPos, lr, or momentum changes
  const computeTrajectory = useCallback(() => {
    const snaps: TrajectorySnapshot[] = [];
    let p = { ...startPos };
    let v = { x: 0, y: 0 };
    const maxSteps = 80;

    for (let step = 0; step <= maxSteps; step++) {
      const currentLoss = f(p.x, p.y);
      const gx = dfdx(p.x, p.y);
      const gy = dfdy(p.x, p.y);
      const gradNorm = Math.hypot(gx, gy);

      snaps.push({
        step,
        x: p.x,
        y: p.y,
        loss: currentLoss,
        gradNorm,
      });

      if (gradNorm < 0.005 || Math.abs(p.x) > 12 || Math.abs(p.y) > 12) break;

      // Momentum step
      v = {
        x: momentum * v.x - learningRate * gx,
        y: momentum * v.y - learningRate * gy,
      };
      p = {
        x: p.x + v.x,
        y: p.y + v.y,
      };
    }
    setTrajectory(snaps);
    setCurrentStepIdx(0);
  }, [startPos, learningRate, momentum]);

  useEffect(() => {
    computeTrajectory();
  }, [computeTrajectory]);

  const activeSnap = trajectory[currentStepIdx] || {
    step: 0,
    x: startPos.x,
    y: startPos.y,
    loss: f(startPos.x, startPos.y),
    gradNorm: 0,
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
    const range = 5.2;
    const toCanvasX = (x: number) => pad + ((x + range) / (2 * range)) * plotW;
    const toCanvasY = (y: number) => pad + ((range - y) / (2 * range)) * plotH;

    // 1. Concentric Contour Field Lines
    const levels = [0.15, 0.4, 0.9, 1.8, 3.2, 5.5, 9.0, 14.0, 20.0];
    const res = 4;
    levels.forEach((level, li) => {
      ctx.beginPath();
      for (let py = 0; py <= height; py += res) {
        for (let px = 0; px <= width; px += res) {
          const wx = ((px - pad) / plotW) * (2 * range) - range;
          const wy = range - ((py - pad) / plotH) * (2 * range);
          const val = f(wx, wy);
          const valX = f(wx + (res / plotW) * 2 * range, wy);
          const valY = f(wx, wy + (res / plotH) * 2 * range);
          if (
            (val < level && valX >= level) ||
            (val >= level && valX < level) ||
            (val < level && valY >= level) ||
            (val >= level && valY < level)
          ) {
            ctx.rect(px, py, 1.2, 1.2);
          }
        }
      }
      const opacity = 0.05 + (1 - li / levels.length) * 0.12;
      ctx.fillStyle = theme === 'dark' ? `rgba(245, 158, 11, ${opacity})` : `rgba(217, 119, 6, ${opacity})`;
      ctx.fill();
    });

    // 2. Coordinate Axes
    ctx.strokeStyle = theme === 'dark' ? '#27272a' : '#e4e4e7';
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(toCanvasX(0), pad);
    ctx.lineTo(toCanvasX(0), pad + plotH);
    ctx.moveTo(pad, toCanvasY(0));
    ctx.lineTo(pad + plotW, toCanvasY(0));
    ctx.stroke();

    // 3. Optimization Trajectory Trail up to current step
    if (trajectory.length > 1) {
      // Full future trail (faint)
      ctx.beginPath();
      trajectory.forEach((t, i) => {
        const cx = toCanvasX(t.x);
        const cy = toCanvasY(t.y);
        if (i === 0) ctx.moveTo(cx, cy);
        else ctx.lineTo(cx, cy);
      });
      ctx.strokeStyle = theme === 'dark' ? 'rgba(168, 85, 247, 0.25)' : 'rgba(124, 58, 237, 0.2)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Active trail (solid)
      ctx.beginPath();
      for (let i = 0; i <= currentStepIdx; i++) {
        const t = trajectory[i];
        if (!t) break;
        const cx = toCanvasX(t.x);
        const cy = toCanvasY(t.y);
        if (i === 0) ctx.moveTo(cx, cy);
        else ctx.lineTo(cx, cy);
      }
      ctx.strokeStyle = theme === 'dark' ? '#a855f7' : '#7c3aed';
      ctx.lineWidth = 2.5;
      ctx.stroke();
    }

    // 4. Global Minimum Target Crosshair (0, 0)
    ctx.beginPath();
    ctx.arc(toCanvasX(0), toCanvasY(0), 5, 0, Math.PI * 2);
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    ctx.stroke();

    // 5. Active Optimization Particle
    const curX = toCanvasX(activeSnap.x);
    const curY = toCanvasY(activeSnap.y);

    // Radial Glow Halo
    const gradient = ctx.createRadialGradient(curX, curY, 0, curX, curY, 15);
    gradient.addColorStop(0, 'rgba(168, 85, 247, 0.7)');
    gradient.addColorStop(1, 'rgba(168, 85, 247, 0)');
    ctx.beginPath();
    ctx.arc(curX, curY, 15, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();

    // Solid core
    ctx.beginPath();
    ctx.arc(curX, curY, 5.5, 0, Math.PI * 2);
    ctx.fillStyle = '#fafafa';
    ctx.fill();
    ctx.strokeStyle = '#a855f7';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Negative Gradient Vector Arrow (-∇L)
    const gx = dfdx(activeSnap.x, activeSnap.y);
    const gy = dfdy(activeSnap.x, activeSnap.y);
    const arrowLen = 18;
    const gNorm = Math.hypot(gx, gy) || 1;
    const arrowEndX = curX - (gx / gNorm) * arrowLen;
    const arrowEndY = curY + (gy / gNorm) * arrowLen;

    ctx.beginPath();
    ctx.moveTo(curX, curY);
    ctx.lineTo(arrowEndX, arrowEndY);
    ctx.strokeStyle = '#f43f5e';
    ctx.lineWidth = 2;
    ctx.stroke();
  }, [trajectory, currentStepIdx, activeSnap, theme]);

  useEffect(() => {
    renderFrame();
  }, [renderFrame]);

  // Click on Canvas to Reposition Particle
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    const width = rect.width;
    const height = rect.height;

    const pad = 24;
    const plotW = width - pad * 2;
    const plotH = height - pad * 2;
    const range = 5.2;

    const newX = Number((((px - pad) / plotW) * (2 * range) - range).toFixed(2));
    const newY = Number((range - ((py - pad) / plotH) * (2 * range)).toFixed(2));

    setStartPos({ x: newX, y: newY });
    if (config.soundEnabled) audio.playClick();
  };

  return (
    <div className="flex flex-col gap-3 p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] specular">
      {/* 1. Header */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider text-[var(--text-secondary)] font-mono">
              Loss f(x, y):
            </span>
            <span className="font-mono text-sm font-semibold tabular-nums text-[var(--math-loss)]">
              {activeSnap.loss.toFixed(4)}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-[var(--text-secondary)]">
            <span>||∇L||:</span>
            <span className="font-semibold text-purple-400 tabular-nums">
              {activeSnap.gradNorm.toFixed(3)}
            </span>
          </div>
        </div>

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

      {/* 2. Interactive Canvas */}
      <div className="relative w-full h-80 rounded-lg overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-app)]">
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          className="w-full h-full block cursor-crosshair"
        />

        <div className="absolute top-2.5 start-2.5 pointer-events-none">
          <span className="text-[10px] font-mono text-[var(--text-secondary)] bg-[var(--bg-surface)]/90 backdrop-blur-md px-2 py-0.5 rounded border border-[var(--border-subtle)]">
            Click anywhere on contour surface to relocate starting marble
          </span>
        </div>

        <div className="absolute top-2.5 end-2.5 pointer-events-none">
          <span className="text-[10px] font-mono text-purple-300 bg-[var(--bg-surface)]/90 backdrop-blur-md px-2 py-0.5 rounded border border-[var(--border-subtle)]">
            ({activeSnap.x.toFixed(2)}, {activeSnap.y.toFixed(2)})
          </span>
        </div>
      </div>

      {/* 3. Timeline Playback & Loss Sonification Bar */}
      {!compact && (
        <TimelinePlaybackBar
          totalSteps={Math.max(0, trajectory.length - 1)}
          currentStep={currentStepIdx}
          metricLabel="Loss"
          metricValue={activeSnap.loss}
          onStepChange={(step) => setCurrentStepIdx(step)}
        />
      )}

      {/* 4. Hyperparameter Hardware Sliders */}
      {!compact && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between text-xs font-mono text-[var(--text-secondary)]">
              <span>{tr('learningRate', language)} (η):</span>
              <span className="tabular-nums font-semibold text-[var(--math-gradient)]">
                {learningRate.toFixed(3)}
              </span>
            </div>
            <input
              type="range"
              min="0.01"
              max="0.30"
              step="0.005"
              value={learningRate}
              onChange={(e) => setLearningRate(parseFloat(e.target.value))}
              className="w-full accent-[var(--math-gradient)] cursor-pointer"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between text-xs font-mono text-[var(--text-secondary)]">
              <span>{tr('momentum', language)} (β):</span>
              <span className="tabular-nums font-semibold text-[var(--math-gradient)]">
                {momentum.toFixed(2)}
              </span>
            </div>
            <input
              type="range"
              min="0.0"
              max="0.95"
              step="0.05"
              value={momentum}
              onChange={(e) => setMomentum(parseFloat(e.target.value))}
              className="w-full accent-[var(--math-gradient)] cursor-pointer"
            />
          </div>
        </div>
      )}

      {/* 5. Pedagogical Deep Dive */}
      {showPedagogy && !compact && (
        <div className="pt-2">
          <MultiTierDisclosure content={GD_TIER_CONTENT} />
        </div>
      )}
    </div>
  );
};

import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { useOkvirStore } from '@/lib/store';
import { audio } from '@/lib/audio';
import { PreCanvasBriefing, PostCanvasConsolidation, type TierContent } from '@/components/pedagogy/MultiTierDisclosure';
import { Play, Pause, RotateCcw, Plus, Activity, Sparkles, Zap, CheckCircle2, Sliders } from 'lucide-react';

interface ActiveBall {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  row: number;
  col: number;
  color: string;
  radius: number;
  settled: boolean;
}

interface SettledBall {
  x: number;
  y: number;
  color: string;
  radius: number;
}

interface PegGlow {
  x: number;
  y: number;
  life: number;
  color: string;
}

const CLT_PEDAGOGY: TierContent = {
  intuition: {
    analogy: {
      en: 'Every time a ball hits a peg, it makes an independent binary choice: bounce left or right (like a coin flip). While a single bounce is unpredictable, the aggregate sum of many independent random bounces always converges into the iconic bell-shaped Gaussian normal curve.',
      ar: 'في كل مرة تصطدم فيها الكرة بوتد، تتخذ قراراً ثنائياً مستقلاً: الانحراف لليسار أو اليمين (كمثل رمية عملة نقدية). ورغم استحالة التنبؤ بحركة كرة واحدة، فإن المجموع الكلي للعديد من الانحرافات العشوائية المستقلة يتجمع حتماً ليشكل المنحنى الجرسي الطبيعي لغاووس.',
    },
    keyTakeaway: {
      en: 'The Central Limit Theorem (CLT) states that the sum (or average) of independent and identically distributed (i.i.d.) random variables approaches a normal distribution, regardless of the underlying distribution of the individual steps.',
      ar: 'تنص مبرهنة النهاية المركزية (CLT) على أن مجموع (أو متوسط) متغيرات عشوائية مستقلة ومتماثلة التوزيع يقترب حتماً من التوزيع الطبيعي، بغض النظر عن طبيعة التوزيع الأصلي للخطوات الفردية.',
    },
  },
  geometry: {
    visualDescription: {
      en: 'Pascal’s triangle of pins creates 2ⁿ possible pathways. The central bins accumulate exponentially more combinatorial routes (n choose k) than the extreme edges, shaping the smooth Gaussian envelope.',
      ar: 'مصفوفة أوتاد مثلث باسكال تخلق 2ⁿ مساراً ممكناً. الحجرات الوسطى تجمع مسارات توافقية أكثر بأضعاف مضاعفة (n فوق k) مقارنة بالأطراف القصوى، مما يرسم منحنى غاووس الناعم.',
    },
    conservedQuantity: {
      en: 'Binomial distribution B(n, p) converges asymptotically to Normal N(μ = np, σ² = np(1-p)) as n grows large.',
      ar: 'توزيع ذات الحدين B(n, p) يتقارب مقاربياً مع التوزيع الطبيعي N(μ = np, σ² = np(1-p)) كلما ازداد عدد الصفوف n.',
    },
  },
  formal: {
    equation: '\\lim_{n \\to \\infty} P\\left( \\frac{S_n - n\\mu}{\\sigma \\sqrt{n}} \\le z \\right) = \\Phi(z) = \\frac{1}{\\sqrt{2\\pi}} \\int_{-\\infty}^z e^{-\\frac{t^2}{2}} dt',
    derivationSteps: [
      {
        step: 'S_n = \\sum_{i=1}^n X_i, \\quad X_i \\sim \\text{Bernoulli}(p)',
        note: {
          en: 'Ball position is the sum of n independent binary random deflections',
          ar: 'موقع الكرة في الأسفل هو مجموع n انحرافاً عشوائياً ثنائياً مستقلاً',
        },
      },
      {
        step: '\\mathbb{E}[S_n] = np, \\quad \\text{Var}(S_n) = np(1-p)',
        note: {
          en: 'Expectation and variance scale linearly with row depth n',
          ar: 'القيمة المتوقعة والتباين يتغيران خطياً مع عمق صفوف الأوتاد n',
        },
      },
      {
        step: 'P(S_n = k) = \\binom{n}{k} p^k (1-p)^{n-k} \\approx \\frac{1}{\\sigma\\sqrt{2\\pi}} e^{-\\frac{(k-\\mu)^2}{2\\sigma^2}}',
        note: {
          en: 'De Moivre–Laplace theorem proves Gaussian approximation to binomial',
          ar: 'مبرهنة دي موافر-لابلاس تثبت التقريب الغاووسي لتوزيع ذات الحدين',
        },
      },
    ],
  },
  code: {
    snippet: `import numpy as np
import scipy.stats as stats

# CLT Empirical Simulation
n_trials = 10000
n_pegs = 10
p = 0.5

# Sum of independent Bernoulli trials
bounces = np.random.binomial(n=1, p=p, size=(n_trials, n_pegs))
final_bins = np.sum(bounces, axis=1)

# Check sample statistics against theoretical Normal distribution
mean_emp = np.mean(final_bins)
var_emp = np.var(final_bins)
print(f"Empirical: Mean={mean_emp:.2f}, Var={var_emp:.2f}")
print(f"Theory:    Mean={n_pegs*p:.2f}, Var={n_pegs*p*(1-p):.2f}")`,
    explanation: {
      en: 'NumPy simulation verifies that discrete Bernoulli sums reproduce theoretical normal parameters.',
      ar: 'محاكاة NumPy تثبت أن مجموع تجارب برنولي المنفصلة يعيد بدقة إنتاج معاملات التوزيع الطبيعي النظرية.',
    },
  },
};

// Vibrant tactile color palette for cascading ball bearings
const BALL_COLORS = ['#38bdf8', '#34d399', '#fbbf24', '#c084fc', '#f43f5e'];

export const GaltonBoardCltLab: React.FC<{ compact?: boolean }> = ({ compact }) => {
  const { language, config } = useOkvirStore();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const numRows = 10;
  const numBins = numRows + 1;

  // State controls
  const [pBias, setPBias] = useState(0.5); // Probability of bouncing right (p)
  const [targetN, setTargetN] = useState<number>(250); // Stop criteria: 100, 250, 500, 1000, 0 (infinite)
  const [speedMode, setSpeedMode] = useState<'normal' | 'fast'>('normal');
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [bins, setBins] = useState<number[]>(new Array(numBins).fill(0));
  const [totalDropped, setTotalDropped] = useState(0);

  // Animation & simulation refs
  const activeBallsRef = useRef<ActiveBall[]>([]);
  const settledBallsRef = useRef<SettledBall[]>([]);
  const pegGlowsRef = useRef<PegGlow[]>([]);
  const binsRef = useRef<number[]>(new Array(numBins).fill(0));
  binsRef.current = bins;
  const nextBallIdRef = useRef(1);
  const lastSoundTimeRef = useRef(0);

  // Spawn batch of physical balls from the top funnel
  const spawnBatch = useCallback(
    (count = 1) => {
      if (targetN > 0 && totalDropped >= targetN) {
        setIsRunning(false);
        return;
      }

      const canvas = canvasRef.current;
      const w = canvas ? canvas.getBoundingClientRect().width : 600;
      const cx = w / 2;

      const toSpawn = targetN > 0 ? Math.min(count, targetN - totalDropped) : count;
      if (toSpawn <= 0) {
        setIsRunning(false);
        return;
      }

      const newBalls: ActiveBall[] = [];
      for (let i = 0; i < toSpawn; i++) {
        newBalls.push({
          id: nextBallIdRef.current++,
          x: cx + (Math.random() - 0.5) * 6,
          y: 20 - i * 14,
          vx: (Math.random() - 0.5) * 0.4,
          vy: 1.8 + Math.random() * 0.4,
          row: 0,
          col: 0,
          color: BALL_COLORS[Math.floor(Math.random() * BALL_COLORS.length)],
          radius: 3.5,
          settled: false,
        });
      }

      activeBallsRef.current.push(...newBalls);
      setTotalDropped((prev) => prev + toSpawn);
      setIsCompleted(false);

      if (config.soundEnabled && toSpawn <= 5) {
        const now = performance.now();
        if (now - lastSoundTimeRef.current > 70) {
          audio.playClick();
          lastSoundTimeRef.current = now;
        }
      }
    },
    [targetN, totalDropped, config.soundEnabled]
  );

  // Instant simulation: fast-forwards remaining trials to reach target without waiting
  const instantSimulate = useCallback(() => {
    const remaining = targetN > 0 ? Math.max(0, targetN - totalDropped) : 250;
    if (remaining <= 0) return;

    // Fast binomial generation
    const newBins = [...binsRef.current];
    for (let i = 0; i < remaining; i++) {
      let col = 0;
      for (let r = 0; r < numRows; r++) {
        if (Math.random() < pBias) col++;
      }
      newBins[col]++;
    }

    binsRef.current = newBins;
    setBins([...newBins]);
    setTotalDropped((prev) => prev + remaining);
    activeBallsRef.current = [];
    setIsRunning(false);
    setIsCompleted(true);

    if (config.soundEnabled) audio.playSuccessChime();
  }, [targetN, totalDropped, numRows, pBias, config.soundEnabled]);

  const resetBoard = useCallback(() => {
    activeBallsRef.current = [];
    settledBallsRef.current = [];
    pegGlowsRef.current = [];
    setBins(new Array(numBins).fill(0));
    setTotalDropped(0);
    setIsRunning(false);
    setIsCompleted(false);
    if (config.soundEnabled) audio.playClick();
  }, [numBins, config.soundEnabled]);

  // Continuous Spawner Loop with Stop Criteria
  useEffect(() => {
    if (!isRunning) return;

    const intervalMs = speedMode === 'fast' ? 25 : 60;
    const batchSize = speedMode === 'fast' ? 4 : 2;

    const interval = setInterval(() => {
      if (targetN > 0 && totalDropped >= targetN) {
        setIsRunning(false);
        return;
      }
      spawnBatch(batchSize);
    }, intervalMs);

    return () => clearInterval(interval);
  }, [isRunning, targetN, totalDropped, speedMode, spawnBatch]);

  // Real-time Empirical & Theoretical Statistics + Goodness-of-Fit
  const stats = useMemo(() => {
    let sum = 0;
    let sumSq = 0;
    let count = 0;
    bins.forEach((cnt, idx) => {
      sum += cnt * idx;
      sumSq += cnt * idx * idx;
      count += cnt;
    });

    const theoreticalMean = numRows * pBias;
    const theoreticalVar = numRows * pBias * (1 - pBias);
    const theoreticalSigma = Math.sqrt(Math.max(0.001, theoreticalVar));

    if (count === 0) {
      return {
        count: 0,
        mean: 0,
        variance: 0,
        theoreticalMean,
        theoreticalVar,
        theoreticalSigma,
        rSquared: 0,
        targetProgress: 0,
      };
    }

    const mean = sum / count;
    const variance = Math.max(0, sumSq / count - mean * mean);

    // Compute R² Goodness of Fit to Gaussian Normal distribution
    let ssTot = 0;
    let ssRes = 0;
    const meanCount = count / numBins;

    for (let b = 0; b < numBins; b++) {
      const actual = bins[b];
      const z = (b - theoreticalMean) / theoreticalSigma;
      const pdf = (1 / (theoreticalSigma * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * z * z);
      const expected = pdf * count;

      ssTot += (actual - meanCount) ** 2;
      ssRes += (actual - expected) ** 2;
    }

    const rSquared = ssTot > 0 ? Math.max(0, Math.min(0.999, 1 - ssRes / ssTot)) : 0;
    const targetProgress = targetN > 0 ? Math.min(100, Math.round((count / targetN) * 100)) : 100;

    return {
      count,
      mean,
      variance,
      theoreticalMean,
      theoreticalVar,
      theoreticalSigma,
      rSquared,
      targetProgress,
    };
  }, [bins, numRows, pBias, numBins, targetN]);

  // Check completion when all active balls have settled
  useEffect(() => {
    if (!isRunning && targetN > 0 && totalDropped >= targetN && activeBallsRef.current.length === 0 && !isCompleted && totalDropped > 0) {
      setIsCompleted(true);
      if (config.soundEnabled) audio.playSuccess();
    }
  }, [isRunning, targetN, totalDropped, isCompleted, config.soundEnabled]);

  // Main 60 FPS Canvas Physics & Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const render = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      const w = rect.width;
      const h = rect.height;

      // Theme detection
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';

      ctx.clearRect(0, 0, w, h);

      // Coordinate anchors
      const cx = w / 2;
      const topFunnelY = 32;
      const pegFieldTopY = 56;
      const pegFieldH = Math.min(190, h * 0.44);
      const binTopY = pegFieldTopY + pegFieldH + 18;
      const binBottomY = h - 22;
      const binH = binBottomY - binTopY;

      const pegPitchX = Math.min(30, (w * 0.82) / (numRows + 1));
      const pegPitchY = pegFieldH / numRows;
      const binStartX = cx - (numBins * pegPitchX) / 2;

      // 1. Draw Top Dropper Funnel Guide
      ctx.strokeStyle = isLight ? 'rgba(0, 0, 0, 0.12)' : 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(cx - 24, 10);
      ctx.lineTo(cx - 8, topFunnelY);
      ctx.lineTo(cx - 8, topFunnelY + 12);
      ctx.moveTo(cx + 24, 10);
      ctx.lineTo(cx + 8, topFunnelY);
      ctx.lineTo(cx + 8, topFunnelY + 12);
      ctx.stroke();

      // 2. Draw Brass / Steel Peg Matrix
      const pegRadius = 2.8;
      for (let r = 0; r < numRows; r++) {
        const rowPegCount = r + 1;
        const rowStartX = cx - ((rowPegCount - 1) * pegPitchX) / 2;
        const py = pegFieldTopY + r * pegPitchY;

        for (let c = 0; c < rowPegCount; c++) {
          const px = rowStartX + c * pegPitchX;

          // Peg body
          ctx.beginPath();
          ctx.arc(px, py, pegRadius, 0, Math.PI * 2);
          ctx.fillStyle = isLight ? '#71717a' : '#d4d4d8';
          ctx.fill();

          // Specular highlight on pin head
          ctx.beginPath();
          ctx.arc(px - 0.7, py - 0.7, 0.9, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.fill();
        }
      }

      // 3. Draw Peg Glow Ripples
      const glows = pegGlowsRef.current;
      for (let i = glows.length - 1; i >= 0; i--) {
        const g = glows[i];
        ctx.strokeStyle = g.color;
        ctx.globalAlpha = g.life * 0.7;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(g.x, g.y, (1 - g.life) * 12 + pegRadius, 0, Math.PI * 2);
        ctx.stroke();

        g.life -= 0.08;
        if (g.life <= 0) {
          glows.splice(i, 1);
        }
      }
      ctx.globalAlpha = 1.0;

      // 4. Draw Collection Bins Vertical Slots
      ctx.strokeStyle = isLight ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 1;
      for (let b = 0; b <= numBins; b++) {
        const bx = binStartX + b * pegPitchX;
        ctx.beginPath();
        ctx.moveTo(bx, binTopY);
        ctx.lineTo(bx, binBottomY);
        ctx.stroke();
      }

      // Base shelf line
      ctx.strokeStyle = isLight ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.25)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(binStartX, binBottomY);
      ctx.lineTo(binStartX + numBins * pegPitchX, binBottomY);
      ctx.stroke();

      // 5. Update & Render Active Cascading Balls (Realistic 2D Plinko Physics)
      const balls = activeBallsRef.current;
      const gravity = 0.24;
      let binUpdated = false;

      for (let i = balls.length - 1; i >= 0; i--) {
        const ball = balls[i];

        ball.vy += gravity;
        ball.y += ball.vy;
        ball.x += ball.vx;

        // Damping air friction
        ball.vx *= 0.985;

        // Peg Row Collision & Binary Deflection
        if (ball.row < numRows) {
          const currentPegY = pegFieldTopY + ball.row * pegPitchY;
          if (ball.y >= currentPegY - ball.radius && ball.y <= currentPegY + pegPitchY * 0.5) {
            // Calculate which peg in this row the ball is striking
            const rowCount = ball.row + 1;
            const rowStartX = cx - ((rowCount - 1) * pegPitchX) / 2;
            const targetCol = Math.max(0, Math.min(rowCount - 1, ball.col));
            const pegX = rowStartX + targetCol * pegPitchX;

            const dx = ball.x - pegX;
            const dy = ball.y - currentPegY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < pegRadius + ball.radius + 3) {
              // Binary choice: bounce right (with probability pBias) or left
              const bounceRight = Math.random() < pBias;
              if (bounceRight) ball.col += 1;
              ball.row += 1;

              // Physical impulse: lateral push and elastic upward recoil
              const impulseX = (bounceRight ? 1 : -1) * (1.5 + Math.random() * 0.4);
              ball.vx = impulseX;
              ball.vy = -0.32 * Math.abs(ball.vy) + 0.4;
              ball.x = pegX + (bounceRight ? 2.5 : -2.5);

              // Peg light ripple
              pegGlowsRef.current.push({
                x: pegX,
                y: currentPegY,
                life: 1.0,
                color: ball.color,
              });

              // Micro-haptic sound tick (throttled)
              if (config.soundEnabled) {
                const now = performance.now();
                if (now - lastSoundTimeRef.current > 75) {
                  audio.playClick();
                  lastSoundTimeRef.current = now;
                }
              }
            }
          }
        }

        // Entering Bins: horizontal funneling into the correct vertical channel
        if (ball.y >= binTopY) {
          const targetBin = Math.max(0, Math.min(numBins - 1, ball.col));
          const slotCenterX = binStartX + targetBin * pegPitchX + pegPitchX / 2;
          ball.vx += (slotCenterX - ball.x) * 0.25;
          ball.vx *= 0.6; // channel damping

          // Landing on stack or bottom shelf
          const currentCount = binsRef.current[targetBin];
          const ballDiam = ball.radius * 2;
          const stackY = binBottomY - Math.min(binH - 12, currentCount * (ballDiam * 0.85) + ball.radius);

          if (ball.y >= stackY) {
            ball.settled = true;
            const newBins = [...binsRef.current];
            newBins[targetBin]++;
            binsRef.current = newBins;
            binUpdated = true;

            // Retain visual settled bead (capped for performance)
            if (settledBallsRef.current.length < 350) {
              settledBallsRef.current.push({
                x: slotCenterX + (Math.random() - 0.5) * (pegPitchX * 0.25),
                y: stackY,
                color: ball.color,
                radius: ball.radius,
              });
            }

            balls.splice(i, 1);
            continue;
          }
        }

        // Render Active Ball with 3D Radial Sphere Sheen
        const grad = ctx.createRadialGradient(
          ball.x - ball.radius * 0.35,
          ball.y - ball.radius * 0.35,
          ball.radius * 0.1,
          ball.x,
          ball.y,
          ball.radius
        );
        grad.addColorStop(0, '#ffffff');
        grad.addColorStop(0.35, ball.color);
        grad.addColorStop(1, '#000000');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      if (binUpdated) {
        setBins([...binsRef.current]);
      }

      // 6. Draw Settled Physical Beads in Bins
      const settled = settledBallsRef.current;
      for (let s = 0; s < settled.length; s++) {
        const sb = settled[s];
        ctx.fillStyle = sb.color;
        ctx.beginPath();
        ctx.arc(sb.x, sb.y, sb.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // 7. Draw Smooth Fluid Histogram Bars
      const maxBinVal = Math.max(1, ...binsRef.current);
      for (let b = 0; b < numBins; b++) {
        const count = binsRef.current[b];
        if (count === 0) continue;

        const bx = binStartX + b * pegPitchX;
        const barH = (count / maxBinVal) * (binH - 10);
        const by = binBottomY - barH;

        const grad = ctx.createLinearGradient(0, by, 0, binBottomY);
        if (isLight) {
          grad.addColorStop(0, 'rgba(14, 165, 233, 0.65)');
          grad.addColorStop(1, 'rgba(16, 185, 129, 0.45)');
        } else {
          grad.addColorStop(0, 'rgba(56, 189, 248, 0.7)');
          grad.addColorStop(1, 'rgba(168, 85, 247, 0.4)');
        }

        ctx.fillStyle = grad;
        ctx.fillRect(bx + 1.5, by, pegPitchX - 3, barH);

        // Individual count label atop each bin
        if (pegPitchX > 16) {
          ctx.fillStyle = isLight ? '#09090b' : '#fafafa';
          ctx.font = 'bold 9px monospace';
          ctx.textAlign = 'center';
          ctx.fillText(`${count}`, bx + pegPitchX / 2, by - 4);
        }
      }

      // 8. Draw Theoretical Gaussian Normal Overlay Envelope with Amber Glow Fill
      const totalCount = binsRef.current.reduce((a, b) => a + b, 0);
      if (totalCount >= 5) {
        const mu = numRows * pBias;
        const sigma = Math.sqrt(Math.max(0.001, numRows * pBias * (1 - pBias)));

        // Path for smooth Gaussian bell curve
        ctx.beginPath();
        const curvePoints: Array<{ x: number; y: number }> = [];

        // Sample along continuous x coordinates
        const stepCount = 50;
        for (let s = 0; s <= stepCount; s++) {
          const binCoord = (s / stepCount) * (numBins - 1);
          const px = binStartX + binCoord * pegPitchX + pegPitchX / 2;
          const z = (binCoord - mu) / sigma;
          const pdf = (1 / (sigma * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * z * z);
          const theoCount = pdf * totalCount;
          const barH = (theoCount / maxBinVal) * (binH - 10);
          const py = Math.max(binTopY, binBottomY - barH);

          curvePoints.push({ x: px, y: py });
          if (s === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }

        // Draw soft amber Gaussian glow envelope area
        ctx.save();
        ctx.lineTo(curvePoints[curvePoints.length - 1].x, binBottomY);
        ctx.lineTo(curvePoints[0].x, binBottomY);
        ctx.closePath();
        ctx.fillStyle = isLight ? 'rgba(245, 158, 11, 0.12)' : 'rgba(251, 191, 36, 0.15)';
        ctx.fill();
        ctx.restore();

        // Stroke the golden Gaussian curve line
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 2.5;
        ctx.stroke();

        // Draw Theoretical Mean (μ) Vertical Marker
        const meanX = binStartX + mu * pegPitchX + pegPitchX / 2;
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.moveTo(meanX, binTopY - 4);
        ctx.lineTo(meanX, binBottomY);
        ctx.stroke();
        ctx.setLineDash([]);

        // Label for μ
        ctx.fillStyle = '#f59e0b';
        ctx.font = 'bold 9px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(`μ=${mu.toFixed(1)}`, meanX, binTopY - 7);
      }

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [numRows, numBins, pBias]);

  return (
    <div className="flex flex-col gap-5 w-full select-none">
      {!compact && <PreCanvasBriefing content={CLT_PEDAGOGY} />}

      <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 lg:p-6 specular shadow-xl space-y-4">
        {/* =========================================================================
            HEADER & DUAL TARGET CONTROLS (STOP CRITERIA)
           ========================================================================= */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-subtle)] pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[var(--math-gradient)]/15 border border-[var(--math-gradient)]/30 flex items-center justify-center text-[var(--math-gradient)]">
              <Activity size={18} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[var(--text-primary)]">
                {language === 'ar' ? 'لوحة غالتون ومبرهنة النهاية المركزية' : 'Galton Plinko & Central Limit Theorem'}
              </h3>
              <p className="text-[11px] text-[var(--text-tertiary)]">
                {language === 'ar'
                  ? 'مراقبة التقارب الغاووسي الحتمي مع تراكم الانحرافات الثنائية المستقلة'
                  : 'Witness Gaussian bell convergence emerge from accumulated discrete coin flips'}
              </p>
            </div>
          </div>

          {/* Action Buttons: Run / Pause / Instant / Reset */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all shadow-sm cursor-pointer ${
                isRunning
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40 hover:bg-amber-500/30'
                  : 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:brightness-110 active:scale-95'
              }`}
            >
              {isRunning ? <Pause size={13} /> : <Play size={13} fill="currentColor" />}
              <span>
                {isRunning
                  ? (language === 'ar' ? 'إيقاف مؤقت' : 'Pause')
                  : (language === 'ar' ? 'إطلاق الكرات' : 'Drop Balls')}
              </span>
            </button>

            <button
              onClick={instantSimulate}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-sky-500/30 bg-sky-500/10 text-sky-400 hover:bg-sky-500/20 text-xs font-mono font-bold transition-colors cursor-pointer"
              title="Instantly simulate to target N without delay"
            >
              <Zap size={12} />
              <span>{language === 'ar' ? 'محاكاة فورية' : 'Instant ⚡'}</span>
            </button>

            <button
              onClick={resetBoard}
              className="p-2 rounded-xl border border-[var(--border-subtle)] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-colors cursor-pointer"
              title={language === 'ar' ? 'تصفير اللوحة' : 'Reset Board'}
            >
              <RotateCcw size={13} />
            </button>
          </div>
        </div>

        {/* =========================================================================
            STOP CRITERIA & SPEED PRESETS BAR
           ========================================================================= */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-[var(--bg-app)] border border-[var(--border-subtle)]">
          {/* Target Sample Size (Stop Criteria) */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-[var(--text-secondary)] font-semibold flex items-center gap-1">
              <CheckCircle2 size={12} className="text-[var(--math-vector)]" />
              {language === 'ar' ? 'معيار التوقف (N):' : 'Stop Criteria (Target N):'}
            </span>
            <div className="flex items-center gap-1">
              {[100, 250, 500, 1000, 0].map((n) => (
                <button
                  key={n}
                  onClick={() => {
                    setTargetN(n);
                    if (config.soundEnabled) audio.playClick();
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                    targetN === n
                      ? 'bg-[var(--text-primary)] text-[var(--bg-app)] shadow-sm'
                      : 'text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] bg-[var(--bg-surface)]'
                  }`}
                >
                  {n === 0 ? '∞' : n}
                </button>
              ))}
            </div>
          </div>

          {/* Speed Preset */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-[var(--text-tertiary)]">
              {language === 'ar' ? 'السرعة:' : 'Speed:'}
            </span>
            <div className="flex items-center gap-1 bg-[var(--bg-surface)] p-0.5 rounded-lg border border-[var(--border-subtle)]">
              <button
                onClick={() => setSpeedMode('normal')}
                className={`px-2 py-0.5 rounded text-[11px] font-mono transition-all ${
                  speedMode === 'normal'
                    ? 'bg-[var(--bg-app)] text-[var(--text-primary)] font-bold shadow-xs'
                    : 'text-[var(--text-tertiary)]'
                }`}
              >
                1x
              </button>
              <button
                onClick={() => setSpeedMode('fast')}
                className={`px-2 py-0.5 rounded text-[11px] font-mono transition-all ${
                  speedMode === 'fast'
                    ? 'bg-[var(--bg-app)] text-[var(--text-primary)] font-bold shadow-xs'
                    : 'text-[var(--text-tertiary)]'
                }`}
              >
                3x Fast
              </button>
            </div>
          </div>
        </div>

        {/* =========================================================================
            LIVE DIAGNOSTICS HUD & CONVERGENCE METRIC
           ========================================================================= */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {/* Sample Size + Progress */}
          <div className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-app)]">
            <div className="flex items-center justify-between text-[10px] font-mono text-[var(--text-tertiary)]">
              <span>{language === 'ar' ? 'حجم العينة N' : 'Sample Size N'}</span>
              {targetN > 0 && <span className="text-[var(--text-disabled)]">{stats.targetProgress}%</span>}
            </div>
            <div className="text-sm font-mono font-bold text-sky-400 tabular-nums mt-0.5">
              {stats.count.toLocaleString()}
              {targetN > 0 && <span className="text-xs text-[var(--text-tertiary)] font-normal"> / {targetN}</span>}
            </div>
            {targetN > 0 && (
              <div className="w-full h-1.5 rounded-full bg-[var(--border-subtle)] overflow-hidden mt-1.5">
                <div
                  className="h-full bg-gradient-to-r from-sky-500 to-emerald-400 transition-all duration-300"
                  style={{ width: `${stats.targetProgress}%` }}
                />
              </div>
            )}
          </div>

          {/* Sample Mean vs Theoretical */}
          <div className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-app)]">
            <span className="text-[10px] font-mono text-[var(--text-tertiary)] block">
              {language === 'ar' ? 'المتوسط التجريبي x̄' : 'Sample Mean x̄'}
            </span>
            <div className="text-sm font-mono font-bold text-emerald-400 tabular-nums mt-0.5">
              {stats.mean.toFixed(2)}
            </div>
            <span className="text-[10px] font-mono text-[var(--text-tertiary)]">
              μ* = {stats.theoreticalMean.toFixed(1)} (|Δ|={Math.abs(stats.mean - stats.theoreticalMean).toFixed(2)})
            </span>
          </div>

          {/* Sample Variance vs Theoretical */}
          <div className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-app)]">
            <span className="text-[10px] font-mono text-[var(--text-tertiary)] block">
              {language === 'ar' ? 'التباين s²' : 'Sample Variance s²'}
            </span>
            <div className="text-sm font-mono font-bold text-amber-400 tabular-nums mt-0.5">
              {stats.variance.toFixed(2)}
            </div>
            <span className="text-[10px] font-mono text-[var(--text-tertiary)]">
              σ*² = {stats.theoreticalVar.toFixed(2)}
            </span>
          </div>

          {/* CLT Goodness-of-Fit (R² to Gaussian) */}
          <div className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-app)]">
            <span className="text-[10px] font-mono text-[var(--text-tertiary)] block">
              {language === 'ar' ? 'توافق المنحنى R²' : 'Gaussian Fit (R²)'}
            </span>
            <div className="text-sm font-mono font-bold text-purple-400 tabular-nums mt-0.5 flex items-center gap-1">
              <Sparkles size={13} className="text-purple-400" />
              <span>{(stats.rSquared * 100).toFixed(1)}%</span>
            </div>
            <span className="text-[10px] font-mono text-[var(--text-tertiary)]">
              {stats.count < 30 ? (language === 'ar' ? 'تجميع العينات...' : 'Gathering noise...') : (language === 'ar' ? 'تقارب غاووسي' : 'Normal Convergence')}
            </span>
          </div>
        </div>

        {/* Completion Milestone Banner */}
        {isCompleted && (
          <div className="p-3.5 rounded-xl border border-emerald-500/40 bg-emerald-500/10 flex items-center justify-between gap-3 slide-up">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <CheckCircle2 size={16} />
              </div>
              <div className="text-xs">
                <span className="font-bold text-[var(--text-primary)]">
                  {language === 'ar'
                    ? `اكتملت التجربة بنجاح عند N = ${stats.count}!`
                    : `CLT Convergence Milestone Achieved at N = ${stats.count}!`}
                </span>
                <span className="block text-[11px] text-[var(--text-secondary)]">
                  {language === 'ar'
                    ? `تطابق التوزيع التجريبي مع المنحنى الغاووسي بنسبة ${(stats.rSquared * 100).toFixed(1)}% دون أي معرفة مسبقة بمسار كل كرة.`
                    : `The empirical distribution matches the theoretical Gaussian curve with ${(stats.rSquared * 100).toFixed(1)}% fidelity.`}
                </span>
              </div>
            </div>
            <button
              onClick={resetBoard}
              className="px-3 py-1.5 rounded-lg bg-emerald-500 text-black text-xs font-mono font-bold hover:brightness-110 active:scale-95 transition-transform shrink-0 cursor-pointer"
            >
              {language === 'ar' ? 'تجربة جديدة' : 'New Trial'}
            </button>
          </div>
        )}

        {/* =========================================================================
            CANVAS SIMULATION STAGE (TACTILE GALTON PLINKO)
           ========================================================================= */}
        <div className="relative w-full h-88 sm:h-96 rounded-2xl overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-app)] shadow-inner">
          <canvas ref={canvasRef} className="w-full h-full block" />

          {/* Top Funnel Entrance Badge */}
          <div className="absolute top-2.5 start-3 px-2 py-0.5 rounded-md bg-[var(--bg-surface)]/80 border border-[var(--border-subtle)] text-[10px] font-mono text-[var(--text-tertiary)] backdrop-blur-sm">
            {language === 'ar' ? 'مدخل الكرات العشوائية' : 'Stochastic Funnel'}
          </div>

          {/* Theoretical Curve Legend */}
          <div className="absolute top-2.5 end-3 px-2.5 py-1 rounded-md bg-[var(--bg-surface)]/85 border border-[var(--border-subtle)] text-[10px] font-mono flex items-center gap-2 backdrop-blur-md shadow-xs">
            <span className="w-3.5 h-1 rounded-full bg-amber-400" />
            <span className="text-[var(--text-secondary)] font-semibold">
              {language === 'ar' ? 'المنحنى النظري N(μ, σ²)' : 'Theoretical Normal N(μ, σ²)'}
            </span>
          </div>
        </div>

        {/* =========================================================================
            BIAS SLIDER (P = 0.50 SKEW CONTROL)
           ========================================================================= */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-3">
            <Sliders size={14} className="text-[var(--text-tertiary)]" />
            <span className="text-xs font-mono text-[var(--text-secondary)]">
              {language === 'ar' ? 'احتمال الانحراف يميناً (p):' : 'Right-Bounce Bias (p):'}{' '}
              <strong className="text-[var(--text-primary)] font-bold tabular-nums">{pBias.toFixed(2)}</strong>
            </span>
          </div>

          <div className="flex items-center gap-3 flex-1 max-w-sm">
            <span className="text-[10px] font-mono text-[var(--text-tertiary)]">0.2</span>
            <input
              type="range"
              min="0.2"
              max="0.8"
              step="0.05"
              value={pBias}
              onChange={(e) => {
                setPBias(parseFloat(e.target.value));
                resetBoard();
              }}
              className="flex-1 accent-[var(--math-gradient)] cursor-pointer"
            />
            <span className="text-[10px] font-mono text-[var(--text-tertiary)]">0.8</span>
            <span className="text-[10px] font-mono text-[var(--math-gradient)] font-bold shrink-0 min-w-20 text-end">
              {pBias < 0.48 ? '← Left Skew' : pBias > 0.52 ? 'Right Skew →' : 'Symmetric'}
            </span>
          </div>
        </div>
      </div>

      {!compact && <PostCanvasConsolidation content={CLT_PEDAGOGY} />}
    </div>
  );
};

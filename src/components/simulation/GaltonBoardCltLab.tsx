import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { useOkvirStore } from '@/lib/store';
import { audio } from '@/lib/audio';
import { PreCanvasBriefing, PostCanvasConsolidation, type TierContent } from '@/components/pedagogy/MultiTierDisclosure';
import {
  Play,
  Pause,
  RotateCcw,
  Activity,
  Sparkles,
  Zap,
  CheckCircle2,
  Sliders,
  Dices,
  BarChart3,
  TrendingDown,
  Info,
} from 'lucide-react';

interface ActiveBall {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetRow: number;
  targetCol: number;
  targetX: number;
  targetY: number;
  inChute: boolean;
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

interface BarBounceFlash {
  x: number;
  y: number;
  life: number;
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

// Vibrant tactile color palette
const BALL_PALETTE = ['#38bdf8', '#34d399', '#fbbf24', '#c084fc', '#f43f5e', '#a78bfa'];

export const GaltonBoardCltLab: React.FC<{ compact?: boolean }> = ({ compact }) => {
  const { language, config } = useOkvirStore();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Experiment Mode:
  // - 'galton': Physical Plinko Board (Bernoulli Trials)
  // - 'dice': Sum of Uniform Dice (Uniform -> Gaussian)
  // - 'skew': Exponential Waiting Times (Asymmetric -> Gaussian)
  const [labMode, setLabMode] = useState<'galton' | 'dice' | 'skew'>('galton');

  // Physical Galton Board Constants
  const numRows = 10;
  const numBins = numRows + 1;

  // Dice parameters
  const [numDice, setNumDice] = useState<number>(5); // k dice rolled per trial
  // Skewed parameters
  const [numSkewSamples, setNumSkewSamples] = useState<number>(10); // k exponential draws

  // Controls & Stop Criteria
  const [pBias, setPBias] = useState(0.5); // Right-bounce bias
  const [targetN, setTargetN] = useState<number>(250); // Stop criteria: 100, 250, 500, 1000, 0 (Infinite)
  const [gravityPreset, setGravityPreset] = useState<'earth' | 'lunar' | 'heavy'>('earth');
  const [restitutionVal, setRestitutionVal] = useState<number>(0.52); // Bounciness
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [speedMode, setSpeedMode] = useState<'normal' | 'fast'>('normal');

  // Empirical Data
  const [bins, setBins] = useState<number[]>(new Array(numBins).fill(0));
  const [totalDropped, setTotalDropped] = useState(0);

  // Animation & Physics Refs
  const activeBallsRef = useRef<ActiveBall[]>([]);
  const settledBallsRef = useRef<SettledBall[]>([]);
  const pegGlowsRef = useRef<PegGlow[]>([]);
  const barFlashesRef = useRef<BarBounceFlash[]>([]);
  const binsRef = useRef<number[]>(new Array(numBins).fill(0));
  binsRef.current = bins;
  const nextBallIdRef = useRef(1);
  const lastSoundTimeRef = useRef(0);

  // Gravity scalar mapping - snappy, responsive physical values
  const gravity = useMemo(() => {
    switch (gravityPreset) {
      case 'lunar':
        return 0.22;
      case 'heavy':
        return 0.72;
      case 'earth':
      default:
        return 0.46;
    }
  }, [gravityPreset]);

  // Reset function
  const resetBoard = useCallback(() => {
    activeBallsRef.current = [];
    settledBallsRef.current = [];
    pegGlowsRef.current = [];
    barFlashesRef.current = [];
    setBins(new Array(numBins).fill(0));
    setTotalDropped(0);
    setIsRunning(false);
    setIsCompleted(false);
    if (config.soundEnabled) audio.playClick();
  }, [numBins, config.soundEnabled]);

  // Handle Lab Mode Switch
  const switchMode = (mode: 'galton' | 'dice' | 'skew') => {
    setLabMode(mode);
    resetBoard();
  };

  // Dynamic Responsive Plinko Geometry & Coordinate Architecture
  const getLayout = useCallback(
    (w: number, h: number) => {
      const cx = w / 2;
      const topFunnelY = 32;
      const pegFieldTopY = 60;
      const pegFieldH = Math.min(230, h * 0.42);
      const pegPitchY = pegFieldH / numRows;
      const pegPitchX = Math.min(42, Math.max(26, (w * 0.88) / numBins));
      const binStartX = cx - (numBins * pegPitchX) / 2;
      const binTopY = pegFieldTopY + pegFieldH + 22;
      const binBottomY = h - 28;
      const binH = binBottomY - binTopY;

      const getPegX = (row: number, col: number) => {
        const rowCount = row + 1;
        const rowStartX = cx - ((rowCount - 1) * pegPitchX) / 2;
        return rowStartX + col * pegPitchX;
      };

      const getPegY = (row: number) => pegFieldTopY + row * pegPitchY;

      const getChuteCenterX = (binIdx: number) => binStartX + binIdx * pegPitchX + pegPitchX / 2;

      return {
        cx,
        topFunnelY,
        pegFieldTopY,
        pegFieldH,
        pegPitchY,
        pegPitchX,
        binStartX,
        binTopY,
        binBottomY,
        binH,
        getPegX,
        getPegY,
        getChuteCenterX,
      };
    },
    [numRows, numBins]
  );

  // Physical Galton Ball Spawner
  const spawnPhysicalBalls = useCallback(
    (count = 1) => {
      if (targetN > 0 && totalDropped >= targetN) {
        setIsRunning(false);
        return;
      }

      const canvas = canvasRef.current;
      const w = canvas ? canvas.getBoundingClientRect().width : 600;
      const h = canvas ? canvas.getBoundingClientRect().height : 540;
      const layout = getLayout(w, h);

      const toSpawn = targetN > 0 ? Math.min(count, targetN - totalDropped) : count;
      if (toSpawn <= 0) {
        setIsRunning(false);
        return;
      }

      const newBalls: ActiveBall[] = [];
      for (let i = 0; i < toSpawn; i++) {
        if (labMode === 'galton') {
          // Drops from funnel targeting top apex pin (row 0, col 0)
          newBalls.push({
            id: nextBallIdRef.current++,
            x: layout.cx + (Math.random() - 0.5) * 3,
            y: layout.topFunnelY - 6 - i * 14,
            vx: (Math.random() - 0.5) * 0.25,
            vy: 2.4 + Math.random() * 0.4,
            targetRow: 0,
            targetCol: 0,
            targetX: layout.cx,
            targetY: layout.getPegY(0),
            inChute: false,
            color: BALL_PALETTE[Math.floor(Math.random() * BALL_PALETTE.length)],
            radius: 3.8,
            settled: false,
          });
        } else if (labMode === 'dice') {
          // Sum of k uniform dice rolls
          let sum = 0;
          for (let d = 0; d < numDice; d++) {
            sum += Math.floor(Math.random() * 6) + 1;
          }
          const minPossible = numDice * 1;
          const maxPossible = numDice * 6;
          const normalized = (sum - minPossible) / Math.max(1, maxPossible - minPossible);
          const binIdx = Math.max(0, Math.min(numBins - 1, Math.round(normalized * (numBins - 1))));
          const chuteX = layout.getChuteCenterX(binIdx);

          newBalls.push({
            id: nextBallIdRef.current++,
            x: chuteX + (Math.random() - 0.5) * 3,
            y: layout.binTopY - 10 - i * 12,
            vx: (Math.random() - 0.5) * 0.3,
            vy: 2.8 + Math.random() * 0.4,
            targetRow: numRows,
            targetCol: binIdx,
            targetX: chuteX,
            targetY: layout.binTopY,
            inChute: true,
            color: BALL_PALETTE[Math.floor(Math.random() * BALL_PALETTE.length)],
            radius: 3.8,
            settled: false,
          });
        } else if (labMode === 'skew') {
          // Average of k skewed exponential random draws
          let sum = 0;
          for (let s = 0; s < numSkewSamples; s++) {
            sum += -Math.log(Math.max(1e-7, Math.random()));
          }
          const meanVal = sum / numSkewSamples;
          const stdDev = 1.0 / Math.sqrt(numSkewSamples);
          const zScore = (meanVal - 1.0) / stdDev;
          const binIdx = Math.max(0, Math.min(numBins - 1, Math.round(((zScore + 3) / 6) * (numBins - 1))));
          const chuteX = layout.getChuteCenterX(binIdx);

          newBalls.push({
            id: nextBallIdRef.current++,
            x: chuteX + (Math.random() - 0.5) * 3,
            y: layout.binTopY - 10 - i * 12,
            vx: (Math.random() - 0.5) * 0.3,
            vy: 2.8 + Math.random() * 0.4,
            targetRow: numRows,
            targetCol: binIdx,
            targetX: chuteX,
            targetY: layout.binTopY,
            inChute: true,
            color: BALL_PALETTE[Math.floor(Math.random() * BALL_PALETTE.length)],
            radius: 3.8,
            settled: false,
          });
        }
      }

      activeBallsRef.current.push(...newBalls);
      setTotalDropped((prev) => prev + toSpawn);
      setIsCompleted(false);

      if (config.soundEnabled && toSpawn <= 5) {
        const now = performance.now();
        if (now - lastSoundTimeRef.current > 75) {
          audio.playClick();
          lastSoundTimeRef.current = now;
        }
      }
    },
    [targetN, totalDropped, getLayout, labMode, numDice, numSkewSamples, numBins, numRows, config.soundEnabled]
  );

  // Fast Mathematical Batch Simulator (for Dice or Exponential modes or Instant button)
  const batchSimulateMathematical = useCallback(
    (trials: number) => {
      const newBins = [...binsRef.current];

      if (labMode === 'galton') {
        // Bernoulli binomial cascade
        for (let i = 0; i < trials; i++) {
          let col = 0;
          for (let r = 0; r < numRows; r++) {
            if (Math.random() < pBias) col++;
          }
          newBins[col]++;
        }
      } else if (labMode === 'dice') {
        // Sum of k uniform dice, mapped into 11 bins
        for (let i = 0; i < trials; i++) {
          let sum = 0;
          for (let d = 0; d < numDice; d++) {
            sum += Math.floor(Math.random() * 6) + 1; // 1 to 6
          }
          // Normalize sum between min (numDice * 1) and max (numDice * 6)
          const minPossible = numDice * 1;
          const maxPossible = numDice * 6;
          const normalized = (sum - minPossible) / Math.max(1, maxPossible - minPossible);
          const binIdx = Math.max(0, Math.min(numBins - 1, Math.round(normalized * (numBins - 1))));
          newBins[binIdx]++;
        }
      } else if (labMode === 'skew') {
        // Mean of k heavily skewed exponential variables Exp(1)
        for (let i = 0; i < trials; i++) {
          let sum = 0;
          for (let s = 0; s < numSkewSamples; s++) {
            // Inverse transform sampling for Exp(lambda=1): -ln(U)
            sum += -Math.log(Math.max(1e-7, Math.random()));
          }
          const meanVal = sum / numSkewSamples;
          // Theoretical mean is 1.0, map around center (bin 5)
          const stdDev = 1.0 / Math.sqrt(numSkewSamples);
          const zScore = (meanVal - 1.0) / stdDev;
          // Map z-score [-3, +3] to [0, 10]
          const binIdx = Math.max(0, Math.min(numBins - 1, Math.round(((zScore + 3) / 6) * (numBins - 1))));
          newBins[binIdx]++;
        }
      }

      binsRef.current = newBins;
      setBins([...newBins]);
      setTotalDropped((prev) => prev + trials);
      activeBallsRef.current = [];

      if (targetN > 0 && totalDropped + trials >= targetN) {
        setIsRunning(false);
        setIsCompleted(true);
        if (config.soundEnabled) audio.playSuccessChime();
      }
    },
    [labMode, numRows, pBias, numDice, numSkewSamples, numBins, targetN, totalDropped, config.soundEnabled]
  );

  // Instant Simulate to Target
  const instantComplete = useCallback(() => {
    const remaining = targetN > 0 ? Math.max(0, targetN - totalDropped) : 250;
    if (remaining <= 0) return;
    batchSimulateMathematical(remaining);
  }, [targetN, totalDropped, batchSimulateMathematical]);

  // Continuous Spawning Tick Loop
  useEffect(() => {
    if (!isRunning) return;

    const intervalMs = speedMode === 'fast' ? 35 : 75;
    const batchSize = speedMode === 'fast' ? 3 : 1;

    const interval = setInterval(() => {
      if (targetN > 0 && totalDropped >= targetN) {
        setIsRunning(false);
        return;
      }
      spawnPhysicalBalls(batchSize);
    }, intervalMs);

    return () => clearInterval(interval);
  }, [isRunning, targetN, totalDropped, speedMode, spawnPhysicalBalls]);

  // Theoretical Distribution Moments & Empirical Diagnostics
  const stats = useMemo(() => {
    let sum = 0;
    let sumSq = 0;
    let count = 0;
    bins.forEach((cnt, idx) => {
      sum += cnt * idx;
      sumSq += cnt * idx * idx;
      count += cnt;
    });

    let theoreticalMean = numRows * pBias;
    let theoreticalVar = numRows * pBias * (1 - pBias);

    if (labMode === 'dice') {
      theoreticalMean = (numBins - 1) / 2; // Symmetric center
      theoreticalVar = ((numBins - 1) ** 2) / (12 * numDice);
    } else if (labMode === 'skew') {
      theoreticalMean = (numBins - 1) / 2; // Normalized center
      theoreticalVar = 1.0;
    }

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

    // Compute R² goodness of fit against continuous Gaussian Normal envelope
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
  }, [bins, numRows, pBias, labMode, numDice, numBins, targetN]);

  // Check completion when all active physical balls settle
  useEffect(() => {
    if (
      !isRunning &&
      targetN > 0 &&
      totalDropped >= targetN &&
      activeBallsRef.current.length === 0 &&
      !isCompleted &&
      totalDropped > 0
    ) {
      setIsCompleted(true);
      if (config.soundEnabled) audio.playSuccess();
    }
  }, [isRunning, targetN, totalDropped, isCompleted, config.soundEnabled]);

  // =========================================================================
  // MAIN 60 FPS CANVAS RENDERING & RIGID 2D PLINKO PHYSICS ENGINE
  // =========================================================================
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

      const isLight = document.documentElement.getAttribute('data-theme') === 'light';

      ctx.clearRect(0, 0, w, h);

      const layout = getLayout(w, h);
      const pegRadius = 3.2;

      // ── 1. POLISHED METAL FUNNEL ──
      const funnelGrad = ctx.createLinearGradient(layout.cx - 32, 0, layout.cx + 32, 0);
      funnelGrad.addColorStop(0, isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.08)');
      funnelGrad.addColorStop(0.5, isLight ? 'rgba(0,0,0,0.18)' : 'rgba(255,255,255,0.22)');
      funnelGrad.addColorStop(1, isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.08)');

      ctx.strokeStyle = funnelGrad;
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(layout.cx - 34, 6);
      ctx.quadraticCurveTo(layout.cx - 18, layout.topFunnelY - 4, layout.cx - 8, layout.topFunnelY + 18);
      ctx.moveTo(layout.cx + 34, 6);
      ctx.quadraticCurveTo(layout.cx + 18, layout.topFunnelY - 4, layout.cx + 8, layout.topFunnelY + 18);
      ctx.stroke();

      // Funnel opening glow
      const funnelGlow = ctx.createRadialGradient(layout.cx, layout.topFunnelY + 4, 2, layout.cx, layout.topFunnelY + 4, 18);
      funnelGlow.addColorStop(0, isLight ? 'rgba(56,189,248,0.12)' : 'rgba(56,189,248,0.15)');
      funnelGlow.addColorStop(1, 'rgba(56,189,248,0)');
      ctx.fillStyle = funnelGlow;
      ctx.fillRect(layout.cx - 20, layout.topFunnelY - 6, 40, 28);

      // ── 2. PREMIUM PIN LATTICE (METALLIC 3D PINS) ──
      for (let r = 0; r < numRows; r++) {
        const rowCount = r + 1;
        const py = layout.getPegY(r);

        for (let c = 0; c < rowCount; c++) {
          const px = layout.getPegX(r, c);

          // Drop shadow
          ctx.beginPath();
          ctx.arc(px + 0.5, py + 1.8, pegRadius + 0.3, 0, Math.PI * 2);
          ctx.fillStyle = isLight ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.55)';
          ctx.fill();

          // Pin body with metallic gradient
          const pinGrad = ctx.createRadialGradient(px - 1, py - 1, 0.3, px, py, pegRadius);
          pinGrad.addColorStop(0, isLight ? '#d4d4d8' : '#fafafa');
          pinGrad.addColorStop(0.5, isLight ? '#a1a1aa' : '#d4d4d8');
          pinGrad.addColorStop(1, isLight ? '#71717a' : '#71717a');
          ctx.beginPath();
          ctx.arc(px, py, pegRadius, 0, Math.PI * 2);
          ctx.fillStyle = pinGrad;
          ctx.fill();

          // Rim stroke
          ctx.beginPath();
          ctx.arc(px, py, pegRadius, 0, Math.PI * 2);
          ctx.strokeStyle = isLight ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.08)';
          ctx.lineWidth = 0.5;
          ctx.stroke();

          // Crisp specular highlight
          ctx.beginPath();
          ctx.arc(px - 0.9, py - 0.9, 1.0, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255,255,255,0.85)';
          ctx.fill();
        }
      }

      // ── 3. PEG COLLISION RIPPLES ──
      const glows = pegGlowsRef.current;
      for (let i = glows.length - 1; i >= 0; i--) {
        const g = glows[i];
        const expandR = (1 - g.life) * 16 + pegRadius;
        ctx.strokeStyle = g.color;
        ctx.globalAlpha = g.life * 0.6;
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.arc(g.x, g.y, expandR, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = g.color;
        ctx.globalAlpha = g.life * 0.15;
        ctx.beginPath();
        ctx.arc(g.x, g.y, expandR * 0.6, 0, Math.PI * 2);
        ctx.fill();

        g.life -= 0.06;
        if (g.life <= 0) glows.splice(i, 1);
      }
      ctx.globalAlpha = 1.0;

      // ── 4. COLLECTION BIN DIVIDERS (frosted glass gradient) ──
      for (let b = 0; b <= numBins; b++) {
        const bx = layout.binStartX + b * layout.pegPitchX;
        const divGrad = ctx.createLinearGradient(bx, layout.binTopY, bx, layout.binBottomY);
        divGrad.addColorStop(0, isLight ? 'rgba(0,0,0,0.18)' : 'rgba(255,255,255,0.2)');
        divGrad.addColorStop(0.5, isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.08)');
        divGrad.addColorStop(1, isLight ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.15)');
        ctx.strokeStyle = divGrad;
        ctx.lineWidth = 1.3;
        ctx.beginPath();
        ctx.moveTo(bx, layout.binTopY);
        ctx.lineTo(bx, layout.binBottomY);
        ctx.stroke();
      }

      // Base Floor
      const floorGrad = ctx.createLinearGradient(layout.binStartX, 0, layout.binStartX + numBins * layout.pegPitchX, 0);
      floorGrad.addColorStop(0, isLight ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)');
      floorGrad.addColorStop(0.5, isLight ? 'rgba(0,0,0,0.28)' : 'rgba(255,255,255,0.35)');
      floorGrad.addColorStop(1, isLight ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)');
      ctx.strokeStyle = floorGrad;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(layout.binStartX, layout.binBottomY);
      ctx.lineTo(layout.binStartX + numBins * layout.pegPitchX, layout.binBottomY);
      ctx.stroke();

      // ── 5. BAR BOUNCE SPARKS ──
      const flashes = barFlashesRef.current;
      for (let i = flashes.length - 1; i >= 0; i--) {
        const f = flashes[i];
        ctx.globalAlpha = f.life * 0.9;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(f.x, f.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = isLight ? 'rgba(14,165,233,0.7)' : 'rgba(56,189,248,0.7)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(f.x, f.y, (1 - f.life) * 8 + 2, 0, Math.PI * 2);
        ctx.stroke();
        f.life -= 0.12;
        if (f.life <= 0) flashes.splice(i, 1);
      }
      ctx.globalAlpha = 1.0;

      // ── 6. PHYSICS UPDATE & BALL RENDERING (CRISP & SNAPPY, NO LINGERING TRACES) ──
      const balls = activeBallsRef.current;
      let binUpdated = false;

      for (let i = balls.length - 1; i >= 0; i--) {
        const ball = balls[i];

        ball.vx *= 0.994;

        if (!ball.inChute) {
          // ── Phase 1: Pascal Pin Field ──
          ball.vy += gravity;
          ball.y += ball.vy;
          ball.x += ball.vx;

          // Micro-guidance toward target pin
          const dx = ball.targetX - ball.x;
          ball.vx += dx * 0.055;

          const hitThreshold = ball.targetY - (pegRadius + ball.radius);
          if (ball.y >= hitThreshold) {
            ball.y = hitThreshold;
            ball.x = ball.targetX;

            // Ripple glow at peg contact
            pegGlowsRef.current.push({
              x: ball.targetX,
              y: ball.targetY,
              life: 1.0,
              color: ball.color,
            });

            if (config.soundEnabled) {
              const now = performance.now();
              if (now - lastSoundTimeRef.current > 40) {
                audio.playClick();
                lastSoundTimeRef.current = now;
              }
            }

            const bounceRight = Math.random() < pBias;

            if (ball.targetRow < numRows - 1) {
              const nextRow = ball.targetRow + 1;
              const nextCol = bounceRight ? ball.targetCol + 1 : ball.targetCol;
              const nextPegX = layout.getPegX(nextRow, nextCol);
              const nextPegY = layout.getPegY(nextRow);

              // Snappy glancing bounce off peg flank (fast, light deflection, not floaty)
              ball.vy = -restitutionVal * 0.5 - 0.2;

              const deltaY = nextPegY - ball.y;
              const disc = Math.sqrt(Math.max(0.1, ball.vy * ball.vy + 2 * gravity * deltaY));
              const timeFrames = Math.max(1, (-ball.vy + disc) / gravity);
              const deltaX = nextPegX - ball.x;
              ball.vx = deltaX / timeFrames;

              ball.targetRow = nextRow;
              ball.targetCol = nextCol;
              ball.targetX = nextPegX;
              ball.targetY = nextPegY;
            } else {
              // Reached bottom row of pins -> drop into collection chute
              const finalBin = bounceRight ? ball.targetCol + 1 : ball.targetCol;
              const chuteX = layout.getChuteCenterX(finalBin);

              ball.targetCol = finalBin;
              ball.targetX = chuteX;
              ball.targetY = layout.binTopY;
              ball.inChute = true;

              ball.vy = 0.8;
              ball.vx = (bounceRight ? 1 : -1) * (1.2 + Math.random() * 0.3);
            }
          }
        } else {
          // ── Phase 2: Vertical Chute Descent ──
          const targetBin = Math.max(0, Math.min(numBins - 1, ball.targetCol));
          const leftBarX = layout.binStartX + targetBin * layout.pegPitchX;
          const rightBarX = leftBarX + layout.pegPitchX;
          const chuteCenter = leftBarX + layout.pegPitchX / 2;

          ball.vy += gravity * 1.15;
          ball.y += ball.vy;
          ball.x += ball.vx;

          if (ball.x - ball.radius <= leftBarX) {
            ball.x = leftBarX + ball.radius;
            ball.vx = Math.abs(ball.vx) * restitutionVal + 0.2;
            barFlashesRef.current.push({ x: leftBarX, y: ball.y, life: 1.0 });
          } else if (ball.x + ball.radius >= rightBarX) {
            ball.x = rightBarX - ball.radius;
            ball.vx = -Math.abs(ball.vx) * restitutionVal - 0.2;
            barFlashesRef.current.push({ x: rightBarX, y: ball.y, life: 1.0 });
          }

          ball.vx += (chuteCenter - ball.x) * 0.08;
          ball.vx *= 0.92;

          const currentCount = binsRef.current[targetBin];
          const ballDiam = ball.radius * 2;
          const stackY = layout.binBottomY - Math.min(layout.binH - 22, currentCount * (ballDiam * 0.62) + ball.radius);

          if (ball.y >= stackY) {
            ball.settled = true;
            const newBins = [...binsRef.current];
            newBins[targetBin]++;
            binsRef.current = newBins;
            binUpdated = true;

            if (settledBallsRef.current.length < 500) {
              settledBallsRef.current.push({
                x: chuteCenter + (Math.random() - 0.5) * (layout.pegPitchX * 0.32),
                y: stackY,
                color: ball.color,
                radius: ball.radius,
              });
            }

            balls.splice(i, 1);
            continue;
          }
        }

        // ── Render Ball (Solid Rigid 3D Sphere, Zero Leftover Trace) ──
        // Soft contact drop shadow
        ctx.fillStyle = isLight ? 'rgba(0,0,0,0.12)' : 'rgba(0,0,0,0.35)';
        ctx.beginPath();
        ctx.arc(ball.x + 0.8, ball.y + 1.4, ball.radius, 0, Math.PI * 2);
        ctx.fill();

        // 3D Spherical metallic/acrylic body
        const ballGrad = ctx.createRadialGradient(
          ball.x - ball.radius * 0.35, ball.y - ball.radius * 0.35, ball.radius * 0.08,
          ball.x, ball.y, ball.radius
        );
        ballGrad.addColorStop(0, '#ffffff');
        ballGrad.addColorStop(0.3, ball.color);
        ballGrad.addColorStop(0.85, ball.color);
        ballGrad.addColorStop(1, isLight ? 'rgba(0,0,0,0.45)' : 'rgba(0,0,0,0.7)');

        ctx.fillStyle = ballGrad;
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fill();

        // Specular reflection glint
        ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
        ctx.beginPath();
        ctx.arc(ball.x - ball.radius * 0.32, ball.y - ball.radius * 0.32, ball.radius * 0.28, 0, Math.PI * 2);
        ctx.fill();
      }

      if (binUpdated) {
        setBins([...binsRef.current]);
      }

      // ── 7. SETTLED BEADS (depth shadows + 3D gradient) ──
      const settled = settledBallsRef.current;
      for (let s = 0; s < settled.length; s++) {
        const sb = settled[s];
        ctx.fillStyle = isLight ? 'rgba(0,0,0,0.06)' : 'rgba(0,0,0,0.25)';
        ctx.beginPath();
        ctx.ellipse(sb.x + 0.5, sb.y + 1.2, sb.radius * 0.85, sb.radius * 0.5, 0, 0, Math.PI * 2);
        ctx.fill();

        const beadGrad = ctx.createRadialGradient(
          sb.x - sb.radius * 0.25, sb.y - sb.radius * 0.25, sb.radius * 0.1,
          sb.x, sb.y, sb.radius
        );
        beadGrad.addColorStop(0, '#ffffff');
        beadGrad.addColorStop(0.35, sb.color);
        beadGrad.addColorStop(1, isLight ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.65)');
        ctx.fillStyle = beadGrad;
        ctx.beginPath();
        ctx.arc(sb.x, sb.y, sb.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── 8. HISTOGRAM BARS (rounded caps + glass shine) ──
      const maxBinVal = Math.max(1, ...binsRef.current);
      const barInset = 2;
      for (let b = 0; b < numBins; b++) {
        const count = binsRef.current[b];
        const bx = layout.binStartX + b * layout.pegPitchX;
        const barW = layout.pegPitchX - barInset * 2;

        ctx.fillStyle = isLight ? '#71717a' : '#a1a1aa';
        ctx.font = 'bold 10px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(`${b}`, bx + layout.pegPitchX / 2, layout.binBottomY + 16);

        if (count === 0) continue;

        const barH = (count / maxBinVal) * (layout.binH - 28);
        const by = layout.binBottomY - barH;
        const barRadius = Math.min(4, barW / 4);

        ctx.beginPath();
        ctx.moveTo(bx + barInset, layout.binBottomY);
        ctx.lineTo(bx + barInset, by + barRadius);
        ctx.quadraticCurveTo(bx + barInset, by, bx + barInset + barRadius, by);
        ctx.lineTo(bx + barInset + barW - barRadius, by);
        ctx.quadraticCurveTo(bx + barInset + barW, by, bx + barInset + barW, by + barRadius);
        ctx.lineTo(bx + barInset + barW, layout.binBottomY);
        ctx.closePath();

        const barGrad = ctx.createLinearGradient(0, by, 0, layout.binBottomY);
        if (isLight) {
          barGrad.addColorStop(0, 'rgba(14, 165, 233, 0.75)');
          barGrad.addColorStop(0.6, 'rgba(16, 185, 129, 0.55)');
          barGrad.addColorStop(1, 'rgba(16, 185, 129, 0.35)');
        } else {
          barGrad.addColorStop(0, 'rgba(56, 189, 248, 0.8)');
          barGrad.addColorStop(0.5, 'rgba(139, 92, 246, 0.5)');
          barGrad.addColorStop(1, 'rgba(168, 85, 247, 0.3)');
        }
        ctx.fillStyle = barGrad;
        ctx.fill();

        ctx.save();
        ctx.clip();
        const shineGrad = ctx.createLinearGradient(bx + barInset, 0, bx + barInset + barW, 0);
        shineGrad.addColorStop(0, 'rgba(255,255,255,0)');
        shineGrad.addColorStop(0.3, 'rgba(255,255,255,0.08)');
        shineGrad.addColorStop(0.5, 'rgba(255,255,255,0.15)');
        shineGrad.addColorStop(0.7, 'rgba(255,255,255,0.05)');
        shineGrad.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = shineGrad;
        ctx.fillRect(bx + barInset, by, barW, barH);
        ctx.restore();

        if (layout.pegPitchX > 16) {
          ctx.fillStyle = isLight ? '#09090b' : '#fafafa';
          ctx.font = 'bold 9px monospace';
          ctx.textAlign = 'center';
          ctx.fillText(`${count}`, bx + layout.pegPitchX / 2, by - 7);
        }
      }

      // ── 9. GAUSSIAN NORMAL CURVE (glowing dual-stroke + confidence bands) ──
      const totalCount = binsRef.current.reduce((a, b) => a + b, 0);
      if (totalCount >= 5) {
        let mu = numRows * pBias;
        let sigma = Math.sqrt(Math.max(0.001, numRows * pBias * (1 - pBias)));

        if (labMode === 'dice') {
          mu = (numBins - 1) / 2;
          sigma = Math.sqrt(((numBins - 1) ** 2) / (12 * numDice));
        } else if (labMode === 'skew') {
          mu = (numBins - 1) / 2;
          sigma = 1.0;
        }

        const sigma1Left = layout.binStartX + Math.max(0, mu - sigma) * layout.pegPitchX + layout.pegPitchX / 2;
        const sigma1Right = layout.binStartX + Math.min(numBins - 1, mu + sigma) * layout.pegPitchX + layout.pegPitchX / 2;
        const bandGrad = ctx.createLinearGradient(sigma1Left, layout.binTopY, sigma1Right, layout.binTopY);
        bandGrad.addColorStop(0, 'rgba(16,185,129,0)');
        bandGrad.addColorStop(0.3, isLight ? 'rgba(16,185,129,0.08)' : 'rgba(16,185,129,0.12)');
        bandGrad.addColorStop(0.5, isLight ? 'rgba(16,185,129,0.1)' : 'rgba(16,185,129,0.15)');
        bandGrad.addColorStop(0.7, isLight ? 'rgba(16,185,129,0.08)' : 'rgba(16,185,129,0.12)');
        bandGrad.addColorStop(1, 'rgba(16,185,129,0)');
        ctx.fillStyle = bandGrad;
        ctx.fillRect(sigma1Left, layout.binTopY, sigma1Right - sigma1Left, layout.binH);

        ctx.setLineDash([2, 4]);
        ctx.strokeStyle = isLight ? 'rgba(16,185,129,0.3)' : 'rgba(16,185,129,0.35)';
        ctx.lineWidth = 1;
        [sigma1Left, sigma1Right].forEach((lx) => {
          ctx.beginPath();
          ctx.moveTo(lx, layout.binTopY);
          ctx.lineTo(lx, layout.binBottomY);
          ctx.stroke();
        });
        ctx.setLineDash([]);

        const curvePoints: Array<{ x: number; y: number }> = [];
        const stepCount = 80;
        for (let s = 0; s <= stepCount; s++) {
          const binCoord = (s / stepCount) * (numBins - 1);
          const px = layout.binStartX + binCoord * layout.pegPitchX + layout.pegPitchX / 2;
          const z = (binCoord - mu) / sigma;
          const pdf = (1 / (sigma * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * z * z);
          const theoCount = pdf * totalCount;
          const curveBarH = (theoCount / maxBinVal) * (layout.binH - 28);
          const py = Math.max(layout.binTopY, layout.binBottomY - curveBarH);
          curvePoints.push({ x: px, y: py });
        }

        ctx.beginPath();
        curvePoints.forEach((pt, idx) => idx === 0 ? ctx.moveTo(pt.x, pt.y) : ctx.lineTo(pt.x, pt.y));
        ctx.lineTo(curvePoints[curvePoints.length - 1].x, layout.binBottomY);
        ctx.lineTo(curvePoints[0].x, layout.binBottomY);
        ctx.closePath();
        const areaGrad = ctx.createLinearGradient(0, layout.binTopY, 0, layout.binBottomY);
        areaGrad.addColorStop(0, isLight ? 'rgba(251,191,36,0.18)' : 'rgba(251,191,36,0.2)');
        areaGrad.addColorStop(1, isLight ? 'rgba(245,158,11,0.03)' : 'rgba(245,158,11,0.04)');
        ctx.fillStyle = areaGrad;
        ctx.fill();

        ctx.beginPath();
        curvePoints.forEach((pt, idx) => idx === 0 ? ctx.moveTo(pt.x, pt.y) : ctx.lineTo(pt.x, pt.y));
        ctx.strokeStyle = isLight ? 'rgba(245,158,11,0.2)' : 'rgba(251,191,36,0.25)';
        ctx.lineWidth = 5;
        ctx.stroke();

        ctx.beginPath();
        curvePoints.forEach((pt, idx) => idx === 0 ? ctx.moveTo(pt.x, pt.y) : ctx.lineTo(pt.x, pt.y));
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 2.5;
        ctx.stroke();

        const meanX = layout.binStartX + mu * layout.pegPitchX + layout.pegPitchX / 2;
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(meanX, layout.binTopY - 6);
        ctx.lineTo(meanX, layout.binBottomY);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = '#f59e0b';
        ctx.font = 'bold 10px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(`μ=${mu.toFixed(1)}`, meanX, layout.binTopY - 10);

        ctx.fillStyle = isLight ? 'rgba(16,185,129,0.7)' : 'rgba(16,185,129,0.8)';
        ctx.font = 'bold 8px monospace';
        ctx.fillText('-1σ', sigma1Left, layout.binTopY - 4);
        ctx.fillText('+1σ', sigma1Right, layout.binTopY - 4);
      }

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [numRows, numBins, pBias, gravity, restitutionVal, labMode, numDice, getLayout, config.soundEnabled]);

  return (
    <div className="flex flex-col gap-5 w-full select-none">
      {!compact && <PreCanvasBriefing content={CLT_PEDAGOGY} />}

      <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 lg:p-6 specular shadow-xl space-y-4">
        {/* =========================================================================
            HEADER & LAB MODE SWITCHER (GALTON / UNIFORM DICE / SKEWED EXPONENTIAL)
           ========================================================================= */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-subtle)] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[var(--math-gradient)]/15 border border-[var(--math-gradient)]/30 flex items-center justify-center text-[var(--math-gradient)] shadow-inner">
              <Activity size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-bold text-[var(--text-primary)]">
                  {language === 'ar' ? 'لوحة غالتون ومبرهنة النهاية المركزية' : 'Galton Plinko & The CLT Engine'}
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  {language === 'ar' ? 'فيزياء حية 2D' : 'Rigid 2D Physics'}
                </span>
              </div>
              <p className="text-[11px] text-[var(--text-tertiary)] mt-0.5">
                {language === 'ar'
                  ? 'اصطدامات فيزيائية حقيقية، ارتدادات بين القضبان، وتقارب حتمي نحو التوزيع الطبيعي'
                  : 'Continuous rigid collision dynamics, channel bar bounces, and inevitable Gaussian convergence'}
              </p>
            </div>
          </div>

          {/* 3-Way Mode Switcher: Galton Plinko | Uniform Dice | Skewed Noise */}
          <div className="flex items-center p-1 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-app)]">
            <button
              onClick={() => switchMode('galton')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-lg transition-all cursor-pointer ${
                labMode === 'galton'
                  ? 'bg-[var(--bg-surface-hover)] text-[var(--text-primary)] shadow-sm font-semibold'
                  : 'text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]'
              }`}
              title="Physical Galton Plinko Pin Cascade (Binomial)"
            >
              <BarChart3 size={13} className="text-sky-400" />
              <span>{language === 'ar' ? 'لوحة غالتون' : 'Galton Plinko'}</span>
            </button>

            <button
              onClick={() => switchMode('dice')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-lg transition-all cursor-pointer ${
                labMode === 'dice'
                  ? 'bg-[var(--bg-surface-hover)] text-[var(--text-primary)] shadow-sm font-semibold'
                  : 'text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]'
              }`}
              title="Sum of Uniform Dice Rolls (Flat Uniform -> Bell Curve)"
            >
              <Dices size={13} className="text-emerald-400" />
              <span>{language === 'ar' ? 'رميات النرد' : 'Dice Sums'}</span>
            </button>

            <button
              onClick={() => switchMode('skew')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-lg transition-all cursor-pointer ${
                labMode === 'skew'
                  ? 'bg-[var(--bg-surface-hover)] text-[var(--text-primary)] shadow-sm font-semibold'
                  : 'text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]'
              }`}
              title="Average of Skewed Exponential Noise (Long Tail -> Bell Curve)"
            >
              <TrendingDown size={13} className="text-amber-400" />
              <span>{language === 'ar' ? 'ضوضاء ملتوية' : 'Skewed Noise'}</span>
            </button>
          </div>
        </div>

        {/* =========================================================================
            PRIMARY ACTION CONTROLS & STOP CRITERIA
           ========================================================================= */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-[var(--bg-app)] border border-[var(--border-subtle)]">
          {/* Action Buttons: Drop Balls / Pause / Instant / Reset */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all shadow-md cursor-pointer ${
                isRunning
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40 hover:bg-amber-500/30'
                  : 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:brightness-110 active:scale-95'
              }`}
            >
              {isRunning ? <Pause size={14} /> : <Play size={14} fill="currentColor" />}
              <span>
                {isRunning
                  ? (language === 'ar' ? 'إيقاف مؤقت' : 'Pause')
                  : (language === 'ar' ? 'إطلاق الكرات' : 'Release Cascade')}
              </span>
            </button>

            <button
              onClick={instantComplete}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-sky-500/30 bg-sky-500/10 text-sky-400 hover:bg-sky-500/20 text-xs font-mono font-bold transition-colors cursor-pointer"
              title="Instantly simulate to target N without waiting"
            >
              <Zap size={13} />
              <span>{language === 'ar' ? 'محاكاة فورية' : 'Instant ⚡'}</span>
            </button>

            <button
              onClick={resetBoard}
              className="p-2 rounded-xl border border-[var(--border-subtle)] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-colors cursor-pointer"
              title={language === 'ar' ? 'تصفير اللوحة' : 'Reset Experiment'}
            >
              <RotateCcw size={14} />
            </button>
          </div>

          {/* Stop Criteria (Target N Presets) */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-[var(--text-secondary)] font-semibold flex items-center gap-1">
              <CheckCircle2 size={13} className="text-[var(--math-vector)]" />
              {language === 'ar' ? 'معيار التوقف (N):' : 'Stop Criteria (Target N):'}
            </span>
            <div className="flex items-center gap-1 bg-[var(--bg-surface)] p-1 rounded-xl border border-[var(--border-subtle)]">
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
                      : 'text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]'
                  }`}
                >
                  {n === 0 ? '∞ Stream' : n}
                </button>
              ))}
            </div>
          </div>

          {/* Speed Preset */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-[var(--text-tertiary)]">
              {language === 'ar' ? 'التدفق:' : 'Rate:'}
            </span>
            <div className="flex items-center gap-1 bg-[var(--bg-surface)] p-0.5 rounded-lg border border-[var(--border-subtle)]">
              <button
                onClick={() => setSpeedMode('normal')}
                className={`px-2.5 py-0.5 rounded text-[11px] font-mono transition-all ${
                  speedMode === 'normal'
                    ? 'bg-[var(--bg-app)] text-[var(--text-primary)] font-bold shadow-xs'
                    : 'text-[var(--text-tertiary)]'
                }`}
              >
                1x
              </button>
              <button
                onClick={() => setSpeedMode('fast')}
                className={`px-2.5 py-0.5 rounded text-[11px] font-mono transition-all ${
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
            LIVE DIAGNOSTICS HUD & CLT GOODNESS-OF-FIT
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
              {stats.count < 30 ? (language === 'ar' ? 'تجميع الضوضاء...' : 'Gathering noise...') : (language === 'ar' ? 'تقارب غاووسي حتمي' : 'Normal Convergence')}
            </span>
          </div>
        </div>

        {/* Milestone Completion Banner */}
        {isCompleted && (
          <div className="p-4 rounded-xl border border-emerald-500/40 bg-emerald-500/10 flex items-center justify-between gap-3 slide-up">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <CheckCircle2 size={18} />
              </div>
              <div className="text-xs">
                <span className="font-bold text-[var(--text-primary)] text-sm">
                  {language === 'ar'
                    ? `اكتملت التجربة بنجاح عند N = ${stats.count}!`
                    : `CLT Convergence Milestone Achieved at N = ${stats.count}!`}
                </span>
                <span className="block text-[11px] text-[var(--text-secondary)] mt-0.5">
                  {language === 'ar'
                    ? `تطابق التوزيع التجريبي مع المنحنى الغاووسي بنسبة ${(stats.rSquared * 100).toFixed(1)}%. تثبت هذه النتيجة أن مجموع الضوضاء المستقلة يمحو العشوائية الفردية حتماً.`
                    : `The empirical distribution matches the theoretical Gaussian curve with ${(stats.rSquared * 100).toFixed(1)}% fidelity. Microscopic noise has washed away into macroscopic order.`}
                </span>
              </div>
            </div>
            <button
              onClick={resetBoard}
              className="px-3.5 py-2 rounded-xl bg-emerald-500 text-black text-xs font-mono font-bold hover:brightness-110 active:scale-95 transition-transform shrink-0 cursor-pointer shadow-sm"
            >
              {language === 'ar' ? 'تجربة جديدة' : 'New Trial'}
            </button>
          </div>
        )}

        {/* =========================================================================
            CANVAS SIMULATION STAGE (TACTILE PLINKO WITH ACCURATE CHANNEL BOUNCES)
           ========================================================================= */}
        <div className="relative w-full h-[520px] sm:h-[560px] rounded-2xl overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-app)] shadow-inner">
          <canvas ref={canvasRef} className="w-full h-full block" />

          {/* Top Funnel Entrance Badge */}
          <div className="absolute top-2.5 start-3 px-2.5 py-1 rounded-lg bg-[var(--bg-surface)]/85 border border-[var(--border-subtle)] text-[10px] font-mono text-[var(--text-tertiary)] backdrop-blur-md shadow-xs flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
            <span>
              {labMode === 'galton'
                ? (language === 'ar' ? 'مدخل الكرات العشوائية' : 'Stochastic Funnel')
                : labMode === 'dice'
                ? (language === 'ar' ? `مجموع ${numDice} أحجار نرد منتظمة` : `Sum of ${numDice} Uniform Dice`)
                : (language === 'ar' ? `متوسط ${numSkewSamples} عينات ملتوية` : `Mean of ${numSkewSamples} Skewed Draws`)}
            </span>
          </div>

          {/* Theoretical Curve Legend */}
          <div className="absolute top-2.5 end-3 px-2.5 py-1 rounded-lg bg-[var(--bg-surface)]/85 border border-[var(--border-subtle)] text-[10px] font-mono flex items-center gap-2 backdrop-blur-md shadow-xs">
            <span className="w-3.5 h-1 rounded-full bg-amber-400" />
            <span className="text-[var(--text-secondary)] font-semibold">
              {language === 'ar' ? 'المنحنى النظري N(μ, σ²)' : 'Theoretical Normal N(μ, σ²)'}
            </span>
          </div>

          {/* 68% Empirical Confidence Band Badge */}
          <div className="absolute bottom-2.5 end-3 px-2 py-0.5 rounded-md bg-[var(--bg-surface)]/80 border border-emerald-500/30 text-[9px] font-mono text-emerald-400 backdrop-blur-sm">
            <span>±1σ (68.2% Band)</span>
          </div>
        </div>

        {/* =========================================================================
            ADVANCED PHYSICAL & PARAMETRIC CONTROLS (RESPONSIVE LAB FOOTER)
           ========================================================================= */}
        <div className="space-y-3 pt-1">
          {/* Mode 1: Galton Board Specific Controls (Right Bias + Gravity + Restitution) */}
          {labMode === 'galton' && (
            <div className="p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-app)] space-y-3">
              {/* Row 1: Right Bias Slider with full width breathability */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3">
                <div className="flex items-center gap-2 shrink-0">
                  <Sliders size={14} className="text-sky-400 shrink-0" />
                  <span className="text-xs font-mono text-[var(--text-secondary)]">
                    {language === 'ar' ? 'احتمال الانحراف (p):' : 'Right Bias (p):'}{' '}
                    <strong className="text-[var(--text-primary)] tabular-nums">{pBias.toFixed(2)}</strong>
                  </span>
                </div>

                <div className="flex items-center gap-3 flex-1">
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
                    className="flex-1 accent-sky-400 cursor-pointer min-w-28"
                  />
                  <span className="text-[11px] font-mono font-bold shrink-0 px-2.5 py-0.5 rounded-md bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-amber-400 shadow-xs">
                    {pBias < 0.48
                      ? (language === 'ar' ? '← انحراف لليسار' : '← Left Skew')
                      : pBias > 0.52
                      ? (language === 'ar' ? 'انحراف لليمين →' : 'Right Skew →')
                      : (language === 'ar' ? 'متماثل' : 'Symmetric')}
                  </span>
                </div>
              </div>

              {/* Row 2: Physics Environment (Gravity & Bounce) with clean hairline divider */}
              <div className="pt-2.5 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-3 text-xs">
                {/* Gravity Environment */}
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-[var(--text-tertiary)] shrink-0">
                    {language === 'ar' ? 'الجاذبية:' : 'Gravity:'}
                  </span>
                  <div className="flex items-center gap-1 bg-[var(--bg-surface)] p-0.5 rounded-lg border border-[var(--border-subtle)]">
                    {(['lunar', 'earth', 'heavy'] as const).map((g) => (
                      <button
                        key={g}
                        onClick={() => setGravityPreset(g)}
                        className={`px-2.5 py-1 rounded-md text-[10px] font-mono capitalize transition-all cursor-pointer ${
                          gravityPreset === g
                            ? 'bg-[var(--bg-app)] text-[var(--text-primary)] font-bold shadow-xs'
                            : 'text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]'
                        }`}
                      >
                        {g === 'lunar'
                          ? (language === 'ar' ? 'قمرية' : 'Lunar')
                          : g === 'earth'
                          ? (language === 'ar' ? 'أرضية' : 'Earth')
                          : (language === 'ar' ? 'ثقيلة' : 'Heavy')}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bounciness / Restitution */}
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-[var(--text-tertiary)] shrink-0">
                    {language === 'ar' ? 'المرونة:' : 'Bounce:'}
                  </span>
                  <div className="flex items-center gap-1 bg-[var(--bg-surface)] p-0.5 rounded-lg border border-[var(--border-subtle)]">
                    {[
                      { val: 0.35, label: language === 'ar' ? 'رصاص' : 'Lead' },
                      { val: 0.52, label: language === 'ar' ? 'صلب' : 'Steel' },
                      { val: 0.75, label: language === 'ar' ? 'نابض' : 'Spring' },
                    ].map(({ val, label }) => (
                      <button
                        key={val}
                        onClick={() => setRestitutionVal(val)}
                        className={`px-2.5 py-1 rounded-md text-[10px] font-mono transition-all cursor-pointer ${
                          restitutionVal === val
                            ? 'bg-[var(--bg-app)] text-[var(--text-primary)] font-bold shadow-xs'
                            : 'text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Mode 2: Dice Sum Controls (Number of Dice k) */}
          {labMode === 'dice' && (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-app)]">
              <div className="flex items-center gap-3">
                <Dices size={16} className="text-emerald-400 shrink-0" />
                <span className="text-xs font-mono text-[var(--text-secondary)]">
                  {language === 'ar' ? 'عدد النرد المستقل في كل رمية (k):' : 'Number of Independent Dice (k):'}{' '}
                  <strong className="text-emerald-400 font-bold">{numDice} Dice</strong>
                </span>
              </div>

              <div className="flex items-center gap-1.5 flex-wrap">
                {[1, 2, 5, 10, 30].map((k) => (
                  <button
                    key={k}
                    onClick={() => {
                      setNumDice(k);
                      resetBoard();
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                      numDice === k
                        ? 'bg-emerald-500 text-black shadow-sm'
                        : 'text-[var(--text-tertiary)] bg-[var(--bg-surface)] hover:text-[var(--text-secondary)]'
                    }`}
                  >
                    {k === 1 ? 'k=1 (Flat)' : k === 2 ? 'k=2 (Triangle)' : `k=${k}`}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Mode 3: Skewed Exponential Controls (k Samples) */}
          {labMode === 'skew' && (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-app)]">
              <div className="flex items-center gap-3">
                <TrendingDown size={16} className="text-amber-400 shrink-0" />
                <span className="text-xs font-mono text-[var(--text-secondary)]">
                  {language === 'ar' ? 'حجم العينة لحساب المتوسط (k):' : 'Sample Size for Averaging (k):'}{' '}
                  <strong className="text-amber-400 font-bold">{numSkewSamples} Draws</strong>
                </span>
              </div>

              <div className="flex items-center gap-1.5 flex-wrap">
                {[1, 2, 5, 15, 50].map((k) => (
                  <button
                    key={k}
                    onClick={() => {
                      setNumSkewSamples(k);
                      resetBoard();
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                      numSkewSamples === k
                        ? 'bg-amber-400 text-black shadow-sm'
                        : 'text-[var(--text-tertiary)] bg-[var(--bg-surface)] hover:text-[var(--text-secondary)]'
                    }`}
                  >
                    {k === 1 ? 'k=1 (Heavily Skewed)' : `k=${k}`}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {!compact && <PostCanvasConsolidation content={CLT_PEDAGOGY} />}
    </div>
  );
};

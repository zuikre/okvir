import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { useOkvirStore } from '@/lib/store';
import { audio } from '@/lib/audio';
import { PreCanvasBriefing, PostCanvasConsolidation, type TierContent } from '@/components/pedagogy/MultiTierDisclosure';
import { Play, Pause, RotateCcw, Plus, Activity } from 'lucide-react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  row: number;
  col: number;
  settled: boolean;
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
n_pegs = 12
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

export const GaltonBoardCltLab: React.FC<{ compact?: boolean }> = ({ compact }) => {
  const { language, config } = useOkvirStore();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const numRows = 10;
  const numBins = numRows + 1;

  const [pBias, setPBias] = useState(0.5); // Probability of bouncing right
  const [isRunning, setIsRunning] = useState(false);
  const [bins, setBins] = useState<number[]>(new Array(numBins).fill(0));
  const [totalDropped, setTotalDropped] = useState(0);

  const particlesRef = useRef<Particle[]>([]);
  const binsRef = useRef<number[]>(new Array(numBins).fill(0));
  binsRef.current = bins;

  // Particle color palette
  const colors = ['#38bdf8', '#10b981', '#f59e0b', '#a855f7'];

  // Spawn new particles
  const spawnParticles = useCallback((count = 1) => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      newParticles.push({
        x: 0,
        y: -10 - i * 14,
        vx: 0,
        vy: 2.5 + Math.random() * 0.8,
        row: 0,
        col: 0,
        settled: false,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    particlesRef.current.push(...newParticles);
    setTotalDropped((prev) => prev + count);
    if (config.soundEnabled && count <= 5) audio.playClick();
  }, [config.soundEnabled, colors]);

  const resetBoard = () => {
    particlesRef.current = [];
    setBins(new Array(numBins).fill(0));
    setTotalDropped(0);
    setIsRunning(false);
    if (config.soundEnabled) audio.playClick();
  };

  // Continuous generation loop
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning) {
      interval = setInterval(() => {
        spawnParticles(2);
      }, 70);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, spawnParticles]);

  // Statistics calculation
  const stats = useMemo(() => {
    let sum = 0;
    let sumSq = 0;
    let count = 0;
    bins.forEach((cnt, idx) => {
      sum += cnt * idx;
      sumSq += cnt * idx * idx;
      count += cnt;
    });

    if (count === 0) return { mean: 0, variance: 0, theoreticalMean: numRows * pBias, theoreticalVar: numRows * pBias * (1 - pBias) };

    const mean = sum / count;
    const variance = sumSq / count - mean * mean;
    return {
      mean,
      variance,
      theoreticalMean: numRows * pBias,
      theoreticalVar: numRows * pBias * (1 - pBias),
    };
  }, [bins, numRows, pBias]);

  // Main 60 FPS Animation & Canvas Loop
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

      ctx.clearRect(0, 0, w, h);

      const topMargin = 30;
      const pegFieldH = h * 0.48;
      const binBottomY = h - 20;
      const binTopY = topMargin + pegFieldH + 20;
      const binH = binBottomY - binTopY;
      const cx = w / 2;
      const pegPitchX = Math.min(28, (w * 0.8) / numRows);
      const pegPitchY = pegFieldH / numRows;

      // 1. Draw Pegs
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      for (let r = 0; r < numRows; r++) {
        const rowPegCount = r + 1;
        const rowStartX = cx - ((rowPegCount - 1) * pegPitchX) / 2;
        const rowY = topMargin + r * pegPitchY;

        for (let c = 0; c < rowPegCount; c++) {
          const px = rowStartX + c * pegPitchX;
          ctx.beginPath();
          ctx.arc(px, rowY, 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 2. Draw Bins Separators
      const binStartX = cx - ((numBins - 1) * pegPitchX) / 2 - pegPitchX / 2;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 1;
      for (let b = 0; b <= numBins; b++) {
        const bx = binStartX + b * pegPitchX;
        ctx.beginPath();
        ctx.moveTo(bx, binTopY);
        ctx.lineTo(bx, binBottomY);
        ctx.stroke();
      }

      // 3. Update & Draw Active Particles
      const particles = particlesRef.current;
      const maxBinVal = Math.max(1, ...binsRef.current);
      let updatedBins = false;

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        if (!p.settled) {
          p.y += p.vy;
          p.x += p.vx;
          p.vy += 0.18; // gravity

          // Check peg collision
          if (p.row < numRows) {
            const currentPegY = topMargin + p.row * pegPitchY;
            if (p.y >= currentPegY) {
              // Peg deflection: bounce left or right based on pBias
              const goesRight = Math.random() < pBias;
              if (goesRight) p.col += 1;
              p.row += 1;

              const targetX = cx - (p.row * pegPitchX) / 2 + p.col * pegPitchX;
              p.vx = (targetX - p.x) * 0.28;
              p.vy = 1.2; // dampen downward velocity after bounce
            }
          }

          // Check bin landing
          if (p.y >= binTopY) {
            p.settled = true;
            const landedBin = Math.max(0, Math.min(numBins - 1, p.col));
            const newBins = [...binsRef.current];
            newBins[landedBin] += 1;
            binsRef.current = newBins;
            updatedBins = true;
            particles.splice(i, 1); // remove settled particle from memory to prevent memory leaks
            continue;
          }

          // Draw falling particle
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(cx + p.x, p.y, 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      if (updatedBins) {
        setBins([...binsRef.current]);
      }

      // 4. Draw Accumulated Bins Histogram
      for (let b = 0; b < numBins; b++) {
        const count = binsRef.current[b];
        if (count === 0) continue;

        const bx = binStartX + b * pegPitchX;
        const barH = (count / maxBinVal) * (binH - 8);
        const by = binBottomY - barH;

        const grad = ctx.createLinearGradient(0, by, 0, binBottomY);
        grad.addColorStop(0, 'rgba(56, 189, 248, 0.85)');
        grad.addColorStop(1, 'rgba(168, 85, 247, 0.5)');

        ctx.fillStyle = grad;
        ctx.fillRect(bx + 1.5, by, pegPitchX - 3, barH);

        // Count label if enough space
        if (count > 0 && pegPitchX > 18) {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
          ctx.font = '9px monospace';
          ctx.textAlign = 'center';
          ctx.fillText(`${count}`, bx + pegPitchX / 2, by - 4);
        }
      }

      // 5. Draw Theoretical Gaussian Normal Overlay Curve
      const totalCount = binsRef.current.reduce((a, b) => a + b, 0);
      if (totalCount > 10) {
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 2.5;
        ctx.setLineDash([4, 3]);
        ctx.beginPath();

        const mu = numRows * pBias;
        const sigma = Math.sqrt(numRows * pBias * (1 - pBias));

        for (let b = 0; b < numBins; b++) {
          const bx = binStartX + b * pegPitchX + pegPitchX / 2;
          // Normal probability density
          const z = (b - mu) / sigma;
          const pdf = (1 / (sigma * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * z * z);
          // Scale to canvas bin height
          const theoCount = pdf * totalCount;
          const barH = (theoCount / maxBinVal) * (binH - 8);
          const py = binBottomY - barH;

          if (b === 0) ctx.moveTo(bx, py);
          else ctx.lineTo(bx, py);
        }
        ctx.stroke();
        ctx.setLineDash([]);
      }

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [numRows, numBins, pBias]);

  return (
    <div className="flex flex-col gap-5 w-full">
      {!compact && <PreCanvasBriefing content={CLT_PEDAGOGY} />}

      <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 lg:p-6 specular shadow-xl space-y-4">
        {/* Header & Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-subtle)] pb-4">
          <div className="flex items-center gap-2">
            <Activity size={18} className="text-[var(--math-gradient)]" />
            <h3 className="text-sm font-bold text-[var(--text-primary)]">
              {language === 'ar' ? 'لوحة غالتون ومبرهنة النهاية المركزية' : 'Galton Board & Central Limit Theorem'}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                isRunning
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                  : 'bg-[var(--math-vector)] text-black hover:brightness-110'
              }`}
            >
              {isRunning ? <Pause size={12} /> : <Play size={12} fill="currentColor" />}
              <span>{isRunning ? (language === 'ar' ? 'إيقاف' : 'Pause') : (language === 'ar' ? 'تدفق مستمر' : 'Stream')}</span>
            </button>

            <button
              onClick={() => spawnParticles(25)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-app)] text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-colors"
            >
              <Plus size={12} />
              <span>+25</span>
            </button>

            <button
              onClick={() => spawnParticles(100)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-app)] text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-colors"
            >
              <Plus size={12} />
              <span>+100</span>
            </button>

            <button
              onClick={resetBoard}
              className="p-1.5 rounded-lg border border-[var(--border-subtle)] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors"
              title={language === 'ar' ? 'تصفير' : 'Reset'}
            >
              <RotateCcw size={13} />
            </button>
          </div>
        </div>

        {/* Live Diagnostics HUD */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-app)]">
            <span className="text-[10px] font-mono text-[var(--text-tertiary)] block">
              {language === 'ar' ? 'إجمالي الكرات' : 'Sample Size N'}
            </span>
            <span className="text-xs font-mono font-bold text-[#38bdf8] tabular-nums">
              {totalDropped.toLocaleString()}
            </span>
          </div>

          <div className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-app)]">
            <span className="text-[10px] font-mono text-[var(--text-tertiary)] block">
              {language === 'ar' ? 'المتوسط التجريبي x̄' : 'Sample Mean x̄'}
            </span>
            <span className="text-xs font-mono font-bold text-[#10b981] tabular-nums">
              {stats.mean.toFixed(2)} (μ*={stats.theoreticalMean.toFixed(1)})
            </span>
          </div>

          <div className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-app)]">
            <span className="text-[10px] font-mono text-[var(--text-tertiary)] block">
              {language === 'ar' ? 'التباين s²' : 'Sample Variance s²'}
            </span>
            <span className="text-xs font-mono font-bold text-[var(--math-gradient)] tabular-nums">
              {stats.variance.toFixed(2)} (σ*²={stats.theoreticalVar.toFixed(1)})
            </span>
          </div>

          <div className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-app)]">
            <span className="text-[10px] font-mono text-[var(--text-tertiary)] block">
              {language === 'ar' ? 'احتمال الانحراف p' : 'Right-Bounce Bias p'}
            </span>
            <span className="text-xs font-mono font-bold text-[#a855f7] tabular-nums">
              p = {pBias.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Canvas Simulation Area */}
        <div className="relative w-full h-84 rounded-xl overflow-hidden border border-[var(--border-subtle)] bg-black/45 select-none">
          <canvas ref={canvasRef} className="w-full h-full block" />

          {/* Theoretical Curve Legend */}
          <div className="absolute top-3 end-3 px-2.5 py-1 rounded-md bg-black/75 border border-white/10 text-[10px] font-mono flex items-center gap-2 backdrop-blur-md">
            <span className="w-3 h-0.5 border-t-2 border-dashed border-amber-400" />
            <span className="text-[var(--text-secondary)]">
              {language === 'ar' ? 'المنحنى النظري N(μ, σ²)' : 'Theoretical Normal N(μ, σ²)'}
            </span>
          </div>
        </div>

        {/* Bias Slider */}
        <div className="flex items-center gap-4 pt-1">
          <span className="text-xs font-mono text-[var(--text-secondary)] shrink-0">
            {language === 'ar' ? 'انحياز الارتداد (p)' : 'Bounce Probability (p)'}:{' '}
            <strong className="text-[var(--text-primary)] tabular-nums">{pBias.toFixed(2)}</strong>
          </span>
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
          <span className="text-[10px] font-mono text-[var(--text-tertiary)]">
            {pBias < 0.48 ? '← Left Skew' : pBias > 0.52 ? 'Right Skew →' : 'Symmetric'}
          </span>
        </div>
      </div>

      {!compact && <PostCanvasConsolidation content={CLT_PEDAGOGY} />}
    </div>
  );
};

import React, { useState, useEffect, useMemo } from 'react';
import { useOkvirStore } from '@/lib/store';
import { audio } from '@/lib/audio';
import { PreCanvasBriefing, PostCanvasConsolidation, TierContent } from '@/components/pedagogy/MultiTierDisclosure';
import { Play, Pause, RotateCcw, Cpu, HardDrive, Zap, Info } from 'lucide-react';

interface Props {
  compact?: boolean;
}

const FLASH_PEDAGOGY: TierContent = {
  intuition: {
    analogy: {
      en: 'Standard attention is like calculating a massive 10,000-page multiplication table on a desk, writing the whole table down in a distant warehouse (HBM), then reading it back. FlashAttention tiles the problem into small blocks that fit directly in your hands (fast SRAM), calculating rolling running maximums and sums on the fly without ever writing the intermediate table to disk.',
      ar: 'الانتباه التقليدي أشبه بحساب جدول ضرب ضخم من 10,000 صفحة، وتخزين الجدول بالكامل في مستودع بعيد بطيء (HBM)، ثم قراءته مجدداً. أما FlashAttention فيقوم بتقسيم المصفوفات إلى قوالب صغيرة تناسب يدك تماماً (ذاكرة SRAM السريعة)، حاسباً النهايات العظمى والمجاميع التراكمية آنياً دون كتابة المصفوفة الوسيطة في الذاكرة البعيدة إطلاقاً.',
    },
    keyTakeaway: {
      en: 'GPU compute is cheap (FLOPs), but memory transfer (HBM memory bandwidth) is the critical bottleneck. FlashAttention-2 achieves a 2x-4x wall-clock speedup not by doing fewer FLOPs, but by eliminating high-bandwidth memory IO bottlenecks through GPU tiling and online softmax rescaling.',
      ar: 'حسابات المعالج الرسومي فائقة السرعة، لكن نقل البيانات من وإلى ذاكرة HBM هو عنق الزجاجة الخانق. يحقق FlashAttention تسريعاً عملياً بمقدار 2x-4x ليس بتقليل العمليات الحسابية، بل بإلغاء حركة نقل البيانات البطيئة عبر التقطيع المتوازي ومعايرة Softmax المباشرة.',
    },
  },
  geometry: {
    visualDescription: {
      en: 'The N×N attention score matrix S = QK^T is sliced into blocks of size Br × Bc. Each SRAM tile accumulates the unnormalized attention output while maintaining a running row maximum m and normalization sum l, rescaling prior accumulators by exp(m_old - m_new).',
      ar: 'تُقسّم مصفوفة درجات الانتباه S = QK^T ذات البعد N×N إلى قوالب بحجم Br × Bc. يجمع كل قالب في SRAM مخرجات الانتباه مع الاحتفاظ بالحد الأقصى للصف m ومجموع التسوية l، مع إعادة معايرة التراكم السابق بعامل exp(m_old - m_new).',
    },
    conservedQuantity: {
      en: 'Mathematical equivalence: The online rescaled output is algebraically identical to standard softmax attention with machine-precision fidelity: O_i = softmax(Q_i K^T) V.',
      ar: 'التطابق الرياضي الصارم: الناتج المعاد وزنه عبر التدرج الآني مطابق جبرياً لدالة Softmax القياسية بدقة الفاصلة العائمة: O_i = softmax(Q_i K^T) V.',
    },
  },
  formal: {
    equation: '\\mathbf{O}_i = \\sum_{j} \\frac{e^{\\mathbf{S}_{ij} - m_i}}{\\ell_i} \\mathbf{V}_j, \\quad m_i = \\max_j(\\mathbf{S}_{ij}), \\quad \\ell_i = \\sum_j e^{\\mathbf{S}_{ij} - m_i}',
    derivationSteps: [
      {
        step: 'm_{\\text{new}} = \\max(m_{\\text{old}}, \\tilde{m}), \\quad \\tilde{m} = \\max(\\mathbf{S}_{ij})',
        note: {
          en: 'Row max updated online without waiting for entire sequence',
          ar: 'تحديث الحد الأقصى للصف آنياً دون انتظار اكتمال التتابع كاملاً',
        },
      },
      {
        step: '\\mathbf{O}_{\\text{new}} = \\mathbf{O}_{\\text{old}} e^{m_{\\text{old}} - m_{\\text{new}}} + e^{\\mathbf{S}_{ij} - m_{\\text{new}}} \\mathbf{V}_j',
        note: {
          en: 'Prior accumulator scaled by exponential difference factor',
          ar: 'إعادة موازنة التراكم السابق بفرق الأُسس لضمان الدقة العددية',
        },
      },
    ],
  },
  code: {
    snippet: `def flash_attention_forward(Q, K, V, B_r=128, B_c=128):
    # Online softmax tiling without materializing N x N matrix
    N, d = Q.shape
    O = torch.zeros_like(Q)
    l = torch.zeros(N, 1)
    m = torch.full((N, 1), float('-inf'))
    for j in range(0, N, B_c):
        K_j, V_j = K[j:j+B_c], V[j:j+B_c]
        for i in range(0, N, B_r):
            Q_i = Q[i:i+B_r]
            S_ij = (Q_i @ K_j.T) / (d ** 0.5)
            m_tilde = S_ij.max(dim=-1, keepdim=True).values
            m_new = torch.maximum(m[i:i+B_r], m_tilde)
            P_tilde = torch.exp(S_ij - m_new)
            l_new = torch.exp(m[i:i+B_r] - m_new) * l[i:i+B_r] + P_tilde.sum(-1, keepdim=True)
            O[i:i+B_r] = torch.exp(m[i:i+B_r] - m_new) * O[i:i+B_r] + P_tilde @ V_j
            m[i:i+B_r], l[i:i+B_r] = m_new, l_new
    return O / l`,
    explanation: {
      en: 'Iterates through SRAM tiles in outer and inner loops, performing online softmax rescaling without materializing the N x N attention matrix.',
      ar: 'يمر عبر قوالب SRAM في حلقات تكرار خارجية وداخلية، منفذاً إعادة المعايرة الآنية لـ Softmax دون تخزين مصفوفة N × N في الذاكرة.',
    },
  },
};

export const FlashAttentionTilingLab: React.FC<Props> = ({ compact = false }) => {
  const { language, config } = useOkvirStore();

  const [seqLen, setSeqLen] = useState<number>(2048);
  const [blockSize, setBlockSize] = useState<number>(128);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const numTiles = Math.max(4, Math.min(8, Math.floor(seqLen / blockSize)));
  const totalSteps = numTiles * numTiles;

  const currentQTile = Math.floor(currentStep / numTiles);
  const currentKVTile = currentStep % numTiles;

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStep((prev) => {
          const next = (prev + 1) % totalSteps;
          return next;
        });
      }, 700);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, totalSteps]);

  const hbmTrafficStandardMB = useMemo(() => {
    // Standard: writes N^2 attention matrix + reads N^2 to multiply by V
    // 2 bytes per float16: 2 * (N^2 + N^2) * 2 bytes = 8 * N^2 bytes
    const bytes = 4 * seqLen * seqLen * 2;
    return (bytes / (1024 * 1024)).toFixed(1);
  }, [seqLen]);

  const hbmTrafficFlashMB = useMemo(() => {
    // FlashAttention: Only reads Q, K, V and writes O: 4 * N * d * 2 bytes
    const d = 128;
    const bytes = 4 * seqLen * d * 2;
    return (bytes / (1024 * 1024)).toFixed(2);
  }, [seqLen]);

  const ioSpeedup = useMemo(() => {
    const std = parseFloat(hbmTrafficStandardMB);
    const flash = parseFloat(hbmTrafficFlashMB);
    if (flash <= 0) return '1.0';
    return (std / flash).toFixed(1);
  }, [hbmTrafficStandardMB, hbmTrafficFlashMB]);

  return (
    <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto p-4 sm:p-6 select-none font-sans">
      {!compact && <PreCanvasBriefing content={FLASH_PEDAGOGY} />}

      {/* Main Interactive Studio */}
      <div className="relative rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 space-y-6 shadow-xl backdrop-blur-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Zap size={20} />
            </div>
            <div>
              <h2 className="text-base font-bold text-[var(--text-primary)]">
                {language === 'ar' ? 'مختبر تقطيع FlashAttention-2 والذاكرة الحسابية' : 'FlashAttention-2 SRAM Tiling & IO Studio'}
              </h2>
              <p className="text-xs text-[var(--text-secondary)] font-mono">
                {language === 'ar' ? 'تتبع مسار القوالب بين HBM وذاكرة SRAM السريعة مع إعادة معايرة Softmax المباشرة' : 'Trace GPU tile traversal between slow HBM & fast on-chip SRAM with online softmax'}
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setIsPlaying(!isPlaying);
                if (config.soundEnabled) audio.playClick();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--math-gradient)]/15 border border-[var(--math-gradient)]/40 text-[var(--math-gradient)] hover:bg-[var(--math-gradient)]/25 text-xs font-mono transition-colors"
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} />}
              <span>{isPlaying ? (language === 'ar' ? 'إيقاف' : 'Pause') : (language === 'ar' ? 'تشغيل' : 'Animate')}</span>
            </button>
            <button
              onClick={() => {
                setIsPlaying(false);
                setCurrentStep(0);
                if (config.soundEnabled) audio.playClick();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-hover)] text-xs font-mono transition-colors"
            >
              <RotateCcw size={14} />
              <span>{language === 'ar' ? 'إعادة ضبط' : 'Reset'}</span>
            </button>
          </div>
        </div>

        {/* Sliders Configuration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono bg-[var(--bg-app)] p-4 rounded-xl border border-[var(--border-subtle)]">
          <div className="space-y-1.5">
            <div className="flex justify-between text-[var(--text-secondary)]">
              <span>{language === 'ar' ? 'طول التتابع (N):' : 'Sequence Length (N):'}</span>
              <span className="text-amber-400 font-bold">{seqLen} tokens</span>
            </div>
            <input
              type="range"
              min="512"
              max="4096"
              step="512"
              value={seqLen}
              onChange={(e) => {
                setSeqLen(Number(e.target.value));
                setCurrentStep(0);
              }}
              className="w-full accent-amber-500"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-[var(--text-secondary)]">
              <span>{language === 'ar' ? 'حجم القالب في SRAM (Br, Bc):' : 'SRAM Tile Size (Br, Bc):'}</span>
              <span className="text-sky-400 font-bold">{blockSize} tokens</span>
            </div>
            <input
              type="range"
              min="64"
              max="256"
              step="64"
              value={blockSize}
              onChange={(e) => {
                setBlockSize(Number(e.target.value));
                setCurrentStep(0);
              }}
              className="w-full accent-sky-500"
            />
          </div>
        </div>

        {/* Visual Architecture Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: The N x N Attention Matrix Tile Grid */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[var(--text-secondary)] flex items-center gap-1.5">
                <HardDrive size={14} className="text-rose-400" />
                {language === 'ar' ? 'مصفوفة الانتباه الافتراضية (غير مخزنة في HBM)' : 'Virtual Attention Score Grid S = QKᵀ (Zero HBM materialization)'}
              </span>
              <span className="text-emerald-400 font-bold">
                Tile [{currentQTile}, {currentKVTile}] / [{numTiles - 1}, {numTiles - 1}]
              </span>
            </div>

            <div
              className="grid gap-1.5 p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-app)]"
              style={{
                gridTemplateColumns: `repeat(${numTiles}, minmax(0, 1fr))`,
              }}
            >
              {Array.from({ length: numTiles }).map((_, r) =>
                Array.from({ length: numTiles }).map((_, c) => {
                  const isActive = r === currentQTile && c === currentKVTile;
                  const isProcessed = r < currentQTile || (r === currentQTile && c < currentKVTile);

                  return (
                    <div
                      key={`${r}-${c}`}
                      className={`aspect-square rounded-lg flex flex-col items-center justify-center p-1 border transition-all duration-300 text-[10px] font-mono ${
                        isActive
                          ? 'border-[var(--math-gradient)] bg-[var(--math-gradient)]/25 text-[var(--math-gradient)] shadow-lg scale-105 z-10 animate-pulse font-bold'
                          : isProcessed
                          ? 'border-[var(--math-vector)]/40 bg-[var(--math-vector)]/10 text-[var(--math-vector)]'
                          : 'border-[var(--border-subtle)] bg-[var(--bg-surface)]/60 text-[var(--text-secondary)]/50'
                      }`}
                    >
                      <span>Q{r}·K{c}ᵀ</span>
                      {isActive && <span className="text-[8px] text-[var(--math-gradient)] font-bold">SRAM</span>}
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Right: On-Chip Fast SRAM Registers & Online Rescaling */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-xl border border-sky-500/30 bg-sky-950/20 p-4 space-y-3">
              <div className="flex items-center gap-2 text-sky-400 text-xs font-mono font-bold">
                <Cpu size={16} />
                <span>{language === 'ar' ? 'حالة مسجلات ذاكرة SRAM السريعة (20 MB)' : 'On-Chip SRAM Fast Buffers (20 MB)'}</span>
              </div>

              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between p-2 rounded bg-[var(--bg-app)] border border-sky-500/20">
                  <span className="text-[var(--text-secondary)]">Loaded Q Block:</span>
                  <span className="text-sky-400 font-bold">Tile Q_{currentQTile} ({blockSize}×128)</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-[var(--bg-app)] border border-sky-500/20">
                  <span className="text-[var(--text-secondary)]">Loaded K, V Block:</span>
                  <span className="text-sky-400 font-bold">Tile K_{currentKVTile}, V_{currentKVTile} ({blockSize}×128)</span>
                </div>
              </div>

              {/* Online Softmax Rescaling Formula Live Box */}
              <div className="rounded-lg bg-[var(--bg-app)] p-3 border border-amber-500/30 space-y-1.5 text-[11px] font-mono text-amber-600 dark:text-amber-200">
                <div className="text-[10px] text-amber-500 uppercase font-bold tracking-wider flex items-center gap-1">
                  <Info size={12} />
                  <span>{language === 'ar' ? 'معادلة المعايرة المباشرة (Online Softmax)' : 'Online Rescaling Update Step'}</span>
                </div>
                <div className="text-xs text-[var(--text-primary)] font-bold">
                  m_new = max(m_old, max(S_tile))
                </div>
                <div className="text-[10px] text-[var(--text-secondary)]">
                  P_tile = exp(S_tile - m_new)
                </div>
                <div className="text-[10px] text-emerald-500 dark:text-emerald-400 font-semibold">
                  O_accum = O_accum · exp(m_old - m_new) + P_tile · V_tile
                </div>
              </div>
            </div>

            {/* IO Telemetry Comparison */}
            <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-app)] p-4 space-y-2.5 font-mono text-xs">
              <div className="text-[11px] text-[var(--text-secondary)] font-bold uppercase tracking-wider">
                {language === 'ar' ? 'مقارنة نقل الذاكرة (Memory IO Traffic)' : 'Memory Bandwidth IO Footprint'}
              </div>

              <div className="flex justify-between items-center text-[var(--math-loss)]">
                <span>Standard Attention HBM IO:</span>
                <span className="font-bold">{hbmTrafficStandardMB} MB</span>
              </div>

              <div className="flex justify-between items-center text-[var(--math-vector)]">
                <span>FlashAttention-2 HBM IO:</span>
                <span className="font-bold">{hbmTrafficFlashMB} MB</span>
              </div>

              <div className="pt-1 border-t border-[var(--border-subtle)] flex justify-between items-center text-[var(--math-gradient)] font-bold">
                <span>IO Bandwidth Speedup:</span>
                <span className="px-2 py-0.5 rounded bg-[var(--math-gradient)]/15 border border-[var(--math-gradient)]/40 text-[var(--math-gradient)]">
                  {ioSpeedup}x Faster
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {!compact && <PostCanvasConsolidation content={FLASH_PEDAGOGY} />}
    </div>
  );
};

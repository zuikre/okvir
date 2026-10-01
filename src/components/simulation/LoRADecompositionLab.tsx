import React, { useState } from 'react';
import { useOkvirStore } from '@/lib/store';
import { audio } from '@/lib/audio';
import { PreCanvasBriefing, PostCanvasConsolidation, TierContent } from '@/components/pedagogy/MultiTierDisclosure';
import { Layers, ShieldCheck, Flame } from 'lucide-react';

interface Props {
  compact?: boolean;
}

const LORA_PEDAGOGY: TierContent = {
  intuition: {
    analogy: {
      en: 'Fine-tuning a 70-billion parameter model directly is like rewriting an entire encyclopedia by hand just to learn medical terminology. LoRA leaves the encyclopedia completely frozen and attaches a tiny 2-page pocket glossary (B×A) that modifies only the relevant domain concepts.',
      ar: 'إعادة ضبط نموذج ضخم بـ 70 مليار معامل يشبه إعادة كتابة موسوعة كاملة بخط اليد فقط لتعلم مصطلحات طبية. يترك LoRA الموسوعة مجمدة تماماً، ويرفق معها كتيّباً صغيراً من صفحتين (B×A) يعالج فقط المفاهيم التخصصية المطلوبة.',
    },
    keyTakeaway: {
      en: 'Weight updates ΔW during task adaptation have a very low intrinsic rank (Aghajanyan et al.). LoRA parameterizes the update as ΔW = B·A, reducing trainable parameter count and optimizer memory footprint by 99% while matching full fine-tuning performance.',
      ar: 'تمتلك تحديثات الأوزان ΔW أثناء التكيف مع المهام رتبة جوهرية منخفضة جداً. يحلل LoRA هذا التحديث إلى ΔW = B·A، مما يقلل المعاملات القابلة للتدريب وذاكرة المُحسّن بنسبة 99% مع تحقيق أداء يضاهي الضبط الكامل.',
    },
  },
  geometry: {
    visualDescription: {
      en: 'The N×K linear transformation W = W0 + ΔW is decomposed such that ΔW passes through an intrinsic rank bottleneck of dimension r << min(d, k). Matrix A projects down from k to r, and matrix B projects back up from r to d.',
      ar: 'يُحلل التحويل الخطي W = W0 + ΔW بحيث يمر التحديث عبر عنق زجاجة ذي رتبة جوهرية r << min(d, k). تقوم المصفوفة A بالإسقاط من k إلى r، ثم تعيد المصفوفة B الإسقاط من r إلى d.',
    },
    conservedQuantity: {
      en: 'Zero Inference Latency: At deployment time, the adapter weights can be permanently folded into the base model: W_deployed = W0 + (alpha / r) * (B · A). There is zero additional memory lookup or runtime overhead during generation.',
      ar: 'انعدام تأخير الاستدلال: عند النشر، يمكن دمج أوزان المحول بشكل دائم في النموذج الأساسي W_deployed = W0 + (alpha / r) * (B · A)، مما يلغي أي عبء إضافي في زمن التشغيل أثناء التوليد.',
    },
  },
  formal: {
    equation: '\\mathbf{h} = \\mathbf{W}_0 \\mathbf{x} + \\Delta \\mathbf{W} \\mathbf{x} = \\mathbf{W}_0 \\mathbf{x} + \\frac{\\alpha}{r} \\mathbf{B}\\mathbf{A}\\mathbf{x}',
    derivationSteps: [
      {
        step: '\\mathbf{W}_0 \\in \\mathbb{R}^{d \\times k}, \\quad \\mathbf{B} \\in \\mathbb{R}^{d \\times r}, \\quad \\mathbf{A} \\in \\mathbb{R}^{r \\times k}, \\quad r \\ll \\min(d, k)',
        note: {
          en: 'Low-rank factor matrices parameterizing intrinsic subspace',
          ar: 'مصفوفات رتبة منخفضة تمثل الفضاء الجزئي الجوهري للتحديث',
        },
      },
      {
        step: '\\mathbf{B} \\sim 0, \\quad \\mathbf{A} \\sim \\mathcal{N}(0, \\sigma^2) \\implies \\Delta \\mathbf{W} = \\mathbf{B}\\mathbf{A} = 0 \\text{ at step 0}',
        note: {
          en: 'Initial adapter output is strictly zero, preserving exact pre-trained base model behavior',
          ar: 'مخرج المحول الأولي صفر تماماً، محافظاً بدقة على سلوك النموذج المدرب مسبقاً',
        },
      },
    ],
  },
  code: {
    snippet: `class LoRALinear(nn.Module):
    def __init__(self, in_features, out_features, r=8, alpha=16):
        super().__init__()
        self.linear = nn.Linear(in_features, out_features, bias=False)
        self.linear.weight.requires_grad = False # Freeze base
        self.lora_A = nn.Parameter(torch.randn(r, in_features) * (1/r))
        self.lora_B = nn.Parameter(torch.zeros(out_features, r))
        self.scaling = alpha / r

    def forward(self, x):
        base_out = self.linear(x)
        lora_out = (x @ self.lora_A.T @ self.lora_B.T) * self.scaling
        return base_out + lora_out`,
    explanation: {
      en: 'Injects trainable low-rank matrices A and B in parallel to the frozen pre-trained linear layer.',
      ar: 'يحقن مصفوفتي الرتبة المنخفضة القابلتين للتدريب A و B بالتوازي مع الطبقة الخطية المجمدة.',
    },
  },
};

export const LoRADecompositionLab: React.FC<Props> = ({ compact = false }) => {
  const { language, config } = useOkvirStore();

  const [dim, setDim] = useState<number>(4096);
  const [rank, setRank] = useState<number>(8);
  const [alpha, setAlpha] = useState<number>(16);

  const baseParams = dim * dim;
  const loraParams = 2 * dim * rank;
  const reductionPct = ((1 - loraParams / baseParams) * 100).toFixed(2);

  const baseMemoryMB = ((baseParams * 2) / (1024 * 1024)).toFixed(1); // FP16: 2 bytes
  const loraMemoryMB = ((loraParams * 2) / (1024 * 1024)).toFixed(2);
  const optimizerMemoryBaseMB = (parseFloat(baseMemoryMB) * 6).toFixed(1); // Adam: 6-8x FP16
  const optimizerMemoryLoRAMB = (parseFloat(loraMemoryMB) * 6).toFixed(2);

  return (
    <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto p-4 sm:p-6 select-none font-sans">
      {!compact && <PreCanvasBriefing content={LORA_PEDAGOGY} />}

      <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 space-y-6 shadow-xl backdrop-blur-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Layers size={20} />
            </div>
            <div>
              <h2 className="text-base font-bold text-[var(--text-primary)]">
                {language === 'ar' ? 'مختبر تفكيك الرتبة المنخفضة (LoRA)' : 'LoRA Matrix Decomposition & Parameter Reduction'}
              </h2>
              <p className="text-xs text-[var(--text-secondary)] font-mono">
                {language === 'ar' ? 'تفكيك تحديثات الأوزان ΔW = (α/r) · B×A مع تجميد النموذج الأساسي W₀' : 'Decompose weight update ΔW = (α/r) · B×A with frozen pre-trained base W₀'}
              </p>
            </div>
          </div>
        </div>

        {/* Sliders */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono bg-[var(--bg-app)] p-4 rounded-xl border border-[var(--border-subtle)]">
          <div className="space-y-1.5">
            <div className="flex justify-between text-[var(--text-secondary)]">
              <span>{language === 'ar' ? 'بُعد النموذج (d):' : 'Model Hidden Dim (d):'}</span>
              <span className="text-emerald-400 font-bold">{dim}</span>
            </div>
            <input
              type="range"
              min="1024"
              max="8192"
              step="1024"
              value={dim}
              onChange={(e) => {
                setDim(Number(e.target.value));
                if (config.soundEnabled) audio.playClick();
              }}
              className="w-full accent-emerald-500"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-[var(--text-secondary)]">
              <span>{language === 'ar' ? 'رتبة عنق الزجاجة (r):' : 'LoRA Rank Bottleneck (r):'}</span>
              <span className="text-amber-400 font-bold">r = {rank}</span>
            </div>
            <input
              type="range"
              min="1"
              max="64"
              value={rank}
              onChange={(e) => {
                setRank(Number(e.target.value));
                if (config.soundEnabled) audio.playClick();
              }}
              className="w-full accent-amber-500"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-[var(--text-secondary)]">
              <span>{language === 'ar' ? 'معامل التوسيع (α):' : 'Scaling Factor (α):'}</span>
              <span className="text-sky-400 font-bold">α = {alpha} (scale = {(alpha / rank).toFixed(2)})</span>
            </div>
            <input
              type="range"
              min="4"
              max="64"
              step="4"
              value={alpha}
              onChange={(e) => {
                setAlpha(Number(e.target.value));
                if (config.soundEnabled) audio.playClick();
              }}
              className="w-full accent-sky-500"
            />
          </div>
        </div>

        {/* Visual Architecture Diagram */}
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-app)] p-6 flex flex-col md:flex-row items-center justify-around gap-6">
          {/* Base Frozen Model W_0 */}
          <div className="flex flex-col items-center space-y-2 text-center">
            <div className="relative w-28 h-28 rounded-xl border-2 border-dashed border-sky-500/40 bg-sky-500/10 flex flex-col items-center justify-center p-2 text-[var(--math-data)]">
              <span className="text-sm font-bold font-mono">W₀</span>
              <span className="text-[10px] text-[var(--math-data)]/80 font-mono">{dim} × {dim}</span>
              <div className="absolute top-1 right-1 flex items-center gap-0.5 text-[9px] px-1 rounded bg-sky-500/20 text-[var(--math-data)] font-mono">
                <ShieldCheck size={10} />
                <span>FROZEN</span>
              </div>
            </div>
            <span className="text-xs font-mono text-[var(--text-secondary)]">Base Weight Matrix</span>
          </div>

          <div className="text-xl font-bold font-mono text-[var(--text-tertiary)]">+</div>

          {/* LoRA Adapter Branch B x A */}
          <div className="flex items-center gap-3 p-4 rounded-xl border border-amber-500/30 bg-amber-500/5">
            {/* Matrix B */}
            <div className="flex flex-col items-center space-y-2 text-center">
              <div className="w-10 h-28 rounded-lg border border-amber-500/60 bg-amber-500/20 flex flex-col items-center justify-center p-1 text-[var(--math-gradient)] font-mono">
                <span className="text-xs font-bold">B</span>
                <span className="text-[9px] text-[var(--math-gradient)]">{dim}×{rank}</span>
              </div>
              <span className="text-[10px] font-mono text-[var(--text-secondary)]">Zero init</span>
            </div>

            <span className="text-xs font-bold font-mono text-[var(--math-gradient)]">×</span>

            {/* Matrix A */}
            <div className="flex flex-col items-center space-y-2 text-center">
              <div className="w-28 h-10 rounded-lg border border-emerald-500/60 bg-emerald-500/20 flex flex-col items-center justify-center p-1 text-[var(--math-vector)] font-mono">
                <span className="text-xs font-bold">A</span>
                <span className="text-[9px] text-[var(--math-vector)]">{rank}×{dim}</span>
              </div>
              <span className="text-[10px] font-mono text-[var(--text-secondary)]">Gaussian init</span>
            </div>
          </div>

          <div className="text-xl font-bold font-mono text-[var(--text-tertiary)]">=</div>

          {/* Final Output Representation */}
          <div className="flex flex-col items-center space-y-2 text-center">
            <div className="w-28 h-28 rounded-xl border border-emerald-500/40 bg-emerald-500/10 flex flex-col items-center justify-center p-2 text-[var(--math-vector)] font-mono">
              <span className="text-sm font-bold">W_adapted</span>
              <span className="text-[10px] text-[var(--math-vector)]/80">W₀ + (α/r)·BA</span>
            </div>
            <span className="text-xs font-mono text-[var(--text-secondary)]">Zero Runtime Overhead</span>
          </div>
        </div>

        {/* Telemetry Footprint Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
          <div className="rounded-xl border border-sky-500/20 bg-sky-500/5 p-4 space-y-2">
            <div className="text-[11px] text-[var(--math-data)] font-bold uppercase tracking-wider">
              {language === 'ar' ? 'معاملات النموذج الأساسي' : 'Pre-Trained Base'}
            </div>
            <div className="text-lg font-bold text-[var(--text-primary)]">{(baseParams / 1e6).toFixed(2)}M params</div>
            <div className="text-[11px] text-[var(--text-secondary)]">Weights: {baseMemoryMB} MB (FP16)</div>
            <div className="text-[11px] text-[var(--math-loss)]">Adam Memory: {optimizerMemoryBaseMB} MB</div>
          </div>

          <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 space-y-2">
            <div className="text-[11px] text-[var(--math-gradient)] font-bold uppercase tracking-wider">
              {language === 'ar' ? 'معاملات المحول (LoRA)' : 'Trainable LoRA Adapters'}
            </div>
            <div className="text-lg font-bold text-[var(--math-gradient)]">{(loraParams / 1e3).toFixed(1)}K params</div>
            <div className="text-[11px] text-[var(--text-secondary)]">Weights: {loraMemoryMB} MB (FP16)</div>
            <div className="text-[11px] text-[var(--math-vector)]">Adam Memory: {optimizerMemoryLoRAMB} MB</div>
          </div>

          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4 space-y-2">
            <div className="text-[11px] text-[var(--math-vector)] font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Flame size={14} />
              <span>{language === 'ar' ? 'نسبة خفض المعاملات' : 'Parameter Reduction'}</span>
            </div>
            <div className="text-2xl font-bold text-[var(--math-vector)]">{reductionPct}%</div>
            <div className="text-[11px] text-[var(--math-vector)]/80">
              {language === 'ar'
                ? `تدريب ${(loraParams).toLocaleString()} معاملاً فقط بدلاً من ${(baseParams).toLocaleString()}!`
                : `Train only ${(loraParams).toLocaleString()} instead of ${(baseParams).toLocaleString()} parameters!`}
            </div>
          </div>
        </div>
      </div>

      {!compact && <PostCanvasConsolidation content={LORA_PEDAGOGY} />}
    </div>
  );
};

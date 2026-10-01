import React, { useState, useMemo } from 'react';
import { useOkvirStore } from '@/lib/store';
import { audio } from '@/lib/audio';
import { PreCanvasBriefing, PostCanvasConsolidation, TierContent } from '@/components/pedagogy/MultiTierDisclosure';

const TOKENS = ['The', 'animal', "didn't", 'cross', 'the', 'street', 'because', 'it', 'was', 'too', 'tired'];

// Raw unnormalized logits Q K^T for Head 1 (Syntactic) and Head 2 (Coreference)
const RAW_LOGITS: Record<number, number[][]> = {
  1: [
    // Head 1: Syntactic adjacency
    [4.2, 2.5, 0.5, -1.0, -1.5, -2.0, -2.5, -2.5, -3.0, -3.0, -3.0],
    [1.0, 4.5, 3.2, 0.8, -0.5, -1.2, -1.5, -1.5, -2.0, -2.0, -2.5],
    [-0.5, 2.0, 4.8, 3.5, 0.4, -0.2, -1.0, -1.0, -1.5, -2.0, -2.0],
    [-1.0, 0.2, 2.5, 4.6, 2.8, 1.8, 0.0, -0.5, -1.0, -1.2, -1.5],
    [-2.0, -1.0, 0.0, 1.8, 5.0, 3.8, 0.2, -0.5, -1.0, -1.2, -1.5],
    [-2.0, -1.0, -0.5, 0.8, 2.8, 5.2, 1.5, 0.2, -0.5, -0.8, -1.0],
    [-2.5, -1.5, -1.0, 0.0, 0.2, 1.2, 4.8, 3.2, 1.8, 0.5, 0.0],
    // "it"
    [-2.5, 0.8, -0.5, 0.0, -0.5, 0.2, 3.2, 4.5, 2.5, 0.5, 0.2],
    [-3.0, -1.5, -1.0, -0.5, -0.5, 0.0, 1.2, 3.0, 4.8, 2.2, 0.8],
    [-3.0, -2.0, -1.5, -1.0, -1.0, -0.5, 0.2, 1.0, 2.2, 5.0, 3.5],
    [-3.0, -1.0, -1.2, -0.8, -1.0, -0.5, 0.2, 1.5, 2.5, 3.5, 4.8],
  ],
  2: [
    // Head 2: Coreference Resolution ("it" attends strongly to "animal"!)
    [3.5, 3.5, 0.5, 0.2, -0.5, -0.5, -1.0, -1.0, -1.5, -1.5, -2.0],
    [0.8, 5.2, 0.5, 0.4, -0.5, -0.5, -1.0, -1.0, -1.5, -1.5, -2.0],
    [0.2, 3.0, 4.2, 1.8, -0.2, -0.2, -0.5, -0.5, -1.0, -1.5, -1.5],
    [-0.5, 2.8, 1.2, 4.5, 0.5, 1.2, -0.2, 0.0, -0.8, -1.0, -1.2],
    [-1.0, 0.5, -0.2, 0.8, 4.5, 4.2, -0.2, -0.2, -0.8, -1.0, -1.0],
    [-1.0, 0.5, -0.2, 0.5, 2.0, 5.0, 0.5, 0.2, -0.5, -0.5, -0.8],
    [-1.2, 1.8, -0.2, 0.0, -0.2, 0.5, 4.5, 2.8, 1.5, 0.2, 0.0],
    // "it" attends massively to "animal" (index 1)!
    [-0.8, 6.2, -0.8, 0.0, -0.8, -0.2, 1.5, 2.8, 0.8, 0.0, 0.2],
    [-1.5, 2.2, -0.8, -0.2, -0.5, 0.0, 0.5, 2.2, 4.6, 1.2, 0.5],
    [-2.0, 1.5, -1.0, -0.5, -0.8, -0.2, 0.0, 1.0, 2.0, 5.0, 3.2],
    [-1.5, 4.8, -0.8, -0.2, -0.5, 0.0, 0.2, 2.5, 1.0, 1.8, 2.5],
  ],
};

const ATTENTION_PEDAGOGY: TierContent = {
  intuition: {
    analogy: {
      en: 'Think of self-attention as a library card catalog: each token submits a Query ("I am the pronoun \'it\', what noun do I belong to?"), and compares it against the Keys of all books in the library ("animal", "street"). The match score retrieves the corresponding Value content.',
      ar: 'تخيل آلية الانتباه الذاتي كفهرس مكتبة ذكي: كل كلمة تقدم استعلاماً Query ("أنا الضمير \'it\'، ما هو الاسم الذي أعود إليه؟")، وتقارنه مع مفاتيح Keys جميع الكلمات الأخرى. يحدد تطابق المفاتيح نسبة سحب المعلومات من القيم Values المقابلة.',
    },
    keyTakeaway: {
      en: 'Multi-head self-attention enables neural networks to capture long-range contextual dependencies in O(1) sequential path length, completely eliminating the sequential bottleneck of RNNs.',
      ar: 'يمكّن الانتباه الذاتي متعدد الرؤوس الشبكات العصبية من التقاط الاعتماديات السياقية البعيدة بخطوة حسابية مباشرة O(1)، متجاوزاً اختناق التتابع البطيء للشبكات المتكررة RNN.',
    },
  },
  geometry: {
    visualDescription: {
      en: 'Self-attention calculates a dynamic routing matrix where each row lies on the probability simplex Δ^(N-1) (summing strictly to 1.0). The output is a convex combination of value vectors in embedding space.',
      ar: 'تحسب آلية الانتباه مصفوفة توجيه ديناميكية حيث يقع كل صف على البسيط الاحتمالي Δ^(N-1) (بمجموع ١٫٠ بالضبط)، مما يجعل المخرج تركيباً خطياً محدباً لمتجهات القيم.',
    },
    conservedQuantity: {
      en: 'Simplex invariant: ∑_j A_{i, j} = 1.0 for every token row i, with A_{i, j} ≥ 0.',
      ar: 'ثابت البسيط الاحتمالي: مجموع معاملات الانتباه لكل صف يساوي ١٫٠ دائماً بدون استثناء.',
    },
  },
  formal: {
    equation: '\\text{Attention}(\\mathbf{Q}, \\mathbf{K}, \\mathbf{V}) = \\text{softmax}\\left(\\frac{\\mathbf{Q}\\mathbf{K}^T}{\\sqrt{d_k}}\\right)\\mathbf{V}',
    derivationSteps: [
      {
        step: 'q_i, k_j \\sim \\mathcal{N}(0, 1) \\implies \\text{Var}(q_i \\cdot k_j) = \\sum_{d=1}^{d_k} \\text{Var}(q_{i, d} k_{j, d}) = d_k',
        note: {
          en: 'Variance of dot product scales directly with dimension d_k without temperature scaling',
          ar: 'تباين الجداء النقطي يتناسب طردياً مع البعد الفضائي d_k بدون عامل التحجيم الحراري',
        },
      },
      {
        step: '\\lim_{d_k \\to \\infty} \\text{softmax}(\\mathbf{Q}\\mathbf{K}^T) \\to \\text{one-hot}(\\text{argmax}) \\implies \\nabla \\to 0',
        note: {
          en: 'Unscaled large dot products push softmax into saturated flat regions with near-zero gradients',
          ar: 'القيم الكبيرة غير المحجمة تدفع دالة سوفت ماكس لمنطقة التشبع ذات التدرج شبه الصفري',
        },
      },
      {
        step: '\\mathbf{M}_{i, j} = \\begin{cases} 0 & j \\le i \\\\ -\\infty & j > i \\end{cases} \\implies \\text{softmax}\\left(\\frac{\\mathbf{Q}\\mathbf{K}^T}{\\sqrt{d_k}} + \\mathbf{M}\\right)',
        note: {
          en: 'Autoregressive Causal Masking prevents future token visibility in generative decoder models (GPT)',
          ar: 'القناع السببي التوليدي يمنع تسرب معلومات الكلمات المستقبلية في نماذج التوليد مثل GPT',
        },
      },
    ],
  },
  code: {
    snippet: `import torch
import torch.nn.functional as F

def scaled_dot_product_attention(
    q: torch.Tensor, # (Batch, Heads, SeqLen, d_k)
    k: torch.Tensor, # (Batch, Heads, SeqLen, d_k)
    v: torch.Tensor, # (Batch, Heads, SeqLen, d_v)
    causal: bool = False
):
    """
    Vectorized Multi-Head Scaled Dot-Product Attention in PyTorch.
    Complexity: O(SeqLen^2 * d_k) time, O(SeqLen^2) memory.
    """
    d_k = q.size(-1)
    # Batched matrix multiplication: Q @ K^T / sqrt(d_k)
    scores = torch.matmul(q, k.transpose(-2, -1)) / (d_k ** 0.5)
    
    if causal:
        seq_len = q.size(-2)
        # Create upper-triangular causal mask with -inf
        mask = torch.triu(torch.full((seq_len, seq_len), float('-inf'), device=q.device), diagonal=1)
        scores = scores + mask
        
    attn_weights = F.softmax(scores, dim=-1)
    output = torch.matmul(attn_weights, v)
    return output, attn_weights`,
    explanation: {
      en: 'Vectorized batched matrix multiplication with broadcasting. Adding -infinity inside softmax mathematically forces future causal token probabilities strictly to 0.0.',
      ar: 'ضرب مصفوفي متوازي مع البث. إضافة سالب اللانهاية داخل دالة سوفت ماكس تصفر احتمالات الكلمات المستقبلية رياضياً بدقة مطلقة.',
    },
  },
};

export const AttentionHeatmapCanvas: React.FC<{ compact?: boolean }> = ({ compact = true }) => {
  const { language, config } = useOkvirStore();

  const [activeHead, setActiveHead] = useState<1 | 2>(2);
  const [selectedTokenIdx, setSelectedTokenIdx] = useState<number>(7); // "it"
  const [hoveredCell, setHoveredCell] = useState<{ r: number; c: number } | null>(null);
  const [temperature, setTemperature] = useState<number>(1.0); // 1.0 = standard 1/sqrt(d_k)
  const [isCausal, setIsCausal] = useState<boolean>(false);

  // Compute softmax attention weights dynamically with temperature and optional causal mask
  const attentionMatrix = useMemo(() => {
    const raw = RAW_LOGITS[activeHead];
    const n = TOKENS.length;
    const result: number[][] = [];

    for (let i = 0; i < n; i++) {
      const rowLogits: number[] = [];
      for (let j = 0; j < n; j++) {
        if (isCausal && j > i) {
          rowLogits.push(-1e9); // Causal mask
        } else {
          rowLogits.push(raw[i][j] / Math.max(0.1, temperature));
        }
      }

      // Softmax
      const maxLogit = Math.max(...rowLogits);
      const exps = rowLogits.map((val) => Math.exp(val - maxLogit));
      const sumExp = exps.reduce((a, b) => a + b, 0);
      result.push(exps.map((val) => val / sumExp));
    }

    return result;
  }, [activeHead, temperature, isCausal]);

  const queryWeights = attentionMatrix[selectedTokenIdx] || [];

  const handleSelectToken = (idx: number) => {
    setSelectedTokenIdx(idx);
    if (config.soundEnabled) audio.playClick();
  };

  const handleSwitchHead = (head: 1 | 2) => {
    setActiveHead(head);
    if (config.soundEnabled) audio.playClick();
  };

  return (
    <div className="flex flex-col gap-5 p-5 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] specular">
      {/* Pre-Canvas Intuitive Briefing & Mental Model */}
      {!compact && <PreCanvasBriefing content={ATTENTION_PEDAGOGY} />}

      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 border-b border-[var(--border-subtle)] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-mono tracking-wider text-[var(--math-prediction)] font-bold">
              {language === 'ar' ? 'خريطة حرارة الانتباه الذاتي 2D' : 'Transformer Scaled Dot-Product Self-Attention'}
            </span>
          </div>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            {activeHead === 2
              ? (language === 'ar' ? 'لاحظ كيف يربط الرأس 2 الضمير "it" بالاسم "animal" بقوة عالية' : 'Notice Head 2 links pronoun "it" to "animal" at high probability')
              : (language === 'ar' ? 'الرأس 1 يركز على الكلمات المجاورة نحوياً' : 'Head 1 focuses on local grammatical neighbors')}
          </p>
        </div>

        {/* Head Selector & Causal Toggle */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => handleSwitchHead(1)}
            className={`px-3 py-1.5 text-xs font-mono rounded-lg border transition-all ${
              activeHead === 1
                ? 'border-[var(--math-data)] bg-[var(--math-data)]/15 text-[var(--math-data)] font-bold'
                : 'border-[var(--border-subtle)] text-[var(--text-secondary)]'
            }`}
          >
            Head 1 ({language === 'ar' ? 'نحوي' : 'Syntax'})
          </button>
          <button
            onClick={() => handleSwitchHead(2)}
            className={`px-3 py-1.5 text-xs font-mono rounded-lg border transition-all ${
              activeHead === 2
                ? 'border-[var(--math-prediction)] bg-[var(--math-prediction)]/15 text-[var(--math-prediction)] font-bold'
                : 'border-[var(--border-subtle)] text-[var(--text-secondary)]'
            }`}
          >
            Head 2 ({language === 'ar' ? 'إحالة الضمائر' : 'Coreference'})
          </button>

          <button
            onClick={() => {
              setIsCausal(!isCausal);
              if (config.soundEnabled) audio.playClick();
            }}
            className={`px-3 py-1.5 text-xs font-mono rounded-lg border transition-all ${
              isCausal
                ? 'border-[var(--math-gradient)] bg-[var(--math-gradient)]/15 text-[var(--math-gradient)] font-bold'
                : 'border-[var(--border-subtle)] text-[var(--text-secondary)]'
            }`}
          >
            {isCausal ? (language === 'ar' ? '✓ قناع سببي (GPT)' : '✓ Causal Mask (GPT)') : (language === 'ar' ? 'ثنائي الاتجاه (BERT)' : 'Bidirectional (BERT)')}
          </button>
        </div>
      </div>

      {/* Temperature / Scale Factor Slider */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-app)]">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <span className="text-xs font-mono text-[var(--text-secondary)] whitespace-nowrap">
            Temperature / Scaling (τ): <strong className="text-sky-400 font-mono">{temperature.toFixed(2)}</strong>
          </span>
          <input
            type="range"
            min="0.2"
            max="2.5"
            step="0.05"
            value={temperature}
            onChange={(e) => setTemperature(parseFloat(e.target.value))}
            className="w-48 accent-sky-400 cursor-pointer"
          />
        </div>
        <div className="text-[10px] font-mono text-[var(--text-tertiary)]">
          {temperature < 0.6
            ? (language === 'ar' ? 'حرارة منخفضة: تركيز حاد (Argmax) مع تدرجات متلاشية' : 'Low Temp: Sharp argmax spike with vanishing gradients')
            : temperature > 1.8
            ? (language === 'ar' ? 'حرارة عالية: انتباه مشتت وغير مميز (Uniform blur)' : 'High Temp: Entropic uniform distribution')
            : (language === 'ar' ? 'معدل قياسي 1/√d_k للحفاظ على تباين التدرج' : 'Standard 1/√d_k scaling preserving gradient variance')}
        </div>
      </div>

      {/* Interactive Sentence Strip */}
      <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-app)] space-y-2">
        <div className="text-[10px] font-mono text-[var(--text-tertiary)] uppercase tracking-wider">
          {language === 'ar' ? 'انقر على أي كلمة لتفحص إلى أين توجّه انتباهها (Query):' : 'Click any token to inspect its Query attention focus:'}
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          {TOKENS.map((token, idx) => {
            const isSelected = selectedTokenIdx === idx;
            const weight = queryWeights[idx] || 0;

            return (
              <button
                key={idx}
                onClick={() => handleSelectToken(idx)}
                className={`relative px-3 py-1.5 rounded-xl text-xs font-mono transition-all flex flex-col items-center gap-0.5 ${
                  isSelected
                    ? 'border-2 border-[var(--math-prediction)] bg-[var(--math-prediction)]/20 text-[var(--text-primary)] font-bold shadow-lg scale-105'
                    : 'border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]'
                }`}
                style={{
                  backgroundColor: !isSelected && weight > 0.12 ? `rgba(168, 85, 247, ${Math.min(0.7, weight)})` : undefined,
                  color: !isSelected && weight > 0.12 ? '#fafafa' : undefined,
                }}
              >
                <span>{token}</span>
                <span className="text-[9px] font-mono text-[var(--text-tertiary)] tabular-nums">
                  {(weight * 100).toFixed(0)}%
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2D Attention Weight Matrix Heatmap (11x11 Grid) */}
      <div className="p-5 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-app)] space-y-3">
        <div className="flex justify-between items-center text-xs font-mono">
          <span className="text-[var(--text-primary)] font-semibold uppercase tracking-wider">
            {language === 'ar' ? 'مصفوفة الانتباه التفاعلية كاملة A (١١×١١)' : 'Full 2D Attention Weight Matrix Heatmap A (11×11)'}
          </span>
          <span className="text-[11px] text-[var(--text-tertiary)]">
            {hoveredCell
              ? `Q("${TOKENS[hoveredCell.r]}") → K("${TOKENS[hoveredCell.c]}"): ${(attentionMatrix[hoveredCell.r][hoveredCell.c] * 100).toFixed(1)}%`
              : 'Hover cells to inspect Q→K scores'}
          </span>
        </div>

        <div className="overflow-x-auto pb-2">
          <div className="inline-block min-w-full">
            <div className="grid grid-cols-[80px_repeat(11,minmax(32px,1fr))] gap-1 items-center">
              {/* Header Row: Keys */}
              <div className="text-[10px] font-mono text-[var(--text-tertiary)] text-right pe-2 font-bold">
                Q \ K
              </div>
              {TOKENS.map((token, c) => (
                <div key={c} className="text-[9px] font-mono text-[var(--text-tertiary)] text-center truncate px-0.5" title={token}>
                  {token.slice(0, 4)}
                </div>
              ))}

              {/* Rows: Queries */}
              {TOKENS.map((qToken, r) => (
                <React.Fragment key={r}>
                  <div className={`text-[10px] font-mono text-right pe-2 truncate ${selectedTokenIdx === r ? 'text-purple-400 font-bold' : 'text-[var(--text-secondary)]'}`} title={qToken}>
                    {qToken}
                  </div>
                  {TOKENS.map((kToken, c) => {
                    const weight = attentionMatrix[r][c];
                    const isMasked = isCausal && c > r;
                    const isSelectedQuery = selectedTokenIdx === r;
                    const isHovered = hoveredCell?.r === r && hoveredCell?.c === c;

                    return (
                      <button
                        key={`${r}-${c}`}
                        onClick={() => handleSelectToken(r)}
                        onMouseEnter={() => setHoveredCell({ r, c })}
                        onMouseLeave={() => setHoveredCell(null)}
                        style={{
                          backgroundColor: isMasked
                            ? 'rgba(0, 0, 0, 0.4)'
                            : `rgba(168, 85, 247, ${Math.max(0.04, weight)})`,
                          borderColor: isHovered
                            ? '#38bdf8'
                            : isSelectedQuery
                            ? 'rgba(168, 85, 247, 0.5)'
                            : 'rgba(255, 255, 255, 0.05)',
                        }}
                        className={`h-7 rounded border flex items-center justify-center text-[9px] font-mono transition-all ${
                          isMasked ? 'opacity-20 cursor-not-allowed' : 'hover:scale-110 hover:z-20 cursor-pointer'
                        } ${isHovered ? 'ring-2 ring-sky-400 z-10' : ''}`}
                        title={`${qToken} → ${kToken}: ${(weight * 100).toFixed(1)}%`}
                      >
                        {!isMasked && weight > 0.05 && (
                          <span className={weight > 0.3 ? 'text-white font-bold' : 'text-[var(--text-primary)] font-semibold'}>
                            {(weight * 100).toFixed(0)}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Post-Canvas Mathematical & Code Consolidation */}
      {!compact && <PostCanvasConsolidation content={ATTENTION_PEDAGOGY} />}
    </div>
  );
};

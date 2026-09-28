import React, { useState, useMemo, useCallback } from 'react';
import { useOkvirStore } from '@/lib/store';
import { audio } from '@/lib/audio';
import { PreCanvasBriefing, PostCanvasConsolidation, type TierContent } from '@/components/pedagogy/MultiTierDisclosure';
import { Type, Play, RotateCcw, FastForward, CheckCircle2 } from 'lucide-react';

const PRESET_CORPUS: { id: string; name: { en: string; ar: string }; text: string }[] = [
  {
    id: 'english-stem',
    name: { en: 'Word Stems (low / lower / lowest)', ar: 'جذور الكلمات (low / lower)' },
    text: 'low low lower lowest newer widest newest',
  },
  {
    id: 'attention-paper',
    name: { en: 'Attention Paper Title', ar: 'عنوان ورقة الانتباه' },
    text: 'attention is all you need for neural sequence modeling',
  },
  {
    id: 'arabic-ai',
    name: { en: 'Arabic AI Concepts', ar: 'مفاهيم الذكاء الاصطناعي بالعربية' },
    text: 'الذكاء الاصطناعي والتعلم الآلي والشبكات العصبية العميقة',
  },
];

const BPE_PEDAGOGY: TierContent = {
  intuition: {
    analogy: {
      en: 'Think of BPE like discovering shorthand contractions: start by writing every word character-by-character. Whenever you notice two adjacent letters appearing together constantly (like "t" and "h"), invent a single new symbol for "th". Repeat until common words become single tokens while rare words are still spelled out cleanly.',
      ar: 'تخيل ترميز BPE كاختراع اختصارات سريعة: ابدأ بكتابة كل كلمة حرفاً بحرف. وحين تلاحظ حرفين متجاورين يتكرران باستمرار (مثل "ال" في بداية الكلمات)، ادمجهما في رمز واحد "ال". كرر هذه العملية حتى تصبح الكلمات الشائعة رموزاً مفردة، بينما تُجزأ الكلمات النادرة بأمان إلى أجزائها الفرعية.',
    },
    keyTakeaway: {
      en: 'Byte-Pair Encoding (BPE) creates an optimal subword vocabulary that completely eliminates Out-Of-Vocabulary (OOV) errors while drastically compressing sequence lengths for transformers.',
      ar: 'ترميز BPE يبني مفردات تحت-كلمية مثالية تقضي تماماً على معضلة الكلمات غير المعرفة (OOV) مع تقليص طول السلسلة النصية بشكل كبير لنماذج المحولات (Transformers).',
    },
  },
  geometry: {
    visualDescription: {
      en: 'Tokenization transitions text from high-dimensional discrete character representations into clustered dense embedding lookups. High-frequency stems merge into atomic tokens, optimizing the transformer attention context window.',
      ar: 'ينقل الترميز النص من تمثيلات حروفية منفصلة متباعدة إلى مصفوفات تضمين كثيفة ومجمعة. الجذور عالية التردد تندمج في رموز ذرية مما يعظم كفاءة نافذة سياق الانتباه.',
    },
    conservedQuantity: {
      en: 'Information preservation: Decoding any sequence of BPE tokens via string concatenation strictly reproduces the original raw byte stream losslessly.',
      ar: 'حفظ المعلومات دون فقدان: فك ترميز أي سلسلة من رموز BPE عبر الدمج النصي يعيد إنتاج تدفق البايتات الأصلي بدقة 100% دون أي ضياع.',
    },
  },
  formal: {
    equation: '\\mathcal{V}_{k+1} = \\mathcal{V}_k \\cup \\{ (t_i, t_j)^* \\}, \\quad (t_i, t_j)^* = \\arg\\max_{(u, v)} \\text{Freq}(u, v)',
    derivationSteps: [
      {
        step: '\\mathcal{V}_0 = \\text{UniqueCharacters}(\\mathcal{D})',
        note: {
          en: 'Base vocabulary initialized with all individual characters / bytes in corpus',
          ar: 'المفردات الأولية تُهيأ بجميع الحروف أو البايتات الفردية الموجودة في النص',
        },
      },
      {
        step: '\\text{Count}(\\text{pair}) = \\sum_{w \\in \\mathcal{D}} \\text{Count}_{w}(t_i, t_{i+1})',
        note: {
          en: 'Frequency count of all adjacent token bigrams across the tokenized corpus',
          ar: 'حساب تكرار جميع أزواج الرموز المتجاورة عبر كامل متن التدريب',
        },
      },
      {
        step: '\\text{Compression Ratio} = \\frac{\\text{Character Count}}{\\text{Token Count}} \\ge 1.0',
        note: {
          en: 'Measures sequence length efficiency gained by subword merges',
          ar: 'يقيس كفاءة تقليص طول السلسلة المحققة بفضل عمليات الدمج',
        },
      },
    ],
  },
  code: {
    snippet: `from collections import Counter

def get_stats(vocab):
    pairs = Counter()
    for word, freq in vocab.items():
        symbols = word.split()
        for i in range(len(symbols) - 1):
            pairs[symbols[i], symbols[i+1]] += freq
    return pairs

def merge_vocab(pair, v_in):
    v_out = {}
    bigram = ' '.join(pair)
    replacement = ''.join(pair)
    for word in v_in:
        w_out = word.replace(bigram, replacement)
        v_out[w_out] = v_in[word]
    return v_out

# Run 10 BPE merge iterations
vocab = {'l o w </w>': 5, 'l o w e r </w>': 2, 'n e w e s t </w>': 6}
for i in range(5):
    pairs = get_stats(vocab)
    if not pairs: break
    best = max(pairs, key=pairs.get)
    vocab = merge_vocab(best, vocab)
    print(f"Merge #{i+1}: {best} -> {''.join(best)}")`,
    explanation: {
      en: 'Classic Sennrich et al. (2016) BPE algorithm implementation using frequency counting and string replacement.',
      ar: 'خوارزمية BPE القياسية لسيرنرش وآخرين (2016) باستخدام عد التكرارات والاستبدال المتتالي.',
    },
  },
};

interface BpePairCandidate {
  pair: [string, string];
  count: number;
}

interface BpeMergeRule {
  pair: [string, string];
  merged: string;
  count: number;
}

export const BpeTokenizerLab: React.FC<{ compact?: boolean }> = ({ compact }) => {
  const { language, config } = useOkvirStore();

  const [inputText, setInputText] = useState(PRESET_CORPUS[0].text);
  const [merges, setMerges] = useState<BpeMergeRule[]>([]);

  // Tokenize text into sequence of tokens based on current merges
  const tokenizedWords = useMemo(() => {
    // Split into whitespace words
    const words = inputText.trim().split(/\s+/).filter(Boolean);
    // Initialize each word as list of characters
    let tokenList = words.map((w) => w.split(''));

    // Apply recorded merges in chronological order
    merges.forEach(({ pair, merged }) => {
      tokenList = tokenList.map((tokens) => {
        const next: string[] = [];
        let i = 0;
        while (i < tokens.length) {
          if (i < tokens.length - 1 && tokens[i] === pair[0] && tokens[i + 1] === pair[1]) {
            next.push(merged);
            i += 2;
          } else {
            next.push(tokens[i]);
            i += 1;
          }
        }
        return next;
      });
    });

    return tokenList;
  }, [inputText, merges]);

  // Find most frequent adjacent pair across current token list
  const nextTopPair: BpePairCandidate | null = useMemo(() => {
    const pairCounts = new Map<string, BpePairCandidate>();

    for (const tokens of tokenizedWords) {
      for (let i = 0; i < tokens.length - 1; i++) {
        const p0 = tokens[i];
        const p1 = tokens[i + 1];
        const key = `${p0}\0${p1}`;
        const existing = pairCounts.get(key);
        if (existing) {
          existing.count += 1;
        } else {
          pairCounts.set(key, { pair: [p0, p1], count: 1 });
        }
      }
    }

    let bestPair: BpePairCandidate | null = null;
    for (const val of pairCounts.values()) {
      if (bestPair === null || val.count > bestPair.count) {
        bestPair = val;
      }
    }

    return bestPair;
  }, [tokenizedWords]);

  // Perform single merge
  const performMerge = useCallback(() => {
    if (!nextTopPair || nextTopPair.count < 1) return;
    const { pair, count } = nextTopPair;
    const merged = pair[0] + pair[1];
    setMerges((prev) => [...prev, { pair, merged, count }]);
    if (config.soundEnabled) audio.playClick();
  }, [nextTopPair, config.soundEnabled]);

  // Perform multiple merges
  const fastForwardMerges = (n = 5) => {
    for (let i = 0; i < n; i++) {
      setTimeout(() => {
        setMerges((prev) => {
          const words = inputText.trim().split(/\s+/).filter(Boolean);
          let tokenList = words.map((w) => w.split(''));
          for (const rule of prev) {
            tokenList = tokenList.map((tokens) => {
              const next: string[] = [];
              let j = 0;
              while (j < tokens.length) {
                if (j < tokens.length - 1 && tokens[j] === rule.pair[0] && tokens[j + 1] === rule.pair[1]) {
                  next.push(rule.merged);
                  j += 2;
                } else {
                  next.push(tokens[j]);
                  j += 1;
                }
              }
              return next;
            });
          }

          // Find top pair
          const counts = new Map<string, BpePairCandidate>();
          for (const tokens of tokenList) {
            for (let k = 0; k < tokens.length - 1; k++) {
              const kStr = `${tokens[k]}\0${tokens[k + 1]}`;
              const e = counts.get(kStr);
              if (e) e.count += 1;
              else counts.set(kStr, { pair: [tokens[k], tokens[k + 1]], count: 1 });
            }
          }

          let best: BpePairCandidate | null = null;
          for (const v of counts.values()) {
            if (best === null || v.count > best.count) best = v;
          }

          if (best === null || best.count < 1) return prev;
          const newRule: BpeMergeRule = { pair: best.pair, merged: best.pair[0] + best.pair[1], count: best.count };
          return [...prev, newRule];
        });
      }, i * 40);
    }
    if (config.soundEnabled) audio.playSuccessChime();
  };

  const resetTokenizer = () => {
    setMerges([]);
    if (config.soundEnabled) audio.playClick();
  };

  // Metrics
  const rawCharCount = inputText.replace(/\s+/g, '').length;
  const currentTokenCount = tokenizedWords.reduce((acc, w) => acc + w.length, 0);
  const compressionRatio = currentTokenCount > 0 ? (rawCharCount / currentTokenCount).toFixed(2) : '1.00';

  // Token color generator
  const getTokenColor = (token: string) => {
    let hash = 0;
    for (let i = 0; i < token.length; i++) hash = token.charCodeAt(i) + ((hash << 5) - hash);
    const hues = [190, 140, 45, 270, 330, 210];
    const hue = hues[Math.abs(hash) % hues.length];
    return `hsla(${hue}, 85%, 45%, 0.18)`;
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      {!compact && <PreCanvasBriefing content={BPE_PEDAGOGY} />}

      <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 lg:p-6 specular shadow-xl space-y-5">
        {/* Header & Preset Selector */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-subtle)] pb-4">
          <div className="flex items-center gap-2">
            <Type size={18} className="text-[var(--math-prediction)]" />
            <h3 className="text-sm font-bold text-[var(--text-primary)]">
              {language === 'ar' ? 'ترميز BPE التفاعلي للمحولات' : 'Byte-Pair Encoding (BPE) Tokenizer Lab'}
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {PRESET_CORPUS.map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  setInputText(p.text);
                  setMerges([]);
                  if (config.soundEnabled) audio.playClick();
                }}
                className={`px-2.5 py-1 text-xs rounded-lg font-mono border transition-all ${
                  inputText === p.text
                    ? 'bg-[var(--math-prediction)]/15 text-[var(--math-prediction)] border-[var(--math-prediction)] font-semibold'
                    : 'text-[var(--text-tertiary)] border-[var(--border-subtle)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-hover)]'
                }`}
              >
                {p.name[language]}
              </button>
            ))}
          </div>
        </div>

        {/* Live Diagnostics HUD */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-app)]">
            <span className="text-[10px] font-mono text-[var(--text-tertiary)] block">
              {language === 'ar' ? 'عدد الحروف الخام' : 'Raw Characters'}
            </span>
            <span className="text-sm font-mono font-bold text-[var(--text-primary)] tabular-nums">
              {rawCharCount} chars
            </span>
          </div>

          <div className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-app)]">
            <span className="text-[10px] font-mono text-[var(--text-tertiary)] block">
              {language === 'ar' ? 'عدد الرموز الحالي' : 'Current Tokens'}
            </span>
            <span className="text-sm font-mono font-bold text-sky-400 tabular-nums">
              {currentTokenCount} tokens
            </span>
          </div>

          <div className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-app)]">
            <span className="text-[10px] font-mono text-[var(--text-tertiary)] block">
              {language === 'ar' ? 'معامل الضغط' : 'Compression Ratio'}
            </span>
            <span className="text-sm font-mono font-bold text-emerald-400 tabular-nums">
              {compressionRatio}x
            </span>
          </div>

          <div className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-app)]">
            <span className="text-[10px] font-mono text-[var(--text-tertiary)] block">
              {language === 'ar' ? 'عمليات الدمج المنجزة' : 'Merges Performed'}
            </span>
            <span className="text-sm font-mono font-bold text-amber-400 tabular-nums">
              {merges.length} merges
            </span>
          </div>
        </div>

        {/* Input Text Area */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-mono text-[var(--text-secondary)]">
            <span>{language === 'ar' ? 'النص التدريبي لـ BPE' : 'Input Training Text'}:</span>
            <span className="text-[10px] text-[var(--text-tertiary)]">
              {language === 'ar' ? 'اكتب أو عدل النص في أي وقت' : 'Editable at any time'}
            </span>
          </div>
          <input
            type="text"
            value={inputText}
            onChange={(e) => {
              setInputText(e.target.value);
              setMerges([]);
            }}
            className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-app)] text-sm text-[var(--text-primary)] font-mono focus:border-[var(--math-prediction)] focus:outline-none transition-colors"
          />
        </div>

        {/* Tokenized Stream Visualization (Colored Pills) */}
        <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-black/45 space-y-2 select-none">
          <div className="text-[11px] font-mono text-[var(--text-tertiary)] flex items-center justify-between">
            <span>{language === 'ar' ? 'التمثيل المجزأ إلى رموز فرعية' : 'Tokenized Subword Stream'}</span>
            <span className="text-[10px] text-sky-400 font-mono">
              {currentTokenCount} {language === 'ar' ? 'رمز' : 'tokens'}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            {tokenizedWords.map((tokens, wordIdx) => (
              <div key={wordIdx} className="flex items-center rounded-lg border border-white/10 bg-white/5 p-1 gap-1">
                {tokens.map((tok, tokIdx) => (
                  <span
                    key={tokIdx}
                    style={{ backgroundColor: getTokenColor(tok) }}
                    className="px-2 py-1 rounded text-xs font-mono font-semibold text-white border border-white/15 shadow-sm"
                  >
                    {tok}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Merge Controls & Next Pair Banner */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-app)]">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[var(--text-secondary)]">
              {language === 'ar' ? 'الزوج الأكثر تكراراً' : 'Top Candidate Pair'}:
            </span>
            {nextTopPair && nextTopPair.count > 0 ? (
              <span className="px-2.5 py-1 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-400 font-mono font-bold text-xs flex items-center gap-1.5">
                <span>"{nextTopPair.pair[0]}" + "{nextTopPair.pair[1]}"</span>
                <span className="text-[10px] text-amber-300">({nextTopPair.count}x)</span>
              </span>
            ) : (
              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                <CheckCircle2 size={13} />
                <span>{language === 'ar' ? 'اكتمل الدمج' : 'Corpus Fully Tokenized'}</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={performMerge}
              disabled={!nextTopPair || nextTopPair.count < 1}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--math-prediction)] text-white text-xs font-mono font-semibold hover:brightness-110 disabled:opacity-40 disabled:pointer-events-none transition-all"
            >
              <Play size={12} fill="currentColor" />
              <span>{language === 'ar' ? 'دمج الزوج' : 'Merge Pair'}</span>
            </button>

            <button
              onClick={() => fastForwardMerges(5)}
              disabled={!nextTopPair || nextTopPair.count < 1}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] disabled:opacity-40 disabled:pointer-events-none transition-all"
            >
              <FastForward size={12} />
              <span>+5 Merges</span>
            </button>

            <button
              onClick={resetTokenizer}
              className="p-1.5 rounded-lg border border-[var(--border-subtle)] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors"
              title={language === 'ar' ? 'إعادة تعيين للحروف' : 'Reset to Characters'}
            >
              <RotateCcw size={13} />
            </button>
          </div>
        </div>

        {/* Vocabulary Expansion Table */}
        {merges.length > 0 && (
          <div className="border border-[var(--border-subtle)] rounded-xl overflow-hidden text-xs font-mono">
            <div className="bg-[var(--bg-surface-hover)] px-3 py-2 text-[var(--text-secondary)] font-semibold flex justify-between">
              <span>{language === 'ar' ? 'قاموس الدمج التراكمي (BPE Vocab)' : 'Learned BPE Merge Rules'}</span>
              <span>{merges.length} Rules</span>
            </div>
            <div className="max-h-36 overflow-y-auto divide-y divide-[var(--border-subtle)]">
              {merges.map((m, idx) => (
                <div key={idx} className="px-3 py-1.5 flex items-center justify-between hover:bg-white/5">
                  <span className="text-[var(--text-tertiary)] w-8">#{idx + 1}</span>
                  <span className="text-amber-400">"{m.pair[0]}" + "{m.pair[1]}"</span>
                  <span className="text-[var(--text-tertiary)]">→</span>
                  <span className="text-emerald-400 font-bold">"{m.merged}"</span>
                  <span className="text-[10px] text-[var(--text-tertiary)]">{m.count} occurrences</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {!compact && <PostCanvasConsolidation content={BPE_PEDAGOGY} />}
    </div>
  );
};

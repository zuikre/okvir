import React, { useState } from 'react';
import { useOkvirStore } from '@/lib/store';
import { audio } from '@/lib/audio';

const TOKENS = ['The', 'animal', "didn't", 'cross', 'the', 'street', 'because', 'it', 'was', 'too', 'tired'];

// Pre-computed realistic self-attention patterns for Head 1 (Syntactic) and Head 2 (Coreference)
const ATTENTION_HEADS: Record<number, number[][]> = {
  1: [
    // Head 1: Syntactic adjacency
    [0.6, 0.3, 0.05, 0.02, 0.01, 0.01, 0.0, 0.0, 0.0, 0.0, 0.0],
    [0.1, 0.5, 0.3, 0.05, 0.02, 0.01, 0.01, 0.01, 0.0, 0.0, 0.0],
    [0.02, 0.15, 0.5, 0.25, 0.03, 0.02, 0.01, 0.01, 0.01, 0.0, 0.0],
    [0.01, 0.04, 0.2, 0.45, 0.15, 0.1, 0.02, 0.01, 0.01, 0.01, 0.0],
    [0.0, 0.01, 0.02, 0.1, 0.55, 0.3, 0.01, 0.0, 0.0, 0.0, 0.0],
    [0.0, 0.01, 0.01, 0.05, 0.2, 0.6, 0.08, 0.02, 0.01, 0.01, 0.01],
    [0.0, 0.0, 0.01, 0.02, 0.02, 0.05, 0.5, 0.25, 0.1, 0.03, 0.02],
    // Token "it": In Head 1, pays local attention to "because" and "was"
    [0.01, 0.08, 0.02, 0.03, 0.01, 0.02, 0.3, 0.35, 0.15, 0.02, 0.01],
    [0.0, 0.01, 0.01, 0.02, 0.01, 0.02, 0.05, 0.2, 0.5, 0.15, 0.04],
    [0.0, 0.0, 0.0, 0.01, 0.0, 0.01, 0.02, 0.05, 0.12, 0.55, 0.25],
    [0.0, 0.02, 0.01, 0.02, 0.0, 0.01, 0.02, 0.08, 0.15, 0.3, 0.4],
  ],
  2: [
    // Head 2: Coreference Resolution ("it" attends massively to "animal"!)
    [0.4, 0.4, 0.05, 0.05, 0.02, 0.02, 0.02, 0.02, 0.01, 0.01, 0.0],
    [0.1, 0.7, 0.05, 0.05, 0.02, 0.02, 0.02, 0.02, 0.01, 0.01, 0.0],
    [0.05, 0.3, 0.35, 0.15, 0.03, 0.03, 0.03, 0.03, 0.01, 0.01, 0.01],
    [0.02, 0.25, 0.1, 0.4, 0.05, 0.1, 0.02, 0.03, 0.01, 0.01, 0.01],
    [0.01, 0.05, 0.02, 0.05, 0.4, 0.4, 0.02, 0.02, 0.01, 0.01, 0.01],
    [0.01, 0.05, 0.02, 0.05, 0.15, 0.6, 0.04, 0.03, 0.02, 0.02, 0.01],
    [0.01, 0.1, 0.02, 0.03, 0.02, 0.04, 0.45, 0.2, 0.08, 0.03, 0.02],
    // Token "it": ATTENDS 72% TO "animal"! The Transformer solved pronoun reference!
    [0.02, 0.72, 0.01, 0.03, 0.01, 0.02, 0.04, 0.1, 0.03, 0.01, 0.01],
    [0.01, 0.15, 0.01, 0.02, 0.01, 0.02, 0.03, 0.15, 0.45, 0.1, 0.05],
    [0.0, 0.08, 0.01, 0.02, 0.01, 0.02, 0.02, 0.05, 0.1, 0.45, 0.24],
    // "tired" attends to "animal" and "it"
    [0.02, 0.45, 0.01, 0.02, 0.01, 0.02, 0.03, 0.2, 0.05, 0.08, 0.11],
  ],
};

export const AttentionHeatmapCanvas: React.FC = () => {
  const { language, config } = useOkvirStore();

  const [activeHead, setActiveHead] = useState<1 | 2>(2); // Default to Head 2 for the striking "it -> animal" resolution
  const [selectedTokenIdx, setSelectedTokenIdx] = useState<number>(7); // "it"

  const matrix = ATTENTION_HEADS[activeHead];
  const queryWeights = matrix[selectedTokenIdx] || [];

  const handleSelectToken = (idx: number) => {
    setSelectedTokenIdx(idx);
    if (config.soundEnabled) audio.playClick();
  };

  const handleSwitchHead = (head: 1 | 2) => {
    setActiveHead(head);
    if (config.soundEnabled) audio.playClick();
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Head Selector & Description */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-[var(--text-tertiary)] uppercase tracking-wider">
            {language === 'ar' ? 'رأس الانتباه:' : 'Attention Head:'}
          </span>
          <button
            onClick={() => handleSwitchHead(1)}
            className={`px-3 py-1 text-xs font-mono rounded-lg border transition-all ${
              activeHead === 1
                ? 'border-[var(--math-data)] bg-[var(--math-data)]/10 text-[var(--math-data)] font-bold'
                : 'border-[var(--border-subtle)] text-[var(--text-secondary)]'
            }`}
          >
            Head 1 ({language === 'ar' ? 'نحوي / مجاور' : 'Local Syntax'})
          </button>
          <button
            onClick={() => handleSwitchHead(2)}
            className={`px-3 py-1 text-xs font-mono rounded-lg border transition-all ${
              activeHead === 2
                ? 'border-purple-400 bg-purple-500/10 text-purple-300 font-bold'
                : 'border-[var(--border-subtle)] text-[var(--text-secondary)]'
            }`}
          >
            Head 2 ({language === 'ar' ? 'إحالة الضمائر' : 'Coreference'})
          </button>
        </div>

        <div className="text-[11px] font-mono text-[var(--text-tertiary)]">
          {activeHead === 2
            ? (language === 'ar' ? 'لاحظ كيف يربط الرأس 2 الضمير "it" بالاسم "animal" بقوة 72%' : 'Notice Head 2 links pronoun "it" to "animal" at 72%')
            : (language === 'ar' ? 'الرأس 1 يركز على الكلمات المجاورة نحوياً' : 'Head 1 focuses on local grammatical neighbors')}
        </div>
      </div>

      {/* Interactive Sentence Strip */}
      <div className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-app)] space-y-4">
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
                className={`relative px-3.5 py-2 rounded-xl text-xs font-mono transition-all flex flex-col items-center gap-1 ${
                  isSelected
                    ? 'border-2 border-[var(--math-prediction)] bg-[var(--math-prediction)]/20 text-[var(--text-primary)] font-bold shadow-lg scale-105'
                    : 'border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]'
                }`}
                style={{
                  backgroundColor: !isSelected && weight > 0.15 ? `rgba(168, 85, 247, ${Math.min(0.6, weight)})` : undefined,
                  color: !isSelected && weight > 0.15 ? '#fafafa' : undefined,
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

      {/* Scaled Dot-Product Math HUD */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] space-y-1">
          <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-tertiary)]">
            Active Query (q)
          </div>
          <div className="text-sm font-mono font-bold text-[var(--math-prediction)]">
            "{TOKENS[selectedTokenIdx]}"
          </div>
          <div className="text-[10px] text-[var(--text-tertiary)] font-mono">
            d_k = 64 dimensions
          </div>
        </div>

        <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] space-y-1">
          <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-tertiary)]">
            Primary Key Attended (k*)
          </div>
          <div className="text-sm font-mono font-bold text-emerald-400">
            {TOKENS[queryWeights.indexOf(Math.max(...queryWeights))]} ({(Math.max(...queryWeights) * 100).toFixed(1)}%)
          </div>
          <div className="text-[10px] text-[var(--text-tertiary)] font-mono">
            Highest softmax weight
          </div>
        </div>

        <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] space-y-1">
          <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-tertiary)]">
            Scaling Factor
          </div>
          <div className="text-sm font-mono font-bold text-sky-400">
            1 / √d_k = 0.125
          </div>
          <div className="text-[10px] text-[var(--text-tertiary)] font-mono">
            Prevents vanishing softmax gradients
          </div>
        </div>
      </div>
    </div>
  );
};

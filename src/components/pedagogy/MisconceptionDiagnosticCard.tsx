import React, { useState } from 'react';
import type { DiagnosticQuestion, MisconceptionProfile } from '@/lib/types';
import { useOkvirStore } from '@/lib/store';
import { audio } from '@/lib/audio';
import { HelpCircle, CheckCircle2, AlertTriangle, ArrowRight, RotateCcw } from 'lucide-react';
import { KaTeXMath } from '@/components/common/KaTeXMath';

interface MisconceptionDiagnosticCardProps {
  question: DiagnosticQuestion;
  misconceptions?: MisconceptionProfile[];
  onAnswerSelected?: (isCorrect: boolean, misconceptionId?: string) => void;
  className?: string;
}

export const MisconceptionDiagnosticCard: React.FC<MisconceptionDiagnosticCardProps> = ({
  question,
  misconceptions = [],
  onAnswerSelected,
  className = '',
}) => {
  const { language, config } = useOkvirStore();
  const isAr = language === 'ar';

  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const selectedOption = selectedIdx !== null ? question.options[selectedIdx] : null;
  const activeMisconception = selectedOption?.misconceptionId
    ? misconceptions.find((m) => m.id === selectedOption.misconceptionId)
    : null;

  const handleSelect = (idx: number) => {
    if (isSubmitted) return;
    setSelectedIdx(idx);
    if (config.soundEnabled) audio.playClick();
  };

  const handleSubmit = () => {
    if (selectedIdx === null || isSubmitted) return;
    setIsSubmitted(true);
    const correct = question.options[selectedIdx].correct;

    if (correct) {
      if (config.soundEnabled) audio.playVictoryHarmonics();
    } else {
      if (config.soundEnabled) audio.playErrorDissonance();
    }

    if (onAnswerSelected) {
      onAnswerSelected(correct, selectedOption?.misconceptionId);
    }
  };

  const handleReset = () => {
    setSelectedIdx(null);
    setIsSubmitted(false);
  };

  return (
    <div
      className={`p-5 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface)] shadow-lg ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3 text-xs">
        <div className="flex items-center gap-2 text-[var(--math-gradient)] font-bold uppercase tracking-wider">
          <HelpCircle className="w-4 h-4" />
          <span>
            {isAr
              ? `المرحلة 7: التقييم النشط وتشخيص المفاهيم (المستوى ${question.depthTier})`
              : `STAGE 7: ACTIVE DIAGNOSTIC TRANSFER (DEPTH TIER ${question.depthTier})`}
          </span>
        </div>
      </div>

      {/* Question prompt */}
      <p className="text-sm font-semibold text-[var(--text-primary)] mb-3 leading-relaxed">
        {isAr ? question.prompt.ar : question.prompt.en}
      </p>

      {/* Optional LaTeX anchor equation */}
      {question.latexAnchor && (
        <div className="my-3 py-2 px-3 rounded-lg bg-[var(--bg-app)] border border-[var(--border-subtle)] text-center">
          <KaTeXMath math={question.latexAnchor} block />
        </div>
      )}

      {/* Options */}
      <div className="space-y-2 mb-4">
        {question.options.map((opt, idx) => {
          const isSelected = selectedIdx === idx;
          let borderStyle = 'border-[var(--border-subtle)] hover:border-[var(--border-strong)]';
          const bgStyle = 'bg-[var(--bg-app)] text-[var(--text-secondary)]';

          if (isSubmitted) {
            if (opt.correct) {
              borderStyle = 'border-emerald-500 bg-emerald-950/40 text-emerald-200';
            } else if (isSelected && !opt.correct) {
              borderStyle = 'border-rose-500 bg-rose-950/40 text-rose-200';
            }
          } else if (isSelected) {
            borderStyle = 'border-[var(--math-prediction)] bg-[var(--bg-surface-active)] text-[var(--text-primary)]';
          }

          return (
            <button
              key={idx}
              disabled={isSubmitted}
              onClick={() => handleSelect(idx)}
              className={`w-full text-start p-3 rounded-lg border text-xs transition-all flex items-start gap-2.5 ${borderStyle} ${bgStyle}`}
            >
              <span className="font-mono font-bold text-[var(--text-tertiary)] shrink-0">
                {String.fromCharCode(65 + idx)}.
              </span>
              <span className="leading-relaxed">{isAr ? opt.text.ar : opt.text.en}</span>
            </button>
          );
        })}
      </div>

      {/* Submit / Reset Actions */}
      {!isSubmitted ? (
        <button
          onClick={handleSubmit}
          disabled={selectedIdx === null}
          className={`w-full py-2.5 rounded-lg text-xs font-semibold transition-all shadow ${
            selectedIdx !== null
              ? 'bg-[var(--math-prediction)] text-white hover:brightness-110 cursor-pointer'
              : 'bg-[var(--border-subtle)] text-[var(--text-disabled)] cursor-not-allowed'
          }`}
        >
          {isAr ? 'تأكيد الإجابة وتشخيص الفهم' : 'Submit Answer for Diagnostic Evaluation'}
        </button>
      ) : (
        <div className="space-y-3 animate-fade-in">
          {/* Result Feedback */}
          {selectedOption?.correct ? (
            <div className="p-3.5 rounded-lg border border-emerald-800 bg-emerald-950/40 text-emerald-200 text-xs flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">
                  {isAr ? 'إجابة دقيقة وصحيحة علمياً! ★' : 'Accurate & Rigorous Deduction! ★'}
                </span>
                <p className="mt-1 leading-relaxed">
                  {isAr
                    ? selectedOption.diagnosticFeedback.ar
                    : selectedOption.diagnosticFeedback.en}
                </p>
              </div>
            </div>
          ) : (
            <div className="p-3.5 rounded-lg border border-rose-800 bg-rose-950/40 text-rose-200 text-xs flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div className="space-y-1.5 flex-1">
                <span className="font-bold">
                  {isAr ? 'تشخيص الخطأ المفهومي:' : 'Cognitive Trap Diagnosed:'}
                </span>

                <p className="leading-relaxed">
                  {isAr
                    ? selectedOption?.diagnosticFeedback.ar
                    : selectedOption?.diagnosticFeedback.en}
                </p>

                {activeMisconception && (
                  <div className="mt-2 pt-2 border-t border-rose-900/60 text-rose-300">
                    <span className="font-bold underline block mb-1">
                      {isAr ? 'لماذا يبدو هذا الخطأ مقنعاً؟' : 'Why this trap is intuitive:'}
                    </span>
                    <p className="leading-relaxed text-[11px]">
                      {isAr ? activeMisconception.refutationText.ar : activeMisconception.refutationText.en}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <button
              onClick={handleReset}
              className="px-3 py-1.5 rounded-lg text-xs border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] flex items-center gap-1.5 transition-all"
            >
              <RotateCcw className="w-3 h-3" />
              <span>{isAr ? 'إعادة المحاولة' : 'Retry Dilemma'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

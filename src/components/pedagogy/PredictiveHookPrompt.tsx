import React, { useState } from 'react';
import type { PredictiveHookPrompt as PredictiveHookPromptType } from '@/lib/types';
import { useOkvirStore } from '@/lib/store';
import { audio } from '@/lib/audio';
import { Lightbulb, CheckCircle2, AlertCircle } from 'lucide-react';

interface PredictiveHookPromptProps {
  prompt: PredictiveHookPromptType;
  onCommit: (selectedChoiceId: string) => void;
  className?: string;
}

export const PredictiveHookPrompt: React.FC<PredictiveHookPromptProps> = ({
  prompt,
  onCommit,
  className = '',
}) => {
  const { language, config } = useOkvirStore();
  const isAr = language === 'ar';
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isCommitted, setIsCommitted] = useState(false);

  const handleSelect = (id: string) => {
    if (isCommitted) return;
    setSelectedId(id);
    if (config.soundEnabled) audio.playClick();
  };

  const handleCommit = () => {
    if (!selectedId || isCommitted) return;
    setIsCommitted(true);
    if (config.soundEnabled) audio.playSuccessChime();
    onCommit(selectedId);
  };

  return (
    <div
      className={`p-5 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface)] shadow-lg ${className}`}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-3 text-[var(--math-gradient)]">
        <Lightbulb className="w-5 h-5 animate-pulse" />
        <span className="text-xs uppercase tracking-wider font-bold">
          {isAr ? 'المرحلة 1: صياغة الفرضية والتوقع' : 'STAGE 1: HYPOTHESIS & PREDICTION'}
        </span>
      </div>

      {/* Scenario framing */}
      <p className="text-sm font-medium text-[var(--text-primary)] mb-2 leading-relaxed">
        {isAr ? prompt.scenario.ar : prompt.scenario.en}
      </p>

      {/* Core Question prompt */}
      <p className="text-xs text-[var(--text-secondary)] mb-4">
        {isAr ? prompt.prompt.ar : prompt.prompt.en}
      </p>

      {/* Prediction choices */}
      <div className="space-y-2 mb-4">
        {prompt.predictionChoices.map((choice) => {
          const isSelected = selectedId === choice.id;
          return (
            <button
              key={choice.id}
              onClick={() => handleSelect(choice.id)}
              disabled={isCommitted}
              className={`w-full text-start p-3 rounded-lg border text-xs transition-all duration-150 flex items-start gap-2.5 ${
                isSelected
                  ? 'border-[var(--math-prediction)] bg-[var(--bg-surface-active)] text-[var(--text-primary)] shadow-sm'
                  : 'border-[var(--border-subtle)] bg-[var(--bg-app)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]'
              }`}
            >
              <span
                className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                  isSelected
                    ? 'border-[var(--math-prediction)] bg-[var(--math-prediction)] text-white'
                    : 'border-[var(--border-strong)]'
                }`}
              >
                {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
              </span>
              <span className="leading-relaxed">
                {isAr ? choice.text.ar : choice.text.en}
              </span>
            </button>
          );
        })}
      </div>

      {/* Action / Reveal */}
      {!isCommitted ? (
        <button
          onClick={handleCommit}
          disabled={!selectedId}
          className={`w-full py-2.5 rounded-lg text-xs font-semibold transition-all shadow-md ${
            selectedId
              ? 'bg-[var(--math-prediction)] text-white hover:brightness-110 cursor-pointer'
              : 'bg-[var(--border-subtle)] text-[var(--text-disabled)] cursor-not-allowed'
          }`}
        >
          {isAr ? 'تأكيد التوقع وإلغاء قفل التجربة' : 'Lock in Prediction & Unlock Laboratory'}
        </button>
      ) : (
        <div className="p-3.5 rounded-lg border border-emerald-800 bg-emerald-950/40 text-emerald-200 text-xs animate-fade-in flex items-start gap-2.5">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold">
              {isAr ? 'تم تسجيل فرضيتك!' : 'Prediction Registered!'}
            </span>
            <p className="text-emerald-300/90 leading-relaxed">
              {isAr ? prompt.revealExplanation.ar : prompt.revealExplanation.en}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

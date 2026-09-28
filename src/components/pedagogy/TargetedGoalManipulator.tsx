import React, { useEffect, useState } from 'react';
import type { TargetedMicroGoal } from '@/lib/types';
import { useOkvirStore } from '@/lib/store';
import { audio } from '@/lib/audio';
import { Target, CheckCircle, HelpCircle, ChevronDown, Sparkles } from 'lucide-react';

interface TargetedGoalManipulatorProps {
  goal: TargetedMicroGoal;
  currentValue: number;
  onGoalAchieved?: () => void;
  className?: string;
}

export const TargetedGoalManipulator: React.FC<TargetedGoalManipulatorProps> = ({
  goal,
  currentValue,
  onGoalAchieved,
  className = '',
}) => {
  const { language, config } = useOkvirStore();
  const isAr = language === 'ar';

  const delta = Math.abs(currentValue - goal.targetValue);
  const isAchieved = delta <= goal.tolerance;
  const [hasTriggeredCelebration, setHasTriggeredCelebration] = useState(false);
  const [hintTier, setHintTier] = useState<0 | 1 | 2 | 3>(0);

  useEffect(() => {
    if (isAchieved && !hasTriggeredCelebration) {
      setHasTriggeredCelebration(true);
      if (config.soundEnabled) audio.playVictoryHarmonics();
      if (onGoalAchieved) onGoalAchieved();
    }
  }, [isAchieved, hasTriggeredCelebration, config.soundEnabled, onGoalAchieved]);

  // Compute normalized distance percentage (0% = target reached, 100% = far)
  const maxSpread = Math.max(goal.tolerance * 10, Math.abs(goal.targetValue) * 2 || 10);
  const proximityPercent = Math.max(0, Math.min(100, Math.round((1 - delta / maxSpread) * 100)));

  return (
    <div
      className={`p-4 rounded-xl border transition-all duration-300 ${
        isAchieved
          ? 'border-emerald-600 bg-emerald-950/20 shadow-md shadow-emerald-950/30'
          : 'border-[var(--border-subtle)] bg-[var(--bg-surface)]'
      } ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Target
            className={`w-4 h-4 ${
              isAchieved ? 'text-emerald-400' : 'text-[var(--math-gradient)]'
            }`}
          />
          <span className="text-xs font-bold uppercase text-[var(--text-primary)]">
            {isAr ? goal.title.ar : goal.title.en}
          </span>
        </div>

        {isAchieved ? (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 animate-fade-in">
            <CheckCircle className="w-3.5 h-3.5" />
            {isAr ? 'تم تحقيق الهدف! ★' : 'GOAL REACHED! ★'}
          </span>
        ) : (
          <span className="text-[11px] font-mono text-[var(--text-tertiary)]">
            Δ: {delta.toFixed(3)} (±{goal.tolerance})
          </span>
        )}
      </div>

      {/* Instructions */}
      <p className="text-xs text-[var(--text-secondary)] mb-3 leading-relaxed">
        {isAr ? goal.instructions.ar : goal.instructions.en}
      </p>

      {/* Invariant Gauge */}
      <div className="space-y-1 mb-3">
        <div className="flex justify-between text-[10px] font-mono text-[var(--text-tertiary)]">
          <span>{goal.targetMetric}</span>
          <span>
            {currentValue.toFixed(2)} / {goal.targetValue.toFixed(2)}
          </span>
        </div>

        <div className="h-2 w-full bg-[var(--bg-app)] border border-[var(--border-subtle)] rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-200 ${
              isAchieved
                ? 'bg-emerald-500'
                : delta < goal.tolerance * 2
                ? 'bg-[var(--math-gradient)]'
                : 'bg-[var(--math-data)]'
            }`}
            style={{ width: `${proximityPercent}%` }}
          />
        </div>
      </div>

      {/* Success Celebration Callout */}
      {isAchieved && (
        <div className="p-2.5 rounded-lg border border-emerald-800 bg-emerald-950/40 text-emerald-200 text-xs mb-3 flex items-start gap-2">
          <Sparkles className="w-4 h-4 text-emerald-300 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            {isAr ? goal.successCelebration.ar : goal.successCelebration.en}
          </p>
        </div>
      )}

      {/* Socratic Hint Ladder */}
      {goal.hintLadder && !isAchieved && (
        <div className="border-t border-[var(--border-subtle)] pt-2 mt-2">
          <button
            onClick={() => setHintTier((prev) => (prev < 3 ? ((prev + 1) as 1 | 2 | 3) : 0))}
            className="flex items-center gap-1.5 text-[11px] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>
              {isAr
                ? hintTier === 0
                  ? 'هل أنت عالق؟ اطلب تلميحاً سقراطياً'
                  : `تلميح المستوى ${hintTier} / 3`
                : hintTier === 0
                ? 'Stuck? Request Socratic Hint'
                : `Hint Tier ${hintTier} / 3`}
            </span>
            <ChevronDown
              className={`w-3 h-3 transition-transform ${hintTier > 0 ? 'rotate-180' : ''}`}
            />
          </button>

          {hintTier > 0 && (
            <div className="mt-2 p-2 rounded bg-[var(--bg-app)] border border-[var(--border-subtle)] text-xs text-[var(--text-secondary)]">
              {hintTier === 1 && (isAr ? goal.hintLadder.tier1.ar : goal.hintLadder.tier1.en)}
              {hintTier === 2 && (isAr ? goal.hintLadder.tier2.ar : goal.hintLadder.tier2.en)}
              {hintTier === 3 && (isAr ? goal.hintLadder.tier3.ar : goal.hintLadder.tier3.en)}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

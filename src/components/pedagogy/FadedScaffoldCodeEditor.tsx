import React, { useState } from 'react';
import type { FadedCodeStep, TestCase } from '@/lib/types';
import { useOkvirStore } from '@/lib/store';
import { audio } from '@/lib/audio';
import { Code2, ArrowUpDown, Check, Play, Sparkles, RefreshCw } from 'lucide-react';
import { CodeChallengeEditor } from '@/components/editor/CodeChallengeEditor';

interface FadedScaffoldCodeEditorProps {
  scaffold: FadedCodeStep;
  challengeId: string;
  onSuccess?: () => void;
  className?: string;
}

export const FadedScaffoldCodeEditor: React.FC<FadedScaffoldCodeEditorProps> = ({
  scaffold,
  challengeId,
  onSuccess,
  className = '',
}) => {
  const { language, config } = useOkvirStore();
  const isAr = language === 'ar';

  const [activeTier, setActiveTier] = useState<'parsons' | 'skeleton' | 'autonomous'>(
    scaffold.parsonsBlocks && scaffold.parsonsBlocks.length > 0 ? 'parsons' : 'autonomous'
  );

  // Parsons state
  const [parsonsBlocks, setParsonsBlocks] = useState(
    scaffold.parsonsBlocks ? [...scaffold.parsonsBlocks].sort(() => Math.random() - 0.5) : []
  );
  const [parsonsPassed, setParsonsPassed] = useState(false);

  // Move block up or down
  const moveBlock = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= parsonsBlocks.length) return;
    const copy = [...parsonsBlocks];
    const temp = copy[index];
    copy[index] = copy[newIndex];
    copy[newIndex] = temp;
    setParsonsBlocks(copy);
    if (config.soundEnabled) audio.playClick();
  };

  const verifyParsons = () => {
    const isCorrect = parsonsBlocks.every((block, idx) => block.correctOrderIndex === idx);
    if (isCorrect) {
      setParsonsPassed(true);
      if (config.soundEnabled) audio.playSuccessChime();
      setActiveTier('autonomous');
    } else {
      if (config.soundEnabled) audio.playErrorDissonance();
    }
  };

  return (
    <div
      className={`flex flex-col rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] overflow-hidden ${className}`}
    >
      {/* Tier Switcher Navigation */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-[var(--border-subtle)] bg-[var(--bg-app)]">
        <div className="flex items-center gap-2">
          <Code2 className="w-4 h-4 text-[var(--math-vector)]" />
          <span className="text-xs font-bold uppercase text-[var(--text-primary)]">
            {isAr ? 'المرحلة 5: البناء البرمجي المتدرج' : 'STAGE 5: FADED CODE SCAFFOLD'}
          </span>
        </div>

        <div className="flex items-center gap-1">
          {scaffold.parsonsBlocks && (
            <button
              onClick={() => setActiveTier('parsons')}
              className={`px-2 py-1 rounded text-[11px] font-semibold transition-all ${
                activeTier === 'parsons'
                  ? 'bg-[var(--math-vector)] text-black'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              1. {isAr ? 'ترتيب بارسونز' : 'Parsons Reorder'}
            </button>
          )}

          <button
            onClick={() => setActiveTier('autonomous')}
            className={`px-2 py-1 rounded text-[11px] font-semibold transition-all ${
              activeTier === 'autonomous'
                ? 'bg-[var(--math-vector)] text-black'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            {scaffold.parsonsBlocks ? '2. ' : ''}
            {isAr ? 'المختبر المستقل' : 'Autonomous Lab'}
          </button>
        </div>
      </div>

      {/* Instructions */}
      <div className="px-4 py-2 bg-[var(--bg-surface-active)] text-xs text-[var(--text-secondary)] border-b border-[var(--border-subtle)]">
        {isAr ? scaffold.instructions.ar : scaffold.instructions.en}
      </div>

      {/* Content depending on active tier */}
      {activeTier === 'parsons' && (
        <div className="p-4 space-y-3">
          <p className="text-xs text-[var(--text-tertiary)]">
            {isAr
              ? 'قم بإعادة ترتيب الأسطر البرمجية التالية بالترتيب الحسابي الصحيح لخوارزمية المتجهات:'
              : 'Reorder the following vectorized statements into the correct computational sequence:'}
          </p>

          <div className="space-y-2">
            {parsonsBlocks.map((block, idx) => (
              <div
                key={block.id}
                className="flex items-center justify-between p-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-app)] font-mono text-xs text-[var(--text-primary)]"
              >
                <span>{block.code}</span>
                <div className="flex items-center gap-1">
                  <button
                    disabled={idx === 0}
                    onClick={() => moveBlock(idx, 'up')}
                    className="p-1 rounded hover:bg-[var(--bg-surface-hover)] disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    ▲
                  </button>
                  <button
                    disabled={idx === parsonsBlocks.length - 1}
                    onClick={() => moveBlock(idx, 'down')}
                    className="p-1 rounded hover:bg-[var(--bg-surface-hover)] disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    ▼
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={verifyParsons}
              className="px-4 py-2 rounded-lg text-xs font-semibold bg-[var(--math-vector)] text-black hover:brightness-110 flex items-center gap-1.5 shadow"
            >
              <Check className="w-3.5 h-3.5" />
              <span>{isAr ? 'التحقق من الترتيب' : 'Verify Logical Order'}</span>
            </button>
          </div>
        </div>
      )}

      {activeTier === 'autonomous' && (
        <div className="flex-1 p-2">
          <CodeChallengeEditor
            challenge={{
              id: challengeId,
              starterCode: scaffold.autonomousStarter,
              testCases: scaffold.testCases,
              expectedOutput: '',
            }}
            onComplete={onSuccess}
          />
        </div>
      )}
    </div>
  );
};

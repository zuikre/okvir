import React, { useState, useMemo } from 'react';
import type { FadedCodeStep } from '@/lib/types';
import { useOkvirStore } from '@/lib/store';
import { audio } from '@/lib/audio';
import { Code2, Check, LayoutTemplate, Terminal } from 'lucide-react';
import { CodeChallengeEditor } from '@/components/editor/CodeChallengeEditor';

interface FadedScaffoldCodeEditorProps {
  scaffold: FadedCodeStep;
  challengeId: string;
  onSuccess?: () => void;
  className?: string;
}

function synthesizeSkeleton(starterCode: string) {
  // Simple heuristic: mask assignments or common operations
  let template = starterCode;
  const holes: Record<string, string> = {};
  
  let holeIndex = 0;
  
  // Replace simple math operations or array indexing if we can't find anything better
  template = template.replace(/np\.([a-zA-Z0-9_]+)/g, (match, p1) => {
    if (holeIndex > 2) return match;
    const holeId = `hole_${holeIndex++}`;
    holes[holeId] = p1; // e.g. "dot" or "zeros"
    return `np.___`;
  });
  
  if (holeIndex === 0) {
    template = template.replace(/([=+\-*/])\s*([a-zA-Z0-9_.]+)/, (match, op, val) => {
      const holeId = `hole_${holeIndex++}`;
      holes[holeId] = val;
      return `${op} ___`;
    });
  }

  // fallback if nothing matches
  if (holeIndex === 0 && template.trim().length > 0) {
    const lines = template.split('\n');
    if (lines.length > 1) {
      const holeId = `hole_0`;
      holes[holeId] = lines[1].trim();
      lines[1] = lines[1].replace(lines[1].trim(), '___');
      template = lines.join('\n');
    }
  }

  return { template, holes };
}

export const FadedScaffoldCodeEditor: React.FC<FadedScaffoldCodeEditorProps> = ({
  scaffold,
  challengeId,
  onSuccess,
  className = '',
}) => {
  const { language, config } = useOkvirStore();
  const isAr = language === 'ar';

  const generatedSkeleton = useMemo(() => {
    if (scaffold.skeletonTemplate && scaffold.solutionHoles) {
      return { template: scaffold.skeletonTemplate, holes: scaffold.solutionHoles };
    }
    return synthesizeSkeleton(scaffold.autonomousStarter);
  }, [scaffold]);

  const [activeTier, setActiveTier] = useState<'skeleton' | 'autonomous'>('autonomous');
  const [skeletonAnswers, setSkeletonAnswers] = useState<Record<string, string>>({});

  const handleSkeletonChange = (holeId: string, value: string) => {
    setSkeletonAnswers(prev => ({ ...prev, [holeId]: value }));
  };

  const verifySkeleton = () => {
    let correct = true;
    for (const [holeId, expected] of Object.entries(generatedSkeleton.holes)) {
      if (skeletonAnswers[holeId]?.trim() !== expected.trim()) {
        correct = false;
        break;
      }
    }
    if (correct) {
      if (config.soundEnabled) audio.playSuccessChime();
      setActiveTier('autonomous');
    } else {
      if (config.soundEnabled) audio.playErrorDissonance();
    }
  };

  const renderSkeletonTemplate = () => {
    const parts = generatedSkeleton.template.split('___');
    const holeKeys = Object.keys(generatedSkeleton.holes);

    return (
      <pre className="font-mono text-sm p-4 text-[var(--text-primary)] overflow-x-auto">
        {parts.map((part, i) => (
          <React.Fragment key={i}>
            {part}
            {i < parts.length - 1 && (
              <input
                type="text"
                className="bg-[var(--bg-surface-active)] border border-[var(--border-strong)] rounded px-1.5 py-0.5 w-24 text-center font-mono text-[var(--math-vector)] focus:outline-none focus:border-[var(--math-vector)] inline-block mx-1"
                value={skeletonAnswers[holeKeys[i]] || ''}
                onChange={(e) => handleSkeletonChange(holeKeys[i], e.target.value)}
              />
            )}
          </React.Fragment>
        ))}
      </pre>
    );
  };

  return (
    <div
      className={`flex flex-col rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] overflow-hidden ${className}`}
    >
      {/* Tier Switcher Navigation */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-[var(--border-subtle)] bg-[var(--bg-app)] overflow-x-auto">
        <div className="flex items-center gap-2 min-w-max">
          <Code2 className="w-4 h-4 text-[var(--math-vector)]" />
          <span className="text-xs font-bold uppercase text-[var(--text-primary)]">
            {isAr ? 'المرحلة 5: المختبر البرمجي' : 'STAGE 5: CODE LAB'}
          </span>
        </div>

        <div className="flex items-center gap-1 min-w-max ml-4">
          <button
            onClick={() => setActiveTier('skeleton')}
            className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTier === 'skeleton'
                ? 'bg-[var(--math-vector)] text-black'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <LayoutTemplate className="w-3 h-3" />
            1. {isAr ? 'القالب التوجيهي' : 'Guided Skeleton'}
          </button>

          <button
            onClick={() => setActiveTier('autonomous')}
            className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTier === 'autonomous'
                ? 'bg-[var(--math-vector)] text-black'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <Terminal className="w-3 h-3" />
            2. {isAr ? 'المختبر المستقل' : 'Autonomous Lab'}
          </button>
        </div>
      </div>

      {/* Instructions */}
      <div className="px-4 py-2 bg-[var(--bg-surface-active)] text-xs text-[var(--text-secondary)] border-b border-[var(--border-subtle)]">
        {isAr ? scaffold.instructions.ar : scaffold.instructions.en}
      </div>

      {/* Content depending on active tier */}
      {activeTier === 'skeleton' && (
        <div className="p-4 space-y-3">
          <p className="text-xs text-[var(--text-tertiary)]">
            {isAr
              ? 'أكمل الفراغات في الكود البرمجي التالي لاستكمال الخوارزمية:'
              : 'Fill in the blanks to complete the algorithm template:'}
          </p>

          <div className="bg-[var(--bg-app)] border border-[var(--border-subtle)] rounded-lg overflow-hidden">
            {renderSkeletonTemplate()}
          </div>

          <div className="flex justify-between items-center pt-2">
            <button
              onClick={() => setActiveTier('autonomous')}
              className="text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] underline cursor-pointer"
            >
              {isAr ? 'تخطي إلى المختبر الكامل ➔' : 'Skip to full editor ➔'}
            </button>
            <button
              onClick={verifySkeleton}
              className="px-4 py-2 rounded-lg text-xs font-semibold bg-[var(--math-vector)] text-black hover:brightness-110 flex items-center gap-1.5 shadow cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" />
              <span>{isAr ? 'التحقق والمتابعة' : 'Verify & Proceed'}</span>
            </button>
          </div>
        </div>
      )}

      {activeTier === 'autonomous' && (
        <div className="flex-1 p-2 min-h-[300px] flex flex-col">
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

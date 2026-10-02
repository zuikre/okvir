import React, { useState, useEffect, useMemo } from 'react';
import type { FadedCodeStep, TestCase } from '@/lib/types';
import { useOkvirStore } from '@/lib/store';
import { audio } from '@/lib/audio';
import { Code2, ArrowUpDown, Check, Play, Sparkles, RefreshCw, LayoutTemplate, Terminal } from 'lucide-react';
import { CodeChallengeEditor } from '@/components/editor/CodeChallengeEditor';

interface FadedScaffoldCodeEditorProps {
  scaffold: FadedCodeStep;
  challengeId: string;
  onSuccess?: () => void;
  className?: string;
}

// Scaffold synthesizer logic
function synthesizeParsonsBlocks(starterCode: string) {
  const lines = starterCode.split('\n').filter(l => l.trim() !== '');
  return lines.map((code, idx) => ({
    id: `syn-parsons-${idx}`,
    code,
    correctOrderIndex: idx,
  })).sort(() => Math.random() - 0.5);
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

  const generatedParsons = useMemo(() => {
    if (scaffold.parsonsBlocks && scaffold.parsonsBlocks.length > 0) return scaffold.parsonsBlocks;
    return synthesizeParsonsBlocks(scaffold.autonomousStarter);
  }, [scaffold]);

  const generatedSkeleton = useMemo(() => {
    if (scaffold.skeletonTemplate && scaffold.solutionHoles) {
      return { template: scaffold.skeletonTemplate, holes: scaffold.solutionHoles };
    }
    return synthesizeSkeleton(scaffold.autonomousStarter);
  }, [scaffold]);

  const [activeTier, setActiveTier] = useState<'parsons' | 'skeleton' | 'autonomous'>('parsons');

  // Parsons state
  const [parsonsBlocks, setParsonsBlocks] = useState(
    [...generatedParsons].sort(() => Math.random() - 0.5)
  );
  const [parsonsPassed, setParsonsPassed] = useState(false);
  
  useEffect(() => {
    setParsonsBlocks([...generatedParsons].sort(() => Math.random() - 0.5));
  }, [generatedParsons]);

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
      setActiveTier('skeleton');
    } else {
      if (config.soundEnabled) audio.playErrorDissonance();
    }
  };
  
  // Skeleton state
  const [skeletonAnswers, setSkeletonAnswers] = useState<Record<string, string>>({});
  const [skeletonPassed, setSkeletonPassed] = useState(false);
  
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
      setSkeletonPassed(true);
      if (config.soundEnabled) audio.playSuccessChime();
      setActiveTier('autonomous');
    } else {
      if (config.soundEnabled) audio.playErrorDissonance();
    }
  };

  // Helper to render skeleton template with inputs
  const renderSkeletonTemplate = () => {
    const parts = generatedSkeleton.template.split('___');
    const holeKeys = Object.keys(generatedSkeleton.holes);
    
    return (
      <pre className="font-mono text-sm p-4 text-[var(--text-primary)]">
        {parts.map((part, i) => (
          <React.Fragment key={i}>
            {part}
            {i < parts.length - 1 && (
              <input
                type="text"
                className="bg-[var(--bg-surface-active)] border border-[var(--border-strong)] rounded px-1 py-0.5 w-20 text-center text-[var(--math-vector)] focus:outline-none focus:border-[var(--math-vector)] inline-block mx-1"
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
            {isAr ? 'المرحلة 5: البناء البرمجي المتدرج' : 'STAGE 5: FADED CODE SCAFFOLD'}
          </span>
        </div>

        <div className="flex items-center gap-1 min-w-max ml-4">
          <button
            onClick={() => setActiveTier('parsons')}
            className={`px-2 py-1 rounded text-[11px] font-semibold transition-all flex items-center gap-1 ${
              activeTier === 'parsons'
                ? 'bg-[var(--math-vector)] text-black'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <ArrowUpDown className="w-3 h-3" />
            1. {isAr ? 'ترتيب بارسونز' : 'Parsons Reorder'}
          </button>

          <button
            onClick={() => setActiveTier('skeleton')}
            className={`px-2 py-1 rounded text-[11px] font-semibold transition-all flex items-center gap-1 ${
              activeTier === 'skeleton'
                ? 'bg-[var(--math-vector)] text-black'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <LayoutTemplate className="w-3 h-3" />
            2. {isAr ? 'القالب الهيكلي' : 'Skeleton Fill'}
          </button>

          <button
            onClick={() => setActiveTier('autonomous')}
            className={`px-2 py-1 rounded text-[11px] font-semibold transition-all flex items-center gap-1 ${
              activeTier === 'autonomous'
                ? 'bg-[var(--math-vector)] text-black'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
             <Terminal className="w-3 h-3" />
            3. {isAr ? 'المختبر المستقل' : 'Autonomous Lab'}
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
              className="px-4 py-2 rounded-lg text-xs font-semibold bg-[var(--math-vector)] text-black hover:brightness-110 flex items-center gap-1.5 shadow cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" />
              <span>{isAr ? 'التحقق من الترتيب' : 'Verify Logical Order'}</span>
            </button>
          </div>
        </div>
      )}
      
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
          
           <div className="flex justify-end pt-2">
            <button
              onClick={verifySkeleton}
              className="px-4 py-2 rounded-lg text-xs font-semibold bg-[var(--math-vector)] text-black hover:brightness-110 flex items-center gap-1.5 shadow cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" />
              <span>{isAr ? 'التحقق من القالب' : 'Verify Skeleton'}</span>
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

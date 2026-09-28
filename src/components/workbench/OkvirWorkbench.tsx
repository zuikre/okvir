import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Terminal,
  Cpu,
  Layers,
  Sparkles,
  Sliders,
  HelpCircle,
  Activity,
  Code2,
  Maximize2,
  Minimize2,
} from 'lucide-react';
import { useOkvirStore } from '@/lib/store';
import { curriculum } from '@/lib/curriculum';
import { SimulationView } from '@/components/simulation/SimulationView';
import { CodeChallengeEditor } from '@/components/editor/CodeChallengeEditor';
import { VariableInspector } from '@/components/editor/VariableInspector';
import { useCodeCanvasBridge } from '@/lib/pyodide/useCodeCanvasBridge';
import { useFormulaAnchorStore } from '@/lib/formulaAnchorStore';
import { KaTeXMath } from '@/components/common/KaTeXMath';
import { MathText } from '@/components/common/MathText';
import { MultiTierDisclosure } from '@/components/pedagogy/MultiTierDisclosure';
import { audio } from '@/lib/audio';
import type { BeatNumber, SimulationType } from '@/lib/types';

export const OkvirWorkbench: React.FC = () => {
  const {
    activeLessonId,
    language,
    lessons,
    config,
    updateLessonBeat,
    completeLesson,
    setCurrentView,
    slope,
    intercept,
    setSlope,
    setIntercept,
  } = useOkvirStore();

  const isAr = language === 'ar';
  const mod = curriculum.find((m) => m.id === activeLessonId) || curriculum[0];
  const progress = lessons[activeLessonId] || {
    id: mod.id,
    title: mod.title,
    titleAr: mod.titleAr,
    trackId: mod.trackId,
    status: 'in_progress',
    currentBeat: 1,
    stability: 0,
    difficulty: 0,
    lastReviewed: null,
    completedBeats: [],
  };

  const currentBeat = progress.currentBeat || 1;

  // Deck Tabs: 1 = Canvas, 2 = Code Sandbox / REPL, 3 = Tensor HUD, 4 = Profiler
  const [activeDeckTab, setActiveDeckTab] = useState<'canvas' | 'code' | 'inspector' | 'profiler'>('canvas');
  const [isFocusDeck, setIsFocusDeck] = useState(false);
  const [selectedQuizIdx, setSelectedQuizIdx] = useState<number | null>(null);

  // Reactive WASM bridge
  const { isReady, isRunning, variables, memory, logs, executionTimeMs, runCode } = useCodeCanvasBridge();

  // Formula anchor
  const { activeToken, setActiveToken } = useFormulaAnchorStore();

  const beatObj = mod.beats.find((b) => b.number === currentBeat) || mod.beats[0];

  // Linear.app style keyboard shortcuts (⌘1, ⌘2, ⌥1..4, ⌘Enter)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target && target.matches('input, textarea, select')) return;

      if ((e.metaKey || e.ctrlKey) && e.key === '1') {
        e.preventDefault();
        setIsFocusDeck(false);
        if (config.soundEnabled) audio.playClick();
      } else if ((e.metaKey || e.ctrlKey) && e.key === '2') {
        e.preventDefault();
        setIsFocusDeck(true);
        if (config.soundEnabled) audio.playClick();
      } else if (e.altKey && e.key === '1') {
        e.preventDefault();
        setActiveDeckTab('canvas');
        if (config.soundEnabled) audio.playClick();
      } else if (e.altKey && e.key === '2') {
        e.preventDefault();
        setActiveDeckTab('code');
        if (config.soundEnabled) audio.playClick();
      } else if (e.altKey && e.key === '3') {
        e.preventDefault();
        setActiveDeckTab('inspector');
        if (config.soundEnabled) audio.playClick();
      } else if (e.altKey && e.key === '4') {
        e.preventDefault();
        setActiveDeckTab('profiler');
        if (config.soundEnabled) audio.playClick();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [config.soundEnabled]);

  const setBeat = (b: BeatNumber) => {
    updateLessonBeat(mod.id, b);
    if (config.soundEnabled) audio.playClick();
  };

  const handleNext = () => {
    if (currentBeat < 4) {
      setBeat((currentBeat + 1) as BeatNumber);
      if (config.soundEnabled) audio.playSuccessChime();
    } else {
      if (selectedQuizIdx !== null) {
        completeLesson(mod.id);
        if (config.soundEnabled) audio.playVictoryHarmonics();
        setCurrentView('constellation');
      }
    }
  };

  const handlePrev = () => {
    if (currentBeat > 1) {
      setBeat((currentBeat - 1) as BeatNumber);
      if (config.soundEnabled) audio.playClick();
    }
  };

  // Determine active simulation type
  const simType: SimulationType =
    beatObj.simulation ||
    (mod.id.includes('ols')
      ? 'ols'
      : mod.id.includes('knn')
      ? 'knn'
      : mod.id.includes('kmeans')
      ? 'kmeans'
      : mod.id.includes('gradient')
      ? 'gradient'
      : mod.id.includes('vector') || mod.id.includes('dot')
      ? 'vectors'
      : mod.id.includes('attention')
      ? 'attention'
      : mod.id.includes('conv')
      ? 'conv'
      : mod.id.includes('tree')
      ? 'tree'
      : mod.id.includes('regularization') || mod.id.includes('ridge')
      ? 'regularization'
      : 'ols');

  return (
    <div className="flex flex-col h-screen w-full bg-[var(--bg-app)] text-[var(--text-primary)] overflow-hidden font-sans select-none">
      {/* Top Instrument Header */}
      <header className="h-12 border-b border-[var(--border-subtle)] bg-[var(--bg-surface)] px-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentView('constellation')}
            className="p-1.5 rounded-lg border border-[var(--border-subtle)] hover:bg-[var(--bg-surface-hover)] text-[var(--text-secondary)] transition-all flex items-center gap-1 text-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5 rtl-flip" />
            <span className="hidden sm:inline font-mono font-medium">ESC</span>
          </button>

          <div className="h-4 w-[1px] bg-[var(--border-subtle)]" />

          <div>
            <h1 className="text-xs font-bold text-[var(--text-primary)]">
              {isAr ? mod.titleAr : mod.title}
            </h1>
            <span className="text-[10px] text-[var(--text-tertiary)] font-mono uppercase">
              {mod.trackId} • {mod.estimatedMinutes} {isAr ? 'دقيقة' : 'MIN MASTERCLASS'}
            </span>
          </div>
        </div>

        {/* 4-Beat Progression Stepper */}
        <div className="flex items-center gap-1.5 bg-[var(--bg-app)] p-1 rounded-lg border border-[var(--border-subtle)]">
          {([1, 2, 3, 4] as BeatNumber[]).map((b) => {
            const isActive = currentBeat === b;
            const isCompleted = progress.completedBeats?.includes(b);
            return (
              <button
                key={b}
                onClick={() => setBeat(b)}
                className={`px-3 py-1 rounded text-xs font-mono font-semibold transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[var(--text-primary)] text-[var(--bg-app)] shadow'
                    : isCompleted
                    ? 'text-emerald-400 hover:bg-[var(--bg-surface-hover)]'
                    : 'text-[var(--text-tertiary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {isCompleted && <Check className="w-3 h-3 stroke-[3]" />}
                <span>0{b}</span>
                <span className="text-[10px] opacity-80 hidden md:inline">
                  {b === 1
                    ? isAr
                      ? 'الحدس'
                      : 'Intuition'
                    : b === 2
                    ? isAr
                      ? 'الصياغة'
                      : 'Formal'
                    : b === 3
                    ? isAr
                      ? 'البرمجة'
                      : 'Code'
                    : isAr
                    ? 'التشخيص'
                    : 'Transfer'}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right Action buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsFocusDeck((prev) => !prev)}
            className="p-1.5 rounded-lg border border-[var(--border-subtle)] hover:bg-[var(--bg-surface-hover)] text-[var(--text-secondary)] transition-all"
            title={isFocusDeck ? 'Restore Split' : 'Maximize Deck (⌘2)'}
          >
            {isFocusDeck ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </header>

      {/* Main Dual-Pane Pro Workbench */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Pane (45%): Masterclass Console & Narrative */}
        {!isFocusDeck && (
          <aside className="w-[45%] border-e border-[var(--border-subtle)] bg-[var(--bg-surface)] flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Beat Headline */}
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--math-gradient)] font-bold">
                  {isAr ? `المرحلة 0${currentBeat}` : `PHASE 0${currentBeat}`}
                </span>
                <h2 className="text-base font-bold text-[var(--text-primary)]">
                  {currentBeat === 1 && (isAr ? 'الحدس الحركي والهندسي' : 'Tactile & Spatial Intuition')}
                  {currentBeat === 2 && (isAr ? 'المرساة الرياضية الصارمة' : 'Formal Mathematical Anchor')}
                  {currentBeat === 3 && (isAr ? 'النواة البرمجية الحسابية' : 'Computational Vector Kernel')}
                  {currentBeat === 4 && (isAr ? 'تحدي النقل وتشخيص المفاهيم' : 'Active Transfer & Diagnosis')}
                </h2>
              </div>

              {/* Narrative Content */}
              <div className="text-sm text-[var(--text-secondary)] leading-relaxed space-y-3">
                <MathText text={isAr ? beatObj.narrative.ar : beatObj.narrative.en} />
              </div>

              {/* Beat 2: Formal KaTeX Anchor with Formula Anchors */}
              {currentBeat === 2 && beatObj.formula && (
                <div className="p-4 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-app)] space-y-3">
                  <div className="flex items-center justify-between text-xs text-[var(--math-prediction)] font-bold uppercase">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      {isAr ? 'المعادلة الأساسية الصارمة' : 'Mathematical Invariant'}
                    </span>
                    <span className="text-[10px] font-mono text-[var(--text-tertiary)]">
                      {isAr ? 'انقر للربط مع الرسم' : 'Click symbol to anchor'}
                    </span>
                  </div>

                  <div className="py-2 text-center overflow-x-auto">
                    <KaTeXMath
                      math={beatObj.formula}
                      block
                      onHoverVariable={(v) => setActiveToken(v, 'formula')}
                    />
                  </div>

                  {beatObj.formulaNote && (
                    <p className="text-xs text-[var(--text-secondary)] border-t border-[var(--border-subtle)] pt-2 leading-relaxed">
                      {isAr ? beatObj.formulaNote.ar : beatObj.formulaNote.en}
                    </p>
                  )}
                </div>
              )}

              {/* Socratic Hint Ladder */}
              {beatObj.hints && (
                <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-app)] space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                    <HelpCircle className="w-4 h-4" />
                    <span>{isAr ? 'سلم التلميحات السقراطي' : 'Socratic Hint Ladder'}</span>
                  </div>
                  <div className="space-y-1.5 text-xs text-[var(--text-secondary)]">
                    <p><strong className="text-[var(--text-primary)]">1:</strong> {isAr ? beatObj.hints.tier1.ar : beatObj.hints.tier1.en}</p>
                    <p><strong className="text-[var(--text-primary)]">2:</strong> {isAr ? beatObj.hints.tier2.ar : beatObj.hints.tier2.en}</p>
                    <p><strong className="text-[var(--text-primary)]">3:</strong> {isAr ? beatObj.hints.tier3.ar : beatObj.hints.tier3.en}</p>
                  </div>
                </div>
              )}

              {/* Beat 4: Diagnostic Transfer Challenge */}
              {currentBeat === 4 && beatObj.question && (
                <div className="p-4 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-app)] space-y-3">
                  <span className="text-xs font-bold text-[var(--math-gradient)] uppercase block">
                    {isAr ? 'معضلة الفحص المفاهيمي:' : 'Diagnostic Dilemma:'}
                  </span>
                  <p className="text-xs text-[var(--text-primary)] font-medium leading-relaxed">
                    {isAr ? beatObj.question.prompt.ar : beatObj.question.prompt.en}
                  </p>

                  <div className="space-y-2">
                    {beatObj.question.options.map((opt, idx) => {
                      const isSelected = selectedQuizIdx === idx;
                      return (
                        <button
                          key={idx}
                          onClick={() => {
                            setSelectedQuizIdx(idx);
                            if (config.soundEnabled) audio.playClick();
                          }}
                          className={`w-full text-start p-3 rounded-lg border text-xs transition-all flex items-start gap-2.5 ${
                            isSelected
                              ? 'border-[var(--math-prediction)] bg-[var(--bg-surface-active)] text-[var(--text-primary)] font-semibold'
                              : 'border-[var(--border-subtle)] hover:border-[var(--border-strong)] text-[var(--text-secondary)]'
                          }`}
                        >
                          <span className="font-mono text-[var(--text-tertiary)] shrink-0">
                            {String.fromCharCode(65 + idx)}.
                          </span>
                          <span className="leading-relaxed">{isAr ? opt.text.ar : opt.text.en}</span>
                        </button>
                      );
                    })}
                  </div>

                  {selectedQuizIdx !== null && (
                    <div className="p-3 rounded-lg border border-emerald-800 bg-emerald-950/30 text-emerald-300 text-xs">
                      {isAr
                        ? beatObj.question.options[selectedQuizIdx].explanation.ar
                        : beatObj.question.options[selectedQuizIdx].explanation.en}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Bottom Navigation Toolbar */}
            <div className="h-14 border-t border-[var(--border-subtle)] px-6 flex items-center justify-between bg-[var(--bg-app)] shrink-0">
              <button
                onClick={handlePrev}
                disabled={currentBeat === 1}
                className="px-3 py-1.5 rounded-lg border border-[var(--border-subtle)] text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5 transition-all"
              >
                <ArrowLeft className="w-3.5 h-3.5 rtl-flip" />
                <span>{isAr ? 'السابق' : 'Previous'}</span>
              </button>

              <button
                onClick={handleNext}
                className="px-5 py-2 rounded-lg text-xs font-bold bg-[var(--text-primary)] text-[var(--bg-app)] hover:brightness-110 flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
              >
                <span>
                  {currentBeat === 4
                    ? isAr
                      ? 'إتمام الدرس والحصول على XP'
                      : 'Complete Masterclass (+100 XP)'
                    : isAr
                    ? 'المرحلة التالية'
                    : 'Next Stage'}
                </span>
                <ArrowRight className="w-3.5 h-3.5 rtl-flip" />
              </button>
            </div>
          </aside>
        )}

        {/* Right Pane (55% or 100%): Dockable Industrial Instrument Deck */}
        <main className="flex-1 flex flex-col bg-[var(--bg-app)] overflow-hidden">
          {/* Deck Tab Bar */}
          <div className="h-10 border-b border-[var(--border-subtle)] bg-[var(--bg-surface)] px-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-1 font-mono text-xs">
              <button
                onClick={() => {
                  setActiveDeckTab('canvas');
                  if (config.soundEnabled) audio.playClick();
                }}
                className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 font-semibold transition-all ${
                  activeDeckTab === 'canvas'
                    ? 'bg-[var(--bg-app)] text-[var(--math-data)] border border-[var(--border-subtle)] shadow-sm'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>{isAr ? 'المختبر الحركي' : 'Visual Physics (⌥1)'}</span>
              </button>

              <button
                onClick={() => {
                  setActiveDeckTab('code');
                  if (config.soundEnabled) audio.playClick();
                }}
                className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 font-semibold transition-all ${
                  activeDeckTab === 'code'
                    ? 'bg-[var(--bg-app)] text-[var(--math-vector)] border border-[var(--border-subtle)] shadow-sm'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>{isAr ? 'محرر بايثون' : 'Python WASM (⌥2)'}</span>
              </button>

              <button
                onClick={() => {
                  setActiveDeckTab('inspector');
                  if (config.soundEnabled) audio.playClick();
                }}
                className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 font-semibold transition-all ${
                  activeDeckTab === 'inspector'
                    ? 'bg-[var(--bg-app)] text-[var(--math-prediction)] border border-[var(--border-subtle)] shadow-sm'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>{isAr ? 'المصفوفات' : 'Tensors HUD (⌥3)'}</span>
              </button>

              <button
                onClick={() => {
                  setActiveDeckTab('profiler');
                  if (config.soundEnabled) audio.playClick();
                }}
                className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 font-semibold transition-all ${
                  activeDeckTab === 'profiler'
                    ? 'bg-[var(--bg-app)] text-[var(--math-gradient)] border border-[var(--border-subtle)] shadow-sm'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>{isAr ? 'الأداء' : 'Profiler (⌥4)'}</span>
              </button>
            </div>

            {/* Active Telemetry status */}
            <div className="flex items-center gap-3 text-[11px] font-mono text-[var(--text-tertiary)]">
              <span className="flex items-center gap-1.5">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isReady ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'
                  }`}
                />
                {isReady ? 'CPython 3.12 WASM' : 'Loading Kernel...'}
              </span>
              {executionTimeMs > 0 && <span>{executionTimeMs}ms</span>}
            </div>
          </div>

          {/* Deck Tab Content Area */}
          <div className="flex-1 overflow-hidden relative">
            {activeDeckTab === 'canvas' && (
              <div className="w-full h-full p-4 flex flex-col">
                <div className="flex-1 rounded-xl border border-[var(--border-subtle)] overflow-hidden bg-[var(--bg-surface)] relative shadow-inner">
                  <SimulationView type={simType} />
                </div>
              </div>
            )}

            {activeDeckTab === 'code' && (
              <div className="w-full h-full p-4">
                <CodeChallengeEditor
                  challenge={beatObj.code}
                  onComplete={() => {
                    if (config.soundEnabled) audio.playVictoryHarmonics();
                    updateLessonBeat(mod.id, Math.max(currentBeat, 3) as BeatNumber);
                  }}
                />
              </div>
            )}

            {activeDeckTab === 'inspector' && (
              <div className="w-full h-full p-4">
                <VariableInspector variables={variables} memory={memory} />
              </div>
            )}

            {activeDeckTab === 'profiler' && (
              <div className="w-full h-full p-6 font-mono text-xs space-y-4">
                <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] space-y-2">
                  <span className="font-bold text-[var(--text-primary)] uppercase block">
                    {isAr ? 'إحصاءات الأداء والمعالجة المتجهة (SIMD)' : 'SIMD ACCELERATION & MEMORY PROFILER'}
                  </span>
                  <p className="text-[var(--text-secondary)]">
                    {isAr
                      ? 'تنفذ العمليات الحسابية داخل WebAssembly باستخدام NumPy المترجم إلى تعليمات الآلة الأصلية.'
                      : 'Evaluates vector routines inside WebAssembly with native SIMD memory contiguity.'}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]">
                    <span className="text-[10px] text-[var(--text-tertiary)] uppercase block mb-1">
                      {isAr ? 'زمن التنفيذ الأخير' : 'Last Execution Time'}
                    </span>
                    <span className="text-xl font-bold text-[var(--math-vector)]">
                      {executionTimeMs} ms
                    </span>
                  </div>

                  <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]">
                    <span className="text-[10px] text-[var(--text-tertiary)] uppercase block mb-1">
                      {isAr ? 'حجم الذاكرة المحجوزة' : 'Heap Allocation'}
                    </span>
                    <span className="text-xl font-bold text-[var(--math-data)]">
                      {memory ? (memory.heapUsedBytes / (1024 * 1024)).toFixed(1) : '0.0'} MB
                    </span>
                  </div>
                </div>

                {logs.length > 0 && (
                  <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-app)] space-y-1">
                    <span className="text-[10px] uppercase text-[var(--text-tertiary)] block mb-1">
                      {isAr ? 'سجل العمليات' : 'Kernel Logs'}
                    </span>
                    {logs.map((log, i) => (
                      <div key={i} className="text-[11px] text-[var(--text-secondary)]">
                        {log}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

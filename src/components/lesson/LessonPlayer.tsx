import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Check, Lightbulb, Sparkles, Lock, X, AlertTriangle } from 'lucide-react';
import { useOkvirStore } from '@/lib/store';
import { tr } from '@/lib/i18n';
import { curriculum } from '@/lib/curriculum';
import { SimulationView } from '@/components/simulation/SimulationView';
import { CodeChallengeEditor } from '@/components/editor/CodeChallengeEditor';
import { KaTeXMath } from '@/components/common/KaTeXMath';
import { MathText } from '@/components/common/MathText';
import { audio } from '@/lib/audio';
import type { BeatNumber } from '@/lib/types';

export const LessonPlayer: React.FC = () => {
  const {
    activeLessonId,
    language,
    lessons,
    config,
    updateLessonBeat,
    completeLesson,
    startLesson,
    setCurrentView,
  } = useOkvirStore();

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
  const [highlightedScrubber, setHighlightedScrubber] = useState<'slope' | 'intercept' | 'residuals' | null>(null);
  const [selectedTransferOption, setSelectedTransferOption] = useState<number | null>(null);
  const [isHintOpen, setIsHintOpen] = useState(false);
  const [hintTier, setHintTier] = useState<1 | 2 | 3>(1);
  const [hasPassedCode, setHasPassedCode] = useState(false);

  // Reset selected option, hint, and sync passed code state when active lesson or beat changes
  useEffect(() => {
    setSelectedTransferOption(null);
    setIsHintOpen(false);
    setHasPassedCode(Boolean(progress.completedBeats?.includes(3)));
  }, [activeLessonId, currentBeat, progress.completedBeats]);

  // Keyboard shortcut listener for Hint [H] & custom event
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target && target.matches('input, textarea, select')) return;
      if (e.key === 'h' || e.key === 'H') {
        e.preventDefault();
        setIsHintOpen((prev) => !prev);
        if (config.soundEnabled) audio.playClick();
      }
    };

    const handleCustomToggle = () => {
      setIsHintOpen((prev) => !prev);
      if (config.soundEnabled) audio.playClick();
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('okvir:toggle-hint', handleCustomToggle);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('okvir:toggle-hint', handleCustomToggle);
    };
  }, [config.soundEnabled]);

  const setBeat = (b: BeatNumber) => {
    updateLessonBeat(mod.id, b);
  };

  const handleNext = () => {
    if (currentBeat < 4) {
      setBeat((currentBeat + 1) as BeatNumber);
      if (config.soundEnabled) audio.playSuccessChime();
    } else {
      // Beat 4: Verify correct answer is selected before completion
      const beat4 = mod.beats.find((b) => b.number === 4);
      const isCorrect = selectedTransferOption !== null && (beat4?.question?.options[selectedTransferOption]?.correct ?? (selectedTransferOption === 1));
      if (!isCorrect) return;

      completeLesson(mod.id);
      if (config.soundEnabled) audio.playFanfare();
      setCurrentView('constellation');
    }
  };

  const handlePrev = () => {
    if (currentBeat > 1) {
      setBeat((currentBeat - 1) as BeatNumber);
      if (config.soundEnabled) audio.playClick();
    } else {
      setCurrentView('constellation');
    }
  };

  const handleTransferSubmit = (idx: number) => {
    setSelectedTransferOption(idx);
    const beat4 = mod.beats.find((b) => b.number === 4);
    const isCorrect = beat4?.question?.options[idx]?.correct ?? (idx === 1);
    if (isCorrect) {
      if (config.soundEnabled) audio.playSuccessChime();
    } else {
      if (config.soundEnabled) audio.playErrorTick();
    }
  };

  // Render appropriate simulation widget dynamically
  const renderSimulationWidget = () => {
    const beat1 = mod.beats.find((b) => b.number === 1);
    const simType = beat1?.simulation || 'ols';
    return <SimulationView type={simType} highlightedElement={highlightedScrubber} />;
  };

  const getHintContent = (tier: 1 | 2 | 3) => {
    const beatObj = mod.beats.find((b) => b.number === currentBeat);
    if (beatObj?.hints) {
      if (tier === 1) return beatObj.hints.tier1[language];
      if (tier === 2) return beatObj.hints.tier2[language];
      if (tier === 3) return beatObj.hints.tier3[language];
    }
    // Contextual hints
    if (currentBeat === 1) {
      if (tier === 1) {
        return language === 'ar'
          ? 'استكشف العلاقات البصرية بتغيير المعاملات. كيف تتغير الهندسة عند تغيير القيم؟'
          : 'Explore visual interactions by modifying parameters. How does the geometric landscape react?';
      }
      if (tier === 2) {
        return language === 'ar'
          ? 'اربط الحركة الفيزيائية بالهدف الأمثل: ابحث عن النقطة أو التكوين الذي يحقق التوازن أو يقلل التكلفة.'
          : 'Anchor physical movement to optimality: search for the configuration that minimizes cost or achieves equilibrium.';
      }
      return language === 'ar'
        ? 'الحل الأمثل هندسياً يتطابق تماماً مع النتيجة التي تشتقها المعادلة التحليلية المغلقة في النبضة التالية.'
        : 'The geometric optimum corresponds directly to the closed-form derivative solution revealed in Beat 2.';
    }
    if (currentBeat === 2) {
      if (tier === 1) {
        return language === 'ar'
          ? 'لاحظ بنية المعادلة: ما هي المدخلات وما هي الأوزان أو المعاملات المتغيرة؟'
          : 'Notice the formula structure: which symbols represent observations and which represent optimizable parameters?';
      }
      if (tier === 2) {
        return language === 'ar'
          ? 'كل حد في المعادلة له مدلول فيزيائي وهندسي يترجم مباشرة ما رأيته في النبضة الأولى.'
          : 'Every algebraic term translates directly into the physical/geometric mechanism explored in Beat 1.';
      }
      return language === 'ar'
        ? `المعادلة الرسمية: ${beatObj?.formula || ''}`
        : `Formal relation: ${beatObj?.formula || ''}`;
    }
    if (currentBeat === 3) {
      if (tier === 1) {
        return language === 'ar'
          ? 'تجنب حلقات التكرار for البطيئة. استخدم عمليات NumPy الموجهة SIMD للحساب الفوري.'
          : 'Avoid slow Python for-loops. Leverage contiguous vectorized NumPy operations for SIMD execution.';
      }
      if (tier === 2) {
        return language === 'ar'
          ? 'قسّم الحساب إلى خطوتين: احسب الفروق أو الضرب الشعاعي أولاً، ثم طبق دالة التجميع المناسبة.'
          : 'Decompose the kernel: compute vectorized element-wise differences or products first, then aggregate.';
      }
      return language === 'ar'
        ? 'الحل النموذجي مقترح في كود البداية: تفقد الحالات الاختبارية لاختبار الكود.'
        : 'Reference code: verify against test cases to ensure correct array dimensions.';
    }
    // Beat 4
    if (tier === 1) {
      return language === 'ar'
        ? 'حلل الحالات الحدية والمتطرفة: كيف يتصرف النموذج عند وجود قيم شاذة أو أبعاد عالية؟'
        : 'Analyze edge cases and boundary limits: how does the formulation behave under extreme conditions?';
    }
    if (tier === 2) {
      return language === 'ar'
        ? 'استبعد الخيارات التي تتعارض مع المبادئ الرياضية التي رسختها في النبضات السابقة.'
        : 'Eliminate choices that contradict foundational properties established across earlier beats.';
    }
    return language === 'ar'
      ? 'اقرأ التفسير المصاحب لكل خيار للتحقق من المفهوم وتثبيته في الذاكرة طويلة المدى.'
      : 'Review the detailed conceptual explanation attached to each option to reinforce schema retention.';
  };

  const prereqModules = mod.prerequisites
    .map((id) => curriculum.find((m) => m.id === id))
    .filter(Boolean);

  const uncompletedPrereqs = prereqModules.filter(
    (m) => lessons[m!.id]?.status !== 'mastered'
  );

  const isLocked = uncompletedPrereqs.length > 0;

  if (isLocked) {
    return (
      <div className="flex-1 overflow-y-auto flex items-center justify-center p-6">
        <div className="max-w-md w-full p-8 rounded-2xl border border-amber-500/30 bg-[var(--bg-surface)] shadow-2xl text-center space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
            <Lock size={28} />
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-bold text-[var(--text-primary)]">
              {language === 'ar' ? 'الوحدة مقفلة حالياً' : 'Module Currently Locked'}
            </h2>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              {language === 'ar'
                ? `لا يمكن دراسة مفهوم "${mod.titleAr}" دون اجتياز الأسس والمتطلبات الرياضية السابقة أولاً:`
                : `You cannot access "${mod.title}" without first mastering its foundational mathematical prerequisites:`}
            </p>
          </div>

          <div className="space-y-2 text-start">
            {uncompletedPrereqs.map((p) => (
              <div
                key={p!.id}
                className="flex items-center justify-between p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-app)]"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span className="text-xs font-semibold text-[var(--text-primary)]">
                    {language === 'ar' ? p!.titleAr : p!.title}
                  </span>
                </div>
                <button
                  onClick={() => startLesson(p!.id)}
                  className="px-3 py-1 rounded-lg bg-[var(--math-vector)] text-black text-[11px] font-mono font-semibold hover:brightness-110 transition-transform active:scale-95"
                >
                  {language === 'ar' ? 'ابدأ المتطلب' : 'Start Prerequisite'}
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={() => setCurrentView('constellation')}
            className="w-full py-2.5 rounded-xl border border-[var(--border-subtle)] hover:border-[var(--border-strong)] text-xs font-mono text-[var(--text-secondary)] transition-colors"
          >
            {language === 'ar' ? 'العودة إلى بُرج المعرفة' : 'Back to Constellation'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-4xl mx-auto p-6 lg:p-8 space-y-6">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4">
          <div>
            <button
              onClick={() => setCurrentView('constellation')}
              className="text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors mb-1.5 flex items-center gap-1.5"
            >
              <ArrowLeft size={13} className={language === 'ar' ? 'rotate-180' : ''} />
              {tr('backToConstellation', language)}
            </button>
            <h1 className="text-xl font-bold tracking-tight text-[var(--text-primary)]">
              {language === 'ar' ? mod.titleAr : mod.title}
            </h1>
          </div>

          {/* 4-Beat Cognitive Pacing Indicator */}
          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4].map((b) => {
              const beatNum = b as BeatNumber;
              const isActive = currentBeat === beatNum;
              const isDone = (progress.completedBeats || []).includes(beatNum);
              const canAccess = beatNum <= currentBeat || isDone;

              return (
                <button
                  key={b}
                  disabled={!canAccess}
                  onClick={() => canAccess && setBeat(beatNum)}
                  className={`flex items-center gap-1 px-3 py-1 text-xs font-mono rounded-md border transition-all ${
                    isActive
                      ? 'border-[var(--math-vector)] bg-[var(--math-vector)]/10 text-[var(--math-vector)] font-semibold shadow-sm'
                      : isDone
                      ? 'border-[var(--border-strong)] text-[var(--math-vector)] hover:bg-[var(--bg-surface-hover)]'
                      : canAccess
                      ? 'border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]'
                      : 'border-[var(--border-subtle)] text-[var(--text-tertiary)] opacity-35 cursor-not-allowed'
                  }`}
                  title={!canAccess ? (language === 'ar' ? 'أكمل النبضات السابقة أولاً' : 'Complete preceding beats first') : undefined}
                >
                  {!canAccess && <Lock size={10} className="shrink-0" />}
                  <span>{language === 'ar' ? `النبضة ${b}` : `Beat ${b}`}</span>
                </button>
              );
            })}

            {/* Hint Trigger Button */}
            <button
              onClick={() => {
                setIsHintOpen(!isHintOpen);
                if (config.soundEnabled) audio.playClick();
              }}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-mono rounded-md border transition-all ms-2 ${
                isHintOpen
                  ? 'border-amber-500 bg-amber-500/10 text-amber-300 font-semibold'
                  : 'border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]'
              }`}
              title="3-Tier Socratic Hint Ladder [H]"
            >
              <Lightbulb size={13} className="text-amber-400" />
              <span>{language === 'ar' ? 'تلميح' : 'Hint'}</span>
              <kbd className="text-[9px] px-1 rounded bg-[var(--border-subtle)] text-[var(--text-tertiary)]">H</kbd>
            </button>
          </div>
        </div>

        {/* 3-Tier Socratic Hint Ladder Panel */}
        {isHintOpen && (
          <div className="p-4 rounded-xl border border-amber-500/40 bg-amber-500/5 specular space-y-3 slide-up">
            <div className="flex items-center justify-between border-b border-amber-500/20 pb-2">
              <div className="flex items-center gap-2">
                <Lightbulb size={15} className="text-amber-400" />
                <span className="text-xs font-mono font-bold text-amber-300">
                  {language === 'ar' ? 'سُلّم التلميحات السقراطية (3 درجات)' : '3-Tier Socratic Hint Ladder'}
                </span>
              </div>
              <button
                onClick={() => setIsHintOpen(false)}
                className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"
              >
                <X size={15} />
              </button>
            </div>

            {/* Tier Selector Pills */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setHintTier(1)}
                className={`px-2.5 py-1 text-[11px] font-mono rounded-lg border transition-all ${
                  hintTier === 1
                    ? 'border-amber-400 bg-amber-400/20 text-amber-200 font-bold'
                    : 'border-[var(--border-subtle)] text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]'
                }`}
              >
                {language === 'ar' ? '١. توجيه إدراكي' : '1. Metacognitive Nudge'}
              </button>
              <button
                onClick={() => setHintTier(2)}
                className={`px-2.5 py-1 text-[11px] font-mono rounded-lg border transition-all ${
                  hintTier === 2
                    ? 'border-amber-400 bg-amber-400/20 text-amber-200 font-bold'
                    : 'border-[var(--border-subtle)] text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]'
                }`}
              >
                {language === 'ar' ? '٢. دعم هيكلي' : '2. Structural Scaffolding'}
              </button>
              <button
                onClick={() => setHintTier(3)}
                className={`px-2.5 py-1 text-[11px] font-mono rounded-lg border transition-all ${
                  hintTier === 3
                    ? 'border-amber-400 bg-amber-400/20 text-amber-200 font-bold'
                    : 'border-[var(--border-subtle)] text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]'
                }`}
              >
                {language === 'ar' ? '٣. الحل النموذجي' : '3. Bottom-Out Solution'}
              </button>
            </div>

            {/* Hint Content Display */}
            <div className="text-xs text-[var(--text-secondary)] font-mono leading-relaxed bg-[var(--bg-app)] p-3 rounded-lg border border-[var(--border-subtle)]">
              <div>
                <span className="text-amber-400 font-bold me-1">
                  {hintTier === 1 && '💡 [Tier 1]:'}
                  {hintTier === 2 && '📐 [Tier 2]:'}
                  {hintTier === 3 && '🎯 [Tier 3]:'}
                </span>
                {getHintContent(hintTier)}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            BEAT 1: Tactile Intuition
           ========================================================================= */}
        {currentBeat === 1 && (
          <div className="space-y-4 fade-in">
            <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-sm text-[var(--text-secondary)] leading-relaxed">
              {mod.beats.find((b) => b.number === 1)?.narrative[language]}
            </div>

            {renderSimulationWidget()}

            <div className="flex justify-between items-center pt-2">
              <span className="text-xs font-mono text-[var(--text-tertiary)]">
                {language === 'ar' ? 'الحدس الهندسي هو أساس البرهان الرياضي' : 'Geometric intuition anchors the formal derivation'}
              </span>
              <button
                onClick={() => setBeat(2)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[var(--text-primary)] text-[var(--bg-app)] font-medium text-xs transition-transform active:scale-95 hover:brightness-90 shadow-sm"
              >
                <span>{tr('nextBeat', language)}: {tr('beat2', language)}</span>
                <ArrowRight size={13} className={language === 'ar' ? 'rotate-180' : ''} />
              </button>
            </div>
          </div>
        )}

        {/* =========================================================================
            BEAT 2: Formal Mathematical Anchor
           ========================================================================= */}
        {currentBeat === 2 && (() => {
          const beat2 = mod.beats.find((b) => b.number === 2);
          return (
            <div className="space-y-5 p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] specular fade-in">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-mono tracking-wider text-[var(--math-gradient)] font-semibold">
                  {tr('beat2', language)}
                </span>
                <span className="text-xs font-mono text-[var(--text-tertiary)]">LaTeX / KaTeX Strict LTR</span>
              </div>

              <h2 className="text-base font-semibold text-[var(--text-primary)]">
                {beat2?.formulaNote ? beat2.formulaNote[language] : (language === 'ar' ? 'المرساة الرياضية الرسمية' : 'Formal Mathematical Anchor')}
              </h2>

              {/* KaTeX Math Box (Strict LTR Isolation) */}
              <div
                dir="ltr"
                className="p-5 rounded-lg bg-[var(--bg-app)] border border-[var(--border-subtle)] text-center font-mono text-base text-zinc-100 shadow-inner"
              >
                <KaTeXMath math={beat2?.formula || '\\hat{\\beta} = (X^T X)^{-1} X^T y'} block />
              </div>

              {/* Interactive Scrubbers if OLS */}
              {mod.id === 'ols-residual-geometry' && (
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="text-xs font-mono text-[var(--text-tertiary)] self-center me-1">
                    {language === 'ar' ? 'المتغيرات التفاعلية:' : 'Interactive Scrubbers:'}
                  </span>

                  <button
                    onMouseEnter={() => setHighlightedScrubber('residuals')}
                    onMouseLeave={() => setHighlightedScrubber(null)}
                    className={`px-2.5 py-1 text-xs font-mono rounded-md border transition-all ${
                      highlightedScrubber === 'residuals'
                        ? 'border-rose-500 bg-rose-500/20 text-rose-300'
                        : 'border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-rose-500/50'
                    }`}
                  >
                    (yᵢ - ŷᵢ)² : {language === 'ar' ? 'مساحة المربع' : 'Residual Square Area'}
                  </button>

                  <button
                    onMouseEnter={() => setHighlightedScrubber('slope')}
                    onMouseLeave={() => setHighlightedScrubber(null)}
                    className={`px-2.5 py-1 text-xs font-mono rounded-md border transition-all ${
                      highlightedScrubber === 'slope'
                        ? 'border-amber-500 bg-amber-500/20 text-amber-300'
                        : 'border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-amber-500/50'
                    }`}
                  >
                    m : {language === 'ar' ? 'ميل الخط المستقيم' : 'Line Slope Parameter'}
                  </button>

                  <button
                    onMouseEnter={() => setHighlightedScrubber('intercept')}
                    onMouseLeave={() => setHighlightedScrubber(null)}
                    className={`px-2.5 py-1 text-xs font-mono rounded-md border transition-all ${
                      highlightedScrubber === 'intercept'
                        ? 'border-amber-500 bg-amber-500/20 text-amber-300'
                        : 'border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-amber-500/50'
                    }`}
                  >
                    b : {language === 'ar' ? 'نقطة التقاطع' : 'Intercept Parameter'}
                  </button>
                </div>
              )}

              {/* Narrative */}
              <div className="text-sm text-[var(--text-secondary)] leading-relaxed space-y-3 pt-2">
                <p>{beat2?.narrative[language]}</p>
              </div>

              <div className="flex justify-between pt-3 border-t border-[var(--border-subtle)]">
                <button
                  onClick={handlePrev}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[var(--border-subtle)] text-xs font-mono text-[var(--text-secondary)] hover:bg-[var(--bg-surface-hover)]"
                >
                  <ArrowLeft size={13} className={language === 'ar' ? 'rotate-180' : ''} />
                  ← Beat 1
                </button>
                <button
                  onClick={() => setBeat(3)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[var(--text-primary)] text-[var(--bg-app)] font-medium text-xs transition-transform active:scale-95 hover:brightness-90 shadow-sm"
                >
                  <span>{tr('nextBeat', language)}: {tr('beat3', language)}</span>
                  <ArrowRight size={13} className={language === 'ar' ? 'rotate-180' : ''} />
                </button>
              </div>
            </div>
          );
        })()}

        {/* =========================================================================
            BEAT 3: Interactive Code Scratchpad
           ========================================================================= */}
        {currentBeat === 3 && (() => {
          const beat3 = mod.beats.find((b) => b.number === 3);
          const isCodeChallengePassed = !beat3?.code || hasPassedCode || (progress.completedBeats || []).includes(3);

          return (
            <div className="space-y-4 fade-in">
              <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-sm text-[var(--text-secondary)] leading-relaxed">
                {beat3?.narrative[language] || (language === 'ar' ? 'طبّق الكود المطلوب:' : 'Implement the required computational kernel:')}
              </div>

              <CodeChallengeEditor
                challenge={beat3?.code}
                onComplete={() => {
                  setHasPassedCode(true);
                  updateLessonBeat(mod.id, 3);
                  if (config.soundEnabled) audio.playSuccessChime();
                }}
              />

              <div className="flex justify-between items-center pt-2">
                <button
                  onClick={handlePrev}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[var(--border-subtle)] text-xs font-mono text-[var(--text-secondary)] hover:bg-[var(--bg-surface-hover)]"
                >
                  <ArrowLeft size={13} className={language === 'ar' ? 'rotate-180' : ''} />
                  ← Beat 2
                </button>
                <button
                  onClick={() => setBeat(4)}
                  disabled={!isCodeChallengePassed}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg font-medium text-xs transition-all shadow-sm ${
                    isCodeChallengePassed
                      ? 'bg-[var(--text-primary)] text-[var(--bg-app)] active:scale-95 hover:brightness-90 cursor-pointer'
                      : 'bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-tertiary)] opacity-40 cursor-not-allowed'
                  }`}
                  title={!isCodeChallengePassed ? (language === 'ar' ? 'اجتز اختبارات الكود للمتابعة' : 'Pass code tests to advance') : undefined}
                >
                  {!isCodeChallengePassed && <Lock size={12} className="shrink-0" />}
                  <span>{tr('nextBeat', language)}: {tr('beat4', language)}</span>
                  <ArrowRight size={13} className={language === 'ar' ? 'rotate-180' : ''} />
                </button>
              </div>
            </div>
          );
        })()}

        {/* =========================================================================
            BEAT 4: Reality Transfer Challenge
           ========================================================================= */}
        {currentBeat === 4 && (() => {
          const beat4 = mod.beats.find((b) => b.number === 4);
          const question = beat4?.question;

          const promptText = question?.prompt
            ? question.prompt[language]
            : (language === 'ar'
                ? 'لماذا نفضل تقليل مربعات البواقي (L2 Loss) بدلاً من القيمة المطلقة (L1 Loss) في نماذج الانحدار الكلاسيكية؟'
                : 'Why do we minimize squared residuals (L2 Loss) instead of absolute residuals |y - ŷ| (L1 Loss) in classical econometrics?');

          const options = question?.options || [
            {
              text: {
                en: 'L1 loss produces non-unique solutions and is non-differentiable at zero, preventing smooth gradient descent.',
                ar: 'دالة L1 غير قابلة للاشتقاق عند الصفر ولا تقدم حلاً تحليلياً مغلقاً وفريداً ومباشراً.',
              },
              correct: false,
              explanation: {
                en: 'Reconsider: L1 provides sparsity, but L2 provides smooth differentiability.',
                ar: 'أعد التفكير: دالة L1 توفر التناثر، لكن دالة L2 توفر قابلية اشتقاق سلسة.',
              },
            },
            {
              text: {
                en: 'L2 loss provides an analytical closed-form solution (Normal Equations) and smooth, continuous derivatives everywhere.',
                ar: 'دالة L2 توفر حلاً تحليلياً مغلقاً مباشراً (المعادلات الطبيعية) وتدرجات سلسة مستمرة في كل مكان.',
              },
              correct: true,
              explanation: {
                en: 'Correct! L2 loss is globally convex, smooth, and yields the Gauss-Markov Best Linear Unbiased Estimator (BLUE).',
                ar: 'صحيح! دالة L2 تربيعية ومحدبة مما يتيح إيجاد الحل المغلق المباشر (Gauss-Markov) بدقة رياضية عالية.',
              },
            },
            {
              text: {
                en: 'L2 loss completely ignores the influence of extreme outlier observations.',
                ar: 'دالة L2 تتجاهل تماماً تأثير المشاهدات الشاذة والمتطرفة.',
              },
              correct: false,
              explanation: {
                en: 'Reconsider: Squaring magnifies outlier penalties quadratically; it does not ignore them.',
                ar: 'أعد التفكير: دالة L2 تعاقب القيم المتطرفة بشدة (تربيعياً) وليس بالعكس.',
              },
            },
          ];

          const selectedOptionObj = selectedTransferOption !== null ? options[selectedTransferOption] : null;
          const isSelectedCorrect = selectedOptionObj?.correct ?? false;

          return (
            <div className="space-y-5 p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] specular fade-in">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Lightbulb size={16} className="text-[var(--math-prediction)]" />
                  <span className="text-xs uppercase font-mono tracking-wider text-[var(--math-prediction)] font-semibold">
                    {tr('beat4', language)}
                  </span>
                </div>
                <span className="text-xs font-mono text-emerald-400 font-semibold">+50 XP Award</span>
              </div>

              <h2 className="text-base font-semibold text-[var(--text-primary)] leading-relaxed">
                <MathText text={promptText} />
              </h2>

              <div className="space-y-2.5">
                {options.map((option, idx) => {
                  const isChosen = selectedTransferOption === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleTransferSubmit(idx)}
                      className={`w-full p-4 rounded-xl border text-start text-xs font-medium transition-all ${
                        isChosen
                          ? option.correct
                            ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-500/40'
                            : 'border-rose-500 bg-rose-500/10 text-rose-300 ring-1 ring-rose-500/40'
                          : 'border-[var(--border-subtle)] hover:border-[var(--border-strong)] hover:bg-[var(--bg-app)] text-[var(--text-secondary)]'
                      }`}
                    >
                      <div className="flex items-start gap-3.5">
                        <span
                          className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-xs shrink-0 mt-0.5 font-bold ${
                            isChosen
                              ? option.correct
                                ? 'bg-emerald-500 text-black shadow-sm'
                                : 'bg-rose-500 text-white shadow-sm'
                              : 'bg-[var(--border-subtle)] text-[var(--text-secondary)]'
                          }`}
                        >
                          {isChosen ? (option.correct ? '✓' : '✗') : String.fromCharCode(65 + idx)}
                        </span>
                        <div className="flex-1 text-xs leading-relaxed">
                          <MathText text={option.text[language]} />
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {selectedOptionObj && (
                <div
                  className={`p-4 rounded-xl border text-xs font-medium leading-relaxed slide-up ${
                    isSelectedCorrect
                      ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                      : 'border-amber-500/30 bg-amber-500/10 text-amber-300'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    {isSelectedCorrect ? (
                      <Sparkles size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle size={16} className="text-amber-400 shrink-0 mt-0.5" />
                    )}
                    <div className="space-y-1">
                      <div className="font-bold">
                        {isSelectedCorrect
                          ? (language === 'ar' ? 'إجابة صحيحة وترسيخ دقيق!' : 'Insight Verified!')
                          : (language === 'ar' ? 'فرضية غير دقيقة — أعد النظر في الأساس الرياضي:' : 'Hypothesis Refuted — Reconsider:')}
                      </div>
                      <div className="text-[var(--text-secondary)] leading-relaxed">
                        <MathText text={selectedOptionObj.explanation[language]} />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center pt-3 border-t border-[var(--border-subtle)]">
                <button
                  onClick={handlePrev}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[var(--border-subtle)] text-xs font-mono text-[var(--text-secondary)] hover:bg-[var(--bg-surface-hover)]"
                >
                  <ArrowLeft size={13} className={language === 'ar' ? 'rotate-180' : ''} />
                  ← Beat 3
                </button>

                <button
                  onClick={handleNext}
                  disabled={!isSelectedCorrect}
                  className={`flex items-center gap-1.5 px-5 py-2.5 rounded-lg font-semibold text-xs transition-all shadow-md ${
                    isSelectedCorrect
                      ? 'bg-[var(--math-vector)] text-black hover:brightness-110 active:scale-95 cursor-pointer shadow-[0_0_15px_rgba(56,189,248,0.25)]'
                      : 'bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-tertiary)] opacity-40 cursor-not-allowed'
                  }`}
                  title={!isSelectedCorrect ? (language === 'ar' ? 'اختر الإجابة الصحيحة أولاً لإتمام الدرس' : 'Select the correct hypothesis to complete') : undefined}
                >
                  {!isSelectedCorrect && <Lock size={13} className="shrink-0" />}
                  <Check size={14} />
                  <span>{language === 'ar' ? 'إتمام الدرس وترسيخ المفهوم (+50 XP)' : 'Complete & Anchor Concept (+50 XP)'}</span>
                </button>
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
};

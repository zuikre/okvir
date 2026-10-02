import React, { useState, useMemo, useEffect, useCallback } from 'react';
import {
  Clock,
  Brain,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  XCircle,
  Check,
  X,
  Target,
  Flame,
  Filter,
} from 'lucide-react';
import { useOkvirStore } from '@/lib/store';
import { tr } from '@/lib/i18n';
import { createNewCard, retrievability, getRatingLabel, type Rating } from '@/lib/fsrs';
import { KaTeXMath } from '@/components/common/KaTeXMath';
import { audio } from '@/lib/audio';
import {
  ALL_CALIBRATION_DRILLS,
  type DrillFormat,
} from '@/lib/drill-registry';

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export const DailyCalibration: React.FC = () => {
  const {
    language,
    addXp,
    streakDays,
    lessons,
    setActiveLessonId,
    setCurrentView,
    fsrsCards,
    recordFsrsReview,
    syncFsrsFromDesktop,
  } = useOkvirStore();

  const [selectedFormatFilter, setSelectedFormatFilter] = useState<'all' | DrillFormat>('all');
  const [currentIndex, setCurrentIndex] = useState(0);

  // Sync cards from embedded SQLite database via Tauri Bridge on mount
  useEffect(() => {
    syncFsrsFromDesktop();
  }, [syncFsrsFromDesktop]);

  // Interaction States
  const [isFlipped, setIsFlipped] = useState(false); // For flashcard
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null); // For MCQ & Formula Fill
  const [selectedBooleanAnswer, setSelectedBooleanAnswer] = useState<boolean | null>(null); // For Boolean
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);

  // Session Statistics
  const [sessionStats, setSessionStats] = useState({
    reviewed: 0,
    correct: 0,
    xpEarned: 0,
  });

  // Filter and sort drills: Mastered modules, prioritized by FSRS due date
  const qualifiedDrills = useMemo(() => {
    const mastered = ALL_CALIBRATION_DRILLS.filter(
      (drill) => lessons[drill.moduleId]?.status === 'mastered'
    );

    const now = Date.now();
    return [...mastered].sort((a, b) => {
      const cardA = fsrsCards[a.id];
      const cardB = fsrsCards[b.id];
      const dueA = cardA ? cardA.due : 0;
      const dueB = cardB ? cardB.due : 0;

      const isDueA = dueA <= now;
      const isDueB = dueB <= now;

      if (isDueA && !isDueB) return -1;
      if (!isDueA && isDueB) return 1;
      return dueA - dueB;
    });
  }, [lessons, fsrsCards]);

  // Filtered Drills by format
  const activeDrills = useMemo(() => {
    if (selectedFormatFilter === 'all') return qualifiedDrills;
    return qualifiedDrills.filter((item) => item.format === selectedFormatFilter);
  }, [qualifiedDrills, selectedFormatFilter]);

  const currentItem = activeDrills[currentIndex];
  const isComplete = currentIndex >= activeDrills.length;

  const currentOptions = useMemo(() => {
    if (!currentItem?.options) return [];
    return shuffleArray(currentItem.options);
  }, [currentItem]);

  const currentCardState = useMemo(() => {
    if (!currentItem) return null;
    return fsrsCards[currentItem.id] || createNewCard(currentItem.id);
  }, [currentItem, fsrsCards]);

  // Reset answer states when question changes
  const resetInteraction = useCallback(() => {
    setIsFlipped(false);
    setSelectedOptionIdx(null);
    setSelectedBooleanAnswer(null);
    setIsAnswerRevealed(false);
  }, []);

  const handleSelectFilter = (filter: 'all' | DrillFormat) => {
    setSelectedFormatFilter(filter);
    setCurrentIndex(0);
    resetInteraction();
    if (useOkvirStore.getState().config.soundEnabled) audio.playClick();
  };

  // Handle MCQ selection
  const handleSelectOption = useCallback((idx: number) => {
    if (isAnswerRevealed || !currentItem || currentOptions.length === 0) return;
    setSelectedOptionIdx(idx);
    setIsAnswerRevealed(true);

    const isCorrect = currentOptions[idx]?.correct;
    if (isCorrect) {
      if (useOkvirStore.getState().config.soundEnabled) audio.playSuccess();
      setSessionStats((s) => ({ ...s, correct: s.correct + 1 }));
    } else {
      if (useOkvirStore.getState().config.soundEnabled) audio.playErrorTick();
    }
  }, [isAnswerRevealed, currentItem, currentOptions]);

  // Handle Boolean True/False selection
  const handleSelectBoolean = useCallback((answer: boolean) => {
    if (isAnswerRevealed || !currentItem) return;
    setSelectedBooleanAnswer(answer);
    setIsAnswerRevealed(true);

    const isCorrect = answer === currentItem.booleanAnswer;
    if (isCorrect) {
      if (useOkvirStore.getState().config.soundEnabled) audio.playSuccess();
      setSessionStats((s) => ({ ...s, correct: s.correct + 1 }));
    } else {
      if (useOkvirStore.getState().config.soundEnabled) audio.playErrorTick();
    }
  }, [isAnswerRevealed, currentItem]);

  // Handle Flashcard Flip
  const handleFlipCard = useCallback(() => {
    if (!isFlipped) {
      setIsFlipped(true);
      setIsAnswerRevealed(true);
      if (useOkvirStore.getState().config.soundEnabled) audio.playClick();
    }
  }, [isFlipped]);

  // Handle FSRS Rating Submission
  const handleRate = useCallback((rating: Rating) => {
    if (!currentItem || !currentCardState) return;

    recordFsrsReview(currentItem.id, rating);

    const earned = rating >= 3 ? 20 : 10;
    addXp(earned);
    setSessionStats((s) => ({
      ...s,
      reviewed: s.reviewed + 1,
      xpEarned: s.xpEarned + earned,
    }));

    resetInteraction();
    setCurrentIndex((prev) => prev + 1);

    if (useOkvirStore.getState().config.soundEnabled) {
      if (rating >= 3) audio.playSuccessChime();
      else audio.playClick();
    }
  }, [currentItem, currentCardState, recordFsrsReview, addXp, resetInteraction]);

  // Keyboard Shortcuts: 1-4 for options/ratings, Space for flip
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target && target.matches('input, textarea, select')) return;

      if (!isAnswerRevealed) {
        if (currentItem?.format === 'flashcard' && (e.code === 'Space' || e.key === 'Enter')) {
          e.preventDefault();
          handleFlipCard();
        } else if ((currentItem?.format === 'mcq' || currentItem?.format === 'formula_fill') && currentOptions.length > 0) {
          if (['1', '2', '3', '4'].includes(e.key)) {
            const idx = parseInt(e.key, 10) - 1;
            if (idx < currentOptions.length) {
              e.preventDefault();
              handleSelectOption(idx);
            }
          }
        } else if (currentItem?.format === 'boolean') {
          if (e.key === 't' || e.key === 'T' || e.key === 'y' || e.key === 'Y' || e.key === '1') {
            e.preventDefault();
            handleSelectBoolean(true);
          } else if (e.key === 'f' || e.key === 'F' || e.key === 'n' || e.key === 'N' || e.key === '2') {
            e.preventDefault();
            handleSelectBoolean(false);
          }
        }
      } else {
        // Rating phase
        if (['1', '2', '3', '4'].includes(e.key)) {
          e.preventDefault();
          handleRate(parseInt(e.key, 10) as Rating);
        } else if (e.code === 'Space') {
          e.preventDefault();
          handleRate(3); // Default 'Good' on Space
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAnswerRevealed, currentItem, handleFlipCard, handleSelectOption, handleSelectBoolean, handleRate]);

  return (
    <div className="flex-1 overflow-y-auto p-6 lg:p-8 pb-6">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header Bar */}
        <div className="flex flex-col gap-1.5 border-b border-[var(--border-subtle)] pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[var(--math-prediction)]/10 border border-[var(--math-prediction)]/20 flex items-center justify-center text-[var(--math-prediction)]">
                <Brain size={18} />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight text-[var(--text-primary)]">
                  {tr('review', language)}
                </h1>
                <p className="text-[11px] text-[var(--text-secondary)] font-mono">
                  {language === 'ar'
                    ? 'المعايرة اليومية المتقدمة: بطاقات، أسئلة متعددة، صح/خطأ وإكمال معادلات مدعومة بـ FSRS v5'
                    : 'Instrument-grade daily calibration: Flashcards, MCQs, True/False & Formula Completion via FSRS v5'}
                </p>
              </div>
            </div>

            {/* Streak & Accuracy Telemetry */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs font-mono text-amber-400">
                <Flame size={13} className="text-amber-500 fill-amber-500/20" />
                <span className="tabular-nums font-bold">{streakDays}</span>
                <span className="text-[10px] text-[var(--text-tertiary)]">{language === 'ar' ? 'أيام' : 'days'}</span>
              </div>

              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs font-mono text-emerald-400">
                <Target size={13} className="text-emerald-500" />
                <span className="tabular-nums font-bold">
                  {sessionStats.reviewed > 0
                    ? Math.round((sessionStats.correct / sessionStats.reviewed) * 100)
                    : 100}
                  %
                </span>
              </div>
            </div>
          </div>

          {/* Drill Format Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-tertiary)] me-1">
              <Filter size={11} className="inline me-1" />
              {language === 'ar' ? 'النمط:' : 'Format:'}
            </span>
            {[
              { id: 'all', en: 'All Formats', ar: 'جميع الأنماط' },
              { id: 'flashcard', en: 'Flashcards', ar: 'بطاقات المفاهيم' },
              { id: 'mcq', en: 'MCQs', ar: 'اختيار من متعدد' },
              { id: 'boolean', en: 'True / False', ar: 'صح / خطأ' },
              { id: 'formula_fill', en: 'Formula Completion', ar: 'إكمال المعادلات' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleSelectFilter(tab.id as 'all' | DrillFormat)}
                className={`px-2.5 py-1 text-xs font-mono rounded-lg border transition-all ${
                  selectedFormatFilter === tab.id
                    ? 'border-[var(--math-prediction)] bg-[var(--math-prediction)]/15 text-[var(--math-prediction)] font-bold shadow-sm'
                    : 'border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]'
                }`}
              >
                {language === 'ar' ? tab.ar : tab.en}
              </button>
            ))}
          </div>
        </div>

        {/* Empty State for Beginners (0 mastered lessons) */}
        {qualifiedDrills.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center space-y-5 fade-in rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-8 specular">
            <div className="w-16 h-16 rounded-2xl bg-[var(--math-prediction)]/10 border border-[var(--math-prediction)]/20 flex items-center justify-center text-[var(--math-prediction)]">
              <Brain size={32} />
            </div>
            <div className="space-y-2 max-w-md">
              <h2 className="text-lg font-bold text-[var(--text-primary)]">
                {language === 'ar' ? 'منصة المعايرة بانتظار إنجازك الأول!' : 'Your Calibration Deck is Waiting!'}
              </h2>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                {language === 'ar'
                  ? 'تعتمد المعايرة اليومية على خوارزمية التكرار المتباعد FSRS لجدولة مراجعة المفاهيم التي أتقنتها فعلياً، لضمان عدم إرهاقك بمفاهيم لم تدرسها بعد. أنجز درسك الأول واجتز اختباره لتفعيل بطاقاتك!'
                  : 'Daily Calibration uses the FSRS spaced repetition engine to schedule memory reviews strictly for concepts you have mastered, preventing cognitive overload on unlearned material. Master your first lesson to activate your deck!'}
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  setActiveLessonId('linear-algebra-vectors');
                  setCurrentView('lesson');
                }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--math-prediction)] text-black font-semibold text-xs transition-transform active:scale-95 shadow-md shadow-[var(--math-prediction)]/20"
              >
                <span>{language === 'ar' ? 'ابدأ الدرس 1: المتجهات كهندسة' : 'Start Lesson 1: Vectors as Geometry'}</span>
              </button>
              <button
                onClick={() => setCurrentView('constellation')}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[var(--border-subtle)] text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-hover)] transition-colors"
              >
                <span>{language === 'ar' ? 'استكشف كوكبة المعرفة' : 'Explore Constellation'}</span>
              </button>
            </div>
          </div>
        ) : isComplete ? (
          <div className="flex flex-col items-center justify-center py-16 text-center space-y-4 fade-in rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-8 specular">
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Sparkles size={26} />
            </div>
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-[var(--text-primary)]">
                {language === 'ar' ? 'اكتملت جلسة المعايرة بنجاح!' : 'Daily Calibration Completed!'}
              </h2>
              <p className="text-xs text-[var(--text-secondary)] font-mono">
                {language === 'ar'
                  ? `أنجزت مراجعة ${sessionStats.reviewed} تدريباً بنسبة دقة ${Math.round((sessionStats.correct / (sessionStats.reviewed || 1)) * 100)}% وحصلت على +${sessionStats.xpEarned} XP.`
                  : `Calibrated ${sessionStats.reviewed} drills with ${Math.round((sessionStats.correct / (sessionStats.reviewed || 1)) * 100)}% accuracy. Earned +${sessionStats.xpEarned} XP.`}
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => {
                  setCurrentIndex(0);
                  setSessionStats({ reviewed: 0, correct: 0, xpEarned: 0 });
                  resetInteraction();
                }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[var(--border-subtle)] text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-hover)] transition-colors"
              >
                <RotateCcw size={13} />
                <span>{language === 'ar' ? 'بدء جولة جديدة' : 'Restart Session'}</span>
              </button>
            </div>
          </div>
        ) : currentItem ? (
          <div className="space-y-4 fade-in">
            {/* Question Progress Banner */}
            <div className="flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded border ${
                    currentItem.format === 'flashcard'
                      ? 'border-purple-500/30 bg-purple-500/10 text-[var(--math-prediction)]'
                      : currentItem.format === 'mcq'
                      ? 'border-sky-500/30 bg-sky-500/10 text-[var(--math-data)]'
                      : currentItem.format === 'boolean'
                      ? 'border-amber-500/30 bg-amber-500/10 text-[var(--math-gradient)]'
                      : 'border-emerald-500/30 bg-emerald-500/10 text-[var(--math-vector)]'
                  }`}
                >
                  {currentItem.format === 'flashcard' && (language === 'ar' ? 'بطاقة مفاهيمية' : 'Flashcard')}
                  {currentItem.format === 'mcq' && (language === 'ar' ? 'اختيار من متعدد' : 'Multiple Choice')}
                  {currentItem.format === 'boolean' && (language === 'ar' ? 'صح أم خطأ' : 'True / False')}
                  {currentItem.format === 'formula_fill' && (language === 'ar' ? 'إكمال المعادلة' : 'Formula Fill')}
                </span>

                <span className="text-[11px] text-[var(--text-tertiary)] font-mono">
                  {language === 'ar' ? currentItem.conceptAr : currentItem.concept}
                </span>
              </div>

              {/* Progress Bar Counter */}
              <div className="flex items-center gap-2 text-[var(--text-tertiary)] tabular-nums">
                <span>
                  {currentIndex + 1} / {activeDrills.length}
                </span>
                <span className="w-16 h-1.5 rounded-full bg-[var(--border-subtle)] overflow-hidden">
                  <span
                    className="block h-full bg-[var(--math-vector)] transition-all duration-300"
                    style={{ width: `${((currentIndex + 1) / activeDrills.length) * 100}%` }}
                  />
                </span>
              </div>
            </div>

            {/* ====================================================================
                FORMAT 1: TACTILE FLASHCARD
               ==================================================================== */}
            {currentItem.format === 'flashcard' && (
              <div
                onClick={handleFlipCard}
                className={`min-h-[260px] rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-surface)] specular p-7 flex flex-col justify-between transition-all select-none ${
                  isFlipped
                    ? 'cursor-default'
                    : 'cursor-pointer hover:border-[var(--text-secondary)] hover:shadow-xl'
                }`}
              >
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-tertiary)] block mb-2">
                    {language === 'ar' ? 'السؤال المفاهيمي:' : 'Conceptual Prompt:'}
                  </span>
                  <p className="text-base font-medium text-[var(--text-primary)] leading-relaxed">
                    {language === 'ar' ? currentItem.promptAr : currentItem.prompt}
                  </p>
                </div>

                {isFlipped ? (
                  <div className="pt-4 mt-4 border-t border-[var(--border-subtle)] space-y-3 slide-up">
                    {currentItem.solutionFormula && (
                      <div dir="ltr" className="p-3 rounded-lg bg-[var(--bg-app)] border border-[var(--border-subtle)] text-center font-mono">
                        <KaTeXMath math={currentItem.solutionFormula} block />
                      </div>
                    )}
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                      {language === 'ar' ? currentItem.solutionAr : currentItem.solution}
                    </p>
                    {currentCardState && (
                      <div className="flex items-center gap-3 pt-1 text-[10px] font-mono text-[var(--text-tertiary)]">
                        <span className="flex items-center gap-1">
                          <Clock size={11} />
                          Stability: <span className="tabular-nums text-[var(--math-vector)]">{currentCardState.stability.toFixed(1)}d</span>
                        </span>
                        <span>
                          Retention: <span className="tabular-nums text-[var(--math-data)]">{(retrievability(0, currentCardState.stability) * 100).toFixed(0)}%</span>
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center justify-center pt-8 text-xs text-[var(--text-tertiary)] gap-1.5 font-mono">
                    <span>{tr('flipCard', language)}</span>
                    <kbd className="px-1.5 py-0.5 rounded bg-[var(--border-subtle)] text-[10px]">Space</kbd>
                  </div>
                )}
              </div>
            )}

            {/* ====================================================================
                FORMAT 2: MULTIPLE CHOICE QUESTION (MCQ)
               ==================================================================== */}
            {currentItem.format === 'mcq' && currentOptions.length > 0 && (
              <div className="rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-surface)] specular p-6 space-y-5">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-tertiary)] block mb-1.5">
                    {language === 'ar' ? 'سؤال متعدد الخيارات:' : 'Multiple Choice Prompt:'}
                  </span>
                  <p className="text-sm font-semibold text-[var(--text-primary)] leading-relaxed">
                    {language === 'ar' ? currentItem.promptAr : currentItem.prompt}
                  </p>
                </div>

                <div className="space-y-2.5">
                  {currentOptions.map((opt, idx) => {
                    const isSelected = selectedOptionIdx === idx;
                    const isCorrect = opt.correct;
                    const showFeedback = isAnswerRevealed;

                    return (
                      <button
                        key={idx}
                        disabled={isAnswerRevealed}
                        onClick={() => handleSelectOption(idx)}
                        className={`w-full flex items-start gap-3 p-3.5 rounded-xl border text-start transition-all ${
                          showFeedback
                            ? isCorrect
                              ? 'border-emerald-500 bg-emerald-500/10 text-[var(--math-vector)] font-semibold'
                              : isSelected
                              ? 'border-rose-500 bg-rose-500/10 text-[var(--math-loss)]'
                              : 'border-[var(--border-subtle)] opacity-40 text-[var(--text-tertiary)]'
                            : 'border-[var(--border-subtle)] bg-[var(--bg-app)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)] hover:translate-y-[-1px]'
                        }`}
                      >
                        <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px] font-mono shrink-0 mt-0.5">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <div className="flex-1 text-xs leading-relaxed">
                          {language === 'ar' && opt.textAr ? opt.textAr : opt.text}
                          {opt.formula && (
                            <div dir="ltr" className="my-1 font-mono text-zinc-200">
                              <KaTeXMath math={opt.formula} />
                            </div>
                          )}
                        </div>
                        {showFeedback && isCorrect && <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />}
                        {showFeedback && isSelected && !isCorrect && <XCircle size={16} className="text-rose-400 shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation Reveal Drawer */}
                {isAnswerRevealed && selectedOptionIdx !== null && (
                  <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-app)] space-y-2 slide-up text-xs leading-relaxed">
                    <div className="flex items-center gap-1.5 font-bold font-mono">
                      {currentOptions[selectedOptionIdx]?.correct ? (
                        <span className="text-emerald-400 flex items-center gap-1">
                          <Check size={14} /> {language === 'ar' ? 'إجابة صحيحة ومتقنة!' : 'Correct!'}
                        </span>
                      ) : (
                        <span className="text-rose-400 flex items-center gap-1">
                          <X size={14} /> {language === 'ar' ? 'إجابة غير صحيحة — راجع التفسير الرياضي:' : 'Incorrect — Review the derivation:'}
                        </span>
                      )}
                    </div>
                    <p className="text-[var(--text-secondary)]">
                      {language === 'ar'
                        ? currentOptions[selectedOptionIdx]?.explanationAr || currentOptions.find((o) => o.correct)?.explanationAr
                        : currentOptions[selectedOptionIdx]?.explanation || currentOptions.find((o) => o.correct)?.explanation}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* ====================================================================
                FORMAT 3: TRUE / FALSE (BOOLEAN)
               ==================================================================== */}
            {currentItem.format === 'boolean' && (
              <div className="rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-surface)] specular p-6 space-y-5">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-tertiary)] block mb-1.5">
                    {language === 'ar' ? 'التحقق من صحة الفرضية الرياضية:' : 'Mathematical Assertion Check:'}
                  </span>
                  <p className="text-base font-semibold text-[var(--text-primary)] leading-relaxed">
                    {language === 'ar' ? currentItem.promptAr : currentItem.prompt}
                  </p>
                </div>

                {currentItem.booleanFormula && (
                  <div dir="ltr" className="p-3 rounded-lg bg-[var(--bg-app)] border border-[var(--border-subtle)] text-center font-mono">
                    <KaTeXMath math={currentItem.booleanFormula} block />
                  </div>
                )}

                {/* Yes / No Tactile Hardware Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  {[true, false].map((val) => {
                    const isSelected = selectedBooleanAnswer === val;
                    const isCorrect = currentItem.booleanAnswer === val;
                    const showFeedback = isAnswerRevealed;

                    return (
                      <button
                        key={String(val)}
                        disabled={isAnswerRevealed}
                        onClick={() => handleSelectBoolean(val)}
                        className={`p-4 rounded-xl border font-mono text-center transition-all ${
                          showFeedback
                            ? isCorrect
                              ? 'border-emerald-500 bg-emerald-500/10 text-[var(--math-vector)] font-bold'
                              : isSelected
                              ? 'border-rose-500 bg-rose-500/10 text-[var(--math-loss)] font-bold'
                              : 'border-[var(--border-subtle)] opacity-40 text-[var(--text-tertiary)]'
                            : 'border-[var(--border-subtle)] bg-[var(--bg-app)] hover:border-[var(--border-strong)] text-[var(--text-primary)] hover:translate-y-[-1px]'
                        }`}
                      >
                        <div className="text-sm font-bold flex items-center justify-center gap-2">
                          {val ? <Check size={16} className="text-[var(--math-vector)]" /> : <X size={16} className="text-[var(--math-loss)]" />}
                          <span>{val ? (language === 'ar' ? 'صحيح (نعم)' : 'True / Yes') : (language === 'ar' ? 'خطأ (لا)' : 'False / No')}</span>
                        </div>
                        <div className="text-[10px] text-[var(--text-tertiary)] mt-1">
                          {currentItem.booleanLabels
                            ? val
                              ? currentItem.booleanLabels.trueText[language]
                              : currentItem.booleanLabels.falseText[language]
                            : val ? 'Affirm statement' : 'Refute statement'}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Boolean Explanation Drawer */}
                {isAnswerRevealed && (
                  <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-app)] space-y-1.5 slide-up text-xs leading-relaxed">
                    <span className="font-bold text-[var(--text-primary)] block font-mono">
                      {selectedBooleanAnswer === currentItem.booleanAnswer
                        ? language === 'ar' ? '✓ تحليل منطقي دقيق وموفق:' : '✓ Accurate reasoning:'
                        : language === 'ar' ? '✗ انتبه للحالة الدقيقة:' : '✗ Notice the theoretical boundary:'}
                    </span>
                    <p className="text-[var(--text-secondary)]">
                      {currentItem.booleanExplanation ? currentItem.booleanExplanation[language] : ''}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* ====================================================================
                FORMAT 4: FORMULA FILL-IN-THE-BLANK
               ==================================================================== */}
            {currentItem.format === 'formula_fill' && currentOptions.length > 0 && (
              <div className="rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-surface)] specular p-6 space-y-5">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-tertiary)] block mb-1.5">
                    {language === 'ar' ? 'إكمال الرمز المفقود في المعادلة:' : 'Formula Token Completion:'}
                  </span>
                  <p className="text-sm font-semibold text-[var(--text-primary)] leading-relaxed">
                    {language === 'ar' ? currentItem.promptAr : currentItem.prompt}
                  </p>
                </div>

                {/* Equation Display Box */}
                <div dir="ltr" className="p-4 rounded-xl bg-[var(--bg-app)] border border-[var(--border-subtle)] text-center text-sm font-mono">
                  <KaTeXMath
                    math={
                      isAnswerRevealed && currentItem.filledDisplayFormula
                        ? currentItem.filledDisplayFormula
                        : currentItem.blankDisplayFormula || ''
                    }
                    block
                  />
                </div>

                {/* Options Token Chips */}
                <div className="grid grid-cols-2 gap-2.5">
                  {currentOptions.map((opt, idx) => {
                    const isSelected = selectedOptionIdx === idx;
                    const isCorrect = opt.correct;
                    const showFeedback = isAnswerRevealed;

                    return (
                      <button
                        key={idx}
                        disabled={isAnswerRevealed}
                        onClick={() => handleSelectOption(idx)}
                        className={`p-3 rounded-xl border text-center font-mono transition-all ${
                          showFeedback
                            ? isCorrect
                              ? 'border-emerald-500 bg-emerald-500/10 text-[var(--math-vector)] font-bold'
                              : isSelected
                              ? 'border-rose-500 bg-rose-500/10 text-[var(--math-loss)]'
                              : 'border-[var(--border-subtle)] opacity-40 text-[var(--text-tertiary)]'
                            : 'border-[var(--border-subtle)] bg-[var(--bg-app)] hover:border-[var(--border-strong)] text-[var(--text-primary)] hover:translate-y-[-1px]'
                        }`}
                      >
                        <div className="text-xs font-bold">
                          {opt.formula ? <KaTeXMath math={opt.formula} /> : opt.text}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Explanation */}
                {isAnswerRevealed && selectedOptionIdx !== null && (
                  <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-app)] space-y-1.5 slide-up text-xs leading-relaxed">
                    <span className="font-bold text-[var(--text-primary)] font-mono block">
                      {currentOptions[selectedOptionIdx]?.correct
                        ? language === 'ar' ? '✓ تم التحقق الرياضي بنجاح:' : '✓ Mathematically verified:'
                        : language === 'ar' ? '✗ الرمز الصحيح والتفسير:' : '✗ Correct token derivation:'}
                    </span>
                    <p className="text-[var(--text-secondary)]">
                      {language === 'ar'
                        ? currentOptions[selectedOptionIdx]?.explanationAr || currentOptions.find((o) => o.correct)?.explanationAr
                        : currentOptions[selectedOptionIdx]?.explanation || currentOptions.find((o) => o.correct)?.explanation}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* ====================================================================
                FSRS v5 RATING BAR (Revealed upon answering any format)
               ==================================================================== */}
            {isAnswerRevealed && (
              <div className="space-y-2 pt-1 slide-up">
                <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-secondary)]">
                  <span>{language === 'ar' ? 'معايرة ثبات الذاكرة (FSRS v5):' : 'Calibrate Memory Stability (FSRS v5):'}</span>
                  <span className="text-[10px] text-[var(--text-tertiary)]">Keys: 1, 2, 3, 4</span>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {([1, 2, 3, 4] as Rating[]).map((rating) => {
                    const label = getRatingLabel(rating, currentCardState ? currentCardState.stability : 1.0);
                    const isAgain = rating === 1;
                    const isHard = rating === 2;
                    const isGood = rating === 3;

                    return (
                      <button
                        key={rating}
                        onClick={() => handleRate(rating)}
                        className={`p-3 rounded-xl border text-center font-mono transition-transform active:scale-95 hover:brightness-110 shadow-sm ${
                          isAgain
                            ? 'border-[var(--math-loss)]/50 bg-[var(--math-loss)]/10 text-[var(--math-loss)] hover:bg-[var(--math-loss)]/20'
                            : isHard
                            ? 'border-[var(--math-gradient)]/50 bg-[var(--math-gradient)]/10 text-[var(--math-gradient)] hover:bg-[var(--math-gradient)]/20'
                            : isGood
                            ? 'border-[var(--math-data)]/50 bg-[var(--math-data)]/10 text-[var(--math-data)] hover:bg-[var(--math-data)]/20'
                            : 'border-[var(--math-vector)]/50 bg-[var(--math-vector)]/10 text-[var(--math-vector)] hover:bg-[var(--math-vector)]/20'
                        }`}
                      >
                        <div className="text-xs font-bold">
                          {isAgain
                            ? tr('again', language)
                            : isHard
                            ? tr('hard', language)
                            : isGood
                            ? tr('good', language)
                            : tr('easy', language)}
                        </div>
                        <div className="text-[10px] tabular-nums opacity-80 mt-0.5">
                          ({label})
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ) : null}

        {/* Guaranteed clearance spacer so fixed bottom bar never overlaps controls */}
        <div className="h-16 shrink-0 pointer-events-none" aria-hidden="true" />
      </div>
    </div>
  );
};

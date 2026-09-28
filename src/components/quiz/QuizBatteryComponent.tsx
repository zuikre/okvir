import React, { useState, useCallback, useMemo } from 'react';
import {
  Award,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  Lock,
} from 'lucide-react';
import { useOkvirStore } from '@/lib/store';
import { KaTeXMath } from '@/components/common/KaTeXMath';
import { MathText } from '@/components/common/MathText';
import { audio } from '@/lib/audio';
import type { DiagnosticQuestion, DiagnosticOption } from '@/lib/types';

interface QuizBatteryComponentProps {
  questions: DiagnosticQuestion[];
  onMasteryCertified: (scorePct: number, passed: boolean) => void;
  passingScorePct?: number;
  lessonId: string;
  moduleTitle?: string;
  moduleTitleAr?: string;
}

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export const QuizBatteryComponent: React.FC<QuizBatteryComponentProps> = ({
  questions,
  onMasteryCertified,
  passingScorePct = 75,
  lessonId,
  moduleTitle,
  moduleTitleAr,
}) => {
  const { language, config } = useOkvirStore();
  const isAr = language === 'ar';

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<Record<number, boolean>>({});
  const [shuffledOptionsMap, setShuffledOptionsMap] = useState<Record<number, DiagnosticOption[]>>(() => {
    const initialMap: Record<number, DiagnosticOption[]> = {};
    questions.forEach((q, idx) => {
      initialMap[idx] = [...q.options];
    });
    return initialMap;
  });
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQuestion = questions[currentIndex];
  const currentOptions = shuffledOptionsMap[currentIndex] || currentQuestion?.options || [];
  const currentSelectedIdx = selectedAnswers[currentIndex] ?? null;
  const isCurrentSubmitted = isAnswerSubmitted[currentIndex] ?? false;

  // Handle option selection
  const handleSelectOption = useCallback(
    (optIdx: number) => {
      if (isCurrentSubmitted) return;

      setSelectedAnswers((prev) => ({ ...prev, [currentIndex]: optIdx }));
      setIsAnswerSubmitted((prev) => ({ ...prev, [currentIndex]: true }));

      const option = currentOptions[optIdx];
      if (config.soundEnabled) {
        if (option?.correct) {
          audio.playSuccess();
        } else {
          audio.playErrorTick();
        }
      }
    },
    [isCurrentSubmitted, currentIndex, currentOptions, config.soundEnabled]
  );

  // Score calculation
  const calculatedResults = useMemo(() => {
    let correctCount = 0;
    const details = questions.map((q, qIdx) => {
      const selectedOptIdx = selectedAnswers[qIdx];
      const opts = shuffledOptionsMap[qIdx] || q.options;
      const chosenOpt = selectedOptIdx !== undefined ? opts[selectedOptIdx] : null;
      const isCorrect = chosenOpt?.correct ?? false;
      if (isCorrect) correctCount++;
      return {
        questionId: q.id,
        depthTier: q.depthTier,
        isCorrect,
        chosenOpt,
      };
    });

    const scorePct = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0;
    const isPassing = scorePct >= passingScorePct;

    return {
      correctCount,
      totalCount: questions.length,
      scorePct,
      isPassing,
      details,
    };
  }, [questions, selectedAnswers, shuffledOptionsMap, passingScorePct]);

  // Proceed to next question or finalize
  const handleAdvance = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsCompleted(true);
      const passed = calculatedResults.isPassing;
      if (config.soundEnabled) {
        if (passed) {
          audio.playVictoryHarmonics();
        } else {
          audio.playErrorTick();
        }
      }
      onMasteryCertified(calculatedResults.scorePct, passed);
    }
  }, [currentIndex, questions.length, calculatedResults, config.soundEnabled, onMasteryCertified]);

  // Retry quiz battery with reshuffled options
  const handleRetry = useCallback(() => {
    const reshuffled: Record<number, DiagnosticOption[]> = {};
    questions.forEach((q, idx) => {
      reshuffled[idx] = shuffleArray(q.options);
    });

    setShuffledOptionsMap(reshuffled);
    setSelectedAnswers({});
    setIsAnswerSubmitted({});
    setCurrentIndex(0);
    setIsCompleted(false);

    if (config.soundEnabled) audio.playClick();
  }, [questions, config.soundEnabled]);

  if (!questions || questions.length === 0) {
    return null;
  }

  // =========================================================================
  // VIEW: FINAL SCORE & MASTERY CERTIFICATION REPORT
  // =========================================================================
  if (isCompleted) {
    const { correctCount, totalCount, scorePct, isPassing } = calculatedResults;

    return (
      <div className="rounded-3xl border border-[var(--border-strong)] bg-[var(--bg-surface)] p-8 md:p-10 space-y-8 specular shadow-2xl animate-fade-in">
        <div className="flex flex-col items-center text-center space-y-4">
          <div
            className={`w-20 h-20 rounded-full flex items-center justify-center border shadow-xl ${
              isPassing
                ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400 shadow-emerald-500/20'
                : 'bg-rose-500/20 border-rose-500/40 text-rose-400 shadow-rose-500/20'
            }`}
          >
            {isPassing ? <ShieldCheck className="w-10 h-10" /> : <AlertTriangle className="w-10 h-10" />}
          </div>

          <div className="space-y-1">
            <span
              className={`text-xs font-mono uppercase tracking-widest font-bold px-3 py-1 rounded-full border inline-block ${
                isPassing
                  ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                  : 'border-rose-500/30 bg-rose-500/10 text-rose-300'
              }`}
            >
              {isPassing
                ? isAr
                  ? '✓ تم اعتماد التمكن بنجاح'
                  : '✓ Certified Mastery Verified'
                : isAr
                ? 'لم يتم الوصول لعتبة التمكن المطلوبة (٧٥٪)'
                : 'Mastery Threshold Not Met (75% Required)'}
            </span>

            <h3 className="text-3xl font-extrabold text-[var(--text-primary)] pt-2">
              {scorePct}% {isAr ? `(${correctCount} من ${totalCount})` : `(${correctCount} of ${totalCount} Correct)`}
            </h3>

            <p className="text-sm text-[var(--text-secondary)] max-w-md mx-auto leading-relaxed pt-1">
              {isPassing
                ? isAr
                  ? 'أظهرت استيعاباً رصيناً للمفاهيم الرياضية والهندسية، وخلو مسارك الفكري من الشراك والمفاهيم الخاطئة. تم فتح زر حصد الـ 100 XP واعتماد الدرس في خريطة المعرفة.'
                  : 'You demonstrated robust mastery of mathematical boundaries and avoided theoretical traps. The Claim Mastery button below is now unlocked.'
                : isAr
                ? 'يشترط Okvir إحراز نسبة ٧٥٪ على الأقل لاعتماد الدرس ومنع التقدم الوهمي غير المستحق. راجع المفاهيم التي تعثرت فيها وأعد التحدي.'
                : 'Okvir enforces strict mastery gating (≥ 75%) to prevent unearned progress. Review the diagnostics below and retry to unlock your certification.'}
            </p>
          </div>
        </div>

        {/* Detailed Question Review Pill List */}
        <div className="space-y-3 pt-2">
          <span className="text-xs text-[var(--text-tertiary)] font-bold block">
            {isAr ? 'تفاصيل الإجابات حسب المستويات الإدراكية:' : 'Diagnostic Breakdown by Cognitive Tier:'}
          </span>

          <div className="grid grid-cols-1 gap-2.5">
            {calculatedResults.details.map((item, idx) => (
              <div
                key={item.questionId}
                className={`p-3.5 rounded-2xl border flex items-center justify-between text-xs ${
                  item.isCorrect
                    ? 'border-emerald-500/30 bg-emerald-500/5 text-emerald-300'
                    : 'border-rose-500/30 bg-rose-500/5 text-rose-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.isCorrect ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <XCircle className="w-4 h-4 shrink-0" />}
                  <span>
                    {isAr ? `السؤال ${idx + 1}` : `Question ${idx + 1}`}:{' '}
                    <span className="opacity-80">
                      {item.depthTier === 1
                        ? isAr
                          ? 'المستوى ١: الحدس الهندسي'
                          : 'Tier 1: Intuition & Geometry'
                        : item.depthTier === 2
                        ? isAr
                          ? 'المستوى ٢: المعيار الرياضي'
                          : 'Tier 2: Mathematical Boundary'
                        : isAr
                        ? 'المستوى ٣: الشرك والمفهوم الخاطئ'
                        : 'Tier 3: Misconception Trap'}
                    </span>
                  </span>
                </div>

                <span className="font-bold">{item.isCorrect ? (isAr ? 'صحيح' : 'Correct') : isAr ? 'غير صحيح' : 'Missed'}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 border-t border-[var(--border-subtle)]">
          {!isPassing && (
            <button
              onClick={handleRetry}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl border border-rose-500/40 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{isAr ? 'إعادة التحدي التشخيصي (خيارات عشوائية)' : 'Retry Assessment Battery (Shuffled)'}</span>
            </button>
          )}

          {isPassing && (
            <div className="text-center sm:text-start">
              <span className="text-xs font-mono text-emerald-400 font-bold flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                {isAr ? 'انتقل إلى القسم الأخير أدناه لحصد الـ 100 XP' : 'Scroll to the final section below to claim your +100 XP!'}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW: ACTIVE QUESTION BATTERY STEPPER
  // =========================================================================
  const tierColor =
    currentQuestion.depthTier === 1
      ? 'border-sky-500/30 bg-sky-500/10 text-sky-300'
      : currentQuestion.depthTier === 2
      ? 'border-purple-500/30 bg-purple-500/10 text-purple-300'
      : 'border-amber-500/30 bg-amber-500/10 text-amber-300';

  const tierLabel =
    currentQuestion.depthTier === 1
      ? isAr
        ? 'المستوى ١: الحدس الهندسي'
        : 'Tier 1: Intuition & Geometry'
      : currentQuestion.depthTier === 2
      ? isAr
        ? 'المستوى ٢: المعيار الرياضي'
        : 'Tier 2: Mathematical Boundary'
      : isAr
      ? 'المستوى ٣: الشرك والمفهوم الخاطئ'
      : 'Tier 3: Misconception Trap';

  return (
    <div className="rounded-3xl border border-[var(--border-strong)] bg-[var(--bg-surface)] p-6 md:p-8 space-y-6 specular shadow-xl">
      {/* Top Header & Stepper Progress */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--border-subtle)] pb-4">
        <div className="flex items-center gap-2.5">
          <span className={`text-[10px] font-mono uppercase font-bold tracking-wider px-2.5 py-1 rounded-full border ${tierColor}`}>
            {tierLabel}
          </span>
          <span className="text-xs font-mono text-[var(--text-tertiary)]">
            {isAr
              ? `السؤال ${currentIndex + 1} من ${questions.length}`
              : `Question ${currentIndex + 1} of ${questions.length}`}
          </span>
        </div>

        {/* Stepper Progress Bar */}
        <div className="flex items-center gap-2">
          {questions.map((_, idx) => {
            const isAnswered = selectedAnswers[idx] !== undefined;
            const isCurrent = idx === currentIndex;
            return (
              <span
                key={idx}
                className={`h-2 rounded-full transition-all duration-300 ${
                  isCurrent
                    ? 'w-8 bg-purple-400'
                    : isAnswered
                    ? 'w-3 bg-emerald-400'
                    : 'w-3 bg-[var(--border-subtle)]'
                }`}
              />
            );
          })}
        </div>
      </div>

      {/* Question Prompt */}
      <div className="space-y-3">
        <div className="text-base md:text-lg font-semibold text-[var(--text-primary)] leading-relaxed">
          <MathText text={isAr ? currentQuestion.prompt.ar : currentQuestion.prompt.en} />
        </div>

        {currentQuestion.latexAnchor && (
          <div dir="ltr" className="py-3 px-4 rounded-xl bg-[var(--bg-app)] border border-[var(--border-subtle)] text-center text-sm font-mono text-[var(--text-primary)]">
            <KaTeXMath math={currentQuestion.latexAnchor} block />
          </div>
        )}
      </div>

      {/* Option Cards */}
      <div className="grid grid-cols-1 gap-3 pt-2">
        {currentOptions.map((opt, optIdx) => {
          const isSelected = currentSelectedIdx === optIdx;
          const showFeedback = isCurrentSubmitted;
          const isCorrect = opt.correct;

          let cardStyle =
            'border-[var(--border-subtle)] bg-[var(--bg-app)] text-[var(--text-primary)] hover:border-[var(--border-strong)] hover:translate-y-[-1px] cursor-pointer';

          if (showFeedback) {
            if (isCorrect) {
              cardStyle = 'border-emerald-500 bg-emerald-500/10 text-emerald-300 font-semibold shadow-md ring-1 ring-emerald-500/30';
            } else if (isSelected) {
              cardStyle = 'border-rose-500 bg-rose-500/10 text-rose-300 font-semibold shadow-md ring-1 ring-rose-500/30';
            } else {
              cardStyle = 'border-[var(--border-subtle)] bg-[var(--bg-app)] opacity-40 text-[var(--text-tertiary)]';
            }
          }

          return (
            <button
              key={optIdx}
              disabled={isCurrentSubmitted}
              onClick={() => handleSelectOption(optIdx)}
              className={`p-4 rounded-2xl border text-start transition-all relative ${cardStyle}`}
            >
              <div className="flex items-start gap-3">
                <span
                  className={`w-6 h-6 rounded-lg text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5 border ${
                    showFeedback && isCorrect
                      ? 'border-emerald-500 bg-emerald-500 text-black'
                      : showFeedback && isSelected
                      ? 'border-rose-500 bg-rose-500 text-white'
                      : 'border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)]'
                  }`}
                >
                  {String.fromCharCode(65 + optIdx)}
                </span>

                <div className="flex-1 text-sm leading-relaxed">
                  <MathText text={isAr ? opt.text.ar : opt.text.en} />
                </div>

                {showFeedback && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />}
                {showFeedback && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />}
              </div>
            </button>
          );
        })}
      </div>

      {/* Immediate Diagnostic Rationale Drawer */}
      {isCurrentSubmitted && currentSelectedIdx !== null && (
        <div className="p-5 rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-app)] space-y-3 animate-fade-in">
          <div className="flex items-center gap-2 text-xs font-bold">
            {currentOptions[currentSelectedIdx]?.correct ? (
              <span className="text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                {isAr ? '✓ تشخيص صحيح تماماً:' : '✓ Accurately Diagnosed:'}
              </span>
            ) : (
              <span className="text-rose-400 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" />
                {isAr ? '✗ كشف المفهوم الخاطئ أو الشرك:' : '✗ Misconception or Boundary Detected:'}
              </span>
            )}
          </div>

          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed font-normal">
            {isAr
              ? currentOptions[currentSelectedIdx]?.diagnosticFeedback.ar
              : currentOptions[currentSelectedIdx]?.diagnosticFeedback.en}
          </p>

          {/* Advance Stepper Button */}
          <div className="flex justify-end pt-2">
            <button
              onClick={handleAdvance}
              className="px-6 py-2.5 rounded-xl bg-purple-500 hover:bg-purple-400 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-purple-500/20 transition-all cursor-pointer transform hover:scale-105"
            >
              <span>
                {currentIndex < questions.length - 1
                  ? isAr
                    ? 'السؤال التالي'
                    : 'Next Question'
                  : isAr
                  ? 'عرض النتيجة واعتماد التمكن'
                  : 'View Results & Certify'}
              </span>
              <ArrowRight className="w-4 h-4 rtl-flip" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

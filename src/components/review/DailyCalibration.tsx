import React, { useState, useMemo, useEffect } from 'react';
import { RefreshCw, Clock, Brain, ChevronRight, RotateCcw, Sparkles } from 'lucide-react';
import { useOkvirStore } from '@/lib/store';
import { tr } from '@/lib/i18n';
import { curriculum } from '@/lib/curriculum';
import { createNewCard, updateCard, retrievability, getRatingLabel } from '@/lib/fsrs';
import { KaTeXMath } from '@/components/common/KaTeXMath';
import type { FSRSState, Rating } from '@/lib/fsrs';

interface CalibrationFlashcard {
  id: string;
  concept: string;
  conceptAr: string;
  prompt: string;
  promptAr: string;
  solutionFormula?: string;
  solution: string;
  solutionAr: string;
  card: FSRSState;
}

const FOUNDATIONAL_DRILL_CARDS: Omit<CalibrationFlashcard, 'card'>[] = [
  {
    id: 'drill-gauss-markov',
    concept: 'Gauss-Markov Theorem (BLUE)',
    conceptAr: 'مبرهنة غاوس-ماركوف (BLUE)',
    prompt: 'Under what conditions is the OLS estimator the Best Linear Unbiased Estimator (BLUE)?',
    promptAr: 'تحت أي شروط يكون مقدر المربعات الصغرى (OLS) هو أفضل مقدر خطي غير متحيّز (BLUE)؟',
    solutionFormula: 'E[\\epsilon|X] = 0, \\quad \\text{Var}(\\epsilon|X) = \\sigma^2 I',
    solution: 'Zero conditional mean of errors, strict exogeneity, homoscedasticity (constant error variance), and no multicollinearity among regressors.',
    solutionAr: 'المتوسط الشرطي الصفري للبواقي، التجانس الخارجي التام، ثبات تباين الأخطاء (Homoscedasticity)، وغياب التعدد الخطي التام بين المتغيرات.',
  },
  {
    id: 'drill-normal-equations',
    concept: 'Normal Equations (Analytical OLS)',
    conceptAr: 'المعادلات الطبيعية (حل OLS المغلق)',
    prompt: 'What is the analytical matrix solution vector for beta that minimizes sum of squared residuals?',
    promptAr: 'ما هو المتجه المصفوفي للحل التحليلي المغلق الذي يقلل مجموع مربعات البواقي؟',
    solutionFormula: '\\hat{\\beta} = (X^T X)^{-1} X^T y',
    solution: 'The closed-form projection of y onto the column space of design matrix X, requiring (XᵀX) to be invertible (full column rank).',
    solutionAr: 'الإسقاط الهندسي المغلق لمتجه y على فضاء الأعمدة للمصفوفة X، ويشترط أن تكون المصفوفة (XᵀX) قابلة للقَلْب (رتبة عمودية كاملة).',
  },
  {
    id: 'drill-fsrs-retrievability',
    concept: 'FSRS v5 Retention Formula',
    conceptAr: 'معادلة التذكر FSRS v5',
    prompt: 'How does FSRS v5 model probability of recall R(t, S) as a function of elapsed time t and stability S?',
    promptAr: 'كيف تحسب خوارزمية FSRS v5 احتمالية الاسترجاع R(t, S) بدلالة الوقت المنقضي t وثبات الذاكرة S؟',
    solutionFormula: 'R(t, S) = \\left(1 + \\frac{19}{81} \\cdot \\frac{t}{S}\\right)^{-0.5}',
    solution: 'A power-law decay curve where memory stability S represents the elapsed days until retrievability drops to 90%.',
    solutionAr: 'منحنى اضمحلال وفق قانون القوة حيث يمثل ثبات الذاكرة S عدد الأيام اللازمة لانخفاض احتمالية التذكر إلى 90%.',
  },
  {
    id: 'drill-curse-dimensionality',
    concept: 'Curse of Dimensionality in KNN',
    conceptAr: 'معضلة الأبعاد في أقرب الجيران (KNN)',
    prompt: 'Why does Euclidean distance degrade rapidly as the feature dimension D increases in KNN?',
    promptAr: 'لماذا تتدهور كفاءة المسافة الإقليدية سريعاً عند زيادة عدد أبعاد الخصائص D في خوارزمية KNN؟',
    solutionFormula: '\\lim_{D \\to \\infty} \\frac{\\text{dist}_{\\max} - \\text{dist}_{\\min}}{\\text{dist}_{\\min}} = 0',
    solution: 'High-dimensional space becomes exponentially sparse; the distance between the nearest neighbor and the furthest neighbor approaches zero ratio, making all points equidistant.',
    solutionAr: 'الفضاء متعدد الأبعاد يصبح فارغاً أسياً؛ وتتقارب المسافة بين أقرب جار وأبعد جار لتصبح متساوية تقريباً، مما يفقد المسافة الإقليدية قدرتها التمييزية.',
  },
  {
    id: 'drill-learning-rate-divergence',
    concept: 'Gradient Descent Stability Bound',
    conceptAr: 'حد الاستقرار للانحدار التدرجي',
    prompt: 'For quadratic loss with maximum Hessian eigenvalue L, what is the maximum learning rate η before divergence?',
    promptAr: 'لدالة خسارة تربيعية ذات قيمة ذاتية قصوى لمصفوفة هيسيان L، ما هو الحد الأقصى لمعدل التعلم η قبل التباعد؟',
    solutionFormula: '\\eta < \\frac{2}{L}',
    solution: 'When learning rate exceeds 2/L, gradient steps overshoot the paraboloid valley and oscillate with exponentially exploding divergence.',
    solutionAr: 'عندما يتجاوز معدل التعلم 2/L، تتجاوز خطوات التدرج قاع السطح المنحني وتتذبذب بتباعد متفجر أسياً.',
  },
];

export const DailyCalibration: React.FC = () => {
  const { language, addXp } = useOkvirStore();
  const [cards, setCards] = useState<Record<string, FSRSState>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [sessionStats, setSessionStats] = useState({ reviewed: 0, correct: 0 });

  const drillItems: CalibrationFlashcard[] = useMemo(() => {
    return FOUNDATIONAL_DRILL_CARDS.map((item) => {
      const card = cards[item.id] || createNewCard(item.id);
      return {
        ...item,
        card,
      };
    });
  }, [cards]);

  const handleRate = (rating: Rating) => {
    if (!drillItems[currentIndex]) return;
    const item = drillItems[currentIndex];
    const updated = updateCard(item.card, rating);
    setCards((prev) => ({ ...prev, [item.id]: updated }));
    setSessionStats((s) => ({
      reviewed: s.reviewed + 1,
      correct: s.correct + (rating >= 3 ? 1 : 0),
    }));
    addXp(rating >= 3 ? 15 : 5);
    setIsFlipped(false);
    setCurrentIndex((i) => i + 1);
  };

  const current = drillItems[currentIndex];
  const isComplete = currentIndex >= drillItems.length;

  return (
    <div className="flex-1 overflow-y-auto p-6 lg:p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-1 border-b border-[var(--border-subtle)] pb-4">
          <div className="flex items-center gap-2">
            <Brain size={20} className="text-[var(--math-prediction)]" />
            <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">
              {tr('review', language)}
            </h1>
          </div>
          <p className="text-xs text-[var(--text-secondary)] font-mono">
            {language === 'ar'
              ? 'معايرة الذاكرة المتباعدة المعتمدة على خوارزمية FSRS v5 لترسيخ المفاهيم الرياضية'
              : 'Spaced Repetition Daily Calibration powered by Anki FSRS v5 for long-term mathematical retention'}
          </p>
        </div>

        {/* Complete State */}
        {isComplete ? (
          <div className="flex flex-col items-center justify-center py-16 text-center space-y-4 fade-in rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-8">
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
              <Sparkles size={24} className="text-emerald-400" />
            </div>
            <h2 className="text-lg font-bold text-[var(--text-primary)]">
              {language === 'ar' ? 'اكتملت جلسة المعايرة اليومية!' : 'Daily Calibration Completed!'}
            </h2>
            <p className="text-xs text-[var(--text-secondary)] max-w-sm leading-relaxed">
              {language === 'ar'
                ? `راجعت ${sessionStats.reviewed} مفاهيم بدقة ${Math.round((sessionStats.correct / (sessionStats.reviewed || 1)) * 100)}%. تم تحديث فترات الاستقرار في قاعدة البيانات المحلية.`
                : `Successfully calibrated ${sessionStats.reviewed} cards with ${Math.round((sessionStats.correct / (sessionStats.reviewed || 1)) * 100)}% accuracy. FSRS stabilities updated.`}
            </p>
            <button
              onClick={() => { setCurrentIndex(0); setSessionStats({ reviewed: 0, correct: 0 }); setIsFlipped(false); }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[var(--border-subtle)] text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-hover)] transition-colors"
            >
              <RotateCcw size={13} />
              <span>{language === 'ar' ? 'بدء جولة جديدة' : 'Restart Session'}</span>
            </button>
          </div>
        ) : current ? (
          <div className="space-y-4 fade-in">
            {/* Progress Header */}
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--math-prediction)]">
                {language === 'ar' ? current.conceptAr : current.concept}
              </span>

              <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-tertiary)] tabular-nums">
                <span>Card {currentIndex + 1} of {drillItems.length}</span>
                <span className="w-16 h-1.5 rounded-full bg-[var(--border-subtle)] overflow-hidden">
                  <span
                    className="block h-full bg-[var(--math-vector)] transition-all duration-300"
                    style={{ width: `${((currentIndex + 1) / drillItems.length) * 100}%` }}
                  />
                </span>
              </div>
            </div>

            {/* Tactile Flashcard */}
            <div
              onClick={() => !isFlipped && setIsFlipped(true)}
              className={`min-h-[260px] rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-surface)] specular p-7 flex flex-col justify-between transition-all select-none ${
                isFlipped
                  ? 'cursor-default'
                  : 'cursor-pointer hover:border-[var(--text-secondary)] hover:shadow-xl'
              }`}
            >
              {/* Question Face */}
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-tertiary)] block mb-2">
                  {language === 'ar' ? 'السؤال المفاهيمي:' : 'Conceptual Prompt:'}
                </span>
                <p className="text-base font-medium text-[var(--text-primary)] leading-relaxed">
                  {language === 'ar' ? current.promptAr : current.prompt}
                </p>
              </div>

              {/* Flipped Answer Face */}
              {isFlipped ? (
                <div className="pt-4 mt-4 border-t border-[var(--border-subtle)] space-y-3 slide-up">
                  {current.solutionFormula && (
                    <div dir="ltr" className="p-3 rounded-lg bg-[var(--bg-app)] border border-[var(--border-subtle)] text-center">
                      <KaTeXMath math={current.solutionFormula} block />
                    </div>
                  )}

                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    {language === 'ar' ? current.solutionAr : current.solution}
                  </p>

                  <div className="flex items-center gap-3 pt-1 text-[10px] font-mono text-[var(--text-tertiary)]">
                    <span className="flex items-center gap-1">
                      <Clock size={11} />
                      Stability: <span className="tabular-nums text-[var(--math-vector)]">{current.card.stability.toFixed(1)}d</span>
                    </span>
                    <span>
                      Retention: <span className="tabular-nums text-[var(--math-data)]">{(retrievability(0, current.card.stability) * 100).toFixed(0)}%</span>
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center pt-8 text-xs text-[var(--text-tertiary)] gap-1">
                  <span>{tr('flipCard', language)}</span>
                  <ChevronRight size={13} />
                </div>
              )}
            </div>

            {/* FSRS Rating Buttons with Exact Intervals */}
            {isFlipped && (
              <div className="grid grid-cols-4 gap-2 pt-1 slide-up">
                {([1, 2, 3, 4] as Rating[]).map((rating) => {
                  const label = getRatingLabel(rating, current.card.stability);
                  const isAgain = rating === 1;
                  const isHard = rating === 2;
                  const isGood = rating === 3;
                  const isEasy = rating === 4;

                  return (
                    <button
                      key={rating}
                      onClick={() => handleRate(rating)}
                      className={`p-3 rounded-xl border text-center font-mono transition-transform active:scale-95 hover:brightness-110 ${
                        isAgain
                          ? 'border-[var(--math-loss)]/50 bg-[var(--math-loss)]/10 text-[var(--math-loss)]'
                          : isHard
                          ? 'border-[var(--math-gradient)]/50 bg-[var(--math-gradient)]/10 text-[var(--math-gradient)]'
                          : isGood
                          ? 'border-[var(--math-data)]/50 bg-[var(--math-data)]/10 text-[var(--math-data)]'
                          : 'border-[var(--math-vector)]/50 bg-[var(--math-vector)]/10 text-[var(--math-vector)]'
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
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};

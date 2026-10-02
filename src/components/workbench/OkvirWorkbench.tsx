import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
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
  Volume2,
  VolumeX,
  Sigma,
  TrendingUp,
  Brain,
  Lightbulb,
  CheckCircle2,
  AlertTriangle,
  Lock,
  ChevronDown,
  RotateCcw,
  BookOpen,
  Award,
  Play,
  Compass,
} from 'lucide-react';
import { useOkvirStore } from '@/lib/store';
import { curriculum, tracks } from '@/lib/curriculum';
import { SimulationView } from '@/components/simulation/SimulationView';
import { CodeChallengeEditor } from '@/components/editor/CodeChallengeEditor';
import { FadedScaffoldCodeEditor } from '@/components/pedagogy/FadedScaffoldCodeEditor';
import { VariableInspector } from '@/components/editor/VariableInspector';
import { useCodeCanvasBridge } from '@/lib/pyodide/useCodeCanvasBridge';
import { useFormulaAnchorStore } from '@/lib/formulaAnchorStore';
import { KaTeXMath } from '@/components/common/KaTeXMath';
import { MathText } from '@/components/common/MathText';
import { TactileSlider } from '@/components/common/TactileSlider';
import { MisconceptionDiagnosticCard } from '@/components/pedagogy/MisconceptionDiagnosticCard';
import { QuizBatteryComponent } from '@/components/quiz/QuizBatteryComponent';
import { getQuizBatteryForModule, CURRICULUM_QUIZ_BATTERIES } from '@/lib/curriculum-quizzes';
import { audio } from '@/lib/audio';
import type { BeatNumber, SimulationType, DiagnosticQuestion } from '@/lib/types';

/**
 * Progressive Socratic Hint Ladder with tiered disclosure
 */
interface SocraticHintLadderProps {
  hints: {
    tier1: { en: string; ar: string };
    tier2: { en: string; ar: string };
    tier3: { en: string; ar: string };
  };
  isAr: boolean;
  soundEnabled: boolean;
}

const SocraticHintLadder: React.FC<SocraticHintLadderProps> = ({ hints, isAr, soundEnabled }) => {
  const [unlockedTier, setUnlockedTier] = useState<1 | 2 | 3>(1);

  return (
    <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] overflow-hidden shadow-sm">
      <div className="px-5 py-3.5 bg-[var(--bg-app)] border-b border-[var(--border-subtle)] flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-bold text-[var(--math-gradient)]">
          <HelpCircle className="w-4 h-4" />
          <span>{isAr ? 'سلم التلميحات السقراطي التدريجي' : 'Progressive Socratic Hint Ladder'}</span>
        </div>
        <span className="text-[10px] text-[var(--text-tertiary)] flex items-center gap-1">
          <span className="font-medium">{isAr ? 'المستوى المفتوح:' : 'Tier'}</span>
          <span className="font-mono tabular-nums">{unlockedTier}/3</span>
        </span>
      </div>

      <div className="p-5 space-y-4">
        {/* Tier 1 */}
        <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 space-y-1.5">
          <div className="flex items-center justify-between text-xs font-bold text-[var(--math-gradient)]">
            <span>{isAr ? 'المستوى ١: تنبيه مفاهيمي' : 'Tier 1: Conceptual Nudge'}</span>
            <span className="text-[10px] text-[var(--math-vector)] font-semibold">✓ {isAr ? 'مفتوح' : 'Unlocked'}</span>
          </div>
          <p className="text-sm text-[var(--text-primary)] leading-relaxed">
            {isAr ? hints.tier1.ar : hints.tier1.en}
          </p>
        </div>

        {/* Tier 2 */}
        {unlockedTier >= 2 ? (
          <div className="p-4 rounded-xl border border-sky-500/20 bg-sky-500/5 space-y-1.5 animate-fade-in">
            <div className="flex items-center justify-between text-xs font-bold text-[var(--math-data)]">
              <span>{isAr ? 'المستوى ٢: إشارة رياضية صارمة' : 'Tier 2: Mathematical Hint'}</span>
              <span className="text-[10px] text-[var(--math-vector)] font-semibold">✓ {isAr ? 'مفتوح' : 'Unlocked'}</span>
            </div>
            <p className="text-sm text-[var(--text-primary)] leading-relaxed">
              {isAr ? hints.tier2.ar : hints.tier2.en}
            </p>
          </div>
        ) : (
          <button
            onClick={() => {
              setUnlockedTier(2);
              if (soundEnabled) audio.playClick();
            }}
            className="w-full py-2.5 px-4 rounded-xl border border-dashed border-[var(--border-subtle)] hover:border-sky-500/50 hover:bg-sky-500/5 text-xs text-[var(--text-secondary)] hover:text-[var(--math-data)] flex items-center justify-between transition-all cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <Lock className="w-3.5 h-3.5" />
              <span>{isAr ? 'فتح التلميح الرياضي (المستوى ٢)' : 'Unlock Mathematical Hint (Tier 2)'}</span>
            </span>
            <span className="text-[10px] opacity-70 font-medium">+{isAr ? 'بدون عقوبة' : 'No penalty'}</span>
          </button>
        )}

        {/* Tier 3 */}
        {unlockedTier >= 3 ? (
          <div className="p-4 rounded-xl border border-purple-500/20 bg-purple-500/5 space-y-1.5 animate-fade-in">
            <div className="flex items-center justify-between text-xs font-bold text-[var(--math-prediction)]">
              <span>{isAr ? 'المستوى ٣: خطوات الاشتقاق والحل' : 'Tier 3: Implementation / Derivation Guide'}</span>
              <span className="text-[10px] text-[var(--math-vector)] font-semibold">✓ {isAr ? 'مفتوح' : 'Unlocked'}</span>
            </div>
            <p className="text-sm text-[var(--text-primary)] leading-relaxed">
              {isAr ? hints.tier3.ar : hints.tier3.en}
            </p>
          </div>
        ) : (
          <button
            disabled={unlockedTier < 2}
            onClick={() => {
              setUnlockedTier(3);
              if (soundEnabled) audio.playClick();
            }}
            className="w-full py-2.5 px-4 rounded-xl border border-dashed border-[var(--border-subtle)] hover:border-purple-500/50 hover:bg-purple-500/5 text-xs text-[var(--text-secondary)] hover:text-[var(--math-prediction)] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-between transition-all cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <Lock className="w-3.5 h-3.5" />
              <span>{isAr ? 'فتح دليل الحل والاشتقاق الكامل (المستوى ٣)' : 'Unlock Complete Derivation Guide (Tier 3)'}</span>
            </span>
            <span className="text-[10px] opacity-70 font-medium">
              {unlockedTier < 2 ? (isAr ? 'افتح المستوى ٢ أولاً' : 'Unlock Tier 2 first') : ''}
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

/**
 * Pre-Simulation Hypothesis Priming Card
 */
interface HypothesisPrimingCardProps {
  moduleTitle: string;
  isAr: boolean;
  soundEnabled: boolean;
  trackId: string;
}

const HypothesisPrimingCard: React.FC<HypothesisPrimingCardProps> = ({
  moduleTitle,
  isAr,
  soundEnabled,
  trackId,
}) => {
  const [committedPrediction, setCommittedPrediction] = useState<number | null>(null);

  const hypotheses = useMemo(() => {
    if (trackId === 'math') {
      return [
        {
          text: {
            en: 'Scaling one component of a vector scales its projection proportionally.',
            ar: 'تغيير مقياس إحدى مركبات المتجه يغير طول ظله المسقط بنفس النسبة بشكل متناسب.',
          },
          correct: true,
          explanation: {
            en: 'Spot on! Due to linearity, scalar multiplication distributes directly across dot products and projection operations.',
            ar: 'صحيح تماماً! بسبب خاصية الخطية، يتوزع الضرب القياسي مباشرة على الجداء السلمي والإسقاطات الهندسية.',
          },
        },
        {
          text: {
            en: 'Orthogonal vectors always have a positive dot product greater than zero.',
            ar: 'المتجهات المتعامدة دائماً ما يكون جداؤها القياسي موجباً وأكبر من الصفر.',
          },
          correct: false,
          explanation: {
            en: 'Common trap: Orthogonal vectors have a dot product of EXACTLY zero because cos(90°) = 0.',
            ar: 'فخ شائع: المتجهات المتعامدة جداؤها السلمي يساوي صفراً تماماً لأن جيب تمام الزاوية 90° يساوي 0.',
          },
        },
        {
          text: {
            en: 'Reversing vector direction leaves the length invariant and inverts the sign of projections.',
            ar: 'عكس اتجاه المتجه يحافظ على طوله ثابتاً ويعكس إشارة الإسقاطات الناتجة.',
          },
          correct: true,
          explanation: {
            en: 'Exactly right: Vector norm ||v|| is always non-negative, while the dot product with other vectors negates.',
            ar: 'دقيق تماماً: معيار المتجه موجب دائماً، في حين أن الجداء السلمي مع متجهات أخرى تنعكس إشارته.',
          },
        },
      ];
    } else if (trackId === 'econometrics') {
      return [
        {
          text: {
            en: 'Moving the regression line closer to an outlier quadratically penalizes its squared residual.',
            ar: 'تقريب خط الانحدار من نقطة شاذة يخفض مربع الباقي بشكل تربيعي متسارع.',
          },
          correct: true,
          explanation: {
            en: 'Correct! OLS minimizes the sum of SQUARED residuals, so high-leverage outliers pull the line aggressively.',
            ar: 'صحيح! طريقة المربعات الصغرى تقلل مجموع مربعات البواقي، لذا تسحب النقاط الشاذة الخط بقوة.',
          },
        },
        {
          text: {
            en: 'The sum of raw (non-squared) residuals in OLS is always positive.',
            ar: 'مجموع البواقي الخام (غير المربعة) في الانحدار الخطي يكون موجباً دائماً.',
          },
          correct: false,
          explanation: {
            en: 'Trap! The sum of residuals with an intercept is ALWAYS exactly zero: Σ(y - ŷ) = 0.',
            ar: 'فخ كلاسيكي! مجموع البواقي الخام في وجود حد ثابت يساوي صفراً تماماً: Σ(y - ŷ) = 0.',
          },
        },
        {
          text: {
            en: 'Rotating the slope line changes the angle between predicted values ŷ and the residual vector e.',
            ar: 'تدوير ميل الخط يغير الزاوية بين القيم المتوقعة ŷ ومتجه البواقي e حتى تتعامد عند الحل الأمثل.',
          },
          correct: true,
          explanation: {
            en: 'Brilliant geometric deduction! At the OLS optimum, residuals e are strictly orthogonal to predictions ŷ.',
            ar: 'استنتاج هندسي باهر! عند حل المربعات الصغرى الأمثل، تكون البواقي متعامدة تماماً مع التوقعات.',
          },
        },
      ];
    } else if (trackId === 'deeplearning') {
      return [
        {
          text: {
            en: 'A learning rate set too high will cause parameters to oscillate or diverge past the loss minimum.',
            ar: 'معدل تعلم مرتفع جداً سيؤدي إلى تذبذب المعلمات أو تباعدها متجاوزة نقطة النهاية الصغرى لدالة الخسارة.',
          },
          correct: true,
          explanation: {
            en: 'Exact! Overshooting occurs when the step α·∇L exceeds the local curvature radius of the manifold.',
            ar: 'دقيق! يحدث التجاوز عندما تتعدى خطوة التحديث α·∇L نصف قطر الانحناء المحلي للمنحنى.',
          },
        },
        {
          text: {
            en: 'Gradient descent always finds the global minimum regardless of loss landscape curvature.',
            ar: 'خوارزمية الانحدار المتدرج تجد دائماً الحل الأصغري العام بغض النظر عن تقعر أو تحدب الدالة.',
          },
          correct: false,
          explanation: {
            en: 'Misconception! In non-convex deep networks, gradient descent can be trapped in saddle points or local minima.',
            ar: 'مفهوم خاطئ! في الشبكات غير المحدبة، قد يعلق الانحدار المتدرج في نقاط سرجية أو نهايات صغرى محلية.',
          },
        },
        {
          text: {
            en: 'Adding momentum acts as a physical heavy ball that dampens oscillations across steep ravines.',
            ar: 'إضافة قوة الاندفاع (Momentum) تعمل مثل كرة ثقيلة فيزيائية تخمد التذبذبات عبر المنحدرات الحادة.',
          },
          correct: true,
          explanation: {
            en: 'Spot on! Polyak momentum accumulates velocity in consistent gradient directions while canceling high-frequency noise.',
            ar: 'صحيح جداً! يقوم الزخم بتجميع السرعة في الاتجاهات المتسقة بينما يلغي الضوضاء عالية التردد.',
          },
        },
      ];
    } else {
      return [
        {
          text: {
            en: 'Vectorized SIMD operations execute contiguous array chunks simultaneously across CPU registers.',
            ar: 'العمليات المتجهة (SIMD) تنفذ كتل المصفوفات المتجاورة في الذاكرة في وقت واحد عبر سجلات المعالج.',
          },
          correct: true,
          explanation: {
            en: 'Correct! By leveraging 128/256-bit registers (AVX/NEON), vectorized code outperforms Python loops by 50x-200x.',
            ar: 'صحيح! بالاستفادة من سجلات 128/256 بت، تتفوق العمليات المصفوفية على حلقات بايثون بما بين 50x و200x.',
          },
        },
        {
          text: {
            en: 'Python native for-loops have the same memory cache locality as contiguous C arrays.',
            ar: 'حلقات for في بايثون تمتلك نفس كفاءة الذاكرة المخبأة التي تمتلكها مصفوفات C المتجاورة.',
          },
          correct: false,
          explanation: {
            en: 'Misconception! Python lists store pointers to heap PyObjects, causing pointer chasing and cache misses.',
            ar: 'فهم خاطئ! قوائم بايثون تخزن مؤشرات لكائنات متناثرة في الذاكرة، مما يسبب إخفاقات متكررة في الذاكرة المخبأة.',
          },
        },
        {
          text: {
            en: 'Broadcasting avoids allocating intermediate full-sized matrices by computing strides on the fly.',
            ar: 'البث (Broadcasting) يتجنب حجز مصفوفات وسيطة كاملة في الذاكرة عبر حساب الخطوات (Strides) آنياً.',
          },
          correct: true,
          explanation: {
            en: 'Exact! By setting a stride of 0 along a broadcast dimension, NumPy reads the same memory without replication.',
            ar: 'دقيق تماماً! عبر تعيين خطوة مساوية لصفر، يقرأ NumPy نفس موضع الذاكرة دون أي نسخ مكرر.',
          },
        },
      ];
    }
  }, [trackId]);

  return (
    <div className="p-6 rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-surface)] space-y-4 shadow-sm">
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 text-[var(--math-gradient)] font-bold">
          <Lightbulb className="w-4 h-4 animate-pulse" />
          <span>{isAr ? 'صياغة الفرضية والحدس الأولي' : 'Pre-Simulation Hypothesis Challenge'}</span>
        </div>
        <span className="text-[11px] font-semibold text-[var(--text-tertiary)]">
          {isAr ? 'توقع قبل التجربة' : 'Predict Before Interacting'}
        </span>
      </div>

      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
        {isAr
          ? `قبل التفاعل مع المختبر الفضائي أدناه، ما هو توقعك العلمي بخصوص هذا المفهوم في ${moduleTitle}؟`
          : `Before manipulating the visual laboratory below, which statement accurately captures the physical behavior of ${moduleTitle}?`}
      </p>

      <div className="space-y-2.5">
        {hypotheses.map((h, idx) => {
          const isSelected = committedPrediction === idx;
          let style =
            'border-[var(--border-subtle)] bg-[var(--bg-app)] hover:border-[var(--border-strong)] text-[var(--text-secondary)]';
          if (committedPrediction !== null) {
            if (h.correct && isSelected) {
              style = 'border-[var(--math-vector)] bg-[var(--math-vector)]/15 text-[var(--math-vector)] font-semibold';
            } else if (!h.correct && isSelected) {
              style = 'border-[var(--math-loss)] bg-[var(--math-loss)]/15 text-[var(--math-loss)] font-semibold';
            } else if (h.correct) {
              style = 'border-[var(--math-vector)]/50 bg-[var(--math-vector)]/10 text-[var(--math-vector)] font-medium';
            }
          }

          return (
            <button
              key={idx}
              disabled={committedPrediction !== null}
              onClick={() => {
                setCommittedPrediction(idx);
                if (soundEnabled) {
                  if (h.correct) audio.playSuccessChime();
                  else audio.playErrorDissonance();
                }
              }}
              className={`w-full text-start p-3.5 rounded-xl border text-sm transition-all flex items-start gap-3 cursor-pointer ${style}`}
            >
              <span className="font-mono font-bold text-[var(--text-tertiary)] shrink-0 mt-0.5">
                {String.fromCharCode(65 + idx)}.
              </span>
              <span className="leading-relaxed">{isAr ? h.text.ar : h.text.en}</span>
            </button>
          );
        })}
      </div>

      {committedPrediction !== null && (
        <div className="p-4 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-app)] text-sm space-y-1.5 animate-fade-in">
          <div className="flex items-center gap-2 font-bold">
            {hypotheses[committedPrediction].correct ? (
              <span className="text-[var(--math-vector)] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{isAr ? 'فرضية علمية دقيقة ومثبتة!' : 'Hypothesis Confirmed!'}</span>
              </span>
            ) : (
              <span className="text-[var(--math-gradient)] flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" />
                {isAr ? 'فخ مفاهيمي شائع — انتبه للفرق!' : 'Classic Misconception Trap!'}
              </span>
            )}
          </div>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            {isAr
              ? hypotheses[committedPrediction].explanation.ar
              : hypotheses[committedPrediction].explanation.en}
          </p>
        </div>
      )}
    </div>
  );
};

export const OkvirWorkbench: React.FC = () => {
  const {
    activeLessonId,
    language,
    lessons,
    config,
    completeLesson,
    certifyLessonMastery,
    setCurrentView,
    startLesson,
    addXp,
    slope,
    intercept,
    knnK,
    learningRate,
    momentum,
    setSlope,
    setIntercept,
    setKnnK,
    setLearningRate,
    setMomentum,
  } = useOkvirStore();

  const isAr = language === 'ar';
  const mod = curriculum.find((m) => m.id === activeLessonId) || curriculum[0];
  const track = tracks.find((t) => t.id === mod.trackId) || tracks[0];
  const trackColor = track.color;

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

  // Beats extraction for long-form layout
  const beat1 = mod.beats.find((b) => b.number === 1) || mod.beats[0];
  const beat2 = mod.beats.find((b) => b.number === 2) || mod.beats[1] || beat1;
  const beat3 = mod.beats.find((b) => b.number === 3) || mod.beats[2] || beat1;
  const beat4 = mod.beats.find((b) => b.number === 4) || mod.beats[3] || beat1;

  // Diagnostic question mapping
  const quizQuestions = useMemo(() => {
    if (CURRICULUM_QUIZ_BATTERIES[mod.id]) {
      return CURRICULUM_QUIZ_BATTERIES[mod.id];
    }
    if (beat4.question) {
      return [{
        id: `${mod.id}-beat4-diagnostic`,
        depthTier: 2 as const,
        prompt: beat4.question.prompt,
        latexAnchor: beat2.formula || '',
        options: beat4.question.options.map((opt) => ({
          text: opt.text,
          correct: opt.correct,
          diagnosticFeedback: opt.explanation,
        })),
      }];
    }
    return getQuizBatteryForModule(mod.id, mod.title, mod.titleAr);
  }, [mod.id, mod.title, mod.titleAr, beat4.question, beat2.formula]);

  const [masteryCertified, setMasteryCertified] = useState(() => {
    return lessons[activeLessonId]?.status === 'mastered';
  });
  const [certifiedScore, setCertifiedScore] = useState<number>(() => {
    return lessons[activeLessonId]?.masteryScore || 0;
  });

  useEffect(() => {
    setMasteryCertified(lessons[activeLessonId]?.status === 'mastered');
    setCertifiedScore(lessons[activeLessonId]?.masteryScore || 0);
  }, [activeLessonId, lessons]);

  const handleMasteryCertified = (scorePct: number, passed: boolean) => {
    setCertifiedScore(scorePct);
    setMasteryCertified(passed);
    if (passed) {
      certifyLessonMastery(mod.id, scorePct);
      setIsDiagnosticSolved(true);
    }
  };

  const [isDiagnosticSolved, setIsDiagnosticSolved] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<'intro' | 'intuition' | 'lab' | 'math' | 'code' | 'quiz'>('intro');

  const containerRef = useRef<HTMLDivElement>(null);

  // Formula anchor store
  const { activeToken, setActiveToken } = useFormulaAnchorStore();

  // Scroll listener to update reading progress & active milestone
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    const total = scrollHeight - clientHeight;
    if (total > 0) {
      const pct = Math.min(100, Math.max(0, Math.round((scrollTop / total) * 100)));
      setScrollProgress(pct);
    }

    // Determine current active section based on scroll offset
    const sections: { id: 'intro' | 'intuition' | 'lab' | 'math' | 'code' | 'quiz'; el: HTMLElement | null }[] = [
      { id: 'intro', el: document.getElementById('section-intro') },
      { id: 'intuition', el: document.getElementById('section-intuition') },
      { id: 'lab', el: document.getElementById('section-lab') },
      { id: 'math', el: document.getElementById('section-math') },
      { id: 'code', el: document.getElementById('section-code') },
      { id: 'quiz', el: document.getElementById('section-quiz') },
    ];

    const currentScrollPos = scrollTop + 200;
    for (let i = sections.length - 1; i >= 0; i--) {
      const s = sections[i];
      if (s.el && s.el.offsetTop <= currentScrollPos) {
        setActiveSection(s.id);
        break;
      }
    }
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (config.soundEnabled) audio.playClick();
    }
  };

  // Keyboard navigation & Vim controls (j/k to switch lesson, H for hint, Ctrl+Enter to run code, ESC to Constellation, M to toggle mute)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target && target.matches('input, textarea, select')) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        setCurrentView('constellation');
      } else if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        const nextSound = !config.soundEnabled;
        useOkvirStore.setState({ config: { ...config, soundEnabled: nextSound } });
        if (nextSound) audio.playClick();
      } else if ((e.key === 'j' || e.key === 'J') && !e.ctrlKey && !e.metaKey) {
        // Vim 'j': navigate to next lesson in curriculum
        e.preventDefault();
        const curIdx = curriculum.findIndex((m) => m.id === mod.id);
        if (curIdx < curriculum.length - 1) {
          const nextMod = curriculum[curIdx + 1];
          startLesson(nextMod.id);
          if (config.soundEnabled) audio.playClick();
        }
      } else if ((e.key === 'k' || e.key === 'K') && !e.ctrlKey && !e.metaKey) {
        // Vim 'k': navigate to previous lesson in curriculum
        e.preventDefault();
        const curIdx = curriculum.findIndex((m) => m.id === mod.id);
        if (curIdx > 0) {
          const prevMod = curriculum[curIdx - 1];
          startLesson(prevMod.id);
          if (config.soundEnabled) audio.playClick();
        }
      } else if ((e.key === 'h' || e.key === 'H') && !e.ctrlKey && !e.metaKey) {
        // 'h': scroll to Socratic hint ladder
        e.preventDefault();
        scrollToSection('section-hints');
        if (config.soundEnabled) audio.playClick();
      } else if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        // Ctrl+Enter / Cmd+Enter: run code challenge
        e.preventDefault();
        const runBtn = document.querySelector('button[title*="Run"], button:has(kbd)') as HTMLButtonElement;
        if (runBtn) runBtn.click();
      }
    };

    const handleCustomToggleHint = () => {
      scrollToSection('section-hints');
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('okvir:toggle-hint', handleCustomToggleHint);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('okvir:toggle-hint', handleCustomToggleHint);
    };
  }, [config.soundEnabled, setCurrentView, mod.id, startLesson]);

  // Determine active simulation type
  const simType: SimulationType = useMemo(() => {
    if (beat1.simulation) return beat1.simulation;
    if (mod.id.includes('ols')) return 'ols';
    if (mod.id.includes('knn')) return 'knn';
    if (mod.id.includes('kmeans')) return 'kmeans';
    if (mod.id.includes('gradient')) return 'gradient';
    if (mod.id.includes('vector') || mod.id.includes('dot')) return 'vectors';
    if (mod.id.includes('attention')) return 'attention';
    if (mod.id.includes('conv')) return 'conv';
    if (mod.id.includes('tree')) return 'tree';
    if (mod.id.includes('regularization') || mod.id.includes('ridge')) return 'regularization';
    if (mod.id.includes('bayes')) return 'bayes';
    if (mod.id.includes('eigen')) return 'eigen';
    if (mod.id.includes('clt') || mod.id.includes('central')) return 'clt';
    if (mod.id.includes('iv') || mod.id.includes('instrumental')) return 'iv';
    if (mod.id.includes('autograd')) return 'autograd';
    if (mod.id.includes('bpe') || mod.id.includes('token')) return 'bpe';
    if (mod.id.includes('anscombe') || mod.id.includes('eda')) return 'anscombe';
    if (mod.id.includes('simpson') || mod.id.includes('causal')) return 'simpson';
    if (mod.id.includes('perceptron') || mod.id.includes('neural')) return 'neural';
    return 'ols';
  }, [beat1.simulation, mod.id]);

  // Formula tokens for interactive hovering
  const formulaTokens = useMemo(() => {
    if (mod.id.includes('ols')) {
      return [
        { symbol: 'y', label: 'True Targets' },
        { symbol: '\\hat{y}', label: 'Predicted Values' },
        { symbol: 'e_i', label: 'Residual Vector' },
        { symbol: '\\beta_1', label: 'Optimal Slope' },
        { symbol: '\\beta_0', label: 'Intercept' },
      ];
    }
    if (mod.id.includes('gradient')) {
      return [
        { symbol: '\\alpha', label: 'Learning Rate' },
        { symbol: '\\nabla L', label: 'Gradient Vector' },
        { symbol: 'w_t', label: 'Current Weights' },
        { symbol: 'w_{t+1}', label: 'Updated Weights' },
      ];
    }
    if (mod.id.includes('vector') || mod.id.includes('dot')) {
      return [
        { symbol: '\\vec{u}', label: 'Vector U' },
        { symbol: '\\vec{v}', label: 'Vector V' },
        { symbol: '\\theta', label: 'Enclosed Angle' },
        { symbol: '\\|\\vec{u}\\|', label: 'Euclidean Norm' },
      ];
    }
    if (mod.id.includes('attention')) {
      return [
        { symbol: 'Q', label: 'Query Matrix' },
        { symbol: 'K^T', label: 'Key Transpose' },
        { symbol: '\\sqrt{d_k}', label: 'Scaling Factor' },
        { symbol: 'V', label: 'Value Matrix' },
      ];
    }
    return [
      { symbol: 'x', label: 'Feature Input' },
      { symbol: 'w', label: 'Weight Parameter' },
      { symbol: 'b', label: 'Bias' },
    ];
  }, [mod.id]);

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className="h-screen w-full bg-[var(--bg-app)] text-[var(--text-primary)] overflow-y-auto overflow-x-hidden font-sans select-none scroll-smooth"
    >
      {/* ========================================================================= */}
      {/* 1. STICKY CALM NAVIGATION HUD (Top Bar)                                   */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-40 h-14 border-b border-[var(--border-subtle)] bg-[var(--bg-app)]/90 backdrop-blur-md px-4 md:px-8 flex items-center justify-between shadow-xs">
        {/* Left: Back & Breadcrumb */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (config.soundEnabled) audio.playClick();
              setCurrentView('constellation');
            }}
            className="p-2 rounded-xl border border-[var(--border-subtle)] hover:border-[var(--border-strong)] hover:bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all flex items-center gap-1.5 text-xs font-mono group cursor-pointer"
            title="Return to Roadmap (ESC)"
          >
            <ArrowLeft className="w-3.5 h-3.5 rtl-flip group-hover:-translate-x-0.5 transition-transform" />
            <span className="font-semibold hidden sm:inline">ESC</span>
          </button>

          <div className="h-4 w-[1px] bg-[var(--border-subtle)]" />

          {/* Track badge */}
          <div
            className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-xs font-semibold"
            style={{
              borderColor: `${trackColor}40`,
              backgroundColor: `${trackColor}12`,
              color: trackColor,
            }}
          >
            {track.id === 'math' && <Sigma className="w-3 h-3" />}
            {track.id === 'programming' && <Code2 className="w-3 h-3" />}
            {track.id === 'econometrics' && <TrendingUp className="w-3 h-3" />}
            {track.id === 'deeplearning' && <Brain className="w-3 h-3" />}
            <span className="hidden md:inline">
              {isAr ? track.titleAr : track.title}
            </span>
          </div>

          <span className="text-xs font-bold text-[var(--text-primary)] truncate max-w-[200px] md:max-w-xs">
            {isAr ? mod.titleAr : mod.title}
          </span>
        </div>

        {/* Center: Table of Contents Section Stepper */}
        <div className="hidden lg:flex items-center gap-1 p-1 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
          {[
            { id: 'section-intuition', label: isAr ? 'الحدس' : 'Intuition', key: 'intuition' },
            { id: 'section-lab', label: isAr ? 'المختبر' : 'Playground', key: 'lab' },
            { id: 'section-math', label: isAr ? 'الرياضيات' : 'Formula', key: 'math' },
            { id: 'section-code', label: isAr ? 'البرمجة' : 'Python Lab', key: 'code' },
            { id: 'section-quiz', label: isAr ? 'التشخيص' : 'Quiz', key: 'quiz' },
          ].map((sec, idx) => {
            const isActive = activeSection === sec.key;
            return (
              <button
                key={sec.id}
                onClick={() => scrollToSection(sec.id)}
                className={`px-3 py-1 rounded-lg text-xs transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-[var(--text-primary)] text-[var(--bg-app)] font-bold shadow-xs'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-hover)]'
                }`}
              >
                <span className="font-mono text-[11px] opacity-75">0{idx + 1}.</span>
                <span className="font-semibold whitespace-nowrap">{sec.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right: Sound toggle & Reading progress */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-[var(--text-tertiary)] hidden sm:inline">
            <span className="font-mono tabular-nums">{scrollProgress}%</span> {isAr ? 'مكتمل' : 'read'}
          </span>

          <button
            onClick={() => {
              const nextSound = !config.soundEnabled;
              useOkvirStore.setState({ config: { ...config, soundEnabled: nextSound } });
              if (nextSound) audio.playClick();
            }}
            className="p-2 rounded-xl border border-[var(--border-subtle)] hover:border-[var(--border-strong)] hover:bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all cursor-pointer"
            title={config.soundEnabled ? 'Mute Audio (M)' : 'Enable Audio (M)'}
          >
            {config.soundEnabled ? (
              <Volume2 className="w-3.5 h-3.5 text-[var(--math-vector)]" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-[var(--text-disabled)]" />
            )}
          </button>
        </div>

        {/* Reading Progress Line Tracker */}
        <div
          className="absolute bottom-0 start-0 h-[2px] transition-all duration-150"
          style={{
            width: `${scrollProgress}%`,
            backgroundColor: trackColor,
          }}
        />
      </header>

      {/* ========================================================================= */}
      {/* 2. MAIN LONG-FORM SCROLLABLE CONTAINER                                    */}
      {/* ========================================================================= */}
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-16 space-y-20">

        {/* ======================================================================= */}
        {/* SECTION 1: MASTERCLASS HERO INTRO                                       */}
        {/* ======================================================================= */}
        <section id="section-intro" className="space-y-6 pt-4">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className="px-3 py-1 rounded-full text-xs font-semibold border"
              style={{
                borderColor: `${trackColor}40`,
                backgroundColor: `${trackColor}15`,
                color: trackColor,
              }}
            >
              {isAr ? track.titleAr : track.title}
            </span>

            <span className="text-xs text-[var(--text-tertiary)] flex items-center gap-1.5 font-medium">
              <span>•</span>
              <span className="font-mono font-bold tabular-nums text-[var(--text-secondary)]">{mod.estimatedMinutes}</span>
              <span>{isAr ? 'دقيقة إتقان شامل' : 'MIN MASTERCLASS'}</span>
            </span>

            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[var(--math-vector)]/10 text-[var(--math-vector)] border border-[var(--math-vector)]/30">
              +100 XP
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-[var(--text-primary)] leading-tight">
            {isAr ? mod.titleAr : mod.title}
          </h1>

          <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed font-normal">
            {isAr ? mod.description.ar : mod.description.en}
          </p>

          {/* Learning Objectives Checklist */}
          <div className="p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-3">
            <span className="text-xs text-[var(--text-tertiary)] font-bold block">
              {isAr ? 'الأهداف التعليمية لهذا الدرس:' : 'Masterclass Learning Objectives:'}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-[var(--text-secondary)]">
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[var(--bg-app)] border border-[var(--border-subtle)]">
                <Check className="w-3.5 h-3.5 text-[var(--math-vector)] shrink-0" />
                <span className="font-medium">{isAr ? '١. الحدس الفطري الحركي' : '1. Tactile Intuition'}</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[var(--bg-app)] border border-[var(--border-subtle)]">
                <Check className="w-3.5 h-3.5 text-[var(--math-data)] shrink-0" />
                <span className="font-medium">{isAr ? '٢. الصياغة الرياضية الصارمة' : '2. Exact Mathematical Invariant'}</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[var(--bg-app)] border border-[var(--border-subtle)]">
                <Check className="w-3.5 h-3.5 text-[var(--math-prediction)] shrink-0" />
                <span className="font-medium">{isAr ? '٣. النواة البرمجية المتجهة' : '3. Vectorized NumPy Kernel'}</span>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================================= */}
        {/* SECTION 2: INTUITION & MENTAL MODEL                                     */}
        {/* ======================================================================= */}
        <section id="section-intuition" className="space-y-8 pt-10 border-t border-[var(--border-subtle)]">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-[var(--math-gradient)] font-bold">
              <Compass className="w-4 h-4" />
              <span className="font-mono text-[11px]">01 //</span>
              <span className="font-bold">{isAr ? 'الحدس الفطري والنموذج الذهني' : 'SPATIAL INTUITION & MENTAL MODEL'}</span>
            </div>
            <h2 className="text-2xl font-bold text-[var(--text-primary)]">
              {isAr ? 'فهم الجوهر بدون تعقيد رياضي مبكر' : 'Grasping the Physical Core'}
            </h2>
          </div>

          {beat1?.narrative && (
            <div className="text-base md:text-lg text-[var(--text-secondary)] leading-relaxed space-y-4">
              <MathText text={isAr ? beat1.narrative.ar : beat1.narrative.en} />
            </div>
          )}

          {/* Pre-Simulation Hypothesis Priming Challenge */}
          <HypothesisPrimingCard
            moduleTitle={isAr ? mod.titleAr : mod.title}
            isAr={isAr}
            soundEnabled={config.soundEnabled}
            trackId={mod.trackId}
          />
        </section>

        {/* ======================================================================= */}
        {/* SECTION 3: INTERACTIVE LABORATORY (Simulation Playground)                */}
        {/* ======================================================================= */}
        <section id="section-lab" className="space-y-8 pt-10 border-t border-[var(--border-subtle)]">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-[var(--math-data)] font-bold">
              <Layers className="w-4 h-4" />
              <span className="font-mono text-[11px]">02 //</span>
              <span className="font-bold">{isAr ? 'المختبر الفيزيائي التفاعلي' : 'INTERACTIVE VISUAL LABORATORY'}</span>
            </div>
            <h2 className="text-2xl font-bold text-[var(--text-primary)]">
              {isAr ? 'جرّب وتفاعل مع المفاهيم مباشرة' : 'Manipulate the Geometry in Realtime'}
            </h2>
            <p className="text-sm text-[var(--text-secondary)]">
              {isAr
                ? 'حرّك العناصر في لوحة المحاكاة أدناه أو استخدم أشرطة التمرير لملاحظة كيف تستجيب المنظومة آنياً عند 60 إطار بالثانية.'
                : 'Interact directly with the simulation canvas below or scrub the tactile sliders to watch the mathematical invariant adapt live at 60 FPS.'}
            </p>
          </div>

          {/* Full-Width Interactive Canvas Container */}
          <div className="w-full rounded-3xl border border-[var(--border-strong)] bg-[var(--bg-surface)] overflow-hidden shadow-2xl relative">
            {/* Bezel Titlebar */}
            <div className="h-10 px-5 bg-[var(--bg-app)] border-b border-[var(--border-subtle)] flex items-center justify-between text-xs text-[var(--text-tertiary)]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--math-vector)] animate-pulse" />
                <span className="font-semibold text-[var(--text-secondary)]">
                  {isAr ? 'محاكاة رياضية نشطة' : '60 FPS Canvas Engine'}
                </span>
              </div>
              <span className="text-[10px] text-[var(--math-vector)] font-mono font-bold tracking-wider">
                RETINA 2X • ZERO GC
              </span>
            </div>

            {/* The Simulation Canvas View */}
            <div className="w-full relative bg-[var(--bg-surface)] p-4 md:p-6">
              <SimulationView type={simType} compact={true} />
            </div>

            {/* Tactile Sliders Directly Underneath Canvas */}
            {mod.id.includes('ols') && (
              <div className="p-6 bg-[var(--bg-app)] border-t border-[var(--border-subtle)] space-y-4">
                <span className="text-xs text-[var(--text-tertiary)] font-bold block">
                  {isAr ? 'أدوات التحكم الحركية المباشرة في الميل والتقاطع:' : 'Tactile Regression Controls:'}
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <TactileSlider
                    label={isAr ? 'الميل (m)' : 'Slope (m)'}
                    min={-3}
                    max={3}
                    step={0.05}
                    value={slope}
                    onChange={setSlope}
                    accentColor="#38bdf8"
                  />
                  <TactileSlider
                    label={isAr ? 'التقاطع (b)' : 'Intercept (b)'}
                    min={-50}
                    max={150}
                    step={1}
                    value={intercept}
                    onChange={setIntercept}
                    accentColor="#f59e0b"
                  />
                </div>
              </div>
            )}

            {mod.id.includes('knn') && (
              <div className="p-6 bg-[var(--bg-app)] border-t border-[var(--border-subtle)] space-y-3">
                <span className="text-xs text-[var(--text-tertiary)] font-bold block">
                  {isAr ? 'التحكم في نطاق الجوار (k):' : 'Neighborhood Parameter (k):'}
                </span>
                <TactileSlider
                  label={isAr ? 'عدد الجيران (k)' : 'Neighbors (k)'}
                  min={1}
                  max={15}
                  step={1}
                  decimals={0}
                  value={knnK}
                  onChange={setKnnK}
                  accentColor="#10b981"
                />
              </div>
            )}

            {mod.id.includes('gradient') && (
              <div className="p-6 bg-[var(--bg-app)] border-t border-[var(--border-subtle)] space-y-4">
                <span className="text-xs text-[var(--text-tertiary)] font-bold block">
                  {isAr ? 'معلمات التعلم والزخم:' : 'Optimization Hyperparameters:'}
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <TactileSlider
                    label={isAr ? 'معدل التعلم (α)' : 'Learning Rate (α)'}
                    min={0.001}
                    max={0.5}
                    step={0.005}
                    value={learningRate}
                    onChange={setLearningRate}
                    accentColor="#a855f7"
                  />
                  <TactileSlider
                    label={isAr ? 'الزخم (β)' : 'Momentum (β)'}
                    min={0}
                    max={0.99}
                    step={0.05}
                    value={momentum}
                    onChange={setMomentum}
                    accentColor="#f59e0b"
                  />
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ======================================================================= */}
        {/* SECTION 4: FORMAL MATHEMATICAL INVARIANT                                */}
        {/* ======================================================================= */}
        <section id="section-math" className="space-y-8 pt-10 border-t border-[var(--border-subtle)]">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-[var(--math-prediction)] font-bold">
              <Sigma className="w-4 h-4" />
              <span className="font-mono text-[11px]">03 //</span>
              <span className="font-bold">{isAr ? 'المرساة الرياضية الصارمة' : 'MATHEMATICAL INVARIANT'}</span>
            </div>
            <h2 className="text-2xl font-bold text-[var(--text-primary)]">
              {isAr ? 'من الحدس الهندسي إلى الصياغة الرياضية' : 'From Geometry to Exact Mathematics'}
            </h2>
          </div>

          {beat2?.narrative && (
            <div className="text-base md:text-lg text-[var(--text-secondary)] leading-relaxed space-y-4">
              <MathText text={isAr ? beat2.narrative.ar : beat2.narrative.en} />
            </div>
          )}

          {/* Large, Beautiful KaTeX Formula Card */}
          {beat2.formula && (
            <div className="p-8 rounded-3xl border border-[var(--border-strong)] bg-[var(--bg-surface)] space-y-6 shadow-sm">
              <div className="flex items-center justify-between text-xs text-[var(--text-tertiary)]">
                <span className="flex items-center gap-2 text-[var(--math-gradient)] font-bold">
                  <Sparkles className="w-4 h-4" />
                  <span>{isAr ? 'المعادلة الأساسية الصارمة' : 'Core Analytical Formula'}</span>
                </span>
                <span className="text-[11px] font-medium">{isAr ? 'انقر على أي رمز لتوضيحه' : 'Click symbol to inspect'}</span>
              </div>

              {/* KaTeX Block Display */}
              <div dir="ltr" className="py-6 px-4 rounded-2xl bg-[var(--bg-app)] border border-[var(--border-subtle)] text-center overflow-x-auto text-xl md:text-2xl text-[var(--text-primary)] shadow-inner">
                <KaTeXMath
                  math={beat2.formula}
                  block
                  onHoverVariable={(v) => setActiveToken(v, 'formula')}
                />
              </div>

              {/* Interactive Symbol Breakdown Pills */}
              <div className="space-y-2">
                <span className="text-xs text-[var(--text-tertiary)] font-semibold block">
                  {isAr ? 'شرح مكونات المعادلة:' : 'Variable Breakdown:'}
                </span>
                <div className="flex flex-wrap gap-2">
                  {formulaTokens.map((tok) => {
                    const isActive = activeToken === tok.symbol;
                    return (
                      <button
                        key={tok.symbol}
                        onClick={() => {
                          setActiveToken(isActive ? null : tok.symbol, 'formula');
                          if (config.soundEnabled) audio.playClick();
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs transition-all cursor-pointer ${
                          isActive
                            ? 'bg-[var(--math-prediction)] text-white shadow-md ring-2 ring-white/20 font-bold'
                            : 'bg-[var(--bg-app)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)]'
                        }`}
                      >
                        <span className="font-mono font-bold">{tok.symbol}</span>
                        <span className="opacity-75 ms-1.5 font-medium">({tok.label})</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {beat2.formulaNote && (
                <p className="text-xs text-[var(--text-secondary)] border-t border-[var(--border-subtle)] pt-4 leading-relaxed font-normal">
                  {isAr ? beat2.formulaNote.ar : beat2.formulaNote.en}
                </p>
              )}
            </div>
          )}

          {/* Progressive Socratic Hint Ladder */}
          {beat2.hints && (
            <div id="section-hints" className="scroll-mt-6">
              <SocraticHintLadder
                hints={beat2.hints}
                isAr={isAr}
                soundEnabled={config.soundEnabled}
              />
            </div>
          )}
        </section>

        {/* ======================================================================= */}
        {/* SECTION 5: COMPUTATIONAL PYTHON KERNEL                                  */}
        {/* ======================================================================= */}
        <section id="section-code" className="space-y-8 pt-10 border-t border-[var(--border-subtle)]">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-[var(--math-vector)] font-bold">
              <Code2 className="w-4 h-4" />
              <span className="font-mono text-[11px]">04 //</span>
              <span className="font-bold">{isAr ? 'النواة البرمجية والحساب المتجه' : 'VECTORIZED COMPUTATIONAL LAB (PYTHON)'}</span>
            </div>
            <h2 className="text-2xl font-bold text-[var(--text-primary)]">
              {isAr ? 'البرمجة بلغة بايثون ومكتبة NumPy' : 'Writing the Production Algorithm'}
            </h2>
            <p className="text-sm text-[var(--text-secondary)]">
              {isAr
                ? 'اكتب كود بايثون متجهاً لحساب المعادلة السابقة. ينفذ الكود مباشرة داخل المتصفح عبر CPython 3.12 المترجم إلى WebAssembly.'
                : 'Implement the vectorized logic in Python below. The kernel executes natively inside WebAssembly with SIMD acceleration.'}
            </p>
          </div>

          {beat3?.narrative && (
            <div className="text-base text-[var(--text-secondary)] leading-relaxed space-y-4">
              <MathText text={isAr ? beat3.narrative.ar : beat3.narrative.en} />
            </div>
          )}

          {/* Full-Width Code Challenge Editor */}
          <div className="w-full rounded-3xl border border-[var(--border-strong)] overflow-hidden shadow-2xl bg-[var(--bg-surface)]">
            {beat3.code ? (
              <FadedScaffoldCodeEditor
                challengeId={beat3.code.id}
                scaffold={{
                  tier: 'parsons',
                  instructions: {
                    en: 'Complete the algorithm through faded scaffolding.',
                    ar: 'أكمل الخوارزمية من خلال البناء البرمجي المتدرج.'
                  },
                  autonomousStarter: beat3.code.starterCode,
                  testCases: beat3.code.testCases
                }}
                onSuccess={() => {
                  if (config.soundEnabled) audio.playVictoryHarmonics();
                }}
              />
            ) : null}
          </div>
        </section>

        {/* ======================================================================= */}
        {/* SECTION 6: CONCEPT DIAGNOSTIC & MISCONCEPTION CHECK                     */}
        {/* ======================================================================= */}
        <section id="section-quiz" className="space-y-8 pt-10 border-t border-[var(--border-subtle)]">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-[var(--math-loss)] font-bold">
              <Award className="w-4 h-4" />
              <span className="font-mono text-[11px]">05 //</span>
              <span className="font-bold">{isAr ? 'تحدي النقل وتشخيص الفهم' : 'ACTIVE DIAGNOSTIC TRANSFER'}</span>
            </div>
            <h2 className="text-2xl font-bold text-[var(--text-primary)]">
              {isAr ? 'اختبر استيعابك للمفهوم' : 'Prove Your Conceptual Mastery'}
            </h2>
            <p className="text-sm text-[var(--text-secondary)]">
              {isAr
                ? 'أجب عن التحدي التشخيصي أدناه للتأكد من خلوك من المفاهيم الخاطئة الشائعة وتثبيت المعلومة في الذاكرة طويلة المدى.'
                : 'Answer the diagnostic dilemma below to verify your mental model and calibrate your spaced repetition schedule.'}
            </p>
          </div>

          {beat4?.narrative && (
            <div className="text-base text-[var(--text-secondary)] leading-relaxed">
              <MathText text={isAr ? beat4.narrative.ar : beat4.narrative.en} />
            </div>
          )}

          {/* Multi-Question Diagnostic Assessment Battery with Passing Score Gate */}
          <QuizBatteryComponent
            questions={quizQuestions}
            onMasteryCertified={handleMasteryCertified}
            passingScorePct={75}
            lessonId={mod.id}
            moduleTitle={mod.title}
            moduleTitleAr={mod.titleAr}
          />
        </section>

        {/* ======================================================================= */}
        {/* SECTION 7: COMPLETION CELEBRATION & XP CLAIM                            */}
        {/* ======================================================================= */}
        <section id="section-complete" className="pt-10 pb-16 border-t border-[var(--border-subtle)]">
          {masteryCertified ? (
            <div className="p-8 md:p-12 rounded-3xl border border-emerald-500/30 bg-emerald-950/20 text-center space-y-6 shadow-2xl">
              <div className="w-16 h-16 rounded-full bg-[var(--math-vector)]/20 border border-[var(--math-vector)]/40 text-[var(--math-vector)] flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <span className="text-xs text-[var(--math-vector)] font-bold block">
                  {isAr ? 'تهانينا! لقد أتقنت الدرس معتمداً' : 'MASTERY CERTIFIED & VERIFIED!'}
                </span>
                <h3 className="text-2xl md:text-3xl font-extrabold text-[var(--text-primary)]">
                  {isAr ? mod.titleAr : mod.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] max-w-lg mx-auto leading-relaxed">
                  {isAr
                    ? `حققت نسبة استيعاب ${certifiedScore}% في الاختبار التشخيصي. تم تسجيل إتقانك واعتماده في قاعدة البيانات وتفعيل أسئلة المفهوم في المعايرة اليومية!`
                    : `Achieved ${certifiedScore}% diagnostic mastery score. Your mastery is certified and persisted in the local database, unlocking concepts for Daily Calibration!`}
                </p>
              </div>

              {/* Complete Button */}
              <button
                onClick={() => {
                  completeLesson(mod.id);
                  if (config.soundEnabled) audio.playVictoryHarmonics();
                  setCurrentView('constellation');
                }}
                className="px-8 py-4 rounded-2xl text-base font-bold bg-emerald-500 hover:bg-emerald-400 text-black shadow-xl shadow-emerald-500/20 transition-all transform hover:scale-105 cursor-pointer inline-flex items-center gap-3 whitespace-nowrap shrink-0"
              >
                <span className="whitespace-nowrap">{isAr ? 'العودة إلى خريطة المعرفة' : 'Return to Knowledge Constellation'}</span>
                <ArrowRight className="w-5 h-5 rtl-flip shrink-0" />
              </button>
            </div>
          ) : (
            <div className="p-8 md:p-12 rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-center space-y-5 shadow-lg">
              <div className="w-14 h-14 rounded-full bg-[var(--math-gradient)]/10 border border-[var(--math-gradient)]/20 text-[var(--math-gradient)] flex items-center justify-center mx-auto">
                <Lock className="w-7 h-7" />
              </div>
              <div className="space-y-2 max-w-md mx-auto">
                <h3 className="text-xl font-bold text-[var(--text-primary)]">
                  {isAr ? 'بوابة الاعتماد مغلقة — اجتز الاختبار أولاً' : 'Mastery Certification Locked'}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {isAr
                    ? 'لمنع التقدم غير المستحق، تتطلب المعايير الأكاديمية الصارمة تحقيق درجة 75% أو أعلى في الاختبار التشخيصي أعلاه لفتح شهادة الإتقان وحصد +100 XP.'
                    : 'To ensure genuine learning transfer, Okvir requires a passing score of at least 75% on the diagnostic battery above to certify mastery and award +100 XP.'}
                </p>
              </div>
              <button
                onClick={() => scrollToSection('section-quiz')}
                className="px-6 py-3 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-app)] hover:border-amber-500/50 text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--math-gradient)] transition-colors inline-flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
              >
                <Award className="w-4 h-4 text-[var(--math-gradient)] shrink-0" />
                <span className="whitespace-nowrap">{isAr ? 'الانتقال إلى الاختبار التشخيصي' : 'Take Diagnostic Battery (Section 05)'}</span>
              </button>
            </div>
          )}
        </section>

      </div>
    </div>
  );
};

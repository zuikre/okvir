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
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX,
  Sigma,
  TrendingUp,
  Brain,
  Lightbulb,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Columns,
  RotateCcw,
} from 'lucide-react';
import { useOkvirStore } from '@/lib/store';
import { curriculum, tracks } from '@/lib/curriculum';
import { SimulationView } from '@/components/simulation/SimulationView';
import { CodeChallengeEditor } from '@/components/editor/CodeChallengeEditor';
import { VariableInspector } from '@/components/editor/VariableInspector';
import { useCodeCanvasBridge } from '@/lib/pyodide/useCodeCanvasBridge';
import { useFormulaAnchorStore } from '@/lib/formulaAnchorStore';
import { KaTeXMath } from '@/components/common/KaTeXMath';
import { MathText } from '@/components/common/MathText';
import { TactileSlider } from '@/components/common/TactileSlider';
import { KaTeXScrubber } from '@/components/common/KaTeXScrubber';
import { MisconceptionDiagnosticCard } from '@/components/pedagogy/MisconceptionDiagnosticCard';
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
    <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-app)] overflow-hidden shadow-sm">
      <div className="px-4 py-2.5 bg-[var(--bg-surface)] border-b border-[var(--border-subtle)] flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
          <HelpCircle className="w-4 h-4" />
          <span>{isAr ? 'سلم التلميحات السقراطي التدريجي' : 'Progressive Socratic Hint Ladder'}</span>
        </div>
        <span className="text-[10px] font-mono text-[var(--text-tertiary)] uppercase">
          {isAr ? `المستوى المفتوح: ${unlockedTier}/3` : `Tier ${unlockedTier}/3`}
        </span>
      </div>

      <div className="p-4 space-y-3">
        {/* Tier 1 */}
        <div className="p-3 rounded-lg border border-amber-500/20 bg-amber-500/5 space-y-1">
          <div className="flex items-center justify-between text-[11px] font-bold text-amber-400 uppercase tracking-wider">
            <span>{isAr ? 'المستوى ١: تنبيه مفاهيمي' : 'Tier 1: Conceptual Nudge'}</span>
            <span className="text-[10px] font-mono text-emerald-400">✓ {isAr ? 'مفتوح' : 'Unlocked'}</span>
          </div>
          <p className="text-xs text-[var(--text-primary)] leading-relaxed">
            {isAr ? hints.tier1.ar : hints.tier1.en}
          </p>
        </div>

        {/* Tier 2 */}
        {unlockedTier >= 2 ? (
          <div className="p-3 rounded-lg border border-sky-500/20 bg-sky-500/5 space-y-1 animate-fade-in">
            <div className="flex items-center justify-between text-[11px] font-bold text-sky-400 uppercase tracking-wider">
              <span>{isAr ? 'المستوى ٢: إشارة رياضية صارمة' : 'Tier 2: Mathematical Hint'}</span>
              <span className="text-[10px] font-mono text-emerald-400">✓ {isAr ? 'مفتوح' : 'Unlocked'}</span>
            </div>
            <p className="text-xs text-[var(--text-primary)] leading-relaxed">
              {isAr ? hints.tier2.ar : hints.tier2.en}
            </p>
          </div>
        ) : (
          <button
            onClick={() => {
              setUnlockedTier(2);
              if (soundEnabled) audio.playClick();
            }}
            className="w-full py-2 px-3 rounded-lg border border-dashed border-[var(--border-subtle)] hover:border-sky-500/50 hover:bg-sky-500/5 text-xs text-[var(--text-secondary)] hover:text-sky-400 flex items-center justify-between transition-all cursor-pointer"
          >
            <span className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5" />
              <span>{isAr ? 'فتح التلميح الرياضي (المستوى ٢)' : 'Unlock Mathematical Hint (Tier 2)'}</span>
            </span>
            <span className="text-[10px] font-mono opacity-70">+{isAr ? 'بدون عقوبة' : 'No penalty'}</span>
          </button>
        )}

        {/* Tier 3 */}
        {unlockedTier >= 3 ? (
          <div className="p-3 rounded-lg border border-purple-500/20 bg-purple-500/5 space-y-1 animate-fade-in">
            <div className="flex items-center justify-between text-[11px] font-bold text-purple-400 uppercase tracking-wider">
              <span>{isAr ? 'المستوى ٣: خطوات الاشتقاق والحل' : 'Tier 3: Implementation / Derivation Guide'}</span>
              <span className="text-[10px] font-mono text-emerald-400">✓ {isAr ? 'مفتوح' : 'Unlocked'}</span>
            </div>
            <p className="text-xs text-[var(--text-primary)] leading-relaxed">
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
            className="w-full py-2 px-3 rounded-lg border border-dashed border-[var(--border-subtle)] hover:border-purple-500/50 hover:bg-purple-500/5 text-xs text-[var(--text-secondary)] hover:text-purple-400 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-between transition-all cursor-pointer"
          >
            <span className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5" />
              <span>{isAr ? 'فتح دليل الحل والاشتقاق الكامل (المستوى ٣)' : 'Unlock Complete Derivation Guide (Tier 3)'}</span>
            </span>
            <span className="text-[10px] font-mono opacity-70">
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
    <div className="p-4 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-app)] space-y-3">
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 text-amber-400 font-bold uppercase tracking-wider">
          <Lightbulb className="w-4 h-4 animate-pulse" />
          <span>{isAr ? 'صياغة الفرضية والحدس الأولي' : 'Pre-Simulation Hypothesis Priming'}</span>
        </div>
        <span className="text-[10px] font-mono text-[var(--text-tertiary)] uppercase">
          {isAr ? 'توقع قبل التجربة' : 'Predict Before Scrubbing'}
        </span>
      </div>

      <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
        {isAr
          ? `قبل التفاعل مع المحاكاة الفضائية على اليمين، ما هو توقعك العلمي بخصوص هذا المفهوم في ${moduleTitle}؟`
          : `Before manipulating the visual physics canvas on the right, which statement captures the true geometric invariant of ${moduleTitle}?`}
      </p>

      <div className="space-y-2">
        {hypotheses.map((h, idx) => {
          const isSelected = committedPrediction === idx;
          let style =
            'border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:border-[var(--border-strong)] text-[var(--text-secondary)]';
          if (committedPrediction !== null) {
            if (h.correct && isSelected) {
              style = 'border-emerald-500 bg-emerald-950/30 text-emerald-200';
            } else if (!h.correct && isSelected) {
              style = 'border-rose-500 bg-rose-950/30 text-rose-200';
            } else if (h.correct) {
              style = 'border-emerald-600/50 bg-emerald-950/15 text-emerald-300/80';
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
              className={`w-full text-start p-3 rounded-lg border text-xs transition-all flex items-start gap-2.5 ${style}`}
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
        <div className="p-3 rounded-lg border border-[var(--border-strong)] bg-[var(--bg-surface)] text-xs space-y-1.5 animate-fade-in">
          <div className="flex items-center gap-2 font-bold">
            {hypotheses[committedPrediction].correct ? (
              <span className="text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                {isAr ? 'فرضية علمية دقيقة ومثبتة!' : 'Hypothesis Confirmed! ★'}
              </span>
            ) : (
              <span className="text-amber-400 flex items-center gap-1.5">
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
    updateLessonBeat,
    completeLesson,
    setCurrentView,
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

  const currentBeat = progress.currentBeat || 1;

  // Deck Tabs: canvas | code | inspector | profiler
  const [activeDeckTab, setActiveDeckTab] = useState<'canvas' | 'code' | 'inspector' | 'profiler'>('canvas');
  const [isFocusDeck, setIsFocusDeck] = useState(false);
  const [isSplitCodePreview, setIsSplitCodePreview] = useState(false);
  const [isDiagnosticSolved, setIsDiagnosticSolved] = useState(false);
  const [splitPercent, setSplitPercent] = useState(42);
  const isDraggingSplitRef = useRef(false);

  // Draggable Split Divider
  const handleSplitPointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    isDraggingSplitRef.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handleSplitPointerMove = (e: React.PointerEvent) => {
    if (!isDraggingSplitRef.current) return;
    const ratio = (e.clientX / window.innerWidth) * 100;
    const bounded = Math.min(65, Math.max(28, ratio));
    setSplitPercent(bounded);
  };

  const handleSplitPointerUp = (e: React.PointerEvent) => {
    if (isDraggingSplitRef.current) {
      isDraggingSplitRef.current = false;
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {
        // ignore
      }
    }
  };

  // Reactive WASM bridge
  const { isReady, variables, memory, logs, executionTimeMs } = useCodeCanvasBridge();

  // Formula anchor
  const { activeToken, setActiveToken } = useFormulaAnchorStore();

  const beatObj = mod.beats.find((b) => b.number === currentBeat) || mod.beats[0];

  // Map QuizQuestion into DiagnosticQuestion format
  const diagnosticQuestion: DiagnosticQuestion | null = useMemo(() => {
    if (!beatObj.question) return null;
    return {
      id: `${mod.id}-beat4-diagnostic`,
      depthTier: 2,
      prompt: beatObj.question.prompt,
      latexAnchor: beatObj.formula,
      options: beatObj.question.options.map((opt) => ({
        text: opt.text,
        correct: opt.correct,
        diagnosticFeedback: opt.explanation,
      })),
    };
  }, [beatObj.question, beatObj.formula, mod.id]);

  // Set Beat navigation
  const setBeat = useCallback((b: BeatNumber) => {
    updateLessonBeat(mod.id, b);
    if (b === 1 || b === 2) {
      setActiveDeckTab('canvas');
    } else if (b === 3) {
      setActiveDeckTab('code');
    }
    if (config.soundEnabled) audio.playClick();
  }, [mod.id, updateLessonBeat, config.soundEnabled]);

  const handleNext = useCallback(() => {
    if (currentBeat < 4) {
      setBeat((currentBeat + 1) as BeatNumber);
      if (config.soundEnabled) audio.playSuccessChime();
    } else {
      // Beat 4: Complete Masterclass
      completeLesson(mod.id);
      addXp(100);
      if (config.soundEnabled) audio.playVictoryHarmonics();
      setCurrentView('constellation');
    }
  }, [currentBeat, setBeat, completeLesson, mod.id, addXp, config.soundEnabled, setCurrentView]);

  const handlePrev = useCallback(() => {
    if (currentBeat > 1) {
      setBeat((currentBeat - 1) as BeatNumber);
      if (config.soundEnabled) audio.playClick();
    }
  }, [currentBeat, setBeat, config.soundEnabled]);

  // Keyboard Ergonomics
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
        setIsFocusDeck((prev) => !prev);
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
      } else if (e.altKey && (e.key === 's' || e.key === 'S')) {
        e.preventDefault();
        setIsSplitCodePreview((prev) => !prev);
        if (config.soundEnabled) audio.playClick();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        setCurrentView('constellation');
      } else if (e.key === '1') {
        e.preventDefault();
        setBeat(1);
      } else if (e.key === '2') {
        e.preventDefault();
        setBeat(2);
      } else if (e.key === '3') {
        e.preventDefault();
        setBeat(3);
      } else if (e.key === '4') {
        e.preventDefault();
        setBeat(4);
      } else if (e.key === 'Enter' || e.key === ' ') {
        if (currentBeat < 4 || isDiagnosticSolved) {
          e.preventDefault();
          handleNext();
        }
      } else if (e.key === 'ArrowLeft' && isAr) {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowRight' && !isAr) {
        e.preventDefault();
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [config.soundEnabled, currentBeat, handleNext, isAr, isDiagnosticSolved, setBeat, setCurrentView]);

  // Determine active simulation type
  const simType: SimulationType = useMemo(() => {
    if (beatObj.simulation) return beatObj.simulation;
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
  }, [beatObj.simulation, mod.id]);

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
    <div className="flex flex-col h-screen w-full bg-[var(--bg-app)] text-[var(--text-primary)] overflow-hidden font-sans select-none">
      {/* ========================================================================= */}
      {/* TOP INSTRUMENT HEADER HUD */}
      {/* ========================================================================= */}
      <header className="h-14 border-b border-[var(--border-subtle)] bg-[var(--bg-surface)] px-4 flex items-center justify-between shrink-0 z-20">
        {/* Left: Breadcrumbs & Track Glow */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (config.soundEnabled) audio.playClick();
              setCurrentView('constellation');
            }}
            className="p-2 rounded-lg border border-[var(--border-subtle)] hover:border-[var(--border-strong)] hover:bg-[var(--bg-surface-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all flex items-center gap-1.5 text-xs font-mono group cursor-pointer"
            title="Return to Roadmap (ESC)"
          >
            <ArrowLeft className="w-3.5 h-3.5 rtl-flip group-hover:-translate-x-0.5 transition-transform" />
            <span className="hidden sm:inline font-semibold">ESC</span>
          </button>

          <div className="h-5 w-[1px] bg-[var(--border-subtle)]" />

          {/* Track Pill */}
          <div
            className="flex items-center gap-2 px-2.5 py-1 rounded-lg border text-xs font-mono font-bold"
            style={{
              borderColor: `${trackColor}40`,
              backgroundColor: `${trackColor}12`,
              color: trackColor,
            }}
          >
            {track.id === 'math' && <Sigma className="w-3.5 h-3.5" />}
            {track.id === 'programming' && <Code2 className="w-3.5 h-3.5" />}
            {track.id === 'econometrics' && <TrendingUp className="w-3.5 h-3.5" />}
            {track.id === 'deeplearning' && <Brain className="w-3.5 h-3.5" />}
            <span className="uppercase tracking-wider hidden md:inline">
              {isAr ? track.titleAr : track.title}
            </span>
          </div>

          <div>
            <h1 className="text-xs font-bold text-[var(--text-primary)] flex items-center gap-2">
              <span>{isAr ? mod.titleAr : mod.title}</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[var(--bg-app)] border border-[var(--border-subtle)] text-[var(--text-tertiary)]">
                +100 XP
              </span>
            </h1>
            <span className="text-[10px] text-[var(--text-tertiary)] font-mono uppercase">
              {mod.estimatedMinutes} {isAr ? 'دقيقة إتقان' : 'MIN MASTERCLASS'}
            </span>
          </div>
        </div>

        {/* Center: Tactile 4-Beat Progression Stepper */}
        <div className="flex items-center gap-1 bg-[var(--bg-app)] p-1 rounded-xl border border-[var(--border-subtle)] shadow-inner">
          {([1, 2, 3, 4] as BeatNumber[]).map((b) => {
            const isActive = currentBeat === b;
            const isCompleted = progress.completedBeats?.includes(b) || b < currentBeat;
            return (
              <button
                key={b}
                onClick={() => setBeat(b)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'bg-[var(--text-primary)] text-[var(--bg-app)] shadow-md ring-1 ring-white/10'
                    : isCompleted
                    ? 'text-emerald-400 hover:bg-[var(--bg-surface-hover)]'
                    : 'text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-hover)]'
                }`}
                title={`Jump to Phase ${b} (${b})`}
              >
                {isCompleted ? (
                  <Check className="w-3.5 h-3.5 stroke-[3] text-emerald-400" />
                ) : (
                  <span className="text-[10px] opacity-60">[{b}]</span>
                )}
                <span>0{b}</span>
                <span className="text-[10px] opacity-80 hidden lg:inline">
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
                    : 'Diagnostic'}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right: Sound, Focus Deck, WASM Engine status */}
        <div className="flex items-center gap-2">
          {/* Sound Toggle */}
          <button
            onClick={() => {
              const nextSound = !config.soundEnabled;
              useOkvirStore.setState({ config: { ...config, soundEnabled: nextSound } });
              if (nextSound) audio.playClick();
            }}
            className="p-2 rounded-lg border border-[var(--border-subtle)] hover:border-[var(--border-strong)] hover:bg-[var(--bg-surface-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all cursor-pointer"
            title={config.soundEnabled ? 'Mute Audio (M)' : 'Enable Audio (M)'}
          >
            {config.soundEnabled ? (
              <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-[var(--text-disabled)]" />
            )}
          </button>

          {/* Reset Split View */}
          <button
            onClick={() => setSplitPercent(42)}
            className="hidden sm:flex p-2 rounded-lg border border-[var(--border-subtle)] hover:border-[var(--border-strong)] hover:bg-[var(--bg-surface-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all text-xs font-mono cursor-pointer"
            title="Reset Split Layout to 42%"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Focus Deck Button */}
          <button
            onClick={() => {
              setIsFocusDeck((prev) => !prev);
              if (config.soundEnabled) audio.playClick();
            }}
            className="p-2 rounded-lg border border-[var(--border-subtle)] hover:border-[var(--border-strong)] hover:bg-[var(--bg-surface-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all cursor-pointer"
            title={isFocusDeck ? 'Restore Split View (⌘2)' : 'Focus Deck Mode (⌘2)'}
          >
            {isFocusDeck ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* MAIN DUAL-PANE PRO WORKBENCH */}
      {/* ========================================================================= */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Pane: Masterclass Console & Narrative */}
        {!isFocusDeck && (
          <aside
            style={{ width: `${splitPercent}%` }}
            className="border-e border-[var(--border-subtle)] bg-[var(--bg-surface)] flex flex-col overflow-hidden shrink-0 z-10"
          >
            {/* Scrollable Narrative & Pedagogical Components */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Phase Headline & Progress Tracker */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider">
                  <span
                    className="font-bold px-2 py-0.5 rounded border"
                    style={{
                      borderColor: `${trackColor}40`,
                      backgroundColor: `${trackColor}12`,
                      color: trackColor,
                    }}
                  >
                    {isAr ? `المرحلة 0${currentBeat}` : `PHASE 0${currentBeat}`} //{' '}
                    {currentBeat === 1 && (isAr ? 'الحدس الفطري' : 'SPATIAL INTUITION')}
                    {currentBeat === 2 && (isAr ? 'الصياغة الرياضية' : 'MATHEMATICAL INVARIANT')}
                    {currentBeat === 3 && (isAr ? 'الكود المتجه' : 'COMPUTATIONAL KERNEL')}
                    {currentBeat === 4 && (isAr ? 'التشخيص ونقل الأثر' : 'DIAGNOSTIC TRANSFER')}
                  </span>
                  <span className="text-[var(--text-tertiary)] font-bold">
                    {currentBeat * 25}% {isAr ? 'مكتمل' : 'COMPLETE'}
                  </span>
                </div>

                <div className="w-full h-1 bg-[var(--bg-app)] rounded-full overflow-hidden border border-[var(--border-subtle)]">
                  <div
                    className="h-full transition-all duration-300 rounded-full"
                    style={{
                      width: `${currentBeat * 25}%`,
                      backgroundColor: trackColor,
                    }}
                  />
                </div>

                <h2 className="text-base font-bold text-[var(--text-primary)] pt-1">
                  {currentBeat === 1 && (isAr ? 'الحدس الحركي والهندسي' : 'Tactile & Spatial Intuition')}
                  {currentBeat === 2 && (isAr ? 'المرساة الرياضية الصارمة' : 'Formal Mathematical Anchor')}
                  {currentBeat === 3 && (isAr ? 'النواة البرمجية الحسابية' : 'Computational Vector Kernel')}
                  {currentBeat === 4 && (isAr ? 'تحدي النقل وتشخيص المفاهيم' : 'Active Transfer & Diagnosis')}
                </h2>
              </div>

              {/* BEAT 1: PRE-SIMULATION HYPOTHESIS PRIMING */}
              {currentBeat === 1 && (
                <HypothesisPrimingCard
                  moduleTitle={isAr ? mod.titleAr : mod.title}
                  isAr={isAr}
                  soundEnabled={config.soundEnabled}
                  trackId={mod.trackId}
                />
              )}

              {/* Narrative Prose */}
              <div className="text-sm text-[var(--text-secondary)] leading-relaxed space-y-3 font-normal">
                <MathText text={isAr ? beatObj.narrative.ar : beatObj.narrative.en} />
              </div>

              {/* BEAT 1 & 2: IN-NARRATIVE TACTILE PARAMETER SCRUBBERS */}
              {(currentBeat === 1 || currentBeat === 2) && mod.id.includes('ols') && (
                <div className="p-4 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-app)] space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-[var(--math-prediction)] uppercase">
                    <span className="flex items-center gap-1.5">
                      <Sliders className="w-3.5 h-3.5" />
                      {isAr ? 'أدوات التحكم الحركية المباشرة' : 'Direct Tactile Controls'}
                    </span>
                    <span className="text-[10px] font-mono text-[var(--text-tertiary)]">
                      {isAr ? 'تحديث آني 60fps' : 'Realtime 60fps'}
                    </span>
                  </div>
                  <div className="space-y-3">
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

              {(currentBeat === 1 || currentBeat === 2) && mod.id.includes('knn') && (
                <div className="p-4 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-app)] space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-[var(--math-vector)] uppercase">
                    <span className="flex items-center gap-1.5">
                      <Sliders className="w-3.5 h-3.5" />
                      {isAr ? 'عدد الجيران الأقرب' : 'KNN Neighborhood Radius'}
                    </span>
                    <span className="text-[10px] font-mono text-[var(--text-tertiary)]">k = {knnK}</span>
                  </div>
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

              {(currentBeat === 1 || currentBeat === 2) && mod.id.includes('gradient') && (
                <div className="p-4 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-app)] space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-[var(--math-gradient)] uppercase">
                    <span className="flex items-center gap-1.5">
                      <Sliders className="w-3.5 h-3.5" />
                      {isAr ? 'معلمات الانحدار المتدرج' : 'Hyperparameters'}
                    </span>
                    <span className="text-[10px] font-mono text-[var(--text-tertiary)]">α = {learningRate}</span>
                  </div>
                  <div className="space-y-3">
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

              {/* BEAT 2: FORMAL MATHEMATICAL INVARIANT & FORMULA ANCHORS */}
              {currentBeat === 2 && beatObj.formula && (
                <div className="p-5 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-app)] space-y-4 shadow-sm">
                  <div className="flex items-center justify-between text-xs text-[var(--math-prediction)] font-bold uppercase">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      {isAr ? 'المعادلة الأساسية الصارمة' : 'Mathematical Invariant'}
                    </span>
                    <span className="text-[10px] font-mono text-[var(--text-tertiary)]">
                      {isAr ? 'انقر للربط مع الرسم' : 'Click term to anchor geometry'}
                    </span>
                  </div>

                  <div className="py-3 px-4 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-center overflow-x-auto">
                    <KaTeXMath
                      math={beatObj.formula}
                      block
                      onHoverVariable={(v) => setActiveToken(v, 'formula')}
                    />
                  </div>

                  {/* Token Anchor Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[var(--border-subtle)]">
                    {formulaTokens.map((tok) => {
                      const isActive = activeToken === tok.symbol;
                      return (
                        <button
                          key={tok.symbol}
                          onClick={() => {
                            setActiveToken(isActive ? null : tok.symbol, 'formula');
                            if (config.soundEnabled) audio.playClick();
                          }}
                          className={`px-2.5 py-1 rounded-md text-xs font-mono transition-all cursor-pointer ${
                            isActive
                              ? 'bg-[var(--math-prediction)] text-white shadow-sm ring-1 ring-white/20'
                              : 'bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)]'
                          }`}
                        >
                          <span className="font-bold">{tok.symbol}</span>
                          <span className="text-[10px] opacity-75 ms-1">({tok.label})</span>
                        </button>
                      );
                    })}
                  </div>

                  {beatObj.formulaNote && (
                    <p className="text-xs text-[var(--text-secondary)] border-t border-[var(--border-subtle)] pt-2.5 leading-relaxed">
                      {isAr ? beatObj.formulaNote.ar : beatObj.formulaNote.en}
                    </p>
                  )}
                </div>
              )}

              {/* BEAT 3: COMPUTATIONAL KERNEL SPECIFICATION */}
              {currentBeat === 3 && (
                <div className="p-4 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-app)] space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between text-[var(--math-vector)] font-bold uppercase">
                    <span className="flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5" />
                      {isAr ? 'مواصفات النواة الحسابية' : 'Kernel Specifications'}
                    </span>
                    <span className="text-[10px] text-emerald-400">O(1) MEMORY // SIMD</span>
                  </div>
                  <div className="p-3 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-1.5 text-[var(--text-secondary)]">
                    <div className="flex justify-between">
                      <span className="text-[var(--text-tertiary)]">{isAr ? 'البيئة:' : 'Runtime:'}</span>
                      <span className="text-[var(--text-primary)]">CPython 3.12 (WASM)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--text-tertiary)]">{isAr ? 'المكتبات المتاحة:' : 'Libraries:'}</span>
                      <span className="text-[var(--text-primary)]">numpy, scipy, math</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--text-tertiary)]">{isAr ? 'المهلة القصوى:' : 'Max Timeout:'}</span>
                      <span className="text-[var(--text-primary)]">5000 ms</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-[var(--text-tertiary)] leading-relaxed">
                    {isAr
                      ? 'تأكد من استخدام العمليات المتجهة وتجنب حلقات for لضمان تنفيذ سريع يتوافق مع قيود الذاكرة.'
                      : 'Ensure all array operations leverage NumPy vectorization. Avoid explicit Python for-loops to maintain SIMD efficiency.'}
                  </p>
                </div>
              )}

              {/* SOCRATIC HINT ACCORDION (BEATS 1, 2, 3) */}
              {currentBeat !== 4 && beatObj.hints && (
                <SocraticHintLadder
                  hints={beatObj.hints}
                  isAr={isAr}
                  soundEnabled={config.soundEnabled}
                />
              )}

              {/* BEAT 4: ACTIVE DIAGNOSTIC & MISCONCEPTION CARD */}
              {currentBeat === 4 && diagnosticQuestion && (
                <div className="space-y-4">
                  <MisconceptionDiagnosticCard
                    question={diagnosticQuestion}
                    onAnswerSelected={(isCorrect) => {
                      setIsDiagnosticSolved(isCorrect);
                    }}
                  />
                </div>
              )}
            </div>

            {/* Bottom Navigation Toolbar Dock */}
            <div className="h-16 border-t border-[var(--border-subtle)] px-6 flex items-center justify-between bg-[var(--bg-app)] shrink-0 z-10">
              <button
                onClick={handlePrev}
                disabled={currentBeat === 1}
                className="px-3.5 py-2 rounded-lg border border-[var(--border-subtle)] text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5 rtl-flip" />
                <span>{isAr ? 'السابق' : 'Previous'}</span>
              </button>

              <button
                onClick={handleNext}
                disabled={currentBeat === 4 && !isDiagnosticSolved}
                className={`px-5 py-2.5 rounded-lg text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer ${
                  currentBeat === 4
                    ? isDiagnosticSolved
                      ? 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-emerald-500/20 shadow-lg animate-pulse'
                      : 'bg-[var(--border-subtle)] text-[var(--text-disabled)] cursor-not-allowed'
                    : 'bg-[var(--text-primary)] text-[var(--bg-app)] hover:brightness-110 shadow-sm'
                }`}
              >
                <span>
                  {currentBeat === 1
                    ? isAr
                      ? 'الانتقال للصياغة الرياضية [Space]'
                      : 'Next: Formal Invariant [Space]'
                    : currentBeat === 2
                    ? isAr
                      ? 'الانتقال للبرمجة المتجهة [Space]'
                      : 'Next: Vectorized Python Lab [Space]'
                    : currentBeat === 3
                    ? isAr
                      ? 'الانتقال للتحدي التشخيصي [Space]'
                      : 'Next: Diagnostic Challenge [Space]'
                    : isDiagnosticSolved
                    ? isAr
                      ? 'إتمام الدرس وحصد +100 XP ★'
                      : '★ Complete Masterclass (+100 XP)'
                    : isAr
                    ? 'أجب على السؤال التشخيصي أولاً'
                    : 'Solve Diagnostic Challenge Above'}
                </span>
                <ArrowRight className="w-3.5 h-3.5 rtl-flip" />
              </button>
            </div>
          </aside>
        )}

        {/* Draggable Divider Gutter */}
        {!isFocusDeck && (
          <div
            onPointerDown={handleSplitPointerDown}
            onPointerMove={handleSplitPointerMove}
            onPointerUp={handleSplitPointerUp}
            onPointerCancel={handleSplitPointerUp}
            className="w-1.5 hover:w-2 bg-[var(--border-subtle)] hover:bg-sky-500/80 cursor-col-resize flex items-center justify-center transition-all z-10 group shrink-0"
            title="Drag to resize panes (double-click to reset)"
            onDoubleClick={() => setSplitPercent(42)}
          >
            <div className="w-[2px] h-8 rounded-full bg-zinc-600 group-hover:bg-white transition-colors" />
          </div>
        )}

        {/* Right Pane: Dockable Industrial Instrument Deck */}
        <main className="flex-1 flex flex-col bg-[var(--bg-app)] overflow-hidden">
          {/* Deck Tab Bar */}
          <div className="h-10 border-b border-[var(--border-subtle)] bg-[var(--bg-surface)] px-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-1 font-mono text-xs">
              <button
                onClick={() => {
                  setActiveDeckTab('canvas');
                  if (config.soundEnabled) audio.playClick();
                }}
                className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 font-semibold transition-all cursor-pointer ${
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
                className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 font-semibold transition-all cursor-pointer ${
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
                className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 font-semibold transition-all cursor-pointer ${
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
                className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 font-semibold transition-all cursor-pointer ${
                  activeDeckTab === 'profiler'
                    ? 'bg-[var(--bg-app)] text-[var(--math-gradient)] border border-[var(--border-subtle)] shadow-sm'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>{isAr ? 'الأداء' : 'Profiler (⌥4)'}</span>
              </button>
            </div>

            {/* Split Canvas + Code Toggle (available in Code tab) */}
            <div className="flex items-center gap-3">
              {activeDeckTab === 'code' && (
                <button
                  onClick={() => {
                    setIsSplitCodePreview((prev) => !prev);
                    if (config.soundEnabled) audio.playClick();
                  }}
                  className={`px-2.5 py-1 rounded text-xs font-mono flex items-center gap-1.5 border transition-all cursor-pointer ${
                    isSplitCodePreview
                      ? 'border-sky-500 bg-sky-500/15 text-sky-300 font-bold'
                      : 'border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                  title="Toggle side-by-side Code and Live Physics Canvas (⌥S)"
                >
                  <Columns className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">
                    {isAr ? 'عرض مزدوج (كود + محاكاة)' : 'Split Canvas (⌥S)'}
                  </span>
                </button>
              )}

              {/* Active Telemetry status */}
              <div className="flex items-center gap-3 text-[11px] font-mono text-[var(--text-tertiary)]">
                <span className="flex items-center gap-1.5">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isReady ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'
                    }`}
                  />
                  <span className="hidden md:inline">
                    {isReady ? 'CPython 3.12 WASM' : 'Loading Kernel...'}
                  </span>
                </span>
                {executionTimeMs > 0 && <span>{executionTimeMs}ms</span>}
              </div>
            </div>
          </div>

          {/* Deck Tab Content Area */}
          <div className="flex-1 overflow-hidden relative">
            {/* Visual Physics Tab */}
            {activeDeckTab === 'canvas' && (
              <div className="w-full h-full p-4 flex flex-col">
                <div className="flex-1 rounded-xl border border-[var(--border-subtle)] overflow-hidden bg-[var(--bg-surface)] relative shadow-inner">
                  <SimulationView type={simType} compact={false} />
                </div>
              </div>
            )}

            {/* Code Sandbox Tab */}
            {activeDeckTab === 'code' && (
              <div className="w-full h-full p-4 overflow-hidden">
                {isSplitCodePreview ? (
                  <div className="w-full h-full grid grid-cols-1 xl:grid-cols-2 gap-4 overflow-hidden">
                    {/* Left/Top: Code Challenge Editor */}
                    <div className="h-full overflow-hidden flex flex-col">
                      <CodeChallengeEditor
                        challenge={beatObj.code}
                        onComplete={() => {
                          if (config.soundEnabled) audio.playVictoryHarmonics();
                          updateLessonBeat(mod.id, Math.max(currentBeat, 3) as BeatNumber);
                        }}
                      />
                    </div>
                    {/* Right/Bottom: Live Physics Canvas Preview */}
                    <div className="h-full rounded-xl border border-[var(--border-subtle)] overflow-hidden bg-[var(--bg-surface)] flex flex-col shadow-inner relative">
                      <div className="px-3 py-1.5 bg-[var(--bg-app)] border-b border-[var(--border-subtle)] flex items-center justify-between text-[11px] font-mono text-[var(--text-tertiary)] shrink-0">
                        <span className="flex items-center gap-1.5 text-sky-400 font-semibold">
                          <Layers className="w-3.5 h-3.5" />
                          {isAr ? 'المعاينة الفيزيائية الحية' : 'Live Physics Canvas'}
                        </span>
                        <span className="text-[10px] text-emerald-400">60 FPS REALTIME</span>
                      </div>
                      <div className="flex-1 overflow-hidden relative">
                        <SimulationView type={simType} compact={true} />
                      </div>
                    </div>
                  </div>
                ) : (
                  <CodeChallengeEditor
                    challenge={beatObj.code}
                    onComplete={() => {
                      if (config.soundEnabled) audio.playVictoryHarmonics();
                      updateLessonBeat(mod.id, Math.max(currentBeat, 3) as BeatNumber);
                    }}
                  />
                )}
              </div>
            )}

            {/* Tensors HUD Tab */}
            {activeDeckTab === 'inspector' && (
              <div className="w-full h-full p-4">
                <VariableInspector variables={variables} memory={memory} />
              </div>
            )}

            {/* Profiler Tab */}
            {activeDeckTab === 'profiler' && (
              <div className="w-full h-full p-6 font-mono text-xs space-y-4 overflow-y-auto">
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

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useOkvirStore } from '@/lib/store';
import { audio } from '@/lib/audio';
import { PreCanvasBriefing, PostCanvasConsolidation, TierContent } from '@/components/pedagogy/MultiTierDisclosure';

type BayesPreset = 'rare' | 'cancer' | 'high_risk' | 'spam';

const PRESETS: Record<BayesPreset, {
  name: { en: string; ar: string };
  prevalence: number;
  sensitivity: number;
  falsePositive: number;
  description: { en: string; ar: string };
}> = {
  rare: {
    name: { en: 'Rare Disease (0.1%)', ar: 'مرض نادر (٠٫١٪)' },
    prevalence: 0.1,
    sensitivity: 99.0,
    falsePositive: 5.0,
    description: {
      en: 'A 99% accurate test still yields a 98% false positive rate due to base rate scarcity.',
      ar: 'اختبار بدقة ٩٩٪ يعطي إنذارات خاطئة بنسبة ٩٨٪ بسبب ندرة المرض الأساسية.',
    },
  },
  cancer: {
    name: { en: 'Mammography Audit (1.0%)', ar: 'فحص الأورام (١٫٠٪)' },
    prevalence: 1.0,
    sensitivity: 95.0,
    falsePositive: 5.0,
    description: {
      en: 'Standard screening scenario where posterior probability is only ~16%.',
      ar: 'سيناريو الفحص الشائع حيث يكون الاحتمال البعدي حوالي ١٦٪ فقط.',
    },
  },
  high_risk: {
    name: { en: 'Symptomatic Clinic (15%)', ar: 'عيادة أعراض (١٥٪)' },
    prevalence: 15.0,
    sensitivity: 95.0,
    falsePositive: 4.0,
    description: {
      en: 'Pre-selected cohort with high prior prevalence increases posterior confidence to ~80%.',
      ar: 'فئة ذات معدل انتشار مسبق مرتفع ترفع موثوقية النتيجة البعدية إلى حوالي ٨٠٪.',
    },
  },
  spam: {
    name: { en: 'Spam Filter (25%)', ar: 'فلتر البريد المزعج (٢٥٪)' },
    prevalence: 25.0,
    sensitivity: 98.0,
    falsePositive: 1.5,
    description: {
      en: 'High base rate combined with low false alarms drives posterior above 95%.',
      ar: 'معدل أساسي مرتفع مع قلة الإنذارات الخاطئة يرفع دقة التصنيف فوق ٩٥٪.',
    },
  },
};

const BAYES_PEDAGOGY: TierContent = {
  intuition: {
    analogy: {
      en: 'Imagine 10,000 people standing in a stadium. Only 100 actually have the condition. An imperfect test sounds the alarm for 95 sick people, but also mistakenly flags 495 healthy people. If the alarm rings for you, you are standing among 495 innocent people and only 95 guilty ones!',
      ar: 'تخيل ١٠,٠٠٠ شخص يقفون في ملعب. ١٠٠ منهم فقط مصابون بالفعل. يطلق الاختبار غير الكامل إنذاراً لـ ٩٥ مصاباً، لكنه يخطئ ويطلق إنذاراً لـ ٤٩٥ شخصاً سليماً. إذا رن الإنذار لك، فأنت تقف بين ٤٩٥ بريئاً و ٩٥ مصاباً فقط!',
    },
    keyTakeaway: {
      en: 'The Base Rate Fallacy occurs when people evaluate the probability of a hypothesis P(H|E) using only the test accuracy P(E|H), completely ignoring the foundational prior prevalence P(H).',
      ar: 'تحدث مغالطة المعدل الأساسي عندما يحكم الناس على احتمالية الفرضية P(H|E) بالاعتماد فقط على دقة الفحص P(E|H)، متجاهلين تماماً نسبة الشيوع المسبقة P(H).',
    },
  },
  geometry: {
    visualDescription: {
      en: 'Geometrically, Bayes rule partitions the unit square of all events into disjoint rectangles: the prior P(D) slices the width, and the conditional likelihoods slice the height. The posterior is the ratio of the True Positive area to the total Positive area.',
      ar: 'هندسياً، تقسم مبرهنة بايز فضاء العينة المربع إلى مستطيلات منفصلة: الاحتمال المسبق P(D) يحدد العرض، والأرجحية الشرطية تحدد الارتفاع. الاحتمال البعدي هو نسبة مساحة الإيجابي الحقيقي إلى إجمالي مساحة النتائج الإيجابية.',
    },
    conservedQuantity: {
      en: 'Probability conservation: P(T+) = P(T+ | D)P(D) + P(T+ | ¬D)P(¬D) (Law of Total Probability).',
      ar: 'حفظ الاحتمال: مساحة النتائج الإيجابية تساوي مجموع الإيجابيات الحقيقية والكاذبة قطباً ومساحة.',
    },
  },
  formal: {
    equation: 'P(D \\mid T^+) = \\frac{P(T^+ \\mid D) P(D)}{P(T^+ \\mid D) P(D) + P(T^+ \\mid \\neg D) P(\\neg D)}',
    derivationSteps: [
      {
        step: 'P(D \\cap T^+) = P(T^+ \\mid D) P(D) = P(D \\mid T^+) P(T^+)',
        note: {
          en: 'Symmetry of joint probability intersection via the product rule',
          ar: 'تماثل التقاطع المشترك للاحتمالات من خلال قاعدة الضرب',
        },
      },
      {
        step: 'P(T^+) = P(T^+ \\cap D) + P(T^+ \\cap \\neg D)',
        note: {
          en: 'Partitioning evidence space by exhaustive marginalization',
          ar: 'تفكيك فضاء الدليل عبر الجمع الهامشي لجميع الحالات المنفصلة',
        },
      },
      {
        step: '\\frac{P(D \\mid T^+)}{P(\\neg D \\mid T^+)} = \\frac{P(T^+ \\mid D)}{P(T^+ \\mid \\neg D)} \\times \\frac{P(D)}{P(\\neg D)}',
        note: {
          en: 'Odds form: Posterior Odds = Bayes Factor (Likelihood Ratio) × Prior Odds',
          ar: 'صيغة الأرجحية: أرجحية البعد = عامل بايز × أرجحية القبل',
        },
      },
    ],
  },
  code: {
    snippet: `import numpy as np

def bayesian_updater(prior_p: float, sensitivity: float, false_positive_rate: float):
    """
    Computes exact posterior probability and log-odds update.
    Avoids catastrophic floating-point cancellation for extreme rarities.
    """
    prior_odds = prior_p / (1.0 - prior_p)
    bayes_factor = sensitivity / false_positive_rate
    posterior_odds = prior_odds * bayes_factor
    
    posterior_p = posterior_odds / (1.0 + posterior_odds)
    
    # Information gain in decibels (Bans / Decibans)
    log_evidence_db = 10.0 * np.log10(bayes_factor)
    
    return {
        "posterior_pct": float(posterior_p * 100.0),
        "bayes_factor": float(bayes_factor),
        "evidence_db": float(log_evidence_db)
    }`,
    explanation: {
      en: 'Using the odds-likelihood formulation provides numerical stability and maps naturally to additive evidence in decibels (Turing/Good deciban scale).',
      ar: 'توفر صياغة الأرجحية استقراراً حسابياً ضد التقريب الصفري وتتوافق مع قياس قوة الدليل التراكمي بوحدة الديسيبان.',
    },
  },
};

export const BayesFrequencyTree: React.FC = () => {
  const { language, config } = useOkvirStore();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [prevalencePct, setPrevalencePct] = useState(1.0); // 1.0%
  const [sensitivityPct, setSensitivityPct] = useState(95.0); // 95%
  const [falsePositivePct, setFalsePositivePct] = useState(5.0); // 5%
  const [activePreset, setActivePreset] = useState<BayesPreset | 'custom'>('cancer');

  const totalPop = 10000;
  const pDisease = prevalencePct / 100;
  const pSensitivity = sensitivityPct / 100;
  const pFalsePos = falsePositivePct / 100;

  // Population counts
  const sickCount = Math.round(totalPop * pDisease);
  const healthyCount = totalPop - sickCount;

  const truePositives = Math.round(sickCount * pSensitivity);
  const falseNegatives = sickCount - truePositives;

  const falsePositives = Math.round(healthyCount * pFalsePos);
  const trueNegatives = healthyCount - falsePositives;

  const totalPositives = truePositives + falsePositives;
  const posteriorPct = totalPositives > 0 ? (truePositives / totalPositives) * 100 : 0;

  // 100x100 Dot Matrix Canvas Drawing (10,000 dots)
  const drawMatrix = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const size = 300;
    if (canvas.width !== size * dpr || canvas.height !== size * dpr) {
      canvas.width = size * dpr;
      canvas.height = size * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, size, size);

    const cols = 100;
    const rows = 100;
    const dotSize = size / cols;
    const radius = dotSize * 0.38;

    // We render 10,000 dots:
    // Dot categories:
    // 1) True Positives (Emerald): 0 to truePositives
    // 2) False Negatives (Dim Olive): truePositives to sickCount
    // 3) False Positives (Rose/Amber): sickCount to (sickCount + falsePositives)
    // 4) True Negatives (Muted Slate): remainder
    let dotIndex = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = c * dotSize + dotSize / 2;
        const y = r * dotSize + dotSize / 2;

        let color = 'rgba(255, 255, 255, 0.08)'; // True Negative
        if (dotIndex < truePositives) {
          color = '#10b981'; // True Positive (Emerald)
        } else if (dotIndex < sickCount) {
          color = 'rgba(16, 185, 129, 0.3)'; // False Negative
        } else if (dotIndex < sickCount + falsePositives) {
          color = '#f43f5e'; // False Positive (Rose)
        }

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();

        dotIndex++;
      }
    }

    ctx.restore();
  }, [truePositives, sickCount, falsePositives]);

  useEffect(() => {
    drawMatrix();
  }, [drawMatrix]);

  const handleSliderChange = (setter: React.Dispatch<React.SetStateAction<number>>, val: number) => {
    setter(val);
    setActivePreset('custom');
    if (config.soundEnabled) audio.playClick();
  };

  const applyPreset = (key: BayesPreset) => {
    const p = PRESETS[key];
    setPrevalencePct(p.prevalence);
    setSensitivityPct(p.sensitivity);
    setFalsePositivePct(p.falsePositive);
    setActivePreset(key);
    if (config.soundEnabled) audio.playSuccess();
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Pre-Canvas Intuitive Briefing & Mental Model */}
      <PreCanvasBriefing content={BAYES_PEDAGOGY} />

      {/* Preset Scenarios Strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]">
        <span className="text-[11px] font-mono text-[var(--text-tertiary)] uppercase tracking-wider">
          {language === 'ar' ? 'سيناريوهات الممارسات الحقيقية:' : 'Real-World Scenarios:'}
        </span>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(PRESETS) as BayesPreset[]).map((key) => (
            <button
              key={key}
              onClick={() => applyPreset(key)}
              className={`px-3 py-1 text-xs font-mono rounded-lg border transition-all ${
                activePreset === key
                  ? 'border-[var(--math-vector)] bg-[var(--math-vector)]/15 text-[var(--math-vector)] font-bold shadow-sm'
                  : 'border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]'
              }`}
            >
              {PRESETS[key].name[language]}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Parameter Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]">
        {/* Base Rate */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-[var(--text-secondary)]">{language === 'ar' ? 'المعدل الأساسي P(D):' : 'Prior Prevalence P(D):'}</span>
            <span className="text-emerald-400 font-bold tabular-nums">{prevalencePct.toFixed(1)}%</span>
          </div>
          <input
            type="range"
            min="0.1"
            max="15.0"
            step="0.1"
            value={prevalencePct}
            onChange={(e) => handleSliderChange(setPrevalencePct, parseFloat(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer"
          />
          <div className="text-[10px] text-[var(--text-tertiary)] font-mono">
            {sickCount} {language === 'ar' ? 'مصاب من 10,000' : 'affected in 10,000'}
          </div>
        </div>

        {/* Sensitivity */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-[var(--text-secondary)]">{language === 'ar' ? 'حساسية الاختبار P(T+|D):' : 'Sensitivity P(T+|D):'}</span>
            <span className="text-sky-400 font-bold tabular-nums">{sensitivityPct.toFixed(1)}%</span>
          </div>
          <input
            type="range"
            min="80.0"
            max="99.9"
            step="0.5"
            value={sensitivityPct}
            onChange={(e) => handleSliderChange(setSensitivityPct, parseFloat(e.target.value))}
            className="w-full accent-sky-500 cursor-pointer"
          />
          <div className="text-[10px] text-[var(--text-tertiary)] font-mono">
            {language === 'ar' ? 'معدل كشف الحالات الحقيقية' : 'True Positive Detection Rate'}
          </div>
        </div>

        {/* False Positive Rate */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-[var(--text-secondary)]">{language === 'ar' ? 'الإيجابي الكاذب P(T+|¬D):' : 'False Positive P(T+|¬D):'}</span>
            <span className="text-rose-400 font-bold tabular-nums">{falsePositivePct.toFixed(1)}%</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="15.0"
            step="0.5"
            value={falsePositivePct}
            onChange={(e) => handleSliderChange(setFalsePositivePct, parseFloat(e.target.value))}
            className="w-full accent-rose-500 cursor-pointer"
          />
          <div className="text-[10px] text-[var(--text-tertiary)] font-mono">
            {falsePositives} {language === 'ar' ? 'إنذار خاطئ لأصحاء' : 'false alarms on healthy group'}
          </div>
        </div>
      </div>

      {/* Visual Frequency Canvas Matrix & Frequency Tree */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-app)]">
        {/* 10,000 Dots Visual Matrix */}
        <div className="lg:col-span-5 flex flex-col items-center gap-2">
          <div className="text-xs font-mono text-[var(--text-secondary)] text-center">
            {language === 'ar' ? 'مصفوفة ١٠,٠٠٠ فرد (شاهد نسبة النقاط الملونة)' : '10,000 Individuals Dot Matrix'}
          </div>
          <div className="p-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-inner">
            <canvas
              ref={canvasRef}
              className="w-[260px] h-[260px] rounded-lg"
            />
          </div>
          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-3 text-[10px] font-mono">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
              {language === 'ar' ? `مصاب حقيقي (${truePositives})` : `True Pos (${truePositives})`}
            </span>
            <span className="flex items-center gap-1.5 text-amber-400">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
              {language === 'ar' ? `سلبي كاذب (${falseNegatives})` : `False Neg (${falseNegatives})`}
            </span>
            <span className="flex items-center gap-1.5 text-rose-400">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
              {language === 'ar' ? `إنذار كاذب (${falsePositives})` : `False Alarm (${falsePositives})`}
            </span>
            <span className="flex items-center gap-1.5 text-[var(--text-tertiary)]">
              <span className="w-2.5 h-2.5 rounded-full bg-white/20 inline-block" />
              {language === 'ar' ? `سليم سلبي (${trueNegatives})` : `Healthy Neg (${trueNegatives})`}
            </span>
          </div>
        </div>

        {/* Tree Nodes Flow */}
        <div className="lg:col-span-7 flex flex-col items-center gap-4">
          {/* Root: Total Pop */}
          <div className="px-4 py-2 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface)] text-center font-mono shadow-sm">
            <div className="text-[10px] text-[var(--text-tertiary)]">{language === 'ar' ? 'إجمالي السكان' : 'Total Population'}</div>
            <div className="text-base font-bold text-[var(--text-primary)] tabular-nums">{totalPop.toLocaleString()}</div>
          </div>

          {/* Level 1: Sick vs Healthy */}
          <div className="grid grid-cols-2 gap-4 w-full max-w-md">
            <div className="p-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/5 text-center font-mono">
              <div className="text-[10px] text-emerald-400 font-semibold">{language === 'ar' ? 'مصابون P(D)' : 'Condition Present'}</div>
              <div className="text-sm font-bold text-emerald-300 tabular-nums">{sickCount}</div>
            </div>

            <div className="p-2.5 rounded-xl border border-sky-500/30 bg-sky-500/5 text-center font-mono">
              <div className="text-[10px] text-sky-400 font-semibold">{language === 'ar' ? 'أصحاء P(¬D)' : 'Condition Absent'}</div>
              <div className="text-sm font-bold text-sky-300 tabular-nums">{healthyCount.toLocaleString()}</div>
            </div>
          </div>

          {/* Level 2: Test Outcomes */}
          <div className="grid grid-cols-2 gap-3 w-full">
            {/* True Positives */}
            <div className="p-3 rounded-xl border-2 border-emerald-500/50 bg-emerald-500/10 text-center font-mono shadow-sm">
              <div className="text-[10px] text-emerald-400 font-bold uppercase">{language === 'ar' ? 'إيجابي حقيقي' : 'True Positive'}</div>
              <div className="text-xl font-bold text-emerald-300 tabular-nums">{truePositives}</div>
              <div className="text-[9px] text-[var(--text-tertiary)]">{language === 'ar' ? 'مصاب واختباره +' : 'Sick + Tested +'}</div>
            </div>

            {/* False Positives */}
            <div className="p-3 rounded-xl border-2 border-rose-500/50 bg-rose-500/10 text-center font-mono shadow-sm">
              <div className="text-[10px] text-rose-400 font-bold uppercase">{language === 'ar' ? 'إيجابي كاذب' : 'False Positive'}</div>
              <div className="text-xl font-bold text-rose-300 tabular-nums">{falsePositives}</div>
              <div className="text-[9px] text-[var(--text-tertiary)]">{language === 'ar' ? 'سليم واختباره +' : 'Healthy + Tested +'}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Posterior Probability Result Hero */}
      <div className="p-5 rounded-2xl border border-amber-500/40 bg-amber-500/5 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-semibold mb-1">
            {language === 'ar' ? 'الاحتمال البعدي: P(D | T+) عبر مبرهنة بايز' : "Posterior Probability: P(D | T+) via Bayes' Rule"}
          </div>
          <p className="text-xs text-[var(--text-secondary)] max-w-lg leading-relaxed">
            {language === 'ar'
              ? `إذا جاءت نتيجتك إيجابية، فإن احتمال إصابتك الحقيقي هو ${posteriorPct.toFixed(1)}% فقط؛ لأن عدد الإنذارات الكاذبة (${falsePositives}) يفوق عدد المصابين الفعليين (${truePositives}) بسبب انخفاض المعدل الأساسي.`
              : `Given a positive test result, the probability you actually have the condition is only ${posteriorPct.toFixed(1)}%. False alarms (${falsePositives}) dwarf true cases (${truePositives}) due to the low base rate.`}
          </p>
        </div>

        <div className="p-4 rounded-xl border border-amber-500/50 bg-[var(--bg-surface)] text-center font-mono shrink-0 shadow-lg">
          <div className="text-[10px] text-[var(--text-tertiary)] uppercase">{language === 'ar' ? 'الاحتمال البعدي الحقيقي' : 'Actual Posterior'}</div>
          <div className="text-3xl font-extrabold text-amber-400 tabular-nums">
            {posteriorPct.toFixed(1)}%
          </div>
          <div className="text-[10px] text-amber-300/70">
            {truePositives} / ({truePositives} + {falsePositives})
          </div>
        </div>
      </div>

      {/* Post-Canvas Mathematical & Code Consolidation */}
      <PostCanvasConsolidation content={BAYES_PEDAGOGY} />
    </div>
  );
};

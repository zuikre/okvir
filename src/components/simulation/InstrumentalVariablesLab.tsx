import React, { useState, useMemo } from 'react';
import { useOkvirStore } from '@/lib/store';
import { audio } from '@/lib/audio';
import { PreCanvasBriefing, PostCanvasConsolidation, type TierContent } from '@/components/pedagogy/MultiTierDisclosure';
import { Network, AlertCircle, CheckCircle2, Sliders, ArrowRight } from 'lucide-react';

interface SimDataPoint {
  z: number;
  u: number;
  d: number;
  dHat: number;
  y: number;
}

const IV_PEDAGOGY: TierContent = {
  intuition: {
    analogy: {
      en: 'Imagine you want to know if studying more increases salary, but "innate ability" (U) causes people to both study more and earn more. Naive regression confuses ability with education! An Instrumental Variable (Z)—like a scholarship lottery or distance to university—acts as an exogenous push that affects education WITHOUT being contaminated by innate ability.',
      ar: 'تخيل أنك تريد معرفة ما إذا كانت زيادة سنوات الدراسة ترفع الراتب، لكن "القدرة الفطرية" (U) تدفع الشخص للدراسة أكثر والحصول على راتب أعلى في آن واحد. الانحدار الساذج يخلط بين القدرة الفطرية والتعليم! المتغير الصوري أو الآلي (Z)—مثل القرعة العشوائية أو المسافة للجامعة—يعمل كدفعة خارجية تؤثر على التعليم دون أن تتلوث بالقدرة الفطرية.',
    },
    keyTakeaway: {
      en: 'The Wald Estimator: β_IV = Cov(Y, Z) / Cov(D, Z). Two-Stage Least Squares (2SLS) first isolates the exogenous variation in treatment (D_hat = π₁Z), then regresses Y on D_hat, completely purging omitted variable bias.',
      ar: 'مقدر فالد: β_IV = Cov(Y, Z) / Cov(D, Z). طريقة المربعات الصغرى ذات المرحلتين (2SLS) تعزل أولاً التباين الخارجي النقي في المعالجة (D_hat = π₁Z)، ثم تنحدر بالنتيجة Y على D_hat، مما يطهر التقدير تماماً من تحيز المتغير المحذوف.',
    },
  },
  geometry: {
    visualDescription: {
      en: 'In Hilbert vector space, OLS projects Y onto the contaminated subspace spanned by D and U. 2SLS projects D onto the orthogonal instrument subspace Z, creating a sanitized shadow D_hat before estimating the causal slope.',
      ar: 'في فضاء هيلبرت المتجهي، يسقط OLS المتغير Y على الفضاء الجزئي الملوث بـ D و U. بينما تقوم 2SLS بإسقاط D على فضاء المتغير الصوري Z النقي والمتعامد، مما يولد ظلاً مطهراً D_hat قبل تقدير ميل الأثر السببي.',
    },
    conservedQuantity: {
      en: 'Exclusion Restriction: Cov(Z, ε) = 0 and Cov(Z, Y | D, U) = 0. The instrument affects Y exclusively through its effect on treatment D.',
      ar: 'قيد الاستبعاد (Exclusion Restriction): Cov(Z, ε) = 0 و Cov(Z, Y | D, U) = 0. يؤثر المتغير الصوري في النتيجة Y حصرياً وفقط عبر مساره المؤثر في المعالجة D.',
    },
  },
  formal: {
    equation: '\\beta_{\\text{IV}} = \\frac{\\text{Cov}(Y, Z)}{\\text{Cov}(D, Z)} = \\frac{\\pi_1 \\beta_{\\text{true}}}{\\pi_1} = \\beta_{\\text{true}}',
    derivationSteps: [
      {
        step: 'Y = \\beta_0 + \\beta_1 D + U + \\varepsilon, \\quad \\text{where } \\text{Cov}(D, U) \\ne 0',
        note: {
          en: 'Structural equation with endogeneity: OLS yields β̂_OLS = β_1 + Cov(D, U) / Var(D)',
          ar: 'المعادلة الهيكلية مع وجود المتغير الداخلي: يعطي OLS تقديراً متحيزاً بمقدار Cov(D, U) / Var(D)',
        },
      },
      {
        step: '\\text{Stage 1: } \\hat{D} = \\hat{\\pi}_0 + \\hat{\\pi}_1 Z, \\quad \\text{Relevance: } \\pi_1 \\ne 0, \\; F > 10',
        note: {
          en: 'First stage isolates the exogenous part of treatment driven by the instrument',
          ar: 'المرحلة الأولى تعزل الجزء الخارجي من المعالجة المدفوع بالمتغير الصوري، بشرط F > 10',
        },
      },
      {
        step: '\\text{Stage 2: } Y = \\alpha_0 + \\beta_{\\text{IV}} \\hat{D} + e',
        note: {
          en: 'Second stage produces an asymptotically unbiased causal estimate of β_1',
          ar: 'المرحلة الثانية تنتج مقدراً سببياً غير متحيز تقاربياً للمعامل الحقيقي β_1',
        },
      },
    ],
  },
  code: {
    snippet: `import numpy as np
from statsmodels.sandbox.regression.gmm import IV2SLS

# Synthetic econometric data generating process
n = 1000
u = np.random.normal(0, 1, n)       # Unobserved ability
z = np.random.normal(0, 1, n)       # Exogenous instrument (e.g. proximity)
d = 0.8 * z + 0.6 * u + np.random.normal(0, 0.5, n) # Education
y = 1.5 * d + 0.9 * u + np.random.normal(0, 0.5, n) # Wage (True beta = 1.5)

# 1. Naive OLS (Biased by Cov(D, U))
b_ols = np.cov(d, y)[0, 1] / np.var(d)
print(f"Naive OLS: β̂ = {b_ols:.2f} (Biased upwards!)")

# 2. 2-Stage Least Squares (2SLS)
model_2sls = IV2SLS(y, d, z).fit()
print(f"2SLS IV:   β̂ = {model_2sls.params[0]:.2f} (Recovers True β = 1.50)")`,
    explanation: {
      en: 'Standard 2SLS implementation using statsmodels recovering true causal parameters despite unobserved confounder U.',
      ar: 'تطبيق قياسي لـ 2SLS باستخدام statsmodels لاستعادة المعامل السببي الحقيقي رغم وجود المتغير المشوش غير المرصود U.',
    },
  },
};

export const InstrumentalVariablesLab: React.FC<{ compact?: boolean }> = ({ compact }) => {
  const { language, config } = useOkvirStore();

  const [trueBeta] = useState(1.5);
  const [relevance, setRelevance] = useState(0.85); // Z -> D strength
  const [confounding, setConfounding] = useState(0.75); // U -> D & U -> Y strength
  const [violateExogeneity, setViolateExogeneity] = useState(false); // Direct Z -> Y leak

  // Generate synthetic econometric dataset
  const sampleData: SimDataPoint[] = useMemo(() => {
    const points: SimDataPoint[] = [];
    const n = 120;
    // deterministic pseudo-random sequence for smooth interaction
    for (let i = 0; i < n; i++) {
      const seed1 = Math.sin(i * 12.9898) * 43758.5453;
      const seed2 = Math.cos(i * 78.233) * 43758.5453;
      const seed3 = Math.sin(i * 45.164) * 23421.631;

      const z = (seed1 - Math.floor(seed1)) * 4 - 2; // Uniform [-2, 2]
      const u = (seed2 - Math.floor(seed2)) * 3 - 1.5; // Unobserved confounder
      const noise = (seed3 - Math.floor(seed3)) * 0.8 - 0.4;

      // Treatment D
      const d = relevance * z + confounding * u + noise;
      // First stage prediction
      const dHat = relevance * z;
      // Outcome Y (with optional exogeneity leak direct from Z)
      const directLeak = violateExogeneity ? 1.2 * z : 0;
      const y = trueBeta * d + confounding * u + directLeak + noise * 0.5;

      points.push({ z, u, d, dHat, y });
    }
    return points;
  }, [relevance, confounding, violateExogeneity, trueBeta]);

  // Econometric calculations
  const stats = useMemo(() => {
    const n = sampleData.length;
    let sumD = 0;
    let sumY = 0;
    let sumZ = 0;
    let sumDHat = 0;

    sampleData.forEach((p) => {
      sumD += p.d;
      sumY += p.y;
      sumZ += p.z;
      sumDHat += p.dHat;
    });

    const mD = sumD / n;
    const mY = sumY / n;
    const mZ = sumZ / n;
    const mDHat = sumDHat / n;

    let covDY = 0;
    let varD = 0;
    let covZY = 0;
    let covZD = 0;
    let varZ = 0;
    let covDHatY = 0;
    let varDHat = 0;

    sampleData.forEach((p) => {
      covDY += (p.d - mD) * (p.y - mY);
      varD += (p.d - mD) ** 2;
      covZY += (p.z - mZ) * (p.y - mY);
      covZD += (p.z - mZ) * (p.d - mD);
      varZ += (p.z - mZ) ** 2;
      covDHatY += (p.dHat - mDHat) * (p.y - mY);
      varDHat += (p.dHat - mDHat) ** 2;
    });

    const betaOLS = varD > 0 ? covDY / varD : 0;
    const betaWald = Math.abs(covZD) > 0.001 ? covZY / covZD : 0;
    const beta2SLS = varDHat > 0 ? covDHatY / varDHat : 0;
    const firstStageF = varZ > 0 ? (covZD / varZ) ** 2 * n * 0.8 : 0;

    return {
      betaOLS,
      betaWald,
      beta2SLS,
      firstStageF,
      ovb: betaOLS - trueBeta,
    };
  }, [sampleData, trueBeta]);

  return (
    <div className="flex flex-col gap-5 w-full">
      {!compact && <PreCanvasBriefing content={IV_PEDAGOGY} />}

      <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 lg:p-6 specular shadow-xl space-y-5">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-subtle)] pb-4">
          <div className="flex items-center gap-2">
            <Network size={18} className="text-[var(--math-gradient)]" />
            <h3 className="text-sm font-bold text-[var(--text-primary)]">
              {language === 'ar'
                ? 'مختبر المتغيرات الصورية والمربعات الصغرى ذات المرحلتين (2SLS)'
                : 'Instrumental Variables & 2-Stage Least Squares (2SLS)'}
            </h3>
          </div>

          {/* Exogeneity Toggle Button */}
          <button
            onClick={() => {
              setViolateExogeneity(!violateExogeneity);
              if (config.soundEnabled) audio.playClick();
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold border transition-all ${
              violateExogeneity
                ? 'bg-rose-500/20 text-rose-400 border-rose-500/40 animate-pulse'
                : 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30 hover:border-emerald-500/50'
            }`}
          >
            {violateExogeneity ? <AlertCircle size={13} /> : <CheckCircle2 size={13} />}
            <span>
              {violateExogeneity
                ? language === 'ar'
                  ? 'انتهاك قيد الاستبعاد (Cov(Z, ε) ≠ 0)'
                  : 'Violate Exclusion (Z → Y Leak)'
                : language === 'ar'
                ? 'قيد الاستبعاد سليم (Z ⊥ ε)'
                : 'Exclusion Restriction Holds'}
            </span>
          </button>
        </div>

        {/* Causal DAG Interactive Diagram */}
        <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-app)]">
          <div className="text-[11px] font-mono text-[var(--text-secondary)] mb-3 flex items-center justify-between">
            <span>{language === 'ar' ? 'مخطط التوجيه السببي (Causal DAG)' : 'Causal Path Diagram (DAG)'}</span>
            <span className="text-[10px] text-[var(--text-tertiary)]">
              {language === 'ar' ? 'Z = المتغير الصوري • D = المعالجة • Y = النتيجة • U = المشوش المحذوف' : 'Z = Instrument • D = Treatment • Y = Outcome • U = Omitted Confounder'}
            </span>
          </div>

          <div className="flex items-center justify-around relative py-2">
            {/* Z Node */}
            <div className="flex flex-col items-center gap-1">
              <div className="w-12 h-12 rounded-xl bg-sky-500/15 border-2 border-sky-400 text-sky-400 flex items-center justify-center font-bold text-sm shadow-md">
                Z
              </div>
              <span className="text-[10px] font-mono text-sky-400">
                {language === 'ar' ? 'المتغير الصوري' : 'Instrument'}
              </span>
            </div>

            {/* Z -> D arrow */}
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-mono text-[var(--text-tertiary)]">π₁ = {relevance.toFixed(2)}</span>
              <ArrowRight size={20} className="text-sky-400" />
              <span className="text-[9px] font-mono text-emerald-400">
                {language === 'ar' ? 'ارتباط قوي' : 'Relevant'}
              </span>
            </div>

            {/* D Node */}
            <div className="flex flex-col items-center gap-1">
              <div className="w-12 h-12 rounded-xl bg-amber-500/15 border-2 border-amber-400 text-amber-400 flex items-center justify-center font-bold text-sm shadow-md">
                D
              </div>
              <span className="text-[10px] font-mono text-amber-400">
                {language === 'ar' ? 'المعالجة' : 'Treatment'}
              </span>
            </div>

            {/* D -> Y arrow */}
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-mono text-[var(--text-tertiary)]">β = {trueBeta.toFixed(2)}</span>
              <ArrowRight size={20} className="text-[var(--text-primary)]" />
              <span className="text-[9px] font-mono text-[var(--text-secondary)]">
                {language === 'ar' ? 'الأثر السببي' : 'True Effect'}
              </span>
            </div>

            {/* Y Node */}
            <div className="flex flex-col items-center gap-1">
              <div className="w-12 h-12 rounded-xl bg-purple-500/15 border-2 border-purple-400 text-purple-400 flex items-center justify-center font-bold text-sm shadow-md">
                Y
              </div>
              <span className="text-[10px] font-mono text-purple-400">
                {language === 'ar' ? 'النتيجة' : 'Outcome'}
              </span>
            </div>

            {/* U Confounder (Floating Top Center) */}
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 flex flex-col items-center">
              <div className="px-3 py-1 rounded-full bg-rose-500/15 border border-rose-400 text-rose-400 font-mono text-xs font-semibold flex items-center gap-1">
                <span>U ({language === 'ar' ? 'مشوش خفي' : 'Confounder'})</span>
              </div>
              <div className="text-[9px] font-mono text-rose-400 mt-0.5">
                {language === 'ar' ? 'مسار خلفي ملوث: D ← U → Y' : 'Back-door path: D ← U → Y'}
              </div>
            </div>
          </div>
        </div>

        {/* Live Estimator Comparison HUD */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-app)]">
            <span className="text-[10px] font-mono text-[var(--text-tertiary)] block">
              {language === 'ar' ? 'الأثر الحقيقي β' : 'True Parameter β'}
            </span>
            <span className="text-sm font-mono font-bold text-[var(--text-primary)] tabular-nums">
              β = {trueBeta.toFixed(2)}
            </span>
          </div>

          <div className="p-3 rounded-xl border border-rose-500/30 bg-rose-500/5">
            <span className="text-[10px] font-mono text-rose-400 block">
              {language === 'ar' ? 'تقدير OLS الساذج' : 'Naive OLS Estimate'}
            </span>
            <span className="text-sm font-mono font-bold text-rose-400 tabular-nums">
              β̂_OLS = {stats.betaOLS.toFixed(2)}
            </span>
            <span className="text-[9px] font-mono text-rose-300 block mt-0.5">
              OVB = +{stats.ovb.toFixed(2)}
            </span>
          </div>

          <div
            className={`p-3 rounded-xl border transition-colors ${
              violateExogeneity
                ? 'border-rose-500/40 bg-rose-500/10'
                : 'border-emerald-500/40 bg-emerald-500/10'
            }`}
          >
            <span
              className={`text-[10px] font-mono block ${
                violateExogeneity ? 'text-rose-400' : 'text-emerald-400'
              }`}
            >
              {language === 'ar' ? 'تقدير 2SLS / فالد' : '2SLS / Wald IV Estimate'}
            </span>
            <span
              className={`text-sm font-mono font-bold tabular-nums ${
                violateExogeneity ? 'text-rose-400' : 'text-emerald-400 font-extrabold'
              }`}
            >
              β̂_IV = {stats.beta2SLS.toFixed(2)}
            </span>
            <span className="text-[9px] font-mono text-[var(--text-tertiary)] block mt-0.5">
              {violateExogeneity
                ? language === 'ar'
                  ? 'منهار بسبب انتهاك الاستبعاد!'
                  : 'Biased! Exclusion violated'
                : language === 'ar'
                ? 'مطهر من التحيز ✓'
                : 'Sanitized of U ✓'}
            </span>
          </div>

          <div className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-app)]">
            <span className="text-[10px] font-mono text-[var(--text-tertiary)] block">
              {language === 'ar' ? 'إحصائية F للمرحلة الأولى' : 'First-Stage F-Statistic'}
            </span>
            <span
              className={`text-sm font-mono font-bold tabular-nums ${
                stats.firstStageF > 10 ? 'text-emerald-400' : 'text-amber-400'
              }`}
            >
              F = {stats.firstStageF.toFixed(1)}
            </span>
            <span className="text-[9px] font-mono text-[var(--text-tertiary)] block mt-0.5">
              {stats.firstStageF > 10
                ? language === 'ar'
                  ? 'أداة قوية (F > 10)'
                  : 'Strong Instrument (F > 10)'
                : language === 'ar'
                ? 'أداة ضعيفة (خطر تضخيم الخطأ)'
                : 'Weak Instrument Risk'}
            </span>
          </div>
        </div>

        {/* Sliders Panel */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-[var(--border-subtle)]">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[var(--text-secondary)] flex items-center gap-1.5">
                <Sliders size={13} className="text-sky-400" />
                <span>{language === 'ar' ? 'قوة المتغير الصوري (Relevance π₁)' : 'Instrument Relevance (π₁)'}:</span>
              </span>
              <strong className="text-[var(--text-primary)] tabular-nums">{relevance.toFixed(2)}</strong>
            </div>
            <input
              type="range"
              min="0.1"
              max="1.5"
              step="0.05"
              value={relevance}
              onChange={(e) => setRelevance(parseFloat(e.target.value))}
              className="w-full accent-sky-400 cursor-pointer"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[var(--text-secondary)] flex items-center gap-1.5">
                <Sliders size={13} className="text-rose-400" />
                <span>{language === 'ar' ? 'شدة التشويش الخفي (Confounding U)' : 'Confounding Strength (U)'}:</span>
              </span>
              <strong className="text-[var(--text-primary)] tabular-nums">{confounding.toFixed(2)}</strong>
            </div>
            <input
              type="range"
              min="0.0"
              max="1.5"
              step="0.05"
              value={confounding}
              onChange={(e) => setConfounding(parseFloat(e.target.value))}
              className="w-full accent-rose-400 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {!compact && <PostCanvasConsolidation content={IV_PEDAGOGY} />}
    </div>
  );
};

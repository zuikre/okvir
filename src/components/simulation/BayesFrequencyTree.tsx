import React, { useState } from 'react';
import { useOkvirStore } from '@/lib/store';
import { audio } from '@/lib/audio';

export const BayesFrequencyTree: React.FC = () => {
  const { language, config } = useOkvirStore();

  const [prevalencePct, setPrevalencePct] = useState(1.0); // 1.0%
  const [sensitivityPct, setSensitivityPct] = useState(95.0); // 95%
  const [falsePositivePct, setFalsePositivePct] = useState(5.0); // 5%

  const totalPop = 10000;
  const pDisease = prevalencePct / 100;
  const pSensitivity = sensitivityPct / 100;
  const pFalsePos = falsePositivePct / 100;

  // Counts out of 10,000
  const sickCount = Math.round(totalPop * pDisease);
  const healthyCount = totalPop - sickCount;

  const truePositives = Math.round(sickCount * pSensitivity);
  const falseNegatives = sickCount - truePositives;

  const falsePositives = Math.round(healthyCount * pFalsePos);
  const trueNegatives = healthyCount - falsePositives;

  const totalPositives = truePositives + falsePositives;
  const posteriorPct = totalPositives > 0 ? (truePositives / totalPositives) * 100 : 0;

  const handleSliderChange = (setter: React.Dispatch<React.SetStateAction<number>>, val: number) => {
    setter(val);
    if (config.soundEnabled) audio.playClick();
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Interactive Parameter Controls */}
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
            max="10.0"
            step="0.1"
            value={prevalencePct}
            onChange={(e) => handleSliderChange(setPrevalencePct, parseFloat(e.target.value))}
            className="w-full accent-[var(--math-vector)] cursor-pointer"
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
            className="w-full accent-[var(--math-data)] cursor-pointer"
          />
          <div className="text-[10px] text-[var(--text-tertiary)] font-mono">
            {language === 'ar' ? 'معدل الإيجابي الحقيقي' : 'True Positive Rate'}
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
            className="w-full accent-[var(--math-loss)] cursor-pointer"
          />
          <div className="text-[10px] text-[var(--text-tertiary)] font-mono">
            {falsePositives} {language === 'ar' ? 'إنذار خاطئ' : 'false alarms'}
          </div>
        </div>
      </div>

      {/* Visual Natural Frequency Tree */}
      <div className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-app)] space-y-6">
        <div className="text-center font-mono text-xs text-[var(--text-tertiary)] uppercase tracking-wider">
          {language === 'ar' ? 'شجرة التكرارات الطبيعية (من عينة 10,000 شخص)' : 'Natural Frequency Tree (Sample of 10,000 Individuals)'}
        </div>

        {/* Tree Nodes Flow */}
        <div className="flex flex-col items-center gap-4">
          {/* Root: Total Pop */}
          <div className="px-4 py-2 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface)] text-center font-mono shadow-sm">
            <div className="text-[10px] text-[var(--text-tertiary)]">{language === 'ar' ? 'إجمالي السكان' : 'Total Population'}</div>
            <div className="text-base font-bold text-[var(--text-primary)] tabular-nums">{totalPop.toLocaleString()}</div>
          </div>

          {/* Level 1: Sick vs Healthy */}
          <div className="grid grid-cols-2 gap-8 w-full max-w-lg">
            <div className="p-3 rounded-xl border border-emerald-500/30 bg-emerald-500/5 text-center font-mono">
              <div className="text-[10px] text-emerald-400 font-semibold">{language === 'ar' ? 'مصابون P(D)' : 'Condition Present'}</div>
              <div className="text-sm font-bold text-emerald-300 tabular-nums">{sickCount}</div>
            </div>

            <div className="p-3 rounded-xl border border-sky-500/30 bg-sky-500/5 text-center font-mono">
              <div className="text-[10px] text-sky-400 font-semibold">{language === 'ar' ? 'أصحاء P(¬D)' : 'Condition Absent'}</div>
              <div className="text-sm font-bold text-sky-300 tabular-nums">{healthyCount.toLocaleString()}</div>
            </div>
          </div>

          {/* Level 2: Test Outcomes */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full">
            {/* True Positives */}
            <div className="p-3 rounded-xl border-2 border-emerald-500/50 bg-emerald-500/10 text-center font-mono">
              <div className="text-[10px] text-emerald-400 font-bold uppercase">{language === 'ar' ? 'إيجابي حقيقي' : 'True Positive'}</div>
              <div className="text-lg font-bold text-emerald-300 tabular-nums">{truePositives}</div>
              <div className="text-[9px] text-[var(--text-tertiary)]">{language === 'ar' ? 'مصاب واختباره إيجابي' : 'Sick + Tested +'}</div>
            </div>

            {/* False Negatives */}
            <div className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-center font-mono opacity-60">
              <div className="text-[10px] text-[var(--text-tertiary)]">{language === 'ar' ? 'سلبي كاذب' : 'False Negative'}</div>
              <div className="text-sm font-bold text-[var(--text-secondary)] tabular-nums">{falseNegatives}</div>
              <div className="text-[9px] text-[var(--text-tertiary)]">{language === 'ar' ? 'مصاب واختباره سلبي' : 'Sick + Tested -'}</div>
            </div>

            {/* False Positives */}
            <div className="p-3 rounded-xl border-2 border-rose-500/50 bg-rose-500/10 text-center font-mono">
              <div className="text-[10px] text-rose-400 font-bold uppercase">{language === 'ar' ? 'إيجابي كاذب' : 'False Positive'}</div>
              <div className="text-lg font-bold text-rose-300 tabular-nums">{falsePositives}</div>
              <div className="text-[9px] text-[var(--text-tertiary)]">{language === 'ar' ? 'سليم واختباره إيجابي' : 'Healthy + Tested +'}</div>
            </div>

            {/* True Negatives */}
            <div className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-center font-mono opacity-60">
              <div className="text-[10px] text-[var(--text-tertiary)]">{language === 'ar' ? 'سلبي حقيقي' : 'True Negative'}</div>
              <div className="text-sm font-bold text-[var(--text-secondary)] tabular-nums">{trueNegatives.toLocaleString()}</div>
              <div className="text-[9px] text-[var(--text-tertiary)]">{language === 'ar' ? 'سليم واختباره سلبي' : 'Healthy + Tested -'}</div>
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
    </div>
  );
};

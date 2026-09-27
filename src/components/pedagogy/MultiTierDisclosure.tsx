import React, { useState } from 'react';
import { Eye, Shapes, Sigma, Terminal, ChevronRight } from 'lucide-react';
import { KaTeXMath } from '@/components/common/KaTeXMath';
import { useOkvirStore } from '@/lib/store';

export type DisclosureTier = 1 | 2 | 3 | 4;

export interface TierContent {
  intuition: {
    analogy: { en: string; ar: string };
    keyTakeaway: { en: string; ar: string };
  };
  geometry: {
    visualDescription: { en: string; ar: string };
    conservedQuantity: { en: string; ar: string };
  };
  formal: {
    equation: string;
    derivationSteps: { step: string; note: { en: string; ar: string } }[];
  };
  code: {
    snippet: string;
    explanation: { en: string; ar: string };
  };
}

interface MultiTierDisclosureProps {
  content: TierContent;
  defaultTier?: DisclosureTier;
  onTierChange?: (tier: DisclosureTier) => void;
}

export const MultiTierDisclosure: React.FC<MultiTierDisclosureProps> = ({
  content,
  defaultTier = 1,
  onTierChange,
}) => {
  const [activeTier, setActiveTier] = useState<DisclosureTier>(defaultTier);
  const { language } = useOkvirStore();

  const handleSelectTier = (t: DisclosureTier) => {
    setActiveTier(t);
    onTierChange?.(t);
  };

  const tabs: { tier: DisclosureTier; label: { en: string; ar: string }; icon: React.ReactNode }[] = [
    { tier: 1, label: { en: '1. Intuition', ar: '١. الحدس الفطري' }, icon: <Eye size={13} /> },
    { tier: 2, label: { en: '2. Geometry', ar: '٢. الهندسة الفضائية' }, icon: <Shapes size={13} /> },
    { tier: 3, label: { en: '3. Mathematical Proof', ar: '٣. البرهان الرياضي' }, icon: <Sigma size={13} /> },
    { tier: 4, label: { en: '4. Vectorized Code', ar: '٤. الكود المصفوفي' }, icon: <Terminal size={13} /> },
  ];

  return (
    <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] specular space-y-4">
      {/* Tier Selector Bar */}
      <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-app)]">
        {tabs.map((tab) => {
          const isActive = activeTier === tab.tier;
          return (
            <button
              key={tab.tier}
              onClick={() => handleSelectTier(tab.tier)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono font-medium transition-all ${
                isActive
                  ? 'bg-[var(--math-gradient)] text-black font-semibold shadow-sm'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-hover)]'
              }`}
            >
              {tab.icon}
              <span>{tab.label[language]}</span>
            </button>
          );
        })}
      </div>

      {/* Tier 1: Intuition */}
      {activeTier === 1 && (
        <div className="space-y-3 slide-up">
          <div className="p-3.5 rounded-lg border border-amber-500/20 bg-amber-500/5 space-y-2">
            <div className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-semibold">
              {language === 'ar' ? 'الحدس الفيزيائي والمجاز التمثيلي' : 'Physical Analogy & Mental Model'}
            </div>
            <p className="text-xs text-[var(--text-primary)] leading-relaxed">
              {content.intuition.analogy[language]}
            </p>
          </div>

          <div className="flex items-start gap-2 text-xs text-[var(--text-secondary)] font-mono">
            <ChevronRight size={14} className="text-emerald-400 shrink-0 mt-0.5" />
            <span>
              <strong className="text-[var(--text-primary)]">{language === 'ar' ? 'المغزى الجوهري: ' : 'Key Takeaway: '}</strong>
              {content.intuition.keyTakeaway[language]}
            </span>
          </div>
        </div>
      )}

      {/* Tier 2: Geometry */}
      {activeTier === 2 && (
        <div className="space-y-3 slide-up">
          <div className="p-3.5 rounded-lg border border-sky-500/20 bg-sky-500/5 space-y-2">
            <div className="text-[11px] font-mono uppercase tracking-wider text-sky-400 font-semibold">
              {language === 'ar' ? 'الآلية الهندسية وتوزيع الفضاء' : 'Spatial Mechanics & Geometric Constraints'}
            </div>
            <p className="text-xs text-[var(--text-primary)] leading-relaxed">
              {content.geometry.visualDescription[language]}
            </p>
          </div>

          <div className="flex items-center gap-2 p-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-app)] text-xs font-mono text-[var(--text-secondary)]">
            <span className="text-sky-400 font-semibold">{language === 'ar' ? 'المقدار المحفوظ:' : 'Conserved Quantity:'}</span>
            <span className="text-[var(--text-primary)]">{content.geometry.conservedQuantity[language]}</span>
          </div>
        </div>
      )}

      {/* Tier 3: Mathematical Formalism */}
      {activeTier === 3 && (
        <div className="space-y-3 slide-up">
          <div className="p-3.5 rounded-lg border border-purple-500/20 bg-purple-500/5 space-y-2.5">
            <div className="text-[11px] font-mono uppercase tracking-wider text-purple-400 font-semibold">
              {language === 'ar' ? 'الصيغة الرياضية والحل التحليلي المغلق' : 'Analytical Closed-Form Equation'}
            </div>
            <div dir="ltr" className="py-1">
              <KaTeXMath math={content.formal.equation} block />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="text-[11px] font-mono text-[var(--text-tertiary)] uppercase tracking-wider">
              {language === 'ar' ? 'خطوات الاشتقاق التحليلي:' : 'Analytical Derivation Steps:'}
            </div>
            {content.formal.derivationSteps.map((step, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-app)] flex flex-col md:flex-row md:items-center justify-between gap-2 text-xs font-mono"
              >
                <div dir="ltr" className="text-sky-400">
                  <KaTeXMath math={step.step} />
                </div>
                <div className="text-[11px] text-[var(--text-secondary)]">
                  {step.note[language]}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tier 4: Vectorized Code */}
      {activeTier === 4 && (
        <div className="space-y-3 slide-up">
          <div className="p-3.5 rounded-lg border border-emerald-500/20 bg-emerald-500/5 space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-semibold">
                {language === 'ar' ? 'الكود الإنتاجي المتجه (NumPy/PyTorch)' : 'Production Vectorized Implementation'}
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                O(1) Memory Layout
              </span>
            </div>
            <div dir="ltr" className="p-3 rounded-lg bg-black/60 border border-[var(--border-subtle)] text-[11px] font-mono text-emerald-300 overflow-x-auto">
              <pre>{content.code.snippet}</pre>
            </div>
          </div>

          <p className="text-xs text-[var(--text-secondary)] font-mono leading-relaxed">
            {content.code.explanation[language]}
          </p>
        </div>
      )}
    </div>
  );
};

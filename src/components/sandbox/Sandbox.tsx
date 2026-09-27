import React from 'react';
import { FlaskConical } from 'lucide-react';
import { useOkvirStore } from '@/lib/store';
import { tr } from '@/lib/i18n';
import { SimulationView } from '@/components/simulation/SimulationView';
import type { SimulationType } from '@/lib/types';

const SIM_TABS: { type: SimulationType; label: { en: string; ar: string } }[] = [
  { type: 'ols', label: { en: 'OLS Regression', ar: 'انحدار OLS' } },
  { type: 'vectors', label: { en: 'Vector Geometry', ar: 'هندسة المتجهات' } },
  { type: 'bayes', label: { en: 'Bayes Frequency', ar: 'شجرة بايز' } },
  { type: 'knn', label: { en: 'KNN Radar', ar: 'رادار KNN' } },
  { type: 'gradient', label: { en: 'Gradient Descent', ar: 'الانحدار التدرجي' } },
  { type: 'kmeans', label: { en: 'K-Means Voronoi', ar: 'فورونوي K-Means' } },
  { type: 'tree', label: { en: 'Decision Tree', ar: 'شجرة القرار' } },
  { type: 'neural', label: { en: 'Neural Activation', ar: 'تفعيل الخلية العصبية' } },
  { type: 'attention', label: { en: 'Self-Attention', ar: 'الانتباه الذاتي' } },
  { type: 'conv', label: { en: '2D Convolution', ar: 'الالتفاف المكاني 2D' } },
  { type: 'regularization', label: { en: 'L1 vs L2 Geometry', ar: 'هندسة الانتظام L1/L2' } },
  { type: 'simpson', label: { en: "Simpson's Paradox", ar: 'مفارقة سيمبسون' } },
];

export const Sandbox: React.FC = () => {
  const { activeSimulation, setActiveSimulation, language } = useOkvirStore();

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <FlaskConical size={20} className="text-[var(--math-prediction)]" />
            <h1 className="text-2xl font-bold text-[var(--text-primary)]">
              {tr('sandboxTitle', language)}
            </h1>
          </div>
          <p className="text-sm text-[var(--text-secondary)]">
            {tr('sandboxDesc', language)}
          </p>
        </div>

        {/* Tab bar */}
        <div className="flex flex-wrap items-center gap-1.5 mb-6 p-1.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]">
          {SIM_TABS.map((tab) => (
            <button
              key={tab.type}
              onClick={() => setActiveSimulation(tab.type)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeSimulation === tab.type
                  ? 'bg-[var(--bg-surface-hover)] text-[var(--text-primary)] border border-[var(--border-strong)] shadow-sm'
                  : 'text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] hover:bg-[var(--bg-app)]'
              }`}
            >
              {tab.label[language]}
            </button>
          ))}
        </div>

        <SimulationView type={activeSimulation} />
      </div>
    </div>
  );
};

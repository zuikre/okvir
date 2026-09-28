import React from 'react';
import { KaTeXMath } from '@/components/common/KaTeXMath';
import { useFormulaAnchorStore } from '@/lib/formulaAnchorStore';
import { useOkvirStore } from '@/lib/store';
import type { ReactiveFormulaToken } from '@/lib/types';
import { Sparkles, Sliders } from 'lucide-react';

interface ReactiveFormulaAnnotatorProps {
  formula: string;
  tokens: ReactiveFormulaToken[];
  className?: string;
}

export const ReactiveFormulaAnnotator: React.FC<ReactiveFormulaAnnotatorProps> = ({
  formula,
  tokens,
  className = '',
}) => {
  const { language } = useOkvirStore();
  const isAr = language === 'ar';
  const { activeToken, setActiveToken } = useFormulaAnchorStore();

  const currentTokenMeta = tokens.find((t) => t.symbol === activeToken || t.boundStateKey === activeToken);

  return (
    <div
      className={`p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3 text-xs text-[var(--text-secondary)]">
        <div className="flex items-center gap-1.5 text-[var(--math-prediction)] font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>
            {isAr ? 'المعادلة التفاعلية (انقر للربط الهندسي)' : 'REACTIVE FORMULA (CLICK TO ANCHOR)'}
          </span>
        </div>
        <span className="text-[11px] text-[var(--text-tertiary)] flex items-center gap-1">
          <Sliders className="w-3 h-3" />
          {isAr ? 'روابط بريت فيكتور الحية' : 'Bret Victor Live Reactive Links'}
        </span>
      </div>

      {/* Main KaTeX Display */}
      <div className="py-2 px-4 rounded-lg bg-[var(--bg-app)] border border-[var(--border-subtle)] overflow-x-auto text-center">
        <KaTeXMath
          math={formula}
          block
          onHoverVariable={(varName) => setActiveToken(varName, 'formula')}
        />
      </div>

      {/* Interactive Token Pills */}
      <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-[var(--border-subtle)]">
        {tokens.map((token) => {
          const isActive = activeToken === token.boundStateKey || activeToken === token.symbol;
          return (
            <button
              key={token.boundStateKey}
              onClick={() => setActiveToken(isActive ? null : token.boundStateKey, 'formula')}
              className={`px-2.5 py-1 rounded-md text-xs font-mono transition-all flex items-center gap-1.5 ${
                isActive
                  ? 'bg-[var(--math-prediction)] text-white shadow-sm ring-1 ring-white/20'
                  : 'bg-[var(--bg-app)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)]'
              }`}
            >
              <span className="font-bold">{token.symbol}</span>
              <span className="text-[10px] opacity-75">
                ({isAr ? (token.role === 'parameter' ? 'معلمة' : token.role === 'loss' ? 'دالة خسارة' : 'ملاحظة') : token.role})
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Token Geometric Meaning Card */}
      {currentTokenMeta && (
        <div className="mt-3 p-3 rounded-lg border border-[var(--border-strong)] bg-[var(--bg-surface-active)] text-xs animate-fade-in">
          <div className="flex items-center gap-2 font-bold text-[var(--math-prediction)] mb-1">
            <span className="font-mono text-sm">{currentTokenMeta.symbol}</span>
            <span>—</span>
            <span>{isAr ? currentTokenMeta.tooltip.ar : currentTokenMeta.tooltip.en}</span>
          </div>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            {isAr
              ? currentTokenMeta.geometricMeaning.ar
              : currentTokenMeta.geometricMeaning.en}
          </p>
        </div>
      )}
    </div>
  );
};

import React from 'react';
import { Columns, RefreshCw, Sparkles } from 'lucide-react';
import { useOkvirStore } from '@/lib/store';
import { tr } from '@/lib/i18n';
import type { SupportedCodeLanguage } from '@/lib/types';
import { LANGUAGE_REGISTRY } from '@/lib/toolchain-service';

interface LanguageSwitcherTabsProps {
  currentLanguage: SupportedCodeLanguage;
  availableLanguages?: SupportedCodeLanguage[];
  onSelectLanguage: (lang: SupportedCodeLanguage) => void;
  isCompareMode: boolean;
  onToggleCompareMode: () => void;
  hasNativeVariant?: boolean;
}

export const LanguageSwitcherTabs: React.FC<LanguageSwitcherTabsProps> = ({
  currentLanguage,
  availableLanguages = ['python', 'javascript', 'c', 'rust'],
  onSelectLanguage,
  isCompareMode,
  onToggleCompareMode,
  hasNativeVariant = true,
}) => {
  const { language, isLanguageSyncEnabled, setLanguageSync } = useOkvirStore();

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 bg-[var(--bg-surface)] border-b border-[var(--border-subtle)] text-xs select-none">
      {/* Language Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        {availableLanguages.map((langKey) => {
          const meta = LANGUAGE_REGISTRY[langKey];
          const isActive = currentLanguage === langKey;

          return (
            <button
              key={langKey}
              onClick={() => onSelectLanguage(langKey)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md font-mono transition-all text-xs ${
                isActive
                  ? 'bg-[var(--bg-surface-active)] text-[var(--text-primary)] border border-[var(--border-strong)] font-semibold shadow-sm'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-hover)] border border-transparent'
              }`}
              title={`Switch code to ${meta.name} (${meta.badge})`}
            >
              <span>{meta.icon}</span>
              <span>{meta.name}</span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--math-vector)] ml-0.5" />
              )}
            </button>
          );
        })}
      </div>

      {/* Right Controls: Global Sync & Rosetta Compare Mode */}
      <div className="flex items-center gap-2">
        {!hasNativeVariant && (
          <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-[var(--math-gradient)] bg-[var(--bg-surface-active)] px-2 py-0.5 rounded border border-[var(--border-subtle)]">
            <Sparkles className="w-3 h-3" />
            {tr('synthesized', language)}
          </span>
        )}

        {/* Global Sync Button */}
        <button
          onClick={() => setLanguageSync(!isLanguageSyncEnabled)}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-sans transition-colors border ${
            isLanguageSyncEnabled
              ? 'bg-[var(--bg-surface-active)] text-[var(--math-vector)] border-[var(--border-strong)]'
              : 'bg-transparent text-[var(--text-tertiary)] border-[var(--border-subtle)] hover:text-[var(--text-primary)]'
          }`}
          title="When enabled, your preferred language synchronizes across all lessons"
        >
          <RefreshCw className={`w-3 h-3 ${isLanguageSyncEnabled ? 'text-[var(--math-vector)]' : 'text-[var(--text-tertiary)]'}`} />
          <span>{isLanguageSyncEnabled ? tr('syncOn', language) : tr('syncOff', language)}</span>
        </button>

        {/* Rosetta Compare Mode Toggle */}
        <button
          onClick={onToggleCompareMode}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-sans transition-all border ${
            isCompareMode
              ? 'bg-[var(--bg-surface-active)] text-[var(--text-primary)] border-[var(--border-strong)] font-medium'
              : 'bg-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] border-[var(--border-subtle)] hover:bg-[var(--bg-surface-hover)]'
          }`}
          title="Compare two programming languages side-by-side (Rosetta Mode)"
        >
          <Columns className="w-3 h-3" />
          <span>{tr('compare', language)}</span>
        </button>
      </div>
    </div>
  );
};

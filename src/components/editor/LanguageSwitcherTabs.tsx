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

const LanguageIcon: React.FC<{ lang: SupportedCodeLanguage; className?: string }> = ({
  lang,
  className = 'w-3.5 h-3.5 shrink-0',
}) => {
  switch (lang) {
    case 'python':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2c-3.3 0-5 1.7-5 3.5V8h5v1H5.5C3.7 9 2 10.7 2 14c0 3.3 1.7 5 3.5 5H7v-2.5c0-1.8 1.7-3.5 3.5-3.5h3.5v-1h-2V7c0-2.3 2-5 5-5H12z" />
          <path d="M12 22c3.3 0 5-1.7 5-3.5V16h-5v-1h6.5c1.8 0 3.5-1.7 3.5-5 0-3.3-1.7-5-3.5-5H17v2.5c0 1.8-1.7 3.5-3.5 3.5H10v1h2v5c0 2.3-2 5-5 5H12z" />
          <circle cx="8.5" cy="5.5" r="1" fill="currentColor" />
          <circle cx="15.5" cy="18.5" r="1" fill="currentColor" />
        </svg>
      );
    case 'javascript':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <path d="M3 3h18v18H3V3zm11.5 13.7c.6.9 1.5 1.5 2.7 1.5 1.4 0 2.2-.7 2.2-1.8 0-1.2-.8-1.7-2.2-2.3l-.8-.3c-2.1-.9-3.5-2-3.5-4.4 0-2.2 1.7-3.9 4.3-3.9 1.9 0 3.2.7 4.1 2.3l-2 1.3c-.5-.8-1.1-1.2-2.1-1.2-1 0-1.7.6-1.7 1.4 0 .9.6 1.4 1.9 1.9l.8.3c2.4 1 3.9 2.1 3.9 4.7 0 2.7-2.1 4.2-4.9 4.2-2.7 0-4.3-1.4-5.1-2.9l2.3-1.4zm-6.2.2c.4.7.8 1.3 1.6 1.3.8 0 1.3-.3 1.3-1.6V8.5h2.6v8.2c0 2.6-1.5 3.8-3.7 3.8-2 0-3.2-1-3.8-2.3l2-1.3z" />
        </svg>
      );
    case 'c':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 7.5A7.5 7.5 0 1 0 17 16.5" />
        </svg>
      );
    case 'rust':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <path d="M10 8h3a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2h-3V8z" />
          <path d="M10 12h2.5l2.5 4" />
          <path d="M10 8v8" />
        </svg>
      );
    case 'java':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
          <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
          <line x1="6" y1="1" x2="6" y2="4" />
          <line x1="10" y1="1" x2="10" y2="4" />
          <line x1="14" y1="1" x2="14" y2="4" />
        </svg>
      );
    case 'r':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 3v18h18" />
          <path d="m7 15 4-6 4 3 5-7" />
        </svg>
      );
    default:
      return null;
  }
};

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
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md font-mono transition-all text-xs whitespace-nowrap shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-[var(--bg-surface-active)] text-[var(--text-primary)] border border-[var(--border-strong)] font-semibold shadow-sm'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-hover)] border border-transparent'
              }`}
              title={`Switch code to ${meta.name} (${meta.badge})`}
            >
              <LanguageIcon lang={langKey} />
              <span className="whitespace-nowrap">{meta.name}</span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--math-vector)] ml-0.5 shrink-0" />
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

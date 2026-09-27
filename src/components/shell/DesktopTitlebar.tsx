import React from 'react';
import { Search, Sun, Moon, Languages, Flame, Zap, Settings } from 'lucide-react';
import { useOkvirStore } from '@/lib/store';
import { tr } from '@/lib/i18n';

export const DesktopTitlebar: React.FC = () => {
  const { theme, language, toggleTheme, setLanguage, xp, streakDays, setCommandPaletteOpen, setCurrentView } = useOkvirStore();

  return (
    <div className="h-12 flex items-center justify-between px-3.5 border-b border-[var(--border-subtle)] bg-[var(--bg-surface)] select-none shrink-0 sticky top-0 z-30">
      {/* Left: Native Window Controls & Brand Wordmark */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          <span
            className="w-3 h-3 rounded-full bg-[#ff5f57] inline-block cursor-pointer hover:brightness-110 border border-black/10"
            title={tr('close', language)}
          />
          <span
            className="w-3 h-3 rounded-full bg-[#febc2e] inline-block cursor-pointer hover:brightness-110 border border-black/10"
            title={tr('minimize', language)}
          />
          <span
            className="w-3 h-3 rounded-full bg-[#28c840] inline-block cursor-pointer hover:brightness-110 border border-black/10"
            title={tr('maximize', language)}
          />
        </div>

        <span className="w-px h-4 bg-[var(--border-subtle)]" />

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold tracking-wider font-mono text-[var(--text-primary)]">
            OKVIR <span className="text-[var(--text-secondary)] font-sans font-normal">(إطار)</span>
          </span>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[var(--border-subtle)] text-[var(--text-secondary)] border border-[var(--border-strong)]">
            v0.1.0-alpha
          </span>
        </div>
      </div>

      {/* Center: Command Palette Trigger */}
      <div className="flex items-center justify-center flex-1 max-w-lg mx-4">
        <button
          onClick={() => setCommandPaletteOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-app)] text-[var(--text-tertiary)] hover:border-[var(--border-strong)] hover:text-[var(--text-secondary)] transition-colors w-full justify-between group shadow-sm"
        >
          <div className="flex items-center gap-2 min-w-0">
            <Search size={13} className="shrink-0 text-[var(--text-tertiary)]" />
            <span className="text-xs truncate">
              {language === 'ar' ? 'ابحث عن مفهوم أو درس...' : 'Quick Search or Jump to Concept...'}
            </span>
          </div>
          <kbd className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-[var(--border-subtle)] text-[var(--text-tertiary)] border border-[var(--border-strong)] shrink-0">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right Utilities: Gamification & Preferences */}
      <div className="flex items-center gap-2.5">
        {/* Streak Indicator */}
        <button
          onClick={() => setCurrentView('settings')}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--bg-app)] border border-[var(--border-subtle)] text-xs font-mono font-medium text-amber-400 hover:border-amber-400/40 transition-colors"
          title="Daily Streak (View Local Data)"
        >
          <Flame size={13} className="text-amber-500 fill-amber-500/20" />
          <span className="tabular-nums">
            {streakDays} {language === 'ar' ? 'يوم' : 'Days'}
          </span>
        </button>

        {/* XP Indicator */}
        <button
          onClick={() => setCurrentView('settings')}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--bg-app)] border border-[var(--border-subtle)] text-xs font-mono font-medium text-emerald-400 hover:border-emerald-400/40 transition-colors"
          title="Experience Points (View Local Data)"
        >
          <Zap size={13} className="text-emerald-500 fill-emerald-500/20" />
          <span className="tabular-nums">{xp.toLocaleString()} XP</span>
        </button>

        <span className="w-px h-4 bg-[var(--border-subtle)]" />

        {/* Language Switcher */}
        <button
          onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-[var(--border-subtle)] hover:border-[var(--border-strong)] bg-[var(--bg-app)] text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          title="Switch Language (EN / العربية)"
        >
          <Languages size={13} />
          <span className="font-semibold">{language === 'en' ? 'عربي' : 'EN'}</span>
        </button>

        {/* Theme Switcher */}
        <button
          onClick={toggleTheme}
          className="p-1.5 rounded-md border border-[var(--border-subtle)] hover:border-[var(--border-strong)] bg-[var(--bg-app)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          title={theme === 'dark' ? 'Switch to Warm Paper (Light)' : 'Switch to OLED Charcoal (Dark)'}
        >
          {theme === 'dark' ? <Sun size={13} /> : <Moon size={13} />}
        </button>

        {/* Local Settings / Disk Storage */}
        <button
          onClick={() => setCurrentView('settings')}
          className="p-1.5 rounded-md border border-[var(--border-subtle)] hover:border-[var(--border-strong)] bg-[var(--bg-app)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          title={language === 'ar' ? 'الإعدادات والتخزين المحلي' : 'Settings & Local Storage'}
        >
          <Settings size={13} />
        </button>
      </div>
    </div>
  );
};

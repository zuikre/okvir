import { useEffect } from 'react';
import { useOkvirStore } from '@/lib/store';
import { DesktopTitlebar } from '@/components/shell/DesktopTitlebar';
import { CommandPalette } from '@/components/shell/CommandPalette';
import { RaycastActionBar } from '@/components/shell/RaycastActionBar';
import { SkillTree } from '@/components/constellation/SkillTree';
import { OkvirWorkbench } from '@/components/workbench/OkvirWorkbench';
import { DailyCalibration } from '@/components/review/DailyCalibration';
import { Sandbox } from '@/components/sandbox/Sandbox';
import { SettingsView } from '@/components/settings/SettingsView';

function App() {
  const {
    theme,
    language,
    config,
    currentView,
    isCommandPaletteOpen,
    setCommandPaletteOpen,
    setCurrentView,
  } = useOkvirStore();

  // Initialize theme + language + typography attributes on mount and sync SQLite profile
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', language);
    const activeFont = config.arabicFont || 'noto';
    document.documentElement.setAttribute('data-arabic-font', activeFont);
    useOkvirStore.getState().syncWithTauriProfile?.();
  }, [theme, language, config?.arabicFont]);

  // Global keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(!isCommandPaletteOpen);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isCommandPaletteOpen, setCommandPaletteOpen]);

  return (
    <div className="h-screen flex flex-col bg-[var(--bg-app)] text-[var(--text-primary)] overflow-hidden">
      <DesktopTitlebar />

      {/* Activity sidebar + main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Activity Bar (vertical) */}
        <div className="w-12 shrink-0 border-e border-[var(--border-subtle)] bg-[var(--bg-surface)] flex flex-col items-center py-3 gap-1">
          <ActivityButton
            active={currentView === 'constellation'}
            onClick={() => setCurrentView('constellation')}
            icon="network"
            label="Constellation"
          />
          <ActivityButton
            active={currentView === 'lesson'}
            onClick={() => setCurrentView('lesson')}
            icon="book"
            label="Lesson"
          />
          <ActivityButton
            active={currentView === 'sandbox'}
            onClick={() => setCurrentView('sandbox')}
            icon="flask"
            label="Sandbox"
          />
          <ActivityButton
            active={currentView === 'review'}
            onClick={() => setCurrentView('review')}
            icon="refresh"
            label="Review"
          />
          <div className="mt-auto">
            <ActivityButton
              active={currentView === 'settings'}
              onClick={() => setCurrentView('settings')}
              icon="settings"
              label="Settings & Local Storage"
            />
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {currentView === 'constellation' && <SkillTree />}
          {currentView === 'lesson' && <OkvirWorkbench />}
          {currentView === 'sandbox' && <Sandbox />}
          {currentView === 'review' && <DailyCalibration />}
          {currentView === 'settings' && <SettingsView />}
        </div>
      </div>

      <RaycastActionBar />
      <CommandPalette />
    </div>
  );
}

function ActivityButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: string;
  label: string;
}) {
  const iconMap: Record<string, React.ReactNode> = {
    network: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="5" r="2" /><circle cx="5" cy="19" r="2" /><circle cx="19" cy="19" r="2" />
        <line x1="12" y1="7" x2="5" y2="17" /><line x1="12" y1="7" x2="19" y2="17" />
      </svg>
    ),
    book: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
    flask: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 2v6L4 18a2 2 0 0 0 2 3h12a2 2 0 0 0 2-3L15 8V2" /><line x1="9" y1="2" x2="15" y2="2" />
      </svg>
    ),
    refresh: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" /><path d="M21 3v5h-5" />
        <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" /><path d="M3 21v-5h5" />
      </svg>
    ),
    settings: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
  };

  return (
    <button
      onClick={onClick}
      title={label}
      className={`relative w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
        active
          ? 'text-[var(--text-primary)] bg-[var(--bg-surface-hover)]'
          : 'text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]'
      }`}
    >
      {active && <span className="absolute -start-3 top-1/2 -translate-y-1/2 w-1 h-5 rounded-full bg-[var(--text-primary)]" />}
      {iconMap[icon]}
    </button>
  );
}

export default App;

import React, { useState, useEffect, useCallback } from 'react';
import { useOkvirStore } from '@/lib/store';
import { tr } from '@/lib/i18n';
import { ChevronDown, Keyboard } from 'lucide-react';

export const RaycastActionBar: React.FC = () => {
  const {
    language,
    setCommandPaletteOpen,
    isCommandPaletteOpen,
    currentView,
    setCurrentView,
    activeLessonId,
    lessons,
    updateLessonBeat,
  } = useOkvirStore();

  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleNextBeat = useCallback(() => {
    if (currentView === 'lesson') {
      const lesson = lessons[activeLessonId];
      if (lesson && lesson.currentBeat < 4) {
        updateLessonBeat(activeLessonId, (lesson.currentBeat + 1) as 1 | 2 | 3 | 4);
      }
    }
  }, [currentView, lessons, activeLessonId, updateLessonBeat]);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target && target.matches('input, textarea, select')) return;

      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(!isCommandPaletteOpen);
      } else if (e.key === 'd' || e.key === 'D') {
        e.preventDefault();
        setCurrentView('review');
      } else if (e.key === 'h' || e.key === 'H') {
        if (currentView === 'lesson') {
          e.preventDefault();
          window.dispatchEvent(new CustomEvent('okvir:toggle-hint'));
        }
      } else if (e.code === 'Space' && currentView === 'lesson') {
        e.preventDefault();
        handleNextBeat();
      } else if (e.key === '?' || (e.shiftKey && e.key === '/')) {
        e.preventDefault();
        setIsCollapsed((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandPaletteOpen, setCommandPaletteOpen, currentView, setCurrentView, handleNextBeat]);

  const actions = [
    {
      label: tr('actions', language),
      key: '⌘K',
      onClick: () => setCommandPaletteOpen(!isCommandPaletteOpen),
    },
    {
      label: tr('run', language),
      key: '⌘↵',
      onClick: () => {
        const runBtn = document.querySelector('button[title*="Run"], button:has(kbd)') as HTMLButtonElement;
        if (runBtn) runBtn.click();
      },
    },
    {
      label: tr('hint', language),
      key: 'H',
      onClick: () => {
        window.dispatchEvent(new CustomEvent('okvir:toggle-hint'));
      },
    },
    {
      label: tr('nextBeat', language),
      key: 'Space',
      onClick: handleNextBeat,
    },
    {
      label: language === 'ar' ? 'التدريب' : 'Daily Drill',
      key: 'D',
      onClick: () => setCurrentView('review'),
    },
  ];

  if (isCollapsed) {
    return (
      <button
        onClick={() => setIsCollapsed(false)}
        className="fixed bottom-3 end-5 z-40 flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[var(--border-strong)] bg-[var(--bg-surface)]/90 hover:bg-[var(--bg-surface-hover)] shadow-2xl backdrop-blur-xl specular text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all select-none group"
        title={language === 'ar' ? 'إظهار شريط الاختصارات [?]' : 'Expand Shortcuts [?]'}
      >
        <Keyboard size={13} className="text-[var(--math-gradient)] group-hover:scale-110 transition-transform" />
        <span className="text-[11px] font-semibold">⌘K</span>
      </button>
    );
  }

  return (
    <div
      className="fixed bottom-3 end-5 z-40 flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[var(--border-strong)] bg-[var(--bg-surface)]/90 shadow-2xl backdrop-blur-xl specular select-none slide-up"
      style={{ backdropFilter: 'blur(24px)' }}
    >
      {actions.map((action, i) => (
        <React.Fragment key={action.label}>
          <button
            onClick={action.onClick}
            className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors px-1 py-0.5 rounded whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span className="whitespace-nowrap">{action.label}</span>
            <kbd className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-[var(--border-subtle)] text-[var(--text-tertiary)] border border-[var(--border-strong)] shrink-0">
              {action.key}
            </kbd>
          </button>
          {i < actions.length - 1 && <span className="w-px h-3 bg-[var(--border-subtle)]" />}
        </React.Fragment>
      ))}

      {/* Minimize Button */}
      <span className="w-px h-3 bg-[var(--border-subtle)]" />
      <button
        onClick={() => setIsCollapsed(true)}
        className="p-1 rounded-full text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-hover)] transition-colors"
        title={language === 'ar' ? 'تصغير الشريط [?]' : 'Minimize shortcuts bar [?]'}
      >
        <ChevronDown size={13} />
      </button>
    </div>
  );
};

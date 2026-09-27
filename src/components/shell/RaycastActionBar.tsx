import React, { useEffect, useCallback } from 'react';
import { useOkvirStore } from '@/lib/store';
import { tr } from '@/lib/i18n';

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
        // Trigger run on code editor if in lesson beat 3
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

  return (
    <div
      className="fixed bottom-4 end-6 z-40 flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[var(--border-strong)] bg-[var(--bg-surface)]/90 shadow-2xl backdrop-blur-xl specular select-none"
      style={{ backdropFilter: 'blur(24px)' }}
    >
      {actions.map((action, i) => (
        <React.Fragment key={action.label}>
          <button
            onClick={action.onClick}
            className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors px-1 py-0.5 rounded"
          >
            <span>{action.label}</span>
            <kbd className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-[var(--border-subtle)] text-[var(--text-tertiary)] border border-[var(--border-strong)]">
              {action.key}
            </kbd>
          </button>
          {i < actions.length - 1 && <span className="w-px h-3 bg-[var(--border-subtle)]" />}
        </React.Fragment>
      ))}

      {currentView === 'lesson' && (
        <>
          <span className="w-px h-3 bg-[var(--border-subtle)]" />
          <span className="text-[10px] text-[var(--math-gradient)] font-mono px-1">
            4-Beat Mode
          </span>
        </>
      )}
    </div>
  );
};

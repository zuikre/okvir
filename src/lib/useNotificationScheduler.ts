import { useEffect, useRef } from 'react';
import { useOkvirStore } from './store';
import { OkvirNotifier } from './notifications';
import { tauriBridge } from './tauri-bridge';

export function useNotificationScheduler() {
  const {
    streakDays,
    language,
    config,
    fsrsCards,
    setCurrentView,
    setLastNotificationDate,
  } = useOkvirStore();

  const isRtl = language === 'ar';
  const hasCheckedRef = useRef(false);

  // Deep-link navigation listener from notification clicks
  useEffect(() => {
    const handleNavigate = (e: Event) => {
      const customEvent = e as CustomEvent<{ view: 'lesson' | 'review' | 'settings' | 'constellation' }>;
      if (customEvent.detail?.view) {
        setCurrentView(customEvent.detail.view);
      }
    };

    window.addEventListener('okvir:navigate', handleNavigate);
    return () => window.removeEventListener('okvir:navigate', handleNavigate);
  }, [setCurrentView]);

  // Periodic Habit Loop Evaluation
  useEffect(() => {
    if (!config.notificationsEnabled) return;

    const checkHabitTriggers = async () => {
      const now = new Date();
      const todayStr = now.toISOString().slice(0, 10);

      // Avoid double-notifying on the same day for streak alerts
      if (config.lastNotificationDate === todayStr) {
        return;
      }

      // 1. Streak Defense Check (Duolingo Engagement Model)
      if (config.streakRemindersEnabled !== false) {
        const streakDanger = OkvirNotifier.checkDailyStreakDanger(
          streakDays,
          config.lastActiveDate,
          isRtl,
          config.dailyReminderHour || 19
        );

        if (streakDanger) {
          const sent = await OkvirNotifier.dispatch(streakDanger);
          if (sent) {
            setLastNotificationDate(todayStr);
            return;
          }
        }
      }

      // 2. FSRS Spaced Repetition Due Cards Check (Brilliant Model)
      if (config.fsrsRemindersEnabled !== false && !hasCheckedRef.current) {
        hasCheckedRef.current = true;
        let dueCount = 0;

        // Try native SQLite due cards first
        if (tauriBridge.isTauri()) {
          try {
            const dueCards = await tauriBridge.getDueFsrsCards();
            dueCount = dueCards.length;
          } catch {
            // fallback to store
          }
        }

        if (dueCount === 0 && fsrsCards) {
          const nowMs = Date.now();
          dueCount = Object.values(fsrsCards).filter((c) => c && c.due <= nowMs).length;
        }

        if (dueCount >= 3) {
          const fsrsNotif = OkvirNotifier.checkFsrsReviewsDue(dueCount, isRtl);
          if (fsrsNotif) {
            // Send gently if between 10:00 and 18:00
            const currentHour = now.getHours();
            if (currentHour >= 11 && currentHour <= 18) {
              const sent = await OkvirNotifier.dispatch(fsrsNotif);
              if (sent) {
                setLastNotificationDate(todayStr);
              }
            }
          }
        }
      }
    };

    // Run check on mount after short initial delay
    const initialTimer = setTimeout(() => {
      checkHabitTriggers();
    }, 4000);

    // Re-check every 5 minutes
    const interval = setInterval(checkHabitTriggers, 5 * 60 * 1000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [
    config.notificationsEnabled,
    config.streakRemindersEnabled,
    config.fsrsRemindersEnabled,
    config.dailyReminderHour,
    config.lastNotificationDate,
    config.lastActiveDate,
    streakDays,
    isRtl,
    fsrsCards,
    setLastNotificationDate,
  ]);
}

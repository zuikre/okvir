import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Theme, Language, ViewName, SimulationType, BeatNumber, LessonProgress, LocalConfig, ArabicFontFamily, SupportedCodeLanguage, FSRSState, AppNotificationRecord } from './types';
import { initialLessons, curriculum } from './curriculum';
import { tauriBridge } from './tauri-bridge';
import { updateCard, createNewCard, type Rating } from './fsrs';
import { audio } from './audio';

export function recalculateLessonStatuses(lessons: Record<string, LessonProgress>): Record<string, LessonProgress> {
  const updated: Record<string, LessonProgress> = { ...initialLessons, ...lessons };
  curriculum.forEach((mod) => {
    let current = updated[mod.id];
    if (!current) {
      current = {
        id: mod.id,
        title: mod.title,
        titleAr: mod.titleAr,
        trackId: mod.trackId,
        status: mod.prerequisites.length === 0 ? 'available' : 'locked',
        currentBeat: 1 as BeatNumber,
        stability: 0,
        difficulty: 0,
        lastReviewed: null,
        completedBeats: [],
      };
      updated[mod.id] = current;
    }

    // Mastered concepts remain permanently mastered
    if (current.status === 'mastered') {
      return;
    }

    // Check if ALL prerequisites are mastered
    const allPrereqsMastered =
      mod.prerequisites.length === 0 ||
      mod.prerequisites.every((prereqId) => updated[prereqId]?.status === 'mastered');

    if (allPrereqsMastered) {
      updated[mod.id] = {
        ...current,
        status: current.status === 'in_progress' ? 'in_progress' : 'available',
      };
    } else {
      updated[mod.id] = {
        ...current,
        status: current.status === 'in_progress' ? 'in_progress' : 'locked',
      };
    }
  });
  return updated;
}

export interface OkvirState {
  theme: Theme;
  language: Language;
  toggleTheme: () => void;
  setLanguage: (lang: Language) => void;

  currentView: ViewName;
  activeLessonId: string;
  activeSimulation: SimulationType;
  isCommandPaletteOpen: boolean;
  setCurrentView: (view: ViewName) => void;
  setActiveLessonId: (id: string) => void;
  setActiveSimulation: (sim: SimulationType) => void;
  setCommandPaletteOpen: (open: boolean) => void;

  // Real local XP and streak tracking
  xp: number;
  streakDays: number;
  config: LocalConfig;
  addXp: (amount: number) => void;
  recordActivityToday: () => void;
  setUsername: (name: string) => void;
  setDailyXpGoal: (goal: number) => void;
  setPowerGovernor: (enabled: boolean) => void;
  setSoundEnabled: (enabled: boolean) => void;
  setPythonTimeout: (timeoutMs: number) => void;
  setArabicFont: (font: ArabicFontFamily) => void;
  setNotificationsEnabled: (enabled: boolean) => void;
  setDailyReminderHour: (hour: number) => void;
  setStreakRemindersEnabled: (enabled: boolean) => void;
  setFsrsRemindersEnabled: (enabled: boolean) => void;
  setLastNotificationDate: (dateStr: string) => void;
  exportLocalData: () => string;
  importLocalData: (jsonData: string) => boolean;
  resetAllData: () => void;

  // Simulation controls
  slope: number;
  intercept: number;
  knnK: number;
  learningRate: number;
  momentum: number;
  setSlope: (m: number) => void;
  setIntercept: (b: number) => void;
  setKnnK: (k: number) => void;
  setLearningRate: (lr: number) => void;
  setMomentum: (b: number) => void;

  // Multi-Language & Compiler Toolchain State
  preferredCodeLanguage: SupportedCodeLanguage;
  isLanguageSyncEnabled: boolean;
  activeToolchainId: string;
  compareCodeLanguage: SupportedCodeLanguage | null;
  setPreferredCodeLanguage: (lang: SupportedCodeLanguage) => void;
  setLanguageSync: (enabled: boolean) => void;
  setActiveToolchain: (id: string) => void;
  setCompareCodeLanguage: (lang: SupportedCodeLanguage | null) => void;

  // Curriculum progress
  lessons: Record<string, LessonProgress>;
  updateLessonBeat: (lessonId: string, beat: BeatNumber) => void;
  completeLesson: (lessonId: string) => void;
  certifyLessonMastery: (lessonId: string, scorePct: number) => { success: boolean; xpAwarded: number };
  startLesson: (lessonId: string) => void;
  syncWithTauriProfile: () => Promise<void>;

  // Spaced Repetition (FSRS-4.5)
  fsrsCards: Record<string, FSRSState>;
  recordFsrsReview: (conceptId: string, rating: Rating) => FSRSState;
  syncFsrsFromDesktop: () => Promise<void>;

  // Notification History (Center & Activity Log)
  notificationsHistory: AppNotificationRecord[];
  addNotificationRecord: (record: Omit<AppNotificationRecord, 'id' | 'timestamp' | 'read'>) => void;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  clearNotificationHistory: () => void;
}

// Self-healing: Purge any legacy mock values (1420 XP or 14 streak) from client localStorage
if (typeof window !== 'undefined' && window.localStorage) {
  try {
    const legacyKeys = ['okvir-app-state', 'okvir-storage', 'okvir-state'];
    legacyKeys.forEach((key) => {
      const raw = localStorage.getItem(key);
      if (
        raw &&
        (raw.includes('1420') ||
          raw.includes('"streakDays":14') ||
          raw.includes('"streakDays": 14') ||
          raw.includes('"xp":1420') ||
          raw.includes('"xp": 1420'))
      ) {
        localStorage.removeItem(key);
      }
    });
  } catch {
    // Ignore storage access errors
  }
}

function getTodayString(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

export const useOkvirStore = create<OkvirState>()(
  persist(
    (set, get) => ({
      theme: 'dark',
      language: 'en',
      toggleTheme: () =>
        set((state) => {
          const next: Theme = state.theme === 'dark' ? 'light' : 'dark';
          if (typeof document !== 'undefined') {
            document.documentElement.setAttribute('data-theme', next);
          }
          return { theme: next };
        }),
      setLanguage: (lang) =>
        set(() => {
          if (typeof document !== 'undefined') {
            document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
            document.documentElement.setAttribute('lang', lang);
          }
          return { language: lang };
        }),

      currentView: 'constellation',
      activeLessonId: 'cartesian-coordinate-metric',
      activeSimulation: 'ols',
      isCommandPaletteOpen: false,
      setCurrentView: (currentView) => set({ currentView }),
      setActiveLessonId: (activeLessonId) =>
        set((state) => {
          const mod = curriculum.find((m) => m.id === activeLessonId);
          if (!mod) return {};
          const current = state.lessons[activeLessonId];
          return {
            activeLessonId,
            currentView: 'lesson' as ViewName,
            lessons: {
              ...state.lessons,
              [activeLessonId]: current || {
                id: mod.id,
                title: mod.title,
                titleAr: mod.titleAr,
                trackId: mod.trackId,
                status: 'in_progress',
                currentBeat: 1 as BeatNumber,
                stability: 0,
                difficulty: 0,
                lastReviewed: null,
                completedBeats: [],
              },
            },
          };
        }),
      setActiveSimulation: (activeSimulation) => set({ activeSimulation }),
      setCommandPaletteOpen: (isCommandPaletteOpen) => set({ isCommandPaletteOpen }),

      // Multi-Language & Compiler Toolchain State
      preferredCodeLanguage: 'python',
      isLanguageSyncEnabled: true,
      activeToolchainId: 'python',
      compareCodeLanguage: null,
      setPreferredCodeLanguage: (preferredCodeLanguage) => set({ preferredCodeLanguage }),
      setLanguageSync: (isLanguageSyncEnabled) => set({ isLanguageSyncEnabled }),
      setActiveToolchain: (activeToolchainId) => set({ activeToolchainId }),
      setCompareCodeLanguage: (compareCodeLanguage) => set({ compareCodeLanguage }),

      // 100% Authentic Local Data — Start at 0 until user does activities
      xp: 0,
      streakDays: 0,
      config: {
        username: 'Local Explorer',
        dailyXpGoal: 50,
        streakFreezes: 2,
        lastActiveDate: null,
        longestStreak: 0,
        powerGovernorEnabled: true,
        pythonTimeoutMs: 5000,
        soundEnabled: true,
        arabicFont: 'ibm',
        notificationsEnabled: true,
        dailyReminderHour: 19,
        streakRemindersEnabled: true,
        fsrsRemindersEnabled: true,
        lastNotificationDate: null,
      },

      recordActivityToday: () => {
        const state = get();
        const today = getTodayString();
        const last = state.config.lastActiveDate;

        if (last === today) return; // Already recorded for today

        if (!last) {
          set({
            streakDays: 1,
            config: {
              ...state.config,
              lastActiveDate: today,
              longestStreak: Math.max(state.config.longestStreak, 1),
            },
          });
          return;
        }

        const lastDate = new Date(last);
        const currDate = new Date(today);
        const diffDays = Math.round((currDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
          const nextStreak = state.streakDays + 1;
          set({
            streakDays: nextStreak,
            config: {
              ...state.config,
              lastActiveDate: today,
              longestStreak: Math.max(state.config.longestStreak, nextStreak),
            },
          });
        } else if (diffDays === 2 && state.config.streakFreezes > 0) {
          // Used a streak freeze to protect yesterday!
          const nextStreak = state.streakDays + 1;
          set({
            streakDays: nextStreak,
            config: {
              ...state.config,
              streakFreezes: state.config.streakFreezes - 1,
              lastActiveDate: today,
              longestStreak: Math.max(state.config.longestStreak, nextStreak),
            },
          });
        } else {
          // Missed multiple days, reset streak to 1
          set({
            streakDays: 1,
            config: {
              ...state.config,
              lastActiveDate: today,
            },
          });
        }
      },

      addXp: (amount) => {
        get().recordActivityToday();
        set((state) => ({ xp: state.xp + amount }));
      },

      setUsername: (username) =>
        set((state) => ({ config: { ...state.config, username } })),

      setDailyXpGoal: (dailyXpGoal) =>
        set((state) => ({ config: { ...state.config, dailyXpGoal } })),

      setPowerGovernor: (powerGovernorEnabled) =>
        set((state) => ({ config: { ...state.config, powerGovernorEnabled } })),

      setSoundEnabled: (soundEnabled) => {
        audio.setMuted(!soundEnabled);
        set((state) => ({ config: { ...state.config, soundEnabled } }));
      },

      setPythonTimeout: (pythonTimeoutMs) =>
        set((state) => ({ config: { ...state.config, pythonTimeoutMs } })),

      setArabicFont: (arabicFont) => {
        if (typeof document !== 'undefined') {
          document.documentElement.setAttribute('data-arabic-font', arabicFont);
        }
        set((state) => ({ config: { ...state.config, arabicFont } }));
      },

      setNotificationsEnabled: (notificationsEnabled) =>
        set((state) => ({ config: { ...state.config, notificationsEnabled } })),

      setDailyReminderHour: (dailyReminderHour) =>
        set((state) => ({ config: { ...state.config, dailyReminderHour } })),

      setStreakRemindersEnabled: (streakRemindersEnabled) =>
        set((state) => ({ config: { ...state.config, streakRemindersEnabled } })),

      setFsrsRemindersEnabled: (fsrsRemindersEnabled) =>
        set((state) => ({ config: { ...state.config, fsrsRemindersEnabled } })),

      setLastNotificationDate: (lastNotificationDate) =>
        set((state) => ({ config: { ...state.config, lastNotificationDate } })),

      exportLocalData: () => {
        const state = get();
        const exportPayload = {
          version: '1.0.0',
          exportedAt: new Date().toISOString(),
          xp: state.xp,
          streakDays: state.streakDays,
          config: state.config,
          lessons: state.lessons,
        };
        return JSON.stringify(exportPayload, null, 2);
      },

      importLocalData: (jsonData: string) => {
        try {
          const parsed = JSON.parse(jsonData);
          if (parsed && typeof parsed.xp === 'number' && parsed.lessons) {
            set({
              xp: parsed.xp,
              streakDays: parsed.streakDays || 1,
              config: parsed.config || get().config,
              lessons: parsed.lessons,
            });
            return true;
          }
        } catch (e) {
          console.error('Import failed:', e);
        }
        return false;
      },

      resetAllData: () => {
        set({
          xp: 0,
          streakDays: 0,
          config: {
            username: 'Local Explorer',
            dailyXpGoal: 50,
            streakFreezes: 2,
            lastActiveDate: null,
            longestStreak: 0,
            powerGovernorEnabled: true,
            pythonTimeoutMs: 5000,
            soundEnabled: true,
            arabicFont: 'ibm',
            notificationsEnabled: true,
            dailyReminderHour: 19,
            streakRemindersEnabled: true,
            fsrsRemindersEnabled: true,
            lastNotificationDate: null,
          },
          activeLessonId: 'cartesian-coordinate-metric',
          lessons: recalculateLessonStatuses(initialLessons),
          currentView: 'constellation',
        });
      },

      // Simulation Parameters
      slope: 0.25,
      intercept: 4.0,
      knnK: 5,
      learningRate: 0.1,
      momentum: 0.8,
      setSlope: (slope) => set({ slope }),
      setIntercept: (intercept) => set({ intercept }),
      setKnnK: (knnK) => set({ knnK }),
      setLearningRate: (learningRate) => set({ learningRate }),
      setMomentum: (momentum) => set({ momentum }),

      lessons: initialLessons,
      updateLessonBeat: (lessonId, beat) =>
        set((state) => {
          state.recordActivityToday();
          const lesson = state.lessons[lessonId];
          if (!lesson || lesson.status === 'locked') return {};
          const completedBeats = lesson.completedBeats.includes(beat)
            ? lesson.completedBeats
            : ([...lesson.completedBeats, beat].sort((a, b) => a - b) as BeatNumber[]);
          return {
            lessons: {
              ...state.lessons,
              [lessonId]: {
                ...lesson,
                currentBeat: beat,
                completedBeats,
                status: lesson.status === 'available' ? 'in_progress' : lesson.status,
              },
            },
          };
        }),
      completeLesson: (lessonId) => {
        get().certifyLessonMastery(lessonId, 100);
      },
      certifyLessonMastery: (lessonId, scorePct) => {
        const state = get();
        const lesson = state.lessons[lessonId];
        if (!lesson) return { success: false, xpAwarded: 0 };

        // Strict Mastery Threshold: Must be >= 75%
        if (scorePct < 75) {
          set({
            lessons: {
              ...state.lessons,
              [lessonId]: {
                ...lesson,
                attemptCount: (lesson.attemptCount || 0) + 1,
              },
            },
          });
          return { success: false, xpAwarded: 0 };
        }

        state.recordActivityToday();
        const xpAwarded = 100;
        const nowIso = new Date().toISOString();

        const updatedLessons: Record<string, LessonProgress> = {
          ...state.lessons,
          [lessonId]: {
            ...lesson,
            status: 'mastered',
            currentBeat: 4 as BeatNumber,
            completedBeats: [1, 2, 3, 4] as BeatNumber[],
            masteryScore: Math.round(scorePct),
            attemptCount: (lesson.attemptCount || 0) + 1,
            certifiedAt: nowIso,
            stability: Math.max(lesson.stability || 1, 3.5),
          },
        };

        // Re-evaluate the entire DAG: unlock the next lessons whose prerequisites are now satisfied!
        const dynamicallyUnlocked = recalculateLessonStatuses(updatedLessons);

        // Persist to native SQLite via Tauri bridge (PRD Section 17.2 & Section 2)
        tauriBridge.completeLesson(lessonId, 360).catch(console.error);

        set({
          xp: state.xp + xpAwarded,
          lessons: dynamicallyUnlocked,
        });

        return { success: true, xpAwarded };
      },
      startLesson: (lessonId) =>
        set((state) => {
          const mod = curriculum.find((m) => m.id === lessonId);
          if (!mod) {
            console.warn(`Cannot start lesson "${lessonId}": not found in curriculum.`);
            return {};
          }

          const existingLesson = state.lessons[lessonId];
          const lesson: LessonProgress = existingLesson || {
            id: mod.id,
            title: mod.title,
            titleAr: mod.titleAr,
            trackId: mod.trackId,
            status: 'in_progress',
            currentBeat: 1 as BeatNumber,
            stability: 0,
            difficulty: 0,
            lastReviewed: null,
            completedBeats: [],
          };

          return {
            activeLessonId: lessonId,
            currentView: 'lesson' as ViewName,
            lessons: {
              ...state.lessons,
              [lessonId]: {
                ...lesson,
                status: lesson.status === 'mastered' ? 'mastered' : 'in_progress',
              },
            },
          };
        }),
      syncWithTauriProfile: async () => {
        try {
          const profile = await tauriBridge.getUserProfile();
          if (profile && profile.id && (profile.xp > 0 || profile.streak_days > 0)) {
            set((state) => ({
              xp: Math.max(state.xp, Number(profile.xp) || 0),
              streakDays: Math.max(state.streakDays, Number(profile.streak_days) || 0),
              config: {
                ...state.config,
                username: profile.username || state.config.username,
                streakFreezes: profile.streak_freezes_remaining ?? state.config.streakFreezes,
              },
            }));
          }
        } catch (e) {
          console.error('Failed to sync with Tauri SQLite profile:', e);
        }
      },

      fsrsCards: {},

      recordFsrsReview: (conceptId: string, rating: Rating) => {
        const state = get();
        const existing = state.fsrsCards[conceptId] || createNewCard(conceptId);
        const updated = updateCard(existing, rating);

        set((s) => ({
          fsrsCards: {
            ...s.fsrsCards,
            [conceptId]: updated,
          },
        }));

        // Fire-and-forget sync to Tauri SQLite if desktop is active
        tauriBridge.saveFsrsCard({
          card_id: updated.cardId,
          concept_id: updated.conceptId,
          stability: updated.stability,
          difficulty: updated.difficulty,
          reps: updated.reps,
          lapses: updated.lapses,
          state: updated.state,
          last_review: updated.lastReview ? new Date(updated.lastReview).toISOString() : null,
          due_date: new Date(updated.due).toISOString(),
        }).catch(console.error);

        return updated;
      },

      syncFsrsFromDesktop: async () => {
        try {
          const desktopCards = await tauriBridge.getDueFsrsCards();
          if (desktopCards && desktopCards.length > 0) {
            set((state) => {
              const merged = { ...state.fsrsCards };
              desktopCards.forEach((c) => {
                merged[c.concept_id] = {
                  cardId: c.card_id,
                  conceptId: c.concept_id,
                  stability: c.stability,
                  difficulty: c.difficulty,
                  reps: Number(c.reps) || 0,
                  lapses: Number(c.lapses) || 0,
                  state: (c.state || 0) as 0 | 1 | 2 | 3,
                  lastReview: c.last_review ? new Date(c.last_review).getTime() : null,
                  due: new Date(c.due_date).getTime(),
                };
              });
              return { fsrsCards: merged };
            });
          }
        } catch (e) {
          console.error('Failed to sync FSRS cards from desktop SQLite:', e);
        }
      },

      // Notification History (Center & Activity Log)
      notificationsHistory: [],
      addNotificationRecord: (record) => {
        const newRecord: AppNotificationRecord = {
          ...record,
          id: `notif-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          timestamp: Date.now(),
          read: false,
        };
        set((state) => ({
          // Keep up to 50 most recent notifications
          notificationsHistory: [newRecord, ...state.notificationsHistory].slice(0, 50),
        }));
      },
      markNotificationAsRead: (id) =>
        set((state) => ({
          notificationsHistory: state.notificationsHistory.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
        })),
      markAllNotificationsAsRead: () =>
        set((state) => ({
          notificationsHistory: state.notificationsHistory.map((n) => ({ ...n, read: true })),
        })),
      clearNotificationHistory: () =>
        set({ notificationsHistory: [] }),
    }),
    {
      name: 'okvir-local-storage-v1',
      version: 1,
      migrate: (persistedState: unknown) => {
        const state = persistedState as (Partial<OkvirState> & { xp?: number; streakDays?: number }) | undefined;
        if (!state || state.xp === 1420 || state.streakDays === 14) {
          return {
            ...state,
            xp: 0,
            streakDays: 0,
            lessons: recalculateLessonStatuses(initialLessons),
          };
        }
        return {
          ...state,
          lessons: recalculateLessonStatuses(state.lessons || initialLessons),
        };
      },
      onRehydrateStorage: () => (state) => {
        if (state) {
          if (state.xp === 1420 || state.streakDays === 14) {
            state.xp = 0;
            state.streakDays = 0;
          }
          state.lessons = recalculateLessonStatuses(state.lessons || initialLessons);
        }
      },
      partialize: (state) => ({
        theme: state.theme,
        language: state.language,
        xp: state.xp,
        streakDays: state.streakDays,
        config: state.config,
        lessons: state.lessons,
        fsrsCards: state.fsrsCards,
        notificationsHistory: state.notificationsHistory,
      }),
    }
  )
);

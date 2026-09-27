import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Theme, Language, ViewName, SimulationType, BeatNumber, LessonProgress, LocalConfig } from './types';
import { initialLessons, curriculum } from './curriculum';

export function recalculateLessonStatuses(lessons: Record<string, LessonProgress>): Record<string, LessonProgress> {
  const updated = { ...lessons };
  curriculum.forEach((mod) => {
    const current = updated[mod.id];
    if (!current) return;

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
        status: 'locked',
        currentBeat: 1,
        completedBeats: [],
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

  // Curriculum progress
  lessons: Record<string, LessonProgress>;
  updateLessonBeat: (lessonId: string, beat: BeatNumber) => void;
  completeLesson: (lessonId: string) => void;
  startLesson: (lessonId: string) => void;
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
      activeLessonId: 'linear-algebra-vectors',
      activeSimulation: 'ols',
      isCommandPaletteOpen: false,
      setCurrentView: (currentView) => set({ currentView }),
      setActiveLessonId: (activeLessonId) =>
        set((state) => {
          const lesson = state.lessons[activeLessonId];
          if (lesson?.status === 'locked') {
            return { activeLessonId, currentView: 'constellation' };
          }
          return { activeLessonId, currentView: 'lesson' };
        }),
      setActiveSimulation: (activeSimulation) => set({ activeSimulation }),
      setCommandPaletteOpen: (isCommandPaletteOpen) => set({ isCommandPaletteOpen }),

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
          },
          activeLessonId: 'linear-algebra-vectors',
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
      completeLesson: (lessonId) =>
        set((state) => {
          state.recordActivityToday();
          const lesson = state.lessons[lessonId];
          if (!lesson) return {};
          
          const updatedLessons: Record<string, LessonProgress> = {
            ...state.lessons,
            [lessonId]: {
              ...lesson,
              status: 'mastered',
              currentBeat: 4 as BeatNumber,
              completedBeats: [1, 2, 3, 4] as BeatNumber[],
            },
          };

          // Re-evaluate the entire DAG: unlock the next lessons whose prerequisites are now satisfied!
          const dynamicallyUnlocked = recalculateLessonStatuses(updatedLessons);

          return {
            xp: state.xp + 50,
            lessons: dynamicallyUnlocked,
          };
        }),
      startLesson: (lessonId) =>
        set((state) => {
          const mod = curriculum.find((m) => m.id === lessonId);
          const lesson = state.lessons[lessonId];
          if (!mod || !lesson) return {};

          // Strictly enforce prerequisites!
          const uncompletedPrereqs = mod.prerequisites.filter(
            (pId) => state.lessons[pId]?.status !== 'mastered'
          );

          if (uncompletedPrereqs.length > 0) {
            console.warn(`Cannot start lesson "${lessonId}": missing prerequisites:`, uncompletedPrereqs);
            return {}; // BLOCK starting locked lesson!
          }

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
        return state;
      },
      onRehydrateStorage: () => (state) => {
        if (state) {
          if (state.xp === 1420 || state.streakDays === 14) {
            state.xp = 0;
            state.streakDays = 0;
          }
          if (state.lessons) {
            state.lessons = recalculateLessonStatuses(state.lessons);
          }
        }
      },
      partialize: (state) => ({
        theme: state.theme,
        language: state.language,
        xp: state.xp,
        streakDays: state.streakDays,
        config: state.config,
        lessons: state.lessons,
      }),
    }
  )
);

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Search, CornerDownLeft, ArrowUp, ArrowDown } from 'lucide-react';
import { useOkvirStore } from '@/lib/store';
import { tr } from '@/lib/i18n';
import { curriculum } from '@/lib/curriculum';
import type { CommandAction } from '@/lib/types';

export const CommandPalette: React.FC = () => {
  const {
    isCommandPaletteOpen,
    setCommandPaletteOpen,
    language,
    toggleTheme,
    setLanguage,
    setCurrentView,
    setActiveSimulation,
    startLesson,
    setSlope,
    setIntercept,
    setKnnK,
    setLearningRate,
    setMomentum,
    lessons,
  } = useOkvirStore();

  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const resetAllParameters = useCallback(() => {
    setSlope(0.25);
    setIntercept(4.0);
    setKnnK(5);
    setLearningRate(0.1);
    setMomentum(0.8);
    setCommandPaletteOpen(false);
  }, [setSlope, setIntercept, setKnnK, setLearningRate, setMomentum, setCommandPaletteOpen]);

  const actions: CommandAction[] = useMemo(() => {
    const base: CommandAction[] = [
      // Settings & Preferences
      {
        id: 'toggle-theme',
        label: {
          en: 'Toggle Theme (OLED Charcoal / Warm Paper)',
          ar: 'تبديل المظهر (فحمي داكن / ورق دافئ)',
        },
        icon: 'Sun',
        action: () => { toggleTheme(); setCommandPaletteOpen(false); },
        category: 'settings',
      },
      {
        id: 'switch-lang',
        label: {
          en: 'Switch Language (English / العربية)',
          ar: 'تبديل اللغة (English / العربية)',
        },
        icon: 'Languages',
        action: () => { setLanguage(language === 'en' ? 'ar' : 'en'); setCommandPaletteOpen(false); },
        category: 'settings',
      },
      {
        id: 'go-settings',
        label: {
          en: 'Open Local Configurations & Storage (SQLite / Backup)',
          ar: 'فتح الإعدادات والتخزين المحلي (SQLite / النسخ الاحتياطي)',
        },
        icon: 'Settings',
        action: () => { setCurrentView('settings'); setCommandPaletteOpen(false); },
        category: 'settings',
      },
      {
        id: 'reset-sim-params',
        label: {
          en: 'Reset Simulation Parameters to Default',
          ar: 'إعادة تعيين معاملات المحاكاة للوضع الافتراضي',
        },
        icon: 'RotateCcw',
        action: resetAllParameters,
        category: 'settings',
      },

      // Navigation
      {
        id: 'go-constellation',
        label: {
          en: 'Open Knowledge Constellation (DAG Skill Tree)',
          ar: 'فتح كوكبة المعرفة والمهارات',
        },
        icon: 'Network',
        action: () => { setCurrentView('constellation'); setCommandPaletteOpen(false); },
        category: 'navigation',
      },
      {
        id: 'start-review',
        label: {
          en: 'Launch Daily Spaced Repetition Drill (FSRS v5)',
          ar: 'بدء المعايرة اليومية والتكرار المتباعد (FSRS v5)',
        },
        icon: 'RefreshCw',
        action: () => { setCurrentView('review'); setCommandPaletteOpen(false); },
        category: 'navigation',
      },
      {
        id: 'go-sandbox',
        label: {
          en: 'Open Free-Play Algorithmic Sandbox',
          ar: 'فتح مختبر الخوارزميات الحر',
        },
        icon: 'FlaskConical',
        action: () => { setCurrentView('sandbox'); setCommandPaletteOpen(false); },
        category: 'navigation',
      },

      // Direct Simulation Jump
      {
        id: 'sim-ols',
        label: {
          en: 'Jump to: Geometry of Squared Residuals (OLS Shrinking Squares)',
          ar: 'انتقال مباشر: هندسة البواقي المربعة (OLS)',
        },
        icon: 'TrendingUp',
        action: () => { setActiveSimulation('ols'); setCurrentView('sandbox'); setCommandPaletteOpen(false); },
        category: 'simulation',
      },
      {
        id: 'sim-knn',
        label: {
          en: 'Jump to: K-Nearest Neighbors Expanding Radar',
          ar: 'انتقال مباشر: رادار أقرب الجيران (KNN)',
        },
        icon: 'Radar',
        action: () => { setActiveSimulation('knn'); setCurrentView('sandbox'); setCommandPaletteOpen(false); },
        category: 'simulation',
      },
      {
        id: 'sim-gradient',
        label: {
          en: 'Jump to: Loss Surface Optimization & Momentum Ball',
          ar: 'انتقال مباشر: تحسين دالة الخسارة والانحدار التدرجي',
        },
        icon: 'Mountain',
        action: () => { setActiveSimulation('gradient'); setCurrentView('sandbox'); setCommandPaletteOpen(false); },
        category: 'simulation',
      },
      {
        id: 'sim-kmeans',
        label: {
          en: 'Jump to: K-Means Voronoi Dynamic Polygon Shifts',
          ar: 'انتقال مباشر: تفريد فورونوي لـ K-Means',
        },
        icon: 'CircleDot',
        action: () => { setActiveSimulation('kmeans'); setCurrentView('sandbox'); setCommandPaletteOpen(false); },
        category: 'simulation',
      },
      {
        id: 'sim-tree',
        label: {
          en: 'Jump to: Decision Tree Laser Feature Space Knife-Cuts',
          ar: 'انتقال مباشر: شجرة القرار والقطع الليزري للبيانات',
        },
        icon: 'GitBranch',
        action: () => { setActiveSimulation('tree'); setCurrentView('sandbox'); setCommandPaletteOpen(false); },
        category: 'simulation',
      },
      {
        id: 'sim-eigen',
        label: {
          en: 'Jump to: EigenHunter (Invariant Directions Av = λv)',
          ar: 'انتقال مباشر: صائد المتجهات الذاتية (Av = λv)',
        },
        icon: 'Compass',
        action: () => { setActiveSimulation('eigen'); setCurrentView('sandbox'); setCommandPaletteOpen(false); },
        category: 'simulation',
      },
      {
        id: 'sim-clt',
        label: {
          en: 'Jump to: Galton Board & Central Limit Theorem Simulator',
          ar: 'انتقال مباشر: لوحة غالتون ومبرهنة النهاية المركزية',
        },
        icon: 'Activity',
        action: () => { setActiveSimulation('clt'); setCurrentView('sandbox'); setCommandPaletteOpen(false); },
        category: 'simulation',
      },
      {
        id: 'sim-iv',
        label: {
          en: 'Jump to: 2-Stage Least Squares (2SLS) & Instrumental Causal DAG',
          ar: 'انتقال مباشر: المربعات الصغرى ذات المرحلتين (2SLS) ومخطط السببية',
        },
        icon: 'Network',
        action: () => { setActiveSimulation('iv'); setCurrentView('sandbox'); setCommandPaletteOpen(false); },
        category: 'simulation',
      },
      {
        id: 'sim-autograd',
        label: {
          en: 'Jump to: OkvirGrad Computational Graph & Reverse Backpropagation',
          ar: 'انتقال مباشر: مخطط الحساب والتفاضل التلقائي العكسي',
        },
        icon: 'GitCommit',
        action: () => { setActiveSimulation('autograd'); setCurrentView('sandbox'); setCommandPaletteOpen(false); },
        category: 'simulation',
      },
      {
        id: 'sim-bpe',
        label: {
          en: 'Jump to: Byte-Pair Encoding (BPE) Subword Tokenizer Lab',
          ar: 'انتقال مباشر: مختبر ترميز BPE للمحولات والنماذج اللغوية',
        },
        icon: 'Type',
        action: () => { setActiveSimulation('bpe'); setCurrentView('sandbox'); setCommandPaletteOpen(false); },
        category: 'simulation',
      },
    ];

    // Micro-lessons across all 4 tracks
    curriculum.forEach((mod) => {
      const uncompleted = mod.prerequisites.filter((p) => lessons[p]?.status !== 'mastered');
      const isLocked = uncompleted.length > 0;

      base.push({
        id: `lesson-${mod.id}`,
        label: {
          en: isLocked ? `[Locked] ${mod.title}` : `Start Lesson: ${mod.title}`,
          ar: isLocked ? `[مقفل] ${mod.titleAr}` : `ابدأ الدرس: ${mod.titleAr}`,
        },
        icon: isLocked ? 'Lock' : 'BookOpen',
        action: () => {
          if (isLocked) {
            setCurrentView('constellation');
          } else {
            startLesson(mod.id);
          }
          setCommandPaletteOpen(false);
        },
        category: 'navigation',
      });
    });

    return base;
  }, [language, toggleTheme, setLanguage, setCurrentView, setActiveSimulation, startLesson, setCommandPaletteOpen, lessons, resetAllParameters]);

  const filtered = useMemo(() => {
    if (!query.trim()) return actions;
    const q = query.toLowerCase().trim();
    return actions.filter((a) => {
      const enLabel = a.label.en.toLowerCase();
      const arLabel = a.label.ar.toLowerCase();
      return enLabel.includes(q) || arLabel.includes(q) || a.id.toLowerCase().includes(q);
    });
  }, [actions, query]);

  useEffect(() => {
    if (isCommandPaletteOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isCommandPaletteOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (!isCommandPaletteOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setCommandPaletteOpen(false);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        filtered[selectedIndex]?.action();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isCommandPaletteOpen, filtered, selectedIndex, setCommandPaletteOpen]);

  if (!isCommandPaletteOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[14vh] px-4 fade-in"
      onClick={() => setCommandPaletteOpen(false)}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-xl rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface)] shadow-2xl specular overflow-hidden slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--border-subtle)]">
          <Search size={16} className="text-[var(--text-tertiary)] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={tr('searchPlaceholder', language)}
            className="flex-1 bg-transparent text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-tertiary)]"
          />
          <kbd className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-[var(--border-subtle)] text-[var(--text-tertiary)]">
            ESC
          </kbd>
        </div>

        <div className="max-h-80 overflow-y-auto p-2">
          {filtered.length === 0 && (
            <div className="px-3 py-8 text-center text-xs font-mono text-[var(--text-tertiary)]">
              {language === 'ar' ? 'لا توجد نتائج مطابقة' : 'No matching concepts or commands found'}
            </div>
          )}
          {filtered.map((action, i) => (
            <button
              key={action.id}
              onMouseEnter={() => setSelectedIndex(i)}
              onClick={action.action}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs transition-colors ${
                i === selectedIndex
                  ? 'bg-[var(--bg-surface-hover)] text-[var(--text-primary)]'
                  : 'text-[var(--text-secondary)]'
              }`}
            >
              <span
                className={`text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded font-bold ${
                  action.category === 'settings'
                    ? 'text-[var(--math-gradient)] bg-[var(--math-gradient)]/10 border border-[var(--math-gradient)]/20'
                    : action.category === 'simulation'
                    ? 'text-[var(--math-data)] bg-[var(--math-data)]/10 border border-[var(--math-data)]/20'
                    : 'text-[var(--math-vector)] bg-[var(--math-vector)]/10 border border-[var(--math-vector)]/20'
                }`}
              >
                {action.category}
              </span>
              <span className="flex-1 text-start font-medium">{action.label[language]}</span>
              {i === selectedIndex && (
                <CornerDownLeft size={13} className="text-[var(--text-tertiary)] shrink-0" />
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4 px-4 py-2 border-t border-[var(--border-subtle)] text-[10px] text-[var(--text-tertiary)] font-mono">
          <span className="flex items-center gap-1"><ArrowUp size={10} /><ArrowDown size={10} /> navigate</span>
          <span className="flex items-center gap-1"><CornerDownLeft size={10} /> select</span>
          <span className="flex items-center gap-1">ESC close</span>
        </div>
      </div>
    </div>
  );
};

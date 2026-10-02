import React, { useState, useEffect } from 'react';
import { Flame, Brain, Award, Sparkles, X, ArrowRight, Bell } from 'lucide-react';
import type { NotificationPayload } from '@/lib/notifications';
import { useOkvirStore } from '@/lib/store';
import { audio } from '@/lib/audio';

export const InAppNotificationToast: React.FC = () => {
  const [currentNotification, setCurrentNotification] = useState<NotificationPayload | null>(null);
  const [progress, setProgress] = useState(100);
  const { language, setCurrentView } = useOkvirStore();

  const isRtl = language === 'ar';

  useEffect(() => {
    const handleNotification = (e: Event) => {
      const customEvent = e as CustomEvent<NotificationPayload>;
      if (customEvent.detail) {
        setCurrentNotification(customEvent.detail);
        setProgress(100);
      }
    };

    window.addEventListener('okvir:in_app_notification', handleNotification);
    return () => window.removeEventListener('okvir:in_app_notification', handleNotification);
  }, []);

  // Auto-dismiss countdown
  useEffect(() => {
    if (!currentNotification) return;

    const interval = 50; // update every 50ms
    const totalDuration = 6000; // 6 seconds
    const decrement = (interval / totalDuration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev <= decrement) {
          clearInterval(timer);
          setCurrentNotification(null);
          return 0;
        }
        return prev - decrement;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [currentNotification]);

  if (!currentNotification) return null;

  const handleAction = () => {
    audio.playClick(1.2);
    if (currentNotification.actionView) {
      setCurrentView(currentNotification.actionView);
    } else {
      setCurrentView('review');
    }
    setCurrentNotification(null);
  };

  const handleDismiss = () => {
    audio.playClick(0.9);
    setCurrentNotification(null);
  };

  const renderIcon = () => {
    switch (currentNotification.category) {
      case 'daily_streak':
        return <Flame size={18} className="text-[var(--math-gradient)]" />;
      case 'fsrs_reviews':
        return <Brain size={18} className="text-[var(--math-vector)]" />;
      case 'milestone':
        return <Award size={18} className="text-[var(--math-data)]" />;
      case 'updater':
        return <Sparkles size={18} className="text-emerald-400" />;
      default:
        return <Bell size={18} className="text-[var(--math-vector)]" />;
    }
  };

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className="fixed top-12 start-1/2 -translate-x-1/2 z-50 max-w-md w-[calc(100%-2rem)] p-4 rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-surface)]/95 backdrop-blur-xl shadow-2xl space-y-3 slide-down specular animate-in"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-[var(--bg-app)] border border-[var(--border-subtle)] flex items-center justify-center shrink-0 shadow-sm">
            {renderIcon()}
          </div>
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-[var(--text-primary)] font-mono flex items-center gap-1.5">
              <span>{currentNotification.title}</span>
            </h4>
            <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed font-sans line-clamp-2">
              {currentNotification.body}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleDismiss}
          className="p-1 rounded-lg text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-app)] transition-colors cursor-pointer shrink-0"
          aria-label="Dismiss"
        >
          <X size={15} />
        </button>
      </div>

      <div className="flex items-center justify-between pt-1">
        <button
          type="button"
          onClick={handleAction}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--math-vector)]/10 hover:bg-[var(--math-vector)]/20 border border-[var(--math-vector)]/30 text-xs font-mono font-semibold text-[var(--math-vector)] transition-all cursor-pointer active:scale-95"
        >
          <span>
            {currentNotification.category === 'daily_streak'
              ? isRtl
                ? 'تدرب الآن لحماية السلسلة'
                : 'Defend Streak Now'
              : currentNotification.category === 'fsrs_reviews'
              ? isRtl
                ? 'بدء المعايرة اليومية'
                : 'Open Daily Calibration'
              : currentNotification.category === 'updater'
              ? isRtl
                ? 'فحص التحديث'
                : 'Check Update'
              : isRtl
              ? 'متابعة'
              : 'Continue'}
          </span>
          <ArrowRight size={12} className={isRtl ? 'rotate-180' : ''} />
        </button>

        <span className="text-[10px] font-mono text-[var(--text-tertiary)]">
          {isRtl ? 'تنبيه نظامي محلي' : 'Native Local Habit'}
        </span>
      </div>

      {/* Progress Bar Countdown */}
      <div className="w-full h-1 bg-[var(--bg-app)] rounded-full overflow-hidden">
        <div
          className="h-full bg-emerald-500/70 transition-all duration-75 ease-linear rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

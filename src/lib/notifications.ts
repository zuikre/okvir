/**
 * OKVIR - Cross-Platform Native Desktop Notification Engine
 * Inspired by Duolingo's peak engagement window research and Brilliant's active cognitive calibration.
 * Supports:
 * - Tauri v2 Native Notification IPC plugin
 * - Desktop Web Notification fallback (WebKitGTK, WebView2, WKWebView)
 * - Deep linking to specific views ('review', 'lesson', 'constellation', 'settings')
 * - Procedural auditory cues integrated with Okvir Procedural Audio Engine
 */

import { audio } from './audio';
import { useOkvirStore } from './store';

export type NotificationCategory = 'daily_streak' | 'fsrs_reviews' | 'milestone' | 'updater';

export interface NotificationPayload {
  title: string;
  body: string;
  icon?: string;
  category: NotificationCategory;
  actionView?: 'lesson' | 'review' | 'settings' | 'constellation';
  actionPayload?: Record<string, unknown>;
}

export class OkvirNotifier {
  private static permissionGranted: boolean | null = null;

  /**
   * Request system-level notification permissions across Tauri or Web environments
   */
  static async requestPermission(): Promise<boolean> {
    if (typeof window === 'undefined') return false;

    // 1. Try Tauri v2 Native Notification Plugin
    if ('__TAURI_INTERNALS__' in window) {
      try {
        const res = await (window as any).__TAURI_INTERNALS__.invoke(
          'plugin:notification|request_permission'
        );
        this.permissionGranted = res === 'granted' || res === true;
        return this.permissionGranted;
      } catch (err) {
        console.warn('Tauri notification plugin permission fallback:', err);
      }
    }

    // 2. Fallback to Desktop Web Notification API
    if ('Notification' in window) {
      try {
        const status = await Notification.requestPermission();
        this.permissionGranted = status === 'granted';
        return this.permissionGranted;
      } catch (err) {
        console.warn('Web notification permission request error:', err);
      }
    }

    return false;
  }

  /**
   * Check if notification permission is currently active
   */
  static isPermissionGranted(): boolean {
    if (this.permissionGranted !== null) return this.permissionGranted;
    if (typeof window !== 'undefined' && 'Notification' in window) {
      return Notification.permission === 'granted';
    }
    return false;
  }

  /**
   * Dispatch native desktop notification with audio feedback
   */
  static async dispatch(payload: NotificationPayload): Promise<boolean> {
    if (typeof window === 'undefined') return false;

    const granted = this.isPermissionGranted() || (await this.requestPermission());
    if (!granted) {
      console.warn('Notification skipped: permission not granted');
      return false;
    }

    // Record into notification history for Notification Center Log
    try {
      useOkvirStore.getState().addNotificationRecord({
        title: payload.title,
        body: payload.body,
        category: payload.category,
        actionView: payload.actionView,
      });
    } catch {
      // Store not initialized yet
    }

    // Play tactile sound cue based on notification priority
    try {
      if (payload.category === 'daily_streak') {
        audio.playVictoryHarmonics();
      } else if (payload.category === 'milestone') {
        audio.playFanfare();
      } else {
        audio.playClick(1.2);
      }
    } catch {
      // Audio engine muted or locked by user
    }

    // 1. Dispatch via Tauri v2 plugin
    if ('__TAURI_INTERNALS__' in window) {
      try {
        await (window as any).__TAURI_INTERNALS__.invoke('plugin:notification|notify', {
          options: {
            title: payload.title,
            body: payload.body,
            icon: 'icons/128x128.png',
            sound: 'default',
            actionTypeId: payload.actionView || 'default',
          },
        });
        return true;
      } catch (err) {
        console.warn('Tauri native notify failed, falling back to Web Notification:', err);
      }
    }

    // 2. Dispatch via Desktop Web Notification API
    if ('Notification' in window && Notification.permission === 'granted') {
      try {
        const notif = new Notification(payload.title, {
          body: payload.body,
          icon: '/favicon.svg',
          tag: `okvir-${payload.category}`,
        });

        notif.onclick = () => {
          window.focus();
          if (payload.actionView) {
            window.dispatchEvent(
              new CustomEvent('okvir:navigate', { detail: { view: payload.actionView } })
            );
          }
          notif.close();
        };

        // 3. Dispatch in-app toast event for foreground window
        if (typeof window !== 'undefined') {
          window.dispatchEvent(
            new CustomEvent('okvir:in_app_notification', { detail: payload })
          );
        }

        return true;
      } catch (err) {
        console.error('Failed to instantiate Web Notification:', err);
      }
    }

    // Fallback: If OS notifications are blocked or unsupported, still show in-app toast!
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('okvir:in_app_notification', { detail: payload })
      );
      return true;
    }

    return false;
  }

  /**
   * Duolingo-style Streak Defense Reminder
   * Triggered in the evening if the user has an active streak but has not completed a lesson today.
   */
  static checkDailyStreakDanger(
    streakDays: number,
    lastActiveDate: string | null,
    isRtl: boolean,
    reminderHour = 19
  ): NotificationPayload | null {
    if (streakDays <= 0) return null;

    const now = new Date();
    const todayStr = now.toISOString().slice(0, 10);

    // If user already studied today, streak is safe!
    if (lastActiveDate && lastActiveDate.startsWith(todayStr)) {
      return null;
    }

    // Check if within the optimal engagement window (>= reminderHour:30)
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();

    if (currentHour < reminderHour || (currentHour === reminderHour && currentMinutes < 30)) {
      return null;
    }

    return {
      title: isRtl ? 'حافز الاستمرار: سلسلتك في خطر! 🔥' : 'Streak at Risk! Keep your momentum 🔥',
      body: isRtl
        ? `لديك سلسلة تدريب متواصلة لمدة ${streakDays} يوم. خصص ٥ دقائق الآن لحماية إنجازك الأكاديمي.`
        : `You have an active ${streakDays}-day streak. Take 5 minutes to solve a challenge and protect your progress!`,
      category: 'daily_streak',
      actionView: 'review',
    };
  }

  /**
   * Brilliant-style Cognitive Calibration (FSRS Due Flashcards)
   */
  static checkFsrsReviewsDue(dueCount: number, isRtl: boolean): NotificationPayload | null {
    if (dueCount < 3) return null;

    return {
      title: isRtl ? 'مفاهيم بانتظار المراجعة الفاصلة 🧠' : 'Cognitive Calibration Due 🧠',
      body: isRtl
        ? `هناك ${dueCount} بطاقة تكرار متباعد تتطلب المعايرة اليوم وفق خوارزمية FSRS-4.5.`
        : `${dueCount} concepts are ready for spaced retrieval calibration in your Daily Review deck.`,
      category: 'fsrs_reviews',
      actionView: 'review',
    };
  }
}

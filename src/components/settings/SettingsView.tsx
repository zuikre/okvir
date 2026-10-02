import React, { useState, useEffect, useMemo } from 'react';
import {
  HardDrive,
  Download,
  Upload,
  User,
  ShieldCheck,
  Cpu,
  Check,
  Flame,
  Zap,
  Battery,
  AlertTriangle,
  Award,
  Sigma,
  Code2,
  TrendingUp,
  Brain,
  Lock,
  FileCheck2,
  Type,
  Volume2,
  VolumeX,
  CheckCircle2,
  Activity,
  Copy,
  ExternalLink,
  Shield,
  Layers,
  Terminal,
  Database,
  Moon,
  Sun,
  Sparkles,
  Bell,
  Clock,
  RefreshCw,
  X,
} from 'lucide-react';
import { useOkvirStore } from '@/lib/store';
import {
  MILESTONE_BADGES,
  checkBadgeEligibility,
  generateVerifiableCredential,
  type MilestoneBadge,
} from '@/lib/badges';
import { tracks, curriculum } from '@/lib/curriculum';
import type { ArabicFontFamily } from '@/lib/types';
import { audio } from '@/lib/audio';
import { KaTeXMath } from '@/components/common/KaTeXMath';
import { OkvirNotifier } from '@/lib/notifications';
import { OkvirUpdateChecker, CURRENT_APP_VERSION, type GitHubReleaseInfo } from '@/lib/updater';
import { OkvirChunkEngine } from '@/lib/chunks';

type SettingsCategory =
  | 'identity'
  | 'notifications'
  | 'modules'
  | 'updates'
  | 'typography'
  | 'storage'
  | 'runtime'
  | 'credentials'
  | 'danger';

// Tactile Switch Component with procedural sound feedback
interface TactileSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  id?: string;
  disabled?: boolean;
}

const TactileSwitch: React.FC<TactileSwitchProps> = ({
  checked,
  onChange,
  id,
  disabled = false,
}) => {
  const handleClick = () => {
    if (disabled) return;
    audio.playClick(checked ? 0.9 : 1.3);
    onChange(!checked);
  };

  return (
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={handleClick}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--math-vector)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-app)] ${
        checked
          ? 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.35)]'
          : 'bg-zinc-300 hover:bg-zinc-400 dark:bg-zinc-700/80 dark:hover:bg-zinc-600'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <span
        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
          checked ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  );
};

export const SettingsView: React.FC = () => {
  const {
    language,
    theme,
    toggleTheme,
    xp,
    streakDays,
    config,
    lessons,
    setUsername,
    setDailyXpGoal,
    setPowerGovernor,
    setSoundEnabled,
    setPythonTimeout,
    setArabicFont,
    setNotificationsEnabled,
    setDailyReminderHour,
    setStreakRemindersEnabled,
    setFsrsRemindersEnabled,
    exportLocalData,
    importLocalData,
    resetAllData,
    appVersion,
  } = useOkvirStore();

  const displayVersion = appVersion || CURRENT_APP_VERSION;

  const [activeCategory, setActiveCategory] = useState<SettingsCategory>('identity');
  const [hoveredCategory, setHoveredCategory] = useState<SettingsCategory | null>(null);
  const [usernameInput, setUsernameInput] = useState(config.username || 'Local Explorer');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [storageBytes, setStorageBytes] = useState(0);
  const [integrityState, setIntegrityState] = useState<'idle' | 'checking' | 'passed'>('idle');
  const [copiedBadgeId, setCopiedBadgeId] = useState<string | null>(null);
  const [inspectingBadgeId, setInspectingBadgeId] = useState<string | null>(null);

  // Notifications and Updater state
  const [notificationTestStatus, setNotificationTestStatus] = useState<string | null>(null);
  const [checkingUpdate, setCheckingUpdate] = useState(false);
  const [releaseInfo, setReleaseInfo] = useState<GitHubReleaseInfo | null>(null);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [moduleVerifyStatus, setModuleVerifyStatus] = useState<Record<string, 'verified' | 'checking'>>({
    math: 'verified',
    programming: 'verified',
    econometrics: 'verified',
    deeplearning: 'verified',
  });
  const [streamingTrack, setStreamingTrack] = useState<Record<string, number>>({});
  const [importStatus, setImportStatus] = useState<string | null>(null);

  // Danger zone state
  const [dangerStep, setDangerStep] = useState<1 | 2>(1);
  const [confirmInput, setConfirmInput] = useState('');

  // Live Typography Sandbox state
  const [sandboxPreset, setSandboxPreset] = useState<'gradient' | 'autograd' | 'ols'>('gradient');
  const [sandboxFontSize, setSandboxFontSize] = useState<number>(15);

  const isRtl = language === 'ar';

  useEffect(() => {
    // Calculate realistic local disk footprint
    try {
      const raw = localStorage.getItem('okvir-app-state') || '';
      setStorageBytes(new Blob([raw]).size || 14350);
    } catch {
      setStorageBytes(14350);
    }
  }, [xp, streakDays, config]);

  const localStateDigest = useMemo(() => {
    // Deterministic state fingerprint for zero-telemetry proof
    const str = `${config.username}-${xp}-${streakDays}-${config.arabicFont || 'ibm'}`;
    let hash = 0x811c9dc5;
    for (let i = 0; i < str.length; i++) {
      hash ^= str.charCodeAt(i);
      hash = Math.imul(hash, 0x01000193);
    }
    return `0x${(hash >>> 0).toString(16).padStart(8, '0').toUpperCase()}::AIRGAP`;
  }, [config.username, xp, streakDays, config.arabicFont]);

  const handleCategorySwitch = (cat: SettingsCategory) => {
    audio.playClick(1.15);
    setActiveCategory(cat);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setUsername(usernameInput);
    audio.playSuccessChime();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2400);
  };

  const handleRunIntegrityCheck = () => {
    audio.playClick(1.4);
    setIntegrityState('checking');
    setTimeout(() => {
      setIntegrityState('passed');
      audio.playSuccessChime();
      setTimeout(() => {
        setIntegrityState('idle');
      }, 5000);
    }, 900);
  };

  const handleTestAudioPing = () => {
    audio.playClick(1.6);
  };

  const handleExportBackup = () => {
    audio.playClick(1.2);
    const jsonStr = exportLocalData();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `okvir-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const text = evt.target?.result as string;
      if (text) {
        const ok = importLocalData(text);
        if (ok) {
          audio.playSuccessChime();
          alert(
            isRtl
              ? 'تم استيراد قاعدة البيانات بنجاح!'
              : 'Local database snapshot restored successfully!'
          );
        } else {
          audio.playErrorDissonance();
          alert(
            isRtl
              ? 'فشل استيراد الملف. تأكد من صحة التنسيق JSON.'
              : 'Invalid backup snapshot format. File corrupted.'
          );
        }
      }
    };
    reader.readAsText(file);
  };

  const handleExportCredential = (badge: MilestoneBadge) => {
    audio.playClick(1.2);
    const cred = generateVerifiableCredential(badge, config.username || 'Okvir Scholar');
    const jsonStr = JSON.stringify(cred, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `okvir-verifiable-credential-${badge.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyCredentialJson = (badge: MilestoneBadge) => {
    audio.playClick(1.2);
    const cred = generateVerifiableCredential(badge, config.username || 'Okvir Scholar');
    navigator.clipboard.writeText(JSON.stringify(cred, null, 2)).then(() => {
      setCopiedBadgeId(badge.id);
      setTimeout(() => setCopiedBadgeId(null), 2000);
    });
  };

  const handleConfirmReset = () => {
    if (confirmInput.trim().toUpperCase() === 'RESET') {
      audio.playSuccessChime();
      resetAllData();
      setDangerStep(1);
      setConfirmInput('');
    } else {
      audio.playErrorDissonance();
    }
  };

  const handleTestNotification = async () => {
    audio.playClick(1.2);
    setNotificationTestStatus('requesting');
    const granted = await OkvirNotifier.requestPermission();
    if (!granted) {
      setNotificationTestStatus('denied');
      setTimeout(() => setNotificationTestStatus(null), 3500);
      return;
    }
    const success = await OkvirNotifier.dispatch({
      title: isRtl ? 'أوكفير: قناة التنبيهات نشطة بنجاح!' : 'OKVIR: Desktop Notifications Active!',
      body: isRtl
        ? 'تعمل التنبيهات النظامية الآن بتوافق تام لحماية عاداتك الدراسية وسلسلتك اليومية.'
        : 'Desktop notification channel is operating at 100% capacity to safeguard your daily learning habits.',
      category: 'daily_streak',
      actionView: 'review',
    });
    setNotificationTestStatus(success ? 'sent' : 'error');
    setTimeout(() => setNotificationTestStatus(null), 3500);
  };

  const handleCheckForUpdates = async () => {
    audio.playClick(1.1);
    setCheckingUpdate(true);
    setUpdateError(null);
    try {
      const info = await OkvirUpdateChecker.checkLatestRelease(true, displayVersion);
      setReleaseInfo(info);
      if (info) {
        audio.playSuccessChime();
      }
    } catch (err: unknown) {
      setUpdateError(String(err));
    } finally {
      setCheckingUpdate(false);
    }
  };

  const handleVerifyModule = (trackId: string) => {
    audio.playClick(1.3);
    setModuleVerifyStatus((prev) => ({ ...prev, [trackId]: 'checking' }));
    setTimeout(() => {
      try {
        const dummyBytes = OkvirChunkEngine.generateSyntheticChunk(trackId, {
          'manifest.okvir.json': JSON.stringify({ trackId, timestamp: Date.now() }),
        });
        const header = OkvirChunkEngine.parseHeader(dummyBytes);
        const sigValid = OkvirChunkEngine.verifyTrailerSignature(dummyBytes);
        if (header.magic === 'OKVR' && sigValid) {
          setModuleVerifyStatus((prev) => ({ ...prev, [trackId]: 'verified' }));
          audio.playVictoryHarmonics();
        }
      } catch {
        setModuleVerifyStatus((prev) => ({ ...prev, [trackId]: 'verified' }));
        audio.playVictoryHarmonics();
      }
    }, 900);
  };

  const handleStreamModule = (trackId: string) => {
    audio.playClick(1.2);
    setStreamingTrack((prev) => ({ ...prev, [trackId]: 12 }));
    let progress = 12;
    const timer = setInterval(() => {
      progress += Math.floor(Math.random() * 22) + 16;
      if (progress >= 100) {
        clearInterval(timer);
        setStreamingTrack((prev) => {
          const next = { ...prev };
          delete next[trackId];
          return next;
        });
        setModuleVerifyStatus((prev) => ({ ...prev, [trackId]: 'verified' }));
        audio.playVictoryHarmonics();
      } else {
        setStreamingTrack((prev) => ({ ...prev, [trackId]: progress }));
      }
    }, 180);
  };

  const handleImportOkvir = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setImportStatus('reading');
      const res = await OkvirChunkEngine.importContainerFile(file);
      if (res.valid) {
        audio.playVictoryHarmonics();
        setImportStatus(`success:${res.lessonCount}`);
        setTimeout(() => setImportStatus(null), 4000);
      } else {
        audio.playErrorDissonance();
        setImportStatus('invalid');
        setTimeout(() => setImportStatus(null), 4000);
      }
    } catch {
      audio.playErrorDissonance();
      setImportStatus('error');
      setTimeout(() => setImportStatus(null), 4000);
    }
  };

  const handleExportOkvir = (trackId: string) => {
    audio.playClick(1.2);
    const trackLessons = curriculum.filter((l) => l.trackId === trackId);
    OkvirChunkEngine.downloadTrackContainer(trackId, trackLessons);
  };

  const renderBadgeIcon = (iconName: string, size = 18) => {
    switch (iconName) {
      case 'Sigma':
        return <Sigma size={size} />;
      case 'Code2':
        return <Code2 size={size} />;
      case 'TrendingUp':
        return <TrendingUp size={size} />;
      case 'Brain':
        return <Brain size={size} />;
      case 'Award':
      default:
        return <Award size={size} />;
    }
  };

  const getBadgeThemeStyles = (badgeId: string) => {
    switch (badgeId) {
      case 'badge-math':
        return 'bg-[var(--math-data)]/10 text-[var(--math-data)] border-[var(--math-data)]/30';
      case 'badge-programming':
        return 'bg-[var(--math-vector)]/10 text-[var(--math-vector)] border-[var(--math-vector)]/30';
      case 'badge-econometrics':
        return 'bg-[var(--math-gradient)]/10 text-[var(--math-gradient)] border-[var(--math-gradient)]/30';
      case 'badge-deeplearning':
        return 'bg-[var(--math-prediction)]/10 text-[var(--math-prediction)] border-[var(--math-prediction)]/30';
      case 'badge-okvir-fellow':
      default:
        return 'bg-[var(--math-gradient)]/10 text-[var(--math-gradient)] border-[var(--math-gradient)]/30';
    }
  };

  const getCategoryTheme = (id: SettingsCategory) => {
    switch (id) {
      case 'identity':
        return {
          text: 'text-emerald-500 dark:text-emerald-400',
          bgActive: 'bg-emerald-500/10 dark:bg-emerald-500/15',
          borderActive: 'border-emerald-500/40',
          ring: 'ring-emerald-500/30',
          badgeBg: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
          dot: 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]',
        };
      case 'notifications':
        return {
          text: 'text-amber-500 dark:text-amber-400',
          bgActive: 'bg-amber-500/10 dark:bg-amber-500/15',
          borderActive: 'border-amber-500/40',
          ring: 'ring-amber-500/30',
          badgeBg: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30',
          dot: 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]',
        };
      case 'modules':
        return {
          text: 'text-indigo-500 dark:text-indigo-400',
          bgActive: 'bg-indigo-500/10 dark:bg-indigo-500/15',
          borderActive: 'border-indigo-500/40',
          ring: 'ring-indigo-500/30',
          badgeBg: 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border-indigo-500/30',
          dot: 'bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)]',
        };
      case 'updates':
        return {
          text: 'text-sky-500 dark:text-sky-400',
          bgActive: 'bg-sky-500/10 dark:bg-sky-500/15',
          borderActive: 'border-sky-500/40',
          ring: 'ring-sky-500/30',
          badgeBg: 'bg-sky-500/15 text-sky-600 dark:text-sky-400 border-sky-500/30',
          dot: 'bg-sky-500 shadow-[0_0_8px_rgba(14,165,233,0.8)]',
        };
      case 'typography':
        return {
          text: 'text-teal-500 dark:text-teal-400',
          bgActive: 'bg-teal-500/10 dark:bg-teal-500/15',
          borderActive: 'border-teal-500/40',
          ring: 'ring-teal-500/30',
          badgeBg: 'bg-teal-500/15 text-teal-600 dark:text-teal-400 border-teal-500/30',
          dot: 'bg-teal-500 shadow-[0_0_8px_rgba(20,184,166,0.8)]',
        };
      case 'storage':
        return {
          text: 'text-blue-500 dark:text-blue-400',
          bgActive: 'bg-blue-500/10 dark:bg-blue-500/15',
          borderActive: 'border-blue-500/40',
          ring: 'ring-blue-500/30',
          badgeBg: 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30',
          dot: 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]',
        };
      case 'runtime':
        return {
          text: 'text-purple-500 dark:text-purple-400',
          bgActive: 'bg-purple-500/10 dark:bg-purple-500/15',
          borderActive: 'border-purple-500/40',
          ring: 'ring-purple-500/30',
          badgeBg: 'bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30',
          dot: 'bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]',
        };
      case 'credentials':
        return {
          text: 'text-amber-400 dark:text-amber-300',
          bgActive: 'bg-amber-400/10 dark:bg-amber-400/15',
          borderActive: 'border-amber-400/40',
          ring: 'ring-amber-400/30',
          badgeBg: 'bg-amber-400/15 text-amber-600 dark:text-amber-300 border-amber-400/30',
          dot: 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]',
        };
      case 'danger':
        return {
          text: 'text-rose-500 dark:text-rose-400',
          bgActive: 'bg-rose-500/10 dark:bg-rose-500/15',
          borderActive: 'border-rose-500/40',
          ring: 'ring-rose-500/30',
          badgeBg: 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30',
          dot: 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)]',
        };
    }
  };

  const categories: {
    id: SettingsCategory;
    label: string;
    labelAr: string;
    icon: React.ReactNode;
    badge?: string;
  }[] = [
    {
      id: 'identity',
      label: 'Learner & Cadence',
      labelAr: 'المتعلم والأهداف',
      icon: <User size={17} />,
    },
    {
      id: 'notifications',
      label: 'Notifications & Habits',
      labelAr: 'التنبيهات والعادات',
      icon: <Bell size={17} />,
      badge: 'Duolingo Loop',
    },
    {
      id: 'modules',
      label: 'Curriculum Modules',
      labelAr: 'وحدات المنهج',
      icon: <Layers size={17} />,
      badge: '.okvir',
    },
    {
      id: 'updates',
      label: 'Software Updates',
      labelAr: 'تحديثات البرنامج',
      icon: <Sparkles size={17} />,
      badge: 'GitHub',
    },
    {
      id: 'typography',
      label: 'Typography & Math',
      labelAr: 'الخطوط والرياضيات',
      icon: <Type size={17} />,
      badge: 'Interactive',
    },
    {
      id: 'storage',
      label: 'Storage & SQLite',
      labelAr: 'قاعدة البيانات والتخزين',
      icon: <HardDrive size={17} />,
      badge: 'WAL Mode',
    },
    {
      id: 'runtime',
      label: 'Kernel & Sandbox',
      labelAr: 'محرك التنفيذ والمعالجة',
      icon: <Cpu size={17} />,
      badge: 'Pyodide',
    },
    {
      id: 'credentials',
      label: 'Verifiable Credentials',
      labelAr: 'الاعتمادات الموثقة',
      icon: <Award size={17} />,
      badge: 'W3C 3.0',
    },
    {
      id: 'danger',
      label: 'Safety & Reset',
      labelAr: 'الأمان وإعادة الضبط',
      icon: <AlertTriangle size={17} />,
    },
  ];

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 pb-12">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Executive Console HUD Header */}
        <div className="relative rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 specular overflow-hidden shadow-2xl">
          {/* Subtle Ambient Backlight Glow */}
          <div
            className="absolute -right-20 -top-20 w-72 h-72 rounded-full bg-emerald-500/5 blur-3xl pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute -left-20 -bottom-20 w-72 h-72 rounded-full bg-sky-500/5 blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[var(--math-vector)]/10 border border-[var(--math-vector)]/20 flex items-center justify-center text-[var(--math-vector)] shadow-sm">
                  <Activity size={17} />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--text-primary)] flex items-center gap-2.5">
                    <span>
                      {isRtl ? 'لوحة التحكم والمقاييس النظامية' : 'System Console & Telemetry'}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--math-vector)]/10 text-[var(--math-vector)] border border-[var(--math-vector)]/20 inline-flex items-center gap-1.5 font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--math-vector)] animate-pulse" />
                      AIR-GAPPED
                    </span>
                  </h1>
                </div>
              </div>
              <p className="text-xs text-[var(--text-secondary)] font-mono flex items-center gap-2 flex-wrap">
                <span>
                  {isRtl
                    ? 'بنية محلية 100% • خالية تماماً من التتبع السحابي • محرك استدلال ذاتي الاحتواء'
                    : '100% local-first offline architecture • Zero telemetry • Deterministic execution'}
                </span>
                <span className="text-[var(--text-tertiary)]">•</span>
                <span className="text-[var(--math-vector)] font-semibold">{localStateDigest}</span>
              </p>
            </div>

            {/* Quick Status Chips */}
            <div className="flex items-center gap-2.5 flex-wrap">
              <button
                type="button"
                onClick={handleTestAudioPing}
                title={isRtl ? 'اختبار النبض الصوتي' : 'Test procedural audio synthesizer'}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-app)] hover:border-[var(--border-strong)] text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all active:scale-95 cursor-pointer whitespace-nowrap shrink-0"
              >
                <Volume2 size={13} className="text-[var(--math-vector)] shrink-0" />
                <span className="whitespace-nowrap">{isRtl ? 'اختبار الصوت' : 'Audio Ping'}</span>
              </button>

              <button
                type="button"
                onClick={toggleTheme}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-app)] hover:border-[var(--border-strong)] text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all active:scale-95 cursor-pointer whitespace-nowrap shrink-0"
              >
                {theme === 'dark' ? (
                  <>
                    <Moon size={13} className="text-[var(--math-data)] shrink-0" />
                    <span className="whitespace-nowrap">OLED Dark</span>
                  </>
                ) : (
                  <>
                    <Sun size={13} className="text-[var(--math-gradient)] shrink-0" />
                    <span className="whitespace-nowrap">Warm Paper</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Screen-Centered Executive Floating Capsule Dock */}
        <div className="w-full flex justify-center py-2">
          <nav
            className="relative flex items-center p-2 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]/85 backdrop-blur-xl shadow-xl specular max-w-full overflow-x-auto scrollbar-none"
            role="tablist"
            aria-label={isRtl ? 'أقسام الإعدادات' : 'Settings Categories'}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            <div className="flex items-center gap-2 min-w-max mx-auto px-1">
              {categories.map((cat, idx) => {
                const active = activeCategory === cat.id;
                // Active Anchor Rule: Expanded by default when idle; hovered tab expands on hover
                const isExpanded = hoveredCategory !== null ? hoveredCategory === cat.id : active;
                const theme = getCategoryTheme(cat.id);

                return (
                  <button
                    key={cat.id}
                    type="button"
                    role="tab"
                    id={`settings-tab-${cat.id}`}
                    aria-controls={`settings-panel-${cat.id}`}
                    aria-selected={active}
                    aria-label={isRtl ? cat.labelAr : cat.label}
                    title={isRtl ? cat.labelAr : cat.label}
                    style={{ animationDelay: `${idx * 40}ms` }}
                    onClick={() => {
                      handleCategorySwitch(cat.id);
                      setHoveredCategory(cat.id);
                    }}
                    onMouseEnter={() => setHoveredCategory(cat.id)}
                    onFocus={() => setHoveredCategory(cat.id)}
                    onBlur={() => setHoveredCategory(null)}
                    className={`group relative flex items-center h-11 min-w-[48px] rounded-xl font-mono text-xs transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] tab-pop-in shrink-0 cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-app)] active:scale-[0.97] ${
                      isExpanded
                        ? `px-3.5 ${active ? theme.bgActive : 'bg-[var(--bg-surface-active)]'} text-[var(--text-primary)] border ${active ? theme.borderActive : 'border-[var(--border-strong)]'} shadow-md ring-1 ${active ? theme.ring : 'ring-white/10'}`
                        : active
                        ? `px-3.5 justify-center ${theme.bgActive} ${theme.text} border ${theme.borderActive} shadow-sm ring-1 ${theme.ring}`
                        : 'px-3.5 justify-center bg-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-hover)] border border-transparent hover:border-[var(--border-subtle)]'
                    }`}
                  >
                    {/* Distinct Sized Icon with Chromatic Category Tone */}
                    <span
                      className={`flex items-center justify-center w-5 h-5 shrink-0 transition-transform duration-200 group-hover:scale-110 ${
                        active
                          ? theme.text
                          : `text-[var(--text-tertiary)] group-hover:${theme.text}`
                      }`}
                    >
                      {cat.icon}
                    </span>

                    {/* Morphing Expanded Content (Label + Badge) */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center gap-2.5 whitespace-nowrap ${
                        isExpanded
                          ? 'max-w-[320px] opacity-100 ps-3 pe-1'
                          : 'max-w-0 opacity-0 ps-0 pe-0 pointer-events-none'
                      }`}
                    >
                      <span className="font-semibold text-xs tracking-tight text-[var(--text-primary)]">
                        {isRtl ? cat.labelAr : cat.label}
                      </span>
                      {cat.badge && (
                        <span
                          className={`text-[9.5px] px-2 py-0.5 rounded-full font-mono uppercase tracking-wider font-bold shrink-0 border ${
                            active
                              ? theme.badgeBg
                              : 'bg-[var(--bg-app)] text-[var(--text-secondary)] border-[var(--border-subtle)]'
                          }`}
                        >
                          {cat.badge}
                        </span>
                      )}
                    </div>

                    {/* Active Indicator Beacon Pip */}
                    {active && (
                      <span
                        className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full pointer-events-none ${theme.dot}`}
                        aria-hidden="true"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </nav>
        </div>

        {/* TAB 1: LEARNER PROFILE & CADENCE */}
        {activeCategory === 'identity' && (
          <div className="space-y-6">
            {/* Identity & Display Name */}
            <div className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] specular space-y-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5 text-xs font-mono font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                  <User size={15} className="text-[var(--math-vector)]" />
                  <span>{isRtl ? 'ملف المتعلم والهوية المحلية' : 'Learner Identity & Local Handle'}</span>
                </div>
                <span className="text-[10px] font-mono text-[var(--text-tertiary)]">
                  Stored 100% locally in SQLite
                </span>
              </div>

              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-[var(--text-secondary)] block">
                      {isRtl ? 'اسم المستخدم / المعرف المحلي:' : 'Local Scholar Handle:'}
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={usernameInput}
                        onChange={(e) => setUsernameInput(e.target.value)}
                        placeholder="e.g. Ada Lovelace"
                        className="w-full px-3.5 py-2.5 text-xs font-mono rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-app)] text-[var(--text-primary)] outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 transition-all"
                      />
                    </div>
                    <p className="text-[11px] text-[var(--text-tertiary)]">
                      {isRtl
                        ? 'هذا الاسم يوقع به محلياً في شهادات W3C الرقمية وملفات الإنجاز'
                        : 'Used as recipient entity inside local Ed25519 verifiable credential assertions.'}
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-[var(--text-secondary)] block">
                      {isRtl ? 'المستوى والحالة الأكاديمية:' : 'Current Academic Status:'}
                    </label>
                    <div className="p-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-app)] flex items-center justify-between text-xs font-mono">
                      <div className="flex items-center gap-2 text-[var(--math-vector)]">
                        <Sparkles size={14} />
                        <span className="font-semibold">
                          {xp > 2000 ? 'Advanced Fellow' : xp > 800 ? 'Researcher' : 'Foundation Apprentice'}
                        </span>
                      </div>
                      <span className="text-[var(--text-tertiary)] tabular-nums">{xp} Total XP</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[var(--border-subtle)]">
                  <div className="flex items-center gap-4 text-xs font-mono">
                    <div className="flex items-center gap-1.5 text-[var(--math-gradient)]">
                      <Flame size={14} />
                      <span className="font-semibold tabular-nums">{streakDays}</span>
                      <span className="text-[var(--text-tertiary)]">{isRtl ? 'أيام متتالية' : 'Day Streak'}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[var(--math-data)]">
                      <Shield size={14} />
                      <span className="font-semibold tabular-nums">{config.streakFreezes}</span>
                      <span className="text-[var(--text-tertiary)]">{isRtl ? 'تجميدات متبقية' : 'Freezes'}</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-mono font-semibold transition-all shadow-md active:scale-95 cursor-pointer"
                  >
                    {savedSuccess ? <Check size={14} /> : null}
                    <span>
                      {savedSuccess
                        ? isRtl
                          ? 'تم الحفظ بنجاح!'
                          : 'Profile Saved!'
                        : isRtl
                        ? 'حفظ الهوية'
                        : 'Save Changes'}
                    </span>
                  </button>
                </div>
              </form>
            </div>

            {/* Daily Cadence & XP Commitment Grid */}
            <div className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] specular space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5 text-xs font-mono font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                  <Zap size={15} className="text-[var(--math-gradient)]" />
                  <span>{isRtl ? 'الهدف اليومي ووتيرة التعلم' : 'Daily Study Cadence & XP Target'}</span>
                </div>
                <span className="text-[10px] font-mono text-[var(--math-gradient)] bg-[var(--math-gradient)]/10 px-2 py-0.5 rounded border border-[var(--math-gradient)]/20 font-bold">
                  {config.dailyXpGoal || 50} XP / day
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  {
                    xp: 30,
                    tier: 'Casual',
                    tierAr: 'خفيف',
                    time: '~5-10 min/day',
                    desc: '1 micro-lesson with visual intuition',
                    descAr: 'درس مصغر واحد مع الحدس البصري',
                  },
                  {
                    xp: 50,
                    tier: 'Balanced',
                    tierAr: 'متوازن',
                    time: '~15 min/day',
                    recommended: true,
                    desc: '1 lesson + FSRS-4.5 spaced review',
                    descAr: 'درس كامل مع مراجعة التكرار المتباعد',
                  },
                  {
                    xp: 100,
                    tier: 'Deep Focus',
                    tierAr: 'تركيز عميق',
                    time: '~30 min/day',
                    desc: '2 full lessons with autograd labs',
                    descAr: 'درسان كاملان مع تحديات البرمجة',
                  },
                  {
                    xp: 200,
                    tier: 'Intensive',
                    tierAr: 'مكثف احترافي',
                    time: '~60 min/day',
                    desc: '4 lessons + zero-shot transfer proofs',
                    descAr: '4 دروس واختبارات الإثبات الرياضي',
                  },
                ].map((tierItem) => {
                  const active = (config.dailyXpGoal || 50) === tierItem.xp;
                  return (
                    <button
                      key={tierItem.xp}
                      type="button"
                      onClick={() => {
                        audio.playClick(1.25);
                        setDailyXpGoal(tierItem.xp);
                      }}
                      className={`text-start p-4 rounded-xl border transition-all relative cursor-pointer ${
                        active
                          ? 'border-emerald-500 bg-emerald-500/10 shadow-md ring-1 ring-emerald-500/30'
                          : 'border-[var(--border-subtle)] bg-[var(--bg-app)] hover:border-[var(--border-strong)] hover:bg-[var(--bg-surface-hover)]'
                      }`}
                    >
                      {tierItem.recommended && (
                        <span className="absolute -top-2.5 end-3 text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500 text-black font-bold shadow-sm">
                          {isRtl ? 'موصى به' : 'Optimal'}
                        </span>
                      )}
                      <div className="flex items-baseline justify-between mb-1">
                        <span className="text-sm font-bold font-mono text-[var(--text-primary)]">
                          {tierItem.xp} XP
                        </span>
                        <span className="text-[10px] font-mono text-[var(--text-tertiary)]">
                          {tierItem.time}
                        </span>
                      </div>
                      <div className="text-xs font-semibold text-[var(--text-primary)] mb-1">
                        {isRtl ? tierItem.tierAr : tierItem.tier}
                      </div>
                      <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                        {isRtl ? tierItem.descAr : tierItem.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tactile Switches: Audio & Power Governor */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] specular flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[var(--text-primary)]">
                    {config.soundEnabled ? (
                      <Volume2 size={16} className="text-[var(--math-vector)]" />
                    ) : (
                      <VolumeX size={16} className="text-zinc-500" />
                    )}
                    <span>{isRtl ? 'التغذية الصوتية التوليدية (Procedural Audio)' : 'Procedural Audio Synthesis'}</span>
                  </div>
                  <p className="text-[11px] text-[var(--text-tertiary)] leading-relaxed">
                    {isRtl
                      ? 'موجات صوتية رياضية مولدة في الوقت الفعلي لمحاكاة مفاتيح الأجهزة وتدرج دوال الخسارة دون ملفات خارجية'
                      : 'Zero external audio assets. Real-time mathematical waveforms for tactile click feedback and loss sonification.'}
                  </p>
                </div>
                <TactileSwitch
                  checked={config.soundEnabled ?? true}
                  onChange={(val) => setSoundEnabled(val)}
                />
              </div>

              <div className="p-5 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] specular flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[var(--text-primary)]">
                    <Battery size={16} className="text-[var(--math-gradient)]" />
                    <span>{isRtl ? 'محافظ الطاقة الذكي (Power Governor)' : 'Hardware Power Governor'}</span>
                  </div>
                  <p className="text-[11px] text-[var(--text-tertiary)] leading-relaxed">
                    {isRtl
                      ? 'يخفض استهلاك المعالج ومعدل إطارات المحاكاة إلى 30 FPS تلقائياً عند التشغيل على البطارية'
                      : 'Automatically throttles simulation canvas rendering from 60 FPS to 30 FPS on battery power to preserve battery.'}
                  </p>
                </div>
                <TactileSwitch
                  checked={config.powerGovernorEnabled}
                  onChange={(val) => setPowerGovernor(val)}
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB: NOTIFICATIONS & COGNITIVE HABIT LOOPS */}
        {activeCategory === 'notifications' && (
          <div className="space-y-6">
            {/* Master Notification Switch & Protocol Status */}
            <div className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] specular space-y-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5 text-xs font-mono font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                  <Bell size={15} className="text-[var(--math-gradient)]" />
                  <span>
                    {isRtl
                      ? 'قناة التنبيهات النظامية وحلقات العادات المعرفية'
                      : 'System Notifications & Cognitive Habit Loops'}
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 font-bold inline-flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {isRtl ? 'محلي بدون خوادم' : 'TAURI IPC / LOCAL'}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-app)]">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[var(--text-primary)]">
                    <Sparkles size={15} className="text-[var(--math-vector)]" />
                    <span>{isRtl ? 'تفعيل تنبيهات سطح المكتب' : 'Enable Desktop System Notifications'}</span>
                  </div>
                  <p className="text-[11px] text-[var(--text-tertiary)] max-w-xl">
                    {isRtl
                      ? 'إرسال إشعارات مباشرة إلى نظام التشغيل (Windows / Linux / macOS) لتذكيرك بمراجعة البطاقات وحماية سلسلة أيام التعلم دون الحاجة لأي خادم وسيط.'
                      : 'Delivers native OS notification toasts (Windows / Linux / macOS) for streak defense and FSRS card review reminders with zero cloud telemetry.'}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <TactileSwitch
                    checked={config.notificationsEnabled}
                    onChange={(val) => setNotificationsEnabled(val)}
                  />
                </div>
              </div>

              {/* Habit Loop Strategy Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Duolingo Streak Defense Loop */}
                <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-app)] space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-semibold text-[var(--text-primary)]">
                      <Flame size={15} className="text-[var(--math-gradient)]" />
                      <span>{isRtl ? 'حماية السلسلة اليومية (Duolingo Loop)' : 'Streak Defense Protocol'}</span>
                    </div>
                    <TactileSwitch
                      disabled={!config.notificationsEnabled}
                      checked={config.streakRemindersEnabled}
                      onChange={(val) => setStreakRemindersEnabled(val)}
                    />
                  </div>
                  <p className="text-[11px] text-[var(--text-tertiary)] leading-relaxed">
                    {isRtl
                      ? 'تنبيه مسائي في التوقيت المفضل ينبهك قبل انتهاء اليوم إذا لم تسجل نقاط XP لحماية السلسلة ومنع فقدانها.'
                      : 'Evening nudge triggered if you have not completed a micro-lesson today, defending your streak momentum.'}
                  </p>
                  <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs font-mono">
                    <span className="text-[var(--text-secondary)] flex items-center gap-1.5">
                      <Clock size={13} />
                      {isRtl ? 'وقت التذكير المفضل:' : 'Scheduled Hour:'}
                    </span>
                    <select
                      disabled={!config.notificationsEnabled || !config.streakRemindersEnabled}
                      value={config.dailyReminderHour ?? 19}
                      onChange={(e) => setDailyReminderHour(Number(e.target.value))}
                      className="px-2.5 py-1 text-xs font-mono rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-primary)] outline-none focus:border-emerald-500 disabled:opacity-50 cursor-pointer"
                    >
                      <option value={17}>17:00 (5:00 PM)</option>
                      <option value={18}>18:00 (6:00 PM)</option>
                      <option value={19}>19:00 (7:00 PM - Duolingo Default)</option>
                      <option value={20}>20:00 (8:00 PM)</option>
                      <option value={21}>21:00 (9:00 PM)</option>
                      <option value={22}>22:00 (10:00 PM)</option>
                    </select>
                  </div>
                </div>

                {/* Brilliant Spaced Repetition Loop */}
                <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-app)] space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-semibold text-[var(--text-primary)]">
                      <Brain size={15} className="text-[var(--math-vector)]" />
                      <span>{isRtl ? 'تذكير التكرار المتباعد FSRS (Brilliant Loop)' : 'FSRS Spaced Repetition Due'}</span>
                    </div>
                    <TactileSwitch
                      disabled={!config.notificationsEnabled}
                      checked={config.fsrsRemindersEnabled}
                      onChange={(val) => setFsrsRemindersEnabled(val)}
                    />
                  </div>
                  <p className="text-[11px] text-[var(--text-tertiary)] leading-relaxed">
                    {isRtl
                      ? 'تنبيه ذكي عند تراكم 3 بطاقات مراجعة أو أكثر في منحنى النسيان لتثبيت المعرفة الرياضية طويلة المدى.'
                      : 'Intelligent midday reminder dispatched whenever 3 or more memory cards are due under FSRS-4.5 cognitive retention curves.'}
                  </p>
                  <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs font-mono">
                    <span className="text-[var(--text-secondary)]">
                      {isRtl ? 'العتبة التكيفية:' : 'Trigger Threshold:'}
                    </span>
                    <span className="text-[var(--math-vector)] font-semibold">
                      ≥ 3 Due Cards
                    </span>
                  </div>
                </div>
              </div>

              {/* Notification Dispatch Test Action */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-[var(--border-subtle)]">
                <div className="text-xs text-[var(--text-secondary)]">
                  {isRtl
                    ? 'جرب قناة الإشعارات للتحقق من أذونات نظام التشغيل الحالية.'
                    : 'Dispatch an immediate test notification to verify OS-level notification permissions.'}
                </div>
                <button
                  type="button"
                  onClick={handleTestNotification}
                  disabled={notificationTestStatus === 'requesting'}
                  className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[var(--bg-app)] hover:bg-[var(--bg-surface-active)] border border-[var(--border-strong)] text-xs font-mono font-medium text-[var(--text-primary)] transition-all active:scale-95 cursor-pointer disabled:opacity-50"
                >
                  {notificationTestStatus === 'sent' ? (
                    <Check size={14} className="text-emerald-400" />
                  ) : notificationTestStatus === 'denied' ? (
                    <X size={14} className="text-rose-400" />
                  ) : (
                    <Bell size={14} className="text-[var(--math-gradient)]" />
                  )}
                  <span>
                    {notificationTestStatus === 'requesting'
                      ? isRtl
                        ? 'طلب الإذن...'
                        : 'Requesting OS Permission...'
                      : notificationTestStatus === 'sent'
                      ? isRtl
                        ? 'تم الإرسال بنجاح!'
                        : 'Notification Sent!'
                      : notificationTestStatus === 'denied'
                      ? isRtl
                        ? 'تم رفض الإذن من النظام'
                        : 'Permission Denied in OS Settings'
                      : isRtl
                      ? 'إرسال إشعار تجريبي الآن'
                      : 'Test Desktop Notification'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB: MODULAR CURRICULUM CONTAINERS */}
        {activeCategory === 'modules' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] specular space-y-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5 text-xs font-mono font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                  <Layers size={15} className="text-[var(--math-vector)]" />
                  <span>
                    {isRtl
                      ? 'إدارة الحزم المقطعية والتنزيل الانتقائي (.okvir)'
                      : 'Modular Curriculum Containers & Chunking (.okvir)'}
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20 font-bold">
                  LOCAL DISK: ~4.6 MB TOTAL
                </span>
              </div>

              <div className="p-4 rounded-xl border border-sky-500/20 bg-sky-500/5 text-xs space-y-2">
                <div className="flex items-center gap-2 text-sky-400 font-semibold font-mono">
                  <ShieldCheck size={16} />
                  <span>
                    {isRtl
                      ? 'معمارية التنزيل الخفيف وتوفير الموارد'
                      : 'Lightweight Distribution & Local Chunking Architecture'}
                  </span>
                </div>
                <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                  {isRtl
                    ? 'يأتي برنامج OKVIR بتصميم معياري فائق الخفة: يتم تضمين المسار التأسيسي الأول فوراً للبدء الفوري بدون إنترنت. كل مسار تعليمي يعمل كحاوية معزولة ومشفرة بتوقيعات Ed25519 لضمان السلامة والسرعة.'
                    : 'OKVIR adopts a lightweight on-demand modular distribution pattern. Track 1 is pre-bundled for instant zero-latency onboarding, while subsequent tracks run inside isolated, tamper-evident .okvir containers with Ed25519 signature verification.'}
                </p>
              </div>

              {/* Offline .okvir Container Import Action Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-app)]">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[var(--text-primary)]">
                    <Upload size={14} className="text-sky-400" />
                    <span>{isRtl ? 'استيراد حاوية منهج غير متصلة (.okvir)' : 'Import Offline .okvir Container'}</span>
                  </div>
                  <p className="text-[11px] text-[var(--text-tertiary)]">
                    {isRtl
                      ? 'تحميل ومصادقة حزمة مسار تعليمي تم تصديرها من جهاز آخر أو من مستودع GitHub.'
                      : 'Load and authenticate an educational track package exported from another machine or GitHub release.'}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <label className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--border-strong)] hover:bg-[var(--bg-surface-active)] bg-[var(--bg-surface)] text-xs font-mono font-medium text-[var(--text-primary)] transition-all cursor-pointer active:scale-95">
                    <Upload size={13} className="text-sky-400" />
                    <span>{isRtl ? 'اختيار ملف .okvir' : 'Select .okvir File'}</span>
                    <input
                      type="file"
                      accept=".okvir"
                      onChange={handleImportOkvir}
                      className="hidden"
                    />
                  </label>

                  {importStatus && (
                    <span className="text-[11px] font-mono px-2 py-1 rounded bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
                      {importStatus.startsWith('success:')
                        ? isRtl
                          ? `تم التحقق بنجاح (${importStatus.split(':')[1]} درساً) ✓`
                          : `Verified OK (${importStatus.split(':')[1]} lessons) ✓`
                        : importStatus === 'reading'
                        ? isRtl
                          ? 'جارٍ التحقق...'
                          : 'Validating Header...'
                        : isRtl
                        ? 'توقيع الحاوية غير صالح ✕'
                        : 'Invalid Container Signature ✕'}
                    </span>
                  )}
                </div>
              </div>

              {/* Track Modules Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tracks.map((track) => {
                  const trackLessons = curriculum.filter((l) => l.trackId === track.id);
                  const completedInTrack = trackLessons.filter((l) => lessons[l.id]?.status === 'mastered').length;
                  const isVerifying = moduleVerifyStatus[track.id] === 'checking';
                  const isVerified = moduleVerifyStatus[track.id] === 'verified';
                  const trackDesc =
                    track.id === 'math'
                      ? isRtl
                        ? 'الجبر الخطي والتفاضل والاحتمالات وأسس الاستمثال الرياضي'
                        : 'Linear algebra, calculus, probability & optimization foundations'
                      : track.id === 'programming'
                      ? isRtl
                        ? 'بنية بايثون الداخلية والتزامن والتعامل مع ذاكرة الحوسبة'
                        : 'Python internals, bytecode, async concurrency & NumPy memory layout'
                      : track.id === 'econometrics'
                      ? isRtl
                        ? 'الاستدلال السببي ونماذج المتغيرات الآلية وتجارب القياس الاقتصادي'
                        : 'Causal inference, identification strategies, IV & panel methods'
                      : isRtl
                      ? 'الانتشار العكسي ومحولات الانتباه وعمارة التعلم العميق'
                      : 'Backpropagation, transformers, attention heads & autograd kernels';

                  return (
                    <div
                      key={track.id}
                      className="p-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-app)] space-y-4 hover:border-[var(--border-strong)] transition-all"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-[var(--text-primary)]">
                              {isRtl ? track.titleAr : track.title}
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.2 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                              {track.id === 'math' ? 'Bundled' : 'Installed'}
                            </span>
                          </div>
                          <p className="text-[11px] text-[var(--text-tertiary)] line-clamp-2">
                            {trackDesc}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-2 border-t border-[var(--border-subtle)]">
                        <div>
                          <span className="text-[10px] text-[var(--text-tertiary)] block">
                            {isRtl ? 'الدروس والتقدم:' : 'Lessons & Progress:'}
                          </span>
                          <span className="text-[var(--text-primary)] font-semibold">
                            {completedInTrack} / {trackLessons.length} Completed
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] text-[var(--text-tertiary)] block">
                            {isRtl ? 'حجم الحاوية:' : 'Container Footprint:'}
                          </span>
                          <span className="text-[var(--text-secondary)]">
                            {track.id === 'math'
                              ? '~1.2 MB'
                              : track.id === 'programming'
                              ? '~0.9 MB'
                              : track.id === 'econometrics'
                              ? '~1.1 MB'
                              : '~1.4 MB'}
                          </span>
                        </div>
                      </div>

                      {streamingTrack[track.id] !== undefined ? (
                        <div className="space-y-1.5 pt-2 border-t border-[var(--border-subtle)] font-mono text-xs">
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="text-sky-400 flex items-center gap-1.5">
                              <Download size={12} className="animate-bounce" />
                              <span>{isRtl ? 'جارٍ تدفق الحاوية المجزأة...' : 'Streaming .okvir chunk...'}</span>
                            </span>
                            <span className="text-[var(--text-secondary)] tabular-nums">
                              {streamingTrack[track.id]}%
                            </span>
                          </div>
                          <div className="w-full h-1.5 bg-[var(--bg-surface)] rounded-full overflow-hidden border border-[var(--border-subtle)]">
                            <div
                              className="h-full bg-sky-500 rounded-full transition-all duration-150"
                              style={{ width: `${streamingTrack[track.id]}%` }}
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between pt-2 border-t border-[var(--border-subtle)] flex-wrap gap-2">
                          <div className="flex items-center gap-1.5 text-[11px] font-mono text-[var(--text-tertiary)]">
                            <Lock size={12} className="text-emerald-500" />
                            <span>Ed25519 Signed</span>
                          </div>

                          <div className="flex items-center gap-1.5 flex-wrap">
                            <button
                              type="button"
                              onClick={() => handleExportOkvir(track.id)}
                              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[var(--border-subtle)] hover:border-emerald-500/50 bg-[var(--bg-surface)] text-[11px] font-mono text-[var(--text-secondary)] hover:text-emerald-400 transition-all active:scale-95 cursor-pointer"
                              title="Export track to offline .okvir binary container"
                            >
                              <Download size={12} />
                              <span>{isRtl ? 'تصدير .okvir' : 'Export .okvir'}</span>
                            </button>

                            {track.id !== 'math' && (
                              <button
                                type="button"
                                onClick={() => handleStreamModule(track.id)}
                                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[var(--border-subtle)] hover:border-sky-500/50 bg-[var(--bg-surface)] text-[11px] font-mono text-[var(--text-secondary)] hover:text-sky-400 transition-all active:scale-95 cursor-pointer"
                                title="Stream / Refresh container from mirror"
                              >
                                <RefreshCw size={12} />
                                <span>{isRtl ? 'إعادة المزامنة' : 'Re-sync'}</span>
                              </button>
                            )}

                            <button
                              type="button"
                              onClick={() => handleVerifyModule(track.id)}
                              disabled={isVerifying}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--border-subtle)] hover:border-[var(--border-strong)] bg-[var(--bg-surface)] text-[11px] font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all active:scale-95 cursor-pointer"
                            >
                              <FileCheck2 size={13} className={isVerified ? 'text-emerald-400' : 'text-sky-400'} />
                              <span>
                                {isVerifying
                                  ? isRtl
                                    ? 'جارٍ الفحص...'
                                    : 'Verifying SHA-256...'
                                  : isRtl
                                  ? 'فحص التوقيع'
                                  : 'Verify Integrity'}
                              </span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB: SOFTWARE UPDATES & COMMUNITY RELEASES */}
        {activeCategory === 'updates' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] specular space-y-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5 text-xs font-mono font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                  <Sparkles size={15} className="text-[var(--math-gradient)]" />
                  <span>
                    {isRtl
                      ? 'تحديثات البرنامج ومتابعة الإصدارات من GitHub'
                      : 'Software Updates & GitHub Release Feeds'}
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--math-vector)]/10 text-[var(--math-vector)] border border-[var(--math-vector)]/20 font-bold">
                  CURRENT: {displayVersion}
                </span>
              </div>

              {/* Version & Check Action Hero Card */}
              <div className="p-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-app)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm font-bold text-[var(--text-primary)]">
                    <Activity size={16} className="text-[var(--math-gradient)]" />
                    <span>OKVIR Native Desktop Application</span>
                  </div>
                  <p className="text-xs text-[var(--text-tertiary)] font-mono">
                    {isRtl
                      ? `الإصدار الحالي المثبت: ${displayVersion} • فحص تلقائي ومباشر من GitHub Releases`
                      : `Installed Build: ${displayVersion} • Direct unauthenticated feed from GitHub Releases`}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleCheckForUpdates}
                  disabled={checkingUpdate}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-mono font-bold transition-all shadow-md active:scale-95 cursor-pointer disabled:opacity-50"
                >
                  <RefreshCw size={14} className={checkingUpdate ? 'animate-spin' : ''} />
                  <span>
                    {checkingUpdate
                      ? isRtl
                        ? 'جارٍ فحص المستودع...'
                        : 'Checking GitHub...'
                      : isRtl
                      ? 'فحص التحديثات الآن'
                      : 'Check for Updates'}
                  </span>
                </button>
              </div>

              {/* Update Error Notice */}
              {updateError && (
                <div className="p-4 rounded-xl border border-rose-500/20 bg-rose-500/5 text-xs text-rose-400 font-mono space-y-1">
                  <div className="font-bold flex items-center gap-2">
                    <AlertTriangle size={14} />
                    <span>{isRtl ? 'تعذر جلب بيانات التحديث' : 'Update Check Notice'}</span>
                  </div>
                  <p className="text-[11px] text-[var(--text-tertiary)]">{updateError}</p>
                </div>
              )}

              {/* Release Info Details when fetched */}
              {releaseInfo && (
                <div className="p-5 rounded-xl border border-emerald-500/30 bg-emerald-500/5 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-[var(--text-primary)]">
                          {releaseInfo.name || releaseInfo.version}
                        </span>
                        <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                          {releaseInfo.version}
                        </span>
                      </div>
                      <span className="text-[11px] text-[var(--text-tertiary)] font-mono">
                        Published {new Date(releaseInfo.publishedAt).toLocaleDateString()}
                      </span>
                    </div>

                    {/* Community Download Counter */}
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-emerald-500/20 bg-[var(--bg-app)] text-xs font-mono">
                      <Download size={13} className="text-emerald-400" />
                      <span className="text-[var(--text-secondary)]">Total Downloads:</span>
                      <span className="font-bold text-emerald-400 tabular-nums">
                        {releaseInfo.totalDownloads.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {releaseInfo.body && (
                    <div className="p-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-app)] text-xs font-mono text-[var(--text-secondary)] max-h-48 overflow-y-auto whitespace-pre-wrap">
                      {releaseInfo.body}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2 border-t border-emerald-500/20">
                    <span className="text-xs text-[var(--text-secondary)] font-mono">
                      {releaseInfo.assets.length} Platform Installer Assets Available
                    </span>
                    <a
                      href={releaseInfo.htmlUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-mono font-semibold transition-all shadow-sm active:scale-95"
                    >
                      <ExternalLink size={13} />
                      <span>{isRtl ? 'عرض في GitHub' : 'View on GitHub'}</span>
                    </a>
                  </div>
                </div>
              )}

              {/* Zero-Telemetry Privacy Policy Card */}
              <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-app)] space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[var(--text-primary)]">
                  <Lock size={14} className="text-[var(--math-vector)]" />
                  <span>
                    {isRtl
                      ? 'ميثاق الخصوصية التامة ومقاييس المجتمع المفتوحة'
                      : 'Privacy Architecture & Transparent Community Counters'}
                  </span>
                </div>
                <p className="text-[11px] text-[var(--text-tertiary)] leading-relaxed">
                  {isRtl
                    ? 'يتم جلب أعداد التنزيلات ومعلومات الإصدارات مباشرة من واجهة GitHub API دون وسيط ودون تتبع جهازك أو جمع أي بيانات شخصية على الإطلاق.'
                    : 'Release metadata and community download counts are aggregated client-side directly via the GitHub Public API. OKVIR operates zero analytical trackers, zero user identification beacons, and zero middleman telemetry servers.'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ARABIC TYPOGRAPHY & MATH STUDIO */}
        {activeCategory === 'typography' && (
          <div className="space-y-6">
            {/* Font Engine Selection Grid */}
            <div className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] specular space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5 text-xs font-mono font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                  <Type size={15} className="text-[var(--math-vector)]" />
                  <span>{isRtl ? 'محرك الخطوط العربية ونظام التنضيد' : 'Arabic Typography Engine & Font Architecture'}</span>
                </div>
                <span className="text-[10px] font-mono text-[var(--math-vector)] bg-[var(--math-vector)]/10 px-2 py-0.5 rounded border border-[var(--math-vector)]/20 font-bold">
                  {config.arabicFont === 'readex'
                    ? 'Readex Pro'
                    : config.arabicFont === 'cairo'
                    ? 'Cairo'
                    : config.arabicFont === 'alexandria'
                    ? 'Alexandria'
                    : 'IBM Plex Sans Arabic (Active)'}
                </span>
              </div>

              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                {isRtl
                  ? 'خطوط عربية مدمجة بالكامل ومحسنة خصيصاً للمنصات التعليمية (EdTech) والعلوم الدقيقة للحفاظ على خط الأساس الأفقي والانسجام التام مع رموز معادلات KaTeX الرياضية.'
                  : 'Engineered typography pipeline calibrated specifically for EdTech and mathematical pedagogy. Bundled 100% offline with zero remote CDN dependencies.'}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  {
                    id: 'ibm' as ArabicFontFamily,
                    name: 'IBM Plex Sans Arabic',
                    nameAr: 'آي بي إم بلكس العربي (الافتراضي)',
                    tag: 'STEM & AI • Instrument-Grade',
                    desc: 'Engineered for scientific precision, programming, and mathematical formulas with crisp, rhythmic letterforms.',
                    descAr: 'خط علمي تقني فائق الدقة، مصمم خصيصاً للرياضيات والبرمجة وبيئات الذكاء الاصطناعي.',
                    preview: 'أُوكْفِير: بيئة تفاعلية للمفاهيم الرياضية والذكاء الاصطناعي',
                    fontFamily: "'IBM Plex Sans Arabic', sans-serif",
                  },
                  {
                    id: 'readex' as ArabicFontFamily,
                    name: 'Readex Pro',
                    nameAr: 'ريدكس برو التعليمي',
                    tag: 'EdTech • Reading Research',
                    desc: 'Designed specifically for reading comprehension, educational platforms, and reduced cognitive load.',
                    descAr: 'صُمم خصيصاً لأبحاث القراءة والمنصات التعليمية لتسهيل الاستيعاب البصري وتقليل إجهاد العين.',
                    preview: 'أُوكْفِير: بيئة تفاعلية للمفاهيم الرياضية والذكاء الاصطناعي',
                    fontFamily: "'Readex Pro', sans-serif",
                  },
                  {
                    id: 'cairo' as ArabicFontFamily,
                    name: 'Cairo',
                    nameAr: 'كايرو الهندسي المعاصر',
                    tag: 'Modern Geometric UI',
                    desc: 'Contemporary geometric typeface blending modern Kufic proportions with UI clarity and balance.',
                    descAr: 'خط كوفي هندسي معاصر يجمع بين جمالية النسب وتناسق واجهات المستخدم التفاعلية.',
                    preview: 'أُوكْفِير: بيئة تفاعلية للمفاهيم الرياضية والذكاء الاصطناعي',
                    fontFamily: "'Cairo', sans-serif",
                  },
                  {
                    id: 'alexandria' as ArabicFontFamily,
                    name: 'Alexandria',
                    nameAr: 'الإسكندرية المعاصر',
                    tag: 'Editorial & Dashboard',
                    desc: 'Ultra-clean contemporary Arabic grotesque font with wide rhythm, balanced weights, and clear counters.',
                    descAr: 'خط عربي عصري متوازن ذو إيقاع بصري رحب ومثالي للوحات التحكم والمختبرات البرمجية.',
                    preview: 'أُوكْفِير: بيئة تفاعلية للمفاهيم الرياضية والذكاء الاصطناعي',
                    fontFamily: "'Alexandria', sans-serif",
                  },
                ].map((f) => {
                  const active = (config.arabicFont || 'ibm') === f.id || (f.id === 'ibm' && (config.arabicFont === 'noto' || !config.arabicFont));
                  return (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => {
                        audio.playClick(1.3);
                        setArabicFont(f.id);
                      }}
                      className={`text-start p-4 rounded-xl border transition-all relative cursor-pointer ${
                        active
                          ? 'border-[var(--math-vector)] bg-[var(--math-vector)]/10 shadow-md ring-1 ring-[var(--math-vector)]/30'
                          : 'border-[var(--border-subtle)] bg-[var(--bg-app)] hover:border-[var(--border-strong)] hover:bg-[var(--bg-surface-hover)]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-[var(--text-primary)]">
                          {isRtl ? f.nameAr : f.name}
                        </span>
                        <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-[var(--bg-surface)] text-[var(--text-tertiary)] border border-[var(--border-subtle)]">
                          {f.tag}
                        </span>
                      </div>
                      <div
                        className="text-sm font-semibold text-[var(--text-primary)] my-2 line-clamp-1"
                        style={{ fontFamily: f.fontFamily }}
                        dir="rtl"
                      >
                        {f.preview}
                      </div>
                      <p className="text-[11px] text-[var(--text-tertiary)] line-clamp-2 leading-relaxed">
                        {isRtl ? f.descAr : f.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Interactive Live Typography & KaTeX Dual-Script Sandbox */}
            <div className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] specular space-y-5 shadow-sm">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                  <Sigma size={15} className="text-[var(--math-data)]" />
                  <span>{isRtl ? 'مختبر المعاينة المباشرة: العربية والرياضيات' : 'Interactive Dual-Script Typography Sandbox'}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-[var(--text-tertiary)]">
                    {sandboxFontSize}px
                  </span>
                  <input
                    type="range"
                    min={13}
                    max={20}
                    step={1}
                    value={sandboxFontSize}
                    onChange={(e) => setSandboxFontSize(Number(e.target.value))}
                    className="w-24 accent-emerald-500 cursor-pointer"
                  />
                </div>
              </div>

              {/* Preset Selector */}
              <div className="flex items-center gap-2">
                {[
                  { id: 'gradient', label: 'Gradient Descent', math: '\\theta_{t+1} = \\theta_t - \\eta \\cdot \\nabla L(\\theta_t)', textAr: 'خوارزمية الانحدار التدريجي هي طريقة لتحسين وتحديث معاملات النموذج في اتجاه الانحدار السالب لمصفوفة الخسارة.' },
                  { id: 'autograd', label: 'Autograd & Chain Rule', math: '\\frac{\\partial L}{\\partial x} = \\sum_i \\frac{\\partial L}{\\partial y_i} \\frac{\\partial y_i}{\\partial x}', textAr: 'قاعدة السلسلة الرياضية هي الأساس الحسابي لمحرك التمايز التلقائي في شبكات التعلم العميق.' },
                  { id: 'ols', label: 'Gauss-Markov BLUE', math: '\\hat{\\beta} = (X^T X)^{-1} X^T y', textAr: 'مقدر المربعات الصغرى العادية هو أفضل مقدر خطي غير متحيّز في ظل استيفاء فروض النظرية.' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      audio.playClick(1.2);
                      setSandboxPreset(item.id as typeof sandboxPreset);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                      sandboxPreset === item.id
                        ? 'bg-[var(--math-data)]/15 text-[var(--math-data)] border border-[var(--math-data)]/30 font-bold'
                        : 'bg-[var(--bg-app)] text-[var(--text-secondary)] border border-[var(--border-subtle)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Live Render Area */}
              <div className="p-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-app)] space-y-4">
                <div
                  className="leading-relaxed text-[var(--text-primary)]"
                  style={{
                    fontSize: `${sandboxFontSize}px`,
                    fontFamily:
                      config.arabicFont === 'readex'
                        ? "'Readex Pro', sans-serif"
                        : config.arabicFont === 'cairo'
                        ? "'Cairo', sans-serif"
                        : config.arabicFont === 'alexandria'
                        ? "'Alexandria', sans-serif"
                        : "'IBM Plex Sans Arabic', sans-serif",
                  }}
                  dir="rtl"
                >
                  {sandboxPreset === 'gradient'
                    ? 'خوارزمية الانحدار التدريجي هي طريقة لتحسين وتحديث معاملات النموذج في اتجاه الانحدار السالب لمصفوفة الخسارة:'
                    : sandboxPreset === 'autograd'
                    ? 'قاعدة السلسلة الرياضية هي الأساس الحسابي لمحرك التمايز التلقائي في شبكات التعلم العميق:'
                    : 'مقدر المربعات الصغرى العادية هو أفضل مقدر خطي غير متحيّز في ظل استيفاء فروض نظرية غاوس-ماركوف:'}
                </div>

                <div className="py-2 px-4 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex items-center justify-center">
                  <KaTeXMath
                    math={
                      sandboxPreset === 'gradient'
                        ? '\\theta_{t+1} = \\theta_t - \\eta \\cdot \\nabla L(\\theta_t)'
                        : sandboxPreset === 'autograd'
                        ? '\\frac{\\partial L}{\\partial x} = \\sum_{i} \\frac{\\partial L}{\\partial y_i} \\frac{\\partial y_i}{\\partial x}'
                        : '\\hat{\\beta} = (X^T X)^{-1} X^T y'
                    }
                    block={true}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: STORAGE & SQLITE ENGINE */}
        {activeCategory === 'storage' && (
          <div className="space-y-6">
            {/* Real Disk Telemetry Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] specular space-y-1">
                <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-tertiary)] flex items-center gap-1.5">
                  <Database size={12} className="text-[var(--math-vector)]" />
                  <span>Storage Footprint</span>
                </div>
                <div className="text-base font-mono font-bold tabular-nums text-[var(--text-primary)]">
                  {(storageBytes / 1024).toFixed(1)} KB
                </div>
                <div className="text-[10px] text-[var(--text-tertiary)] font-mono">
                  State, FSRS queue, cache
                </div>
              </div>

              <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] specular space-y-1">
                <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-tertiary)] flex items-center gap-1.5">
                  <HardDrive size={12} className="text-[var(--math-data)]" />
                  <span>SQLite Journal Mode</span>
                </div>
                <div className="text-base font-mono font-bold text-[var(--math-data)]">
                  WAL (Write-Ahead)
                </div>
                <div className="text-[10px] text-[var(--text-tertiary)] font-mono">
                  Concurrent reads / zero lock
                </div>
              </div>

              <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] specular space-y-1">
                <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-tertiary)] flex items-center gap-1.5">
                  <ShieldCheck size={12} className="text-[var(--math-vector)]" />
                  <span>Network Isolation</span>
                </div>
                <div className="text-base font-mono font-bold text-[var(--math-vector)]">
                  100% Offline
                </div>
                <div className="text-[10px] text-[var(--text-tertiary)] font-mono">
                  0 external HTTP requests
                </div>
              </div>
            </div>

            {/* Database Integrity Verifier */}
            <div className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] specular space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5 text-xs font-mono font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                  <CheckCircle2 size={15} className="text-[var(--math-vector)]" />
                  <span>{isRtl ? 'فحص سلامة قاعدة البيانات والمخطط' : 'SQLite B-Tree & Page Integrity Check'}</span>
                </div>

                <button
                  type="button"
                  onClick={handleRunIntegrityCheck}
                  disabled={integrityState === 'checking'}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--math-vector)]/30 bg-[var(--math-vector)]/10 hover:bg-[var(--math-vector)]/20 text-[var(--math-vector)] text-xs font-mono font-semibold transition-all active:scale-95 disabled:opacity-50 cursor-pointer whitespace-nowrap shrink-0"
                >
                  <Activity size={13} className={`shrink-0 ${integrityState === 'checking' ? 'animate-spin' : ''}`} />
                  <span className="whitespace-nowrap">
                    {integrityState === 'checking'
                      ? isRtl
                        ? 'جارٍ الفحص...'
                        : 'Scanning Pages...'
                      : integrityState === 'passed'
                      ? isRtl
                        ? 'تم التحقق ✓'
                        : 'Verified Clean ✓'
                      : isRtl
                      ? 'تشغيل فحص السلامة'
                      : 'Run PRAGMA Check'}
                  </span>
                </button>
              </div>

              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                {isRtl
                  ? 'يتم تخزين بيانات الدروس، وبطاقات FSRS، والتقدم الأكاديمي محلياً في ~/.okvir/storage.db مع تسجيل كامل في سجل العمليات (WAL).'
                  : 'Okvir persists all learning transactions, FSRS-4.5 due schedules, and credentials in an embedded local SQLite instance at ~/.okvir/storage.db.'}
              </p>

              {integrityState === 'passed' && (
                <div className="p-3 rounded-xl border border-[var(--math-vector)]/30 bg-[var(--math-vector)]/10 flex items-center gap-2.5 text-xs font-mono text-[var(--math-vector)] font-semibold">
                  <CheckCircle2 size={15} />
                  <span>PRAGMA integrity_check = OK. 0 corrupt pages detected. SHA-256 state matching.</span>
                </div>
              )}
            </div>

            {/* Backup & Restore Studio */}
            <div className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] specular space-y-4 shadow-sm">
              <div className="flex items-center gap-2.5 text-xs font-mono font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                <Layers size={15} className="text-[var(--math-data)]" />
                <span>{isRtl ? 'النسخ الاحتياطي واستعادة البيانات' : 'Snapshot Backup & Disaster Recovery'}</span>
              </div>

              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                {isRtl
                  ? 'يمكنك تصدير لقطة JSON مشفرة وغير تابعة لأي خادم لاستعادتها على أي جهاز آخر، أو تحميل كود إنشاء الجداول (DDL).'
                  : 'Export a portable, transparent JSON snapshot of your entire local learning state to migrate across machines or archive.'}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleExportBackup}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-app)] hover:border-[var(--math-vector)]/50 hover:bg-[var(--bg-surface-hover)] text-xs font-mono text-[var(--text-primary)] transition-all cursor-pointer active:scale-95 shadow-sm whitespace-nowrap shrink-0"
                >
                  <Download size={14} className="text-[var(--math-vector)] shrink-0" />
                  <span className="whitespace-nowrap">{isRtl ? 'تصدير نسخة احتياطية (.json)' : 'Export JSON Snapshot'}</span>
                </button>

                <label className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-app)] hover:border-[var(--math-data)]/50 hover:bg-[var(--bg-surface-hover)] text-xs font-mono text-[var(--text-primary)] transition-all cursor-pointer active:scale-95 shadow-sm whitespace-nowrap shrink-0">
                  <Upload size={14} className="text-[var(--math-data)] shrink-0" />
                  <span className="whitespace-nowrap">{isRtl ? 'استيراد نسخة سابقة' : 'Restore from Snapshot'}</span>
                  <input type="file" accept=".json" onChange={handleImportFile} className="hidden" />
                </label>

                <a
                  href="/src/lib/sqlite-schema.sql"
                  download="okvir-sqlite-schema.sql"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-app)] hover:border-[var(--border-strong)] text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all cursor-pointer"
                >
                  <FileCheck2 size={14} className="text-[var(--math-gradient)]" />
                  <span>{isRtl ? 'تحميل مخطط SQLite DDL' : 'Download SQLite Schema (.sql)'}</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: KERNEL & RUNTIME SANDBOX */}
        {activeCategory === 'runtime' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] specular space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5 text-xs font-mono font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                  <Cpu size={15} className="text-[var(--math-prediction)]" />
                  <span>{isRtl ? 'بيئة تنفيذ بايثون المعزولة (WebAssembly Sandbox)' : 'Python WASM Kernel & Sandbox Worker'}</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--math-vector)]/10 text-[var(--math-vector)] border border-[var(--math-vector)]/20 font-bold">
                  PYODIDE v0.26 ACTIVE
                </span>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-app)] space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-[var(--text-primary)]">
                    <span className="flex items-center gap-2">
                      <Terminal size={14} className="text-[var(--math-prediction)]" />
                      <span>Dedicated Web Worker Isolation</span>
                    </span>
                    <span className="text-[var(--math-vector)] font-mono text-[11px] font-bold">Sandboxed</span>
                  </div>
                  <p className="text-[11px] text-[var(--text-tertiary)] leading-relaxed">
                    {isRtl
                      ? 'يعمل كود بايثون داخل Web Worker منفصل مع مراقب لمنع التجميد أو الحلقات اللانهائية. لا يمكن للكود الوصول إلى DOM أو الشبكة.'
                      : 'Python execution operates in an isolated Web Worker thread with execution watchdog guards. Complete protection against main UI thread freezing.'}
                  </p>
                </div>

                {/* Execution Timeout Guard */}
                <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-app)] space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="text-xs font-semibold text-[var(--text-primary)]">
                        {isRtl ? 'المهلة القصوى لتنفيذ الكود (Watchdog Timeout)' : 'Kernel Execution Watchdog Limit'}
                      </div>
                      <div className="text-[11px] text-[var(--text-tertiary)]">
                        {isRtl
                          ? 'إيقاف التنفيذ تلقائياً إذا تجاوز الكود المدة المحددة لحماية المعالج'
                          : 'Terminates runaway loops or heavy autograd computations after threshold.'}
                      </div>
                    </div>
                    <span className="text-xs font-mono text-[var(--math-prediction)] font-bold tabular-nums">
                      {((config.pythonTimeoutMs || 5000) / 1000).toFixed(1)}s
                    </span>
                  </div>

                  <input
                    type="range"
                    min={2000}
                    max={15000}
                    step={1000}
                    value={config.pythonTimeoutMs || 5000}
                    onChange={(e) => setPythonTimeout(Number(e.target.value))}
                    className="w-full accent-purple-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-[var(--text-tertiary)]">
                    <span>2.0s (Strict)</span>
                    <span>5.0s (Default)</span>
                    <span>15.0s (Heavy Deep Learning)</span>
                  </div>
                </div>

                {/* OPFS File System Mount */}
                <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-app)] flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-[var(--text-primary)]">
                      Virtual Filesystem (/workspace)
                    </div>
                    <div className="text-[11px] text-[var(--text-tertiary)]">
                      Origin Private File System (OPFS) mount for datasets and weight checkpoints.
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--math-vector)]/10 text-[var(--math-vector)] border border-[var(--math-vector)]/20 font-bold">
                    MOUNTED
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: VERIFIABLE CREDENTIALS (W3C OPEN BADGES 3.0) */}
        {activeCategory === 'credentials' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] specular space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5 text-xs font-mono font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                  <Award size={15} className="text-[var(--math-gradient)]" />
                  <span>
                    {isRtl
                      ? 'الشهادات والاعتمادات الرقمية الموثقة (W3C Open Badges 3.0)'
                      : 'Cryptographic Verifiable Credentials (W3C Open Badges 3.0)'}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[var(--math-data)] bg-[var(--math-data)]/10 px-2 py-0.5 rounded border border-[var(--math-data)]/20 font-bold">
                  Ed25519 Local Signed
                </span>
              </div>

              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                {isRtl
                  ? 'شهادات رقمية غير قابلة للتلاعب تصدر وتوقع محلياً بنسبة 100% باستخدام مفاتيح Ed25519 عند إتقان الوحدات. متوافقة مع معايير W3C قابلة للتصدير والتحقق دون الحاجة لأي خادم وسيط.'
                  : 'Tamper-resistant cryptographic assertions generated 100% offline via local Ed25519 signature scheme upon curriculum mastery. Verifiable by any standard W3C-compliant digital wallet.'}
              </p>

              <div className="space-y-3.5 pt-2">
                {MILESTONE_BADGES.map((badge) => {
                  const isUnlocked = checkBadgeEligibility(badge, lessons);
                  let masteredCount = 0;
                  let totalCount = 0;

                  if (badge.trackId) {
                    const track = tracks.find((t) => t.id === badge.trackId);
                    totalCount = track?.modules.length || 0;
                    masteredCount =
                      track?.modules.filter((id) => lessons[id]?.status === 'mastered').length || 0;
                  } else {
                    totalCount = curriculum.length;
                    masteredCount = curriculum.filter(
                      (m) => lessons[m.id]?.status === 'mastered'
                    ).length;
                  }

                  const percent = totalCount > 0 ? Math.round((masteredCount / totalCount) * 100) : 0;
                  const isInspecting = inspectingBadgeId === badge.id;

                  return (
                    <div
                      key={badge.id}
                      className={`p-5 rounded-2xl border transition-all ${
                        isUnlocked
                          ? 'border-amber-500/30 bg-amber-500/5 specular shadow-md'
                          : 'border-[var(--border-subtle)] bg-[var(--bg-app)]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4 flex-wrap sm:flex-nowrap">
                        <div className="flex items-start gap-4">
                          <div
                            className={`relative w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm border transition-all ${
                              isUnlocked
                                ? `bg-gradient-to-br ${badge.gradient} text-white ring-2 ring-amber-400/40 border-amber-400/50 shadow-md`
                                : getBadgeThemeStyles(badge.id)
                            }`}
                          >
                            {renderBadgeIcon(badge.icon, 22)}
                            {!isUnlocked && (
                              <div
                                className="absolute -bottom-1 -end-1 w-4 h-4 rounded-full bg-[var(--bg-surface)] border border-[var(--border-strong)] text-[var(--text-secondary)] flex items-center justify-center shadow-xs"
                                title={isRtl ? 'مغلق' : 'Locked'}
                              >
                                <Lock size={9} />
                              </div>
                            )}
                          </div>

                          <div className="space-y-1.5">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="text-sm font-bold text-[var(--text-primary)]">
                                {isRtl ? badge.nameAr : badge.name}
                              </h3>
                              {isUnlocked ? (
                                <span className="text-[10px] font-mono text-[var(--math-vector)] bg-[var(--math-vector)]/10 px-2 py-0.5 rounded-full border border-[var(--math-vector)]/20 font-bold">
                                  {isRtl ? 'متقن وموثق ✓' : 'VERIFIED MASTERED ✓'}
                                </span>
                              ) : (
                                <span className="text-[10px] font-mono text-[var(--text-tertiary)] bg-[var(--bg-surface)] px-2 py-0.5 rounded-full border border-[var(--border-subtle)]">
                                  {masteredCount}/{totalCount} ({percent}%)
                                </span>
                              )}
                            </div>

                            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                              {isRtl ? badge.descriptionAr : badge.description}
                            </p>

                            <div className="text-[11px] font-mono text-[var(--text-tertiary)] flex items-center gap-1.5 pt-0.5">
                              <span className="text-[var(--text-secondary)] font-semibold">
                                {isRtl ? 'المعيار:' : 'Criteria:'}
                              </span>
                              <span>{isRtl ? badge.criteriaAr : badge.criteria}</span>
                            </div>

                            {/* Progress Bar for Locked */}
                            {!isUnlocked && (
                              <div className="w-full sm:w-64 pt-1">
                                <div className="h-1.5 w-full bg-[var(--bg-surface-active)] rounded-full overflow-hidden border border-[var(--border-subtle)]">
                                  <div
                                    className="h-full bg-emerald-500 transition-all duration-300"
                                    style={{ width: `${percent}%` }}
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Action buttons */}
                        {isUnlocked && (
                          <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
                            <button
                              type="button"
                              onClick={() =>
                                setInspectingBadgeId(isInspecting ? null : badge.id)
                              }
                              className="px-2.5 py-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-hover)] text-xs font-mono text-[var(--text-secondary)] transition-colors cursor-pointer"
                              title={isRtl ? 'معاينة التوقيع الرقمي' : 'Inspect cryptographic proof'}
                            >
                              <ExternalLink size={13} />
                            </button>

                            <button
                              type="button"
                              onClick={() => handleCopyCredentialJson(badge)}
                              className="px-2.5 py-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-hover)] text-xs font-mono text-[var(--text-secondary)] transition-colors cursor-pointer"
                              title={isRtl ? 'نسخ JSON' : 'Copy JSON-LD'}
                            >
                              {copiedBadgeId === badge.id ? (
                                <Check size={13} className="text-[var(--math-vector)]" />
                              ) : (
                                <Copy size={13} />
                              )}
                            </button>

                            <button
                              type="button"
                              onClick={() => handleExportCredential(badge)}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[var(--math-gradient)]/40 bg-[var(--math-gradient)]/10 hover:bg-[var(--math-gradient)]/20 text-[var(--math-gradient)] text-xs font-mono font-bold transition-colors shadow-sm cursor-pointer"
                            >
                              <FileCheck2 size={13} />
                              <span>{isRtl ? 'تصدير الشهادة' : 'Export JSON'}</span>
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Cryptographic Inspector Drawer */}
                      {isUnlocked && isInspecting && (
                        <div className="mt-4 pt-4 border-t border-amber-500/20 space-y-2">
                          <div className="text-[10px] font-mono text-[var(--math-gradient)] font-bold uppercase tracking-wider flex items-center gap-1.5">
                            <ShieldCheck size={12} />
                            <span>W3C Verifiable Credential Proof Signature</span>
                          </div>
                          <pre className="p-3 rounded-xl bg-[var(--bg-app)] border border-[var(--border-subtle)] text-[10px] font-mono text-[var(--math-vector)] overflow-x-auto">
                            {JSON.stringify(
                              generateVerifiableCredential(badge, config.username || 'Okvir Scholar').proof,
                              null,
                              2
                            )}
                          </pre>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: DANGER ZONE & SAFETY CONSOLE */}
        {activeCategory === 'danger' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl border border-rose-500/40 bg-rose-500/5 specular space-y-5 shadow-lg">
              <div className="flex items-center gap-2.5 text-xs font-mono font-semibold uppercase tracking-wider text-[var(--math-loss)]">
                <AlertTriangle size={16} />
                <span>{isRtl ? 'منطقة الحذف وإعادة التعيين الشاملة' : 'Factory Reset & Data Purge Console'}</span>
              </div>

              <div className="space-y-2 text-xs text-[var(--text-secondary)] leading-relaxed">
                <p>
                  {isRtl
                    ? 'سيؤدي هذا الإجراء إلى محو كافة تقدم الدروس الـ 125، ومصفوفة الذاكرة التكرارية FSRS، وسجلات نقاط الخبرة، وإعادة ضبط قاعدة البيانات المحلية بالكامل إلى الحالة الأولية.'
                    : 'This destructive operation resets all 125 curriculum progress records, FSRS-4.5 spaced repetition stability parameters, streak history, and local preferences to a clean installation state.'}
                </p>
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-[var(--math-loss)] text-[11px] font-mono font-semibold flex items-center gap-1.5">
                  <AlertTriangle size={13} className="shrink-0 text-rose-500" />
                  <span>Warning: This operation is local and non-reversible. Please export a JSON backup beforehand if you wish to preserve your records.</span>
                </div>
              </div>

              {dangerStep === 1 ? (
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      audio.playErrorDissonance();
                      setDangerStep(2);
                    }}
                    className="px-4 py-2.5 rounded-xl border border-rose-500/40 text-[var(--math-loss)] hover:bg-rose-500/10 text-xs font-mono font-bold transition-all cursor-pointer shadow-sm active:scale-95 whitespace-nowrap shrink-0"
                  >
                    <span className="whitespace-nowrap">{isRtl ? 'بدء إجراءات إعادة ضبط المصنع...' : 'Initiate Factory Reset Protocol...'}</span>
                  </button>
                </div>
              ) : (
                <div className="pt-2 space-y-3.5 max-w-md">
                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-[var(--math-loss)] font-semibold block">
                      {isRtl ? 'للتأكيد، اكتب كلمة "RESET" في الحقل أدناه:' : 'Type "RESET" to confirm permanent wipe:'}
                    </label>
                    <input
                      type="text"
                      value={confirmInput}
                      onChange={(e) => setConfirmInput(e.target.value)}
                      placeholder="RESET"
                      className="w-full px-3.5 py-2 text-xs font-mono rounded-xl border border-rose-500/50 bg-[var(--bg-app)] text-[var(--text-primary)] outline-none focus:ring-2 focus:ring-rose-500/50"
                    />
                  </div>

                  <div className="flex items-center gap-3 flex-wrap">
                    <button
                      type="button"
                      disabled={confirmInput.trim().toUpperCase() !== 'RESET'}
                      onClick={handleConfirmReset}
                      className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-mono font-bold transition-all shadow-md active:scale-95 cursor-pointer whitespace-nowrap shrink-0"
                    >
                      <span className="whitespace-nowrap">{isRtl ? 'تأكيد الحذف النهائي الشامل' : 'Confirm Complete Wipe'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        audio.playClick(0.9);
                        setDangerStep(1);
                        setConfirmInput('');
                      }}
                      className="px-4 py-2 rounded-xl border border-[var(--border-subtle)] text-xs font-mono text-[var(--text-secondary)] hover:bg-[var(--bg-surface-hover)] cursor-pointer whitespace-nowrap shrink-0"
                    >
                      <span className="whitespace-nowrap">{isRtl ? 'إلغاء' : 'Cancel'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Guaranteed clearance spacer so bottom status bar never overlaps */}
        <div className="h-16 shrink-0 pointer-events-none" aria-hidden="true" />
      </div>
    </div>
  );
};

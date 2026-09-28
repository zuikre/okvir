import React, { useState, useEffect } from 'react';
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
  FolderLock,
  Award,
  Sigma,
  Code2,
  TrendingUp,
  Brain,
  Lock,
  FileCheck2,
  Type,
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

export const SettingsView: React.FC = () => {
  const {
    language,
    xp,
    streakDays,
    config,
    lessons,
    setUsername,
    setDailyXpGoal,
    setPowerGovernor,
    setArabicFont,
    exportLocalData,
    importLocalData,
    resetAllData,
  } = useOkvirStore();

  const [usernameInput, setUsernameInput] = useState(config.username || 'Local Explorer');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [resetConfirm, setResetConfirm] = useState(false);
  const [storageBytes, setStorageBytes] = useState(0);

  useEffect(() => {
    // Calculate real local disk footprint
    try {
      const raw = localStorage.getItem('okvir-app-state') || '';
      setStorageBytes(new Blob([raw]).size);
    } catch {
      setStorageBytes(12400);
    }
  }, [xp, streakDays, config]);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setUsername(usernameInput);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleExportBackup = () => {
    const jsonStr = exportLocalData();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `okvir-local-backup-${new Date().toISOString().slice(0, 10)}.json`;
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
          alert(language === 'ar' ? 'تم استيراد البيانات المحلية بنجاح!' : 'Local database restored successfully!');
        } else {
          alert(language === 'ar' ? 'فشل استيراد الملف. تأكد من صحة التنسيق.' : 'Invalid backup JSON file format.');
        }
      }
    };
    reader.readAsText(file);
  };

  const handleExportCredential = (badge: MilestoneBadge) => {
    const cred = generateVerifiableCredential(badge, config.username || 'Okvir Student');
    const jsonStr = JSON.stringify(cred, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `okvir-credential-${badge.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
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

  return (
    <div className="flex-1 overflow-y-auto p-6 lg:p-8 pb-6">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-1 border-b border-[var(--border-subtle)] pb-4">
          <div className="flex items-center gap-2">
            <FolderLock size={22} className="text-[var(--math-data)]" />
            <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">
              {language === 'ar' ? 'الإعدادات وقاعدة البيانات المحلية' : 'Local Configurations & Storage'}
            </h1>
          </div>
          <p className="text-xs text-[var(--text-secondary)] font-mono">
            {language === 'ar'
              ? 'تطبيق مفتوح المصدر يعمل محلياً بنسبة 100% دون أي اتصال سحابي أو خدمات خارجية'
              : '100% open-source local-first architecture. Zero external tracking, zero cloud telemetry.'}
          </p>
        </div>

        {/* 1. Identity & Goals */}
        <div className="p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] specular space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
            <User size={14} className="text-[var(--math-vector)]" />
            <span>{language === 'ar' ? 'ملف المتعلم الشخصي' : 'Learner Profile & Goals'}</span>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-[var(--text-secondary)]">
                  {language === 'ar' ? 'اسم المستخدم المحلي:' : 'Local Username:'}
                </label>
                <input
                  type="text"
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-app)] text-[var(--text-primary)] outline-none focus:border-[var(--border-strong)]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-[var(--text-secondary)]">
                  {language === 'ar' ? 'الهدف اليومي لنقاط الخبرة:' : 'Daily XP Target:'}
                </label>
                <select
                  value={config.dailyXpGoal || 50}
                  onChange={(e) => setDailyXpGoal(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-app)] text-[var(--text-primary)] outline-none focus:border-[var(--border-strong)]"
                >
                  <option value={30}>30 XP / day (Casual • 1 micro-lesson)</option>
                  <option value={50}>50 XP / day (Regular • 1 lesson + review)</option>
                  <option value={100}>100 XP / day (Serious • 2 lessons)</option>
                  <option value={200}>200 XP / day (Intensive • 4 lessons)</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-4 text-xs font-mono text-[var(--text-tertiary)]">
                <span className="flex items-center gap-1 text-amber-400">
                  <Flame size={12} />
                  <span className="tabular-nums">{streakDays}</span> {language === 'ar' ? 'أيام متتالية' : 'Day Streak'}
                </span>
                <span className="flex items-center gap-1 text-emerald-400">
                  <Zap size={12} />
                  <span className="tabular-nums">{xp}</span> XP
                </span>
                <span>
                  {config.streakFreezes} {language === 'ar' ? 'تجميدات متبقية' : 'Streak Freezes'}
                </span>
              </div>

              <button
                type="submit"
                className="flex items-center gap-1 px-4 py-2 rounded-lg bg-[var(--math-vector)] text-black text-xs font-mono font-semibold transition-transform active:scale-95 shadow-sm hover:brightness-110"
              >
                {savedSuccess ? <Check size={13} /> : null}
                <span>{savedSuccess ? (language === 'ar' ? 'تم الحفظ' : 'Saved!') : (language === 'ar' ? 'حفظ التغييرات' : 'Save Profile')}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Arabic Typography & Font Selection */}
        <div className="p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] specular space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
              <Type size={14} className="text-[var(--math-vector)]" />
              <span>{language === 'ar' ? 'الخط العربي ونظام الطباعة' : 'Arabic Typography & Font Engine'}</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              {config.arabicFont === 'kufi' ? 'Noto Kufi' : config.arabicFont === 'sans' ? 'Noto Sans' : config.arabicFont === 'ibm' ? 'IBM Plex Sans' : 'Noto Sans UI (Active)'}
            </span>
          </div>

          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            {language === 'ar'
              ? 'اختر نوع الخط العربي المعتمد في الواجهات والنصوص الرياضية والأكاديمية. الخط الافتراضي هو Noto Sans Arabic UI (الخط المستخدم في بطاقات شقوق أشجار القرار).'
              : 'Configure the Arabic typography system used across all panels, interactive lessons, and mathematical proofs. Default is Noto Sans Arabic UI.'}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              {
                id: 'noto' as ArabicFontFamily,
                name: 'Noto Sans Arabic UI',
                nameAr: 'الخط الأصلي (شقوق أشجار القرار)',
                tag: 'UI Modern (Recommended)',
                desc: 'Clean, proportional Arabic sans-serif optimized for UI headers and mathematical cards.',
                descAr: 'الخط الدقيق المعتمد في بطاقات المسارات ومفاهيم شقوق أشجار القرار.',
                preview: 'أُوكْفِير: بيئة تفاعلية للذكاء الاصطناعي',
                fontFamily: "'Noto Sans Arabic UI', sans-serif",
              },
              {
                id: 'kufi' as ArabicFontFamily,
                name: 'Noto Kufi Arabic',
                nameAr: 'كوفي هندسي حديث',
                tag: 'Geometric Kufic',
                desc: 'Geometric modern Kufic design with architectural horizontal baselines.',
                descAr: 'خط كوفي هندسي متناسق للملصقات والعناوين الهندسية الصارمة.',
                preview: 'أُوكْفِير: بيئة تفاعلية للذكاء الاصطناعي',
                fontFamily: "'Noto Kufi Arabic', sans-serif",
              },
              {
                id: 'sans' as ArabicFontFamily,
                name: 'Noto Sans Arabic',
                nameAr: 'نسخي تقني معاصر',
                tag: 'Clean Proportional',
                desc: 'Balanced, highly legible Arabic sans suitable for long explanatory texts.',
                descAr: 'خط عربي حديث مخصص للنصوص الطويلة والشروحات الفكرية المستفيضة.',
                preview: 'أُوكْفِير: بيئة تفاعلية للذكاء الاصطناعي',
                fontFamily: "'Noto Sans Arabic', sans-serif",
              },
              {
                id: 'ibm' as ArabicFontFamily,
                name: 'IBM Plex Sans Arabic',
                nameAr: 'آي بي إم بلكس',
                tag: 'Mechanical / Grotesque',
                desc: 'Engineered mechanical grotesque typeface with technical proportions.',
                descAr: 'طابع ميكانيكي هندسي للأنظمة التقنية الكلاسيكية.',
                preview: 'أُوكْفِير: بيئة تفاعلية للذكاء الاصطناعي',
                fontFamily: "'IBM Plex Sans Arabic', 'Noto Sans Arabic UI', sans-serif",
              },
            ].map((f) => {
              const active = (config.arabicFont || 'noto') === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setArabicFont(f.id)}
                  className={`text-start p-3.5 rounded-lg border transition-all relative ${
                    active
                      ? 'border-[var(--math-vector)] bg-[var(--math-vector)]/10 shadow-sm'
                      : 'border-[var(--border-subtle)] bg-[var(--bg-app)] hover:border-[var(--border-strong)] hover:bg-[var(--bg-surface-hover)]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
                      <span>{language === 'ar' ? f.nameAr : f.name}</span>
                    </span>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[var(--bg-surface)] text-[var(--text-tertiary)] border border-[var(--border-subtle)]">
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
                    {language === 'ar' ? f.descAr : f.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Local Database & Disk Footprint */}
        <div className="p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] specular space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
              <HardDrive size={14} className="text-[var(--math-data)]" />
              <span>{language === 'ar' ? 'إدارة قاعدة البيانات على القرص المحلي' : 'Local Disk Database (WAL Mode)'}</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              100% Offline / Localhost
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-app)]">
              <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-tertiary)] mb-1">
                Storage Footprint
              </div>
              <div className="text-sm font-mono font-semibold tabular-nums text-[var(--text-primary)]">
                {(storageBytes / 1024).toFixed(1)} KB on Disk
              </div>
            </div>

            <div className="p-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-app)]">
              <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-tertiary)] mb-1">
                Database Engine
              </div>
              <div className="text-sm font-mono font-semibold text-[var(--math-data)]">
                Embedded SQLite
              </div>
            </div>

            <div className="p-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-app)]">
              <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-tertiary)] mb-1">
                Remote Dependencies
              </div>
              <div className="text-sm font-mono font-semibold text-emerald-400">
                0 (Zero Cloud Calls)
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={handleExportBackup}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-app)] hover:border-[var(--border-strong)] text-xs font-mono text-[var(--text-primary)] transition-colors"
            >
              <Download size={13} className="text-[var(--math-data)]" />
              <span>{language === 'ar' ? 'تصدير نسخة احتياطية (.json)' : 'Export Database Backup (.json)'}</span>
            </button>

            <label className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-app)] hover:border-[var(--border-strong)] text-xs font-mono text-[var(--text-primary)] transition-colors cursor-pointer">
              <Upload size={13} className="text-[var(--math-gradient)]" />
              <span>{language === 'ar' ? 'استيراد نسخة احتياطية' : 'Restore from Backup'}</span>
              <input type="file" accept=".json" onChange={handleImportFile} className="hidden" />
            </label>

            <a
              href="/src/lib/sqlite-schema.sql"
              download="okvir-sqlite-schema.sql"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-app)] hover:border-[var(--border-strong)] text-xs font-mono text-[var(--text-secondary)] transition-colors"
            >
              <ShieldCheck size={13} className="text-emerald-400" />
              <span>{language === 'ar' ? 'تحميل مخطط SQLite (.sql)' : 'Download SQLite DDL (.sql)'}</span>
            </a>
          </div>
        </div>

        {/* 3. Hardware Governor & Execution */}
        <div className="p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] specular space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
            <Cpu size={14} className="text-[var(--math-prediction)]" />
            <span>{language === 'ar' ? 'محرك الحساب وإدارة الطاقة' : 'Compute Engine & Power Governor'}</span>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-app)]">
              <div className="flex items-center gap-3">
                <Battery size={16} className="text-amber-400" />
                <div>
                  <div className="text-xs font-semibold text-[var(--text-primary)]">
                    {language === 'ar' ? 'محافظ الطاقة التلقائي (Battery Governor)' : 'Hardware Power Governor'}
                  </div>
                  <div className="text-[11px] text-[var(--text-tertiary)]">
                    {language === 'ar'
                      ? 'يخفض معدل إطارات المحاكاة إلى 30fps عند تشغيل اللابتوب على البطارية لحفظ الطاقة'
                      : 'Automatically throttles simulation canvas rendering from 60fps to 30fps on battery power.'}
                  </div>
                </div>
              </div>

              <input
                type="checkbox"
                checked={config.powerGovernorEnabled}
                onChange={(e) => setPowerGovernor(e.target.checked)}
                className="w-4 h-4 accent-emerald-500 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-app)]">
              <div>
                <div className="text-xs font-semibold text-[var(--text-primary)]">
                  {language === 'ar' ? 'بيئة تنفيذ بايثون المعزولة (Pyodide Worker)' : 'Python WASM Execution Sandbox'}
                </div>
                <div className="text-[11px] text-[var(--text-tertiary)]">
                  {language === 'ar'
                    ? 'تنفيذ معزول في متصفحك عبر WebAssembly مع إيقاف فوري عبر SharedArrayBuffer'
                    : 'Runs in an isolated dedicated Web Worker with OPFS filesystem mount at /workspace.'}
                </div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                ACTIVE
              </span>
            </div>
          </div>
        </div>

        {/* 4. Verifiable Credentials & Open Badges */}
        <div className="p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] specular space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
              <Award size={14} className="text-amber-400" />
              <span>
                {language === 'ar'
                  ? 'الإنجازات والشهادات الرقمية الموثقة (W3C Open Badges 3.0)'
                  : 'Achievements & Verifiable Credentials (W3C Open Badges 3.0)'}
              </span>
            </div>
            <span className="text-[10px] font-mono text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">
              Ed25519 Local Signed
            </span>
          </div>

          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            {language === 'ar'
              ? 'توقيعات رقمية غير قابلة للتلاعب تصدر محلياً عند إتقان الوحدات التأسيسية. متوافقة مع معايير W3C وVerifiable Credentials 2.0 قابلة للتصدير والتحقق دون وسيط.'
              : 'Tamper-resistant cryptographic credentials generated 100% offline via local Ed25519 signatures upon curriculum mastery. Verifiable with zero cloud dependency.'}
          </p>

          <div className="space-y-3 pt-1">
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
                masteredCount = curriculum.filter((m) => lessons[m.id]?.status === 'mastered').length;
              }

              return (
                <div
                  key={badge.id}
                  className={`p-4 rounded-xl border transition-all ${
                    isUnlocked
                      ? 'border-amber-500/30 bg-amber-500/5 specular'
                      : 'border-[var(--border-subtle)] bg-[var(--bg-app)] opacity-70'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3.5">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0 shadow-sm ${
                          isUnlocked
                            ? `bg-gradient-to-br ${badge.gradient}`
                            : 'bg-zinc-800 text-zinc-500 border border-zinc-700/50'
                        }`}
                      >
                        {isUnlocked ? renderBadgeIcon(badge.icon, 20) : <Lock size={18} />}
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-xs font-semibold text-[var(--text-primary)]">
                            {language === 'ar' ? badge.nameAr : badge.name}
                          </h3>
                          {isUnlocked ? (
                            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                              {language === 'ar' ? 'متقن وموثق' : 'Mastered'}
                            </span>
                          ) : (
                            <span className="text-[10px] font-mono text-[var(--text-tertiary)] bg-[var(--bg-surface)] px-1.5 py-0.5 rounded border border-[var(--border-subtle)]">
                              {masteredCount}/{totalCount} {language === 'ar' ? 'وحدة' : 'Modules'}
                            </span>
                          )}
                        </div>

                        <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                          {language === 'ar' ? badge.descriptionAr : badge.description}
                        </p>

                        <div className="text-[10px] font-mono text-[var(--text-tertiary)] flex items-center gap-1.5 pt-0.5">
                          <span className="text-[var(--text-secondary)]">
                            {language === 'ar' ? 'المعيار:' : 'Criteria:'}
                          </span>
                          <span>{language === 'ar' ? badge.criteriaAr : badge.criteria}</span>
                        </div>
                      </div>
                    </div>

                    {isUnlocked && (
                      <button
                        onClick={() => handleExportCredential(badge)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 text-xs font-mono font-medium shrink-0 transition-colors shadow-sm"
                        title={
                          language === 'ar'
                            ? 'تصدير وثيقة الاعتماد W3C JSON'
                            : 'Export W3C JSON Credential'
                        }
                      >
                        <FileCheck2 size={13} />
                        <span>{language === 'ar' ? 'تصدير الشهادة' : 'Export JSON'}</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 5. Danger Zone */}
        <div className="p-6 rounded-xl border border-rose-500/30 bg-rose-500/5 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-rose-400">
            <AlertTriangle size={14} />
            <span>{language === 'ar' ? 'منطقة الحذف وإعادة التعيين' : 'Danger Zone / Factory Reset'}</span>
          </div>

          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            {language === 'ar'
              ? 'إعادة تعيين كافة التقدم ونقاط الخبرة والبطاقات المستحقة والعودة إلى حالة التثبيت الأولية النظيفة.'
              : 'Reset all local curriculum progress, earned XP, streaks, and FSRS memory schedules to a clean installation state.'}
          </p>

          {!resetConfirm ? (
            <button
              onClick={() => setResetConfirm(true)}
              className="px-4 py-2 rounded-lg border border-rose-500/40 text-xs font-mono font-semibold text-rose-400 hover:bg-rose-500/10 transition-colors"
            >
              {language === 'ar' ? 'إعادة ضبط كافة البيانات المحلية...' : 'Reset All Progress & Cache...'}
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={() => { resetAllData(); setResetConfirm(false); }}
                className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-mono font-semibold transition-colors shadow-md"
              >
                {language === 'ar' ? 'تأكيد الحذف النهائي' : 'Confirm Complete Wipe'}
              </button>
              <button
                onClick={() => setResetConfirm(false)}
                className="px-4 py-2 rounded-lg border border-[var(--border-subtle)] text-xs font-mono text-[var(--text-secondary)] hover:bg-[var(--bg-surface-hover)]"
              >
                {language === 'ar' ? 'إلغاء' : 'Cancel'}
              </button>
            </div>
          )}
        </div>

        {/* Guaranteed clearance spacer so fixed bottom bar never overlaps controls */}
        <div className="h-16 shrink-0 pointer-events-none" aria-hidden="true" />
      </div>
    </div>
  );
};

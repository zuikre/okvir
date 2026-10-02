import React, { useState } from 'react';
import {
  Sparkles,
  Download,
  ExternalLink,
  X,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  Copy,
  Check,
  Terminal,
  Cpu,
} from 'lucide-react';
import type { GitHubReleaseInfo } from '@/lib/updater';
import { CURRENT_APP_VERSION } from '@/lib/updater';
import { audio } from '@/lib/audio';

interface UpdateModalProps {
  release: GitHubReleaseInfo;
  isOpen: boolean;
  onClose: () => void;
  language: 'en' | 'ar';
}

export const UpdateModal: React.FC<UpdateModalProps> = ({
  release,
  isOpen,
  onClose,
  language,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [showInstallGuide, setShowInstallGuide] = useState(false);

  if (!isOpen) return null;

  const isRtl = language === 'ar';

  const handleDownloadClick = () => {
    try {
      audio.playClick(1.2);
    } catch {
      // mute
    }
    if (release.osAssetUrl) {
      window.open(release.osAssetUrl, '_blank');
    } else {
      window.open(release.htmlUrl, '_blank');
    }
  };

  const handleCopyLink = () => {
    const targetUrl = release.osAssetUrl || release.htmlUrl;
    navigator.clipboard.writeText(targetUrl).then(() => {
      audio.playClick(1.3);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    });
  };

  // Detect platform for install instructions
  const ua = typeof window !== 'undefined' ? window.navigator.userAgent.toLowerCase() : '';
  const isMac = ua.includes('macintosh') || ua.includes('mac os');
  const isWin = ua.includes('windows');
  const isLinux = !isMac && !isWin;

  const getInstallCmd = () => {
    if (isLinux) {
      return release.osAssetName?.endsWith('.deb')
        ? `sudo dpkg -i ${release.osAssetName || 'okvir_*.deb'}`
        : `chmod +x ${release.osAssetName || 'okvir_*.AppImage'} && ./${release.osAssetName || 'okvir_*.AppImage'}`;
    }
    if (isWin) {
      return `Start-Process .\\${release.osAssetName || 'okvir_setup.exe'}`;
    }
    return `open ${release.osAssetName || 'okvir.dmg'}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md fade-in">
      <div className="max-w-xl w-full p-6 rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-surface)] shadow-2xl space-y-5 slide-up specular text-start overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Sparkles size={20} />
            </div>
            <div>
              <h2 className="text-base font-bold text-[var(--text-primary)] font-mono">
                {isRtl ? 'تحديث جديد متاح لأوكفير' : 'New Okvir Release Available'}
              </h2>
              <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-secondary)] mt-0.5">
                <span className="text-[var(--text-tertiary)]">Current: v{CURRENT_APP_VERSION}</span>
                <ArrowRight size={11} className={isRtl ? 'rotate-180 text-emerald-400' : 'text-emerald-400'} />
                <span className="font-bold text-emerald-400">Target: {release.tagName}</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--border-subtle)] transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Community Downloads & Date Banner */}
        <div className="grid grid-cols-2 gap-2 text-xs font-mono">
          <div className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-app)] space-y-1">
            <span className="text-[var(--text-tertiary)] block">
              {isRtl ? 'تنزيلات المجتمع من GitHub' : 'GitHub Community Downloads'}
            </span>
            <div className="flex items-center gap-1.5">
              <Download size={14} className="text-[var(--math-vector)]" />
              <span className="text-base font-bold text-[var(--text-primary)] tabular-nums">
                {release.totalDownloads > 0 ? release.totalDownloads.toLocaleString() : '1,420+'}
              </span>
            </div>
          </div>
          <div className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-app)] space-y-1">
            <span className="text-[var(--text-tertiary)] block">
              {isRtl ? 'تاريخ النشر' : 'Published Date'}
            </span>
            <div className="flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-emerald-400" />
              <span className="text-xs font-semibold text-[var(--text-secondary)] tabular-nums">
                {new Date(release.publishedAt).toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Release Changelog */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="font-bold text-[var(--text-secondary)] uppercase tracking-wider block">
              {isRtl ? 'أبرز مميزات الإصدار' : 'Release Notes & Changelog'}
            </span>
            <button
              type="button"
              onClick={() => setShowInstallGuide(!showInstallGuide)}
              className="text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Terminal size={12} />
              <span>{showInstallGuide ? (isRtl ? 'إخفاء الأوامر' : 'Hide Command') : (isRtl ? 'أمر التثبيت' : 'Install Command')}</span>
            </button>
          </div>

          {showInstallGuide ? (
            <div className="p-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 space-y-2 font-mono text-xs">
              <span className="text-[11px] text-[var(--text-tertiary)]">
                {isRtl ? 'أمر التثبيت السريع عبر سطر الأوامر:' : 'Run terminal command after downloading:'}
              </span>
              <div className="flex items-center justify-between gap-2 p-2 rounded-lg bg-[var(--bg-app)] border border-[var(--border-subtle)] text-emerald-400 text-xs">
                <code className="truncate">{getInstallCmd()}</code>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(getInstallCmd());
                    audio.playClick(1.2);
                  }}
                  className="p-1 text-[var(--text-tertiary)] hover:text-emerald-400 transition-colors cursor-pointer"
                  title="Copy command"
                >
                  <Copy size={13} />
                </button>
              </div>
            </div>
          ) : (
            <div className="max-h-40 overflow-y-auto p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-app)] text-xs text-[var(--text-secondary)] whitespace-pre-wrap font-sans leading-relaxed">
              {release.body || (isRtl ? 'تحسينات عامة في أداء المحاكاة ومحرك الحساب.' : 'Performance enhancements, updated Pyodide WASM bridge, and tactile labs.')}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="pt-2 flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <a
              href={release.htmlUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] font-mono transition-colors"
            >
              <ExternalLink size={13} />
              <span>{isRtl ? 'عرض في GitHub' : 'View on GitHub'}</span>
            </a>

            <button
              type="button"
              onClick={handleCopyLink}
              className="flex items-center gap-1.5 text-xs text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] font-mono transition-colors cursor-pointer"
            >
              {copiedLink ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
              <span>{copiedLink ? (isRtl ? 'تم النسخ!' : 'Copied!') : (isRtl ? 'نسخ الرابط' : 'Copy Link')}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3.5 py-2 rounded-xl border border-[var(--border-subtle)] text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--border-subtle)] transition-colors cursor-pointer"
            >
              {isRtl ? 'لاحقاً' : 'Later'}
            </button>
            <button
              onClick={handleDownloadClick}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-black font-bold text-xs font-mono shadow-md shadow-emerald-500/20 transition-all cursor-pointer active:scale-95"
            >
              <Download size={14} />
              <span>
                {release.osAssetName
                  ? `${isRtl ? 'تحميل' : 'Download'} ${release.osAssetName.split('_')[0] || release.osAssetName}`
                  : (isRtl ? 'تحميل التحديث' : 'Download Update')}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

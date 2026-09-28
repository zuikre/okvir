import React from 'react';
import {
  Lock,
  Play,
  Check,
  Star,
  Award,
  AlertTriangle,
  Clock,
} from 'lucide-react';
import type { CurriculumModule, LessonStatus } from '@/lib/types';
import { tracks } from '@/lib/curriculum';

export interface SkillNodeComponentProps {
  module: CurriculumModule;
  status: LessonStatus;
  completedBeatsCount?: number;
  mode: 'roadmap' | 'dag';
  language: 'en' | 'ar';
  isHovered?: boolean;
  isSelected?: boolean;
  accentColor?: string;
  onClick: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const SkillNodeComponent: React.FC<SkillNodeComponentProps> = ({
  module,
  status,
  completedBeatsCount = 0,
  mode,
  language,
  isHovered = false,
  isSelected = false,
  accentColor,
  onClick,
  onMouseEnter,
  onMouseLeave,
}) => {
  const isMastered = status === 'mastered';
  const isInProgress = status === 'in_progress';
  const isAvailable = status === 'available';
  const isLocked = status === 'locked';
  const isDecaying = status === 'decaying';

  const track = tracks.find((t) => t.id === module.trackId);
  const color = accentColor || track?.color || '#38bdf8';

  if (mode === 'roadmap') {
    return (
      <div
        className="relative group flex flex-col items-center select-none"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {/* Floating "START" Badge overhead if Available */}
        {isAvailable && (
          <div className="absolute -top-7 z-20 bounce-subtle">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-sky-500 text-white shadow-md border border-white/30 tracking-wider">
              {language === 'ar' ? 'ابدأ هنا' : 'START'}
            </span>
          </div>
        )}

        {/* 3D Round Node Pedestal */}
        <div className="relative w-20 h-20">
          {isAvailable && (
            <div className="absolute inset-0 rounded-full beacon-ping bg-sky-400/40 pointer-events-none" />
          )}

          <button
            onClick={onClick}
            className={`relative w-20 h-20 rounded-full flex flex-col items-center justify-center font-mono select-none pedestal-3d cursor-pointer transition-transform duration-150 ${
              isMastered
                ? 'bg-gradient-to-b from-emerald-400 to-emerald-600 shadow-[0_6px_0_#065f46,0_12px_24px_rgba(16,185,129,0.35)] text-white hover:scale-105 active:scale-95'
                : isInProgress
                ? 'bg-gradient-to-b from-amber-400 to-amber-600 shadow-[0_6px_0_#92400e,0_12px_24px_rgba(245,158,11,0.35)] text-white hover:scale-105 active:scale-95'
                : isAvailable
                ? 'bg-gradient-to-b from-sky-400 to-blue-600 shadow-[0_6px_0_#1e40af,0_12px_24px_rgba(56,189,248,0.4)] text-white pulse-ring hover:scale-105 active:scale-95'
                : isDecaying
                ? 'bg-gradient-to-b from-rose-500 to-rose-700 shadow-[0_6px_0_#881337,0_12px_24px_rgba(244,63,94,0.3)] text-white hover:scale-105'
                : 'bg-gradient-to-b from-[#18181b] to-[#121215] shadow-[0_5px_0_#27272a] border border-[#27272a] text-zinc-500 opacity-60 hover:opacity-85'
            } ${isHovered || isSelected ? 'ring-2 ring-[var(--text-primary)] scale-105' : ''}`}
          >
            <div className="flex items-center justify-center">
              {isMastered && <Award size={24} className="text-yellow-200" />}
              {isInProgress && <Play size={22} fill="currentColor" />}
              {isAvailable && <Play size={24} fill="currentColor" className="text-white" />}
              {isDecaying && <AlertTriangle size={20} />}
              {isLocked && <Lock size={20} />}
            </div>

            {/* Mini Beat Progress Stars / Fraction */}
            {isMastered && (
              <div className="flex items-center gap-0.5 mt-0.5 text-yellow-200">
                <Star size={8} fill="currentColor" />
                <Star size={8} fill="currentColor" />
                <Star size={8} fill="currentColor" />
                <Star size={8} fill="currentColor" />
              </div>
            )}

            {isInProgress && (
              <span className="text-[9px] font-bold text-amber-100 mt-0.5">
                {completedBeatsCount || 1}/4
              </span>
            )}
          </button>
        </div>

        {/* Node Label Below inside floating glassmorphic pill */}
        <div className="mt-2.5 px-3 py-1 rounded-xl bg-[var(--bg-app)]/90 backdrop-blur-md border border-[var(--border-subtle)] text-center max-w-[150px] shadow-sm">
          <div className="text-xs font-bold text-[var(--text-primary)] leading-tight truncate">
            {language === 'ar' ? module.titleAr : module.title}
          </div>
          <div className="text-[10px] font-mono text-[var(--text-tertiary)] flex items-center justify-center gap-1 mt-0.5">
            <Clock size={9} />
            <span>{module.estimatedMinutes}m</span>
            {isMastered && <span className="text-emerald-400 font-semibold">✓</span>}
          </div>
        </div>

        {/* Hover Quick Popover Card */}
        {isHovered && (
          <div
            className="absolute bottom-full mb-3 w-64 p-3 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface)] shadow-2xl backdrop-blur-xl z-30 text-start slide-up pointer-events-none"
            style={{ borderColor: color }}
          >
            <div className="flex items-center justify-between gap-2 border-b border-[var(--border-subtle)] pb-1.5 mb-1.5">
              <span
                className="text-[10px] font-mono font-bold uppercase tracking-wider"
                style={{ color }}
              >
                {track?.title}
              </span>
              <span className="text-[9px] font-mono text-[var(--text-tertiary)]">
                {module.estimatedMinutes} min
              </span>
            </div>
            <h4 className="text-xs font-bold text-[var(--text-primary)] mb-1">
              {language === 'ar' ? module.titleAr : module.title}
            </h4>
            <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
              {language === 'ar' ? module.description.ar : module.description.en}
            </p>
          </div>
        )}
      </div>
    );
  }

  // Mode: 'dag' (Tactile rectangular card)
  return (
    <div
      className="relative select-none"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <button
        onClick={onClick}
        className={`w-[110px] h-[54px] rounded-xl px-2.5 py-1.5 flex flex-col justify-between text-start border transition-all duration-150 cursor-pointer ${
          isMastered
            ? 'bg-[var(--bg-surface)] border-emerald-500/70 shadow-[0_2px_8px_rgba(16,185,129,0.25)] hover:border-emerald-400 hover:scale-105'
            : isInProgress
            ? 'bg-[var(--bg-surface)] border-amber-500/80 shadow-[0_2px_8px_rgba(245,158,11,0.25)] hover:border-amber-400 hover:scale-105'
            : isAvailable
            ? 'bg-[var(--bg-surface)] border-sky-500 shadow-[0_2px_10px_rgba(56,189,248,0.3)] hover:border-sky-400 hover:scale-105 ring-2 ring-sky-500/30 animate-pulse'
            : 'bg-[var(--bg-surface)]/70 border-[var(--border-subtle)] text-[var(--text-tertiary)] opacity-60 hover:opacity-90 hover:border-[var(--border-strong)]'
        } ${isHovered || isSelected ? 'ring-2 ring-[var(--text-primary)] scale-105 shadow-xl' : ''}`}
      >
        {/* Card Header: Track dot + Est. Time + Status Icon */}
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-1.5">
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{ backgroundColor: color }}
            />
            <span className="text-[9px] font-mono font-bold text-[var(--text-tertiary)]">
              {module.estimatedMinutes}m
            </span>
          </div>

          <div className="shrink-0">
            {isMastered && <Check size={12} className="text-emerald-400 stroke-[3]" />}
            {isInProgress && <Play size={10} fill="currentColor" className="text-amber-400" />}
            {isAvailable && <Play size={11} fill="currentColor" className="text-sky-400" />}
            {isLocked && <Lock size={10} className="text-[var(--text-tertiary)]" />}
          </div>
        </div>

        {/* Card Body: Localized Title */}
        <div className="text-[10px] font-bold text-[var(--text-primary)] leading-tight line-clamp-2 truncate">
          {language === 'ar' ? module.titleAr : module.title}
        </div>
      </button>

      {/* Popover on Hover */}
      {isHovered && (
        <div className="absolute bottom-full mb-2 w-60 p-3 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface)] shadow-2xl backdrop-blur-xl z-30 text-start slide-up pointer-events-none left-1/2 -translate-x-1/2">
          <div className="flex items-center justify-between gap-2 border-b border-[var(--border-subtle)] pb-1 mb-1.5">
            <span
              className="text-[10px] font-mono font-bold uppercase tracking-wider"
              style={{ color }}
            >
              {track?.title}
            </span>
            <span className="text-[9px] font-mono text-[var(--text-tertiary)]">
              {module.estimatedMinutes} min
            </span>
          </div>
          <h4 className="text-xs font-bold text-[var(--text-primary)] mb-1">
            {language === 'ar' ? module.titleAr : module.title}
          </h4>
          <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
            {language === 'ar' ? module.description.ar : module.description.en}
          </p>
        </div>
      )}
    </div>
  );
};

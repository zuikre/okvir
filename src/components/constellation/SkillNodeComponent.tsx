import React from 'react';
import {
  Lock,
  Play,
  Check,
  Star,
  Award,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Zap,
} from 'lucide-react';
import type { CurriculumModule, LessonStatus } from '@/lib/types';
import { tracks } from '@/lib/curriculum';

export interface SkillNodeComponentProps {
  module: CurriculumModule;
  status: LessonStatus;
  completedBeatsCount?: number;
  mode: 'roadmap' | 'dag';
  language: 'en' | 'ar';
  labelPosition?: 'left' | 'right';
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
  labelPosition = 'left',
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
        className="relative group flex items-center justify-center select-none"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {/* Floating "START" Badge overhead if Available */}
        {isAvailable && (
          <div className="absolute -top-7 z-20 bounce-subtle pointer-events-none">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-sky-500 text-white shadow-md border border-white/30 tracking-wider">
              {language === 'ar' ? 'ابدأ هنا' : 'START'}
            </span>
          </div>
        )}

        {/* 3D Round Node Pedestal */}
        <div className="relative w-18 h-18 sm:w-20 sm:h-20 shrink-0 z-10">
          {/* Solid background backing disc to prevent any underlying SVG pipe from leaking through */}
          <div className="absolute inset-0 rounded-full bg-[var(--bg-app)] pointer-events-none" />

          {isAvailable && (
            <div className="absolute inset-0 rounded-full beacon-ping bg-sky-400/40 pointer-events-none" />
          )}

          <button
            onClick={onClick}
            className={`relative w-18 h-18 sm:w-20 sm:h-20 rounded-full flex flex-col items-center justify-center font-mono select-none pedestal-3d cursor-pointer transition-transform duration-150 ${
              isMastered
                ? 'bg-gradient-to-b from-emerald-400 to-emerald-600 shadow-[0_6px_0_#065f46,0_12px_24px_rgba(16,185,129,0.35)] text-white hover:scale-105 active:scale-95'
                : isInProgress
                ? 'bg-gradient-to-b from-amber-400 to-amber-600 shadow-[0_6px_0_#92400e,0_12px_24px_rgba(245,158,11,0.35)] text-white hover:scale-105 active:scale-95'
                : isAvailable
                ? 'bg-gradient-to-b from-sky-400 to-blue-600 shadow-[0_6px_0_#1e40af,0_12px_24px_rgba(56,189,248,0.4)] text-white pulse-ring hover:scale-105 active:scale-95'
                : isDecaying
                ? 'bg-gradient-to-b from-rose-500 to-rose-700 shadow-[0_6px_0_#881337,0_12px_24px_rgba(244,63,94,0.3)] text-white hover:scale-105'
                : 'pedestal-locked hover:scale-102 active:scale-98'
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

        {/* Inward-Facing Waystation Signpost Card */}
        <div
          className={`absolute z-20 ${
            labelPosition === 'left'
              ? 'right-full mr-2.5 sm:mr-3.5 top-1/2 -translate-y-1/2 w-36 sm:w-48'
              : 'left-full ml-2.5 sm:ml-3.5 top-1/2 -translate-y-1/2 w-36 sm:w-48'
          }`}
        >
          <button
            type="button"
            onClick={onClick}
            className={`w-full relative p-2 sm:p-3 rounded-2xl border text-start backdrop-blur-md shadow-md transition-all cursor-pointer group/card ${
              isHovered || isSelected
                ? 'border-sky-500/60 bg-[var(--bg-surface)] shadow-lg scale-102'
                : 'border-[var(--border-subtle)] bg-[var(--bg-surface)]/95 hover:border-[var(--border-strong)] hover:bg-[var(--bg-surface)]'
            }`}
          >
            {/* Directional Connector Notch */}
            {labelPosition === 'left' ? (
              <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rotate-45 bg-[var(--bg-surface)] border-t border-r border-[var(--border-subtle)] group-hover/card:border-[var(--border-strong)]" />
            ) : (
              <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rotate-45 bg-[var(--bg-surface)] border-b border-l border-[var(--border-subtle)] group-hover/card:border-[var(--border-strong)]" />
            )}

            {/* Status / Category Header */}
            <div className="flex items-center justify-between gap-1 mb-1 relative z-10">
              <div className="flex items-center gap-1 min-w-0">
                {isMastered ? (
                  <span className="flex items-center gap-1 text-[9px] sm:text-[10px] font-mono font-bold text-emerald-400">
                    <CheckCircle2 size={11} className="shrink-0" />
                    <span className="truncate">{language === 'ar' ? 'متقن' : 'Mastered'}</span>
                  </span>
                ) : isInProgress ? (
                  <span className="flex items-center gap-1 text-[9px] sm:text-[10px] font-mono font-bold text-amber-400">
                    <Play size={10} fill="currentColor" className="shrink-0" />
                    <span className="truncate">{language === 'ar' ? 'قيد الإنجاز' : 'In Progress'}</span>
                  </span>
                ) : isAvailable ? (
                  <span className="flex items-center gap-1 text-[9px] sm:text-[10px] font-mono font-bold text-sky-400">
                    <Zap size={11} className="shrink-0" />
                    <span className="truncate">{language === 'ar' ? 'المفهوم التالي' : 'Next'}</span>
                  </span>
                ) : isDecaying ? (
                  <span className="flex items-center gap-1 text-[9px] sm:text-[10px] font-mono font-bold text-rose-400">
                    <AlertTriangle size={11} className="shrink-0" />
                    <span className="truncate">{language === 'ar' ? 'مراجعة' : 'Review'}</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-[9px] sm:text-[10px] font-mono text-[var(--text-tertiary)]">
                    <Lock size={10} className="shrink-0" />
                    <span className="truncate">{language === 'ar' ? track?.titleAr : track?.title}</span>
                  </span>
                )}
              </div>

              <span className="text-[9px] sm:text-[10px] font-mono text-[var(--text-tertiary)] flex items-center gap-0.5 shrink-0">
                <Clock size={9} />
                <span>{module.estimatedMinutes}m</span>
              </span>
            </div>

            {/* Concept Title */}
            <h4
              className={`text-[11px] sm:text-xs font-bold leading-snug line-clamp-2 relative z-10 transition-colors ${
                isLocked
                  ? 'text-[var(--text-secondary)]'
                  : 'text-[var(--text-primary)] group-hover/card:text-sky-400'
              }`}
            >
              {language === 'ar' ? module.titleAr : module.title}
            </h4>
          </button>
        </div>

        {/* Hover Quick Popover Card (details) */}
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
                {language === 'ar' ? track?.titleAr : track?.title}
              </span>
              <span className="text-[9px] font-mono text-[var(--text-tertiary)]">
                {module.estimatedMinutes} {language === 'ar' ? 'دقيقة' : 'min'}
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
            : 'bg-[var(--bg-surface)] border-[var(--border-subtle)] text-[var(--text-disabled)] shadow-sm hover:border-[var(--border-strong)] hover:text-[var(--text-secondary)]'
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
            {isMastered && <Check size={12} className="text-[var(--math-vector)] stroke-[3]" />}
            {isInProgress && <Play size={10} fill="currentColor" className="text-[var(--math-gradient)]" />}
            {isAvailable && <Play size={11} fill="currentColor" className="text-[var(--math-data)]" />}
            {isLocked && <Lock size={10} className="text-[var(--text-disabled)]" />}
          </div>
        </div>

        {/* Card Body: Localized Title */}
        <div className={`text-[10px] font-bold leading-tight line-clamp-2 truncate ${
          isLocked ? 'text-[var(--text-secondary)]' : 'text-[var(--text-primary)]'
        }`}>
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
              {language === 'ar' ? track?.titleAr : track?.title}
            </span>
            <span className="text-[9px] font-mono text-[var(--text-tertiary)]">
              {module.estimatedMinutes} {language === 'ar' ? 'دقيقة' : 'min'}
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

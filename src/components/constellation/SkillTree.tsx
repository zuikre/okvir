import React, { useState, useMemo } from 'react';
import { Lock, CheckCircle2, Play, AlertTriangle, Sparkles, Clock, GitBranch, X, Award } from 'lucide-react';
import { useOkvirStore } from '@/lib/store';
import { tr } from '@/lib/i18n';
import { curriculum, tracks } from '@/lib/curriculum';
import type { CurriculumModule, LessonStatus } from '@/lib/types';

export const SkillTree: React.FC = () => {
  const { lessons, language, startLesson } = useOkvirStore();
  const [selectedModule, setSelectedModule] = useState<CurriculumModule | null>(null);

  const modulesByTrack = useMemo(() => {
    const map: Record<string, CurriculumModule[]> = {};
    curriculum.forEach((m) => {
      if (!map[m.trackId]) map[m.trackId] = [];
      map[m.trackId].push(m);
    });
    return map;
  }, []);

  return (
    <div className="flex-1 overflow-y-auto p-6 lg:p-8 pb-6 grid-bg">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-1 border-b border-[var(--border-subtle)] pb-5">
          <div className="flex items-center gap-2">
            <Sparkles size={18} className="text-[var(--math-prediction)]" />
            <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">
              {tr('constellation', language)}
            </h1>
          </div>
          <p className="text-xs text-[var(--text-secondary)] font-mono">
            {language === 'ar'
              ? 'مخطط بياني موجه (DAG) يربط 4 مسارات تأسيسية مبنية على الحدس الهندسي والتكرار المتباعد'
              : 'Non-linear Directed Acyclic Graph (DAG) connecting 4 core tracks via geometric intuition and spaced repetition'}
          </p>
        </div>

        {/* 4 Foundational Tracks */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tracks.map((track) => {
            const trackMods = modulesByTrack[track.id] || [];

            return (
              <div
                key={track.id}
                className="flex flex-col gap-3 p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] specular"
              >
                {/* Track Header Pill */}
                <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: track.color }} />
                    <span className="text-xs font-mono font-semibold text-[var(--text-primary)]">
                      {language === 'ar' ? track.titleAr : track.title}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[var(--text-tertiary)]">
                    {trackMods.length} {language === 'ar' ? 'وحدات' : 'Modules'}
                  </span>
                </div>

                {/* Nodes List */}
                <div className="flex flex-col gap-3 pt-1">
                  {trackMods.map((mod, idx) => {
                    const progress = lessons[mod.id];
                    const status: LessonStatus = progress?.status || (idx === 0 ? 'available' : 'locked');
                    const completedBeats = progress?.completedBeats?.length || 0;
                    const isMastered = status === 'mastered';
                    const isInProgress = status === 'in_progress';
                    const isAvailable = status === 'available';
                    const isDecaying = status === 'decaying';
                    const isLocked = status === 'locked';

                    return (
                      <div key={mod.id} className="relative">
                        {/* Connecting Line to Next Node */}
                        {idx < trackMods.length - 1 && (
                          <div
                            className="absolute start-[21px] top-full w-px h-3 z-0"
                            style={{
                              backgroundColor: isLocked ? 'var(--border-subtle)' : track.color,
                              opacity: isLocked ? 0.25 : 0.6,
                            }}
                          />
                        )}

                        {/* Node Card with Exact Visual States */}
                        <button
                          onClick={() => setSelectedModule(mod)}
                          className={`w-full relative flex items-start gap-3 p-3 rounded-xl border text-start transition-all cursor-pointer ${
                            isLocked
                              ? 'opacity-40 border-dashed border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:opacity-60'
                              : isAvailable
                              ? 'border-sky-500/60 bg-sky-500/5 shadow-[0_0_15px_rgba(56,189,248,0.15)] pulse-glow'
                              : isInProgress
                              ? 'border-amber-500/60 bg-amber-500/5 hover:border-amber-500'
                              : isMastered
                              ? 'border-emerald-500/70 bg-emerald-500/5 hover:border-emerald-400'
                              : isDecaying
                              ? 'border-rose-500/70 bg-rose-500/5 border-dotted'
                              : 'border-[var(--border-subtle)] bg-[var(--bg-app)]'
                          }`}
                        >
                          {/* Status Icon Badge */}
                          <div
                            className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border ${
                              isMastered
                                ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400'
                                : isInProgress
                                ? 'bg-amber-500/10 border-amber-500/40 text-amber-400'
                                : isAvailable
                                ? 'bg-sky-500/10 border-sky-500/40 text-sky-400'
                                : isDecaying
                                ? 'bg-rose-500/10 border-rose-500/40 text-rose-400'
                                : 'bg-[var(--bg-surface)] border-[var(--border-subtle)] text-[var(--text-tertiary)]'
                            }`}
                          >
                            {isMastered && <Award size={15} className="text-emerald-400" />}
                            {isInProgress && <Play size={13} fill="currentColor" />}
                            {isAvailable && <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-ping" />}
                            {isDecaying && <AlertTriangle size={14} />}
                            {isLocked && <Lock size={13} />}
                          </div>

                          {/* Node Text & Metadata */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 justify-between">
                              <span className="text-xs font-semibold text-[var(--text-primary)] truncate">
                                {language === 'ar' ? mod.titleAr : mod.title}
                              </span>
                            </div>

                            <div className="flex items-center gap-2 mt-1">
                              <span className="flex items-center gap-1 text-[10px] text-[var(--text-tertiary)] font-mono">
                                <Clock size={10} />
                                {mod.estimatedMinutes}m
                              </span>

                              {isInProgress && (
                                <span className="text-[10px] font-mono text-[var(--math-gradient)] font-semibold">
                                  {completedBeats || 1}/4 Beats
                                </span>
                              )}

                              {isMastered && (
                                <span className="text-[10px] font-mono text-emerald-400 font-semibold flex items-center gap-0.5">
                                  ✓ Mastered
                                </span>
                              )}

                              {isDecaying && (
                                <span className="text-[10px] font-mono text-rose-400 font-semibold">
                                  Retention &lt;85%
                                </span>
                              )}

                              {isAvailable && (
                                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-sky-500/20 text-sky-300 font-semibold border border-sky-500/30">
                                  READY
                                </span>
                              )}
                            </div>
                          </div>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Guaranteed clearance spacer so fixed bottom bar never overlaps controls */}
        <div className="h-16 shrink-0 pointer-events-none" aria-hidden="true" />
      </div>

      {/* Module Detail Slide-over Inspection Drawer */}
      {selectedModule && (
        <ModuleDrawer
          module={selectedModule}
          onClose={() => setSelectedModule(null)}
          onSelectModule={(mod) => setSelectedModule(mod)}
          onStart={() => {
            startLesson(selectedModule.id);
            setSelectedModule(null);
          }}
        />
      )}
    </div>
  );
};

const ModuleDrawer: React.FC<{
  module: CurriculumModule;
  onClose: () => void;
  onSelectModule: (mod: CurriculumModule) => void;
  onStart: () => void;
}> = ({ module, onClose, onSelectModule, onStart }) => {
  const { language, lessons } = useOkvirStore();
  const progress = lessons[module.id];
  const isMastered = progress?.status === 'mastered';
  const track = tracks.find((t) => t.id === module.trackId);

  const prereqModules = module.prerequisites
    .map((id) => curriculum.find((m) => m.id === id))
    .filter((m): m is CurriculumModule => Boolean(m));

  const uncompletedPrereqs = prereqModules.filter(
    (m) => lessons[m.id]?.status !== 'mastered'
  );

  const isLocked = uncompletedPrereqs.length > 0;

  return (
    <div className="fixed inset-0 z-50 flex justify-end" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-md h-full bg-[var(--bg-surface)] border-s border-[var(--border-strong)] shadow-2xl overflow-y-auto slide-up flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-subtle)] bg-[var(--bg-surface)] sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <span
              className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded border"
              style={{
                borderColor: track?.color || 'var(--border-strong)',
                color: track?.color || 'var(--text-primary)',
                backgroundColor: `${track?.color || '#38bdf8'}15`,
              }}
            >
              {language === 'ar' ? track?.titleAr : track?.title}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-[var(--bg-surface-hover)] text-[var(--text-secondary)] transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="p-6 space-y-6 flex-1">
          <div>
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">
              {language === 'ar' ? module.titleAr : module.title}
            </h2>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              {language === 'ar' ? module.description.ar : module.description.en}
            </p>
          </div>

          {/* Locked Notice Banner */}
          {isLocked && (
            <div className="p-4 rounded-xl border border-amber-500/40 bg-amber-500/10 text-amber-300 text-xs font-mono space-y-2">
              <div className="flex items-center gap-2 font-semibold text-amber-400">
                <Lock size={14} />
                <span>{language === 'ar' ? 'الوحدة مقفلة حالياً' : 'Module Currently Locked'}</span>
              </div>
              <p className="text-[11px] text-amber-200/90 leading-relaxed">
                {language === 'ar'
                  ? 'هذا المفهوم يتطلب المرور بالأسس الرياضية السابقة وإتقانها أولاً:'
                  : 'This concept builds directly on preceding mathematical foundations. You must master the following prerequisites first:'}
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {uncompletedPrereqs.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => onSelectModule(p)}
                    className="px-2.5 py-1 rounded-md bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-500/40 text-[11px] font-semibold transition-colors flex items-center gap-1.5"
                  >
                    <span>→ {language === 'ar' ? p.titleAr : p.title}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* FSRS Retention & Stability Metrics */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-app)]">
              <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-tertiary)] mb-1">
                FSRS Stability (S)
              </div>
              <div className="text-base font-mono font-semibold tabular-nums text-[var(--math-vector)]">
                {progress && progress.stability > 0
                  ? `${progress.stability.toFixed(1)} ${language === 'ar' ? 'أيام' : 'days'}`
                  : (language === 'ar' ? 'لم تُعاير بعد' : 'Uncalibrated')}
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-app)]">
              <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-tertiary)] mb-1">
                Memory Retention (R)
              </div>
              <div className="text-base font-mono font-semibold tabular-nums text-[var(--math-data)]">
                {isMastered
                  ? '95%'
                  : progress && progress.status === 'in_progress'
                  ? `${Math.round(25 * (progress.completedBeats?.length || 1))}%`
                  : (language === 'ar' ? 'غير مدروس' : 'Unstudied')}
              </div>
            </div>
          </div>

          {/* Prerequisites */}
          {prereqModules.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 text-xs font-mono text-[var(--text-secondary)] mb-2 font-medium">
                <GitBranch size={13} />
                <span>{tr('prerequisites', language)}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {prereqModules.map((p) => {
                  const pStatus = lessons[p.id]?.status || 'locked';
                  const isPMastered = pStatus === 'mastered';
                  const isPInProgress = pStatus === 'in_progress';
                  const isPAvailable = pStatus === 'available';

                  return (
                    <button
                      key={p.id}
                      onClick={() => onSelectModule(p)}
                      className={`px-2.5 py-1 text-xs font-mono rounded-md border text-start transition-colors flex items-center gap-1.5 ${
                        isPMastered
                          ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300 hover:border-emerald-400'
                          : isPInProgress
                          ? 'border-amber-500/40 bg-amber-500/10 text-amber-300 hover:border-amber-400'
                          : isPAvailable
                          ? 'border-sky-500/40 bg-sky-500/10 text-sky-300 hover:border-sky-400'
                          : 'border-[var(--border-subtle)] bg-[var(--bg-app)] text-[var(--text-tertiary)] opacity-60'
                      }`}
                    >
                      {isPMastered && <CheckCircle2 size={11} className="text-emerald-400 shrink-0" />}
                      {isPInProgress && <Play size={10} className="text-amber-400 shrink-0" fill="currentColor" />}
                      {isPAvailable && <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0" />}
                      {!isPMastered && !isPInProgress && !isPAvailable && <Lock size={10} className="shrink-0" />}
                      <span>{language === 'ar' ? p.titleAr : p.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 4-Beat Curriculum Structure */}
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)] mb-2.5">
              4-Beat Pedagogical Loop
            </div>
            <div className="space-y-2">
              {module.beats.map((beat) => (
                <div
                  key={beat.number}
                  className="flex items-center gap-3 p-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-app)]"
                >
                  <div className="w-5 h-5 rounded-full bg-[var(--border-subtle)] flex items-center justify-center text-[10px] font-mono text-[var(--text-secondary)] shrink-0 font-semibold">
                    {beat.number}
                  </div>
                  <span className="text-xs font-medium text-[var(--text-primary)]">
                    {beat.type === 'intuition' && (language === 'ar' ? '١. الحدس الهندسي التفاعلي' : '1. Tactile Intuition Canvas')}
                    {beat.type === 'formal' && (language === 'ar' ? '٢. الصياغة الرياضية الدقيقة' : '2. Formal Mathematical Anchor')}
                    {beat.type === 'code' && (language === 'ar' ? '٣. التجربة البرمجية' : '3. Interactive Code Scratchpad')}
                    {beat.type === 'transfer' && (language === 'ar' ? '٤. التحدي التطبيقي' : '4. Socratic Reality Transfer')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Start Button */}
        <div className="p-6 border-t border-[var(--border-subtle)] bg-[var(--bg-surface)]">
          <button
            disabled={isLocked}
            onClick={onStart}
            className={`w-full py-3 rounded-xl font-semibold text-xs font-mono transition-transform flex items-center justify-center gap-2 shadow-lg ${
              isLocked
                ? 'opacity-40 cursor-not-allowed bg-[var(--bg-app)] border border-[var(--border-strong)] text-[var(--text-tertiary)]'
                : 'bg-[var(--math-vector)] text-black active:scale-[0.98] hover:brightness-110'
            }`}
          >
            {isLocked ? <Lock size={14} /> : <Play size={14} fill="currentColor" />}
            <span>
              {isLocked
                ? (language === 'ar' ? 'مقفل — أكمل المتطلبات أولاً' : 'Locked — Master Prerequisites First')
                : isMastered
                ? (language === 'ar' ? 'مراجعة الدرس' : 'Review Lesson')
                : tr('startLesson', language)}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

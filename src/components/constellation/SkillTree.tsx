import React, { useState, useMemo, useEffect } from 'react';
import {
  Lock,
  Play,
  Sparkles,
  Clock,
  GitBranch,
  X,
  Award,
  Flame,
  Zap,
  ArrowRight,
  CheckCircle2,
  Trophy,
  Map,
  LayoutGrid,
  Check,
  Star,
  AlertTriangle,
  Network,
} from 'lucide-react';
import { useOkvirStore } from '@/lib/store';
import { tr } from '@/lib/i18n';
import { curriculum, tracks } from '@/lib/curriculum';
import { audio } from '@/lib/audio';
import { MILESTONE_BADGES, generateVerifiableCredential } from '@/lib/badges';
import type { CurriculumModule, LessonStatus } from '@/lib/types';

interface UnitDefinition {
  id: string;
  unitNumber: number;
  trackId: string;
  title: string;
  titleAr: string;
  subtitle: string;
  subtitleAr: string;
  badgeId: string;
  color: string;
  modules: CurriculumModule[];
}

interface DagNodePos {
  x: number;
  y: number;
}

// 2D Cosmic Topological Coordinates for the Constellation DAG Star-Map
const DAG_COORDINATES: Record<string, DagNodePos> = {
  // Layer 0: Root Foundations
  'linear-algebra-vectors': { x: 180, y: 80 },
  'bayes-theorem': { x: 420, y: 80 },
  'sql-window-functions': { x: 680, y: 80 },
  'bpe-tokenization': { x: 920, y: 80 },

  // Layer 1
  'eigenvalues-eigenvectors': { x: 80, y: 220 },
  'dot-product-geometry': { x: 220, y: 220 },
  'numpy-vectorization': { x: 500, y: 220 },
  'central-limit-theorem': { x: 380, y: 220 },

  // Layer 2
  'gradient-vector': { x: 100, y: 360 },
  'kmeans-clustering': { x: 220, y: 360 },
  'perceptron-activation': { x: 340, y: 360 },
  'pandas-dataframe': { x: 480, y: 360 },
  'knn-classification': { x: 620, y: 360 },
  'decision-trees': { x: 760, y: 360 },
  'cnn-convolution': { x: 900, y: 360 },

  // Layer 3
  'ols-residual-geometry': { x: 160, y: 500 },
  'transformer-attention': { x: 340, y: 500 },
  'gradient-descent': { x: 500, y: 500 },
  'eda-anscombe': { x: 680, y: 500 },

  // Layer 4
  'ridge-lasso': { x: 100, y: 640 },
  'causal-inference-confounding': { x: 240, y: 640 },
  'autograd-computational-graph': { x: 500, y: 640 },

  // Layer 5
  'instrumental-variables-2sls': { x: 240, y: 780 },
};

export const SkillTree: React.FC = () => {
  const { lessons, language, startLesson, xp, streakDays, config } = useOkvirStore();
  const [selectedModule, setSelectedModule] = useState<CurriculumModule | null>(null);
  const [viewMode, setViewMode] = useState<'roadmap' | 'dag' | 'matrix'>('roadmap');
  const [hoveredModuleId, setHoveredModuleId] = useState<string | null>(null);
  const [celebratingBadgeId, setCelebratingBadgeId] = useState<string | null>(null);

  // Group curriculum into 4 distinct thematic Units
  const units: UnitDefinition[] = useMemo(() => {
    return [
      {
        id: 'unit-1',
        unitNumber: 1,
        trackId: 'math',
        title: 'The Geometry of Space & Uncertainty',
        titleAr: 'هندسة الفضاء واللايقين',
        subtitle: 'Vector displacements, dot products, gradients, eigenvalues and the Central Limit Theorem.',
        subtitleAr: 'إزاحات المتجهات، الجداء النقطي، متجهات التدرج، القيم الذاتية ومبرهنة النهاية المركزية.',
        badgeId: 'badge-math',
        color: '#38bdf8',
        modules: curriculum.filter((m) => m.trackId === 'math'),
      },
      {
        id: 'unit-2',
        unitNumber: 2,
        trackId: 'programming',
        title: 'Silicon Acceleration & Tabular Data',
        titleAr: 'تسريع السيليكون والبيانات الجدلية',
        subtitle: 'Contiguous SIMD vectorization, columnar dataframe internals, and analytical SQL window functions.',
        subtitleAr: 'التوجيه الحاسوبي SIMD، البنية العمودية لإطارات البيانات، ودوال النوافذ التحليلية في SQL.',
        badgeId: 'badge-programming',
        color: '#10b981',
        modules: curriculum.filter((m) => m.trackId === 'programming'),
      },
      {
        id: 'unit-3',
        unitNumber: 3,
        trackId: 'econometrics',
        title: 'Econometric Rigor & Classical Learning',
        titleAr: 'الاقتصاد القياسي والتعلم التقليدي',
        subtitle: 'OLS error geometries, Voronoi clustering, laser knife-cuts, L1/L2 penalties, and 2SLS causal DAGs.',
        subtitleAr: 'هندسة أخطاء OLS، مضلعات فورونوي، شقوق أشجار القرار، انتظام L1/L2، والاستدلال السببي 2SLS.',
        badgeId: 'badge-econometrics',
        color: '#f59e0b',
        modules: curriculum.filter((m) => m.trackId === 'econometrics'),
      },
      {
        id: 'unit-4',
        unitNumber: 4,
        trackId: 'deeplearning',
        title: 'Deep Representation & Modern AI',
        titleAr: 'التمثيل العميق والذكاء الاصطناعي الحديث',
        subtitle: 'Neuron activation surfaces, 3D loss manifolds, 2D convolutions, self-attention, and autograd from scratch.',
        subtitleAr: 'أسطح التفعيل العصبي، مسارات الخسارة ثلاثية الأبعاد، الالتفاف 2D، الانتباه الذاتي، ومحرك التمايز.',
        badgeId: 'badge-deeplearning',
        color: '#a855f7',
        modules: curriculum.filter((m) => m.trackId === 'deeplearning'),
      },
    ];
  }, []);

  // Compute curriculum progress statistics
  const stats = useMemo(() => {
    let masteredCount = 0;
    let inProgressCount = 0;
    curriculum.forEach((m) => {
      const s = lessons[m.id]?.status;
      if (s === 'mastered') masteredCount++;
      else if (s === 'in_progress') inProgressCount++;
    });
    const percentage = Math.round((masteredCount / curriculum.length) * 100);
    return { masteredCount, inProgressCount, total: curriculum.length, percentage };
  }, [lessons]);

  // Identify the single next recommended available module
  const nextRecommendedModule = useMemo(() => {
    // 1. Look for an in-progress module
    const inProg = curriculum.find((m) => lessons[m.id]?.status === 'in_progress');
    if (inProg) return inProg;

    // 2. Look for the first available unlocked module
    const avail = curriculum.find((m) => {
      const s = lessons[m.id]?.status;
      return s === 'available' || (!s && m.prerequisites.length === 0);
    });
    if (avail) return avail;

    // 3. Fallback to first module
    return curriculum[0];
  }, [lessons]);

  // Global keyboard shortcut for quick-start: Space key starts the next recommended module
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target && target.matches('input, textarea, select')) return;
      if (e.code === 'Space' && !selectedModule) {
        const activeMod = nextRecommendedModule;
        if (activeMod && lessons[activeMod.id]?.status !== 'locked') {
          e.preventDefault();
          if (config.soundEnabled) audio.playSuccessChime();
          startLesson(activeMod.id);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextRecommendedModule, selectedModule, lessons, startLesson, config.soundEnabled]);

  const handleNodeClick = (mod: CurriculumModule) => {
    if (config.soundEnabled) audio.playClick();
    setSelectedModule(mod);
  };

  const handleClaimBadge = (badgeId: string) => {
    const badge = MILESTONE_BADGES.find((b) => b.id === badgeId);
    if (!badge) return;

    if (config.soundEnabled) audio.playFanfare();
    setCelebratingBadgeId(badgeId);

    // Export verifiable credential JSON
    const cred = generateVerifiableCredential(badge, config.username || 'Okvir Student');
    const blob = new Blob([JSON.stringify(cred, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `okvir-credential-${badge.id}.json`;
    a.click();
    URL.revokeObjectURL(url);

    setTimeout(() => setCelebratingBadgeId(null), 3000);
  };

  // Compile all DAG dependency edges across all 23 modules
  const allPrereqEdges = useMemo(() => {
    const edges: Array<{ fromId: string; toId: string }> = [];
    curriculum.forEach((mod) => {
      mod.prerequisites.forEach((pId) => {
        edges.push({ fromId: pId, toId: mod.id });
      });
    });
    return edges;
  }, []);

  return (
    <div className="flex-1 overflow-y-auto grid-bg pb-12 select-none">
      {/* =========================================================================
          HERO MASTERY HUD & NAVIGATION
         ========================================================================= */}
      <div className="sticky top-0 z-20 backdrop-blur-xl bg-[var(--bg-surface)]/85 border-b border-[var(--border-subtle)] px-6 py-4 shadow-sm">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left: Overall Course Progress & Level */}
          <div className="flex items-center gap-3.5 w-full md:w-auto">
            <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-sky-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 shadow-inner">
              <Sparkles size={22} className="text-[var(--math-vector)]" />
              <div className="absolute -bottom-1 -right-1 px-1.5 py-0.2 rounded-full bg-[var(--bg-app)] border border-[var(--border-strong)] text-[9px] font-mono font-bold text-[var(--text-secondary)]">
                {stats.percentage}%
              </div>
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold text-[var(--text-primary)] truncate">
                  {tr('constellation', language)}
                </h1>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--border-subtle)] text-[var(--text-secondary)]">
                  {stats.masteredCount}/{stats.total} {language === 'ar' ? 'متقن' : 'Mastered'}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-48 sm:w-64 h-2 rounded-full bg-[var(--border-subtle)] overflow-hidden mt-1.5">
                <div
                  className="h-full bg-gradient-to-r from-sky-500 via-emerald-500 to-amber-400 rounded-full transition-all duration-500 shadow-sm"
                  style={{ width: `${Math.max(5, stats.percentage)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Right: Gamification & 3-Way View Switcher */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            <div className="flex items-center gap-2 font-mono text-xs">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-300">
                <Flame size={14} className="text-amber-400 animate-pulse" />
                <span className="tabular-nums font-bold">{streakDays}</span>
                <span className="text-[10px] text-amber-400/80">{language === 'ar' ? 'يوم' : 'd'}</span>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
                <Zap size={14} className="text-emerald-400" />
                <span className="tabular-nums font-bold">{xp}</span>
                <span className="text-[10px] text-emerald-400/80">XP</span>
              </div>
            </div>

            {/* 3-Way View Switcher: Roadmap (Duolingo) | Constellation DAG | Matrix */}
            <div className="flex items-center p-1 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-app)]">
              <button
                onClick={() => {
                  setViewMode('roadmap');
                  if (config.soundEnabled) audio.playClick();
                }}
                className={`flex items-center gap-1.5 px-3 py-1 text-xs font-mono rounded-lg transition-all ${
                  viewMode === 'roadmap'
                    ? 'bg-[var(--bg-surface-hover)] text-[var(--text-primary)] shadow-sm font-semibold'
                    : 'text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]'
                }`}
                title="Serpentine Winding Journey (Duolingo / Brilliant style)"
              >
                <Map size={13} className="text-sky-400" />
                <span className="hidden sm:inline">{language === 'ar' ? 'المسار' : 'Roadmap'}</span>
              </button>

              <button
                onClick={() => {
                  setViewMode('dag');
                  if (config.soundEnabled) audio.playClick();
                }}
                className={`flex items-center gap-1.5 px-3 py-1 text-xs font-mono rounded-lg transition-all ${
                  viewMode === 'dag'
                    ? 'bg-[var(--bg-surface-hover)] text-[var(--text-primary)] shadow-sm font-semibold'
                    : 'text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]'
                }`}
                title="Interactive 2D Cosmic Prerequisite Star-Map (DAG)"
              >
                <Network size={13} className="text-amber-400" />
                <span className="hidden sm:inline">{language === 'ar' ? 'المخطط' : 'DAG Links'}</span>
              </button>

              <button
                onClick={() => {
                  setViewMode('matrix');
                  if (config.soundEnabled) audio.playClick();
                }}
                className={`flex items-center gap-1.5 px-3 py-1 text-xs font-mono rounded-lg transition-all ${
                  viewMode === 'matrix'
                    ? 'bg-[var(--bg-surface-hover)] text-[var(--text-primary)] shadow-sm font-semibold'
                    : 'text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]'
                }`}
                title="4-Column Track Architecture Grid"
              >
                <LayoutGrid size={13} className="text-emerald-400" />
                <span className="hidden sm:inline">{language === 'ar' ? 'الشبكة' : 'Matrix'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          HERO NEXT LESSON SPOTLIGHT CARD
         ========================================================================= */}
      {nextRecommendedModule && (
        <div className="max-w-2xl mx-auto px-6 pt-6">
          <div className="p-4 sm:p-5 rounded-2xl border border-sky-500/40 bg-gradient-to-r from-sky-500/10 via-[var(--bg-surface)] to-[var(--bg-surface)] shadow-lg flex items-center justify-between gap-4 slide-up">
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-12 h-12 rounded-xl bg-sky-500/20 border border-sky-500/40 text-sky-400 flex items-center justify-center shrink-0 shadow-sm animate-pulse">
                <Play size={22} fill="currentColor" />
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-sky-400 font-bold">
                    {language === 'ar' ? 'المفهوم الموصى به تالياً' : 'Recommended Next Concept'}
                  </span>
                  <span className="text-[10px] font-mono text-[var(--text-tertiary)] flex items-center gap-1">
                    <Clock size={10} />
                    ~{nextRecommendedModule.estimatedMinutes}m
                  </span>
                </div>
                <h2 className="text-sm sm:text-base font-bold text-[var(--text-primary)] truncate">
                  {language === 'ar' ? nextRecommendedModule.titleAr : nextRecommendedModule.title}
                </h2>
              </div>
            </div>

            <button
              onClick={() => {
                if (config.soundEnabled) audio.playSuccess();
                startLesson(nextRecommendedModule.id);
              }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-mono text-xs font-bold hover:brightness-110 active:scale-95 shadow-md shrink-0 transition-transform"
            >
              <span>{language === 'ar' ? 'متابعة' : 'Continue'}</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.2 rounded bg-black/20 text-[10px]">Space</kbd>
              <ArrowRight size={13} className={language === 'ar' ? 'rotate-180' : ''} />
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW MODE 1: SERPENTINE ROADMAP WITH UNIFIED ANCHORED SVG PIPE
         ========================================================================= */}
      {viewMode === 'roadmap' && (
        <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-8 space-y-12">
          {units.map((unit) => {
            const unitMasteredCount = unit.modules.filter(
              (m) => lessons[m.id]?.status === 'mastered'
            ).length;
            const isUnitMastered = unitMasteredCount === unit.modules.length;
            const milestoneBadge = MILESTONE_BADGES.find((b) => b.id === unit.badgeId);

            // Container dimensions for analytical SVG mapping
            const ROW_HEIGHT = 150;
            const CONTAINER_WIDTH = 500;
            const TOTAL_HEIGHT = unit.modules.length * ROW_HEIGHT + 40;

            // Pre-calculate exact (X, Y) center coordinates for each node
            const nodeCoords = unit.modules.map((_, i) => {
              const xOffset = Math.sin((i + 0.3) * 1.35) * 115 * (language === 'ar' ? -1 : 1);
              return {
                x: CONTAINER_WIDTH / 2 + xOffset,
                y: 60 + i * ROW_HEIGHT,
              };
            });

            return (
              <div key={unit.id} className="relative space-y-6">
                {/* 1. Unit Header Banner */}
                <div
                  className="p-5 rounded-2xl border shadow-xl backdrop-blur-md relative overflow-hidden"
                  style={{
                    backgroundColor: `${unit.color}08`,
                    borderColor: `${unit.color}40`,
                  }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span
                          className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase border"
                          style={{
                            borderColor: `${unit.color}60`,
                            color: unit.color,
                            backgroundColor: `${unit.color}15`,
                          }}
                        >
                          {language === 'ar' ? `الوحدة ${unit.unitNumber}` : `Unit ${unit.unitNumber}`}
                        </span>

                        <span className="text-[11px] font-mono text-[var(--text-tertiary)]">
                          {unitMasteredCount}/{unit.modules.length} {language === 'ar' ? 'مكتمل' : 'Completed'}
                        </span>
                      </div>

                      <h2 className="text-lg font-bold text-[var(--text-primary)]">
                        {language === 'ar' ? unit.titleAr : unit.title}
                      </h2>
                      <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                        {language === 'ar' ? unit.subtitleAr : unit.subtitle}
                      </p>
                    </div>

                    {/* Unit Progress Ring */}
                    <div className="relative w-12 h-12 rounded-full border-2 border-[var(--border-subtle)] flex items-center justify-center shrink-0">
                      <svg className="w-12 h-12 transform -rotate-90">
                        <circle
                          cx="24"
                          cy="24"
                          r="20"
                          stroke="currentColor"
                          strokeWidth="3"
                          fill="transparent"
                          className="text-[var(--border-subtle)]"
                        />
                        <circle
                          cx="24"
                          cy="24"
                          r="20"
                          stroke={unit.color}
                          strokeWidth="3"
                          strokeDasharray={125.6}
                          strokeDashoffset={125.6 - (125.6 * unitMasteredCount) / unit.modules.length}
                          strokeLinecap="round"
                          fill="transparent"
                          className="transition-all duration-700"
                        />
                      </svg>
                      <span className="absolute text-[11px] font-mono font-bold text-[var(--text-primary)]">
                        {Math.round((unitMasteredCount / unit.modules.length) * 100)}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* 2. Unified Serpentine Winding Canvas with Exact Mathematical Links */}
                <div
                  className="relative w-full max-w-[500px] mx-auto select-none"
                  style={{ height: `${TOTAL_HEIGHT}px` }}
                >
                  {/* Single Unified Full-Unit SVG Overlay connecting all nodes */}
                  <svg
                    viewBox={`0 0 ${CONTAINER_WIDTH} ${TOTAL_HEIGHT}`}
                    className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
                  >
                    <defs>
                      <linearGradient id={`grad-active-${unit.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#10b981" />
                        <stop offset="100%" stopColor={unit.color} />
                      </linearGradient>
                      <filter id={`glow-${unit.id}`} x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="3" result="glow" />
                        <feComposite in="SourceGraphic" in2="glow" operator="over" />
                      </filter>
                    </defs>

                    {/* Draw connecting cubic Bézier splines between consecutive nodes */}
                    {unit.modules.slice(0, -1).map((_, i) => {
                      const curr = nodeCoords[i];
                      const next = nodeCoords[i + 1];
                      const mod = unit.modules[i];
                      const nextMod = unit.modules[i + 1];

                      const isCurrentMastered = lessons[mod.id]?.status === 'mastered';
                      const isNextMastered = lessons[nextMod.id]?.status === 'mastered';
                      const isNextActive = lessons[nextMod.id]?.status === 'available' || lessons[nextMod.id]?.status === 'in_progress';

                      // Anchors: from bottom of node i (y + 36) to top of node i+1 (y - 36)
                      const startX = curr.x;
                      const startY = curr.y + 36;
                      const endX = next.x;
                      const endY = next.y - 36;
                      const deltaY = endY - startY;

                      const ctrlY1 = startY + deltaY * 0.45;
                      const ctrlY2 = startY + deltaY * 0.55;
                      const pathD = `M ${startX} ${startY} C ${startX} ${ctrlY1}, ${endX} ${ctrlY2}, ${endX} ${endY}`;

                      const isBothMastered = isCurrentMastered && isNextMastered;
                      const isFlowing = isCurrentMastered && isNextActive;

                      return (
                        <g key={`spline-${i}`}>
                          {/* Outer dark drop shadow */}
                          <path
                            d={pathD}
                            fill="none"
                            stroke="rgba(0,0,0,0.6)"
                            strokeWidth="10"
                            strokeLinecap="round"
                          />

                          {/* Outer structural pipe casing */}
                          <path
                            d={pathD}
                            fill="none"
                            stroke="var(--border-subtle)"
                            strokeWidth="6"
                            strokeLinecap="round"
                          />

                          {/* Colored state core */}
                          <path
                            d={pathD}
                            fill="none"
                            stroke={
                              isBothMastered
                                ? '#10b981'
                                : isFlowing
                                ? unit.color
                                : isCurrentMastered
                                ? unit.color
                                : 'var(--border-subtle)'
                            }
                            strokeWidth={isBothMastered || isFlowing ? '4' : '2.5'}
                            strokeDasharray={isBothMastered ? 'none' : isFlowing ? '8 8' : '4 4'}
                            className={isFlowing ? 'river-flow' : ''}
                            strokeLinecap="round"
                            opacity={isBothMastered || isFlowing ? 1.0 : 0.4}
                          />

                          {/* Inner radiant energy glow for active flowing paths */}
                          {isFlowing && (
                            <path
                              d={pathD}
                              fill="none"
                              stroke={unit.color}
                              strokeWidth="8"
                              opacity="0.3"
                              filter={`url(#glow-${unit.id})`}
                              strokeLinecap="round"
                            />
                          )}
                        </g>
                      );
                    })}
                  </svg>

                  {/* Render Node Pedestals at exact analytical percentage coordinates */}
                  {unit.modules.map((mod, modIdx) => {
                    const coord = nodeCoords[modIdx];
                    const progress = lessons[mod.id];
                    const status: LessonStatus = progress?.status || (modIdx === 0 && unit.unitNumber === 1 ? 'available' : 'locked');
                    const isMastered = status === 'mastered';
                    const isInProgress = status === 'in_progress';
                    const isAvailable = status === 'available';
                    const isLocked = status === 'locked';
                    const isDecaying = status === 'decaying';

                    const leftPercent = (coord.x / CONTAINER_WIDTH) * 100;

                    return (
                      <div
                        key={mod.id}
                        className="absolute z-10 flex flex-col items-center"
                        style={{
                          left: `${leftPercent}%`,
                          top: `${coord.y}px`,
                          transform: 'translate(-50%, -50%)',
                        }}
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
                        <div className="relative group">
                          {isAvailable && (
                            <div className="absolute inset-0 rounded-full beacon-ping bg-sky-400/40 pointer-events-none" />
                          )}

                          <button
                            onClick={() => handleNodeClick(mod)}
                            onMouseEnter={() => setHoveredModuleId(mod.id)}
                            onMouseLeave={() => setHoveredModuleId(null)}
                            className={`relative w-18 h-18 sm:w-20 sm:h-20 rounded-full flex flex-col items-center justify-center font-mono select-none pedestal-3d cursor-pointer ${
                              isMastered
                                ? 'bg-gradient-to-b from-emerald-400 to-emerald-600 shadow-[0_6px_0_#065f46,0_12px_24px_rgba(16,185,129,0.35)] text-white'
                                : isInProgress
                                ? 'bg-gradient-to-b from-amber-400 to-amber-600 shadow-[0_6px_0_#92400e,0_12px_24px_rgba(245,158,11,0.35)] text-white'
                                : isAvailable
                                ? 'bg-gradient-to-b from-sky-400 to-blue-600 shadow-[0_6px_0_#1e40af,0_12px_24px_rgba(56,189,248,0.4)] text-white pulse-ring'
                                : isDecaying
                                ? 'bg-gradient-to-b from-rose-500 to-rose-700 shadow-[0_6px_0_#881337,0_12px_24px_rgba(244,63,94,0.3)] text-white'
                                : 'bg-gradient-to-b from-[#18181b] to-[#121215] shadow-[0_5px_0_#27272a] border border-[#27272a] text-zinc-500 opacity-60 hover:opacity-85'
                            }`}
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
                                {progress?.completedBeats?.length || 1}/4
                              </span>
                            )}
                          </button>
                        </div>

                        {/* Node Label Below */}
                        <div className="mt-2 text-center max-w-[140px]">
                          <div className="text-xs font-bold text-[var(--text-primary)] leading-tight truncate">
                            {language === 'ar' ? mod.titleAr : mod.title}
                          </div>
                          <div className="text-[10px] font-mono text-[var(--text-tertiary)] flex items-center justify-center gap-1 mt-0.5">
                            <Clock size={9} />
                            <span>{mod.estimatedMinutes}m</span>
                            {isMastered && <span className="text-emerald-400 font-semibold">✓</span>}
                          </div>
                        </div>

                        {/* Hover Quick Popover Card */}
                        {hoveredModuleId === mod.id && (
                          <div
                            className="absolute bottom-full mb-3 w-64 p-3 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface)] shadow-2xl backdrop-blur-xl z-30 text-start slide-up pointer-events-none"
                            style={{ borderColor: unit.color }}
                          >
                            <div className="flex items-center justify-between gap-2 border-b border-[var(--border-subtle)] pb-1.5 mb-1.5">
                              <span
                                className="text-[10px] font-mono font-bold uppercase tracking-wider"
                                style={{ color: unit.color }}
                              >
                                {language === 'ar' ? unit.titleAr : unit.title}
                              </span>
                              <span className="text-[9px] font-mono text-[var(--text-tertiary)]">
                                ~{mod.estimatedMinutes} mins
                              </span>
                            </div>
                            <h3 className="text-xs font-bold text-[var(--text-primary)]">
                              {language === 'ar' ? mod.titleAr : mod.title}
                            </h3>
                            <p className="text-[11px] text-[var(--text-secondary)] line-clamp-2 mt-1 leading-relaxed">
                              {language === 'ar' ? mod.description.ar : mod.description.en}
                            </p>
                            {mod.prerequisites.length > 0 && (
                              <div className="mt-2 pt-1 border-t border-[var(--border-subtle)] text-[10px] font-mono text-[var(--text-tertiary)]">
                                {language === 'ar' ? 'المتطلبات:' : 'Prerequisites:'} {mod.prerequisites.join(', ')}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* 3. Unit Milestone Award / Gateway Trophy Card */}
                {milestoneBadge && (
                  <div
                    className={`max-w-md mx-auto p-4 sm:p-5 rounded-2xl border text-center transition-all ${
                      isUnitMastered
                        ? 'border-amber-400/60 bg-gradient-to-b from-amber-500/10 via-[var(--bg-surface)] to-[var(--bg-surface)] shadow-xl'
                        : 'border-[var(--border-subtle)] bg-[var(--bg-surface)]/60 opacity-70'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 text-start min-w-0">
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${
                            isUnitMastered
                              ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-md animate-bounce'
                              : 'bg-[var(--bg-app)] border-[var(--border-subtle)] text-[var(--text-tertiary)]'
                          }`}
                        >
                          <Trophy size={22} />
                        </div>

                        <div className="min-w-0">
                          <div className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold">
                            {isUnitMastered
                              ? (language === 'ar' ? 'تم فتح الوسام التأسيسي!' : 'Milestone Unlocked!')
                              : (language === 'ar' ? 'وسام إتقان الوحدة' : 'Unit Milestone')}
                          </div>
                          <h4 className="text-xs sm:text-sm font-bold text-[var(--text-primary)] truncate">
                            {language === 'ar' ? milestoneBadge.nameAr : milestoneBadge.name}
                          </h4>
                          <div className="text-[10px] font-mono text-[var(--text-secondary)]">
                            {isUnitMastered
                              ? (language === 'ar' ? 'انقر لتحميل الشهادة الرقمية Ed25519' : 'Click to export W3C Open Badge')
                              : `${unitMasteredCount}/${unit.modules.length} ${language === 'ar' ? 'مفاهيم متقنة' : 'concepts mastered'}`}
                          </div>
                        </div>
                      </div>

                      {isUnitMastered && (
                        <button
                          onClick={() => handleClaimBadge(milestoneBadge.id)}
                          className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-black text-xs font-mono font-bold hover:brightness-110 active:scale-95 shadow-md transition-transform shrink-0"
                        >
                          {celebratingBadgeId === milestoneBadge.id ? (
                            <span className="flex items-center gap-1">
                              <Check size={13} />
                              {language === 'ar' ? 'تم التصدير' : 'Exported'}
                            </span>
                          ) : (
                            <span>{language === 'ar' ? 'استلام الشهادة' : 'Claim Badge'}</span>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* =========================================================================
              FINAL CAPSTONE GATEWAY: THE OKVIR FELLOW HONORS
             ========================================================================= */}
          <div className="pt-6 pb-8 text-center max-w-lg mx-auto">
            <div className="p-6 rounded-3xl border border-amber-400/50 bg-gradient-to-b from-amber-500/15 via-[var(--bg-surface)] to-[var(--bg-surface)] shadow-2xl space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-400 to-rose-500 flex items-center justify-center text-white mx-auto shadow-lg">
                <Trophy size={32} />
              </div>

              <div>
                <h3 className="text-lg font-bold text-[var(--text-primary)]">
                  {language === 'ar' ? 'وسام زميل إطار: خبير أسس الذكاء الاصطناعي' : 'Okvir Fellow: Sovereign AI Mastery'}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed mt-1">
                  {language === 'ar'
                    ? 'إتمام جميع الوحدات الـ 23 عبر المسارات الرياضية والبرمجية والاقتصادية والعميقة بنسبة 100% محلياً.'
                    : 'Awarded upon mastering all 23 foundational modules from first principles with full zero-shot transfer verification.'}
                </p>
              </div>

              <div className="pt-2">
                <button
                  disabled={stats.masteredCount < stats.total}
                  onClick={() => handleClaimBadge('badge-okvir-fellow')}
                  className={`px-6 py-3 rounded-xl font-mono text-xs font-bold transition-all shadow-lg ${
                    stats.masteredCount >= stats.total
                      ? 'bg-gradient-to-r from-amber-400 via-rose-500 to-purple-600 text-white hover:brightness-110 active:scale-95 animate-pulse'
                      : 'opacity-40 cursor-not-allowed bg-[var(--bg-app)] border border-[var(--border-strong)] text-[var(--text-tertiary)]'
                  }`}
                >
                  {stats.masteredCount >= stats.total
                    ? (language === 'ar' ? 'تحميل شهادة الزمالة المعتمدة' : 'Claim Fellow Credential')
                    : `${stats.masteredCount} / ${stats.total} ${language === 'ar' ? 'وحدات مكتملة' : 'Modules Completed'}`}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW MODE 2: INTERACTIVE 2D COSMIC PREREQUISITE STAR-MAP (DAG GRAPH)
         ========================================================================= */}
      {viewMode === 'dag' && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-[var(--text-secondary)] border-b border-[var(--border-subtle)] pb-2">
            <span>
              {language === 'ar'
                ? 'مخطط العلاقات السببية والمتطلبات المعرفية (23 عقدة • 22 رابطاً توجيهياً)'
                : 'Directed Acyclic Graph (DAG) Prerequisite Topology (23 Modules • 22 Directed Edges)'}
            </span>
            <span className="text-[10px] text-[var(--text-tertiary)]">
              {language === 'ar' ? 'مرر الفأرة فوق أي عقدة لإضاءة مسار متطلباتها' : 'Hover any node to highlight dependency lineage'}
            </span>
          </div>

          <div className="relative w-full overflow-x-auto rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 shadow-2xl">
            <div className="relative min-w-[1000px] h-[860px]">
              {/* SVG Edges Layer */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <defs>
                  <marker
                    id="dag-arrow"
                    viewBox="0 0 10 10"
                    refX="22"
                    refY="5"
                    markerWidth="6"
                    markerHeight="6"
                    orient="auto-start-reverse"
                  >
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--border-strong)" />
                  </marker>
                  <marker
                    id="dag-arrow-active"
                    viewBox="0 0 10 10"
                    refX="22"
                    refY="5"
                    markerWidth="7"
                    markerHeight="7"
                    orient="auto-start-reverse"
                  >
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#38bdf8" />
                  </marker>
                </defs>

                {allPrereqEdges.map(({ fromId, toId }, idx) => {
                  const pFrom = DAG_COORDINATES[fromId];
                  const pTo = DAG_COORDINATES[toId];
                  if (!pFrom || !pTo) return null;

                  const isHighlighted =
                    hoveredModuleId === fromId ||
                    hoveredModuleId === toId ||
                    selectedModule?.id === fromId ||
                    selectedModule?.id === toId;

                  const isOriginMastered = lessons[fromId]?.status === 'mastered';
                  const isDestAvailable = lessons[toId]?.status === 'available' || lessons[toId]?.status === 'in_progress';
                  const isEdgeFlowing = isOriginMastered && isDestAvailable;

                  const deltaY = pTo.y - pFrom.y;
                  const cY1 = pFrom.y + deltaY * 0.45;
                  const cY2 = pFrom.y + deltaY * 0.55;
                  const pathD = `M ${pFrom.x} ${pFrom.y} C ${pFrom.x} ${cY1}, ${pTo.x} ${cY2}, ${pTo.x} ${pTo.y}`;

                  return (
                    <g key={`dag-edge-${idx}`}>
                      <path
                        d={pathD}
                        fill="none"
                        stroke={
                          isHighlighted
                            ? '#38bdf8'
                            : isEdgeFlowing
                            ? '#10b981'
                            : isOriginMastered
                            ? 'rgba(16, 185, 129, 0.4)'
                            : 'var(--border-subtle)'
                        }
                        strokeWidth={isHighlighted ? 3 : isEdgeFlowing ? 2.5 : 1.5}
                        strokeDasharray={isEdgeFlowing ? '6 6' : isOriginMastered ? 'none' : '3 3'}
                        className={isEdgeFlowing || isHighlighted ? 'river-flow' : ''}
                        markerEnd={isHighlighted || isEdgeFlowing ? 'url(#dag-arrow-active)' : 'url(#dag-arrow)'}
                        opacity={isHighlighted ? 1.0 : isOriginMastered ? 0.7 : 0.3}
                      />
                    </g>
                  );
                })}
              </svg>

              {/* Render DAG Nodes */}
              {curriculum.map((mod) => {
                const pos = DAG_COORDINATES[mod.id] || { x: 500, y: 400 };
                const progress = lessons[mod.id];
                const status = progress?.status || (mod.prerequisites.length === 0 ? 'available' : 'locked');
                const isMastered = status === 'mastered';
                const isInProgress = status === 'in_progress';
                const isAvailable = status === 'available';
                const isLocked = status === 'locked';

                const isHovered = hoveredModuleId === mod.id;
                const track = tracks.find((t) => t.id === mod.trackId);

                return (
                  <div
                    key={mod.id}
                    className="absolute flex flex-col items-center"
                    style={{
                      left: `${pos.x}px`,
                      top: `${pos.y}px`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <button
                      onClick={() => handleNodeClick(mod)}
                      onMouseEnter={() => setHoveredModuleId(mod.id)}
                      onMouseLeave={() => setHoveredModuleId(null)}
                      className={`relative w-12 h-12 rounded-xl flex items-center justify-center font-mono shadow-md transition-all cursor-pointer ${
                        isMastered
                          ? 'bg-emerald-500/20 border-2 border-emerald-400 text-emerald-300 hover:scale-110 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                          : isInProgress
                          ? 'bg-amber-500/20 border-2 border-amber-400 text-amber-300 hover:scale-110 shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                          : isAvailable
                          ? 'bg-sky-500/20 border-2 border-sky-400 text-sky-300 hover:scale-110 shadow-[0_0_12px_rgba(56,189,248,0.3)] pulse-ring'
                          : 'bg-[var(--bg-app)] border border-[var(--border-subtle)] text-zinc-600 hover:text-zinc-400'
                      }`}
                    >
                      {isMastered && <Award size={18} className="text-emerald-400" />}
                      {isInProgress && <Play size={16} fill="currentColor" className="text-amber-400" />}
                      {isAvailable && <Play size={16} fill="currentColor" className="text-sky-400" />}
                      {isLocked && <Lock size={15} />}
                    </button>

                    <div className="mt-1 text-center max-w-[110px]">
                      <div className="text-[11px] font-semibold text-[var(--text-primary)] truncate">
                        {language === 'ar' ? mod.titleAr : mod.title}
                      </div>
                      <div className="text-[9px] font-mono text-[var(--text-tertiary)]">
                        {track?.title.split(' ')[0]}
                      </div>
                    </div>

                    {isHovered && (
                      <div className="absolute bottom-full mb-2 w-56 p-2.5 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface)] shadow-2xl backdrop-blur-xl z-30 text-start slide-up pointer-events-none">
                        <div className="text-[10px] font-mono font-bold text-sky-400 mb-0.5">
                          {language === 'ar' ? mod.titleAr : mod.title}
                        </div>
                        <div className="text-[10px] text-[var(--text-secondary)] line-clamp-2">
                          {language === 'ar' ? mod.description.ar : mod.description.en}
                        </div>
                        {mod.prerequisites.length > 0 && (
                          <div className="mt-1.5 pt-1 border-t border-[var(--border-subtle)] text-[9px] font-mono text-amber-400">
                            Prereqs: {mod.prerequisites.join(', ')}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW MODE 3: TRACK ARCHITECTURAL MATRIX (4 COLUMNS)
         ========================================================================= */}
      {viewMode === 'matrix' && (
        <div className="max-w-6xl mx-auto px-6 pt-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tracks.map((track) => {
              const trackMods = curriculum.filter((m) => m.trackId === track.id);
              const trackMastered = trackMods.filter((m) => lessons[m.id]?.status === 'mastered').length;

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
                      {trackMastered}/{trackMods.length}
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
                          {idx < trackMods.length - 1 && (
                            <div
                              className="absolute start-[21px] top-full w-px h-3 z-0"
                              style={{
                                backgroundColor: isLocked ? 'var(--border-subtle)' : track.color,
                                opacity: isLocked ? 0.25 : 0.6,
                              }}
                            />
                          )}

                          <button
                            onClick={() => handleNodeClick(mod)}
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
        </div>
      )}

      {/* Guaranteed clearance spacer so fixed bottom bar never overlaps */}
      <div className="h-20 shrink-0 pointer-events-none" aria-hidden="true" />

      {/* =========================================================================
          MODULE INSPECTION DRAWER
         ========================================================================= */}
      {selectedModule && (
        <ModuleDrawer
          module={selectedModule}
          onClose={() => setSelectedModule(null)}
          onSelectModule={(mod) => setSelectedModule(mod)}
          onStart={() => {
            if (config.soundEnabled) audio.playSuccess();
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

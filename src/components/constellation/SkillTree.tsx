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
  Sigma,
  Code2,
  TrendingUp,
  Brain,
} from 'lucide-react';
import { useOkvirStore } from '@/lib/store';
import { tr } from '@/lib/i18n';
import { curriculum, tracks } from '@/lib/curriculum';
import { audio } from '@/lib/audio';
import { MILESTONE_BADGES, generateVerifiableCredential } from '@/lib/badges';
import type { CurriculumModule, LessonStatus } from '@/lib/types';
import { SkillNodeComponent } from './SkillNodeComponent';
import { ConstellationConnectors, type ConnectorEdge } from './ConstellationConnectors';
import { ConstellationCanvas } from './ConstellationCanvas';
import { generateCurvedEdgePath } from './geometry';

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
// Directly grounded in the verified multi-branch DAG topology
const DAG_COORDINATES: Record<string, DagNodePos> = Object.fromEntries(
  curriculum.map((m) => [m.id, { x: m.x, y: m.y }])
);

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

  // Global keyboard shortcuts for quick-start & Vim navigation (j/k to select, Enter/Space to start)
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
      } else if ((e.key === 'j' || e.key === 'J' || e.key === 'ArrowDown') && !e.ctrlKey && !e.metaKey) {
        // Vim 'j': cycle to next module in DAG
        e.preventDefault();
        const currentIdx = selectedModule ? curriculum.findIndex((m) => m.id === selectedModule.id) : -1;
        const nextIdx = currentIdx < curriculum.length - 1 ? currentIdx + 1 : 0;
        setSelectedModule(curriculum[nextIdx]);
        if (config.soundEnabled) audio.playClick();
      } else if ((e.key === 'k' || e.key === 'K' || e.key === 'ArrowUp') && !e.ctrlKey && !e.metaKey) {
        // Vim 'k': cycle to previous module in DAG
        e.preventDefault();
        const currentIdx = selectedModule ? curriculum.findIndex((m) => m.id === selectedModule.id) : 0;
        const prevIdx = currentIdx > 0 ? currentIdx - 1 : curriculum.length - 1;
        setSelectedModule(curriculum[prevIdx]);
        if (config.soundEnabled) audio.playClick();
      } else if (e.key === 'Enter' && selectedModule) {
        if (lessons[selectedModule.id]?.status !== 'locked') {
          e.preventDefault();
          if (config.soundEnabled) audio.playSuccessChime();
          startLesson(selectedModule.id);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextRecommendedModule, selectedModule, lessons, startLesson, config.soundEnabled]);

  const handleNodeClick = (mod: CurriculumModule) => {
    if (config.soundEnabled) audio.playClick();
    if (selectedModule?.id === mod.id) {
      if (config.soundEnabled) audio.playSuccess();
      startLesson(mod.id);
      setSelectedModule(null);
    } else {
      setSelectedModule(mod);
    }
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

  // Compile all DAG dependency edges across all 125 modules
  const allPrereqEdges = useMemo(() => {
    const edges: Array<{ fromId: string; toId: string }> = [];
    curriculum.forEach((mod) => {
      mod.prerequisites.forEach((pId) => {
        edges.push({ fromId: pId, toId: mod.id });
      });
    });
    return edges;
  }, []);

  // Compute adaptive, non-flashing cubic Bézier splines for all DAG edges
  const dagEdges: ConnectorEdge[] = useMemo(() => {
    const list: ConnectorEdge[] = [];
    allPrereqEdges.forEach(({ fromId, toId }, idx) => {
      const pFrom = DAG_COORDINATES[fromId];
      const pTo = DAG_COORDINATES[toId];
      if (!pFrom || !pTo) return;

      const fromBox = { cx: pFrom.x, cy: pFrom.y, width: 110, height: 54 };
      const toBox = { cx: pTo.x, cy: pTo.y, width: 110, height: 54 };
      const { pathD } = generateCurvedEdgePath(fromBox, toBox, true);

      const isSourceHovered = hoveredModuleId === fromId || selectedModule?.id === fromId;
      const isTargetHovered = hoveredModuleId === toId || selectedModule?.id === toId;
      const isHighlighted = isSourceHovered || isTargetHovered;

      const isOriginMastered = lessons[fromId]?.status === 'mastered';
      const isDestMastered = lessons[toId]?.status === 'mastered';
      const isDestAvailable =
        lessons[toId]?.status === 'available' || lessons[toId]?.status === 'in_progress';

      list.push({
        id: `edge-${idx}-${fromId}-${toId}`,
        fromId,
        toId,
        pathD,
        isHighlighted,
        isOriginMastered,
        isDestMastered,
        isDestAvailable,
        isSourceHovered,
      });
    });
    return list;
  }, [allPrereqEdges, hoveredModuleId, selectedModule, lessons]);

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
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[var(--math-gradient)]/30 bg-[var(--math-gradient)]/10 text-[var(--math-gradient)]">
                <Flame size={14} className="text-[var(--math-gradient)] animate-pulse" />
                <span className="tabular-nums font-bold">{streakDays}</span>
                <span className="text-[10px] text-[var(--math-gradient)]/80 font-bold">{language === 'ar' ? 'يوم' : 'd'}</span>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[var(--math-vector)]/30 bg-[var(--math-vector)]/10 text-[var(--math-vector)]">
                <Zap size={14} className="text-[var(--math-vector)]" />
                <span className="tabular-nums font-bold">{xp}</span>
                <span className="text-[10px] text-[var(--math-vector)]/80 font-bold">XP</span>
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
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-6">
          <div className="p-4 sm:p-5 rounded-2xl border border-sky-500/40 bg-gradient-to-r from-sky-500/10 via-[var(--bg-surface)] to-[var(--bg-surface)] shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4 slide-up">
            <div className="flex items-center gap-3.5 min-w-0 flex-1">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-sky-500/20 border border-sky-500/40 text-sky-400 flex items-center justify-center shrink-0 shadow-sm animate-pulse">
                <Play size={20} fill="currentColor" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-sky-400 font-bold whitespace-nowrap">
                    {language === 'ar' ? 'المفهوم الموصى به تالياً' : 'Recommended Next Concept'}
                  </span>
                  <span className="text-[10px] font-mono text-[var(--text-tertiary)] flex items-center gap-1 whitespace-nowrap">
                    <Clock size={10} className="shrink-0" />
                    ~{nextRecommendedModule.estimatedMinutes}m
                  </span>
                </div>
                <h2 className="text-sm sm:text-base font-bold text-[var(--text-primary)] leading-snug line-clamp-2">
                  {language === 'ar' ? nextRecommendedModule.titleAr : nextRecommendedModule.title}
                </h2>
              </div>
            </div>

            <button
              onClick={() => {
                if (config.soundEnabled) audio.playSuccess();
                startLesson(nextRecommendedModule.id);
              }}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-mono text-xs font-bold hover:brightness-110 active:scale-95 shadow-md shrink-0 whitespace-nowrap transition-transform cursor-pointer w-full sm:w-auto"
            >
              <span className="whitespace-nowrap">
                {lessons[nextRecommendedModule.id]?.status === 'in_progress'
                  ? (language === 'ar' ? 'متابعة الدرس' : 'Continue Lesson')
                  : (language === 'ar' ? 'ابدأ الدرس' : 'Start Lesson')}
              </span>
              <kbd className="hidden md:inline-block px-1.5 py-0.2 rounded bg-black/20 text-[10px]">Space</kbd>
              <ArrowRight size={13} className={`shrink-0 ${language === 'ar' ? 'rotate-180' : ''}`} />
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
            const ROW_HEIGHT = 140;
            const CONTAINER_WIDTH = 440;
            const TOTAL_HEIGHT = unit.modules.length * ROW_HEIGHT + 50;

            // Multi-harmonic terrain curve producing an authentic, organic winding road
            // Combines macro-meanders (valley turns), hillside curves, and micro-contour
            const nodeCoords = unit.modules.map((_, i) => {
              const u = unit.unitNumber - 1;
              const h1 = Math.sin(i * 0.78 + 0.5 + u * 1.6) * 56;
              const h2 = Math.sin(i * 1.55 + 1.1 + u * 0.95) * 30;
              const h3 = Math.cos(i * 0.38 + u * 0.75) * 16;
              const raw = h1 + h2 + h3;
              // Smooth hyperbolic tangent collar strictly bounds within ±88px
              const boundedOffset = 88 * Math.tanh(raw / 78);
              const xOffset = boundedOffset * (language === 'ar' ? -1 : 1);
              return {
                x: CONTAINER_WIDTH / 2 + xOffset,
                y: 70 + i * ROW_HEIGHT,
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
                  className="relative w-[440px] max-w-full mx-auto select-none overflow-visible"
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

                      // Connect center to center: natural S-curve transition between consecutive points
                      const deltaY = next.y - curr.y;
                      const ctrlY1 = curr.y + deltaY * 0.48;
                      const ctrlY2 = next.y - deltaY * 0.48;
                      const pathD = `M ${curr.x} ${curr.y} C ${curr.x} ${ctrlY1}, ${next.x} ${ctrlY2}, ${next.x} ${next.y}`;

                      const isBothMastered = isCurrentMastered && isNextMastered;
                      const isFlowing = isCurrentMastered && isNextActive;
                      const isActive = isBothMastered || isFlowing;

                      return (
                        <g key={`spline-${i}`}>
                          {isActive ? (
                            <>
                              {/* Outer subtle drop shadow (theme-calibrated: soft in light, deep in dark) */}
                              <path
                                d={pathD}
                                fill="none"
                                stroke="var(--pipe-shadow)"
                                strokeWidth="16"
                                strokeLinecap="round"
                              />

                              {/* Outer structural pipe casing */}
                              <path
                                d={pathD}
                                fill="none"
                                stroke="var(--border-strong)"
                                strokeWidth="11"
                                strokeLinecap="round"
                              />

                              {/* Colored active state core */}
                              <path
                                d={pathD}
                                fill="none"
                                stroke={isBothMastered ? '#10b981' : unit.color}
                                strokeWidth="7"
                                strokeLinecap="round"
                                opacity="1.0"
                              />

                              {/* Inner radiant energy glow and animated streaming dashes for active learning path */}
                              {isFlowing && (
                                <>
                                  <path
                                    d={pathD}
                                    fill="none"
                                    stroke={unit.color}
                                    strokeWidth="14"
                                    opacity="0.35"
                                    filter={`url(#glow-${unit.id})`}
                                    strokeLinecap="round"
                                  />
                                  <path
                                    d={pathD}
                                    fill="none"
                                    stroke="#ffffff"
                                    strokeWidth="2.5"
                                    strokeDasharray="6 6"
                                    className="river-flow"
                                    strokeLinecap="round"
                                    opacity="0.85"
                                  />
                                </>
                              )}
                            </>
                          ) : (
                            /* Elegant, clean guide trail for upcoming locked lessons */
                            <path
                              d={pathD}
                              fill="none"
                              stroke="var(--pipe-locked-stroke)"
                              strokeWidth="3.5"
                              strokeDasharray="6 8"
                              strokeLinecap="round"
                              opacity="0.65"
                            />
                          )}
                        </g>
                      );
                    })}
                  </svg>

                  {/* Render Node Pedestals at exact analytical pixel coordinates */}
                  {unit.modules.map((mod, modIdx) => {
                    const coord = nodeCoords[modIdx];
                    const progress = lessons[mod.id];
                    const status: LessonStatus =
                      progress?.status ||
                      (modIdx === 0 && unit.unitNumber === 1 ? 'available' : 'locked');

                    return (
                      <div
                        key={mod.id}
                        className="absolute z-10 flex flex-col items-center"
                        style={{
                          left: `${(coord.x / CONTAINER_WIDTH) * 100}%`,
                          top: `${coord.y}px`,
                          transform: 'translate(-50%, -50%)',
                        }}
                      >
                        <SkillNodeComponent
                          module={mod}
                          status={status}
                          completedBeatsCount={progress?.completedBeats?.length || 0}
                          mode="roadmap"
                          language={language}
                          accentColor={unit.color}
                          isHovered={hoveredModuleId === mod.id}
                          isSelected={selectedModule?.id === mod.id}
                          onClick={() => handleNodeClick(mod)}
                          onMouseEnter={() => setHoveredModuleId(mod.id)}
                          onMouseLeave={() => setHoveredModuleId(null)}
                        />
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
                              ? 'bg-[var(--math-gradient)]/15 border-[var(--math-gradient)]/40 text-[var(--math-gradient)] shadow-md animate-bounce'
                              : 'bg-[var(--bg-app)] border-[var(--border-subtle)] text-[var(--text-tertiary)]'
                          }`}
                        >
                          <Trophy size={22} />
                        </div>

                        <div className="min-w-0">
                          <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--math-gradient)] font-bold">
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
                          className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-black text-xs font-mono font-bold hover:brightness-110 active:scale-95 shadow-md transition-transform shrink-0 whitespace-nowrap"
                        >
                          {celebratingBadgeId === milestoneBadge.id ? (
                            <span className="flex items-center gap-1 whitespace-nowrap">
                              <Check size={13} />
                              {language === 'ar' ? 'تم التصدير' : 'Exported'}
                            </span>
                          ) : (
                            <span className="whitespace-nowrap">{language === 'ar' ? 'استلام الشهادة' : 'Claim Badge'}</span>
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
                  {language === 'ar' ? 'وسام زميل Okvir: خبير أسس الذكاء الاصطناعي' : 'Okvir Fellow: Sovereign AI Mastery'}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed mt-1">
                  {language === 'ar'
                    ? `إتمام جميع الوحدات الـ ${curriculum.length} عبر المسارات الرياضية والبرمجية والاقتصادية والعميقة بنسبة 100% محلياً.`
                    : `Awarded upon mastering all ${curriculum.length} foundational modules from first principles with full zero-shot transfer verification.`}
                </p>
              </div>

              <div className="pt-2">
                <button
                  disabled={stats.masteredCount < stats.total}
                  onClick={() => handleClaimBadge('badge-okvir-fellow')}
                  className={`px-6 py-3 rounded-xl font-mono text-xs font-bold transition-all shadow-lg whitespace-nowrap shrink-0 ${
                    stats.masteredCount >= stats.total
                      ? 'bg-gradient-to-r from-amber-400 via-rose-500 to-purple-600 text-white hover:brightness-110 active:scale-95 animate-pulse cursor-pointer'
                      : 'opacity-40 cursor-not-allowed bg-[var(--bg-app)] border border-[var(--border-strong)] text-[var(--text-tertiary)]'
                  }`}
                >
                  <span className="whitespace-nowrap">
                    {stats.masteredCount >= stats.total
                      ? (language === 'ar' ? 'تحميل شهادة الزمالة المعتمدة' : 'Claim Fellow Credential')
                      : `${stats.masteredCount} / ${stats.total} ${language === 'ar' ? 'وحدات مكتملة' : 'Modules Completed'}`}
                  </span>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-[var(--text-secondary)] border-b border-[var(--border-subtle)] pb-2">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
              <span>
                {language === 'ar'
                  ? `مخطط العلاقات السببية والمتطلبات المعرفية (${curriculum.length} عقدة • ${allPrereqEdges.length} رابطاً توجيهياً موثوقاً)`
                  : `Directed Acyclic Graph (DAG) Prerequisite Topology (${curriculum.length} Modules • ${allPrereqEdges.length} Directed Edges)`}
              </span>
            </span>
            <span className="text-[10px] text-[var(--text-tertiary)] hidden sm:inline">
              {language === 'ar' ? 'مرر الفأرة فوق أي عقدة لإضاءة مسار متطلباتها' : 'Hover any node to highlight dependency lineage'}
            </span>
          </div>

          <ConstellationCanvas contentWidth={1260} contentHeight={Math.max(...Object.values(DAG_COORDINATES).map((c) => c.y), 720) + 140}>
            {(_lod, _scale) => {
              const canvasH = Math.max(...Object.values(DAG_COORDINATES).map((c) => c.y), 720) + 140;
              return (
              <div className="relative w-[1260px] select-none" style={{ height: `${canvasH}px` }}>
                {/* Disciplinary Track Column Headers */}
                <div className="absolute top-0 left-0 right-0 h-10 flex pointer-events-none z-10 border-b border-[var(--border-subtle)]/40">
                  <div className="absolute left-[175px] -translate-x-1/2 flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-mono font-bold whitespace-nowrap">
                    <Sigma size={13} className="shrink-0" />
                    <span>{language === 'ar' ? 'الأسس الرياضية' : 'Mathematical Foundations'}</span>
                  </div>
                  <div className="absolute left-[470px] -translate-x-1/2 flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold whitespace-nowrap">
                    <Code2 size={13} className="shrink-0" />
                    <span>{language === 'ar' ? 'البرمجة والبيانات' : 'Programming & Data'}</span>
                  </div>
                  <div className="absolute left-[790px] -translate-x-1/2 flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold whitespace-nowrap">
                    <TrendingUp size={13} className="shrink-0" />
                    <span>{language === 'ar' ? 'الاقتصاد القياسي والتعلم' : 'Econometrics & ML'}</span>
                  </div>
                  <div className="absolute left-[1110px] -translate-x-1/2 flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-mono font-bold whitespace-nowrap">
                    <Brain size={13} className="shrink-0" />
                    <span>{language === 'ar' ? 'التعلم العميق والذكاء الاصطناعي' : 'Deep Learning & AI'}</span>
                  </div>
                </div>

                {/* SVG Edges Layer: Decoupled stable markers and photon overlay */}
                <svg
                  viewBox={`0 0 1260 ${canvasH}`}
                  className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
                >
                  <ConstellationConnectors edges={dagEdges} />
                </svg>

                {/* Render DAG Node Cards: Tactile polymorphic components */}
                {curriculum.map((mod) => {
                  const pos = DAG_COORDINATES[mod.id] || { x: 500, y: 400 };
                  const progress = lessons[mod.id];
                  const status =
                    progress?.status || (mod.prerequisites.length === 0 ? 'available' : 'locked');

                  return (
                    <div
                      key={mod.id}
                      className="absolute z-10"
                      style={{
                        left: `${pos.x}px`,
                        top: `${pos.y}px`,
                        transform: 'translate(-50%, -50%)',
                      }}
                    >
                      <SkillNodeComponent
                        module={mod}
                        status={status}
                        mode="dag"
                        language={language}
                        isHovered={hoveredModuleId === mod.id}
                        isSelected={selectedModule?.id === mod.id}
                        onClick={() => handleNodeClick(mod)}
                        onMouseEnter={() => setHoveredModuleId(mod.id)}
                        onMouseLeave={() => setHoveredModuleId(null)}
                      />
                    </div>
                  );
                })}
              </div>
            );
            }}
          </ConstellationCanvas>
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
                                  ? 'bg-[var(--math-vector)]/10 border-[var(--math-vector)]/40 text-[var(--math-vector)]'
                                  : isInProgress
                                  ? 'bg-[var(--math-gradient)]/10 border-[var(--math-gradient)]/40 text-[var(--math-gradient)]'
                                  : isAvailable
                                  ? 'bg-[var(--math-data)]/10 border-[var(--math-data)]/40 text-[var(--math-data)]'
                                  : isDecaying
                                  ? 'bg-[var(--math-loss)]/10 border-[var(--math-loss)]/40 text-[var(--math-loss)]'
                                  : 'bg-[var(--bg-surface)] border-[var(--border-subtle)] text-[var(--text-tertiary)]'
                              }`}
                            >
                              {isMastered && <Award size={15} className="text-[var(--math-vector)]" />}
                              {isInProgress && <Play size={13} fill="currentColor" />}
                              {isAvailable && <span className="w-2.5 h-2.5 rounded-full bg-[var(--math-data)] animate-ping" />}
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
            <div className="p-4 rounded-xl border border-[var(--math-gradient)]/40 bg-[var(--math-gradient)]/10 text-[var(--math-gradient)] text-xs font-mono space-y-2">
              <div className="flex items-center gap-2 font-semibold text-[var(--math-gradient)]">
                <Lock size={14} />
                <span>{language === 'ar' ? 'الوحدة مقفلة حالياً' : 'Module Currently Locked'}</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                {language === 'ar'
                  ? 'هذا المفهوم يتطلب المرور بالأسس الرياضية السابقة وإتقانها أولاً:'
                  : 'This concept builds directly on preceding mathematical foundations. You must master the following prerequisites first:'}
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {uncompletedPrereqs.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => onSelectModule(p)}
                    className="px-2.5 py-1 rounded-md bg-[var(--math-gradient)]/20 hover:bg-[var(--math-gradient)]/30 text-[var(--math-gradient)] border border-[var(--math-gradient)]/40 text-[11px] font-semibold transition-colors flex items-center gap-1.5"
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
                      className={`px-2.5 py-1 text-xs font-mono rounded-md border text-start transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer ${
                        isPMastered
                          ? 'border-[var(--math-vector)]/40 bg-[var(--math-vector)]/10 text-[var(--math-vector)] hover:border-[var(--math-vector)]'
                          : isPInProgress
                          ? 'border-[var(--math-gradient)]/40 bg-[var(--math-gradient)]/10 text-[var(--math-gradient)] hover:border-[var(--math-gradient)]'
                          : isPAvailable
                          ? 'border-[var(--math-data)]/40 bg-[var(--math-data)]/10 text-[var(--math-data)] hover:border-[var(--math-data)]'
                          : 'border-[var(--border-subtle)] bg-[var(--bg-app)] text-[var(--text-tertiary)] opacity-60'
                      }`}
                    >
                      {isPMastered && <CheckCircle2 size={11} className="text-[var(--math-vector)] shrink-0" />}
                      {isPInProgress && <Play size={10} className="text-[var(--math-gradient)] shrink-0" fill="currentColor" />}
                      {isPAvailable && <span className="w-1.5 h-1.5 rounded-full bg-[var(--math-data)] shrink-0" />}
                      {!isPMastered && !isPInProgress && !isPAvailable && <Lock size={10} className="shrink-0" />}
                      <span className="whitespace-nowrap">{language === 'ar' ? p.titleAr : p.title}</span>
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
            onClick={onStart}
            className="w-full py-3 rounded-xl font-semibold text-xs font-mono transition-transform flex items-center justify-center gap-2 shadow-lg bg-[var(--math-vector)] text-black active:scale-[0.98] hover:brightness-110 cursor-pointer whitespace-nowrap shrink-0"
          >
            <Play size={14} fill="currentColor" className="shrink-0" />
            <span className="whitespace-nowrap">
              {isMastered
                ? (language === 'ar' ? 'مراجعة الدرس' : 'Review Lesson')
                : progress?.status === 'in_progress'
                ? (language === 'ar' ? 'متابعة الدرس' : 'Continue Lesson')
                : isLocked
                ? (language === 'ar' ? 'ابدأ الدرس (استكشاف)' : 'Start Lesson (Explore)')
                : (language === 'ar' ? 'ابدأ الدرس' : 'Start Lesson')}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

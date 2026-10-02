import React from 'react';
import { FlaskConical, Lock, ArrowRight, BookOpen, Compass } from 'lucide-react';
import { useOkvirStore } from '@/lib/store';
import { tr } from '@/lib/i18n';
import { curriculum } from '@/lib/curriculum';
import { SimulationView } from '@/components/simulation/SimulationView';
import type { SimulationType } from '@/lib/types';

const SIMULATION_MODULE_MAP: Record<SimulationType, string> = {
  vectors: 'linear-algebra-vectors',
  gradient: 'gradient-vector',
  bayes: 'bayes-theorem',
  ols: 'ols-residual-geometry',
  knn: 'knn-classification',
  kmeans: 'kmeans-clustering',
  tree: 'decision-trees',
  regularization: 'ridge-lasso',
  neural: 'perceptron-activation',
  conv: 'cnn-convolution',
  attention: 'transformer-attention',
  simpson: 'causal-inference-confounding',
  anscombe: 'eda-anscombe',
  eigen: 'eigenvalues-eigenvectors',
  clt: 'central-limit-theorem',
  iv: 'instrumental-variables-2sls',
  autograd: 'autograd-computational-graph',
  bpe: 'bpe-tokenization',
};

const SIM_TABS: { type: SimulationType; label: { en: string; ar: string } }[] = [
  { type: 'ols', label: { en: 'OLS Regression', ar: 'انحدار OLS' } },
  { type: 'vectors', label: { en: 'Vector Geometry', ar: 'هندسة المتجهات' } },
  { type: 'eigen', label: { en: 'EigenHunter', ar: 'صائد المتجهات الذاتية' } },
  { type: 'bayes', label: { en: 'Bayes Frequency', ar: 'شجرة بايز' } },
  { type: 'clt', label: { en: 'Galton Board (CLT)', ar: 'لوحة غالتون (CLT)' } },
  { type: 'knn', label: { en: 'KNN Radar', ar: 'رادار KNN' } },
  { type: 'gradient', label: { en: 'Gradient Descent', ar: 'الانحدار التدرجي' } },
  { type: 'kmeans', label: { en: 'K-Means Voronoi', ar: 'فورونوي K-Means' } },
  { type: 'tree', label: { en: 'Decision Tree', ar: 'شجرة القرار' } },
  { type: 'regularization', label: { en: 'L1 vs L2 Geometry', ar: 'هندسة الانتظام L1/L2' } },
  { type: 'simpson', label: { en: "Simpson's Paradox", ar: 'مفارقة سيمبسون' } },
  { type: 'iv', label: { en: '2SLS Instrumental IV', ar: 'المتغيرات الصورية 2SLS' } },
  { type: 'anscombe', label: { en: "Anscombe's Quartet", ar: 'رباعية أنسكوم' } },
  { type: 'neural', label: { en: 'Neural Activation', ar: 'تفعيل الخلية العصبية' } },
  { type: 'autograd', label: { en: 'OkvirGrad Autograd', ar: 'تفاضل أوكفير التلقائي' } },
  { type: 'conv', label: { en: '2D Convolution', ar: 'الالتفاف المكاني 2D' } },
  { type: 'attention', label: { en: 'Self-Attention', ar: 'الانتباه الذاتي' } },
  { type: 'bpe', label: { en: 'BPE Tokenizer', ar: 'ترميز BPE للمحولات' } },
];

export const Sandbox: React.FC = () => {
  const {
    activeSimulation,
    setActiveSimulation,
    language,
    lessons,
    startLesson,
    setCurrentView,
  } = useOkvirStore();

  const [unlockedPlaygroundSims, setUnlockedPlaygroundSims] = React.useState<Set<string>>(new Set());

  const activeModuleId = SIMULATION_MODULE_MAP[activeSimulation];
  const activeModule = curriculum.find((m) => m.id === activeModuleId);
  const activeLessonProgress = lessons[activeModuleId];
  const isSimulationLocked =
    (activeLessonProgress ? activeLessonProgress.status === 'locked' : false) &&
    !unlockedPlaygroundSims.has(activeSimulation);

  // Find uncompleted prerequisites
  const uncompletedPrereqs = (activeModule?.prerequisites || [])
    .map((pId) => curriculum.find((m) => m.id === pId))
    .filter((m) => m && lessons[m.id]?.status !== 'mastered');

  return (
    <div className="flex-1 overflow-y-auto p-6 pb-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <FlaskConical size={20} className="text-[var(--math-prediction)]" />
            <h1 className="text-2xl font-bold text-[var(--text-primary)]">
              {tr('sandboxTitle', language)}
            </h1>
          </div>
          <p className="text-sm text-[var(--text-secondary)]">
            {tr('sandboxDesc', language)}
          </p>
        </div>

        {/* Tab bar */}
        <div className="flex flex-wrap items-center gap-1.5 mb-6 p-1.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]">
          {SIM_TABS.map((tab) => {
            const modId = SIMULATION_MODULE_MAP[tab.type];
            const isTabLocked = lessons[modId]?.status === 'locked';
            const isActive = activeSimulation === tab.type;

            return (
              <button
                key={tab.type}
                onClick={() => setActiveSimulation(tab.type)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-[var(--bg-surface-hover)] text-[var(--text-primary)] border border-[var(--border-strong)] shadow-sm'
                    : isTabLocked
                    ? 'text-[var(--text-tertiary)] opacity-60 hover:opacity-100 hover:bg-[var(--bg-app)]'
                    : 'text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] hover:bg-[var(--bg-app)]'
                }`}
              >
                {isTabLocked && <Lock size={11} className="text-[var(--math-gradient)] shrink-0" />}
                <span>{tab.label[language]}</span>
              </button>
            );
          })}
        </div>

        {/* Active Simulation or Locked Gatekeeper View */}
        {isSimulationLocked && activeModule ? (
          <div className="rounded-2xl border border-amber-500/30 bg-[var(--bg-surface)] p-8 lg:p-10 shadow-2xl specular text-center space-y-6 slide-up">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-[var(--math-gradient)] flex items-center justify-center mx-auto shadow-inner">
              <Lock size={30} />
            </div>

            <div className="space-y-2 max-w-md mx-auto">
              <span className="px-2.5 py-0.5 text-[11px] font-mono font-bold rounded-full bg-amber-500/10 text-[var(--math-gradient)] border border-amber-500/20">
                {language === 'ar' ? 'مختبر مقفل • يتطلب إتقان المتطلبات' : 'Locked Laboratory • Prerequisite Required'}
              </span>
              <h2 className="text-xl font-bold text-[var(--text-primary)] pt-1">
                {language === 'ar' ? activeModule.titleAr : activeModule.title}
              </h2>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                {language === 'ar'
                  ? `هذا المختبر التفاعلي يستكشف مفاهيم رياضية متقدمة من وحدة "${activeModule.titleAr}". لإتاحة التلاعب المباشر الكامل في هذا الفضاء، يجب إتقان المتطلبات الأساسية أولاً في برج المعرفة:`
                  : `This interactive laboratory explores mathematical invariants from "${activeModule.title}". To access direct simulation controls, you must first master the prerequisite modules in the Constellation:`}
              </p>
            </div>

            {/* Prerequisite List */}
            {uncompletedPrereqs.length > 0 && (
              <div className="max-w-md mx-auto space-y-2.5 text-start">
                {uncompletedPrereqs.map((prereq) => (
                  <div
                    key={prereq!.id}
                    className="flex items-center justify-between p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-app)] hover:border-amber-500/40 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-[var(--math-gradient)] shadow-sm" />
                      <div>
                        <div className="text-xs font-semibold text-[var(--text-primary)]">
                          {language === 'ar' ? prereq!.titleAr : prereq!.title}
                        </div>
                        <div className="text-[10px] text-[var(--text-tertiary)] font-mono">
                          ~{prereq!.estimatedMinutes} mins • {prereq!.trackId.toUpperCase()}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => startLesson(prereq!.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--math-vector)] text-black text-xs font-mono font-semibold hover:brightness-110 transition-transform active:scale-95 cursor-pointer whitespace-nowrap shrink-0"
                    >
                      <BookOpen size={12} className="shrink-0" />
                      <span className="whitespace-nowrap">{language === 'ar' ? 'ابدأ المتطلب' : 'Start Lesson'}</span>
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="pt-2 flex flex-wrap justify-center gap-3">
              <button
                onClick={() => setUnlockedPlaygroundSims((prev) => new Set([...prev, activeSimulation]))}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[var(--math-gradient)]/40 bg-[var(--math-gradient)]/10 hover:bg-[var(--math-gradient)]/20 text-xs font-mono font-bold text-[var(--math-gradient)] transition-all active:scale-95 cursor-pointer whitespace-nowrap shrink-0"
              >
                <FlaskConical size={14} className="shrink-0" />
                <span className="whitespace-nowrap">{language === 'ar' ? 'تشغيل في وضع التجربة الحرة' : 'Launch Playground (Sandbox Override)'}</span>
              </button>
              <button
                onClick={() => setCurrentView('constellation')}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[var(--border-subtle)] hover:border-[var(--border-strong)] text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all cursor-pointer whitespace-nowrap shrink-0"
              >
                <Compass size={14} className="shrink-0" />
                <span className="whitespace-nowrap">{language === 'ar' ? 'الذهاب إلى برج المعرفة' : 'Explore Constellation'}</span>
              </button>
              {activeModule && (
                <button
                  onClick={() => startLesson(activeModule.id)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--text-primary)] text-[var(--bg-app)] text-xs font-mono font-semibold hover:brightness-90 transition-transform active:scale-95 cursor-pointer whitespace-nowrap shrink-0"
                >
                  <span className="whitespace-nowrap">{language === 'ar' ? 'فتح شاشة الوحدة' : 'View Module Screen'}</span>
                  <ArrowRight size={13} className={`shrink-0 ${language === 'ar' ? 'rotate-180' : ''}`} />
                </button>
              )}
            </div>
          </div>
        ) : (
          <SimulationView type={activeSimulation} />
        )}

        {/* Guaranteed clearance spacer so fixed bottom bar never overlaps controls */}
        <div className="h-16 shrink-0 pointer-events-none" aria-hidden="true" />
      </div>
    </div>
  );
};

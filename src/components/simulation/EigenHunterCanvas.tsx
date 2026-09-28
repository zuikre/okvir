import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { useOkvirStore } from '@/lib/store';
import { audio } from '@/lib/audio';
import { PreCanvasBriefing, PostCanvasConsolidation, type TierContent } from '@/components/pedagogy/MultiTierDisclosure';
import { Compass, Sparkles, RotateCcw, Target } from 'lucide-react';

interface Matrix2x2 {
  a: number;
  b: number;
  c: number;
  d: number;
}

const MATRIX_PRESETS: {
  id: string;
  name: { en: string; ar: string };
  matrix: Matrix2x2;
}[] = [
  {
    id: 'symmetric',
    name: { en: 'Symmetric Stretch', ar: 'تمدد متماثل' },
    matrix: { a: 2.0, b: 1.0, c: 1.0, d: 2.0 },
  },
  {
    id: 'diagonal',
    name: { en: 'Independent Scaling', ar: 'تحجيم محاور مستقل' },
    matrix: { a: 2.5, b: 0.0, c: 0.0, d: 0.5 },
  },
  {
    id: 'shear',
    name: { en: 'Horizontal Shear', ar: 'قص أفقي' },
    matrix: { a: 1.0, b: 1.5, c: 0.0, d: 1.0 },
  },
  {
    id: 'reflection',
    name: { en: 'Diagonal Reflection', ar: 'انعكاس قطري' },
    matrix: { a: 0.0, b: 1.0, c: 1.0, d: 0.0 },
  },
  {
    id: 'rotation',
    name: { en: 'Pure Rotation (No Real λ)', ar: 'دوران نقي (بدون λ حقيقي)' },
    matrix: { a: 0.0, b: -1.0, c: 1.0, d: 0.0 },
  },
];

const EIGEN_PEDAGOGY: TierContent = {
  intuition: {
    analogy: {
      en: 'Most vectors change their direction when multiplied by a matrix: they stretch and rotate. But along certain special directions, vectors do NOT rotate at all—they only stretch or shrink. These invariant directional axes are the eigenvectors.',
      ar: 'معظم المتجهات تغير اتجاهها عند ضربها في مصفوفة: فهي تتمدد وتدور. لكن على طول اتجاهات خاصة ومميزة، لا تدور المتجهات على الإطلاق—بل تتمدد أو تنكمش فقط. هذه المحاور الاتجاهية الثابتة هي المتجهات الذاتية (Eigenvectors).',
    },
    keyTakeaway: {
      en: 'Av = λv. The eigenvector v defines the invariant line; the eigenvalue λ is the scaling factor along that line. If λ > 1 it expands; if 0 < λ < 1 it contracts; if λ < 0 it flips direction.',
      ar: 'Av = λv. المتجه الذاتي v يحدد خط الاتجاه الثابت؛ والقيمة الذاتية λ هي معامل التمدد أو الانكماش على طول ذلك الخط.',
    },
  },
  geometry: {
    visualDescription: {
      en: 'The transformation stretches the unit circle into an ellipse. The major and minor axes of this ellipse correspond directly to the orthogonal eigenvectors of a symmetric matrix.',
      ar: 'التحويل الخطي يمدد دائرة الوحدة لتصبح قطعاً ناقصاً (إهليلجاً). يتطابق المحوران الرئيسي والثانوي لهذا القطع الناقص مباشرة مع المتجهات الذاتية المتعامدة.',
    },
    conservedQuantity: {
      en: 'Determinant equals the product of eigenvalues: det(A) = λ₁ · λ₂. Trace equals the sum: tr(A) = λ₁ + λ₂.',
      ar: 'محدد المصفوفة يساوي حاصل ضرب القيم الذاتية: det(A) = λ₁ · λ₂. بينما أثر المصفوفة يساوي مجموعهما: tr(A) = λ₁ + λ₂.',
    },
  },
  formal: {
    equation: 'A \\mathbf{v} = \\lambda \\mathbf{v} \\iff (A - \\lambda I)\\mathbf{v} = \\mathbf{0} \\implies \\det(A - \\lambda I) = 0',
    derivationSteps: [
      {
        step: '\\det\\begin{pmatrix} a - \\lambda & b \\\\ c & d - \\lambda \\end{pmatrix} = \\lambda^2 - (a+d)\\lambda + (ad - bc) = 0',
        note: {
          en: 'Characteristic polynomial: λ² - tr(A)λ + det(A) = 0',
          ar: 'كثيرة الحدود المميزة: λ² - tr(A)λ + det(A) = 0',
        },
      },
      {
        step: '\\Delta = \\text{tr}(A)^2 - 4\\det(A)',
        note: {
          en: 'Discriminant determines real vs complex conjugate eigenvalue spectrum',
          ar: 'المميز يحدد ما إذا كانت القيم الذاتية حقيقية أم مركبة',
        },
      },
      {
        step: '\\lambda_{1,2} = \\frac{\\text{tr}(A) \\pm \\sqrt{\\Delta}}{2}',
        note: {
          en: 'Closed-form roots yield the exact scaling factors along the eigenspaces',
          ar: 'جذور المعادلة التحليلية تعطي معاملات القياس الدقيقة للفضاءات الذاتية',
        },
      },
    ],
  },
  code: {
    snippet: `import numpy as np

# Compute eigenvalues and eigenvectors
A = np.array([[2.0, 1.0],
              [1.0, 2.0]])

eigenvalues, eigenvectors = np.linalg.eig(A)

for i in range(len(eigenvalues)):
    lam = eigenvalues[i]
    v = eigenvectors[:, i]
    # Invariant property: A @ v == lam * v
    print(f"λ_{i+1} = {lam:.2f}, v_{i+1} = {v}")
    assert np.allclose(A @ v, lam * v)`,
    explanation: {
      en: 'numpy.linalg.eig calculates the complete eigendecomposition via QR iteration.',
      ar: 'تقوم numpy.linalg.eig بحساب التفكيك الذاتي الكامل عبر خوارزمية تكرار QR.',
    },
  },
};

export const EigenHunterCanvas: React.FC<{ compact?: boolean }> = ({ compact }) => {
  const { language, config } = useOkvirStore();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [matrix, setMatrix] = useState<Matrix2x2>({ a: 2.0, b: 1.0, c: 1.0, d: 2.0 });
  const [angle, setAngle] = useState(0.45); // Radians ~ 25 degrees
  const [isDragging, setIsDragging] = useState(false);
  const [hasSnapped, setHasSnapped] = useState(false);

  // Probe vector v (unit vector)
  const v = useMemo(() => ({ x: Math.cos(angle), y: Math.sin(angle) }), [angle]);

  // Transformed vector w = A @ v
  const w = useMemo(
    () => ({
      x: matrix.a * v.x + matrix.b * v.y,
      y: matrix.c * v.x + matrix.d * v.y,
    }),
    [matrix, v]
  );

  // Theoretical eigensystem
  const eigensystem = useMemo(() => {
    const tr = matrix.a + matrix.d;
    const det = matrix.a * matrix.d - matrix.b * matrix.c;
    const disc = tr * tr - 4 * det;

    if (disc < 0) {
      return { hasReal: false, lambda1: 0, lambda2: 0, v1: null, v2: null };
    }

    const sqrtDisc = Math.sqrt(disc);
    const l1 = (tr + sqrtDisc) / 2;
    const l2 = (tr - sqrtDisc) / 2;

    // Eigenvectors
    const getVec = (lambda: number) => {
      // (a - lambda) x + b y = 0
      if (Math.abs(matrix.b) > 1e-6) {
        const vx = matrix.b;
        const vy = lambda - matrix.a;
        const norm = Math.hypot(vx, vy);
        return norm > 0 ? { x: vx / norm, y: vy / norm } : { x: 1, y: 0 };
      }
      if (Math.abs(matrix.c) > 1e-6) {
        const vx = lambda - matrix.d;
        const vy = matrix.c;
        const norm = Math.hypot(vx, vy);
        return norm > 0 ? { x: vx / norm, y: vy / norm } : { x: 0, y: 1 };
      }
      return lambda === matrix.a ? { x: 1, y: 0 } : { x: 0, y: 1 };
    };

    return {
      hasReal: true,
      lambda1: l1,
      lambda2: l2,
      v1: getVec(l1),
      v2: getVec(l2),
    };
  }, [matrix]);

  // Check if current probe vector v is close to an eigenvector (cross product ~ 0)
  const alignmentError = Math.abs(v.x * w.y - v.y * w.x);
  const isAligned = alignmentError < 0.08;
  const currentLambda = Math.hypot(w.x, w.y) * (v.x * w.x + v.y * w.y < 0 ? -1 : 1);

  // Sound trigger on alignment snap
  useEffect(() => {
    if (isAligned && !hasSnapped) {
      setHasSnapped(true);
      if (config.soundEnabled) audio.playSuccessChime();
    } else if (!isAligned && hasSnapped) {
      setHasSnapped(false);
    }
  }, [isAligned, hasSnapped, config.soundEnabled]);

  // Mouse / Pointer handler to rotate probe vector v
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    setIsDragging(true);
    updateAngleFromPointer(e);
  };

  const updateAngleFromPointer = useCallback((e: React.PointerEvent<HTMLCanvasElement> | PointerEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const px = e.clientX - rect.left - cx;
    const py = cy - (e.clientY - rect.top); // flip Y for Cartesian
    let newAngle = Math.atan2(py, px);
    if (newAngle < 0) newAngle += 2 * Math.PI;
    setAngle(newAngle);
  }, []);

  useEffect(() => {
    const handleMove = (e: PointerEvent) => {
      if (isDragging) updateAngleFromPointer(e);
    };
    const handleUp = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener('pointermove', handleMove);
      window.addEventListener('pointerup', handleUp);
    }
    return () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerup', handleUp);
    };
  }, [isDragging, updateAngleFromPointer]);

  // Render Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const wWidth = rect.width;
    const wHeight = rect.height;
    const cx = wWidth / 2;
    const cy = wHeight / 2;
    const scale = Math.min(wWidth, wHeight) / 8; // Coordinate domain [-4, 4]

    const toScreen = (x: number, y: number) => ({
      px: cx + x * scale,
      py: cy - y * scale,
    });

    ctx.clearRect(0, 0, wWidth, wHeight);

    // 1. Coordinate Grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let i = -4; i <= 4; i++) {
      const p1 = toScreen(i, -4);
      const p2 = toScreen(i, 4);
      ctx.beginPath();
      ctx.moveTo(p1.px, p1.py);
      ctx.lineTo(p2.px, p2.py);
      ctx.stroke();

      const h1 = toScreen(-4, i);
      const h2 = toScreen(4, i);
      ctx.beginPath();
      ctx.moveTo(h1.px, h1.py);
      ctx.lineTo(h2.px, h2.py);
      ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, cy);
    ctx.lineTo(wWidth, cy);
    ctx.moveTo(cx, 0);
    ctx.lineTo(cx, wHeight);
    ctx.stroke();

    // 2. Unit Circle
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.arc(cx, cy, scale, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.setLineDash([]);

    // 3. Theoretical Eigenspaces (if real)
    if (eigensystem.hasReal) {
      const drawEigenspaceLine = (ev: { x: number; y: number }, color: string) => {
        const pA = toScreen(-ev.x * 4, -ev.y * 4);
        const pB = toScreen(ev.x * 4, ev.y * 4);
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.5;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(pA.px, pA.py);
        ctx.lineTo(pB.px, pB.py);
        ctx.stroke();
        ctx.setLineDash([]);
      };

      if (eigensystem.v1) drawEigenspaceLine(eigensystem.v1, 'rgba(16, 185, 129, 0.4)');
      if (eigensystem.v2) drawEigenspaceLine(eigensystem.v2, 'rgba(245, 158, 11, 0.4)');
    }

    // 4. Draw Input Vector v (Sky blue arrow)
    const sv = toScreen(v.x, v.y);
    ctx.strokeStyle = '#38bdf8';
    ctx.fillStyle = '#38bdf8';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(sv.px, sv.py);
    ctx.stroke();

    // Arrowhead for v
    const arrowLen = 9;
    const vAngle = Math.atan2(sv.py - cy, sv.px - cx);
    ctx.beginPath();
    ctx.moveTo(sv.px, sv.py);
    ctx.lineTo(
      sv.px - arrowLen * Math.cos(vAngle - Math.PI / 6),
      sv.py - arrowLen * Math.sin(vAngle - Math.PI / 6)
    );
    ctx.lineTo(
      sv.px - arrowLen * Math.cos(vAngle + Math.PI / 6),
      sv.py - arrowLen * Math.sin(vAngle + Math.PI / 6)
    );
    ctx.fill();

    // 5. Draw Transformed Vector w = Av (Violet / Rose)
    const sw = toScreen(w.x, w.y);
    ctx.strokeStyle = isAligned ? '#10b981' : '#a855f7';
    ctx.fillStyle = isAligned ? '#10b981' : '#a855f7';
    ctx.lineWidth = isAligned ? 4 : 3;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(sw.px, sw.py);
    ctx.stroke();

    // Arrowhead for w
    const wAngle = Math.atan2(sw.py - cy, sw.px - cx);
    ctx.beginPath();
    ctx.moveTo(sw.px, sw.py);
    ctx.lineTo(
      sw.px - arrowLen * Math.cos(wAngle - Math.PI / 6),
      sw.py - arrowLen * Math.sin(wAngle - Math.PI / 6)
    );
    ctx.lineTo(
      sw.px - arrowLen * Math.cos(wAngle + Math.PI / 6),
      sw.py - arrowLen * Math.sin(wAngle + Math.PI / 6)
    );
    ctx.fill();

    // 6. Handle on Probe Vector v for direct tactile rotation
    ctx.fillStyle = '#38bdf8';
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(sv.px, sv.py, 7, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();

    // Alignment Halo & HUD if aligned
    if (isAligned) {
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.6)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(sv.px, sv.py, 14, 0, 2 * Math.PI);
      ctx.stroke();
    }
  }, [v, w, eigensystem, isAligned, matrix]);

  return (
    <div className="flex flex-col gap-5 w-full">
      {!compact && <PreCanvasBriefing content={EIGEN_PEDAGOGY} />}

      <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 lg:p-6 specular shadow-xl space-y-4">
        {/* Controls & Presets */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-subtle)] pb-4">
          <div className="flex items-center gap-2">
            <Compass size={18} className="text-[var(--math-vector)]" />
            <h3 className="text-sm font-bold text-[var(--text-primary)]">
              {language === 'ar' ? 'صائد المتجهات الذاتية (EigenHunter)' : 'EigenHunter: Invariant Directions'}
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {MATRIX_PRESETS.map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  setMatrix(p.matrix);
                  if (config.soundEnabled) audio.playClick();
                }}
                className={`px-2.5 py-1 text-xs rounded-lg font-mono border transition-all ${
                  matrix.a === p.matrix.a &&
                  matrix.b === p.matrix.b &&
                  matrix.c === p.matrix.c &&
                  matrix.d === p.matrix.d
                    ? 'bg-[var(--math-vector)]/15 text-[var(--math-vector)] border-[var(--math-vector)] font-semibold'
                    : 'text-[var(--text-tertiary)] border-[var(--border-subtle)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-hover)]'
                }`}
              >
                {p.name[language]}
              </button>
            ))}
          </div>
        </div>

        {/* Live HUD / Diagnostic Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-app)]">
            <span className="text-[10px] font-mono text-[var(--text-tertiary)] block">
              {language === 'ar' ? 'المتجه الأصلي v' : 'Probe Vector v'}
            </span>
            <span className="text-xs font-mono font-bold text-[#38bdf8] tabular-nums">
              [{v.x.toFixed(2)}, {v.y.toFixed(2)}]
            </span>
          </div>

          <div className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-app)]">
            <span className="text-[10px] font-mono text-[var(--text-tertiary)] block">
              {language === 'ar' ? 'المتجه المحول Av' : 'Transformed Av'}
            </span>
            <span className="text-xs font-mono font-bold text-[#a855f7] tabular-nums">
              [{w.x.toFixed(2)}, {w.y.toFixed(2)}]
            </span>
          </div>

          <div
            className={`p-3 rounded-xl border transition-colors ${
              isAligned
                ? 'border-emerald-500/60 bg-emerald-500/10'
                : 'border-[var(--border-subtle)] bg-[var(--bg-app)]'
            }`}
          >
            <span className="text-[10px] font-mono text-[var(--text-tertiary)] block flex items-center justify-between">
              <span>{language === 'ar' ? 'حالة التطابق' : 'Eigen Alignment'}</span>
              {isAligned && <Sparkles size={11} className="text-emerald-400" />}
            </span>
            <span
              className={`text-xs font-mono font-bold tabular-nums ${
                isAligned ? 'text-emerald-400 font-extrabold' : 'text-[var(--text-secondary)]'
              }`}
            >
              {isAligned
                ? language === 'ar'
                  ? 'تم الرصد! Av ∥ v'
                  : 'LOCKED! Av ∥ v'
                : `${((1 - Math.min(1, alignmentError)) * 100).toFixed(0)}%`}
            </span>
          </div>

          <div className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-app)]">
            <span className="text-[10px] font-mono text-[var(--text-tertiary)] block">
              {language === 'ar' ? 'معامل التمدد λ' : 'Scaling Factor λ'}
            </span>
            <span className="text-xs font-mono font-bold text-[var(--math-gradient)] tabular-nums">
              {isAligned ? `λ = ${currentLambda.toFixed(2)}` : '~'}
            </span>
          </div>
        </div>

        {/* Canvas Workspace */}
        <div className="relative w-full h-80 rounded-xl overflow-hidden border border-[var(--border-subtle)] bg-black/40 cursor-grab active:cursor-grabbing select-none">
          <canvas
            ref={canvasRef}
            onPointerDown={handlePointerDown}
            className="w-full h-full block"
          />

          {/* Interactive Dial Hint */}
          <div className="absolute bottom-3 start-3 pointer-events-none px-2.5 py-1 rounded-md bg-black/70 border border-white/10 text-[10px] font-mono text-[var(--text-secondary)] backdrop-blur-sm">
            {language === 'ar'
              ? 'اسحب النقطة الزرقاء لتدوير المتجه والبحث عن خط الاتجاه الثابت'
              : 'Drag cyan dot to rotate vector and hunt for invariant axes'}
          </div>

          {/* Matrix Widget Inset */}
          <div className="absolute top-3 end-3 px-3 py-2 rounded-lg bg-black/75 border border-white/10 text-[11px] font-mono backdrop-blur-md">
            <div className="text-[9px] text-[var(--text-tertiary)] mb-0.5">Matrix A</div>
            <div className="flex items-center gap-1.5 text-[var(--text-primary)]">
              <span>[</span>
              <span>{matrix.a.toFixed(1)}, {matrix.b.toFixed(1)}</span>
              <span>;</span>
              <span>{matrix.c.toFixed(1)}, {matrix.d.toFixed(1)}</span>
              <span>]</span>
            </div>
            {eigensystem.hasReal && (
              <div className="text-[10px] text-emerald-400 mt-1">
                λ₁={eigensystem.lambda1.toFixed(2)}, λ₂={eigensystem.lambda2.toFixed(2)}
              </div>
            )}
          </div>
        </div>

        {/* Rotary Dial Angle Slider */}
        <div className="flex items-center gap-4 pt-1">
          <span className="text-xs font-mono text-[var(--text-secondary)] shrink-0 flex items-center gap-1.5">
            <Target size={13} className="text-[var(--math-prediction)]" />
            <span>{language === 'ar' ? 'زاوية المتجه θ' : 'Vector Angle θ'}:</span>
            <span className="text-[var(--text-primary)] font-bold tabular-nums">
              {((angle * 180) / Math.PI).toFixed(0)}°
            </span>
          </span>
          <input
            type="range"
            min="0"
            max={2 * Math.PI}
            step="0.01"
            value={angle}
            onChange={(e) => setAngle(parseFloat(e.target.value))}
            className="flex-1 accent-[var(--math-prediction)] cursor-pointer"
          />
          <button
            onClick={() => setAngle(0.45)}
            className="p-1.5 rounded-lg border border-[var(--border-subtle)] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors"
            title={language === 'ar' ? 'إعادة التعيين' : 'Reset'}
          >
            <RotateCcw size={13} />
          </button>
        </div>
      </div>

      {!compact && <PostCanvasConsolidation content={EIGEN_PEDAGOGY} />}
    </div>
  );
};

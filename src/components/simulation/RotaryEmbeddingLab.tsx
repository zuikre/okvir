import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useOkvirStore } from '@/lib/store';
import { audio } from '@/lib/audio';
import { PreCanvasBriefing, PostCanvasConsolidation, TierContent } from '@/components/pedagogy/MultiTierDisclosure';
import { Compass, Sparkles } from 'lucide-react';

interface Props {
  compact?: boolean;
}

const ROPE_PEDAGOGY: TierContent = {
  intuition: {
    analogy: {
      en: 'Absolute positional encodings add an artificial stamp to each word ("I am word #5"), but humans understand grammar by relative distance ("the adjective is 1 slot before the noun"). RoPE rotates each 2D vector slice around a circle like clock hands: the angle between two hands depends strictly on how many hours apart they are (m - n), not what time it is.',
      ar: 'تضيف الترميزات الموقعية المطلقة ختماً اصطناعياً لكل كلمة ("أنا الكلمة رقم 5")، لكن الإنسان يفهم اللغة بالمسافة النسبية ("الصفة تسبق الموصوف بكلمة واحدة"). تدير آلية RoPE كل شريحة ثنائية الأبعاد على دائرة كعقارب الساعة: تعتمد الزاوية بين عقربين فقط على فارق الساعات بينهما (m - n)، وليس على وقت البدء.',
    },
    keyTakeaway: {
      en: 'Rotary Position Embedding (RoPE) encodes relative positional information by multiplying query and key representations by a complex rotation matrix R_m. The resulting inner product ⟨R_m q, R_n k⟩ depends exclusively on the relative displacement (m - n).',
      ar: 'يقوم RoPE بترميز الموقع النسبي عبر ضرب متجهات الاستعلام والمفاتيح في مصفوفة دوران مركبة R_m. الناتج القياسي الناتج ⟨R_m q, R_n k⟩ يعتمد حصرياً على الإزاحة النسبية (m - n).',
    },
  },
  geometry: {
    visualDescription: {
      en: 'The d-dimensional embedding space is factored into d/2 orthogonal 2D planes. In each plane i, token vector coordinates are rotated by angle m·θ_i, where θ_i = 10000^(-2i/d). High frequencies capture immediate syntactic adjacency, while low frequencies capture document-level narrative context.',
      ar: 'يُقسّم الفضاء ذو البعد d إلى d/2 مستوى ثنائي الأبعاد متعامد. في كل مستوى i، يُدار متجه الكلمة بزاوية m·θ_i حيث θ_i = 10000^(-2i/d). تلتقط الترددات العالية التجاور النحوي المباشر، بينما تحفظ الترددات المنخفضة السياق الشامل.',
    },
    conservedQuantity: {
      en: 'Norm Preservation: Orthogonal rotation matrices satisfy ||R_m v||_2 = ||v||_2. The vector magnitude is perfectly conserved with zero distortion across arbitrary sequence lengths.',
      ar: 'ثبوت المعيار الإقليدي: مصفوفات الدوران المتعامدة تحفظ الطول ||R_m v||_2 = ||v||_2 دون أي تشويه أو تضخيم للمتجه عبر أي طول سياق.',
    },
  },
  formal: {
    equation: '\\mathbf{R}_{\\Theta, m}^d = \\text{diag}\\left(\\mathbf{R}_1, \\mathbf{R}_2, \\dots, \\mathbf{R}_{d/2}\\right), \\quad \\mathbf{R}_i = \\begin{pmatrix} \\cos(m\\theta_i) & -\\sin(m\\theta_i) \\\\ \\sin(m\\theta_i) & \\cos(m\\theta_i) \\end{pmatrix}',
    derivationSteps: [
      {
        step: '\\theta_i = 10000^{-2(i-1)/d}, \\quad i \\in \\{1, 2, \\dots, d/2\\}',
        note: {
          en: 'Exponential frequency decay schedule across 2D orthogonal subspaces',
          ar: 'تدرج تناقص التردد الأسي عبر الفضاءات الجزئية المتعامدة ثنائية الأبعاد',
        },
      },
      {
        step: '\\langle \\mathbf{R}_m \\mathbf{q}, \\mathbf{R}_n \\mathbf{k} \\rangle = \\mathbf{q}^T \\mathbf{R}_m^T \\mathbf{R}_n \\mathbf{k} = \\mathbf{q}^T \\mathbf{R}_{n-m} \\mathbf{k}',
        note: {
          en: 'Relative shift-invariance: Dot product depends strictly on positional delta (m - n)',
          ar: 'الثبات على الإزاحة النسبية: الجداء القياسي يعتمد حصرياً على فرق الموضع (m - n)',
        },
      },
    ],
  },
  code: {
    snippet: `def apply_rotary_emb(x, cos, sin):
    # x shape: [batch, seq_len, num_heads, head_dim]
    d = x.shape[-1]
    x1, x2 = x[..., :d//2], x[..., d//2:]
    # Complex rotation: (x1 + i*x2) * (cos + i*sin)
    rotated = torch.cat((-x2, x1), dim=-1)
    return (x * cos) + (rotated * sin)`,
    explanation: {
      en: 'Decomposes feature dimension into 2D chunks, rotating each chunk by frequency angles theta_i * pos.',
      ar: 'يقسم بعد الميزات إلى قطع ثنائية الأبعاد، ويدير كل قطعة بزوايا التردد theta_i * pos.',
    },
  },
};

export const RotaryEmbeddingLab: React.FC<Props> = ({ compact = false }) => {
  const { language, config } = useOkvirStore();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [posM, setPosM] = useState<number>(3); // Query token position
  const [posN, setPosN] = useState<number>(1); // Key token position
  const [freqIdx, setFreqIdx] = useState<number>(0); // 2D subspace frequency index

  const d = 64; // Embedding dimension
  const thetaBase = 10000;
  const theta = Math.pow(thetaBase, -(2 * freqIdx) / d);

  const angleM = posM * theta;
  const angleN = posN * theta;
  const relDelta = posM - posN;
  const angleDelta = relDelta * theta;

  // Base vectors (before rotation)
  const baseQ = { x: 1.0, y: 0.0 };
  const baseK = { x: 0.8, y: 0.6 };

  // Rotated vectors in complex plane: (x + iy) * e^{i * angle}
  const rotatedQ = useMemo(() => {
    const cos = Math.cos(angleM);
    const sin = Math.sin(angleM);
    return {
      x: baseQ.x * cos - baseQ.y * sin,
      y: baseQ.x * sin + baseQ.y * cos,
    };
  }, [angleM, baseQ.x, baseQ.y]);

  const rotatedK = useMemo(() => {
    const cos = Math.cos(angleN);
    const sin = Math.sin(angleN);
    return {
      x: baseK.x * cos - baseK.y * sin,
      y: baseK.x * sin + baseK.y * cos,
    };
  }, [angleN, baseK.x, baseK.y]);

  const dotProduct = useMemo(() => {
    return (rotatedQ.x * rotatedK.x + rotatedQ.y * rotatedK.y).toFixed(3);
  }, [rotatedQ, rotatedK]);

  // Canvas Rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, width, height);

    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(centerX, centerY) * 0.72;

    // Draw unit circle background
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.stroke();

    // Draw coordinate axes
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
    ctx.beginPath();
    ctx.moveTo(centerX - radius - 20, centerY);
    ctx.lineTo(centerX + radius + 20, centerY);
    ctx.moveTo(centerX, centerY - radius - 20);
    ctx.lineTo(centerX, centerY + radius + 20);
    ctx.stroke();

    // Arc for Delta Angle (m - n) * theta
    ctx.strokeStyle = 'rgba(251, 191, 36, 0.4)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    const startArc = -angleN;
    const endArc = -angleM;
    ctx.arc(centerX, centerY, radius * 0.35, Math.min(startArc, endArc), Math.max(startArc, endArc));
    ctx.stroke();

    // Draw Vector Q (Query at position m) - Amber
    const qScreenX = centerX + rotatedQ.x * radius;
    const qScreenY = centerY - rotatedQ.y * radius;

    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(qScreenX, qScreenY);
    ctx.stroke();

    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.arc(qScreenX, qScreenY, 5, 0, Math.PI * 2);
    ctx.fill();

    // Draw Vector K (Key at position n) - Sky Blue
    const kScreenX = centerX + rotatedK.x * radius;
    const kScreenY = centerY - rotatedK.y * radius;

    ctx.strokeStyle = '#0284c7';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(kScreenX, kScreenY);
    ctx.stroke();

    ctx.fillStyle = '#0284c7';
    ctx.beginPath();
    ctx.arc(kScreenX, kScreenY, 5, 0, Math.PI * 2);
    ctx.fill();

    // Labels
    ctx.font = '11px JetBrains Mono, monospace';
    ctx.fillStyle = '#f59e0b';
    ctx.fillText(`R_${posM}·q (Pos m=${posM})`, qScreenX + 8, qScreenY - 6);

    ctx.fillStyle = '#38bdf8';
    ctx.fillText(`R_${posN}·k (Pos n=${posN})`, kScreenX + 8, kScreenY + 14);
  }, [rotatedQ, rotatedK, posM, posN, angleM, angleN]);

  return (
    <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto p-4 sm:p-6 select-none font-sans">
      {!compact && <PreCanvasBriefing content={ROPE_PEDAGOGY} />}

      <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 space-y-6 shadow-xl backdrop-blur-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Compass size={20} />
            </div>
            <div>
              <h2 className="text-base font-bold text-[var(--text-primary)]">
                {language === 'ar' ? 'مختبر ترميز الموضع الدوراني (RoPE)' : 'Rotary Position Embedding (RoPE) Geometry'}
              </h2>
              <p className="text-xs text-[var(--text-secondary)] font-mono">
                {language === 'ar' ? 'دوران الفضاء العقدي ثنائي الأبعاد وثبات الجداء القياسي النسبي' : '2D Complex plane rotation & relative shift-invariant dot product'}
              </p>
            </div>
          </div>
        </div>

        {/* Sliders */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono bg-[var(--bg-app)] p-4 rounded-xl border border-[var(--border-subtle)]">
          <div className="space-y-1.5">
            <div className="flex justify-between text-[var(--text-secondary)]">
              <span>{language === 'ar' ? 'موضع الاستعلام (m):' : 'Query Token Position (m):'}</span>
              <span className="text-amber-400 font-bold">{posM}</span>
            </div>
            <input
              type="range"
              min="0"
              max="16"
              value={posM}
              onChange={(e) => {
                setPosM(Number(e.target.value));
                if (config.soundEnabled) audio.playClick();
              }}
              className="w-full accent-amber-500"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-[var(--text-secondary)]">
              <span>{language === 'ar' ? 'موضع المفتاح (n):' : 'Key Token Position (n):'}</span>
              <span className="text-sky-400 font-bold">{posN}</span>
            </div>
            <input
              type="range"
              min="0"
              max="16"
              value={posN}
              onChange={(e) => {
                setPosN(Number(e.target.value));
                if (config.soundEnabled) audio.playClick();
              }}
              className="w-full accent-sky-500"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-[var(--text-secondary)]">
              <span>{language === 'ar' ? 'شريحة التردد (i):' : 'Frequency Subspace (i):'}</span>
              <span className="text-purple-400 font-bold">i = {freqIdx} (θ = {theta.toFixed(3)})</span>
            </div>
            <input
              type="range"
              min="0"
              max="15"
              value={freqIdx}
              onChange={(e) => {
                setFreqIdx(Number(e.target.value));
                if (config.soundEnabled) audio.playClick();
              }}
              className="w-full accent-purple-500"
            />
          </div>
        </div>

        {/* Interactive Canvas & Telemetry */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 flex justify-center">
            <div className="relative w-full aspect-square max-w-[380px] rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-app)] p-4">
              <canvas ref={canvasRef} className="w-full h-full block" />
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4 font-mono text-xs">
            <div className="rounded-xl border border-purple-500/30 bg-purple-500/10 dark:bg-purple-950/20 p-4 space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-bold">
                <Sparkles size={16} />
                <span>{language === 'ar' ? 'مبرهنة الثبات النسبي' : 'Shift-Invariance Property'}</span>
              </div>

              <div className="space-y-2 text-[11px]">
                <div className="flex justify-between p-2 rounded bg-[var(--bg-app)] border border-purple-500/20">
                  <span className="text-[var(--text-secondary)]">Relative Distance Δm:</span>
                  <span className="text-purple-400 dark:text-purple-300 font-bold">m - n = {relDelta} tokens</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-[var(--bg-app)] border border-purple-500/20">
                  <span className="text-[var(--text-secondary)]">Angular Displacement:</span>
                  <span className="text-amber-500 dark:text-amber-300 font-bold">Δθ = {angleDelta.toFixed(3)} rad</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-[var(--bg-app)] border border-emerald-500/30 text-emerald-500 dark:text-emerald-300 font-bold">
                  <span>Inner Product ⟨R_m q, R_n k⟩:</span>
                  <span className="text-sm">{dotProduct}</span>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-[var(--bg-app)] border border-[var(--border-subtle)] text-[10px] text-[var(--text-secondary)] leading-relaxed">
                {language === 'ar'
                  ? 'لاحظ أن تغيير m و n بنفس المقدار يحافظ تماماً على الجداء القياسي، لأن الزاوية النسبية بينهما تظل ثابتة.'
                  : 'Notice that shifting both positions equally (e.g. m+k, n+k) preserves the exact same dot product score.'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {!compact && <PostCanvasConsolidation content={ROPE_PEDAGOGY} />}
    </div>
  );
};

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useOkvirStore } from '@/lib/store';
import { audio } from '@/lib/audio';
import { PreCanvasBriefing, PostCanvasConsolidation, TierContent } from '@/components/pedagogy/MultiTierDisclosure';

type ActivationType = 'relu' | 'sigmoid' | 'tanh' | 'leaky_relu' | 'gelu';
type NeuralPreset = 'dead_relu' | 'active_relu' | 'sigmoid_saturation' | 'gelu_dip';

const PRESETS: Record<NeuralPreset, {
  name: { en: string; ar: string };
  activation: ActivationType;
  w1: number;
  w2: number;
  x1: number;
  x2: number;
  bias: number;
  description: { en: string; ar: string };
}> = {
  dead_relu: {
    name: { en: 'Dead ReLU (Gradient = 0)', ar: 'عصبون ميت (تدرج = ٠)' },
    activation: 'relu',
    w1: -1.5,
    w2: -1.0,
    x1: 1.0,
    x2: 1.0,
    bias: -0.5,
    description: {
      en: 'Pre-activation z < 0 pushes the neuron into the zero-gradient flat regime, permanently killing learning.',
      ar: 'القيمة القبلية z < 0 تدفع العصبون إلى منطقة التدرج الصفري، مما يعطل تحديث الأوزان نهائياً.',
    },
  },
  active_relu: {
    name: { en: 'Active ReLU (Gradient = 1)', ar: 'عصبون نشط (تدرج = ١)' },
    activation: 'relu',
    w1: 1.5,
    w2: 0.8,
    x1: 1.0,
    x2: 0.5,
    bias: 0.2,
    description: {
      en: 'Active positive regime propagates full gradient backward with zero attenuation.',
      ar: 'المنطقة الموجبة النشطة تمرر التدرج بالكامل للخلف دون أي تلاشي.',
    },
  },
  sigmoid_saturation: {
    name: { en: 'Sigmoid Vanishing Gradient', ar: 'تلاشي تدرج سيجمويد' },
    activation: 'sigmoid',
    w1: 2.5,
    w2: 2.0,
    x1: 1.0,
    x2: 1.0,
    bias: 0.5,
    description: {
      en: 'Extreme pre-activation saturates sigmoid, causing derivative f\'(z) -> 0 (vanishing gradient).',
      ar: 'تشبع دالة سيجمويد عند القيم العالية يجعل المشتقة تقترب من الصفر مما يوقف التعلم.',
    },
  },
  gelu_dip: {
    name: { en: 'GELU Probabilistic Dip', ar: 'انحناء GELU الاحتمالي' },
    activation: 'gelu',
    w1: -0.8,
    w2: -0.5,
    x1: 1.0,
    x2: 0.8,
    bias: 0.2,
    description: {
      en: 'Smooth non-monotonic curvature utilized in modern Transformers (BERT, GPT, Llama).',
      ar: 'الانحناء غير الرتيب السلس المستخدم في نماذج المحولات الحديثة مثل GPT و Llama.',
    },
  },
};

const NEURAL_PEDAGOGY: TierContent = {
  intuition: {
    analogy: {
      en: 'A single neuron acts like a dimmable electrical switch: it takes multiple weighted incoming signals, adds an adjustable trigger threshold (bias), and uses a non-linear activation valve to decide how much current to fire forward.',
      ar: 'يعمل العصبون الفردي كمفتاح كهربائي قابل للتعتيم: يستقبل عدة إشارات موزونة، ويضيف عتبة تشغيل قابلة للتعديل (الانحياز)، ثم يستخدم صمام تفعيل غير خطي لتحديد كمية التيار المارة للأمام.',
    },
    keyTakeaway: {
      en: 'Without non-linear activations, stacking 100 neural network layers collapses mathematically into a single linear matrix multiplication: W_2(W_1 x) = (W_2 W_1)x = W_combined x.',
      ar: 'بدون دوال التفعيل غير الخطية، تنهار مئة طبقة عصبية متعاقبة رياضياً لتصبح مجرد ضرب مصفوفي خطي واحد: لا يمكن للشبكة تعلم أي دوال معقدة.',
    },
  },
  geometry: {
    visualDescription: {
      en: 'The affine equation w₁x₁ + w₂x₂ + b = 0 defines a hyperplane decision boundary separating the input space into two half-spaces. The activation function curves the output surface along the normal vector w.',
      ar: 'تعرّف المعادلة الخطية w₁x₁ + w₂x₂ + b = 0 مستوى فائقاً يقسم فضاء المدخلات إلى نصفي فضاء، وتقوم دالة التفعيل بنحت سطح المخرجات على امتداد متجه العمودي w.',
    },
    conservedQuantity: {
      en: 'Maximum derivative bound: for Sigmoid, max f\'(z) = 0.25 (at z=0); for Tanh, max f\'(z) = 1.0; for ReLU, f\'(z) ∈ {0, 1}.',
      ar: 'الحد الأقصى للمشتقة: لدالة سيجمويد هو ٠٫٢٥ فقط، ولدالة تان إتش هو ١٫٠، ولدالة ريلو إما ٠ أو ١.',
    },
  },
  formal: {
    equation: 'a = f(z) = f\\left(\\sum_{j=1}^D w_j x_j + b\\right)',
    derivationSteps: [
      {
        step: '\\frac{\\partial \\mathcal{L}}{\\partial w_j} = \\frac{\\partial \\mathcal{L}}{\\partial a} \\cdot f\'(z) \\cdot x_j',
        note: {
          en: 'Backpropagation chain rule: gradient is directly multiplied by local activation derivative f\'(z)',
          ar: 'قاعدة السلسلة في الانتشار العكسي: يتضاعف تدرج الخسارة مباشرة بمشتقة التفعيل الموضعية',
        },
      },
      {
        step: '\\text{ReLU: } f\'(z) = \\mathbb{I}(z > 0) \\implies z \\le 0 \\implies \\frac{\\partial \\mathcal{L}}{\\partial w_j} = 0',
        note: {
          en: 'Dead Neuron condition: zero gradient halts optimization indefinitely for that unit',
          ar: 'حالة موت العصبون: التدرج الصفري يوقف تحديث الأوزان لهذا العصبون نهائياً',
        },
      },
      {
        step: '\\text{GELU}(z) = z \\cdot \\Phi(z) = z \\cdot P(X \\le z), \\quad X \\sim \\mathcal{N}(0, 1)',
        note: {
          en: 'Gaussian Error Linear Unit weights inputs by their percentile in a standard normal distribution',
          ar: 'وحدة الخطأ الغاوسي الخطية تزن المدخلات باحتمالية تراكمية التوزيع الطبيعي المعياري',
        },
      },
    ],
  },
  code: {
    snippet: `import torch
import torch.nn as nn

class CustomActivationNeuron(nn.Module):
    """
    Demonstrates forward pass and explicit autograd Jacobian-vector product.
    """
    def __init__(self, in_features: int = 2):
        super().__init__()
        self.linear = nn.Linear(in_features, 1)
        
    def forward(self, x: torch.Tensor, activation: str = 'relu') -> torch.Tensor:
        z = self.linear(x)
        if activation == 'relu':
            return torch.relu(z)
        elif activation == 'gelu':
            return nn.functional.gelu(z)
        elif activation == 'sigmoid':
            return torch.sigmoid(z)
        elif activation == 'tanh':
            return torch.tanh(z)
        raise ValueError(f"Unknown activation: {activation}")`,
    explanation: {
      en: 'PyTorch autograd tracks computational graph nodes to accumulate VJPs (Vector-Jacobian Products) during backward passes.',
      ar: 'يقوم نظام الاشتقاق التلقائي في PyTorch بتتبع شجرة الحساب لتراكم الجداء الشعاعي للجاكوبي أثناء التمرير العكسي.',
    },
  },
};

export const NeuralActivationCanvas: React.FC<{ compact?: boolean }> = ({ compact = true }) => {
  const { language, config } = useOkvirStore();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [x1, setX1] = useState(1.0);
  const [x2, setX2] = useState(0.8);
  const [w1, setW1] = useState(1.5);
  const [w2, setW2] = useState(-1.2);
  const [bias, setBias] = useState(0.2);
  const [activation, setActivation] = useState<ActivationType>('relu');
  const [activePreset, setActivePreset] = useState<NeuralPreset | 'custom'>('active_relu');

  // Pre-activation weighted sum
  const z = w1 * x1 + w2 * x2 + bias;

  // Activation & derivative functions
  const computeActivationAndGrad = (val: number, type: ActivationType): { a: number; grad: number } => {
    switch (type) {
      case 'relu':
        return {
          a: Math.max(0, val),
          grad: val > 0 ? 1.0 : 0.0,
        };
      case 'sigmoid': {
        const sig = 1 / (1 + Math.exp(-Math.max(-10, Math.min(10, val))));
        return {
          a: sig,
          grad: sig * (1 - sig),
        };
      }
      case 'tanh': {
        const th = Math.tanh(val);
        return {
          a: th,
          grad: 1 - th * th,
        };
      }
      case 'leaky_relu':
        return {
          a: val > 0 ? val : 0.08 * val,
          grad: val > 0 ? 1.0 : 0.08,
        };
      case 'gelu': {
        const k = Math.sqrt(2 / Math.PI) * (val + 0.044715 * Math.pow(val, 3));
        const tanhK = Math.tanh(k);
        const a = 0.5 * val * (1 + tanhK);
        // Derivative approximation
        const grad = 0.5 * (1 + tanhK) + 0.5 * val * (1 - tanhK * tanhK) * Math.sqrt(2 / Math.PI) * (1 + 3 * 0.044715 * val * val);
        return { a, grad };
      }
    }
  };

  const { a, grad } = computeActivationAndGrad(z, activation);
  const isDeadRelu = activation === 'relu' && z <= 0;
  const isVanishingSigmoid = activation === 'sigmoid' && grad < 0.05;

  // Draw 2D Activation Function & Derivative Curve
  const drawCurve = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const cssWidth = canvas.clientWidth || 540;
    const cssHeight = canvas.clientHeight || 260;

    if (canvas.width !== cssWidth * dpr || canvas.height !== cssHeight * dpr) {
      canvas.width = cssWidth * dpr;
      canvas.height = cssHeight * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    const width = cssWidth;
    const height = cssHeight;
    const originX = width / 2;
    const originY = height * 0.65;
    const scaleX = width / 10; // z in [-5, 5]
    const scaleY = height / 4;  // a in [-1, 3]

    ctx.clearRect(0, 0, width, height);

    // Axes
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, originY);
    ctx.lineTo(width, originY);
    ctx.moveTo(originX, 0);
    ctx.lineTo(originX, height);
    ctx.stroke();

    // Axis labels
    ctx.fillStyle = '#a1a1aa';
    ctx.font = '10px monospace';
    ctx.fillText('z (pre-activation)', width - 110, originY - 6);
    ctx.fillText('f(z)', originX + 8, 16);

    // Zero gradient warning region for ReLU (z <= 0)
    if (activation === 'relu') {
      ctx.fillStyle = 'rgba(244, 63, 94, 0.06)';
      ctx.fillRect(0, 0, originX, height);
      ctx.fillStyle = 'rgba(244, 63, 94, 0.4)';
      ctx.font = '10px monospace';
      ctx.fillText('DEAD REGION (f\' = 0)', 15, 25);
    }

    // Plot activation curve f(z)
    ctx.strokeStyle = '#a855f7';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    let first = true;
    for (let px = 0; px <= width; px += 2) {
      const curZ = (px - originX) / scaleX;
      const curA = computeActivationAndGrad(curZ, activation).a;
      const py = originY - curA * scaleY;
      if (first) {
        ctx.moveTo(px, py);
        first = false;
      } else {
        ctx.lineTo(px, py);
      }
    }
    ctx.stroke();

    // Plot derivative curve f'(z) (Dashed Sky Blue)
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    first = true;
    for (let px = 0; px <= width; px += 3) {
      const curZ = (px - originX) / scaleX;
      const curGrad = computeActivationAndGrad(curZ, activation).grad;
      const py = originY - curGrad * scaleY;
      if (first) {
        ctx.moveTo(px, py);
        first = false;
      } else {
        ctx.lineTo(px, py);
      }
    }
    ctx.stroke();
    ctx.setLineDash([]);

    // Current Operating Point Bead (z, a)
    const beadPx = originX + z * scaleX;
    const beadPy = originY - a * scaleY;

    // Tangent Line representing local gradient
    const tanLen = 40;
    const dx = tanLen;
    const dy = -grad * (scaleY / scaleX) * tanLen;
    ctx.strokeStyle = isDeadRelu ? '#f43f5e' : '#10b981';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(beadPx - dx, beadPy + dy);
    ctx.lineTo(beadPx + dx, beadPy - dy);
    ctx.stroke();

    // Bead
    ctx.fillStyle = isDeadRelu ? '#f43f5e' : '#10b981';
    ctx.beginPath();
    ctx.arc(beadPx, beadPy, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Coordinates Tag
    ctx.font = 'bold 11px monospace';
    ctx.fillStyle = isDeadRelu ? '#f43f5e' : '#10b981';
    ctx.fillText(`(z=${z.toFixed(2)}, a=${a.toFixed(2)})`, beadPx + 10, beadPy - 10);

    ctx.restore();
  }, [z, a, grad, activation, isDeadRelu]);

  useEffect(() => {
    drawCurve();
  }, [drawCurve]);

  const handleSlider = (setter: (v: number) => void, val: number) => {
    setter(val);
    setActivePreset('custom');
    if (config.soundEnabled) audio.playClick();
  };

  const applyPreset = (key: NeuralPreset) => {
    const p = PRESETS[key];
    setActivation(p.activation);
    setW1(p.w1);
    setW2(p.w2);
    setX1(p.x1);
    setX2(p.x2);
    setBias(p.bias);
    setActivePreset(key);
    if (config.soundEnabled) {
      if (key === 'dead_relu') audio.playWarning();
      else audio.playSuccess();
    }
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Pre-Canvas Intuitive Briefing & Mental Model */}
      {!compact && <PreCanvasBriefing content={NEURAL_PEDAGOGY} />}

      {/* Preset Scenarios Strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]">
        <span className="text-[11px] font-mono text-[var(--text-tertiary)] uppercase tracking-wider">
          {language === 'ar' ? 'سيناريوهات التفعيل والحالات الحدية:' : 'Activation Regimes & Failure Modes:'}
        </span>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(PRESETS) as NeuralPreset[]).map((key) => (
            <button
              key={key}
              onClick={() => applyPreset(key)}
              className={`px-3 py-1 text-xs font-mono rounded-lg border transition-all ${
                activePreset === key
                  ? 'border-[var(--math-prediction)] bg-[var(--math-prediction)]/15 text-[var(--math-prediction)] font-bold shadow-sm'
                  : 'border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]'
              }`}
            >
              {PRESETS[key].name[language]}
            </button>
          ))}
        </div>
      </div>

      {/* Activation Function Switcher */}
      <div className="flex flex-wrap items-center gap-2 p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]">
        <span className="text-[11px] font-mono text-[var(--text-tertiary)] uppercase tracking-wider me-2">
          {language === 'ar' ? 'دالة التفعيل:' : 'Activation Function:'}
        </span>
        {(['relu', 'gelu', 'sigmoid', 'tanh', 'leaky_relu'] as ActivationType[]).map((type) => (
          <button
            key={type}
            onClick={() => {
              setActivation(type);
              setActivePreset('custom');
              if (config.soundEnabled) audio.playClick();
            }}
            className={`px-3 py-1 text-xs font-mono rounded-lg border transition-all ${
              activation === type
                ? 'border-[var(--math-prediction)] bg-[var(--math-prediction)]/10 text-[var(--math-prediction)] font-bold'
                : 'border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]'
            }`}
          >
            {type.toUpperCase()}
          </button>
        ))}
      </div>

      {/* 2D Activation & Gradient Curve Canvas */}
      <div className="relative rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-app)] overflow-hidden p-3 shadow-inner flex flex-col items-center">
        <canvas
          ref={canvasRef}
          className="w-full max-w-[540px] h-[260px] rounded-lg select-none"
        />
        <div className="flex justify-between w-full max-w-[540px] px-2 pt-2 text-[10px] font-mono text-[var(--text-tertiary)]">
          <span className="flex items-center gap-1.5 text-purple-400">
            <span className="w-2.5 h-0.5 bg-purple-500 inline-block" />
            Activation Curve a = f(z)
          </span>
          <span className="flex items-center gap-1.5 text-sky-400">
            <span className="w-2.5 h-0.5 border-t border-dashed border-sky-400 inline-block" />
            Local Gradient f'(z) = {grad.toFixed(3)}
          </span>
        </div>
      </div>

      {/* Interactive Perceptron Wiring Diagram */}
      <div className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Inputs & Weights */}
          <div className="space-y-3">
            {/* Input 1 */}
            <div className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-app)] space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[var(--text-secondary)]">x₁ = {x1.toFixed(1)}</span>
                <span className="text-emerald-400 font-bold tabular-nums">w₁ = {w1.toFixed(1)}</span>
              </div>
              <input
                type="range"
                min="-3.0"
                max="3.0"
                step="0.1"
                value={w1}
                onChange={(e) => handleSlider(setW1, parseFloat(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            {/* Input 2 */}
            <div className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-app)] space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[var(--text-secondary)]">x₂ = {x2.toFixed(1)}</span>
                <span className="text-sky-400 font-bold tabular-nums">w₂ = {w2.toFixed(1)}</span>
              </div>
              <input
                type="range"
                min="-3.0"
                max="3.0"
                step="0.1"
                value={w2}
                onChange={(e) => handleSlider(setW2, parseFloat(e.target.value))}
                className="w-full accent-sky-500 cursor-pointer"
              />
            </div>

            {/* Bias */}
            <div className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-app)] space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[var(--text-secondary)]">{language === 'ar' ? 'الانحياز (Bias):' : 'Bias (b):'}</span>
                <span className="text-amber-400 font-bold tabular-nums">{bias.toFixed(1)}</span>
              </div>
              <input
                type="range"
                min="-3.0"
                max="3.0"
                step="0.1"
                value={bias}
                onChange={(e) => handleSlider(setBias, parseFloat(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Summation Nucleus */}
          <div className="flex flex-col items-center justify-center p-6 rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-app)] text-center space-y-2 shadow-inner">
            <span className="text-[10px] font-mono text-[var(--text-tertiary)] uppercase tracking-wider">
              {language === 'ar' ? 'الجمع الخطي (Σ)' : 'Linear Summation (Σ)'}
            </span>
            <div className="text-2xl font-bold font-mono text-[var(--text-primary)] tabular-nums">
              z = {z.toFixed(2)}
            </div>
            <div className="text-[10px] font-mono text-[var(--text-secondary)]">
              z = w₁x₁ + w₂x₂ + b
            </div>
          </div>

          {/* Activation Output */}
          <div className={`flex flex-col items-center justify-center p-6 rounded-2xl border text-center space-y-2 shadow-lg transition-all ${
            isDeadRelu || isVanishingSigmoid
              ? 'border-rose-500/50 bg-rose-500/10'
              : 'border-[var(--math-prediction)]/50 bg-[var(--math-prediction)]/10'
          }`}>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-tertiary)]">
              {language === 'ar' ? 'مخرج الخلية f(z)' : 'Neuron Output a = f(z)'}
            </span>
            <div className="text-3xl font-extrabold font-mono text-[var(--text-primary)] tabular-nums">
              {a.toFixed(3)}
            </div>
            <div className="text-[11px] font-mono font-semibold">
              {isDeadRelu ? (
                <span className="text-rose-400">
                  {language === 'ar' ? '⚠️ عصبون ميت (Dead ReLU: Gradient = 0)' : '⚠️ Dead ReLU (Gradient = 0)'}
                </span>
              ) : isVanishingSigmoid ? (
                <span className="text-rose-400">
                  {language === 'ar' ? '⚠️ تلاشي التدرج (Vanishing Gradient)' : '⚠️ Vanishing Gradient (f\' < 0.05)'}
                </span>
              ) : (
                <span className="text-[var(--math-prediction)]">
                  {language === 'ar' ? `✓ تدرج سليم (f' = ${grad.toFixed(2)})` : `✓ Healthy Gradient (f' = ${grad.toFixed(2)})`}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Post-Canvas Mathematical & Code Consolidation */}
      {!compact && <PostCanvasConsolidation content={NEURAL_PEDAGOGY} />}
    </div>
  );
};

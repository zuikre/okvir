import React, { useState, useMemo } from 'react';
import { useOkvirStore } from '@/lib/store';
import { audio } from '@/lib/audio';
import { PreCanvasBriefing, PostCanvasConsolidation, type TierContent } from '@/components/pedagogy/MultiTierDisclosure';
import { Network, RotateCcw, ArrowRight, Zap } from 'lucide-react';

type ActivationFunc = 'relu' | 'sigmoid' | 'tanh';

const AUTOGRAD_PEDAGOGY: TierContent = {
  intuition: {
    analogy: {
      en: 'Think of a computational graph like an assembly line: inputs flow forward through simple stations (addition, multiplication) to build the final loss. When something goes wrong, we run the line in reverse (backprop): each station uses the multivariate chain rule to tell upstream stations exactly how much they contributed to the error.',
      ar: 'تخيل مخطط الحساب كخط تجميع في مصنع: تتدفق المدخلات إلى الأمام عبر محطات بسيطة (جمع، ضرب) لإنتاج الخسارة النهائية. وعندما يحدث خطأ، نعكس مسار الخط إلى الخلف (الانتشار العكسي): تستخدم كل محطة قاعدة السلسلة لتبلغ المحطات السابقة بمقدار مسؤوليتها الدقيقة عن هذا الخطأ.',
    },
    keyTakeaway: {
      en: 'Reverse-mode automatic differentiation computes gradients of a scalar loss with respect to ALL parameters in a SINGLE backward pass with O(1) cost relative to the forward pass, making deep learning computationally feasible.',
      ar: 'التفاضل التلقائي في النمط العكسي يحسب مشتقات دالة الخسارة القياسية بالنسبة لجميع الأوزان والمعاملات في دورة عكسية واحدة فقط بتكلفة O(1) مقارنة بالمرور الأمامي، مما يجعل تدريب الشبكات العميقة ممكناً عملياً.',
    },
  },
  geometry: {
    visualDescription: {
      en: 'The computation graph is a Directed Acyclic Graph (DAG). Backpropagation is simply a reverse topological sort: every node receives incoming gradients from its children, multiplies by its local Jacobian, and distributes adjoints upstream.',
      ar: 'مخطط الحساب هو رسم بياني موجه غير حلقي (DAG). والانتشار العكسي هو ببساطة فرز طبولوجي عكسي: كل عقدة تستقبل التدرجات الواردة من أبنائها، وتضربها في اليعقوبي المحلي، ثم توزع المشتقات إلى العقد السابقة.',
    },
    conservedQuantity: {
      en: 'Multivariate Chain Rule: ∂L/∂u = ∑_{v ∈ Children(u)} (∂L/∂v) · (∂v/∂u). Local derivatives compose multiplicatively.',
      ar: 'قاعدة السلسلة متعددة المتغيرات: ∂L/∂u = ∑ (∂L/∂v) · (∂v/∂u). المشتقات المحلية تتراكب وتتضاعف عبر المسارات.',
    },
  },
  formal: {
    equation: '\\frac{\\partial L}{\\partial w_i} = \\frac{\\partial L}{\\partial a} \\cdot \\frac{\\partial a}{\\partial s} \\cdot \\frac{\\partial s}{\\partial p_i} \\cdot \\frac{\\partial p_i}{\\partial w_i} = (a - y) \\cdot \\sigma\'(s) \\cdot 1 \\cdot x_i',
    derivationSteps: [
      {
        step: 's = \\sum_{i=1}^n w_i x_i + b, \\quad a = \\sigma(s), \\quad L = \\frac{1}{2}(a - y)^2',
        note: {
          en: 'Forward evaluation defines intermediate graph nodes',
          ar: 'التقييم الأمامي يحدد العقد الوسيطة في الرسم البياني',
        },
      },
      {
        step: '\\frac{\\partial L}{\\partial a} = a - y, \\quad \\frac{\\partial a}{\\partial s} = \\sigma\'(s)',
        note: {
          en: 'Initial adjoint at the output root node propagates backwards',
          ar: 'المشتقة المرافقة الأولية عند العقدة الجذرية تنتشر نحو الخلف',
        },
      },
      {
        step: '\\frac{\\partial L}{\\partial w_i} = \\frac{\\partial L}{\\partial s} \\cdot x_i, \\quad \\frac{\\partial L}{\\partial b} = \\frac{\\partial L}{\\partial s}',
        note: {
          en: 'Weights and biases receive gradients scaled by their input activation',
          ar: 'الأوزان والانحياز تستقبل تدرجات متناسبة مع قيمة تفعيل المدخلات الخاصة بها',
        },
      },
    ],
  },
  code: {
    snippet: `class Value:
    """OkvirGrad: Minimal scalar autograd engine in 20 lines"""
    def __init__(self, data, _children=()):
        self.data = float(data)
        self.grad = 0.0
        self._backward = lambda: None
        self._prev = set(_children)

    def __add__(self, other):
        other = other if isinstance(other, Value) else Value(other)
        out = Value(self.data + other.data, (self, other))
        def _backward():
            self.grad += 1.0 * out.grad
            other.grad += 1.0 * out.grad
        out._backward = _backward
        return out

    def __mul__(self, other):
        other = other if isinstance(other, Value) else Value(other)
        out = Value(self.data * other.data, (self, other))
        def _backward():
            self.grad += other.data * out.grad
            other.grad += self.data * out.grad
        out._backward = _backward
        return out

    def backward(self):
        # Topological sort
        topo, visited = [], set()
        def build_topo(v):
            if v not in visited:
                visited.add(v)
                for child in v._prev:
                    build_topo(child)
                topo.append(v)
        build_topo(self)
        self.grad = 1.0
        for node in reversed(topo):
            node._backward()`,
    explanation: {
      en: 'The micro autograd engine builds the dynamic DAG on the fly and evaluates backprop via topological sort.',
      ar: 'محرك التفاضل التلقائي المصغر يبني الـ DAG الديناميكي أثناء التنفيذ وينفذ الانتشار العكسي بالفرز الطبولوجي.',
    },
  },
};

export const AutogradGraphLab: React.FC<{ compact?: boolean }> = ({ compact }) => {
  const { language, config } = useOkvirStore();

  // Inputs & Parameters
  const [x1, setX1] = useState(1.5);
  const [w1, setW1] = useState(0.8);
  const [x2, setX2] = useState(-0.5);
  const [w2, setW2] = useState(-1.2);
  const [b, setB] = useState(0.2);
  const [yTarget, setYTarget] = useState(1.0);
  const [activation, setActivation] = useState<ActivationFunc>('relu');
  const [learningRate] = useState(0.1);


  // Forward Pass Computations
  const graph = useMemo(() => {
    // 1. Products
    const p1 = x1 * w1;
    const p2 = x2 * w2;
    // 2. Sum
    const s = p1 + p2 + b;

    // 3. Activation
    let a = s;
    let dAct_ds = 1.0;
    if (activation === 'relu') {
      a = Math.max(0, s);
      dAct_ds = s > 0 ? 1.0 : 0.0;
    } else if (activation === 'sigmoid') {
      a = 1 / (1 + Math.exp(-s));
      dAct_ds = a * (1 - a);
    } else if (activation === 'tanh') {
      a = Math.tanh(s);
      dAct_ds = 1 - a * a;
    }

    // 4. Loss
    const diff = a - yTarget;
    const loss = 0.5 * diff * diff;

    // Backward Pass Gradients
    const gradLoss = 1.0;
    const gradA = diff * gradLoss;
    const gradS = gradA * dAct_ds;
    const gradP1 = gradS * 1.0;
    const gradP2 = gradS * 1.0;
    const gradB = gradS * 1.0;
    const gradW1 = gradP1 * x1;
    const gradX1 = gradP1 * w1;
    const gradW2 = gradP2 * x2;
    const gradX2 = gradP2 * w2;

    return {
      p1, p2, s, a, loss,
      gradLoss, gradA, gradS, gradP1, gradP2, gradB,
      gradW1, gradX1, gradW2, gradX2,
    };
  }, [x1, w1, x2, w2, b, yTarget, activation]);

  // Perform gradient descent optimizer step
  const handleOptimizationStep = () => {
    setW1((prev) => prev - learningRate * graph.gradW1);
    setW2((prev) => prev - learningRate * graph.gradW2);
    setB((prev) => prev - learningRate * graph.gradB);
    if (config.soundEnabled) audio.playSuccessChime();
  };

  const resetWeights = () => {
    setX1(1.5);
    setX2(-0.5);
    setW1(0.8);
    setW2(-1.2);
    setB(0.2);
    if (config.soundEnabled) audio.playClick();
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      {!compact && <PreCanvasBriefing content={AUTOGRAD_PEDAGOGY} />}

      <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 lg:p-6 specular shadow-xl space-y-5">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-subtle)] pb-4">
          <div className="flex items-center gap-2">
            <Network size={18} className="text-[var(--math-prediction)]" />
            <h3 className="text-sm font-bold text-[var(--text-primary)]">
              {language === 'ar' ? 'أوكفير-غراد: تفاضل تلقائي ومخطط الحساب' : 'OkvirGrad: Computational Graph & Autograd'}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            {/* Activation Selector */}
            <div className="flex items-center rounded-lg border border-[var(--border-subtle)] p-0.5 bg-[var(--bg-app)] text-xs font-mono">
              {(['relu', 'sigmoid', 'tanh'] as ActivationFunc[]).map((act) => (
                <button
                  key={act}
                  onClick={() => setActivation(act)}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    activation === act
                      ? 'bg-[var(--math-prediction)]/20 text-[var(--math-prediction)] font-bold'
                      : 'text-[var(--text-tertiary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {act.toUpperCase()}
                </button>
              ))}
            </div>

            <button
              onClick={handleOptimizationStep}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--math-vector)] text-black text-xs font-mono font-semibold hover:brightness-110 active:scale-95 transition-all shadow-sm"
            >
              <Zap size={12} />
              <span>{language === 'ar' ? 'خطوة انحدار (-η∇L)' : 'Step SGD (-η∇)'}</span>
            </button>

            <button
              onClick={resetWeights}
              className="p-1.5 rounded-lg border border-[var(--border-subtle)] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors"
              title={language === 'ar' ? 'إعادة تعيين الأوزان' : 'Reset Weights'}
            >
              <RotateCcw size={13} />
            </button>
          </div>
        </div>

        {/* Live Loss & Gradient HUD */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-app)]">
            <span className="text-[10px] font-mono text-[var(--text-tertiary)] block">
              {language === 'ar' ? 'الخسارة الحالية L' : 'Scalar Loss L'}
            </span>
            <span className="text-sm font-mono font-bold text-rose-400 tabular-nums">
              L = {graph.loss.toFixed(4)}
            </span>
          </div>

          <div className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-app)]">
            <span className="text-[10px] font-mono text-[var(--text-tertiary)] block">
              {language === 'ar' ? 'تفعيل الخرج a' : 'Output Activation a'}
            </span>
            <span className="text-sm font-mono font-bold text-[#38bdf8] tabular-nums">
              a = {graph.a.toFixed(3)} (y*={yTarget})
            </span>
          </div>

          <div className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-app)]">
            <span className="text-[10px] font-mono text-[var(--text-tertiary)] block">
              {language === 'ar' ? 'تدرج الوزن ∂L/∂w₁' : 'Weight Gradient ∂L/∂w₁'}
            </span>
            <span className="text-sm font-mono font-bold text-[var(--math-gradient)] tabular-nums">
              {graph.gradW1 > 0 ? `+${graph.gradW1.toFixed(3)}` : graph.gradW1.toFixed(3)}
            </span>
          </div>

          <div className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-app)]">
            <span className="text-[10px] font-mono text-[var(--text-tertiary)] block">
              {language === 'ar' ? 'تدرج الانحياز ∂L/∂b' : 'Bias Gradient ∂L/∂b'}
            </span>
            <span className="text-sm font-mono font-bold text-[#a855f7] tabular-nums">
              {graph.gradB > 0 ? `+${graph.gradB.toFixed(3)}` : graph.gradB.toFixed(3)}
            </span>
          </div>
        </div>

        {/* Directed Acyclic Computational Graph (DAG) Visualizer */}
        <div className="p-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-app)] overflow-x-auto select-none">
          <div className="min-w-[620px] flex items-center justify-between gap-4 py-3 relative">
            {/* Layer 1: Inputs & Parameters */}
            <div className="flex flex-col gap-3">
              <NodeCard label="x₁ (Input)" val={x1} grad={graph.gradX1} color="sky" isInput />
              <NodeCard label="w₁ (Weight)" val={w1} grad={graph.gradW1} color="amber" />
              <NodeCard label="x₂ (Input)" val={x2} grad={graph.gradX2} color="sky" isInput />
              <NodeCard label="w₂ (Weight)" val={w2} grad={graph.gradW2} color="amber" />
              <NodeCard label="b (Bias)" val={b} grad={graph.gradB} color="purple" />
            </div>

            <ArrowRight size={18} className="text-[var(--text-tertiary)] shrink-0" />

            {/* Layer 2: Products */}
            <div className="flex flex-col gap-8">
              <NodeCard label="p₁ = x₁·w₁" val={graph.p1} grad={graph.gradP1} color="slate" />
              <NodeCard label="p₂ = x₂·w₂" val={graph.p2} grad={graph.gradP2} color="slate" />
            </div>

            <ArrowRight size={18} className="text-[var(--text-tertiary)] shrink-0" />

            {/* Layer 3: Sum */}
            <div className="flex flex-col">
              <NodeCard label="s = p₁+p₂+b" val={graph.s} grad={graph.gradS} color="slate" />
            </div>

            <ArrowRight size={18} className="text-[var(--text-tertiary)] shrink-0" />

            {/* Layer 4: Activation */}
            <div className="flex flex-col">
              <NodeCard label={`a = ${activation}(s)`} val={graph.a} grad={graph.gradA} color="emerald" />
            </div>

            <ArrowRight size={18} className="text-[var(--text-tertiary)] shrink-0" />

            {/* Layer 5: Loss */}
            <div className="flex flex-col">
              <NodeCard label="L = ½(a - y)²" val={graph.loss} grad={graph.gradLoss} color="rose" />
            </div>
          </div>
        </div>

        {/* Parameter Sliders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2 border-t border-[var(--border-subtle)]">
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[var(--text-secondary)]">Input x₁:</span>
              <strong className="text-sky-400 tabular-nums">{x1.toFixed(2)}</strong>
            </div>
            <input
              type="range"
              min="-3"
              max="3"
              step="0.1"
              value={x1}
              onChange={(e) => setX1(parseFloat(e.target.value))}
              className="w-full accent-sky-400 cursor-pointer"
            />
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[var(--text-secondary)]">Input x₂:</span>
              <strong className="text-sky-400 tabular-nums">{x2.toFixed(2)}</strong>
            </div>
            <input
              type="range"
              min="-3"
              max="3"
              step="0.1"
              value={x2}
              onChange={(e) => setX2(parseFloat(e.target.value))}
              className="w-full accent-sky-400 cursor-pointer"
            />
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[var(--text-secondary)]">Weight w₁:</span>
              <strong className="text-amber-400 tabular-nums">{w1.toFixed(2)}</strong>
            </div>
            <input
              type="range"
              min="-2"
              max="2"
              step="0.05"
              value={w1}
              onChange={(e) => setW1(parseFloat(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer"
            />
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[var(--text-secondary)]">Weight w₂:</span>
              <strong className="text-amber-400 tabular-nums">{w2.toFixed(2)}</strong>
            </div>
            <input
              type="range"
              min="-2"
              max="2"
              step="0.05"
              value={w2}
              onChange={(e) => setW2(parseFloat(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer"
            />
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[var(--text-secondary)]">Target y*:</span>
              <strong className="text-purple-400 tabular-nums">{yTarget.toFixed(2)}</strong>
            </div>
            <input
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={yTarget}
              onChange={(e) => setYTarget(parseFloat(e.target.value))}
              className="w-full accent-purple-400 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {!compact && <PostCanvasConsolidation content={AUTOGRAD_PEDAGOGY} />}
    </div>
  );
};

function NodeCard({
  label,
  val,
  grad,
  color,
  isInput,
}: {
  label: string;
  val: number;
  grad: number;
  color: 'sky' | 'amber' | 'purple' | 'emerald' | 'rose' | 'slate';
  isInput?: boolean;
}) {
  const borderColor = {
    sky: 'border-sky-500/30',
    amber: 'border-amber-500/30',
    purple: 'border-purple-500/30',
    emerald: 'border-emerald-500/30',
    rose: 'border-rose-500/40',
    slate: 'border-white/10',
  }[color];

  return (
    <div className={`px-3 py-2 rounded-xl border ${borderColor} bg-[var(--bg-app)] min-w-[100px] shadow-sm`}>
      <div className="text-[9px] font-mono text-[var(--text-tertiary)] truncate">{label}</div>
      <div className="flex items-center justify-between gap-2 mt-0.5">
        <span className="text-xs font-mono font-bold text-[var(--text-primary)] tabular-nums">
          v: {val.toFixed(2)}
        </span>
        {!isInput && (
          <span className="text-[10px] font-mono font-semibold text-rose-400 tabular-nums">
            ∇: {grad > 0 ? `+${grad.toFixed(2)}` : grad.toFixed(2)}
          </span>
        )}
      </div>
    </div>
  );
}

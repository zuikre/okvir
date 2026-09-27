import React, { useState } from 'react';
import { useOkvirStore } from '@/lib/store';
import { audio } from '@/lib/audio';

type ActivationType = 'relu' | 'sigmoid' | 'tanh' | 'leaky_relu' | 'gelu';

export const NeuralActivationCanvas: React.FC = () => {
  const { language, config } = useOkvirStore();

  const [x1] = useState(1.2);
  const [x2] = useState(-0.8);
  const [w1, setW1] = useState(1.5);
  const [w2, setW2] = useState(-2.0);
  const [bias, setBias] = useState(0.2);
  const [activation, setActivation] = useState<ActivationType>('relu');

  // Pre-activation weighted sum
  const z = w1 * x1 + w2 * x2 + bias;

  // Compute activation a = f(z)
  const computeActivation = (val: number, type: ActivationType): number => {
    switch (type) {
      case 'relu':
        return Math.max(0, val);
      case 'sigmoid':
        return 1 / (1 + Math.exp(-val));
      case 'tanh':
        return Math.tanh(val);
      case 'leaky_relu':
        return val > 0 ? val : 0.05 * val;
      case 'gelu': {
        // Approximation: 0.5 * x * (1 + tanh(sqrt(2/pi) * (x + 0.044715 * x^3)))
        const k = Math.sqrt(2 / Math.PI) * (val + 0.044715 * Math.pow(val, 3));
        return 0.5 * val * (1 + Math.tanh(k));
      }
    }
  };

  const a = computeActivation(z, activation);
  const isDeadRelu = activation === 'relu' && z <= 0;

  const handleSlider = (setter: (v: number) => void, val: number) => {
    setter(val);
    if (config.soundEnabled) audio.playClick();
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Activation Function Switcher */}
      <div className="flex flex-wrap items-center gap-2 p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]">
        <span className="text-[11px] font-mono text-[var(--text-tertiary)] uppercase tracking-wider me-2">
          {language === 'ar' ? 'دالة التفعيل:' : 'Activation Function:'}
        </span>
        {(['relu', 'sigmoid', 'tanh', 'leaky_relu', 'gelu'] as ActivationType[]).map((type) => (
          <button
            key={type}
            onClick={() => {
              setActivation(type);
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

      {/* Interactive Perceptron Wiring Diagram */}
      <div className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-app)]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Inputs & Weights */}
          <div className="space-y-4">
            {/* Input 1 */}
            <div className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[var(--text-secondary)]">x₁ = {x1}</span>
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
              <div className="text-[10px] text-[var(--text-tertiary)] font-mono">
                w₁ · x₁ = {(w1 * x1).toFixed(2)}
              </div>
            </div>

            {/* Input 2 */}
            <div className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[var(--text-secondary)]">x₂ = {x2}</span>
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
              <div className="text-[10px] text-[var(--text-tertiary)] font-mono">
                w₂ · x₂ = {(w2 * x2).toFixed(2)}
              </div>
            </div>

            {/* Bias */}
            <div className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] space-y-1.5">
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
          <div className="flex flex-col items-center justify-center p-6 rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-surface)] text-center space-y-2 shadow-inner">
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
            isDeadRelu ? 'border-rose-500/50 bg-rose-500/10' : 'border-[var(--math-prediction)]/50 bg-[var(--math-prediction)]/10'
          }`}>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-tertiary)]">
              {language === 'ar' ? 'مخرج الخلية f(z)' : 'Neuron Activation a = f(z)'}
            </span>
            <div className="text-3xl font-extrabold font-mono text-[var(--text-primary)] tabular-nums">
              {a.toFixed(3)}
            </div>
            <div className="text-[11px] font-mono font-semibold">
              {isDeadRelu ? (
                <span className="text-rose-400">
                  {language === 'ar' ? '⚠️ عصبون ميت (Dead ReLU: Gradient = 0)' : '⚠️ Dead ReLU (Gradient = 0)'}
                </span>
              ) : (
                <span className="text-[var(--math-prediction)]">
                  {language === 'ar' ? '✓ عصبون نشط' : '✓ Active Output'}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { ArrowRight, RotateCcw } from 'lucide-react';

interface FrameState {
  step: number;
  vars: Record<string, string>; // varName -> address
  heap: Record<string, { value: string; refcnt: number; flashes: boolean }>;
  description: { en: string; ar: string };
}

const SCENARIOS: FrameState[] = [
  {
    step: 0,
    vars: {},
    heap: {},
    description: { en: "Initial State (No allocations)", ar: "الحالة الابتدائية (لا توجد تخصيصات)" }
  },
  {
    step: 1,
    vars: { x: '0x7f4a' },
    heap: { '0x7f4a': { value: '[1, 2, 3]', refcnt: 1, flashes: true } },
    description: { en: "x = [1, 2, 3] (Bind variable)", ar: "ربط المتغير x بمصفوفة جديدة" }
  },
  {
    step: 2,
    vars: { x: '0x7f4a', y: '0x7f4a' },
    heap: { '0x7f4a': { value: '[1, 2, 3]', refcnt: 2, flashes: false } },
    description: { en: "y = x (Alias variable)", ar: "إنشاء اسم بديل (y) لنفس الكائن" }
  },
  {
    step: 3,
    vars: { x: '0x7f4a', y: '0x7f4a' },
    heap: { '0x7f4a': { value: '[1, 2, 3, 4]', refcnt: 2, flashes: true } },
    description: { en: "x.append(4) (Mutate in-place)", ar: "تعديل الكائن في نفس موقعه في الذاكرة" }
  },
  {
    step: 4,
    vars: { x: '0x80b1', y: '0x7f4a' },
    heap: {
      '0x7f4a': { value: '[1, 2, 3, 4]', refcnt: 1, flashes: false },
      '0x80b1': { value: '[10, 20]', refcnt: 1, flashes: true }
    },
    description: { en: "x = [10, 20] (Rebind variable)", ar: "إعادة ربط المتغير بكائن جديد" }
  }
];

export const EnvironmentFrameCanvas: React.FC<{ compact?: boolean }> = ({ compact }) => {
  const [step, setStep] = useState(0);
  const state = SCENARIOS[step];

  return (
    <div className="flex flex-col h-full bg-slate-900 rounded-lg border border-slate-700 text-slate-200 p-4 font-mono text-sm">
      <div className="mb-4 text-center">
        <h3 className="text-lg font-bold text-amber-400">Environment & Heap Memory Simulator</h3>
        <p className="text-slate-400">{state.description.en}</p>
        <p className="text-slate-500" dir="rtl">{state.description.ar}</p>
      </div>

      <div className="flex-1 grid grid-cols-2 gap-4 min-h-[300px]">
        {/* Stack Frames */}
        <div className="border border-slate-600 rounded p-4 bg-slate-800">
          <h4 className="text-cyan-400 mb-2 border-b border-slate-600 pb-1">CPython Stack Frame (Local/Global)</h4>
          <div className="space-y-2">
            {Object.entries(state.vars).map(([name, addr]) => (
              <div key={name} className="flex items-center justify-between bg-slate-700 p-2 rounded">
                <span className="font-bold text-green-400">{name}</span>
                <div className="flex items-center space-x-2 text-slate-400">
                  <ArrowRight size={16} />
                  <span className="text-pink-400 font-mono">{addr}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Heap Memory */}
        <div className="border border-slate-600 rounded p-4 bg-slate-800">
          <h4 className="text-purple-400 mb-2 border-b border-slate-600 pb-1">Heap Memory Blocks</h4>
          <div className="space-y-2">
            {Object.entries(state.heap).map(([addr, data]) => (
              <div
                key={addr}
                className={`p-2 rounded border ${
                  data.flashes ? 'border-green-500 bg-green-900/30' : 'border-slate-600 bg-slate-700'
                } transition-colors duration-500`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-pink-400 font-bold">{addr}</span>
                  <span className="text-xs text-slate-400">ob_refcnt: {data.refcnt}</span>
                </div>
                <div className="bg-slate-900 p-2 rounded text-amber-300">
                  {data.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center space-x-4">
        <button
          onClick={() => setStep(Math.max(0, step - 1))}
          disabled={step === 0}
          className="px-4 py-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 rounded flex items-center space-x-2"
        >
          <span>Previous</span>
        </button>
        <span className="text-slate-400">Step {step + 1} / {SCENARIOS.length}</span>
        <button
          onClick={() => setStep(Math.min(SCENARIOS.length - 1, step + 1))}
          disabled={step === SCENARIOS.length - 1}
          className="px-4 py-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 rounded flex items-center space-x-2"
        >
          <span>Next</span>
        </button>
        <button
          onClick={() => setStep(0)}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded text-slate-400"
        >
          <RotateCcw size={16} />
        </button>
      </div>
    </div>
  );
};

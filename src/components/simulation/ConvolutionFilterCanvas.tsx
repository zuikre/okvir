import React, { useState, useMemo } from 'react';
import { useOkvirStore } from '@/lib/store';
import { audio } from '@/lib/audio';

type KernelType = 'edge' | 'sobel_x' | 'sobel_y' | 'sharpen' | 'box_blur' | 'ridge';

interface KernelDef {
  name: { en: string; ar: string };
  matrix: number[][];
  divisor?: number;
  description: { en: string; ar: string };
}

const KERNELS: Record<KernelType, KernelDef> = {
  edge: {
    name: { en: 'Edge Detection (Laplacian)', ar: 'كشف الحواف (لابلاسيان)' },
    matrix: [
      [-1, -1, -1],
      [-1, 8, -1],
      [-1, -1, -1],
    ],
    description: {
      en: 'Highlights rapid intensity changes in all directions.',
      ar: 'يبرز التغيرات السريعة في الشدة الضوئية بجميع الاتجاهات.',
    },
  },
  sobel_x: {
    name: { en: 'Sobel Horizontal (dx)', ar: 'سوبيل أفقي (مشتقة x)' },
    matrix: [
      [-1, 0, 1],
      [-2, 0, 2],
      [-1, 0, 1],
    ],
    description: {
      en: 'Calculates vertical edges by approximating the horizontal gradient.',
      ar: 'يحسب الحواف العمودية بتقريب التدرج الأفقي.',
    },
  },
  sobel_y: {
    name: { en: 'Sobel Vertical (dy)', ar: 'سوبيل عمودي (مشتقة y)' },
    matrix: [
      [-1, -2, -1],
      [0, 0, 0],
      [1, 2, 1],
    ],
    description: {
      en: 'Calculates horizontal edges by approximating the vertical gradient.',
      ar: 'يحسب الحواف الأفقية بتقريب التدرج العمودي.',
    },
  },
  sharpen: {
    name: { en: 'Image Sharpen', ar: 'شحذ الصورة' },
    matrix: [
      [0, -1, 0],
      [-1, 5, -1],
      [0, -1, 0],
    ],
    description: {
      en: 'Amplifies center pixel differences against immediate orthogonal neighbors.',
      ar: 'يضخم الفروق في البكسل المركزي مقارنة بجيرانه المتعامدين.',
    },
  },
  box_blur: {
    name: { en: 'Box Blur (Smoothing)', ar: 'تنعيم متساوي (Box Blur)' },
    matrix: [
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
    ],
    divisor: 9,
    description: {
      en: 'Uniform spatial averaging filter to suppress high-frequency noise.',
      ar: 'مرشح متوسط مكاني منتظم لقمع الضوضاء عالية التردد.',
    },
  },
  ridge: {
    name: { en: 'Ridge / Line Filter', ar: 'مرشح الخطوط البارزة' },
    matrix: [
      [-2, 1, -2],
      [1, 4, 1],
      [-2, 1, -2],
    ],
    description: {
      en: 'Emphasizes diagonal ridge structures and thin contours.',
      ar: 'يركز على الهياكل والخطوط القطرية والخطوط الدقيقة.',
    },
  },
};

// 6x6 Synthesized image containing a clear diagonal edge / shape
const INPUT_IMAGE: number[][] = [
  [10, 10, 10, 240, 240, 240],
  [10, 20, 30, 240, 240, 240],
  [10, 30, 220, 240, 240, 240],
  [240, 240, 240, 240, 240, 20],
  [240, 240, 240, 240, 10, 10],
  [240, 240, 240, 20, 10, 10],
];

export const ConvolutionFilterCanvas: React.FC<{ compact?: boolean }> = ({ compact }) => {
  const { language, config } = useOkvirStore();

  const [activeKernel, setActiveKernel] = useState<KernelType>('edge');
  const [windowRow, setWindowRow] = useState<number>(1);
  const [windowCol, setWindowCol] = useState<number>(1);

  const kernelDef = KERNELS[activeKernel];
  const K = kernelDef.matrix;
  const divisor = kernelDef.divisor || 1;

  // Output feature map size: (H - Kh + 1) x (W - Kw + 1) = (6 - 3 + 1) = 4x4
  const outRows = INPUT_IMAGE.length - 2;
  const outCols = INPUT_IMAGE[0].length - 2;

  // Calculate full output feature map
  const featureMap = useMemo(() => {
    const res: number[][] = [];
    for (let r = 0; r < outRows; r++) {
      const rowArr: number[] = [];
      for (let c = 0; c < outCols; c++) {
        let sum = 0;
        for (let kr = 0; kr < 3; kr++) {
          for (let kc = 0; kc < 3; kc++) {
            sum += INPUT_IMAGE[r + kr][c + kc] * K[kr][kc];
          }
        }
        rowArr.push(Math.round(sum / divisor));
      }
      res.push(rowArr);
    }
    return res;
  }, [K, divisor, outRows, outCols]);

  // Current window calculation breakdown
  const currentDetails = useMemo(() => {
    const terms: { inVal: number; kVal: number; prod: number }[] = [];
    let sum = 0;
    for (let kr = 0; kr < 3; kr++) {
      for (let kc = 0; kc < 3; kc++) {
        const inVal = INPUT_IMAGE[windowRow + kr][windowCol + kc];
        const kVal = K[kr][kc];
        const prod = inVal * kVal;
        terms.push({ inVal, kVal, prod });
        sum += prod;
      }
    }
    const finalVal = Math.round(sum / divisor);
    return { terms, sum, finalVal };
  }, [windowRow, windowCol, K, divisor]);

  const selectWindow = (r: number, c: number) => {
    setWindowRow(r);
    setWindowCol(c);
    if (config.soundEnabled) audio.playClick();
  };

  const handleKernelChange = (k: KernelType) => {
    setActiveKernel(k);
    if (config.soundEnabled) audio.playClick();
  };

  return (
    <div className="flex flex-col gap-5 p-5 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] specular">
      {/* Header and Kernel Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[var(--border-subtle)] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-mono tracking-wider text-[var(--math-prediction)] font-bold">
              {language === 'ar' ? 'مرشح الالتفاف ثنائي الأبعاد 2D' : '2D Spatial Convolution Kernel Visualizer'}
            </span>
          </div>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            {kernelDef.description[language]}
          </p>
        </div>

        {/* Kernel Pills */}
        <div className="flex flex-wrap gap-1.5">
          {(Object.keys(KERNELS) as KernelType[]).map((k) => (
            <button
              key={k}
              onClick={() => handleKernelChange(k)}
              className={`px-2.5 py-1 text-xs font-mono rounded-lg border transition-all ${
                activeKernel === k
                  ? 'border-[var(--math-prediction)] bg-[var(--math-prediction)]/15 text-[var(--math-prediction)] font-semibold shadow-sm'
                  : 'border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]'
              }`}
            >
              {KERNELS[k].name[language]}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Input Image + Kernel + Output Map */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* 1. Input Image 6x6 (5 cols) */}
        <div className="lg:col-span-4 flex flex-col items-center gap-2 p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-app)]">
          <div className="w-full flex justify-between items-center text-xs font-mono">
            <span className="text-[var(--text-primary)] font-semibold">
              {language === 'ar' ? 'صورة الإدخال (6×6)' : 'Input Image I (6×6)'}
            </span>
            <span className="text-[10px] text-[var(--text-tertiary)]">
              {language === 'ar' ? 'انقر لتغيير نافذة المرشح' : 'Click to place kernel'}
            </span>
          </div>

          <div className="grid grid-cols-6 gap-1 p-2 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
            {INPUT_IMAGE.map((row, r) =>
              row.map((val, c) => {
                const inKernel =
                  r >= windowRow && r < windowRow + 3 && c >= windowCol && c < windowCol + 3;
                return (
                  <button
                    key={`${r}-${c}`}
                    onClick={() => {
                      const targetR = Math.max(0, Math.min(outRows - 1, r - 1));
                      const targetC = Math.max(0, Math.min(outCols - 1, c - 1));
                      selectWindow(targetR, targetC);
                    }}
                    style={{
                      backgroundColor: `rgb(${val}, ${val}, ${val})`,
                      color: val > 128 ? '#09090b' : '#fafafa',
                    }}
                    className={`w-8 h-8 rounded text-[10px] font-mono font-bold flex items-center justify-center transition-all ${
                      inKernel
                        ? 'ring-2 ring-amber-400 scale-105 z-10 shadow-lg'
                        : 'opacity-85 hover:opacity-100'
                    }`}
                    title={`(${r}, ${c}) = ${val}`}
                  >
                    {val}
                  </button>
                );
              })
            )}
          </div>
          <span className="text-[10px] font-mono text-[var(--text-tertiary)]">
            {language === 'ar' ? 'إطار التحديد الأصفر يمثل نافذة المرشح 3×3' : 'Yellow ring shows sliding 3×3 receptive field'}
          </span>
        </div>

        {/* 2. Kernel Matrix 3x3 (3 cols) */}
        <div className="lg:col-span-3 flex flex-col items-center gap-2 p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-app)]">
          <div className="w-full flex justify-between items-center text-xs font-mono">
            <span className="text-[var(--text-primary)] font-semibold">
              {language === 'ar' ? 'مرشح الالتفاف K' : 'Kernel Filter K (3×3)'}
            </span>
            <span className="text-[10px] text-amber-400 font-mono">
              {divisor !== 1 ? `÷ ${divisor}` : ''}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-1.5 p-2 rounded-lg bg-[var(--bg-surface)] border border-amber-500/30">
            {K.map((row, kr) =>
              row.map((kval, kc) => (
                <div
                  key={`${kr}-${kc}`}
                  className="w-9 h-9 rounded bg-[var(--bg-surface-hover)] border border-[var(--border-subtle)] text-amber-300 font-mono text-xs font-bold flex items-center justify-center shadow-inner"
                >
                  {kval > 0 ? `+${kval}` : kval}
                </div>
              ))
            )}
          </div>
          <span className="text-[10px] font-mono text-[var(--text-tertiary)] text-center">
            {language === 'ar' ? 'معاملات الأوزان المشتركة المطبقة' : 'Shared weights convolved across spatial dimensions'}
          </span>
        </div>

        {/* 3. Output Feature Map 4x4 (5 cols) */}
        <div className="lg:col-span-5 flex flex-col items-center gap-2 p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-app)]">
          <div className="w-full flex justify-between items-center text-xs font-mono">
            <span className="text-emerald-400 font-semibold">
              {language === 'ar' ? 'خريطة الخصائص الناتجة (4×4)' : 'Feature Map Output (4×4)'}
            </span>
            <span className="text-[10px] font-mono text-[var(--text-tertiary)]">
              (6 - 3 + 1) = 4
            </span>
          </div>

          <div className="grid grid-cols-4 gap-1.5 p-2 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
            {featureMap.map((row, r) =>
              row.map((val, c) => {
                const isSelected = r === windowRow && c === windowCol;
                // Clamp display brightness 0..255 for feature visualization
                const displayLum = Math.max(0, Math.min(255, Math.abs(val)));
                return (
                  <button
                    key={`${r}-${c}`}
                    onClick={() => selectWindow(r, c)}
                    style={{
                      backgroundColor: isSelected
                        ? 'rgba(16, 185, 129, 0.25)'
                        : `rgba(${displayLum}, ${displayLum}, ${displayLum}, 0.2)`,
                      borderColor: isSelected ? 'var(--math-vector)' : 'var(--border-subtle)',
                    }}
                    className={`w-10 h-10 rounded-lg border text-xs font-mono font-bold flex flex-col items-center justify-center transition-all ${
                      isSelected
                        ? 'ring-2 ring-emerald-400 scale-105 text-emerald-300 shadow-md'
                        : 'text-[var(--text-secondary)] hover:border-[var(--border-strong)]'
                    }`}
                  >
                    <span>{val}</span>
                  </button>
                );
              })
            )}
          </div>
          <span className="text-[10px] font-mono text-emerald-400/90 text-center">
            {language === 'ar'
              ? `القيمة عند النقطة (${windowRow}, ${windowCol}): ${currentDetails.finalVal}`
              : `Current pixel value at (${windowRow}, ${windowCol}): ${currentDetails.finalVal}`}
          </span>
        </div>
      </div>

      {/* Tactile Calculation Breakdown Step */}
      <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-app)] space-y-2">
        <div className="flex justify-between items-center text-xs font-mono">
          <span className="text-[var(--text-tertiary)] uppercase tracking-wider font-semibold">
            {language === 'ar' ? 'تفصيل الحساب الرياضي للبكسل المحدد:' : 'Inner-Product Convolution Calculation Step:'}
          </span>
          <span className="text-emerald-400 font-bold font-mono">
            Output({windowRow}, {windowCol}) = {currentDetails.finalVal}
          </span>
        </div>

        <div dir="ltr" className="text-xs font-mono text-[var(--text-secondary)] overflow-x-auto py-1 leading-relaxed">
          <span className="text-amber-400">Sum</span> = {currentDetails.terms.map((t, idx) => (
            <span key={idx}>
              ({t.inVal} × {t.kVal})
              {idx < currentDetails.terms.length - 1 ? ' + ' : ''}
            </span>
          ))}
          {divisor !== 1 && ` = (${currentDetails.sum}) / ${divisor}`} = <strong className="text-emerald-300">{currentDetails.finalVal}</strong>
        </div>
      </div>
    </div>
  );
};

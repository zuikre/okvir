import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useOkvirStore } from '@/lib/store';
import { audio } from '@/lib/audio';
import { Play, Pause, SkipForward, SkipBack, RotateCcw } from 'lucide-react';
import { PreCanvasBriefing, PostCanvasConsolidation, TierContent } from '@/components/pedagogy/MultiTierDisclosure';

type KernelType = 'edge' | 'sobel_x' | 'sobel_y' | 'sharpen' | 'box_blur' | 'ridge' | 'gaussian';

interface KernelDef {
  name: { en: string; ar: string };
  matrix: number[][];
  divisor?: number;
  description: { en: string; ar: string };
}

const KERNELS: Record<KernelType, KernelDef> = {
  edge: {
    name: { en: 'Laplacian Edge', ar: 'كشف الحواف (لابلاسيان)' },
    matrix: [
      [-1, -1, -1],
      [-1, 8, -1],
      [-1, -1, -1],
    ],
    description: {
      en: 'Highlights rapid intensity changes omnidirectionally.',
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
      en: 'Detects vertical edges by calculating horizontal luminance gradient.',
      ar: 'يكتشف الحواف العمودية بحساب التدرج الأفقي للضوء.',
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
      en: 'Detects horizontal edges by calculating vertical luminance gradient.',
      ar: 'يكتشف الحواف الأفقية بحساب التدرج العمودي للضوء.',
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
      en: 'Amplifies center pixel high-frequency contrast relative to neighbors.',
      ar: 'يضخم التباين عالي التردد للبكسل المركزي مقارنة بجيرانه.',
    },
  },
  box_blur: {
    name: { en: 'Box Blur (Smoothing)', ar: 'تنعيم متساوي' },
    matrix: [
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
    ],
    divisor: 9,
    description: {
      en: 'Uniform 3x3 local averaging filter to suppress high-frequency noise.',
      ar: 'مرشح متوسط مكاني ٣×٣ منتظم لقمع الضوضاء عالية التردد.',
    },
  },
  gaussian: {
    name: { en: 'Gaussian Blur (3×3)', ar: 'تنعيم غاوسي' },
    matrix: [
      [1, 2, 1],
      [2, 4, 2],
      [1, 2, 1],
    ],
    divisor: 16,
    description: {
      en: 'Distance-weighted isotropic smoothing preserving overall structural edges.',
      ar: 'تنعيم متناظر موزون بالمسافة يحافظ على الهيكل العام للصورة.',
    },
  },
  ridge: {
    name: { en: 'Ridge / Line', ar: 'مرشح الخطوط' },
    matrix: [
      [-2, 1, -2],
      [1, 4, 1],
      [-2, 1, -2],
    ],
    description: {
      en: 'Emphasizes diagonal ridge structures and thin contours.',
      ar: 'يركز على الخطوط القطرية والحدود الدقيقة.',
    },
  },
};

const DEFAULT_IMAGE: number[][] = [
  [10, 10, 10, 240, 240, 240],
  [10, 20, 30, 240, 240, 240],
  [10, 30, 220, 240, 240, 240],
  [240, 240, 240, 240, 240, 20],
  [240, 240, 240, 240, 10, 10],
  [240, 240, 240, 20, 10, 10],
];

const CONV_PEDAGOGY: TierContent = {
  intuition: {
    analogy: {
      en: 'Think of a convolution filter as a stencil or rubber stamp sliding across every patch of an image. Wherever the image pattern under the stamp matches the stencil values, the mathematical product peaks with high intensity!',
      ar: 'تخيل مرشح الالتفاف كقالب ختم يتحرك فوق كل رقعة من الصورة. أينما تطابق نمط الصورة تحت القالب مع قيم المرشح، فإن حاصل الضرب الرياضي يصل إلى ذروته بكثافة عالية!',
    },
    keyTakeaway: {
      en: 'Weight sharing gives CNNs translation equivariance: if a cat ear shifts 5 pixels to the right in the image, the corresponding activation in the feature map shifts 5 units to the right without needing new parameters.',
      ar: 'تشارك الأوزان يمنح الشبكات الالتفافية خاصية التكافؤ الانتقالي: إذا تحركت ميزة معينة ٥ بكسلات لليمين، فإن الاستجابة في خريطة الخصائص تتحرك أيضاً ٥ وحدات لليمين بنفس المعاملات.',
    },
  },
  geometry: {
    visualDescription: {
      en: 'A 3×3 kernel slides with stride S=1 across an H×W image without padding, compressing the spatial dimensions to (H - K + 1) × (W - K + 1) = 4×4. Each output pixel represents a local receptive field.',
      ar: 'ينزلق مرشح ٣×٣ بخطوة ١ عبر صورة ٦×٦ بدون حشو، مقلصاً الأبعاد المكانية إلى ٤×٤، حيث يمثل كل بكسل في الخريطة الناتجة حقل استقبال موضعي.',
    },
    conservedQuantity: {
      en: 'Linear spatial superposition: Conv(A + B, K) = Conv(A, K) + Conv(B, K).',
      ar: 'خاصية التراكب الخطي المكاني: الالتفاف على مجموع صورتين يكافئ مجموع الالتفافين بشكل متطابق.',
    },
  },
  formal: {
    equation: '(I \\star K)(i, j) = \\sum_{m=0}^{K_h-1} \\sum_{n=0}^{K_w-1} I(i + m, j + n) K(m, n)',
    derivationSteps: [
      {
        step: 'O_{h, w} = \\left\\lfloor \\frac{H - K_h + 2P}{S} \\right\\rfloor + 1',
        note: {
          en: 'Spatial output dimension formula with padding P and stride S',
          ar: 'صيغة أبعاد الخريطة المكانية الناتجة بدلالة الحشو وخطوة الانزلاق',
        },
      },
      {
        step: '\\frac{\\partial \\mathcal{L}}{\\partial K(m, n)} = \\sum_{i} \\sum_{j} \\frac{\\partial \\mathcal{L}}{\\partial O(i, j)} I(i + m, j + n)',
        note: {
          en: 'Weight gradient accumulation: cross-correlation between input patches and upstream error',
          ar: 'تراكم تدرج الأوزان: ترابط متقاطع بين رقع المدخلات وخطأ الطبقة اللاحقة',
        },
      },
      {
        step: '\\frac{\\partial \\mathcal{L}}{\\partial I} = \\frac{\\partial \\mathcal{L}}{\\partial O} \\star \\text{rot}_{180}(K)',
        note: {
          en: 'Input error propagation requires convolving upstream gradients with 180°-rotated kernel',
          ar: 'انتشار الخطأ للمدخلات يتطلب تطبيق الالتفاف مع تدوير المرشح ١٨٠ درجة',
        },
      },
    ],
  },
  code: {
    snippet: `import numpy as np

def im2col_indices(x: np.ndarray, kh: int = 3, kw: int = 3, stride: int = 1):
    """
    Transforms 2D image patches into 2D matrix columns for accelerated GEMM.
    Replaces slow nested for-loops with highly-optimized BLAS matrix multiplication.
    """
    H, W = x.shape
    out_h = (H - kh) // stride + 1
    out_w = (W - kw) // stride + 1
    
    # Extract patches into matrix rows
    cols = []
    for r in range(0, H - kh + 1, stride):
        for c in range(0, W - kw + 1, stride):
            patch = x[r:r+kh, c:c+kw].flatten()
            cols.append(patch)
            
    cols = np.array(cols) # Shape: (out_h * out_w, kh * kw)
    return cols, (out_h, out_w)

def conv2d_gemm(image: np.ndarray, kernel: np.ndarray):
    cols, (out_h, out_w) = im2col_indices(image, kernel.shape[0], kernel.shape[1])
    # Single BLAS matrix-vector product!
    out = cols @ kernel.flatten()
    return out.reshape(out_h, out_w)`,
    explanation: {
      en: 'The Im2Col algorithm restructures sliding spatial patches into contiguous memory columns so that convolution becomes a single high-performance GEMM (General Matrix Multiply).',
      ar: 'تقوم خوارزمية Im2Col بإعادة ترتيب الرقع المكانية في أعمدة ذاكرة متجاورة ليتحول الالتفاف إلى ضرب مصفوفي فائق السرعة عبر مكتبات BLAS.',
    },
  },
};

export const ConvolutionFilterCanvas: React.FC<{ compact?: boolean }> = ({ compact = true }) => {
  const { language, config } = useOkvirStore();

  const [activeKernel, setActiveKernel] = useState<KernelType>('edge');
  const [windowRow, setWindowRow] = useState<number>(1);
  const [windowCol, setWindowCol] = useState<number>(1);
  const [image, setImage] = useState<number[][]>(DEFAULT_IMAGE);
  const [isPlaying, setIsPlaying] = useState(false);
  const timerRef = useRef<number | null>(null);

  const kernelDef = KERNELS[activeKernel];
  const K = kernelDef.matrix;
  const divisor = kernelDef.divisor || 1;

  const outRows = image.length - 2;
  const outCols = image[0].length - 2;

  // Calculate full output feature map
  const featureMap = useMemo(() => {
    const res: number[][] = [];
    for (let r = 0; r < outRows; r++) {
      const rowArr: number[] = [];
      for (let c = 0; c < outCols; c++) {
        let sum = 0;
        for (let kr = 0; kr < 3; kr++) {
          for (let kc = 0; kc < 3; kc++) {
            sum += image[r + kr][c + kc] * K[kr][kc];
          }
        }
        rowArr.push(Math.round(sum / divisor));
      }
      res.push(rowArr);
    }
    return res;
  }, [K, divisor, outRows, outCols, image]);

  // Current window calculation breakdown
  const currentDetails = useMemo(() => {
    const terms: { inVal: number; kVal: number; prod: number }[] = [];
    let sum = 0;
    for (let kr = 0; kr < 3; kr++) {
      for (let kc = 0; kc < 3; kc++) {
        const inVal = image[windowRow + kr][windowCol + kc];
        const kVal = K[kr][kc];
        const prod = inVal * kVal;
        terms.push({ inVal, kVal, prod });
        sum += prod;
      }
    }
    const finalVal = Math.round(sum / divisor);
    return { terms, sum, finalVal };
  }, [windowRow, windowCol, K, divisor, image]);

  const selectWindow = (r: number, c: number) => {
    setWindowRow(r);
    setWindowCol(c);
    if (config.soundEnabled) audio.playClick();
  };

  const handleNextWindow = () => {
    let nextC = windowCol + 1;
    let nextR = windowRow;
    if (nextC >= outCols) {
      nextC = 0;
      nextR = windowRow + 1;
      if (nextR >= outRows) {
        nextR = 0;
      }
    }
    setWindowRow(nextR);
    setWindowCol(nextC);
    if (config.soundEnabled) audio.playClick();
  };

  const handlePrevWindow = () => {
    let prevC = windowCol - 1;
    let prevR = windowRow;
    if (prevC < 0) {
      prevC = outCols - 1;
      prevR = windowRow - 1;
      if (prevR < 0) {
        prevR = outRows - 1;
      }
    }
    setWindowRow(prevR);
    setWindowCol(prevC);
    if (config.soundEnabled) audio.playClick();
  };

  // Automated traversal playback loop
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = window.setInterval(() => {
      setWindowCol((c) => {
        if (c + 1 < outCols) {
          return c + 1;
        } else {
          setWindowRow((r) => (r + 1 < outRows ? r + 1 : 0));
          return 0;
        }
      });
      if (config.soundEnabled) audio.playClick();
    }, 600);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, outCols, outRows, config.soundEnabled]);

  // Click pixel on image to cycle luminance (0 -> 128 -> 240 -> 0)
  const cyclePixel = (r: number, c: number) => {
    setImage((prev) => {
      const next = prev.map((row) => [...row]);
      const cur = next[r][c];
      if (cur < 50) next[r][c] = 130;
      else if (cur < 200) next[r][c] = 240;
      else next[r][c] = 10;
      return next;
    });
    if (config.soundEnabled) audio.playClick();
  };

  return (
    <div className="flex flex-col gap-5 p-5 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] specular">
      {/* Pre-Canvas Intuitive Briefing & Mental Model */}
      {!compact && <PreCanvasBriefing content={CONV_PEDAGOGY} />}

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
              onClick={() => {
                setActiveKernel(k);
                if (config.soundEnabled) audio.playClick();
              }}
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

      {/* Traversal Playback Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-app)]">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--border-strong)] bg-[var(--bg-surface)] text-xs font-mono font-bold text-[var(--text-primary)] hover:border-emerald-500 transition-all shadow-sm cursor-pointer"
          >
            {isPlaying ? <Pause size={13} className="text-[var(--math-gradient)]" /> : <Play size={13} className="text-[var(--math-vector)]" />}
            <span>{isPlaying ? (language === 'ar' ? 'إيقاف' : 'Pause') : (language === 'ar' ? 'تشغيل المسح' : 'Scan Image')}</span>
          </button>

          <button
            onClick={handlePrevWindow}
            className="p-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:border-[var(--border-strong)] text-[var(--text-secondary)] cursor-pointer"
            title="Step Backward"
          >
            <SkipBack size={13} />
          </button>

          <button
            onClick={handleNextWindow}
            className="p-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:border-[var(--border-strong)] text-[var(--text-secondary)] cursor-pointer"
            title="Step Forward"
          >
            <SkipForward size={13} />
          </button>

          <button
            onClick={() => {
              setImage(DEFAULT_IMAGE);
              setWindowRow(0);
              setWindowCol(0);
              if (config.soundEnabled) audio.playClick();
            }}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[var(--border-subtle)] text-[11px] font-mono text-[var(--text-tertiary)] hover:border-[var(--border-strong)] cursor-pointer"
            title="Reset to default image"
          >
            <RotateCcw size={11} />
            <span>{language === 'ar' ? 'إعادة ضبط الصورة' : 'Reset Image'}</span>
          </button>
        </div>

        <div className="text-xs font-mono text-[var(--math-vector)] font-bold">
          Receptive Field Window: [{windowRow}, {windowCol}]
        </div>
      </div>

      {/* Main Grid: Input Image + Kernel + Output Map */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* 1. Input Image 6x6 */}
        <div className="lg:col-span-4 flex flex-col items-center gap-2 p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-app)]">
          <div className="w-full flex justify-between items-center text-xs font-mono">
            <span className="text-[var(--text-primary)] font-semibold">
              {language === 'ar' ? 'صورة الإدخال (انقر لتعديل البكسل)' : 'Input Image I (Click to paint)'}
            </span>
          </div>

          <div className="grid grid-cols-6 gap-1 p-2 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
            {image.map((row, r) =>
              row.map((val, c) => {
                const inKernel =
                  r >= windowRow && r < windowRow + 3 && c >= windowCol && c < windowCol + 3;
                return (
                  <button
                    key={`${r}-${c}`}
                    onClick={() => cyclePixel(r, c)}
                    style={{
                      backgroundColor: `rgb(${val}, ${val}, ${val})`,
                      color: val > 128 ? '#09090b' : '#fafafa',
                    }}
                    className={`w-8 h-8 rounded text-[10px] font-mono font-bold flex items-center justify-center transition-all ${
                      inKernel
                        ? 'ring-2 ring-amber-400 scale-105 z-10 shadow-lg'
                        : 'opacity-85 hover:opacity-100 hover:scale-95'
                    }`}
                    title={`Click to cycle (${r}, ${c}) = ${val}`}
                  >
                    {val}
                  </button>
                );
              })
            )}
          </div>
          <span className="text-[10px] font-mono text-[var(--text-tertiary)]">
            {language === 'ar' ? 'انقر على أي بكسل لتغيير إضاءته ومشاهدة استجابة المرشح' : 'Click any pixel to cycle brightness (0 -> 130 -> 240)'}
          </span>
        </div>

        {/* 2. Kernel Matrix 3x3 */}
        <div className="lg:col-span-3 flex flex-col items-center gap-2 p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-app)]">
          <div className="w-full flex justify-between items-center text-xs font-mono">
            <span className="text-[var(--text-primary)] font-semibold">
              {language === 'ar' ? 'مرشح الالتفاف K' : 'Kernel Filter K (3×3)'}
            </span>
            <span className="text-[10px] text-[var(--math-gradient)] font-mono font-bold">
              {divisor !== 1 ? `÷ ${divisor}` : ''}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-1.5 p-2 rounded-lg bg-[var(--bg-surface)] border border-amber-500/30">
            {K.map((row, kr) =>
              row.map((kval, kc) => (
                <div
                  key={`${kr}-${kc}`}
                  className="w-9 h-9 rounded bg-[var(--bg-surface-hover)] border border-[var(--border-subtle)] text-[var(--math-gradient)] font-mono text-xs font-bold flex items-center justify-center shadow-inner"
                >
                  {kval > 0 ? `+${kval}` : kval}
                </div>
              ))
            )}
          </div>
          <span className="text-[10px] font-mono text-[var(--text-tertiary)] text-center">
            {language === 'ar' ? 'أوزان مشتركة تُطبق مكانياً عبر الصورة' : 'Shared weights convolved across 2D spatial plane'}
          </span>
        </div>

        {/* 3. Output Feature Map 4x4 */}
        <div className="lg:col-span-5 flex flex-col items-center gap-2 p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-app)]">
          <div className="w-full flex justify-between items-center text-xs font-mono">
            <span className="text-[var(--math-vector)] font-bold">
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
                    className={`w-10 h-10 rounded-lg border text-xs font-mono font-bold flex flex-col items-center justify-center transition-all cursor-pointer ${
                      isSelected
                        ? 'ring-2 ring-[var(--math-vector)] scale-105 text-[var(--math-vector)] shadow-md'
                        : 'text-[var(--text-secondary)] hover:border-[var(--border-strong)]'
                    }`}
                  >
                    <span>{val}</span>
                  </button>
                );
              })
            )}
          </div>
          <span className="text-[10px] font-mono text-[var(--math-vector)] text-center font-bold">
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
          <span className="text-[var(--math-vector)] font-bold font-mono">
            Output({windowRow}, {windowCol}) = {currentDetails.finalVal}
          </span>
        </div>

        <div dir="ltr" className="text-xs font-mono text-[var(--text-secondary)] overflow-x-auto py-1 leading-relaxed">
          <span className="text-[var(--math-gradient)] font-bold">Sum</span> = {currentDetails.terms.map((t, idx) => (
            <span key={idx}>
              ({t.inVal} × {t.kVal})
              {idx < currentDetails.terms.length - 1 ? ' + ' : ''}
            </span>
          ))}
          {divisor !== 1 && ` = (${currentDetails.sum}) / ${divisor}`} = <strong className="text-[var(--math-vector)] font-bold">{currentDetails.finalVal}</strong>
        </div>
      </div>

      {/* Post-Canvas Mathematical & Code Consolidation */}
      {!compact && <PostCanvasConsolidation content={CONV_PEDAGOGY} />}
    </div>
  );
};

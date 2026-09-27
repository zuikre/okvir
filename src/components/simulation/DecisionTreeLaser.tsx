import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useOkvirStore } from '@/lib/store';
import { tr } from '@/lib/i18n';

interface Point {
  x: number;
  y: number;
  cls: 0 | 1;
}

const POINTS: Point[] = [
  { x: 1.5, y: 1.5, cls: 0 }, { x: 2.0, y: 1.0, cls: 0 }, { x: 1.0, y: 2.0, cls: 0 },
  { x: 1.5, y: 3.0, cls: 0 }, { x: 2.5, y: 2.0, cls: 0 }, { x: 3.0, y: 1.5, cls: 0 },
  { x: 2.0, y: 3.5, cls: 0 }, { x: 1.0, y: 1.0, cls: 0 }, { x: 3.0, y: 3.0, cls: 0 },
  { x: 2.5, y: 0.8, cls: 0 }, { x: 0.8, y: 2.5, cls: 0 }, { x: 3.5, y: 2.5, cls: 0 },
  { x: 6.0, y: 6.0, cls: 1 }, { x: 6.5, y: 5.5, cls: 1 }, { x: 7.0, y: 6.0, cls: 1 },
  { x: 6.0, y: 7.0, cls: 1 }, { x: 7.5, y: 6.5, cls: 1 }, { x: 5.5, y: 7.0, cls: 1 },
  { x: 7.0, y: 7.5, cls: 1 }, { x: 6.5, y: 8.0, cls: 1 }, { x: 8.0, y: 7.0, cls: 1 },
  { x: 5.5, y: 6.0, cls: 1 }, { x: 8.0, y: 5.5, cls: 1 }, { x: 7.0, y: 8.5, cls: 1 },
];

const SPLITS = [
  { axis: 'x' as const, threshold: 4.5, depth: 0, label: 'X₁ ≤ 4.5' },
  { axis: 'y' as const, threshold: 4.2, depth: 1, label: 'X₂ ≤ 4.2' },
  { axis: 'x' as const, threshold: 2.2, depth: 2, label: 'X₁ ≤ 2.2' },
];

export const DecisionTreeLaser: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme, language } = useOkvirStore();
  const [activeSplits, setActiveSplits] = useState(0);
  const [laserProgress, setLaserProgress] = useState(1);
  const animRef = useRef<number>(0);

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;
    ctx.clearRect(0, 0, width, height);

    const pad = 24;
    const plotW = width - pad * 2;
    const plotH = height - pad * 2;
    const xMax = 10;
    const yMax = 10;
    const toCanvasX = (x: number) => pad + (x / xMax) * plotW;
    const toCanvasY = (y: number) => pad + plotH - (y / yMax) * plotH;

    // Region partitioning
    const getRegion = (p: { x: number; y: number }) => {
      let region = 0;
      for (let s = 0; s < activeSplits; s++) {
        const split = SPLITS[s];
        if (split.axis === 'x') {
          region = region * 2 + (p.x <= split.threshold ? 0 : 1);
        } else {
          region = region * 2 + (p.y <= split.threshold ? 0 : 1);
        }
      }
      return region;
    };

    // Calculate majority class per region
    const regionColors: Record<number, 0 | 1> = {};
    POINTS.forEach((p) => {
      const r = getRegion(p);
      const count0 = POINTS.filter((q) => getRegion(q) === r && q.cls === 0).length;
      const count1 = POINTS.filter((q) => getRegion(q) === r && q.cls === 1).length;
      regionColors[r] = count0 >= count1 ? 0 : 1;
    });

    // 1. Shaded Region Backgrounds
    const res = 4;
    for (let py = 0; py < height; py += res) {
      for (let px = 0; px < width; px += res) {
        const wx = ((px - pad) / plotW) * xMax;
        const wy = yMax - ((py - pad) / plotH) * yMax;
        if (wx < 0 || wx > xMax || wy < 0 || wy > yMax) continue;

        const fakePt = { x: wx, y: wy };
        const r = getRegion(fakePt);
        const majClass = regionColors[r] ?? 0;
        const color = majClass === 0
          ? (theme === 'dark' ? 'rgba(56, 189, 248, 0.08)' : 'rgba(2, 132, 199, 0.06)')
          : (theme === 'dark' ? 'rgba(245, 158, 11, 0.08)' : 'rgba(217, 119, 6, 0.06)');
        ctx.fillStyle = color;
        ctx.fillRect(px, py, res, res);
      }
    }

    // 2. Subtle Grid
    ctx.strokeStyle = theme === 'dark' ? '#27272a' : '#e4e4e7';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= 10; i += 2) {
      ctx.beginPath();
      ctx.moveTo(toCanvasX(i), pad);
      ctx.lineTo(toCanvasX(i), pad + plotH);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(pad, toCanvasY(i));
      ctx.lineTo(pad + plotW, toCanvasY(i));
      ctx.stroke();
    }

    // 3. Established Orthogonal Split Lines
    for (let s = 0; s < activeSplits; s++) {
      const split = SPLITS[s];
      const isCurrentAnimating = s === activeSplits - 1 && laserProgress < 1;

      if (!isCurrentAnimating) {
        ctx.beginPath();
        if (split.axis === 'x') {
          ctx.moveTo(toCanvasX(split.threshold), pad);
          ctx.lineTo(toCanvasX(split.threshold), pad + plotH);
        } else {
          ctx.moveTo(pad, toCanvasY(split.threshold));
          ctx.lineTo(pad + plotW, toCanvasY(split.threshold));
        }
        ctx.strokeStyle = 'var(--math-prediction)';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    }

    // 4. Laser Knife-Cut Animation with Spark Particles
    if (activeSplits > 0 && laserProgress < 1) {
      const split = SPLITS[activeSplits - 1];
      const prog = laserProgress;
      ctx.beginPath();

      let sparkX = 0;
      let sparkY = 0;

      if (split.axis === 'x') {
        const lineX = toCanvasX(split.threshold);
        const yStart = pad;
        const yEnd = pad + plotH * prog;
        ctx.moveTo(lineX, yStart);
        ctx.lineTo(lineX, yEnd);
        sparkX = lineX;
        sparkY = yEnd;
      } else {
        const lineY = toCanvasY(split.threshold);
        const xStart = pad;
        const xEnd = pad + plotW * prog;
        ctx.moveTo(xStart, lineY);
        ctx.lineTo(xEnd, lineY);
        sparkX = xEnd;
        sparkY = lineY;
      }

      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2.5;
      ctx.shadowColor = '#10b981';
      ctx.shadowBlur = 12;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Spark explosion particles at the cutting edge
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI * 2 * i) / 6 + prog * 10;
        const dist = 3 + (i % 3) * 3;
        ctx.beginPath();
        ctx.arc(sparkX + Math.cos(angle) * dist, sparkY + Math.sin(angle) * dist, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = '#f59e0b';
        ctx.fill();
      }

      // Spark tip
      ctx.beginPath();
      ctx.arc(sparkX, sparkY, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
    }

    // 5. Data Points
    POINTS.forEach((p) => {
      ctx.beginPath();
      ctx.arc(toCanvasX(p.x), toCanvasY(p.y), 4.2, 0, Math.PI * 2);
      ctx.fillStyle = p.cls === 0 ? 'var(--math-data)' : 'var(--math-gradient)';
      ctx.fill();
      ctx.strokeStyle = theme === 'dark' ? '#09090b' : '#fafafa';
      ctx.lineWidth = 1.2;
      ctx.stroke();
    });
  }, [activeSplits, laserProgress, theme]);

  useEffect(() => {
    render();
  }, [render]);

  const addSplit = () => {
    if (activeSplits >= SPLITS.length) return;
    setActiveSplits((s) => s + 1);
    setLaserProgress(0);

    const t0 = performance.now();
    const duration = 320;

    const animate = () => {
      const elapsed = performance.now() - t0;
      const t = Math.min(1, elapsed / duration);
      setLaserProgress(t);
      if (t < 1) {
        animRef.current = requestAnimationFrame(animate);
      }
    };
    animRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => () => cancelAnimationFrame(animRef.current), []);

  const reset = () => {
    setActiveSplits(0);
    setLaserProgress(1);
  };

  // Compute Gini / Purity metric
  let correct = 0;
  const getRegionCount = (p: Point, splitsCount: number) => {
    let region = 0;
    for (let s = 0; s < splitsCount; s++) {
      const split = SPLITS[s];
      if (split.axis === 'x') {
        region = region * 2 + (p.x <= split.threshold ? 0 : 1);
      } else {
        region = region * 2 + (p.y <= split.threshold ? 0 : 1);
      }
    }
    return region;
  };

  POINTS.forEach((p) => {
    const r = getRegionCount(p, activeSplits);
    let count0 = 0;
    let count1 = 0;
    POINTS.forEach((q) => {
      if (getRegionCount(q, activeSplits) === r) {
        if (q.cls === 0) count0++;
        else count1++;
      }
    });
    const pred = count0 >= count1 ? 0 : 1;
    if (pred === p.cls) correct++;
  });
  const purity = activeSplits === 0 ? 50 : Math.round((correct / POINTS.length) * 100);

  return (
    <div className="flex flex-col gap-3 p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] specular">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xs uppercase tracking-wider text-[var(--text-secondary)] font-mono">
            {language === 'ar' ? 'النقاء' : 'Purity'}:
          </span>
          <span className="font-mono text-sm font-semibold tabular-nums text-[var(--math-vector)]">
            {purity}%
          </span>
          <span className="text-xs font-mono text-[var(--text-tertiary)] tabular-nums">
            {language === 'ar' ? 'القطوع' : 'Splits'}: {activeSplits}/{SPLITS.length}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {!compact && (
            <button
              onClick={reset}
              className="px-3 py-1.5 text-xs font-medium rounded-lg border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:bg-[var(--bg-surface-hover)] transition-colors font-mono"
            >
              {tr('reset', language)}
            </button>
          )}
          <button
            onClick={addSplit}
            disabled={activeSplits >= SPLITS.length}
            className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-[var(--math-prediction)] text-white font-mono transition-transform active:scale-95 disabled:opacity-50 hover:brightness-110 shadow-sm"
          >
            {language === 'ar' ? 'قطع ليزري جديد' : 'Execute Laser Cut'}
          </button>
        </div>
      </div>

      <div className="relative w-full h-72 rounded-lg overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-app)]">
        <canvas ref={canvasRef} className="w-full h-full block" />
        <div className="absolute bottom-2 start-2 text-[10px] font-mono text-[var(--text-tertiary)] bg-[var(--bg-surface)]/80 px-2 py-0.5 rounded border border-[var(--border-subtle)]">
          Axis-Aligned Orthogonal Knife-Cuts with Spark Emission
        </div>
      </div>
    </div>
  );
};

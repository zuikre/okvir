import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useOkvirStore } from '@/lib/store';
import { tr } from '@/lib/i18n';

interface Point {
  x: number;
  y: number;
  cls: 0 | 1;
}

// 40 Grounded Data Points across 2 Distinct Clusters
const KNN_POINTS: Point[] = [
  // Class A (Sky Blue - Feature Cluster 0)
  { x: 1.5, y: 2.2, cls: 0 }, { x: 2.0, y: 3.1, cls: 0 }, { x: 2.5, y: 2.0, cls: 0 },
  { x: 2.8, y: 4.0, cls: 0 }, { x: 1.2, y: 3.5, cls: 0 }, { x: 3.2, y: 2.8, cls: 0 },
  { x: 2.2, y: 4.8, cls: 0 }, { x: 3.8, y: 2.1, cls: 0 }, { x: 1.8, y: 4.2, cls: 0 },
  { x: 3.0, y: 5.2, cls: 0 }, { x: 2.7, y: 3.7, cls: 0 }, { x: 1.9, y: 5.5, cls: 0 },
  { x: 3.5, y: 4.5, cls: 0 }, { x: 4.0, y: 3.5, cls: 0 }, { x: 2.4, y: 6.0, cls: 0 },
  { x: 3.9, y: 5.0, cls: 0 }, { x: 1.6, y: 2.8, cls: 0 }, { x: 4.2, y: 2.7, cls: 0 },
  { x: 3.1, y: 3.3, cls: 0 }, { x: 2.6, y: 4.6, cls: 0 },

  // Class B (Amber - Feature Cluster 1)
  { x: 6.0, y: 6.8, cls: 1 }, { x: 7.0, y: 8.0, cls: 1 }, { x: 6.5, y: 6.2, cls: 1 },
  { x: 7.5, y: 7.4, cls: 1 }, { x: 5.8, y: 8.1, cls: 1 }, { x: 8.0, y: 6.5, cls: 1 },
  { x: 7.2, y: 8.9, cls: 1 }, { x: 6.2, y: 8.4, cls: 1 }, { x: 8.4, y: 8.0, cls: 1 },
  { x: 7.1, y: 6.0, cls: 1 }, { x: 5.5, y: 7.0, cls: 1 }, { x: 8.1, y: 9.0, cls: 1 },
  { x: 6.7, y: 7.7, cls: 1 }, { x: 7.8, y: 7.1, cls: 1 }, { x: 6.3, y: 9.2, cls: 1 },
  { x: 8.6, y: 7.3, cls: 1 }, { x: 5.9, y: 6.4, cls: 1 }, { x: 7.4, y: 8.5, cls: 1 },
  { x: 6.8, y: 6.6, cls: 1 }, { x: 8.0, y: 8.2, cls: 1 },
];

export const KNNRadar: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { knnK, setKnnK, theme, language } = useOkvirStore();
  const [query, setQuery] = useState({ x: 4.8, y: 5.5 });
  const [pulseR, setPulseR] = useState(0);
  const [prediction, setPrediction] = useState<0 | 1>(0);
  const [votes, setVotes] = useState({ blue: 0, amber: 0 });
  const dragging = useRef(false);
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

    // 1. Grid
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

    // 2. Compute Distances and Sort with Partial Insertion Sort
    const dists = KNN_POINTS.map((p) => ({
      ...p,
      d: Math.sqrt((p.x - query.x) ** 2 + (p.y - query.y) ** 2),
    })).sort((a, b) => a.d - b.d);

    const kNearest = dists.slice(0, knnK);
    const searchR = kNearest[kNearest.length - 1]?.d || 1.5;

    // 3. Dynamic Expanding Concentric Radar Pulse
    const pulseRadiusPx = ((pulseR % searchR) / xMax) * plotW;
    ctx.beginPath();
    ctx.arc(toCanvasX(query.x), toCanvasY(query.y), pulseRadiusPx, 0, Math.PI * 2);
    ctx.strokeStyle = theme === 'dark' ? 'rgba(56, 189, 248, 0.45)' : 'rgba(2, 132, 199, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([2, 3]);
    ctx.stroke();
    ctx.setLineDash([]);

    // 4. K-Distance Perimeter Circle
    const searchRPx = (searchR / xMax) * plotW;
    ctx.beginPath();
    ctx.arc(toCanvasX(query.x), toCanvasY(query.y), searchRPx, 0, Math.PI * 2);
    ctx.fillStyle = theme === 'dark' ? 'rgba(56, 189, 248, 0.05)' : 'rgba(2, 132, 199, 0.04)';
    ctx.fill();
    ctx.strokeStyle = theme === 'dark' ? 'rgba(56, 189, 248, 0.5)' : 'rgba(2, 132, 199, 0.4)';
    ctx.lineWidth = 1.2;
    ctx.stroke();

    // 5. Elastic Connection Lines to K Nearest Neighbors
    let blueCount = 0;
    let amberCount = 0;

    kNearest.forEach((p) => {
      if (p.cls === 0) blueCount++;
      else amberCount++;

      ctx.beginPath();
      ctx.moveTo(toCanvasX(query.x), toCanvasY(query.y));
      ctx.lineTo(toCanvasX(p.x), toCanvasY(p.y));
      ctx.strokeStyle = p.cls === 0
        ? (theme === 'dark' ? 'rgba(56, 189, 248, 0.7)' : 'rgba(2, 132, 199, 0.65)')
        : (theme === 'dark' ? 'rgba(245, 158, 11, 0.7)' : 'rgba(217, 119, 6, 0.65)');
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });

    setVotes({ blue: blueCount, amber: amberCount });
    setPrediction(blueCount >= amberCount ? 0 : 1);

    // 6. Observation Points
    const neighborSet = new Set(kNearest.map((n) => `${n.x},${n.y}`));
    KNN_POINTS.forEach((p) => {
      const isNeighbor = neighborSet.has(`${p.x},${p.y}`);
      ctx.beginPath();
      ctx.arc(toCanvasX(p.x), toCanvasY(p.y), isNeighbor ? 5.5 : 4.0, 0, Math.PI * 2);
      ctx.fillStyle = p.cls === 0 ? 'var(--math-data)' : 'var(--math-gradient)';
      ctx.fill();

      ctx.strokeStyle = isNeighbor
        ? (theme === 'dark' ? '#fafafa' : '#09090b')
        : (theme === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)');
      ctx.lineWidth = isNeighbor ? 2 : 1;
      ctx.stroke();
    });

    // 7. Draggable Query Point
    const qX = toCanvasX(query.x);
    const qY = toCanvasY(query.y);

    ctx.beginPath();
    ctx.arc(qX, qY, 7.5, 0, Math.PI * 2);
    ctx.fillStyle = prediction === 0 ? 'var(--math-data)' : 'var(--math-gradient)';
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // 8. Dynamic Voting Donut Badge in Top-Right
    const donutX = width - 42;
    const donutY = 38;
    const donutR = 16;
    const total = blueCount + amberCount || 1;
    let startAngle = -Math.PI / 2;

    if (blueCount > 0) {
      const sweep = (blueCount / total) * Math.PI * 2;
      ctx.beginPath();
      ctx.arc(donutX, donutY, donutR, startAngle, startAngle + sweep);
      ctx.strokeStyle = 'var(--math-data)';
      ctx.lineWidth = 4;
      ctx.stroke();
      startAngle += sweep;
    }
    if (amberCount > 0) {
      const sweep = (amberCount / total) * Math.PI * 2;
      ctx.beginPath();
      ctx.arc(donutX, donutY, donutR, startAngle, startAngle + sweep);
      ctx.strokeStyle = 'var(--math-gradient)';
      ctx.lineWidth = 4;
      ctx.stroke();
    }

    ctx.fillStyle = theme === 'dark' ? '#fafafa' : '#09090b';
    ctx.font = 'bold 9px JetBrains Mono';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`K=${knnK}`, donutX, donutY);
  }, [query, knnK, pulseR, theme, prediction]);

  useEffect(() => {
    render();
  }, [render]);

  // Expanding Radar Pulse Loop
  useEffect(() => {
    let r = 0;
    const animate = () => {
      r += 0.08;
      setPulseR(r);
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  const handlePointer = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!dragging.current && e.type !== 'pointerdown') return;
    if (e.type === 'pointerdown') dragging.current = true;
    if (e.type === 'pointerup' || e.type === 'pointerleave') dragging.current = false;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const pad = 24;
    const plotW = rect.width - pad * 2;
    const plotH = rect.height - pad * 2;
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;

    const x = Math.max(0.5, Math.min(9.5, ((px - pad) / plotW) * 10));
    const y = Math.max(0.5, Math.min(9.5, ((rect.height - pad - py) / plotH) * 10));

    setQuery({ x: Number(x.toFixed(2)), y: Number(y.toFixed(2)) });
  };

  return (
    <div className="flex flex-col gap-3 p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] specular">
      {/* HUD Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase tracking-wider text-[var(--text-secondary)] font-mono">
            {tr('predictedClass', language)}:
          </span>
          <span
            className="font-mono text-xs px-2.5 py-1 rounded-md font-semibold border tabular-nums"
            style={{
              color: prediction === 0 ? 'var(--math-data)' : 'var(--math-gradient)',
              borderColor: prediction === 0 ? 'rgba(56,189,248,0.4)' : 'rgba(245,158,11,0.4)',
              backgroundColor: prediction === 0 ? 'rgba(56,189,248,0.1)' : 'rgba(245,158,11,0.1)',
            }}
          >
            {prediction === 0 ? 'Class Blue (Feature A)' : 'Class Amber (Feature B)'}
          </span>
          <span className="text-xs font-mono text-[var(--text-secondary)] tabular-nums">
            ({votes.blue} Blue vs {votes.amber} Amber)
          </span>
        </div>

        <div className="flex items-center gap-1.5 font-mono text-xs text-[var(--text-secondary)]">
          <span>{tr('kValue', language)}:</span>
          <span className="text-[var(--text-primary)] font-semibold">{knnK}</span>
        </div>
      </div>

      {/* Canvas */}
      <div className="relative w-full h-72 rounded-lg overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-app)]">
        <canvas
          ref={canvasRef}
          className="w-full h-full block cursor-crosshair"
          onPointerDown={handlePointer}
          onPointerMove={handlePointer}
          onPointerUp={handlePointer}
          onPointerLeave={handlePointer}
        />
        <div className="absolute bottom-2 start-2 text-[10px] font-mono text-[var(--text-tertiary)] bg-[var(--bg-surface)]/80 px-2 py-0.5 rounded border border-[var(--border-subtle)]">
          {tr('queryPoint', language)}: ({query.x.toFixed(1)}, {query.y.toFixed(1)}) — Click / Drag anywhere
        </div>
      </div>

      {/* Hardware Slider for K */}
      {!compact && (
        <div className="flex flex-col gap-1.5 pt-1">
          <div className="flex justify-between text-xs font-mono text-[var(--text-secondary)]">
            <span>{tr('kValue', language)}:</span>
            <span className="tabular-nums font-semibold text-[var(--math-data)]">{knnK}</span>
          </div>
          <input
            type="range"
            min="1"
            max="11"
            step="2"
            value={knnK}
            onChange={(e) => setKnnK(parseInt(e.target.value, 10))}
            className="w-full accent-[var(--math-data)] cursor-pointer"
          />
        </div>
      )}
    </div>
  );
};

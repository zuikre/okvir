import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useOkvirStore } from '@/lib/store';
import { audio } from '@/lib/audio';

interface VectorPoint {
  x: number;
  y: number;
}

export const VectorGeometryCanvas: React.FC = () => {
  const { language, config } = useOkvirStore();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [u, setU] = useState<VectorPoint>({ x: 3, y: 2 });
  const [v, setV] = useState<VectorPoint>({ x: 4, y: -1 });
  const [dragging, setDragging] = useState<'u' | 'v' | null>(null);

  // Mathematical derivations
  const magU = Math.sqrt(u.x * u.x + u.y * u.y);
  const magV = Math.sqrt(v.x * v.x + v.y * v.y);
  const dotProduct = u.x * v.x + u.y * v.y;
  const cosTheta = magU > 0 && magV > 0 ? Math.max(-1, Math.min(1, dotProduct / (magU * magV))) : 0;
  const thetaRad = Math.acos(cosTheta);
  const thetaDeg = (thetaRad * 180) / Math.PI;

  // Scalar projection of u onto v: (u . v) / |v|
  const projScalar = magV > 0 ? dotProduct / magV : 0;
  // Vector projection: projScalar * (v / |v|)
  const projVector: VectorPoint = magV > 0 ? {
    x: (projScalar * v.x) / magV,
    y: (projScalar * v.y) / magV,
  } : { x: 0, y: 0 };

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const originX = width / 2;
    const originY = height / 2;
    const scale = Math.min(width, height) / 14; // pixels per mathematical unit

    ctx.clearRect(0, 0, width, height);

    // 1. Coordinate Grid Lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;

    for (let x = -7; x <= 7; x++) {
      const px = originX + x * scale;
      ctx.beginPath();
      ctx.moveTo(px, 0);
      ctx.lineTo(px, height);
      ctx.stroke();
    }
    for (let y = -7; y <= 7; y++) {
      const py = originY - y * scale;
      ctx.beginPath();
      ctx.moveTo(0, py);
      ctx.lineTo(width, py);
      ctx.stroke();
    }

    // 2. Axes
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, originY);
    ctx.lineTo(width, originY);
    ctx.moveTo(originX, 0);
    ctx.lineTo(originX, height);
    ctx.stroke();

    // 3. Projection shadow on vector V
    const projPx = originX + projVector.x * scale;
    const projPy = originY - projVector.y * scale;
    const uPx = originX + u.x * scale;
    const uPy = originY - u.y * scale;

    // Perpendicular drop line from U to projection point
    ctx.strokeStyle = 'rgba(245, 158, 11, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(uPx, uPy);
    ctx.lineTo(projPx, projPy);
    ctx.stroke();
    ctx.setLineDash([]);

    // Highlighted Projection Segment along V
    ctx.strokeStyle = 'rgba(245, 158, 11, 0.9)';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(originX, originY);
    ctx.lineTo(projPx, projPy);
    ctx.stroke();

    // 4. Draw Angle Arc between U and V
    const angleU = Math.atan2(u.y, u.x);
    const angleV = Math.atan2(v.y, v.x);
    ctx.strokeStyle = 'rgba(168, 85, 247, 0.6)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(originX, originY, scale * 1.2, -angleU, -angleV, angleU > angleV);
    ctx.stroke();

    // Helper: draw arrow vector
    const drawArrow = (fromX: number, fromY: number, toX: number, toY: number, color: string, label: string) => {
      const headlen = 12;
      const dx = toX - fromX;
      const dy = toY - fromY;
      const angle = Math.atan2(dy, dx);

      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.lineWidth = 3;

      // Line
      ctx.beginPath();
      ctx.moveTo(fromX, fromY);
      ctx.lineTo(toX, toY);
      ctx.stroke();

      // Arrowhead
      ctx.beginPath();
      ctx.moveTo(toX, toY);
      ctx.lineTo(toX - headlen * Math.cos(angle - Math.PI / 6), toY - headlen * Math.sin(angle - Math.PI / 6));
      ctx.lineTo(toX - headlen * Math.cos(angle + Math.PI / 6), toY - headlen * Math.sin(angle + Math.PI / 6));
      ctx.closePath();
      ctx.fill();

      // Handle circle
      ctx.beginPath();
      ctx.arc(toX, toY, 7, 0, Math.PI * 2);
      ctx.fillStyle = '#09090b';
      ctx.fill();
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Label
      ctx.font = 'bold 12px "JetBrains Mono", monospace';
      ctx.fillStyle = color;
      ctx.fillText(label, toX + 12, toY - 8);
    };

    // Draw Vector U (Emerald)
    drawArrow(originX, originY, uPx, uPy, '#10b981', `u (${u.x.toFixed(1)}, ${u.y.toFixed(1)})`);

    // Draw Vector V (Sky Blue)
    const vPx = originX + v.x * scale;
    const vPy = originY - v.y * scale;
    drawArrow(originX, originY, vPx, vPy, '#38bdf8', `v (${v.x.toFixed(1)}, ${v.y.toFixed(1)})`);

    // Projection Point dot
    ctx.beginPath();
    ctx.arc(projPx, projPy, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#f59e0b';
    ctx.fill();
  }, [u, v, projVector]);

  useEffect(() => {
    draw();
  }, [draw]);

  // Coordinate transformation from mouse to unit coordinates
  const getUnitCoords = (e: React.MouseEvent<HTMLCanvasElement>): VectorPoint => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const px = (e.clientX - rect.left) * (canvas.width / rect.width);
    const py = (e.clientY - rect.top) * (canvas.height / rect.height);
    const originX = canvas.width / 2;
    const originY = canvas.height / 2;
    const scale = Math.min(canvas.width, canvas.height) / 14;

    const x = Math.round(((px - originX) / scale) * 10) / 10;
    const y = Math.round(((originY - py) / scale) * 10) / 10;
    return {
      x: Math.max(-6, Math.min(6, x)),
      y: Math.max(-6, Math.min(6, y)),
    };
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const coords = getUnitCoords(e);
    const distU = Math.hypot(coords.x - u.x, coords.y - u.y);
    const distV = Math.hypot(coords.x - v.x, coords.y - v.y);

    if (distU < 1.0) {
      setDragging('u');
      if (config.soundEnabled) audio.playClick();
    } else if (distV < 1.0) {
      setDragging('v');
      if (config.soundEnabled) audio.playClick();
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!dragging) return;
    const coords = getUnitCoords(e);
    if (dragging === 'u') {
      setU(coords);
    } else if (dragging === 'v') {
      setV(coords);
    }
  };

  const handleMouseUp = () => {
    setDragging(null);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* 2D Canvas */}
      <div className="relative rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-app)] overflow-hidden shadow-inner flex items-center justify-center p-2">
        <canvas
          ref={canvasRef}
          width={640}
          height={400}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="w-full max-w-2xl h-auto aspect-[16/10] cursor-crosshair select-none"
        />

        <div className="absolute top-3 start-3 px-2.5 py-1 rounded-md bg-[var(--bg-surface)]/80 backdrop-blur-md border border-[var(--border-subtle)] text-[11px] font-mono text-[var(--text-tertiary)] select-none">
          {language === 'ar' ? 'اسحب رؤوس الأسهم u و v لضبط الإحداثيات' : 'Drag arrow endpoints (u, v) to transform space'}
        </div>
      </div>

      {/* Reactive Geometric Telemetry HUD */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {/* Dot Product */}
        <div className="p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] flex flex-col gap-1">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-tertiary)]">
            Dot Product (u · v)
          </span>
          <span className={`text-base font-mono font-bold tabular-nums ${dotProduct === 0 ? 'text-amber-400' : 'text-[var(--text-primary)]'}`}>
            {dotProduct.toFixed(2)}
          </span>
          <span className="text-[10px] font-mono text-[var(--text-tertiary)]">
            {Math.abs(dotProduct) < 0.05
              ? (language === 'ar' ? '⚡ متعامدان (Orthogonal)' : '⚡ Orthogonal (Perpendicular)')
              : dotProduct > 0
              ? (language === 'ar' ? 'زاوية حادة (Acute)' : 'Acute Angle')
              : (language === 'ar' ? 'زاوية منفرجة (Obtuse)' : 'Obtuse Angle')}
          </span>
        </div>

        {/* Angle Theta */}
        <div className="p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] flex flex-col gap-1">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-tertiary)]">
            Angle (θ)
          </span>
          <span className="text-base font-mono font-bold tabular-nums text-purple-400">
            {thetaDeg.toFixed(1)}°
          </span>
          <span className="text-[10px] font-mono text-[var(--text-tertiary)]">
            {(thetaRad / Math.PI).toFixed(2)}π rad
          </span>
        </div>

        {/* Magnitude ||u|| */}
        <div className="p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] flex flex-col gap-1">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-tertiary)]">
            Magnitude ‖u‖
          </span>
          <span className="text-base font-mono font-bold tabular-nums text-emerald-400">
            {magU.toFixed(2)}
          </span>
          <span className="text-[10px] font-mono text-[var(--text-tertiary)]">
            √(u₁² + u₂²)
          </span>
        </div>

        {/* Scalar Projection */}
        <div className="p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] flex flex-col gap-1">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-tertiary)]">
            Projection (u onto v)
          </span>
          <span className="text-base font-mono font-bold tabular-nums text-amber-400">
            {projScalar.toFixed(2)}
          </span>
          <span className="text-[10px] font-mono text-[var(--text-tertiary)]">
            ‖u‖ cos(θ)
          </span>
        </div>
      </div>
    </div>
  );
};

import React, { useRef, useState, useCallback, useEffect } from 'react';
import { ZoomIn, ZoomOut, Maximize2, RotateCcw } from 'lucide-react';

interface ConstellationCanvasProps {
  children: (lod: 1 | 2 | 3, scale: number) => React.ReactNode;
  contentWidth: number;
  contentHeight: number;
  className?: string;
}

export const ConstellationCanvas: React.FC<ConstellationCanvasProps> = ({
  children,
  contentWidth,
  contentHeight,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const startPanRef = useRef({ x: 0, y: 0 });
  const startOffsetRef = useRef({ x: 0, y: 0 });

  // Calculate dynamic Level of Detail (LOD) based on zoom scale
  const lod: 1 | 2 | 3 = scale < 0.75 ? 1 : scale > 1.25 ? 3 : 2;

  // Center the canvas content on initial mount
  useEffect(() => {
    if (containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const initialScale = Math.min(
        1,
        Math.min(
          (containerRect.width - 40) / contentWidth,
          (containerRect.height - 40) / contentHeight
        )
      );
      setScale(Math.max(0.65, initialScale));
      setOffset({
        x: Math.max(0, (containerRect.width - contentWidth * initialScale) / 2),
        y: 20,
      });
    }
  }, [contentWidth, contentHeight]);

  const handlePointerDown = (e: React.PointerEvent) => {
    // Only pan on primary button and not on interactive buttons/cards
    if (e.button !== 0) return;
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('[data-interactive="true"]')) return;

    setIsPanning(true);
    startPanRef.current = { x: e.clientX, y: e.clientY };
    startOffsetRef.current = { ...offset };
    if (containerRef.current) {
      containerRef.current.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isPanning) return;
    const deltaX = e.clientX - startPanRef.current.x;
    const deltaY = e.clientY - startPanRef.current.y;
    setOffset({
      x: startOffsetRef.current.x + deltaX,
      y: startOffsetRef.current.y + deltaY,
    });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (isPanning) {
      if (containerRef.current?.hasPointerCapture(e.pointerId)) {
        containerRef.current.releasePointerCapture(e.pointerId);
      }
      setIsPanning(false);
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (!containerRef.current) return;

    const zoomFactor = e.deltaY < 0 ? 1.08 : 0.92;
    const newScale = Math.min(1.8, Math.max(0.45, scale * zoomFactor));

    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Zoom centered on mouse pointer
    const newOffsetX = mouseX - (mouseX - offset.x) * (newScale / scale);
    const newOffsetY = mouseY - (mouseY - offset.y) * (newScale / scale);

    setScale(newScale);
    setOffset({ x: newOffsetX, y: newOffsetY });
  };

  const resetView = useCallback(() => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const fitScale = Math.min(
      1,
      Math.min(
        (containerRect.width - 40) / contentWidth,
        (containerRect.height - 40) / contentHeight
      )
    );
    setScale(Math.max(0.65, fitScale));
    setOffset({
      x: Math.max(0, (containerRect.width - contentWidth * fitScale) / 2),
      y: 20,
    });
  }, [contentWidth, contentHeight]);

  const zoomIn = () => setScale((s) => Math.min(1.8, s * 1.15));
  const zoomOut = () => setScale((s) => Math.max(0.45, s * 0.85));

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onWheel={handleWheel}
      className={`relative w-full h-[740px] overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-2xl select-none ${
        isPanning ? 'cursor-grabbing' : 'cursor-grab'
      } ${className}`}
    >
      {/* Zoom HUD Controls */}
      <div className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5 p-1.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-app)]/90 backdrop-blur-md shadow-lg font-mono text-xs">
        <button
          onClick={zoomIn}
          className="p-1.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-hover)] transition-colors"
          title="Zoom In (+)"
        >
          <ZoomIn size={15} />
        </button>
        <span className="px-1 text-[10px] font-bold text-[var(--text-tertiary)] tabular-nums">
          {Math.round(scale * 100)}%
        </span>
        <button
          onClick={zoomOut}
          className="p-1.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-hover)] transition-colors"
          title="Zoom Out (-)"
        >
          <ZoomOut size={15} />
        </button>
        <div className="w-[1px] h-3 bg-[var(--border-subtle)] mx-0.5" />
        <button
          onClick={resetView}
          className="p-1.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-hover)] transition-colors"
          title="Reset View"
        >
          <RotateCcw size={14} />
        </button>
      </div>

      {/* Transformable Canvas Layer */}
      <div
        className="absolute origin-top-left transition-transform duration-75 ease-out"
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
          width: `${contentWidth}px`,
          height: `${contentHeight}px`,
        }}
      >
        {children(lod, scale)}
      </div>
    </div>
  );
};

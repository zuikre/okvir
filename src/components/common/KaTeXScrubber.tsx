import React, { useRef, useState, useCallback } from 'react';
import { useFormulaAnchorStore } from '@/lib/formulaAnchorStore';
import { audio } from '@/lib/audio';
import { useOkvirStore } from '@/lib/store';

export interface KaTeXScrubberProps {
  token: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  decimals?: number;
  unit?: string;
  colorVar?: string;
  onChange: (val: number) => void;
  className?: string;
}

export const KaTeXScrubber: React.FC<KaTeXScrubberProps> = ({
  token,
  value,
  min = -Infinity,
  max = Infinity,
  step = 0.05,
  decimals = 2,
  unit = '',
  colorVar = 'var(--math-vector)',
  onChange,
  className = '',
}) => {
  const { setActiveToken } = useFormulaAnchorStore();
  const { config } = useOkvirStore();
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const startValRef = useRef(0);
  const lastTickValRef = useRef(value);

  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLSpanElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    startXRef.current = e.clientX;
    startValRef.current = value;
    lastTickValRef.current = value;
    e.currentTarget.setPointerCapture(e.pointerId);
    setActiveToken(token, 'formula');
    if (config.soundEnabled) audio.playClick();
  }, [value, token, setActiveToken, config.soundEnabled]);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLSpanElement>) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startXRef.current;
    
    // Bret Victor velocity scaling: Shift = fine precision, Alt = coarse acceleration
    const multiplier = e.shiftKey ? 0.1 : e.altKey ? 5.0 : 1.0;
    const rawVal = startValRef.current + (deltaX * step * multiplier) / 4;
    const clamped = Math.max(min, Math.min(max, rawVal));
    const rounded = Number(clamped.toFixed(decimals));

    // Audio ratcheting tick per discrete quantum change
    if (Math.abs(rounded - lastTickValRef.current) >= step && config.soundEnabled) {
      audio.playClick();
      lastTickValRef.current = rounded;
    }

    onChange(rounded);
  }, [isDragging, step, min, max, decimals, onChange, config.soundEnabled]);

  const handlePointerUp = useCallback((e: React.PointerEvent<HTMLSpanElement>) => {
    if (isDragging) {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
      setIsDragging(false);
      setActiveToken(null);
    }
  }, [isDragging, setActiveToken]);

  return (
    <span
      data-math-token={token}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onMouseEnter={() => !isDragging && setActiveToken(token, 'formula')}
      onMouseLeave={() => !isDragging && setActiveToken(null)}
      style={{ color: colorVar, borderColor: colorVar }}
      className={`inline-flex items-center px-1.5 py-0.2 mx-0.5 rounded cursor-ew-resize font-mono font-bold select-none transition-all border-b-2 border-dashed ${
        isDragging
          ? 'bg-white/15 ring-2 ring-white/30 shadow-lg scale-105'
          : 'hover:bg-white/10 hover:border-solid'
      } ${className}`}
      title="Drag left/right to scrub value (Shift for fine, Alt for coarse)"
    >
      <span className="text-[10px] opacity-40 me-0.5 pointer-events-none">◂</span>
      <span className="tabular-nums">{value.toFixed(decimals)}{unit}</span>
      <span className="text-[10px] opacity-40 ms-0.5 pointer-events-none">▸</span>
    </span>
  );
};

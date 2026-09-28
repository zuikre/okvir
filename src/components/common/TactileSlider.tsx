import React, { useRef, useState, useCallback } from 'react';
import { audio } from '@/lib/audio';
import { useOkvirStore } from '@/lib/store';

export interface TactileSliderProps {
  label?: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  defaultValue?: number;
  unit?: string;
  decimals?: number;
  accentColor?: string; // hex or CSS var
  onChange: (val: number) => void;
  className?: string;
}

export const TactileSlider: React.FC<TactileSliderProps> = ({
  label,
  value,
  min,
  max,
  step = 0.01,
  defaultValue,
  unit = '',
  decimals = 2,
  accentColor = '#38bdf8',
  onChange,
  className = '',
}) => {
  const { config } = useOkvirStore();
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const lastSoundValRef = useRef(value);

  const percentage = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));

  const updateFromPosition = useCallback(
    (clientX: number, isFine: boolean) => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const rawRatio = (clientX - rect.left) / rect.width;
      const clampedRatio = Math.min(1, Math.max(0, rawRatio));
      let newVal = min + clampedRatio * (max - min);

      // Quantize to step
      const effectiveStep = isFine ? step * 0.1 : step;
      newVal = Math.round(newVal / effectiveStep) * effectiveStep;
      newVal = Math.min(max, Math.max(min, Number(newVal.toFixed(decimals + (isFine ? 1 : 0)))));

      if (Math.abs(newVal - lastSoundValRef.current) >= step && config.soundEnabled) {
        audio.playClick();
        lastSoundValRef.current = newVal;
      }

      onChange(newVal);
    },
    [min, max, step, decimals, onChange, config.soundEnabled]
  );

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    updateFromPosition(e.clientX, e.shiftKey);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    updateFromPosition(e.clientX, e.shiftKey);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging) {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
      setIsDragging(false);
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const direction = e.deltaY < 0 ? 1 : -1;
    const effectiveStep = e.shiftKey ? step * 0.1 : step;
    let nextVal = value + direction * effectiveStep;
    nextVal = Math.min(max, Math.max(min, Number(nextVal.toFixed(decimals))));
    if (config.soundEnabled) audio.playClick();
    onChange(nextVal);
  };

  const handleDoubleClick = () => {
    if (defaultValue !== undefined) {
      if (config.soundEnabled) audio.playClick();
      onChange(defaultValue);
    }
  };

  return (
    <div className={`space-y-1.5 select-none ${className}`} onWheel={handleWheel}>
      {/* Header: Label & Numerical Readout */}
      <div className="flex items-center justify-between text-xs">
        {label && <span className="text-[var(--text-secondary)] font-medium text-[11px]">{label}</span>}
        <div
          onDoubleClick={handleDoubleClick}
          className="px-1.5 py-0.5 rounded bg-[var(--bg-app)] border border-[var(--border-subtle)] text-[var(--text-primary)] font-mono font-bold text-[10px] tabular-nums cursor-pointer hover:border-[var(--border-strong)]"
          title="Double-click to reset to default"
        >
          {value.toFixed(decimals)}
          {unit && <span className="text-[var(--text-tertiary)] ml-0.5">{unit}</span>}
        </div>
      </div>

      {/* Tactile Hardware Slider Track */}
      <div
        ref={trackRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="relative h-6 flex items-center cursor-ew-resize group"
      >
        {/* Recessed Track Grooving */}
        <div className="w-full h-1.5 rounded-full bg-[var(--bg-app)] border border-[var(--border-subtle)] overflow-hidden shadow-inner relative">
          {/* Active Level Fill with Glow */}
          <div
            className="h-full rounded-full transition-all duration-75 relative"
            style={{
              width: `${percentage}%`,
              backgroundColor: accentColor,
              boxShadow: `0 0 8px ${accentColor}60`,
            }}
          />
        </div>

        {/* Tactile Hardware Thumb */}
        <div
          className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-5 rounded-[4px] border border-[var(--border-strong)] bg-gradient-to-b from-[#2a2a30] to-[#16161a] shadow-[0_2px_6px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.15)] flex items-center justify-center transition-transform duration-75 ${
            isDragging ? 'scale-110 shadow-lg ring-2 ring-sky-400/50' : 'group-hover:scale-105'
          }`}
          style={{ left: `${percentage}%` }}
        >
          {/* Tactile Friction Ribs */}
          <div className="flex flex-col gap-[2px]">
            <div className="w-2 h-[1px] bg-zinc-500/80" />
            <div className="w-2 h-[1px] bg-zinc-500/80" />
            <div className="w-2 h-[1px] bg-zinc-500/80" />
          </div>
        </div>
      </div>
    </div>
  );
};

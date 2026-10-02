import React, { useState, useEffect, useRef, useCallback } from 'react';
import { sonifier } from '@/lib/audio/WebAudioSonifier';
import { Volume2, VolumeX, RotateCcw, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

export interface TimelinePlaybackBarProps {
  totalSteps: number;
  currentStep: number;
  stepPhase?: string;
  metricLabel: string;
  metricValue: number;
  onStepChange: (step: number) => void;
  onPlayStateChange?: (isPlaying: boolean) => void;
}

const SPEEDS = [0.25, 0.5, 1, 2, 5];

export const TimelinePlaybackBar: React.FC<TimelinePlaybackBarProps> = ({
  totalSteps,
  currentStep,
  stepPhase,
  metricLabel,
  metricValue,
  onStepChange,
  onPlayStateChange,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(sonifier.getIsMuted());

  const animFrameRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const accumulatorRef = useRef<number>(0);
  const wasPlayingBeforeScrubRef = useRef<boolean>(false);

  // Keep latest values in refs to avoid recreation of timers and infinite loops
  const currentStepRef = useRef(currentStep);
  currentStepRef.current = currentStep;

  const totalStepsRef = useRef(totalSteps);
  totalStepsRef.current = totalSteps;

  const speedRef = useRef(speed);
  speedRef.current = speed;

  const isPlayingRef = useRef(isPlaying);
  isPlayingRef.current = isPlaying;

  const onStepChangeRef = useRef(onStepChange);
  onStepChangeRef.current = onStepChange;

  const onPlayStateChangeRef = useRef(onPlayStateChange);
  onPlayStateChangeRef.current = onPlayStateChange;

  // Sonification loss update
  useEffect(() => {
    sonifier.updateLoss(metricValue);
  }, [metricValue]);

  // Clean stop helper
  const stopPlayback = useCallback(() => {
    setIsPlaying(false);
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = 0;
    }
    onPlayStateChangeRef.current?.(false);
  }, []);

  // Animation frame loop with Delta-Time accumulator
  const tick = useCallback(
    (now: number) => {
      if (!isPlayingRef.current) return;

      const cur = currentStepRef.current;
      const tot = totalStepsRef.current;

      if (cur >= tot) {
        stopPlayback();
        sonifier.playConvergenceChime();
        return;
      }

      if (lastTimeRef.current === 0) lastTimeRef.current = now;
      const dt = now - lastTimeRef.current;
      lastTimeRef.current = now;

      // Base step duration: 150ms at 1.0x
      const stepDuration = 150 / speedRef.current;
      accumulatorRef.current += dt;

      let advanced = false;
      while (accumulatorRef.current >= stepDuration) {
        accumulatorRef.current -= stepDuration;
        const current = currentStepRef.current;
        const maxStep = totalStepsRef.current;

        if (current >= maxStep) {
          stopPlayback();
          sonifier.playConvergenceChime();
          return;
        }

        const next = current + 1;
        currentStepRef.current = next;
        onStepChangeRef.current(next);
        advanced = true;

        if (next >= maxStep) {
          stopPlayback();
          sonifier.playConvergenceChime();
          return;
        }
      }

      if (advanced) {
        sonifier.playStepTick();
      }

      if (isPlayingRef.current) {
        animFrameRef.current = requestAnimationFrame(tick);
      }
    },
    [stopPlayback]
  );

  // Playback lifecycle effect
  useEffect(() => {
    if (isPlaying) {
      if (currentStepRef.current >= totalStepsRef.current) {
        setIsPlaying(false);
        return;
      }
      lastTimeRef.current = 0;
      accumulatorRef.current = 0;
      animFrameRef.current = requestAnimationFrame(tick);
      onPlayStateChangeRef.current?.(true);
    } else {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = 0;
      }
      onPlayStateChangeRef.current?.(false);
    }
    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = 0;
      }
    };
  }, [isPlaying, tick]);

  // Scrubbing handlers
  const handleScrubStart = () => {
    wasPlayingBeforeScrubRef.current = isPlayingRef.current;
    if (isPlayingRef.current) {
      setIsPlaying(false);
    }
  };

  const handleScrubMove = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (!Number.isNaN(val)) {
      const clamped = Math.max(0, Math.min(val, totalStepsRef.current));
      onStepChangeRef.current(clamped);
    }
  };

  const handleScrubEnd = () => {
    if (wasPlayingBeforeScrubRef.current) {
      wasPlayingBeforeScrubRef.current = false;
      if (currentStepRef.current < totalStepsRef.current) {
        setIsPlaying(true);
      }
    }
  };

  // Button actions
  const handleReset = useCallback(() => {
    setIsPlaying(false);
    onStepChangeRef.current(0);
  }, []);

  const handleStepBackward = useCallback(() => {
    setIsPlaying(false);
    const prev = Math.max(0, currentStepRef.current - 1);
    onStepChangeRef.current(prev);
    sonifier.playStepTick();
  }, []);

  const handleStepForward = useCallback(() => {
    setIsPlaying(false);
    const next = Math.min(totalStepsRef.current, currentStepRef.current + 1);
    onStepChangeRef.current(next);
    sonifier.playStepTick();
  }, []);

  const handlePlayToggle = useCallback(() => {
    if (isPlayingRef.current) {
      setIsPlaying(false);
    } else {
      if (currentStepRef.current >= totalStepsRef.current) {
        onStepChangeRef.current(0);
      }
      setIsPlaying(true);
    }
  }, []);

  // Keyboard shortcut listeners (bound once, references always current)
  const keyHandlersRef = useRef({
    handlePlayToggle,
    handleStepBackward,
    handleStepForward,
    handleReset,
  });
  keyHandlersRef.current = {
    handlePlayToggle,
    handleStepBackward,
    handleStepForward,
    handleReset,
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      switch (e.code) {
        case 'Space':
          e.preventDefault();
          keyHandlersRef.current.handlePlayToggle();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          keyHandlersRef.current.handleStepBackward();
          break;
        case 'ArrowRight':
          e.preventDefault();
          keyHandlersRef.current.handleStepForward();
          break;
        case 'KeyR':
          e.preventDefault();
          keyHandlersRef.current.handleReset();
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleSound = () => {
    const muted = sonifier.toggleMute();
    setIsMuted(muted);
  };

  const isConverged = totalSteps > 0 && currentStep >= totalSteps;
  const safeTotal = Math.max(1, totalSteps);
  const safeCurrent = Math.max(0, Math.min(currentStep, safeTotal));

  return (
    <div className="flex flex-col gap-2.5 p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] select-none specular">
      {/* 1. Header Metrics & Phase Badges */}
      <div className="flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-[var(--text-primary)] tabular-nums">
            Step {safeCurrent} / {safeTotal}
          </span>
          {isConverged ? (
            <span className="px-2 py-0.5 text-[10px] font-medium rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-wide">
              CONVERGED
            </span>
          ) : stepPhase ? (
            <span className="px-2 py-0.5 text-[10px] font-medium rounded bg-[var(--math-gradient)]/10 text-[var(--math-gradient)] border border-[var(--math-gradient)]/20 uppercase tracking-wide">
              {stepPhase}
            </span>
          ) : null}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-[var(--text-secondary)]">
            <span>{metricLabel}:</span>
            <span className="font-bold text-[var(--math-loss)] tabular-nums">
              {Number.isFinite(metricValue) ? metricValue.toFixed(2) : 'NaN'}
            </span>
          </div>

          <button
            onClick={toggleSound}
            title={isMuted ? 'Unmute Sonification' : 'Mute Sonification'}
            className="p-1 rounded text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-hover)] transition-colors"
          >
            {isMuted ? <VolumeX size={14} className="text-zinc-500" /> : <Volume2 size={14} className="text-emerald-400" />}
          </button>
        </div>
      </div>

      {/* 2. Interactive Timeline Slider Track */}
      <div className="relative flex items-center group py-0.5">
        <input
          type="range"
          min={0}
          max={safeTotal}
          value={safeCurrent}
          onMouseDown={handleScrubStart}
          onTouchStart={handleScrubStart}
          onChange={handleScrubMove}
          onMouseUp={handleScrubEnd}
          onTouchEnd={handleScrubEnd}
          className="w-full h-1.5 bg-[var(--border-subtle)] rounded-lg appearance-none cursor-pointer accent-[var(--math-gradient)] focus:outline-none"
        />
      </div>

      {/* 3. Transport Button Controls */}
      <div className="flex items-center justify-between pt-1 border-t border-[var(--border-subtle)]">
        <div className="flex items-center gap-1.5">
          {/* Reset */}
          <button
            onClick={handleReset}
            title="Reset (R)"
            className="p-1.5 rounded-lg border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:bg-[var(--bg-surface-hover)] hover:text-[var(--text-primary)] transition-all active:scale-95"
          >
            <RotateCcw size={13} />
          </button>

          {/* Step Back */}
          <button
            onClick={handleStepBackward}
            disabled={safeCurrent === 0 || isPlaying}
            title="Step Backward (Left Arrow)"
            className="p-1.5 rounded-lg border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:bg-[var(--bg-surface-hover)] disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95"
          >
            <ChevronLeft size={14} />
          </button>

          {/* Play / Pause Toggle */}
          <button
            onClick={handlePlayToggle}
            title="Play / Pause (Space)"
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-[var(--math-gradient)] text-black font-mono transition-transform active:scale-95 hover:brightness-110 shadow-sm flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
          >
            {isPlaying ? (
              <>
                <Pause size={12} fill="currentColor" className="shrink-0" />
                <span className="whitespace-nowrap">Pause</span>
              </>
            ) : (
              <>
                <Play size={12} fill="currentColor" className="shrink-0" />
                <span className="whitespace-nowrap">Play</span>
              </>
            )}
          </button>

          {/* Step Forward */}
          <button
            onClick={handleStepForward}
            disabled={safeCurrent >= safeTotal || isPlaying}
            title="Step Forward (Right Arrow)"
            className="p-1.5 rounded-lg border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:bg-[var(--bg-surface-hover)] disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95"
          >
            <ChevronRight size={14} />
          </button>
        </div>

        {/* Speed Selector Pills */}
        <div className="flex items-center gap-1 bg-[var(--bg-app)] p-0.5 rounded-lg border border-[var(--border-subtle)]">
          {SPEEDS.map((s) => (
            <button
              key={s}
              onClick={() => setSpeed(s)}
              className={`px-2 py-0.5 text-[10px] font-mono rounded transition-colors ${
                speed === s
                  ? 'bg-[var(--math-gradient)] text-black font-bold'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {s}×
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

import React, { useEffect, useReducer, useRef, useCallback } from 'react';
import { playbackReducer } from '@/lib/playback/PlaybackStateMachine';
import { sonifier } from '@/lib/audio/WebAudioSonifier';
import { Volume2, VolumeX, RotateCcw, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

interface TimelinePlaybackBarProps {
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
  const [state, dispatch] = useReducer(playbackReducer, {
    status: 'IDLE',
    currentStep,
    totalSteps: Math.max(1, totalSteps),
    speed: 1,
    wasPlayingBeforeScrub: false,
  });

  const [isMuted, setIsMuted] = React.useState(sonifier.getIsMuted());
  const animFrameRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const accumulatorRef = useRef<number>(0);

  // Sync state.totalSteps when parent changes
  useEffect(() => {
    dispatch({ type: 'SET_TOTAL_STEPS', totalSteps });
  }, [totalSteps]);

  // Sync state.currentStep when parent changes
  useEffect(() => {
    if (state.status !== 'SCRUBBING' && state.status !== 'PLAYING') {
      if (currentStep !== state.currentStep) {
        dispatch({ type: 'GO_TO_STEP', step: currentStep });
      }
    }
  }, [currentStep, state.status, state.currentStep]);

  // Sync parent step callback
  useEffect(() => {
    onStepChange(state.currentStep);
  }, [state.currentStep, onStepChange]);

  // Update sonifier loss metric
  useEffect(() => {
    sonifier.updateLoss(metricValue);
  }, [metricValue]);

  // Handle status sounds
  useEffect(() => {
    if (state.status === 'CONVERGED') {
      sonifier.playConvergenceChime();
    } else if (state.status === 'DIVERGED') {
      sonifier.playDivergenceAlarm();
    }
  }, [state.status]);

  // Continuous Playback Animation Loop with Delta-Time Accumulator
  const tick = useCallback(
    (now: number) => {
      if (lastTimeRef.current === 0) lastTimeRef.current = now;
      const dt = now - lastTimeRef.current;
      lastTimeRef.current = now;

      // Base step duration: 150ms at 1.0x
      const stepDuration = 150 / state.speed;
      accumulatorRef.current += dt;

      while (accumulatorRef.current >= stepDuration) {
        accumulatorRef.current -= stepDuration;
        dispatch({ type: 'STEP_FORWARD' });
      }

      if (state.status === 'PLAYING') {
        animFrameRef.current = requestAnimationFrame(tick);
      }
    },
    [state.speed, state.status]
  );

  useEffect(() => {
    if (state.status === 'PLAYING') {
      sonifier.startContinuousSonification();
      lastTimeRef.current = 0;
      accumulatorRef.current = 0;
      animFrameRef.current = requestAnimationFrame(tick);
      onPlayStateChange?.(true);
    } else {
      cancelAnimationFrame(animFrameRef.current);
      onPlayStateChange?.(false);
    }
    return () => {
      cancelAnimationFrame(animFrameRef.current);
      sonifier.stopContinuousSonification();
    };
  }, [state.status, tick, onPlayStateChange]);

  // Ensure sonification stops on unmount
  useEffect(() => {
    return () => {
      sonifier.stopContinuousSonification();
    };
  }, []);

  // Keyboard Shortcuts (Space: Play/Pause, Arrows: Step, R: Reset)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      switch (e.code) {
        case 'Space':
          e.preventDefault();
          if (state.status === 'PLAYING') {
            dispatch({ type: 'PAUSE' });
          } else {
            dispatch({ type: 'PLAY' });
          }
          break;
        case 'ArrowLeft':
          e.preventDefault();
          dispatch({ type: 'STEP_BACKWARD' });
          break;
        case 'ArrowRight':
          e.preventDefault();
          dispatch({ type: 'STEP_FORWARD' });
          break;
        case 'KeyR':
          e.preventDefault();
          dispatch({ type: 'RESET' });
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [state.status]);

  const toggleSound = () => {
    const muted = sonifier.toggleMute();
    setIsMuted(muted);
  };

  return (
    <div className="flex flex-col gap-2.5 p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] select-none specular">
      {/* 1. Header Metrics & Phase Badges */}
      <div className="flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-[var(--text-primary)] tabular-nums">
            Step {state.currentStep} / {state.totalSteps}
          </span>
          {stepPhase && (
            <span className="px-2 py-0.5 text-[10px] font-medium rounded bg-[var(--math-gradient)]/10 text-[var(--math-gradient)] border border-[var(--math-gradient)]/20 uppercase tracking-wide">
              {stepPhase}
            </span>
          )}
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
          max={state.totalSteps}
          value={state.currentStep}
          onMouseDown={() => {
            dispatch({ type: 'SCRUB_START' });
            sonifier.startContinuousSonification();
          }}
          onTouchStart={() => {
            dispatch({ type: 'SCRUB_START' });
            sonifier.startContinuousSonification();
          }}
          onChange={(e) => dispatch({ type: 'SCRUB_MOVE', targetStep: parseInt(e.target.value, 10) })}
          onMouseUp={() => dispatch({ type: 'SCRUB_END' })}
          onTouchEnd={() => dispatch({ type: 'SCRUB_END' })}
          className="w-full h-1.5 bg-[var(--border-subtle)] rounded-lg appearance-none cursor-pointer accent-[var(--math-gradient)] focus:outline-none"
        />
      </div>

      {/* 3. Transport Button Controls */}
      <div className="flex items-center justify-between pt-1 border-t border-[var(--border-subtle)]">
        <div className="flex items-center gap-1.5">
          {/* Reset */}
          <button
            onClick={() => dispatch({ type: 'RESET' })}
            title="Reset (R)"
            className="p-1.5 rounded-lg border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:bg-[var(--bg-surface-hover)] hover:text-[var(--text-primary)] transition-all active:scale-95"
          >
            <RotateCcw size={13} />
          </button>

          {/* Step Back */}
          <button
            onClick={() => dispatch({ type: 'STEP_BACKWARD' })}
            disabled={state.currentStep === 0 || state.status === 'PLAYING'}
            title="Step Backward (Left Arrow)"
            className="p-1.5 rounded-lg border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:bg-[var(--bg-surface-hover)] disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95"
          >
            <ChevronLeft size={14} />
          </button>

          {/* Play / Pause Toggle */}
          <button
            onClick={() => (state.status === 'PLAYING' ? dispatch({ type: 'PAUSE' }) : dispatch({ type: 'PLAY' }))}
            title="Play / Pause (Space)"
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-[var(--math-gradient)] text-black font-mono transition-transform active:scale-95 hover:brightness-110 shadow-sm flex items-center gap-1.5"
          >
            {state.status === 'PLAYING' ? (
              <>
                <Pause size={12} fill="currentColor" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play size={12} fill="currentColor" />
                <span>Play</span>
              </>
            )}
          </button>

          {/* Step Forward */}
          <button
            onClick={() => dispatch({ type: 'STEP_FORWARD' })}
            disabled={state.currentStep >= state.totalSteps || state.status === 'PLAYING'}
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
              onClick={() => dispatch({ type: 'SET_SPEED', speed: s })}
              className={`px-2 py-0.5 text-[10px] font-mono rounded transition-colors ${
                state.speed === s
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

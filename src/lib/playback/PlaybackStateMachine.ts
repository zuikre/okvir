// Algorithmic Playback State Machine
// Compliant with OKVIR Master PRD & Interactive Stepper Specification

export type PlaybackStatus = 'IDLE' | 'PLAYING' | 'PAUSED' | 'SCRUBBING' | 'CONVERGED' | 'DIVERGED';

export interface PlaybackState {
  status: PlaybackStatus;
  currentStep: number;
  totalSteps: number;
  speed: number; // 0.25, 0.5, 1, 2, 5
  wasPlayingBeforeScrub: boolean;
}

export type PlaybackAction =
  | { type: 'PLAY' }
  | { type: 'PAUSE' }
  | { type: 'STEP_FORWARD' }
  | { type: 'STEP_BACKWARD' }
  | { type: 'GO_TO_STEP'; step: number }
  | { type: 'SCRUB_START' }
  | { type: 'SCRUB_MOVE'; targetStep: number }
  | { type: 'SCRUB_END' }
  | { type: 'RESET' }
  | { type: 'SET_SPEED'; speed: number }
  | { type: 'NOTIFY_CONVERGED' }
  | { type: 'NOTIFY_DIVERGED' }
  | { type: 'SET_TOTAL_STEPS'; totalSteps: number };

export function playbackReducer(state: PlaybackState, action: PlaybackAction): PlaybackState {
  switch (action.type) {
    case 'PLAY':
      if (state.status === 'CONVERGED' || state.status === 'DIVERGED' || state.currentStep >= state.totalSteps) {
        return { ...state, currentStep: 0, status: 'PLAYING' };
      }
      return { ...state, status: 'PLAYING' };

    case 'PAUSE':
      return { ...state, status: 'PAUSED' };

    case 'STEP_FORWARD': {
      const nextStep = Math.min(state.currentStep + 1, state.totalSteps);
      const isEnd = nextStep >= state.totalSteps;
      return {
        ...state,
        currentStep: nextStep,
        status: isEnd ? 'CONVERGED' : state.status === 'PLAYING' ? 'PLAYING' : 'PAUSED',
      };
    }

    case 'STEP_BACKWARD': {
      const prevStep = Math.max(state.currentStep - 1, 0);
      return {
        ...state,
        currentStep: prevStep,
        status: 'PAUSED',
      };
    }

    case 'GO_TO_STEP': {
      const clamped = Math.max(0, Math.min(action.step, state.totalSteps));
      return {
        ...state,
        currentStep: clamped,
        status: clamped >= state.totalSteps && state.totalSteps > 0 ? 'CONVERGED' : state.status === 'PLAYING' ? 'PLAYING' : 'PAUSED',
      };
    }

    case 'SCRUB_START':
      return {
        ...state,
        wasPlayingBeforeScrub: state.status === 'PLAYING',
        status: 'SCRUBBING',
      };

    case 'SCRUB_MOVE': {
      const clamped = Math.max(0, Math.min(action.targetStep, state.totalSteps));
      return { ...state, currentStep: clamped };
    }

    case 'SCRUB_END':
      return {
        ...state,
        status: state.wasPlayingBeforeScrub ? 'PLAYING' : 'PAUSED',
      };

    case 'RESET':
      return {
        ...state,
        currentStep: 0,
        status: 'IDLE',
        wasPlayingBeforeScrub: false,
      };

    case 'SET_SPEED':
      return { ...state, speed: action.speed };

    case 'NOTIFY_CONVERGED':
      return { ...state, status: 'CONVERGED' };

    case 'NOTIFY_DIVERGED':
      return { ...state, status: 'DIVERGED' };

    case 'SET_TOTAL_STEPS':
      return {
        ...state,
        totalSteps: Math.max(0, action.totalSteps),
        currentStep: Math.min(state.currentStep, Math.max(0, action.totalSteps)),
      };

    default:
      return state;
  }
}

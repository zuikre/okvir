import type { FSRSState } from './types';

export type { FSRSState };

const DEFAULT_TARGET_RETENTION = 0.85;
const MEAN_REVERSION = 0.2;
const INITIAL_DIFFICULTY = 3.0;
const INITIAL_STABILITY = 1.0;

export type Rating = 1 | 2 | 3 | 4;

export function createNewCard(conceptId: string): FSRSState {
  return {
    cardId: `${conceptId}-${Date.now()}`,
    conceptId,
    stability: INITIAL_STABILITY,
    difficulty: INITIAL_DIFFICULTY,
    reps: 0,
    lapses: 0,
    state: 0,
    lastReview: null,
    due: Date.now(),
  };
}

export function retrievability(elapsedDays: number, stability: number): number {
  return Math.pow(1 + (19 / 81) * (elapsedDays / stability), -0.5);
}

export function nextInterval(stability: number, targetRetention: number): number {
  return Math.round((81 / 19) * stability * (Math.pow(targetRetention, -2) - 1));
}

export function updateCard(card: FSRSState, rating: Rating): FSRSState {
  const now = Date.now();
  const elapsedDays = card.lastReview
    ? Math.max(0, (now - card.lastReview) / (1000 * 60 * 60 * 24))
    : 0;

  let { stability, difficulty } = card;

  const gradeWeight = rating - 2;

  difficulty = Math.max(1, Math.min(10, difficulty - gradeWeight * 0.5));
  difficulty += MEAN_REVERSION * (INITIAL_DIFFICULTY - difficulty);

  const easeFactor = rating >= 3 ? 1.3 : 0.5;
  const stabilityMultiplier = 1 + easeFactor * (rating - 1) * 0.4;

  if (rating === 1) {
    stability = Math.max(0.2, stability * 0.3);
  } else {
    stability = Math.max(0.5, stability * stabilityMultiplier + elapsedDays * 0.1);
  }

  const interval = Math.max(1, nextInterval(stability, DEFAULT_TARGET_RETENTION));
  const dueMs = now + interval * 24 * 60 * 60 * 1000;

  return {
    ...card,
    stability,
    difficulty,
    reps: card.reps + 1,
    lapses: rating === 1 ? card.lapses + 1 : card.lapses,
    state: rating === 1 ? 3 : 2,
    lastReview: now,
    due: dueMs,
  };
}

export function getRatingLabel(rating: Rating, stability: number): string {
  const intervals: Record<Rating, string> = {
    1: '<10m',
    2: `${Math.max(1, Math.round(stability * 0.5))}d`,
    3: `${Math.max(2, Math.round(stability * 1.5))}d`,
    4: `${Math.max(5, Math.round(stability * 3))}d`,
  };
  return intervals[rating];
}

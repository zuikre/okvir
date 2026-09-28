import { create } from 'zustand';

export interface MathAnchorState {
  activeToken: string | null;
  hoverSource: 'formula' | 'canvas' | null;
  pulsePhase: number; // 0.0 to 1.0 (driven by rAF)
  scrubbingToken: string | null;
  scrubDelta: number;
  setActiveToken: (token: string | null, source?: 'formula' | 'canvas') => void;
  setScrubDelta: (token: string, delta: number) => void;
  updatePulse: (time: number) => void;
}

export const useFormulaAnchorStore = create<MathAnchorState>((set) => ({
  activeToken: null,
  hoverSource: null,
  pulsePhase: 0,
  scrubbingToken: null,
  scrubDelta: 0,
  setActiveToken: (token, source = 'formula') =>
    set({ activeToken: token, hoverSource: token ? source : null }),
  setScrubDelta: (token, delta) =>
    set({ scrubbingToken: token, scrubDelta: delta }),
  updatePulse: (time) =>
    set({ pulsePhase: (Math.sin(time * 0.006) + 1) / 2 }),
}));

/**
 * High-performance Canvas2D helper to draw formula-anchored glowing elements
 */
export function drawGlowAnchor(
  ctx: CanvasRenderingContext2D,
  token: string,
  targetToken: string | null,
  baseColor: string,
  pulsePhase: number,
  drawShape: (alpha: number, scale: number) => void
) {
  const isTargeted = token === targetToken;

  if (isTargeted) {
    ctx.save();
    // 1. Exterior diffuse blooming halo
    ctx.shadowColor = baseColor;
    ctx.shadowBlur = 16 + 12 * pulsePhase;
    drawShape(0.35 + 0.35 * pulsePhase, 1.0 + 0.08 * pulsePhase);

    // 2. Focused core bright perimeter
    ctx.shadowBlur = 6;
    drawShape(1.0, 1.0);
    ctx.restore();
  } else if (targetToken !== null) {
    // Soft dimming of unrelated geometric elements (Distill focus effect)
    ctx.save();
    ctx.globalAlpha = 0.25;
    drawShape(0.25, 1.0);
    ctx.restore();
  } else {
    // Default crisp render
    drawShape(1.0, 1.0);
  }
}

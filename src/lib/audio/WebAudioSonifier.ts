// Web Audio Parameter Sonifier & Continuous Loss Acoustic Mapping
// Designed for real-time auditory feedback during optimization, regression, and clustering

export class WebAudioSonifier {
  private ctx: AudioContext | null = null;
  private osc: OscillatorNode | null = null;
  private subOsc: OscillatorNode | null = null;
  private filter: BiquadFilterNode | null = null;
  private gainNode: GainNode | null = null;
  private compressor: DynamicsCompressorNode | null = null;
  private isMuted = false;
  private isActive = false;

  private initContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  // Continuous drone is disabled to prevent auditory fatigue and headaches
  public startContinuousSonification() {
    this.stopContinuousSonification();
  }

  public updateLoss(_loss: number, _minLoss = 0.01, _maxLoss = 20.0) {
    // Continuous acoustic drone disabled
  }

  public stopContinuousSonification() {
    if (!this.isActive) return;
    try {
      this.osc?.stop();
      this.subOsc?.stop();
      this.osc?.disconnect();
      this.subOsc?.disconnect();
    } catch {
      // Ignore cleanup error
    }
    this.osc = null;
    this.subOsc = null;
    this.isActive = false;
  }

  // Gentle, subtle 15ms step tick for tactile user feedback without continuous drone
  public playStepTick() {
    const ctx = this.initContext();
    if (!ctx || this.isMuted) return;
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(540, now);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.02);

      gain.gain.setValueAtTime(0.02, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.02);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.02);
    } catch {
      // Audio node playback safely handled
    }
  }

  // Consonant Major Triad Arpeggio on Convergence: C5, E5, G5, C6
  public playConvergenceChime() {
    const ctx = this.initContext();
    if (!ctx || this.isMuted) return;

    this.stopContinuousSonification();

    const now = ctx.currentTime;
    const notes = [523.25, 654.06, 784.88, 1046.5];

    notes.forEach((freq, idx) => {
      try {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        const start = now + idx * 0.045;
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.001, start);
        gain.gain.linearRampToValueAtTime(0.08, start + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.42);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(start);
        osc.stop(start + 0.42);
      } catch (_err) {
        // Audio node playback error ignored in background
      }
    });
  }

  // Dissonant Tritone Divergence Alarm
  public playDivergenceAlarm() {
    const ctx = this.initContext();
    if (!ctx || this.isMuted) return;

    this.stopContinuousSonification();

    const now = ctx.currentTime;
    const frequencies = [185.0, 196.0, 261.63]; // F#3, G3, C4 clash

    frequencies.forEach((freq) => {
      try {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.32);
      } catch (_err) {
        // Alarm node error ignored in background
      }
    });
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.isMuted) this.stopContinuousSonification();
    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }
}

export const sonifier = new WebAudioSonifier();

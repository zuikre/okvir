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

  public startContinuousSonification() {
    if (this.isActive || this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;

      // Dynamics Compressor (safety limiter)
      this.compressor = ctx.createDynamicsCompressor();
      this.compressor.threshold.setValueAtTime(-12, now);
      this.compressor.knee.setValueAtTime(8, now);
      this.compressor.ratio.setValueAtTime(12, now);
      this.compressor.attack.setValueAtTime(0.003, now);
      this.compressor.release.setValueAtTime(0.15, now);
      this.compressor.connect(ctx.destination);

      // Master Envelope Gain
      this.gainNode = ctx.createGain();
      this.gainNode.gain.setValueAtTime(0.0001, now);
      this.gainNode.gain.exponentialRampToValueAtTime(0.06, now + 0.04);
      this.gainNode.connect(this.compressor);

      // Low-pass Filter with gentle resonance
      this.filter = ctx.createBiquadFilter();
      this.filter.type = 'lowpass';
      this.filter.Q.setValueAtTime(1.8, now);
      this.filter.frequency.setValueAtTime(350, now);
      this.filter.connect(this.gainNode);

      // Primary Voice: Triangle wave (warm analog timbre)
      this.osc = ctx.createOscillator();
      this.osc.type = 'triangle';
      this.osc.frequency.setValueAtTime(220, now);
      this.osc.connect(this.filter);
      this.osc.start();

      // Sub Voice: Sine wave 1 octave lower for foundation
      this.subOsc = ctx.createOscillator();
      this.subOsc.type = 'sine';
      this.subOsc.frequency.setValueAtTime(110, now);
      this.subOsc.connect(this.filter);
      this.subOsc.start();

      this.isActive = true;
    } catch {
      // Audio context restricted by browser policy until user gesture
    }
  }

  public updateLoss(loss: number, minLoss = 0.01, maxLoss = 20.0) {
    if (!this.isActive || !this.ctx || !this.osc || !this.subOsc || !this.filter) return;

    const ctx = this.ctx;
    const now = ctx.currentTime;

    // Logarithmic curve mapping human perception
    const beta = 2.0;
    const clampedLoss = Math.max(minLoss, Math.min(loss, maxLoss));
    const norm = Math.min(
      1.0,
      Math.max(
        0.0,
        (Math.log(1 + beta * clampedLoss) - Math.log(1 + beta * minLoss)) /
          (Math.log(1 + beta * maxLoss) - Math.log(1 + beta * minLoss))
      )
    );

    // Map 130 Hz (calm converged bass) to 840 Hz (high tension)
    const baseFreq = 130;
    const maxFreq = 840;
    const targetFreq = baseFreq * Math.pow(maxFreq / baseFreq, norm);
    const filterFreq = Math.min(targetFreq * 2.6, 2800);

    // Smooth exponential ramp (prevents zipper noise)
    this.osc.frequency.setTargetAtTime(targetFreq, now, 0.03);
    this.subOsc.frequency.setTargetAtTime(targetFreq * 0.5, now, 0.03);
    this.filter.frequency.setTargetAtTime(filterFreq, now, 0.03);
  }

  public stopContinuousSonification() {
    if (!this.isActive || !this.ctx || !this.gainNode) return;
    const now = this.ctx.currentTime;
    try {
      this.gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);
      setTimeout(() => {
        try {
          this.osc?.stop();
          this.subOsc?.stop();
          this.osc?.disconnect();
          this.subOsc?.disconnect();
        } catch {}
        this.osc = null;
        this.subOsc = null;
        this.isActive = false;
      }, 50);
    } catch {
      this.isActive = false;
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
      } catch {}
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
      } catch {}
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

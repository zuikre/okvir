// Unified Procedural Web Audio Engine & Micro-Haptics
// Inspired by Teenage Engineering & Psychoacoustic Instrument Design
// 100% Offline • Zero external audio assets • Pure mathematical waveforms
// Consolidated master bus with voice pooling, dynamic limiter & anti-clipping

export interface AudioEngineConfig {
  soundEnabled: boolean;
  masterVolume: number; // 0.0 to 1.0
  hapticsEnabled: boolean;
}

export class ProceduralAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private limiter: DynamicsCompressorNode | null = null;

  // Continuous Sonification Nodes
  private continuousOsc: OscillatorNode | null = null;
  private continuousSubOsc: OscillatorNode | null = null;
  private continuousFilter: BiquadFilterNode | null = null;
  private continuousGain: GainNode | null = null;
  private isContinuousActive = false;

  // Execution Hum Nodes (WASM computation / training drone)
  private humGain: GainNode | null = null;
  private humOsc1: OscillatorNode | null = null;
  private humOsc2: OscillatorNode | null = null;
  private humFilter: BiquadFilterNode | null = null;
  private isHumming = false;

  private isMuted = false;
  private lastTickTime = 0;
  private isUnlocked = false;

  public unlock(): void {
    if (typeof window === 'undefined') return;
    const ctx = this.init();
    if (!ctx) return;
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }
    if (!this.isUnlocked) {
      try {
        const buffer = ctx.createBuffer(1, 1, 22050);
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.connect(ctx.destination);
        source.start(0);
        this.isUnlocked = true;
      } catch {}
    }
  }

  private init(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return null;
      this.ctx = new AudioCtx();

      // Master Safety Limiter & Anti-Clipping Bus
      this.limiter = this.ctx.createDynamicsCompressor();
      this.limiter.threshold.setValueAtTime(-6, this.ctx.currentTime);
      this.limiter.knee.setValueAtTime(6, this.ctx.currentTime);
      this.limiter.ratio.setValueAtTime(16, this.ctx.currentTime);
      this.limiter.attack.setValueAtTime(0.002, this.ctx.currentTime);
      this.limiter.release.setValueAtTime(0.12, this.ctx.currentTime);
      this.limiter.connect(this.ctx.destination);

      // Master Gain
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.85, this.ctx.currentTime);
      this.masterGain.connect(this.limiter);

      // Global User Gesture Unlocker for WebKitGTK / Safari
      const unlockEvents = ['pointerdown', 'keydown', 'click', 'touchstart'];
      const onFirstGesture = () => {
        this.unlock();
        if (this.ctx && this.ctx.state === 'running') {
          unlockEvents.forEach((evt) => window.removeEventListener(evt, onFirstGesture));
        }
      };
      unlockEvents.forEach((evt) => window.addEventListener(evt, onFirstGesture, { passive: true }));
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  private ensureRunning(callback: (ctx: AudioContext) => void) {
    if (this.isMuted) return;
    const ctx = this.init();
    if (!ctx || !this.masterGain) return;

    if (ctx.state === 'suspended') {
      ctx.resume().then(() => {
        callback(ctx);
      }).catch(() => {
        callback(ctx);
      });
      return;
    }
    callback(ctx);
  }

  // 1. TACTILE MICRO-SWITCH CLICK (Buttons, Toggles)
  // Transient Dirac pulse approximation: 25ms downward sweep
  public playClick(pitchMultiplier = 1.0) {
    this.ensureRunning((ctx) => {
      try {
        const now = ctx.currentTime + 0.005;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        const startFreq = 1600 * pitchMultiplier;
        const endFreq = 320 * pitchMultiplier;

        osc.frequency.setValueAtTime(startFreq, now);
        osc.frequency.exponentialRampToValueAtTime(endFreq, now + 0.025);

        gain.gain.setValueAtTime(0.35, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.025);

        osc.connect(gain);
        gain.connect(this.masterGain!);

        osc.start(now);
        osc.stop(now + 0.025);
        this.triggerHaptic(8);
      } catch {}
    });
  }

  // 2. PHYSICAL DIAL SCRUB TICK (Rotary Encoders, Sliders, Timeline Scrubbing)
  // Velocity-damped 6ms pulse with anti-chattering threshold
  public playScrubTick(velocity = 1.0) {
    this.ensureRunning((ctx) => {
      const now = ctx.currentTime + 0.005;
      // Chattering prevention: minimum 18ms between scrub ticks
      if (now - this.lastTickTime < 0.018) return;
      this.lastTickTime = now;

      try {
        const osc = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();

        // Pitch dynamically scales with scrub velocity (800Hz to 2200Hz)
        const clampedVel = Math.max(0.5, Math.min(3.0, velocity));
        const centerFreq = 1100 * clampedVel;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(centerFreq, now);
        osc.frequency.exponentialRampToValueAtTime(centerFreq * 0.4, now + 0.007);

        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(centerFreq, now);
        filter.Q.setValueAtTime(3.0, now);

        gain.gain.setValueAtTime(0.12 * Math.min(clampedVel, 1.4), now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.007);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain!);

        osc.start(now);
        osc.stop(now + 0.007);
        this.triggerHaptic(4);
      } catch {}
    });
  }

  // 3. ERROR DISSONANCE (Constraint Violation, Divergence, Out of Bounds)
  // Tritone clash (diminished 5th) + metallic ring modulation + low thud
  public playErrorDissonance() {
    this.ensureRunning((ctx) => {
      try {
        const now = ctx.currentTime + 0.005;
        // Dissonant Cluster: F#3 (185 Hz), G3 (196 Hz), C4 (261.63 Hz)
        const freqs = [185.0, 196.0, 261.63];

        freqs.forEach((freq) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(freq, now);
          osc.frequency.exponentialRampToValueAtTime(freq * 0.85, now + 0.28);

          gain.gain.setValueAtTime(0.12, now);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);

          osc.connect(gain);
          gain.connect(this.masterGain!);

          osc.start(now);
          osc.stop(now + 0.28);
        });

        // Low frequency sub-thud (boundary impact)
        const subOsc = ctx.createOscillator();
        const subGain = ctx.createGain();
        subOsc.type = 'sine';
        subOsc.frequency.setValueAtTime(90, now);
        subOsc.frequency.exponentialRampToValueAtTime(35, now + 0.15);
        subGain.gain.setValueAtTime(0.2, now);
        subGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);
        subOsc.connect(subGain);
        subGain.connect(this.masterGain!);
        subOsc.start(now);
        subOsc.stop(now + 0.15);

        this.triggerHaptic([25, 40, 30]);
      } catch {}
    });
  }

  // Subtle error tick for backwards compatibility
  public playErrorTick() {
    this.playErrorDissonance();
  }

  // 4. COMPUTATION / EXECUTION HUM (Autograd forward/backward, Code Run)
  // Dual-oscillator analog transformer hum with gentle resonant lowpass sweep
  public startExecutionHum() {
    if (this.isHumming || this.isMuted) return;
    const ctx = this.init();
    if (!ctx || !this.masterGain) return;

    try {
      const now = ctx.currentTime;
      this.humGain = ctx.createGain();
      this.humGain.gain.setValueAtTime(0.0001, now);
      this.humGain.gain.exponentialRampToValueAtTime(0.07, now + 0.08);

      this.humFilter = ctx.createBiquadFilter();
      this.humFilter.type = 'lowpass';
      this.humFilter.frequency.setValueAtTime(180, now);
      this.humFilter.Q.setValueAtTime(2.5, now);

      // 55 Hz (A1) fundamental + 110 Hz harmonic with slight detune
      this.humOsc1 = ctx.createOscillator();
      this.humOsc1.type = 'triangle';
      this.humOsc1.frequency.setValueAtTime(55, now);

      this.humOsc2 = ctx.createOscillator();
      this.humOsc2.type = 'sawtooth';
      this.humOsc2.frequency.setValueAtTime(110.4, now); // 0.4 Hz chorus beating

      this.humOsc1.connect(this.humFilter);
      this.humOsc2.connect(this.humFilter);
      this.humFilter.connect(this.humGain);
      this.humGain.connect(this.masterGain);

      this.humOsc1.start();
      this.humOsc2.start();
      this.isHumming = true;
    } catch {}
  }

  public stopExecutionHum() {
    if (!this.isHumming || !this.ctx || !this.humGain) return;
    const now = this.ctx.currentTime;
    try {
      this.humGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);
      setTimeout(() => {
        try {
          this.humOsc1?.stop();
          this.humOsc2?.stop();
          this.humOsc1?.disconnect();
          this.humOsc2?.disconnect();
        } catch {}
        this.humOsc1 = null;
        this.humOsc2 = null;
        this.isHumming = false;
      }, 70);
    } catch {
      this.isHumming = false;
    }
  }

  // 5. VICTORY HARMONICS & FM CHIME (Concept Mastered, Tests Passed)
  // Chowning FM bell synthesis: inharmonic carrier/modulator ratio + Major 9th shimmer
  public playVictoryHarmonics() {
    this.ensureRunning((ctx) => {
      try {
        const now = ctx.currentTime + 0.005;
        // Radiant Lydian/Major 9th Chord: C5 (523.25), E5 (659.25), G5 (783.99), B5 (987.77), D6 (1174.66)
        const chord = [523.25, 659.25, 783.99, 987.77, 1174.66];

        chord.forEach((freq, idx) => {
          const start = now + idx * 0.055;

          // Carrier
          const carrier = ctx.createOscillator();
          carrier.type = 'sine';
          carrier.frequency.setValueAtTime(freq, start);

          // Modulator (FM synthesis for metallic crystal chime)
          const modulator = ctx.createOscillator();
          const modGain = ctx.createGain();
          modulator.type = 'sine';
          // Inharmonic bell ratio 1 : 2.756
          modulator.frequency.setValueAtTime(freq * 2.756, start);
          modGain.gain.setValueAtTime(freq * 0.8, start);
          modGain.gain.exponentialRampToValueAtTime(0.01, start + 0.35);

          modulator.connect(modGain);
          modGain.connect(carrier.frequency);

          // Note Envelope
          const noteGain = ctx.createGain();
          noteGain.gain.setValueAtTime(0.0001, start);
          noteGain.gain.linearRampToValueAtTime(0.14 / (idx * 0.3 + 1), start + 0.01);
          noteGain.gain.exponentialRampToValueAtTime(0.0001, start + 0.65);

          carrier.connect(noteGain);
          noteGain.connect(this.masterGain!);

          modulator.start(start);
          carrier.start(start);
          modulator.stop(start + 0.65);
          carrier.stop(start + 0.65);
        });

        this.triggerHaptic([15, 30, 20, 45, 60]);
      } catch {}
    });
  }

  // Rosewood marimba chord / beat completion harmonic chime
  public playSuccessChime() {
    this.playVictoryHarmonics();
  }

  public playSuccess() {
    this.playVictoryHarmonics();
  }

  public playWarning() {
    this.playErrorDissonance();
  }

  public playConvergenceChime() {
    this.playVictoryHarmonics();
  }

  public playDivergenceAlarm() {
    this.playErrorDissonance();
  }

  public playFanfare() {
    this.playVictoryHarmonics();
  }

  // 6. CONTINUOUS LOSS SONIFICATION (Gradient Descent, OLS Parameter Tuning)
  public startContinuousLoss() {
    if (this.isContinuousActive || this.isMuted) return;
    const ctx = this.init();
    if (!ctx || !this.masterGain) return;

    try {
      const now = ctx.currentTime;
      this.continuousGain = ctx.createGain();
      this.continuousGain.gain.setValueAtTime(0.0001, now);
      this.continuousGain.gain.exponentialRampToValueAtTime(0.06, now + 0.04);
      this.continuousGain.connect(this.masterGain);

      this.continuousFilter = ctx.createBiquadFilter();
      this.continuousFilter.type = 'lowpass';
      this.continuousFilter.Q.setValueAtTime(1.8, now);
      this.continuousFilter.frequency.setValueAtTime(350, now);
      this.continuousFilter.connect(this.continuousGain);

      this.continuousOsc = ctx.createOscillator();
      this.continuousOsc.type = 'triangle';
      this.continuousOsc.frequency.setValueAtTime(220, now);
      this.continuousOsc.connect(this.continuousFilter);
      this.continuousOsc.start();

      this.continuousSubOsc = ctx.createOscillator();
      this.continuousSubOsc.type = 'sine';
      this.continuousSubOsc.frequency.setValueAtTime(110, now);
      this.continuousSubOsc.connect(this.continuousFilter);
      this.continuousSubOsc.start();

      this.isContinuousActive = true;
    } catch {}
  }

  public startContinuousSonification() {
    this.startContinuousLoss();
  }

  public updateLoss(loss: number, minLoss = 0.01, maxLoss = 20.0) {
    if (
      !this.isContinuousActive ||
      !this.ctx ||
      !this.continuousOsc ||
      !this.continuousSubOsc ||
      !this.continuousFilter
    )
      return;

    const now = this.ctx.currentTime;
    const beta = 2.0;
    const clamped = Math.max(minLoss, Math.min(loss, maxLoss));
    const norm = Math.min(
      1.0,
      Math.max(
        0.0,
        (Math.log(1 + beta * clamped) - Math.log(1 + beta * minLoss)) /
          (Math.log(1 + beta * maxLoss) - Math.log(1 + beta * minLoss))
      )
    );

    const baseFreq = 130;
    const maxFreq = 840;
    const targetFreq = baseFreq * Math.pow(maxFreq / baseFreq, norm);
    const filterFreq = Math.min(targetFreq * 2.6, 2800);

    this.continuousOsc.frequency.setTargetAtTime(targetFreq, now, 0.03);
    this.continuousSubOsc.frequency.setTargetAtTime(targetFreq * 0.5, now, 0.03);
    this.continuousFilter.frequency.setTargetAtTime(filterFreq, now, 0.03);
  }

  public stopContinuousLoss() {
    if (!this.isContinuousActive || !this.ctx || !this.continuousGain) return;
    const now = this.ctx.currentTime;
    try {
      this.continuousGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);
      setTimeout(() => {
        try {
          this.continuousOsc?.stop();
          this.continuousSubOsc?.stop();
          this.continuousOsc?.disconnect();
          this.continuousSubOsc?.disconnect();
        } catch {}
        this.continuousOsc = null;
        this.continuousSubOsc = null;
        this.isContinuousActive = false;
      }, 50);
    } catch {
      this.isContinuousActive = false;
    }
  }

  public stopContinuousSonification() {
    this.stopContinuousLoss();
  }

  public setMuted(muted: boolean): void {
    this.isMuted = muted;
    if (this.isMuted) {
      this.stopContinuousLoss();
      this.stopExecutionHum();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopContinuousLoss();
      this.stopExecutionHum();
    }
    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  private triggerHaptic(pattern: number | number[]) {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(pattern);
      } catch {}
    }
  }
}

export const proceduralAudio = new ProceduralAudioEngine();
export const audio = proceduralAudio;
export const sonifier = proceduralAudio;

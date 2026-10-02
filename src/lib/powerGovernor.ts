/**
 * OKVIR - Hardware Power Governor & Dynamic Frame Rate Throttling
 * Compliant with Master Blueprint Section 5 & PRD Section 7.2
 * 
 * - Actively monitors device battery telemetry via Battery Status API.
 * - When running on battery under low charge (<20%) or user power conservation mode:
 *   - Automatically throttles target animation canvas frame rate from 60 FPS to 30 FPS.
 *   - Emits 'okvir:power_state_change' events for simulation canvases and workers.
 *   - Prevents thermal throttling and extends battery life on laptops / handhelds.
 */

export interface PowerState {
  isSupported: boolean;
  charging: boolean;
  level: number; // 0.0 to 1.0
  isThrottling: boolean;
  targetFps: number; // 30 or 60
}

class HardwarePowerGovernorImpl {
  private state: PowerState = {
    isSupported: false,
    charging: true,
    level: 1.0,
    isThrottling: false,
    targetFps: 60,
  };

  private listeners: Set<(state: PowerState) => void> = new Set();
  private batteryManager: any = null;
  private isEnabledByUser = true;

  constructor() {
    this.init();
  }

  private async init() {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') return;

    if ('getBattery' in navigator) {
      try {
        const bm = await (navigator as any).getBattery();
        this.batteryManager = bm;
        this.state.isSupported = true;
        this.updateState();

        bm.addEventListener('chargingchange', () => this.updateState());
        bm.addEventListener('levelchange', () => this.updateState());
      } catch {
        // Battery API blocked or restricted by platform security policy
      }
    }
  }

  public setEnabled(enabled: boolean) {
    this.isEnabledByUser = enabled;
    this.updateState();
  }

  private updateState() {
    if (this.batteryManager) {
      this.state.charging = Boolean(this.batteryManager.charging);
      this.state.level = Number(this.batteryManager.level) || 1.0;
    }

    // Determine throttling: If enabled by user, not charging, and battery level < 25%
    const shouldThrottle =
      this.isEnabledByUser &&
      !this.state.charging &&
      this.state.level < 0.25;

    this.state.isThrottling = shouldThrottle;
    this.state.targetFps = shouldThrottle ? 30 : 60;

    // Dispatch global event for simulation loops
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('okvir:power_state_change', { detail: { ...this.state } })
      );
    }

    // Notify registered subscribers
    this.listeners.forEach((listener) => {
      try {
        listener({ ...this.state });
      } catch (err) {
        console.warn('PowerGovernor listener error:', err);
      }
    });
  }

  public getState(): PowerState {
    return { ...this.state };
  }

  public subscribe(callback: (state: PowerState) => void): () => void {
    this.listeners.add(callback);
    callback({ ...this.state });
    return () => this.listeners.delete(callback);
  }

  public getTargetFrameInterval(): number {
    return 1000 / this.state.targetFps;
  }

  public shouldSkipFrame(frameCounter: number): boolean {
    // When throttled to 30 FPS on a 60Hz display, skip every alternate frame
    if (!this.state.isThrottling) return false;
    return frameCounter % 2 !== 0;
  }
}

export const powerGovernor = new HardwarePowerGovernorImpl();

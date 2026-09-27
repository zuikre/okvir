/**
 * OKVIR (إطار) - Native Rust Engine (Tauri v2) Typed IPC Bridge
 * Provides typed wrappers for desktop window vibrancy, SQLite WAL queries,
 * chunk signature verification, and battery-aware power governor.
 */

export interface UserProfileDTO {
  id: string;
  username: string;
  preferred_language: 'en' | 'ar';
  preferred_theme: 'dark' | 'light';
  xp: number;
  streak_days: number;
  longest_streak: number;
  streak_freezes_remaining: number;
  last_active_date: string | null;
}

export interface FsrsCardDTO {
  card_id: string;
  concept_id: string;
  stability: number;
  difficulty: number;
  reps: number;
  lapses: number;
  state: number;
  last_review: string | null;
  due_date: string;
}

export interface SubmissionPayload {
  challenge_id: string;
  lesson_id: string;
  submitted_code: string;
  passed_tests: boolean;
  execution_time_ms: number;
  memory_used_bytes: number;
}

export interface ChunkVerificationResult {
  valid: boolean;
  chunk_id: string;
  sha256: string;
}

export interface BatteryState {
  charging: boolean;
  level: number;
  recommendedFps: 30 | 60;
}

interface TauriGlobal {
  __TAURI__?: {
    core: {
      invoke: <T>(cmd: string, args?: Record<string, unknown>) => Promise<T>;
    };
  };
}

class TauriBridge {
  private isTauriAvailable(): boolean {
    return typeof window !== 'undefined' && '__TAURI_INTERNALS__' in window;
  }

  private getTauri() {
    return (window as unknown as TauriGlobal).__TAURI__;
  }

  async getUserProfile(): Promise<UserProfileDTO> {
    const tauri = this.getTauri();
    if (this.isTauriAvailable() && tauri?.core) {
      return tauri.core.invoke<UserProfileDTO>('get_user_profile');
    }
    return {
      id: 'local-explorer',
      username: 'Explorer',
      preferred_language: 'en',
      preferred_theme: 'dark',
      xp: 0,
      streak_days: 0,
      longest_streak: 0,
      streak_freezes_remaining: 2,
      last_active_date: new Date().toISOString(),
    };
  }

  async completeLesson(lessonId: string, timeSpentSeconds: number): Promise<boolean> {
    const tauri = this.getTauri();
    if (this.isTauriAvailable() && tauri?.core) {
      return tauri.core.invoke<boolean>('complete_lesson', { lessonId, timeSpentSeconds });
    }
    return true;
  }

  async getDueFsrsCards(): Promise<FsrsCardDTO[]> {
    const tauri = this.getTauri();
    if (this.isTauriAvailable() && tauri?.core) {
      return tauri.core.invoke<FsrsCardDTO[]>('get_due_fsrs_cards');
    }
    return [];
  }

  async recordSubmission(payload: SubmissionPayload): Promise<boolean> {
    const tauri = this.getTauri();
    if (this.isTauriAvailable() && tauri?.core) {
      return tauri.core.invoke<boolean>('record_submission', { payload });
    }
    return true;
  }

  async verifyChunkSignature(chunkId: string, archiveBytes: Uint8Array): Promise<ChunkVerificationResult> {
    const tauri = this.getTauri();
    if (this.isTauriAvailable() && tauri?.core) {
      return tauri.core.invoke<ChunkVerificationResult>('verify_chunk_signature', { chunkId, archiveBytes });
    }
    return { valid: true, chunk_id: chunkId, sha256: 'mock-ed25519-valid' };
  }

  async getBatteryState(): Promise<BatteryState> {
    if (typeof navigator !== 'undefined' && 'getBattery' in navigator) {
      try {
        const battery = await (navigator as unknown as { getBattery: () => Promise<{ charging: boolean; level: number }> }).getBattery();
        return {
          charging: battery.charging,
          level: battery.level,
          recommendedFps: !battery.charging && battery.level < 0.2 ? 30 : 60,
        };
      } catch {
        // Battery status API unavailable or denied
      }
    }
    return { charging: true, level: 1.0, recommendedFps: 60 };
  }
}

export const tauriBridge = new TauriBridge();

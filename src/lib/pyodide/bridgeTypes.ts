/**
 * OKVIR (إطار) - Reactive WASM Code-to-Canvas Bridge Protocol
 * Types for zero-copy Transferable ArrayBuffers, Variable Inspector, and Pyodide Worker
 */

export type TensorDtype = 'float32' | 'float64' | 'int32' | 'uint8' | 'uint8_clamped';

export interface TensorPayload {
  name: string;
  shape: number[];
  dtype: TensorDtype;
  buffer: ArrayBuffer;
  metadata?: Record<string, unknown>;
}

export interface VariableDescriptor {
  name: string;
  type: string;
  shape?: number[];
  dtype?: string;
  sizeBytes: number;
  hasNaN: boolean;
  hasInf: boolean;
  minVal?: number;
  maxVal?: number;
  preview?: string;
}

export interface WasmMemoryStats {
  heapUsedBytes: number;
  heapTotalBytes: number;
  maxBudgetBytes: number;
}

// Host -> Worker Messages
export type HostToWorkerMessage =
  | { type: 'INIT_KERNEL'; sab?: SharedArrayBuffer }
  | {
      type: 'EXECUTE_CODE';
      id: string;
      code: string;
      challengeId?: string;
      testCases?: Array<{ input: string; expected: string }>;
    }
  | { type: 'UPDATE_VARIABLE'; name: string; value: unknown }
  | { type: 'REQUEST_INSPECTION' }
  | { type: 'INTERRUPT'; id?: string }
  // Legacy payload support
  | {
      id: string;
      type: 'EXECUTE' | 'INTERRUPT';
      code: string;
      challengeId?: string;
      testCases?: Array<{ input: string; expected: string }>;
      interruptBuffer?: SharedArrayBuffer;
    };

// Worker -> Host Messages
export type WorkerToHostMessage =
  | { type: 'KERNEL_READY' }
  | {
      type: 'EXECUTION_RESULT';
      id: string;
      success: boolean;
      stdout: string[];
      error?: string;
      executionTimeMs: number;
      memoryUsedBytes: number;
    }
  | { type: 'TENSOR_FRAME'; payload: TensorPayload }
  | { type: 'INSPECTOR_UPDATE'; variables: VariableDescriptor[]; memory: WasmMemoryStats }
  | { type: 'CANVAS_IMAGE_FRAME'; width: number; height: number; buffer: ArrayBuffer }
  // Legacy response format
  | {
      id: string;
      success: boolean;
      output: string[];
      executionTimeMs: number;
      memoryUsedBytes: number;
      plotImageBase64?: string;
      error?: string;
    };

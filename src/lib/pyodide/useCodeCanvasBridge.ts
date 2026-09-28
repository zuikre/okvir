import { useEffect, useRef, useState, useCallback } from 'react';
import type {
  TensorPayload,
  VariableDescriptor,
  WasmMemoryStats,
  WorkerToHostMessage,
} from './bridgeTypes';

export interface UseCodeCanvasBridgeReturn {
  isReady: boolean;
  isRunning: boolean;
  tensors: Record<string, TensorPayload>;
  variables: VariableDescriptor[];
  memory: WasmMemoryStats | null;
  logs: string[];
  executionTimeMs: number;
  lastSuccess: boolean | null;
  runCode: (
    code: string,
    challengeId?: string,
    testCases?: Array<{ input: string; expected: string }>
  ) => void;
  interrupt: () => void;
  clearLogs: () => void;
}

export function useCodeCanvasBridge(): UseCodeCanvasBridgeReturn {
  const workerRef = useRef<Worker | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [tensors, setTensors] = useState<Record<string, TensorPayload>>({});
  const [variables, setVariables] = useState<VariableDescriptor[]>([]);
  const [memory, setMemory] = useState<WasmMemoryStats | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [executionTimeMs, setExecutionTimeMs] = useState(0);
  const [lastSuccess, setLastSuccess] = useState<boolean | null>(null);

  useEffect(() => {
    let worker: Worker | null = null;
    try {
      worker = new Worker(
        new URL('../../workers/PyodideKernelWorker.ts', import.meta.url),
        { type: 'module' }
      );
      workerRef.current = worker;

      worker.onmessage = (e: MessageEvent<WorkerToHostMessage>) => {
        const msg = e.data;

        // Structured message protocol
        if ('type' in msg) {
          switch (msg.type) {
            case 'KERNEL_READY':
              setIsReady(true);
              break;

            case 'EXECUTION_RESULT':
              setIsRunning(false);
              setExecutionTimeMs(msg.executionTimeMs);
              setLastSuccess(msg.success);
              if (msg.stdout && msg.stdout.length > 0) {
                setLogs(msg.stdout);
              }
              break;

            case 'TENSOR_FRAME':
              setTensors((prev) => ({
                ...prev,
                [msg.payload.name]: msg.payload,
              }));
              break;

            case 'INSPECTOR_UPDATE':
              setVariables(msg.variables);
              setMemory(msg.memory);
              break;
          }
        } else if ('success' in msg) {
          // Legacy message format support
          setIsRunning(false);
          setLastSuccess(msg.success);
          setExecutionTimeMs(msg.executionTimeMs);
          if (msg.output) {
            setLogs(msg.output);
          }
        }
      };

      worker.postMessage({ type: 'INIT_KERNEL' });
    } catch {
      // Worker initialization fallback
    }

    return () => {
      if (worker) {
        worker.terminate();
        workerRef.current = null;
      }
    };
  }, []);

  const runCode = useCallback(
    (
      code: string,
      challengeId?: string,
      testCases?: Array<{ input: string; expected: string }>
    ) => {
      if (!workerRef.current) return;
      setIsRunning(true);
      const id = `exec-${Date.now()}`;
      workerRef.current.postMessage({
        type: 'EXECUTE_CODE',
        id,
        code,
        challengeId,
        testCases,
      });
    },
    []
  );

  const interrupt = useCallback(() => {
    if (!workerRef.current) return;
    workerRef.current.postMessage({ type: 'INTERRUPT' });
    setIsRunning(false);
  }, []);

  const clearLogs = useCallback(() => {
    setLogs([]);
  }, []);

  return {
    isReady,
    isRunning,
    tensors,
    variables,
    memory,
    logs,
    executionTimeMs,
    lastSuccess,
    runCode,
    interrupt,
    clearLogs,
  };
}

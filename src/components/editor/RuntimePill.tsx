import React, { useState } from 'react';
import { Cpu, Zap, ChevronDown } from 'lucide-react';
import { useOkvirStore } from '@/lib/store';
import { QuickPickEnvironmentModal } from './QuickPickEnvironmentModal';

interface RuntimePillProps {
  isRunning?: boolean;
}

export const RuntimePill: React.FC<RuntimePillProps> = ({ isRunning = false }) => {
  const { activeToolchainId, setActiveToolchain } = useOkvirStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isWasm = activeToolchainId === 'python-wasm';
  const label = isWasm
    ? 'Pyodide (WASM)'
    : activeToolchainId === 'javascript'
    ? 'Node.js (Native)'
    : activeToolchainId === 'c'
    ? 'GCC Compiler'
    : activeToolchainId === 'rust'
    ? 'Rustc 1.75'
    : 'Python 3.12 (Native)';

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-hover)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-xs font-mono transition-all select-none"
        title="Click to switch compiler or runtime environment"
      >
        {isWasm ? (
          <Zap className="w-3.5 h-3.5 text-[var(--math-gradient)] shrink-0" />
        ) : (
          <Cpu className="w-3.5 h-3.5 text-[var(--math-data)] shrink-0" />
        )}

        <span className="font-medium text-[var(--text-primary)]">{label}</span>

        {isRunning ? (
          <span className="w-2 h-2 rounded-full bg-[var(--math-data)] animate-pulse" />
        ) : (
          <span className="w-2 h-2 rounded-full bg-[var(--math-vector)]" />
        )}

        <ChevronDown className="w-3 h-3 text-[var(--text-tertiary)] ml-0.5" />
      </button>

      <QuickPickEnvironmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        activeToolchainId={activeToolchainId}
        onSelectToolchain={setActiveToolchain}
      />
    </>
  );
};

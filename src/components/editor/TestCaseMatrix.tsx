import React, { useState } from 'react';
import { CheckCircle2, XCircle, Terminal, Check, Copy, Layers } from 'lucide-react';
import { useOkvirStore } from '@/lib/store';
import { tr } from '@/lib/i18n';
import type { TestCase } from '@/lib/types';

interface TestCaseMatrixProps {
  testCases: TestCase[];
  stdoutLines: string[];
  passed: boolean | null;
  isRunning: boolean;
  runtimeUsed?: string;
  executionTimeMs?: number;
}

export const TestCaseMatrix: React.FC<TestCaseMatrixProps> = ({
  testCases,
  stdoutLines,
  passed,
  isRunning: _isRunning,
  runtimeUsed,
  executionTimeMs,
}) => {
  const { language } = useOkvirStore();
  const [activeTab, setActiveTab] = useState<'tests' | 'console'>('tests');
  const [copied, setCopied] = useState(false);

  const handleCopyLogs = () => {
    navigator.clipboard.writeText(stdoutLines.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const passedCount = passed === true ? testCases.length : passed === false ? Math.max(0, testCases.length - 1) : 0;

  return (
    <div className="flex flex-col bg-[var(--bg-app)] border-t border-[var(--border-subtle)] text-xs select-none">
      {/* Tab Navigation Header */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-[var(--bg-surface)] border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setActiveTab('tests')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded transition-colors text-xs ${
              activeTab === 'tests'
                ? 'bg-[var(--bg-surface-active)] text-[var(--text-primary)] font-semibold'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{tr('testCases', language)}</span>
            {testCases.length > 0 && (
              <span
                className={`ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                  passed === true
                    ? 'bg-[var(--bg-surface-active)] text-[var(--math-vector)]'
                    : passed === false
                    ? 'bg-[var(--bg-surface-active)] text-[var(--math-loss)]'
                    : 'bg-[var(--bg-surface-active)] text-[var(--text-tertiary)]'
                }`}
              >
                {passedCount}/{testCases.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('console')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded transition-colors text-xs ${
              activeTab === 'console'
                ? 'bg-[var(--bg-surface-active)] text-[var(--text-primary)] font-semibold'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>{tr('consoleLogs', language)}</span>
            {stdoutLines.length > 0 && (
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--math-data)]" />
            )}
          </button>
        </div>

        {/* Runtime & Telemetry */}
        <div className="flex items-center gap-2 text-[11px] text-[var(--text-tertiary)] font-sans">
          {runtimeUsed && (
            <span className="px-2 py-0.5 rounded bg-[var(--bg-surface-active)] border border-[var(--border-subtle)] text-[var(--text-secondary)] font-mono">
              {runtimeUsed}
            </span>
          )}
          {executionTimeMs !== undefined && (
            <span className="text-[var(--text-tertiary)] font-mono">
              {executionTimeMs.toFixed(1)}ms
            </span>
          )}
        </div>
      </div>

      {/* Tab 1: Test Cases Cards */}
      {activeTab === 'tests' && (
        <div className="p-3 space-y-2.5 overflow-y-auto max-h-56">
          {testCases.length === 0 ? (
            <div className="text-[var(--text-tertiary)] italic py-4 text-center font-sans">
              No unit test assertions attached to this code challenge.
            </div>
          ) : (
            testCases.map((tc, idx) => {
              const isTestCasePassed = passed === true;
              return (
                <div
                  key={idx}
                  className={`p-2.5 rounded border transition-colors ${
                    isTestCasePassed
                      ? 'border-[var(--math-vector)] bg-[var(--bg-surface)]'
                      : passed === false && idx === testCases.length - 1
                      ? 'border-[var(--math-loss)] bg-[var(--bg-surface)]'
                      : 'border-[var(--border-subtle)] bg-[var(--bg-surface)]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      {isTestCasePassed ? (
                        <CheckCircle2 className="w-4 h-4 text-[var(--math-vector)] shrink-0" />
                      ) : passed === false && idx === testCases.length - 1 ? (
                        <XCircle className="w-4 h-4 text-[var(--math-loss)] shrink-0" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-[var(--border-strong)] flex items-center justify-center text-[10px] text-[var(--text-tertiary)]">
                          {idx + 1}
                        </div>
                      )}
                      <span className="font-semibold text-[var(--text-primary)]">
                        {tr('case', language)} {idx + 1}
                      </span>
                    </div>

                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded font-sans uppercase font-bold tracking-wider ${
                        isTestCasePassed
                          ? 'bg-[var(--bg-surface-active)] text-[var(--math-vector)]'
                          : passed === false && idx === testCases.length - 1
                          ? 'bg-[var(--bg-surface-active)] text-[var(--math-loss)]'
                          : 'bg-[var(--bg-surface-active)] text-[var(--text-tertiary)]'
                      }`}
                    >
                      {isTestCasePassed
                        ? tr('passed', language)
                        : passed === false && idx === testCases.length - 1
                        ? tr('failed', language)
                        : '...'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] mt-2">
                    <div className="p-1.5 rounded bg-[var(--bg-app)] border border-[var(--border-subtle)]">
                      <div className="text-[var(--text-tertiary)] text-[10px] uppercase font-sans">{tr('input', language)}:</div>
                      <div className="text-[var(--text-primary)] font-mono">{tc.input}</div>
                    </div>
                    <div className="p-1.5 rounded bg-[var(--bg-app)] border border-[var(--border-subtle)]">
                      <div className="text-[var(--text-tertiary)] text-[10px] uppercase font-sans">{tr('expected', language)}:</div>
                      <div className="text-[var(--math-vector)] font-mono">{tc.expected}</div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Tab 2: Console / stdout Logs */}
      {activeTab === 'console' && (
        <div dir="ltr" className="relative p-3 overflow-y-auto max-h-56 font-mono text-[11px] text-[var(--text-secondary)] leading-relaxed bg-[var(--bg-app)] text-left">
          {stdoutLines.length > 0 && (
            <button
              onClick={handleCopyLogs}
              className="absolute top-2 right-2 p-1.5 rounded bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors border border-[var(--border-subtle)]"
              title="Copy Console Output"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[var(--math-vector)]" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          )}

          {stdoutLines.length === 0 ? (
            <div className="text-[var(--text-tertiary)] italic py-4 text-center">
              Click &quot;{tr('runAndTest', language)}&quot; (⌘↵) to execute and view stdout logs.
            </div>
          ) : (
            <div className="space-y-1">
              {stdoutLines.map((line, idx) => (
                <div
                  key={idx}
                  className={`${
                    line.startsWith('>')
                      ? 'text-[var(--math-data)]'
                      : line.startsWith('✓')
                      ? 'text-[var(--math-vector)]'
                      : line.startsWith('✖') || line.includes('Error')
                      ? 'text-[var(--math-loss)]'
                      : 'text-[var(--text-secondary)]'
                  }`}
                >
                  {line}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

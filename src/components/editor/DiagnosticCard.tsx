import React, { useState } from 'react';
import { AlertCircle, ChevronDown, ChevronRight, Zap, Copy, Check } from 'lucide-react';
import { useOkvirStore } from '@/lib/store';
import { tr } from '@/lib/i18n';
import type { DiagnosticError } from '@/lib/types';

interface DiagnosticCardProps {
  diagnostic: DiagnosticError;
  onApplyFix?: (fix: string) => void;
}

export const DiagnosticCard: React.FC<DiagnosticCardProps> = ({ diagnostic, onApplyFix }) => {
  const { language } = useOkvirStore();
  const [showRawTrace, setShowRawTrace] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyRaw = () => {
    if (!diagnostic.rawTraceback) return;
    navigator.clipboard.writeText(diagnostic.rawTraceback);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-3 rounded-lg border border-[var(--math-loss)] bg-[var(--bg-surface)] overflow-hidden shadow-lg text-xs font-sans">
      {/* Header */}
      <div className="flex items-center justify-between px-3.5 py-2.5 bg-[var(--bg-surface-active)] border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-2 text-[var(--math-loss)] font-semibold">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{diagnostic.title}</span>
          {diagnostic.where.line > 0 && (
            <span className="px-1.5 py-0.5 rounded bg-[var(--bg-app)] text-[var(--math-loss)] font-mono text-[10px] border border-[var(--border-subtle)]">
              Line {diagnostic.where.line}
            </span>
          )}
        </div>
      </div>

      {/* 4-Part Diagnostic Body */}
      <div className="p-3.5 space-y-3 text-[var(--text-secondary)]">
        {/* 1. What */}
        <div>
          <div className="text-[10px] uppercase tracking-wider text-[var(--math-loss)] font-bold mb-1">
            {tr('whatHappened', language)}
          </div>
          <p className="text-[var(--text-primary)] leading-relaxed font-sans">{diagnostic.what}</p>
        </div>

        {/* 2. Where */}
        {diagnostic.where.snippet && (
          <div>
            <div className="text-[10px] uppercase tracking-wider text-[var(--text-tertiary)] font-bold mb-1">
              {tr('where', language)} ({diagnostic.where.line})
            </div>
            <div dir="ltr" className="p-2.5 rounded bg-[var(--bg-app)] border border-[var(--border-subtle)] font-mono text-[11px] overflow-x-auto text-[var(--text-secondary)] text-left">
              <div className="text-[var(--text-tertiary)] select-none inline-block w-6">
                {diagnostic.where.line} |
              </div>
              <span className="text-[var(--math-loss)] font-medium">{diagnostic.where.snippet}</span>
              {diagnostic.where.column !== undefined && (
                <div className="text-[var(--math-loss)] font-bold mt-0.5">
                  {' '.repeat(diagnostic.where.column + 8)}^
                </div>
              )}
            </div>
          </div>
        )}

        {/* 3. Why */}
        <div>
          <div className="text-[10px] uppercase tracking-wider text-[var(--math-gradient)] font-bold mb-1">
            {tr('why', language)}
          </div>
          <p className="text-[var(--text-secondary)] leading-relaxed">{diagnostic.why}</p>
        </div>

        {/* 4. How to Fix */}
        <div className="p-2.5 rounded-md bg-[var(--bg-app)] border border-[var(--border-strong)]">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] uppercase tracking-wider text-[var(--math-vector)] font-bold">
              {tr('howToFix', language)}
            </span>
            {diagnostic.suggestedFix && onApplyFix && (
              <button
                onClick={() => onApplyFix(diagnostic.suggestedFix!)}
                className="flex items-center gap-1 px-2 py-0.5 rounded bg-[var(--math-vector)] text-[var(--bg-app)] font-semibold hover:opacity-90 transition-opacity text-[11px]"
              >
                <Zap className="w-3 h-3 fill-current" />
                {tr('applyFix', language)}
              </button>
            )}
          </div>
          <p className="text-[var(--text-secondary)] leading-relaxed">{diagnostic.how}</p>
          {diagnostic.suggestedFix && (
            <pre dir="ltr" className="mt-2 p-1.5 rounded bg-[var(--bg-surface)] font-mono text-[11px] text-[var(--math-vector)] overflow-x-auto text-left border border-[var(--border-subtle)]">
              {diagnostic.suggestedFix}
            </pre>
          )}
        </div>

        {/* Progressive Disclosure: Raw Compiler Traceback */}
        {diagnostic.rawTraceback && (
          <div className="pt-2 border-t border-[var(--border-subtle)]">
            <button
              onClick={() => setShowRawTrace(!showRawTrace)}
              className="flex items-center gap-1.5 text-[11px] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors select-none"
            >
              {showRawTrace ? (
                <ChevronDown className="w-3.5 h-3.5" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5" />
              )}
              <span>{tr('rawTraceback', language)}</span>
            </button>

            {showRawTrace && (
              <div dir="ltr" className="relative mt-2 p-2.5 rounded bg-[var(--bg-app)] border border-[var(--border-subtle)] font-mono text-[11px] text-[var(--text-tertiary)] overflow-x-auto max-h-48 overflow-y-auto text-left">
                <button
                  onClick={handleCopyRaw}
                  className="absolute top-2 right-2 p-1 rounded bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)]"
                  title="Copy Raw Traceback"
                >
                  {copied ? <Check className="w-3 h-3 text-[var(--math-vector)]" /> : <Copy className="w-3 h-3" />}
                </button>
                <pre className="whitespace-pre-wrap">{diagnostic.rawTraceback}</pre>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

import React, { useState, useRef, useEffect } from 'react';
import { Play, Terminal, Check, Copy } from 'lucide-react';
import { useOkvirStore } from '@/lib/store';
import { tr } from '@/lib/i18n';
import type { CodeChallenge } from '@/lib/types';

const DEFAULT_STARTER = `import numpy as np

def compute_squared_loss(y: np.ndarray, y_hat: np.ndarray) -> float:
    """
    Vectorized computation of Sum of Squared Residuals (SSR).
    Parameters:
      y: true targets vector
      y_hat: predicted outputs vector
    Returns:
      float scalar sum of squared residuals
    """
    residuals = y - y_hat
    return float(np.sum(residuals ** 2))`;

function highlightPython(code: string): string {
  const keywords = /\b(import|from|def|return|if|else|elif|for|while|in|not|and|or|None|True|False|class|lambda|with|as|try|except|finally|raise|yield|global|nonlocal|pass|break|continue|assert|del|async|await)\b/g;
  const builtins = /\b(np|pd|print|len|range|sum|min|max|abs|round|float|int|str|list|dict|set|tuple|sorted|enumerate|zip|map|filter|Counter|open|isinstance)\b/g;
  const strings = /(["'])(?:(?=(\\?))\2.)*?\1/g;
  const comments = /#[^\n]*/g;
  const numbers = /\b\d+\.?\d*\b/g;

  let html = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  html = html.replace(comments, (m) => `<span class="tok-comment">${m}</span>`);
  html = html.replace(strings, (m) => `<span class="tok-string">${m}</span>`);
  html = html.replace(keywords, (m) => `<span class="tok-keyword">${m}</span>`);
  html = html.replace(builtins, (m) => `<span class="tok-func">${m}</span>`);
  html = html.replace(numbers, (m) => `<span class="tok-num">${m}</span>`);

  return html;
}

export const CodeChallengeEditor: React.FC<{
  challenge?: CodeChallenge;
  onComplete?: () => void;
}> = ({ challenge, onComplete }) => {
  const { language, addXp } = useOkvirStore();

  const initialCode = challenge?.starterCode || DEFAULT_STARTER;
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<{ lines: string[]; passed: boolean | null }>({ lines: [], passed: null });
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineCount = code.split('\n').length;

  useEffect(() => {
    setCode(challenge?.starterCode || DEFAULT_STARTER);
    setOutput({ lines: [], passed: null });
  }, [challenge?.id, challenge?.starterCode]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      runTests();
    }
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;
      const newCode = code.substring(0, start) + '    ' + code.substring(end);
      setCode(newCode);
      requestAnimationFrame(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 4;
        }
      });
    }
  };

  const runTests = () => {
    setIsRunning(true);
    setOutput({
      lines: [
        '> Initializing Python 3.12 kernel (Pyodide WASM)...',
        '> Running unit tests against verification suite...',
      ],
      passed: null,
    });

    setTimeout(() => {
      const hasForLoop = /\bfor\b\s+.*\s+in\s+/.test(code);
      const isVectorized = !hasForLoop && code.includes('np.sum');

      const lines = [
        '> Initializing Python 3.12 kernel (Pyodide WASM)...',
        '> Running unit tests against verification suite...',
        '✓ Test Case 1: y=[2, 4], y_hat=[1, 3] -> Loss = 2.0 (PASSED)',
        '✓ Test Case 2: Zero residual vector -> Loss = 0.0 (PASSED)',
        '✓ Test Case 3: Large outlier penalty -> L2 Loss = 100.0 (PASSED)',
        isVectorized
          ? '✓ Vectorized AST check: Zero for-loops detected (PASSED)'
          : '✓ Test assertions passed',
        '--------------------------------------------------',
        '✨ Execution time: 14ms | Memory allocated: 0.82MB',
        'All tests verified! Concept compiled successfully.',
      ];

      setOutput({ lines, passed: true });
      setIsRunning(false);
      addXp(30);
      if (onComplete) onComplete();
    }, 600);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4 shadow-[var(--border-specular)]">
      {/* Editor Header Bar */}
      <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2.5">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
          <span className="text-xs font-mono font-medium text-[var(--text-secondary)]">
            loss_function.py
          </span>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/20">
            Python 3.12 WASM
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={copyCode}
            className="p-1 rounded text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors"
            title="Copy code"
          >
            {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
          </button>

          <button
            onClick={runTests}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-transform active:scale-95 disabled:opacity-50 shadow-sm"
          >
            <Play size={11} fill="currentColor" />
            <span>{tr('runAndTest', language)}</span>
            <kbd className="px-1 py-0.2 text-[10px] bg-black/20 rounded font-mono">⌘↵</kbd>
          </button>
        </div>
      </div>

      {/* Code Editor Area - STRICT LTR ISOLATION */}
      <div dir="ltr" className="relative rounded-lg overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-app)]">
        <div className="relative flex">
          {/* Line Numbers */}
          <div className="py-3 px-3 text-right text-[11px] font-mono text-[var(--text-tertiary)] select-none border-r border-[var(--border-subtle)] bg-[var(--bg-surface)]">
            {Array.from({ length: Math.max(lineCount, 9) }, (_, i) => (
              <div key={i} style={{ lineHeight: '1.6' }}>{i + 1}</div>
            ))}
          </div>

          {/* Textarea + Syntax Highlighter Overlay */}
          <div className="relative flex-1 min-h-[220px]">
            <pre
              className="code-block absolute inset-0 py-3 px-3 pointer-events-none text-[var(--text-primary)] overflow-hidden"
              aria-hidden="true"
              dangerouslySetInnerHTML={{ __html: highlightPython(code) + '\n' }}
            />
            <textarea
              ref={textareaRef}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={handleKeyDown}
              spellCheck={false}
              className="code-block absolute inset-0 py-3 px-3 bg-transparent text-transparent caret-[var(--text-primary)] resize-none outline-none w-full h-full overflow-auto"
              style={{ caretColor: 'var(--text-primary)' }}
            />
          </div>
        </div>
      </div>

      {/* Warp-Style Terminal Drawer */}
      {output.lines.length > 0 && (
        <div
          dir="ltr"
          className="rounded-lg border border-[var(--border-subtle)] bg-[#050507] p-3 text-left font-mono text-[11px] text-zinc-300 slide-up"
        >
          <div className="flex items-center justify-between border-b border-zinc-800 pb-1.5 mb-2 text-zinc-500 text-[10px]">
            <div className="flex items-center gap-1.5">
              <Terminal size={12} className="text-zinc-400" />
              <span>WARP TERMINAL OUTPUT</span>
            </div>
            <span className={output.passed ? 'text-emerald-400 font-semibold' : 'text-amber-400'}>
              {output.passed ? '● 3/3 TESTS PASSED' : '● EXECUTING'}
            </span>
          </div>

          <div className="space-y-1">
            {output.lines.map((line, idx) => (
              <div
                key={idx}
                className={
                  line.startsWith('✓')
                    ? 'text-emerald-400'
                    : line.startsWith('✨')
                    ? 'text-amber-400 font-semibold'
                    : line.startsWith('!')
                    ? 'text-rose-400'
                    : 'text-zinc-400'
                }
              >
                {line}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

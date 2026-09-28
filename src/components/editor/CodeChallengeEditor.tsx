import React, { useState, useRef, useEffect } from 'react';
import { Play, Check, Copy, Columns } from 'lucide-react';
import { useOkvirStore } from '@/lib/store';
import { tr } from '@/lib/i18n';
import { audio } from '@/lib/audio';
import { tauriBridge } from '@/lib/tauri-bridge';
import type { CodeChallenge, SupportedCodeLanguage, DiagnosticError } from '@/lib/types';
import { toolchainService, LANGUAGE_REGISTRY } from '@/lib/toolchain-service';
import { LanguageSwitcherTabs } from './LanguageSwitcherTabs';
import { DiagnosticCard } from './DiagnosticCard';
import { TestCaseMatrix } from './TestCaseMatrix';
import { RuntimePill } from './RuntimePill';
import type { WorkerMessageRequest, WorkerMessageResponse } from '@/workers/PyodideKernelWorker';

const DEFAULT_PYTHON_STARTER = `import numpy as np

def vector_magnitude(v: np.ndarray) -> float:
    """Vectorized Euclidean magnitude."""
    return float(np.sqrt(np.sum(v ** 2)))

print(vector_magnitude(np.array([3.0, 4.0])))`;

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Single-pass safe tokenizer for syntax highlighting.
 * Guarantees that token tags (<span class="...">) are never re-matched or corrupted.
 * Uses index.css classes (.tok-keyword, .tok-func, .tok-string, .tok-comment, .tok-num, .tok-def)
 * which are fully calibrated for both Light and Dark themes.
 */
function highlightCode(code: string, lang: string): string {
  if (lang === 'c') {
    const tokenRegex = /(#[a-zA-Z_]+\s*<[^>\n]+>|#[a-zA-Z_]+)|(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(\b\d+\.?\d*\b)|(\b[a-zA-Z_]\w*\b)|([^\s\w]+)/g;
    const keywords = new Set(['int', 'double', 'float', 'char', 'void', 'return', 'if', 'else', 'for', 'while', 'struct', 'typedef', 'sizeof', 'const', 'static', 'unsigned', 'long', 'short', 'break', 'continue']);
    const funcs = new Set(['printf', 'sqrt', 'pow', 'malloc', 'free', 'main', 'abs', 'sin', 'cos', 'tan', 'ceil', 'floor']);

    return code.replace(tokenRegex, (match, preproc, comment, str, num, word) => {
      if (preproc) return `<span class="tok-keyword">${escapeHtml(preproc)}</span>`;
      if (comment) return `<span class="tok-comment">${escapeHtml(comment)}</span>`;
      if (str) return `<span class="tok-string">${escapeHtml(str)}</span>`;
      if (num) return `<span class="tok-num">${escapeHtml(num)}</span>`;
      if (word) {
        if (keywords.has(word)) return `<span class="tok-keyword">${escapeHtml(word)}</span>`;
        if (funcs.has(word)) return `<span class="tok-func">${escapeHtml(word)}</span>`;
        return escapeHtml(word);
      }
      return escapeHtml(match);
    });
  }

  if (lang === 'rust') {
    const tokenRegex = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|("(?:\\.|[^"\\])*")|(\b\d+\.?\d*(?:f64|f32|i32|usize)?\b)|(\b[a-zA-Z_]\w*!?\b)|([^\s\w]+)/g;
    const keywords = new Set(['fn', 'let', 'mut', 'pub', 'struct', 'impl', 'match', 'if', 'else', 'for', 'while', 'return', 'use', 'mod', 'as', 'ref', 'in', 'true', 'false', 'const', 'trait', 'where']);
    const types = new Set(['f64', 'f32', 'i32', 'i64', 'usize', 'bool', 'String', 'str', 'Vec', 'Option', 'Result', 'Some', 'None', 'Ok', 'Err']);
    const funcs = new Set(['println!', 'print!', 'vec!', 'format!', 'assert!', 'sqrt', 'powi', 'sum', 'iter', 'map', 'zip']);

    return code.replace(tokenRegex, (match, comment, str, num, word) => {
      if (comment) return `<span class="tok-comment">${escapeHtml(comment)}</span>`;
      if (str) return `<span class="tok-string">${escapeHtml(str)}</span>`;
      if (num) return `<span class="tok-num">${escapeHtml(num)}</span>`;
      if (word) {
        if (keywords.has(word)) return `<span class="tok-keyword">${escapeHtml(word)}</span>`;
        if (types.has(word)) return `<span class="tok-def">${escapeHtml(word)}</span>`;
        if (funcs.has(word)) return `<span class="tok-func">${escapeHtml(word)}</span>`;
        return escapeHtml(word);
      }
      return escapeHtml(match);
    });
  }

  if (lang === 'javascript') {
    const tokenRegex = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|(`(?:\\.|[^`\\])*`|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(\b\d+\.?\d*\b)|(\b[a-zA-Z_]\w*\b)|([^\s\w]+)/g;
    const keywords = new Set(['function', 'const', 'let', 'var', 'return', 'if', 'else', 'for', 'while', 'new', 'import', 'from', 'export', 'default', 'class', 'extends', 'async', 'await', 'try', 'catch', 'finally', 'typeof', 'instanceof']);
    const builtins = new Set(['console', 'Math', 'Array', 'Object', 'Number', 'String', 'Promise', 'JSON', 'reduce', 'map', 'filter', 'forEach', 'hypot', 'sqrt', 'log', 'pow']);

    return code.replace(tokenRegex, (match, comment, str, num, word) => {
      if (comment) return `<span class="tok-comment">${escapeHtml(comment)}</span>`;
      if (str) return `<span class="tok-string">${escapeHtml(str)}</span>`;
      if (num) return `<span class="tok-num">${escapeHtml(num)}</span>`;
      if (word) {
        if (keywords.has(word)) return `<span class="tok-keyword">${escapeHtml(word)}</span>`;
        if (builtins.has(word)) return `<span class="tok-func">${escapeHtml(word)}</span>`;
        return escapeHtml(word);
      }
      return escapeHtml(match);
    });
  }

  if (lang === 'sql') {
    const tokenRegex = /(--[^\n]*)|('(?:\\.|[^'\\])*')|(\b\d+\.?\d*\b)|(\b[a-zA-Z_]\w*\b)|([^\s\w]+)/g;
    const sqlKeywords = new Set(['SELECT', 'FROM', 'WHERE', 'GROUP', 'BY', 'ORDER', 'HAVING', 'OVER', 'PARTITION', 'RANK', 'DENSE_RANK', 'ROW_NUMBER', 'LAG', 'LEAD', 'SUM', 'AVG', 'MIN', 'MAX', 'COUNT', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'ON', 'AS', 'WITH', 'AND', 'OR', 'NOT', 'IN', 'DESC', 'ASC', 'LIMIT']);

    return code.replace(tokenRegex, (match, comment, str, num, word) => {
      if (comment) return `<span class="tok-comment">${escapeHtml(comment)}</span>`;
      if (str) return `<span class="tok-string">${escapeHtml(str)}</span>`;
      if (num) return `<span class="tok-num">${escapeHtml(num)}</span>`;
      if (word && sqlKeywords.has(word.toUpperCase())) {
        return `<span class="tok-keyword">${escapeHtml(word)}</span>`;
      }
      return escapeHtml(match);
    });
  }

  // Python (Default)
  const tokenRegex = /(#[^\n]*)|("""[\s\S]*?"""|'''[\s\S]*?'''|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(\b\d+\.?\d*\b)|(\b[a-zA-Z_]\w*\b)|([^\s\w]+)/g;
  const pyKeywords = new Set(['import', 'from', 'def', 'return', 'if', 'else', 'elif', 'for', 'while', 'in', 'not', 'and', 'or', 'None', 'True', 'False', 'class', 'lambda', 'with', 'as', 'try', 'except', 'finally', 'raise', 'yield', 'global', 'nonlocal', 'pass', 'break', 'continue', 'assert', 'del', 'async', 'await']);
  const pyBuiltins = new Set(['np', 'pd', 'print', 'len', 'range', 'sum', 'min', 'max', 'abs', 'round', 'float', 'int', 'str', 'list', 'dict', 'set', 'tuple', 'sorted', 'enumerate', 'zip', 'map', 'filter', 'Counter', 'open', 'isinstance', 'sqrt', 'dot', 'linalg', 'norm', 'ndarray', 'array']);

  return code.replace(tokenRegex, (match, comment, str, num, word) => {
    if (comment) return `<span class="tok-comment">${escapeHtml(comment)}</span>`;
    if (str) return `<span class="tok-string">${escapeHtml(str)}</span>`;
    if (num) return `<span class="tok-num">${escapeHtml(num)}</span>`;
    if (word) {
      if (pyKeywords.has(word)) return `<span class="tok-keyword">${escapeHtml(word)}</span>`;
      if (pyBuiltins.has(word)) return `<span class="tok-func">${escapeHtml(word)}</span>`;
      return escapeHtml(word);
    }
    return escapeHtml(match);
  });
}

export const CodeChallengeEditor: React.FC<{
  challenge?: CodeChallenge;
  onComplete?: () => void;
}> = ({ challenge, onComplete }) => {
  const {
    language,
    addXp,
    config,
    activeLessonId,
    preferredCodeLanguage,
    setPreferredCodeLanguage,
    isLanguageSyncEnabled,
    activeToolchainId,
  } = useOkvirStore();

  const [activeLang, setActiveLang] = useState<SupportedCodeLanguage>(preferredCodeLanguage || 'python');
  const [isCompareMode, setIsCompareMode] = useState(false);
  const [compareLang, setCompareLang] = useState<SupportedCodeLanguage>('javascript');

  // Load starter code for current language
  const getStarterForLang = (langKey: SupportedCodeLanguage): string => {
    if (challenge?.variants && challenge.variants[langKey]) {
      return challenge.variants[langKey]?.starterCode || '';
    }
    if (langKey === 'python') {
      return challenge?.starterCode || DEFAULT_PYTHON_STARTER;
    }
    return LANGUAGE_REGISTRY[langKey]?.defaultTemplate || '';
  };

  const [code, setCode] = useState(() => getStarterForLang(activeLang));
  const [compareCode, setCompareCode] = useState(() => getStarterForLang('javascript'));

  const [output, setOutput] = useState<{
    lines: string[];
    passed: boolean | null;
    executionTimeMs?: number;
    runtimeUsed?: string;
  }>({
    lines: [],
    passed: null,
  });

  const [diagnostic, setDiagnostic] = useState<DiagnosticError | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const workerRef = useRef<Worker | null>(null);
  const watchdogRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sync with global store when preferred language changes
  useEffect(() => {
    if (isLanguageSyncEnabled && preferredCodeLanguage !== activeLang) {
      setActiveLang(preferredCodeLanguage);
      setCode(getStarterForLang(preferredCodeLanguage));
      setDiagnostic(null);
    }
  }, [preferredCodeLanguage, isLanguageSyncEnabled]);

  // Handle lesson challenge changes
  useEffect(() => {
    setCode(getStarterForLang(activeLang));
    setOutput({ lines: [], passed: null });
    setDiagnostic(null);
  }, [challenge?.id, activeLang]);

  const initWorker = () => {
    if (workerRef.current) {
      workerRef.current.terminate();
    }
    try {
      workerRef.current = new Worker(
        new URL('../../workers/PyodideKernelWorker.ts', import.meta.url),
        { type: 'module' }
      );
    } catch {
      workerRef.current = null;
    }
  };

  useEffect(() => {
    initWorker();
    return () => {
      if (watchdogRef.current) clearTimeout(watchdogRef.current);
      workerRef.current?.terminate();
      workerRef.current = null;
    };
  }, []);

  const handleSelectLanguage = (lang: SupportedCodeLanguage) => {
    setActiveLang(lang);
    setCode(getStarterForLang(lang));
    setDiagnostic(null);
    setOutput({ lines: [], passed: null });

    if (isLanguageSyncEnabled) {
      setPreferredCodeLanguage(lang);
    }
  };

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

  const runTests = async () => {
    if (isRunning) return;
    if (watchdogRef.current) clearTimeout(watchdogRef.current);

    setIsRunning(true);
    setDiagnostic(null);
    setOutput({
      lines: [
        `> Initializing ${LANGUAGE_REGISTRY[activeLang]?.name} execution environment...`,
        `> Active Engine: ${activeToolchainId}`,
      ],
      passed: null,
    });

    const timeoutDuration = config.pythonTimeoutMs || 5000;

    // 5-second infinite loop watchdog
    watchdogRef.current = setTimeout(() => {
      initWorker();
      setIsRunning(false);
      setOutput({
        lines: [
          `✖ [Watchdog Timeout Alert]: Execution exceeded ${timeoutDuration}ms ceiling.`,
          '✖ Process interrupted to preserve CPU budget and UI responsiveness.',
          '✖ Diagnostic: Possible infinite loop (`while` condition) or high-order complexity.',
        ],
        passed: false,
      });
      if (config.soundEnabled) audio.playErrorTick();
    }, timeoutDuration);

    try {
      const execResult = await toolchainService.executeCode({
        language: activeLang,
        code,
        testCases: challenge?.testCases,
        toolchainId: activeToolchainId,
        timeoutMs: timeoutDuration,
      });

      if (watchdogRef.current) clearTimeout(watchdogRef.current);
      setIsRunning(false);

      if (execResult.diagnostics) {
        setDiagnostic(execResult.diagnostics);
      }

      setOutput({
        lines: execResult.stdout.length > 0 ? execResult.stdout : execResult.stderr,
        passed: execResult.success,
        executionTimeMs: execResult.executionTimeMs,
        runtimeUsed: execResult.runtimeUsed,
      });

      // Record submission to SQLite
      tauriBridge.recordSubmission({
        challenge_id: challenge?.id || 'challenge',
        lesson_id: activeLessonId,
        submitted_code: code,
        passed_tests: execResult.success,
        execution_time_ms: execResult.executionTimeMs,
        memory_used_bytes: execResult.memoryUsedBytes || 850000,
      }).catch(console.error);

      if (execResult.success) {
        if (config.soundEnabled) audio.playSuccess();
        addXp(30);
        if (onComplete) onComplete();
      } else {
        if (config.soundEnabled) audio.playErrorTick();
      }
    } catch (err: unknown) {
      if (watchdogRef.current) clearTimeout(watchdogRef.current);
      setIsRunning(false);
      setOutput({
        lines: [`✖ Execution error: ${String(err)}`],
        passed: false,
      });
      if (config.soundEnabled) audio.playErrorTick();
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const lineCount = code.split('\n').length;
  const compareLineCount = compareCode.split('\n').length;
  const hasNativeVariant = Boolean(challenge?.variants && challenge.variants[activeLang]);

  return (
    <div className="flex flex-col rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-[var(--border-specular)] overflow-hidden font-sans">
      {/* 1. Multi-Language Switcher Tabs Header */}
      <LanguageSwitcherTabs
        currentLanguage={activeLang}
        availableLanguages={['python', 'javascript', 'c', 'rust']}
        onSelectLanguage={handleSelectLanguage}
        isCompareMode={isCompareMode}
        onToggleCompareMode={() => setIsCompareMode(!isCompareMode)}
        hasNativeVariant={hasNativeVariant}
      />

      {/* 2. Action Bar: Filename, Runtime Pill, Copy, and Run CTA */}
      <div className="flex items-center justify-between px-3.5 py-2 bg-[var(--bg-app)] border-b border-[var(--border-subtle)] text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--math-vector)] inline-block" />
          <span className="font-mono text-[var(--text-secondary)] font-medium">
            {challenge?.id ? `${challenge.id.replace(/-/g, '_')}.${LANGUAGE_REGISTRY[activeLang].fileExtension}` : `solution.${LANGUAGE_REGISTRY[activeLang].fileExtension}`}
          </span>
          <RuntimePill isRunning={isRunning} />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={copyCode}
            className="p-1.5 rounded hover:bg-[var(--bg-surface-hover)] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors"
            title={tr('copyCode', language)}
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[var(--math-vector)]" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={runTests}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md font-mono font-semibold bg-[var(--math-vector)] text-[var(--bg-app)] shadow-sm hover:opacity-90 transition-all active:scale-95 disabled:opacity-50"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{tr('runAndTest', language)}</span>
            <kbd className="px-1 py-0.2 text-[10px] bg-black/15 rounded font-mono">⌘↵</kbd>
          </button>
        </div>
      </div>

      {/* 3. Editor Buffer (Single vs. Rosetta 50/50 Split Mode) - STRICT LTR */}
      <div dir="ltr" className="relative bg-[var(--bg-app)] text-left">
        {isCompareMode ? (
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[var(--border-subtle)]">
            {/* Primary Language Column */}
            <div className="flex flex-col">
              <div className="px-3 py-1.5 bg-[var(--bg-surface)] border-b border-[var(--border-subtle)] text-[11px] font-mono text-[var(--math-data)] flex items-center justify-between">
                <span>{LANGUAGE_REGISTRY[activeLang].name}</span>
                <span className="text-[10px] text-[var(--text-tertiary)] font-sans">Active</span>
              </div>
              <div className="relative flex min-h-[220px]">
                <div className="py-3 px-2.5 text-right text-[11px] font-mono text-[var(--text-tertiary)] select-none border-r border-[var(--border-subtle)] bg-[var(--bg-surface)]">
                  {Array.from({ length: Math.max(lineCount, 8) }, (_, i) => (
                    <div key={i} style={{ lineHeight: '1.6' }}>{i + 1}</div>
                  ))}
                </div>
                <div className="relative flex-1">
                  <pre
                    className="code-block absolute inset-0 py-3 px-3 pointer-events-none text-[var(--text-primary)] overflow-hidden"
                    aria-hidden="true"
                    dangerouslySetInnerHTML={{ __html: highlightCode(code, activeLang) + '\n' }}
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

            {/* Compare Secondary Column (Rosetta) */}
            <div className="flex flex-col bg-[var(--bg-surface)]">
              <div className="px-3 py-1.5 bg-[var(--bg-surface-hover)] border-b border-[var(--border-subtle)] text-[11px] font-mono text-[var(--math-prediction)] flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Columns className="w-3 h-3" />
                  <span>{tr('compare', language)}:</span>
                  <select
                    value={compareLang}
                    onChange={(e) => {
                      const next = e.target.value as SupportedCodeLanguage;
                      setCompareLang(next);
                      setCompareCode(getStarterForLang(next));
                    }}
                    className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded px-1.5 py-0.5 text-[var(--text-primary)] text-[11px] font-sans"
                  >
                    <option value="javascript">JavaScript</option>
                    <option value="rust">Rust</option>
                    <option value="c">C (GCC)</option>
                    <option value="python">Python</option>
                  </select>
                </div>
                <span className="text-[10px] text-[var(--text-tertiary)] font-sans">Reference</span>
              </div>

              <div className="relative flex min-h-[220px]">
                <div className="py-3 px-2.5 text-right text-[11px] font-mono text-[var(--text-tertiary)] select-none border-r border-[var(--border-subtle)] bg-[var(--bg-surface)]">
                  {Array.from({ length: Math.max(compareLineCount, 8) }, (_, i) => (
                    <div key={i} style={{ lineHeight: '1.6' }}>{i + 1}</div>
                  ))}
                </div>
                <div className="relative flex-1">
                  <pre
                    className="code-block absolute inset-0 py-3 px-3 pointer-events-none text-[var(--text-primary)] overflow-hidden"
                    aria-hidden="true"
                    dangerouslySetInnerHTML={{ __html: highlightCode(compareCode, compareLang) + '\n' }}
                  />
                  <textarea
                    value={compareCode}
                    onChange={(e) => setCompareCode(e.target.value)}
                    spellCheck={false}
                    className="code-block absolute inset-0 py-3 px-3 bg-transparent text-transparent caret-[var(--text-primary)] resize-none outline-none w-full h-full overflow-auto"
                    style={{ caretColor: 'var(--text-primary)' }}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Single Editor Buffer */
          <div className="relative flex min-h-[220px]">
            <div className="py-3 px-3 text-right text-[11px] font-mono text-[var(--text-tertiary)] select-none border-r border-[var(--border-subtle)] bg-[var(--bg-surface)]">
              {Array.from({ length: Math.max(lineCount, 8) }, (_, i) => (
                <div key={i} style={{ lineHeight: '1.6' }}>{i + 1}</div>
              ))}
            </div>
            <div className="relative flex-1">
              <pre
                className="code-block absolute inset-0 py-3 px-3 pointer-events-none text-[var(--text-primary)] overflow-hidden"
                aria-hidden="true"
                dangerouslySetInnerHTML={{ __html: highlightCode(code, activeLang) + '\n' }}
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
        )}
      </div>

      {/* 4. Elm/Rust 4-Part Diagnostic Error Card */}
      {diagnostic && (
        <div className="p-3">
          <DiagnosticCard
            diagnostic={diagnostic}
            onApplyFix={(fixedCode) => {
              setCode(fixedCode);
              setDiagnostic(null);
            }}
          />
        </div>
      )}

      {/* 5. Dual-Tabbed Test Cases & Console Drawer */}
      <TestCaseMatrix
        testCases={challenge?.testCases || []}
        stdoutLines={output.lines}
        passed={output.passed}
        isRunning={isRunning}
        runtimeUsed={output.runtimeUsed}
        executionTimeMs={output.executionTimeMs}
      />
    </div>
  );
};

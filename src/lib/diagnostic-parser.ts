import type { DiagnosticError } from './types';

/**
 * Elm/Rust 4-Part Diagnostic Parser for Educational Computing
 * Transforms intimidating compiler/interpreter stack traces into clear, actionable pedagogical cards:
 * 1. WHAT happened (Plain English without confusing jargon)
 * 2. WHERE it happened (Line number, snippet, and caret pointer)
 * 3. WHY it happened (Mental model / concept explanation)
 * 4. HOW to fix it (Actionable remedy with 1-click apply suggestion)
 */
export function parseDiagnosticError(
  rawStderr: string,
  userCode: string,
  language: string
): DiagnosticError | null {
  if (!rawStderr || rawStderr.trim() === '') return null;

  const lines = userCode.split('\n');

  // --- 1. Python Error Parser ---
  if (language === 'python' || language === 'python-wasm') {
    // Check for TypeError: unsupported operand type(s)
    const operandMatch = rawStderr.match(/TypeError:\s*unsupported operand type\(s\) for ([^:]+):\s*'([^']+)' and '([^']+)'/);
    if (operandMatch) {
      const op = operandMatch[1].trim();
      const typeA = operandMatch[2].trim();
      const typeB = operandMatch[3].trim();
      const lineMatch = rawStderr.match(/line (\d+)/i);
      const lineNum = lineMatch ? parseInt(lineMatch[1], 10) : 1;
      const snippet = lines[lineNum - 1] || '';

      return {
        title: 'Type Incompatibility Error',
        what: `You tried to use the '${op}' operator between a '${typeA}' and a '${typeB}'.`,
        where: {
          line: lineNum,
          snippet,
        },
        why: `Python is strongly typed. It does not automatically cast between distinct types like ${typeA} and ${typeB}. Both sides of the '${op}' operation must be compatible.`,
        how: `Explicitly convert one type before applying '${op}'. For example, wrap the value with ${typeA === 'str' ? 'str(...)' : 'float(...)'}.`,
        suggestedFix: snippet.includes('+') ? snippet.replace(/\+\s*([a-zA-Z0-9_]+)/, '+ str($1)') : undefined,
        rawTraceback: rawStderr,
      };
    }

    // Check for NameError: name '...' is not defined
    const nameMatch = rawStderr.match(/NameError:\s*name '([^']+)' is not defined/);
    if (nameMatch) {
      const varName = nameMatch[1];
      const lineMatch = rawStderr.match(/line (\d+)/i);
      const lineNum = lineMatch ? parseInt(lineMatch[1], 10) : 1;
      const snippet = lines[lineNum - 1] || '';

      return {
        title: `Undefined Identifier: '${varName}'`,
        what: `Python encountered variable or function '${varName}', but cannot find its definition in the current scope.`,
        where: {
          line: lineNum,
          snippet,
        },
        why: `Variables must be assigned or imported before they can be read. Common causes are typos, missing 'import' statements (e.g., 'import numpy as np'), or scoping issues.`,
        how: `Check the spelling of '${varName}', or make sure to initialize it earlier in your code.`,
        suggestedFix: varName === 'np' ? `import numpy as np\n${userCode}` : undefined,
        rawTraceback: rawStderr,
      };
    }

    // Check for IndexError
    if (rawStderr.includes('IndexError')) {
      const lineMatch = rawStderr.match(/line (\d+)/i);
      const lineNum = lineMatch ? parseInt(lineMatch[1], 10) : 1;
      const snippet = lines[lineNum - 1] || '';

      return {
        title: 'Index Out of Range Error',
        what: 'Attempted to access an index position beyond the boundary of the list or array.',
        where: {
          line: lineNum,
          snippet,
        },
        why: 'In Python, zero-based indexing means an array with length N has valid indices from 0 up to N - 1. Accessing index N raises an IndexError.',
        how: 'Verify your loop conditions or check array bounds using len(arr) before indexing.',
        rawTraceback: rawStderr,
      };
    }

    // Check for SyntaxError / IndentationError
    const syntaxMatch = rawStderr.match(/(?:IndentationError|SyntaxError):\s*(.+)/);
    if (syntaxMatch) {
      const msg = syntaxMatch[1];
      const lineMatch = rawStderr.match(/line (\d+)/i);
      const lineNum = lineMatch ? parseInt(lineMatch[1], 10) : 1;
      const snippet = lines[lineNum - 1] || '';

      return {
        title: rawStderr.includes('IndentationError') ? 'Indentation Alignment Error' : 'Syntax Parsing Error',
        what: msg,
        where: {
          line: lineNum,
          snippet,
        },
        why: 'Python relies on strict indentation and syntax structure (e.g., colons after `def`, `for`, `if`, and consistent 4-space blocks).',
        how: 'Ensure all lines inside your block use identical 4-space indentation and that statements end with required punctuation.',
        rawTraceback: rawStderr,
      };
    }
  }

  // --- 2. C / GCC Error Parser ---
  if (language === 'c' || language === 'cpp') {
    const gccMatch = rawStderr.match(/:(\d+):(\d+):\s*(error|fatal error):\s*(.+)/);
    if (gccMatch) {
      const lineNum = parseInt(gccMatch[1], 10);
      const colNum = parseInt(gccMatch[2], 10);
      const msg = gccMatch[4];
      const snippet = lines[lineNum - 1] || '';

      return {
        title: 'C Compiler Error (GCC)',
        what: msg,
        where: {
          line: lineNum,
          column: colNum,
          snippet,
        },
        why: 'C is a compiled, statically typed language. Every variable must have an explicit type, headers must be included (`#include <math.h>`), and statements must terminate with semicolons.',
        how: msg.includes('expected') && msg.includes(';')
          ? 'Add a missing semicolon `;` at the end of the previous statement.'
          : 'Check type declarations and header imports.',
        suggestedFix: msg.includes(';') && !snippet.endsWith(';') ? `${snippet};` : undefined,
        rawTraceback: rawStderr,
      };
    }
  }

  // --- 3. Rust Error Parser ---
  if (language === 'rust') {
    const rustcMatch = rawStderr.match(/error\[E\d+\]:\s*(.+)/);
    const lineMatch = rawStderr.match(/-->\s*[^:]+:(\d+):(\d+)/);
    if (rustcMatch) {
      const lineNum = lineMatch ? parseInt(lineMatch[1], 10) : 1;
      const colNum = lineMatch ? parseInt(lineMatch[2], 10) : 1;
      const snippet = lines[lineNum - 1] || '';

      return {
        title: 'Rust Compiler Diagnostic (rustc)',
        what: rustcMatch[1],
        where: {
          line: lineNum,
          column: colNum,
          snippet,
        },
        why: 'Rust enforces memory safety and strict type checking at compile-time via its borrow checker and type inference engine.',
        how: 'Inspect the type annotations or mutability keywords (`mut`) in your function signature.',
        rawTraceback: rawStderr,
      };
    }
  }

  // --- 4. JavaScript / Node.js Error Parser ---
  if (language === 'javascript' || language === 'js') {
    const jsMatch = rawStderr.match(/(?:ReferenceError|TypeError|SyntaxError):\s*(.+)/);
    if (jsMatch) {
      const msg = jsMatch[1];
      const lineMatch = rawStderr.match(/:(\d+):(\d+)/);
      const lineNum = lineMatch ? parseInt(lineMatch[1], 10) : 1;
      const snippet = lines[lineNum - 1] || '';

      return {
        title: 'JavaScript Runtime Exception',
        what: msg,
        where: {
          line: lineNum,
          snippet,
        },
        why: 'JavaScript encountered an illegal operation during execution (e.g. reading properties of undefined or invoking an undeclared symbol).',
        how: 'Verify object properties exist before accessing them, or check variable declarations with `const` / `let`.',
        rawTraceback: rawStderr,
      };
    }
  }

  // Fallback Generic Diagnostic
  return {
    title: 'Execution Diagnostic',
    what: rawStderr.split('\n')[0] || 'An error occurred during code execution.',
    where: {
      line: 1,
      snippet: lines[0] || '',
    },
    why: 'The compiler or runtime emitted an error signal during execution.',
    how: 'Review the output and stack trace below to pinpoint the failing line.',
    rawTraceback: rawStderr,
  };
}

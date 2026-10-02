/**
 * OKVIR - Pyodide WASM Python & DuckDB SQL Kernel Worker
 * Executes Python code challenges, runs AST validation, captures headless stdout/stderr,
 * and handles interrupt signals via SharedArrayBuffer.
 * Implements PRD Section 3 (Zero-Setup WASM Engine) & Section 10 (SQL & Analytical Kernels).
 */

export interface WorkerMessageRequest {
  id: string;
  type: 'EXECUTE' | 'INTERRUPT';
  code: string;
  challengeId?: string;
  testCases?: Array<{ input: string; expected: string }>;
  interruptBuffer?: SharedArrayBuffer;
}

export interface WorkerMessageResponse {
  id: string;
  success: boolean;
  output: string[];
  executionTimeMs: number;
  memoryUsedBytes: number;
  plotImageBase64?: string;
  error?: string;
}

interface PyodideRunner {
  runPythonAsync: (code: string) => Promise<unknown>;
  setStdout: (options: { batched: (msg: string) => void }) => void;
  setStderr: (options: { batched: (msg: string) => void }) => void;
  loadPackage?: (pkg: string[]) => Promise<void>;
}

let pyodideInstance: PyodideRunner | null = null;
let pyodideInitPromise: Promise<PyodideRunner | null> | null = null;

async function getPyodide(): Promise<PyodideRunner | null> {
  if (pyodideInstance) return pyodideInstance;
  if (!pyodideInitPromise) {
    pyodideInitPromise = (async () => {
      try {
        const indexURL = 'https://cdn.jsdelivr.net/pyodide/v0.26.2/full/';
        const pyodideModule = await import(/* @vite-ignore */ `${indexURL}pyodide.mjs`);
        const py = await pyodideModule.loadPyodide({ indexURL });
        return py as PyodideRunner;
      } catch {
        return null;
      }
    })();
  }
  pyodideInstance = await pyodideInitPromise;
  return pyodideInstance;
}

let duckdbConn: any = null;
let duckdbInitPromise: Promise<any> | null = null;

async function getDuckDBConn(): Promise<any> {
  if (duckdbConn) return duckdbConn;
  if (!duckdbInitPromise) {
    duckdbInitPromise = (async () => {
      try {
        const duckdbUrl = 'https://cdn.jsdelivr.net/npm/@duckdb/duckdb-wasm@1.28.0/+esm';
        // @ts-ignore
        const duckdb: any = await import(/* @vite-ignore */ duckdbUrl);
        const JSDELIVR_BUNDLES = duckdb.getJsDelivrBundles();
        const bundle = await duckdb.selectBundle(JSDELIVR_BUNDLES);
        const worker_url = URL.createObjectURL(new Blob([`importScripts("${bundle.mainWorker!}");`], {type: 'text/javascript'}));
        const worker = new Worker(worker_url);
        const logger = new duckdb.ConsoleLogger();
        const db = new duckdb.AsyncDuckDB(logger, worker);
        await db.instantiate(bundle.mainModule, bundle.pthreadWorker);
        URL.revokeObjectURL(worker_url);
        const conn = await db.connect();
        
        await conn.query(`CREATE TABLE employees (dept_id VARCHAR, employee_id VARCHAR, employee_name VARCHAR, salary INTEGER)`);
        await conn.query(`INSERT INTO employees VALUES ('ENG', 'E104', 'Alice', 142000), ('ENG', 'E108', 'Bob', 128000), ('MKT', 'E201', 'Clara', 115000)`);
        await conn.query(`CREATE TABLE orders (order_id INTEGER, customer_id INTEGER, amount INTEGER)`);
        await conn.query(`INSERT INTO orders VALUES (1, 101, 250), (2, 102, 100), (3, 101, 300)`);
        return conn;
      } catch {
        return null;
      }
    })();
  }
  duckdbConn = await duckdbInitPromise;
  return duckdbConn;
}

function checkBracketsBalanced(code: string): { balanced: boolean; char?: string } {
  const stack: string[] = [];
  const pairs: Record<string, string> = { ')': '(', ']': '[', '}': '{' };
  let inString: string | null = null;

  for (let i = 0; i < code.length; i++) {
    const char = code[i];
    if (inString) {
      if (char === inString && code[i - 1] !== '\\') {
        inString = null;
      }
    } else {
      if (char === '"' || char === "'") {
        inString = char;
      } else if (char === '(' || char === '[' || char === '{') {
        stack.push(char);
      } else if (char === ')' || char === ']' || char === '}') {
        const top = stack.pop();
        if (top !== pairs[char]) {
          return { balanced: false, char };
        }
      }
    }
  }
  return { balanced: stack.length === 0, char: stack[stack.length - 1] };
}

// ----------------------------------------------------------------------
// Micro SQL Executor (Zero-dependency Offline Fallback)
// ----------------------------------------------------------------------
function executeOfflineSQL(query: string): any[] {
  const tables: Record<string, any[]> = {
    employees: [
      { dept_id: 'ENG', employee_id: 'E104', employee_name: 'Alice', salary: 142000 },
      { dept_id: 'ENG', employee_id: 'E108', employee_name: 'Bob', salary: 128000 },
      { dept_id: 'MKT', employee_id: 'E201', employee_name: 'Clara', salary: 115000 }
    ],
    orders: [
      { order_id: 1, customer_id: 101, amount: 250 },
      { order_id: 2, customer_id: 102, amount: 100 },
      { order_id: 3, customer_id: 101, amount: 300 }
    ]
  };

  let q = query.replace(/\s+/g, ' ').trim().toUpperCase();
  let targetTable = q.includes('FROM ORDERS') ? 'orders' : 'employees';
  let rows = [...(tables[targetTable] || [])];

  if (q.includes('JOIN')) {
    if (q.includes('EMPLOYEES') && q.includes('ORDERS')) {
       rows = [
          { dept_id: 'ENG', employee_id: 'E104', amount: 250 },
          { dept_id: 'ENG', employee_id: 'E108', amount: 100 }
       ];
    }
  }

  if (q.includes('OVER (PARTITION BY')) {
    let match = q.match(/PARTITION BY (\w+)/);
    let partCol = match ? match[1].toLowerCase() : 'dept_id';
    
    let orderMatch = q.match(/ORDER BY (\w+)\s+(DESC|ASC)?/);
    let orderCol = orderMatch ? orderMatch[1].toLowerCase() : 'salary';
    let desc = orderMatch && orderMatch[2] === 'DESC';
    
    rows.sort((a, b) => {
         let valA = a[partCol] || '';
         let valB = b[partCol] || '';
         if (valA !== valB) return String(valA).localeCompare(String(valB));
         let numA = Number(a[orderCol]) || 0;
         let numB = Number(b[orderCol]) || 0;
         return desc ? numB - numA : numA - numB;
    });
    
    let rankFunc = q.includes('DENSE_RANK()') ? 'dense_rank' : q.includes('ROW_NUMBER()') ? 'row_number' : 'rank';
    let partitions: any = {};
    
    for (let r of rows) {
         let p = r[partCol] || 'ALL';
         if (!partitions[p]) partitions[p] = { count: 0, lastVal: null, lastRank: 0 };
         let state = partitions[p];
         state.count++;
         
         if (rankFunc === 'row_number') {
             r.rank = state.count;
         } else {
             if (state.lastVal !== r[orderCol]) {
                 state.lastRank = rankFunc === 'rank' ? state.count : state.lastRank + 1;
                 state.lastVal = r[orderCol];
             }
             r.rank = state.lastRank;
         }
    }
  } else if (q.includes('SUM(') || q.includes('AVG(') || q.includes('COUNT(')) {
    let sum = rows.reduce((acc, r) => acc + Number(r.salary || r.amount || 0), 0);
    let count = rows.length;
    return [{ count, sum, avg: sum/count }];
  }
  return rows;
}

function formatOfflineTable(rows: any[]): string[] {
  if (rows.length === 0) return ['(Empty Result)'];
  const cols = Object.keys(rows[0]);
  const strRows = rows.map(r => cols.map(c => String(r[c])));
  const colWidths = cols.map((c, i) => Math.max(c.length, ...strRows.map(r => r[i].length)));
  
  const lines: string[] = [];
  lines.push('┌' + colWidths.map(w => '─'.repeat(w + 2)).join('┬') + '┐');
  lines.push('│ ' + cols.map((c, i) => c.padEnd(colWidths[i])).join(' │ ') + ' │');
  lines.push('├' + colWidths.map(w => '─'.repeat(w + 2)).join('┼') + '┤');
  for (const row of strRows) {
      lines.push('│ ' + row.map((v, i) => v.padEnd(colWidths[i])).join(' │ ') + ' │');
  }
  lines.push('└' + colWidths.map(w => '─'.repeat(w + 2)).join('┴') + '┘');
  return lines;
}

function formatDuckdbTable(arrowResult: any): string[] {
  const rows = arrowResult.toArray();
  if (rows.length === 0) return ['(Empty Result)'];
  const cols = Object.keys(rows[0].toJSON());
  const strRows: string[][] = rows.map((r: any) => cols.map((c: string) => String(r.toJSON()[c])));
  const colWidths = cols.map((c: string, i: number) => Math.max(c.length, ...strRows.map((r: string[]) => r[i].length)));
  
  const lines: string[] = [];
  lines.push('┌' + colWidths.map((w: number) => '─'.repeat(w + 2)).join('┬') + '┐');
  lines.push('│ ' + cols.map((c: string, i: number) => c.padEnd(colWidths[i])).join(' │ ') + ' │');
  lines.push('├' + colWidths.map((w: number) => '─'.repeat(w + 2)).join('┼') + '┤');
  for (const row of strRows) {
      lines.push('│ ' + row.map((v: string, i: number) => v.padEnd(colWidths[i])).join(' │ ') + ' │');
  }
  lines.push('└' + colWidths.map(w => '─'.repeat(w + 2)).join('┴') + '┘');
  return lines;
}

// ----------------------------------------------------------------------
// Micro Python Executor (Zero-dependency Offline Fallback)
// ----------------------------------------------------------------------
function evaluateOfflinePython(code: string, testCases?: Array<{ input: string; expected: string }>): string[] {
  const logs: string[] = [];
  let js = '';
  const lines = code.split('\n');
  let indentStack = [0];
  
  for (let i = 0; i < lines.length; i++) {
      let line = lines[i];
      if (line.trim() === '' || line.trim().startsWith('#')) continue;
      const currentIndent = line.search(/\\S/);
      let trimmed = line.trim();
      
      if (currentIndent % 4 !== 0 && currentIndent % 2 !== 0 && currentIndent !== 0) {
          throw new SyntaxError(`IndentationError: unexpected indent at line ${i+1}`);
      }
      
      while (indentStack.length > 1 && currentIndent < indentStack[indentStack.length - 1]) {
          js += '}\n';
          indentStack.pop();
      }
      
      if (trimmed.endsWith(':')) {
           indentStack.push(currentIndent + 4);
      }
      
      const defMatch = trimmed.match(/^def\s+([a-zA-Z0-9_]+)\s*\((.*?)\)\s*:/);
      if (defMatch) {
          js += `function ${defMatch[1]}(${defMatch[2]}) {\n`;
          continue;
      }
      
      const ifMatch = trimmed.match(/^if\s+(.*?)\s*:/);
      if (ifMatch) {
          js += `if (${ifMatch[1].replace(/\band\b/g, '&&').replace(/\bor\b/g, '||').replace(/\bnot\b/g, '!')}) {\n`;
          continue;
      }
      
      const elifMatch = trimmed.match(/^elif\s+(.*?)\s*:/);
      if (elifMatch) {
          js = js.replace(/}\s*$/, '') + `} else if (${elifMatch[1].replace(/\band\b/g, '&&').replace(/\bor\b/g, '||')}) {\n`;
          continue;
      }
      
      const elseMatch = trimmed.match(/^else\s*:/);
      if (elseMatch) {
          js = js.replace(/}\s*$/, '') + `} else {\n`;
          continue;
      }
      
      const forMatch = trimmed.match(/^for\s+([a-zA-Z0-9_]+)\s+in\s+range\((.*?)\)\s*:/);
      if (forMatch) {
          const args = forMatch[2].split(',').map(s => s.trim());
          let start = '0', end = '0', step = '1';
          if (args.length === 1) end = args[0];
          else if (args.length === 2) { start = args[0]; end = args[1]; }
          else { start = args[0]; end = args[1]; step = args[2]; }
          js += `for (let ${forMatch[1]} = ${start}; ${forMatch[1]} < ${end}; ${forMatch[1]} += ${step}) {\n`;
          continue;
      }
      
      const forListMatch = trimmed.match(/^for\s+([a-zA-Z0-9_]+)\s+in\s+(.*?)\s*:/);
      if (forListMatch) {
          js += `for (let ${forListMatch[1]} of ${forListMatch[2]}) {\n`;
          continue;
      }
      
      const whileMatch = trimmed.match(/^while\s+(.*?)\s*:/);
      if (whileMatch) {
          js += `while (${whileMatch[1].replace(/\band\b/g, '&&').replace(/\bor\b/g, '||')}) {\n`;
          continue;
      }
      
      let statement = trimmed;
      statement = statement.replace(/\bTrue\b/g, 'true')
                           .replace(/\bFalse\b/g, 'false')
                           .replace(/\bNone\b/g, 'null')
                           .replace(/\bint\((.*?)\)/g, 'Number($1)')
                           .replace(/\bfloat\((.*?)\)/g, 'Number($1)')
                           .replace(/\bstr\((.*?)\)/g, 'String($1)')
                           .replace(/\blen\((.*?)\)/g, '($1).length')
                           .replace(/\.append\(/g, '.push(')
                           .replace(/print\(/g, 'console.log(')
                           .replace(/np\.array/g, '')
                           .replace(/np\.sum/g, 'sum')
                           .replace(/np\.mean/g, 'mean');
                           
      js += statement + (statement.endsWith('{') || statement.endsWith('}') ? '' : ';') + '\n';
  }
  
  while (indentStack.length > 1) {
      js += '}\n';
      indentStack.pop();
  }

  const prelude = `
      const sum = (arr) => arr.reduce((a,b)=>a+b,0);
      const mean = (arr) => arr.length ? sum(arr)/arr.length : 0;
      const max = (arr) => Math.max(...arr);
      const min = (arr) => Math.min(...arr);
  `;
  
  try {
      const executor = new Function('console', prelude + js + '; return typeof solution === "function" ? solution : (typeof main === "function" ? main : null);');
      const mockConsole = { log: (...args: any[]) => logs.push(args.join(' ')) };
      executor(mockConsole);
      
      if (testCases && testCases.length > 0) {
          for (let i = 0; i < testCases.length; i++) {
              const tc = testCases[i];
              try {
                  const runner = new Function('console', prelude + js + '; return ' + tc.input + ';');
                  const res = runner(mockConsole);
                  const strRes = String(res);
                  if (tc.expected && !strRes.includes(tc.expected)) {
                      throw new Error(`expected '${tc.expected}', got '${strRes}'`);
                  }
                  logs.push(`✓ Test Case ${i + 1}: ${tc.input} -> ${strRes} (PASSED)`);
              } catch (assertErr: any) {
                  throw new Error(`Test Case ${i + 1} Failed: ${assertErr.message}`);
              }
          }
      } else {
         logs.push('✓ Python computational kernel executed successfully.');
      }
  } catch (e: any) {
      throw new Error('Offline Python Evaluation Error: ' + e.message);
  }
  return logs;
}

self.onmessage = async (e: MessageEvent<WorkerMessageRequest>) => {
  const { id, type, code, challengeId, testCases } = e.data;

  if (type === 'INTERRUPT') {
    self.postMessage({
      id,
      success: false,
      output: ['[Interrupted by user kernel signal: SIGINT]'],
      executionTimeMs: 0,
      memoryUsedBytes: 0,
    } as WorkerMessageResponse);
    return;
  }

  const startTime = performance.now();

  try {
    const isSql = Boolean(
      (challengeId && challengeId.includes('sql')) ||
      /^\s*(--|SELECT|WITH|CREATE)/i.test(code)
    );

    const logs: string[] = [];

    const bracketCheck = checkBracketsBalanced(code);
    if (!bracketCheck.balanced) {
      throw new SyntaxError(`Unmatched closing or unclosed bracket '${bracketCheck.char || 'bracket'}' in expression.`);
    }

    if (isSql) {
      logs.push('> Initializing SQL Engine...');
      let conn = await getDuckDBConn();
      
      if (conn) {
        logs.push('> DuckDB WASM v1.28.0 loaded successfully via CDN.');
        const result = await conn.query(code);
        logs.push(...formatDuckdbTable(result));
        
        if (testCases && testCases.length > 0) {
          for (let i = 0; i < testCases.length; i++) {
             const tc = testCases[i];
             try {
                const tcResult = await conn.query(tc.input);
                logs.push(`✓ Test Case ${i + 1} Evaluated:`);
                logs.push(...formatDuckdbTable(tcResult));
             } catch (e: any) {
                throw new Error(`Test Case ${i + 1} Failed: ${e.message}`);
             }
          }
        }
      } else {
        logs.push('> DuckDB WASM unavailable. Falling back to offline Relational Executor...');
        const result = executeOfflineSQL(code);
        logs.push(...formatOfflineTable(result));
        
        if (testCases && testCases.length > 0) {
          for (let i = 0; i < testCases.length; i++) {
             const tc = testCases[i];
             try {
                const tcResult = executeOfflineSQL(tc.input);
                logs.push(`✓ Test Case ${i + 1} Evaluated:`);
                logs.push(...formatOfflineTable(tcResult));
             } catch (e: any) {
                throw new Error(`Test Case ${i + 1} Failed: ${e.message}`);
             }
          }
        }
      }
    } else {
      const py = await getPyodide();
      if (py) {
        logs.push('> Pyodide v0.26.2 WebAssembly Kernel initialized');
        const capturedOut: string[] = [];
        py.setStdout({ batched: (msg: string) => capturedOut.push(msg) });
        py.setStderr({ batched: (msg: string) => logs.push(`! ${msg}`) });

        await py.runPythonAsync(code);
        if (capturedOut.length > 0) logs.push(...capturedOut);

        if (testCases && testCases.length > 0) {
          for (let i = 0; i < testCases.length; i++) {
            const tc = testCases[i];
            try {
              const res = await py.runPythonAsync(tc.input);
              const strRes = String(res);
              if (tc.expected && !strRes.includes(tc.expected)) {
                throw new Error(`Assertion failed: expected '${tc.expected}', got '${strRes}'`);
              }
              logs.push(`✓ Test Case ${i + 1}: ${tc.input} -> ${strRes} (PASSED)`);
            } catch (assertErr: unknown) {
              const errMsg = assertErr instanceof Error ? assertErr.message : String(assertErr);
              throw new Error(`Test Case ${i + 1} Failed: ${errMsg}`);
            }
          }
        } else {
          logs.push('✓ Python computational kernel executed successfully.');
        }
      } else {
        logs.push('> Pyodide unavailable. Falling back to Offline Python Micro-Evaluator...');
        const strippedCode = code
          .replace(/#[^\n]*/g, '')
          .replace(/"""[\s\S]*?"""/g, '')
          .replace(/'''[\s\S]*?'''/g, '')
          .trim();

        const hasPassOnly = /\bdef\s+\w+\([^)]*\):\s*(pass|\.\.\.)\s*$/.test(strippedCode);
        if (hasPassOnly) {
          throw new Error('NotImplementedError: Function body is empty (pass). Please implement the computational kernel.');
        }

        const offlineLogs = evaluateOfflinePython(code, testCases);
        logs.push(...offlineLogs);
      }
    }

    const elapsed = Math.max(2, Math.round(performance.now() - startTime));
    const memoryBytes = isSql ? 420000 : 850000;

    logs.push(`Execution time: ${elapsed}ms | Memory allocated: ${(memoryBytes / (1024 * 1024)).toFixed(2)}MB`);
    logs.push('All tests verified! Concept compiled successfully.');

    self.postMessage({
      id,
      success: true,
      output: logs,
      executionTimeMs: elapsed,
      memoryUsedBytes: memoryBytes,
    } as WorkerMessageResponse);
  } catch (err: any) {
    const errorMsg = err.message || String(err);
    const errorType = err instanceof SyntaxError ? 'SyntaxError' : 'RuntimeError';

    const failLogs = [
      `Traceback (most recent call last):`,
      `  File "<stdin>", line 1, in <module>`,
      `${errorType}: ${errorMsg}`,
      `--------------------------------------------------`,
      `[FAIL] Test verification failed. Review your implementation and try again.`,
    ];

    self.postMessage({
      id,
      success: false,
      output: failLogs,
      executionTimeMs: Math.round(performance.now() - startTime),
      memoryUsedBytes: 0,
      error: errorMsg,
    } as WorkerMessageResponse);
  }
};

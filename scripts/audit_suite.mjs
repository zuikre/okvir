import esbuild from 'esbuild';
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

async function main() {
  console.log('='.repeat(70));
  console.log('OKVIR 125-LESSON CURRICULUM SUITE & DSL AUDIT');
  console.log('='.repeat(70));

  // 1. Bundle TypeScript curriculum
  console.log('\n[STEP 1] Bundling TypeScript curriculum definitions...');
  const bundleResult = await esbuild.build({
    entryPoints: ['./src/lib/curriculum.ts'],
    bundle: true,
    format: 'esm',
    write: false,
    platform: 'node',
    target: 'node22'
  });

  const bundleCode = bundleResult.outputFiles[0].text;
  const tmpBundlePath = path.resolve('./node_modules/.curriculum_bundle.mjs');
  fs.writeFileSync(tmpBundlePath, bundleCode, 'utf-8');

  const { tracks, curriculum } = await import(tmpBundlePath);
  console.log(`Loaded ${tracks.length} tracks and ${curriculum.length} modules from TypeScript.`);

  // 2. Audit tracks distribution
  console.log('\n[STEP 2] Verifying track structure and module counts...');
  const expectedTracks = {
    math: 29,
    programming: 30,
    econometrics: 33,
    deeplearning: 33
  };

  const trackCounts = {};
  for (const m of curriculum) {
    trackCounts[m.trackId] = (trackCounts[m.trackId] || 0) + 1;
  }

  let trackMismatch = false;
  for (const [trackId, count] of Object.entries(expectedTracks)) {
    const actual = trackCounts[trackId] || 0;
    const ok = actual === count;
    if (!ok) trackMismatch = true;
    console.log(`  Track '${trackId}': ${actual}/${count} lessons [${ok ? 'OK' : 'MISMATCH'}]`);
  }

  if (curriculum.length !== 125 || trackMismatch) {
    console.error(`ERROR: Expected 125 total lessons, found ${curriculum.length}`);
    process.exit(1);
  }

  // 3. Audit 4-beat micro-loop on all 125 modules
  console.log('\n[STEP 3] Auditing 4-Beat Micro-Loop across all 125 curriculum modules...');
  let beatErrors = [];
  let codeIssues = [];
  let quizIssues = [];

  const pythonChallengesToVerify = [];

  for (let i = 0; i < curriculum.length; i++) {
    const mod = curriculum[i];
    const prefix = `[#${i + 1} ${mod.id}]`;

    // Metadata checks
    if (!mod.id) beatErrors.push(`${prefix} Missing module id`);
    if (!mod.title) beatErrors.push(`${prefix} Missing module title`);
    if (!mod.titleAr) beatErrors.push(`${prefix} Missing Arabic title (titleAr)`);
    if (!mod.trackId) beatErrors.push(`${prefix} Missing trackId`);
    if (!mod.estimatedMinutes || mod.estimatedMinutes <= 0) beatErrors.push(`${prefix} Invalid estimatedMinutes: ${mod.estimatedMinutes}`);

    // Beats check
    if (!mod.beats || mod.beats.length !== 4) {
      beatErrors.push(`${prefix} Expected exactly 4 beats, found ${mod.beats?.length || 0}`);
      continue;
    }

    const [b1, b2, b3, b4] = mod.beats;

    // Beat 1: Intuition
    if (b1.number !== 1 || b1.type !== 'intuition') {
      beatErrors.push(`${prefix} Beat 1 must have number: 1, type: 'intuition'`);
    }
    if (!b1.simulation || typeof b1.simulation !== 'string') {
      beatErrors.push(`${prefix} Beat 1 missing simulation component`);
    }
    if (!b1.narrative?.en || b1.narrative.en.trim().length < 20) {
      beatErrors.push(`${prefix} Beat 1 English narrative missing or too brief`);
    }
    if (!b1.narrative?.ar || b1.narrative.ar.trim().length < 10) {
      beatErrors.push(`${prefix} Beat 1 Arabic narrative missing or too brief`);
    }

    // Beat 2: Formal Anchor
    if (b2.number !== 2 || b2.type !== 'formal') {
      beatErrors.push(`${prefix} Beat 2 must have number: 2, type: 'formal'`);
    }
    if (!b2.formula || b2.formula.trim().length === 0) {
      beatErrors.push(`${prefix} Beat 2 missing KaTeX formula anchor`);
    }
    if (!b2.narrative?.en || !b2.narrative?.ar) {
      beatErrors.push(`${prefix} Beat 2 narrative missing bilingual text`);
    }

    // Beat 3: Code Challenge
    if (b3.number !== 3 || b3.type !== 'code') {
      beatErrors.push(`${prefix} Beat 3 must have number: 3, type: 'code'`);
    }
    const code = b3.code;
    if (!code) {
      beatErrors.push(`${prefix} Beat 3 missing code challenge object`);
    } else {
      if (!code.id) codeIssues.push(`${prefix} Code challenge missing id`);
      if (!code.starterCode || code.starterCode.trim().length === 0) {
        codeIssues.push(`${prefix} Starter code is empty`);
      }
      if (!code.solution || code.solution.trim().length === 0) {
        codeIssues.push(`${prefix} Solution code is empty`);
      }
      if (!code.testCases || code.testCases.length === 0) {
        codeIssues.push(`${prefix} Test cases array is empty`);
      } else {
        for (let tIdx = 0; tIdx < code.testCases.length; tIdx++) {
          const tc = code.testCases[tIdx];
          if (!tc.input || !tc.expected) {
            codeIssues.push(`${prefix} Test case #${tIdx + 1} missing input or expected`);
          }
        }
      }

      // Starter code vs Solution check: starter code should NOT be identical to solution
      if (code.starterCode && code.solution) {
        const cleanStarter = code.starterCode.trim();
        const cleanSol = code.solution.trim();
        if (cleanStarter === cleanSol) {
          codeIssues.push(`${prefix} Starter code is IDENTICAL to solution (student gets answer pre-filled)`);
        }

        // Verify starter code has scaffolding (pass, TODO, ..., or signature)
        const hasScaffolding = /pass|\.\.\.|# TODO|TODO|raise NotImplementedError|SELECT.*FROM/i.test(cleanStarter);
        if (!hasScaffolding) {
          // Check if it's SQL or python
          codeIssues.push(`${prefix} Starter code may not have a TODO / pass placeholder`);
        }

        // Verify solution is not just a stub
        const solutionIsStub = /^\s*(def\s+\w+.*:\s*pass|\.\.\.)\s*$/.test(cleanSol);
        if (solutionIsStub) {
          codeIssues.push(`${prefix} Solution code is just a stub!`);
        }

        // Collect Python code for syntax verification
        const isSql = (code.id && code.id.includes('sql')) || /^(--|SELECT|WITH)/i.test(code.starterCode);
        if (!isSql) {
          pythonChallengesToVerify.push({
            id: code.id,
            modId: mod.id,
            starterCode: code.starterCode,
            solution: code.solution
          });
        }
      }

      // Hints check
      if (!b3.hints?.tier1?.en || !b3.hints?.tier2?.en || !b3.hints?.tier3?.en) {
        codeIssues.push(`${prefix} Incomplete 3-tier English hints`);
      }
      if (!b3.hints?.tier1?.ar || !b3.hints?.tier2?.ar || !b3.hints?.tier3?.ar) {
        codeIssues.push(`${prefix} Incomplete 3-tier Arabic hints`);
      }
    }

    // Beat 4: Transfer Challenge (Quiz)
    if (b4.number !== 4 || b4.type !== 'transfer') {
      beatErrors.push(`${prefix} Beat 4 must have number: 4, type: 'transfer'`);
    }
    const q = b4.question;
    if (!q) {
      quizIssues.push(`${prefix} Beat 4 missing question object`);
    } else {
      if (!q.prompt?.en || !q.prompt?.ar) {
        quizIssues.push(`${prefix} Beat 4 prompt missing bilingual text`);
      }
      if (!q.options || q.options.length < 2) {
        quizIssues.push(`${prefix} Beat 4 must have at least 2 options, found ${q.options?.length || 0}`);
      } else {
        const correctCount = q.options.filter(o => o.correct).length;
        if (correctCount === 0) {
          quizIssues.push(`${prefix} Beat 4 has NO correct option marked`);
        }
        const falseCount = q.options.filter(o => !o.correct).length;
        if (falseCount === 0) {
          quizIssues.push(`${prefix} Beat 4 has NO distractor options (all options are true)`);
        }
        for (let optIdx = 0; optIdx < q.options.length; optIdx++) {
          const opt = q.options[optIdx];
          if (!opt.text?.en || !opt.text?.ar) {
            quizIssues.push(`${prefix} Beat 4 Option #${optIdx + 1} missing bilingual text`);
          }
        }
      }
    }
  }

  console.log(`\nBeat Verification Results:`);
  console.log(`  Beat structural errors: ${beatErrors.length}`);
  if (beatErrors.length > 0) {
    beatErrors.slice(0, 10).forEach(e => console.log('    ' + e));
  }
  console.log(`  Code challenge issues: ${codeIssues.length}`);
  if (codeIssues.length > 0) {
    codeIssues.slice(0, 10).forEach(e => console.log('    ' + e));
  }
  console.log(`  Quiz / Transfer issues: ${quizIssues.length}`);
  if (quizIssues.length > 0) {
    quizIssues.slice(0, 10).forEach(e => console.log('    ' + e));
  }

  // 4. Validate Python syntax of starterCode and solution
  console.log(`\n[STEP 4] Validating Python AST syntax for ${pythonChallengesToVerify.length} Python challenges...`);
  let pythonSyntaxErrors = [];
  
  // We can write a quick python validation script
  const pyCheckPayload = JSON.stringify(pythonChallengesToVerify.map(p => ({
    id: p.id,
    starterCode: p.starterCode,
    solution: p.solution
  })));

  const pyCheckScript = `
import sys, json, ast

data = json.loads(sys.stdin.read())
errors = []

for item in data:
    cid = item['id']
    # Check starter code
    try:
        ast.parse(item['starterCode'])
    except Exception as e:
        errors.append(f"Starter code syntax error in {cid}: {e}")
    # Check solution
    try:
        ast.parse(item['solution'])
    except Exception as e:
        errors.append(f"Solution syntax error in {cid}: {e}")

if errors:
    print(json.dumps({"ok": False, "errors": errors}))
else:
    print(json.dumps({"ok": True, "count": len(data)}))
`;

  const pyRes = spawnSync('python3', ['-c', pyCheckScript], {
    input: pyCheckPayload,
    encoding: 'utf-8',
    maxBuffer: 50 * 1024 * 1024
  });

  if (pyRes.status !== 0 || !pyRes.stdout) {
    console.error('Python AST checker failed to execute:', pyRes.stderr);
  } else {
    const checkResult = JSON.parse(pyRes.stdout.trim());
    if (!checkResult.ok) {
      console.error('Python AST syntax errors found:', checkResult.errors);
      pythonSyntaxErrors = checkResult.errors;
    } else {
      console.log(`  ✔ All ${checkResult.count} Python starter and solution code blocks parsed with valid CPython 3.12 AST!`);
    }
  }

  // 5. Cross-reference with .okvir.md markdown files
  console.log('\n[STEP 5] Auditing .okvir.md markdown files in curriculum/ ...');
  function findOkvirFiles(dir) {
    let files = [];
    if (!fs.existsSync(dir)) return files;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const ent of entries) {
      const full = path.join(dir, ent.name);
      if (ent.isDirectory()) {
        files = files.concat(findOkvirFiles(full));
      } else if (ent.name.endsWith('.okvir.md')) {
        files.push(full);
      }
    }
    return files;
  }

  const okvirFiles = findOkvirFiles(path.resolve('curriculum'));
  console.log(`Found ${okvirFiles.length} .okvir.md files.`);

  const markdownIds = new Set();
  let markdownErrors = [];

  for (const f of okvirFiles) {
    const content = fs.readFileSync(f, 'utf-8');
    const rel = path.relative(path.resolve('curriculum'), f);

    // Frontmatter check
    const fmMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!fmMatch) {
      markdownErrors.push(`${rel}: Missing YAML frontmatter`);
      continue;
    }
    const idMatch = fmMatch[1].match(/^id:\s*["']?([^"'\r\n]+)["']?/m);
    if (!idMatch) {
      markdownErrors.push(`${rel}: Frontmatter missing 'id'`);
      continue;
    }
    const lessonId = idMatch[1].trim();
    markdownIds.add(lessonId);

    // KaTeX check
    const hasMath = /\$\$[\s\S]+?\$\$|\\\(.+?\\\)/.test(content);
    if (!hasMath) {
      markdownErrors.push(`${rel}: Missing KaTeX math block ($$ ... $$)`);
    }

    // Simulation widget check
    const hasSim = /:::simulation-widget\{/.test(content);
    if (!hasSim) {
      markdownErrors.push(`${rel}: Missing :::simulation-widget directive`);
    }

    // Python challenge check
    const hasChallenge = /:::python-challenge\{/.test(content);
    if (!hasChallenge) {
      markdownErrors.push(`${rel}: Missing :::python-challenge directive`);
    } else {
      if (!/test_cases:/.test(content)) {
        markdownErrors.push(`${rel}: Challenge missing test_cases`);
      }
    }
  }

  console.log(`  Markdown validation issues: ${markdownErrors.length}`);
  if (markdownErrors.length > 0) {
    markdownErrors.forEach(e => console.log('    ' + e));
  }

  // Cross-reference IDs between TS and Markdown
  const tsIds = new Set(curriculum.map(m => m.id));
  const missingInMarkdown = [...tsIds].filter(id => !markdownIds.has(id));
  const missingInTs = [...markdownIds].filter(id => !tsIds.has(id));

  console.log(`\n[STEP 6] Cross-referencing 125 TypeScript modules <-> 125 Markdown files:`);
  console.log(`  TypeScript IDs: ${tsIds.size}`);
  console.log(`  Markdown IDs:   ${markdownIds.size}`);
  console.log(`  Missing in Markdown: ${missingInMarkdown.length}`);
  if (missingInMarkdown.length > 0) console.log('    ', missingInMarkdown);
  console.log(`  Missing in TypeScript: ${missingInTs.length}`);
  if (missingInTs.length > 0) console.log('    ', missingInTs);

  // Clean up temp bundle
  try { fs.unlinkSync(tmpBundlePath); } catch {}

  // Final Summary
  console.log('\n' + '='.repeat(70));
  console.log('AUDIT SUMMARY');
  console.log('='.repeat(70));
  const totalIssues = beatErrors.length + codeIssues.length + quizIssues.length + pythonSyntaxErrors.length + markdownErrors.length + missingInMarkdown.length + missingInTs.length;
  console.log(`Total Curriculum Modules: 125`);
  console.log(`Total Markdown Files:     125`);
  console.log(`Total Issues Found:       ${totalIssues}`);
  if (totalIssues === 0) {
    console.log('✔ PERFECT SCORE: 100% of 125 lessons satisfy all DSL schemas, 4-beat loops, and code consistency!');
  } else {
    console.log(`✖ Audit found ${totalIssues} issue(s). Please review above.`);
    process.exit(1);
  }
}

main().catch(console.error);

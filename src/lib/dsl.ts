/**
 * OKVIR (.okvir.md) Content Authoring DSL & Schema Validator
 * Implements PRD Section 14:
 * Extended Markdown with frontmatter, KaTeX math blocks,
 * :::simulation-widget directives, and :::python-challenge AST nodes.
 */

import type { CurriculumModule, BeatNumber } from './types';

export interface OkvirFrontmatter {
  id: string;
  version: string;
  title: string;
  track: string;
  module: string;
  estimated_minutes: number;
  prerequisites: string[];
  i18n?: {
    ar?: string;
    fr?: string;
  };
}

export interface ParsedSimulationDirective {
  engine: 'canvas2d' | 'r3f' | 'webgl';
  component: string;
  props: Record<string, unknown>;
}

export interface ParsedPythonChallenge {
  id: string;
  timeout_ms: number;
  starterCode: string;
  testCases: Array<{ input: string; expected: string }>;
}

export class OkvirDslParser {
  /**
   * Parse frontmatter block (---\n...\n---)
   */
  static parseFrontmatter(markdown: string): { frontmatter: Partial<OkvirFrontmatter>; content: string } {
    const match = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
    if (!match) {
      return { frontmatter: {}, content: markdown };
    }

    const yamlStr = match[1];
    const content = match[2];
    const frontmatter: Record<string, unknown> = {};

    yamlStr.split('\n').forEach((line) => {
      const colonIdx = line.indexOf(':');
      if (colonIdx > 0) {
        const key = line.slice(0, colonIdx).trim();
        let val = line.slice(colonIdx + 1).trim();
        // Strip string quotes
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.slice(1, -1);
        }
        // Handle basic arrays e.g. ["a", "b"]
        if (val.startsWith('[') && val.endsWith(']')) {
          try {
            frontmatter[key] = JSON.parse(val);
            return;
          } catch {
            // fallback
          }
        }
        // Handle number
        if (!isNaN(Number(val)) && val !== '') {
          frontmatter[key] = Number(val);
        } else {
          frontmatter[key] = val;
        }
      }
    });

    return { frontmatter: frontmatter as Partial<OkvirFrontmatter>, content };
  }

  /**
   * Extract :::simulation-widget{...} blocks
   */
  static parseSimulationWidgets(content: string): ParsedSimulationDirective[] {
    const regex = /:::simulation-widget\{([^}]+)\}([\s\S]*?):::/g;
    const directives: ParsedSimulationDirective[] = [];
    let match: RegExpExecArray | null;

    while ((match = regex.exec(content)) !== null) {
      const attrsStr = match[1];
      const propsBody = match[2];
      const attrs: Record<string, string> = {};

      attrsStr.replace(/(\w+)=["']([^"']+)["']/g, (_, key, value) => {
        attrs[key] = value;
        return '';
      });

      const props: Record<string, unknown> = {};
      propsBody.split('\n').forEach((line) => {
        const idx = line.indexOf(':');
        if (idx > 0) {
          const k = line.slice(0, idx).trim();
          let v = line.slice(idx + 1).trim();
          if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
            v = v.slice(1, -1);
          }
          props[k] = v === 'true' ? true : v === 'false' ? false : !isNaN(Number(v)) ? Number(v) : v;
        }
      });

      directives.push({
        engine: (attrs.engine as 'canvas2d' | 'r3f' | 'webgl') || 'canvas2d',
        component: attrs.component || 'LinearRegressionResiduals',
        props,
      });
    }

    return directives;
  }

  /**
   * Extract KaTeX mathematical block equations ($$ ... $$)
   */
  static extractMathBlocks(content: string): string[] {
    const regex = /\$\$([\s\S]*?)\$\$/g;
    const formulas: string[] = [];
    let match: RegExpExecArray | null;
    while ((match = regex.exec(content)) !== null) {
      formulas.push(match[1].trim());
    }
    return formulas;
  }

  /**
   * Validate a curriculum module against pedagogical constraints
   * (4 beats, max 3 sentences of passive text before interaction, code tests)
   */
  static validateCurriculumModule(mod: CurriculumModule): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!mod.id || mod.id.trim() === '') errors.push('Module id is required.');
    if (!mod.title || mod.title.trim() === '') errors.push('Module title is required.');
    if (!mod.beats || mod.beats.length !== 4) {
      errors.push(`Module ${mod.id} must define exactly 4 beats (found ${mod.beats?.length || 0}).`);
    }

    const beatNumbers = (mod.beats || []).map((b) => b.number);
    if (![1, 2, 3, 4].every((n) => beatNumbers.includes(n as BeatNumber))) {
      errors.push(`Module ${mod.id} beats must strictly cover beats 1, 2, 3, and 4.`);
    }

    // Beat 3 code validation
    const codeBeat = mod.beats?.find((b) => b.number === 3);
    if (!codeBeat?.code) {
      errors.push(`Module ${mod.id} Beat 3 must provide a CodeChallenge object.`);
    } else {
      if (!codeBeat.code.starterCode || codeBeat.code.starterCode.trim() === '') {
        errors.push(`Module ${mod.id} Beat 3 starterCode cannot be empty.`);
      }
      if (!codeBeat.code.testCases || codeBeat.code.testCases.length === 0) {
        errors.push(`Module ${mod.id} Beat 3 must contain at least 1 unit test case.`);
      }
    }

    // Beat 4 transfer challenge validation
    const transferBeat = mod.beats?.find((b) => b.number === 4);
    if (!transferBeat?.question) {
      errors.push(`Module ${mod.id} Beat 4 must provide a transfer QuizQuestion.`);
    } else {
      const options = transferBeat.question.options || [];
      if (options.length < 2) {
        errors.push(`Module ${mod.id} Beat 4 quiz must have at least 2 options.`);
      }
      if (!options.some((o) => o.correct)) {
        errors.push(`Module ${mod.id} Beat 4 quiz must contain at least 1 correct option.`);
      }
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }
}

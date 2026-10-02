import React from 'react';
import { KaTeXMath } from './KaTeXMath';

interface MathTextProps {
  text: string;
  className?: string;
  inline?: boolean;
}

type MarkdownBlock =
  | { type: 'display_math'; math: string }
  | { type: 'heading'; level: number; text: string }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'ol'; items: string[] }
  | { type: 'ul'; items: string[] }
  | { type: 'hr' }
  | { type: 'p'; text: string };

const INLINE_REGEX =
  /(\$[^$\n]+?\$|`[^`\n]+?`|\*\*\*(?!\s)[^*]+?(?<!\s)\*\*\*|\*\*(?!\s)[^*]+?(?<!\s)\*\*|\*(?!\s)[^*]+?(?<!\s)\*)/g;

/**
 * Parses and renders inline markdown tokens:
 * - $math$
 * - `code`
 * - ***bold italic***
 * - **bold**
 * - *italic*
 * - Unescaped LaTeX fallbacks
 */
function renderInline(str: string, keyPrefix = 'inl'): React.ReactNode[] {
  if (!str) return [];

  const parts = str.split(INLINE_REGEX);

  return parts
    .map((part, idx) => {
      if (!part) return null;
      const key = `${keyPrefix}-${idx}`;

      // LaTeX inline ($...$)
      if (part.startsWith('$') && part.endsWith('$') && part.length > 2) {
        const math = part.slice(1, -1);
        return (
          <span key={key} dir="ltr" className="inline-block mx-1 align-baseline">
            <KaTeXMath math={math} inline className="text-[var(--text-primary)]" />
          </span>
        );
      }

      // Inline Code (`...`)
      if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
        const code = part.slice(1, -1);
        return (
          <code
            key={key}
            dir="ltr"
            className="inline-block mx-1 px-1.5 py-0.5 rounded bg-[var(--bg-app)] border border-[var(--border-subtle)] font-mono text-[11px] text-[var(--math-vector)]"
          >
            {code}
          </code>
        );
      }

      // Bold Italic (***...***)
      if (part.startsWith('***') && part.endsWith('***') && part.length > 6) {
        return (
          <strong key={key} className="font-bold text-[var(--text-primary)]">
            <em className="italic">{renderInline(part.slice(3, -3), `${key}-bi`)}</em>
          </strong>
        );
      }

      // Bold (**...**)
      if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
        return (
          <strong key={key} className="font-bold text-[var(--text-primary)]">
            {renderInline(part.slice(2, -2), `${key}-b`)}
          </strong>
        );
      }

      // Italic (*...*)
      if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
        return (
          <em key={key} className="italic text-[var(--text-primary)]">
            {renderInline(part.slice(1, -1), `${key}-i`)}
          </em>
        );
      }

      // Check for unescaped LaTeX macros like \hat, \beta, \theta, etc.
      const containsLatex = /\\[a-zA-Z]+|\^\{|_{|\|[a-zA-Z\s-]+\|/.test(part);
      if (containsLatex && (part.includes('\\') || part.includes('^') || part.includes('_'))) {
        if (
          part.trim().startsWith('\\') ||
          (/^[a-zA-Z0-9\s\\^_{}()+=/*-]+$/.test(part.trim()) && part.includes('\\'))
        ) {
          return (
            <span key={key} dir="ltr" className="inline-block mx-1 align-baseline">
              <KaTeXMath math={part.trim()} inline className="text-[var(--text-primary)]" />
            </span>
          );
        }
      }

      return <React.Fragment key={key}>{part}</React.Fragment>;
    })
    .filter(Boolean);
}

/**
 * Parses multiline markdown text into structured blocks (display math, headings, tables, lists, hr, paragraphs).
 */
function parseMarkdownBlocks(text: string): MarkdownBlock[] {
  const lines = text.split('\n');
  const blocks: MarkdownBlock[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // Skip empty lines
    if (!trimmed) {
      i++;
      continue;
    }

    // Display math: $$
    if (trimmed.startsWith('$$')) {
      if (trimmed.length > 2 && trimmed.endsWith('$$')) {
        blocks.push({ type: 'display_math', math: trimmed.slice(2, -2).trim() });
        i++;
        continue;
      }
      i++;
      const mathLines: string[] = [];
      while (i < lines.length && !lines[i].trim().endsWith('$$')) {
        mathLines.push(lines[i]);
        i++;
      }
      if (i < lines.length) {
        const last = lines[i].trim();
        if (last !== '$$') {
          mathLines.push(last.replace(/\$\$$/, ''));
        }
        i++;
      }
      blocks.push({ type: 'display_math', math: mathLines.join('\n').trim() });
      continue;
    }

    // Horizontal rule: --- or *** or ___
    if (trimmed === '---' || trimmed === '***' || trimmed === '___') {
      blocks.push({ type: 'hr' });
      i++;
      continue;
    }

    // Heading: #, ##, ###, ####, #####
    if (trimmed.startsWith('#')) {
      const match = trimmed.match(/^(#{1,6})\s+(.*)$/);
      if (match) {
        blocks.push({ type: 'heading', level: match[1].length, text: match[2] });
        i++;
        continue;
      }
    }

    // Table: starts with | and ends with |
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('|') && lines[i].trim().endsWith('|')) {
        tableLines.push(lines[i].trim());
        i++;
      }
      if (tableLines.length >= 2) {
        const parseRow = (row: string) => row.split('|').slice(1, -1).map((c) => c.trim());
        const headers = parseRow(tableLines[0]);
        // line 1 is separator (e.g., :--- | :---), lines 2+ are data
        const dataRows = tableLines.slice(2).map(parseRow);
        blocks.push({ type: 'table', headers, rows: dataRows });
        continue;
      }
    }

    // Ordered list: 1. ...
    if (/^\d+\.\s+/.test(trimmed)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s+/, ''));
        i++;
      }
      blocks.push({ type: 'ol', items });
      continue;
    }

    // Unordered list: - or *
    if (/^[-*]\s+/.test(trimmed)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^[-*]\s+/, ''));
        i++;
      }
      blocks.push({ type: 'ul', items });
      continue;
    }

    // Paragraph: collect lines until empty line or special block delimiter
    const pLines: string[] = [];
    while (i < lines.length) {
      const cur = lines[i].trim();
      if (!cur) break;
      if (
        cur === '---' ||
        cur === '***' ||
        cur === '___' ||
        cur.startsWith('#') ||
        cur.startsWith('$$') ||
        (cur.startsWith('|') && cur.endsWith('|')) ||
        /^\d+\.\s+/.test(cur) ||
        /^[-*]\s+/.test(cur)
      ) {
        break;
      }
      pLines.push(cur);
      i++;
    }
    if (pLines.length > 0) {
      blocks.push({ type: 'p', text: pLines.join(' ') });
    }
  }

  return blocks;
}

/**
 * MathText renders text containing inline LaTeX math ($...$), code snippets (`...`),
 * markdown bold (**...**), italics (*...*), and structured markdown blocks (tables, headings, lists).
 * Fully responsive and theme-aware (light/dark mode).
 */
export const MathText: React.FC<MathTextProps> = ({ text, className = '', inline = false }) => {
  if (!text) return null;

  // Determine if content is strictly single-line inline or multiline block markdown
  const hasBlockFeatures =
    !inline &&
    (text.includes('\n') ||
      text.includes('|') ||
      text.startsWith('#') ||
      text.startsWith('$$') ||
      /^\s*(\d+\.|[-*])\s+/.test(text));

  if (!hasBlockFeatures) {
    return <span className={className}>{renderInline(text)}</span>;
  }

  const blocks = parseMarkdownBlocks(text);

  return (
    <div className={`space-y-4 ${className}`}>
      {blocks.map((block, bIdx) => {
        const bKey = `blk-${bIdx}`;

        switch (block.type) {
          case 'display_math':
            return (
              <div
                key={bKey}
                dir="ltr"
                className="my-3 py-3 px-4 rounded-xl bg-[var(--bg-app)] border border-[var(--border-subtle)] overflow-x-auto text-center shadow-inner"
              >
                <KaTeXMath math={block.math} inline={false} className="text-[var(--text-primary)]" />
              </div>
            );

          case 'heading': {
            if (block.level <= 2) {
              return (
                <h3 key={bKey} className="text-lg font-bold text-[var(--text-primary)] mt-5 mb-2">
                  {renderInline(block.text, `${bKey}-h3`)}
                </h3>
              );
            }
            if (block.level === 3) {
              return (
                <h4 key={bKey} className="text-base font-bold text-[var(--text-primary)] mt-4 mb-2">
                  {renderInline(block.text, `${bKey}-h4`)}
                </h4>
              );
            }
            if (block.level === 4) {
              return (
                <h5 key={bKey} className="text-sm font-semibold text-[var(--text-primary)] mt-3 mb-1.5">
                  {renderInline(block.text, `${bKey}-h5`)}
                </h5>
              );
            }
            return (
              <h6
                key={bKey}
                className="text-xs font-semibold uppercase tracking-wider text-[var(--math-gradient)] mt-3 mb-1"
              >
                {renderInline(block.text, `${bKey}-h6`)}
              </h6>
            );
          }

          case 'table':
            return (
              <div
                key={bKey}
                className="overflow-x-auto my-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-sm"
              >
                <table className="w-full text-start text-xs border-collapse">
                  <thead className="bg-[var(--bg-app)] border-b border-[var(--border-subtle)] text-[var(--text-primary)] font-semibold font-mono">
                    <tr>
                      {block.headers.map((h, i) => (
                        <th
                          key={`${bKey}-th-${i}`}
                          className="py-2.5 px-3.5 text-start border-e last:border-e-0 border-[var(--border-subtle)] font-medium"
                        >
                          {renderInline(h, `${bKey}-th-${i}`)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border-subtle)]">
                    {block.rows.map((row, rIdx) => (
                      <tr
                        key={`${bKey}-tr-${rIdx}`}
                        className="hover:bg-[var(--bg-surface-hover)] transition-colors"
                      >
                        {row.map((cell, cIdx) => (
                          <td
                            key={`${bKey}-td-${rIdx}-${cIdx}`}
                            className="py-2.5 px-3.5 text-start border-e last:border-e-0 border-[var(--border-subtle)] text-[var(--text-secondary)]"
                          >
                            {renderInline(cell, `${bKey}-td-${rIdx}-${cIdx}`)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );

          case 'ol':
            return (
              <ol
                key={bKey}
                className="list-decimal list-outside ms-6 space-y-2.5 my-2.5 text-sm leading-relaxed text-[var(--text-secondary)]"
              >
                {block.items.map((item, idx) => (
                  <li key={`${bKey}-li-${idx}`} className="ps-1">
                    {renderInline(item, `${bKey}-li-${idx}`)}
                  </li>
                ))}
              </ol>
            );

          case 'ul':
            return (
              <ul
                key={bKey}
                className="list-disc list-outside ms-6 space-y-2.5 my-2.5 text-sm leading-relaxed text-[var(--text-secondary)]"
              >
                {block.items.map((item, idx) => (
                  <li key={`${bKey}-li-${idx}`} className="ps-1">
                    {renderInline(item, `${bKey}-li-${idx}`)}
                  </li>
                ))}
              </ul>
            );

          case 'hr':
            return <hr key={bKey} className="border-t border-[var(--border-subtle)] my-4" />;

          case 'p':
          default:
            return (
              <p key={bKey} className="leading-relaxed text-sm text-[var(--text-secondary)]">
                {renderInline(block.text, `${bKey}-p`)}
              </p>
            );
        }
      })}
    </div>
  );
};

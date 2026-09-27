import React from 'react';
import { KaTeXMath } from './KaTeXMath';

interface MathTextProps {
  text: string;
  className?: string;
}

/**
 * MathText renders text containing inline LaTeX math ($...$), code snippets (`...`),
 * and raw LaTeX symbols with strict LTR isolation for mixed Arabic/English pedagogical text.
 */
export const MathText: React.FC<MathTextProps> = ({ text, className = '' }) => {
  if (!text) return null;

  // Split on $...$ or `...`
  const regex = /(\$[^$]+\$|`[^`]+`)/g;
  const parts = text.split(regex);

  return (
    <span className={className}>
      {parts.map((part, idx) => {
        if (!part) return null;

        // LaTeX block ($...$)
        if (part.startsWith('$') && part.endsWith('$') && part.length > 2) {
          const math = part.slice(1, -1);
          return (
            <span key={idx} dir="ltr" className="inline-block mx-1 align-baseline">
              <KaTeXMath math={math} inline className="text-[var(--text-primary)]" />
            </span>
          );
        }

        // Inline Code (`...`)
        if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
          const code = part.slice(1, -1);
          return (
            <code
              key={idx}
              dir="ltr"
              className="inline-block mx-1 px-1.5 py-0.5 rounded bg-[var(--bg-app)] border border-[var(--border-subtle)] font-mono text-[11px] text-[var(--math-vector)]"
            >
              {code}
            </code>
          );
        }

        // Check if raw segment contains unescaped LaTeX macros like \hat, \beta, \theta, etc.
        const containsLatex = /\\[a-zA-Z]+|\^\{|_{|\|[a-zA-Z\s-]+\|/.test(part);
        if (containsLatex && (part.includes('\\') || part.includes('^') || part.includes('_'))) {
          // If the whole part is essentially a math formula
          if (part.trim().startsWith('\\') || (/^[a-zA-Z0-9\s\\^_{}()+=/*-]+$/.test(part.trim()) && part.includes('\\'))) {
            return (
              <span key={idx} dir="ltr" className="inline-block mx-1 align-baseline">
                <KaTeXMath math={part.trim()} inline className="text-[var(--text-primary)]" />
              </span>
            );
          }
        }

        return <React.Fragment key={idx}>{part}</React.Fragment>;
      })}
    </span>
  );
};

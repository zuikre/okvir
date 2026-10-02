import React, { useMemo, useRef, useEffect } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

import { useFormulaAnchorStore } from '@/lib/formulaAnchorStore';

interface KaTeXMathProps {
  math: string;
  block?: boolean;
  inline?: boolean;
  className?: string;
  onHoverVariable?: (variable: string | null) => void;
}

function normalizeMathToken(raw: string): string {
  return raw.replace(/[\\_{}^()]/g, '').trim();
}

export const KaTeXMath: React.FC<KaTeXMathProps> = ({
  math,
  block = true,
  inline = false,
  className = '',
  onHoverVariable,
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const isDisplay = block && !inline;
  const { activeToken, setActiveToken } = useFormulaAnchorStore();

  const html = useMemo(() => {
    try {
      return katex.renderToString(math, {
        displayMode: isDisplay,
        throwOnError: false,
        trust: true,
        strict: 'warn',
      });
    } catch {
      return math;
    }
  }, [math, isDisplay]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Scan rendered spans and tag math identifier tokens
    const candidateNodes = el.querySelectorAll('.mord, .mathnormal, .mrel, .mbin');
    candidateNodes.forEach((node) => {
      const text = node.textContent?.trim() || '';
      if (text.length >= 1 && text.length <= 4 && !node.getAttribute('data-math-token')) {
        if (!/^[,;()[\]{}|+=-]$/.test(text)) {
          node.setAttribute('data-math-token', text);
          (node as HTMLElement).classList.add('katex-interactive-symbol');
        }
      }
    });

    // Update active highlight classes
    const taggedNodes = el.querySelectorAll('[data-math-token]');
    taggedNodes.forEach((node) => {
      const token = node.getAttribute('data-math-token');
      const isMatch =
        activeToken &&
        token &&
        (token.toLowerCase() === activeToken.toLowerCase() ||
          normalizeMathToken(token).toLowerCase() === normalizeMathToken(activeToken).toLowerCase());
      if (isMatch) {
        (node as HTMLElement).classList.add('katex-token-active');
      } else {
        (node as HTMLElement).classList.remove('katex-token-active');
      }
    });

    const handlePointerOver = (e: Event) => {
      const target = (e.target as HTMLElement)?.closest('[data-math-token]') as HTMLElement | null;
      if (target) {
        const token = target.getAttribute('data-math-token');
        if (onHoverVariable) onHoverVariable(token);
        if (token) setActiveToken(token, 'formula');
      }
    };

    const handlePointerOut = (e: Event) => {
      const target = (e.target as HTMLElement)?.closest('[data-math-token]');
      if (target) {
        if (onHoverVariable) onHoverVariable(null);
      }
    };

    const handleClick = (e: Event) => {
      const target = (e.target as HTMLElement)?.closest('[data-math-token]') as HTMLElement | null;
      if (target) {
        const token = target.getAttribute('data-math-token');
        if (token) {
          setActiveToken(activeToken === token ? null : token, 'formula');
        }
      }
    };

    el.addEventListener('mouseover', handlePointerOver);
    el.addEventListener('mouseout', handlePointerOut);
    el.addEventListener('click', handleClick);

    return () => {
      el.removeEventListener('mouseover', handlePointerOver);
      el.removeEventListener('mouseout', handlePointerOut);
      el.removeEventListener('click', handleClick);
    };
  }, [html, activeToken, onHoverVariable, setActiveToken]);

  if (!isDisplay) {
    return (
      <bdi
        ref={containerRef as React.RefObject<HTMLElement>}
        dir="ltr"
        className={`inline-katex-isolate select-all ${className}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return (
    <div
      ref={containerRef as React.RefObject<HTMLDivElement>}
      dir="ltr"
      className={`block-katex-isolate select-all my-3 ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

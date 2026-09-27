import React, { useMemo, useRef, useEffect } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface KaTeXMathProps {
  math: string;
  block?: boolean;
  inline?: boolean;
  className?: string;
  onHoverVariable?: (variable: string | null) => void;
}

export const KaTeXMath: React.FC<KaTeXMathProps> = ({
  math,
  block = true,
  inline = false,
  className = '',
  onHoverVariable,
}) => {
  const containerRef = useRef<HTMLDivElement | HTMLSpanElement>(null);
  const isDisplay = block && !inline;

  const html = useMemo(() => {
    try {
      return katex.renderToString(math, {
        displayMode: isDisplay,
        throwOnError: false,
        trust: true,
      });
    } catch {
      return math;
    }
  }, [math, isDisplay]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !onHoverVariable) return;

    const handlePointerOver = (e: Event) => {
      const target = (e.target as HTMLElement)?.closest('[data-math-token]') as HTMLElement | null;
      if (target) {
        onHoverVariable(target.getAttribute('data-math-token'));
      }
    };

    const handlePointerOut = (e: Event) => {
      const target = (e.target as HTMLElement)?.closest('[data-math-token]');
      if (target) {
        onHoverVariable(null);
      }
    };

    el.addEventListener('mouseover', handlePointerOver);
    el.addEventListener('mouseout', handlePointerOut);
    return () => {
      el.removeEventListener('mouseover', handlePointerOver);
      el.removeEventListener('mouseout', handlePointerOut);
    };
  }, [onHoverVariable]);

  if (!isDisplay) {
    return (
      <span
        ref={containerRef as React.RefObject<HTMLSpanElement>}
        dir="ltr"
        className={`inline-block align-middle text-left font-mono select-all ${className}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return (
    <div
      ref={containerRef as React.RefObject<HTMLDivElement>}
      dir="ltr"
      className={`text-left font-mono select-all my-2 ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

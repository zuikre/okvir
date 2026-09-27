import React, { useMemo, useRef, useEffect } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface KaTeXMathProps {
  math: string;
  block?: boolean;
  className?: string;
  onHoverVariable?: (variable: string | null) => void;
}

export const KaTeXMath: React.FC<KaTeXMathProps> = ({
  math,
  block = true,
  className = '',
  onHoverVariable,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const html = useMemo(() => {
    try {
      return katex.renderToString(math, {
        displayMode: block,
        throwOnError: false,
        trust: true,
      });
    } catch {
      return math;
    }
  }, [math, block]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !onHoverVariable) return;

    const handlePointerOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('[data-math-token]') as HTMLElement | null;
      if (target) {
        onHoverVariable(target.getAttribute('data-math-token'));
      }
    };

    const handlePointerOut = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('[data-math-token]');
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

  return (
    <div
      ref={containerRef}
      dir="ltr"
      className={`text-left font-mono select-all ${block ? 'my-2' : 'inline-block'} ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

import React from 'react';
import type { VariableDescriptor, WasmMemoryStats } from '@/lib/pyodide/bridgeTypes';
import { useOkvirStore } from '@/lib/store';

interface VariableInspectorProps {
  variables: VariableDescriptor[];
  memory: WasmMemoryStats | null;
  className?: string;
}

export const VariableInspector: React.FC<VariableInspectorProps> = ({
  variables,
  memory,
  className = '',
}) => {
  const { language } = useOkvirStore();
  const isAr = language === 'ar';

  const formatBytes = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const usedBytes = memory?.heapUsedBytes ?? 0;
  const maxBytes = memory?.maxBudgetBytes ?? 350 * 1024 * 1024;
  const memPercent = Math.min(100, Math.round((usedBytes / maxBytes) * 100));

  return (
    <div
      className={`flex flex-col h-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-lg overflow-hidden font-mono text-xs ${className}`}
    >
      {/* Header bar */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-[var(--border-subtle)] bg-[var(--bg-app)]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--math-vector)] animate-pulse" />
          <span className="font-semibold text-[var(--text-primary)]">
            {isAr ? 'فاحص المتغيرات والذاكرة' : 'VARIABLE & MEMORY HUD'}
          </span>
          <span className="px-1.5 py-0.5 rounded text-[10px] bg-[var(--bg-surface-active)] text-[var(--text-secondary)]">
            {variables.length} {isAr ? 'رموز' : 'symbols'}
          </span>
        </div>

        {/* Memory badge */}
        <div className="flex items-center gap-2 text-[11px] text-[var(--text-secondary)]">
          <span>{formatBytes(usedBytes)}</span>
          <div className="w-16 h-1.5 bg-[var(--border-subtle)] rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                memPercent > 80
                  ? 'bg-[var(--math-loss)]'
                  : memPercent > 50
                  ? 'bg-[var(--math-gradient)]'
                  : 'bg-[var(--math-vector)]'
              }`}
              style={{ width: `${memPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Variables Table */}
      <div className="flex-1 overflow-y-auto">
        {variables.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-36 text-center text-[var(--text-tertiary)] p-4">
            <span className="text-lg mb-1">⎔</span>
            <span>
              {isAr
                ? 'لا توجد مصفوفات أو متغيرات في النطاق الحالي. شغّل الكود للفحص.'
                : 'No active tensors in scope. Execute Python kernel to inspect.'}
            </span>
          </div>
        ) : (
          <table className="w-full text-start border-collapse">
            <thead>
              <tr className="border-b border-[var(--border-subtle)] bg-[var(--bg-surface-hover)] text-[10px] uppercase text-[var(--text-tertiary)]">
                <th className="px-3 py-1.5 text-start font-medium">{isAr ? 'الاسم' : 'Symbol'}</th>
                <th className="px-2 py-1.5 text-start font-medium">{isAr ? 'الشكل' : 'Shape'}</th>
                <th className="px-2 py-1.5 text-start font-medium">{isAr ? 'النوع' : 'Dtype'}</th>
                <th className="px-2 py-1.5 text-start font-medium">{isAr ? 'الحجم' : 'Bytes'}</th>
                <th className="px-3 py-1.5 text-end font-medium">{isAr ? 'الحالة' : 'Integrity'}</th>
              </tr>
            </thead>
            <tbody>
              {variables.map((v) => {
                const shapeStr = v.shape ? `(${v.shape.join(', ')})` : 'scalar';
                return (
                  <tr
                    key={v.name}
                    className="border-b border-[var(--border-subtle)] hover:bg-[var(--bg-surface-hover)] transition-colors"
                  >
                    <td className="px-3 py-2 font-bold text-[var(--math-data)]">
                      {v.name}
                    </td>
                    <td className="px-2 py-2 text-[var(--text-secondary)]">{shapeStr}</td>
                    <td className="px-2 py-2 text-[var(--text-tertiary)]">{v.dtype || v.type}</td>
                    <td className="px-2 py-2 text-[var(--text-secondary)]">
                      {formatBytes(v.sizeBytes)}
                    </td>
                    <td className="px-3 py-2 text-end">
                      {v.hasNaN || v.hasInf ? (
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-950 text-red-400 border border-red-800">
                          {v.hasNaN ? 'NaN!' : 'Inf!'}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-950 text-emerald-400 border border-emerald-800">
                          ✓ OK
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

import React from 'react';
import type { VariableDescriptor, WasmMemoryStats } from '@/lib/pyodide/bridgeTypes';
import { useOkvirStore } from '@/lib/store';
import { Activity, AlertOctagon, CheckCircle2, Cpu } from 'lucide-react';

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

  // 16-segment LED VU Meter calculation (Teenage Engineering TX-6 style)
  const totalSegments = 16;
  const activeSegments = Math.round((memPercent / 100) * totalSegments);

  const hasAnyAnomaly = variables.some((v) => v.hasNaN || v.hasInf);

  return (
    <div
      className={`flex flex-col h-full bg-[#0e0e11] border border-[var(--border-subtle)] rounded-xl overflow-hidden font-mono text-xs shadow-xl select-none ${className}`}
    >
      {/* Hardware Telemetry Header */}
      <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-[var(--border-subtle)] bg-[#141418]">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-5 h-5 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <Cpu size={12} className="animate-pulse" />
          </div>
          <span className="font-bold tracking-wider text-[11px] text-[var(--text-primary)]">
            {isAr ? 'مرسمة المتغيرات والذاكرة WASM' : 'WASM TELEMETRY & TENSOR HUD'}
          </span>
          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#1f1f26] border border-[#2e2e38] text-zinc-400">
            {variables.length} {isAr ? 'عناصر' : 'SYMBOLS'}
          </span>
        </div>

        {/* 16-Segment LED Hardware VU Meter */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-zinc-400 tabular-nums font-semibold">
            {formatBytes(usedBytes)}
          </span>
          <div className="flex items-center gap-[2px] p-1 rounded bg-[#09090c] border border-[#22222a]">
            {Array.from({ length: totalSegments }).map((_, i) => {
              const isActive = i < activeSegments;
              const isWarning = i >= 11 && i < 14;
              const isCritical = i >= 14;
              return (
                <div
                  key={i}
                  className={`w-1 h-3 rounded-[1px] transition-colors duration-150 ${
                    isActive
                      ? isCritical
                        ? 'bg-rose-500 shadow-[0_0_4px_#f43f5e]'
                        : isWarning
                        ? 'bg-amber-400 shadow-[0_0_4px_#fbbf24]'
                        : 'bg-emerald-400 shadow-[0_0_4px_#34d399]'
                      : 'bg-[#1a1a22]'
                  }`}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Anomaly Radar Warning Banner */}
      {hasAnyAnomaly && (
        <div className="flex items-center gap-2 px-3 py-1.5 bg-rose-500/15 border-b border-rose-500/30 text-rose-300 text-[10px] animate-pulse">
          <AlertOctagon size={13} className="shrink-0 text-rose-400" />
          <span>
            {isAr
              ? 'تنبيه: تم رصد قيم شاذة (NaN / Infinity) في التنسورات النشطة!'
              : 'CRITICAL ANOMALY: NaN or Infinity detected in tensor memory!'}
          </span>
        </div>
      )}

      {/* Variables Table */}
      <div className="flex-1 overflow-y-auto">
        {variables.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-44 text-center text-zinc-500 p-6 space-y-2">
            <Activity size={24} className="text-zinc-600 animate-pulse" />
            <span className="text-xs">
              {isAr
                ? 'لا توجد مصفوفات أو متغيرات في النطاق الحالي. شغّل الكود للفحص.'
                : 'No active tensors in scope. Execute Python kernel to inspect.'}
            </span>
            <span className="text-[10px] text-zinc-600 font-sans">
              Pyodide WebAssembly V8 linear memory scope
            </span>
          </div>
        ) : (
          <table className="w-full text-start border-collapse">
            <thead>
              <tr className="border-b border-[#1f1f26] bg-[#121216] text-[9px] uppercase tracking-wider text-zinc-400">
                <th className="px-3 py-2 text-start font-semibold">{isAr ? 'الرمز' : 'SYMBOL'}</th>
                <th className="px-2.5 py-2 text-start font-semibold">{isAr ? 'الشكل' : 'SHAPE'}</th>
                <th className="px-2.5 py-2 text-start font-semibold">{isAr ? 'النوع' : 'DTYPE'}</th>
                <th className="px-2.5 py-2 text-start font-semibold">{isAr ? 'الحجم' : 'BYTES'}</th>
                <th className="px-3 py-2 text-end font-semibold">{isAr ? 'السلامة' : 'STATUS'}</th>
              </tr>
            </thead>
            <tbody>
              {variables.map((v) => {
                const shapeStr = v.shape ? `[${v.shape.join(' × ')}]` : 'scalar';
                const hasAnomaly = v.hasNaN || v.hasInf;
                return (
                  <tr
                    key={v.name}
                    className={`border-b border-[#181820] hover:bg-[#15151c] transition-colors ${
                      hasAnomaly ? 'bg-rose-950/20' : ''
                    }`}
                  >
                    <td className="px-3 py-2 font-bold text-sky-400 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-400/80" />
                      <span>{v.name}</span>
                    </td>
                    <td className="px-2.5 py-2 text-zinc-300 font-semibold">{shapeStr}</td>
                    <td className="px-2.5 py-2 text-zinc-400">{v.dtype || v.type}</td>
                    <td className="px-2.5 py-2 text-zinc-300 tabular-nums">
                      {formatBytes(v.sizeBytes)}
                    </td>
                    <td className="px-3 py-2 text-end">
                      {hasAnomaly ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm animate-pulse">
                          <AlertOctagon size={10} />
                          {v.hasNaN ? 'NaN' : 'Inf'}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                          <CheckCircle2 size={10} />
                          VERIFIED
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

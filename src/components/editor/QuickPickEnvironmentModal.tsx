import React, { useState, useEffect } from 'react';
import {
  Search,
  Check,
  Cpu,
  Zap,
  RefreshCw,
  X,
  ShieldCheck,
} from 'lucide-react';
import { useOkvirStore } from '@/lib/store';
import { tr } from '@/lib/i18n';
import { toolchainService } from '@/lib/toolchain-service';
import type { ToolchainInfo } from '@/lib/types';

interface QuickPickModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeToolchainId: string;
  onSelectToolchain: (id: string) => void;
}

export const QuickPickEnvironmentModal: React.FC<QuickPickModalProps> = ({
  isOpen,
  onClose,
  activeToolchainId,
  onSelectToolchain,
}) => {
  const { language } = useOkvirStore();
  const [filter, setFilter] = useState('');
  const [toolchains, setToolchains] = useState<ToolchainInfo[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadToolchains = async () => {
    const list = await toolchainService.getToolchains();
    setToolchains(list);
  };

  useEffect(() => {
    if (isOpen) {
      loadToolchains();
    }
  }, [isOpen]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    const updated = await toolchainService.refreshToolchains();
    setToolchains(updated);
    setIsRefreshing(false);
  };

  if (!isOpen) return null;

  const filtered = toolchains.filter((tc) =>
    `${tc.name} ${tc.binary} ${tc.language} ${tc.path || ''}`.toLowerCase().includes(filter.toLowerCase())
  );

  const nativeList = filtered.filter((tc) => tc.tier === 'native');
  const embeddedList = filtered.filter((tc) => tc.tier === 'embedded');

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="w-full max-w-xl mx-4 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface)] shadow-2xl overflow-hidden font-sans text-xs"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-2.5 px-4 py-3 border-b border-[var(--border-subtle)] bg-[var(--bg-app)]">
          <Search className="w-4 h-4 text-[var(--math-data)] shrink-0" />
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder={tr('selectCompiler', language)}
            className="w-full bg-transparent text-sm text-[var(--text-primary)] placeholder-[var(--text-tertiary)] focus:outline-none font-mono"
            autoFocus
          />
          <button
            onClick={handleRefresh}
            className={`p-1.5 rounded hover:bg-[var(--bg-surface-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors ${
              isRefreshing ? 'animate-spin text-[var(--math-data)]' : ''
            }`}
            title={tr('rescan', language)}
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="p-1.5 rounded hover:bg-[var(--bg-surface-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* List of Compilers */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-4">
          {/* Native Toolchains */}
          {nativeList.length > 0 && (
            <div>
              <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--text-tertiary)] flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-[var(--math-data)]" />
                <span>{tr('detectedNative', language)}</span>
              </div>
              <div className="mt-1 space-y-1">
                {nativeList.map((tc) => {
                  const isSelected = activeToolchainId === tc.id;
                  return (
                    <div
                      key={tc.id}
                      onClick={() => {
                        onSelectToolchain(tc.id);
                        onClose();
                      }}
                      className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-[var(--bg-surface-active)] text-[var(--text-primary)] border border-[var(--border-strong)]'
                          : 'hover:bg-[var(--bg-surface-hover)] text-[var(--text-secondary)]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            tc.isAvailable ? 'bg-[var(--math-vector)]' : 'bg-[var(--text-disabled)]'
                          }`}
                        />
                        <div>
                          <div className="font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
                            <span>{tc.name}</span>
                            {tc.isAvailable && (
                              <span className="px-1.5 py-0.2 rounded bg-[var(--bg-surface-active)] text-[var(--math-vector)] text-[10px]">
                                {tr('ready', language)}
                              </span>
                            )}
                          </div>
                          {tc.path && (
                            <div className="text-[11px] font-mono text-[var(--text-tertiary)] truncate max-w-sm">
                              {tc.path}
                            </div>
                          )}
                        </div>
                      </div>

                      {isSelected && <Check className="w-4 h-4 text-[var(--math-data)] shrink-0" />}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Embedded WebAssembly Engines */}
          {embeddedList.length > 0 && (
            <div>
              <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--math-gradient)] flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-[var(--math-gradient)]" />
                <span>{tr('embeddedWasm', language)}</span>
              </div>
              <div className="mt-1 space-y-1">
                {embeddedList.map((tc) => {
                  const isSelected = activeToolchainId === tc.id;
                  return (
                    <div
                      key={tc.id}
                      onClick={() => {
                        onSelectToolchain(tc.id);
                        onClose();
                      }}
                      className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-[var(--bg-surface-active)] text-[var(--text-primary)] border border-[var(--border-strong)]'
                          : 'hover:bg-[var(--bg-surface-hover)] text-[var(--text-secondary)]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-2 h-2 rounded-full bg-[var(--math-gradient)]" />
                        <div>
                          <div className="font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
                            <span>{tc.name}</span>
                            <span className="px-1.5 py-0.2 rounded bg-[var(--bg-surface-active)] text-[var(--math-gradient)] text-[10px]">
                              Zero-Setup
                            </span>
                          </div>
                          <div className="text-[11px] text-[var(--text-tertiary)]">
                            WebAssembly Worker • 100% offline & safe
                          </div>
                        </div>
                      </div>

                      {isSelected && <Check className="w-4 h-4 text-[var(--math-gradient)] shrink-0" />}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-[var(--bg-app)] border-t border-[var(--border-subtle)] text-[11px] text-[var(--text-tertiary)] flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[var(--math-vector)]" />
            <span>{tr('sandboxedExecution', language)}</span>
          </div>
          <span className="font-mono text-[var(--text-tertiary)]">{tr('pressEscToDismiss', language)}</span>
        </div>
      </div>
    </div>
  );
};

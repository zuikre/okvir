import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('OKVIR Uncaught Exception:', error, errorInfo);
    this.setState({ errorInfo });
  }

  private handleReset = () => {
    localStorage.removeItem('okvir-app-state');
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div
          dir="ltr"
          className="min-h-screen w-full flex items-center justify-center p-6 bg-[var(--bg-app)] text-[var(--text-primary)] font-mono"
        >
          <div className="max-w-xl w-full p-6 rounded-xl border border-red-500/30 bg-[var(--bg-surface)] shadow-2xl space-y-4">
            <div className="flex items-center gap-2 text-rose-400">
              <span className="w-3 h-3 rounded-full bg-rose-500" />
              <span className="text-sm font-semibold uppercase tracking-wider">
                OKVIR System Diagnostics
              </span>
            </div>

            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              A runtime component exception occurred. The error details have been trapped below:
            </p>

            <div className="p-3.5 rounded-lg bg-[var(--bg-app)] border border-[var(--border-subtle)] text-xs text-rose-400 font-mono overflow-auto max-h-48 leading-relaxed">
              {this.state.error?.toString()}
              {this.state.errorInfo?.componentStack}
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-[var(--bg-surface-active)] hover:bg-[var(--bg-surface-hover)] text-[var(--text-primary)] border border-[var(--border-subtle)] transition-colors cursor-pointer"
              >
                Reload Window
              </button>
              <button
                onClick={this.handleReset}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-rose-600 hover:bg-rose-500 text-white transition-colors"
              >
                Reset Local Cache & Reload
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

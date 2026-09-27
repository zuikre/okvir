import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ErrorBoundary } from './components/common/ErrorBoundary.tsx';
import './index.css';

// Ensure dark theme is applied immediately on document root to avoid any white flash
if (typeof document !== 'undefined') {
  const storedTheme = localStorage.getItem('okvir-app-state');
  let theme = 'dark';
  try {
    if (storedTheme) {
      const parsed = JSON.parse(storedTheme);
      theme = parsed.state?.theme || 'dark';
    }
  } catch {
    // Ignore JSON parse errors
  }
  document.documentElement.setAttribute('data-theme', theme);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);

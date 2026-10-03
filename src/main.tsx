// Ensure window.fetch is writable and has a setter to prevent runtime errors in sandbox iframes
try {
  if (typeof window !== 'undefined') {
    const orig = window.fetch;
    let current = orig ? orig.bind(window) : undefined;
    Object.defineProperty(window, 'fetch', {
      get() {
        return current;
      },
      set(val) {
        current = val;
      },
      configurable: true,
      enumerable: true
    });
  }
} catch {
  // Ignored if already configurable
}

import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(<App />);

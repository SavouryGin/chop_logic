import App from 'app';
import React from 'react';
import { createRoot } from 'react-dom/client';

// Custom styles
import 'styles/icons.scss';
import 'styles/reset.scss';

// KatTeX dependency
import 'styles/latex/KaTeX-0.9.0.min.scss';

// React 18 root API
const rootContainer = document.getElementById('root');
if (!rootContainer) {
  throw new Error('Failed to find the root element.');
}

const root = createRoot(rootContainer);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

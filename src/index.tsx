import App from 'pages/app';
import React from 'react';
import { createRoot } from 'react-dom/client';

// Custom styles
import 'styles/icons.scss';
import 'styles/reset.scss';

// React 18 new root API
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

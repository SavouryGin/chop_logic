import React from 'react';
import App from 'components/app';
import { render } from 'react-dom';

// Custom styles
import 'styles/reset.scss';
import 'styles/icons.scss';

render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

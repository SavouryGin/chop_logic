import React from 'react';
import { render } from 'react-dom';
import App from 'components/app';

// Custom styles
import 'styles/icons.scss';

render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

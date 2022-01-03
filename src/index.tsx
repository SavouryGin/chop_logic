import React from 'react';
import { render } from 'react-dom';

function App(): React.ReactElement {
  return <div>Hi</div>;
}

render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.body,
);

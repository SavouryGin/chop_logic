import AppRouter from 'pages/app-router';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from 'store';

const App = () => {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
};

export default App;

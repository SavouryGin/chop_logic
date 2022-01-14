import React from 'react';
import AppRouter from 'components/app-router';
import { Provider } from 'react-redux';
import { store } from 'store';

function App(): React.ReactElement {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
}

export default App;

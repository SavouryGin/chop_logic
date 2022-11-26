import AppRouter from 'router';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from 'store';

const App = (): React.ReactElement => {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
};

export default App;

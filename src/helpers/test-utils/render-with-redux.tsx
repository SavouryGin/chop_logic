import React, { ReactElement, ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Reducer, configureStore } from '@reduxjs/toolkit';
import { RenderOptions, RenderResult, render } from '@testing-library/react';

interface IProps {
  children?: ReactNode;
}

const renderWithRedux = (ui: ReactElement, reducer: Reducer, preloadedState = {}, renderOptions?: RenderOptions): RenderResult => {
  const mockedStore = configureStore({ reducer, preloadedState });
  const Wrapper: React.FC = ({ children }: IProps) => {
    return (
      <Provider store={mockedStore}>
        <BrowserRouter>{children}</BrowserRouter>
      </Provider>
    );
  };

  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

export default renderWithRedux;

import React, { ReactElement, ReactNode } from 'react';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { createStore, Reducer } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

interface IProps {
  children?: ReactNode;
}

function renderWithRedux(ui: ReactElement, reducer: Reducer, initialState = {}, renderOptions?: RenderOptions): RenderResult {
  const mockedStore = createStore(reducer, initialState);
  const Wrapper: React.FC = ({ children }: IProps) => {
    return (
      <Provider store={mockedStore}>
        <BrowserRouter>{children}</BrowserRouter>
      </Provider>
    );
  };
  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

export default renderWithRedux;

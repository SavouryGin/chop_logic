import React from 'react';
import { screen } from '@testing-library/react';
import { Icon } from 'enums';
import { combineReducers } from '@reduxjs/toolkit';
import { settingsInitialState, settingsSlice } from 'store/settings/slice';
import renderWithRedux from 'helpers/test-utils/render-with-redux';

import NotFoundPage from '../index';

const mockedReducer = combineReducers({
  settings: settingsSlice.reducer,
});

const mockedState = {
  settings: settingsInitialState,
};

describe('NotFoundPage component:', () => {
  beforeEach(() => {
    renderWithRedux(<NotFoundPage />, mockedReducer, mockedState);
  });

  it('renders the page', () => {
    const page = screen.getByTestId('not-found-page');
    expect(page).toBeInTheDocument();
    expect(page).toHaveClass('not-found-page');
  });

  it('displays the 404 text', () => {
    const page = screen.getByTestId('not-found-page');
    expect(page).toHaveTextContent('404 Page not found');
  });

  it('displays the link to the Home page', () => {
    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveClass(Icon.Home);
  });
});

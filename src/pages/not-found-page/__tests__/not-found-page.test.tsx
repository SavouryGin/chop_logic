import NotFoundPage from '../index';
import React from 'react';
import renderWithRedux from 'helpers/test-utils/render-with-redux';
import { Icon } from 'enums';
import { combineReducers } from '@reduxjs/toolkit';
import { screen } from '@testing-library/react';
import { settingsInitialState, settingsSlice } from 'store/settings/slice';

describe('NotFoundPage component:', () => {
  const mockedReducer = combineReducers({
    settings: settingsSlice.reducer,
  });

  const mockedState = {
    settings: settingsInitialState,
  };

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

import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRedux from 'helpers/test-utils/render-with-redux';
import { combineReducers } from '@reduxjs/toolkit';
import { settingsSlice, settingsInitialState } from 'store/settings/slice';
import Layout from '../index';

const mockedReducer = combineReducers({
  settings: settingsSlice.reducer,
});

const mockedState = {
  settings: settingsInitialState,
};

describe('Layout component:', () => {
  beforeEach(() => {
    renderWithRedux(<Layout />, mockedReducer, mockedState);
  });

  it('renders the header component', () => {
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
    expect(header).toHaveClass('layout__header');
  });

  it('the nav panel is hidden by default', () => {
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
  });

  it('the nav panel appears if user clicks the menu button', () => {
    const menuBtn = screen.getByTitle(/navigation/i);
    userEvent.click(menuBtn);
    expect(screen.queryByRole('navigation')).toBeInTheDocument();
  });
});

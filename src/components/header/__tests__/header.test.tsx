import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRedux from 'helpers/test-utils/render-with-redux';
import { combineReducers } from '@reduxjs/toolkit';
import { settingsSlice, settingsInitialState } from 'store/settings/slice';
import Header from '../index';

const mockedReducer = combineReducers({
  settings: settingsSlice.reducer,
});

const mockedState = {
  settings: settingsInitialState,
};

describe('Header component:', () => {
  beforeEach(() => {
    renderWithRedux(<Header />, mockedReducer, mockedState);
  });

  it('renders the header element', () => {
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
    expect(header).toHaveClass('header');
  });

  it('contains six basic buttons', () => {
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(6);
    for (const button of buttons) {
      expect(button).toHaveClass('button');
      expect(button).toHaveProperty('type', 'button');
    }
  });

  it('contains the link with the heading text', () => {
    const link = screen.getByRole('link');
    expect(link).toHaveTextContent('Chop Logic');
  });
});

import AppLink from '../index';
import React from 'react';
import renderWithRedux from 'helpers/test-utils/render-with-redux';
import { Icon } from 'enums';
import { combineReducers } from '@reduxjs/toolkit';
import { screen } from '@testing-library/react';
import { settingsInitialState, settingsSlice } from 'store/settings';

describe('AppLink component:', () => {
  const testProps = {
    path: '/test',
    text: 'Test text',
    icon: Icon.Default,
    isNavigation: false,
    className: 'test-class-name',
  };

  const mockedReducer = combineReducers({ settings: settingsSlice.reducer });
  const mockedState = { settings: settingsInitialState };

  beforeEach(() => {
    renderWithRedux(<AppLink {...testProps} />, mockedReducer, mockedState);
  });

  it('renders a link element', () => {
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('the link has href attribute with the correct value', () => {
    const href = `http://localhost${testProps.path}`;
    expect(screen.getByRole('link')).toHaveProperty('href', href);
  });

  it('the link has the passed icon class name', () => {
    expect(screen.getByRole('link')).toHaveClass(testProps.icon);
  });

  it('the link contains the passed text', () => {
    expect(screen.getByRole('link')).toHaveTextContent(testProps.text);
  });

  it('contains all necessary class names', () => {
    expect(screen.getByTestId('app-link')).toHaveClass('app-link', testProps.className);
  });
});

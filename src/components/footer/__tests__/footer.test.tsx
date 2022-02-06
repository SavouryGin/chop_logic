import React from 'react';
import { screen } from '@testing-library/react';
import { Icon } from 'enums';
import { combineReducers } from '@reduxjs/toolkit';
import { settingsInitialState, settingsSlice } from 'store/settings/slice';
import renderWithRedux from 'helpers/test-utils/render-with-redux';

import Footer from '../index';

const mockedReducer = combineReducers({
  settings: settingsSlice.reducer,
});

const mockedState = {
  settings: settingsInitialState,
};

describe('Footer component:', () => {
  beforeEach(() => {
    renderWithRedux(<Footer />, mockedReducer, mockedState);
  });

  it('renders the footer container', () => {
    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveClass('footer');
  });

  it('displays the copyright info', () => {
    expect(screen.getByText('© Dmitrii Suroviagin, 2022')).toBeInTheDocument();
  });

  it('displays 3 links', () => {
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(3);
    for (const link of links) {
      expect(link).toHaveProperty('target', '_blank');
      expect(link).toHaveProperty('rel', 'noreferrer');
    }
  });

  it('all links have correct href attributes', () => {
    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveProperty('href', 'mailto:savourygin@gmail.com');
    expect(links[1]).toHaveProperty('href', 'https://telegram.me/savoury_gin');
    expect(links[2]).toHaveProperty('href', 'https://github.com/SavouryGin');
  });

  it('all links have icons', () => {
    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveClass(Icon.Mail);
    expect(links[1]).toHaveClass(Icon.Telegram);
    expect(links[2]).toHaveClass(Icon.Github);
  });

  it('all links have texts', () => {
    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveTextContent('Mail');
    expect(links[1]).toHaveTextContent('Telegram');
    expect(links[2]).toHaveTextContent('GitHub');
  });
});

import React from 'react';
import renderWithRedux from 'helpers/test-utils/render-with-redux';
import { Icon } from 'enums';
import { combineReducers } from '@reduxjs/toolkit';
import { screen } from '@testing-library/react';
import { settingsInitialState, settingsSlice } from 'store/settings/slice';

import Footer from '../index';
import { externalLinks } from 'assets/const/settings';

const testProps = {
  className: 'test-classname',
  isDarkMode: false,
};

const mockedReducer = combineReducers({
  settings: settingsSlice.reducer,
});

const mockedState = {
  settings: settingsInitialState,
};

describe('Footer component:', () => {
  beforeEach(() => {
    renderWithRedux(<Footer {...testProps} />, mockedReducer, mockedState);
  });

  it('renders the footer container', () => {
    const footer = screen.getByRole('contentinfo');
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
    expect(links[0]).toHaveProperty('href', externalLinks.mail);
    expect(links[1]).toHaveProperty('href', externalLinks.telegram);
    expect(links[2]).toHaveProperty('href', externalLinks.gitHub);
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

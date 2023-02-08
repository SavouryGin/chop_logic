import Footer from '../index';
import React from 'react';
import renderWithRedux from 'helpers/test-utils/render-with-redux';
import { Icon } from 'enums';
import { combineReducers } from '@reduxjs/toolkit';
import { externalLinks } from 'settings';
import { screen } from '@testing-library/react';
import { settingsInitialState, settingsSlice } from 'store/settings';

describe('Footer component:', () => {
  const testProps = {
    className: 'test-class',
    isDarkMode: false,
  };

  const mockedReducer = combineReducers({ settings: settingsSlice.reducer });
  const mockedState = { settings: settingsInitialState };

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

  it('displays 5 links', () => {
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(5);
    for (const link of links) {
      expect(link).toHaveProperty('target', '_blank');
      expect(link).toHaveProperty('rel', 'noreferrer');
    }
  });

  it('all links have correct href attributes', () => {
    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveProperty('href', externalLinks.mail);
    expect(links[1]).toHaveProperty('href', externalLinks.telegram);
    expect(links[2]).toHaveProperty('href', externalLinks.linkedIn);
    expect(links[3]).toHaveProperty('href', externalLinks.facebook);
    expect(links[4]).toHaveProperty('href', externalLinks.gitHub);
  });

  it('all links have icons', () => {
    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveClass(Icon.Mail);
    expect(links[1]).toHaveClass(Icon.Telegram);
    expect(links[2]).toHaveClass(Icon.LinkedIn);
    expect(links[3]).toHaveClass(Icon.Facebook);
    expect(links[4]).toHaveClass(Icon.Github);
  });

  it('all links have texts', () => {
    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveAttribute('title', 'Mail');
    expect(links[1]).toHaveAttribute('title', 'Telegram');
    expect(links[2]).toHaveAttribute('title', 'LinkedIn');
    expect(links[3]).toHaveAttribute('title', 'Facebook');
    expect(links[4]).toHaveAttribute('title', 'GitHub');
  });

  it('should match the snapshot', () => {
    const { asFragment } = renderWithRedux(<Footer {...testProps} />, mockedReducer, mockedState);
    expect(asFragment()).toMatchSnapshot();
  });
});

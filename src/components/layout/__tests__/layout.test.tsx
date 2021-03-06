import React from 'react';
import renderWithRedux from 'helpers/test-utils/render-with-redux';
import { ButtonID } from 'enums';
import { buttonTexts } from 'texts';
import { combineReducers } from '@reduxjs/toolkit';
import { fireEvent, screen } from '@testing-library/react';
import { settingsInitialState, settingsSlice } from 'store/settings/slice';

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

  it('renders the footer component', () => {
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveClass('layout__footer');
  });

  it('the nav panel is hidden by default', () => {
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
  });

  it('the sidebar is hidden by default', () => {
    expect(screen.queryByRole('complementary')).not.toBeInTheDocument();
  });

  it('the nav panel appears if user clicks the Navigation button', () => {
    const menuBtn = screen.getByTitle(buttonTexts[ButtonID.Navigation].title.en);
    fireEvent.click(menuBtn);
    expect(screen.queryByRole('navigation')).toBeInTheDocument();
  });

  it('the sidebar appears if user clicks the Sidebar button', () => {
    const sidebarBtn = screen.getByTitle(buttonTexts[ButtonID.Tools].title.en);
    fireEvent.click(sidebarBtn);
    expect(screen.queryByRole('complementary')).toBeInTheDocument();
  });

  it('the layout elements become dark if user clicks the Dark mode button', () => {
    fireEvent.click(screen.getByTitle(buttonTexts[ButtonID.Navigation].title.en));
    fireEvent.click(screen.getByTitle(buttonTexts[ButtonID.Tools].title.en));
    expect(screen.getByTestId('layout')).not.toHaveClass('layout_dark');
    expect(screen.getByRole('banner')).not.toHaveClass('layout__header_dark');
    expect(screen.queryByRole('navigation')).not.toHaveClass('layout__navigation_dark');
    expect(screen.queryByRole('complementary')).not.toHaveClass('layout__sidebar_dark');

    fireEvent.click(screen.getByTitle(buttonTexts[ButtonID.ColorTheme].title.en));
    expect(screen.getByTestId('layout')).toHaveClass('layout_dark');
    expect(screen.getByRole('banner')).toHaveClass('layout__header_dark');
    expect(screen.queryByRole('navigation')).toHaveClass('layout__navigation_dark');
    expect(screen.queryByRole('complementary')).toHaveClass('layout__sidebar_dark');
  });
});

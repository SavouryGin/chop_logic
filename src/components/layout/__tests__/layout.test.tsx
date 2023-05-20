import Layout from '../index';
import React from 'react';
import renderWithRedux from 'helpers/test-utils/render-with-redux';
import { ButtonID } from 'enums';
import { DP_INITIAL_STATE } from 'store/propositions/direct-proofs/initial-state';
import { NP_INITIAL_STATE } from 'store/propositions/natural-proofs/initial-state';
import { buttonTexts } from 'texts';
import { combineReducers } from '@reduxjs/toolkit';
import { fireEvent, screen } from '@testing-library/react';
import { propositionsDPSlice } from 'store/propositions/direct-proofs';
import { propositionsNPSlice } from 'store/propositions/natural-proofs';
import { settingsInitialState, settingsSlice } from 'store/settings';

describe('Layout component:', () => {
  const mockedReducer = combineReducers({
    settings: settingsSlice.reducer,
    propositionsDP: propositionsDPSlice.reducer,
    propositionsNP: propositionsNPSlice.reducer,
  });

  const mockedState = {
    settings: settingsInitialState,
    propositionsDP: DP_INITIAL_STATE,
    propositionsNP: NP_INITIAL_STATE,
  };

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

  it('the layout elements become dark if user clicks the Dark mode button', () => {
    fireEvent.click(screen.getByTitle(buttonTexts[ButtonID.Navigation].title.en));
    expect(screen.getByTestId('layout')).not.toHaveClass('layout_dark');
    expect(screen.getByRole('banner')).not.toHaveClass('layout__header_dark');
    expect(screen.queryByRole('navigation')).not.toHaveClass('layout__navigation_dark');

    fireEvent.click(screen.getByTitle(buttonTexts[ButtonID.ColorTheme].title.en));
    expect(screen.getByTestId('layout')).toHaveClass('layout_dark');
    expect(screen.getByRole('banner')).toHaveClass('layout__header_dark');
    expect(screen.queryByRole('navigation')).toHaveClass('layout__navigation_dark');
  });
});

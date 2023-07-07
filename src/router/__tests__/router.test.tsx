import AppRouter from 'router';
import React from 'react';
import { ButtonID } from 'enums';
import { DP_INITIAL_STATE } from 'store/propositions/direct-proofs/initial-state';
import { Provider } from 'react-redux';
import { buttonTexts } from 'utils/texts';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { propositionsDPSlice } from 'store/propositions/direct-proofs';
import { settingsInitialState, settingsSlice } from 'store/settings';

describe('AppRouter test:', () => {
  const mockedReducer = combineReducers({
    settings: settingsSlice.reducer,
    propositionsDP: propositionsDPSlice.reducer,
  });

  const mockedState = {
    settings: settingsInitialState,
    propositionsDP: DP_INITIAL_STATE,
  };

  const mockedStore = configureStore({ reducer: mockedReducer, preloadedState: mockedState });

  beforeEach(() => {
    render(
      <Provider store={mockedStore}>
        <AppRouter />
      </Provider>,
    );
  });

  it('should display layout components', () => {
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('article')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('should render the home page by default', () => {
    expect(screen.getByRole('article')).toHaveClass('home');
  });

  it('should allow to go to the propositions page', async () => {
    const menuBtn = screen.getByTitle(buttonTexts[ButtonID.Navigation].title.en);
    fireEvent.click(menuBtn);
    const links = screen.getAllByRole('link');
    const propositionsLink = links.find((item) => item.textContent === 'Direct Proofs');
    if (propositionsLink) {
      fireEvent.click(propositionsLink);
    }
    await waitFor(() => {
      expect(screen.queryByRole('article')).toHaveClass('propositions-direct-proofs');
    });
  });

  it('should allow to go to the propositions page and return back trough the header link', async () => {
    const menuBtn = screen.getByTitle(buttonTexts[ButtonID.Navigation].title.en);
    fireEvent.click(menuBtn);
    const links = screen.getAllByRole('link');
    const propositionsLink = links.find((item) => item.textContent === 'Direct Proofs');
    if (propositionsLink) {
      fireEvent.click(propositionsLink);
    }
    await waitFor(() => {
      expect(screen.queryByRole('article')).toHaveClass('propositions-direct-proofs');
    });

    const homeLink = links.find((item) => item.textContent === 'Chop Logic');
    if (homeLink) {
      fireEvent.click(homeLink);
    }
    await waitFor(() => {
      expect(screen.queryByRole('article')).toHaveClass('home');
    });
  });
});

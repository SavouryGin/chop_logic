import AppRouter from 'router';
import React from 'react';
import { ButtonID, Page } from 'enums';
import { Provider } from 'react-redux';
import { buttonTexts } from 'texts';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { propositionsDPInitialState } from 'store/propositions/direct-proofs/initial-state';
import { propositionsDPSlice } from 'store/propositions/direct-proofs';
import { settingsInitialState, settingsSlice } from 'store/settings/slice';

describe('AppRouter test:', () => {
  const mockedReducer = combineReducers({
    settings: settingsSlice.reducer,
    propositionsDP: propositionsDPSlice.reducer,
  });

  const mockedState = {
    settings: settingsInitialState,
    propositionsDP: propositionsDPInitialState,
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
    const propositionsLink = links.find((item) => item.textContent === 'Propositions');
    if (propositionsLink) {
      fireEvent.click(propositionsLink);
    }
    await waitFor(() => {
      expect(screen.queryByRole('article')).toHaveClass('propositions-introduction');
    });
  });

  it('should allow to go to the propositions page and return back trough the header link', async () => {
    const menuBtn = screen.getByTitle(buttonTexts[ButtonID.Navigation].title.en);
    fireEvent.click(menuBtn);
    const links = screen.getAllByRole('link');
    const propositionsLink = links.find((item) => item.textContent === 'Propositions');
    if (propositionsLink) {
      fireEvent.click(propositionsLink);
    }
    await waitFor(() => {
      expect(screen.queryByRole('article')).toHaveClass('propositions-introduction');
    });

    const homeLink = links.find((item) => item.textContent === 'Chop Logic');
    if (homeLink) {
      fireEvent.click(homeLink);
    }
    await waitFor(() => {
      expect(screen.queryByRole('article')).toHaveClass('home');
    });
  });

  it('should allow to go to the direct proofs page', async () => {
    const menuBtn = screen.getByTitle(buttonTexts[ButtonID.Navigation].title.en);
    fireEvent.click(menuBtn);
    const showMoreButton = screen.getByTestId(`show-more-for_${Page.Propositions}`);
    fireEvent.click(showMoreButton);
    const links = screen.getAllByRole('link');
    const proofsLink = links.find((item) => item.textContent === 'Direct Proofs');
    if (proofsLink) {
      fireEvent.click(proofsLink);
    }
    await waitFor(() => {
      expect(screen.queryByRole('article')).toHaveClass('propositions-direct-proofs');
    });
  });
});

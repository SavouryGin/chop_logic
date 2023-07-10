import PropositionsNaturalProofs from 'pages/propositions/sub-pages/natural-proofs';
import React from 'react';
import renderWithRedux from 'utils/testing/render-with-redux';
import texts from 'utils/texts/propositions/elements';
import { DP_INITIAL_STATE } from 'store/propositions/direct-proofs/initial-state';
import { NP_INITIAL_STATE } from 'store/propositions/natural-proofs/initial-state';
import { NP_PROOFS_TABS } from 'pages/propositions/constants';
import { combineReducers } from '@reduxjs/toolkit';
import { propositionsDPSlice } from 'store/propositions/direct-proofs';
import { propositionsNPSlice } from 'store/propositions/natural-proofs';
import { screen } from '@testing-library/react';
import { settingsInitialState, settingsSlice } from 'store/settings';

describe('Natural Proofs page tests:', () => {
  const mockedReducer = combineReducers({
    settings: settingsSlice.reducer,
    propositionsNP: propositionsNPSlice.reducer,
    propositionsDP: propositionsDPSlice.reducer,
  });

  const mockedState = {
    settings: settingsInitialState,
    propositionsNP: NP_INITIAL_STATE,
    propositionsDP: DP_INITIAL_STATE,
  };

  beforeEach(() => {
    renderWithRedux(<PropositionsNaturalProofs />, mockedReducer, mockedState);
  });

  it('renders the article element', () => {
    expect(screen.getByRole('article')).toBeInTheDocument();
    expect(screen.getByRole('article')).toHaveClass('propositions-natural-proofs');
  });

  it('displays the heading', () => {
    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.getByRole('heading')).toHaveTextContent(texts.page.en);
  });

  it('renders the correct number of tabs', () => {
    expect(screen.getAllByRole('tab')).toHaveLength(NP_PROOFS_TABS.length);
  });

  it('the tabs have correct titles', () => {
    for (const item of NP_PROOFS_TABS) {
      expect(screen.getByTestId(item.tabId)).toHaveTextContent(item.tabTitle.en);
    }
  });

  it('should match the snapshot', () => {
    const { asFragment } = renderWithRedux(<PropositionsNaturalProofs />, mockedReducer, mockedState);
    expect(asFragment()).toMatchSnapshot();
  });
});

import PropositionsDirectProofs from 'pages/propositions/sub-pages/direct-proofs';
import React from 'react';
import renderWithRedux from 'utils/test-utils/render-with-redux';
import texts from 'texts/propositions/elements';
import { DP_INITIAL_STATE } from 'store/propositions/direct-proofs/initial-state';
import { combineReducers } from '@reduxjs/toolkit';
import { propositionsDPSlice } from 'store/propositions/direct-proofs';
import { propositionsDirectProofsTabs } from 'pages/propositions/constants';
import { screen } from '@testing-library/react';
import { settingsInitialState, settingsSlice } from 'store/settings';

describe('Direct Proofs page tests:', () => {
  const mockedReducer = combineReducers({
    settings: settingsSlice.reducer,
    propositionsDP: propositionsDPSlice.reducer,
  });

  const mockedState = {
    settings: settingsInitialState,
    propositionsDP: DP_INITIAL_STATE,
  };

  beforeEach(() => {
    renderWithRedux(<PropositionsDirectProofs />, mockedReducer, mockedState);
  });

  it('renders the article element', () => {
    expect(screen.getByRole('article')).toBeInTheDocument();
    expect(screen.getByRole('article')).toHaveClass('propositions-direct-proofs');
  });

  it('displays the heading', () => {
    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.getByRole('heading')).toHaveTextContent(texts.page.en);
  });

  it('renders the correct number of tabs', () => {
    expect(screen.getAllByRole('tab')).toHaveLength(propositionsDirectProofsTabs.length);
  });

  it('the tabs have correct titles', () => {
    for (const item of propositionsDirectProofsTabs) {
      expect(screen.getByTestId(item.tabId)).toHaveTextContent(item.tabTitle.en);
    }
  });

  it('should match the snapshot', () => {
    const { asFragment } = renderWithRedux(<PropositionsDirectProofs />, mockedReducer, mockedState);
    expect(asFragment()).toMatchSnapshot();
  });
});

import PropositionsDirectProofs from 'pages/propositions/sub-pages/direct-proofs';
import React from 'react';
import renderWithRedux from 'helpers/test-utils/render-with-redux';
import { combineReducers } from '@reduxjs/toolkit';
import { propositionsDPInitialState, propositionsDPSlice } from 'store/propositions/direct-proofs/slice';
import { propositionsDirectProofsTabs } from 'pages/propositions/constants';
import { screen } from '@testing-library/react';
import { settingsInitialState, settingsSlice } from 'store/settings/slice';
import { titles } from 'texts/propositions';

const mockedReducer = combineReducers({
  settings: settingsSlice.reducer,
  propositionsDP: propositionsDPSlice.reducer,
});

const mockedState = {
  settings: settingsInitialState,
  propositionsDP: propositionsDPInitialState,
};

describe('PropositionsDirectProofs page:', () => {
  beforeEach(() => {
    renderWithRedux(<PropositionsDirectProofs />, mockedReducer, mockedState);
  });

  it('renders the article element', () => {
    expect(screen.getByRole('article')).toBeInTheDocument();
    expect(screen.getByRole('article')).toHaveClass('propositions-direct-proofs');
  });

  it('displays the heading', () => {
    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.getByRole('heading')).toHaveTextContent(titles.page.en);
  });

  it('renders the correct number of tabs', () => {
    expect(screen.getAllByRole('tab')).toHaveLength(propositionsDirectProofsTabs.length);
  });

  it('the tabs have correct titles', () => {
    for (const item of propositionsDirectProofsTabs) {
      expect(screen.getByTestId(item.tabId)).toHaveTextContent(item.tabTitle.en);
    }
  });
});

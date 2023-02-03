import PropositionsNaturalProofs from 'pages/propositions/sub-pages/natural-proofs';
import React from 'react';
import renderWithRedux from 'helpers/test-utils/render-with-redux';
import { combineReducers } from '@reduxjs/toolkit';
import { propositionsDPInitialState } from 'store/propositions/direct-proofs/initial-state';
import { propositionsDPSlice } from 'store/propositions/direct-proofs';
import { propositionsNPInitialState } from 'store/propositions/natural-proofs/initial-state';
import { propositionsNPSlice } from 'store/propositions/natural-proofs';
import { propositionsNaturalProofsTabs } from 'pages/propositions/constants';
import { screen } from '@testing-library/react';
import { settingsInitialState, settingsSlice } from 'store/settings';
import { titles } from 'texts/propositions';

describe('Natural Proofs page tests:', () => {
  const mockedReducer = combineReducers({
    settings: settingsSlice.reducer,
    propositionsNP: propositionsNPSlice.reducer,
    propositionsDP: propositionsDPSlice.reducer,
  });

  const mockedState = {
    settings: settingsInitialState,
    propositionsNP: propositionsNPInitialState,
    propositionsDP: propositionsDPInitialState,
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
    expect(screen.getByRole('heading')).toHaveTextContent(titles.page.en);
  });

  it('renders the correct number of tabs', () => {
    expect(screen.getAllByRole('tab')).toHaveLength(propositionsNaturalProofsTabs.length);
  });

  it('the tabs have correct titles', () => {
    for (const item of propositionsNaturalProofsTabs) {
      expect(screen.getByTestId(item.tabId)).toHaveTextContent(item.tabTitle.en);
    }
  });

  it('should match the snapshot', () => {
    const { asFragment } = renderWithRedux(<PropositionsNaturalProofs />, mockedReducer, mockedState);
    expect(asFragment()).toMatchSnapshot();
  });
});

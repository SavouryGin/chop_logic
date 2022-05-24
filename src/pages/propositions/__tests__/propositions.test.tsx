import React from 'react';
import { screen } from '@testing-library/react';
import { combineReducers } from '@reduxjs/toolkit';
import { settingsInitialState, settingsSlice } from 'store/settings/slice';
import { propositionsInitialState, propositionsSlice } from 'store/propositions/slice';
import renderWithRedux from 'helpers/test-utils/render-with-redux';
import { titles } from 'assets/texts/propositions';

import Propositions, { propositionsTabs } from 'pages/propositions';

const mockedReducer = combineReducers({
  settings: settingsSlice.reducer,
  propositions: propositionsSlice.reducer,
});

const mockedState = {
  settings: settingsInitialState,
  propositions: propositionsInitialState,
};

describe('Propositions page:', () => {
  beforeEach(() => {
    renderWithRedux(<Propositions />, mockedReducer, mockedState);
  });

  it('renders the article element', () => {
    expect(screen.getByRole('article')).toBeInTheDocument();
    expect(screen.getByRole('article')).toHaveClass('propositions');
  });

  it('displays the heading', () => {
    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.getByRole('heading')).toHaveTextContent(titles.page.en);
  });

  it('renders the correct number of tabs', () => {
    expect(screen.getAllByRole('tab')).toHaveLength(propositionsTabs.length);
  });

  it('the tabs have correct titles', () => {
    for (const item of propositionsTabs) {
      expect(screen.getByTestId(item.tabId)).toHaveTextContent(item.tabTitle.en);
    }
  });
});

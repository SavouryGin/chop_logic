import PropositionsToolbar from 'pages/propositions/toolbar';
import React from 'react';
import renderWithRedux from 'helpers/test-utils/render-with-redux';
import { combineReducers } from '@reduxjs/toolkit';
import { propositionsDPInitialState } from 'store/propositions/direct-proofs/initial-state';
import { propositionsDPSlice } from 'store/propositions/direct-proofs';
import { propositionsNPInitialState } from 'store/propositions/natural-proofs/initial-state';
import { propositionsNPSlice } from 'store/propositions/natural-proofs';
import { settingsInitialState, settingsSlice } from 'store/settings';

describe('PropositionsToolbar tests:', () => {
  const mockedReducer = combineReducers({
    settings: settingsSlice.reducer,
    propositionsDP: propositionsDPSlice.reducer,
    propositionsNP: propositionsNPSlice.reducer,
  });

  const mockedState = {
    settings: settingsInitialState,
    propositionsDP: propositionsDPInitialState,
    propositionsNP: propositionsNPInitialState,
  };

  it('should match the snapshot', () => {
    const { asFragment } = renderWithRedux(<PropositionsToolbar isOpened={true} isAllButtonsVisible={true} />, mockedReducer, mockedState);
    expect(asFragment()).toMatchSnapshot();
  });
});

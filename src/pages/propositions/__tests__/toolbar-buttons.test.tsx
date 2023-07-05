import PropositionsDPTools from '../toolbar/buttons/direct-proofs';
import PropositionsNPTools from '../toolbar/buttons/natural-proofs';
import React from 'react';
import renderWithRedux from 'utils/testing/render-with-redux';
import { DP_INITIAL_STATE } from 'store/propositions/direct-proofs/initial-state';
import { NP_INITIAL_STATE } from 'store/propositions/natural-proofs/initial-state';
import { combineReducers } from '@reduxjs/toolkit';
import { propositionsDPSlice } from 'store/propositions/direct-proofs';
import { propositionsNPSlice } from 'store/propositions/natural-proofs';
import { settingsInitialState, settingsSlice } from 'store/settings';

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

describe('PropositionsDPTools tests:', () => {
  it('should match the snapshot', () => {
    const { asFragment } = renderWithRedux(<PropositionsDPTools />, mockedReducer, mockedState);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('PropositionsNPTools tests:', () => {
  it('should match the snapshot', () => {
    const { asFragment } = renderWithRedux(<PropositionsNPTools />, mockedReducer, mockedState);
    expect(asFragment()).toMatchSnapshot();
  });
});

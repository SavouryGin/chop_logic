import React from 'react';
import TruthTablesOperands from '../tabs/truth-tables/operands';
import renderWithRedux from 'utils/testing/render-with-redux';
import { DP_INITIAL_STATE } from 'store/propositions/direct-proofs/initial-state';
import { NP_INITIAL_STATE } from 'store/propositions/natural-proofs/initial-state';
import { combineReducers } from '@reduxjs/toolkit';
import { propositionsDPSlice } from 'store/propositions/direct-proofs';
import { propositionsNPSlice } from 'store/propositions/natural-proofs';
import { settingsInitialState, settingsSlice } from 'store/settings';

describe('TruthTablesOperands tests:', () => {
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

  it('should match the snapshot', () => {
    const { asFragment } = renderWithRedux(<TruthTablesOperands />, mockedReducer, mockedState);
    expect(asFragment()).toMatchSnapshot();
  });
});

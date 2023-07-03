import PropositionsToolbar from 'pages/propositions/toolbar';
import React from 'react';
import renderWithRedux from 'utils/test-utils/render-with-redux';
import { DP_INITIAL_STATE } from 'store/propositions/direct-proofs/initial-state';
import { NP_INITIAL_STATE } from 'store/propositions/natural-proofs/initial-state';
import { combineReducers } from '@reduxjs/toolkit';
import { propositionsDPSlice } from 'store/propositions/direct-proofs';
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
    propositionsDP: DP_INITIAL_STATE,
    propositionsNP: NP_INITIAL_STATE,
  };

  it('should match the snapshot', () => {
    const { asFragment } = renderWithRedux(<PropositionsToolbar mode='direct' isVisible={true} />, mockedReducer, mockedState);
    expect(asFragment()).toMatchSnapshot();
  });
});

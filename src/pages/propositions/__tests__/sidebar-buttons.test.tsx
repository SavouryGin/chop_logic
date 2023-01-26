import PropositionsDPSidebarButtons from '../sidebar-buttons/direct-proofs';
import PropositionsNPSidebarButtons from '../sidebar-buttons/natural-proofs';
import React from 'react';
import renderWithRedux from 'helpers/test-utils/render-with-redux';
import { combineReducers } from '@reduxjs/toolkit';
import { propositionsDPInitialState } from 'store/propositions/direct-proofs/initial-state';
import { propositionsDPSlice } from 'store/propositions/direct-proofs';
import { propositionsNPInitialState } from 'store/propositions/natural-proofs/initial-state';
import { propositionsNPSlice } from 'store/propositions/natural-proofs';
import { settingsInitialState, settingsSlice } from 'store/settings';

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

describe('PropositionsDPSidebarButtons tests:', () => {
  it('should match the snapshot', () => {
    const { asFragment } = renderWithRedux(<PropositionsDPSidebarButtons isVisible={true} />, mockedReducer, mockedState);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('PropositionsNPSidebarButtons tests:', () => {
  it('should match the snapshot', () => {
    const { asFragment } = renderWithRedux(<PropositionsNPSidebarButtons isVisible={true} />, mockedReducer, mockedState);
    expect(asFragment()).toMatchSnapshot();
  });
});

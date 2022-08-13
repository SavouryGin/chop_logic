import ContradictionRealizationForm from '../forms/contradiction-realization';
import DirectProofsEditorToolbar from '../toolbars/direct-proofs';
import ImplicationCreationForm from '../forms/implication-creation';
import ImplicationDistributionForm from '../forms/implication-distribution';
import PremiseForm from '../forms/premise';
import React from 'react';
import ReplacerForm from '../forms/replacer';
import renderWithRedux from 'helpers/test-utils/render-with-redux';
import { combineReducers } from '@reduxjs/toolkit';
import { propositionsDirectProofsInitialState, propositionsDirectProofsSlice } from 'store/propositions/direct-proofs/slice';
import { settingsInitialState, settingsSlice } from 'store/settings/slice';

const mockedReducer = combineReducers({
  settings: settingsSlice.reducer,
  propositionsDirectProofs: propositionsDirectProofsSlice.reducer,
});

const mockedState = {
  settings: settingsInitialState,
  propositionsDirectProofs: propositionsDirectProofsInitialState,
};

describe('Propositions Forms component:', () => {
  it('ContradictionRealizationForm matches the snapshot', () => {
    const { asFragment } = renderWithRedux(<ContradictionRealizationForm />, mockedReducer, mockedState);
    expect(asFragment()).toMatchSnapshot();
  });

  it('ImplicationCreationForm matches the snapshot', () => {
    const { asFragment } = renderWithRedux(<ImplicationCreationForm />, mockedReducer, mockedState);
    expect(asFragment()).toMatchSnapshot();
  });

  it('ImplicationDistributionForm matches the snapshot', () => {
    const { asFragment } = renderWithRedux(<ImplicationDistributionForm />, mockedReducer, mockedState);
    expect(asFragment()).toMatchSnapshot();
  });

  it('PremiseForm matches the snapshot', () => {
    const { asFragment } = renderWithRedux(<PremiseForm />, mockedReducer, mockedState);
    expect(asFragment()).toMatchSnapshot();
  });

  it('ReplacerForm matches the snapshot', () => {
    const { asFragment } = renderWithRedux(<ReplacerForm />, mockedReducer, mockedState);
    expect(asFragment()).toMatchSnapshot();
  });

  it('DirectProofsEditorToolbar matches the snapshot', () => {
    const { asFragment } = renderWithRedux(<DirectProofsEditorToolbar />, mockedReducer, mockedState);
    expect(asFragment()).toMatchSnapshot();
  });
});

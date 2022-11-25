import ContradictionRealizationForm from 'pages/propositions/components/forms/contradiction-realization';
import DirectProofsEditorToolbar from 'pages/propositions/components/toolbars/direct-proofs';
import ImplicationCreationForm from 'pages/propositions/components/forms/implication-creation';
import ImplicationDistributionForm from 'pages/propositions/components/forms/implication-distribution';
import PremiseForm from 'pages/propositions/components/forms/premise';
import React from 'react';
import ReplacerForm from 'pages/propositions/components/forms/replacer';
import renderWithRedux from 'helpers/test-utils/render-with-redux';
import { combineReducers } from '@reduxjs/toolkit';
import { propositionsDPInitialState } from 'store/propositions/direct-proofs/initial-state';
import { propositionsDPSlice } from 'store/propositions/direct-proofs/slice';
import { propositionsNPInitialState } from 'store/propositions/natural-proofs/initial-state';
import { settingsInitialState, settingsSlice } from 'store/settings/slice';

describe('Propositions Forms component:', () => {
  const mockedReducer = combineReducers({
    settings: settingsSlice.reducer,
    propositionsDP: propositionsDPSlice.reducer,
    propositionsNP: propositionsDPSlice.reducer,
  });

  const mockedState = {
    settings: settingsInitialState,
    propositionsDP: propositionsDPInitialState,
    propositionsNP: propositionsNPInitialState,
  };

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
    const { asFragment } = renderWithRedux(<PremiseForm mode='direct' />, mockedReducer, mockedState);
    expect(asFragment()).toMatchSnapshot();
  });

  it('ReplacerForm matches the snapshot', () => {
    const { asFragment } = renderWithRedux(<ReplacerForm mode='direct' />, mockedReducer, mockedState);
    expect(asFragment()).toMatchSnapshot();
  });

  it('DirectProofsEditorToolbar matches the snapshot', () => {
    const { asFragment } = renderWithRedux(<DirectProofsEditorToolbar />, mockedReducer, mockedState);
    expect(asFragment()).toMatchSnapshot();
  });
});

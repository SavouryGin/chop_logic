import ContradictionRealizationForm from 'pages/propositions/components/forms/contradiction-realization';
import DPEditorButtons from 'pages/propositions/components/buttons/direct-proofs';
import ImplicationCreationForm from 'pages/propositions/components/forms/implication-creation';
import ImplicationDistributionForm from 'pages/propositions/components/forms/implication-distribution';
import PremiseForm from 'pages/propositions/components/forms/premise';
import React from 'react';
import ReplacerForm from 'pages/propositions/components/forms/replacer';
import renderWithRedux from 'helpers/test-utils/render-with-redux';
import { DP_INITIAL_STATE } from 'store/propositions/direct-proofs/initial-state';
import { NP_INITIAL_STATE } from 'store/propositions/natural-proofs/initial-state';
import { combineReducers } from '@reduxjs/toolkit';
import { propositionsDPSlice } from 'store/propositions/direct-proofs';
import { settingsInitialState, settingsSlice } from 'store/settings';

describe('Propositions Forms component:', () => {
  const mockedReducer = combineReducers({
    settings: settingsSlice.reducer,
    propositionsDP: propositionsDPSlice.reducer,
    propositionsNP: propositionsDPSlice.reducer,
  });

  const mockedState = {
    settings: settingsInitialState,
    propositionsDP: DP_INITIAL_STATE,
    propositionsNP: NP_INITIAL_STATE,
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

  it('DPEditorButtons matches the snapshot', () => {
    const { asFragment } = renderWithRedux(<DPEditorButtons />, mockedReducer, mockedState);
    expect(asFragment()).toMatchSnapshot();
  });
});

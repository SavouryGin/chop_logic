import ContradictionRealizationForm from '../contradiction-realization-form';
import ImplicationCreationForm from '../implication-creation-form';
import ImplicationDistributionForm from '../implication-distribution-form';
import PremiseForm from '../premise-form';
import React from 'react';
import ReplacerForm from '../replacer-form';
import renderWithRedux from 'helpers/test-utils/render-with-redux';
import { combineReducers } from '@reduxjs/toolkit';
import { propositionsInitialState, propositionsSlice } from 'store/propositions/slice';
import { settingsInitialState, settingsSlice } from 'store/settings/slice';

const mockedReducer = combineReducers({
  settings: settingsSlice.reducer,
  propositions: propositionsSlice.reducer,
});

const mockedState = {
  settings: settingsInitialState,
  propositions: propositionsInitialState,
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
});

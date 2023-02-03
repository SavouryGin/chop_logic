import FormulaPreview from '../formula-preview';
import React from 'react';
import propositionsFormulasItems from '__mocks__/data/propositions/formulas-items';
import propositionsTableItems from '__mocks__/data/propositions/table-items';
import renderWithRedux from 'helpers/test-utils/render-with-redux';
import { combineReducers } from '@reduxjs/toolkit';
import { settingsInitialState, settingsSlice } from 'store/settings';

describe('FormulaPreview component:', () => {
  const mockedReducer = combineReducers({ settings: settingsSlice.reducer });
  const mockedState = { settings: settingsInitialState };

  it('should render the formula preview', () => {
    const { asFragment } = renderWithRedux(
      <FormulaPreview preview={propositionsFormulasItems.propositionalExpression} />,
      mockedReducer,
      mockedState,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render the error message', () => {
    const { asFragment } = renderWithRedux(<FormulaPreview preview={propositionsTableItems.error} />, mockedReducer, mockedState);
    expect(asFragment()).toMatchSnapshot();
  });
});

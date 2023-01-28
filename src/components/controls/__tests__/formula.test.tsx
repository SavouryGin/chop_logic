import Formula from '../formula';
import React from 'react';
import propositionsFormulasItems from '__mocks__/data/propositions/formulas-items';
import renderWithRedux from 'helpers/test-utils/render-with-redux';
import { combineReducers } from '@reduxjs/toolkit';
import { screen } from '@testing-library/react';
import { settingsInitialState, settingsSlice } from 'store/settings';

describe('Formula component:', () => {
  const testProps = {
    content: propositionsFormulasItems.propositionalExpression,
    level: 1,
  };

  const mockedReducer = combineReducers({
    settings: settingsSlice.reducer,
  });

  const mockedState = {
    settings: settingsInitialState,
  };

  it('should match the snapshot', () => {
    screen.debug();
    const { asFragment } = renderWithRedux(<Formula {...testProps} />, mockedReducer, mockedState);
    expect(asFragment()).toMatchSnapshot();
  });
});

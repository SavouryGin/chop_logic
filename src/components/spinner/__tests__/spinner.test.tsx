import React from 'react';
import Spinner from 'components/spinner';
import renderWithRedux from 'utils/test-utils/render-with-redux';
import { combineReducers } from '@reduxjs/toolkit';
import { settingsInitialState, settingsSlice } from 'store/settings';

describe('Spinner tests:', () => {
  const mockedReducer = combineReducers({
    settings: settingsSlice.reducer,
  });

  const mockedState = {
    settings: settingsInitialState,
  };

  it('should match the snapshot', () => {
    const { asFragment } = renderWithRedux(<Spinner />, mockedReducer, mockedState);
    expect(asFragment()).toMatchSnapshot();
  });
});

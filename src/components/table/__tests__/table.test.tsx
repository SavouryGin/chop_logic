import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { combineReducers } from '@reduxjs/toolkit';
import { settingsInitialState, settingsSlice } from 'store/settings/slice';
import { testTableColumns, testTableData } from '__mocks__/test-table-data';
import renderWithRedux from 'helpers/test-utils/render-with-redux';

import Table from 'components/table';

const testProps = {
  columns: testTableColumns,
  data: testTableData,
};

const mockedReducer = combineReducers({
  settings: settingsSlice.reducer,
});

const mockedState = {
  settings: settingsInitialState,
};

describe('Table component:', () => {
  it('', () => {
    renderWithRedux(<Table {...testProps} />, mockedReducer, mockedState);
    screen.debug();
  });
});

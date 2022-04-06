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
  it('renders the table element', () => {
    renderWithRedux(<Table {...testProps} />, mockedReducer, mockedState);
    screen.debug();
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('renders the correct amount of header cells', () => {
    renderWithRedux(<Table {...testProps} />, mockedReducer, mockedState);
    expect(screen.getAllByRole('columnheader')).toHaveLength(testTableColumns.length);
  });

  it('renders the correct amount of table cells', () => {
    renderWithRedux(<Table {...testProps} />, mockedReducer, mockedState);
    const cellsCount = testTableColumns.length * testTableData.length;
    expect(screen.getAllByRole('cell')).toHaveLength(cellsCount);
  });

  it('renders the correct amount of rows', () => {
    renderWithRedux(<Table {...testProps} />, mockedReducer, mockedState);
    const rowsCount = testTableData.length + 1;
    expect(screen.getAllByRole('row')).toHaveLength(rowsCount);
  });
});

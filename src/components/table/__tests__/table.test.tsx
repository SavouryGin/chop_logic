import React from 'react';
import renderWithRedux from 'helpers/test-utils/render-with-redux';
import { LocalText } from 'types';
import { combineReducers } from '@reduxjs/toolkit';
import { fireEvent, screen } from '@testing-library/react';
import { settingsInitialState, settingsSlice } from 'store/settings/slice';
import { testTableColumns, testTableData } from '__mocks__/test-data/table';

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

  it('displays the data in cells', () => {
    renderWithRedux(<Table {...testProps} />, mockedReducer, mockedState);
    for (const row of testTableData) {
      expect(screen.getByText(row.field1 as string)).toBeInTheDocument();
      expect(screen.getByText(row.field2 as string)).toBeInTheDocument();
      expect(screen.getByText(row.field3 as string)).toBeInTheDocument();
      expect(screen.getByText((row.field4 as LocalText).en)).toBeInTheDocument();
    }
  });

  it('does not render the checkbox column by default', () => {
    renderWithRedux(<Table {...testProps} />, mockedReducer, mockedState);
    expect(screen.queryAllByRole('checkbox')).toHaveLength(0);
  });

  it('renders the checkbox column if the prop is passed', () => {
    renderWithRedux(<Table {...testProps} hasCheckboxColumn />, mockedReducer, mockedState);
    expect(screen.getAllByRole('checkbox')).toHaveLength(testTableData.length + 1);
  });

  it('all the checkboxes are unchecked by default', () => {
    renderWithRedux(<Table {...testProps} hasCheckboxColumn />, mockedReducer, mockedState);
    const checkboxes = screen.getAllByRole('checkbox');
    for (const checkbox of checkboxes) {
      expect(checkbox).not.toBeChecked();
      expect(checkbox).toHaveClass('checkbox-input__default');
    }
  });

  it('user can check a checkbox', () => {
    renderWithRedux(<Table {...testProps} hasCheckboxColumn />, mockedReducer, mockedState);
    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[checkboxes.length - 1]);
    expect(checkboxes[checkboxes.length - 1]).toBeChecked();
    expect(checkboxes[0]).not.toBeChecked();
  });

  it('user can check the select all checkbox', () => {
    renderWithRedux(<Table {...testProps} hasCheckboxColumn />, mockedReducer, mockedState);
    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[0]);
    for (const checkbox of checkboxes) {
      expect(checkbox).toBeChecked();
    }
  });
});

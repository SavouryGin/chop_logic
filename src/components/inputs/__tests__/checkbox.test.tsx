import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { combineReducers } from '@reduxjs/toolkit';
import { settingsInitialState, settingsSlice } from 'store/settings/slice';
import renderWithRedux from 'helpers/test-utils/render-with-redux';

import Checkbox from '../checkbox';

const testProps = {
  name: 'test checkbox',
  label: 'test label',
};

const mockedReducer = combineReducers({
  settings: settingsSlice.reducer,
});

const mockedState = {
  settings: settingsInitialState,
};

describe('Checkbox component:', () => {
  it('renders the checkbox input with default props', () => {
    renderWithRedux(<Checkbox {...testProps} />, mockedReducer, mockedState);
    const input = screen.getByRole('checkbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass('checkbox-input__default');
    expect(input).toBeEnabled();
    expect(input).not.toBeChecked();
  });

  it('the checkbox has a label', () => {
    renderWithRedux(<Checkbox {...testProps} />, mockedReducer, mockedState);
    expect(screen.getByLabelText(testProps.label)).toBeInTheDocument();
  });

  it('receives the passed default value', () => {
    renderWithRedux(<Checkbox {...testProps} defaultValue={true} />, mockedReducer, mockedState);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('can be disabled', () => {
    renderWithRedux(<Checkbox {...testProps} isDisabled />, mockedReducer, mockedState);
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });

  it('allows the user to check the checkbox', () => {
    renderWithRedux(<Checkbox {...testProps} />, mockedReducer, mockedState);
    const input = screen.getByRole('checkbox');
    expect(input).not.toBeChecked();
    userEvent.click(input);
    expect(input).toBeChecked();
  });

  it('fires the passed onChange handler', () => {
    const mockChange = jest.fn();
    renderWithRedux(<Checkbox {...testProps} onChange={mockChange} />, mockedReducer, mockedState);
    const input = screen.getByRole('checkbox');
    userEvent.click(input);
    expect(mockChange).toHaveBeenCalledTimes(1);
  });

  it('gets focus on tab press', () => {
    renderWithRedux(<Checkbox {...testProps} />, mockedReducer, mockedState);
    const input = screen.getByRole('checkbox');
    expect(input).not.toHaveFocus();
    userEvent.tab();
    expect(input).toHaveFocus();
  });

  it('fires onFocus and onBlur handlers', () => {
    const mockBlur = jest.fn();
    renderWithRedux(<Checkbox {...testProps} onBlur={mockBlur} />, mockedReducer, mockedState);
    userEvent.tab();
    userEvent.tab();
    expect(mockBlur).toHaveBeenCalledTimes(1);
  });
});

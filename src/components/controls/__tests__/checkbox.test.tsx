import React from 'react';
import renderWithRedux from 'helpers/test-utils/render-with-redux';
import userEvent from '@testing-library/user-event';
import { InputID } from 'enums';
import { combineReducers } from '@reduxjs/toolkit';
import { inputTexts } from 'texts';
import { screen } from '@testing-library/react';
import { settingsInitialState, settingsSlice } from 'store/settings/slice';

import Checkbox from 'components/controls/checkbox';

const testProps = {
  name: 'test checkbox',
  inputId: InputID.isDarkModeCheckbox,
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
    const label = inputTexts[testProps.inputId].label.en;
    expect(screen.getByLabelText(label)).toBeInTheDocument();
  });

  it('receives the passed default value', () => {
    renderWithRedux(<Checkbox {...testProps} defaultValue={true} />, mockedReducer, mockedState);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('can be disabled', () => {
    renderWithRedux(<Checkbox {...testProps} isDisabled />, mockedReducer, mockedState);
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });

  it('allows the user to check the checkbox', async () => {
    renderWithRedux(<Checkbox {...testProps} />, mockedReducer, mockedState);
    const input = screen.getByRole('checkbox');
    expect(input).not.toBeChecked();
    await userEvent.click(input);
    expect(input).toBeChecked();
  });

  it('fires the passed onChange handler', async () => {
    const mockChange = jest.fn();
    renderWithRedux(<Checkbox {...testProps} onChange={mockChange} />, mockedReducer, mockedState);
    const input = screen.getByRole('checkbox');
    await userEvent.click(input);
    expect(mockChange).toHaveBeenCalledTimes(1);
  });

  it('gets focus on tab press', async () => {
    renderWithRedux(<Checkbox {...testProps} />, mockedReducer, mockedState);
    const input = screen.getByRole('checkbox');
    expect(input).not.toHaveFocus();
    await userEvent.tab();
    expect(input).toHaveFocus();
  });

  it('fires the onBlur handler', async () => {
    const mockBlur = jest.fn();
    renderWithRedux(<Checkbox {...testProps} onBlur={mockBlur} />, mockedReducer, mockedState);
    await userEvent.tab();
    await userEvent.tab();
    expect(mockBlur).toHaveBeenCalledTimes(1);
  });

  it('fires the onFocus handler', async () => {
    const mockFocus = jest.fn();
    renderWithRedux(<Checkbox {...testProps} onFocus={mockFocus} />, mockedReducer, mockedState);
    await userEvent.tab();
    expect(mockFocus).toHaveBeenCalledTimes(1);
  });
});

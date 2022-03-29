import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { combineReducers } from '@reduxjs/toolkit';
import { settingsInitialState, settingsSlice } from 'store/settings/slice';
import { InputID } from 'enums';
import renderWithRedux from 'helpers/test-utils/render-with-redux';

import TextInput from 'components/inputs/text-input';

const testProps = {
  name: 'test input',
  label: 'test label',
  inputId: InputID.DefaultInput,
};

const mockedReducer = combineReducers({
  settings: settingsSlice.reducer,
});

const mockedState = {
  settings: settingsInitialState,
};

describe('Text input component:', () => {
  it('renders the textbox element with default props', () => {
    renderWithRedux(<TextInput {...testProps} />, mockedReducer, mockedState);
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass('text-input__field');
    expect(input).toHaveValue('');
    expect(input).toBeEnabled();
  });

  it('the input has a label', () => {
    renderWithRedux(<TextInput {...testProps} />, mockedReducer, mockedState);
    expect(screen.getByLabelText(testProps.label)).toBeInTheDocument();
  });

  it('receives the passed default value', () => {
    renderWithRedux(<TextInput {...testProps} defaultValue='test-default' />, mockedReducer, mockedState);
    expect(screen.getByRole('textbox')).toHaveValue('test-default');
  });

  it('can be disabled', () => {
    renderWithRedux(<TextInput {...testProps} isDisabled />, mockedReducer, mockedState);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('receives the length properties', () => {
    renderWithRedux(<TextInput {...testProps} maxLength={100} minLength={10} />, mockedReducer, mockedState);
    const input = screen.getByRole('textbox');
    expect(input).toHaveProperty('maxLength', 100);
    expect(input).toHaveProperty('minLength', 10);
  });

  it('displays the passed placeholder for the input', () => {
    renderWithRedux(<TextInput {...testProps} placeholder='test placeholder' />, mockedReducer, mockedState);
    expect(screen.getByPlaceholderText('test placeholder')).toBeInTheDocument();
  });

  it('allows the user to type some text', () => {
    renderWithRedux(<TextInput {...testProps} />, mockedReducer, mockedState);
    const input = screen.getByRole('textbox');
    userEvent.type(input, 'test text');
    expect(input).toHaveValue('test text');
  });

  it('fires the passed onChange handler', () => {
    const mockChange = jest.fn();
    renderWithRedux(<TextInput {...testProps} onChange={mockChange} />, mockedReducer, mockedState);
    const input = screen.getByRole('textbox');
    userEvent.type(input, '123');
    expect(mockChange).toHaveBeenCalledTimes(3);
  });

  it('gets focus on tab press', () => {
    renderWithRedux(<TextInput {...testProps} />, mockedReducer, mockedState);
    const input = screen.getByRole('textbox');
    expect(input).not.toHaveFocus();
    userEvent.tab();
    expect(input).toHaveFocus();
  });

  it('fires the onBlur handler', () => {
    const mockBlur = jest.fn();
    renderWithRedux(<TextInput {...testProps} onBlur={mockBlur} />, mockedReducer, mockedState);
    userEvent.tab();
    userEvent.tab();
    expect(mockBlur).toHaveBeenCalledTimes(1);
  });

  it('fires the onFocus handler', () => {
    const mockFocus = jest.fn();
    renderWithRedux(<TextInput {...testProps} onFocus={mockFocus} />, mockedReducer, mockedState);
    userEvent.tab();
    expect(mockFocus).toHaveBeenCalledTimes(1);
  });
});

import FileInput from '../file-input';
import React from 'react';
import renderWithRedux from 'helpers/test-utils/render-with-redux';
import userEvent from '@testing-library/user-event';
import { FileAcceptType } from 'enums/file-accept-type';
import { FileInputProps } from 'types';
import { InputID } from 'enums';
import { combineReducers } from '@reduxjs/toolkit';
import { screen } from '@testing-library/react';
import { settingsInitialState, settingsSlice } from 'store/settings';

describe('FileInput component:', () => {
  const testProps: FileInputProps = {
    name: 'test input',
    label: 'test label',
    inputId: InputID.DefaultInput,
    accept: FileAcceptType.Text,
  };

  const mockedReducer = combineReducers({
    settings: settingsSlice.reducer,
  });

  const mockedState = {
    settings: settingsInitialState,
  };

  it('renders the input element with default props', () => {
    renderWithRedux(<FileInput {...testProps} />, mockedReducer, mockedState);
    const input = screen.getByRole('button');
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass('file-input__field');
    expect(input).toHaveValue('');
    expect(input).toBeEnabled();
    expect(input).toHaveAttribute('accept', FileAcceptType.Text);
  });

  it('the input has a label', () => {
    renderWithRedux(<FileInput {...testProps} />, mockedReducer, mockedState);
    expect(screen.getByLabelText(testProps?.label || '')).toBeInTheDocument();
  });

  it('can be disabled', () => {
    renderWithRedux(<FileInput {...testProps} isDisabled />, mockedReducer, mockedState);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('displays the passed placeholder for the input', () => {
    renderWithRedux(<FileInput {...testProps} placeholder='test placeholder' />, mockedReducer, mockedState);
    expect(screen.getByPlaceholderText('test placeholder')).toBeInTheDocument();
  });

  it('gets focus on tab press', async () => {
    renderWithRedux(<FileInput {...testProps} />, mockedReducer, mockedState);
    const input = screen.getByRole('button');
    expect(input).not.toHaveFocus();
    await userEvent.tab();
    expect(input).toHaveFocus();
  });
});

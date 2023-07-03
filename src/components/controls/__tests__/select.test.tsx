import React from 'react';
import Select from 'components/controls/select';
import renderWithRedux from 'utils/test-utils/render-with-redux';
import userEvent from '@testing-library/user-event';
import { InputID } from 'enums';
import { SelectEntity } from 'types';
import { combineReducers } from '@reduxjs/toolkit';
import { screen } from '@testing-library/react';
import { settingsInitialState, settingsSlice } from 'store/settings';

describe('Select component:', () => {
  const testSelectOptions: SelectEntity[] = [
    { option: { en: 'One', ru: 'Один' }, value: 1, add: 123 },
    { option: { en: 'Two', ru: 'Два' }, value: 2, asdf: 'asdf' },
    { option: { en: 'Three', ru: 'Три' }, value: 3, asdf: {} },
  ];

  const testProps = {
    name: 'test input',
    label: 'test label',
    inputId: InputID.LanguageSelect,
    options: testSelectOptions,
  };

  const mockedReducer = combineReducers({ settings: settingsSlice.reducer });
  const mockedState = { settings: settingsInitialState };

  it('renders the select element with default props', () => {
    renderWithRedux(<Select {...testProps} />, mockedReducer, mockedState);
    const input = screen.getByRole('combobox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass('select__field');
    expect(input).toBeEnabled();
    expect(input).toHaveValue(testSelectOptions[0].value.toString());
  });

  it('the select has a label', () => {
    renderWithRedux(<Select {...testProps} />, mockedReducer, mockedState);
    expect(screen.getByLabelText(testProps.label)).toBeInTheDocument();
  });

  it('the select element contains all the options', () => {
    renderWithRedux(<Select {...testProps} />, mockedReducer, mockedState);
    const options = screen.queryAllByRole('option');
    expect(options).toHaveLength(testSelectOptions.length);
    for (let i = 0; i < testSelectOptions.length; i++) {
      expect(options[i]).toHaveTextContent(testSelectOptions[i].option.en);
    }
  });

  it('can be disabled', () => {
    renderWithRedux(<Select {...testProps} isDisabled />, mockedReducer, mockedState);
    expect(screen.getByRole('combobox')).toBeDisabled();
  });

  it('receives the passed default value', () => {
    renderWithRedux(<Select {...testProps} defaultOption={testSelectOptions[2]} />, mockedReducer, mockedState);
    expect(screen.getByRole('combobox')).toHaveValue(testSelectOptions[2].value.toString());
  });

  it('allows the user to select an option', async () => {
    renderWithRedux(<Select {...testProps} />, mockedReducer, mockedState);
    const input = screen.getByRole('combobox');
    await userEvent.selectOptions(input, testSelectOptions[1].option.en);
    expect(input).toHaveValue(testSelectOptions[1].value.toString());
  });

  it('fires the passed onChange handler', async () => {
    const mockChange = jest.fn();
    renderWithRedux(<Select {...testProps} onChange={mockChange} />, mockedReducer, mockedState);
    const input = screen.getByRole('combobox');
    await userEvent.selectOptions(input, testSelectOptions[1].option.en);
    expect(mockChange).toHaveBeenCalledTimes(1);
  });

  it('gets focus on tab press', async () => {
    renderWithRedux(<Select {...testProps} />, mockedReducer, mockedState);
    const input = screen.getByRole('combobox');
    expect(input).not.toHaveFocus();
    await userEvent.tab();
    expect(input).toHaveFocus();
  });

  it('fires the onBlur handler', async () => {
    const mockBlur = jest.fn();
    renderWithRedux(<Select {...testProps} onBlur={mockBlur} />, mockedReducer, mockedState);
    await userEvent.tab();
    await userEvent.tab();
    expect(mockBlur).toHaveBeenCalledTimes(1);
  });

  it('fires the onFocus handler', async () => {
    const mockFocus = jest.fn();
    renderWithRedux(<Select {...testProps} onFocus={mockFocus} />, mockedReducer, mockedState);
    await userEvent.tab();
    expect(mockFocus).toHaveBeenCalledTimes(1);
  });

  it('should match the snapshot', () => {
    const { asFragment } = renderWithRedux(<Select {...testProps} />, mockedReducer, mockedState);
    expect(asFragment()).toMatchSnapshot();
  });
});

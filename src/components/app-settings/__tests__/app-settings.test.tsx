import AppSettings from '../index';
import React from 'react';
import renderWithRedux from 'utils/testing/render-with-redux';
import { ButtonID, InputID } from 'enums';
import { buttonTexts, inputTexts } from 'utils/texts';
import { combineReducers } from '@reduxjs/toolkit';
import { fireEvent, screen } from '@testing-library/react';
import { languageOptions } from 'utils/settings';
import { settingsInitialState, settingsSlice } from 'store/settings';

describe('AppSettings tests:', () => {
  const mockedReducer = combineReducers({ settings: settingsSlice.reducer });
  const mockedState = { settings: settingsInitialState };

  beforeEach(() => {
    renderWithRedux(<AppSettings className={'test-class'} />, mockedReducer, mockedState);
  });

  it('renders the settings container', () => {
    const container = screen.getByTestId('settings');
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass('settings', 'test-class');
  });

  it('renders the form component', () => {
    expect(screen.getByRole('form')).toBeInTheDocument();
  });

  it('displays the language options', () => {
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(languageOptions.length);
    for (let i = 0; i < options.length; i++) {
      expect(options[i]).toHaveTextContent(languageOptions[i].option.en);
    }
  });

  it('displays the Dark Mode checkbox unchecked by default', () => {
    const checkbox = screen.getByLabelText(inputTexts[InputID.isDarkModeCheckbox].label.en);
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it('displays the Sounds checkbox unchecked by default', () => {
    const checkbox = screen.getByLabelText(inputTexts[InputID.isSoundsCheckbox].label.en);
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it('displays the apply button', () => {
    const applyBtn = screen.getByTitle(buttonTexts[ButtonID.Apply].title.en);
    expect(applyBtn).toHaveProperty('type', 'submit');
    expect(applyBtn).toHaveTextContent('Apply');
  });

  it('should match the snapshot', () => {
    const { asFragment } = renderWithRedux(<AppSettings className={'test-class'} />, mockedReducer, mockedState);
    expect(asFragment()).toMatchSnapshot();
  });
});

import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ButtonID, InputID } from 'enums';
import { combineReducers } from '@reduxjs/toolkit';
import { settingsInitialState, settingsSlice } from 'store/settings/slice';
import { buttonTexts, inputTexts } from 'assets/texts';
import renderWithRedux from 'helpers/test-utils/render-with-redux';
import { languageOptions } from '../constants';

import AppSettings from '../index';

const mockedReducer = combineReducers({
  settings: settingsSlice.reducer,
});

const mockedState = {
  settings: settingsInitialState,
};

describe('AppSettings tests:', () => {
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
    userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it('displays the Sounds checkbox unchecked by default', () => {
    const checkbox = screen.getByLabelText(inputTexts[InputID.isSoundsCheckbox].label.en);
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
    userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it('displays the apply button', () => {
    const applyBtn = screen.getByTitle(buttonTexts[ButtonID.ApplySettings].title.en);
    expect(applyBtn).toHaveProperty('type', 'submit');
    expect(applyBtn).toHaveTextContent('Apply');
  });
});

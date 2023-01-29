import ErrorPopup from 'components/error-popup';
import React from 'react';
import renderWithRedux from 'helpers/test-utils/render-with-redux';
import { combineReducers } from '@reduxjs/toolkit';
import { errorsTexts, uiElementTexts } from 'texts';
import { fireEvent, screen } from '@testing-library/react';
import { settingsInitialState, settingsSlice } from 'store/settings';

describe('ErrorPopup component:', () => {
  const testProps = {
    error: errorsTexts.generalError,
    onClose: jest.fn(),
  };

  const mockedReducer = combineReducers({ settings: settingsSlice.reducer });
  const mockedState = { settings: settingsInitialState };

  beforeEach(() => {
    renderWithRedux(<ErrorPopup {...testProps} />, mockedReducer, mockedState);
  });

  it('should display the error header', () => {
    expect(screen.getByText(uiElementTexts.errorPopup.en));
  });

  it('should display the error message', () => {
    expect(screen.getByText(errorsTexts.generalError.en));
  });

  it('should react on click close', () => {
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(testProps.onClose).toHaveBeenCalledTimes(1);
  });
});

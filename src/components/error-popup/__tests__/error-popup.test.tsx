import ErrorPopup from 'components/error-popup';
import React from 'react';
import propositionsElementsTexts from 'utils/texts/propositions/elements';
import renderWithRedux from 'utils/testing/render-with-redux';
import { combineReducers } from '@reduxjs/toolkit';
import { fireEvent, screen } from '@testing-library/react';
import { settingsInitialState, settingsSlice } from 'store/settings';
import { uiElementTexts } from 'utils/texts';

describe('ErrorPopup component:', () => {
  const testProps = {
    error: propositionsElementsTexts.generalError,
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
    expect(screen.getByText(propositionsElementsTexts.generalError.en));
  });

  it('should react on click close', () => {
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(testProps.onClose).toHaveBeenCalledTimes(1);
  });
});

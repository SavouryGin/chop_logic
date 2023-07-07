import ModalWindow from '../index';
import React from 'react';
import renderWithRedux from 'utils/testing/render-with-redux';
import userEvent from '@testing-library/user-event';
import { ButtonID } from 'enums';
import { buttonTexts } from 'utils/texts';
import { combineReducers } from '@reduxjs/toolkit';
import { screen, waitFor } from '@testing-library/react';
import { settingsInitialState, settingsSlice } from 'store/settings';
import { testText } from '__mocks__/data/texts';

describe('ModalWindow component:', () => {
  const mockClose = jest.fn();
  const mockedReducer = combineReducers({ settings: settingsSlice.reducer });
  const mockedState = { settings: settingsInitialState };

  const testProps = {
    isOpened: true,
    onClose: mockClose,
    title: 'Test modal',
    className: 'test-class-name',
    content: <>{testText}</>,
  };

  beforeEach(() => {
    renderWithRedux(<ModalWindow {...testProps} />, mockedReducer, mockedState);
  });

  it('creates the dialog element', () => {
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveClass('modal-window', testProps.className);
  });

  it('renders the header component', () => {
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
    expect(header).toHaveClass('modal-window__header');
  });

  it('contains one button by default', () => {
    expect(screen.getAllByRole('button')).toHaveLength(1);
  });

  it('the Close buttons reacts on click', async () => {
    const closeBtn = screen.getByTitle(buttonTexts[ButtonID.Cancel].title.en);
    await userEvent.click(closeBtn);
    await waitFor(() => expect(mockClose).toHaveBeenCalledTimes(1));
  });

  it('renders the content section', () => {
    const content = screen.getByRole('region');
    expect(content).toBeInTheDocument();
    expect(content).toHaveClass('modal-window__content');
  });

  it('the content section displays the passed text', () => {
    expect(screen.getByRole('region')).toHaveTextContent(testText);
  });
});

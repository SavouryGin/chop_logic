import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRedux from 'helpers/test-utils/render-with-redux';
import { combineReducers } from '@reduxjs/toolkit';
import { settingsSlice, settingsInitialState } from 'store/settings/slice';
import { testText } from '__mocks__/test-text';
import { ButtonID } from 'enums';
import { buttonTexts } from 'assets/texts';
import ModalWindow from '../index';

const mockedReducer = combineReducers({
  settings: settingsSlice.reducer,
});

const mockedState = {
  settings: settingsInitialState,
};

describe('ModalWindow component:', () => {
  const mockClose = jest.fn();
  const modalContainer = document.createElement('div');
  modalContainer.setAttribute('id', 'modal');

  const testProps = {
    isOpened: true,
    onClose: mockClose,
    title: 'Test modal',
    className: 'test-classname',
    content: <>{testText}</>,
  };

  beforeEach(() => {
    renderWithRedux(<ModalWindow {...testProps} />, mockedReducer, mockedState, {
      container: document.body.appendChild(modalContainer),
    });
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

  it('contains two buttons by default', () => {
    expect(screen.getAllByRole('button')).toHaveLength(1);
  });

  it('the Close buttons reacts on click', async () => {
    const closeBtn = screen.getByTitle(buttonTexts[ButtonID.Cancel].title.en);
    userEvent.click(closeBtn);
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

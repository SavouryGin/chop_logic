import Propositions from 'pages/propositions';
import React from 'react';
import renderWithRedux from 'helpers/test-utils/render-with-redux';
import { combineReducers } from '@reduxjs/toolkit';
import { fireEvent, screen } from '@testing-library/react';
import { propositionsInitialState, propositionsSlice } from 'store/propositions/slice';
import { settingsInitialState, settingsSlice } from 'store/settings/slice';

const mockedReducer = combineReducers({
  settings: settingsSlice.reducer,
  propositions: propositionsSlice.reducer,
});

const mockedState = {
  settings: settingsInitialState,
  propositions: propositionsInitialState,
};

describe('DirectProofsEditor tab:', () => {
  const modalContainer = document.createElement('div');
  modalContainer.setAttribute('id', 'modal');

  beforeEach(() => {
    renderWithRedux(<Propositions />, mockedReducer, mockedState, {
      container: document.body.appendChild(modalContainer),
    });
  });

  it('displays 8 control buttons', () => {
    expect(screen.getAllByRole('button')).toHaveLength(8);
  });

  it('displays the proof table', () => {
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('4 buttons are enabled and 4 are disabled by default', () => {
    expect(screen.getByTitle('Enter premise')).toBeEnabled();
    expect(screen.getByTitle('Implication Creation')).toBeEnabled();
    expect(screen.getByTitle('Implication Distribution')).toBeEnabled();
    expect(screen.getByTitle('Contradiction Realization')).toBeEnabled();

    expect(screen.getByTitle('Reiterate proof step')).toBeDisabled();
    expect(screen.getByTitle('Implication Elimination')).toBeDisabled();
    expect(screen.getByTitle('Delete proof step')).toBeDisabled();
    expect(screen.getByTitle('Replace symbol')).toBeDisabled();
  });

  it('on click Enter premise button the popup is appeared', () => {
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    fireEvent.click(screen.getByTitle('Enter premise'));
    expect(screen.queryByRole('dialog')).toBeInTheDocument();
    expect(screen.queryByRole('form')).toBeInTheDocument();
    screen.debug();
  });

  it('on click Implication Creation button the popup is appeared', () => {
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    fireEvent.click(screen.getByTitle('Implication Creation'));
    expect(screen.queryByRole('dialog')).toBeInTheDocument();
    expect(screen.queryByRole('form')).toBeInTheDocument();
  });

  it('on click Implication Distribution button the popup is appeared', () => {
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    fireEvent.click(screen.getByTitle('Implication Distribution'));
    expect(screen.queryByRole('dialog')).toBeInTheDocument();
    expect(screen.queryByRole('form')).toBeInTheDocument();
  });

  it('on click Contradiction Realization button the popup is appeared', () => {
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    fireEvent.click(screen.getByTitle('Contradiction Realization'));
    expect(screen.queryByRole('dialog')).toBeInTheDocument();
    expect(screen.queryByRole('form')).toBeInTheDocument();
  });
});

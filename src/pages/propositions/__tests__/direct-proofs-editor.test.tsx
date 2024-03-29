import PropositionsDirectProofs from 'pages/propositions/sub-pages/direct-proofs';
import React from 'react';
import renderWithRedux from 'utils/testing/render-with-redux';
import texts from 'utils/texts/propositions/elements';
import userEvent from '@testing-library/user-event';
import { DP_INITIAL_STATE } from 'store/propositions/direct-proofs/initial-state';
import { NP_INITIAL_STATE } from 'store/propositions/natural-proofs/initial-state';
import { combineReducers } from '@reduxjs/toolkit';
import { fireEvent, screen } from '@testing-library/react';
import { propositionsDPSlice } from 'store/propositions/direct-proofs';
import { propositionsNPSlice } from 'store/propositions/natural-proofs';
import { settingsInitialState, settingsSlice } from 'store/settings';

describe('Direct Proofs Editor tests:', () => {
  const mockedReducer = combineReducers({
    settings: settingsSlice.reducer,
    propositionsDP: propositionsDPSlice.reducer,
    propositionsNP: propositionsNPSlice.reducer,
  });

  const mockedState = {
    settings: settingsInitialState,
    propositionsDP: DP_INITIAL_STATE,
    propositionsNP: NP_INITIAL_STATE,
  };

  beforeEach(() => {
    renderWithRedux(<PropositionsDirectProofs />, mockedReducer, mockedState);
  });

  it('displays 9 control buttons', () => {
    expect(screen.getAllByRole('button')).toHaveLength(9);
  });

  it('displays the proof table', () => {
    expect(screen.getByRole('table')).toBeInTheDocument();
    const headerRow = screen.getByRole('row');
    expect(headerRow).toHaveTextContent('#');
    expect(headerRow).toHaveTextContent('Formula');
    expect(headerRow).toHaveTextContent('Comment');
    expect(screen.getByText(texts.fillerText.en)).toBeInTheDocument();
  });

  it('4 buttons are enabled and 4 are disabled by default', () => {
    expect(screen.getByTitle('Enter a premise')).toBeEnabled();
    expect(screen.getByTitle('Implication Creation')).toBeEnabled();
    expect(screen.getByTitle('Implication Distribution')).toBeEnabled();
    expect(screen.getByTitle('Contradiction Realization')).toBeEnabled();

    expect(screen.getByTitle('Reiterate proof step(s)')).toBeDisabled();
    expect(screen.getByTitle('Implication Elimination')).toBeDisabled();
    expect(screen.getByTitle('Delete the proof step(s)')).toBeDisabled();
    expect(screen.getByTitle('Replace a symbol')).toBeDisabled();
  });

  it('on click Enter premise button the popup is appeared', () => {
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    fireEvent.click(screen.getByTitle('Enter a premise'));
    expect(screen.queryByRole('dialog')).toBeInTheDocument();
    expect(screen.queryByRole('form')).toBeInTheDocument();
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

  it('user can add a premise to the proof table through the form', async () => {
    // Check initial table values
    expect(screen.getAllByRole('row')).toHaveLength(1);
    expect(screen.getByText(texts.fillerText.en)).toBeInTheDocument();

    // Open the form
    fireEvent.click(screen.getByTitle('Enter a premise'));
    const testInput = 'Q';

    // Find the controls
    const premiseInput = screen.getByRole('textbox');
    const applyBtn = screen.getByTitle('Apply');
    expect(premiseInput).toHaveAttribute('name', 'premise');
    expect(applyBtn).toBeDisabled();

    // Enter a value
    await userEvent.type(premiseInput, testInput);
    expect(premiseInput).toHaveValue(testInput);
    expect(applyBtn).toBeEnabled();

    // Click apply & close the popup
    await userEvent.click(applyBtn);

    // Check that a new formula was added
    expect(screen.queryByText(texts.fillerText.en)).not.toBeInTheDocument();
    expect(screen.getAllByRole('cell')).toHaveLength(4);
    expect(screen.getAllByRole('row')).toHaveLength(2);
    const secondRow = screen.getAllByRole('row')[1];
    expect(secondRow).toHaveTextContent(testInput);
    expect(secondRow).toHaveTextContent('1');
    expect(secondRow).toHaveTextContent('Premise');
  });

  it('user can add a IC to the proof table through the form', async () => {
    // Check initial table values
    expect(screen.getAllByRole('row')).toHaveLength(1);
    expect(screen.getByText(texts.fillerText.en)).toBeInTheDocument();

    // Open the form
    fireEvent.click(screen.getByTitle('Implication Creation'));
    const testFirstVariable = 'P';
    const testSecondVariable = 'Q';

    // Find the controls
    const [firstInput, secondInput] = screen.getAllByRole('textbox');
    const applyBtn = screen.getByTitle('Apply');
    expect(firstInput).toHaveAttribute('name', 'firstVariable');
    expect(secondInput).toHaveAttribute('name', 'secondVariable');
    expect(applyBtn).toBeDisabled();

    // Enter a value
    await userEvent.type(firstInput, testFirstVariable);
    await userEvent.type(secondInput, testSecondVariable);
    expect(firstInput).toHaveValue(testFirstVariable);
    expect(secondInput).toHaveValue(testSecondVariable);
    expect(applyBtn).toBeEnabled();

    // Click apply & close the popup
    await userEvent.click(applyBtn);

    // Check that a new formula was added
    expect(screen.queryByText(texts.fillerText.en)).not.toBeInTheDocument();
    expect(screen.getAllByRole('cell')).toHaveLength(4);
    expect(screen.getAllByRole('row')).toHaveLength(2);
    const secondRow = screen.getAllByRole('row')[1];
    expect(secondRow).toHaveTextContent('1');
    expect(secondRow).toHaveTextContent('IC');
  });

  it('user can add a ID to the proof table through the form', async () => {
    // Check initial table values
    expect(screen.getAllByRole('row')).toHaveLength(1);
    expect(screen.getByText(texts.fillerText.en)).toBeInTheDocument();

    // Open the form
    fireEvent.click(screen.getByTitle('Implication Distribution'));
    const testFirstVariable = 'P';
    const testSecondVariable = 'Q';
    const testThirdVariable = 'R';

    // Find the controls
    const [firstInput, secondInput, thirdInput] = screen.getAllByRole('textbox');
    const applyBtn = screen.getByTitle('Apply');
    expect(firstInput).toHaveAttribute('name', 'firstVariable');
    expect(secondInput).toHaveAttribute('name', 'secondVariable');
    expect(thirdInput).toHaveAttribute('name', 'thirdVariable');
    expect(applyBtn).toBeDisabled();

    // Enter a value
    await userEvent.type(firstInput, testFirstVariable);
    await userEvent.type(secondInput, testSecondVariable);
    await userEvent.type(thirdInput, testThirdVariable);
    expect(firstInput).toHaveValue(testFirstVariable);
    expect(secondInput).toHaveValue(testSecondVariable);
    expect(thirdInput).toHaveValue(testThirdVariable);
    expect(applyBtn).toBeEnabled();

    // Click apply & close the popup
    await userEvent.click(applyBtn);

    // Check that a new formula was added
    expect(screen.queryByText(texts.fillerText.en)).not.toBeInTheDocument();
    expect(screen.getAllByRole('cell')).toHaveLength(4);
    expect(screen.getAllByRole('row')).toHaveLength(2);
    const secondRow = screen.getAllByRole('row')[1];
    expect(secondRow).toHaveTextContent('1');
    expect(secondRow).toHaveTextContent('ID');
  });

  it('user can add a CR to the proof table through the form', async () => {
    // Check initial table values
    expect(screen.getAllByRole('row')).toHaveLength(1);
    expect(screen.getByText(texts.fillerText.en)).toBeInTheDocument();

    // Open the form
    fireEvent.click(screen.getByTitle('Contradiction Realization'));
    const testFirstVariable = 'P';
    const testSecondVariable = 'Q';

    // Find the controls
    const [firstInput, secondInput] = screen.getAllByRole('textbox');
    const applyBtn = screen.getByTitle('Apply');
    expect(firstInput).toHaveAttribute('name', 'firstVariable');
    expect(secondInput).toHaveAttribute('name', 'secondVariable');
    expect(applyBtn).toBeDisabled();

    // Enter a value
    await userEvent.type(firstInput, testFirstVariable);
    await userEvent.type(secondInput, testSecondVariable);
    expect(firstInput).toHaveValue(testFirstVariable);
    expect(secondInput).toHaveValue(testSecondVariable);
    expect(applyBtn).toBeEnabled();

    // Click apply & close the popup
    await userEvent.click(applyBtn);

    // Check that a new formula was added
    expect(screen.queryByText(texts.fillerText.en)).not.toBeInTheDocument();
    expect(screen.getAllByRole('cell')).toHaveLength(4);
    expect(screen.getAllByRole('row')).toHaveLength(2);
    const secondRow = screen.getAllByRole('row')[1];
    expect(secondRow).toHaveTextContent('1');
    expect(secondRow).toHaveTextContent('CR');
  });
});

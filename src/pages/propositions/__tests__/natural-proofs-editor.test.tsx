import PropositionsNaturalProofs from 'pages/propositions/sub-pages/natural-proofs';
import React from 'react';
import renderWithRedux from 'helpers/test-utils/render-with-redux';
import userEvent from '@testing-library/user-event';
import { combineReducers } from '@reduxjs/toolkit';
import { fillerNaturalText, fillerText } from 'texts/propositions';
import { fireEvent, screen } from '@testing-library/react';
import { propositionsDPInitialState } from 'store/propositions/direct-proofs/initial-state';
import { propositionsDPSlice } from 'store/propositions/direct-proofs/slice';
import { propositionsNPInitialState } from 'store/propositions/natural-proofs/initial-state';
import { propositionsNPSlice } from 'store/propositions/natural-proofs/slice';
import { settingsInitialState, settingsSlice } from 'store/settings/slice';

describe('Natural Proofs Editor tests:', () => {
  const mockedReducer = combineReducers({
    settings: settingsSlice.reducer,
    propositionsNP: propositionsNPSlice.reducer,
    propositionsDP: propositionsDPSlice.reducer,
  });

  const mockedState = {
    settings: settingsInitialState,
    propositionsNP: propositionsNPInitialState,
    propositionsDP: propositionsDPInitialState,
  };

  beforeEach(() => {
    renderWithRedux(<PropositionsNaturalProofs />, mockedReducer, mockedState);
  });

  it('displays 16 control buttons', () => {
    expect(screen.getAllByRole('button')).toHaveLength(16);
  });

  it('displays the proof table', () => {
    expect(screen.getByRole('table')).toBeInTheDocument();
    const headerRow = screen.getByRole('row');
    expect(headerRow).toHaveTextContent('#');
    expect(headerRow).toHaveTextContent('Formula');
    expect(headerRow).toHaveTextContent('Comment');
    expect(screen.getByText(fillerNaturalText.en)).toBeInTheDocument();
  });

  it('3 buttons are enabled and 4 are disabled by default', () => {
    expect(screen.getByTitle('Enter a premise')).toBeEnabled();
    expect(screen.getByTitle('Enter an assumption')).toBeEnabled();
    expect(screen.getByTitle('Create a shortcut')).toBeEnabled();

    expect(screen.getByTitle('Reiterate proof step(s)')).toBeDisabled();
    expect(screen.getByTitle('Delete the proof step(s)')).toBeDisabled();
    expect(screen.getByTitle('Replace a symbol')).toBeDisabled();
    expect(screen.getByTitle('Negation Introduction')).toBeDisabled();
    expect(screen.getByTitle('Negation Elimination')).toBeDisabled();
    expect(screen.getByTitle('Conjunction Introduction')).toBeDisabled();
    expect(screen.getByTitle('Conjunction Elimination')).toBeDisabled();
    expect(screen.getByTitle('Disjunction Introduction')).toBeDisabled();
    expect(screen.getByTitle('Disjunction Elimination')).toBeDisabled();
    expect(screen.getByTitle('Implication Introduction')).toBeDisabled();
    expect(screen.getByTitle('Implication Elimination')).toBeDisabled();
    expect(screen.getByTitle('Equivalence Introduction')).toBeDisabled();
    expect(screen.getByTitle('Equivalence Elimination')).toBeDisabled();
  });

  it('on click Enter premise button the popup is appeared', () => {
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    fireEvent.click(screen.getByTitle('Enter a premise'));
    expect(screen.queryByRole('dialog')).toBeInTheDocument();
    expect(screen.queryByRole('form')).toBeInTheDocument();
  });

  it('user can add a premise to the proof table through the form', async () => {
    // Check initial table values
    expect(screen.getAllByRole('row')).toHaveLength(1);
    expect(screen.getByText(fillerNaturalText.en)).toBeInTheDocument();

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
    expect(screen.queryByText(fillerText.en)).not.toBeInTheDocument();
    expect(screen.getAllByRole('cell')).toHaveLength(4);
    expect(screen.getAllByRole('row')).toHaveLength(2);
    const secondRow = screen.getAllByRole('row')[1];
    expect(secondRow).toHaveTextContent(testInput);
    expect(secondRow).toHaveTextContent('1');
    expect(secondRow).toHaveTextContent('Premise');
  });

  it('user can add an assumption to the proof table through the form', async () => {
    // Check initial table values
    expect(screen.getAllByRole('row')).toHaveLength(1);
    expect(screen.getByText(fillerNaturalText.en)).toBeInTheDocument();

    // Open the form
    fireEvent.click(screen.getByTitle('Enter an assumption'));
    const text = 'R';

    // Find the controls
    const input = screen.getByRole('textbox');
    const applyBtn = screen.getByTitle('Apply');
    expect(input).toHaveAttribute('name', 'premise');
    expect(applyBtn).toBeDisabled();

    // Enter a value
    await userEvent.type(input, text);
    expect(input).toHaveValue(text);
    expect(applyBtn).toBeEnabled();

    // Click apply & close the popup
    await userEvent.click(applyBtn);

    // Check that a new formula was added
    expect(screen.queryByText(fillerText.en)).not.toBeInTheDocument();
    expect(screen.getAllByRole('cell')).toHaveLength(4);
    expect(screen.getAllByRole('row')).toHaveLength(2);
    const secondRow = screen.getAllByRole('row')[1];
    expect(secondRow).toHaveTextContent(text);
    expect(secondRow).toHaveTextContent('1');
    expect(secondRow).toHaveTextContent('Assumption');
  });
});

import mocks from '__mocks__/data/propositions/table-items';
import propositionsElementsTexts from 'utils/texts/propositions/elements';
import { NPFormulaBase } from 'enums';
import { npActions as actions, propositionsNPSlice as slice } from '..';
import { NP_INITIAL_STATE as state } from '../initial-state';

describe('propositionsNPSlice tests:', () => {
  it('should return the initial state', () => {
    expect(slice.reducer(undefined, { type: undefined })).toEqual(state);
  });

  it('should handle table data being added to the store', () => {
    expect(slice.reducer(state, actions.setTableData(mocks.npTableDataIEandII))).toEqual({ ...state, tableData: mocks.npTableDataIEandII });
  });

  it('should handle selected ids being added to the store', () => {
    const testIds = ['1', '2', '3'];

    expect(slice.reducer(state, actions.setSelectedIds(testIds))).toEqual({ ...state, selectedIds: testIds });
  });

  it('should handle an error being added to the store', () => {
    expect(slice.reducer(state, actions.setError(propositionsElementsTexts.generalError))).toEqual({
      ...state,
      error: propositionsElementsTexts.generalError,
    });
  });

  it('should handle a premise being added to the store', () => {
    expect(slice.reducer(state, actions.addPremise('p&r'))).toEqual({
      ...state,
      tableData: [{ ...mocks.npTableDataIEandII[0], id: expect.any(String) }],
    });
  });

  it('should be able to reiterate step', () => {
    const testState = { ...state, tableData: [mocks.npTableDataIEandII[0]], selectedIds: [mocks.npTableDataIEandII[0].id] };
    const expectedStep = {
      ...mocks.npTableDataIEandII[0],
      id: expect.any(String),
      step: 2,
      comment: { en: `Reiter. 1`, ru: `Повтор 1` },
      dependentOn: [mocks.npTableDataIEandII[0].id],
    };

    expect(slice.reducer(testState, actions.reiterateStep())).toEqual({ ...state, tableData: [mocks.npTableDataIEandII[0], expectedStep] });
  });

  it('should handle a shortcut being added to the store', () => {
    expect(slice.reducer(state, actions.addShortcut({ rawInput: 'p&r', comment: 'test comment' }))).toEqual({
      ...state,
      tableData: [
        {
          ...mocks.npTableDataIEandII[0],
          id: expect.any(String),
          comment: { en: 'test comment', ru: 'test comment' },
          formulaBase: NPFormulaBase.Shortcut,
        },
      ],
    });
  });
});

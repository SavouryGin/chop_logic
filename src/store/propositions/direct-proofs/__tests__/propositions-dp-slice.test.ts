import mocks from '__mocks__/data/propositions/table-items';
import propositionsElementsTexts from 'texts/propositions/elements';
import { dpActions as actions, propositionsDPSlice as slice } from '..';
import { DP_INITIAL_STATE as state } from '../initial-state';

describe('propositionsDPSlice tests:', () => {
  it('should return the initial state', () => {
    expect(slice.reducer(undefined, { type: undefined })).toEqual(state);
  });

  it('should handle table data being added to the store', () => {
    expect(slice.reducer(state, actions.setTableData(mocks.dpTableDataIE))).toEqual({ ...state, tableData: mocks.dpTableDataIE });
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
    expect(slice.reducer(state, actions.addPremise('p|q'))).toEqual({
      ...state,
      tableData: [{ ...mocks.dpTableDataIE[0], id: expect.any(String) }],
    });
  });

  it('should be able to reiterate step', () => {
    const testState = { ...state, tableData: [mocks.dpTableDataIE[0]], selectedIds: [mocks.dpTableDataIE[0].id] };
    const expectedStep = { ...mocks.dpTableDataIE[0], id: expect.any(String), step: 2, comment: { en: `Reiter. 1`, ru: `Повтор 1` } };

    expect(slice.reducer(testState, actions.reiterateStep())).toEqual({ ...state, tableData: [mocks.dpTableDataIE[0], expectedStep] });
  });

  it('should handle a createImplication action', () => {
    expect(slice.reducer(state, actions.createImplication({ firstVariable: 'p|q', secondVariable: 'r' }))).toEqual({
      ...state,
      tableData: [{ ...mocks.dpTableDataIE[1], id: expect.any(String), step: 1 }],
    });
  });

  it('should handle an eliminateImplication actions', () => {
    const testItems = [mocks.dpTableDataIE[0], mocks.dpTableDataIE[1]];
    const testState = {
      ...state,
      tableData: testItems,
      selectedIds: [mocks.dpTableDataIE[0].id, mocks.dpTableDataIE[0].id],
    };

    expect(slice.reducer(testState, actions.eliminateImplication())).toEqual({
      ...state,
      tableData: [...testItems, { ...mocks.dpTableDataIE[2], id: expect.any(String) }],
      selectedIds: [],
    });
  });
});

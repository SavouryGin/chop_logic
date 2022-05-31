import { getDataCellsValues } from '../helpers';
import { testTableColumns, testTableData } from '__mocks__/test-data/table';

describe('getDataCellsValues() tests:', () => {
  it('returns a string array from the first row', () => {
    const result = getDataCellsValues(testTableData[0], testTableColumns, 'en');
    expect(result).toEqual(['1', '2', '3', 'en4']);
  });

  it('returns a string array from the second row', () => {
    const result = getDataCellsValues(testTableData[1], testTableColumns, 'en');
    expect(result).toEqual(['5', '6', '7', 'en8']);
  });

  it('returns an empty array if an empty array is given', () => {
    const result = getDataCellsValues(testTableData[1], [], 'en');
    expect(result).toEqual([]);
  });

  it('changes the language of the data cells', () => {
    const result = getDataCellsValues(testTableData[0], testTableColumns, 'ru');
    expect(result).toEqual(['1', '2', '3', 'ru4']);
  });
});

import { testTableColumns, testTableData } from '__mocks__/test-data/table';
import { getDataCellsValues } from '../helpers';

describe('getDataCellsValues() tests:', () => {
  it('returns a string array from the first row', () => {
    const result = getDataCellsValues(testTableData[0], testTableColumns, 'en');
    expect(result).toEqual(['1', '2', '3', '4']);
  });

  it('returns a string array from the second row', () => {
    const result = getDataCellsValues(testTableData[1], testTableColumns, 'en');
    expect(result).toEqual(['5', '6', '7', '8']);
  });

  it('returns an empty array if an empty array is given', () => {
    const result = getDataCellsValues(testTableData[1], [], 'en');
    expect(result).toEqual([]);
  });
});

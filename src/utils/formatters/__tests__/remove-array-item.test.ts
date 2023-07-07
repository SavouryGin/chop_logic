import { removeArrayItemByIndex } from '../remove-array-item';

describe('Test removeArrayItemByIndex function:', () => {
  it('should work with an array of numbers', () => {
    const result = removeArrayItemByIndex([1, 2, 3, 4, 5], 1);
    expect(result).toEqual([1, 3, 4, 5]);
  });

  it('should work with an array of strings', () => {
    const result = removeArrayItemByIndex(['1', '2', '3', '4', '5'], 1);
    expect(result).toEqual(['1', '3', '4', '5']);
  });

  it('should ignore an incorrect index', () => {
    const result = removeArrayItemByIndex(['1', '2', '3', '4', '5'], -1);
    expect(result).toEqual(['1', '2', '3', '4', '5']);
  });

  it('should ignore an incorrect exceeding index', () => {
    const result = removeArrayItemByIndex(['1', '2', '3', '4', '5'], 12);
    expect(result).toEqual(['1', '2', '3', '4', '5']);
  });
});

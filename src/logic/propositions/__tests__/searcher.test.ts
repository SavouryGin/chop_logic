import searcher from '../searcher';
import { PropositionalError } from 'errors/propositional-error';

describe('Propositions searcher tests', () => {
  it('findClosestParenthesisIndexes() returns the closest index', () => {
    expect(searcher.findClosestParenthesisIndexes(1, [2, 5, 4])).toBe(2);
    expect(searcher.findClosestParenthesisIndexes(3, [2, 5, 4])).toBe(4);
    expect(searcher.findClosestParenthesisIndexes(3, [2, 5, 6, 7])).toBe(5);
  });

  it('findClosestParenthesisIndexes() throws an error if inputs are invalid', () => {
    expect(() => {
      searcher.findClosestParenthesisIndexes(6, [2, 5, 4]);
    }).toThrow(PropositionalError);
    expect(() => {
      searcher.findClosestParenthesisIndexes(-1, [-2, -5, -4]);
    }).toThrow(PropositionalError);
    expect(() => {
      searcher.findClosestParenthesisIndexes(Infinity, [NaN, NaN, NaN]);
    }).toThrow(PropositionalError);
  });
});

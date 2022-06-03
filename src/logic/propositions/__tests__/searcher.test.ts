import searcher from '../searcher';
import { PropositionalError } from 'errors/propositional-error';

describe('Propositions searcher tests', () => {
  it('findClosestParenthesis() returns the closest index', () => {
    expect(searcher.findClosestParenthesis(1, [2, 5, 4])).toBe(2);
    expect(searcher.findClosestParenthesis(3, [2, 5, 4])).toBe(4);
    expect(searcher.findClosestParenthesis(3, [2, 5, 6, 7])).toBe(5);
  });

  it('findClosestParenthesis() throws an error if inputs are invalid', () => {
    expect(() => {
      searcher.findClosestParenthesis(6, [2, 5, 4]);
    }).toThrow(PropositionalError);
    expect(() => {
      searcher.findClosestParenthesis(-1, [-2, -5, -4]);
    }).toThrow(PropositionalError);
    expect(() => {
      searcher.findClosestParenthesis(Infinity, [NaN, NaN, NaN]);
    }).toThrow(PropositionalError);
  });
});

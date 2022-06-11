import validator from '../validator';
import { PropositionalError } from 'errors/propositional-error';
import { propositionalSymbols } from '__mocks__/test-data/propositions';

describe('Propositions validator tests', () => {
  it('isIncorrectMainSymbol() test', () => {
    expect(validator.isIncorrectMainSymbol(propositionalSymbols[0])).toBe(false);
    expect(validator.isIncorrectMainSymbol(propositionalSymbols[1])).toBe(false);
    expect(validator.isIncorrectMainSymbol(propositionalSymbols[2])).toBe(false);
    expect(validator.isIncorrectMainSymbol(propositionalSymbols[3])).toBe(false);
    expect(validator.isIncorrectMainSymbol(propositionalSymbols[4])).toBe(false);
    expect(validator.isIncorrectMainSymbol(propositionalSymbols[5])).toBe(false);
    expect(validator.isIncorrectMainSymbol(propositionalSymbols[6])).toBe(true);
  });

  it('isOpenParenthesisSymbol() test', () => {
    expect(validator.isOpenParenthesisSymbol(propositionalSymbols[7])).toBe(true);
    expect(validator.isOpenParenthesisSymbol(propositionalSymbols[6])).toBe(false);
    expect(validator.isOpenParenthesisSymbol(propositionalSymbols[5])).toBe(false);
    expect(validator.isOpenParenthesisSymbol(propositionalSymbols[4])).toBe(false);
  });

  it('isCloseParenthesisSymbol() test', () => {
    expect(validator.isCloseParenthesisSymbol(propositionalSymbols[6])).toBe(true);
    expect(validator.isCloseParenthesisSymbol(propositionalSymbols[7])).toBe(false);
    expect(validator.isCloseParenthesisSymbol(propositionalSymbols[5])).toBe(false);
    expect(validator.isCloseParenthesisSymbol(propositionalSymbols[4])).toBe(false);
  });

  it('isBinaryOperator() test', () => {
    expect(validator.isBinaryOperator(0)).toBe(false);
    expect(validator.isBinaryOperator(1)).toBe(false);
    expect(validator.isBinaryOperator(2)).toBe(true);
    expect(validator.isBinaryOperator(3)).toBe(true);
    expect(validator.isBinaryOperator(4)).toBe(true);
    expect(validator.isBinaryOperator(5)).toBe(true);
  });

  it('isNegationSymbol() test', () => {
    expect(validator.isNegationSymbol(propositionalSymbols[0])).toBe(true);
    expect(validator.isNegationSymbol(propositionalSymbols[1])).toBe(false);
    expect(validator.isNegationSymbol(propositionalSymbols[2])).toBe(false);
    expect(validator.isNegationSymbol(propositionalSymbols[3])).toBe(false);
    expect(validator.isNegationSymbol(propositionalSymbols[4])).toBe(false);
    expect(validator.isNegationSymbol(propositionalSymbols[5])).toBe(false);
    expect(validator.isNegationSymbol(propositionalSymbols[6])).toBe(false);
    expect(validator.isNegationSymbol(propositionalSymbols[7])).toBe(false);
  });

  it('isBinarySymbol() test', () => {
    expect(validator.isBinarySymbol(propositionalSymbols[0])).toBe(false);
    expect(validator.isBinarySymbol(propositionalSymbols[1])).toBe(true);
    expect(validator.isBinarySymbol(propositionalSymbols[2])).toBe(true);
    expect(validator.isBinarySymbol(propositionalSymbols[3])).toBe(true);
    expect(validator.isBinarySymbol(propositionalSymbols[4])).toBe(true);
    expect(validator.isBinarySymbol(propositionalSymbols[5])).toBe(false);
    expect(validator.isBinarySymbol(propositionalSymbols[6])).toBe(false);
    expect(validator.isBinarySymbol(propositionalSymbols[7])).toBe(false);
  });

  it('checkNumberOfParenthesis() tests', () => {
    expect(validator.checkNumberOfParenthesis([1, 2, 3], [4, 5, 6])).toBe(undefined);
    expect(validator.checkNumberOfParenthesis([], [])).toBe(undefined);
    expect(() => {
      validator.checkNumberOfParenthesis([1, 2, 3], [4, 5]);
    }).toThrow(PropositionalError);
    expect(() => {
      validator.checkNumberOfParenthesis([1, 2, 3], [5]);
    }).toThrow(PropositionalError);
    expect(() => {
      validator.checkNumberOfParenthesis([], [5, 6]);
    }).toThrow(PropositionalError);
  });
});

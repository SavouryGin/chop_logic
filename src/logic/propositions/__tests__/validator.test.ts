import validator from '../validator';
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
});

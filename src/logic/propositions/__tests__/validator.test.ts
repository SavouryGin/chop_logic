import testData from '__mocks__/test-data/propositions';
import validator from '../validator';
import { PropositionalError } from 'errors/propositional-error';

describe('Propositions validator tests', () => {
  it('isIncorrectMainSymbol() test', () => {
    expect(validator.isIncorrectMainSymbol(testData.propositionalSymbols[0])).toBeFalsy();
    expect(validator.isIncorrectMainSymbol(testData.propositionalSymbols[1])).toBeFalsy();
    expect(validator.isIncorrectMainSymbol(testData.propositionalSymbols[2])).toBeFalsy();
    expect(validator.isIncorrectMainSymbol(testData.propositionalSymbols[3])).toBeFalsy();
    expect(validator.isIncorrectMainSymbol(testData.propositionalSymbols[4])).toBeFalsy();
    expect(validator.isIncorrectMainSymbol(testData.propositionalSymbols[5])).toBeFalsy();
    expect(validator.isIncorrectMainSymbol(testData.propositionalSymbols[6])).toBeTruthy();
  });

  it('isOpenParenthesisSymbol() test', () => {
    expect(validator.isOpenParenthesisSymbol(testData.propositionalSymbols[7])).toBeTruthy();
    expect(validator.isOpenParenthesisSymbol(testData.propositionalSymbols[6])).toBeFalsy();
    expect(validator.isOpenParenthesisSymbol(testData.propositionalSymbols[5])).toBeFalsy();
    expect(validator.isOpenParenthesisSymbol(testData.propositionalSymbols[4])).toBeFalsy();
  });

  it('isCloseParenthesisSymbol() test', () => {
    expect(validator.isCloseParenthesisSymbol(testData.propositionalSymbols[6])).toBeTruthy();
    expect(validator.isCloseParenthesisSymbol(testData.propositionalSymbols[7])).toBeFalsy();
    expect(validator.isCloseParenthesisSymbol(testData.propositionalSymbols[5])).toBeFalsy();
    expect(validator.isCloseParenthesisSymbol(testData.propositionalSymbols[4])).toBeFalsy();
  });

  it('isBinaryOperator() test', () => {
    expect(validator.isBinaryOperator(0)).toBeFalsy();
    expect(validator.isBinaryOperator(1)).toBeFalsy();
    expect(validator.isBinaryOperator(2)).toBeTruthy();
    expect(validator.isBinaryOperator(3)).toBeTruthy();
    expect(validator.isBinaryOperator(4)).toBeTruthy();
    expect(validator.isBinaryOperator(5)).toBeTruthy();
  });

  it('isNegationSymbol() test', () => {
    expect(validator.isNegationSymbol(testData.propositionalSymbols[0])).toBeTruthy();
    expect(validator.isNegationSymbol(testData.propositionalSymbols[1])).toBeFalsy();
    expect(validator.isNegationSymbol(testData.propositionalSymbols[2])).toBeFalsy();
    expect(validator.isNegationSymbol(testData.propositionalSymbols[3])).toBeFalsy();
    expect(validator.isNegationSymbol(testData.propositionalSymbols[4])).toBeFalsy();
    expect(validator.isNegationSymbol(testData.propositionalSymbols[5])).toBeFalsy();
    expect(validator.isNegationSymbol(testData.propositionalSymbols[6])).toBeFalsy();
    expect(validator.isNegationSymbol(testData.propositionalSymbols[7])).toBeFalsy();
  });

  it('isBinarySymbol() test', () => {
    expect(validator.isBinarySymbol(testData.propositionalSymbols[0])).toBeFalsy();
    expect(validator.isBinarySymbol(testData.propositionalSymbols[1])).toBeTruthy();
    expect(validator.isBinarySymbol(testData.propositionalSymbols[2])).toBeTruthy();
    expect(validator.isBinarySymbol(testData.propositionalSymbols[3])).toBeTruthy();
    expect(validator.isBinarySymbol(testData.propositionalSymbols[4])).toBeTruthy();
    expect(validator.isBinarySymbol(testData.propositionalSymbols[5])).toBeFalsy();
    expect(validator.isBinarySymbol(testData.propositionalSymbols[6])).toBeFalsy();
    expect(validator.isBinarySymbol(testData.propositionalSymbols[7])).toBeFalsy();
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

  it('isVariableParenthesized() test', () => {
    expect(validator.isVariableParenthesized(testData.propositionalExpression[4], testData.propositionalExpression)).toBeTruthy();
    expect(validator.isVariableParenthesized(testData.propositionalExpression[11], testData.propositionalExpression)).toBeTruthy();
    expect(validator.isVariableParenthesized(testData.propositionalExpression[15], testData.propositionalExpression)).toBeTruthy();
    expect(validator.isVariableParenthesized(testData.propositionalExpression[22], testData.propositionalExpression)).toBeTruthy();
    expect(validator.isVariableParenthesized(testData.propositionalExpression[4], testData.firstVariable.slice(1))).toBeFalsy();
    expect(validator.isVariableParenthesized(testData.propositionalExpression[4], testData.thirdSubExpression)).toBeFalsy();
  });

  it('isNegationParenthesized() test', () => {
    expect(validator.isNegationParenthesized(testData.fourthSubExpression[1], testData.fourthSubExpression)).toBeTruthy();
    expect(validator.isNegationParenthesized(testData.firstSubExpression[1], testData.firstSubExpression)).toBeTruthy();
    expect(validator.isNegationParenthesized(testData.propositionalExpression[2], testData.propositionalExpression)).toBeTruthy();
    expect(validator.isNegationParenthesized(testData.propositionalSymbols[0], testData.firstSubExpression)).toBeFalsy();
    expect(validator.isNegationParenthesized(testData.propositionalSymbols[0], testData.propositionalExpression)).toBeFalsy();
    expect(validator.isNegationParenthesized(testData.propositionalSymbols[0], [testData.propositionalSymbols[0]])).toBeFalsy();
    expect(
      validator.isNegationParenthesized(testData.propositionalSymbols[0], [testData.propositionalSymbols[0], testData.closeParenthesis]),
    ).toBeFalsy();
  });
});

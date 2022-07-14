import mocks from '__mocks__/data/propositions';
import validator from '../validator';
import { PropositionalError } from 'errors/propositional-error';
import { PropositionalOperator } from 'enums';

describe('Propositions validator tests', () => {
  it('isIncorrectMainSymbol() test', () => {
    expect(validator.isIncorrectMainSymbol(mocks.propositionalSymbols[0])).toBeFalsy();
    expect(validator.isIncorrectMainSymbol(mocks.propositionalSymbols[1])).toBeFalsy();
    expect(validator.isIncorrectMainSymbol(mocks.propositionalSymbols[2])).toBeFalsy();
    expect(validator.isIncorrectMainSymbol(mocks.propositionalSymbols[3])).toBeFalsy();
    expect(validator.isIncorrectMainSymbol(mocks.propositionalSymbols[4])).toBeFalsy();
    expect(validator.isIncorrectMainSymbol(mocks.propositionalSymbols[5])).toBeFalsy();
    expect(validator.isIncorrectMainSymbol(mocks.propositionalSymbols[6])).toBeTruthy();
  });

  it('isOpenParenthesisSymbol() test', () => {
    expect(validator.isOpenParenthesisSymbol(mocks.propositionalSymbols[7])).toBeTruthy();
    expect(validator.isOpenParenthesisSymbol(mocks.propositionalSymbols[6])).toBeFalsy();
    expect(validator.isOpenParenthesisSymbol(mocks.propositionalSymbols[5])).toBeFalsy();
    expect(validator.isOpenParenthesisSymbol(mocks.propositionalSymbols[4])).toBeFalsy();
  });

  it('isCloseParenthesisSymbol() test', () => {
    expect(validator.isCloseParenthesisSymbol(mocks.propositionalSymbols[6])).toBeTruthy();
    expect(validator.isCloseParenthesisSymbol(mocks.propositionalSymbols[7])).toBeFalsy();
    expect(validator.isCloseParenthesisSymbol(mocks.propositionalSymbols[5])).toBeFalsy();
    expect(validator.isCloseParenthesisSymbol(mocks.propositionalSymbols[4])).toBeFalsy();
  });

  it('isBinaryOperator() test', () => {
    expect(validator.isBinaryOperator(PropositionalOperator.Var)).toBeFalsy();
    expect(validator.isBinaryOperator(PropositionalOperator.Not)).toBeFalsy();
    expect(validator.isBinaryOperator(PropositionalOperator.Or)).toBeTruthy();
    expect(validator.isBinaryOperator(PropositionalOperator.And)).toBeTruthy();
    expect(validator.isBinaryOperator(PropositionalOperator.Implies)).toBeTruthy();
    expect(validator.isBinaryOperator(PropositionalOperator.Equiv)).toBeTruthy();
  });

  it('isNegationSymbol() test', () => {
    expect(validator.isNegationSymbol(mocks.propositionalSymbols[0])).toBeTruthy();
    expect(validator.isNegationSymbol(mocks.propositionalSymbols[1])).toBeFalsy();
    expect(validator.isNegationSymbol(mocks.propositionalSymbols[2])).toBeFalsy();
    expect(validator.isNegationSymbol(mocks.propositionalSymbols[3])).toBeFalsy();
    expect(validator.isNegationSymbol(mocks.propositionalSymbols[4])).toBeFalsy();
    expect(validator.isNegationSymbol(mocks.propositionalSymbols[5])).toBeFalsy();
    expect(validator.isNegationSymbol(mocks.propositionalSymbols[6])).toBeFalsy();
    expect(validator.isNegationSymbol(mocks.propositionalSymbols[7])).toBeFalsy();
  });

  it('isBinarySymbol() test', () => {
    expect(validator.isBinarySymbol(mocks.propositionalSymbols[0])).toBeFalsy();
    expect(validator.isBinarySymbol(mocks.propositionalSymbols[1])).toBeTruthy();
    expect(validator.isBinarySymbol(mocks.propositionalSymbols[2])).toBeTruthy();
    expect(validator.isBinarySymbol(mocks.propositionalSymbols[3])).toBeTruthy();
    expect(validator.isBinarySymbol(mocks.propositionalSymbols[4])).toBeTruthy();
    expect(validator.isBinarySymbol(mocks.propositionalSymbols[5])).toBeFalsy();
    expect(validator.isBinarySymbol(mocks.propositionalSymbols[6])).toBeFalsy();
    expect(validator.isBinarySymbol(mocks.propositionalSymbols[7])).toBeFalsy();
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
    expect(validator.isVariableParenthesized(mocks.propositionalExpression[4], mocks.propositionalExpression)).toBeTruthy();
    expect(validator.isVariableParenthesized(mocks.propositionalExpression[11], mocks.propositionalExpression)).toBeTruthy();
    expect(validator.isVariableParenthesized(mocks.propositionalExpression[15], mocks.propositionalExpression)).toBeTruthy();
    expect(validator.isVariableParenthesized(mocks.propositionalExpression[22], mocks.propositionalExpression)).toBeTruthy();
    expect(validator.isVariableParenthesized(mocks.propositionalExpression[4], mocks.firstVariable.slice(1))).toBeFalsy();
    expect(validator.isVariableParenthesized(mocks.propositionalExpression[4], mocks.thirdSubExpression)).toBeFalsy();
  });

  it('isNegationParenthesized() test', () => {
    expect(validator.isNegationParenthesized(mocks.fourthSubExpression[1], mocks.fourthSubExpression)).toBeTruthy();
    expect(validator.isNegationParenthesized(mocks.firstSubExpression[1], mocks.firstSubExpression)).toBeTruthy();
    expect(validator.isNegationParenthesized(mocks.propositionalExpression[2], mocks.propositionalExpression)).toBeTruthy();
    expect(validator.isNegationParenthesized(mocks.propositionalSymbols[0], mocks.firstSubExpression)).toBeFalsy();
    expect(validator.isNegationParenthesized(mocks.propositionalSymbols[0], mocks.propositionalExpression)).toBeFalsy();
    expect(validator.isNegationParenthesized(mocks.propositionalSymbols[0], [mocks.propositionalSymbols[0]])).toBeFalsy();
    expect(
      validator.isNegationParenthesized(mocks.propositionalSymbols[0], [mocks.propositionalSymbols[0], mocks.closeParenthesis]),
    ).toBeFalsy();
  });

  it('isBinaryOperatorParenthesized() test', () => {
    expect(validator.isBinaryOperatorParenthesized(mocks.twoVariablesExpression[3], mocks.twoVariablesExpression)).toBeFalsy();
    expect(validator.isBinaryOperatorParenthesized(mocks.propositionalExpression[7], mocks.propositionalExpression)).toBeTruthy();
    expect(validator.isBinaryOperatorParenthesized(mocks.propositionalExpression[13], mocks.propositionalExpression)).toBeTruthy();
    expect(validator.isBinaryOperatorParenthesized(mocks.propositionalExpression[18], mocks.propositionalExpression)).toBeTruthy();
  });

  it('areTwoFormulasEqual() test', () => {
    expect(validator.areTwoFormulasEqual(mocks.propositionalFormula, mocks.propositionalFormula)).toBeTruthy();
    expect(validator.areTwoFormulasEqual(mocks.contradictionRealizationFormula, mocks.contradictionRealizationFormula)).toBeTruthy();
    expect(validator.areTwoFormulasEqual('P', 'P')).toBeTruthy();
    expect(validator.areTwoFormulasEqual('P', mocks.propositionalFormula)).toBeFalsy();
    expect(validator.areTwoFormulasEqual('P', 'Q')).toBeFalsy();
  });
});

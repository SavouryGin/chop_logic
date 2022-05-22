import { PropositionalOperator } from 'enums';
import { PropositionalError } from 'errors/propositional-error';
import { PropositionalExpression, PropositionalFormula } from 'types';
import factory from './factory';
import parser from './parser';
import validator from './validator';

const converter = {
  convertStringToExpression(input: string): PropositionalExpression {
    const charsArray = parser.getCharsArrayFrom(input);
    const output = parser.joinLogicalSymbolsIn(charsArray);
    return output.map((char, index) => factory.createPropositionalSymbol(char, index));
  },

  convertExpressionToFormula(expression: PropositionalExpression): PropositionalFormula {
    const mainSymbol = parser.findTheMainOperatorOf(expression);
    if (validator.isIncorrectMainSymbol(mainSymbol)) {
      throw new PropositionalError(`Cannot convert expression to formula.\nThe main symbol is incorrect: ${mainSymbol}`);
    }
    const operator = factory.createOperator(mainSymbol);

    switch (operator) {
      case PropositionalOperator.Var: {
        return factory.createAtom(mainSymbol);
      }
      case PropositionalOperator.Not: {
        const argument = expression.slice(2, expression.length - 1);
        return factory.createNegation(this.convertExpressionToFormula(argument));
      }
      case PropositionalOperator.Implies: {
        const { firstArgument, secondArgument } = parser.splitExpressionByIndex(mainSymbol.position, expression);
        return factory.createImplication(this.convertExpressionToFormula(firstArgument), this.convertExpressionToFormula(secondArgument));
      }
      case PropositionalOperator.And: {
        const { firstArgument, secondArgument } = parser.splitExpressionByIndex(mainSymbol.position, expression);
        return factory.createConjunction(this.convertExpressionToFormula(firstArgument), this.convertExpressionToFormula(secondArgument));
      }
      case PropositionalOperator.Or: {
        const { firstArgument, secondArgument } = parser.splitExpressionByIndex(mainSymbol.position, expression);
        return factory.createDisjunction(this.convertExpressionToFormula(firstArgument), this.convertExpressionToFormula(secondArgument));
      }
      case PropositionalOperator.Equiv: {
        const { firstArgument, secondArgument } = parser.splitExpressionByIndex(mainSymbol.position, expression);
        return factory.createEquivalence(this.convertExpressionToFormula(firstArgument), this.convertExpressionToFormula(secondArgument));
      }
      default: {
        throw new PropositionalError(`Cannot convert expression to formula.\nThe given expression: ${expression}`);
      }
    }
  },

  convertInputsToICExpression(firstVariable: string, secondVariable: string): PropositionalExpression {
    if (!firstVariable.length || !secondVariable.length) return [];
    const input = `(${firstVariable} => (${secondVariable} => ${firstVariable}))`;
    return this.convertStringToExpression(input);
  },
};

export default Object.freeze(converter);

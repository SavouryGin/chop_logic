import { PropositionalOperator } from 'enums';
import { PropositionalError } from 'errors/propositional-error';
import { PropositionalExpression, PropositionalFormula } from 'types';
import factory from './factory';
import parser from './parser';

const converter = {
  convertInputToExpression(input: string): PropositionalExpression {
    const charsArray = parser.getCharsArrayFrom(input);
    const output = parser.joinLogicalSymbolsIn(charsArray);
    return output.map((char, index) => parser.getSymbolFrom(char, index));
  },

  convertExpressionToFormula(expression: PropositionalExpression): PropositionalFormula {
    const mainSymbol = parser.findTheMainOperatorOf(expression);
    const operator = factory.createOperatorFromSymbol(mainSymbol);

    switch (operator) {
      case PropositionalOperator.Var: {
        return factory.createAtom(mainSymbol);
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
      case PropositionalOperator.Not: {
        const argument = expression.slice(2, expression.length - 1);
        return factory.createNegation(this.convertExpressionToFormula(argument));
      }
      default: {
        throw new PropositionalError(`Cannot convert sub-expression to formula.\nThe given sub-expression: ${expression}`);
      }
    }
  },

  convertInputsToICExpression(firstVariable: string, secondVariable: string): PropositionalExpression {
    if (!firstVariable.length || !secondVariable.length) return [];
    const input = `(${firstVariable} => (${secondVariable} => ${firstVariable}))`;
    return this.convertInputToExpression(input);
  },
};

export default Object.freeze(converter);

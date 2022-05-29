import { PropositionalOperator } from 'enums';
import { PropositionalError } from 'errors/propositional-error';
import { PropositionalExpression, PropositionalFormula } from 'types';
import factory from './factory';
import parser from './parser';
import validator from './validator';

const converter = {
  convertStringToExpression(input: string): PropositionalExpression {
    const charsArray = parser.getCharsArray(input);
    const output = parser.joinLogicalSymbols(charsArray);
    return output.map((char, index) => factory.createPropositionalSymbol(char, index));
  },

  convertExpressionToFormula(expression: PropositionalExpression): PropositionalFormula {
    const mainSymbol = parser.findTheMainOperatorOf(expression);
    if (validator.isIncorrectMainSymbol(mainSymbol)) {
      throw new PropositionalError(`Cannot convert expression to formula.\nThe main symbol is incorrect: ${mainSymbol}`);
    }
    const operator = factory.createOperator(mainSymbol);

    if (validator.isBinaryOperator(operator)) {
      const { firstArgument, secondArgument } = parser.splitExpressionByPosition(mainSymbol.position, expression);
      return factory.createBinary(
        operator,
        this.convertExpressionToFormula(firstArgument),
        this.convertExpressionToFormula(secondArgument),
      );
    } else if (operator === PropositionalOperator.Not) {
      const argument = expression.slice(2, expression.length - 1);
      return factory.createNegation(this.convertExpressionToFormula(argument));
    } else {
      return factory.createAtom(mainSymbol);
    }
  },

  convertToICExpression(firstVariable: string, secondVariable: string): PropositionalExpression {
    if (!firstVariable.length || !secondVariable.length) return [];
    const input = `(${firstVariable} => (${secondVariable} => ${firstVariable}))`;
    return this.convertStringToExpression(input);
  },
};

export default Object.freeze(converter);

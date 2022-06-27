import factory from './factory';
import parenthesizer from './parenthesizer';
import parser from './parser';
import validator from './validator';
import { PropositionalError } from 'errors/propositional-error';
import { PropositionalExpression, PropositionalFormula } from 'types';
import { PropositionalOperator } from 'enums';
import { errorsTexts } from 'texts';
import { preparedSymbols } from 'presets/propositions';

const converter = {
  convertStringToExpression(input: string): PropositionalExpression {
    const charsArray = parser.getCharsArray(input);
    const preparedArray = parser.joinLogicalSymbols(charsArray);
    const expression = preparedArray.map((char, index) => factory.createPropositionalSymbol(char, index));
    const withVariables = parenthesizer.parenthesizeVariables(expression);
    const withNegations = parenthesizer.parenthesizeNegations(withVariables);

    return parenthesizer.parenthesizeBinaryOperators(withNegations);
  },

  convertExpressionToFormula(expression: PropositionalExpression): PropositionalFormula {
    const mainSymbol = parser.findMainOperator(expression);
    if (validator.isIncorrectMainSymbol(mainSymbol)) {
      throw new PropositionalError(`Cannot convert this expression to a formula.`, errorsTexts.semanticError);
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
    if (!firstVariable.length || !secondVariable.length) {
      return [];
    }

    const firstExpression = this.convertStringToExpression(firstVariable);
    const secondExpression = this.convertStringToExpression(secondVariable);
    const output = [
      preparedSymbols.openParenthesis,
      ...firstExpression,
      preparedSymbols.implication,
      preparedSymbols.openParenthesis,
      ...secondExpression,
      preparedSymbols.implication,
      ...firstExpression,
      preparedSymbols.closeParenthesis,
      preparedSymbols.closeParenthesis,
    ];

    return parenthesizer.renumberPositions(output);
  },
};

export default Object.freeze(converter);

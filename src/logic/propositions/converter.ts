import { PropositionalOperator } from 'enums';
import { PropositionalError } from 'errors/propositional-error';
import { PropositionalExpression, PropositionalFormula } from 'types';
import factory from './factory';
import parser from './parser';
import validator from './validator';

const converter = {
  convertInputToExpression(input: string): PropositionalExpression {
    const output: PropositionalExpression = [];
    const charsArray = parser.joinLogicalSymbolsIn(parser.getCharsArrayFrom(input));
    let acc = '';

    for (const char of charsArray) {
      if (validator.isNotPropositionalVariable(char)) {
        // Save the previous symbols as a variable
        if (acc.length) {
          output.push(parser.getSymbolFrom(acc));
          acc = '';
        }
        // Push a non-variable symbol to the output array
        output.push(parser.getSymbolFrom(char));
      } else {
        acc += char;
      }
    }
    // Push remaining characters as a variable
    if (acc.length) output.push(parser.getSymbolFrom(acc));

    return output.map((item, index) => {
      return { ...item, index };
    });
  },

  convertExpressionToFormula(expression: PropositionalExpression): PropositionalFormula {
    const mainOperator = parser.findTheMainOperatorOf(expression);
    if (!mainOperator.index || mainOperator.type === 'parentheses') throw new PropositionalError('cannot find the main operator');

    if (mainOperator.type === 'variable') {
      return factory.createAtom(mainOperator);
    }

    const operator = factory.createOperatorFromSymbol(mainOperator);

    switch (operator) {
      case PropositionalOperator.Implies: {
        const { firstArgument, secondArgument } = parser.splitExpressionByIndex(mainOperator.index, expression);
        return factory.createImplication(this.convertExpressionToFormula(firstArgument), this.convertExpressionToFormula(secondArgument));
      }
      case PropositionalOperator.And: {
        const { firstArgument, secondArgument } = parser.splitExpressionByIndex(mainOperator.index, expression);
        return factory.createConjunction(this.convertExpressionToFormula(firstArgument), this.convertExpressionToFormula(secondArgument));
      }
      case PropositionalOperator.Or: {
        const { firstArgument, secondArgument } = parser.splitExpressionByIndex(mainOperator.index, expression);
        return factory.createDisjunction(this.convertExpressionToFormula(firstArgument), this.convertExpressionToFormula(secondArgument));
      }
      case PropositionalOperator.Equiv: {
        const { firstArgument, secondArgument } = parser.splitExpressionByIndex(mainOperator.index, expression);
        return factory.createEquivalence(this.convertExpressionToFormula(firstArgument), this.convertExpressionToFormula(secondArgument));
      }
      case PropositionalOperator.Not: {
        const argument = expression.slice(2, expression.length - 1);
        return factory.createNegation(this.convertExpressionToFormula(argument));
      }
      default: {
        throw new PropositionalError('cannot parse the sub expression of the formula');
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

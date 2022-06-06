import constants from 'assets/const/propositions';
import searcher from './searcher';
import validator from './validator';
import { PropositionalExpression, PropositionalSymbol } from 'types';

const parenthesizer = {
  parenthesizeVariables(expression: PropositionalExpression): PropositionalExpression {
    const output: PropositionalExpression = [];

    for (const symbol of expression) {
      const isParenthesizingNeeded = symbol.type === 'variable' && !validator.isVariableParenthesized(symbol, expression);
      if (isParenthesizingNeeded) {
        output.push(
          constants.openParenthesisSymbol as PropositionalSymbol,
          symbol,
          constants.closeParenthesisSymbol as PropositionalSymbol,
        );
      } else {
        output.push(symbol);
      }
    }

    return this.renumberPositions(output);
  },

  parenthesizeNegations(expression: PropositionalExpression): PropositionalExpression {
    const openParenthesisPositions: number[] = [];
    const closeParenthesisPositions: number[] = [];

    const allNegations = expression.filter((item) => validator.isNegationSymbol(item));

    if (!allNegations.length) {
      return expression;
    }

    for (const negation of allNegations) {
      if (validator.isNegationParenthesized(negation, expression)) {
        continue;
      }
      const nextSymbol = expression[negation.position + 1];

      if (!nextSymbol) {
        continue;
      }
      const closeParenthesis = searcher.findMatchingCloseParenthesis(expression, nextSymbol);

      if (!closeParenthesis) {
        continue;
      }

      openParenthesisPositions.push(negation.position === 0 ? 0 : negation.position - 1);
      closeParenthesisPositions.push(closeParenthesis.position);
    }

    return this.insertParenthesisByPositions(expression, openParenthesisPositions, closeParenthesisPositions);
  },

  parenthesizeBinaryOperators(expression: PropositionalExpression): PropositionalExpression {
    const output: PropositionalExpression = [];
    const closeParenthesisPositions: number[] = [];
    const openParenthesisPositions: number[] = [];

    for (let i = 0; i < expression.length; i++) {
      const symbol = expression[i];
      const isParenthesizingNeeded = validator.isBinarySymbol(symbol) && !validator.isBinaryOperatorParenthesized(symbol, expression);

      if (isParenthesizingNeeded) {
        const nextSymbol = expression[i + 1];
        const previousSymbol = expression[i - 1];
        if (!nextSymbol || !previousSymbol) {
          continue;
        }
        const closeParenthesis = searcher.findMatchingCloseParenthesis(expression, nextSymbol);
        const openParenthesis = searcher.findMatchingOpenParenthesis(expression, previousSymbol);
        if (closeParenthesis && openParenthesis) {
          closeParenthesisPositions.push(closeParenthesis.position);
          openParenthesisPositions.push(openParenthesis.position);
        }

        output.push(symbol);
      } else {
        output.push(symbol);
      }
    }

    return this.insertParenthesisByPositions(output, openParenthesisPositions, closeParenthesisPositions);
  },

  insertParenthesisByPositions(
    expression: PropositionalExpression,
    openPositions: number[] = [],
    closePositions: number[] = [],
  ): PropositionalExpression {
    const output: PropositionalExpression = [];
    for (const symbol of expression) {
      if (closePositions.includes(symbol.position)) {
        output.push(symbol, constants.closeParenthesisSymbol as PropositionalSymbol);
      } else if (openPositions.includes(symbol.position)) {
        output.push(constants.openParenthesisSymbol as PropositionalSymbol, symbol);
      } else {
        output.push(symbol);
      }
    }

    return this.renumberPositions(output);
  },

  renumberPositions(input: PropositionalExpression): PropositionalExpression {
    return input.map((item, index) => {
      return { ...item, position: index };
    });
  },
};

export default Object.freeze(parenthesizer);

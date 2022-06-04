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
    const output: PropositionalExpression = [];
    const closeParenthesisPositions: number[] = [];

    for (let i = 0; i < expression.length; i++) {
      const symbol = expression[i];
      const isParenthesizingNeeded = validator.isNegationSymbol(symbol) && !validator.isNegationParenthesized(symbol, expression);
      if (isParenthesizingNeeded) {
        const nextSymbol = expression[i + 1];
        if (!nextSymbol) {
          continue;
        }
        const closeParenthesis = searcher.findMatchingCloseParenthesis(expression, nextSymbol);
        if (closeParenthesis) {
          closeParenthesisPositions.push(closeParenthesis.position);
        }

        output.push(constants.openParenthesisSymbol as PropositionalSymbol, symbol);
      } else {
        output.push(symbol);
      }
    }

    return this.insertCloseParenthesisAfterPositions(output, closeParenthesisPositions);
  },

  parenthesizeBinaryOperators(expression: PropositionalExpression): PropositionalExpression {
    const output: PropositionalExpression = [];
    const closeParenthesisPositions: number[] = [];

    for (let i = 0; i < expression.length; i++) {
      const symbol = expression[i];
      const isParenthesizingNeeded = validator.isBinarySymbol(symbol) && !validator.isBinaryOperatorParenthesized(symbol, expression);
      console.log('isParenthesizingNeeded', isParenthesizingNeeded);
      if (isParenthesizingNeeded) {
        const nextSymbol = expression[i + 1];
        if (!nextSymbol) {
          continue;
        }
        const closeParenthesis = searcher.findMatchingCloseParenthesis(expression, nextSymbol);
        if (closeParenthesis) {
          closeParenthesisPositions.push(closeParenthesis.position);
        }

        output.push(constants.openParenthesisSymbol as PropositionalSymbol, symbol);
      } else {
        output.push(symbol);
      }
    }

    return this.insertCloseParenthesisAfterPositions(output, closeParenthesisPositions);
  },

  insertCloseParenthesisAfterPositions(expression: PropositionalExpression, positions: number[]): PropositionalExpression {
    const output: PropositionalExpression = [];
    for (const symbol of expression) {
      if (positions.includes(symbol.position)) {
        output.push(symbol, constants.closeParenthesisSymbol as PropositionalSymbol);
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

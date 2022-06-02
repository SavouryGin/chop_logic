import constants from 'assets/const/propositions';
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

  renumberPositions(input: PropositionalExpression): PropositionalExpression {
    return input.map((item, index) => {
      return { ...item, position: index };
    });
  },
};

export default Object.freeze(parenthesizer);

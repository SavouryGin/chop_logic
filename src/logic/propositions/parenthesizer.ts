import constants from 'presets/propositions';
import searcher from './searcher';
import validator from './validator';
import { PropositionalError } from 'errors/propositional-error';
import { PropositionalExpression, PropositionalSymbol } from 'types';
import { errorsTexts } from 'texts';

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
    const allNegations = expression.filter((item) => validator.isNegationSymbol(item)).reverse();
    if (!allNegations.length) {
      return expression;
    }

    let output = [...expression];

    for (const negation of allNegations) {
      try {
        const { openIndex, closeIndex } = this.getNegationParenthesisPositions(negation, output);
        output = this.insertOpenAndCloseParenthesis(output, openIndex, closeIndex);
      } catch (e: unknown) {
        continue;
      }
    }

    return output;
  },

  parenthesizeBinaryOperators(expression: PropositionalExpression): PropositionalExpression {
    const binariesCount = expression.filter((item) => validator.isBinarySymbol(item)).length;
    if (!binariesCount) {
      return expression;
    }

    let output = [...expression];

    for (let i = 0; i < binariesCount; i++) {
      try {
        const allBinaries = output.filter((item) => validator.isBinarySymbol(item));
        const operator = allBinaries[i];
        const { openIndex, closeIndex } = this.getBinaryParenthesisPositions(operator, output);
        output = this.insertOpenAndCloseParenthesis(output, openIndex, closeIndex);
      } catch (e: unknown) {
        continue;
      }
    }

    return output;
  },

  insertOpenAndCloseParenthesis(expression: PropositionalExpression, openPosition: number, closePosition: number): PropositionalExpression {
    const output: PropositionalExpression = [];
    const open = constants.openParenthesisSymbol as PropositionalSymbol;
    const close = constants.closeParenthesisSymbol as PropositionalSymbol;

    for (const symbol of expression) {
      if (symbol.position === openPosition) {
        output.push(open, symbol);
      } else if (symbol.position === closePosition) {
        output.push(symbol, close);
      } else {
        output.push(symbol);
      }
    }

    return this.renumberPositions(output);
  },

  getNegationParenthesisPositions(
    negation: PropositionalSymbol,
    expression: PropositionalExpression,
  ): { openIndex: number; closeIndex: number } {
    if (validator.isNegationParenthesized(negation, expression)) {
      throw new PropositionalError('The given negation expression is already parenthesized.', errorsTexts.parenthesisError);
    }
    const nextSymbol = expression[negation.position + 1];

    if (!nextSymbol) {
      throw new PropositionalError('Cannot find the next symbol after the negation symbol.', errorsTexts.parenthesisError);
    }

    const closeParenthesis = searcher.findMatchingCloseParenthesis(expression, nextSymbol);

    if (!closeParenthesis) {
      throw new PropositionalError('Cannot find the close parenthesis for the negation expression.', errorsTexts.parenthesisError);
    }

    return { openIndex: negation.position === 0 ? 0 : negation.position, closeIndex: closeParenthesis.position };
  },

  getBinaryParenthesisPositions(
    operator: PropositionalSymbol,
    expression: PropositionalExpression,
  ): { openIndex: number; closeIndex: number } {
    if (validator.isBinaryOperatorParenthesized(operator, expression)) {
      throw new PropositionalError('The given binary operator is already parenthesized.', errorsTexts.parenthesisError);
    }

    const previousSymbol = expression[operator.position - 1];
    const nextSymbol = expression[operator.position + 1];
    const openParenthesis = searcher.findMatchingOpenParenthesis(expression, previousSymbol);
    const closeParenthesis = searcher.findMatchingCloseParenthesis(expression, nextSymbol);

    if (!openParenthesis) {
      throw new PropositionalError('Cannot find an open parenthesis for the binary operator.', errorsTexts.parenthesisError);
    }

    if (!closeParenthesis) {
      throw new PropositionalError('Cannot find a close parenthesis for the binary operator.', errorsTexts.parenthesisError);
    }

    return { openIndex: openParenthesis.position, closeIndex: closeParenthesis.position };
  },

  wrapWithParenthesis(input: PropositionalExpression): PropositionalExpression {
    return this.renumberPositions([
      constants.openParenthesisSymbol as PropositionalSymbol,
      ...input,
      constants.closeParenthesisSymbol as PropositionalSymbol,
    ]);
  },

  renumberPositions(input: PropositionalExpression): PropositionalExpression {
    return input.map((item, index) => {
      return { ...item, position: index };
    });
  },
};

export default Object.freeze(parenthesizer);

import { LogicalSymbolRawInput } from 'enums';
import { PropositionalError } from 'errors/propositional-error';
import { PropositionalExpression, PropositionalSymbol } from 'types';

const searcher = {
  findMatchingCloseParenthesis(expression: PropositionalExpression, openParenthesis: PropositionalSymbol): PropositionalSymbol | undefined {
    let nextOpenParenthesisCounter = 0;

    for (const symbol of expression) {
      const isNextParenthesis = symbol.position > openParenthesis.position && symbol.type === 'parentheses';
      const isOpenParenthesisNext = isNextParenthesis && symbol.input === LogicalSymbolRawInput.OpenParenthesis;
      const isCloseParenthesisNext = isNextParenthesis && symbol.input === LogicalSymbolRawInput.CloseParenthesis;
      const isMatchingCloseParenthesis = isCloseParenthesisNext && nextOpenParenthesisCounter === 0;
      const isNotMatchingCloseParenthesis = isCloseParenthesisNext && nextOpenParenthesisCounter > 0;

      if (isOpenParenthesisNext) {
        nextOpenParenthesisCounter++;
      } else if (isMatchingCloseParenthesis) {
        return symbol;
      } else if (isNotMatchingCloseParenthesis) {
        nextOpenParenthesisCounter--;
      } else {
        continue;
      }
    }

    return undefined;
  },

  findMatchingOpenParenthesis(expression: PropositionalExpression, closeParenthesis: PropositionalSymbol): PropositionalSymbol | undefined {
    const previousOpenParenthesisPositions: number[] = [];
    let previousCloseParenthesisPositionsCounter = 0;

    for (const symbol of expression) {
      const isPreviousParenthesis = symbol.position < closeParenthesis.position && symbol.type === 'parentheses';
      const isOpenPreviousParenthesis = isPreviousParenthesis && symbol.input === LogicalSymbolRawInput.OpenParenthesis;
      const isClosePreviousParenthesis = isPreviousParenthesis && symbol.input === LogicalSymbolRawInput.CloseParenthesis;
      if (isOpenPreviousParenthesis) {
        previousOpenParenthesisPositions.push(symbol.position);
      }
      if (isClosePreviousParenthesis) {
        previousCloseParenthesisPositionsCounter++;
      }
    }

    const closesOpenParenthesisPosition =
      previousOpenParenthesisPositions[previousOpenParenthesisPositions.length - 1 - previousCloseParenthesisPositionsCounter];

    return expression.find((symbol) => symbol.position === closesOpenParenthesisPosition);
  },

  findClosestParenthesisIndexes(openIndex: number, array: number[]): number {
    const closestIndex = Math.min(...array.filter((item) => item > openIndex));
    if (Number.isFinite(closestIndex) && Number.isSafeInteger(closestIndex) && closestIndex >= 0) {
      return closestIndex;
    } else {
      throw new PropositionalError(`Cannot find the closest parenthesis index to the index "${openIndex}".`);
    }
  },
};

export default Object.freeze(searcher);

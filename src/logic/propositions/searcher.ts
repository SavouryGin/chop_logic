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

  findClosestParenthesis(openIndex: number, array: number[]): number {
    const closestIndex = Math.min(...array.filter((item) => item > openIndex));
    if (Number.isFinite(closestIndex) && Number.isSafeInteger(closestIndex) && closestIndex >= 0) {
      return closestIndex;
    } else {
      throw new PropositionalError(`Cannot find the closest parenthesis index to the index "${openIndex}".`);
    }
  },
};

export default Object.freeze(searcher);

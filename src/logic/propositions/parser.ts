import { LogicalSymbolRawInput } from 'enums';
import { PropositionalError } from 'errors/propositional-error';
import { PropositionalExpression, PropositionalSymbol } from 'types';

const parser = {
  getCharsArrayFrom(input: string): string[] {
    return input
      .split('')
      .filter((char) => char !== '')
      .map((char) => char.trim());
  },

  joinLogicalSymbolsIn(input: string[]): string[] {
    let acc = '';
    const output: string[] = [];

    for (const char of input) {
      if (['<', '=', '>'].includes(char)) {
        acc += char;
        if (acc === LogicalSymbolRawInput.Implication || acc === LogicalSymbolRawInput.Equivalence) {
          output.push(acc);
          acc = '';
        }
      } else {
        if (!acc.length) output.push(char);
      }
    }
    return output;
  },

  splitExpressionByIndex(
    index: number,
    expression: PropositionalExpression,
  ): { firstArgument: PropositionalExpression; secondArgument: PropositionalExpression } {
    const innerExpression = expression.slice(1, expression.length - 1);
    const delimiterItem = innerExpression.find((item) => item.position === index);
    if (!delimiterItem) throw new PropositionalError('cannot split sub expression into two arguments');
    const splitIndex = innerExpression.indexOf(delimiterItem);
    const firstArgument = innerExpression.slice(0, splitIndex);
    const secondArgument = innerExpression.slice(splitIndex + 1, expression.length - 1);
    return { firstArgument, secondArgument };
  },

  extractSubExpressionsFrom(expression: PropositionalExpression): PropositionalExpression[] {
    const result: PropositionalExpression[] = [];
    const openIndexes = this.getAllIndexesOfTheSymbol(expression, '(').reverse();
    let closeIndexes = this.getAllIndexesOfTheSymbol(expression, ')');

    if (openIndexes.length !== closeIndexes.length) {
      throw new PropositionalError('the number of open parenthesis does not match with the number of close parenthesis');
    }

    for (const openIndex of openIndexes) {
      const closeIndex = this.findClosestParenthesis(openIndex, closeIndexes);
      const subExpression = expression.slice(openIndex, closeIndex + 1);
      result.push(subExpression);
      closeIndexes = closeIndexes.filter((item) => item !== closeIndex);
    }

    return result;
  },

  findTheMainOperatorOf(expression: PropositionalExpression): PropositionalSymbol {
    const subExpressions = this.extractSubExpressionsFrom(expression);
    if (subExpressions.length === 1) {
      return subExpressions[0][1];
    }
    const subIndexes = subExpressions.map((subExpression) => subExpression.map((symbol) => symbol.position));
    let mainIndexes = expression.map((symbol) => symbol.position).slice(1, expression.length - 2);

    for (const item of subIndexes.slice(0, subIndexes.length - 1)) {
      mainIndexes = mainIndexes.filter((index) => !item.includes(index));
    }

    // if (mainIndexes.length !== 1 || typeof mainIndexes[0] !== 'number') {
    //   throw new PropositionalError('incorrect index of the main operator in the sub expression');
    // }

    const mainOperator = expression.find((item) => item.position === mainIndexes[0]);

    if (!mainOperator) {
      throw new PropositionalError('cannot find the main operator of the sub expression');
    }

    return mainOperator;
  },

  findClosestParenthesis(openIndex: number, array: number[]) {
    return Math.min(...array.filter((item) => item > openIndex));
  },

  getAllIndexesOfTheSymbol(array: PropositionalExpression, symbol: string) {
    const indexes = [];
    for (let i = 0; i < array.length; i++) {
      if (array[i].input === symbol) indexes.push(i);
    }
    return indexes;
  },
};

export default Object.freeze(parser);

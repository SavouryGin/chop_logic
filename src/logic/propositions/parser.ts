import { LogicalSymbolRawInput, PropositionalOperator } from 'enums';
import { PropositionalError } from 'errors/propositional-error';
import { PropositionalExpression, PropositionalFormula, PropositionalSymbol } from 'types';
import constants from './constants';
import factory from './factory';
import validator from './validator';

const parser = {
  convertInputToExpression(input: string): PropositionalExpression {
    const output: PropositionalSymbol[] = [];
    const charsArray = this.joinMultiCharsOperators(this.convertStringToCharsArray(input));
    let acc = '';

    for (const char of charsArray) {
      if (validator.isNotPropositionalVariable(char)) {
        // Save the previous symbols as a variable
        if (acc.length) {
          output.push(this.convertInputToSymbol(acc));
          acc = '';
        }
        // Push a non-variable symbol to the output array
        output.push(this.convertInputToSymbol(char));
      } else {
        acc += char;
      }
    }
    // Push remaining characters as a variable
    if (acc.length) output.push(this.convertInputToSymbol(acc));

    return output.map((item, index) => {
      return { ...item, index };
    });
  },

  convertExpressionToFormula(expression: PropositionalExpression): PropositionalFormula {
    const mainOperator = this.findTheMainOperatorOf(expression);
    if (!mainOperator.index || mainOperator.type === 'parentheses') throw new PropositionalError('cannot find the main operator');

    if (mainOperator.type === 'variable') {
      return factory.createAtom(mainOperator);
    }

    const operator = factory.createOperatorFromSymbol(mainOperator);

    switch (operator) {
      case PropositionalOperator.Implies: {
        const { firstArgument, secondArgument } = this.splitExpressionByIndex(mainOperator.index, expression);
        return factory.createImplication(this.convertExpressionToFormula(firstArgument), this.convertExpressionToFormula(secondArgument));
      }
      case PropositionalOperator.And: {
        const { firstArgument, secondArgument } = this.splitExpressionByIndex(mainOperator.index, expression);
        return factory.createConjunction(this.convertExpressionToFormula(firstArgument), this.convertExpressionToFormula(secondArgument));
      }
      case PropositionalOperator.Or: {
        const { firstArgument, secondArgument } = this.splitExpressionByIndex(mainOperator.index, expression);
        return factory.createDisjunction(this.convertExpressionToFormula(firstArgument), this.convertExpressionToFormula(secondArgument));
      }
      case PropositionalOperator.Equiv: {
        const { firstArgument, secondArgument } = this.splitExpressionByIndex(mainOperator.index, expression);
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

  createICExpression(firstVariable: string, secondVariable: string): PropositionalExpression {
    if (!firstVariable.length || !secondVariable.length) return [];
    const input = `${firstVariable} => (${secondVariable} => ${firstVariable})`;
    return this.convertInputToExpression(input);
  },

  convertStringToCharsArray(input: string): string[] {
    return input
      .split('')
      .filter((char) => char !== '')
      .map((char) => char.trim());
  },

  convertInputToSymbol(char: string): PropositionalSymbol {
    if (constants.logicalOperators.includes(char as LogicalSymbolRawInput)) {
      return {
        input: char,
        representation: factory.createSymbolFromRawInput(char),
        type: 'operator',
      };
    } else if (constants.parentheses.includes(char)) {
      return {
        input: char,
        representation: char,
        type: 'parentheses',
      };
    } else {
      return {
        input: char,
        representation: char.toLocaleUpperCase(),
        type: 'variable',
      };
    }
  },

  joinMultiCharsOperators(input: string[]): string[] {
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
    const delimiterItem = innerExpression.find((item) => item.index === index);
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
    const subIndexes = subExpressions.map((subExpression) => subExpression.map((symbol) => symbol.index));
    let mainIndexes = expression.map((symbol) => symbol.index).slice(1, expression.length - 2);

    for (const item of subIndexes.slice(0, subIndexes.length - 1)) {
      mainIndexes = mainIndexes.filter((index) => !item.includes(index));
    }

    // if (mainIndexes.length !== 1 || typeof mainIndexes[0] !== 'number') {
    //   throw new PropositionalError('incorrect index of the main operator in the sub expression');
    // }

    const mainOperator = expression.find((item) => item.index === mainIndexes[0]);

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

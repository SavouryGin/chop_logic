import { LogicalSymbolRawInput, PropositionalOperator } from 'enums';
import { PropositionalError } from 'errors/propositional-error';
import { PropositionalExpression, PropositionalFormula, PropositionalSymbol } from 'types';
import factory from './factory';

abstract class PropositionsConverter {
  public static convertExpressionToFormula(expression: PropositionalExpression): PropositionalFormula {
    const mainOperator = this.findTheMainOperatorOf(expression);
    if (!mainOperator.index || mainOperator.type === 'parentheses') throw new PropositionalError('cannot find the main operator');

    if (mainOperator.type === 'variable') {
      return factory.createAtom(mainOperator);
    }

    const operator = this.getPropositionalOperatorType(mainOperator);

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
  }

  public static getPropositionalOperatorType(symbol: PropositionalSymbol): PropositionalOperator {
    switch (symbol.input) {
      case LogicalSymbolRawInput.Negation: {
        return PropositionalOperator.Not;
      }
      case LogicalSymbolRawInput.Conjunction: {
        return PropositionalOperator.And;
      }
      case LogicalSymbolRawInput.Disjunction: {
        return PropositionalOperator.Or;
      }
      case LogicalSymbolRawInput.Implication: {
        return PropositionalOperator.Implies;
      }
      case LogicalSymbolRawInput.Equivalence: {
        return PropositionalOperator.Equiv;
      }
      default: {
        return PropositionalOperator.Var;
      }
    }
  }

  public static splitExpressionByIndex(
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
  }

  public static extractSubExpressionsFrom(expression: PropositionalExpression): PropositionalExpression[] {
    const result: PropositionalExpression[] = [];
    const openIndexes = PropositionsConverter.getAllIndexesOfTheSymbol(expression, '(').reverse();
    let closeIndexes = PropositionsConverter.getAllIndexesOfTheSymbol(expression, ')');

    if (openIndexes.length !== closeIndexes.length) {
      throw new PropositionalError('the number of open parenthesis does not match with the number of close parenthesis');
    }

    for (const openIndex of openIndexes) {
      const closeIndex = PropositionsConverter.findClosestParenthesis(openIndex, closeIndexes);
      const subExpression = expression.slice(openIndex, closeIndex + 1);
      result.push(subExpression);
      closeIndexes = closeIndexes.filter((item) => item !== closeIndex);
    }

    return result;
  }

  public static findTheMainOperatorOf(expression: PropositionalExpression): PropositionalSymbol {
    const subExpressions = PropositionsConverter.extractSubExpressionsFrom(expression);
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
  }

  public static findClosestParenthesis(openIndex: number, array: number[]) {
    return Math.min(...array.filter((item) => item > openIndex));
  }

  public static getAllIndexesOfTheSymbol(array: PropositionalExpression, symbol: string) {
    const indexes = [];
    for (let i = 0; i < array.length; i++) {
      if (array[i].input === symbol) indexes.push(i);
    }
    return indexes;
  }

  public static addPropositionalAtomsTo(input: PropositionalExpression): Array<PropositionalSymbol | PropositionalFormula> {
    return input.map((item) => (item.type === 'variable' ? factory.createAtom(item) : item));
  }
}

export default PropositionsConverter;

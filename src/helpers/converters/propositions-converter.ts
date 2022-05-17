import { PropositionalOperator } from 'enums';
import { IncorrectPropositionalFormula } from 'errors/incorrect-propositional-formula';
import PropositionsParser from 'helpers/parsers/propositions-parser';
import { PropositionalExpression, PropositionalFormula, PropositionalSymbol } from 'types';

abstract class PropositionsConverter {
  public static convertExpressionToFormula(expression: PropositionalExpression): PropositionalFormula {
    const mainOperator = this.findTheMainOperatorOf(expression);
    if (!mainOperator.index) throw IncorrectPropositionalFormula;

    if (mainOperator.type === 'variable') {
      return this.createPropositionalAtomFrom(mainOperator);
    } else {
      const split = this.splitExpressionByIndex(mainOperator.index, expression);
      console.log('split', split);
    }

    return {
      operator: PropositionalOperator.Var,
      values: 'P',
    };
  }

  public static splitExpressionByIndex(
    index: number,
    expression: PropositionalExpression,
  ): { firstArgument: PropositionalExpression; secondArgument: PropositionalExpression } {
    const innerExpression = expression.slice(1, expression.length - 1);
    const firstArgument = innerExpression.slice(0, index - 1);
    const secondArgument = innerExpression.slice(index, expression.length - 1);
    return { firstArgument, secondArgument };
  }

  public static extractSubExpressionsFrom(expression: PropositionalExpression): PropositionalExpression[] {
    const result: PropositionalExpression[] = [];
    const openIndexes = PropositionsConverter.getAllIndexesOfTheSymbol(expression, '(').reverse();
    let closeIndexes = PropositionsConverter.getAllIndexesOfTheSymbol(expression, ')');

    if (openIndexes.length !== closeIndexes.length) {
      throw IncorrectPropositionalFormula;
    }

    for (const openIndex of openIndexes) {
      const closeIndex = PropositionsConverter.findClosestParenthesis(openIndex, closeIndexes);
      const subExpression = expression.slice(openIndex, closeIndex + 1);
      result.push(subExpression);
      closeIndexes = closeIndexes.filter((item) => item !== closeIndex);
    }
    console.log('subExpressions', result);
    return result;
  }

  public static findTheMainOperatorOf(expression: PropositionalExpression): PropositionalSymbol {
    const subExpressions = PropositionsConverter.extractSubExpressionsFrom(expression);
    const subIndexes = subExpressions.map((subExpression) => subExpression.map((symbol) => symbol.index));
    let mainIndexes = expression.map((symbol) => symbol.index).slice(1, expression.length - 2);

    for (const item of subIndexes.slice(0, subIndexes.length - 1)) {
      mainIndexes = mainIndexes.filter((index) => !item.includes(index));
    }

    if (mainIndexes.length !== 1 || typeof mainIndexes[0] !== 'number') {
      throw IncorrectPropositionalFormula;
    }

    const mainOperator = expression.find((item) => item.index === mainIndexes[0]);

    if (!mainOperator) {
      throw IncorrectPropositionalFormula;
    }

    console.log('mainOperator', mainOperator);
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
    return input.map((item) => (item.type === 'variable' ? PropositionsConverter.createPropositionalAtomFrom(item) : item));
  }

  public static createPropositionalAtomFrom(symbol: PropositionalSymbol): PropositionalFormula {
    return {
      operator: PropositionalOperator.Var,
      values: symbol.representation || symbol.input.toLocaleUpperCase(),
    };
  }

  public static createImplication(firstArgument: PropositionalFormula, secondArgument: PropositionalFormula): PropositionalFormula {
    return {
      operator: PropositionalOperator.Implies,
      values: [firstArgument, secondArgument],
    };
  }

  public static createConjunction(firstArgument: PropositionalFormula, secondArgument: PropositionalFormula): PropositionalFormula {
    return {
      operator: PropositionalOperator.And,
      values: [firstArgument, secondArgument],
    };
  }

  public static createDisjunction(firstArgument: PropositionalFormula, secondArgument: PropositionalFormula): PropositionalFormula {
    return {
      operator: PropositionalOperator.Or,
      values: [firstArgument, secondArgument],
    };
  }

  public static createEquivalence(firstArgument: PropositionalFormula, secondArgument: PropositionalFormula): PropositionalFormula {
    return {
      operator: PropositionalOperator.Equiv,
      values: [firstArgument, secondArgument],
    };
  }

  public static createNegation(argument: PropositionalFormula): PropositionalFormula {
    return {
      operator: PropositionalOperator.Not,
      values: [argument],
    };
  }

  public static isAtomicExpression(expression: PropositionalExpression) {
    for (const symbol of expression) {
      if (PropositionsParser.logicalOperators.includes(symbol.input)) return false;
    }
    return true;
  }

  public static isPropositionalAtom(input: PropositionalFormula): boolean {
    return input.operator === PropositionalOperator.Var && typeof input.values === 'string';
  }
}

export default PropositionsConverter;

import { PropositionalOperator } from 'enums';
import { IncorrectPropositionalFormula } from 'errors/incorrect-propositional-formula';
import PropositionsParser from 'helpers/parsers/propositions-parser';
import { PropositionalExpression, PropositionalFormula, PropositionalSymbol } from 'types';

abstract class PropositionsConverter {
  public static convertExpressionToFormula(input: PropositionalExpression): PropositionalFormula {
    const subExpressions = PropositionsConverter.extractSubExpressions(input);
    console.log(subExpressions);

    return {
      operator: PropositionalOperator.Var,
      values: 'P',
    };
  }

  public static extractSubExpressions(expression: PropositionalExpression): PropositionalExpression[] {
    const result: PropositionalExpression[] = [];
    const openIndexes = PropositionsConverter.getAllIndexesOfTheSymbol(expression, '(').reverse();
    let closeIndexes = PropositionsConverter.getAllIndexesOfTheSymbol(expression, ')');

    for (const openIndex of openIndexes) {
      const closeIndex = PropositionsConverter.findClosestParenthesis(openIndex, closeIndexes);
      const subExpression = expression.slice(openIndex + 1, closeIndex);
      result.push(subExpression);
      closeIndexes = closeIndexes.filter((item) => item !== closeIndex);
    }

    return result;
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

  public static addPropositionalAtomsToExpression(input: PropositionalExpression): Array<PropositionalSymbol | PropositionalFormula> {
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

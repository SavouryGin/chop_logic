import { PropositionalOperator } from 'enums';
import { IncorrectPropositionalFormula } from 'errors/incorrect-propositional-formula';
import PropositionsParser from 'helpers/parsers/propositions-parser';
import { PropositionalExpression, PropositionalFormula, PropositionalSymbol } from 'types';

abstract class PropositionsConverter {
  public static convertExpressionToFormula(input: PropositionalExpression): PropositionalFormula {
    PropositionsConverter.extractSubExpressions(input);

    return {
      operator: PropositionalOperator.Var,
      values: 'P',
    };
  }

  public static extractSubExpressions(expression: PropositionalExpression): PropositionalExpression[] {
    const result = [];
    console.log('expression', expression);
    const openParenthesisIndexes = PropositionsConverter.getAllIndexesOfTheSymbol(expression, '(');
    const closeParenthesisIndexes = PropositionsConverter.getAllIndexesOfTheSymbol(expression, ')');

    for (let i = 0; i < openParenthesisIndexes.length; i++) {
      const openIndex = openParenthesisIndexes[i];
      const closeIndex = closeParenthesisIndexes[closeParenthesisIndexes.length - i];
      const subExpression = expression.slice(openIndex, closeIndex);
      result.push(subExpression);
    }

    console.log('result', result);
    return result.reverse();
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

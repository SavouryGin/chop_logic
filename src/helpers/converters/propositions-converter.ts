import { PropositionalOperator } from 'enums';
import { IncorrectPropositionalFormula } from 'errors/incorrect-propositional-formula';
import { PropositionalExpression, PropositionalFormula, PropositionalSymbol } from 'types';

abstract class PropositionsConverter {
  public static convertExpressionToFormula(input: PropositionalExpression): PropositionalFormula {
    console.log(PropositionsConverter.addPropositionalAtomsToExpression(input));
    if (input[0].input !== '(') throw IncorrectPropositionalFormula;

    return {
      operator: PropositionalOperator.Var,
      values: 'P',
    };
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

  public static isPropositionalAtom(input: PropositionalFormula): boolean {
    return input.operator === PropositionalOperator.Var && typeof input.values === 'string';
  }
}

export default PropositionsConverter;

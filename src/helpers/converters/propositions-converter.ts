import { PropositionalOperator } from 'enums';
import { PropositionalExpression, PropositionalFormula } from 'types';

abstract class PropositionsConverter {
  public static convertExpressionToFormula(input: PropositionalExpression): PropositionalFormula {
    console.log(input);

    return {
      operator: PropositionalOperator.Var,
      values: 'P',
    };
  }
}

export default PropositionsConverter;

import { LogicalSymbolRawInput, PropositionalOperator } from 'enums';
import { PropositionalSymbol } from 'types';
import constants from 'assets/const/propositions';

const validator = {
  isNotVariable(char: string): boolean {
    return constants.logicalOperators.includes(char as LogicalSymbolRawInput) || constants.parentheses.includes(char);
  },

  isIncorrectMainSymbol(symbol: PropositionalSymbol): boolean {
    if (symbol.type === 'variable' || symbol.type === 'operator') {
      return false;
    }
    return true;
  },

  isBinaryOperator(operator: PropositionalOperator): boolean {
    if (operator === PropositionalOperator.Var || operator === PropositionalOperator.Not) {
      return false;
    }
    return true;
  },
};

export default Object.freeze(validator);

import constants from 'assets/const/propositions';
import { LogicalSymbolRawInput, PropositionalOperator } from 'enums';
import { PropositionalError } from 'errors/propositional-error';
import { PropositionalSymbol } from 'types';

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

  checkNumberOfParenthesis(openIndexes: number[], closeIndexes: number[]): void {
    if (openIndexes.length !== closeIndexes.length) {
      throw new PropositionalError(
        'Cannot extract sub expressions: the number of open parenthesis does not match with the number of close parenthesis.',
      );
    }
  },
};

export default Object.freeze(validator);

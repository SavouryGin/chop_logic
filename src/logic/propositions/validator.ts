import constants from 'assets/const/propositions';
import { LogicalSymbolRawInput, PropositionalOperator } from 'enums';
import { PropositionalError } from 'errors/propositional-error';
import { PropositionalExpression, PropositionalSymbol } from 'types';

const validator = {
  isNotVariable(char: string): boolean {
    return (
      constants.logicalOperators.includes(char as LogicalSymbolRawInput) || constants.parentheses.includes(char as LogicalSymbolRawInput)
    );
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

  isNegationSymbol(symbol: PropositionalSymbol): boolean {
    if (symbol.type === 'operator' && symbol.input === LogicalSymbolRawInput.Negation) {
      return true;
    }

    return false;
  },

  checkNumberOfParenthesis(openIndexes: number[], closeIndexes: number[]): void {
    if (openIndexes.length !== closeIndexes.length) {
      throw new PropositionalError(
        'Cannot extract sub expressions: the number of open parenthesis does not match with the number of close parenthesis.',
      );
    }
  },

  isVariableParenthesized(variable: PropositionalSymbol, expression: PropositionalExpression): boolean {
    const leftSymbol = expression.find((symbol) => symbol.position === variable.position - 1);
    const rightSymbol = expression.find((symbol) => symbol.position === variable.position + 1);

    if (
      leftSymbol?.type === 'parentheses' &&
      rightSymbol?.type === 'parentheses' &&
      leftSymbol?.input === LogicalSymbolRawInput.OpenParenthesis &&
      rightSymbol?.input === LogicalSymbolRawInput.CloseParenthesis
    ) {
      return true;
    }

    return false;
  },

  isNegationParenthesized(operator: PropositionalSymbol, expression: PropositionalExpression): boolean {
    const leftSymbol = expression.find((symbol) => symbol.position === operator.position - 1);
    if (leftSymbol?.type !== 'parentheses' || leftSymbol?.input !== LogicalSymbolRawInput.OpenParenthesis) {
      return false;
    }
    const rightSymbol = this.findMatchingCloseParenthesis(expression, leftSymbol);

    if (rightSymbol?.type === 'parentheses' && rightSymbol.input === LogicalSymbolRawInput.CloseParenthesis) {
      return true;
    }

    return false;
  },

  findMatchingCloseParenthesis(expression: PropositionalExpression, openParenthesis: PropositionalSymbol): PropositionalSymbol | undefined {
    let nextOpenParenthesisCounter = 0;

    for (const symbol of expression) {
      const isNextParenthesis = symbol.position > openParenthesis.position && symbol.type === 'parentheses';
      const isOpenParenthesisNext = isNextParenthesis && symbol.input === LogicalSymbolRawInput.OpenParenthesis;
      const isCloseParenthesisNext = isNextParenthesis && symbol.input === LogicalSymbolRawInput.CloseParenthesis;
      const isMatchingCloseParenthesis = isCloseParenthesisNext && nextOpenParenthesisCounter === 0;
      const isNotMatchingCloseParenthesis = isCloseParenthesisNext && nextOpenParenthesisCounter > 0;

      if (isOpenParenthesisNext) {
        nextOpenParenthesisCounter++;
      } else if (isMatchingCloseParenthesis) {
        return symbol;
      } else if (isNotMatchingCloseParenthesis) {
        nextOpenParenthesisCounter--;
      } else {
        continue;
      }
    }

    return undefined;
  },
};

export default Object.freeze(validator);

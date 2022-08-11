import converter from './converter';
import { DirectProofsTableItem } from 'store/propositions/direct-proofs/interfaces';
import { PropositionalExpression, PropositionalSymbol } from 'types';

const replacer = {
  replacePropositionalVariableInTableItems(
    data: DirectProofsTableItem[],
    newVariable: string,
    oldVariable: string,
  ): DirectProofsTableItem[] {
    return data.map((item) => this.replacePropositionalVariableInItem(item, newVariable, oldVariable));
  },

  replacePropositionalVariableInItem(item: DirectProofsTableItem, newVariable: string, oldVariable: string): DirectProofsTableItem {
    const newExpression = this.replaceVariableInPropositionalExpression(item.expression, newVariable, oldVariable);
    const newFormula = converter.convertExpressionToFormula(newExpression);
    const newFriendlyExpression = converter.convertFormulaToUserFriendlyExpression(newFormula);

    return {
      ...item,
      rawInput: this.replaceVariableInRawInput(item.rawInput, newVariable, oldVariable),
      expression: newExpression,
      formula: newFormula,
      friendlyExpression: newFriendlyExpression,
    };
  },

  replaceVariableInRawInput(input: string, newVariable: string, oldVariable: string): string {
    return input.replaceAll(oldVariable, newVariable);
  },

  replaceVariableInPropositionalExpression(
    input: PropositionalExpression,
    newVariable: string,
    oldVariable: string,
  ): PropositionalExpression {
    return input.map((symbol) => this.replaceVariableInPropositionalSymbol(symbol, newVariable, oldVariable));
  },

  replaceVariableInPropositionalSymbol(symbol: PropositionalSymbol, newVariable: string, oldVariable: string): PropositionalSymbol {
    if (symbol.type !== 'variable') {
      return symbol;
    }

    if (symbol.input.toUpperCase() !== oldVariable.toUpperCase()) {
      return symbol;
    }

    return {
      ...symbol,
      input: newVariable,
      representation: newVariable.toUpperCase(),
    };
  },
};

export default Object.freeze(replacer);

import converter from './converter';
import { LogicalSymbolHexCode, PropositionalOperator } from 'enums';
import { PropositionalFormula, TableColumnProps } from 'types';

const truthTableGenerator = {
  generateColumnsFromFormula: function (formula: PropositionalFormula): TableColumnProps[] {
    const list: TableColumnProps[] = [];

    if (formula.operator === PropositionalOperator.Var) {
      list.push(this.createVariableColumn(formula.values as string));
    }

    switch (formula.operator) {
      case PropositionalOperator.And: {
        const firstValue = formula.values[0] as PropositionalFormula;
        const secondValue = formula.values[1] as PropositionalFormula;
        list.push(this.createAndColumn(firstValue, secondValue));
        list.push(...this.generateColumnsFromFormula(firstValue));
        list.push(...this.generateColumnsFromFormula(secondValue));
      }
    }

    return list;
  },

  createAndColumn: (firstOperand: PropositionalFormula, secondOperand: PropositionalFormula): TableColumnProps => {
    const firstExpression = converter.convertFormulaToUserFriendlyExpression(firstOperand);
    const secondExpression = converter.convertFormulaToUserFriendlyExpression(secondOperand);
    const firstString = converter.convertUserFriendlyExpressionToString(firstExpression);
    const secondString = converter.convertUserFriendlyExpressionToString(secondExpression);

    const title = `${firstString} ${LogicalSymbolHexCode.Conjunction} ${secondString}`;

    return {
      field: title,
      title: {
        en: title,
        ru: title,
      },
    };
  },

  createVariableColumn: (value: string): TableColumnProps => {
    const titleValue = value.toUpperCase();

    return {
      field: value,
      title: {
        en: titleValue,
        ru: titleValue,
      },
    };
  },
};

export default truthTableGenerator;

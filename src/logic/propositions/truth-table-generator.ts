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
        const firstOperand = formula.values[0] as PropositionalFormula;
        const secondOperand = formula.values[1] as PropositionalFormula;
        list.push(this.createBinaryColumn({ firstOperand, secondOperand, operator: LogicalSymbolHexCode.Conjunction }));
        list.push(...this.generateColumnsFromFormula(firstOperand));
        list.push(...this.generateColumnsFromFormula(secondOperand));
        break;
      }

      case PropositionalOperator.Implies: {
        const firstOperand = formula.values[0] as PropositionalFormula;
        const secondOperand = formula.values[1] as PropositionalFormula;
        list.push(this.createBinaryColumn({ firstOperand, secondOperand, operator: LogicalSymbolHexCode.Implication }));
        list.push(...this.generateColumnsFromFormula(firstOperand));
        list.push(...this.generateColumnsFromFormula(secondOperand));
        break;
      }

      case PropositionalOperator.Equiv: {
        const firstOperand = formula.values[0] as PropositionalFormula;
        const secondOperand = formula.values[1] as PropositionalFormula;
        list.push(this.createBinaryColumn({ firstOperand, secondOperand, operator: LogicalSymbolHexCode.Equivalence }));
        list.push(...this.generateColumnsFromFormula(firstOperand));
        list.push(...this.generateColumnsFromFormula(secondOperand));
        break;
      }

      case PropositionalOperator.Or: {
        const firstOperand = formula.values[0] as PropositionalFormula;
        const secondOperand = formula.values[1] as PropositionalFormula;
        list.push(this.createBinaryColumn({ firstOperand, secondOperand, operator: LogicalSymbolHexCode.Disjunction }));
        list.push(...this.generateColumnsFromFormula(firstOperand));
        list.push(...this.generateColumnsFromFormula(secondOperand));
        break;
      }

      case PropositionalOperator.Not: {
        const firstOperand = formula.values[0] as PropositionalFormula;
        list.push(this.createNotColumn(firstOperand));
        list.push(...this.generateColumnsFromFormula(firstOperand));
        break;
      }
    }

    return list;
  },

  createBinaryColumn: ({
    firstOperand,
    secondOperand,
    operator,
  }: {
    firstOperand: PropositionalFormula;
    secondOperand: PropositionalFormula;
    operator: LogicalSymbolHexCode;
  }): TableColumnProps => {
    const firstExpression = converter.convertFormulaToUserFriendlyExpression(firstOperand);
    const secondExpression = converter.convertFormulaToUserFriendlyExpression(secondOperand);
    const firstString = converter.convertUserFriendlyExpressionToString(firstExpression);
    const secondString = converter.convertUserFriendlyExpressionToString(secondExpression);

    const title = `${firstString} ${operator} ${secondString}`;

    return {
      field: title,
      title: {
        en: title,
        ru: title,
      },
    };
  },

  createNotColumn: (value: PropositionalFormula): TableColumnProps => {
    const expression = converter.convertFormulaToUserFriendlyExpression(value);
    const string = converter.convertUserFriendlyExpressionToString(expression);
    const title = `${LogicalSymbolHexCode.Negation} ${string}`;

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

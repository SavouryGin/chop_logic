import converter from './converter';
import { LogicalSymbolHexCode, PropositionalOperator } from 'enums';
import { PropositionalFormula } from 'types';
import { TruthTableColumn } from 'store/propositions/truth-tables/interfaces';

const truthTableGenerator = {
  generateColumnsFromFormula: function (formula: PropositionalFormula, depth = 0): TruthTableColumn[] {
    const list: TruthTableColumn[] = [];

    switch (formula.operator) {
      case PropositionalOperator.Var: {
        list.push(this.createVariableColumn(formula.values as string, depth));
        break;
      }

      case PropositionalOperator.And: {
        const firstOperand = formula.values[0] as PropositionalFormula;
        const secondOperand = formula.values[1] as PropositionalFormula;
        list.push(this.createBinaryColumn({ firstOperand, secondOperand, operator: LogicalSymbolHexCode.Conjunction, depth }));
        list.push(...this.generateColumnsFromFormula(firstOperand, depth + 1));
        list.push(...this.generateColumnsFromFormula(secondOperand, depth + 1));
        break;
      }

      case PropositionalOperator.Implies: {
        const firstOperand = formula.values[0] as PropositionalFormula;
        const secondOperand = formula.values[1] as PropositionalFormula;
        list.push(this.createBinaryColumn({ firstOperand, secondOperand, operator: LogicalSymbolHexCode.Implication, depth }));
        list.push(...this.generateColumnsFromFormula(firstOperand, depth + 1));
        list.push(...this.generateColumnsFromFormula(secondOperand, depth + 1));
        break;
      }

      case PropositionalOperator.Equiv: {
        const firstOperand = formula.values[0] as PropositionalFormula;
        const secondOperand = formula.values[1] as PropositionalFormula;
        list.push(this.createBinaryColumn({ firstOperand, secondOperand, operator: LogicalSymbolHexCode.Equivalence, depth }));
        list.push(...this.generateColumnsFromFormula(firstOperand, depth + 1));
        list.push(...this.generateColumnsFromFormula(secondOperand, depth + 1));
        break;
      }

      case PropositionalOperator.Or: {
        const firstOperand = formula.values[0] as PropositionalFormula;
        const secondOperand = formula.values[1] as PropositionalFormula;
        list.push(this.createBinaryColumn({ firstOperand, secondOperand, operator: LogicalSymbolHexCode.Disjunction, depth }));
        list.push(...this.generateColumnsFromFormula(firstOperand, depth + 1));
        list.push(...this.generateColumnsFromFormula(secondOperand, depth + 1));
        break;
      }

      case PropositionalOperator.Not: {
        const firstOperand = formula.values[0] as PropositionalFormula;
        list.push(this.createNotColumn(firstOperand, depth));
        list.push(...this.generateColumnsFromFormula(firstOperand, depth + 1));
        break;
      }
    }

    return list.sort((a, b) => b.depth - a.depth);
  },

  createBinaryColumn: ({
    firstOperand,
    secondOperand,
    operator,
    depth,
  }: {
    firstOperand: PropositionalFormula;
    secondOperand: PropositionalFormula;
    operator: LogicalSymbolHexCode;
    depth: number;
  }): TruthTableColumn => {
    const firstExpression = converter.convertFormulaToUserFriendlyExpression(firstOperand);
    const secondExpression = converter.convertFormulaToUserFriendlyExpression(secondOperand);
    const firstString = converter.convertUserFriendlyExpressionToString(firstExpression);
    const secondString = converter.convertUserFriendlyExpressionToString(secondExpression);

    const title = `${firstString} ${operator} ${secondString}`;

    return {
      field: title,
      depth,
      title: {
        en: title,
        ru: title,
      },
    };
  },

  createNotColumn: (value: PropositionalFormula, depth: number): TruthTableColumn => {
    const expression = converter.convertFormulaToUserFriendlyExpression(value);
    const string = converter.convertUserFriendlyExpressionToString(expression);
    const title = `${LogicalSymbolHexCode.Negation} ${string}`;

    return {
      field: title,
      depth,
      title: {
        en: title,
        ru: title,
      },
    };
  },

  createVariableColumn: (value: string, depth: number): TruthTableColumn => {
    const titleValue = value.toUpperCase();

    return {
      field: value,
      depth,
      title: {
        en: titleValue,
        ru: titleValue,
      },
    };
  },
};

export default truthTableGenerator;

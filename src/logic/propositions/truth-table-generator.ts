import converter from './converter';
import { LogicalSymbolHexCode, PropositionalOperator } from 'enums';
import { PropositionalFormula } from 'types';
import { TruthTableColumn } from 'store/propositions/truth-tables/interfaces';

const truthTableGenerator = {
  generateColumnsFromFormula(formula: PropositionalFormula, depth = 0): TruthTableColumn[] {
    const list: TruthTableColumn[] = [];

    switch (formula.operator) {
      case PropositionalOperator.Var: {
        list.push(this.createVariableColumn(formula.values as string, depth));
        break;
      }

      case PropositionalOperator.And: {
        const firstOperand = formula.values[0] as PropositionalFormula;
        const secondOperand = formula.values[1] as PropositionalFormula;
        list.push(
          this.createBinaryColumn({
            firstOperand,
            secondOperand,
            operator: PropositionalOperator.And,
            symbol: LogicalSymbolHexCode.Conjunction,
            depth,
          }),
        );
        list.push(...this.generateColumnsFromFormula(firstOperand, depth + 1));
        list.push(...this.generateColumnsFromFormula(secondOperand, depth + 1));
        break;
      }

      case PropositionalOperator.Implies: {
        const firstOperand = formula.values[0] as PropositionalFormula;
        const secondOperand = formula.values[1] as PropositionalFormula;
        list.push(
          this.createBinaryColumn({
            firstOperand,
            secondOperand,
            operator: PropositionalOperator.Implies,
            symbol: LogicalSymbolHexCode.Implication,
            depth,
          }),
        );
        list.push(...this.generateColumnsFromFormula(firstOperand, depth + 1));
        list.push(...this.generateColumnsFromFormula(secondOperand, depth + 1));
        break;
      }

      case PropositionalOperator.Equiv: {
        const firstOperand = formula.values[0] as PropositionalFormula;
        const secondOperand = formula.values[1] as PropositionalFormula;
        list.push(
          this.createBinaryColumn({
            firstOperand,
            secondOperand,
            operator: PropositionalOperator.Equiv,
            symbol: LogicalSymbolHexCode.Equivalence,
            depth,
          }),
        );
        list.push(...this.generateColumnsFromFormula(firstOperand, depth + 1));
        list.push(...this.generateColumnsFromFormula(secondOperand, depth + 1));
        break;
      }

      case PropositionalOperator.Or: {
        const firstOperand = formula.values[0] as PropositionalFormula;
        const secondOperand = formula.values[1] as PropositionalFormula;
        list.push(
          this.createBinaryColumn({
            firstOperand,
            secondOperand,
            operator: PropositionalOperator.Or,
            symbol: LogicalSymbolHexCode.Disjunction,
            depth,
          }),
        );
        list.push(...this.generateColumnsFromFormula(firstOperand, depth + 1));
        list.push(...this.generateColumnsFromFormula(secondOperand, depth + 1));
        break;
      }

      case PropositionalOperator.Not: {
        const firstOperand = formula.values[0] as PropositionalFormula;
        list.push(this.createNegationColumn(firstOperand, depth));
        list.push(...this.generateColumnsFromFormula(firstOperand, depth + 1));
        break;
      }
    }

    return list.sort((a, b) => b.depth - a.depth);
  },

  createBinaryColumn({
    firstOperand,
    secondOperand,
    operator,
    depth,
    symbol,
  }: {
    firstOperand: PropositionalFormula;
    secondOperand: PropositionalFormula;
    operator: PropositionalOperator;
    symbol: LogicalSymbolHexCode;
    depth: number;
  }): TruthTableColumn {
    const firstExpression = converter.convertFormulaToUserFriendlyExpression(firstOperand);
    const secondExpression = converter.convertFormulaToUserFriendlyExpression(secondOperand);
    const firstString = converter.convertUserFriendlyExpressionToString(firstExpression);
    const secondString = converter.convertUserFriendlyExpressionToString(secondExpression);

    const title = `${firstString} ${symbol} ${secondString}`;

    return {
      field: title,
      depth,
      operator,
      title: {
        en: title,
        ru: title,
      },
    };
  },

  createNegationColumn(value: PropositionalFormula, depth: number): TruthTableColumn {
    const expression = converter.convertFormulaToUserFriendlyExpression(value);
    const string = converter.convertUserFriendlyExpressionToString(expression);
    const title = `${LogicalSymbolHexCode.Negation} ${string}`;

    return {
      field: title,
      depth,
      operator: PropositionalOperator.Not,
      title: {
        en: title,
        ru: title,
      },
    };
  },

  createVariableColumn(value: string, depth: number): TruthTableColumn {
    const titleValue = value.toUpperCase();

    return {
      field: value,
      depth,
      operator: PropositionalOperator.Var,
      title: {
        en: titleValue,
        ru: titleValue,
      },
    };
  },

  countVariables(formula: PropositionalFormula): number {
    let counter = 0;

    if (formula.operator === PropositionalOperator.Var) {
      counter++;
    } else if (Array.isArray(formula.values)) {
      formula.values.forEach((item) => {
        counter += this.countVariables(item);
      });
    }

    return counter;
  },
};

export default truthTableGenerator;

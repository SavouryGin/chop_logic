import converter from './converter';
import { LogicalSymbolHexCode, PropositionalOperator } from 'enums';
import { PropositionalFormula, TableItem } from 'types';
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

    console.log('SET', this.generateVariableValues(formula));

    return this.sortColumns(list);
  },

  sortColumns(columns: TruthTableColumn[]): TruthTableColumn[] {
    const sortedByDepth = [...columns].sort((a, b) => b.depth - a.depth);
    const variableColumns: TruthTableColumn[] = [];
    const restColumns: TruthTableColumn[] = [];

    sortedByDepth.forEach((column) => {
      if (column.operator === PropositionalOperator.Var) {
        variableColumns.push(column);
      } else {
        restColumns.push(column);
      }
    });

    const uniqueVarColumns = this.filterUniqueColumns(variableColumns);

    const variableColumnsByAlpha = [...uniqueVarColumns].sort((a, b) => {
      const firstVar = a?.field?.toUpperCase() || '';
      const secondVar = b?.field?.toUpperCase() || '';

      return firstVar > secondVar ? 1 : -1;
    });

    return [...variableColumnsByAlpha, ...restColumns];
  },

  filterUniqueColumns(columns: TruthTableColumn[]): TruthTableColumn[] {
    const uniqueFields: string[] = [];
    const result: TruthTableColumn[] = [];

    for (const column of columns) {
      if (!column?.field || uniqueFields.includes(column.field)) {
        continue;
      }

      result.push(column);
      uniqueFields.push(column.field);
    }

    return result;
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

  getVariables(formula: PropositionalFormula): string[] {
    const vars: string[] = [];

    if (formula.operator === PropositionalOperator.Var) {
      vars.push(formula.values as string);
    } else if (Array.isArray(formula.values)) {
      formula.values.forEach((item) => {
        vars.push(...this.getVariables(item));
      });
    }
    const uniqueVars = new Set(vars);

    return Array.from(uniqueVars).sort();
  },

  generateVariableValues(formula: PropositionalFormula): TableItem[] {
    const variables = this.getVariables(formula);
    const varsCount = variables.length;

    if (varsCount === 0) {
      return [];
    }

    const result: TableItem[] = [];
    const combinations = this.generateTrueFalseCombinations(varsCount);
    const arrayOfValues = this.splitBooleanArrayByVarsCount(varsCount, combinations);

    for (const currentValues of arrayOfValues) {
      const newSet: TableItem = { id: crypto.randomUUID() };

      for (let j = 0; j < currentValues.length; j++) {
        newSet[variables[j]] = currentValues[j] ? '1' : '0';
      }

      result.push(newSet);
    }

    return result;
  },

  generateTrueFalseCombinations(varsCount: number): boolean[] {
    const boolArr: boolean[] = [];

    for (let i = 0; i < 1 << varsCount; i++) {
      for (let j = varsCount - 1; j >= 0; j--) {
        const boolSet = Boolean(i & (1 << j));
        boolArr.push(boolSet);
      }
    }

    return boolArr;
  },

  splitBooleanArrayByVarsCount(varsCount: number, boolArr: boolean[]): boolean[][] {
    const result: boolean[][] = [];

    for (let i = 0; i < boolArr.length; i += varsCount) {
      const chunk = boolArr.slice(i, i + varsCount);
      result.push(chunk);
    }

    return result;
  },
};

export default truthTableGenerator;

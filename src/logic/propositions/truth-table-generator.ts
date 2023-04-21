import converter from './converter';
import { LogicalSymbolHexCode, PropositionalOperator } from 'enums';
import { PropositionalFormula, TableItem } from 'types';
import { TruthSet, TruthTableColumn } from 'store/propositions/truth-tables/interfaces';

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

    return this.sortColumns(list);
  },

  calculateTableData({ formula, columns }: { formula: PropositionalFormula; columns: TruthTableColumn[] }): TableItem[] {
    const variablesValues = this.generateVariableValues(formula);
    const columnsWithFormulas = columns.filter((column) => column.operator !== PropositionalOperator.Var);
    let currentValues = [...variablesValues];

    for (const column of columnsWithFormulas) {
      console.log('COL', column);
      currentValues = this.calculateColumnValue(column, currentValues);
    }

    return this.mapTruthSetsToTableItems(currentValues);
  },

  calculateColumnValue(column: TruthTableColumn, currentValues: TruthSet[]): TruthSet[] {
    const newValues: TruthSet[] = [];

    switch (column.operator) {
      case PropositionalOperator.Not: {
        const negationOperand = column.operands[0];
        const field = column.field || '';
        // const newSet: TruthSet = {};

        for (const item of currentValues) {
          console.log('item[negationOperand]', item[negationOperand]);
          const currentValue = item[negationOperand] || false;
          console.log('current val', currentValue);
          const newSet = { ...item, [field]: !currentValue };
          console.log('newSet', newSet);
          newValues.push(newSet);
        }

        break;
      }
    }

    return newValues;
  },

  mapTruthSetsToTableItems(values: TruthSet[]): TableItem[] {
    return values.map((item) => {
      const tableItem: TableItem = {
        id: crypto.randomUUID(),
      };

      for (const property in item) {
        tableItem[property] = item[property] ? '1' : '0';
      }

      return tableItem;
    });
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
    const firstStringOperand = converter.convertUserFriendlyExpressionToString(firstExpression);
    const secondStringOperand = converter.convertUserFriendlyExpressionToString(secondExpression);

    const title = `${firstStringOperand} ${symbol} ${secondStringOperand}`;

    return {
      field: title,
      depth,
      operator,
      title: {
        en: title,
        ru: title,
      },
      operands: [firstStringOperand, secondStringOperand],
    };
  },

  createNegationColumn(value: PropositionalFormula, depth: number): TruthTableColumn {
    const expression = converter.convertFormulaToUserFriendlyExpression(value);
    const stringOperand = converter.convertUserFriendlyExpressionToString(expression);
    const title = `${LogicalSymbolHexCode.Negation} ${stringOperand}`;

    return {
      field: title,
      depth,
      operator: PropositionalOperator.Not,
      title: {
        en: title,
        ru: title,
      },
      operands: [stringOperand],
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
      operands: [],
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

  generateVariableValues(formula: PropositionalFormula): TruthSet[] {
    const variables = this.getVariables(formula);
    const varsCount = variables.length;

    if (varsCount === 0) {
      return [];
    }

    const result: TruthSet[] = [];
    const combinations = this.generateTrueFalseCombinations(varsCount);
    const arrayOfValues = this.splitBooleanArrayByVarsCount(varsCount, combinations);

    for (const currentValues of arrayOfValues) {
      const newSet: TruthSet = {};

      for (let j = 0; j < currentValues.length; j++) {
        newSet[variables[j]] = currentValues[j];
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

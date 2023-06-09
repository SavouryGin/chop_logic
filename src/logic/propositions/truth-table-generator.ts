import converter from './converter';
import { LogicalSymbolHexCode, PropositionalOperator } from 'enums';
import { PropositionalFormula, TableItem } from 'types';
import { TruthSet, TruthTableColumn } from 'store/propositions/truth-tables/interfaces';

function generateColumnsFromFormula(formula: PropositionalFormula, depth = 0): TruthTableColumn[] {
  const list: TruthTableColumn[] = [];

  switch (formula.operator) {
    case PropositionalOperator.Var: {
      list.push(createVariableColumn(formula.values as string, depth));
      break;
    }

    case PropositionalOperator.And: {
      const firstOperand = formula.values[0] as PropositionalFormula;
      const secondOperand = formula.values[1] as PropositionalFormula;
      list.push(
        createBinaryColumn({
          firstOperand,
          secondOperand,
          operator: PropositionalOperator.And,
          symbol: LogicalSymbolHexCode.Conjunction,
          depth,
        }),
      );
      list.push(...generateColumnsFromFormula(firstOperand, depth + 1));
      list.push(...generateColumnsFromFormula(secondOperand, depth + 1));
      break;
    }

    case PropositionalOperator.Implies: {
      const firstOperand = formula.values[0] as PropositionalFormula;
      const secondOperand = formula.values[1] as PropositionalFormula;
      list.push(
        createBinaryColumn({
          firstOperand,
          secondOperand,
          operator: PropositionalOperator.Implies,
          symbol: LogicalSymbolHexCode.Implication,
          depth,
        }),
      );
      list.push(...generateColumnsFromFormula(firstOperand, depth + 1));
      list.push(...generateColumnsFromFormula(secondOperand, depth + 1));
      break;
    }

    case PropositionalOperator.Equiv: {
      const firstOperand = formula.values[0] as PropositionalFormula;
      const secondOperand = formula.values[1] as PropositionalFormula;
      list.push(
        createBinaryColumn({
          firstOperand,
          secondOperand,
          operator: PropositionalOperator.Equiv,
          symbol: LogicalSymbolHexCode.Equivalence,
          depth,
        }),
      );
      list.push(...generateColumnsFromFormula(firstOperand, depth + 1));
      list.push(...generateColumnsFromFormula(secondOperand, depth + 1));
      break;
    }

    case PropositionalOperator.Or: {
      const firstOperand = formula.values[0] as PropositionalFormula;
      const secondOperand = formula.values[1] as PropositionalFormula;
      list.push(
        createBinaryColumn({
          firstOperand,
          secondOperand,
          operator: PropositionalOperator.Or,
          symbol: LogicalSymbolHexCode.Disjunction,
          depth,
        }),
      );
      list.push(...generateColumnsFromFormula(firstOperand, depth + 1));
      list.push(...generateColumnsFromFormula(secondOperand, depth + 1));
      break;
    }

    case PropositionalOperator.Not: {
      const firstOperand = formula.values[0] as PropositionalFormula;
      list.push(createNegationColumn(firstOperand, depth));
      list.push(...generateColumnsFromFormula(firstOperand, depth + 1));
      break;
    }
  }

  return sortColumns(list);
}

function calculateTableData({ formula, columns }: { formula: PropositionalFormula; columns: TruthTableColumn[] }): TableItem[] {
  const variablesValues = generateVariableValues(formula);
  const columnsWithFormulas = columns.filter((column) => column.operator !== PropositionalOperator.Var);
  let currentValues = [...variablesValues];

  for (const column of columnsWithFormulas) {
    currentValues = calculateColumnValue(column, currentValues);
  }

  return mapTruthSetsToTableItems(currentValues);
}

function calculateColumnValue(column: TruthTableColumn, currentValues: TruthSet[]): TruthSet[] {
  const newValues: TruthSet[] = [];
  const operator = column.operator;

  for (const currentSet of currentValues) {
    const newSet = createNewTruthSet({ operator, currentSet, column });
    newValues.push(newSet);
  }

  return newValues;
}

function createNewTruthSet({
  operator,
  currentSet,
  column,
}: {
  operator: PropositionalOperator;
  currentSet: TruthSet;
  column: TruthTableColumn;
}): TruthSet {
  const field = column.field || '';

  switch (operator) {
    case PropositionalOperator.Not: {
      const negationOperand = column.operands[0];

      const currentValue = !!currentSet[negationOperand];
      const newValue = !currentValue;
      const newSet = { ...currentSet, [field]: newValue };

      return newSet;
    }

    case PropositionalOperator.And: {
      const [leftOperand, rightOperand] = column.operands;

      const currentLeftValue = !!currentSet[leftOperand];
      const currentRightValue = !!currentSet[rightOperand];
      const newValue = currentLeftValue && currentRightValue;
      const newSet = { ...currentSet, [field]: newValue };

      return newSet;
    }

    case PropositionalOperator.Or: {
      const [leftOperand, rightOperand] = column.operands;

      const currentLeftValue = !!currentSet[leftOperand];
      const currentRightValue = !!currentSet[rightOperand];
      const newValue = currentLeftValue || currentRightValue;
      const newSet = { ...currentSet, [field]: newValue };

      return newSet;
    }

    case PropositionalOperator.Implies: {
      const [leftOperand, rightOperand] = column.operands;

      const currentLeftValue = !!currentSet[leftOperand];
      const currentRightValue = !!currentSet[rightOperand];
      const newValue = !currentLeftValue || currentRightValue;
      const newSet = { ...currentSet, [field]: newValue };

      return newSet;
    }

    case PropositionalOperator.Equiv: {
      const [leftOperand, rightOperand] = column.operands;

      const currentLeftValue = !!currentSet[leftOperand];
      const currentRightValue = !!currentSet[rightOperand];
      const newValue = (!currentLeftValue || currentRightValue) && (!currentRightValue || currentLeftValue);
      const newSet = { ...currentSet, [field]: newValue };

      return newSet;
    }

    default: {
      return currentSet;
    }
  }
}

function mapTruthSetsToTableItems(values: TruthSet[]): TableItem[] {
  return values.map((item) => {
    const tableItem: TableItem = {
      id: crypto.randomUUID(),
    };

    for (const property in item) {
      tableItem[property] = item[property] ? '1' : '0';
    }

    return tableItem;
  });
}

function sortColumns(columns: TruthTableColumn[]): TruthTableColumn[] {
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

  const uniqueVarColumns = filterUniqueColumns(variableColumns);

  const variableColumnsByAlpha = [...uniqueVarColumns].sort((a, b) => {
    const firstVar = a?.field?.toUpperCase() || '';
    const secondVar = b?.field?.toUpperCase() || '';

    return firstVar > secondVar ? 1 : -1;
  });

  return [...variableColumnsByAlpha, ...restColumns];
}

function filterUniqueColumns(columns: TruthTableColumn[]): TruthTableColumn[] {
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
}

function createBinaryColumn({
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
}

function createNegationColumn(value: PropositionalFormula, depth: number): TruthTableColumn {
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
}

function createVariableColumn(value: string, depth: number): TruthTableColumn {
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
}

function getVariables(formula: PropositionalFormula): string[] {
  const vars: string[] = [];

  if (formula.operator === PropositionalOperator.Var) {
    vars.push(formula.values as string);
  } else if (Array.isArray(formula.values)) {
    formula.values.forEach((item) => {
      vars.push(...getVariables(item));
    });
  }
  const uniqueVars = new Set(vars);

  return Array.from(uniqueVars).sort();
}

function generateVariableValues(formula: PropositionalFormula): TruthSet[] {
  const variables = getVariables(formula);
  const varsCount = variables.length;

  if (varsCount === 0) {
    return [];
  }

  const result: TruthSet[] = [];
  const combinations = generateTrueFalseCombinations(varsCount);
  const arrayOfValues = splitBooleanArrayByVarsCount(varsCount, combinations);

  for (const currentValues of arrayOfValues) {
    const newSet: TruthSet = {};

    for (let j = 0; j < currentValues.length; j++) {
      newSet[variables[j]] = currentValues[j];
    }

    result.push(newSet);
  }

  return result;
}

function generateTrueFalseCombinations(varsCount: number): boolean[] {
  const boolArr: boolean[] = [];

  for (let i = 0; i < 1 << varsCount; i++) {
    for (let j = varsCount - 1; j >= 0; j--) {
      const boolSet = Boolean(i & (1 << j));
      boolArr.push(boolSet);
    }
  }

  return boolArr;
}

function splitBooleanArrayByVarsCount(varsCount: number, boolArr: boolean[]): boolean[][] {
  const result: boolean[][] = [];

  for (let i = 0; i < boolArr.length; i += varsCount) {
    const chunk = boolArr.slice(i, i + varsCount);
    result.push(chunk);
  }

  return result;
}

export default Object.freeze({
  generateColumnsFromFormula,
  calculateTableData,
  getVariables,
  generateVariableValues,
  generateTrueFalseCombinations,
  splitBooleanArrayByVarsCount,
  createVariableColumn,
  createNegationColumn,
  createBinaryColumn,
});

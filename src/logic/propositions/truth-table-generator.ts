import converter from './converter';
import { LogicalSymbolHexCode, PropositionalOperator } from 'enums';
import { PropositionalFormula, TableColumnProps } from 'types';

const generateColumnsFromFormula = (formula: PropositionalFormula): TableColumnProps[] => {
  const list: TableColumnProps[] = [];

  if (formula.operator === PropositionalOperator.Var) {
    list.push(createVariableColumn(formula.values as string));
  }

  // switch(formula.operator) {
  //   case(PropositionalOperator.And): {
  //   }
  // }

  return list;
};

const createAndColumn = (firstOperand: PropositionalFormula, secondOperand: PropositionalFormula): TableColumnProps => {
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
};

const createVariableColumn = (value: string): TableColumnProps => {
  const titleValue = value.toUpperCase();

  return {
    field: value,
    title: {
      en: titleValue,
      ru: titleValue,
    },
  };
};

const truthTableGenerator = {
  generateColumnsFromFormula,
};

export default truthTableGenerator;

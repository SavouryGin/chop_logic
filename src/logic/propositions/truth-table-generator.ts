import { PropositionalFormula, TableColumnProps } from 'types';
import { PropositionalOperator } from 'enums';

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

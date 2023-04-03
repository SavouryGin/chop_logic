import { PropositionalFormula, TableColumnProps } from 'types';

const generateColumnsFromFormula = (formula: PropositionalFormula): TableColumnProps[] => {
  console.log(formula);

  return [];
};

const truthTableGenerator = {
  generateColumnsFromFormula,
};

export default truthTableGenerator;

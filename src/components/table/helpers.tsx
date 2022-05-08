import React from 'react';
import { isLocalText } from 'helpers/checkers/is-local-text';
import { isPropositionalFormula } from 'helpers/checkers/is-propositional-formula';
import { Language, LocalText, PropositionalSymbol, TableColumnProps, TableDataItem } from 'types';
import Formula from 'components/formula';

export function getDataCellsValues(tableRow: TableDataItem, columns: TableColumnProps[], language: Language): (string | JSX.Element)[] {
  const stringValues = [];
  for (const column of columns) {
    let value;
    if (!column.field) {
      value = '';
    } else if (isLocalText(tableRow[column.field])) {
      value = (tableRow[column.field] as LocalText)[language];
    } else if (isPropositionalFormula(tableRow[column.field])) {
      const props = tableRow[column.field] as PropositionalSymbol[];
      value = <Formula content={props} />;
    } else {
      value = (tableRow[column.field] as string).toString();
    }

    stringValues.push(value);
  }

  return stringValues;
}

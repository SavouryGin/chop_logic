import Formula from 'components/controls/formula';
import React from 'react';
import validator from 'logic/propositions/validator';
import { Language, LocalText, PropositionalExpression, TableColumnProps, TableDataItem } from 'types';
import { isLocalText } from 'helpers/checkers';

export function getDataCellsValues(tableRow: TableDataItem, columns: TableColumnProps[], language: Language): (string | JSX.Element)[] {
  const stringValues = [];
  for (const column of columns) {
    let value;

    if (!column.field || !tableRow[column.field]) {
      value = '';
    } else if (isLocalText(tableRow[column.field])) {
      value = (tableRow[column.field] as LocalText)[language];
    } else if (validator.isPropositionalExpression(tableRow[column.field])) {
      const props = tableRow[column.field] as PropositionalExpression;
      value = <Formula content={props} />;
    } else {
      value = (tableRow[column.field] as string).toString();
    }

    stringValues.push(value);
  }

  return stringValues;
}

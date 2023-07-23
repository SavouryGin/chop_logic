import Formula from 'components/controls/formula';
import React from 'react';
import validator from 'logic/propositions/validator';
import { Language, LocalText, PropositionalExpression, TableColumn, TableItem } from 'types';
import { isLocalText } from 'utils/checkers';

export function getDataCellsValues(tableRow: TableItem, columns: TableColumn[], language: Language): (string | JSX.Element)[] {
  const stringValues = [];
  for (const column of columns) {
    let value;

    if (!column?.field || tableRow[column.field] === null || tableRow[column.field] === undefined) {
      value = '';
    } else if (isLocalText(tableRow[column.field])) {
      value = (tableRow[column.field] as LocalText)[language];
    } else if (validator.isPropositionalExpression(tableRow[column.field])) {
      const props = tableRow[column.field] as PropositionalExpression;
      value = <Formula content={props} level={tableRow?.level as number} />;
    } else {
      value = (tableRow[column.field] as string).toString();
    }

    stringValues.push(value);
  }

  return stringValues;
}

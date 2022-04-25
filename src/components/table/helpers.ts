import { isLocalText } from 'helpers/checkers/is-local-text';
import { Language, LocalText, TableColumnProps, TableDataItem } from 'types';

export function getDataCellsValues(tableRow: TableDataItem, columns: TableColumnProps[], language: Language): string[] {
  const stringValues = [];
  for (const column of columns) {
    let value;
    if (!column.field) {
      value = '';
    } else if (isLocalText(tableRow[column.field])) {
      value = (tableRow[column.field] as LocalText)[language];
    } else {
      value = (tableRow[column.field] as string).toString();
    }

    stringValues.push(value);
  }

  return stringValues;
}

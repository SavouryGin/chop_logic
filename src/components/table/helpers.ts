import { TableColumnProps, TableDataItem } from 'types';

export function getDataCellsValues(tableRow: TableDataItem, columns: TableColumnProps[]): string[] {
  const values = [];
  for (const column of columns) {
    const value = !column.field ? '' : (tableRow[column.field] as string).toString();
    values.push(value);
  }

  return values;
}

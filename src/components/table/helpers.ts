import { TableColumnProps, TableDataItem } from 'types/table';

export function getDataCellsValues(tableRow: TableDataItem, columns: TableColumnProps[]): string[] {
  const values = [];
  for (const column of columns) {
    const value = !column.field ? '' : (tableRow[column.field] as string);
    values.push(value);
  }

  return values;
}

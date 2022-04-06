import { TableColumnProps, TableDataItem } from 'types/table';

export const testTableColumns: TableColumnProps[] = [
  { title: 'Col 1', field: 'field1' },
  { title: 'Col 2', field: 'field2' },
  { title: 'Col 3', field: 'field3' },
  { title: 'Col 4', field: 'field4' },
];

export const testTableData: TableDataItem[] = [
  { id: 'row1', field1: 1, field2: 2, field3: 3, field4: 4 },
  { id: 'row2', field1: 5, field2: 6, field3: 7, field4: 8 },
  { id: 'row3', field1: 9, field2: 10, field3: 3, field4: 11 },
  { id: 'row4', field1: 12, field2: 13, field3: 14, field4: 15 },
];

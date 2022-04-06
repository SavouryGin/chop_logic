import { TableColumnProps, TableDataItem } from 'types/table';

export const testTableColumns: TableColumnProps[] = [
  { title: 'Col 1', field: 'field1' },
  { title: 'Col 2', field: 'field2' },
  { title: 'Col 3', field: 'field3' },
  { title: 'Col 4', field: 'field4' },
];

export const testTableData: TableDataItem[] = [
  { id: 'row1', field1: 1, field2: 2, field3: 3, field4: 4 },
  { id: 'row2', field1: 1, field2: 2, field3: 3, field4: 4 },
  { id: 'row3', field1: 1, field2: 2, field3: 3, field4: 4 },
  { id: 'row4', field1: 1, field2: 2, field3: 3, field4: 4 },
];

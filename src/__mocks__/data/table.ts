import { TableColumn, TableItem } from 'types/table';

export const testTableColumns: TableColumn[] = [
  { title: { en: 'Col 1', ru: 'Кол1' }, field: 'field1' },
  { title: { en: 'Col 2', ru: 'Кол2' }, field: 'field2' },
  { title: { en: 'Col 3', ru: 'Кол3' }, field: 'field3' },
  { title: { en: 'Col 4', ru: 'Кол4' }, field: 'field4' },
];

export const testTableData: TableItem[] = [
  { id: 'row1', field1: 1, field2: 2, field3: 3, field4: { en: 'en4', ru: 'ru4' } },
  { id: 'row2', field1: 5, field2: 6, field3: 7, field4: { en: 'en8', ru: 'ru8' } },
  { id: 'row3', field1: 9, field2: 10, field3: 11, field4: { en: 'en12', ru: 'ru12' } },
  { id: 'row4', field1: 13, field2: 14, field3: 15, field4: { en: 'en16', ru: 'ru16' } },
];

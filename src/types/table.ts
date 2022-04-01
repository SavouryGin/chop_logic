import { ComponentProps } from './general';

export type TableProps = ComponentProps & {
  columns: TableColumnProps[];
  data: TableDataItem[];
};

export type TableColumnProps = {
  // The field to which the column is bound
  field?: string;
  // The title of the column
  title?: string;
  // The width of the column (in pixels)
  width?: number;
};

export type TableDataItem = {
  id: string;
  [key: string]: unknown;
};

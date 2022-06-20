import { CommonProps, LocalText } from './general';

export type TableProps = CommonProps & {
  columns: TableColumnProps[];
  data: TableDataItem[];
  hasCheckboxColumn?: boolean;
  passSelectedIds?: (ids: string[]) => void;
};

export type TableColumnProps = {
  // The field to which the column is bound
  field?: string;
  // The title of the column
  title?: LocalText;
};

export type TableDataItem = {
  id: string;
  [key: string]: unknown;
};

export type TableIdsProps = {
  selectedIds: string[];
  setSelectedIds: (value: React.SetStateAction<string[]>) => void;
};

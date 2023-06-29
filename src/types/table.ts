import React from 'react';
import { CommonProps, LocalText } from './general';

export type TableProps = CommonProps & {
  columns: TableColumn[];
  data: TableItem[];
  hasCheckboxColumn?: boolean;
  passSelectedIds?: (ids: string[]) => void;
};

export type TableColumn = {
  field?: string;
  title?: LocalText;
};

export type TableItem = {
  id: string;
  [key: string]: unknown;
};

export type TableIdsProps = {
  selectedIds: string[];
  setSelectedIds: (value: React.SetStateAction<string[]>) => void;
};

export type SelectAllCheckboxProps = {
  allRowIds: string[];
  tableId: string;
} & TableIdsProps;

export type SelectRowCheckboxProps = {
  rowId: string;
} & TableIdsProps;

export type TableBodyProps = {
  data: TableItem[];
  columns: TableColumn[];
  hasCheckboxColumn: boolean;
  className?: string;
} & TableIdsProps;

export type TableHeadProps = {
  columns: TableColumn[];
  hasCheckboxColumn: boolean;
  data: TableItem[];
  className?: string;
  id?: string;
} & TableIdsProps;

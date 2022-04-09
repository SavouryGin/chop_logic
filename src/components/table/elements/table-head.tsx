import React from 'react';
import { TableColumnProps, TableIdsProps } from 'types/table';
import SelectAllCheckbox from './select-all-checkbox';

type TableHeadProps = {
  columns: TableColumnProps[];
  hasCheckboxColumn: boolean;
  allRowIds: string[];
  className?: string;
} & TableIdsProps;

function TableHead({ columns, hasCheckboxColumn, selectedIds, setSelectedIds, allRowIds, ...rest }: TableHeadProps): React.ReactElement {
  const headerCells = columns.map((column, index) => {
    return (
      <th key={index} className='table__cell table__cell_heading'>
        {column.title || ''}
      </th>
    );
  });

  return (
    <thead className={rest.className}>
      <tr className={'table__row'}>
        {hasCheckboxColumn && <SelectAllCheckbox selectedIds={selectedIds} allRowIds={allRowIds} setSelectedIds={setSelectedIds} />}
        {headerCells}
      </tr>
    </thead>
  );
}

export default TableHead;
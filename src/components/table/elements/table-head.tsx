import React from 'react';
import SelectAllCheckbox from './select-all-checkbox';
import { TableHeadProps } from 'types';
import { settingsSelectors } from 'store/settings/selectors';
import { useAppSelector } from 'hooks';

const TableHead = ({
  columns,
  hasCheckboxColumn,
  selectedIds,
  setSelectedIds,
  data,
  className,
  id,
}: TableHeadProps): React.ReactElement => {
  const language = useAppSelector(settingsSelectors.getLanguage);
  const allRowIds = data.map((item) => item.id);
  const tableId = id || crypto.randomUUID();

  const headerCells = columns.map((column, index) => {
    const title = column.title ? column.title[language] : '';

    return (
      <th key={index} className='table__cell table__cell_heading'>
        {title}
      </th>
    );
  });

  return (
    <thead className={className}>
      <tr className={'table__row'}>
        {hasCheckboxColumn && (
          <SelectAllCheckbox tableId={tableId} selectedIds={selectedIds} allRowIds={allRowIds} setSelectedIds={setSelectedIds} />
        )}
        {headerCells}
      </tr>
    </thead>
  );
};

export default TableHead;

import React from 'react';
import { TableColumnProps, TableDataItem, TableIdsProps } from 'types';
import { useAppSelector } from 'hooks';
import { settingsSelectors } from 'store/settings/selectors';
import SelectAllCheckbox from './select-all-checkbox';

type TableHeadProps = {
  columns: TableColumnProps[];
  hasCheckboxColumn: boolean;
  data: TableDataItem[];
  className?: string;
} & TableIdsProps;

function TableHead({ columns, hasCheckboxColumn, selectedIds, setSelectedIds, data, ...rest }: TableHeadProps): React.ReactElement {
  const language = useAppSelector(settingsSelectors.getLanguage);
  const allRowIds = data.map((item) => item.id);

  const headerCells = columns.map((column, index) => {
    const title = column.title ? column.title[language] : '';
    return (
      <th key={index} className='table__cell table__cell_heading'>
        {title}
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

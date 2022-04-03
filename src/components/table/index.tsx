import React, { useEffect, useState } from 'react';
import formatClassName from 'helpers/formatters/format-class-name';
import { TableProps } from 'types/table';
import { useAppSelector } from 'hooks';
import { settingsSelectors } from 'store/settings/selectors';
import { getDataCellsValues } from './helpers';
import SelectAllCheckbox from './select-all-checkbox';
import SelectRowCheckbox from './select-row-checkbox';

import './styles.scss';

function Table({ columns, data, hasCheckboxColumn, ...rest }: TableProps): React.ReactElement {
  const isDarkMode = useAppSelector(settingsSelectors.getIsDarkMode);
  const tableClassNames = formatClassName(['table', rest.className, { table_dark: isDarkMode }]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const allRowIds = data.map((item) => item.id);

  useEffect(() => {
    console.log('selectedIds', selectedIds);
  }, [selectedIds]);

  const headerCheckbox = hasCheckboxColumn ? (
    <SelectAllCheckbox selectedIds={selectedIds} allRowIds={allRowIds} setSelectedIds={setSelectedIds} />
  ) : null;

  const headerCells = columns.map((column, index) => {
    return <th key={index}>{column.title || ''}</th>;
  });

  const rows = data.map((item) => {
    const values = getDataCellsValues(item, columns);

    const dataCells = values.map((value, index) => {
      return <td key={`${item.id}_${index}`}>{value}</td>;
    });

    const cellCheckbox = hasCheckboxColumn ? (
      <SelectRowCheckbox selectedIds={selectedIds} rowId={item.id} setSelectedIds={setSelectedIds} />
    ) : null;

    return (
      <tr key={item.id}>
        {cellCheckbox}
        {dataCells}
      </tr>
    );
  });

  return (
    <table className={tableClassNames}>
      <thead>
        <tr>
          {headerCheckbox}
          {headerCells}
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

export default Table;

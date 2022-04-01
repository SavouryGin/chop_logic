import React from 'react';
import formatClassName from 'helpers/formatters/format-class-name';
import { TableProps } from 'types/table';
import { useAppSelector } from 'hooks';
import { settingsSelectors } from 'store/settings/selectors';
import { getDataCellsValues } from './helpers';

import './styles.scss';
import Checkbox from 'components/inputs/checkbox';
import { Guid } from 'guid-typescript';

function Table({ columns, data, hasCheckboxColumn, ...rest }: TableProps): React.ReactElement {
  const isDarkMode = useAppSelector(settingsSelectors.getIsDarkMode);
  const tableClassNames = formatClassName(['table', rest.className, { table_dark: isDarkMode }]);
  const tableId = rest.id || Guid.create().toString();
  const selectAllCheckboxId = `select_all_in_${tableId}`;

  const headerCheckbox = hasCheckboxColumn ? (
    <th>
      <Checkbox name={selectAllCheckboxId} id={selectAllCheckboxId} />
    </th>
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
      <td>
        <Checkbox name={`select_${item.id}`} id={`select_${item.id}`} />
      </td>
    ) : null;

    return (
      <tr key={item.id} id={item.id}>
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

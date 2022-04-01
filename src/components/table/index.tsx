import React from 'react';
import formatClassName from 'helpers/formatters/format-class-name';
import { TableProps } from 'types/table';
import { useAppSelector } from 'hooks';
import { settingsSelectors } from 'store/settings/selectors';
import { getDataCellsValues } from './helpers';

import './styles.scss';

function Table({ columns, data, ...rest }: TableProps): React.ReactElement {
  const isDarkMode = useAppSelector(settingsSelectors.getIsDarkMode);
  const tableClassNames = formatClassName(['table', rest.className, { table_dark: isDarkMode }]);

  const headerCells = columns.map((column, index) => {
    return <th key={index}>{column.title || ''}</th>;
  });

  const rows = data.map((item) => {
    const values = getDataCellsValues(item, columns);

    const dataCells = values.map((value, index) => {
      return <td key={`${item.id}_${index}`}>{value}</td>;
    });

    return (
      <tr key={item.id} id={item.id}>
        {dataCells}
      </tr>
    );
  });

  return (
    <table className={tableClassNames}>
      <thead>
        <tr>{headerCells}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

export default Table;

import React from 'react';
import formatClassName from 'helpers/formatters/format-class-name';
import { ComponentProps } from 'types';
import { useAppSelector } from 'hooks';
import { settingsSelectors } from 'store/settings/selectors';

import './styles.scss';

export type TableDataItem = {
  id: string;
  [key: string]: unknown;
};

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
  width?: string | number;
  //The format that is applied to the value before it is displayed
  format?: string;
};

function Table({ columns, data, ...rest }: TableProps): React.ReactElement {
  const isDarkMode = useAppSelector(settingsSelectors.getIsDarkMode);
  const tableClassNames = formatClassName(['table', rest.className, { table_dark: isDarkMode }]);

  const headerCells = columns.map((column, index) => {
    return <th key={index}>{column.title || ''}</th>;
  });

  const rows = data.map((item) => {
    const values = [];
    for (const column of columns) {
      if (!column.field) continue;
      const value = item[column.field];
      values.push(value);
    }

    const dataCells = values.map((value, index) => {
      return <td key={`${item.id}_${index}`}>{value as string}</td>;
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

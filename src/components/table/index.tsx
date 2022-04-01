import React from 'react';
import formatClassName from 'helpers/formatters/format-class-name';
import { ComponentProps } from 'types';
import { useAppSelector } from 'hooks';
import { settingsSelectors } from 'store/settings/selectors';

import './styles.scss';

export type TableProps = ComponentProps;

function Table(props: TableProps): React.ReactElement {
  const isDarkMode = useAppSelector(settingsSelectors.getIsDarkMode);
  const tableClassNames = formatClassName(['table', props.className, { table_dark: isDarkMode }]);

  return (
    <table className={tableClassNames}>
      <thead>
        <th>asd</th>
        <th>Knocky</th>
        <th>Flor</th>
        <th>Ella</th>
        <th>Juan</th>
      </thead>
      <tbody>
        <tr>
          <td>asdf</td>
          <td>Knocky</td>
          <td>Flor</td>
          <td>Ella</td>
          <td>Juan</td>
        </tr>
        <tr>
          <td>asdf</td>
          <td>Knocky</td>
          <td>Flor</td>
          <td>Ella</td>
          <td>Juan</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td>asd</td>
          <td>Knocky</td>
          <td>Flor</td>
          <td>Ella</td>
          <td>Juan</td>
        </tr>
      </tfoot>
    </table>
  );
}

export default Table;

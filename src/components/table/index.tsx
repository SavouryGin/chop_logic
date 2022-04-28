import React, { useEffect, useState } from 'react';
import formatClassName from 'helpers/formatters/format-class-name';
import { TableProps } from 'types';
import { useAppSelector } from 'hooks';
import { settingsSelectors } from 'store/settings/selectors';
import TableHead from './elements/table-head';
import TableBody from './elements/table-body';

import './styles.scss';

function Table({ columns, data, ...rest }: TableProps): React.ReactElement {
  // Selectors
  const isDarkMode = useAppSelector(settingsSelectors.getIsDarkMode);
  // Class names
  const tableClassNames = formatClassName(['table', rest.className, { table_dark: isDarkMode }]);
  const headClassNames = formatClassName(['table__head', { table__head_dark: isDarkMode }]);
  const bodyClassNames = formatClassName(['table__body', { table__body_dark: isDarkMode }]);
  // State
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  // Effects
  useEffect(() => {
    if (rest.passSelectedIds) rest.passSelectedIds(selectedIds);
  }, [selectedIds]);

  useEffect(() => {
    setSelectedIds([]);
  }, [data]);

  return (
    <table className={tableClassNames}>
      <TableHead
        columns={columns}
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
        data={data}
        hasCheckboxColumn={!!rest.hasCheckboxColumn}
        className={headClassNames}
      />
      <TableBody
        columns={columns}
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
        hasCheckboxColumn={!!rest.hasCheckboxColumn}
        data={data}
        className={bodyClassNames}
      />
    </table>
  );
}

export default Table;

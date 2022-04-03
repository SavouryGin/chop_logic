import React, { useEffect, useState } from 'react';
import formatClassName from 'helpers/formatters/format-class-name';
import { TableProps } from 'types/table';
import { useAppSelector } from 'hooks';
import { settingsSelectors } from 'store/settings/selectors';
import TableHead from './components/table-head';
import TableBody from './components/table-body';

import './styles.scss';

function Table({ columns, data, ...rest }: TableProps): React.ReactElement {
  const isDarkMode = useAppSelector(settingsSelectors.getIsDarkMode);
  const tableClassNames = formatClassName(['table', rest.className, { table_dark: isDarkMode }]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const allRowIds = data.map((item) => item.id);

  useEffect(() => {
    console.log('selectedIds', selectedIds);
  }, [selectedIds]);

  return (
    <table className={tableClassNames}>
      <TableHead
        columns={columns}
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
        allRowIds={allRowIds}
        hasCheckboxColumn={!!rest.hasCheckboxColumn}
      />
      <TableBody
        columns={columns}
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
        hasCheckboxColumn={!!rest.hasCheckboxColumn}
        data={data}
      />
    </table>
  );
}

export default Table;

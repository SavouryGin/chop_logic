import React, { memo, useEffect, useState } from 'react';
import TableBody from './elements/table-body';
import TableHead from './elements/table-head';
import formatClass from 'helpers/formatters/format-class-name';
import { TableProps } from 'types';
import { settingsSelectors } from 'store/settings/selectors';
import { useAppSelector } from 'hooks';
import './styles.scss';

const Table = ({ columns, data, hasCheckboxColumn, passSelectedIds, className, id }: TableProps) => {
  const isDarkMode = useAppSelector(settingsSelectors.getIsDarkMode);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const tableClassNames = formatClass(['table', className, { table_dark: isDarkMode }]);
  const headClassNames = formatClass(['table__head', { table__head_dark: isDarkMode }]);
  const bodyClassNames = formatClass(['table__body', { table__body_dark: isDarkMode }]);

  useEffect(() => {
    if (passSelectedIds) {
      passSelectedIds(selectedIds);
    }
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
        hasCheckboxColumn={!!hasCheckboxColumn}
        className={headClassNames}
        id={id}
      />
      <TableBody
        columns={columns}
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
        hasCheckboxColumn={!!hasCheckboxColumn}
        data={data}
        className={bodyClassNames}
      />
    </table>
  );
};

export default memo(Table);

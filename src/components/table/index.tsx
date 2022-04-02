import React, { useEffect, useState } from 'react';
import Checkbox from 'components/inputs/checkbox';
import formatClassName from 'helpers/formatters/format-class-name';
import { TableProps } from 'types/table';
import { Guid } from 'guid-typescript';
import { useAppSelector } from 'hooks';
import { settingsSelectors } from 'store/settings/selectors';
import { getDataCellsValues } from './helpers';

import './styles.scss';

function Table({ columns, data, hasCheckboxColumn, ...rest }: TableProps): React.ReactElement {
  const isDarkMode = useAppSelector(settingsSelectors.getIsDarkMode);
  const tableClassNames = formatClassName(['table', rest.className, { table_dark: isDarkMode }]);
  const tableId = rest.id || Guid.create().toString();
  const selectAllCheckboxId = `select_all_in_${tableId}`;
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const onChangeRowCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, id } = e.target;
    if (checked) {
      setSelectedIds([...selectedIds, id]);
    } else {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    }
  };

  useEffect(() => {
    console.log('selectedIds', selectedIds);
  }, [selectedIds]);

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
        <Checkbox name={item.id} id={item.id} onChangeCheckboxValue={onChangeRowCheckbox} />
      </td>
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

import React from 'react';
import SelectRowCheckbox from './select-row-checkbox';
import formatClassName from 'helpers/formatters/format-class-name';
import { TableBodyProps } from 'types';
import { getDataCellsValues } from '../helpers';
import { settingsSelectors } from 'store/settings/selectors';
import { useAppSelector } from 'hooks';

const TableBody = ({ data, columns, hasCheckboxColumn, selectedIds, setSelectedIds, className }: TableBodyProps) => {
  const language = useAppSelector(settingsSelectors.getLanguage);

  const rows = data.map((item) => {
    const values = getDataCellsValues(item, columns, language);
    const rowClassName = formatClassName(['table__row', { table__row_selected: selectedIds.includes(item.id) }]);

    const dataCells = values.map((value, index) => {
      return (
        <td key={`${item.id}_${index}`} className='table__cell'>
          {value}
        </td>
      );
    });

    return (
      <tr key={item.id} className={rowClassName}>
        {hasCheckboxColumn && <SelectRowCheckbox selectedIds={selectedIds} rowId={item.id} setSelectedIds={setSelectedIds} />}
        {dataCells}
      </tr>
    );
  });

  return <tbody className={className}>{rows}</tbody>;
};

export default TableBody;

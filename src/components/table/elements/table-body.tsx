import React from 'react';
import { TableColumnProps, TableDataItem, TableIdsProps } from 'types/table';
import SelectRowCheckbox from './select-row-checkbox';
import formatClassName from 'helpers/formatters/format-class-name';
import { getDataCellsValues } from '../helpers';

export type TableBodyProps = {
  data: TableDataItem[];
  columns: TableColumnProps[];
  hasCheckboxColumn: boolean;
  className?: string;
} & TableIdsProps;

function TableBody({ data, columns, hasCheckboxColumn, selectedIds, setSelectedIds, ...rest }: TableBodyProps): React.ReactElement {
  const rows = data.map((item) => {
    const values = getDataCellsValues(item, columns);
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

  return <tbody className={rest.className}>{rows}</tbody>;
}

export default TableBody;

import React from 'react';
import { TableColumnProps, TableDataItem } from 'types/table';
import SelectRowCheckbox from './select-row-checkbox';
import { getDataCellsValues } from './helpers';

import './styles.scss';

export type TableBodyProps = {
  data: TableDataItem[];
  columns: TableColumnProps[];
  hasCheckboxColumn: boolean;
  selectedIds: string[];
  setSelectedIds: (value: React.SetStateAction<string[]>) => void;
};

function TableBody({ data, columns, hasCheckboxColumn, selectedIds, setSelectedIds }: TableBodyProps): React.ReactElement {
  const rows = data.map((item) => {
    const values = getDataCellsValues(item, columns);

    const dataCells = values.map((value, index) => {
      return <td key={`${item.id}_${index}`}>{value}</td>;
    });

    return (
      <tr key={item.id}>
        {hasCheckboxColumn && <SelectRowCheckbox selectedIds={selectedIds} rowId={item.id} setSelectedIds={setSelectedIds} />}
        {dataCells}
      </tr>
    );
  });

  return <tbody>{rows}</tbody>;
}

export default TableBody;

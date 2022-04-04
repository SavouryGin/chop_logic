import React from 'react';
import Checkbox from 'components/inputs/checkbox';
import { Guid } from 'guid-typescript';
import { TableIdsProps } from 'types/table';

type SelectAllCheckboxProps = {
  allRowIds: string[];
} & TableIdsProps;

function SelectAllCheckbox({ selectedIds, setSelectedIds, allRowIds }: SelectAllCheckboxProps): React.ReactElement {
  const tableId = Guid.create().toString();
  const onChangeSelectAllCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    if (checked) {
      setSelectedIds(allRowIds);
    } else {
      setSelectedIds([]);
    }
  };

  return (
    <th>
      <Checkbox
        name={`select_all_in_${tableId}`}
        id={`select_all_in_${tableId}`}
        getCheckboxEvent={onChangeSelectAllCheckbox}
        setCheckboxValue={selectedIds.length === allRowIds.length}
        className={'table__checkbox'}
      />
    </th>
  );
}

export default SelectAllCheckbox;

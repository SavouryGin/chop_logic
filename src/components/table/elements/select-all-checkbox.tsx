import Checkbox from 'components/controls/checkbox';
import React from 'react';
import { Guid } from 'guid-typescript';
import { TableIdsProps } from 'types';

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
    <th className='table__cell'>
      <Checkbox
        name={`select_all_in_${tableId}`}
        id={`select_all_in_${tableId}`}
        getCheckboxEvent={onChangeSelectAllCheckbox}
        setCheckboxValue={selectedIds.length === allRowIds.length && allRowIds.length !== 0}
        className={'table__checkbox'}
        isDisabled={allRowIds.length < 1}
      />
    </th>
  );
}

export default SelectAllCheckbox;

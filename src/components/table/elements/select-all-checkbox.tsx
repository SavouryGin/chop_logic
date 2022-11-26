import Checkbox from 'components/controls/checkbox';
import React, { useMemo } from 'react';
import { SelectAllCheckboxProps } from 'types';

const SelectAllCheckbox = ({ selectedIds, setSelectedIds, allRowIds, tableId }: SelectAllCheckboxProps): React.ReactElement => {
  const id = useMemo(() => `select_all_in_${tableId}`, [tableId]);

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
        name={id}
        id={id}
        getCheckboxEvent={onChangeSelectAllCheckbox}
        setCheckboxValue={selectedIds.length === allRowIds.length && allRowIds.length !== 0}
        className={'table__checkbox'}
        isDisabled={allRowIds.length < 1}
      />
    </th>
  );
};

export default SelectAllCheckbox;

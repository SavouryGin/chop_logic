import Checkbox from 'components/controls/checkbox';
import React from 'react';
import { SelectRowCheckboxProps } from 'types';

const SelectRowCheckbox = ({ rowId, selectedIds, setSelectedIds }: SelectRowCheckboxProps) => {
  const onChangeRowCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, id } = e.target;
    if (checked) {
      setSelectedIds([...selectedIds, id]);
    } else {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    }
  };

  return (
    <td className='table__cell'>
      <Checkbox
        name={rowId}
        id={rowId}
        getCheckboxEvent={onChangeRowCheckbox}
        setCheckboxValue={selectedIds.includes(rowId)}
        className={'table__checkbox'}
      />
    </td>
  );
};

export default SelectRowCheckbox;

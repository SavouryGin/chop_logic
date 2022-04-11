import React from 'react';
import Checkbox from 'components/inputs/checkbox';
import { TableIdsProps } from 'types';

export type SelectRowCheckboxProps = {
  rowId: string;
} & TableIdsProps;

function SelectRowCheckbox({ rowId, selectedIds, setSelectedIds }: SelectRowCheckboxProps): React.ReactElement {
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
}

export default SelectRowCheckbox;

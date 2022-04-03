import React from 'react';
import Checkbox from 'components/inputs/checkbox';

import './styles.scss';

export type SelectRowCheckboxProps = {
  rowId: string;
  selectedIds: string[];
  setSelectedIds: (value: React.SetStateAction<string[]>) => void;
};

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
    <td>
      <Checkbox name={rowId} id={rowId} getCheckboxEvent={onChangeRowCheckbox} setCheckboxValue={selectedIds.includes(rowId)} />
    </td>
  );
}

export default SelectRowCheckbox;

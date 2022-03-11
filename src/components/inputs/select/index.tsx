import React, { useState } from 'react';
import formatClassName from 'helpers/formatters/format-class-name';
import { ComponentProps, SelectEntity } from 'types';
import { Guid } from 'guid-typescript';
import { settingsSelectors } from 'store/settings/selectors';
import { useAppSelector } from 'store/hooks';
import Label from '../label';

import './styles.scss';
import { Icon } from 'enums';

export type SelectProps = ComponentProps & {
  name: string;
  label: string;
  options: SelectEntity[];
  defaultOption?: SelectEntity;
  isRequired?: boolean;
  isDisabled?: boolean;
  size?: number;
  formId?: string;
};

function Select(props: SelectProps): React.ReactElement {
  const { options, className, id, name, label, defaultOption } = props;
  const inputId = id || Guid.create().toString();
  const isDarkMode = useAppSelector(settingsSelectors.getIsDarkMode);
  const wrapperClassNames = formatClassName(['select', className, { select_required: !!props.isRequired, select_dark: isDarkMode }]);
  const selectClassNames = formatClassName(['select__field', { select__field_dark: isDarkMode }]);
  const labelClassNames = formatClassName(['select__label']);
  const [selectedValue, setSelectedValue] = useState(defaultOption);

  const optionList = options.map((item) => {
    const key = Guid.create().toString();
    return (
      <option value={item.value} key={key}>
        {item.option}
      </option>
    );
  });

  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = e.target.value;
    const selected = options.filter((item) => item.value.toString() === selectedOption);
    setSelectedValue(selected[0] || undefined);
  };

  return (
    <div className={wrapperClassNames}>
      <Label inputId={inputId} text={label} isRequired={props.isRequired} isDarkMode={isDarkMode} className={labelClassNames} />
      <select
        name={name}
        id={inputId}
        value={selectedValue?.value}
        size={props.size || 0}
        form={props.formId}
        disabled={props.isDisabled}
        required={props.isRequired}
        className={selectClassNames}
        onChange={onSelectChange}
        onSelect={(e) => console.log(e)}
      >
        {optionList}
      </select>
      {/* <span
        className={Icon.SelectDown}
        // onClick={() => {
        //   const select = document.getElementById(inputId) as HTMLSelectElement;
        //   select.size = 5;
        // }}
      ></span> */}
    </div>
  );
}

export default Select;

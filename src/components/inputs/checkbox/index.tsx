import React, { useState } from 'react';
import formatClassName from 'helpers/formatters/format-class-name';
import { ComponentProps } from 'types';
import { Guid } from 'guid-typescript';
import { settingsSelectors } from 'store/settings/selectors';
import { useAppSelector } from 'store/hooks';
import Label from '../label';

import './styles.scss';

export type CheckboxProps = ComponentProps & {
  name: string;
  label: string;
  defaultValue?: boolean;
  isDisabled?: boolean;
  isRequired?: boolean;
  isReadOnly?: boolean;
  onChange?: () => void;
  onBlur?: () => void;
};

function Checkbox(props: CheckboxProps): React.ReactElement {
  const { name, id, label, onChange, onBlur } = props;
  const isDarkMode = useAppSelector(settingsSelectors.getIsDarkMode);
  const [checkboxValue, setCheckboxValue] = useState(!!props.defaultValue || false);
  const inputId = id || Guid.create().toString();
  const checkboxClassNames = formatClassName([
    'checkbox-input',
    props.className,
    { 'checkbox-input_dark': isDarkMode, 'checkbox-input_disabled': !!props.isDisabled },
  ]);

  const onCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked;
    setCheckboxValue(value);
    if (onChange) onChange();
  };

  return (
    <div className={checkboxClassNames}>
      <Label text={label} inputId={inputId} isRequired={props.isRequired} isDarkMode={isDarkMode} />
      <input
        type='checkbox'
        id={inputId}
        name={name}
        disabled={props.isDisabled}
        readOnly={props.isReadOnly}
        onChange={onCheckboxChange}
        onBlur={onBlur}
        checked={checkboxValue}
      ></input>
    </div>
  );
}

export default Checkbox;

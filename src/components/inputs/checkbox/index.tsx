import React, { useState } from 'react';
import formatClassName from 'helpers/formatters/format-class-name';
import { ComponentProps } from 'types';
import { Guid } from 'guid-typescript';
import { settingsSelectors } from 'store/settings/selectors';
import { useAppSelector } from 'store/hooks';
import Label from '../label';

import './styles.scss';
import { Icon } from 'enums';

export type CheckboxProps = ComponentProps & {
  name: string;
  label: string;
  defaultValue?: boolean;
  isDisabled?: boolean;
  isRequired?: boolean;
  onChange?: () => void;
  onBlur?: () => void;
};

function Checkbox(props: CheckboxProps): React.ReactElement {
  const { name, id, label, onChange, onBlur } = props;
  const isDarkMode = useAppSelector(settingsSelectors.getIsDarkMode);
  const [isChecked, setIsChecked] = useState(!!props.defaultValue || false);
  const inputId = id || Guid.create().toString();
  const checkboxClassNames = formatClassName([
    'checkbox-input',
    props.className,
    { 'checkbox-input_dark': isDarkMode, 'checkbox-input_disabled': !!props.isDisabled },
  ]);
  const labelClassNames = formatClassName([
    'checkbox-input__label',
    { [Icon.Check]: isChecked, [Icon.Uncheck]: !isChecked, 'checkbox-input__label_dark': isDarkMode },
  ]);
  const inputClassNames = formatClassName(['checkbox-input__default', { 'checkbox-input__default_dark': isDarkMode }]);

  const onCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked;
    setIsChecked(value);
    if (onChange) onChange();
  };

  return (
    <div className={checkboxClassNames}>
      <input
        type='checkbox'
        id={inputId}
        name={name}
        className={inputClassNames}
        disabled={props.isDisabled}
        onChange={onCheckboxChange}
        onBlur={onBlur}
        checked={isChecked}
      ></input>
      <Label text={label} inputId={inputId} isRequired={props.isRequired} isDarkMode={isDarkMode} className={labelClassNames} />
    </div>
  );
}

export default Checkbox;

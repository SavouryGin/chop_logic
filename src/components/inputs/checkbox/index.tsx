import React, { useContext, useState } from 'react';
import formatClassName from 'helpers/formatters/format-class-name';
import { ComponentProps, InputHandlersProps } from 'types';
import { Guid } from 'guid-typescript';
import { settingsSelectors } from 'store/settings/selectors';
import { useAppSelector } from 'hooks';
import { Icon } from 'enums';
import { FormContext } from 'components/form';
import { soundPlayer } from 'helpers/sounds';
import Label from '../label';

import './styles.scss';

export type CheckboxProps = ComponentProps &
  InputHandlersProps & {
    name: string;
    label: string;
    defaultValue?: boolean;
    isDisabled?: boolean;
    isRequired?: boolean;
  };

function Checkbox(props: CheckboxProps): React.ReactElement {
  const { name, id, label, onChange } = props;
  const isDarkMode = useAppSelector(settingsSelectors.getIsDarkMode);
  const isSoundEnabled = useAppSelector(settingsSelectors.getIsSoundsEnabled);
  const [isChecked, setIsChecked] = useState(!!props.defaultValue || false);
  const inputId = id || Guid.create().toString();
  const formContext = useContext(FormContext);
  const { onChangeInput } = formContext;
  const checkboxClassNames = formatClassName(['checkbox-input', props.className, { 'checkbox-input_disabled': !!props.isDisabled }]);
  const labelClassNames = formatClassName([
    'checkbox-input__label',
    { [Icon.Check]: isChecked, [Icon.Uncheck]: !isChecked, 'checkbox-input__label_dark': isDarkMode },
  ]);
  const inputClassNames = formatClassName(['checkbox-input__default', { 'checkbox-input__default_dark': isDarkMode }]);

  const onCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeInput(e);
    const value = e.target.checked;
    setIsChecked(value);
    if (isSoundEnabled) soundPlayer.seatbelt.play();
    if (onChange) onChange(e);
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
        onBlur={props.onBlur}
        onFocus={props.onFocus}
        checked={isChecked}
      ></input>
      <Label text={label} inputId={inputId} isRequired={props.isRequired} isDarkMode={isDarkMode} className={labelClassNames} />
    </div>
  );
}

export default Checkbox;

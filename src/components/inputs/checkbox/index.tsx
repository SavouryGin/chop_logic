import React, { useContext, useEffect, useState } from 'react';
import formatClassName from 'helpers/formatters/format-class-name';
import { Guid } from 'guid-typescript';
import { ComponentProps, InputHandlersProps } from 'types';
import { settingsSelectors } from 'store/settings/selectors';
import { inputTexts } from 'assets/texts';
import { useAppSelector } from 'hooks';
import { Icon, InputID } from 'enums';
import { FormContext } from 'components/form';
import { soundPlayer } from 'helpers/sounds';
import Label from '../label';

import './styles.scss';

export type CheckboxProps = ComponentProps &
  InputHandlersProps & {
    name: string;
    inputId?: InputID;
    label?: string;
    defaultValue?: boolean;
    isDisabled?: boolean;
    isRequired?: boolean;
    getCheckboxEvent?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    setCheckboxValue?: boolean;
  };

function Checkbox({ name, onChange, getCheckboxEvent, setCheckboxValue, inputId, ...rest }: CheckboxProps): React.ReactElement {
  const formContext = useContext(FormContext);
  const { onChangeInput } = formContext;
  // Flags
  const isDarkMode = useAppSelector(settingsSelectors.getIsDarkMode);
  const isSoundEnabled = useAppSelector(settingsSelectors.getIsSoundsEnabled);
  const language = useAppSelector(settingsSelectors.getLanguage);
  // Values
  const [isChecked, setIsChecked] = useState(!!rest.defaultValue || false);
  const id = inputId ? `checkbox_id_${inputId}` : rest.id || Guid.create().toString();
  const labelText = inputId ? inputTexts[inputId].label[language] : rest.label;
  // Class names
  const checkboxClassNames = formatClassName(['checkbox-input', rest.className, { 'checkbox-input_disabled': !!rest.isDisabled }]);
  const inputClassNames = formatClassName(['checkbox-input__default', { 'checkbox-input__default_dark': isDarkMode }]);
  const labelClassNames = formatClassName([
    'checkbox-input__label',
    { [Icon.Check]: isChecked, [Icon.Uncheck]: !isChecked, 'checkbox-input__label_dark': isDarkMode },
  ]);

  const onCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked;
    setIsChecked(value);
    if (isSoundEnabled) soundPlayer.seatbelt.play();
    if (onChangeInput) onChangeInput(e);
    if (onChange) onChange();
    if (getCheckboxEvent) getCheckboxEvent(e);
  };

  useEffect(() => {
    if (typeof setCheckboxValue === 'boolean') {
      setIsChecked(setCheckboxValue);
    }
  }, [setCheckboxValue]);

  return (
    <div className={checkboxClassNames}>
      <input
        type='checkbox'
        id={id}
        name={name}
        className={inputClassNames}
        disabled={rest.isDisabled}
        checked={isChecked}
        onChange={onCheckboxChange}
        onBlur={rest.onBlur}
        onFocus={rest.onFocus}
      ></input>
      <Label text={labelText} id={id} isRequired={rest.isRequired} isDarkMode={isDarkMode} className={labelClassNames} />
    </div>
  );
}

export default Checkbox;

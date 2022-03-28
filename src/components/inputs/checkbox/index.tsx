import React, { useContext, useState } from 'react';
import formatClassName from 'helpers/formatters/format-class-name';
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
    inputId: InputID;
    label?: string;
    defaultValue?: boolean;
    isDisabled?: boolean;
    isRequired?: boolean;
  };

function Checkbox({ name, onChange, inputId, ...rest }: CheckboxProps): React.ReactElement {
  const formContext = useContext(FormContext);
  const { onChangeInput } = formContext;
  const isDarkMode = useAppSelector(settingsSelectors.getIsDarkMode);
  const isSoundEnabled = useAppSelector(settingsSelectors.getIsSoundsEnabled);
  const language = useAppSelector(settingsSelectors.getLanguage);
  const [isChecked, setIsChecked] = useState(!!rest.defaultValue || false);
  const id = rest.id || `checkbox_id_${inputId}`;
  const labelText = rest.label || inputTexts[inputId].label[language];
  const checkboxClassNames = formatClassName(['checkbox-input', rest.className, { 'checkbox-input_disabled': !!rest.isDisabled }]);
  const labelClassNames = formatClassName([
    'checkbox-input__label',
    { [Icon.Check]: isChecked, [Icon.Uncheck]: !isChecked, 'checkbox-input__label_dark': isDarkMode },
  ]);
  const inputClassNames = formatClassName(['checkbox-input__default', { 'checkbox-input__default_dark': isDarkMode }]);

  const onCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked;
    setIsChecked(value);
    if (isSoundEnabled) soundPlayer.seatbelt.play();
    if (onChangeInput) onChangeInput(e);
    if (onChange) onChange(e);
  };

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

import Label from '../label';
import React, { useContext, useEffect, useState } from 'react';
import formatClassName from 'helpers/formatters/format-class-name';
import { CheckboxProps } from 'types';
import { FormContext } from 'components/controls/form';
import { Guid } from 'guid-typescript';
import { Icon } from 'enums';
import { inputTexts } from 'texts';
import { settingsSelectors } from 'store/settings/selectors';
import { soundPlayer } from 'helpers/sounds';
import { useAppSelector } from 'hooks';
import './styles.scss';

const Checkbox = ({
  onChange,
  className,
  label,
  defaultValue,
  getCheckboxEvent,
  isDisabled,
  isRequired,
  setCheckboxValue,
  inputId,
  id,
  ...rest
}: CheckboxProps) => {
  const formContext = useContext(FormContext);
  const isDarkMode = useAppSelector(settingsSelectors.getIsDarkMode);
  const isSoundEnabled = useAppSelector(settingsSelectors.getIsSoundsEnabled);
  const language = useAppSelector(settingsSelectors.getLanguage);
  const [isChecked, setIsChecked] = useState(!!defaultValue || false);

  const { onChangeInput } = formContext;
  const calculatedId = inputId ? `checkbox_id_${inputId}` : id || Guid.create().toString();
  const labelText = inputId ? inputTexts[inputId].label[language] : label;
  const checkboxClassNames = formatClassName(['checkbox-input', className, { 'checkbox-input_disabled': !!isDisabled }]);
  const inputClassNames = formatClassName(['checkbox-input__default', { 'checkbox-input__default_dark': isDarkMode }]);
  const labelClassNames = formatClassName([
    'checkbox-input__label',
    { [Icon.Check]: isChecked, [Icon.Uncheck]: !isChecked, 'checkbox-input__label_dark': isDarkMode },
  ]);

  const onCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked;
    setIsChecked(value);
    if (isSoundEnabled) {
      soundPlayer.seatbelt.play();
    }
    if (onChangeInput) {
      onChangeInput(e);
    }
    if (onChange) {
      onChange();
    }
    if (getCheckboxEvent) {
      getCheckboxEvent(e);
    }
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
        id={calculatedId}
        className={inputClassNames}
        disabled={isDisabled}
        checked={isChecked}
        onChange={onCheckboxChange}
        {...rest}
      ></input>
      <Label text={labelText} id={calculatedId} isRequired={isRequired} isDarkMode={isDarkMode} className={labelClassNames} />
    </div>
  );
};

export default Checkbox;

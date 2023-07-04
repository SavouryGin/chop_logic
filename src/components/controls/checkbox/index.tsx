import Label from '../label';
import React, { memo, useContext, useEffect, useState } from 'react';
import formatClass from 'utils/formatters/format-class-name';
import { CheckboxProps } from 'types';
import { FormContext } from 'components/controls/form';
import { Icon } from 'enums';
import { inputTexts } from 'assets/texts';
import { settingsSelectors } from 'store/settings/selectors';
import { soundPlayer } from 'utils/sounds';
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
}: CheckboxProps): React.ReactElement => {
  const formContext = useContext(FormContext);
  const isDarkMode = useAppSelector(settingsSelectors.isDarkMode);
  const isSoundEnabled = useAppSelector(settingsSelectors.isSoundsEnabled);
  const language = useAppSelector(settingsSelectors.language);
  const [isChecked, setIsChecked] = useState(!!defaultValue || false);

  const { onChangeInput } = formContext;
  const calculatedId = inputId ? `checkbox_id_${inputId}` : id || crypto.randomUUID();
  const labelText = inputId ? inputTexts[inputId].label[language] : label;
  const checkboxClassNames = formatClass(['checkbox-input', className, { 'checkbox-input_disabled': !!isDisabled }]);
  const inputClassNames = formatClass(['checkbox-input__default', { 'checkbox-input__default_dark': isDarkMode }]);
  const labelClassNames = formatClass([
    'checkbox-input__label',
    { [Icon.Check]: isChecked, [Icon.Uncheck]: !isChecked, 'checkbox-input__label_dark': isDarkMode },
  ]);

  const onCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked;
    setIsChecked(value);
    if (isSoundEnabled) {
      void soundPlayer.seatbelt.play();
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

export default memo(Checkbox);

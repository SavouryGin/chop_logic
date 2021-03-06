import Label from '../label';
import React, { memo, useContext, useState } from 'react';
import formatClassName from 'helpers/formatters/format-class-name';
import { FormContext } from 'components/controls/form';
import { TextInputProps } from 'types';
import { inputTexts } from 'texts';
import { settingsSelectors } from 'store/settings/selectors';
import { soundPlayer } from 'helpers/sounds';
import { useAppSelector } from 'hooks';
import './styles.scss';

const TextInput = ({
  inputId,
  onChange,
  isDisabled,
  isInvalid,
  className,
  isReadOnly,
  isRequired,
  isAutocomplete,
  id,
  label,
  placeholder,
  defaultValue,
  ...rest
}: TextInputProps) => {
  const isDarkMode = useAppSelector(settingsSelectors.getIsDarkMode);
  const isSoundEnabled = useAppSelector(settingsSelectors.getIsSoundsEnabled);
  const language = useAppSelector(settingsSelectors.getLanguage);
  const formContext = useContext(FormContext);
  const { onChangeInput } = formContext;
  const inputClassNames = formatClassName([
    className,
    'text-input',
    {
      'text-input_dark': isDarkMode,
      'text-input_invalid': !!isInvalid,
      'text-input_invalid_dark': !!isInvalid && isDarkMode,
      'text-input_disabled': !!isDisabled,
    },
  ]);
  const fieldClassNames = formatClassName(['text-input__field', { 'text-input__field_dark': isDarkMode }]);
  const calculatedId = id || `text_input_id_${inputId}`;
  const labelText = label || inputTexts[inputId].label[language];
  const placeholderText = placeholder || inputTexts[inputId]?.placeholder?.[language];
  const inputDefaultValue = defaultValue || inputTexts[inputId]?.defaultTextValue?.[language];
  const [inputValue, setInputValue] = useState(inputDefaultValue || '');

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value || '';
    setInputValue(value);
    if (isSoundEnabled) {
      soundPlayer.snap.play();
    }
    if (onChangeInput) {
      onChangeInput(e);
    }
    if (onChange) {
      onChange();
    }
  };

  return (
    <div className={inputClassNames}>
      <Label text={labelText} id={calculatedId} isRequired={isRequired} isDarkMode={isDarkMode} />
      <input
        type='text'
        id={calculatedId}
        value={inputValue}
        onChange={onInputChange}
        placeholder={placeholderText}
        className={fieldClassNames}
        disabled={isDisabled}
        readOnly={isReadOnly}
        autoComplete={isAutocomplete ? 'on' : 'off'}
        {...rest}
      />
    </div>
  );
};

export default memo(TextInput);

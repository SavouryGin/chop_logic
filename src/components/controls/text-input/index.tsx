import Label from '../label';
import React, { memo, useContext, useState } from 'react';
import formatClass from 'utils/formatters/format-class-name';
import { FormContext } from 'components/controls/form';
import { Icon } from 'enums';
import { TextInputProps } from 'types';
import { inputTexts } from 'utils/texts';
import { settingsSelectors } from 'store/settings/selectors';
import { soundPlayer } from 'utils/sounds';
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
}: TextInputProps): React.ReactElement => {
  const isDarkMode = useAppSelector(settingsSelectors.isDarkMode);
  const isSoundEnabled = useAppSelector(settingsSelectors.isSoundsEnabled);
  const language = useAppSelector(settingsSelectors.language);
  const formContext = useContext(FormContext);
  const { onChangeInput } = formContext;
  const calculatedId = id ?? `text_input_id_${inputId}`;
  const labelText = label ?? inputTexts[inputId].label[language];
  const placeholderText = placeholder ?? inputTexts[inputId]?.placeholder?.[language];
  const inputDefaultValue = defaultValue ?? inputTexts[inputId]?.defaultTextValue?.[language];
  const [inputValue, setInputValue] = useState(inputDefaultValue ?? '');
  const isClearButtonHidden = !inputValue?.length;
  const fieldClass = formatClass(['text-input__field', { 'text-input__field_dark': isDarkMode }]);
  const clearButtonClass = formatClass(['text-input__clear', Icon.Clear, { 'text-input__clear_hidden': isClearButtonHidden }]);
  const wrapperClass = formatClass([
    className,
    'text-input',
    {
      'text-input_dark': isDarkMode,
      'text-input_invalid': !!isInvalid,
      'text-input_invalid_dark': !!isInvalid && isDarkMode,
      'text-input_disabled': !!isDisabled,
    },
  ]);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value || '';
    setInputValue(value);
    if (isSoundEnabled) {
      void soundPlayer.snap.play();
    }
    if (onChangeInput) {
      onChangeInput(e);
    }
    if (onChange) {
      onChange();
    }
  };

  const handleClear = () => {
    setInputValue('');
  };

  return (
    <div className={wrapperClass}>
      <Label text={labelText} id={calculatedId} isRequired={isRequired} isDarkMode={isDarkMode} />
      <input
        type='text'
        id={calculatedId}
        value={inputValue}
        onChange={onInputChange}
        placeholder={placeholderText}
        className={fieldClass}
        disabled={isDisabled}
        readOnly={isReadOnly}
        autoComplete={isAutocomplete ? 'on' : 'off'}
        {...rest}
      />
      <button type='reset' onClick={handleClear} className={clearButtonClass}></button>
    </div>
  );
};

export default memo(TextInput);

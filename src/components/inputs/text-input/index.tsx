import React, { useContext, useState } from 'react';
import formatClassName from 'helpers/formatters/format-class-name';
import { InputID } from 'enums';
import { ComponentProps, InputHandlersProps } from 'types';
import { inputTexts } from 'assets/texts/ui-elements';
import { settingsSelectors } from 'store/settings/selectors';
import { useAppSelector } from 'hooks';
import { soundPlayer } from 'helpers/sounds';
import { FormContext } from 'components/form';
import Label from '../label';

import './styles.scss';

export type TextInputProps = ComponentProps &
  InputHandlersProps & {
    name: string;
    inputId: InputID;
    label?: string;
    defaultValue?: string;
    placeholder?: string;
    isDisabled?: boolean;
    isRequired?: boolean;
    isReadOnly?: boolean;
    isInvalid?: boolean;
    isAutocomplete?: boolean;
    maxLength?: number;
    minLength?: number;
    value?: string;
  };

function TextInput({ name, inputId, onChange, ...rest }: TextInputProps): React.ReactElement {
  const isDarkMode = useAppSelector(settingsSelectors.getIsDarkMode);
  const isSoundEnabled = useAppSelector(settingsSelectors.getIsSoundsEnabled);
  const formContext = useContext(FormContext);
  const { onChangeInput } = formContext;
  const language = useAppSelector(settingsSelectors.getLanguage);
  const inputClassNames = formatClassName([
    rest.className,
    'text-input',
    {
      'text-input_dark': isDarkMode,
      'text-input_invalid': !!rest.isInvalid,
      'text-input_invalid_dark': !!rest.isInvalid && isDarkMode,
      'text-input_disabled': !!rest.isDisabled,
    },
  ]);
  const fieldClassNames = formatClassName(['text-input__field', { 'text-input__field_dark': isDarkMode }]);
  const id = rest.id || `text_input_id_${inputId}`;
  const labelText = rest.label || inputTexts[inputId].label[language];
  const placeholderText = rest.placeholder || inputTexts[inputId].placeholder?.[language];
  const defaultValue = rest.defaultValue || inputTexts[inputId].defaultTextValue?.[language];
  const [inputValue, setInputValue] = useState(defaultValue || '');

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value || '';
    setInputValue(value);
    if (isSoundEnabled) soundPlayer.snap.play();
    if (onChangeInput) onChangeInput(e);
    if (onChange) onChange(e);
  };

  return (
    <div className={inputClassNames}>
      <Label text={labelText} id={id} isRequired={rest.isRequired} isDarkMode={isDarkMode} />
      <input
        type='text'
        name={name}
        id={id}
        value={inputValue}
        onChange={onInputChange}
        onBlur={rest.onBlur}
        onFocus={rest.onFocus}
        placeholder={placeholderText}
        className={fieldClassNames}
        disabled={rest.isDisabled}
        readOnly={rest.isReadOnly}
        maxLength={rest.maxLength}
        minLength={rest.minLength}
        autoComplete={rest.isAutocomplete ? 'on' : 'off'}
      />
    </div>
  );
}

export default TextInput;

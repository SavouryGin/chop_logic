import React, { useState } from 'react';
import formatClassName from 'helpers/formatters/format-class-name';
import { Guid } from 'guid-typescript';
import { ComponentProps, InputHandlersProps } from 'types';
import { settingsSelectors } from 'store/settings/selectors';
import { useAppSelector } from 'store/hooks';
import { soundPlayer } from 'helpers/sounds';
import Label from '../label';

import './styles.scss';

export type TextInputProps = ComponentProps &
  InputHandlersProps & {
    name: string;
    label: string;
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

function TextInput(props: TextInputProps): React.ReactElement {
  const { name, id, label, defaultValue, onChange } = props;
  const isDarkMode = useAppSelector(settingsSelectors.getIsDarkMode);
  const isSoundEnabled = useAppSelector(settingsSelectors.getIsSoundsEnabled);
  const [inputValue, setInputValue] = useState(defaultValue || '');
  const inputClassNames = formatClassName([
    props.className,
    'text-input',
    {
      'text-input_dark': isDarkMode,
      'text-input_invalid': !!props.isInvalid,
      'text-input_invalid_dark': !!props.isInvalid && isDarkMode,
      'text-input_disabled': !!props.isDisabled,
    },
  ]);
  const fieldClassNames = formatClassName(['text-input__field', { 'text-input__field_dark': isDarkMode }]);
  const inputId = id || Guid.create().toString();

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value || '';
    setInputValue(value);
    if (isSoundEnabled) soundPlayer.snap.play();
    if (onChange) onChange();
  };

  return (
    <div className={inputClassNames}>
      <Label text={label} inputId={inputId} isRequired={props.isRequired} isDarkMode={isDarkMode} />
      <input
        type='text'
        name={name}
        id={inputId}
        disabled={props.isDisabled}
        readOnly={props.isReadOnly}
        maxLength={props.maxLength}
        minLength={props.minLength}
        value={inputValue}
        onChange={onInputChange}
        onBlur={props.onBlur}
        onFocus={props.onFocus}
        placeholder={props.placeholder || 'Please type...'}
        className={fieldClassNames}
        autoComplete={props.isAutocomplete ? 'on' : 'off'}
      />
    </div>
  );
}

export default TextInput;

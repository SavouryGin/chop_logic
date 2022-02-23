import React, { useState } from 'react';
import formatClassName from 'helpers/formatters/format-class-name';
import { Guid } from 'guid-typescript';
import { ComponentProps } from 'types';
import { settingsSelectors } from 'store/settings/selectors';
import { useAppSelector } from 'store/hooks';
import Label from '../label';

import './styles.scss';

export type TextInputProps = ComponentProps & {
  name: string;
  label: string;
  defaultValue?: string;
  placeholder?: string;
  isDisabled?: boolean;
  isRequired?: boolean;
  isReadOnly?: boolean;
  maxLength?: number;
  minLength?: number;
  value?: string;
  onChange?: () => void;
  onBlur?: () => void;
};

function TextInput(props: TextInputProps): React.ReactElement {
  const { name, id, label, defaultValue, onChange, onBlur } = props;
  const isDarkMode = useAppSelector(settingsSelectors.getIsDarkMode);
  const [inputValue, setInputValue] = useState(defaultValue || '');
  const inputClassNames = formatClassName(['text-input', props.className, { 'text-input_dark': isDarkMode }]);
  const fieldClassNames = formatClassName(['text-input__field', { 'text-input__field_dark': isDarkMode }]);
  const inputId = id || Guid.create().toString();

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value || '';
    setInputValue(value);
    if (onChange) onChange();
  };

  return (
    <div className={inputClassNames}>
      <Label text={label} inputId={inputId} isRequired={props.isRequired} />
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
        onBlur={onBlur}
        placeholder={props.placeholder || 'Please type...'}
        className={fieldClassNames}
      />
    </div>
  );
}

export default TextInput;

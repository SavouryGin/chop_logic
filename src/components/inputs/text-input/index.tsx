import React, { useState } from 'react';
import formatClassName from 'helpers/formatters/format-class-name';
import { Guid } from 'guid-typescript';
import { ComponentProps } from 'types';

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
  const [inputValue, setInputValue] = useState(defaultValue || '');
  const inputClassNames = formatClassName(['text-input', props.className]);
  const inputId = id || Guid.create().toString();
  const labelContent = (
    <>
      {label}
      {props.isRequired && <abbr title='required'>*</abbr>}
    </>
  );

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value || '';
    setInputValue(value);
    if (onChange) onChange();
  };

  return (
    <div className={inputClassNames}>
      <label htmlFor={inputId}>{labelContent}</label>
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
      />
    </div>
  );
}

export default TextInput;

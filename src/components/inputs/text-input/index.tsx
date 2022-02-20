import React from 'react';
import formatClassName from 'helpers/formatters/format-class-name';
import { Guid } from 'guid-typescript';
import { ComponentProps } from 'types';

import './styles.scss';

export type TextInputProps = ComponentProps & {
  name: string;
  label: string;
  placeholder?: string;
  isDisabled?: boolean;
  isRequired?: boolean;
  maxLength?: number;
  minLength?: number;
  value?: string;
};

function TextInput(props: TextInputProps): React.ReactElement {
  const { name, id, isDisabled, label } = props;
  const inputClassNames = formatClassName(['text-input', props.className]);
  const inputId = id || Guid.create().toString();
  const labelContent = (
    <>
      {label}
      {props.isRequired && <abbr title='required'>*</abbr>}
    </>
  );

  return (
    <div className={inputClassNames}>
      <label htmlFor={inputId}>{labelContent}</label>
      <input
        type='text'
        name={name}
        id={inputId}
        disabled={isDisabled}
        maxLength={props.maxLength}
        minLength={props.minLength}
        value={props.value}
        placeholder={props.placeholder || 'Please type...'}
      />
    </div>
  );
}

export default TextInput;

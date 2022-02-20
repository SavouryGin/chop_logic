import React from 'react';
import formatClassName from 'helpers/formatters/format-class-name';
import { ComponentProps } from 'types';

import './styles.scss';

export type TextInputProps = ComponentProps & {
  name: string;
};

function TextInput(props: TextInputProps): React.ReactElement {
  const inputClassNames = formatClassName(['text-input', props.className]);

  return (
    <input name={props.name} id={props.id} className={inputClassNames}>
      Input
    </input>
  );
}

export default TextInput;

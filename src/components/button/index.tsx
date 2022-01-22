import React from 'react';
import formatClassName from 'helpers/formatters/format-class-name';
import { ClassNameProp } from 'types';

type ButtonProps = {
  type: 'button' | 'submit' | 'reset';
  text?: string;
  className?: ClassNameProp;
};

function Button(props: ButtonProps) {
  const { type, text, className } = props;
  return (
    <button type={type} className={formatClassName(['button', className])}>
      {text}
    </button>
  );
}

export default Button;

import React from 'react';
import formatClassName from 'helpers/formatters/format-class-name';
import { ClassNameProp } from 'types';
import { Icon } from 'enums';

export type ButtonProps = {
  type?: 'button' | 'submit' | 'reset';
  text?: string;
  className?: ClassNameProp;
  onClick?: () => void;
  icon?: Icon;
};

function Button(props: ButtonProps): React.ReactElement {
  const { type, text, className, onClick, icon } = props;
  return (
    <button type={type || 'button'} className={formatClassName(['button', icon, className])} onClick={onClick}>
      {text}
    </button>
  );
}

export default Button;

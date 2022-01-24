import React from 'react';
import formatClassName from 'helpers/formatters/format-class-name';
import { ClassNameProp } from 'types';
import { Icon } from 'enums';

import './styles.scss';

export type ButtonProps = {
  icon: Icon;
  text?: string;
  type?: 'button' | 'submit' | 'reset';
  className?: ClassNameProp;
  onClick?: () => void;
};

function Button(props: ButtonProps): React.ReactElement {
  const { type, text, className, onClick, icon } = props;
  return (
    <button type={type || 'button'} className={formatClassName(['button', className])} onClick={onClick}>
      <span className='button__shadow'></span>
      <span className='button__edge'></span>
      <span className={formatClassName(['button__front', icon])}>{text}</span>
    </button>
  );
}

export default Button;

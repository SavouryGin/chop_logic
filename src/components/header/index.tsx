import AppHeading from './elements/app-heading';
import LeftHeaderPanel from './elements/left-header-panel';
import React from 'react';
import RightHeaderPanel from './elements/right-header-panel';
import formatClassName from 'helpers/formatters/format-class-name';
import { CommonProps } from 'types';

import './styles.scss';

export type HeaderProps = CommonProps;

function Header({ className }: HeaderProps): React.ReactElement {
  return (
    <header className={formatClassName(['header', className])}>
      <LeftHeaderPanel />
      <AppHeading />
      <RightHeaderPanel />
    </header>
  );
}

export default Header;

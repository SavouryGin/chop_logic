import React from 'react';
import formatClassName from 'helpers/formatters/format-class-name';
import { ComponentProps } from 'types';
import RightHeaderPanel from './elements/right-header-panel';
import LeftHeaderPanel from './elements/left-header-panel';
import AppHeading from './elements/app-heading';

import './styles.scss';

export type HeaderProps = ComponentProps;

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

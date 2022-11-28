import AppHeading from './elements/app-heading';
import LeftHeaderPanel from './elements/left-header-panel';
import React from 'react';
import RightHeaderPanel from './elements/right-header-panel';
import formatClass from 'helpers/formatters/format-class-name';
import { CommonProps } from 'types';
import './styles.scss';

const Header = ({ className }: CommonProps): React.ReactElement => {
  return (
    <header className={formatClass(['header', className])}>
      <LeftHeaderPanel />
      <AppHeading />
      <RightHeaderPanel />
    </header>
  );
};

export default Header;

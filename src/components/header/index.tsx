import React from 'react';
import formatClassName from 'helpers/formatters/format-class-name';
import { NavLink } from 'react-router-dom';
import { ClassNameProp } from 'types';
import { paths } from 'components/app-router/paths';
import { Pages } from 'enums';
import RightHeaderPanel from './right-panel';
import LeftHeaderPanel from './left-panel';

import './styles.scss';

export type HeaderProps = {
  className?: ClassNameProp;
};

function Header(props: HeaderProps): React.ReactElement {
  return (
    <header className={formatClassName(['header', props.className])}>
      <div className='header__left-panel'>
        <LeftHeaderPanel />
      </div>
      <h1 className='header__heading'>
        <NavLink to={paths[Pages.Home]}>Chop Logic</NavLink>
      </h1>
      <div className='header__right-panel'>
        <RightHeaderPanel />
      </div>
    </header>
  );
}

export default Header;

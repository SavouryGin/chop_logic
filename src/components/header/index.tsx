import React from 'react';
import formatClassName from 'helpers/formatters/format-class-name';
import AppLink from 'components/app-link';
import RightHeaderPanel from 'components/header/right-panel';
import LeftHeaderPanel from 'components/header/left-panel';
import { ClassNameProp } from 'types';
import { paths } from 'components/app-router/paths';
import { Page } from 'enums';

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
        <AppLink path={paths[Page.Home]} text='Chop Logic' isNavigation />
      </h1>
      <div className='header__right-panel'>
        <RightHeaderPanel />
      </div>
    </header>
  );
}

export default Header;

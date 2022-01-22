import React from 'react';
import Button from 'components/button';
import { useAppDispatch } from 'store/hooks';
import { settingsActions } from 'store/settings/slice';
import formatClassName from 'helpers/formatters/format-class-name';
import { ClassNameProp } from 'types';
import { Icon } from 'enums';

import './styles.scss';

export type HeaderProps = {
  className?: ClassNameProp;
};

function Header(props: HeaderProps): React.ReactElement {
  const dispatch = useAppDispatch();
  const onClickMenuButton = () => {
    dispatch(settingsActions.toggleNavigation());
  };

  return (
    <header className={formatClassName(['header', props.className])}>
      <Button onClick={onClickMenuButton} className='header__menu' />
      <h1 className='header__text'>Chop Logic</h1>
    </header>
  );
}

export default Header;

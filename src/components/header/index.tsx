import React from 'react';
import { useAppDispatch } from 'store/hooks';
import { settingsActions } from 'store/settings/slice';
import formatClassName from 'helpers/formatters/format-class-name';
import { ClassNameProp } from 'types';

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
      <button type='button' onClick={onClickMenuButton}>
        Menu
      </button>
      <span>Header</span>
    </header>
  );
}

export default Header;

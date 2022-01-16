import React from 'react';
import { useAppDispatch } from 'store/hooks';
import { settingsActions } from 'store/settings/slice';
import formatClassName from 'helpers/formatters/format-class-name';

import './styles.scss';

export type HeaderProps = {
  className?: string;
};

function Header(props: HeaderProps): React.ReactElement {
  const dispatch = useAppDispatch();
  const onClickMenuButton = () => {
    dispatch(settingsActions.toggleNavigation());
  };

  return (
    <header className={formatClassName(['header', props.className])}>
      <span>Header</span>
      <button type='button' onClick={onClickMenuButton}>
        Menu
      </button>
    </header>
  );
}

export default Header;

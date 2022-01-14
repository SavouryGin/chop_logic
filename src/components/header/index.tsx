import React from 'react';
import { useAppDispatch } from 'store/hooks';
import { settingsActions } from 'store/settings/slice';

function Header(): React.ReactElement {
  const dispatch = useAppDispatch();
  const onClickMenuButton = () => {
    dispatch(settingsActions.toggleMenu());
  };

  return (
    <header className='header'>
      Header{' '}
      <button type='button' onClick={onClickMenuButton}>
        Menu
      </button>
    </header>
  );
}

export default Header;

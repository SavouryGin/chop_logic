import React from 'react';
import Button from 'components/button';
import { useAppDispatch } from 'store/hooks';
import { settingsActions } from 'store/settings/slice';
import formatClassName from 'helpers/formatters/format-class-name';
import { ClassNameProp } from 'types';
import { Icon } from 'enums';
import { getIsNavigationOpen } from 'store/settings/selectors';
import { useAppSelector } from 'store/hooks';

import './styles.scss';

export type HeaderProps = {
  className?: ClassNameProp;
};

function Header(props: HeaderProps): React.ReactElement {
  const dispatch = useAppDispatch();
  const isNavigationOpen = useAppSelector(getIsNavigationOpen);
  const onClickMenuButton = () => {
    dispatch(settingsActions.toggleNavigation());
  };

  return (
    <header className={formatClassName(['header', props.className])}>
      <div className='header__left-panel'>
        <Button onClick={onClickMenuButton} icon={isNavigationOpen ? Icon.Default : Icon.Menu} />
      </div>
      <h1 className='header__heading'>Chop Logic</h1>
      <div className='header__right-panel'>
        <Button icon={Icon.Enlarge} />
        <Button icon={Icon.Sound} />
        <Button icon={Icon.LightMode} />
      </div>
    </header>
  );
}

export default Header;

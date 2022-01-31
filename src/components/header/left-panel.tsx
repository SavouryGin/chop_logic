import React from 'react';
import Button from 'components/button';
import { Icon } from 'enums';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { settingsActions } from 'store/settings/slice';
import { settingsSelectors } from 'store/settings/selectors';

function LeftHeaderPanel() {
  const dispatch = useAppDispatch();
  const isNavigationOpen = useAppSelector(settingsSelectors.getIsNavigationOpened);
  const isDarkMode = useAppSelector(settingsSelectors.getIsDarkMode);
  const isSoundsEnabled = useAppSelector(settingsSelectors.getIsSoundsEnabled);

  const onClickMenuButton = () => {
    dispatch(settingsActions.toggleFlag('isNavigationOpen'));
  };

  const onClickModeButton = () => {
    dispatch(settingsActions.toggleFlag('isDarkMode'));
  };

  const onClickSoundsButton = () => {
    dispatch(settingsActions.toggleFlag('isSoundsEnabled'));
  };

  return (
    <>
      <Button onClick={onClickMenuButton} icon={isNavigationOpen ? Icon.Left : Icon.Menu} title='Navigation' />
      <Button onClick={onClickModeButton} icon={isDarkMode ? Icon.LightMode : Icon.DarkMode} title='Color theme' />
      <Button onClick={onClickSoundsButton} icon={isSoundsEnabled ? Icon.Sound : Icon.NoSound} title='Sounds' />
    </>
  );
}

export default LeftHeaderPanel;

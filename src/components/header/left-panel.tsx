import React from 'react';
import Button from 'components/button';
import { Icon } from 'enums';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { settingsActions } from 'store/settings/slice';
import { settingsSelectors } from 'store/settings/selectors';
import { soundPlayer } from 'helpers/sounds';

function LeftHeaderPanel(): React.ReactElement {
  const dispatch = useAppDispatch();
  const isNavigationOpen = useAppSelector(settingsSelectors.getIsNavigationOpened);
  const isDarkMode = useAppSelector(settingsSelectors.getIsDarkMode);
  const isSoundsEnabled = useAppSelector(settingsSelectors.getIsSoundsEnabled);

  const onClickMenuButton = () => {
    if (isNavigationOpen) {
      dispatch(settingsActions.toggleFlag('isMenuAnimationActive'));
      // wait for closing animation
      setTimeout(() => {
        dispatch(settingsActions.toggleFlag('isNavigationOpen'));
        dispatch(settingsActions.toggleFlag('isMenuAnimationActive'));
      }, 900);
    } else {
      dispatch(settingsActions.toggleFlag('isNavigationOpen'));
    }
  };

  const onClickModeButton = () => {
    dispatch(settingsActions.toggleFlag('isDarkMode'));
    console.log(soundPlayer.collect);
    soundPlayer.collect.play();
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

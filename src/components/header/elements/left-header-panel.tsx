import React from 'react';
import Button from 'components/button';
import { ButtonID, Icon } from 'enums';
import { useAppDispatch, useAppSelector } from 'hooks';
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
  };

  const onClickSoundsButton = () => {
    dispatch(settingsActions.toggleFlag('isSoundsEnabled'));
  };

  return (
    <div className='header__right-panel'>
      <Button
        buttonId={ButtonID.Navigation}
        onClick={onClickMenuButton}
        icon={isNavigationOpen ? Icon.Left : Icon.Menu}
        sound={soundPlayer.keyboard}
      />
      <Button
        buttonId={ButtonID.ColorTheme}
        onClick={onClickModeButton}
        icon={isDarkMode ? Icon.LightMode : Icon.DarkMode}
        sound={soundPlayer.keyboard}
      />
      <Button
        buttonId={ButtonID.Sounds}
        onClick={onClickSoundsButton}
        icon={isSoundsEnabled ? Icon.Sound : Icon.NoSound}
        sound={soundPlayer.keyboard}
      />
    </div>
  );
}

export default LeftHeaderPanel;

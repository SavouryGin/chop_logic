import Button from 'components/controls/button';
import React from 'react';
import { ButtonID, Icon } from 'enums';
import { settingsActions } from 'store/settings/slice';
import { settingsSelectors } from 'store/settings/selectors';
import { soundPlayer } from 'helpers/sounds';
import { useAppDispatch, useAppSelector } from 'hooks';

const LeftHeaderPanel = (): React.ReactElement => {
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
    <div className='header__left-panel'>
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
};

export default LeftHeaderPanel;

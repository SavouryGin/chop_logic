import AppSettings from 'components/app-settings';
import Button from 'components/controls/button';
import ModalWindow from 'components/modal-window';
import React, { useCallback } from 'react';
import { ButtonID, Icon } from 'enums';
import { settingsActions } from 'store/settings';
import { settingsSelectors } from 'store/settings/selectors';
import { soundPlayer } from 'helpers/sounds';
import { uiElementTexts } from 'texts';
import { useAppDispatch, useAppSelector, useEffectOnce } from 'hooks';

const RightHeaderPanel = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const isSidebarOpened = useAppSelector(settingsSelectors.isSidebarOpened);
  const isFullScreen = useAppSelector(settingsSelectors.isFullScreen);
  const isSettingOpened = useAppSelector(settingsSelectors.isSettingOpened);
  const language = useAppSelector(settingsSelectors.language);

  // Handlers
  const onClickSidebarButton = () => {
    dispatch(settingsActions.toggleFlag('isSidebarOpen'));
  };

  const onClickSettingButton = () => {
    dispatch(settingsActions.toggleFlag('isSettingOpen'));
  };

  const onClickFullScreenButton = () => {
    const isWindowInFullscreen = !!document.fullscreenElement;

    if (isWindowInFullscreen) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
      dispatch(settingsActions.setFullScreenFlag(false));
    } else {
      const body = document.body;
      const requestMethod = body?.requestFullscreen;
      if (requestMethod) {
        requestMethod.call(body);
      }
      dispatch(settingsActions.setFullScreenFlag(true));
    }
  };

  const escapeHandler = useCallback(() => {
    const isWindowInFullscreen = !!document.fullscreenElement;
    dispatch(settingsActions.setFullScreenFlag(isWindowInFullscreen));
  }, []);

  useEffectOnce(() => {
    document.addEventListener('fullscreenchange', escapeHandler, false);

    return () => {
      document.removeEventListener('fullscreenchange', escapeHandler, false);
    };
  });

  return (
    <div className='header__right-panel'>
      <Button
        buttonId={ButtonID.Tools}
        onClick={onClickSidebarButton}
        icon={isSidebarOpened ? Icon.Right : Icon.Sidebar}
        sound={soundPlayer.keyboard}
      />
      <Button
        buttonId={ButtonID.FullScreen}
        onClick={onClickFullScreenButton}
        icon={isFullScreen ? Icon.Shrink : Icon.Enlarge}
        sound={soundPlayer.keyboard}
      />
      <Button buttonId={ButtonID.Settings} onClick={onClickSettingButton} icon={Icon.Settings} sound={soundPlayer.slideClick} />
      <ModalWindow
        isOpened={isSettingOpened}
        onClose={onClickSettingButton}
        title={uiElementTexts.settings[language]}
        content={<AppSettings />}
      />
    </div>
  );
};

export default RightHeaderPanel;

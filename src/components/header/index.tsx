import AppLink from 'components/app-link';
import AppSettings from 'components/app-settings';
import Button from 'components/controls/button';
import ChopLogicLogo from 'components/logo';
import ModalWindow from 'components/modal-window';
import React, { useCallback } from 'react';
import formatClass from 'utils/formatters/format-class-name';
import { ButtonID, Icon, Page } from 'enums';
import { CommonProps } from 'types';
import { paths } from 'router/paths';
import { settingsActions } from 'store/settings';
import { settingsSelectors } from 'store/settings/selectors';
import { soundPlayer } from 'utils/sounds';
import { uiElementTexts } from 'texts';
import { useAppDispatch, useAppSelector, useEffectOnce } from 'hooks';
import './styles.scss';

const Header = ({ className }: CommonProps): React.ReactElement => {
  const dispatch = useAppDispatch();
  const isNavigationOpened = useAppSelector(settingsSelectors.isNavigationOpened);
  const isFullScreen = useAppSelector(settingsSelectors.isFullScreen);
  const isSettingsOpened = useAppSelector(settingsSelectors.isSettingsOpened);
  const language = useAppSelector(settingsSelectors.language);
  const isDarkMode = useAppSelector(settingsSelectors.isDarkMode);

  // Handlers

  const onClickMenuButton = () => {
    dispatch(settingsActions.setUpFlag({ flag: 'isNavigationOpened', value: !isNavigationOpened }));
  };

  const onClickSettingButton = () => {
    dispatch(settingsActions.toggleFlag('isSettingsOpened'));
  };

  const onClickFullScreenButton = () => {
    const isWindowInFullscreen = !!document.fullscreenElement;

    if (isWindowInFullscreen) {
      if (document.fullscreenElement) {
        void document.exitFullscreen();
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

  const onClickModeButton = () => {
    dispatch(settingsActions.toggleFlag('isDarkMode'));
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

  const leftPanel = (
    <div className='header__left-panel'>
      <Button
        buttonId={ButtonID.Navigation}
        onClick={onClickMenuButton}
        icon={isNavigationOpened ? Icon.Left : Icon.Menu}
        sound={soundPlayer.keyboard}
        view='flat'
      />
      <ChopLogicLogo />
      <h1 className='header__heading'>
        <AppLink path={paths[Page.Home]} text='Chop Logic' isNavigation />
      </h1>
    </div>
  );

  const rightPanel = (
    <div className='header__right-panel'>
      <Button
        buttonId={ButtonID.ColorTheme}
        onClick={onClickModeButton}
        icon={isDarkMode ? Icon.LightMode : Icon.DarkMode}
        sound={soundPlayer.keyboard}
        view='flat'
      />
      <Button
        buttonId={ButtonID.FullScreen}
        onClick={onClickFullScreenButton}
        view='flat'
        icon={isFullScreen ? Icon.Shrink : Icon.Enlarge}
        sound={soundPlayer.keyboard}
      />
      <Button buttonId={ButtonID.Settings} onClick={onClickSettingButton} view='flat' icon={Icon.Settings} sound={soundPlayer.slideClick} />
    </div>
  );

  return (
    <header className={formatClass(['header', className])}>
      {leftPanel}
      {rightPanel}
      <ModalWindow
        isOpened={isSettingsOpened}
        onClose={onClickSettingButton}
        title={uiElementTexts.settings[language]}
        content={<AppSettings />}
      />
    </header>
  );
};

export default Header;

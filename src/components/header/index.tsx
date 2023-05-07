import AppLink from 'components/app-link';
import AppSettings from 'components/app-settings';
import Button from 'components/controls/button';
import ModalWindow from 'components/modal-window';
import React, { useCallback } from 'react';
import formatClass from 'helpers/formatters/format-class-name';
import { ButtonID, Icon, Page } from 'enums';
import { CommonProps } from 'types';
import { paths } from 'router/paths';
import { settingsActions } from 'store/settings';
import { settingsSelectors } from 'store/settings/selectors';
import { soundPlayer } from 'helpers/sounds';
import { uiElementTexts } from 'texts';
import { useAppDispatch, useAppSelector, useEffectOnce } from 'hooks';
import './styles.scss';

const Header = ({ className }: CommonProps): React.ReactElement => {
  const dispatch = useAppDispatch();
  const isNavigationOpen = useAppSelector(settingsSelectors.isNavigationOpened);
  // const isSidebarOpened = useAppSelector(settingsSelectors.isSidebarOpened);
  const isFullScreen = useAppSelector(settingsSelectors.isFullScreen);
  const isSettingOpened = useAppSelector(settingsSelectors.isSettingOpened);
  const language = useAppSelector(settingsSelectors.language);
  const isDarkMode = useAppSelector(settingsSelectors.isDarkMode);

  // Handlers
  // const onClickSidebarButton = () => {
  //   dispatch(settingsActions.toggleFlag('isSidebarOpen'));
  // };

  const onClickMenuButton = () => {
    dispatch(settingsActions.toggleFlag('isNavigationOpen'));
  };

  const openMenuOnHover = () => {
    dispatch(settingsActions.setUpFlag({ flag: 'isNavigationOpen', value: true }));
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
        onMouseEnter={openMenuOnHover}
        icon={isNavigationOpen ? Icon.Left : Icon.Menu}
        sound={soundPlayer.keyboard}
        view='flat'
      />
    </div>
  );

  const heading = (
    <h1 className='header__heading'>
      <AppLink path={paths[Page.Home]} text='Chop Logic' isNavigation />
    </h1>
  );

  const rightPanel = (
    <div className='header__right-panel'>
      <Button
        buttonId={ButtonID.ColorTheme}
        onClick={onClickModeButton}
        icon={isDarkMode ? Icon.LightMode : Icon.DarkMode}
        sound={soundPlayer.keyboard}
      />
      {/* <Button
    buttonId={ButtonID.Tools}
    onClick={onClickSidebarButton}
    icon={isSidebarOpened ? Icon.Right : Icon.Sidebar}
    sound={soundPlayer.keyboard}
  /> */}
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

  return (
    <header className={formatClass(['header', className])}>
      {leftPanel}
      {heading}
      {rightPanel}
    </header>
  );
};

export default Header;

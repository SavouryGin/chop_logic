import React from 'react';
import Button from 'components/button';
import { Icon } from 'enums';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { settingsSelectors } from 'store/settings/selectors';
import { settingsActions } from 'store/settings/slice';

function RightHeaderPanel() {
  const dispatch = useAppDispatch();
  const isSidebarOpened = useAppSelector(settingsSelectors.getIsSidebarOpened);
  const isFullScreen = useAppSelector(settingsSelectors.getIsFullScreen);

  const onClickSidebarButton = () => {
    dispatch(settingsActions.toggleFlag('isSidebarOpen'));
  };

  const onClickSettingButton = () => {
    dispatch(settingsActions.toggleFlag('isSettingOpen'));
  };

  const onClickFullScreenButton = () => {
    dispatch(settingsActions.toggleFlag('isFullScreen'));
  };

  return (
    <>
      <Button onClick={onClickSettingButton} icon={Icon.Settings} />
      <Button onClick={onClickFullScreenButton} icon={isFullScreen ? Icon.Shrink : Icon.Enlarge} />
      <Button onClick={onClickSidebarButton} icon={isSidebarOpened ? Icon.Right : Icon.Left} />
    </>
  );
}

export default RightHeaderPanel;

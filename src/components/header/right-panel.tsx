import React from 'react';
import Button from 'components/button';
import { Icon } from 'enums';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { getIsSidebarOpen } from 'store/settings/selectors';
import { settingsActions } from 'store/settings/slice';

function RightHeaderPanel() {
  const dispatch = useAppDispatch();
  const isSidebarOpen = useAppSelector(getIsSidebarOpen);
  const onClickSidebarButton = () => {
    dispatch(settingsActions.toggleFlag('isSidebarOpen'));
  };
  return (
    <>
      <Button icon={Icon.Settings} />
      <Button icon={Icon.Enlarge} />
      <Button onClick={onClickSidebarButton} icon={isSidebarOpen ? Icon.Right : Icon.Left} />
    </>
  );
}

export default RightHeaderPanel;

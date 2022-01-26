import React from 'react';
import Button from 'components/button';
import { Icon } from 'enums';
import { useAppSelector } from 'store/hooks';
import { useAppDispatch } from 'store/hooks';
import { settingsActions } from 'store/settings/slice';
import { getIsNavigationOpen } from 'store/settings/selectors';

function LeftHeaderPanel() {
  const dispatch = useAppDispatch();
  const isNavigationOpen = useAppSelector(getIsNavigationOpen);
  const onClickMenuButton = () => {
    dispatch(settingsActions.toggleNavigation());
  };
  return (
    <>
      <Button onClick={onClickMenuButton} icon={isNavigationOpen ? Icon.Left : Icon.Right} />
      <Button icon={Icon.LightMode} />
      <Button icon={Icon.Sound} />
    </>
  );
}

export default LeftHeaderPanel;

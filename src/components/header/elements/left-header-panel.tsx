import Button from 'components/controls/button';
import React from 'react';
import { ButtonID, Icon } from 'enums';
import { settingsActions } from 'store/settings';
import { settingsSelectors } from 'store/settings/selectors';
import { soundPlayer } from 'helpers/sounds';
import { useAppDispatch, useAppSelector } from 'hooks';

const LeftHeaderPanel = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const isNavigationOpen = useAppSelector(settingsSelectors.isNavigationOpened);

  const onClickMenuButton = () => {
    dispatch(settingsActions.toggleFlag('isNavigationOpen'));
  };

  return (
    <div className='header__left-panel'>
      <Button
        buttonId={ButtonID.Navigation}
        onClick={onClickMenuButton}
        icon={isNavigationOpen ? Icon.Left : Icon.Menu}
        sound={soundPlayer.keyboard}
      />
    </div>
  );
};

export default LeftHeaderPanel;

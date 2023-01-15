import Button from 'components/controls/button';
import Portal from 'components/portal';
import React from 'react';
import { ButtonID, Icon } from 'enums';
import { settingsSelectors } from 'store/settings/selectors';
import { soundPlayer } from 'helpers/sounds';
import { uiElementTexts } from 'texts';
import { useAppSelector } from 'hooks';
import './styles.scss';

type ErrorPopupProps = {
  error: string | null;
  onClose: () => void;
};

const ErrorPopup = ({ error, onClose }: ErrorPopupProps): React.ReactElement | null => {
  const language = useAppSelector(settingsSelectors.getLanguage);
  if (!error) {
    return null;
  }

  const errorHeader = <header className='error-popup__header'>{uiElementTexts.errorPopup[language]}</header>;

  const errorText = <p className='error-popup__text'>{error}</p>;

  return (
    <Portal>
      <div className='error-popup'>
        <Button buttonId={ButtonID.Cancel} onClick={onClose} icon={Icon.Cancel} sound={soundPlayer.slideClick} size='small' />
        {errorHeader}
        {errorText}
      </div>
    </Portal>
  );
};

export default ErrorPopup;

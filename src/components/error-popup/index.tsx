import Button from 'components/controls/button';
import Portal from 'components/portal';
import React from 'react';
import formatClass from 'helpers/formatters/format-class-name';
import { ButtonID, Icon } from 'enums';
import { CommonProps } from 'types';
import { settingsSelectors } from 'store/settings/selectors';
import { soundPlayer } from 'helpers/sounds';
import { uiElementTexts } from 'texts';
import { useAppSelector, useMount } from 'hooks';
import './styles.scss';

type ErrorPopupProps = CommonProps & {
  error: string | null;
  onClose: () => void;
};

const ErrorPopup = ({ error, onClose, className }: ErrorPopupProps): React.ReactElement | null => {
  const language = useAppSelector(settingsSelectors.getLanguage);
  const isVisible = !!error && !!error.length;
  const isMounted = useMount(isVisible);
  const isDarkMode = useAppSelector(settingsSelectors.getIsDarkMode);

  if (!isMounted) {
    return null;
  }

  const isClosing = isMounted && !isVisible;
  const errorClass = formatClass(['error-popup', className, { 'error-popup_dark': isDarkMode, 'error-popup_closing': isClosing }]);
  const errorHeader = <header className='error-popup__header'>{uiElementTexts.errorPopup[language]}</header>;
  const errorText = <p className='error-popup__text'>{error}</p>;

  return (
    <Portal>
      <div className={errorClass}>
        <Button
          buttonId={ButtonID.Cancel}
          onClick={onClose}
          icon={Icon.Cancel}
          sound={soundPlayer.slideClick}
          size='small'
          className='error-popup__close-button'
        />
        {errorHeader}
        {errorText}
      </div>
    </Portal>
  );
};

export default ErrorPopup;

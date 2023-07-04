import Button from 'components/controls/button';
import Portal from 'components/portal';
import React from 'react';
import formatClass from 'utils/formatters/format-class-name';
import { ButtonID, Icon } from 'enums';
import { CommonProps, LocalText } from 'types';
import { settingsSelectors } from 'store/settings/selectors';
import { soundPlayer } from 'utils/sounds';
import { uiElementTexts } from 'assets/texts';
import { useAppSelector, useMount } from 'hooks';
import './styles.scss';

type ErrorPopupProps = CommonProps & {
  error: LocalText | null;
  onClose: () => void;
};

const ErrorPopup = ({ error, onClose, className }: ErrorPopupProps): React.ReactElement | null => {
  const language = useAppSelector(settingsSelectors.language);
  const isVisible = !!error;
  const isMounted = useMount(isVisible);
  const isDarkMode = useAppSelector(settingsSelectors.isDarkMode);

  if (!isMounted) {
    return null;
  }

  const isClosing = isMounted && !isVisible;
  const errorClass = formatClass(['error-popup', className, { 'error-popup_dark': isDarkMode, 'error-popup_closing': isClosing }]);
  const errorHeader = <h3 className='error-popup__header'>{uiElementTexts.errorPopup[language]}</h3>;
  const errorText = <p className='error-popup__text'>{error ? error[language] : 'Unknown error'}</p>;

  return (
    <Portal>
      <div className={errorClass}>
        <Button
          buttonId={ButtonID.Cancel}
          onClick={onClose}
          icon={Icon.Cancel}
          sound={soundPlayer.slideClick}
          view='small'
          className='error-popup__close-button'
        />
        {errorHeader}
        {errorText}
      </div>
    </Portal>
  );
};

export default ErrorPopup;

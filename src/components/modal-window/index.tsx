import ModalLayout from './elements/modal-layout';
import Portal from 'components/portal';
import React from 'react';
import formatClassName from 'helpers/formatters/format-class-name';
import { Browser } from 'enums';
import { ModalWindowProps } from 'types';
import { detectBrowser } from 'helpers/checkers';
import { settingsSelectors } from 'store/settings/selectors';
import { useAppSelector, useMount } from 'hooks';
import './styles.scss';

const ModalWindow = ({ isOpened, onClose, className, ...rest }: ModalWindowProps) => {
  const isMounted = useMount(isOpened);
  const isDarkMode = useAppSelector(settingsSelectors.getIsDarkMode);
  const isClosing = isMounted && !isOpened;

  if (!isMounted) {
    return null;
  }

  const browser = detectBrowser(navigator.userAgent);
  const contentClassNames = formatClassName([
    'modal-window__content',
    { 'modal-window__content_dark': isDarkMode, 'modal-window__content_for-firefox': browser === Browser.Firefox },
  ]);
  const backgroundClassNames = formatClassName([
    'modal-background',
    { 'modal-background_dark': isDarkMode, 'modal-background_closing': isClosing },
  ]);
  const windowClassNames = formatClassName([
    'modal-window',
    className,
    { 'modal-window_dark': isDarkMode, 'modal-window_closing': isClosing },
  ]);

  return (
    <Portal>
      <div className={backgroundClassNames}>
        <ModalLayout windowClassName={windowClassNames} contentClassName={contentClassNames} onClose={onClose} {...rest} />
      </div>
    </Portal>
  );
};

export default ModalWindow;

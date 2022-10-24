import ModalWindowContent from './elements/modal-window-contents';
import React from 'react';
import ReactDOM from 'react-dom';
import formatClassName from 'helpers/formatters/format-class-name';
import { Browser } from 'enums';
import { ModalWindowProps } from 'types';
import { detectBrowser } from 'helpers/checkers';
import { settingsSelectors } from 'store/settings/selectors';
import { useAppSelector } from 'hooks';
import './styles.scss';

const ModalWindow = ({ isOpened, onClose, className, ...rest }: ModalWindowProps) => {
  const targetElement = document.getElementById('modal');
  const isDarkMode = useAppSelector(settingsSelectors.getIsDarkMode);
  const browser = detectBrowser(navigator.userAgent);

  const contentClassNames = formatClassName([
    'modal-window__content',
    { 'modal-window__content_dark': isDarkMode, 'modal-window__content_for-firefox': browser === Browser.Firefox },
  ]);
  const backgroundClassNames = formatClassName(['modal-background', { 'modal-background_dark': isDarkMode }]);
  const windowClassNames = formatClassName(['modal-window', className, { 'modal-window_dark': isDarkMode }]);

  const onClickClose = () => {
    onClose();
  };

  const portal = (
    <div className={backgroundClassNames}>
      <ModalWindowContent windowClassNames={windowClassNames} contentClassNames={contentClassNames} onClickClose={onClickClose} {...rest} />
    </div>
  );

  return !isOpened || !targetElement ? null : ReactDOM.createPortal(portal, targetElement);
};

export default ModalWindow;

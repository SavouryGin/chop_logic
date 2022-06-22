import ModalWindowContent from './elements/modal-window-contents';
import React from 'react';
import ReactDOM from 'react-dom';
import formatClassName from 'helpers/formatters/format-class-name';
import { Browser } from 'enums';
import { ModalWindowProps } from 'types';
import { detectBrowser } from 'helpers/checkers/detect-browser';
import { settingsActions } from 'store/settings/slice';
import { settingsSelectors } from 'store/settings/selectors';
import { useAppDispatch, useAppSelector } from 'hooks';
import './styles.scss';

const ModalWindow = ({ isOpened, onClose, className, ...rest }: ModalWindowProps) => {
  const targetElement = document.getElementById('modal');
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector(settingsSelectors.getIsDarkMode);
  const isAnimationActive = useAppSelector(settingsSelectors.getIsModalWindowClosingAnimationActive);
  const browser = detectBrowser(navigator.userAgent);

  const contentClassNames = formatClassName([
    'modal-window__content',
    { 'modal-window__content_dark': isDarkMode, 'modal-window__content_for-firefox': browser === Browser.Firefox },
  ]);
  const backgroundClassNames = formatClassName([
    'modal-background',
    { 'modal-background_dark': isDarkMode, 'modal-background_closing': isAnimationActive },
  ]);
  const windowClassNames = formatClassName([
    'modal-window',
    className,
    { 'modal-window_dark': isDarkMode, 'modal-window_closing': isAnimationActive },
  ]);

  const onClickClose = () => {
    dispatch(settingsActions.toggleFlag('isModalWindowClosingAnimationActive'));
    // wait for closing CSS animation
    setTimeout(() => {
      onClose();
      dispatch(settingsActions.toggleFlag('isModalWindowClosingAnimationActive'));
    }, 900);
  };

  const portal = (
    <div className={backgroundClassNames}>
      <ModalWindowContent windowClassNames={windowClassNames} contentClassNames={contentClassNames} onClickClose={onClickClose} {...rest} />
    </div>
  );

  return !isOpened || !targetElement ? null : ReactDOM.createPortal(portal, targetElement);
};

export default ModalWindow;

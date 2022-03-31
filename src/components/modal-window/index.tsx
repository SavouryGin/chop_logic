import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'components/button';
import formatClassName from 'helpers/formatters/format-class-name';
import { ComponentProps } from 'types';
import { Icon, Browser, ButtonID } from 'enums';
import { settingsSelectors } from 'store/settings/selectors';
import { useAppDispatch, useAppSelector } from 'hooks';
import { soundPlayer } from 'helpers/sounds';
import { detectBrowser } from 'helpers/checkers/detect-browser';
import { settingsActions } from 'store/settings/slice';

import './styles.scss';

export type ModalWindowProps = ComponentProps & {
  isOpened: boolean;
  onClose: () => void;
  title: string;
  content?: React.ReactElement;
};

function ModalWindow({ isOpened, onClose, content, title, ...rest }: ModalWindowProps): React.ReactElement | null {
  const targetElement = document.getElementById('modal');
  if (!isOpened || !targetElement) return null;

  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector(settingsSelectors.getIsDarkMode);
  const isAnimationActive = useAppSelector(settingsSelectors.getIsModalWindowClosingAnimationActive);
  const browser = detectBrowser();

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
    rest.className,
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

  const window = (
    <div className={windowClassNames} role='dialog' aria-modal='true' id={rest.id}>
      <header className='modal-window__header' id='modal-window-heading'>
        {title}
        <Button buttonId={ButtonID.Cancel} onClick={onClickClose} icon={Icon.Cancel} sound={soundPlayer.slideClick} size='small' />
      </header>
      <div className={contentClassNames} role='region' aria-labelledby='modal-window-heading'>
        {content}
      </div>
    </div>
  );

  const portal = <div className={backgroundClassNames}>{window}</div>;

  return ReactDOM.createPortal(portal, targetElement);
}

export default ModalWindow;

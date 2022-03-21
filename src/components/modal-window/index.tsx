import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Button from 'components/button';
import formatClassName from 'helpers/formatters/format-class-name';
import { ComponentProps } from 'types';
import { Icon, Browser } from 'enums';
import { settingsSelectors } from 'store/settings/selectors';
import { useAppSelector } from 'store/hooks';
import { soundPlayer } from 'helpers/sounds';
import { detectBrowser } from 'helpers/checkers/detect-browser';

import './styles.scss';

export type ModalWindowProps = ComponentProps & {
  isOpened: boolean;
  onClose: () => void;
  title: string;
  content?: React.ReactElement;
};

function ModalWindow(props: ModalWindowProps): React.ReactElement | null {
  const { className, isOpened, onClose, content, title } = props;
  const targetElement = document.getElementById('modal');
  if (!isOpened || !targetElement) return null;
  const isDarkMode = useAppSelector(settingsSelectors.getIsDarkMode);
  const browser = detectBrowser();
  const contentClassNames = formatClassName([
    'modal-window__content',
    { 'modal-window__content_dark': isDarkMode, 'modal-window__content_for-firefox': browser === Browser.Firefox },
  ]);
  const [backgroundClassNames, setBackgroundClassNames] = useState(
    formatClassName(['modal-background', { 'modal-background_dark': isDarkMode }]),
  );
  const [windowClassNames, setWindowClassNames] = useState(
    formatClassName(['modal-window', className, { 'modal-window_dark': isDarkMode }]),
  );

  const handleClosingClassNames = () => {
    const windowToClose = `${windowClassNames} modal-window_closing`;
    const backgroundToFadeOut = `${backgroundClassNames} modal-background_closing`;
    setWindowClassNames(windowToClose);
    setBackgroundClassNames(backgroundToFadeOut);
  };

  const onClickClose = () => {
    handleClosingClassNames();
    // wait for closing CSS animation
    setTimeout(() => onClose(), 900);
  };

  const window = (
    <div className={windowClassNames} role='dialog' aria-modal='true' id={props.id}>
      <header className='modal-window__header' id='modal-window-heading'>
        {title}
        <Button
          onClick={onClickClose}
          icon={Icon.Cancel}
          title='Close'
          id='close-modal-window'
          sound={soundPlayer.slideClick}
          size={'small'}
        />
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

import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Button from 'components/button';
import formatClassName from 'helpers/formatters/format-class-name';
import { ComponentProps } from 'types';
import { Icon } from 'enums';
import { settingsSelectors } from 'store/settings/selectors';
import { useAppSelector } from 'store/hooks';

import './styles.scss';

export type ModalWindowProps = ComponentProps & {
  isOpened: boolean;
  onClose: () => void;
  title: string;
  onConfirm?: () => void;
  content?: React.ReactElement;
};

function ModalWindow(props: ModalWindowProps): React.ReactElement | null {
  const { className, isOpened, onClose, content, title, onConfirm } = props;
  const targetElement = document.getElementById('modal');
  if (!isOpened || !targetElement) return null;
  const isDarkMode = useAppSelector(settingsSelectors.getIsDarkMode);
  const contentClassNames = formatClassName(['modal-window__content', { 'modal-window__content_dark': isDarkMode }]);
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

  const onClickConfirm = () => {
    const handler = onConfirm || onClose;
    handleClosingClassNames();
    // wait for closing CSS animation
    setTimeout(() => handler(), 900);
  };

  const buttons = (
    <>
      <Button onClick={onClickClose} icon={Icon.Cancel} title='Close' id='close-modal-window' />
      {onConfirm && <Button onClick={onClickConfirm} icon={Icon.Default} title='Ok' />}
    </>
  );

  const window = (
    <div className={windowClassNames} role='dialog' aria-modal='true' id={props.id}>
      <header className='modal-window__header' id='modal-window-heading'>
        {title}
      </header>
      <div className={contentClassNames} role='region' aria-labelledby='modal-window-heading'>
        {content}
      </div>
      <footer className='modal-window__footer'>{buttons}</footer>
    </div>
  );

  const portal = <div className={backgroundClassNames}>{window}</div>;

  return ReactDOM.createPortal(portal, targetElement);
}

export default ModalWindow;

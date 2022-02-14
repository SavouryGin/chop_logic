import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import Button from 'components/button';
import formatClassName from 'helpers/formatters/format-class-name';
import { ClassNameProp } from 'types';
import { Icon } from 'enums';
import { settingsSelectors } from 'store/settings/selectors';
import { useAppSelector } from 'store/hooks';

import './styles.scss';

export type ModalWindowProps = {
  isOpened: boolean;
  onClose: () => void;
  title: string;
  onConfirm?: () => void;
  className?: ClassNameProp;
  content?: React.ReactElement;
};

function ModalWindow(props: ModalWindowProps): React.ReactElement | null {
  const { className, isOpened, onClose, content, title, onConfirm } = props;
  const targetElement = document.getElementById('modal');
  if (!isOpened || !targetElement) return null;
  const isDarkMode = useAppSelector(settingsSelectors.getIsDarkMode);
  const windowClassNames = formatClassName(['modal-window', className, { 'modal-window_dark': isDarkMode }]);
  const backgroundClassNames = formatClassName(['modal-background', { 'modal-background_dark': isDarkMode }]);

  const portal = (
    <div className={backgroundClassNames}>
      <div className={windowClassNames} role='dialog' aria-modal='true'>
        <header className='modal-window__header' id='modal-window-heading'>
          {title}
        </header>
        <div className='modal-window__content' role='region' aria-labelledby='modal-window-heading'>
          {content}
        </div>
        <footer className='modal-window__footer'>
          <Button onClick={onClose} icon={Icon.Cancel} title='Close' id='close-modal-window' />
          {onConfirm && <Button onClick={onConfirm} icon={Icon.Default} title='Ok' />}
        </footer>
      </div>
    </div>
  );

  return ReactDOM.createPortal(portal, targetElement);
}

export default ModalWindow;

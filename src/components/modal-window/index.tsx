import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'components/button';
import formatClassName from 'helpers/formatters/format-class-name';
import { ClassNameProp } from 'types';
import { Icon } from 'enums';

import './styles.scss';

export type ModalWindowProps = {
  isOpened: boolean;
  onClose: () => void;
  title: string;
  className?: ClassNameProp;
  content?: React.ReactElement;
};

function ModalWindow(props: ModalWindowProps): React.ReactElement | null {
  const { className, isOpened, onClose, content, title } = props;
  const targetNode = document.getElementById('modal');
  const isPortalVisible = isOpened && targetNode;
  const classNames = formatClassName(['modal-window', className]);

  const portal = (
    <div className='modal-background'>
      <div className={classNames} role='dialog'>
        <header className='modal-window__header'>{title}</header>
        <section className='modal-window__content'>{content}</section>
        <footer className='modal-window__footer'>
          <Button onClick={onClose} icon={Icon.Cancel} title='Close' />
        </footer>
      </div>
    </div>
  );

  return isPortalVisible ? ReactDOM.createPortal(portal, targetNode) : null;
}

export default ModalWindow;

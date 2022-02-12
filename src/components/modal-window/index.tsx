import React from 'react';
import ReactDOM from 'react-dom';
import formatClassName from 'helpers/formatters/format-class-name';
import { ClassNameProp } from 'types';

import './styles.scss';

export type ModalWindowProps = {
  isOpened: boolean;
  onClose: () => void;
  className?: ClassNameProp;
};

function ModalWindow(props: ModalWindowProps) {
  const { className, isOpened } = props;
  const targetNode = document.getElementById('modal');
  const isPortalVisible = isOpened && targetNode;

  const classNames = formatClassName(['modal-window', className]);

  const content = <div className={classNames}>Modal window</div>;

  return isPortalVisible ? ReactDOM.createPortal(content, targetNode) : null;
}

export default ModalWindow;

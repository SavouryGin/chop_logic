import Button from 'components/controls/button';
import FocusLock from 'react-focus-lock';
import React from 'react';
import { ButtonID, Icon } from 'enums';
import { soundPlayer } from 'utils/sounds';

type ModalLayoutProps = {
  windowClassName: string;
  contentClassName: string;
  title: string;
  onClose: () => void;
  id?: string;
  content?: React.ReactElement;
};

const ModalLayout = ({ windowClassName, contentClassName, title, id, onClose, content }: ModalLayoutProps): React.ReactElement => {
  return (
    <FocusLock>
      <div className={windowClassName} role='dialog' aria-modal='true' id={id}>
        <header className='modal-window__header' id='modal-window-heading'>
          {title}
          <Button buttonId={ButtonID.Cancel} onClick={onClose} icon={Icon.Cancel} sound={soundPlayer.slideClick} view='small' />
        </header>
        <div className={contentClassName} role='region' aria-labelledby='modal-window-heading'>
          {content}
        </div>
      </div>
    </FocusLock>
  );
};

export default ModalLayout;

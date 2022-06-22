import Button from 'components/controls/button';
import React from 'react';
import { ButtonID, Icon } from 'enums';
import { soundPlayer } from 'helpers/sounds';

type ModalWindowContentProps = {
  windowClassNames: string;
  contentClassNames: string;
  title: string;
  onClickClose: () => void;
  id?: string;
  content?: React.ReactElement;
};

const ModalWindowContent = ({ windowClassNames, contentClassNames, title, id, onClickClose, content }: ModalWindowContentProps) => {
  return (
    <div className={windowClassNames} role='dialog' aria-modal='true' id={id}>
      <header className='modal-window__header' id='modal-window-heading'>
        {title}
        <Button buttonId={ButtonID.Cancel} onClick={onClickClose} icon={Icon.Cancel} sound={soundPlayer.slideClick} size='small' />
      </header>
      <div className={contentClassNames} role='region' aria-labelledby='modal-window-heading'>
        {content}
      </div>
    </div>
  );
};

export default ModalWindowContent;

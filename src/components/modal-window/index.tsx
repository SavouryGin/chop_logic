import ModalLayout from './elements/modal-layout';
import Portal from 'components/portal';
import React from 'react';
import formatClass from 'utils/formatters/format-class-name';
import { ModalWindowProps } from 'types';
import { settingsSelectors } from 'store/settings/selectors';
import { useAppSelector, useMount } from 'hooks';
import './styles.scss';

const ModalWindow = ({ isOpened, onClose, className, ...rest }: ModalWindowProps): React.ReactElement | null => {
  const isMounted = useMount(isOpened);
  const isDarkMode = useAppSelector(settingsSelectors.isDarkMode);
  const isClosing = isMounted && !isOpened;

  if (!isMounted) {
    return null;
  }

  const contentClassNames = formatClass(['modal-window__content', { 'modal-window__content_dark': isDarkMode }]);
  const backgroundClassNames = formatClass([
    'modal-background',
    { 'modal-background_dark': isDarkMode, 'modal-background_closing': isClosing },
  ]);
  const windowClassNames = formatClass(['modal-window', className, { 'modal-window_dark': isDarkMode, 'modal-window_closing': isClosing }]);

  return (
    <Portal>
      <div className={backgroundClassNames}>
        <ModalLayout windowClassName={windowClassNames} contentClassName={contentClassNames} onClose={onClose} {...rest} />
      </div>
    </Portal>
  );
};

export default ModalWindow;

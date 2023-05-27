import React, { useCallback, useContext, useLayoutEffect, useRef, useState } from 'react';
import formatClass from 'helpers/formatters/format-class-name';
import { PopoverContext } from './context';
import { getPopoverCoords, mergeRef, useClickOutside, useFocusTrapping } from 'components/popover/helpers';
import { settingsSelectors } from 'store/settings/selectors';
import { useAppSelector } from 'hooks/common';
import './styles.scss';

export const PopoverContentInternal = ({ children }: { children: React.ReactNode }) => {
  const { triggerRect, preferredPosition, setIsShow } = useContext(PopoverContext);
  const isDarkMode = useAppSelector(settingsSelectors.isDarkMode);
  const popoverClass = formatClass(['popover', { popover_dark: isDarkMode }]);
  const ref = useRef<HTMLDialogElement>(null);
  const [coords, setCoords] = useState({
    left: 0,
    top: 0,
  });

  useLayoutEffect(() => {
    const element = ref.current;
    if (element == null) {
      return;
    }

    const rect = element.getBoundingClientRect();

    const coords = getPopoverCoords(triggerRect, rect, preferredPosition);
    setCoords(coords);
  }, []);

  const refFocusTrapping = useFocusTrapping();

  const dismiss = useCallback(() => {
    setIsShow(false);
  }, []);

  const refClickOutside = useClickOutside(dismiss);

  const mergedRef = mergeRef(ref, refFocusTrapping, refClickOutside);

  return (
    <dialog
      className={popoverClass}
      open={true}
      ref={mergedRef}
      style={{
        position: 'fixed',
        left: `${coords.left}px`,
        top: `${coords.top}px`,
        margin: 0,
      }}
    >
      {children}
    </dialog>
  );
};

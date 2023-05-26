import PopoverContext from './context';
import React, { useState } from 'react';

export type PopoverPosition = 'bottom-center' | 'bottom-left' | 'bottom-right';

export const DEFAULT_POPOVER_RECT = {
  left: 0,
  top: 0,
  width: 0,
  height: 0,
};

export type Rect = Pick<DOMRect, 'left' | 'top' | 'height' | 'width'>;

const Popover = ({ children, preferredPosition = 'bottom-center' }: { children: React.ReactNode; preferredPosition: PopoverPosition }) => {
  const [isShow, setIsShow] = useState(false);
  const [triggerRect, setTriggerRect] = useState(DEFAULT_POPOVER_RECT);

  const contextValue = {
    isShow,
    setIsShow,
    preferredPosition,
    triggerRect,
    setTriggerRect,
  };

  return <PopoverContext.Provider value={contextValue}>{children}</PopoverContext.Provider>;
};

export default Popover;

import React, { useState } from 'react';
import { PopoverClose } from './elements/close';
import { PopoverContent } from './elements/content';
import { PopoverContext } from './elements/context';
import { PopoverTrigger } from './elements/trigger';

export type PopoverPosition = 'bottom-center' | 'bottom-left' | 'bottom-right';

export const DEFAULT_POPOVER_RECT = {
  left: 0,
  top: 0,
  width: 0,
  height: 0,
};

export type Rect = Pick<DOMRect, 'left' | 'top' | 'height' | 'width'>;

function Popover({ children, preferredPosition = 'bottom-center' }: { children: React.ReactNode; preferredPosition: PopoverPosition }) {
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
}

Popover.Trigger = PopoverTrigger;
Popover.Content = PopoverContent;
Popover.Close = PopoverClose;

export default Popover;

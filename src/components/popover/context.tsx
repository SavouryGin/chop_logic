import React from 'react';
import { DEFAULT_POPOVER_RECT, PopoverPosition, Rect } from 'components/popover';

const PopoverContext = React.createContext<{
  isShow: boolean;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
  preferredPosition: PopoverPosition;
  triggerRect: Rect;
  setTriggerRect: React.Dispatch<React.SetStateAction<Rect>>;
}>({
  isShow: false,
  setIsShow: () => {
    throw new Error('PopoverContext setIsShow should be used under provider');
  },
  preferredPosition: 'bottom-center',
  triggerRect: DEFAULT_POPOVER_RECT,
  setTriggerRect: () => {
    throw new Error('PopoverContext setTriggerRect should be used under provider');
  },
});

export default PopoverContext;

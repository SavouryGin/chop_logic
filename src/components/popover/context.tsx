import React from 'react';

type Position = 'bottom-center' | 'bottom-left' | 'bottom-right';

const defaultRect = {
  left: 0,
  top: 0,
  width: 0,
  height: 0,
};

type Rect = Pick<DOMRect, 'left' | 'top' | 'height' | 'width'>;

const PopoverContext = React.createContext<{
  isShow: boolean;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
  preferredPosition: Position;
  triggerRect: Rect;
  setTriggerRect: React.Dispatch<React.SetStateAction<Rect>>;
}>({
  isShow: false,
  setIsShow: () => {
    throw new Error('PopoverContext setIsShow should be used under provider');
  },
  preferredPosition: 'bottom-center',
  triggerRect: defaultRect,
  setTriggerRect: () => {
    throw new Error('PopoverContext setTriggerRect should be used under provider');
  },
});

export default PopoverContext;

import React, { useContext, useRef } from 'react';
import { PopoverContext } from './context';

export const PopoverTrigger = ({ children }: { children: React.ReactElement }) => {
  const { setIsShow, setTriggerRect } = useContext(PopoverContext);

  const ref = useRef<HTMLElement>(null);

  const onClick = (e: MouseEvent) => {
    console.log(e);
    const element = ref.current;
    if (element == null) {
      return;
    }

    const rect = element.getBoundingClientRect();
    setTriggerRect(rect);
    setIsShow((isShow) => !isShow);
  };

  const childrenToTriggerPopover = React.cloneElement(children, {
    onClick, // TODO: we better merge the onClick
    ref, // TODO: we better merge the ref
  });

  return childrenToTriggerPopover;
};

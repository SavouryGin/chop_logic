import PopoverContext from './context';
import React, { useContext } from 'react';

const PopoverClose = ({ children }: { children: React.ReactElement }) => {
  const { setIsShow } = useContext(PopoverContext);
  const onClick = (e: MouseEvent) => {
    setIsShow(false);

    // popover will be gone
    // prevent this event triggering unexpected click
    e.stopPropagation();
  };
  const childrenToClosePopover = React.cloneElement(children, {
    onClick, // TODO: we better merge the onClick
  });

  return childrenToClosePopover;
};

export default PopoverClose;

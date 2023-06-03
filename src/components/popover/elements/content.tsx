import React, { useContext } from 'react';
import { PopoverContentInternal } from './content-internal';
import { PopoverContext } from './context';

export const PopoverContent = ({ children }: { children: React.ReactNode }) => {
  const { isShow } = useContext(PopoverContext);

  if (!isShow) {
    return null;
  }

  return <PopoverContentInternal>{children}</PopoverContentInternal>;
};

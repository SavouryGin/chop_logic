import ContentInternal from './content-internal';
import PopoverContext from './context';
import React, { useContext } from 'react';

const PopoverContent = ({ children }: { children: React.ReactNode }) => {
  const { isShow } = useContext(PopoverContext);

  if (!isShow) {
    return null;
  }

  return <ContentInternal>{children}</ContentInternal>;
};

export default PopoverContent;

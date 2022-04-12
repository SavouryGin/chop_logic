import React from 'react';
import { TabTitleProps } from 'types';

function TabTitle({ title, onSelect, tabId }: TabTitleProps): React.ReactElement {
  const onClickTab = (e: React.MouseEvent<HTMLHeadingElement>) => {
    e.stopPropagation();
    onSelect(tabId);
  };

  return (
    <h3 role='tab' id={tabId} onClick={onClickTab} className='tab-list__tab'>
      {title}
    </h3>
  );
}

export default TabTitle;

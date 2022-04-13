import React from 'react';
import formatClassName from 'helpers/formatters/format-class-name';
import { TabProps } from 'types';

function Tab({ title, onSelect, tabId, isActive }: TabProps): React.ReactElement {
  const classNames = formatClassName(['tab-list__tab', { 'tab-list__tab_active': isActive }]);

  const onClickTab = (e: React.MouseEvent<HTMLHeadingElement>) => {
    e.stopPropagation();
    onSelect(tabId);
  };

  return (
    <h3 role='tab' id={tabId} onClick={onClickTab} className={classNames}>
      {title}
    </h3>
  );
}

export default Tab;

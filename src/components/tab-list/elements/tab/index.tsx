import React from 'react';
import { TabProps } from 'types';

function Tab({ content, title, isActive, onSelect, tabId }: TabProps): React.ReactElement {
  const tabContent = (
    <section role='tabpanel' aria-labelledby={tabId}>
      {content}
    </section>
  );

  const onClickTab = (e: React.MouseEvent<HTMLHeadingElement>) => {
    e.stopPropagation();
    onSelect(tabId);
  };

  return (
    <>
      <h3 role='tab' id={tabId} onClick={onClickTab}>
        {title}
      </h3>
      {isActive && tabContent}
    </>
  );
}

export default Tab;

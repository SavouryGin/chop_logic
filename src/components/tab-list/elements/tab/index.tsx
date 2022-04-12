import React from 'react';
import { TabProps } from 'types';
import TabContent from '../tab-content';
import TabTitle from '../tab-title';

function Tab({ content, title, isActive, onSelect, tabId }: TabProps): React.ReactElement {
  return (
    <>
      <TabTitle title={title} onSelect={onSelect} tabId={tabId} />
      {isActive && <TabContent content={content} tabId={tabId} />}
    </>
  );
}

export default Tab;

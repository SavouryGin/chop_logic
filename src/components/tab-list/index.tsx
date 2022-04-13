import React, { useState } from 'react';
import formatClassName from 'helpers/formatters/format-class-name';
import { TabListProps } from 'types';
import { useAppSelector } from 'hooks';
import { settingsSelectors } from 'store/settings/selectors';
import Tab from './elements/tab';

import './styles.scss';
import TabTitle from './elements/tab-title';
import TabContent from './elements/tab-content';

function TabList({ tabs, defaultTabId, ...rest }: TabListProps): React.ReactElement {
  const isDarkMode = useAppSelector(settingsSelectors.getIsDarkMode);
  const mode = rest.mode || 'horizontal';
  const tabsClassNames = formatClassName([
    'tab-list',
    rest.className,
    { 'tab-list_dark': isDarkMode, 'tab-list_vertical': mode === 'vertical' },
  ]);
  const tabIds = tabs.map((item) => item.tabId);
  const defaultId = defaultTabId && tabIds.includes(defaultTabId) ? defaultTabId : tabIds[0];
  const [activeTab, setActiveTab] = useState(defaultId);

  const titles = tabs.map((item) => {
    const { tabId, tabTitle } = item;
    return <TabTitle key={tabId} title={tabTitle} onSelect={setActiveTab} tabId={tabId} />;
  });

  const tabContent = tabs.find((item) => item.tabId === activeTab)?.tabContent;

  return (
    <div className={tabsClassNames}>
      <div className='tab-list__tabs' role='tablist'>
        {titles}
      </div>
      {<TabContent content={tabContent} tabId={activeTab} />}
    </div>
  );
}

export default TabList;

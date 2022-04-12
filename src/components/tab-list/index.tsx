import React, { useState } from 'react';
import formatClassName from 'helpers/formatters/format-class-name';
import { TabListProps } from 'types';
import { useAppSelector } from 'hooks';
import { settingsSelectors } from 'store/settings/selectors';
import Tab from './elements/tab';

import './styles.scss';

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

  const tabItems = tabs.map((item) => {
    const { tabId, tabContent, tabTitle } = item;
    return (
      <Tab
        key={tabId}
        tabId={tabId}
        content={tabContent}
        title={tabTitle}
        isActive={activeTab === tabId}
        onSelect={() => setActiveTab(tabId)}
      />
    );
  });

  return (
    <div className={tabsClassNames} role='tablist'>
      {tabItems}
    </div>
  );
}

export default TabList;

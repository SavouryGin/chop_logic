import React, { useState } from 'react';
import formatClassName from 'helpers/formatters/format-class-name';
import { Guid } from 'guid-typescript';
import { TabListProps } from 'types';
import { useAppSelector } from 'hooks';
import { settingsSelectors } from 'store/settings/selectors';
import Tab from './elements/tab';

import './styles.scss';

function TabList({ tabs, ...rest }: TabListProps): React.ReactElement {
  const isDarkMode = useAppSelector(settingsSelectors.getIsDarkMode);
  const tabsClassNames = formatClassName(['tabs', rest.className, { tabs_dark: isDarkMode }]);
  const [activeTab, setActiveTab] = useState(rest.defaultTabId || tabs[0].tabId);

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

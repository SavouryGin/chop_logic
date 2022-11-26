import React, { useState } from 'react';
import Tab from './elements/tab';
import TabContent from './elements/tab-content';
import formatClass from 'helpers/formatters/format-class-name';
import { TabListProps } from 'types';
import { settingsSelectors } from 'store/settings/selectors';
import { useAppSelector } from 'hooks';
import './styles.scss';

const TabList = ({ tabs, defaultTabId, className, mode = 'horizontal' }: TabListProps): React.ReactElement => {
  const isDarkMode = useAppSelector(settingsSelectors.getIsDarkMode);
  const tabsClassNames = formatClass(['tab-list', className, { 'tab-list_dark': isDarkMode, 'tab-list_vertical': mode === 'vertical' }]);
  const tabIds = tabs.map((item) => item.tabId);
  const defaultId = defaultTabId && tabIds.includes(defaultTabId) ? defaultTabId : tabIds[0];
  const [activeTab, setActiveTab] = useState(defaultId);

  const titles = tabs.map((item) => {
    const { tabId, tabTitle } = item;

    return <Tab key={tabId} title={tabTitle} onSelect={setActiveTab} tabId={tabId} isActive={tabId === activeTab} />;
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
};

export default TabList;

import React from 'react';
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
  const tabItems = tabs.map((item) => {
    const id = item.tabId || Guid.create().toString();
    return <Tab key={id} tabId={id} content={item.tabContent} title={item.tabTitle} />;
  });

  return (
    <div className={tabsClassNames} role='tablist'>
      {tabItems}
    </div>
  );
}

export default TabList;

import React from 'react';
import formatClassName from 'helpers/formatters/format-class-name';
import { TabListProps } from 'types';
import { useAppSelector } from 'hooks';
import { settingsSelectors } from 'store/settings/selectors';
import Tab from './elements/tab';

import './styles.scss';

function TabList({ tabs, ...rest }: TabListProps): React.ReactElement {
  const isDarkMode = useAppSelector(settingsSelectors.getIsDarkMode);
  const tabsClassNames = formatClassName(['tabs', rest.className, { tabs_dark: isDarkMode }]);

  return (
    <div className={tabsClassNames}>
      <ol>
        {tabs.map((item) => (
          <Tab key={item.tabKey} content={item.tabContent} />
        ))}
      </ol>
    </div>
  );
}

export default TabList;

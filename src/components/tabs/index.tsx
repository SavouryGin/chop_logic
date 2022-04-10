import React from 'react';
import formatClassName from 'helpers/formatters/format-class-name';
import { ComponentProps } from 'types';
import { useAppSelector } from 'hooks';
import { settingsSelectors } from 'store/settings/selectors';

import './styles.scss';
import { ITab } from './elements/tab';

export type TabsProps = ComponentProps & {
  tabs: ITab[];
};

function Tabs({ tabs, ...rest }: TabsProps): React.ReactElement {
  const isDarkMode = useAppSelector(settingsSelectors.getIsDarkMode);
  const tabsClassNames = formatClassName(['tabs', rest.className, { tabs_dark: isDarkMode }]);

  return <div className={tabsClassNames}>{tabs.map((item) => item.content)}</div>;
}

export default Tabs;

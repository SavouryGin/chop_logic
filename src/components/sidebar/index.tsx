import React from 'react';
import formatClassName from 'helpers/formatters/format-class-name';
import { CommonProps } from 'types';
import { settingsSelectors } from 'store/settings/selectors';
import { useAppSelector, useMount } from 'hooks';
import './styles.scss';

const Sidebar = ({ className, isOpened }: CommonProps & { isOpened: boolean }): React.ReactElement | null => {
  const isMounted = useMount(isOpened);
  const isDarkMode = useAppSelector(settingsSelectors.getIsDarkMode);
  const isClosing = isMounted && !isOpened;
  if (!isMounted) {
    return null;
  }

  const sidebarClassNames = formatClassName(['sidebar', className, { sidebar_dark: isDarkMode, sidebar_closing: isClosing }]);

  return <aside className={sidebarClassNames}>Sidebar Sidebar Sidebar</aside>;
};

export default Sidebar;

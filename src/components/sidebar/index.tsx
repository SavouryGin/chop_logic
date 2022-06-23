import React from 'react';
import formatClassName from 'helpers/formatters/format-class-name';
import { CommonProps } from 'types';
import { settingsSelectors } from 'store/settings/selectors';
import { useAppSelector } from 'hooks';
import './styles.scss';

const Sidebar = ({ className }: CommonProps) => {
  const isClosingAnimationActive = useAppSelector(settingsSelectors.getIsSidebarAnimationActive);
  const sidebarClassNames = formatClassName(['sidebar', className, { sidebar_closing: isClosingAnimationActive }]);

  return <aside className={sidebarClassNames}>Sidebar Sidebar Sidebar</aside>;
};

export default Sidebar;

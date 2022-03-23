import React from 'react';
import formatClassName from 'helpers/formatters/format-class-name';
import { ComponentProps } from 'types';
import { useAppSelector } from 'hooks';
import { settingsSelectors } from 'store/settings/selectors';

import './styles.scss';

export type SidebarProps = ComponentProps;

function Sidebar(props: SidebarProps): React.ReactElement {
  const isClosingAnimationActive = useAppSelector(settingsSelectors.getIsSidebarAnimationActive);
  const sidebarClassNames = formatClassName(['sidebar', props.className, { sidebar_closing: isClosingAnimationActive }]);
  return <aside className={sidebarClassNames}>Sidebar</aside>;
}

export default Sidebar;

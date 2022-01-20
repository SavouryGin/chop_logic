import React from 'react';
import formatClassName from 'helpers/formatters/format-class-name';

import './styles.scss';

export type SidebarProps = {
  className?: string;
};

function Sidebar(props: SidebarProps): React.ReactElement {
  return <aside className={formatClassName(['sidebar', props.className])}>Sidebar</aside>;
}

export default Sidebar;

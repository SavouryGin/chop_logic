import React from 'react';
import formatClassName from 'helpers/formatters/format-class-name';
import { CommonProps } from 'types';
import './styles.scss';

const Sidebar = ({ className }: CommonProps) => {
  const sidebarClassNames = formatClassName(['sidebar', className]);

  return <aside className={sidebarClassNames}>Sidebar Sidebar Sidebar</aside>;
};

export default Sidebar;

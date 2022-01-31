import React from 'react';
import formatClassName from 'helpers/formatters/format-class-name';
import { Link, NavLink } from 'react-router-dom';
import { ClassNameProp } from 'types';
import { Icon } from 'enums';

import './styles.scss';

export type AppLinkProps = {
  path: string;
  text?: string;
  icon?: Icon;
  isNavigation?: boolean;
  className?: ClassNameProp;
};

function AppLink(props: AppLinkProps): React.ReactElement {
  const { path, text, isNavigation, className, icon } = props;

  const navLink = <NavLink to={path}>{text}</NavLink>;
  const link = <Link to={path}>{text}</Link>;
  return isNavigation ? (
    <span className={formatClassName(['app-link', icon, className])}>{navLink}</span>
  ) : (
    <span className={formatClassName(['app-link', icon, className])}>{link}</span>
  );
}

export default AppLink;

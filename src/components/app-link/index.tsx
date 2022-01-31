import React from 'react';
import formatClassName from 'helpers/formatters/format-class-name';
import { Link, NavLink } from 'react-router-dom';
import { ClassNameProp } from 'types';

import './styles.scss';

export type AppLinkProps = {
  path: string;
  text?: string;
  isNavigation?: boolean;
  className?: ClassNameProp;
};

function AppLink(props: AppLinkProps): React.ReactElement {
  const { path, text, isNavigation, className } = props;

  const navLink = <NavLink to={path}>{text}</NavLink>;
  const link = <Link to={path}>{text}</Link>;
  return isNavigation ? (
    <span className={formatClassName(['app-link', className])}>{navLink}</span>
  ) : (
    <span className={formatClassName(['app-link', className])}>{link}</span>
  );
}

export default AppLink;

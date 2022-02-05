import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from 'components/header';
import Footer from 'components/footer';
import Navigation from 'components/navigation';
import Sidebar from 'components/sidebar';
import { settingsSelectors } from 'store/settings/selectors';
import { useAppSelector } from 'store/hooks';

import './styles.scss';
import formatClassName from 'helpers/formatters/format-class-name';

function Layout(): React.ReactElement {
  const isNavigationOpen = useAppSelector(settingsSelectors.getIsNavigationOpened);
  const isSidebarOpen = useAppSelector(settingsSelectors.getIsSidebarOpened);
  const isDarkMode = useAppSelector(settingsSelectors.getIsDarkMode);

  const layoutClassNames = formatClassName(['layout', { layout_dark: isDarkMode }]);
  const navigationClassNames = formatClassName(['layout__navigation', { layout__navigation_dark: isDarkMode }]);
  const sidebarClassNames = formatClassName(['layout__sidebar', { layout__sidebar_dark: isDarkMode }]);
  const headerClassNames = formatClassName(['layout__header', { layout__header_dark: isDarkMode }]);
  const mainClassNames = formatClassName(['layout__main', { layout__main_dark: isDarkMode }]);
  const footerClassNames = 'layout__footer';

  return (
    <div className={layoutClassNames}>
      {isNavigationOpen && <Navigation className={navigationClassNames} />}
      {isSidebarOpen && <Sidebar className={sidebarClassNames} />}
      <Header className={headerClassNames} />
      <main className={mainClassNames}>
        <Outlet />
      </main>
      <Footer className={footerClassNames} />
    </div>
  );
}

export default Layout;

import Footer from 'components/footer';
import Header from 'components/header';
import Navigation from 'components/navigation';
import React from 'react';
import Sidebar from 'components/sidebar';
import formatClassName from 'helpers/formatters/format-class-name';
import { Outlet } from 'react-router-dom';
import { settingsSelectors } from 'store/settings/selectors';
import { useAppSelector } from 'hooks';

import './styles.scss';

function Layout(): React.ReactElement {
  // Store flags
  const isNavigationOpen = useAppSelector(settingsSelectors.getIsNavigationOpened);
  const isSidebarOpen = useAppSelector(settingsSelectors.getIsSidebarOpened);
  const isDarkMode = useAppSelector(settingsSelectors.getIsDarkMode);
  // Class names
  const layoutClassNames = formatClassName(['layout', { layout_dark: isDarkMode }]);
  const navigationClassNames = formatClassName(['layout__navigation', { layout__navigation_dark: isDarkMode }]);
  const sidebarClassNames = formatClassName(['layout__sidebar', { layout__sidebar_dark: isDarkMode }]);
  const headerClassNames = formatClassName(['layout__header', { layout__header_dark: isDarkMode }]);
  const mainClassNames = formatClassName(['layout__main', { layout__main_dark: isDarkMode }]);
  const footerClassNames = 'layout__footer';

  return (
    <div className={layoutClassNames} data-testid='layout'>
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

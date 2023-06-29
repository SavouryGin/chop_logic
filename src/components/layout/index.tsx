import Footer from 'components/footer';
import Header from 'components/header';
import Navigation from 'components/navigation';
import React from 'react';
import formatClass from 'helpers/formatters/format-class-name';
import { Outlet } from 'react-router-dom';
import { settingsSelectors } from 'store/settings/selectors';
import { useAppSelector } from 'hooks';
import './styles.scss';

const Layout = (): React.ReactElement => {
  // Store flags
  const isNavigationOpened = useAppSelector(settingsSelectors.isNavigationOpened);
  const isDarkMode = useAppSelector(settingsSelectors.isDarkMode);
  // Class names
  const layoutClassNames = formatClass(['layout', { layout_dark: isDarkMode }]);
  const headerClassNames = formatClass(['layout__header', { layout__header_dark: isDarkMode }]);
  const mainClassNames = formatClass(['layout__main', { layout__main_dark: isDarkMode }]);
  const footerClassNames = 'layout__footer';

  return (
    <div className={layoutClassNames} data-testid='layout'>
      <Navigation isOpened={isNavigationOpened} />
      <Header className={headerClassNames} />
      <main className={mainClassNames}>
        <Outlet />
      </main>
      <Footer className={footerClassNames} />
    </div>
  );
};

export default Layout;

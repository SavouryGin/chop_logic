import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from 'components/header';
import Footer from 'components/footer';
import Navigation from 'components/navigation';
import Sidebar from 'components/sidebar';
import { getIsNavigationOpen } from 'store/settings/selectors';
import { useAppSelector } from 'store/hooks';

import './styles.scss';

function Layout(): React.ReactElement {
  const isNavigationOpen = useAppSelector(getIsNavigationOpen);
  return (
    <div className='layout'>
      <Header className='layout__header' />
      {isNavigationOpen && <Navigation className='layout__navigation' />}
      <main className='layout__main'>
        <Outlet />
      </main>
      <Sidebar className='layout__sidebar' />
      <Footer className='layout__footer' />
    </div>
  );
}

export default Layout;

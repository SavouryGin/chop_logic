import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from 'components/header';
import Footer from 'components/footer';
import Menu from 'components/menu';
import { getIsMenuOpenStatus } from 'store/settings/selectors';
import { useAppSelector } from 'store/hooks';

import './styles.scss';

function Layout(): React.ReactElement {
  const isMenuOpen = useAppSelector(getIsMenuOpenStatus);
  return (
    <div className='layout'>
      <Header />
      {isMenuOpen && <Menu />}
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;

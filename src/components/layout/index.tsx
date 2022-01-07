import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from 'components/header';
import Footer from 'components/footer';
import Navigation from 'components/navigation';

import './styles.scss';

function Layout(): React.ReactElement {
  return (
    <div className='layout'>
      <Header />
      <Navigation />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;

import React from 'react';
import Header from 'components/header';
import Footer from 'components/footer';
import { Outlet, Link } from 'react-router-dom';

// type MainLayoutProps = {
//   component: React.FC;
//   children?: React.ReactNode;
// };

function MainLayout(): React.ReactElement {
  return (
    <div className='layout'>
      <Header />
      <Link to='/propositions'>Propositions</Link>
      <Outlet />
      <Footer />
    </div>
  );
}

export default MainLayout;

import React from 'react';
import Header from 'components/header';
import Footer from 'components/footer';

type MainLayoutProps = {
  component: React.ReactNode;
};

function MainLayout({ component }: MainLayoutProps): React.ReactElement {
  return (
    <div className='layout'>
      <Header />
      <main>{component}</main>
      <Footer />
    </div>
  );
}

export default MainLayout;

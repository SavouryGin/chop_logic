import React from 'react';
import Header from 'components/header';

type MainLayoutProps = {
  component: React.ReactNode;
};

function MainLayout({ component }: MainLayoutProps) {
  return (
    <div className='layout'>
      <Header />
      <main>{component}</main>
    </div>
  );
}

export default MainLayout;

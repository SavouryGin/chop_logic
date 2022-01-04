import React from 'react';

interface LayoutProps {
  children?: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className='layout'>
      <main>{children}</main>
    </div>
  );
}

export default Layout;

import React from 'react';
import Header from './Header';

type AppLayoutProps = {
  children: React.ReactNode;
};

function AppLayout({ children }: AppLayoutProps) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}

export default AppLayout;

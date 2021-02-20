import React, { useState } from 'react';
import Header from './Header';

type AppLayoutProps = {
  children: React.ReactNode;
};

function AppLayout({ children }: AppLayoutProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}

export default AppLayout;

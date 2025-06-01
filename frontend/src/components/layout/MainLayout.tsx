import Header from './Header';
import Footer from './Footer';
import React from 'react';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow px-4 py-6">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;

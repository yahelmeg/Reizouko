import React from 'react';
import Header from '../layout/Header.tsx';
import Footer from '../layout/Footer.tsx';
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

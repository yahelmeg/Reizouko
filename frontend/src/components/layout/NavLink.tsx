import React, { type ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface NavLinkProps {
  to: string;
  children: ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ to, children }) => {
  return (
    <Link to={to} className={'hover:underline'}>
      {children}
    </Link>
  );
};

export default NavLink;

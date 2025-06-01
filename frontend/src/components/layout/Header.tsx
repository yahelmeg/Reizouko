import React from 'react';
import NavLink from './NavLink'; // adjust path if needed
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white py-4 shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold tracking-wide">
          Reizouko
        </Link>
        <nav className="space-x-4">
          <NavLink to="/browse">Browse</NavLink>
          <NavLink to="/learn">Learn</NavLink>
          <NavLink to="/profile">Profile</NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;

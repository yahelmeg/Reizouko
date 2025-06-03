import React from 'react';
import NavLink from '../general/NavLink.tsx';
import { Link } from 'react-router-dom';
import { useSession } from '../../hooks/useSession.ts';
import { useNavigate } from 'react-router-dom';
import Button from '../general/Button.tsx';

const Header: React.FC = () => {
  const { loading, isAuthenticated, logoff } = useSession();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoff();
    navigate('/login');
  };
  return (
    <header className="bg-blue-600 text-white py-4 shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold tracking-wide">
          Reizouko
        </Link>

        <nav className="space-x-4 flex items-center">
          <NavLink to="/browse">Browse</NavLink>
          <NavLink to="/learn">Learn</NavLink>
          <NavLink to="/stats">Statistics</NavLink>

          {!loading && isAuthenticated && (
            <Button
              isLoading={false}
              onClick={handleLogout}
              className="text-white hover:underline focus:outline-none"
            >
              Logout
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;

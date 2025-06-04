import React, { useState } from 'react';
import NavLink from '../general/NavLink.tsx';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Button from '../general/Button.tsx';
import { logoff } from '../../services/auth.service.ts';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { userAtom, userSelector } from '../../atoms/userAtom.ts';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const resetUser = useResetRecoilState(userAtom);

  const user = useRecoilValue(userSelector);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logoff();
      resetUser();
      navigate('/login');
    } finally {
      setLoading(false);
    }
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

          {!loading && !!user && (
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

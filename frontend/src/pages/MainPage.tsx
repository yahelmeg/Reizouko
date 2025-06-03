import React from 'react';
import { useSession } from '../hooks/useSession';
import SectionTitle from '../components/general/SectionTitle.tsx';
import Button from '../components/general/Button.tsx';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/general/Loader.tsx';

const MainPage: React.FC = () => {
  const { user, loading, isAuthenticated } = useSession();
  const navigate = useNavigate();

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 text-center space-y-8">
      {isAuthenticated ? (
        <>
          <SectionTitle>Welcome back, {user?.username}!</SectionTitle>
          <p className="text-gray-700 text-xl font-medium mt-2">
            Ready to take the next step in your kanji journey?
          </p>

          <div className="flex justify-center flex-wrap gap-4 pt-6">
            <Button
              isLoading={false}
              onClick={() => navigate('/learn')}
              className="text-base text-white"
            >
              Go to Learn
            </Button>
            <Button
              isLoading={false}
              onClick={() => navigate('/browse')}
              className="text-base text-white"
            >
              Browse Kanji
            </Button>
          </div>
        </>
      ) : (
        <>
          <SectionTitle>Welcome to Reizouko</SectionTitle>
          <p className="text-gray-600 text-lg">
            Start learning JLPT kanji — sign up or log in to begin.
          </p>
          <div className="flex justify-center flex-wrap gap-4 pt-6">
            <Button
              isLoading={false}
              onClick={() => navigate('/login')}
              className="text-base text-white"
            >
              Login
            </Button>
            <Button
              isLoading={false}
              onClick={() => navigate('/register')}
              className="text-base text-white"
            >
              Sign Up
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default MainPage;

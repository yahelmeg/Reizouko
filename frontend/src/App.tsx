import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LearnPage from './pages/LearnPage';
import LearnLevelPage from './pages/LearnLevelPage';
import BrowsePage from './pages/BrowsePage';
import MainLayout from './components/layout/MainLayout';
import MainPage from './pages/MainPage.tsx';

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainLayout>
            <MainPage />
          </MainLayout>
        }
      />
      <Route
        path="/browse"
        element={
          <MainLayout>
            <BrowsePage />
          </MainLayout>
        }
      />
      <Route
        path="/learn"
        element={
          <MainLayout>
            <LearnPage />
          </MainLayout>
        }
      />
      <Route
        path="/learn/:level"
        element={
          <MainLayout>
            <LearnLevelPage />
          </MainLayout>
        }
      />
      <Route
        path="/login"
        element={
          <MainLayout>
            <LoginPage />
          </MainLayout>
        }
      />
      <Route
        path="/register"
        element={
          <MainLayout>
            <RegisterPage />
          </MainLayout>
        }
      />
    </Routes>
  );
}

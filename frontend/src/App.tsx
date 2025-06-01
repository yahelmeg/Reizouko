import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LearnPage from './pages/LearnPage';
import BrowsePage from './pages/BrowsePage';
import MainLayout from './components/layout/MainLayout';

export default function App() {
  return (
    <Routes>
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
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

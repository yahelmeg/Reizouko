import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage.tsx';
import RegisterPage from './pages/RegisterPage.tsx';
import LearnPage from './pages/LearnPage.tsx';
import BrowsePage from './pages/BrowsePage.tsx';

export default function App() {
  return (
    <Routes>
      <Route path="/browse" element={<BrowsePage />} />
      <Route path="/learn" element={<LearnPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

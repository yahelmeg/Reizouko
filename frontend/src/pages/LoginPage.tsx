import { useState } from 'react';
import Button from '../components/general/Button.tsx';
import { Link } from 'react-router-dom';
import AuthCard from '../components/auth/AuthCard.tsx';
import FormGroup from '../components/auth/FormGroup.tsx';
import { useAuth } from '../hooks/useAuth.ts';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await login(email, password);
      if (res) navigate('/');
    } catch (err) {
      console.error('Login error', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <AuthCard>
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        <div className="space-y-2">
          <FormGroup
            label="Email"
            type="email"
            placeholder="Email@exmaple.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormGroup
            label="Password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            isLoading={isLoading}
            className="w-full"
            onClick={handleLogin}
          >
            Login
          </Button>
          {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
        </div>
        <p className="mt-4 text-sm text-center text-gray-600">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="text-blue-500 hover:underline font-medium"
          >
            Register
          </Link>
        </p>
      </AuthCard>
    </div>
  );
};

export default LoginPage;

import { useState } from 'react';
import Button from '../components/general/Button.tsx';
import FormGroup from '../components/auth/FormGroup.tsx';
import AuthCard from '../components/auth/AuthCard.tsx';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.ts';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { register, error, isLoading } = useAuth();

  const handleRegister = async () => {
    try {
      const res = await register(username, email, password);
      if (res) navigate('/');
    } catch (err) {
      console.error('Login error', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <AuthCard>
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

        <div className="space-y-2">
          <FormGroup
            label="Username"
            type="text"
            placeholder="John Doe"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <FormGroup
            label="Email"
            type="email"
            placeholder="Email@example.com"
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
            onClick={handleRegister}
            className="w-full"
          >
            Register
          </Button>
          {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
        </div>

        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-blue-500 hover:underline font-medium"
          >
            Login
          </Link>
        </p>
      </AuthCard>
    </div>
  );
};

export default RegisterPage;

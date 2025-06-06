import { useState } from 'react';
import Button from '../components/general/Button.tsx';
import FormGroup from '../components/auth/FormGroup.tsx';
import AuthCard from '../components/auth/AuthCard.tsx';
import { Link, useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { userAtom } from '../atoms/userAtom.ts';
import { register } from '../services/auth.service.ts';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userAtom);

  const handleRegister = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await register(username, email, password);
      if (res) {
        setUser(res);
        navigate('/');
      }
    } catch (err: unknown) {
      setError('Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
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
            isLoading={loading}
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

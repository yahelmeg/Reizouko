import { useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import { Link } from 'react-router-dom';
import AuthCard from '../components/AuthCard';
import FormGroup from '../components/FormGroup';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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
          <Button isLoading={isLoading}>Login</Button>
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

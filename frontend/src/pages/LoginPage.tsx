import { useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        <div className="space-y-2">
          <div className="pb-4">
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Email
            </label>
            <Input
              type="email"
              placeholder="Email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="pb-4">
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Password
            </label>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
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
      </div>
    </div>
  );
};

export default LoginPage;

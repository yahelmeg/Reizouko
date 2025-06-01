import { useState } from 'react';
import Button from '../components/Button';
import FormGroup from '../components/FormGroup';
import AuthCard from '../components/AuthCard';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
          <Button isLoading={isLoading}>Register</Button>
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

import { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config.ts';

interface AuthResponse {
  access_token: string;
  user?: {
    id: number;
    email: string;
  };
}

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  // #todo: match errors handling with backend
  const login = async (
    email: string,
    password: string
  ): Promise<AuthResponse | undefined> => {
    try {
      setIsLoading(true);
      setError('');
      const url = `${API_BASE_URL}/login`;
      const response = await axios.post(url, { email, password });

      localStorage.setItem('token', response.data.access_token);
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const message =
          err.response?.data?.message ||
          'Invalid credentials. Please check your email and password.';
        setError(message);
        throw new Error(message);
      } else {
        setError('Unexpected error occurred');
        throw new Error('Unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    username: string,
    email: string,
    password: string
  ): Promise<AuthResponse | undefined> => {
    setIsLoading(true);
    setError('');
    try {
      const url = `${API_BASE_URL}/register`;
      const response = await axios.post(url, { username, email, password });
      localStorage.setItem('token', response.data.access_token);
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const message =
          err.response?.data?.message ||
          'Invalid credentials. Please check your email and password.';
        setError(message);
        throw new Error(message);
      } else {
        setError('Unexpected error occurred');
        throw new Error('Unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, login, register };
};

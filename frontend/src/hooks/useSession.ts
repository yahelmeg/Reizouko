import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config.ts';

interface User {
  id: number;
  username: string;
  email: string;
}

export const useSession = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const checkUser = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get(`${API_BASE_URL}/me`, {
          withCredentials: true,
        });
        setUser(response.data);
      } catch (err) {
        setUser(null);
        if (axios.isAxiosError(err)) {
          const message =
            err.response?.data?.detail || 'Failed to authenticate user.';
          setError(message);
        }
      } finally {
        setLoading(false);
      }
    };
    void checkUser();
  }, []);

  const logoff = async (): Promise<void> => {
    try {
      const url = `${API_BASE_URL}/logout`;
      await axios.post(url, {}, { withCredentials: true });
      setUser(null);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const message = err.response?.data?.detail || 'Failed to logout.';
        setError(message);
      }
    }
  };

  return { user, isAuthenticated: !!user, loading, logoff, error };
};

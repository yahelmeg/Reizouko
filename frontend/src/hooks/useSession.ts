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

  useEffect(() => {
    const checkUser = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_BASE_URL}/me`, {
          withCredentials: true,
        });
        setUser(response.data);
      } catch {
        setUser(null);
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
      console.error('Logoff error', err);
    }
  };

  return { user, isAuthenticated: !!user, loading, logoff };
};

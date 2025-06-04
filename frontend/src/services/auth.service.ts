import { API_BASE_URL } from '../config.ts';
import axios from 'axios';
import type { AuthResponse } from '../types/auth.ts';

export const login = async (
  email: string,
  password: string
): Promise<AuthResponse | undefined> => {
  try {
    const url = `${API_BASE_URL}/login`;
    const response = await axios.post(
      url,
      { email, password },
      { withCredentials: true }
    );

    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const message =
        err.response?.data?.detail ||
        'Invalid credentials. Please check your email and password.';
      throw new Error(message);
    } else {
      throw new Error('Unexpected error occurred');
    }
  }
};

export const register = async (
  username: string,
  email: string,
  password: string
): Promise<AuthResponse | undefined> => {
  try {
    const url = `${API_BASE_URL}/register`;
    const response = await axios.post(
      url,
      { username, email, password },
      { withCredentials: true }
    );
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const message =
        err.response?.data?.detail ||
        'Invalid credentials. Please check your email and password.';
      throw new Error(message);
    } else {
      throw new Error('Unexpected error occurred');
    }
  }
};

export const logoff = async (): Promise<void> => {
  try {
    const url = `${API_BASE_URL}/logout`;
    await axios.post(url, {}, { withCredentials: true });
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const message = err.response?.data?.detail || 'Failed to logout.';
      throw new Error(message);
    } else {
      throw new Error('Unexpected error occurred');
    }
  }
};

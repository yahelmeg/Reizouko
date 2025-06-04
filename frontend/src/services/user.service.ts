import { API_BASE_URL } from '../config.ts';
import axios from 'axios';
import type { AuthResponse } from '../types/auth.ts';

export const getLoggedInUser = async (): Promise<AuthResponse | undefined> => {
  try {
    const url = `${API_BASE_URL}/me`;
    const response = await axios.get<AuthResponse>(url, {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const message =
        err.response?.data?.detail || 'Failed to fetch authenticated user';
      throw new Error(message);
    } else {
      throw new Error('Unexpected error occurred');
    }
  }
};

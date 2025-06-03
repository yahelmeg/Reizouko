import axios from 'axios';
import { useState } from 'react';
import { API_BASE_URL } from '../config.ts';

export const useLearnKanji = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const learnKanji = async (kanjiId: number) => {
    setLoading(true);
    setError('');

    try {
      const url = `${API_BASE_URL}/user/me/kanji/${kanjiId}`;
      await axios.post(url, null, { withCredentials: true });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const message =
          err.response?.data?.detail || 'Could not mark Kanji as learned.';
        setError(message);
      } else {
        setError('Unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return { learnKanji, loading, error };
};

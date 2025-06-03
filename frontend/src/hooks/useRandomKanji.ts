import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import type { Kanji } from '../types/kanji';

export const useRandomKanji = (level: string) => {
  const [kanji, setKanji] = useState<Kanji | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchNextKanji = useCallback(async () => {
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await axios.get(
        `${API_BASE_URL}/jlpt_kanji/random?level=${level}`,
        {
          withCredentials: true,
        }
      );

      const backendKanji = response.data.kanji;
      if (backendKanji) {
        const transformed: Kanji = {
          character: backendKanji.kanji,
          meaning: backendKanji.meaning,
          kunyomi: backendKanji.kunyomi,
          onyomi: backendKanji.onyomi,
          jlptLevel: backendKanji.jlpt_level,
        };
        setKanji(transformed);
      } else {
        setKanji(null);
      }
      setMessage(response.data.message);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const message =
          err.response?.data?.detail ||
          'Failed to load kanji data. Please try again later.';
        setError(message);
      } else {
        setError('Unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  }, [level]);

  useEffect(() => {
    void fetchNextKanji();
  }, [fetchNextKanji]);

  return { kanji, message, loading, error, refetch: fetchNextKanji };
};

import { useState, useEffect, useCallback } from 'react';
import type { Kanji } from '../types/kanji';
import { getRandomKanjiByLevel } from '../services/kanji.query.ts';

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
      const { kanji, message } = await getRandomKanjiByLevel(level);
      setKanji(kanji);
      setMessage(message);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
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

import { useEffect, useState } from 'react';
import axios from 'axios';
import type { Kanji } from '../types/kanji';

export const useKanji = (level: string = '') => {
  const [kanjiData, setKanjiData] = useState<Kanji[] | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError('');
        const url = level
          ? `${import.meta.env.VITE_BACK_URL}/jlpt_kanji?level=${level}`
          : `${import.meta.env.VITE_BACK_URL}/jlpt_kanji`;
        const response = await axios.get<Kanji[]>(url);
        const transformed: Kanji[] = response.data.map((item: any) => ({
          character: item.kanji,
          meaning: item.meaning,
          kunyomi: item.kunyomi,
          onyomi: item.onyomi,
          jlptLevel: item.jlpt_level,
        }));
        setKanjiData(transformed);
      } catch (err) {
        setError('Failed to fetch kanji');
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [level]);

  return { kanjiData, loading, error };
};

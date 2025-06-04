import { useEffect, useState } from 'react';
import type { Kanji } from '../types/kanji';
import { useRecoilValue } from 'recoil';
import { isAuthenticated } from '../atoms/userAtom.ts';
import {
  getKanjiByLevel,
  getLearnedKanjiIds,
} from '../services/kanji.query.ts';

export const useKanji = (level: string, page: number) => {
  const [kanjiData, setKanjiData] = useState<Kanji[] | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState<number>(1);
  const isLoggedIn = useRecoilValue(isAuthenticated);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      setError('');

      try {
        const learnedSet = await getLearnedKanjiIds(isLoggedIn);
        const { kanji, totalPages } = await getKanjiByLevel(level, page);

        const finalKanji = kanji.map((k) => ({
          ...k,
          isLearned: learnedSet.has(k.id),
        }));

        setKanjiData(finalKanji);
        setTotalPages(totalPages);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message || 'Failed to load kanji.');
        } else {
          setError('An unknown error occurred.');
        }
      } finally {
        setLoading(false);
      }
    };

    void fetch();
  }, [page, level, isLoggedIn]);

  return {
    kanjiData,
    loading,
    error,
    page,
    totalPages,
  };
};

import { useEffect, useState } from 'react';
import { useSession } from './useSession';
import axios from 'axios';
import type { BackendKanji, Kanji } from '../types/kanji';
import { BROWSE_PAGE_SIZE, API_BASE_URL } from '../config.ts';

interface PaginatedResponse {
  data: BackendKanji[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}

export const useKanji = (level: string, page: number) => {
  const [kanjiData, setKanjiData] = useState<Kanji[] | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState<number>(1);
  const { isAuthenticated } = useSession();

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        setError('');
        const learnedSet = new Set<number>();
        if (isAuthenticated) {
          try {
            const learnedRes = await axios.get(
              `${API_BASE_URL}/user/me/kanji`,
              {
                withCredentials: true,
              }
            );
            learnedRes.data.forEach((kanji: { id: number }) =>
              learnedSet.add(kanji.id)
            );
          } catch (err) {
            console.warn('Could not fetch learned kanji:', err);
          }
        }
        const offset = page * BROWSE_PAGE_SIZE;
        const url = `${API_BASE_URL}/jlpt_kanji/level?level=${level}&offset=${offset}&limit=${BROWSE_PAGE_SIZE}`;
        const response = await axios.get<PaginatedResponse>(url, {
          withCredentials: true,
        });

        const transformed = response.data.data.map(
          (kanji: BackendKanji): Kanji => ({
            id: kanji.id,
            character: kanji.kanji,
            meaning: kanji.meaning,
            kunyomi: kanji.kunyomi,
            onyomi: kanji.onyomi,
            jlptLevel: kanji.jlpt_level,
            isLearned: learnedSet.has(kanji.id),
          })
        );
        setKanjiData(transformed.length > 0 ? transformed : []);
        setTotalPages(response.data.total_pages);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          const message =
            err.response?.data?.detail ||
            'Failed to load kanji data. Please try again later.';
          setError(message);
        } else {
          setError('Unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    void fetch();
  }, [page, level, isAuthenticated]);

  return {
    kanjiData,
    loading,
    error,
    page,
    totalPages,
  };
};

import { useEffect, useState } from 'react';
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

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        setError('');

        const offset = page * BROWSE_PAGE_SIZE;
        const url = `${API_BASE_URL}/jlpt_kanji/level?level=${level}&offset=${offset}&limit=${BROWSE_PAGE_SIZE}`;
        const response = await axios.get<PaginatedResponse>(url, {
          withCredentials: true,
        });

        const transformed = response.data.data.map(
          (item: BackendKanji): Kanji => ({
            character: item.kanji,
            meaning: item.meaning,
            kunyomi: item.kunyomi,
            onyomi: item.onyomi,
            jlptLevel: item.jlpt_level,
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
  }, [page, level]);

  return {
    kanjiData,
    loading,
    error,
    page,
    totalPages,
  };
};

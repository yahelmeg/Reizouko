import axios from 'axios';
import { API_BASE_URL, BROWSE_PAGE_SIZE } from '../config.ts';
import type { BackendKanji, Kanji } from '../types/kanji.ts';
import type { PaginatedResponse } from '../types/paginate.ts';

export const getLearnedKanjiIds = async (
  isLoggedIn: boolean
): Promise<Set<number>> => {
  const learnedSet = new Set<number>();

  if (!isLoggedIn) return learnedSet;

  try {
    const learnedRes = await axios.get(`${API_BASE_URL}/user/me/kanji`, {
      withCredentials: true,
    });

    learnedRes.data.forEach((kanji: { id: number }) =>
      learnedSet.add(kanji.id)
    );
    return learnedSet;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const message =
        err.response?.data?.detail || 'Could not fetch learned Kanji.';
      throw new Error(message);
    } else {
      throw new Error('Unexpected error occurred');
    }
  }
};

export const getKanjiByLevel = async (
  level: string,
  page: number
): Promise<{ kanji: Kanji[]; totalPages: number }> => {
  try {
    const offset = page * BROWSE_PAGE_SIZE;
    const url = `${API_BASE_URL}/jlpt_kanji/level?level=${level}&offset=${offset}&limit=${BROWSE_PAGE_SIZE}`;
    const response = await axios.get<PaginatedResponse>(url, {
      withCredentials: true,
    });
    const totalPages = response.data.total_pages;
    const kanji = response.data.data.map(
      (kanji: BackendKanji): Kanji => ({
        id: kanji.id,
        character: kanji.kanji,
        meaning: kanji.meaning,
        kunyomi: kanji.kunyomi,
        onyomi: kanji.onyomi,
        jlptLevel: kanji.jlpt_level,
      })
    );
    return {
      kanji,
      totalPages,
    };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const message =
        err.response?.data?.detail ||
        'Failed to load kanji data. Please try again later.';
      throw new Error(message);
    } else {
      throw new Error('Unexpected error occurred');
    }
  }
};

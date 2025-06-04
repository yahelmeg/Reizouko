import axios from 'axios';
import { API_BASE_URL } from '../config.ts';

export const markKanjiLearned = async (kanjiId: number): Promise<void> => {
  try {
    const url = `${API_BASE_URL}/user/me/kanji/${kanjiId}`;
    await axios.post(url, null, { withCredentials: true });
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const message =
        err.response?.data?.detail || 'Could not mark Kanji as learned.';
      throw new Error(message);
    } else {
      throw new Error('Unexpected error occurred');
    }
  }
};

export const markKanjiUnlearned = async (kanjiId: number): Promise<void> => {
  try {
    const url = `${API_BASE_URL}/user/me/kanji/${kanjiId}`;
    await axios.delete(url, { withCredentials: true });
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const message =
        err.response?.data?.detail || 'Could not mark Kanji as unlearned.';
      throw new Error(message);
    } else {
      throw new Error('Unexpected error occurred');
    }
  }
};

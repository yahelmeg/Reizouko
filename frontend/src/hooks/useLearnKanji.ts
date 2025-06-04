import axios from 'axios';
import { useState } from 'react';
import {
  markKanjiLearned,
  markKanjiUnlearned,
} from '../services/kanji.update.ts';

export const useLearnKanji = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const learnKanji = async (kanjiId: number) => {
    setLoading(true);
    setError('');

    try {
      await markKanjiLearned(kanjiId);
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

  const unlearnKanji = async (kanjiId: number) => {
    setLoading(true);
    setError('');

    try {
      await markKanjiUnlearned(kanjiId);
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

  return { unlearnKanji, learnKanji, loading, error };
};

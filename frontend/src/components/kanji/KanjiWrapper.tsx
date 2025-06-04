import React, { useState } from 'react';
import KanjiCard from './KanjiCard.tsx';
import type { Kanji } from '../../types/kanji.ts';
import {
  markKanjiLearned,
  markKanjiUnlearned,
} from '../../services/kanji.update.ts';

interface KanjiCardWrapperProps {
  kanji: Kanji;
}

const KanjiCardWrapper: React.FC<KanjiCardWrapperProps> = ({ kanji }) => {
  const [isLearned, setIsLearned] = useState<boolean>(kanji.isLearned ?? false);
  const [loading, setLoading] = useState(false);

  const toggleLearned = async () => {
    setLoading(true);
    try {
      if (isLearned) {
        await markKanjiUnlearned(kanji.id);
        setIsLearned(false);
      } else {
        await markKanjiLearned(kanji.id);
        setIsLearned(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KanjiCard
      {...kanji}
      isLearned={isLearned}
      onToggleLearned={toggleLearned}
    ></KanjiCard>
  );
};

export default KanjiCardWrapper;

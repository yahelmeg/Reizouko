import { useState } from 'react';
import KanjiCardGrid from '../components/KanjiCardGrid';
import type { Kanji } from '../types/kanji';
import { useKanji } from '../hooks/useKanji';

const BrowsePage = () => {
  const [selectedLevel, setSelectedLevel] = useState('');
  const { kanjiData, loading, error } = useKanji(selectedLevel);

  return <div>{kanjiData && <KanjiCardGrid kanjiData={kanjiData} />}</div>;
};

export default BrowsePage;

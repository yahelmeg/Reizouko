import KanjiCard from './KanjiCard.tsx';
import React from 'react';
import type { Kanji } from '../types/kanji.ts';

interface KanjiGridProps {
  kanjiData: Kanji[];
}

const KanjiCardGrid: React.FC<KanjiGridProps> = ({ kanjiData }) => {
  console.log(kanjiData);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {kanjiData.map((Kanji, index) => (
        <KanjiCard
          key={index}
          character={Kanji.character}
          meaning={Kanji.meaning}
          onyomi={Kanji.onyomi}
          kunyomi={Kanji.kunyomi}
          jlptLevel={Kanji.jlptLevel}
        />
      ))}
    </div>
  );
};

export default KanjiCardGrid;

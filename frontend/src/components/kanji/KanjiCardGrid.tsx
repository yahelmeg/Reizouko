import KanjiCard from './KanjiCard.tsx';
import React from 'react';
import type { Kanji } from '../../types/kanji.ts';

interface KanjiGridProps {
  kanjiData: Kanji[];
}

const KanjiCardGrid: React.FC<KanjiGridProps> = ({ kanjiData }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
      {kanjiData.map((kanji: Kanji) => (
        <KanjiCard
          key={kanji.id}
          id={kanji.id}
          character={kanji.character}
          meaning={kanji.meaning}
          onyomi={kanji.onyomi}
          kunyomi={kanji.kunyomi}
          jlptLevel={kanji.jlptLevel}
          isLearned={kanji.isLearned}
        />
      ))}
    </div>
  );
};

export default KanjiCardGrid;

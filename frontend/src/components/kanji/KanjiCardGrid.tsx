import React from 'react';
import type { Kanji } from '../../types/kanji.ts';
import KanjiCardWrapper from './KanjiWrapper.tsx';

interface KanjiGridProps {
  kanjiData: Kanji[];
}

const KanjiCardGrid: React.FC<KanjiGridProps> = ({ kanjiData }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
      {kanjiData.map((kanji: Kanji) => (
        <KanjiCardWrapper key={kanji.id} kanji={kanji} />
      ))}
    </div>
  );
};

export default KanjiCardGrid;

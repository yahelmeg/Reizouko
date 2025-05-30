import React from 'react';
import Card from './Card';
import type { Kanji } from '../types/kanji.ts';

interface KanjiCardProps extends Kanji {}

const kanjiCard: React.FC<KanjiCardProps> = ({
  character,
  meaning,
  kunyomi,
  onyomi,
  jlptLevel,
}) => {
  return (
    <Card className="max-w-sm">
      <div className="text-center">
        <div className="text-10xl font-bold text-gray 800 mb-4">
          {character}
        </div>
      </div>
      <div className="space y-3">
        <div className="bg-gray 50 rounded-lg p-3">
          <p className="text-lg font-medium text-gray-800"> {meaning}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-blue-50 rounded-lg p-3">
          <h3 className="text-xs font-semibold text-blue-600 uppercase tracking wide mb-1">
            Kunyomi
          </h3>
          <p className="text-sm font-medium text-gray-800">{kunyomi}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-blue-50 rounded-lg p-3">
          <h3 className="text-xs font-semibold text-blue-600 uppercase tracking wide mb-1">
            Onyomi
          </h3>
          <p className="text-sm font-medium text-gray-800">{onyomi}</p>
        </div>
      </div>
      <div className="bg-green-50 rounded-lg p-3">
        <span className="text-xs font-semibold text-green-600 uppercase tracking-wide">
          JLPT Level: {jlptLevel}
        </span>
      </div>
    </Card>
  );
};

export default kanjiCard;

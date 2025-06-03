import React from 'react';
import Card from '../general/Card.tsx';
import { levelColorMap } from '../../constants/levelColors';
import KanjiBadge from './KanjiBadge.tsx';
import KanjiCharacter from './KanjiCharacter.tsx';
import KanjiMeaning from './KanjiMeaning.tsx';
import KanjiReading from './KanjiReading.tsx';
import type { Kanji } from '../../types/kanji.ts';
import KanjiLearnedBadge from './KanjiLearned.tsx';

interface KanjiCardProps extends Kanji {
  isLearned?: boolean;
  onToggleLearned?: () => void;
}

const KanjiCard: React.FC<KanjiCardProps> = ({
  character,
  meaning,
  kunyomi,
  onyomi,
  jlptLevel,
  isLearned,
  onToggleLearned,
}) => {
  const badgeColor = levelColorMap[jlptLevel?.toUpperCase() ?? ''];

  return (
    <Card className="w-80 min-h-[24rem] mx-auto shadow-lg hover:shadow-xl transition-shadow duration-300 relative">
      <div className="absolute top-3 right-3 z-10">
        <KanjiBadge
          label={jlptLevel?.toUpperCase() ?? ''}
          className={badgeColor}
        />
      </div>
      <KanjiCharacter character={character} />

      {isLearned && (
        <div className="absolute top-3 left-3 z-10">
          <KanjiLearnedBadge />
        </div>
      )}

      <div className="space-y-4 px-4 pb-4">
        <KanjiMeaning meaning={meaning} />

        <div className="flex flex-col space-y-3">
          <KanjiReading
            title="Kunyomi"
            readings={kunyomi}
            colorFrom="from-blue-50"
            colorTo="to-cyan-50"
            border="border-blue-100"
            titleColor="text-blue-600"
          />
          <KanjiReading
            title="Onyomi"
            readings={onyomi}
            colorFrom="from-emerald-50"
            colorTo="to-teal-50"
            border="border-emerald-100"
            titleColor="text-emerald-600"
          />
        </div>
      </div>
    </Card>
  );
};

export default KanjiCard;

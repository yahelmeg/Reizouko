import { levelColorMap } from '../../constants/levelColors';
import React from 'react';
import Button from '../general/Button';
import { levels } from '../../constants/kanjiLevels.ts';

interface KanjiLevelSelectorProps {
  selectedLevel: string;
  onSelect: (level: string) => void;
}

const KanjiLevelSelector: React.FC<KanjiLevelSelectorProps> = ({
  selectedLevel,
  onSelect,
}) => {
  return (
    <div className="flex flex-wrap gap-2 mb-4 justify-center">
      {levels.map((lvl) => (
        <Button
          key={lvl}
          onClick={() => onSelect(lvl)}
          className={`px-4 py-2 rounded text-sm ${
            selectedLevel === lvl
              ? `${levelColorMap[lvl]} text-white`
              : `bg-gray-200 text-gray-800 hover:${levelColorMap[lvl]} hover:text-white`
          }`}
          isLoading={false}
        >
          {lvl}
        </Button>
      ))}
    </div>
  );
};

export default KanjiLevelSelector;

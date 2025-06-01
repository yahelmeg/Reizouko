import React from 'react';

interface KanjiDisplayProps {
  character: string;
}

const KanjiCharacter: React.FC<KanjiDisplayProps> = ({ character }) => {
  return (
    <div className="text-center bg-gradient-to-br from-slate-50 to-slate-100 rounded-t-lg p-6 mb-4">
      <div className="text-8xl font-bold text-slate-800 mb-2 leading-none">
        {character}
      </div>
    </div>
  );
};

export default KanjiCharacter;

import React from 'react';

interface KanjiMeaningProps {
  meaning: string;
}

const KanjiMeaning: React.FC<KanjiMeaningProps> = ({ meaning }) => {
  return (
    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-100">
      <h3 className="text-xs font-semibold text-indigo-600 uppercase tracking-wide mb-2">
        Meaning
      </h3>
      <p className="text-lg font-semibold text-slate-800">{meaning}</p>
    </div>
  );
};

export default KanjiMeaning;

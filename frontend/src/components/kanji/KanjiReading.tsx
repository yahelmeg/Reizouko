import React from 'react';

interface KanjiReadingGroupProps {
  title: string;
  readings?: string;
  colorFrom: string;
  colorTo: string;
  border: string;
  titleColor: string;
}

const splitReadings = (text?: string) =>
  text ? text.split(/[\s、,]+/).filter(Boolean) : [];

const KanjiReadingGroup: React.FC<KanjiReadingGroupProps> = ({
  title,
  readings,
  colorFrom,
  colorTo,
  border,
  titleColor,
}) => {
  const items = splitReadings(readings);

  return (
    <div
      className={`bg-gradient-to-br ${colorFrom} ${colorTo} rounded-lg p-3 border ${border}`}
    >
      <h3
        className={`text-xs font-semibold ${titleColor} uppercase tracking-wide mb-1`}
      >
        {title}
      </h3>
      <div className="space-y-1">
        {items.length > 0 ? (
          items.map((reading, i) => (
            <div
              key={i}
              className="text-xs font-medium text-slate-700 font-mono break-words"
            >
              {reading}
            </div>
          ))
        ) : (
          <p className="text-xs font-medium text-slate-500 font-mono">–</p>
        )}
      </div>
    </div>
  );
};

export default KanjiReadingGroup;

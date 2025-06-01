import { useState } from 'react';
import { useKanji } from '../hooks/useKanji';
import KanjiCardGrid from '../components/kanji/KanjiCardGrid.tsx';
import { DEFAULT_KANJI_LEVEL } from '../config.ts';
import Button from '../components/general/Button.tsx';
import { levelColorMap } from '../constants/levelColors.ts';
import Loader from '../components/general/Loader.tsx';
import Error from '../components/general/Error.tsx';
import Pagination from '../components/general/Pagination.tsx';

const levels = ['N5', 'N4', 'N3', 'N2', 'N1'];

const BrowsePage = () => {
  const [level, setLevel] = useState(DEFAULT_KANJI_LEVEL);
  const { kanjiData, loading, error, page, totalPages, nextPage, prevPage } =
    useKanji(level);

  return (
    <div className="p-4">
      <div className="flex flex-wrap gap-2 mb-4 justify-center">
        {levels.map((lvl) => (
          <Button
            key={lvl}
            onClick={() => setLevel(lvl)}
            className={`px-4 py-2 rounded text-sm ${
              level === lvl
                ? `${levelColorMap[lvl]} text-white`
                : `bg-gray-200 text-gray-800 hover:${levelColorMap[lvl]} hover:text-white`
            }`}
            isLoading={false}
          >
            {lvl}
          </Button>
        ))}
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Error error={error} />
      ) : kanjiData?.length ? (
        <KanjiCardGrid kanjiData={kanjiData} />
      ) : (
        <p className="text-gray-500 text-center">No kanji found.</p>
      )}

      {!loading && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPrevious={prevPage}
          onNext={nextPage}
          loading={loading}
        />
      )}
    </div>
  );
};

export default BrowsePage;

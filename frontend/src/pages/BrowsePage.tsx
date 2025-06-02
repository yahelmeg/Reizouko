import { useState } from 'react';
import { useKanji } from '../hooks/useKanji';
import KanjiCardGrid from '../components/kanji/KanjiCardGrid.tsx';
import { DEFAULT_KANJI_LEVEL } from '../config.ts';
import Loader from '../components/general/Loader.tsx';
import Error from '../components/general/Error.tsx';
import Pagination from '../components/general/Pagination.tsx';
import KanjiLevelSelector from '../components/kanji/KanjiLevelSelector.tsx';
import { useSearchParams } from 'react-router-dom';

const BrowsePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const levelParam = searchParams.get('level') || DEFAULT_KANJI_LEVEL;
  const pageParam = parseInt(searchParams.get('page') || '0', 10);

  const [level, setLevel] = useState<string>(levelParam);
  const [page, setPage] = useState<number>(pageParam);
  const { kanjiData, loading, error, totalPages } = useKanji(level, page);

  const updateSearchParams = (lvl: string, pg: number) => {
    setSearchParams({ level: lvl, page: String(pg) });
  };

  return (
    <div className="p-4">
      <KanjiLevelSelector
        selectedLevel={level}
        onSelect={(newLevel) => {
          setLevel(newLevel);
          setPage(0);
          updateSearchParams(newLevel, 0);
        }}
      />
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
          onPrevious={() => {
            const newPage = page - 1;
            setPage(newPage);
            updateSearchParams(level, newPage);
          }}
          onNext={() => {
            const newPage = page + 1;
            setPage(newPage);
            updateSearchParams(level, newPage);
          }}
          loading={loading}
        />
      )}
    </div>
  );
};

export default BrowsePage;

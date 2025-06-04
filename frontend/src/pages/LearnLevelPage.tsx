import { useParams } from 'react-router-dom';
import { useRandomKanji } from '../hooks/useRandomKanji';
import KanjiCard from '../components/kanji/KanjiCard.tsx';
import Loader from '../components/general/Loader.tsx';
import Error from '../components/general/Error.tsx';
import Button from '../components/general/Button.tsx';
import SectionTitle from '../components/general/SectionTitle.tsx';
import { useLearnKanji } from '../hooks/useLearnKanji.ts';
import { isAuthenticated } from '../atoms/userAtom.ts';
import { useRecoilValue } from 'recoil';

const LearnLevelPage = () => {
  const { level } = useParams<{ level: string }>();
  const { learnKanji, error: learnError } = useLearnKanji();
  const isLoggedIn = useRecoilValue(isAuthenticated);

  const {
    kanji,
    loading,
    error: fetchError,
    refetch,
    message,
  } = useRandomKanji(level || ' ');

  const handleLearnKanji = async (kanjiId: number) => {
    try {
      await learnKanji(kanjiId);
      await refetch();
    } catch (e) {
      console.error(e);
    }
  };

  if (!isLoggedIn) {
    return (
      <Error error="You must be logged in to use the Learn page. Please log in to continue." />
    );
  }

  if (!level) {
    return <Error error="Invalid level." />;
  }

  return (
    <div className="p-4 flex flex-col items-center space-y-6">
      <SectionTitle>Learning JLPT {level.toUpperCase()} Kanji</SectionTitle>

      {loading ? (
        <Loader />
      ) : fetchError ? (
        <Error error={fetchError} />
      ) : kanji ? (
        <>
          <KanjiCard
            id={kanji.id}
            character={kanji.character}
            meaning={kanji.meaning}
            onyomi={kanji.onyomi}
            kunyomi={kanji.kunyomi}
            jlptLevel={kanji.jlptLevel}
          />
          <div className="flex flex-row gap-5">
            <Button
              className="text-white"
              isLoading={loading}
              onClick={() => handleLearnKanji(kanji.id)}
            >
              Learn Kanji
            </Button>
            <Button
              className="text-white"
              onClick={refetch}
              isLoading={loading}
            >
              Show Next Kanji
            </Button>
          </div>
        </>
      ) : (
        <>
          <p className="text-gray-600 text-lg text-center">{message}</p>
        </>
      )}
    </div>
  );
};

export default LearnLevelPage;

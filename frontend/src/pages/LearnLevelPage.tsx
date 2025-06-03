import { useParams, useNavigate } from 'react-router-dom';
import { useRandomKanji } from '../hooks/useRandomKanji';
import KanjiCard from '../components/kanji/KanjiCard.tsx';
import Loader from '../components/general/Loader.tsx';
import Error from '../components/general/Error.tsx';
import Button from '../components/general/Button.tsx';
import SectionTitle from '../components/general/SectionTitle.tsx';

const LearnLevelPage = () => {
  const { level } = useParams<{ level: string }>();
  const navigate = useNavigate();

  const { kanji, loading, error, refetch, message } = useRandomKanji(
    level || ' '
  );

  if (!level) {
    return <Error error="Invalid level." />;
  }

  return (
    <div className="p-4 flex flex-col items-center space-y-6">
      <SectionTitle>Learning JLPT {level.toUpperCase()} Kanji</SectionTitle>

      {loading ? (
        <Loader />
      ) : error ? (
        <Error error={error} />
      ) : kanji ? (
        <>
          <KanjiCard
            character={kanji.character}
            meaning={kanji.meaning}
            onyomi={kanji.onyomi}
            kunyomi={kanji.kunyomi}
            jlptLevel={kanji.jlptLevel}
          />
          <Button className="text-white" onClick={refetch} isLoading={loading}>
            Show Next Kanji
          </Button>
          <Button
            className="text-white"
            isLoading={false}
            onClick={() => navigate('/learn')}
          >
            Go Back
          </Button>
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

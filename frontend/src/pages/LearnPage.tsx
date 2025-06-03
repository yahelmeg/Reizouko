import { useNavigate } from 'react-router-dom';
import KanjiLevelSelector from '../components/kanji/KanjiLevelSelector.tsx';
import SectionTitle from '../components/general/SectionTitle.tsx';

const LearnPage = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4 flex flex-col items-center">
      <SectionTitle>
        Choose Which Kanji JLPT Level you want to learn:
      </SectionTitle>
      <KanjiLevelSelector onSelect={(level) => navigate(`/learn/${level}`)} />
    </div>
  );
};

export default LearnPage;

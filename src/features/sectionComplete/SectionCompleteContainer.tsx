import restaurantData from '../../data/restaurant.json';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { resetSession } from '../../store/sessionSlice';
import type { WordBankItem } from '../../types';
import SectionComplete from './SectionComplete';

interface SectionCompleteContainerProps {}

const SectionCompleteContainer: React.FC<SectionCompleteContainerProps> = () => {
  const dispatch = useAppDispatch();
  const correctCount = useAppSelector(state => state.session.correctCount);
  const totalQuestions = useAppSelector(state => state.session.totalQuestions);

  const wordBank: WordBankItem[] = restaurantData.word_bank;

  const handleBackToHome = () => {
    dispatch(resetSession());
  };

  return (
    <SectionComplete
      correctCount={correctCount}
      totalQuestions={totalQuestions}
      wordBank={wordBank}
      onBackToHome={handleBackToHome}
    />
  );
};

export default SectionCompleteContainer;

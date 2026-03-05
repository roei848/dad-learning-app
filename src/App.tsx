import { useAppSelector } from './app/hooks';
import HomeContainer from './features/home/HomeContainer';
import WordBankContainer from './features/wordBank/WordBankContainer';
import SentenceCompletionContainer from './features/sentenceCompletion/SentenceCompletionContainer';
import StoryComprehensionContainer from './features/storyComprehension/StoryComprehensionContainer';
import VisualContextContainer from './features/visualContext/VisualContextContainer';
import SectionCompleteContainer from './features/sectionComplete/SectionCompleteContainer';

const App = () => {
  const { currentSectionId, currentStage } = useAppSelector((state) => state.session);

  if (!currentSectionId) {
    return <HomeContainer />;
  }

  switch (currentStage) {
    case 'wordBank':
      return <WordBankContainer />;
    case 'sentenceCompletion':
      return <SentenceCompletionContainer />;
    case 'storyComprehension':
      return <StoryComprehensionContainer />;
    case 'visualContext':
      return <VisualContextContainer />;
    case 'sectionComplete':
      return <SectionCompleteContainer />;
    default:
      return <HomeContainer />;
  }
};

export default App;

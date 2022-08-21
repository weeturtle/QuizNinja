import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import LoadWrapper from '../../components/General/LoadWrapper';
import PageTitle from '../../components/General/PageTitle';
import Searchbox from '../../components/General/Searchbox';
import QuizList from '../../components/Quizzes/QuizList';
import QuizPageContainer from '../../components/Quizzes/QuizPageContainer';
import useQuizzes from '../../lib/frontend/fetchQuizzes';

// This is a basic next page function
// It is the entry point for the quizzes page.
const Quizzes: NextPage = () => {
  // Utilises a custom hook to fetch quizzes from the server.
  // The hook returns a loading state and a list of quizzes and a function to refresh the quizzes.
  const [quizzes, updateQuizzes, loadingState] = useQuizzes();

  // Uses a state hook to store the search term
  // The search term is used to filter the quizzes.
  const [searchTerm, setSearchTerm] = useState('');

  // Creates a router hook to get the query string from the url.
  const router = useRouter();

  // Everytime the page is rendered, the quizzes are refreshed.
  useEffect(() => {
    const { query } = router;
    console.table(query);

    updateQuizzes();
  }, []);

  return (
    <>
      <PageTitle>Quizzes</PageTitle>
      <QuizPageContainer>
        <Searchbox value={searchTerm} onChange={setSearchTerm} placeholder='Search...' />
        <LoadWrapper loadingState={loadingState}>
          {/* The quiz list is rendered if the loading state is successful. */}
          {/* The quizzes are rendered as a list of links to the quiz page. */}
          <QuizList quizzes={quizzes} searchTerm={searchTerm} />
        </LoadWrapper>
      </QuizPageContainer>
    </>
  );
};

export default Quizzes;
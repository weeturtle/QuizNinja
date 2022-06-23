import type { NextPage } from 'next';
import { useEffect } from 'react';
import LoadWrapper from '../../components/General/LoadWrapper';
import useQuizzes from '../../lib/frontend/fetchQuizzes';

// This is a basic next page function
// It is the entry point for the quizzes page.
const Quizzes: NextPage = () => {
  // Utilises a custom hook to fetch quizzes from the server.
  // The hook returns a loading state and a list of quizzes and a function to refresh the quizzes.
  const [quizzes, updateQuizzes, loadingState] = useQuizzes();

  // Everytime the page is rendered, the quizzes are refreshed.
  useEffect(() => {
    updateQuizzes();
  }, []);

  return (
    <>
      <h1>Quizzes</h1>
      <LoadWrapper loadingState={loadingState}>
        {/* The quiz list is rendered if the loading state is successful. */}
        <ul>
          {/* The quizzes are rendered as a list of links to the quiz page. */}
          {quizzes.map((quiz, i) => (
            <li key={i}>
              {/* The quiz name is rendered as a link to the quiz page. */}
              <a href={`/quiz/${quiz._id}`}>{quiz.name}</a>
            </li>
          ))}
        </ul>
      </LoadWrapper>
    </>
  );
};

export default Quizzes;
import type { NextPage } from 'next';
import { useEffect } from 'react';
import LoadWrapper from '../../components/General/LoadWrapper';
import useQuizzes from '../../lib/frontend/fetchQuizzes';

// This is a basic next page function
// It is the entry point for the quizzes page.
const Quizzes: NextPage = () => {
  // Utilises a custom hook to fetch quizzes from the server.
  const [quizzes, updateQuizzes, loadingState] = useQuizzes();

  useEffect(() => {
    updateQuizzes();
  }, []);

  return (
    <>
      <h1>Quizzes</h1>
      <LoadWrapper loadingState={loadingState}>
        <ul>
          {quizzes.map((quiz, i) => (
            <li key={i}>
              <a href={`/api/quiz/${quiz._id}`}>{quiz.name}</a>
            </li>
          ))}
        </ul>
      </LoadWrapper>
    </>
  );
};

export default Quizzes;
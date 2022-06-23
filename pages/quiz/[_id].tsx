import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import LoadWrapper from '../../components/General/LoadWrapper';
import useQuiz from '../../lib/frontend/fetchQuiz';

const Quiz: NextPage = () => {
  
  // Creates an instance of the quiz hook
  const [quiz, updateQuiz, loadingState] = useQuiz();
  
  // Creates an instance of the next router object
  const router = useRouter();

  useEffect(() => {
    // If the router object is not ready then wait for it to load
    if (!router.isReady) return;

    // Extracts the quiz id from the url
    const { _id } = router.query;
  
    // If the quiz id is not provided, the user is redirected to the quizzes page.
    if (!('_id' in router.query)) router.push('/quizzes');
    
    
    // Fetching and setting the quiz
    updateQuiz(_id as string);

  }, [router.isReady]);


  return (
    <>
      <LoadWrapper loadingState={loadingState}>
        {quiz && (
          <p>{quiz.name}</p>
        )}
      </LoadWrapper>
    </>
  );
};

export default Quiz;
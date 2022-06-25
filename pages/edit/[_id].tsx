import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import LoadWrapper from '../../components/General/LoadWrapper';
import PageTitle from '../../components/General/PageTitle';
import QuizForm from '../../components/QuizForm';
import useEditQuiz from '../../lib/frontend/editQuiz';


const EditQuiz: NextPage = () => {
  // Creates an instance of the next router object
  const router = useRouter();
  
  // Creates an instance of the quiz hook
  const [quiz, updateQuiz, fetchQuiz, loadingState] = useEditQuiz();

  // If the router object is not ready then wait for it to load
  useEffect(() => {
    // If the router isn't ready wait for a change
    if (!router.isReady) return;
    
    // Extracts the quiz id from the url
    const { _id } = router.query;
  
    // If the quiz id is not provided, the user is redirected to the quizzes page.
    if (!('_id' in router.query)) router.push('/quizzes');
    
    // Fetching and setting the quiz
    fetchQuiz(_id as string);

  }, [router.isReady]);


  return (
    <>
      <LoadWrapper loadingState={loadingState}>
        {quiz && (
          <>
            <PageTitle></PageTitle>
            <QuizForm quiz={quiz} updateQuiz={updateQuiz} />
          </>
        )}
      </LoadWrapper>
    </>
  );
};

export default EditQuiz;
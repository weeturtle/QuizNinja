import { GetServerSidePropsContext, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import QuizGame from '../../components/Quiz/index';
import LoadWrapper from '../../components/General/LoadWrapper';
import useQuiz from '../../lib/frontend/fetchQuiz';
import getUser from '../../lib/frontend/getUser';

const Quiz: NextPage = () => {
  
  // Creates an instance of the quiz hook
  const [quiz, updateQuiz, loadingState] = useQuiz();
  
  // Creates an instance of the next router object
  const router = useRouter();

  useEffect(() => {
    // If the router object is not ready then wait for it to load
    if (!router.isReady) return;

    // Extracts the quiz id from the url
    const { id } = router.query;
  
    // If the quiz id is not provided, the user is redirected to the quizzes page.
    if (!('id' in router.query)) router.push('/quizzes');
    
    
    // Fetching and setting the quiz
    updateQuiz(id as string);

  }, [router.isReady]);


  return (
    <>
      <LoadWrapper loadingState={loadingState}>
        {quiz && <QuizGame quiz={quiz}/>}
      </LoadWrapper>
    </>
  );
};

export default Quiz;

// Get the user from the server
// If the user is not logged in, redirect them to the login page
export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  return getUser(context);
};
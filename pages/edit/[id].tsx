import { GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Edit from '../../components/Edit';
import LoadWrapper from '../../components/General/LoadWrapper';
import useEditQuiz from '../../lib/frontend/editQuiz';
import getUser from '../../lib/frontend/getUser';
import { getAllSubjects } from '../../prisma/subjects';
import { QuizModel, SubjectsPartial } from '../../prisma/zod';

// Types the props that are parsed to the page from getServerSideProps
type propType = InferGetServerSidePropsType<typeof getServerSideProps>

// This is the page that is used to edit a quiz
const EditQuiz: NextPage<propType> = ({ subjects }: propType) => {
  // Creates an instance of the next router object
  const router = useRouter();
  
  // Creates an instance of the quiz hook
  const [quiz, updateQuiz, fetchQuiz, loadingState] = useEditQuiz();


  // If the router object is not ready then wait for it to load
  useEffect(() => {
    // If the router isn't ready wait for a change
    if (!router.isReady) return;
    
    // Extracts the quiz id from the url
    const { id: rawId } = router.query;
  
    // If the quiz id is not provided, the user is redirected to the quizzes page.
    if (!rawId) router.push('/quizzes');
    
    // Fetching and setting the quiz
    const id = QuizModel.shape.id.parse(rawId);
    fetchQuiz(id);

  }, [router.isReady]);

  return (
    <>
      <LoadWrapper loadingState={loadingState}>
        {quiz && (
          <>
            <Edit
              quiz={quiz}
              subjects={subjects}
              updateQuiz={updateQuiz}
            />
          </>
        )}
      </LoadWrapper>
    </>
  );
};

export default EditQuiz;

// Get the user from the server
// If the user is not logged in, redirect them to the login page
export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  // Extracts the user and redirect components from the getUser function
  const { props, redirect } = await getUser(context);

  // Fetches all the subjects from the database
  const rawSubjects = await getAllSubjects();

  // Parses the subjects into a zod schema
  // Strips the dates
  const subjects = SubjectsPartial.parse(rawSubjects);

  // If the user is not logged in, redirect them to the login page
  // Return the subjects and user props
  return {
    redirect,
    props: {
      ...props,
      subjects,
    },
  };
};
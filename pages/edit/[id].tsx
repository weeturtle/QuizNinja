import { GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Edit from '../../components/Edit';
import LoadWrapper from '../../components/General/LoadWrapper';
import useEditQuiz from '../../lib/frontend/editQuiz';
import getUser from '../../lib/frontend/getUser';
import { getAllSubjects } from '../../prisma/subjects';
import { QuizModel, SubjectsPartial } from '../../prisma/zod';


type propType = InferGetServerSidePropsType<typeof getServerSideProps>

const EditQuiz: NextPage<propType> = ({ subjects }: propType) => {
  // Creates an instance of the next router object
  const router = useRouter();
  
  // Creates an instance of the quiz hook
  const [quiz, updateQuiz, fetchQuiz, loadingState] = useEditQuiz();

  const handleSubject = async (subjectId: string, name: string): Promise<string> => {
    if (subjectId) return subjectId;
    if (!name) return '';

    const response = await fetch('/api/subjects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name })
    });

    const subject = await response.json();

    return subject.id;
  };

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
              handleSubject={handleSubject}
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
  const { props, redirect } = await getUser(context);
  const rawSubjects = await getAllSubjects();

  const subjects = SubjectsPartial.parse(rawSubjects);

  return {
    redirect,
    props: {
      ...props,
      subjects,
    },
  };
};
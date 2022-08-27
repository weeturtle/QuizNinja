import { GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from 'next';
import { useState } from 'react';
import useLoadingState from '../../lib/frontend/loadingState';
import Edit from '../../components/Edit';
import LoadWrapper from '../../components/General/LoadWrapper';
import getUser from '../../lib/frontend/getUser';
import { getQuizById } from '../../prisma/quizzes';
import { getAllSubjects } from '../../prisma/subjects';
import { PartialUserModel, QuizPartial, SubjectsPartial } from '../../prisma/zod';
import validateQuiz from '../../lib/frontend/validateQuiz';
import LoadingState from '../../types/loadingState';

// Types the props that are parsed to the page from getServerSideProps
type propType = InferGetServerSidePropsType<typeof getServerSideProps>

// This is the page that is used to edit a quiz
const EditQuiz: NextPage<propType> = ({ subjects, quiz: initialQuiz }: propType) => {
  // The current state of the quiz
  // This is used to store the quiz as it is being edited
  // This is set to the initial quiz when the page is loaded
  const [quiz, setQuiz] = useState(initialQuiz);

  // Creates a loading state that is mutated by the router and the quiz
  const { loadingState, setLoadingState } = useLoadingState();

  const updateQuiz = async (quiz: QuizPartial) => {
    // Validates quiz
    const validQuiz = validateQuiz(quiz);
    
    // Updates the quiz on the server
    console.log(validQuiz);
    const response = await fetch('/api/quiz', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validQuiz),
    });
    
    if (response.status !== 200) {
      // If the server returns an error, set the loading state to failed
      setLoadingState(LoadingState.FAILED);
      return;
    }
    // Parses the response as JSON
    const updatedQuiz = await response.json();
    
    // Sets the loading state to fulfilled
    setLoadingState(LoadingState.FULFILLED);
    
    // Updates the quiz
    setQuiz(updatedQuiz);
  };

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
export const getServerSideProps = async (context: GetServerSidePropsContext): Promise<{props: {user: PartialUserModel, subjects: SubjectsPartial, quiz: QuizPartial}} | {redirect: {destination: string, permanent: boolean}}> => {
  // Get the current user if they are logged in
  const {
    props: {user}
  } = await getUser(context);
  
  // If the user is not logged in, redirect them to the login page
  if (!user) return {redirect: {destination: '/login', permanent: false}};
  
  // Extracts the quiz id from the url
  const { id: rawId } = context.query;
  
  // Validates the quiz id
  const id = QuizPartial.shape.id.parse(rawId);
  
  // Fetches the quiz from the database
  const quiz = await getQuizById(id);
  
  // If the quiz does not exist, redirect the user to the quizzes page
  if (!quiz) return { redirect: { destination: '/quizzes', permanent: false } };
  
  // Fetches all the subjects from the database
  const rawSubjects = await getAllSubjects();
  
  // Parses the subjects into a zod schema
  // Strips the dates
  const subjects = SubjectsPartial.parse(rawSubjects);
  
  // Returns the user, quiz and subjects
  return {
    props: {
      user,
      quiz: QuizPartial.parse(quiz),
      subjects
    }
  };
};
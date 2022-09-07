import type { GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from 'next';
import { useState } from 'react';
import LoadWrapper from '../../components/General/LoadWrapper';
import PageTitle from '../../components/General/PageTitle';
import Searchbox from '../../components/General/Searchbox';
import QuizList from '../../components/Quizzes/QuizList';
import QuizPageContainer from '../../components/Quizzes/QuizPageContainer';
import getUser from '../../lib/frontend/getUser';
import { getAllQuizzes, getQuizzesBySubjectId } from '../../prisma/quizzes';
import { PartialUserModel, QuizPartial, SubjectModel } from '../../prisma/zod';
import generatePropType from '../../lib/frontend/generatePropType';
import useLoadingState from '../../lib/frontend/loadingState';

type propType = InferGetServerSidePropsType<typeof getServerSideProps>

// This is a basic next page function
// It is the entry point for the quizzes page.
const Quizzes: NextPage<propType> = ({ user, quizzes }: propType) => {
  // Creates the loading state
  // This is updated according to the router functions
  // Changes with SSR
  const { loadingState } = useLoadingState();

  // Uses a state hook to store the search term
  // The search term is used to filter the quizzes.
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
      <PageTitle>Quizzes</PageTitle>
      <QuizPageContainer>
        <Searchbox value={searchTerm} onChange={setSearchTerm} placeholder='Search...' />
        <LoadWrapper loadingState={loadingState}>
          {/* The quiz list is rendered if the loading state is successful. */}
          {/* The quizzes are rendered as a list of links to the quiz page. */}
          <QuizList quizzes={quizzes} searchTerm={searchTerm} userId={user?.id || ''} />
        </LoadWrapper>
      </QuizPageContainer>
    </>
  );
};

export default Quizzes;

// Get the user from the server
// If the user is not logged in, redirect them to the login page
export const getServerSideProps = async (context: GetServerSidePropsContext): generatePropType<{user: PartialUserModel, quizzes: QuizPartial[]}> => {
  // Fetches user from the current session
  const {props: { user }} = await getUser(context);

  // If the user is not logged in, redirect them to the login page
  if (!user) return {redirect: {destination: '/accounts/login', permanent: false}};

  // Extracts the subject id from the query string if it exists
  const { subjectId: rawSubjectId } = context.query;

  // If the subject id is provided
  if (rawSubjectId) {
    // Validates the subject id
    const subjectId = SubjectModel.shape.id.parse(rawSubjectId);

    // Fetches all the quizzes for the subject
    const quizzes = await getQuizzesBySubjectId(user.id, subjectId);
    
    // Returns the quizzes and user to the page
    return {
      props: {
        user,
        quizzes,
      },
    };
  }

  // Fetches all the quizzes for the user
  const quizzes = await getAllQuizzes(user.id);

  // Returns the quizzes and user to the page
  return {
    props: {
      user,
      quizzes,
    },
  };
};
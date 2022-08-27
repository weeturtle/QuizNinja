import { GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from 'next';
import QuizGame from '../../components/Quiz/index';
import LoadWrapper from '../../components/General/LoadWrapper';
import getUser from '../../lib/frontend/getUser';
import useLoadingState from '../../lib/frontend/loadingState';
import { PartialUserModel, QuizModel, QuizPartial } from '../../prisma/zod';
import { getQuizById } from '../../prisma/quizzes';

type propType = InferGetServerSidePropsType<typeof getServerSideProps>

// This is the page that is used to play a quiz
const Quiz: NextPage<propType> = ({ user, quiz }: propType) => {
  
  const { loadingState } = useLoadingState();

  return (
    <>
      <LoadWrapper loadingState={loadingState}>
        {quiz && <QuizGame quiz={quiz} user={user} />}
      </LoadWrapper>
    </>
  );
};

export default Quiz;

// Get the user from the server
// If the user is not logged in, redirect them to the login page
export const getServerSideProps = async (context: GetServerSidePropsContext): Promise<{props: {user: PartialUserModel, quiz: QuizPartial}} | {redirect: {destination: string, permanent: boolean}}> => {
  // Get the current user if they are logged in
  const {
    props: {user}
  } = await getUser(context);

  // If the user is not logged in, redirect them to the login page
  if (!user) return {redirect: {destination: '/login', permanent: false}};

  // Extracts the quiz id from the url
  const { id: rawId } = context.query;

  // Validates the quiz id
  const id = QuizModel.shape.id.parse(rawId);

  // Fetches the quiz from the database
  const quiz = await getQuizById(id);

  // If the quiz does not exist, redirect the user to the quizzes page
  if (!quiz) return { redirect: { destination: '/quizzes', permanent: false } };

  // Returns the user and the quiz
  return {
    props: {
      user,
      quiz: QuizPartial.parse(quiz)
    }
  };
};
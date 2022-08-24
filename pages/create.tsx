import { GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from 'next';
import PageTitle from '../components/General/PageTitle';
import QuizForm from '../components/QuizForm';
import getUser from '../lib/frontend/getUser';
import createQuiz from '../lib/frontend/newQuiz';

// Next page for creating a new quiz
// Renders a quiz form with and empty quiz
const Create: NextPage = ({ user }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  console.log(user);
  
  return (
    <>
      <PageTitle>Create</PageTitle>
      <QuizForm quiz={{
        name: '',
        subjectId: '',
        questions: [],
        private: false,
        creatorId: user?.id || ''
      }} createQuiz={createQuiz} />
    </>
  );
};

export default Create;

// Get the user from the server
// If the user is not logged in, redirect them to the login page
export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  return getUser(context);
};
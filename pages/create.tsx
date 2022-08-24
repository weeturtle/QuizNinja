import { GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from 'next';
import PageTitle from '../components/General/PageTitle';
import getUser from '../lib/frontend/getUser';
import createQuiz from '../lib/frontend/newQuiz';
import CreateComponent from '../components/Create';
import { SubjectsPartial } from '../prisma/zod';
import { getAllSubjects } from '../prisma/subjects';

type propsType = InferGetServerSidePropsType<typeof getServerSideProps>

// Next page for creating a new quiz
// Renders a quiz form with and empty quiz
const Create: NextPage<propsType> = ({ user, subjects }: propsType) => {
  console.log(user);
  
  return (
    <>
      <PageTitle>Create</PageTitle>
      <CreateComponent
        createQuiz={createQuiz}
        creatorId={user?.id || ''}
        subjects={subjects}
      />
    </>
  );
};

export default Create;

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
  };};
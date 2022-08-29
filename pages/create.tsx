import { GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from 'next';
import PageTitle from '../components/General/PageTitle';
import getUser from '../lib/frontend/getUser';
import CreateComponent from '../components/Create';
import { NewQuizModel, SubjectsPartial } from '../prisma/zod';
import { getAllSubjects } from '../prisma/subjects';

// Types the props that are parsed to the page from getServerSideProps
type propsType = InferGetServerSidePropsType<typeof getServerSideProps>

// Next page for creating a new quiz
// Renders a quiz form with and empty quiz
const Create: NextPage<propsType> = ({ user, subjects }: propsType) => {
  // Function to create a new quiz
  const createQuiz = async (rawQuiz: NewQuizModel) => {
    // Validate the quiz
    const quiz = NewQuizModel.parse(rawQuiz);

    // Create the quiz
    const response = await fetch('/api/quiz', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(quiz),
    });

    // Return the response
    return response.json();
  };

  // Renders the create page component 
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
  };
};

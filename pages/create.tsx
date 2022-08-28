import { GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from 'next';
import PageTitle from '../components/General/PageTitle';
import getUser from '../lib/frontend/getUser';
import CreateComponent from '../components/Create';
import { NewQuizModel, SubjectsPartial } from '../prisma/zod';
import { getAllSubjects } from '../prisma/subjects';
import { useRouter } from 'next/router';
import { addQuiz } from '../prisma/quizzes';

// Types the props that are parsed to the page from getServerSideProps
type propsType = InferGetServerSidePropsType<typeof getServerSideProps>

// Next page for creating a new quiz
// Renders a quiz form with and empty quiz
const Create: NextPage<propsType> = ({ user, subjects }: propsType) => {
  // Router for redirecting
  const router = useRouter();
  
  // Function for creating a new quiz
  // Takes a quiz object and redirects to the quiz page if successful
  const createQuiz = async (rawQuiz: NewQuizModel) => {
    // Validate the quiz against the zod schema
    const quiz = NewQuizModel.parse(rawQuiz);

    // Add the quiz to the database
    const newQuiz = await addQuiz(quiz);

    // If the quiz was added successfully, redirect to the quiz's page
    if (newQuiz) {  
      // Redirect to the quiz page
      router.push(`/quiz/${newQuiz.id}`);

    } else {
      // If there was an error, log it
      console.error('Error creating quiz');
    }
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

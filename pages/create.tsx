import { NextPage } from 'next';
import PageTitle from '../components/General/PageTitle';
import QuizForm from '../components/QuizForm';
import createQuiz from '../lib/frontend/newQuiz';

// Next page for creating a new quiz
// Renders a quiz form with and empty quiz
const Create: NextPage = () => { 
  return (
    <>
      <PageTitle>Create</PageTitle>
      <QuizForm quiz={{
        name: '',
        subject: '',
        questions: []
      }} submitQuiz={createQuiz} />
    </>
  );
};

export default Create;
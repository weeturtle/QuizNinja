import { FC, useState } from 'react';
import { QuizId } from '../../types/Quiz';
import QuizFormContainer from './QuizFormContainer';
import QuizInformationContainer from './QuizInformationContainer';
import QuizInformationInput from './QuizInformationInput';
import QuizQuestionsContainer from './QuizQuestionsContainer';
import SubmitQuizButton from './SubmitQuizButton';

interface QuizFormProps {
  quiz: QuizId;
  updateQuiz: (quiz: QuizId) => void;
}

const QuizForm: FC<QuizFormProps> = ({ quiz, updateQuiz }) => {
  // Seperates the quiz into its components
  // Allows each component to be edited individually more easily
  // Each of the quiz's attributes are set to a state
  // This is used to update the quiz data when the user submits the quiz
  const [name, setName] = useState(quiz.name ?? '');
  
  const [subject, setSubject] = useState(quiz.subject ?? '');
  
  const [questions, setQuestions] = useState(quiz.questions ?? []);


  // Function to update the quiz data on the server
  const submitQuiz = () => {
    updateQuiz({
      _id: quiz._id,
      name,
      subject,
      questions
    });
  };

  // Returns the quiz form
  // Returns the quiz information at the top including the name and subject
  // Returns the quiz questions at the bottom
  return (
    <QuizFormContainer>
      <QuizInformationContainer>
        <QuizInformationInput
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <QuizInformationInput
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </QuizInformationContainer>
      <QuizQuestionsContainer questions={questions} setQuestions={setQuestions} />
      <SubmitQuizButton onClick={submitQuiz}>Submit</SubmitQuizButton>
    </QuizFormContainer>
  );
};

export default QuizForm;
import { FC, useState } from 'react';
import { Quiz, QuizId } from '../../types/Quiz';
import QuizFormContainer from './QuizFormContainer';
import QuizInformationContainer from './QuizInformationContainer';
import QuizInformationInput from './QuizInformationInput';
import QuizQuestionsContainer from './QuizQuestionsContainer';
import SubmitQuizButton from './SubmitQuizButton';

// Component props for the quiz form
// quiz: Quiz - The quiz data
// updateQuiz: (quiz: QuizId) => void - The function to update the quiz data on the server
// createQuiz: (quiz: Quiz) => void - The function to create a new quiz on the server
interface QuizFormProps {
  quiz: QuizId | Quiz;
  createQuiz?: (quiz: Quiz) => void;
  updateQuiz?: (quiz: QuizId) => void;

}

const QuizForm: FC<QuizFormProps> = ({ quiz, createQuiz, updateQuiz }) => {
  // Seperates the quiz into its components
  // Allows each component to be edited individually more easily
  // Each of the quiz's attributes are set to a state
  // This is used to update the quiz data when the user submits the quiz
  const [name, setName] = useState(quiz.name);
  
  const [subject, setSubject] = useState(quiz.subject);
  
  const [questions, setQuestions] = useState(quiz.questions);


  // Function to update the quiz data on the server
  const handleSubmitQuiz = () => {
    // If the quiz is being updated, update the quiz on the server
    '_id' in quiz ? 
      updateQuiz && updateQuiz({
        _id: quiz._id,
        name,
        subject,
        questions
      } as QuizId)
      :
    // If the quiz is being created, create the quiz on the server
      createQuiz && createQuiz({
        name,
        subject,
        questions
      } as Quiz);
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
          placeholder='Name'
        />
        <QuizInformationInput
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder='Subject'
        />
      </QuizInformationContainer>
      <QuizQuestionsContainer questions={questions} setQuestions={setQuestions} />
      <SubmitQuizButton onClick={handleSubmitQuiz}>Submit</SubmitQuizButton>
    </QuizFormContainer>
  );
};

export default QuizForm;
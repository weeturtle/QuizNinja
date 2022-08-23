import { FC, useState } from 'react';
import { NewQuizModel, QuizModel } from '../../prisma/zod';

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
  quiz: NewQuizModel | QuizModel;
  createQuiz?: (quiz: NewQuizModel) => void;
  updateQuiz?: (quiz: QuizModel) => void;

}

const QuizForm: FC<QuizFormProps> = ({ quiz, createQuiz, updateQuiz }) => {
  // Separates the quiz into its components
  // Allows each component to be edited individually more easily
  // Each of the quiz's attributes are set to a state
  // This is used to update the quiz data when the user submits the quiz
  const [name, setName] = useState(quiz.name);

  const [isPrivate, setIsPrivate] = useState(quiz.private);
  
  const [subjectId, setSubjectId] = useState(quiz.subjectId);
  
  const [questions, setQuestions] = useState(quiz.questions);


  // Function to update the quiz data on the server
  const handleSubmitQuiz = () => {
    // If the quiz is being updated, update the quiz on the server
    'id' in quiz ? 
      updateQuiz && updateQuiz(QuizModel.parse({
        id: quiz.id,
        name,
        subjectId,
        questions,
        private: isPrivate,
        creatorId: quiz.creatorId
      }))
      :
    // If the quiz is being created, create the quiz on the server
      createQuiz && createQuiz(NewQuizModel.parse({
        name,
        subjectId,
        questions,
        private: isPrivate,
        creatorId: quiz.creatorId
      }));
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
          value={subjectId || ''}
          onChange={(e) => setSubjectId(e.target.value)}
          placeholder='Subject'
        />
        <input
          type='checkbox'
          checked={isPrivate}
          onChange={() => setIsPrivate(isPrivate => !isPrivate)}
        />
      </QuizInformationContainer>
      <QuizQuestionsContainer questions={questions} setQuestions={setQuestions} />
      <SubmitQuizButton onClick={handleSubmitQuiz}>Submit</SubmitQuizButton>
    </QuizFormContainer>
  );
};

export default QuizForm;
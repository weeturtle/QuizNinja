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

  const [name, setName] = useState(quiz.name ?? '');
  
  const [subject, setSubject] = useState(quiz.subject ?? '');
  
  const [questions, setQuestions] = useState(quiz.questions ?? []);


  const submitQuiz = () => {
    updateQuiz({
      _id: quiz._id,
      name,
      subject,
      questions
    });
  };

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
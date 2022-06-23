import { Dispatch, FC, SetStateAction } from 'react';
import { QuizId } from '../../types/Quiz';
import QuizFormContainer from './QuizFormContainer';
import QuizInformationContainer from './QuizInformationContainer';
import QuizInformationInput from './QuizInformationInput';
import QuizQuestionsContainer from './QuizQuestionsContainer';

interface QuizFormProps {
  quiz: QuizId;
  setQuiz: Dispatch<SetStateAction<QuizId | null>>;
}

const QuizForm: FC<QuizFormProps> = ({ quiz, setQuiz }) => {
  return (
    <QuizFormContainer>
      <QuizInformationContainer>
        <QuizInformationInput
          value={quiz.name}
          onChange={(e) => setQuiz({ ...quiz, name: e.target.value })}
        />
        <QuizInformationInput
          value={quiz.subject}
          onChange={(e) => setQuiz({ ...quiz, subject: e.target.value })}
        />
      </QuizInformationContainer>
      <QuizQuestionsContainer quiz={quiz} setQuiz={setQuiz} />
    </QuizFormContainer>
  );
};

export default QuizForm;
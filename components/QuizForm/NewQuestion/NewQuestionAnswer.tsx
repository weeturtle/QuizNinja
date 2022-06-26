import { Dispatch, FC, SetStateAction, ChangeEvent } from 'react';
import { Answer } from '../../../types/Quiz';
import AnswerContainer from '../Question/AnswerContainer';

// Component props for each answer of the question
interface AnswerProps {
  answer: Answer;
  setAnswer: Dispatch<SetStateAction<Answer>>;
}

// Component for each answer of the question
// This component is used in the Question component
const NewQuestionAnswer: FC<AnswerProps> = ({ answer, setAnswer }) => {
  // Returns a text input for the answer text 
  // Returns a checkbox for if the answer is correct
  const handleAnswerTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAnswer(answer => { 
      return {
        ...answer,
        answer: e.target.value 
      };
    });
  };

  const handleAnswerCorrectChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAnswer(answer => {
      return {
        ...answer,
        isCorrect: e.target.checked
      };
    });
  };

  return (
    <AnswerContainer>
      <>
        <input
          type="text"
          value={answer.answer}
          onChange={handleAnswerTextChange}
          placeholder='Answer'
        />
        <input
          type="checkbox"
          checked={answer.isCorrect}
          onChange={handleAnswerCorrectChange}
        />
      </>
    </AnswerContainer>
  );
};

export default NewQuestionAnswer;
import { Dispatch, FC, SetStateAction, ChangeEvent } from 'react';
import { AnswerType } from '../../../types/Quiz';
import AnswerContainer from '../Question/AnswerContainer';

// Component props for each answer of the question
interface AnswerProps {
  answer: AnswerType;
  setAnswer: Dispatch<SetStateAction<AnswerType>>;
}

// Component for each answer of the question
// This component is used in the Question component
const NewQuestionAnswer: FC<AnswerProps> = ({ answer, setAnswer }) => {
  // Handle the answer text being changed
  // Set the answer text to the value of the input
  const handleAnswerTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAnswer(answer => { 
      return {
        ...answer,
        answer: e.target.value 
      };
    });
  };

  // Functino called when the checkbox is changed
  const handleAnswerCorrectChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Sets the answer to be correct if the checkbox is checked
    // Sets the answer to be incorrect if the checkbox is unchecked
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
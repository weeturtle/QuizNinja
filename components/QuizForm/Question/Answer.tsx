import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { AnswerType } from '../../../types/Quiz';
import AnswerContainer from './AnswerContainer';

// Component props for each answer of the question
interface AnswerProps {
  answer: AnswerType;
  setAnswer: Dispatch<SetStateAction<AnswerType>>;
  answerNumber: number;
}

// Component for each answer of the question
// This component is used in the Question component
const Answer: FC<AnswerProps> = ({ answer, setAnswer, answerNumber }) => {
  // Gets the current question data and sets it to the state
  // This is used to update the question data when the user changes the answer
  const [editedAnswer, setEditedAnswer] = useState(answer.answer);
  const [editedCorrect, setEditedCorrect] = useState(answer.isCorrect);

  // Everytime the user makes an edit to the answer, the question data is updated
  // It sets the specific answer data of the question to the current state
  useEffect(() => {
    setAnswer({
      answer: editedAnswer,
      isCorrect: editedCorrect
    });
  }, [editedAnswer, editedCorrect]);

  // Returns a text input for the answer text 
  // Returns a checkbox for if the answer is correct
  return (
    <AnswerContainer>
      <input
        type="text"
        value={editedAnswer} 
        onChange={(e) => setEditedAnswer(e.target.value)}
        placeholder={`Answer ${answerNumber}`}
      />
      <input
        type="checkbox"
        checked={editedCorrect}
        onChange={(e) => setEditedCorrect(e.target.checked)}
      />
    </AnswerContainer>
  );
};

export default Answer;
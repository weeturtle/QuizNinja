import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { Answer } from '../../../types/Quiz';
import AnswerContainer from './AnswerContainer';

// Component props for each answer of the question
interface AnswerProps {
  answer: Answer;
  setAnswers: Dispatch<SetStateAction<Answer[]>>;
  answerNumber: number;
}

// Component for each answer of the question
// This component is used in the Question component
const Answer: FC<AnswerProps> = ({ answer, setAnswers, answerNumber }) => {
  // Gets the current question data and sets it to the state
  // This is used to update the question data when the user changes the answer
  const [editedAnswer, setAnswer] = useState(answer.answer);
  const [editedCorrect, setCorrect] = useState(answer.isCorrect);

  // Everytime the user makes an edit to the answer, the question data is updated
  // It sets the specific answer data of the question to the current state
  useEffect(() => {
    setAnswers(answers => {
      answers[answerNumber] = {
        answer: editedAnswer,
        isCorrect: editedCorrect
      };

      return answers;
    });
  }, [editedAnswer, editedCorrect]);

  // Returns a text input for the answer text 
  // Returns a checkbox for if the answer is correct
  return (
    <AnswerContainer>
      <input
        type="text"
        value={editedAnswer} 
        onChange={(e) => setAnswer(e.target.value)}
        placeholder={`Answer ${answerNumber + 1}`}
      />
      <input
        type="checkbox"
        checked={editedCorrect}
        onChange={(e) => setCorrect(e.target.checked)}
      />
    </AnswerContainer>
  );
};

export default Answer;
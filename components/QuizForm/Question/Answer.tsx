import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { Answer } from '../../../types/Quiz';

interface AnswerProps {
  answer: Answer;
  setAnswers: Dispatch<SetStateAction<Answer[]>>;
  answerNumber: number;
}

const Answer: FC<AnswerProps> = ({ answer, setAnswers, answerNumber }) => {
  const [editedAnswer, setAnswer] = useState(answer.answer);
  const [editedCorrect, setCorrect] = useState(answer.isCorrect);

  useEffect(() => {
    setAnswers(answers => {
      answers[answerNumber] = {
        answer: editedAnswer,
        isCorrect: editedCorrect
      };

      return answers;
    });
  }, [editedAnswer, editedCorrect]);

  return (
    <>
      <input
        value={editedAnswer} 
        onChange={(e) => setAnswer(e.target.value)}
      />
      <input
        type="checkbox"
        checked={editedCorrect}
        onChange={(e) => setCorrect(e.target.checked)}
      />
    </>
  );
};

export default Answer;
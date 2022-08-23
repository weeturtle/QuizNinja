import { useState } from 'react';
import { QuizModel } from '../../prisma/zod';

// Currently not used.

const useDelete = (): [
  boolean,
  (quiz: QuizModel) => void,
  () => void,
  () => void,
] => {
  const [showPopup, setShowPopup] = useState(false);
  const [quiz, setQuiz] = useState<QuizModel | null>();

  const handleDelete = () => {
    if (!quiz) return;

    fetch(`/api/quiz/${quiz.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    setShowPopup(false);
  };

  const handleShowPopup = (quiz: QuizModel) => {
    setShowPopup(true);
    setQuiz(quiz);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return [showPopup, handleShowPopup, handleDelete, handleClosePopup];

};

export default useDelete;
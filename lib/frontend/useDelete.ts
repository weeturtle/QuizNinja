import { useState } from 'react';
import { QuizIdType } from '../../types/Quiz';

// Currently not used.

const useDelete = (): [
  boolean,
  (quiz: QuizIdType) => void,
  () => void,
  () => void,
] => {
  const [showPopup, setShowPopup] = useState(false);
  const [quiz, setQuiz] = useState<QuizIdType | null>();

  const handleDelete = () => {
    if (!quiz) return;

    fetch(`/api/quiz/${quiz._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    setShowPopup(false);
  };

  const handleShowPopup = (quiz: QuizIdType) => {
    setShowPopup(true);
    setQuiz(quiz);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return [showPopup, handleShowPopup, handleDelete, handleClosePopup];

};

export default useDelete;
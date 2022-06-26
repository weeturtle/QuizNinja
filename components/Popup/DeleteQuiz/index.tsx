import { FC } from 'react';
import Popup from '..';
import CancelButton from './CancelButton';
import DeleteButton from './DeleteButton';
import DeleteQuizPopupContainer from './DeleteQuizPopupContainer';

// Takes in a function to call when the user closes the popup
// Takes the quiz id of the quiz to delete for api request
// Takes name of the quiz to delete for display
// Returns a popup with a delete quiz button

interface DeleteQuizPopupProps {
  isOpen: boolean;
  onClose: () => void;
  quizId: string;
  quizName: string;
}

const DeleteQuizPopup: FC<DeleteQuizPopupProps> = ({ isOpen, onClose, quizId, quizName }) => {
  // Function called when confirm button is clicked
  const handleDelete = () => {
    // Sends an api request to delete the quiz
    // Sends the quiz id as a query
    fetch(`/api/quiz/${quizId}`, {
      method: 'DELETE'
    });

    // Causes the page to refresh after the quiz is deleted
    window.location.reload();

    // Closes the popup
    onClose();
  };

  // Returns the popup component
  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <DeleteQuizPopupContainer>
        <h1>Delete {quizName}</h1>
        <p>Are you sure you want to delete this quiz?</p>
        <CancelButton onClick={onClose}>Cancel</CancelButton>
        <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
      </DeleteQuizPopupContainer>
    </Popup>
  );
};

export default DeleteQuizPopup;
import { Dispatch, SetStateAction, useState } from 'react';
import LoadingState from '../../types/loadingState';
import { QuizId } from '../../types/Quiz';
import validateQuiz from './validateQuiz';

// Custom reusable React hook
// Loads and allows a the page to refetch the quiz
// Returns a tuple of the quiz and a function to refetch the quiz
export const useEditQuiz = (): [QuizId | null, Dispatch<SetStateAction<QuizId | null>>, (quiz: QuizId) => void, (_id: string) => void, LoadingState] => {
  // The useState hook is used to store the quiz
  // The quiz is initially null and is populated by the fetchQuiz function
  // useState renders the quiz list as it is updated
  const [quiz, setQuiz] = useState<QuizId | null>(null);

  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.PENDING);

  // Function to refetch the quiz
  const fetchQuiz = async (_id: string) => {

    // Set the loading state to pending
    setLoadingState(LoadingState.PENDING);

    // Fetches the quiz from the server
    const response = await fetch(`/api/quiz/${_id}`);

    if (response.status !== 200) {
      // If the server returns an error, set the loading state to failed
      setLoadingState(LoadingState.FAILED);
      return;
    }
    // Parses the response as JSON
    const fetchedQuiz = await response.json();

    // Sets the loading state to fulfilled
    setLoadingState(LoadingState.FULFILLED);

    // Updates the quiz
    setQuiz(fetchedQuiz);
  };

  const updateQuiz = async (quiz: QuizId) => {
    // Set the loading state to pending
    setLoadingState(LoadingState.PENDING);

    // Validates quiz
    const validQuiz = validateQuiz(quiz) as QuizId;

    // Updates the quiz on the server
    console.log(validQuiz);
    const response = await fetch('/api/quiz', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validQuiz),
    });

    if (response.status !== 200) {
      // If the server returns an error, set the loading state to failed
      setLoadingState(LoadingState.FAILED);
      return;
    }
    // Parses the response as JSON
    const updatedQuiz = await response.json();

    // Sets the loading state to fulfilled
    setLoadingState(LoadingState.FULFILLED);

    // Updates the quiz
    setQuiz(updatedQuiz);
  };

  // Returns the quiz and the function to refetch the quiz
  return [quiz, setQuiz, updateQuiz, fetchQuiz, loadingState];
};

export default useEditQuiz;
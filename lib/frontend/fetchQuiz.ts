import { useState } from 'react';
import LoadingState from '../../types/loadingState';
import { QuizId } from '../../types/Quiz';

// Custom reusable React hook
// Loads and allows a the page to refetch the quiz
// Returns a tuple of the quiz and a function to refetch the quiz
export const useQuiz = (): [QuizId | null, (_id: string) => void, LoadingState] => {
  // The useState hook is used to store the quiz
  // The quiz is initially null and is populated by the fetchQuiz function
  // useState renders the quiz list as it is updated
  const [quiz, setQuiz] = useState<QuizId | null>(null);

  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.PENDING);

  // Function to refetch the quiz
  const updateQuiz = async (_id: string) => {

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

  // Returns the quiz and the function to refetch the quiz
  return [quiz, updateQuiz, loadingState];
};

export default useQuiz;
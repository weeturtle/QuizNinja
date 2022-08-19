import { useState } from 'react';
import LoadingState from '../../types/loadingState';
import { QuizIdType } from '../../types/Quiz';

// Custom reusable React hook
// Loads and allows a the page to refetch the quiz list
// Returns a tuple of the quiz list and a function to refetch the list
export const useQuizzes = (): [QuizIdType[], () => void, LoadingState] => {
  // The useState hook is used to store the quiz list since it is a dynamic list
  // The quiz list is initially empty and is populated by the fetchQuizzes function
  // useState renders the quiz list as it is updated
  const [quizzes, setQuizzes] = useState<QuizIdType[]>([]);

  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.PENDING);

  // Function to refetch the quiz list
  const updateQuizzes = async () => {

    // Set the loading state to pending
    setLoadingState(LoadingState.PENDING);

    // Fetches the quiz list from the server
    const response = await fetch('api/quizzes');

  
    if (response.status !== 200) {
      // If the server returns an error, set the loading state to failed
      setLoadingState(LoadingState.FAILED);
      return;
    }
    // Parses the response as JSON
    const fetchedQuizzes = await response.json();
    console.table(fetchedQuizzes);
    
    // Sets the loading state to fulfilled
    setLoadingState(LoadingState.FULFILLED);

    // Updates the quiz list
    setQuizzes(fetchedQuizzes);
  };

  // Returns the quiz list and the function to refetch the list
  return [quizzes, updateQuizzes, loadingState];
};

export default useQuizzes;
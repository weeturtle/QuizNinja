import { Quiz } from '@prisma/client';
import { useState } from 'react';
import LoadingState from '../../types/loadingState';

// Custom reusable React hook
// Loads and allows a the page to refetch the quiz list
// Returns a tuple of the quiz list and a function to refetch the list
export const useQuizzes = (): [Quiz[], () => void, (subjectId: string) => void, LoadingState] => {
  // The useState hook is used to store the quiz list since it is a dynamic list
  // The quiz list is initially empty and is populated by the fetchQuizzes function
  // useState renders the quiz list as it is updated
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.PENDING);

  // Function to refetch the quiz list
  const updateQuizzes = async () => {

    // Set the loading state to pending
    setLoadingState(LoadingState.PENDING);

    // Fetches the quiz list from the server
    const response = await fetch('api/quizzes');
    
    handleRefresh(response);
  };

  // This function takes the subjectId as a parameter
  // It uses it to fetch the quiz list from the server
  const updateQuizzesId = async (subjectId: string) => {
      
    // Set the loading state to pending
    setLoadingState(LoadingState.PENDING);

    // Fetches the quiz list from the server
    const response = await fetch(`api/quizzes?subjectId=${subjectId}`);
    
    handleRefresh(response);
  };

  const handleRefresh = async (response: Response) => {

    // Check if the response is ok
    if (response.status !== 200) {
      // If the server returns an error, set the loading state to failed
      setLoadingState(LoadingState.FAILED);
      return;
    }
    
    // Parses the response as JSON
    const fetchedQuizzes = await response.json();
    
    // Sets the loading state to fulfilled
    setLoadingState(LoadingState.FULFILLED);

    // Updates the quiz list
    setQuizzes(fetchedQuizzes);
  };

  // Returns the quiz list and the function to refetch the list
  return [quizzes, updateQuizzes, updateQuizzesId, loadingState];
};

export default useQuizzes;
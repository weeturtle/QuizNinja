import { Subject } from '@prisma/client';
import { useState } from 'react';
import LoadingState from '../../types/loadingState';

// Custom reusable React hook
// Loads and allows a the page to refetch the subjects list
// Returns a tuple of the subject list and a function to refetch the list
export const useSubjects = (): [Subject[], () => void, LoadingState] => {
  // The useState hook is used to store the subject list since it is a dynamic list
  // The subject list is initially empty and is populated by the fetchSubjects function
  // useState renders the quiz list as it is updated
  const [subjects, setSubjects] = useState<Subject[]>([]);

  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.PENDING);

  // Function to refetch the subjects list
  const updateSubjects = async () => {

    // Set the loading state to pending
    setLoadingState(LoadingState.PENDING);

    // Fetches the subject list from the server
    const response = await fetch('api/subjects');
  
    if (response.status !== 200) {
      // If the server returns an error, set the loading state to failed
      setLoadingState(LoadingState.FAILED);
      return;
    }
    // Parses the response as JSON
    const fetchedSubjects = await response.json();
    
    // Sets the loading state to fulfilled
    setLoadingState(LoadingState.FULFILLED);

    // Updates the subject list
    setSubjects(fetchedSubjects);
  };

  // Returns the subject list and the function to refetch the list
  return [subjects, updateSubjects, loadingState];
};

export default useSubjects;
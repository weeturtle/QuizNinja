import { FC, ReactNode } from 'react';
import LoadingState from '../../types/loadingState';

// The parameters that the LoadWrapper component accepts are:
// - loadingState: The loading state of the component.
// - children: The children of the component.
interface LoadingProps {
  loadingState: LoadingState,
  children: ReactNode
}

// The LoadWrapper component is used to wrap components that need to be loaded from the server.
const LoadWrapper: FC<LoadingProps> = ({ loadingState, children }) => {
  
  // Display different content depending on the loading state.
  switch (loadingState) {

  // If the component is loading, display a loading indicator.
  case LoadingState.PENDING:
    return <p>Loading...</p>;

  // If the loading state was unsuccessful, display an error message.
  case LoadingState.FAILED:
    return <p>Failed to load data.</p>;
  }

  // If the loading state was successful, display the children.
  return (
    <>
      {children}    
    </>
  );
};

export default LoadWrapper;